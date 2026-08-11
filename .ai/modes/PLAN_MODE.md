# PLAN_MODE

## Purpose

Plan mode is used for read-only exploration, problem framing, decomposition, and specification generation.

No production code changes should be proposed as completed work in this mode.

## When to use

Use plan mode when:

- Requirements are still ambiguous.
- A feature needs decomposition.
- Architecture options need comparison.
- A bug needs investigation before implementation.
- A spec, plan, or ADR is the required output.

## Behavioral constraints

- Do not pretend implementation is done.
- Do not invent unverified facts.
- Prefer assumptions lists over silent interpretation.
- Stay concrete and actionable.
- Focus on decisions, risks, and next steps.

## Expected outputs

Plan mode should produce one or more of:

- Task breakdown.
- Implementation plan.
- Technical design notes.
- Risk list.
- Open questions.
- Acceptance criteria draft.
- ADR draft.

## Success criteria

A good plan:

- Is clear enough for execution.
- Identifies dependencies and risks.
- Respects repository constraints.
- Does not drift into unnecessary detail.
