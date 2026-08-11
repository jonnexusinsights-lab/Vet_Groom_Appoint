# SECURITY_AUDIT

## Goal

Provide a structured security and compliance review process for repository changes.

## Use when

- Reviewing authentication or authorization code.
- Reviewing payment-related logic.
- Reviewing data export or backup flows.
- Reviewing new dependencies.
- Auditing sensitive workflows before release.

## Audit workflow

1. Identify sensitive assets and actions.
2. Identify trust boundaries.
3. Review authentication path.
4. Review authorization enforcement.
5. Review input validation.
6. Review audit logging needs.
7. Review dependency/license risk.
8. Review data exposure risk.
9. Summarize findings and mitigations.

## Project-specific hotspots

- User roles and restricted actions.
- Customer and pet personal data.
- Financial/payment records.
- Exported files.
- Administrative configuration screens.
- Third-party integrations.

## Output format

- Scope reviewed.
- Findings by severity.
- Exploitability summary.
- Recommended mitigations.
- Residual risk.
