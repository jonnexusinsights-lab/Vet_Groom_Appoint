# TDD_WORKFLOW

## Goal

Provide a test-driven workflow for implementing or changing behavior with confidence.

## Use when

- Building new domain rules.
- Fixing regressions.
- Implementing critical workflows.
- Changing scheduling, payments, or permissions behavior.

## Workflow

1. State the behavior to be achieved.
2. Define acceptance examples.
3. Write or update a failing test.
4. Implement the minimal change to pass.
5. Refactor without changing behavior.
6. Re-run relevant tests.
7. Document any assumptions.

## Best-fit areas in this project

- Appointment duration rules.
- Capacity enforcement.
- Cancellation policies.
- Recurring appointment generation.
- Permission checks.
- Payment state transitions.

## Output expectations

- Test names reflect business behavior.
- Tests are deterministic.
- Edge cases are represented.
- Regression coverage exists for bug fixes.
