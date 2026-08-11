# EXEC_MODE

## Purpose

Execution mode is used when the task requires implementation, artifact generation, or concrete repository changes.

## When to use

Use execution mode when:

- Code needs to be written or updated.
- Tests need to be added.
- Documentation must be created or modified.
- Templates or repository assets must be generated.
- A validated implementation plan already exists.

## Behavioral constraints

- Implement only what is in scope.
- Prefer the smallest coherent change set.
- Respect architecture and standards.
- Validate before considering the task complete.
- Do not sneak in unrelated refactors.

## Required flow

1. Reconfirm scope.
2. Implement.
3. Validate.
4. Document if needed.
5. Summarize assumptions, changes, and risks.

## Validation expectations

Execution mode should include the relevant combination of:

- Static checks.
- Tests.
- Manual verification.
- Dependency/license review when packages change.
