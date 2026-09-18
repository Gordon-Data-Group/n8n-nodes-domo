# n8n-nodes-domo

> **ALPHA SOFTWARE** — This node is under active development. APIs, operation names, and parameter shapes may change between releases without notice. Pin to a specific version in production.

An unofficial, community-maintained n8n community node package for [Domo](https://www.domo.com). It is **not affiliated with, endorsed by, or supported by Domo, Inc.** in any way.

Domo is a cloud-based business intelligence and data platform. This node lets you automate Domo workflows from [n8n](https://n8n.io/) using Domo's Product APIs.

Built and maintained by [Gordon Data Group](https://gordondatagroup.com), a data and analytics consulting firm. Need help with a Domo implementation, custom tooling, or AI integration? [Get in touch](https://gordondatagroup.com).

---

## Disclaimers

- **Community project** — maintained by volunteers. There is no SLA or guaranteed support.
- **Not affiliated with Domo** — Domo® is a registered trademark of Domo, Inc. This project has no relationship with Domo, Inc.
- **Alpha quality** — expect breaking changes. Always read the [CHANGELOG](./CHANGELOG.md) before upgrading.

---

## Table of Contents

- [Supported Resources](#supported-resources)
- [Installation](#installation)
- [Credentials](#credentials)
- [Compatibility](#compatibility)
- [Usage Notes](#usage-notes)
- [Contributing](#contributing)
- [Reporting Bugs](#reporting-bugs)
- [Resources](#resources)
- [Version History](#version-history)
- [About Gordon Data Group](#about-gordon-data-group)

---

## Supported Resources

The `Domo` node currently implements **24 resources**. Resources listed as "planned" appear in the resource dropdown but have no operations yet.

| Resource | Status | Notes |
|---|---|---|
| Account | Implemented | Create, List, Get, Share, Update credentials |
| Achievement | Implemented | Create, Assign, Manage |
| Admin | Implemented | Access Tokens, Activity Log, Company, OAuth Clients |
| Alert | Implemented | Create, Get, Delete, List, Subscriptions, Rules |
| AppDB | Implemented | Datastores, Collections, Documents, Permissions |
| Approval | Implemented | List, Get, Update |
| Brand Kit | Implemented | Hot URLs, Login settings, Color palettes, Email configs |
| Brick | Implemented | App designs/instances, Parts, Permissions |
| Card | Implemented | Get, List, Update |
| Category | Implemented | List, Get, Create, Delete |
| Credit | Implemented | List, Get, Create, Delete |
| DataFlow | Implemented | List, Get, Create, Run, Update |
| Domo Everywhere | Implemented | Embed tokens, Subscriptions, Programmatic Filtering |
| Elevation | Implemented | List, Get, Create |
| File | Implemented | Upload, Download, List |
| Function | Implemented | List, Get, Create, Update, Delete, Lock (Beast Modes / Variables) |
| Group | Implemented | Create, List, Get, Update avatar, Members |
| Left Navigation | Implemented | Get pins, Create/Update pins |
| Page | Implemented | Create, List, Get, Update, Delete |
| Project | Implemented | Create, List, Get, Update, Delete |
| Report | Implemented | List, Get, Create, Update, Delete |
| Role | Implemented | List, Get, Create, Update, Delete |
| Scheduled Report | Implemented | List, Get, Create, Update, Delete |
| User | Implemented | Create, Get, List, Update, Delete, Get Me |
| App Studio | Planned | — |
| Certification | Planned | — |
| Code Engine | Planned | — |
| Dataset | Planned | — |
| FileSet | Planned | — |
| Form | Planned | — |
| Objective | Planned | — |
| Sandbox | Planned | — |
| Task Center | Planned | — |
| Toolkit | Planned | — |
| Workflow | Planned | — |

---

## Installation

Follow the [n8n community nodes installation guide](https://docs.n8n.io/integrations/community-nodes/installation/).

The package name is `n8n-nodes-domo`.

---

## Credentials

See [DOMO_AUTH_SETUP.md](./DOMO_AUTH_SETUP.md) for full setup instructions.

You will need:
- A Domo **Developer Token** (Admin > Security > Access Tokens in your Domo instance)
- Your Domo **instance domain** (e.g. `mycompany.domo.com`)

---

## Compatibility

Requires n8n `>= 1.112`.

---

## Usage Notes

Some operations require you to provide JSON that matches Domo's internal API schema (e.g. Dynamic Groups, Dataset Account credentials). When this is needed, the field label will say "JSON" and a placeholder example is shown. You can discover the expected shape by inspecting your browser's network traffic while performing the same action in the Domo UI.

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for how to check out, build, test, and submit changes.

---

## Reporting Bugs

Open an issue on GitHub: [https://github.com/Gordon-Data-Group/n8n-nodes-domo/issues](https://github.com/Gordon-Data-Group/n8n-nodes-domo/issues)

Please include:
- n8n version
- Node version from `package.json`
- The resource and operation you were using
- The error message or unexpected behavior

---

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [Domo Developer Portal](https://developer.domo.com/)

---

## Version History

See [CHANGELOG.md](./CHANGELOG.md).

---

## About Gordon Data Group

This project is maintained by [Gordon Data Group](https://gordondatagroup.com), a consulting firm specializing in Domo implementations, data engineering, and AI-driven tooling. If your team needs help getting more out of Domo — custom integrations, dataflow architecture, governance, or projects like this one — [reach out](https://gordondatagroup.com).
