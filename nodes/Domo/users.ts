// import { IExecuteFunctions, IHttpRequestMethods, INodeProperties } from 'n8n-workflow';
import { INodeProperties } from 'n8n-workflow';
import { preSendLogger } from './shared/preSendLogger';

export const userOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['user'],
			},
		},
		options: [
			{
				name: 'Create User',
				value: 'create',
				action: 'Create a user',
				routing: {
					request: {
						body: {
							displayName: '={{$parameter.displayName}}',
							roleId: '={{$parameter.roleId}}',
							"detail": {
								"email": '={{$parameter.email}}'
						}
						},
						method: 'POST',
						url: '/api/content/v3/users',
						qs: {
							sendEmail: '={{$parameter.sendEmail}}',
						},
					},
				},
			},
			{
				name: 'Delete User',
				value: 'delete',
				action: 'Delete a user',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/identity/v1/users/{{ $parameter.userId.toString() }}',
					},
				},
			},
			{
				name: 'Get Authenticated User',
				value: 'me',
				action: 'Get authenticated user',
				routing: {
					request: {
						method: 'GET',
						url: '/api/content/v3/users/me',
					},
				},
			},
			{
				name: 'Get User',
				value: 'get',
				action: 'Get a user',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/identity/v1/users/{{ $parameter.userId.toString() }}',
						qs: {
							parts: 'DETAILED',
						},
					},
				},
			},
			{
				name: 'List Users',
				value: 'list',
				action: 'List users',
				routing: {
					request: {
						method: 'GET',
						url: '/api/identity/v1/users',
						qs: {
							attributes: '={{ ($parameter.attributesToRetrieve?.attribute ?? []).map(a => a.key).filter(Boolean).join(",") }}',
							limit: '={{ $parameter.returnAll ? 50 : Math.min($parameter.limit ?? 50, 50) }}',
							offset: '={{ $parameter.offset ?? 0 }}',
						},
					},
					operations: {
						pagination: {
							type: 'offset',
							properties: {
								limitParameter: 'limit',
								offsetParameter: 'offset',
								pageSize: 50,
								type: 'query',
							},
						},
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'users',
								},
							},
						],
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Update User',
				value: 'update',
				action: 'Update a user',
				routing: {
					request: {
						method: 'PATCH',
						url: '=/api/identity/v1/users/{{ $parameter.userId }}',
						body: {
							attributes: '={{ ($parameter.attributesToUpdate?.attribute ?? []).map(a => ({ key: a.key, values: a.value != null && a.value !== "" ? [a.value] : [] })) }}',
						},
					},
				},
			}
		],
		default: 'create',
	},
];

export const userFields: INodeProperties[] = [

	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['list'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
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
				resource: ['user'],
				operation: ['list'],
				returnAll: [false],
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
				resource: ['user'],
				operation: ['list'],
				returnAll: [false],
			},
		},
		default: 0,
		description: 'Number of users to skip',
	},
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['get', 'update', 'delete'],
			},
		},
		default: null,
		required: true,
		description: 'The ID of the user',
		typeOptions: {
			minValue: 1,
		},
	},
	{
		displayName: 'Display Name',
		name: 'displayName',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['create'],
			},
		},
		default: '',
		required: true,
		description: 'The display name of the user',
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		typeOptions: {
			email: true
		},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['create'],
			},
		},
		default: '',
		required: true,
		placeholder: 'email@example.com',
		description: 'The primary email address of the user',
	},
	{
		displayName: 'Role ID',
		name: 'roleId',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['create'],
			},
		},
		required: true,
		default: 4,
		placeholder: '4',
		description: 'Role ID (1=Admin, 2=Privileged, 3=Editor, 4=Participant, 5=Social) or custom role ID',
	},
	{
		displayName: 'Attributes to Retrieve',
		name: 'attributesToRetrieve',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['list'],
			},
		},
		default: {},
		description: 'Attributes to retrieve (one value per attribute; add multiple entries for multiple attributes)',
		options: [
			{
				displayName: 'Attribute',
				name: 'attribute',
				values: [
					{
						displayName: 'Key',
						name: 'key',
						type: 'string',
						default: '',
						description: 'Attribute key (e.g. emailAddress)',
					}
				],
			},
		],
	},
	{
		displayName: 'Attributes to Update',
		name: 'attributesToUpdate',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['update'],
			},
		},
		default: {},
		description: 'Attributes to update (one value per attribute; add multiple entries for multiple attributes)',
		options: [
			{
				displayName: 'Attribute',
				name: 'attribute',
				values: [
					{
						displayName: 'Key',
						name: 'key',
						type: 'string',
						default: '',
						description: 'Attribute key (e.g. emailAddress)',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
						description: 'Single value for this attribute',
					},
				],
			},
		],
	},
	{
		displayName: 'Send Email',
		name: 'sendEmail',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['create'],
			},
		},
		default: false,
		description: 'Whether to send email notification',
	},
];
