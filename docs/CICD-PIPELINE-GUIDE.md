# Hướng dẫn CI/CD Pipeline: Jenkins + SonarQube + OWASP + Trivy

## Tổng quan quy trình

```
Developer Push Code → GitHub Webhook → Jenkins Pull Code
→ Dependencies → Build & Test → OWASP Scan → SonarQube Scan
→ Quality Gate → Trivy FS Scan → Docker Build → Trivy Image Scan
→ Docker Push → Deploy (ECS/K8s)
```

---

## Mỗi tool scan cái gì?

| Tool | Scan cái gì | Ví dụ phát hiện |
|------|-------------|-----------------|
| **OWASP Dependency-Check** | Thư viện bên thứ 3 có lỗ hổng CVE | Log4j, Spring4Shell, Jackson RCE |
| **SonarQube** | Code bạn viết có tốt không | Bugs, code smells, duplications, coverage |
| **Trivy FS** | Source code có lộ secrets, misconfig | API key hardcode, password trong config |
| **Trivy Image** | Docker image có CVE trong OS packages | Alpine CVE, OpenSSL vulnerabilities |

> 💡 Ba tool bổ sung cho nhau, không thay thế nhau. Thiếu cái nào cũng có "lỗ hổng" trong pipeline.

---

## Kiến trúc Docker Compose

Dự án sử dụng 3 container chạy trên cùng `recruitify-network`:

| Service | Image | Port | Mục đích |
|---------|-------|------|----------|
| PostgreSQL 17 | `postgres:17-alpine` | `5433` | Database chính |
| SonarQube | `sonarqube:community` | `9000` | Code quality analysis |
| Jenkins | `jenkins/jenkins:lts-jdk17` | `8080` | CI/CD automation |

---

## Bước 1: Khởi động Docker Compose

```bash
docker-compose up -d
```

Kiểm tra 3 container đã chạy:

```bash
docker ps
```

Kết quả mong đợi:

```
CONTAINER ID   IMAGE                       STATUS    PORTS
xxxx           postgres:17-alpine          Up        0.0.0.0:5433->5432/tcp
xxxx           sonarqube:community         Up        0.0.0.0:9000->9000/tcp
xxxx           jenkins/jenkins:lts-jdk17   Up        0.0.0.0:8080->8080/tcp
```

---

## Bước 2: Cấu hình Jenkins lần đầu

### 2.1 Lấy mật khẩu admin

```bash
docker exec recruitify-jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```

### 2.2 Đăng nhập & cài plugin

1. Mở `http://localhost:8080`
2. Paste mật khẩu → chọn **"Install suggested plugins"**
3. Tạo tài khoản admin

### 2.3 Cài thêm plugin cần thiết

Vào **Manage Jenkins → Plugins → Available plugins**, tìm và cài:

| Plugin | Mục đích |
|--------|----------|
| **SonarQube Scanner** | Kết nối Jenkins với SonarQube |
| **OWASP Dependency-Check** | Scan lỗ hổng thư viện bên thứ 3 |
| **Docker Pipeline** | Build & push Docker image trong Jenkins |
| **Pipeline** | Viết Jenkinsfile (thường đã có sẵn) |
| **GitHub Integration** | Nhận webhook từ GitHub |

---

## Bước 3: Kết nối GitHub → Jenkins (Webhook)

> **Mục đích:** Khi developer push code → GitHub tự động báo Jenkins chạy pipeline.

### 3.1 Trên GitHub

1. Vào repo → **Settings → Webhooks → Add webhook**
2. Payload URL: `http://<jenkins-server-ip>:8080/github-webhook/`
3. Content type: `application/json`
4. Trigger: **Just the push event**

### 3.2 Nếu chạy local (GitHub không gọi được localhost)

Dùng **ngrok** để tạo public URL:

```bash
ngrok http 8080
```

Kết quả:

```
Forwarding: https://xxxx.ngrok.io → http://localhost:8080
```

