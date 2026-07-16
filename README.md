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

![Recruitify - local development architecture](https://raw.githubusercontent.com/RecrHub/recruitify/refs/heads/develop/recrutifiy-architecture-local.png)

> The AI module is currently experimental and is not yet wired into the root Docker Compose stack.

## Business workflows

### Job seeker flow

```text
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Visit Recruitify│───▶│ Search and      │───▶│ View job and    │
│ homepage        │    │ filter jobs     │    │ company details │
└─────────────────┘    └────────┬────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐    ┌─────────────────┐
                       │ Register or     │───▶│ Manage profile, │
                       │ sign in         │    │ education and   │
                       └─────────────────┘    │ work experience │
                                              └─────────────────┘
```

### Employer flow

```text
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ HR signs in     │───▶│ API returns JWT│───▶│ Create and      │
│ with HR account │    │ and permissions │    │ manage own jobs │
└─────────────────┘    └─────────────────┘    └────────┬────────┘
                                                       │
                         ┌─────────────────┐            ▼
                         │ Review AI job   │◀───│ Analyze job    │
                         │ recommendations │    │ description    │
                         └─────────────────┘    └─────────────────┘
```

### Administrator flow

```text
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Admin signs in  │───▶│ Role and        │───▶│ Manage HR       │
│                 │    │ permission check│    │ accounts        │
└─────────────────┘    └────────┬────────┘    └─────────────────┘
                                │
                ┌───────────────┼───────────────┐
                ▼               ▼               ▼
       ┌─────────────────┐ ┌──────────────┐ ┌─────────────────┐
       │ Manage roles and│ │ Manage jobs  │ │ Manage companies│
       │ permissions     │ │              │ │ and images      │
       └─────────────────┘ └──────────────┘ └─────────────────┘
```

### Authenticated API request flow

```text
┌────────┐  credentials  ┌──────────────┐  access + refresh  ┌────────┐
│ Client │──────────────▶│ Login API    │───────────────────▶│ Client │
└────────┘               └──────────────┘                    └───┬────┘
                                                               │
                                      Authorization: Bearer JWT│
                                                               ▼
┌──────────┐  query / command  ┌───────────────────┐  verify  ┌────────────┐
│ Database │◀──────────────────│ Protected endpoint│◀─────────│ JWT filter │
└────┬─────┘                   └─────────┬─────────┘          └────────────┘
     │                                   │
     └──────────────────────────────────▶│ JSON response
                                         ▼
                                      ┌────────┐
                                      │ Client │
                                      └────────┘
```

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

## API documentation

The backend exposes a versioned REST API under `/api/v1`. When the backend is running locally, use the following documentation endpoints:

- Interactive Swagger UI: http://localhost:8080/swagger-ui
- OpenAPI JSON: http://localhost:8080/api-docs
- API base URL: `http://localhost:8080/api/v1`

Swagger UI is the source of truth for complete request schemas, validation constraints, response models, and the currently available operations.

### Authentication

Recruitify uses stateless JWT authentication. Send the access token on protected requests:

```http
Authorization: Bearer <access-token>
Content-Type: application/json
```

There are separate login endpoints for each account type. Calling an endpoint with the wrong role is rejected.

| Method | Endpoint | Authentication | Description |
| --- | --- | --- | --- |
| `POST` | `/api/v1/auth/register` | Public | Register a job-seeker account |
| `POST` | `/api/v1/auth/login` | Public | Sign in as a job seeker |
| `POST` | `/api/v1/hr/auth/login` | Public | Sign in as HR/employer |
| `POST` | `/api/v1/admin/auth/login` | Public | Sign in as administrator |
| `POST` | `/api/v1/token/refresh` | JWT | Rotate a refresh token and obtain a new token pair |

Example login request:

```bash
curl -X POST http://localhost:8080/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"your-password"}'
```

Example authentication response:

```json
{
  "accessToken": "<jwt-access-token>",
  "refreshToken": "<refresh-token>",
  "tokenType": "Bearer",
  "id": 1,
  "email": "user@example.com",
  "role": "ROLE_JOBSEEKER"
}
```

To call protected APIs from Swagger UI, select **Authorize** and enter the access token in the Bearer authentication field.

### Public APIs

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/v1/homepage` | Return featured jobs, categories, and homepage statistics |
| `GET` | `/api/v1/find-job` | Search and paginate jobs |
| `GET` | `/api/v1/find-job/filters` | Return available job-search filters |
| `GET` | `/api/v1/companies/{id}` | Return company details |
| `GET` | `/actuator/health` | Return backend health status |

Job search supports `keyword`, `categoryId`, `provinceId`, `employmentType`, `workApproach`, `experienceLevel`, `salaryMin`, `salaryMax`, `page`, `size`, and `sort` query parameters. Pagination starts at page `0`; the default size is `10` and the default sort is `postedAt,desc`.

Example:

```bash
curl "http://localhost:8080/api/v1/find-job?keyword=java&experienceLevel=JUNIOR&page=0&size=10"
```

### Job-seeker profile APIs

All profile endpoints require a valid JWT.

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/v1/profiles/{accountId}` | Get an account profile |
| `PUT` | `/api/v1/profiles/{accountId}` | Update an account profile |
| `GET`, `POST` | `/api/v1/profiles/{accountId}/work-experiences` | List or add work experience |
| `PUT`, `DELETE` | `/api/v1/profiles/{accountId}/work-experiences/{id}` | Update or remove work experience |
| `GET`, `POST` | `/api/v1/profiles/{accountId}/educations` | List or add education |
| `PUT`, `DELETE` | `/api/v1/profiles/{accountId}/educations/{id}` | Update or remove education |
| `GET` | `/api/v1/profiles/provinces` | List provinces |

### HR job-management APIs

These endpoints require an HR JWT and the corresponding `JOB_*` permission. Every operation is scoped to jobs owned by the authenticated HR account.

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/v1/hr/jobs` | List the current HR user's jobs |
| `POST` | `/api/v1/hr/jobs` | Create a job |
| `GET` | `/api/v1/hr/jobs/{id}` | Get one owned job |
| `PATCH` | `/api/v1/hr/jobs/{id}` | Update one owned job |
| `DELETE` | `/api/v1/hr/jobs/{id}` | Soft-delete one owned job |
| `POST` | `/api/v1/hr/jobs/{id}/analyze` | Analyze a job using the external AI service |

The list endpoint supports `keyword`, `status`, `page`, and `size`. Supported status values are `ACTIVE`, `DRAFT`, and `CLOSED`.

### Administration APIs

Administration endpoints require an administrator JWT and the permission shown by the API's `@PreAuthorize` rule.

| Area | Methods and endpoints | Required permission |
| --- | --- | --- |
| HR accounts | `POST /api/v1/admin/accounts/hr` | `ACCOUNT_CREATE_HR` |
| Roles | `GET /api/v1/admin/roles` | `ROLE_MANAGE` |
| Permissions | `GET /api/v1/admin/roles/permissions` | `ROLE_MANAGE` |
| Role details | `GET /api/v1/admin/roles/{roleId}` | `ROLE_MANAGE` |
| Role permissions | `PUT /api/v1/admin/roles/{roleId}/permissions` | `ROLE_MANAGE` |
| Jobs | `GET`, `POST /api/v1/jobs` | Corresponding `JOB_*` permission |
| Job details | `GET`, `PATCH`, `DELETE /api/v1/jobs/{id}` | Corresponding `JOB_*` permission |
| Companies | `GET /api/v1/companies/all` | `COMPANY_VIEW` |
| Companies | `POST /api/v1/companies` | `COMPANY_CREATE` |
| Companies | `PATCH /api/v1/companies/{id}` | `COMPANY_UPDATE` |
| Companies | `DELETE /api/v1/companies/{id}` | `COMPANY_DELETE` |

Company create and update requests use `multipart/form-data` with a required JSON `request` part and an optional `image` file.

### Standard response envelope

Most management endpoints return a common response structure:

```json
{
  "timestamp": "2026-07-16T10:30:00",
  "status": 200,
  "message": "Operation successful",
  "data": {}
}
```

For failed management requests, `data` is omitted and an `errors` field may contain validation details.

Common HTTP status codes:

| Status | Meaning |
| --- | --- |
| `200 OK` | Request completed successfully |
| `201 Created` | Resource created successfully |
| `400 Bad Request` | Validation failed or request data is invalid |
| `401 Unauthorized` | Credentials are invalid |
| `403 Forbidden` | JWT is missing/invalid or the account lacks permission |
| `404 Not Found` | Requested resource does not exist |
| `500 Internal Server Error` | Unexpected server error |

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
