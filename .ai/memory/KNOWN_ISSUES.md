# KNOWN_ISSUES

## Purpose

This file tracks known issues, caveats, unresolved risks, and technical debt that should remain visible across sessions.

## Known issues and cautions

### 1. Business rules are still incomplete

The scheduling engine depends on rules that are not fully defined yet, including duration modifiers, cancellation policy, and waitlist behavior.

Impact:

- High risk of rework if implemented too early.

### 2. Reporting requirements are still high level

The current reporting expectations mention revenue, productivity, frequent customers, and pets that should return, but exact definitions are not yet formalized.

Impact:

- Data model may need adjustment if reports are built without clear definitions.

### 3. Final authentication package is not locked

The direction is defined, but the exact library and adapters still require implementation-time review.

Impact:

- Medium risk if package choice introduces hidden license or maintenance issues.

### 4. Optional integrations are deliberately deferred

WhatsApp, e-invoicing, inventory, and loyalty are not part of MVP core flow.

Impact:

- Avoid building architecture around them prematurely.

### 5. Multi-branch support is not confirmed

The current architecture assumes a single-tenant, likely single-location first release.

Impact:

- Avoid over-modeling branch structures unless clarified.
