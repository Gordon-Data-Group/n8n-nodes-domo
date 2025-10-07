import { INodeProperties } from 'n8n-workflow';
// import { IExecuteFunctions } from 'n8n-workflow';
// import { parseResponse } from './utils';

export const groupOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['group'],
			},
		},
		options: [
			{
				name: 'Create Group',
				value: 'create',
				description: 'Create a new group',
				action: 'Create group',
				routing: {
					request: {
						method: 'POST',
						url: '/api/content/v3/groups',
						body: {
							name: '={{$parameter.name}}',
							type: '={{$parameter.type}}',
							dynamicDefinition: '={{$parameter.dynamicDefinitionJson ? JSON.parse($parameter.dynamicDefinitionJson) : undefined}}',
						},
					},
				},
			},
			{
				name: 'Delete Group',
				value: 'delete',
				description: 'Delete a group by ID',
				action: 'Delete group',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/content/v2/groups/" + $parameter.groupId }}',
					},
				},
			},
			{
				name: 'Get Group',
				value: 'get',
				description: 'Get a specific group by ID',
				action: 'Get a group',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/content/v3/groups/" + $parameter.groupId }}',
						qs: {
							includeUsers: true,
						},
					},
				},
			},
			{
				name: 'List Groups',
				value: 'list',
				description: 'Get a list of groups',
				action: 'List groups',
				routing: {
					request: {
						method: 'GET',
						url: '/api/content/v3/groups',
						qs: {
							limit: '={{Math.min($parameter.limit || 50, 500)}}',
							offset: '={{$parameter.offset || 0}}',
						},
					},
				},
			},
			{
				name: 'Update Group',
				value: 'update',
				description: 'Update a group',
				action: 'Update group',
				routing: {
					request: {
						method: 'PUT',
						url: '/api/content/v2/groups',
						body: [{
							groupId: '={{$parameter.groupId}}',
							name: '={{$parameter.name}}',
							description: '={{$parameter.description}}',
						}],
					},
				},
			},
		],
		default: 'list',
	},
];

export const groupFields: INodeProperties[] = [
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['group'],
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
				resource: ['group'],
				operation: ['list'],
			},
		},
		default: 0,
		description: 'Number of groups to skip',
	},
	{
		displayName: 'Group ID',
		name: 'groupId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['get', 'delete', 'update'],
			},
		},
		default: null,
		required: true,
		description: 'The ID of the group',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		description: 'The name of the group',
		required: true,
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		description: 'The description of the group',
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['create'],
			},
		},
		options: [
			{
				name: 'Closed',
				value: 'closed',
			},
			{
				name: 'Open',
				value: 'open',
			},
			{
				name: 'Dynamic',
				value: 'dynamic',
			},
		],
		default: 'closed',
		description: 'The type of the group',
		required: true,
	},
	{
		displayName: 'Dynamic Definition JSON',
		name: 'dynamicDefinitionJson',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['create', 'update'],
				type: ['dynamic'],
			},
		},
		default: '',
		description: 'JSON structure for dynamic group definition with expressions',
		placeholder: '{\n      "expression": {\n        "operator": "OR",\n        "expressions": [...]\n      }\n    }',
	},
];
