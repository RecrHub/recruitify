pipeline {
    agent any

    tools {
        jdk 'JDK17'
        nodejs 'NodeJS20'
    }

    environment {
        SONAR_HOST_URL = 'http://sonarqube:9000'
        BACKEND_DIR    = 'backend/web-api'
        FRONTEND_DIR   = 'frontend'
    }

    stages {

        // BACKEND

        stage('Backend - Build & Test') {
            steps {
                dir("${BACKEND_DIR}") {
                    bat 'gradlew.bat clean build'
                }
            }
            post {
                always {
                    junit "${BACKEND_DIR}/build/test-results/test/*.xml"
                    jacoco execPattern: "${BACKEND_DIR}/build/jacoco/test.exec"
                }
            }
        }

        stage('Backend - SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    dir("${BACKEND_DIR}") {
                        bat "gradlew.bat sonar -Dsonar.host.url=${SONAR_HOST_URL}"
                    }
                }
            }
        }

        // FRONTEND

        stage('Frontend - Install') {
            steps {
                dir("${FRONTEND_DIR}") {
                    bat 'npm ci'
                }
            }
        }

        stage('Frontend - Lint') {
            steps {
                dir("${FRONTEND_DIR}") {
                    bat 'npm run lint'
                }
            }
        }

        stage('Frontend - Test') {
            steps {
                dir("${FRONTEND_DIR}") {
                    bat 'npm run test -- --ci --coverage'
                }
            }
            post {
                always {
                    publishHTML(target: [
                        reportDir:   "${FRONTEND_DIR}/coverage/lcov-report",
                        reportFiles: 'index.html',
                        reportName:  'Frontend Coverage'
                    ])
                }
            }
        }

        stage('Frontend - Build') {
            steps {
                dir("${FRONTEND_DIR}") {
                    bat 'npm run build'
                }
            }
        }

        stage('Frontend - SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    dir("${FRONTEND_DIR}") {
                        bat "sonar-scanner -Dsonar.host.url=${SONAR_HOST_URL} -Dsonar.projectKey=recruitify-frontend -Dsonar.sources=src -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info"
                    }
                }
            }
        }

        //QUALITY GATE

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
        always {
            cleanWs()
        }
    }
}
