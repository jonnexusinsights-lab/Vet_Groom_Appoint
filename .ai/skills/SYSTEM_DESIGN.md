# SYSTEM_DESIGN

## Goal

Provide a structured process for designing features, modules, or system changes that fit the repository architecture.

## Use when

- Designing a new module.
- Evaluating a major feature.
- Comparing implementation approaches.
- Defining data flow and service boundaries.

## Workflow

1. Define the business objective.
2. Define primary users and actors.
3. Identify domain entities and rules.
4. Map module boundaries.
5. Define data flow and mutation paths.
6. Identify permission and audit implications.
7. Identify integration and dependency implications.
8. Compare 1 to 3 viable approaches.
9. Recommend one option with trade-offs.
10. Define next implementation steps.

## Output checklist

- Problem statement.
- Constraints.
- Proposed architecture shape.
- Entities/modules affected.
- Risks and trade-offs.
- Recommendation.
- Follow-up tasks.

## Project-specific reminders

- Keep the MVP web-first.
- Avoid external dependencies for critical workflows unless justified.
- Isolate scheduling rules into dedicated services.
- Treat legal/license review as part of design.
