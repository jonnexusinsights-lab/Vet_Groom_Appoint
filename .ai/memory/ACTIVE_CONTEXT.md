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
- High-fidelity interactive glassmorphic browser mockup in `/mockup/` for client presentation.

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
- Developed an interactive HTML/CSS/JS client-side mockup in the `/mockup` folder with LocalStorage persistence and automated duration calculation formulas.
- Refactored client-side mockup to a fresh, light SaaS theme (Teal/Sky Blue) using open-source CDNs (Lucide Icons, Chart.js) for premium aesthetics and interactive reports.
- Consolidated commercial proposals into a single, non-technical document (`proposal/fashion_pets_proposal.md`) representing an $1,800 USD total budget, a 90-day warranty, and 1-month free basic support onboarding at a 1 USD = 440 CRC rate.
- Developed a sales presentation slide deck (`proposal/sales_presentation.md`) embedding mockup screenshot assets from the local image resources folder.
- Created `utils/generate_slides.js` and compiled a self-contained, browser-ready interactive slide presentation `proposal/sales_presentation.html` featuring split column layouts (Text + Screenshot image), keyboard controls, progress indicators, and responsive canvas sizing.
- Created `utils/generate_proposal_pdf.js` and compiled a printable HTML proposal `proposal/fashion_pets_proposal.html` styled with `@media print` for high-resolution browser-to-PDF export, featuring a cover page and signature grids.
- Initialized the `/docs/` folder containing `user_guide.md`, `how_to.md`, and `troubleshooting.md` to guide operations, daily actions, and local network setups.

## Session notes protocol

When updating this file, include:

- What changed.
- What remains open.
- Risks discovered.
- Recommended next action.
