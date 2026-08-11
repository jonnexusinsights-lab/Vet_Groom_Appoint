# TOOLING_RULES

## Purpose

This file defines the allowed tool usage and repository hygiene expectations.

## Terminal and command use

- Prefer deterministic commands.
- Avoid destructive commands unless explicitly required.
- Document important setup or migration commands.
- Do not assume local machine-only behavior in repository instructions.

## Git rules

- One coherent concern per branch when possible.
- Use descriptive branch names.
- Keep commits understandable.
- Avoid unrelated file churn in the same change set.

## Package management rules

- Check existing dependencies before adding new ones.
- Confirm license before adoption.
- Prefer stable, maintained packages.
- Prefer framework-native or existing solutions first.

## Migration rules

- Use explicit migrations for schema changes.
- Do not hide schema changes inside unrelated work.
- Document backward-compatibility risks.

## Artifact generation rules

- Generated files should be repository-relevant.
- Templates and docs should be written for reuse.
- Temporary scratch files should not remain in final commits.

## AI tooling and API rules

- **Secret Keys**: Never commit API keys or credentials. Use local `.env` files (gitignored) for keys like `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, etc.
- **Testing Mocks**: All unit and integration tests involving LLMs, embeddings, or other cognitive services must mock the API responses to prevent cost, rate-limiting, and network dependency in test execution.
- **Defensive Parsing**: Treat all AI-generated output as untrusted. Always validate structure and schemas (e.g. using Zod or custom validators) before parsing JSON.
- **Observability**: Log LLM call latency, token usage, and response codes. Use structured trace contexts to debug agents.