Webhook URL sẽ là: `https://xxxx.ngrok.io/github-webhook/`

---

## Bước 4: Cấu hình SonarQube

### 4.1 Trên SonarQube (`http://localhost:9000`)

1. Đăng nhập: `admin` / `admin` → đổi mật khẩu mới
2. Vào **Administration → Security → Users → Tokens**
3. Generate token → **copy lại** (VD: `squ_abc123xyz`)

### 4.2 Trên Jenkins - Thêm Credentials

1. **Manage Jenkins → Credentials → (global) → Add Credentials**
   - Kind: `Secret text`
   - Secret: paste token SonarQube
   - ID: `sonarqube-token`
   - Description: `SonarQube Token`

### 4.3 Trên Jenkins - Kết nối SonarQube Server

1. **Manage Jenkins → System → SonarQube servers**
   - Name: `SonarQube`
   - Server URL: `http://sonarqube:9000` *(dùng tên container vì cùng Docker network)*
   - Server authentication token: chọn `sonarqube-token`

---

## Bước 5: Cấu hình OWASP Dependency-Check

### Trên Jenkins

1. **Manage Jenkins → Tools → Dependency-Check installations**
   - Name: `OWASP-DC`
   - ✅ **Install automatically**
   - Version: chọn bản mới nhất

> **Giải thích:**
> OWASP Dependency-Check quét tất cả thư viện trong `pom.xml` / `package.json`
> và so sánh với **NVD (National Vulnerability Database)**.
> Nếu thư viện nào có lỗ hổng bảo mật đã biết → báo lỗi.
>
> Ví dụ: Nếu dùng `log4j 2.14.1` → phát hiện **CVE-2021-44228 (Log4Shell)** 💀

---

## Bước 6: Cài Trivy trong Jenkins Container

Trivy không có Jenkins plugin, cài trực tiếp vào container:

```bash
docker exec -u root recruitify-jenkins bash -c "
  apt-get update && 
  apt-get install -y wget apt-transport-https gnupg lsb-release &&
  wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | gpg --dearmor -o /usr/share/keyrings/trivy.gpg &&
  echo 'deb [signed-by=/usr/share/keyrings/trivy.gpg] https://aquasecurity.github.io/trivy-repo/deb generic main' | tee /etc/apt/sources.list.d/trivy.list &&
  apt-get update &&
  apt-get install -y trivy
"
```

Kiểm tra cài thành công:

```bash
docker exec recruitify-jenkins trivy --version
```

> **Giải thích Trivy scan 2 loại:**
>
> | Lệnh | Scan cái gì | Ví dụ |
> |-------|-------------|-------|
> | `trivy fs .` | Source code & config | Phát hiện API key hardcode, password trong `.env` |
> | `trivy image <image>` | Docker image | Phát hiện CVE trong Alpine packages, OpenSSL |

---

## Bước 7: Tạo Jenkinsfile

Tạo file `Jenkinsfile` ở **root** dự án:

