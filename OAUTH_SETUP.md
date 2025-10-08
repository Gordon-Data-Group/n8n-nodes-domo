# Domo OAuth2 Authentication Setup Guide

This guide explains how to set up OAuth2 authentication for Domo APIs in n8n.

## Overview

### Domo API Types

Domo has two different API sets:

1. **Product APIs** (Instance-specific)
   - Use your instance domain: `https://yourinstance.domo.com`
   - Authentication: **Domo Token API** credentials
   - **Available in**: Domo custom node (this node)
   - APIs: 562 operations across 37 resources

2. **Platform APIs** (OAuth-based)
   - Use standard domain: `https://api.domo.com`
   - Authentication: **Domo OAuth2 API** credentials
   - **Available in**: HTTP Request node (for now)
   - APIs: 89 operations (Account, DataSet, Users, Pages, etc.)

### Authentication Methods in the Domo Node

The **Domo custom node** currently supports:

- ✅ **Domo Token API** - For Product APIs (all 562 operations)

### Using OAuth2 Platform APIs

For OAuth2 Platform APIs, use the **HTTP Request node** with **Domo OAuth2 API** credentials.

**Example**: List Users with HTTP Request Node

1. Add **HTTP Request** node
2. Select **Domo OAuth2 API** credentials
3. Set URL: `https://api.domo.com/v1/users`
4. Method: GET

