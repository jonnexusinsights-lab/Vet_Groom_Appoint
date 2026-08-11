# CODE_REVIEW

## Goal

Provide a structured code review capability that prioritizes correctness, maintainability, and repository alignment.

## Use when

- Reviewing pull requests.
- Reviewing generated code.
- Performing pre-merge checks.
- Auditing risky or complex changes.

## Review sequence

1. Understand the intended change.
2. Check business-rule correctness.
3. Check architecture alignment.
4. Check tests and validation.
5. Check readability and maintainability.
6. Check dependency and license impact.
7. Classify findings by severity.

## Severity model

- Critical
- Major
- Minor
- Note

## Project-specific review checklist

- Are scheduling rules explicit and testable?
- Are permissions enforced server-side?
- Is payment logic safe and auditable?
- Does the change expand MVP scope unintentionally?
- Does any new dependency violate license policy?