```groovy
pipeline {
    agent any

    environment {
        SONAR_HOST = 'http://sonarqube:9000'
        DOCKER_IMAGE = 'recruitify-backend'
    }

    stages {

        // ===== STAGE 1: Pull code từ GitHub =====
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        // ===== STAGE 2: Cài dependencies =====
        stage('Dependencies') {
            steps {
                dir('backend') {
                    sh 'mvn dependency:resolve'
                }
            }
        }

        // ===== STAGE 3: Build + chạy Unit Test =====
        // Sinh báo cáo coverage (Jacoco) cho SonarQube đọc
        stage('Build & Test') {
            steps {
                dir('backend') {
                    sh 'mvn clean verify'
                }
            }
        }

        // ===== STAGE 4: OWASP Dependency Check =====
        // Quét thư viện bên thứ 3 có lỗ hổng CVE không
        stage('OWASP Dependency Check') {
            steps {
                dependencyCheck additionalArguments: '''
                    --scan backend/
                    --format HTML
                    --format XML
                ''', odcInstallation: 'OWASP-DC'
            }
            post {
                always {
                    dependencyCheckPublisher pattern: '**/dependency-check-report.xml'
                }
            }
        }

        // ===== STAGE 5: SonarQube Analysis =====
        // Phân tích code quality: bugs, code smells, coverage
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    dir('backend') {
                        sh '''
                            mvn sonar:sonar \
                              -Dsonar.projectKey=recruitify \
                              -Dsonar.host.url=$SONAR_HOST
                        '''
                    }
                }
            }
        }

        // ===== STAGE 6: Quality Gate =====
        // Chờ SonarQube trả kết quả PASS/FAIL
        // Nếu FAIL → pipeline dừng lại, KHÔNG deploy
        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        // ===== STAGE 7: Trivy Filesystem Scan =====
        // Scan source code tìm secrets bị lộ, misconfig
        stage('Trivy FS Scan') {
            steps {
                sh 'trivy fs --severity HIGH,CRITICAL --exit-code 1 .'
            }
        }

        // ===== STAGE 8: Docker Build =====
        stage('Docker Build') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE}:${BUILD_NUMBER} backend/"
            }
        }

        // ===== STAGE 9: Trivy Image Scan =====
        // Scan Docker image tìm CVE trong OS packages
        stage('Trivy Image Scan') {
            steps {
                sh "trivy image --severity HIGH,CRITICAL --exit-code 1 ${DOCKER_IMAGE}:${BUILD_NUMBER}"
            }
        }

        // ===== STAGE 10: Docker Push =====
        stage('Docker Push') {
            steps {
                sh """
                    docker tag ${DOCKER_IMAGE}:${BUILD_NUMBER} your-registry/${DOCKER_IMAGE}:${BUILD_NUMBER}
                    docker push your-registry/${DOCKER_IMAGE}:${BUILD_NUMBER}
                """
            }
        }
    }

    post {
        failure {
            echo '❌ Pipeline FAILED - Check logs!'
        }
        success {
            echo '✅ Pipeline PASSED - Image pushed successfully!'
        }
    }
}
```

---

## Bước 8: Tạo Jenkins Pipeline Job

1. Trên Jenkins → **New Item**
2. Nhập tên: `recruitify-pipeline`
3. Chọn **Pipeline** → OK
4. Trong tab **Build Triggers**:
   - ✅ **GitHub hook trigger for GITScm polling**
5. Trong tab **Pipeline**:
   - Definition: **Pipeline script from SCM**
   - SCM: **Git**
   - Repository URL: `https://github.com/recrhub/recruitify`
   - Branch: `*/main`
   - Script Path: `Jenkinsfile`
6. **Save**

---

## Kết quả: Pipeline hoàn chỉnh

Khi developer push code lên `main`, pipeline tự động chạy:

```
✅ Checkout        → Pull code thành công
✅ Dependencies    → Cài thư viện thành công
✅ Build & Test    → 50 tests passed, coverage 80%
✅ OWASP           → Không có CVE nghiêm trọng
✅ SonarQube       → Quality Gate PASSED (0 bugs, 2 smells, 80% coverage)
✅ Trivy FS        → Không có secrets bị lộ
✅ Docker Build    → Image built: recruitify-backend:15
✅ Trivy Image     → Không có CVE HIGH/CRITICAL
✅ Docker Push     → Image pushed to registry
```

Nếu bất kỳ stage nào **FAIL** → pipeline dừng lại → thông báo developer sửa.

---

## Tham khảo thêm

- [Jenkins Documentation](https://www.jenkins.io/doc/)
- [SonarQube Documentation](https://docs.sonarqube.org/)
- [OWASP Dependency-Check](https://owasp.org/www-project-dependency-check/)
- [Trivy Documentation](https://aquasecurity.github.io/trivy/)
