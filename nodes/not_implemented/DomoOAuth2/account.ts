import type { INodeProperties } from 'n8n-workflow';

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
	default: 'list-accounts',
	options: [
	{
		name: 'Create an Account',
		value: 'create-an-account',
		action: 'Create an account',
		description: 'When creating an Account, you must specify the Account Type properties. The Account Type properties are different, depending on the type of Account you are trying to create. To retrieve which Account Type properties to specify, use the GET /v1/accounts/account-types/{ACCOUNT_TYPE_ID} endpoint',
		routing: {
			request: {
				method: 'POST',
				url: '/v1/accounts',
			},
		},
	},
	{
		name: 'Delete an Account',
		value: 'delete-an-account',
		action: 'Delete an account',
		description: 'Deletes an Account from your Domo instance. Warning This is destructive and cannot be reversed.',
		routing: {
			request: {
				method: 'DELETE',
				url: '/v1/accounts/={{$parameter["ACCOUNT_ID"]}}',
			},
		},
	},
	{
		name: 'Get Account Type',
		value: 'get-account-type',
		action: 'Get account type',
		description: 'Retrieve the details of an account type. This includes information on the properties required to create an Account of this type.',
		routing: {
			request: {
				method: 'GET',
				url: '/v1/account-types/={{$parameter["ACCOUNT_TYPE_ID"]}}',
			},
		},
	},
	{
		name: 'List Account Types',
		value: 'list-account-types',
		action: 'List account types',
		description: 'Get a list of all Account Types for which the user has permissions',
		routing: {
			request: {
				method: 'GET',
				url: '/v1/account-types',
			},
		},
	},
	{
		name: 'List Accounts',
		value: 'list-accounts',
		action: 'List accounts',
		description: 'Get a list of all Accounts for which the user has permissions',
		routing: {
			request: {
				method: 'GET',
				url: '/v1/accounts',
			},
		},
	},
	{
		name: 'Retrieve an Account',
		value: 'retrieve-an-account',
		action: 'Retrieve an account',
		description: 'Retrieves the details of an existing account',
		routing: {
			request: {
				method: 'GET',
				url: '/v1/accounts/={{$parameter["ACCOUNT_ID"]}}',
			},
		},
	},
	{
		name: 'Share Account',
		value: 'share-account',
		action: 'Share account',
		description: 'Share an Account with a User',
		routing: {
			request: {
				method: 'GET',
				url: '/v1/accounts/={{$parameter["ACCOUNT_ID"]}}/shares',
			},
		},
	},
	{
		name: 'Update an Account',
		value: 'update-an-account',
		action: 'Update an account',
		description: 'Updates the specified Account metadata as well as the Account Type properties',
		routing: {
			request: {
				method: 'PATCH',
				url: '/v1/accounts/={{$parameter["ACCOUNT_ID"]}}',
			},
		},
	},
	],
	},
];

export const accountFields: INodeProperties[] = [
	{
		displayName: 'Account ID',
		name: 'ACCOUNT_ID',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['retrieve-an-account', 'update-an-account', 'delete-an-account', 'share-account'],
			},
		},
		default: '',
		description: 'The ID of the account',
	},
	{
		displayName: 'Account Type ID',
		name: 'ACCOUNT_TYPE_ID',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['get-account-type'],
			},
		},
		default: '',
		description: 'The ID of the account type',
	},
	{
		displayName: 'Data',
		name: 'data',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['create-an-account', 'update-an-account', 'share-account'],
			},
		},
		default: '',
		description: 'The data to send in JSON format',
		routing: {
			request: {
				body: {
					data: '={{JSON.parse($parameter.data)}}',
				},
			},
		},
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
				resource: ['account'],
				operation: ['list-accounts', 'list-account-types'],
			},
		},
		default: 50,
		description: 'Max number of results to return',
		routing: {
			request: {
				qs: {
					limit: '={{$parameter.limit}}',
				},
			},
		},
	},
	{
		displayName: 'Offset',
		name: 'offset',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['list-accounts', 'list-account-types'],
			},
		},
		default: 0,
		description: 'The number of results to skip',
		routing: {
			request: {
				qs: {
					offset: '={{$parameter.offset}}',
				},
			},
		},
	},
];

