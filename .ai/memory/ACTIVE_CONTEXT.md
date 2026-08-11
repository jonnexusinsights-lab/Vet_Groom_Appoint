# ACTIVE_CONTEXT

## Purpose

This file is the working memory scratchpad for the current repository state.

It should be updated at the end of meaningful sessions so the next agent or human collaborator can resume with minimal friction.

## Current project state

The repository context system has been initialized.

The project currently has:

- Global orchestration file (`AGENTS.md`) with a registered `AI_ENGINEER` role.
- Role, mode, and skill operating files, including the new `AI_ENGINEER.md`.
- Domain, architecture, data, and stack context files.
- Governance files incorporating AI standards and safety rules.
- Prompt templates.
- Initial ADR for authentication direction.

## Current product direction

- Project type: responsive web MVP.
- Domain: pet grooming scheduling and operations.
- Architecture direction: modular monolith.
- Stack direction: permissive-license stack centered on Next.js, TypeScript, PostgreSQL, Prisma, Tailwind, and Docker.
- Phase 2 integrations remain intentionally deferred.

## Current open items

- Final service catalog definition.
- Duration and capacity rules.
- Cancellation/no-show policy.
- Final auth library choice.
- Detailed data schema.
- Prioritized backlog and first implementation slice.

## Recommended next steps

1. Create a prioritized backlog for MVP.
2. Define the first vertical slice, likely auth + customers + pets.
3. Confirm detailed business rules for scheduling.
4. Draft additional ADRs for data modeling and scheduling strategy.
5. Create repository bootstrap structure.

## Recent changes

- Added `AI_ENGINEER` role to orchestration rules.
- Created `AI_ENGINEER.md` specifying role authority and mindset.
- Added AI-specific standards to `STANDARDS.md` and safety/mocking rules to `TOOLING_RULES.md`.
- Added prompt-engineering workflows to `WORKFLOWS.md`.
- Corrected typo under `### Appointment` model definition in `DATA_MODELS.md`.
- Configured Git remote origin pointing to `https://github.com/jonnexusinsights-lab/Vet_Groom_Appoint.git`.
- Created repository configuration files (`.gitignore`, `.env.example`, `.gitattributes`) in the root directory.

## Session notes protocol

When updating this file, include:

- What changed.
- What remains open.
- Risks discovered.
- Recommended next action.
