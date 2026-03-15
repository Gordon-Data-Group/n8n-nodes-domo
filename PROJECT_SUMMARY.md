# Domo n8n Nodes - Project Summary

## Overview

n8n custom node package providing access to Domo Product APIs via a single **Domo** node with **Token API** authentication. The node exposes **10 resources** and **123 operations**.

## Project Structure

```text
n8n-nodes-domo/
├── credentials/
│   ├── DomoTokenApi.credentials.ts       # Token auth (used by Domo node)
├── nodes/
│   └── Domo/                              # Product APIs node
│       ├── Domo.node.ts                   # Main node
│       ├── DomoDescription.ts            # Combines operations & fields
│       ├── domo.svg
│       ├── utils.ts
│       ├── shared/
│       │   └── preSendLogger.ts
│       └── [10 resource files].ts         # 123 operations
│
└── DOMO_AUTH_SETUP.md                     # Token API setup guide
```

## Node: Domo (Product APIs)

**Purpose**: Instance-specific Domo Product API access with developer token.

| Attribute | Details |
| ----------- | --------- |
| **Node Name** | Domo |
| **Credentials** | Domo Token API |
| **Domain** | `https://yourinstance.domo.com` (instance-specific) |
| **Resources** | 10 (implemented) |
| **Operations** | 123 total |
| **Authentication** | Developer Token (X-DOMO-DEVELOPER-TOKEN header) |

**Implemented resources and operation counts:**

| Resource | Operations |
| ---------- | ------------ |
| Account | 17 |
| Achievement | 10 |
| Admin | 17 (Access Tokens, Activity Log, Company, OAuth API Clients) |
| Alert | 15 |
| AppDB | 24 (Datastores, Collections, Documents, Permissions) |
| Brand Kit | 4 |
| Brick | 17 |
| Group | 11 |
| Left Navigation | 2 |
| User | 6 |

**Note:** `Domo.node.ts` still lists 27 resources in the Resource dropdown (e.g. App Studio, Card, Category, Dataset, Page, Report). Only the 10 above have operation definitions in `DomoDescription.ts`; the rest show no operations if selected.

## Statistics

### Code

- **Credentials**: 1 (Domo Token API).
- **Resources**: 10 implemented.
- **Operations**: 123.
- **TypeScript**: Domo node + 10 resource files + 1 shared util + 2 credential files.

### Documentation

- **Setup**: `DOMO_AUTH_SETUP.md` (Token API).

## Features

- **Product API coverage**: 123 operations across 10 resources, declarative routing, preSend logging.
- **Authentication**: Domo Token API credentials; instance domain from credentials.
- **Type safety**: TypeScript, typed params, IDE support.
- **Organization**: One resource per file, operations and fields in `DomoDescription.ts`.

## Setup

1. Obtain a developer token from your Domo instance.
2. In n8n, create **Domo Token API** credentials (instance domain + token).
3. Add the **Domo** node and choose Resource + Operation.

See [DOMO_AUTH_SETUP.md](./DOMO_AUTH_SETUP.md) for details.

## Maintenance

### Adding operations

1. Implement or extend the right resource file in `nodes/Domo/`.
2. Export and add to `domoOperations` / `domoFields` in `DomoDescription.ts`.
3. If adding a new resource, add it to the Resource dropdown in `Domo.node.ts`.

## Troubleshooting

| Issue | Action |
| ------- | -------- |
| No credentials | Create **Domo Token API** credentials. |
| Auth failed | Check token and instance URL; ensure token is valid. |
| No operations for a resource | Only the 10 resources listed above are implemented; pick one of those. |

## References

- [Domo Developer Portal](https://developer.domo.com/)
- [Domo APIs](https://developer.domo.com/docs/domo-apis/getting-started)
- [n8n Docs](https://docs.n8n.io/)
