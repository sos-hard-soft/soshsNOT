# SOSNot - Sovereign Notarial Cloud

## Project Charter
SOSNot is a sovereign, cloud-native SaaS ERP dedicated to the modernization of Moroccan Notarial Offices. It bridges the gap between strict legal compliance (Moroccan Law 32.09) and modern digital agility.

## Technical Stack & Architecture

### Core Infrastructure
- **Architecture**: Event-Driven Microservices
- **Runtime**: Quarkus (Java 21+)
- **Communication**: REST (Synchronous), Redis Streams/Kafka (Asynchronous)

### Frontend Ecosystem
- **Web (Desktop/Staff)**: Angular v17+ + PrimeNG
- **Mobile (Client/Clerk)**: Flutter (Dart)

### Data & Storage
- **Relational DB**: PostgreSQL 16
- **Spatial DB**: PostGIS
- **Object Storage**: MinIO (with Object Locking/WORM)
- **Search**: Elasticsearch
- **Collaboration**: Nextcloud Integration

### External Integrations
- **ERP/Accounting**: Axelor Open Suite (Headless)
- **Identity**: Keycloak (SSO, 2FA, Multi-tenancy)

### Digital Signature
- **Strategy**: Local Agent pattern (Java/Electron) for USB Token access (Gemalto/Safenet).

## Microservices
| Service | Responsibility |
|---------|----------------|
| `sn-gateway` | API Gateway + Auth routing |
| `sn-registry` | Core Business (Deeds, Property, Parties) |
| `sn-finance` | Billing, Taxes, Axelor Bridge |
| `sn-gis` | Land mapping, Google Maps overlay |
| `sn-dms` | Document Management, Nextcloud Link |
| `sn-ocr` | OCR Worker (Tesseract) |
| `sn-signer` | PDF Stamping, Token access |

## Repository Structure
- `backend/`: Java Quarkus microservices
- `frontend/`: Angular Web Application & Flutter Mobile App
- `infrastructure/`: Docker & Deployment configurations

## Getting Started
See `Makefile` for available commands.
