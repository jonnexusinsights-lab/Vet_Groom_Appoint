# ADR 0001 - Initial Authentication Provider Strategy

- Status: Proposed
- Date: 2026-08-03
- Decision owners: Product/Architecture

## Context

The project requires authenticated access for internal staff roles such as administrator, receptionist, groomer, and accountant.

The MVP must ship quickly while avoiding legal ambiguity in dependencies and avoiding unnecessary infrastructure complexity.

Authentication must support role-based access, secure session handling, and future extensibility.

## Decision

Use a permissive-license authentication approach built around the approved web stack, favoring Auth.js or an equivalent implementation that integrates cleanly with PostgreSQL and the application layer.

## Alternatives considered

- Custom authentication implementation from scratch.
- External identity platform as a hard dependency in MVP.
- Source-available or operationally complex auth stack.

## Rationale

A mature, permissive-license solution reduces implementation time and security risk compared with fully custom auth, while avoiding premature dependence on a heavyweight external identity platform.

## Consequences

### Positive

- Faster MVP delivery.
- Better alignment with existing stack.
- Lower operational complexity.
- Easier role integration.

### Negative

- Final package choice still needs dependency review.
- Future enterprise SSO may require additional design work.

### Neutral / follow-up

- Final provider and session strategy should be confirmed during implementation.
- Role and permission modeling remains a separate decision.

## License and compliance review

- Dependencies affected: authentication library and adapters.
- Expected license type: permissive only.
- Risk level: low if dependency review is enforced.

## Implementation notes

- Store roles in application data model.
- Enforce authorization server-side.
- Audit authentication-sensitive actions where appropriate.
