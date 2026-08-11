# WORKFLOWS.md

## Purpose

This document defines how humans and agents should execute work from idea to merge.

## Standard task flow

### 1. Understand the request

Before coding:

- Identify the business goal.
- Identify the affected module(s).
- Check if the task belongs to MVP or phase 2.
- Review architecture and standards.
- Confirm whether any ambiguity requires clarification.

### 2. Shape the task

Create or update a task spec using `TASK_TEMPLATE.md`.

The task should define:

- Problem.
- Scope.
- Business rules.
- Acceptance criteria.
- Risks.
- Out-of-scope items.

### 3. Plan implementation

Plan the minimal complete change set:

- Data changes.
- API changes.
- UI changes.
- Auth/permission impact.
- Test changes.
- Documentation changes.
- Dependency/license impact.

### 4. Implement

Implementation order should usually be:

1. Domain/data changes.
2. Application/service logic.
3. API/server actions.
4. UI integration.
5. Tests.
6. Documentation.

### 5. Validate

Run and review:

- Lint.
- Typecheck.
- Tests.
- Manual flow validation for affected screens.
- License review for new packages.

### 6. Submit

Open a pull request using `PR_TEMPLATE.md`.

## Git workflow

### Branch naming

Use one of these patterns:

- `feature/<short-name>`
- `fix/<short-name>`
- `chore/<short-name>`
- `docs/<short-name>`
- `refactor/<short-name>`

Examples:

- `feature/pet-profile-history`
- `fix/appointment-capacity-check`
- `docs/setup-context-files`

### Commit style

Preferred commit style:

- `feat: add recurring appointment service`
- `fix: prevent overbooking on blocked slots`
- `docs: update dependency policy`
- `refactor: extract appointment policy service`
- `test: add coverage for cancellation rules`

## Task workflow for agents

For every implementation task, agents should produce:

1. Short task understanding.
2. Assumptions.
3. Proposed change scope.
4. Implementation.
5. Validation summary.
6. Risks/follow-up.

## Workflow for architectural changes

Use an ADR when:

- A new infrastructure component is introduced.
- The app structure changes meaningfully.
- The authentication approach changes.
- The deployment model changes.
- A package with non-trivial operational or legal implications is added.

Create the ADR before or together with the implementation.

## Workflow for schema changes

For any schema change:

- Define the business reason.
- Create migration.
- Review backward-compatibility impact.
- Update entity documentation if needed.
- Add or update tests.

Avoid destructive changes unless fully justified.

## Workflow for new dependencies

Before adding a dependency:

1. Check whether the framework or current codebase already solves the need.
2. Verify the package license.
3. Confirm maintenance health.
4. Confirm the package is actually needed.
5. Document the reason in the PR.

## Workflow for AI integrations and prompts

For tasks modifying system prompts, templates, or AI integrations:

1. **Safety Review**: Perform a security review to ensure user-supplied data cannot manipulate instructions (prompt injection) and PII is not leaked.
2. **Gold Standards**: Write a small test set (e.g., 3-5 sample inputs and expected outputs) to verify prompt behavior.
3. **Structured Mocks**: Create/update mocks for the external AI responses to keep unit and integration tests fast and deterministic.
4. **Error Boundaries**: Implement robust error checking for LLM API timeouts, JSON parsing errors, or non-conforming model output.

## Release readiness checklist

Before merging user-facing features:

- Acceptance criteria met.
- No open critical defects in the changed area.
- Tests pass.
- Docs updated.
- No prohibited licenses introduced.
- No hidden phase 2 scope leaked into MVP.

## Suggested cadence

- Small tasks over large drops.
- Frequent integration.
- Early validation with business stakeholders.
- Preserve backlog discipline.
