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
						url: '={{ "/api/data/v1/providers/" + $parameter.providerKey + "/account/" + $parameter.accountId }}',
						qs: {
							unmask: 'true',
						},
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
						url: '={{ "/api/connectors/appstore/v2/details/connector/"+ $parameter.connectorId }}',
						qs: {
							fields: 'all',
							country: '={{ $parameter.country }}',
							language: '={{ $parameter.language }}',
						}
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
						url: '={{ "/api/data/v2/datasources/account/" + $parameter.accountId}}',
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
						url: '/api/data/v2/datasources/accounts',
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
						url: '={{ "/api/data/v1/providers/" + $parameter.providerKey }}',
						qs: {
							fields: 'all',
							country: '={{ $parameter.country }}',
							language: '={{ $parameter.language }}',
						}
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
						url: '={{ "/api/data/v1/accounts/provider/" + $parameter.providerKey }}',
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
						url: '/api/data/v1/accounts/templates/user/extended',
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
						url: '/api/data/v2/datasources/providers',
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
						body: {
								"count": '={{ $parameter.count }}',
								"offset": '={{ $parameter.offset }}',
								"combineResults": false,
								"query": '={{ $parameter.searchString }}',
								"filters": '={{JSON.parse($parameter.searchFilters)}}',
								"facetValuesToInclude": [
										"DATAPROVIDERNAME",
										"OWNED_BY_ID",
										"VALID",
										"USED",
										"LAST_MODIFIED_DATE"
								],
								"queryProfile": "GLOBAL",
								"entityList": [
										[
												"account"
										]
								],
								"sort": {
										"fieldSorts": [
												{
														"field": "display_name_sort",
														"sortOrder": "ASC"
												}
										]
								}
						},
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
						body: {
								type: '={{$parameter.shareWithType}}',
								id: '={{$parameter.shareWithId}}',
								accessLevel: '={{$parameter.accessLevel}}'
						},
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
						url: '={{ "/api/data/v1/providers/" + $parameter.providerKey + "/account/" + $parameter.accountId}}',
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
			// {
			// 	name: 'Validate Credentials',
			// 	value: 'validateCredentials',
			// 	description: 'Validate account credentials',
			// 	action: 'Validate credentials',
			// 	routing: {
			// 		request: {
			// 			method: 'POST',
			// 			url: '={{ "/api/data/v1/accounts/" + $parameter.accountId + "/validate" }}',
			// 		},
			// 	},
			// },
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
	{
		displayName: 'Share With Type',
		name: 'shareWithType',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['updateAccess'],
			},
		},
		options: [
			{
				name: 'User',
				value: 'USER',
			},
			{
				name: 'Group',
				value: 'GROUP',
			},
		],
		default: 'USER',
		required: true,
		description: 'The type of the share with',
	},
	{
		displayName: 'Share With ID',
		name: 'shareWithId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['updateAccess'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the user or group to share with',
	},
	//
	{
		displayName: 'Access Level',
		name: 'accessLevel',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['updateAccess'],
			},
		},
		options: [
			{
				name: 'Can Edit',
				value: 'CAN_EDIT',
			},
			{
				name: 'Can Share',
				value: 'CAN_SHARE',
			},
			{
				name: 'Can View',
				value: 'CAN_VIEW',
			},
			{
				name: 'None',
				value: 'NONE',
			},
			{
				name: 'Owner',
				value: 'OWNER',
			},
		],
		default: 'NONE',
		required: true,
		description: 'The access level for the share object'
	},
	// Provider ID field
	{
		displayName: 'Provider Key',
		name: 'providerKey',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['getProvider', 'listAccountsForProvider'],
			},
		},
		default: '',
		required: true,
		description: 'The key of the provider',
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
	// Appstore country
	{
		displayName: 'Country',
		name: 'country',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['getAppstoreConnector', 'getProvider'],
			},
		},
		default: 'US',
		required: true,
		description: 'The country code for the appstore',
	},
	// Connector ID country
	{
		displayName: 'Language',
		name: 'language',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['getAppstoreConnector', 'getProvider'],
			},
		},
		default: 'en',
		required: true,
		description: 'The language code for the appstore',
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
	// // Search operation fields
	// {
	// 	displayName: 'Search Query',
	// 	name: 'searchQuery',
	// 	type: 'json',
	// 	displayOptions: {
	// 		show: {
	// 			resource: ['account'],
	// 			operation: ['search'],
	// 		},
	// 	},
	// 	default: '{}',
	// 	required: true,
	// 	description: 'JSON query object for searching accounts',
	// 	placeholder: '{"combineResults":"AND","queries":[{"type":"account","query":"search term"}]}',
	// },
	// Account search filters
	{
		displayName: 'Search Filters',
		name: 'searchFilters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['search'],
			},
		},
		default: '',
		required: true,
		description: 'JSON object containing account search filters',
		placeholder: '[{ "filterType": "term", "field": "FIELD_NAME", "value": "FILTER_VALUE", "name": "FILTER NAME", "not": false, "label": "LABEL"  }]',
	},
	// Search string
	{
		displayName: 'Search String',
		name: 'searchString',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['search'],
			},
		},
		default: '',
		required: true,
		description: 'The search string for the account',
		placeholder: 'search term',
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
		placeholder: '{"<property>": "<value>"}',
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
