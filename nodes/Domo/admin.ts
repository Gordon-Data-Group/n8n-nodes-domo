import { INodeProperties } from 'n8n-workflow';

export const adminOperations: INodeProperties[] = [
	{
		displayName: 'Sub-Resource',
		name: 'subResource',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['admin'],
			},
		},
		options: [
			{
				name: 'Access Tokens',
				value: 'accessTokens',
			},
			{
				name: 'Activity Log',
				value: 'activityLog',
			},
			{
				name: 'Company',
				value: 'company',
			},
			{
				name: 'OAuth API Clients',
				value: 'oauthApiClients',
			},
		],
		default: 'company',
		description: 'The admin sub-resource to interact with',
	},
	// Access Tokens Operations
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['admin'],
				subResource: ['accessTokens'],
			},
		},
		options: [
			{
				name: 'List Access Tokens',
				value: 'listAccessTokens',
				description: 'List all access tokens',
				action: 'List access tokens',
				routing: {
					request: {
						method: 'GET',
						url: '/api/data/v1/accesstokens',
					},
				},
			},
			{
				name: 'Create Access Tokens',
				value: 'createAccessToken',
				description: 'List all access tokens',
				action: 'List access tokens',
				routing: {
					request: {
						method: 'POST',
						url: '/api/data/v1/accesstokens',
						body: {
							"name": "={{$parameter.name}}",
							"ownerId": "={{$parameter.ownerId}}",
							"expires": "={{$parameter.expires}}",
					}
					},
				},
			},
			{
				name: 'Delete/Revoke Access Token',
				value: 'deleteAccessToken',
				description: 'Delete/Revoke an access token',
				action: 'Delete access token',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/data/v1/accesstokens/" + $parameter.id }}',
					},
				},
			},
		],
		default: 'listAccessTokens',
	},
	// Activity Log Operations
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['admin'],
				subResource: ['activityLog'],
			},
		},
		options: [
			{
				name: 'List Object Types',
				value: 'listObjectTypes',
				action: 'List object types',
				routing: {
					request: {
						method: 'GET',
						url: '/api/audit/v1/user-audits/objectTypes',
					},
				},
			},
			{
				name: 'Get Events',
				value: 'getEvents',
				description: 'Retrieves a list of user activity logs based on the provided query parameters',
				action: 'Get events',
				routing: {
					request: {
						method: 'GET',
						url: '/api/audit/v1/user-audits',
						qs: {
							start: '={{$parameter.start}}',
							end: '={{$parameter.end}}',
							offset: '={{$parameter.offset || 0}}',
							limit: '={{Math.min($parameter.limit || 50, 500)}}',
							objectType: '={{$parameter.objectType}}',
						},
					},
				},
			},
		],
		default: 'getEvents',
	},
	// Company Operations
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['admin'],
				subResource: ['company'],
			},
		},
		options: [
			{
				name: 'Get Credits',
				value: 'getCredits',
				description: 'Get credits information',
				action: 'Get credits',
				routing: {
					request: {
						method: 'GET',
						url: '/api/metrics/v1/usage/credits/contract/current/summary',
					},
				},
			},
			{
				name: 'Get Customer State',
				value: 'getCustomerState',
				action: 'Get customer state',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/content/v1/customer-states/" + $parameter.customerState }}',
						qs: {
							ignoreCache: '={{$parameter.ignoreCache}}',
						},
					},
				},
			},
			{
				name: 'Get Customer States',
				value: 'getCustomerStates',
				action: 'Get customer states',
				routing: {
					request: {
						method: 'GET',
						url: '/api/content/v1/customer-states',
						qs: {
							ignoreCache: '={{$parameter.ignoreCache}}',
							stateName: '={{$parameter.stateName}}',
						},
					},
				},
			},
			{
				name: 'Get Default Landing Page',
				value: 'getDefaultLandingPage',
				action: 'Get default landing page',
				routing: {
					request: {
						method: 'GET',
						url: '/api/content/v1/landings/customer',
					},
				},
			},
			{
				name: 'Get Jupyter Settings',
				value: 'getJupyterSettings',
				action: 'Get jupyter settings',
				routing: {
					request: {
						method: 'GET',
						url: '/api/datascience/v1/settings',
					},
				},
			},
			{
				name: 'Get Licenses',
				value: 'getLicenses',
				action: 'Get licenses',
				routing: {
					request: {
						method: 'GET',
						url: '/api/content/v1/licenses/total/current',
					},
				},
			},
			{
				name: 'Get Locale',
				value: 'getLocale',
				action: 'Get locale',
				routing: {
					request: {
						method: 'GET',
						url: '/api/content/v1/customer-states/locale',
						qs: {
							ignoreCache: '={{$parameter.ignoreCache}}',
						},
					},
				},
			},
			{
				name: 'Get Property',
				value: 'getProperty',
				action: 'Get property',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/customer/v1/properties/" + $parameter.property }}',
					},
				},
			},
			{
				name: 'Get Settings',
				value: 'getSettings',
				description: 'Get company settings',
				action: 'Get settings',
				routing: {
					request: {
						method: 'GET',
						url: '/companysettings',
					},
				},
			},
			{
				name: 'List Customer Stats',
				value: 'listCustomerStats',
				action: 'List customer stats',
				routing: {
					request: {
						method: 'GET',
						url: '/api/query/v1/datasources/customer-stats',
					},
				},
			},
			{
				name: 'List Time Zones',
				value: 'listTimeZones',
				action: 'List time zones',
				routing: {
					request: {
						method: 'GET',
						url: '/api/dataprocessing/v1/dataflows/timezones',
					},
				},
			},
			{
				name: 'Update Customer State',
				value: 'updateCustomerState',
				action: 'Update customer state',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/content/v1/customer-states/" + $parameter.customerState }}',
						body: '={{JSON.parse($parameter.stateData)}}',
					},
				},
			},
			{
				name: 'Update Property',
				value: 'updateProperty',
				action: 'Update property',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/customer/v1/properties/" + $parameter.property }}',
						body: '={{JSON.parse($parameter.propertyData)}}',
					},
				},
			},
		],
		default: 'getSettings',
	},
	// OAuth API Clients Operations
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['admin'],
				subResource: ['oauthApiClients'],
			},
		},
		options: [
			{
				name: 'List OAuth API Clients',
				value: 'listOAuthApiClients',
				action: 'List oauth api clients',
				routing: {
					request: {
						method: 'GET',
						url: '/api/identity/v1/developer-tokens',
					},
				},
			},
		],
		default: 'listOAuthApiClients',
	},
];

