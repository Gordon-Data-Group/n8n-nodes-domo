# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

> **Note:** This package is in ALPHA. Breaking changes may occur in any release prior to 1.0.0.

---

## [Unreleased]

---

## [0.0.2] - 2026-09-17

### Added

- **Dataset** resource — Create, Get, List, Search, Query (SQL), Share, Get Schema, Get/Run Stream, Create/Commit Upload, Upload Data, Update Name & Description, Update Owner, Update Tags, Get Impact Counts, Delete (17 operations)

### Changed

- User → Create: renamed `sendEmail` parameter to `sendNotification` for clarity
- Fixed `n8n-nodes-base` lint violations on the Page and Scheduled Report `Limit` parameters (missing `minValue` typeOptions/description) and ID casing in Scheduled Report field labels
- README: added Gordon Data Group attribution and support links

### Security

- Removed a debug `preSend` block that logged full request URLs, bodies, and query strings (including the Domo developer token) to the console

---

## [0.0.1] - 2026-06-19

### Added

- Domo node with Token API authentication (`X-DOMO-DEVELOPER-TOKEN`)
- 24 implemented resources:
  - **Account** — Create, List, Get, Share, Update credentials (17 operations)
  - **Achievement** — Create, Assign, Manage (10 operations)
  - **Admin** — Access Tokens, Activity Log, Company, OAuth API Clients (17 operations)
  - **Alert** — Create, Get, Delete, List, Subscriptions, Rules (15 operations)
  - **AppDB** — Datastores, Collections, Documents, Permissions (24 operations)
  - **Approval** — List, Get, Update
  - **Brand Kit** — Hot URLs, Login settings, Color palettes, Email configs (4 operations)
  - **Brick** — App designs/instances, Parts, Permissions (17 operations)
  - **Card** — Get, List, Update
  - **Category** — List, Get, Create, Delete
  - **Credit** — List, Get, Create, Delete
  - **DataFlow** — List, Get, Create, Run, Update
  - **Domo Everywhere** — Embed tokens, Subscriptions, Programmatic Filtering
  - **Elevation** — List, Get, Create
  - **File** — Upload, Download, List
  - **Function** — List, Get, Create, Update, Delete, Lock; Bulk operations; Beast Modes / Variables (11 operations)
  - **Group** — Create, List, Get, Update avatar, Members (11 operations)
  - **Left Navigation** — Get pins, Create/Update pins (2 operations)
  - **Page** — Create, List, Get, Update, Delete
  - **Project** — Create, List, Get, Update, Delete
  - **Report** — List, Get, Create, Update, Delete
  - **Role** — List, Get, Create, Update, Delete
  - **Scheduled Report** — List, Get, Create, Update, Delete
  - **User** — Create, Get, List, Update, Delete, Get Me (6 operations)
- "Return All" toggle on paginated list operations (bricks, cards, dataflows, domoEverywhere, functions, projects)
- Domain normalization: accepts `mycompany`, `mycompany.domo.com`, or `https://mycompany.domo.com`
