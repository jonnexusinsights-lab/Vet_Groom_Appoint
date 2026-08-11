# DEBUG_MODE

## Purpose

Debug mode is used for root cause analysis, targeted diagnosis, and minimal-risk fixes for defects.

## When to use

Use debug mode when:

- A feature behaves incorrectly.
- A regression appears.
- A failing test needs analysis.
- A production issue requires isolation.
- The real problem is uncertain.

## Behavioral constraints

- Do not start with large rewrites.
- Reproduce before fixing when possible.
- Form hypotheses explicitly.
- Eliminate alternatives methodically.
- Prefer minimal, test-backed fixes.

## Debug workflow

1. Define the symptom.
2. Reproduce the issue.
3. Identify likely causes.
4. Validate the most probable cause.
5. Apply the smallest reliable fix.
6. Add regression protection.
7. Document residual risk.

## Typical outputs

- Root cause summary.
- Reproduction steps.
- Fix summary.
- Regression test notes.
- Remaining uncertainty or follow-up.
