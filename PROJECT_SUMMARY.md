# Domo n8n Nodes - Complete Project Summary

## Overview

A comprehensive n8n custom node package providing access to **650 Domo API operations** through two specialized nodes.

## Project Structure

```text
n8n-nodes-domo/
├── credentials/
│   ├── DomoTokenApi.credentials.ts       # Token authentication
│   └── DomoOAuth2Api.credentials.ts      # OAuth2 authentication
│
├── nodes/
│   ├── Domo/                             # Product APIs Node
│   │   ├── Domo.node.ts                  # Main node (37 resources)
│   │   ├── DomoDescription.ts            # Combined operations
│   │   ├── domo.svg                      # Icon
│   │   ├── utils.ts                      # Helper functions
│   │   └── [37 resource files].ts        # 562 operations
│   │
│   └── DomoOAuth2/                       # Platform APIs Node
│       ├── DomoOAuth2.node.ts            # Main node (11 resources)
│       ├── DomoOAuth2Description.ts      # Combined operations
│       ├── domo.svg                      # Icon
│       └── [11 resource files].ts        # 88 operations
│
├── postman-collections/                  # Split Product API definitions
│   ├── README.md
│   └── [37 collection files].json
│
├── oauth-api-requests/                   # Split Platform API definitions
│   ├── README.md
│   ├── index.json
│   └── [89 request files].json
│
├── api-definitions/                      # Extracted API definitions
│   └── [37 definition files].api.json
│
└── Documentation/
    ├── README.md                         # Main documentation
    ├── OAUTH_SETUP.md                    # OAuth2 setup guide
    ├── OAUTH_NODE_README.md              # OAuth2 node documentation
    └── PROJECT_SUMMARY.md                # This file
```

## Two Nodes, Two Purposes

### Node 1: Domo (Product APIs)

**Purpose**: Access advanced, instance-specific Domo features

| Attribute | Details |
|-----------|---------|
| **Node Name** | Domo |
| **Credentials** | Domo Token API |
| **Domain** | `https://yourinstance.domo.com` (instance-specific) |
| **Resources** | 37 categories |
| **Operations** | 562 total |
| **Authentication** | Developer Token (X-DOMO-DEVELOPER-TOKEN header) |
| **Best For** | Advanced features, automation, instance management |

**Resources Include:**

- Account, Achievement, Admin, AI/Data Science, Alert
- AppDB, Approval, App Studio, Brand Kit, Brick
- Card, Category, Certification, Code Engine, Credit
- DataFlow, Dataset, Domo Everywhere, Elevation
- File, FileSet, Form, Function, Group
- Left Navigation, Objective, Page, Project
- Report, Role, Sandbox, Scheduled Report, Task Center
- Token, Toolkit, User, Workflow

### Node 2: Domo OAuth2 (Platform APIs)

**Purpose**: Standard CRUD operations with OAuth2 security

| Attribute | Details |
|-----------|---------|
| **Node Name** | Domo OAuth2 |
| **Credentials** | Domo OAuth2 API |
| **Domain** | `https://api.domo.com` (standard for all instances) |
| **Resources** | 11 categories |
| **Operations** | 88 total |
| **Authentication** | OAuth2 Client Credentials (Bearer token) |
| **Best For** | Standard operations, team access, production security |

**Resources Include:**

- Account (8 ops), Activity Log (1 op), Card (7 ops)
- Dataset (13 ops), Embed Token (2 ops), Group (8 ops)
- Page (9 ops), Project (21 ops), Simple (2 ops)
- Stream (12 ops), User (5 ops)

## Statistics

### Code Metrics

- **Total TypeScript Files**: 52 node files + 2 credential files = 54
- **Total Operations**: 562 (Product) + 88 (Platform) = 650
- **Total Resources**: 37 (Product) + 11 (Platform) = 48
- **Lines of Code**: ~15,000+ lines

### API Coverage

- **Product APIs**: 100% of Postman collection (562/562 operations)
- **Platform APIs**: 99% of OAuth collection (88/89 operations, excluding auth endpoint)
- **Total Domo APIs**: 650 operations across both API sets

### Documentation

- **Setup Guides**: 2 comprehensive guides
- **API References**: 126 individual API definition files
- **README Files**: 5 documentation files
- **Code Comments**: Inline descriptions for all operations

## Key Features

### 1. Complete API Coverage

- ✅ All Product API operations (562)
- ✅ All Platform API operations (88)
- ✅ Organized by resource type
- ✅ Declarative routing for all operations

### 2. Dual Authentication

- ✅ Token API for Product APIs
- ✅ OAuth2 API for Platform APIs
- ✅ Automatic token management
- ✅ Secure credential storage

### 3. Type Safety

- ✅ Full TypeScript implementation
- ✅ Type definitions for all operations
- ✅ Parameter validation
- ✅ IDE autocomplete support

### 4. Developer Experience

- ✅ Clear resource organization
- ✅ Descriptive operation names
- ✅ Built-in parameter hints
- ✅ Example values
- ✅ Comprehensive documentation

### 5. Production Ready

- ✅ No linter errors
- ✅ Follows n8n best practices
- ✅ Error handling included
- ✅ Tested against Postman collections

## Usage Comparison

### When to Use Each Node

**Use Domo (Product APIs) when you need:**

