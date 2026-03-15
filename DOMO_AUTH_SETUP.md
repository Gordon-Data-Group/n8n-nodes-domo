# Domo Authentication Setup Guide

This guide explains how to set up authentication for Domo APIs in n8n.

## Overview

This node uses Domo **Product APIs** (instance-specific):

- **Domain**: Your instance URL, e.g. `https://yourinstance.domo.com`
- **Auth**: **Domo Token API** credentials (developer token in `X-DOMO-DEVELOPER-TOKEN` header)
- **Scope**: 10 resources, 123 operations (Account, Achievement, Admin, Alert, AppDB, Brand Kit, Brick, Group, Left Navigation, User)

---

## Domo Token API setup

### Steps

1. Log into your Domo instance
2. Navigate to Admin > Security > Access Tokens
3. Create a new access token
4. In n8n, select "Domo Token API" credentials
5. Enter:
   - **API Token**: Your developer token
   - **Domain**: Your Domo instance URL (e.g. `https://mycompany.domo.com`)

### Resources available (after auth)

The Domo node exposes these 10 resources; pick one in the node, then choose an operation.

| Resource | Examples |
|----------|----------|
| Account | Create, List, Get, Share, Update credentials |
| Achievement | Create, Assign to user, Add admin, List |
| Admin | Access Tokens, Activity Log, Company, OAuth API Clients |
| Alert | Create, Get, Delete, List, Subscriptions, Rules |
| AppDB | Datastores, Collections, Documents, Permissions |
| Brand Kit | Get hot URL, Login settings, Color palettes, Email configs |
| Brick | App designs/instances, Parts, Permissions |
| Group | Create, List, Get, Update avatar, Members |
| Left Navigation | Get pins, Create/update pins |
| User | Create, Get, List, Update, Delete, Get authenticated (me) |

### "Invalid domain"

**Cause**: Incorrect API domain

**Solution**:

- Product APIs (Token Auth) use your instance: `https://yourinstance.domo.com`

## Support

For issues with:

- **n8n Integration**: Check n8n community or this repository
- **Domo API**: Contact Domo support or check [Domo Developer Portal](https://developer.domo.com/)

---

**Note**: This guide is for the n8n custom Domo node. For official Domo SDKs (Java, Python), see the [Domo Developer Portal](https://developer.domo.com/).
