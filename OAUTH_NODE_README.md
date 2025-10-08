# Domo OAuth2 Node

A separate n8n custom node for Domo Platform APIs using OAuth2 authentication.

## Overview

This node provides access to **88 Domo Platform API operations** across **11 resource categories**, using OAuth2 Client Credentials authentication.

### Domo Platform APIs vs Product APIs

| Aspect | Platform APIs (OAuth2 Node) | Product APIs (Domo Node) |
|--------|----------------------------|--------------------------|
| **Node Name** | Domo OAuth2 | Domo |
| **Authentication** | OAuth2 Client Credentials | Developer Token |
| **Domain** | `https://api.domo.com` | `https://yourinstance.domo.com` |
| **Operations** | 88 operations | 562 operations |
| **Use Case** | Standard CRUD operations | Advanced instance-specific features |

## Installation

This node is included in the n8n-nodes-domo package.

```bash
npm install n8n-nodes-domo
```

## Configuration

### 1. Create OAuth2 Credentials

Before using this node, you need to set up OAuth2 credentials:

1. Visit [Domo Developer Portal](https://developer.domo.com/manage-clients)
2. Create a new OAuth client
3. Note your Client ID and Client Secret
4. In n8n, create "Domo OAuth2 API" credentials
5. Enter your Client ID, Client Secret, and desired scopes

See [OAUTH_SETUP.md](./OAUTH_SETUP.md) for detailed setup instructions.

### 2. Add Node to Workflow

1. Search for "Domo OAuth2" in n8n node palette
2. Drag it into your workflow
3. Select your OAuth2 credentials
4. Choose a resource and operation

## Resources

The Domo OAuth2 node supports the following resources:

### 1. Account (8 operations)

Manage data connectors and authentication accounts.

**Operations:**

- List Accounts
- Create an Account
- Retrieve an Account
- Update an Account
- Delete an Account
- List Account Types
- Get Account Type
- Share Account

### 2. Activity Log (1 operation)

Access audit log entries.

**Operations:**

- Retrieve Activity Log Entries

### 3. Card (7 operations)

Manage cards and visualizations.

**Operations:**

- List Cards
- Get Card
- Create Chart Card
- Get Chart Card Definition
- Update Chart Card Definition
- Add Drill View
- Get Drill Properties

### 4. Dataset (13 operations)

Manage datasets and data permissions.

**Operations:**

- List DataSets
- Create a DataSet
- Retrieve DataSet Details
- Update DataSet Details
- Delete a DataSet
- Query a DataSet
- Import data into DataSet
- Export Data from DataSet
- List PDP Policies
- Create PDP Policy
- Retrieve PDP Policy
- Update PDP Policy
- Delete PDP Policy

### 5. Embed Token (2 operations)

Generate embed tokens for embedding Domo content.

**Operations:**

- Create an Embed Token (Cards)
- Create an Embed Token (Dashboard)

### 6. Group (8 operations)

Manage user groups.

**Operations:**

- List Groups
- Create a Group
- Retrieve a Group
- Update a Group
- Delete a Group
- Add a User to a Group
- Remove a User from a Group
- List Users in a Group

### 7. Page (9 operations)

Manage pages (dashboards) and page collections.

**Operations:**

- List Pages
- Create a Page
- Retrieve a Page
- Update a Page
- Delete a Page
- Retrieve a Page Collection
- Create a Page Collection
- Update a Page Collection
- Delete a Page Collection

### 8. Project (21 operations)

Manage projects, tasks, and attachments.

**Operations:**

- Retrieve All Projects
- Create a Project
- Retrieve Individual Project
- Update a Project
- Delete a Project
- Retrieve Project Members
- Update Project Members
- Retrieve All Project Lists
- Create a List
- Retrieve Individual List
- Update a List
- Delete a List
- Retrieve All Project Tasks
- Retrieve All List Tasks
- Retrieve Individual Task
- Create a Task
- Update a Task
- Retrieve List of Attachments
- Add Attachment
- Download Attachment
- Delete an Attachment

### 9. Simple (2 operations)

Simplified dataset operations.

**Operations:**

- Create DataSet
- Import Data into DataSet

### 10. Stream (12 operations)

Manage data streams for real-time data ingestion.

**Operations:**

- List Streams
- Create a Stream
- Retrieve a Stream
- Update a Stream
- Delete a Stream
- Search Streams
- List Stream Executions
- Create a Stream Execution
- Retrieve a Stream Execution
- Upload a Data Part
- Commit a Stream Execution
- Abort a Stream Execution

### 11. User (5 operations)

Manage users.

**Operations:**

- List Users
- Create a User
- Retrieve a User
- Update a User
- Delete a User

## Usage Examples

### Example 1: List All Users

```text
Node: Domo OAuth2
Resource: User
Operation: List Users
Limit: 100
Offset: 0
```

### Example 2: Create a DataSet

```text
Node: Domo OAuth2
Resource: Dataset
Operation: Create a DataSet
Data:
{
  "name": "Sales Data",
  "description": "Monthly sales figures",
  "schema": {
    "columns": [
      {"type": "STRING", "name": "Region"},
      {"type": "DOUBLE", "name": "Revenue"},
      {"type": "DATE", "name": "Date"}
    ]
  }
}
```

### Example 3: Add User to Group

```text
Node: Domo OAuth2
Resource: Group
Operation: Add a User to a Group
Group ID: 123456
User ID: 789012
```

### Example 4: Import Data via Stream

```text
1. Create Stream (returns streamId)
2. Create Stream Execution (returns executionId)
3. Upload Data Part(s)
4. Commit Stream Execution
```

## Features

### Declarative Routing

All operations use n8n's declarative routing pattern for clean, maintainable code.

### Automatic OAuth2 Handling

The node automatically handles OAuth2 token retrieval and refresh through n8n's credential system.

### Type Safety

Built with TypeScript for full type safety and IDE support.

### Parameter Validation

All required fields are clearly marked and validated.

### Dynamic URL Construction

URLs are dynamically constructed with parameter interpolation.

## Comparison with HTTP Request Node

| Feature | Domo OAuth2 Node | HTTP Request Node |
|---------|------------------|-------------------|
| **Setup** | ⭐⭐⭐ Easy | ⭐⭐ Moderate |
| **Discoverability** | ✅ All operations visible | ❌ Manual URL entry |
| **Parameter Hints** | ✅ Built-in field descriptions | ❌ No guidance |
| **Type Safety** | ✅ Validated parameters | ⚠️ Free-form JSON |
| **Maintenance** | ✅ Single update point | ❌ Update each workflow |
| **Best For** | Regular use, teams | One-off requests |

## File Structure

```text
nodes/DomoOAuth2/
├── DomoOAuth2.node.ts          # Main node definition
├── DomoOAuth2Description.ts    # Combined operations/fields
├── domo.svg                    # Node icon
├── account.ts                  # Account operations (8)
├── activityLog.ts              # Activity log operations (1)
├── cards.ts                    # Card operations (7)
├── dataset.ts                  # Dataset operations (13)
├── embedToken.ts               # Embed token operations (2)
├── groups.ts                   # Group operations (8)
├── pages.ts                    # Page operations (9)
├── projectsAndTasks.ts         # Project operations (21)
├── simple.ts                   # Simple API operations (2)
├── stream.ts                   # Stream operations (12)
└── users.ts                    # User operations (5)
```

## Development

### Generated from Postman Collection

This node was automatically generated from the official Domo Platform APIs Postman collection using the API definitions in `oauth-api-requests/`.

### Adding New Operations

1. Add operation definition to appropriate resource file
2. Define required fields
3. Test with OAuth2 credentials
4. Run linter to ensure code quality

## Limitations

- OAuth2 only (no Token API support in this node)
- Platform APIs only (for Product APIs, use the "Domo" node)
- Requires OAuth client from Domo Developer Portal

## Additional Resources

- **Setup Guide**: [OAUTH_SETUP.md](./OAUTH_SETUP.md)
- **Platform API Docs**: <https://developer.domo.com/docs/domo-apis/getting-started>
- **OAuth2 Credentials**: <https://developer.domo.com/manage-clients>
- **API Reference**: `oauth-api-requests/` directory

## Support

For issues or questions:

- Check [OAUTH_SETUP.md](./OAUTH_SETUP.md) for setup help
- Review `oauth-api-requests/README.md` for API details
- Visit [Domo Developer Portal](https://developer.domo.com/)

## License

See [LICENSE.md](./LICENSE.md)

---

**Note**: This node is part of the n8n-nodes-domo package and works alongside the main "Domo" node for Product APIs.
