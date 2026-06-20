# Domo Authentication Setup Guide

This guide explains how to set up authentication for Domo APIs in n8n.

## Overview

This node uses Domo **Product APIs** (instance-specific):

- **Domain**: Your instance URL, e.g. `https://yourinstance.domo.com`
- **Auth**: **Domo Token API** credentials (developer token in `X-DOMO-DEVELOPER-TOKEN` header)
- **Scope**: 24 implemented resources — see [README.md](./README.md) for the full list

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

The Domo node exposes 24 implemented resources. Pick one in the node, then choose an operation. See [README.md](./README.md) for the full list with status.

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
