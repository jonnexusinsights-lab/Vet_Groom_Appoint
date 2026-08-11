# REFACTORING

## Goal

Provide a safe and disciplined approach for improving code structure without altering intended behavior.

## Use when

- A module is hard to understand.
- Repetition makes bugs more likely.
- Domain logic is leaking into UI.
- A feature is blocked by poor internal structure.

## Refactoring principles

- Preserve behavior.
- Change one concern at a time.
- Add test coverage before major internal movement.
- Prefer local improvements over wide rewrites.
- Keep naming clearer after the change than before.

## Workflow

1. Identify the pain point.
2. Confirm expected behavior.
3. Protect with tests.
4. Refactor incrementally.
5. Re-run tests after each meaningful step.
6. Stop when clarity improves enough.

## Good candidates in this project

- Scheduling rule extraction.
- Appointment state transitions.
- Role-check duplication.
- Report query organization.
- Shared form validation patterns.
