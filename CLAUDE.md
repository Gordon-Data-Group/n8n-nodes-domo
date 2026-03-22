# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is `n8n-nodes-domo`, an unofficial n8n community node package that integrates with the [Domo](https://www.domo.com) business intelligence platform. It exposes a single n8n node (`Domo`) with 10 implemented resources and 123 operations across Domo's Product APIs.

## Commands

```bash
npm run build       # Clean dist, compile TypeScript, copy icons
npm run dev         # TypeScript watch mode
npm run lint        # ESLint check
npm run lintfix     # ESLint auto-fix
npm run format      # Prettier format (nodes/ and credentials/)
```

There are no automated tests. Manual testing requires installing the node in an n8n instance.

## Architecture

### Single Multi-Resource Node Pattern

The project uses a single n8n node (`Domo.node.ts`) that delegates to per-resource files. Each resource file (e.g., `nodes/Domo/accounts.ts`) exports two arrays:

```typescript
export const accountOperations: INodeProperties[]  // operation dropdown entries
export const accountFields: INodeProperties[]       // parameter fields per operation
```

These are aggregated in `DomoDescription.ts` and injected into the node's `properties` array.

### Routing Pattern

Operations use n8n's declarative routing — no `execute()` method. Each operation defines its HTTP call inline:

```typescript
routing: {
  request: {
    method: 'POST',
    url: '/api/data/v1/accounts',
    body: '={{JSON.parse($parameter.accountData)}}'
  },
  send: {
    preSend: [preSendLogger]
  }
}
```

### Authentication

- **Primary (deployed):** `DomoTokenApi` — Developer Token sent as `X-DOMO-DEVELOPER-TOKEN` header. Credential stores the user's Domo instance domain.
- **Secondary (not deployed):** `DomoOAuth2Api` — Client ID + Secret OAuth2, in `credentials/DomoOAuth2Api.credentials.ts`. The corresponding node files are in `nodes/not_implemented/DomoOAuth2/` and are excluded from the built package.

### Key Files

| File | Purpose |
|---|---|
| `nodes/Domo/Domo.node.ts` | Main node: metadata, base URL from credentials, resource list |
| `nodes/Domo/DomoDescription.ts` | Aggregates all resource operations/fields |
| `nodes/Domo/utils.ts` | API request helpers, domain normalization, pagination |
| `nodes/Domo/shared/preSendLogger.ts` | Logs request details (URL, method, body, query) to n8n logger |
| `credentials/DomoTokenApi.credentials.ts` | Token-based auth credential definition |

### Reference Materials

- `api-definitions/` — 35 OpenAPI JSON definitions (gitignored from npm, tracked in git for development reference)
- `postman-collections/` — 37 Postman collections covering the full Domo API surface

### Build Output

TypeScript compiles to `dist/`. The `n8n` section of `package.json` points to compiled files:
- `dist/credentials/DomoTokenApi.credentials.js`
- `dist/nodes/Domo/Domo.node.js`

Icons (`.svg`/`.png`) are copied to `dist/` by Gulp during build.

## UI Design Principles

When adding new operations or resources, **break request body fields into discrete UI parameters** rather than requiring users to enter a raw JSON string. Use typed `INodeProperties` entries with appropriate `type` values (`string`, `number`, `boolean`, `options`, `collection`, `fixedCollection`) so each field has its own labeled input. Fall back to a JSON textarea only for fields that are genuinely free-form or have no predictable schema (e.g., `dynamic_group` filter syntax).

## Code Style

- **Prettier:** tabs, single quotes, trailing commas, 100-char line width, semicolons, LF line endings
- **ESLint:** uses `eslint-plugin-n8n-nodes-base` with strict n8n-specific rules for both credentials and nodes
- TypeScript strict mode is enabled
