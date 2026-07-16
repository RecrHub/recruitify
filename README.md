# Recruitify

Recruitify is a recruitment platform that connects job seekers with employers. The project provides job discovery and application experiences for candidates, recruitment management tools for employers, administration features, and an experimental AI module for job-market analysis.

[![Deploy Backend to Azure VM](https://github.com/RecrHub/recruitify/actions/workflows/deploy-backend.yml/badge.svg)](https://github.com/RecrHub/recruitify/actions/workflows/deploy-backend.yml)

## Main features

- Candidate registration, authentication, profile, job search, favorites, and application history
- Employer dashboard, job management, candidate management, and interview management
- Administrative account, role, company, and job management
- JWT-based authentication and role-based authorization
- REST API documentation with OpenAPI and Swagger UI
- Email and ImageKit integrations
- Experimental AI job-quality and market-analysis module using Gemini, embeddings, and ChromaDB
- CI quality gates with Jenkins, JaCoCo, Jest, SonarQube, and GitHub Actions
- Azure infrastructure provisioning and backend deployment with Terraform

## Technologies and frameworks

### Frontend

- Next.js 16 and React 19
- TypeScript
- Ant Design and Ant Design Pro Components
- Zustand, Axios, Zod, and Yup
- Jest and Testing Library

### Backend

- Java 17
- Spring Boot 3.2
- Spring Security and JWT
- Spring Data JPA and PostgreSQL
- MapStruct and Lombok
- Springdoc OpenAPI
- JUnit, Testcontainers, and JaCoCo
- Gradle

### AI service

- Python
- FastAPI foundation
- LangChain and Google Gemini
- Sentence Transformers
- ChromaDB
- Pandas and Pytest

### DevOps and infrastructure

- Docker Compose
- Jenkins and SonarQube
- GitHub Actions
- Terraform and Microsoft Azure

## Architecture

```text
┌──────────────────────┐
│ Next.js frontend     │
│ http://localhost:3000│
└──────────┬───────────┘
           │ REST / JSON
           ▼
┌──────────────────────┐       ┌──────────────────────┐
│ Spring Boot backend  │──────▶│ External services    │
│ http://localhost:8080│       │ Mail and ImageKit    │
└──────────┬───────────┘       └──────────────────────┘
           │ JPA
           ▼
┌──────────────────────┐
│ PostgreSQL 17        │
│ localhost:5433       │
└──────────────────────┘

┌──────────────────────┐
│ Experimental AI      │
│ Gemini + ChromaDB    │
└──────────────────────┘
```

> The AI module is currently experimental and is not yet wired into the root Docker Compose stack.

## Project structure

```text
recruitify/
├── frontend/                 # Next.js web application
├── backend/web-api/          # Spring Boot REST API
├── ai-service/               # AI experiments and vector index scripts
├── infrastructure/terraform/ # Azure infrastructure as code
├── docker-compose.yml        # Local PostgreSQL, Jenkins, and SonarQube
├── Jenkinsfile               # CI pipeline
└── sonar-project.properties  # SonarQube configuration
```

## Getting started

### Prerequisites

Install the following tools before running the project:

- Git
- Docker Desktop with Docker Compose
- Java 17
- Node.js 20.9 or later and npm
- Python 3.10 or later (only when working on the AI module)

### 1. Clone the repository

```bash
git clone https://github.com/RecrHub/recruitify.git
cd recruitify
```

### 2. Start local infrastructure

Start PostgreSQL only:

```bash
docker compose up -d postgres-db
```

To also run the local CI and code-quality tools:

```bash
docker compose up -d
```

The root Compose file exposes:

| Service | URL / connection |
| --- | --- |
| PostgreSQL | `localhost:5433` |
| Jenkins | http://localhost:8080 |
| SonarQube | http://localhost:9000 |

> Jenkins and the backend both use port `8080`. Stop the Jenkins container before starting the backend locally, or change one of the port mappings.

### 3. Configure and run the backend

Create the backend environment file:

```bash
cd backend/web-api
cp .env.example .env
```

For the PostgreSQL container from the previous step, use these database settings in `.env`:

```dotenv
DB_URL=jdbc:postgresql://localhost:5433/recruitify
DB_USERNAME=recruitify
DB_PASSWORD=<password-from-docker-compose.yml>
JWT_SECRET=<a-strong-base64-encoded-secret>
```

Mail and ImageKit variables are also available in `.env.example`. Configure them when testing features that depend on those services.

Run the API:

```bash
# Linux or macOS
./gradlew bootRun

# Windows
gradlew.bat bootRun
```

Backend endpoints:

- API base URL: http://localhost:8080
- Swagger UI: http://localhost:8080/swagger-ui
- OpenAPI document: http://localhost:8080/api-docs
- Health check: http://localhost:8080/actuator/health

### 4. Configure and run the frontend

Open another terminal from the repository root:

```bash
cd frontend
npm ci
```

Create or update `frontend/.env`:

```dotenv
NEXT_PUBLIC_API_URL=http://localhost:8080
```

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### 5. Set up the AI module (optional)

The AI module currently contains schemas, configuration, data-cleaning scripts, and ChromaDB index-building scripts. To prepare its environment:

```bash
cd ai-service
python -m venv venv

# Linux or macOS
source venv/bin/activate

# Windows PowerShell
venv\Scripts\Activate.ps1

pip install -r requirements.txt
cp .env-example .env
```

Set `GOOGLE_API_KEY` in `ai-service/.env`. A source dataset is required at `app/data/raw/job_postings.csv` before running:

```bash
python -m app.scripts.clean_data
python -m app.scripts.build_index
```

## Testing and quality checks

### Backend

```bash
cd backend/web-api
./gradlew clean test jacocoTestReport
```

On Windows, replace `./gradlew` with `gradlew.bat`.

### Frontend

```bash
cd frontend
npm run lint
npm test
npm run build
```

The Jenkins pipeline builds and tests the backend, publishes JaCoCo results, lints and tests the frontend, creates the production frontend build, and enforces SonarQube quality gates.

## Deployment to Azure

Terraform provisions the development environment on Azure, including networking, an Ubuntu VM, Docker, the Spring Boot backend, and PostgreSQL. Detailed instructions are available in [`infrastructure/terraform/README.md`](infrastructure/terraform/README.md).

Quick start:

```bash
cd infrastructure/terraform
cp enviroiments/dev/terraform.tfvars.example enviroiments/dev/terraform.tfvars
make init
make plan
make apply
make output
```

The backend deployment workflow runs for backend changes pushed to the `develop` branch. It builds and tests the application before deploying it to the configured Azure VM.

> Never commit `.env`, `terraform.tfvars`, Terraform state, private keys, or service credentials.

## Contributing

1. Fork the repository.
2. Create a feature branch from the appropriate base branch.
3. Make your changes and add or update tests.
4. Run the relevant checks locally.
5. Open a pull request with a clear description of the change.

Bug reports, feature proposals, and documentation improvements are welcome through GitHub Issues and pull requests.