export const adminFields: INodeProperties[] = [
	// Access Tokens fields
	{
		displayName: 'Token ID',
		name: 'id',
		type: 'string',
		typeOptions: {
			password: false,
		},
		displayOptions: {
			show: {
				resource: ['admin'],
				subResource: ['accessTokens'],
				operation: ['deleteAccessToken'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the access token',
	},
	// Activity Log fields
	{
		displayName: 'Start Date',
		name: 'start',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['admin'],
				subResource: ['activityLog'],
				operation: ['getEvents'],
			},
		},
		default: '',
		description: 'Start date for events (Epoch milliseconds)',
		placeholder: '1717862400000',
		required: true,
	},
	{
		displayName: 'End Date',
		name: 'end',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['admin'],
				subResource: ['activityLog'],
				operation: ['getEvents'],
			},
		},
		default: '',
		description: 'End date for events (Epoch milliseconds)',
		placeholder: '1717862400000',
		required: true,
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
				resource: ['admin'],
				subResource: ['activityLog'],
				operation: ['getEvents'],
			},
		},
		default: 0,
		description: 'Number of events to skip',
		required: true,
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['admin'],
				subResource: ['activityLog'],
				operation: ['getEvents'],
			},
		},
		default: 50,
		description: 'Max number of results to return',
		required: true,
	},
	{
		displayName: 'Object Type',
		name: 'objectType',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['admin'],
				subResource: ['activityLog'],
				operation: ['getEvents'],
			},
		},
		default: '',
		required: true,
		description: 'Filter by object type',
	},
	// Company fields
	{
		displayName: 'Customer State',
		name: 'customerState',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['admin'],
				subResource: ['company'],
				operation: ['getCustomerState', 'updateCustomerState'],
			},
		},
		default: '',
		required: true,
		description: 'The customer state name',
	},
	{
		displayName: 'Ignore Cache',
		name: 'ignoreCache',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['admin'],
				subResource: ['company'],
				operation: ['getCustomerState', 'getCustomerStates', 'getLocale'],
			},
		},
		default: false,
		description: 'Whether to ignore cache',
	},
	{
		displayName: 'State Name',
		name: 'stateName',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['admin'],
				subResource: ['company'],
				operation: ['getCustomerStates'],
			},
		},
		default: '',
		description: 'Filter by state name',
	},
	{
		displayName: 'Property',
		name: 'property',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['admin'],
				subResource: ['company'],
				operation: ['getProperty', 'updateProperty'],
			},
		},
		default: '',
		required: true,
		description: 'The property name',
	},
	{
		displayName: 'State Data',
		name: 'stateData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['admin'],
				subResource: ['company'],
				operation: ['updateCustomerState'],
			},
		},
		default: '{"name":"domo.policy.multifactor.maxCodeAttempts","value":"5"}',
		required: true,
		description: 'JSON object containing customer state data',
	},
	{
		displayName: 'Property Data',
		name: 'propertyData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['admin'],
				subResource: ['company'],
				operation: ['updateProperty'],
			},
		},
		default: '{"keyspace":"domo","issuer":"DEFAULT_VALUE","key":"card.hide_share_email_ui","value":"true"}',
		required: true,
		description: 'JSON object containing property data',
	},
	// Access Tokens fields
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['admin'],
				subResource: ['accessTokens'],
				operation: ['createAccessToken'],
			},
		},
		default: '',
		required: true,
		description: 'The name of the token',
	},
	{
		displayName: 'Owner User ID',
		name: 'ownerId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['admin'],
				subResource: ['accessTokens'],
				operation: ['createAccessToken'],
			},
		},
		default: '',
		required: true,
		description: 'The User ID of the owner',
	},
	{
		displayName: 'Expires At',
		name: 'expires',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['admin'],
				subResource: ['accessTokens'],
				operation: ['createAccessToken'],
			},
		},
		default: '',
		required: true,
	},
];

