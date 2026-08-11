# AGENTS.md

## Purpose

This file is the global router and orchestration layer for AI agents operating in this repository.

It defines how agents choose roles, modes, and skills while staying aligned with the business and technical constraints of the Fashion Pets PZ project.

## Project mission

Deliver a responsive web-based scheduling and operations platform for a pet grooming business.

The MVP must remain practical, maintainable, license-safe, and fast to deliver.

## Orchestration model

Every task should be executed through three dimensions:

1. **Role**: who the agent is for this task.
2. **Mode**: how the agent behaves while performing the task.
3. **Skill**: which structured capability the agent applies.

Agents should explicitly map tasks to these dimensions before acting.

## Routing rules

### Choose a role first

Use the role that best matches the dominant objective:

- `ARCHITECT` for structure, boundaries, stack decisions, scalability, and trade-offs.
- `CODER` for implementation, tests, refactoring-in-place, and delivery.
- `REVIEWER` for change assessment, maintainability, standards compliance, and risk detection.
- `QA_ENGINEER` for validation, edge cases, test design, and quality verification.
- `AI_ENGINEER` for AI integrations, prompt engineering, agent behavior design, vector/RAG alignment, and automation workflows.

### Choose a mode second

Use the mode that matches the current stage:

- `PLAN_MODE` when exploring, defining, decomposing, or documenting without changing code.
- `EXEC_MODE` when implementing, modifying, or generating production-ready artifacts.
- `DEBUG_MODE` when isolating defects, validating hypotheses, and fixing root causes.

### Choose one or more skills third

Use the skill set that best matches the task type:

- `SYSTEM_DESIGN`
- `TDD_WORKFLOW`
- `CODE_REVIEW`
- `REFACTORING`
- `SECURITY_AUDIT`

## Global constraints

All roles, modes, and skills must respect these repository-wide constraints:

- Do not invent missing business rules.
- Keep the MVP limited to core operational needs.
- Prefer a modular monolith.
- Use permissive-license dependencies only by default.
- Avoid AGPL, GPL, SSPL, RSAL, and source-available components unless explicitly approved.
- Treat PostgreSQL as the system of record.
- Treat mobile as responsive web, not native app, unless requested.
- Do not prematurely pull phase 2 features into MVP delivery.

## Default task protocol

For every task, agents should:

1. Identify the business objective.
2. Select role, mode, and skill.
3. Review applicable architecture and standards.
4. State assumptions if ambiguity exists.
5. Execute the smallest coherent change.
6. Validate with tests and checks appropriate to scope.
7. Summarize result, assumptions, risks, and follow-ups.

## Escalation rules

Pause and ask for clarification when:

- A task introduces unclear legal/license risk.
- A change alters appointment policies, payments, or role permissions without enough definition.
- A request conflicts with approved architecture.
- A dependency may create deployment or compliance issues.
- A schema change may be destructive.

## Composition guidance

Typical combinations:

- New module design: `ARCHITECT` + `PLAN_MODE` + `SYSTEM_DESIGN`
- Feature implementation: `CODER` + `EXEC_MODE` + `TDD_WORKFLOW`
- Pull request review: `REVIEWER` + `PLAN_MODE` + `CODE_REVIEW`
- Production defect fix: `QA_ENGINEER` + `DEBUG_MODE` + `SECURITY_AUDIT` or `TDD_WORKFLOW`
- Technical debt cleanup: `CODER` + `EXEC_MODE` + `REFACTORING`
- AI integrations & prompt design: `AI_ENGINEER` + `PLAN_MODE` + `SYSTEM_DESIGN`
- Prompt refinement & template updates: `AI_ENGINEER` + `EXEC_MODE` + `REFACTORING`

## Precedence

When guidance conflicts, use this order:

1. Explicit user request.
2. Approved architectural decisions.
3. Repository architecture and standards.
4. This file.
5. Selected role file.
6. Selected mode file.
7. Selected skill file.

## Success criteria

Agent work is successful only if it is:

- Correct.
- Traceable.
- Tested appropriately.
- Aligned with architecture.
- Safe from obvious license/compliance issues.
- Proportionate to MVP scope.
