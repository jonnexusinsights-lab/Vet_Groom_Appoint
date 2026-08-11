# Fashion Pets PZ - AI-Agent Project Context

This repository supports the delivery of **Fashion Pets PZ**, a custom digital scheduling and operations platform for a canine and feline grooming business.

It is designed for both humans and AI coding agents to work from the same source of truth.

## Product goal

Build a responsive web-based management system that replaces the manual appointment book and supports the daily workflow of a pet grooming operation.

## MVP scope

The first release should focus on:

- Customers and multiple pets per customer.
- Pet profiles with notes, allergies, photos, and service history.
- Smart scheduling with variable appointment duration.
- Staff availability, schedule blocking, and capacity control.
- Appointment lifecycle statuses.
- Deposits, cancellations, and no-show tracking.
- Payment records and basic financial reporting.
- Role-based access.
- Backup and export capabilities.
- Mobile and desktop usability.

## Repository purpose

This repository contains:

- Product context.
- Architecture decisions.
- Engineering standards.
- Agent operating rules.
- Workflow definitions.
- Reusable templates for tasks, ADRs, and pull requests.

## Delivery philosophy

The project should be built as a **responsive web MVP first**, with optional future expansion to online customer booking, WhatsApp official integration, electronic invoicing, inventory, loyalty, and client mobile features.

The preferred implementation strategy is iterative delivery with small, testable increments and low legal risk in dependencies.

## License and dependency policy

This project should prioritize a permissive-license stack only.

Allowed by default:

- MIT
- Apache 2.0
- BSD-style licenses
- PostgreSQL License
- ISC

Not allowed without explicit architectural approval:

- AGPL
- GPL
- LGPL in core runtime paths
- SSPL
- RSAL
- Source-available or custom commercial-restriction licenses

## Recommended base stack

Primary stack for MVP:

- Next.js
- TypeScript
- Tailwind CSS
- PostgreSQL
- Prisma ORM
- Auth.js or equivalent permissive-license auth approach
- Docker

Avoid for now unless explicitly reviewed:

- Redis-based designs
- License-ambiguous workflow automation tools in core runtime
- Native mobile app as part of MVP

## How to use this repo

1. Start in `AGENTS.md` for execution rules.
2. Read `.github/ARCHITECTURE.md` before creating or changing modules.
3. Follow `.github/STANDARDS.md` for code, testing, and quality gates.
4. Use `.github/WORKFLOWS.md` for task execution and branch/PR flow.
5. Use the templates in `.github/TEMPLATES/` for formal outputs.

## Expected outcomes

This context system should help both human contributors and AI agents produce:

- Faster onboarding.
- More consistent implementation decisions.
- Lower architectural drift.
- Better documentation hygiene.
- Safer dependency choices.
- Higher delivery predictability.
