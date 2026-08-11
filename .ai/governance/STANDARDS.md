# STANDARDS.md

## Purpose

This document defines the engineering quality bar for all work in the repository.

## General engineering rules

- Favor simple, explicit implementations.
- Prefer cohesive modules over generic utility sprawl.
- Keep business logic out of UI components.
- Write code for maintainers first.
- Use descriptive names.
- Avoid premature abstraction.

## Language and framework defaults

- TypeScript everywhere practical.
- Strict typing enabled.
- Validate external input at system boundaries.
- Prefer server-side actions/services for business mutations.

## Code organization

- One module owns one business area.
- Shared utilities must be truly shared.
- Domain services should encapsulate business rules.
- Repositories/data access should be separated from orchestration logic.
- UI components should remain presentation-focused.

## Naming conventions

- Files: kebab-case where framework allows.
- Components: PascalCase.
- Types/interfaces/classes: PascalCase.
- Variables/functions: camelCase.
- Constants: UPPER_SNAKE_CASE only for true constants.
- Database entities should use consistent singular naming.

## Testing expectations

Minimum expectations:

- Unit tests for domain rules.
- Integration tests for API/application flows.
- Smoke coverage for critical user paths.

Critical areas that require tests:

- Scheduling duration logic.
- Capacity validation.
- Cancellation and no-show policies.
- Role-based access control.
- Payment recording.
- Export generation.

## Quality gates

Every change should pass:

- Linting.
- Type checking.
- Automated tests relevant to the scope.
- Basic manual validation for user-facing flows.

No pull request should be merged if:

- It introduces known type errors.
- It skips tests without reason.
- It changes behavior without documentation where needed.
- It adds a dependency without license review.

## Documentation expectations

Documentation updates are required when changes affect:

- Setup or environments.
- Business flows.
- API contracts.
- Data models.
- Architecture.
- Dependency policy.

## Dependency standards

Default allowed licenses:

- MIT
- Apache 2.0
- BSD
- ISC
- PostgreSQL License

Blocked unless explicitly approved:

- AGPL
- GPL
- SSPL
- RSAL
- Custom source-available licenses

For every new dependency:

- Confirm the package license.
- Confirm transitive risk when relevant.
- Document why the package is needed.
- Prefer fewer dependencies when native framework capabilities are enough.

## Security standards

- Validate and sanitize all external input.
- Enforce authorization in server-side boundaries.
- Do not trust client role checks.
- Avoid leaking sensitive pet or client information.
- Protect financial data pathways.
- Log critical mutations with actor and timestamp.

## Database standards

- Use migrations for schema changes.
- Never edit production data manually without an explicit operational path.
- Use foreign keys and constraints.
- Prefer explicit enums or reference tables for status-driven workflows.
- Design for auditability.

## UI standards

- Responsive by default.
- Accessible forms and interactive elements.
- Clear status representation.
- Fast paths for reception/front-desk workflows.
- Avoid clutter in scheduling screens.

## Pull request standards

Each PR should:

- Solve one coherent problem.
- Reference a task or issue.
- Explain user/business impact.
- Include validation evidence.
- Note assumptions and follow-ups.

## Commenting standards

- Comment the why, not the obvious what.
- Remove stale comments.
- Use ADRs for structural decisions rather than large code comments.

## Logging and observability

- Log key errors with enough context for diagnosis.
- Avoid noisy logs.
- Use structured logging where possible.
- Make job failures visible and actionable.

## AI and prompt engineering standards

- **Prompt Location**: Keep prompts, agent behavioral guidelines, and memory templates in the `.ai/` directory.
- **Predictable Design**: Define inputs, outputs, schemas, and formats clearly. Use examples (few-shot prompting) where deterministic outputs are required.
- **API and Key Security**: Never hardcode API keys or credentials in prompts or code. Use environment variables.
- **Privacy and PII**: Sanitize and scrub PII, sensitive customer/pet notes, and payment records before forwarding to third-party LLM APIs.
- **Model Parameters**: Explicitly define parameter configurations (e.g. `temperature=0` for structured/coding tasks, low values for deterministic behavior) in configuration files.
- **LLM Error Handling**: Ensure applications handle API timeouts, rate limiting, and raw model output parser failures gracefully.
