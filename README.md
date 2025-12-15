# SOSNot - Integrated Notarial Management Platform

## Overview
SOSNot is a microservices-based, cloud-native platform designed for Moroccan Notarial Offices. It integrates business logic (Deeds, Land Registry) with Accounting (Axelor) and Document Management (Nextcloud/MinIO).

## Architecture
- **Microservices**: Quarkus (Java)
- **Frontend**: Angular
- **Identity Provider**: Keycloak
- **Database**: PostgreSQL + PostGIS
- **Storage**: MinIO
- **Search**: Elasticsearch
- **Integration**: Axelor (ERP), Nextcloud (Collaborative Editing)

## Repository Structure
- `backend/`: Java Quarkus microservices
- `frontend/`: Angular Web Application
- `infrastructure/`: Docker & Deployment configurations
- `docs/`: Architectural documentation

## Prerequisites
- Java 17+
- Node.js 18+
- Docker & Docker Compose
- Maven 3.8+

## Quick Start
1. **Initialize Environment**:
   ```bash
   make init
   ```
2. **Start Infrastructure (DB, Keycloak, MinIO)**:
   ```bash
   make start-infra
   ```
3. **Start All Services**:
   ```bash
   make start-all
   ```

## Contributing
Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.
