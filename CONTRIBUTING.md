# Contributing to n8n-nodes-domo

Thank you for your interest in contributing. This is a community project — all contributions are welcome.

---

## Prerequisites

- [Node.js](https://nodejs.org/) >= 20.15
- npm >= 10
- A Domo instance with a developer token (for manual testing)
- An n8n instance (local or self-hosted) for end-to-end testing

---

## Getting Started

### 1. Fork and clone

```bash
git clone https://github.com/Gordon-Data-Group/n8n-nodes-domo.git
cd n8n-nodes-domo
npm install
```

### 2. Build

```bash
npm run build
```

This cleans `dist/`, compiles TypeScript, and copies SVG/PNG icons.

### 3. Watch mode (development)

```bash
npm run dev
```

TypeScript will recompile on every save. You still need to reinstall the package in your n8n instance after each rebuild.

### 4. Lint and format

```bash
npm run lint        # Check for ESLint errors
npm run lintfix     # Auto-fix ESLint errors
npm run format      # Run Prettier on nodes/ and credentials/
```

Lint must pass before merging. Format is enforced by Prettier (tabs, single quotes, 100-char line width).

---

## Testing

There are no automated tests. Testing is manual:

1. Build the package (`npm run build`)
2. Install it in your local n8n instance as a community node (point n8n to the local path, or use `npm link`)
3. Create a workflow using the Domo node
4. Verify the operation against your Domo instance

Document what you tested in your pull request description.

---

## Making Changes

### Adding a new operation to an existing resource

1. Open the resource file, e.g. `nodes/Domo/users.ts`
2. Add the operation entry to `userOperations` (shown in the operation dropdown)
3. Add the parameter fields to `userFields` with `displayOptions` scoped to the new operation
4. Use discrete `INodeProperties` fields (`string`, `number`, `boolean`, `options`, `collection`) — **not** a raw JSON textarea — unless the field is genuinely free-form

### Adding a new resource

1. Create `nodes/Domo/<resourceName>.ts` following the pattern of an existing file
2. Export `<resourceName>Operations` and `<resourceName>Fields`
3. Import and spread both arrays in `nodes/Domo/DomoDescription.ts`
4. Add the resource to the `options` array in `nodes/Domo/Domo.node.ts`

### Routing

Use n8n's declarative routing — no `execute()` method. Define the HTTP call inline:

```typescript
routing: {
  request: {
    method: 'GET',
    url: '/api/content/v3/cards/{{$parameter.cardId}}',
  },
}
```

Authentication is injected automatically via the `DomoTokenApi` credential. Do not manually add the `X-DOMO-DEVELOPER-TOKEN` header in operation routing.

---

## Commit Guidelines

- Use the [Conventional Commits](https://www.conventionalcommits.org/) format:
  - `feat: add List operation to Roles resource`
  - `fix: correct pagination offset logic in getAllItemsFromApi`
  - `docs: update DOMO_AUTH_SETUP with new token scopes`
  - `chore: bump typescript to 5.9`
- Keep commits focused — one logical change per commit
- Reference GitHub issues with `Closes #N` in the commit body when applicable

---

## Pull Request Process

1. Branch off `development` (not `main`)
2. Make your changes, build, and manually test
3. Run `npm run lint` — it must pass
4. Open a PR against `development` with a clear description of what changed and how you tested it
5. A maintainer will review and merge

---

## Reporting Bugs

Open a GitHub issue: [https://github.com/Gordon-Data-Group/n8n-nodes-domo/issues](https://github.com/Gordon-Data-Group/n8n-nodes-domo/issues)

Include:
- Your n8n version (`Help > About` in the n8n UI)
- The `version` field from this repo's `package.json`
- The resource and operation you were using
- The exact error message or unexpected behavior
- Steps to reproduce

---

## Code Style

- **Prettier**: tabs, single quotes, trailing commas, 100-char line width, semicolons, LF line endings
- **TypeScript**: strict mode is enabled — avoid `any` unless bridging n8n's untyped response data
- **ESLint**: uses `eslint-plugin-n8n-nodes-base`; run `npm run lintfix` before committing
- No comments unless the *why* is non-obvious from the code itself

---

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](./CODE_OF_CONDUCT.md). Be respectful and constructive.
