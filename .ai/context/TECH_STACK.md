# TECH_STACK

## Stack objective

Use a permissive-license, web-first, maintainable stack that can be deployed commercially without avoidable legal risk.

## Preferred stack

### Frontend and app layer

- Next.js
- TypeScript
- Tailwind CSS
- Component system reviewed dependency-by-dependency

### Backend and application logic

- Next.js server capabilities or equivalent modular server layer
- Prisma ORM
- Auth.js or custom auth implementation using approved dependencies

### Database and storage

- PostgreSQL
- S3-compatible object storage for media and exports

### Delivery and operations

- Docker
- Managed PostgreSQL provider or self-hosted PostgreSQL
- Hosting on VPS, Railway, Render, AWS, or equivalent

## License policy

Allowed by default:

- MIT
- Apache 2.0
- BSD-style licenses
- PostgreSQL License
- ISC

Blocked unless explicitly approved:

- AGPL
- GPL
- SSPL
- RSAL
- Source-available licenses
- Restrictive commercial-use clauses

## Dependency guidance

- Prefer fewer dependencies.
- Prefer framework-native solutions first.
- Review transitive license risk for important additions.
- Avoid operationally heavy dependencies in the MVP.

## Current non-goals

- Native mobile stack for v1.
- Microservices.
- License-ambiguous queue/cache infrastructure.
- Hard dependency on third-party messaging platforms in core workflows.

## Future evaluation candidates

Evaluate separately and formally if ever needed:

- Official WhatsApp integration
- Electronic invoicing providers
- Queue/caching technology
- Workflow automation platforms
