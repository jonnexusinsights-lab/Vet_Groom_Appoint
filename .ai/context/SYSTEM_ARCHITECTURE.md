# SYSTEM_ARCHITECTURE

## Target architecture

The preferred architecture is a **modular monolith** optimized for fast MVP delivery, low operational complexity, and future extensibility.

## Architecture goals

- Ship quickly without sacrificing maintainability.
- Keep business rules centralized and testable.
- Minimize deployment and infrastructure complexity.
- Avoid premature service decomposition.
- Preserve clean extension points for phase 2 features.

## Core architectural style

### Application layer

A single web application provides:

- User-facing responsive UI.
- Server-side actions or APIs.
- Authentication and authorization boundaries.
- Domain/application services.
- Report/export generation.

### Data layer

PostgreSQL is the system of record.

It should store operational entities, relationships, audit records, and business history relevant to appointments, pets, customers, and payments.

### Storage layer

Object storage should hold pet photos and generated exports when needed.

### Job handling

Prefer simple database-backed jobs or framework-native scheduled processing before introducing separate queue infrastructure.

## Logical modules

- Auth and access control
- Customers
- Pets
- Services
- Scheduling
- Appointments
- Payments
- Reporting
- Administration
- Jobs/notifications

## Architectural boundaries

### UI

UI components are responsible for presentation and user interaction only.

They must not contain business policy logic.

### Domain/application services

Domain services own rules such as:

- Availability calculation
- Duration calculation
- Capacity validation
- Appointment policy enforcement
- Waitlist decisions
- Recurrence generation

### Persistence

Persistence code should focus on data access and transaction coordination, not business decision-making.

## Extension strategy

Future phase 2 capabilities should plug into the existing architecture through clear module boundaries, including:

- Customer booking
- Official WhatsApp integration
- Electronic invoicing
- Inventory
- Loyalty

## Operational principles

- Use one deployable app unless business complexity clearly justifies more.
- Optimize for observability around scheduling, payments, and background jobs.
- Keep infrastructure replaceable and hosting-agnostic where practical.
- Keep critical operations functioning even if optional integrations are unavailable.