See the [Using OAuth2 with HTTP Request Node](#using-oauth2-with-http-request-node) section below for detailed instructions.

---

## Option 1: Domo Token API (Product APIs)

Use this method for quick setup and testing.

### Steps

1. Log into your Domo instance
2. Navigate to Admin > Security > Access Tokens
3. Create a new access token
4. In n8n, select "Domo Token API" credentials
5. Enter:
   - **API Token**: Your developer token
   - **Domain**: Your Domo instance URL (e.g., `https://mycompany.domo.com`)

## Option 2: Domo OAuth2 API (Platform APIs)

Use this method for production deployments with proper scope control.

### Prerequisites

You need a Domo instance and developer portal access.

### Step 1: Create OAuth Client

1. **Go to Domo Developer Portal**: <https://developer.domo.com/>
2. **Log in** with your Domo instance name and credentials
3. **Navigate to "Manage Clients"**: <https://developer.domo.com/manage-clients>
4. **Click "Create New Client"**
5. **Fill in the details**:
   - **Name**: Give your client a descriptive name (e.g., "n8n Integration")
   - **Description**: Optional description
   - **Scopes**: Select the scopes you need:
     - `account` - Account management
     - `audit` - Audit logs
     - `buzz` - Buzz/social features
     - `dashboard` - Dashboard/page management
     - `data` - DataSet operations (most common)
     - `user` - User management

6. **Save** and note down your **Client ID** and **Client Secret**

### Step 2: Configure n8n Credentials

1. In n8n, go to **Credentials**
2. Click **Create New Credential**
3. Search for and select **"Domo OAuth2 API"**
4. Enter the following:
   - **Client ID**: The Client ID from Step 1
   - **Client Secret**: The Client Secret from Step 1
   - **Scope**: Space-separated list of scopes (e.g., `data user dashboard`)
     - Default: `data user dashboard`
     - Choose based on what operations you'll perform
   - **Note**: Domain is automatically set to `https://api.domo.com` (OAuth endpoint)

5. Click **Create** to save

### Step 3: Test Credentials

1. After saving, click **Test** to verify the credentials work
2. The test will attempt to fetch a list of users
3. If successful, you'll see a success message

## OAuth2 Scopes Explained

| Scope | Description | Use Case |
|-------|-------------|----------|
| **account** | Account and connector management | Creating/managing data connectors |
| **audit** | Activity logs | Tracking user activity and changes |
| **buzz** | Social features | Buzz messages and notifications |
| **dashboard** | Pages and dashboards | Creating/managing dashboards |
| **data** | DataSets and DataFlows | Most common - data operations |
| **user** | User and group management | User administration |

### Common Scope Combinations

- **Data operations only**: `data`
- **Data + Users**: `data user`
- **Full access**: `account audit buzz dashboard data user`
- **Dashboard builder**: `dashboard data user`
- **Admin operations**: `user account audit`

## OAuth2 Token Details

### Token Lifecycle

- **Expires In**: 3600 seconds (1 hour)
- **Grant Type**: Client Credentials
- **Token Type**: Bearer
- **Refresh**: Automatic (n8n will request new tokens as needed)

### Token Request

When you configure OAuth2 credentials, n8n will make requests to:

```http
GET https://api.domo.com/oauth/token?grant_type=client_credentials&scope={your_scopes}
Authorization: Basic {base64(client_id:client_secret)}
```

Response:

```json
{
  "access_token": "your_bearer_token",
  "token_type": "bearer",
  "expires_in": 3599,
  "scope": "data user dashboard",
  "customer": "your_instance",
  "userId": 123456789,
  "role": "Admin"
}
```

## Security Best Practices

### Client Secret Management

🔒 **IMPORTANT**: Treat your Client Secret like a password

- ✅ **DO**:

  - Store securely in n8n credentials
  - Use different clients for dev/staging/production
  - Rotate secrets regularly
  - Limit scopes to minimum required

- ❌ **DON'T**:

  - Commit secrets to git repositories
  - Share secrets via email or chat
  - Use the same client across multiple environments
  - Grant unnecessary scopes

### Rotating Credentials

If credentials are compromised:

1. Go to [Domo Developer Portal](https://developer.domo.com/manage-clients)
2. Delete the compromised client
3. Create a new client with new credentials
4. Update n8n credentials immediately

## Troubleshooting

### "Failed to get access token"

**Cause**: Invalid Client ID or Client Secret

**Solution**:

1. Verify credentials in Domo Developer Portal
2. Ensure no extra spaces in ID/Secret
3. Check that the client hasn't been deleted

### "Insufficient permissions"

**Cause**: Requested operation requires scopes not granted

**Solution**:

1. Edit your Domo OAuth client in Developer Portal
2. Add required scopes
3. Update scope field in n8n credentials
4. Test again

### "Invalid domain"

**Cause**: Incorrect API domain

**Solution**:

- OAuth APIs automatically use: `https://api.domo.com` (fixed, cannot be changed)
- Product APIs (Token Auth) use your instance: `https://yourinstance.domo.com`
- If you need instance-specific endpoints, use Token API authentication instead

## Using OAuth2 with HTTP Request Node

Since the Domo custom node currently only supports Token API, use the **HTTP Request node** for OAuth2 Platform API calls.

### Setup Steps

1. **Create OAuth2 credentials** (see Option 2 above)

2. **Add HTTP Request node** to your workflow

3. **Configure the node**:
   - **Authentication**: Generic Credential Type
   - **Generic Auth Type**: Domo OAuth2 API
   - **Credential for Domo OAuth2 API**: Select your OAuth2 credentials
   - **Request Method**: GET/POST/PUT/DELETE (as needed)
   - **URL**: `https://api.domo.com/v1/{endpoint}`

### Example: List DataSets

```text
Method: GET
URL: https://api.domo.com/v1/datasets
Parameters: 
  - limit: 50
  - offset: 0
```

### Example: Create a User

```text
Method: POST
URL: https://api.domo.com/v1/users
Body (JSON):
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "role": "Admin"
}
```

### Available Platform API Endpoints

See the `oauth-api-requests/` directory for all 89 Platform API operations:

- **Account API** (8 operations)
- **DataSet API** (13 operations)
- **Users API** (5 operations)
- **Groups API** (8 operations)
- **Pages API** (9 operations)
- **Projects and Tasks API** (21 operations)
- **Stream API** (12 operations)
- **Cards API** (7 operations)
- And more...

## Comparing API Types

| Feature | Product APIs (Token) | Platform APIs (OAuth2) |
|---------|---------------------|----------------------|
| **Node** | Domo custom node | HTTP Request node |
| **Domain** | `yourinstance.domo.com` | `api.domo.com` |
| **Authentication** | Token API | OAuth2 API |
| **Operations** | 562 operations | 89 operations |
| **Use Case** | Instance-specific content | Standard CRUD operations |
| **Best For** | Advanced features | Basic data management |

## Comparing Authentication Methods

| Feature | Token API | OAuth2 API |
|---------|-----------|------------|
| **Setup** | ⭐⭐⭐ Simple | ⭐⭐ Moderate |
| **Security** | ⭐⭐ Good | ⭐⭐⭐ Better |
| **Scope Control** | ❌ No | ✅ Yes |
| **Token Refresh** | ❌ Manual | ✅ Automatic |
| **Expiration** | Configurable | 1 hour (auto-refresh) |
| **Best For** | Development, Testing | Production, Team Use |

## Additional Resources

- [Domo API Authentication Docs](<https://developer.domo.com/portal/1845fc11bbe5d-api-authentication>)
- [Domo Developer Portal](https://developer.domo.com/)
- [Manage OAuth Clients](https://developer.domo.com/manage-clients)
- [Create New Client](https://developer.domo.com/new-client)
- [OAuth 2.0 RFC 6749](https://tools.ietf.org/html/rfc6749)

## Support

For issues with:

- **n8n Integration**: Check n8n community or this repository
- **Domo API**: Contact Domo support or check [Domo Developer Portal](https://developer.domo.com/)
- **OAuth Clients**: Use [Domo Developer Portal](https://developer.domo.com/manage-clients)

---

**Note**: This guide is for the n8n custom Domo node. For official Domo SDKs (Java, Python), see the [Domo Developer Portal](https://developer.domo.com/).
