import type { INodeProperties } from 'n8n-workflow';

export const rolesOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['roles'],
			},
		},
	default: 'list-roles',
	options: [
	{
		name: 'Get Role',
		value: 'get-role',
		action: 'Get role',
		routing: {
			request: {
				method: 'GET',
				url: '={{ "/api/authorization/v1/roles/" + $parameter.id }}',
			},
		},
	},
	{
		name: 'Get Role Authorities (Grants)',
		value: 'get-role-authorities-grants',
		action: 'Get role authorities grants',
		routing: {
			request: {
				method: 'GET',
				url: '={{ "/api/authorization/v1/roles/" + $parameter.id + "/authorities" }}',
			},
		},
	},
	{
		name: 'Get Users for Authority (Grant)',
		value: 'get-users-for-authority-grant',
		action: 'Get users for authority grant',
		routing: {
			request: {
				method: 'GET',
				url: '/api/content/v1/typeahead',
			},
		},
	},
	{
		name: 'List Authorities (Grants)',
		value: 'list-authorities-grants',
		action: 'List authorities grants',
		routing: {
			request: {
				method: 'GET',
				url: '/api/authorization/v1/authorities',
			},
		},
	},
	{
		name: 'List Roles',
		value: 'list-roles',
		action: 'List roles',
		routing: {
			request: {
				method: 'GET',
				url: '/api/authorization/v1/roles',
			},
		},
	},
	],
	},
];

export const rolesFields: INodeProperties[] = [
	{
		displayName: 'Role ID',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['roles'],
				operation: ['get-role', 'get-role-authorities-grants'],
			},
		},
		default: '',
		description: 'The ID of the role',
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
				resource: ['roles'],
				operation: ['get-users-for-authority-grant'],
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
		displayName: 'Authorities',
		name: 'authorities',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['roles'],
				operation: ['get-users-for-authority-grant'],
			},
		},
		default: '',
		description: 'The authorities parameter',
		routing: {
			request: {
				qs: {
					authorities: '={{$parameter.authorities}}',
				},
			},
		},
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['roles'],
				operation: ['get-users-for-authority-grant'],
			},
		},
		default: '',
		description: 'The type parameter',
		routing: {
			request: {
				qs: {
					type: '={{$parameter.type}}',
				},
			},
		},
	},
	{
		displayName: 'Filter',
		name: 'filter',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['roles'],
				operation: ['get-users-for-authority-grant'],
			},
		},
		default: '',
		description: 'The filter parameter',
		routing: {
			request: {
				qs: {
					filter: '={{$parameter.filter}}',
				},
			},
		},
	},
	{
		displayName: 'Fields',
		name: 'fields',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['roles'],
				operation: ['get-users-for-authority-grant'],
			},
		},
		default: '',
		description: 'The fields parameter',
		routing: {
			request: {
				qs: {
					fields: '={{$parameter.fields}}',
				},
			},
		},
	},
];