- Advanced instance-specific features
- Admin operations (users, groups, permissions)
- DataFlows, AI/Data Science, Code Engine
- Approvals, Certifications, Brand Kit
- Projects, Workflows, Forms
- Any of the 37 specialized resources

**Use Domo OAuth2 (Platform APIs) when you need:**

- Standard CRUD operations
- OAuth2 security requirements
- Multi-instance automation
- Team access with scoped permissions
- Embed tokens for public sharing
- Stream API for real-time data

## Setup Process

### Quick Start (5 minutes)

#### For Product APIs

1. Get developer token from your Domo instance
2. Create "Domo Token API" credentials in n8n
3. Add "Domo" node to workflow
4. Select resource and operation

#### For Platform APIs

1. Create OAuth client at <https://developer.domo.com/manage-clients>
2. Create "Domo OAuth2 API" credentials in n8n
3. Add "Domo OAuth2" node to workflow
4. Select resource and operation

### Detailed Setup

See [OAUTH_SETUP.md](./OAUTH_SETUP.md) for complete instructions.

## API Examples

### Example 1: Create DataSet (Product API)

```text
Node: Domo
Resource: Dataset
Operation: Create
Data: { schema, name, description }
```

### Example 2: List Users (Platform API)

```text
Node: Domo OAuth2
Resource: User
Operation: List Users
Limit: 100
```

### Example 3: Run DataFlow (Product API)

```text
Node: Domo
Resource: DataFlow
Operation: Run DataFlow
DataFlow ID: 12345
```

### Example 4: Stream Data (Platform API)

```text
1. Node: Domo OAuth2, Resource: Stream, Operation: Create Stream
2. Node: Domo OAuth2, Resource: Stream, Operation: Create Execution
3. Node: Domo OAuth2, Resource: Stream, Operation: Upload Data Part
4. Node: Domo OAuth2, Resource: Stream, Operation: Commit Execution
```

## Development Workflow

### How This Project Was Built

1. **Collection Splitting**
   - Split large Postman collections into individual files
   - Created 89 Platform API definitions
   - Created 37 Product API categories

2. **API Extraction**
   - Parsed Postman collections
   - Extracted operations, parameters, and methods
   - Generated structured API definitions

3. **Code Generation**
   - Automated resource file generation
   - Created operation definitions
   - Generated field configurations

4. **Manual Refinement**
   - Added descriptions
   - Validated parameters
   - Fixed edge cases
   - Added documentation

5. **Testing & Validation**
   - Linter checks
   - Type validation
   - Parameter testing
   - Documentation review

## Maintenance

### Adding New Operations

**For Product APIs (Domo node):**

1. Add to appropriate resource file in `nodes/Domo/`
2. Update operation and field arrays
3. Import in `DomoDescription.ts`
4. Test and validate

**For Platform APIs (OAuth2 node):**

1. Add to appropriate resource file in `nodes/DomoOAuth2/`
2. Update operation and field arrays
3. Import in `DomoOAuth2Description.ts`
4. Test and validate

### Updating from Postman

When Domo updates their Postman collections:

1. Export new collection from Postman
2. Run split script to generate individual files
3. Run generator to create resource files
4. Review and merge changes
5. Update version number

## Best Practices

### Security

- ✅ Store credentials securely in n8n
- ✅ Use OAuth2 for production
- ✅ Rotate tokens regularly
- ✅ Limit scopes to minimum required
- ❌ Never commit credentials to git

### Performance

- ✅ Use pagination for large datasets
- ✅ Implement error handling
- ✅ Use streaming for large data transfers
- ✅ Cache frequently accessed data
- ⚠️ Monitor API rate limits

### Organization

- ✅ Group related operations in workflows
- ✅ Use meaningful node names
- ✅ Document workflow purpose
- ✅ Version control workflows
- ✅ Test before deploying

## Troubleshooting

### Common Issues

#### No credentials selected

- Solution: Create appropriate credentials (Token or OAuth2)

#### Authentication failed

- Solution: Verify credentials are correct and not expired

#### Operation not found

- Solution: Ensure you're using correct node (Domo vs Domo OAuth2)

#### Invalid domain

- Solution: Check domain format (instance URL vs api.domo.com)

### Getting Help

- Check [OAUTH_SETUP.md](./OAUTH_SETUP.md) for setup issues
- Review [OAUTH_NODE_README.md](./OAUTH_NODE_README.md) for OAuth2 node help
- Check `oauth-api-requests/README.md` for API details
- Visit [Domo Developer Portal](https://developer.domo.com/)

## Version History

### v1.0.0 (Current)

- ✅ Complete Product APIs implementation (562 operations)
- ✅ Complete Platform APIs implementation (88 operations)
- ✅ Dual authentication support
- ✅ Comprehensive documentation
- ✅ Full TypeScript support
- ✅ Zero linter errors

## Contributing

This is a custom node package. To contribute:

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## License

See [LICENSE.md](./LICENSE.md)

## Resources

- **Domo Developer Portal**: <https://developer.domo.com/>
- **API Documentation**: <https://developer.domo.com/docs/domo-apis/getting-started>
- **OAuth Clients**: <https://developer.domo.com/manage-clients>
- **n8n Documentation**: <https://docs.n8n.io/>

---

Built with ❤️ for the n8n and Domo communities

**Total Operations**: 650 | **Total Resources**: 48 | **Code Quality**: ⭐⭐⭐⭐⭐
