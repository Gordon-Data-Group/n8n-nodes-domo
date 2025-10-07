import { INodeProperties } from 'n8n-workflow';

export const accountOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['account'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new account',
				action: 'Create account',
				routing: {
					request: {
						method: 'POST',
						url: '/api/data/v1/accounts',
						body: '={{JSON.parse($parameter.accountData)}}',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an account',
				action: 'Delete account',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/data/v1/accounts/" + $parameter.accountId }}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a specific account by ID',
				action: 'Get account',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/data/v1/accounts/" + $parameter.accountId }}',
					},
				},
			},
			{
				name: 'Get Account Credentials',
				value: 'getCredentials',
				description: 'Get credentials for a specific account',
				action: 'Get account credentials',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/data/v1/accounts/" + $parameter.accountId + "/credentials" }}',
					},
				},
			},
			{
				name: 'Get Appstore Connector',
				value: 'getAppstoreConnector',
				description: 'Get appstore connector details',
				action: 'Get appstore connector',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/data/v1/connectors/appstore/" + $parameter.connectorId }}',
					},
				},
			},
			{
				name: 'Get Datasets Used by Account',
				value: 'getDatasetsForAccount',
				description: 'Get datasets used by a specific account',
				action: 'Get datasets used by account',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/data/v1/accounts/" + $parameter.accountId + "/datasets" }}',
					},
				},
			},
			{
				name: 'Get Datasets Used by Accounts',
				value: 'getDatasetsForAccounts',
				description: 'Get datasets used by multiple accounts',
				action: 'Get datasets used by accounts',
				routing: {
					request: {
						method: 'POST',
						url: '/api/data/v1/accounts/datasets',
						body: '={{JSON.parse($parameter.accountIds)}}',
					},
				},
			},
			{
				name: 'Get Provider',
				value: 'getProvider',
				description: 'Get details of a specific provider',
				action: 'Get provider',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/data/v1/providers/" + $parameter.providerId }}',
					},
				},
			},
			{
				name: 'Get Provider Image',
				value: 'getProviderImage',
				description: 'Get image for a specific provider',
				action: 'Get provider image',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/data/v1/providers/" + $parameter.providerId + "/image" }}',
					},
				},
			},
			{
				name: 'List',
				value: 'list',
				description: 'Get a list of all accounts',
				action: 'List accounts',
				routing: {
					request: {
						method: 'GET',
						url: '/api/data/v1/accounts',
						qs: {
							limit: '={{Math.min($parameter.limit || 50, 500)}}',
							offset: '={{$parameter.offset || 0}}',
						},
					},
				},
			},
			{
				name: 'List Accounts for Provider',
				value: 'listAccountsForProvider',
				description: 'Get accounts for a specific provider',
				action: 'List accounts for provider',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/data/v1/providers/" + $parameter.providerId + "/accounts" }}',
					},
				},
			},
			{
				name: 'List OAuth Configurations',
				value: 'listOAuthConfigurations',
				description: 'Get list of OAuth configurations',
				action: 'List oauth configurations',
				routing: {
					request: {
						method: 'GET',
						url: '/api/data/v1/oauth',
					},
				},
			},
			{
				name: 'List Providers',
				value: 'listProviders',
				description: 'Get list of all providers',
				action: 'List providers',
				routing: {
					request: {
						method: 'GET',
						url: '/api/data/v1/providers',
					},
				},
			},
			{
				name: 'List Providers with Accounts',
				value: 'listProvidersWithAccounts',
				description: 'Get list of providers that have accounts',
				action: 'List providers with accounts',
				routing: {
					request: {
						method: 'GET',
						url: '/api/data/v1/providers/accounts',
					},
				},
			},
			{
				name: 'Search',
				value: 'search',
				description: 'Search for accounts based on criteria',
				action: 'Search accounts',
				routing: {
					request: {
						method: 'POST',
						url: '/api/search/v1/query',
						body: '={{JSON.parse($parameter.searchQuery)}}',
					},
				},
			},
			{
				name: 'Update Access',
				value: 'updateAccess',
				description: 'Update account access permissions',
				action: 'Update account access',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/data/v1/accounts/" + $parameter.accountId + "/access" }}',
						body: '={{JSON.parse($parameter.accessData)}}',
					},
				},
			},
			{
				name: 'Update Credentials',
				value: 'updateCredentials',
				description: 'Update account credentials',
				action: 'Update account credentials',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/data/v1/accounts/" + $parameter.accountId + "/credentials" }}',
						body: '={{JSON.parse($parameter.credentials)}}',
					},
				},
			},
			{
				name: 'Update Name',
				value: 'updateName',
				description: 'Update account name',
				action: 'Update account name',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/data/v1/accounts/" + $parameter.accountId + "/name" }}',
						body: {
							name: '={{$parameter.name}}',
						},
					},
				},
			},
			{
				name: 'Validate Credentials',
				value: 'validateCredentials',
				description: 'Validate account credentials',
				action: 'Validate credentials',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/data/v1/accounts/" + $parameter.accountId + "/validate" }}',
					},
				},
			},
		],
		default: 'list',
	},
];

export const accountFields: INodeProperties[] = [
	// Account ID field
	{
		displayName: 'Account ID',
		name: 'accountId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: [
					'get',
					'getCredentials',
					'getDatasetsForAccount',
					'updateName',
					'updateCredentials',
					'updateAccess',
					'delete',
					'validateCredentials',
				],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the account',
	},
	// Provider ID field
	{
		displayName: 'Provider ID',
		name: 'providerId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['getProvider', 'getProviderImage', 'listAccountsForProvider'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the provider',
	},
	// Connector ID field
	{
		displayName: 'Connector ID',
		name: 'connectorId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['getAppstoreConnector'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the appstore connector',
	},
	// List operation fields
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['list'],
			},
		},
		default: 50,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Offset',
		name: 'offset',
		type: 'number',
		typeOptions: {
			minValue: 0,
		},
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['list'],
			},
		},
		default: 0,
		description: 'Number of accounts to skip',
	},
	// Search operation fields
	{
		displayName: 'Search Query',
		name: 'searchQuery',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['search'],
			},
		},
		default: '{}',
		required: true,
		description: 'JSON query object for searching accounts',
		placeholder: '{"combineResults":"AND","queries":[{"type":"account","query":"search term"}]}',
	},
	// Create operation fields
	{
		displayName: 'Account Data',
		name: 'accountData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['create'],
			},
		},
		default: '{}',
		required: true,
		description: 'JSON object containing account creation data',
		placeholder: '{"name":"Account Name","type":"oauth","credentials":{...}}',
	},
	// Update Name operation fields
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['updateName'],
			},
		},
		default: '',
		required: true,
		description: 'The new name for the account',
	},
	// Update Credentials operation fields
	{
		displayName: 'Credentials',
		name: 'credentials',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['updateCredentials'],
			},
		},
		default: '{}',
		required: true,
		description: 'JSON object containing the new credentials',
		placeholder: '{"username":"user","password":"pass"}',
	},
	// Update Access operation fields
	{
		displayName: 'Access Data',
		name: 'accessData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['updateAccess'],
			},
		},
		default: '{}',
		required: true,
		description: 'JSON object containing access permissions',
		placeholder: '{"users":[123,456],"groups":[789]}',
	},
	// Get Datasets for Accounts operation field
	{
		displayName: 'Account IDs',
		name: 'accountIds',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['getDatasetsForAccounts'],
			},
		},
		default: '[]',
		required: true,
		description: 'JSON array of account IDs',
		placeholder: '[123, 456, 789]',
	},
];
