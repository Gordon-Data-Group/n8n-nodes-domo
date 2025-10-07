import { INodeProperties } from 'n8n-workflow';

export const alertOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['alert'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new alert',
				action: 'Create alert',
				routing: {
					request: {
						method: 'POST',
						url: '/api/content/v1/alerts',
						body: '={{JSON.parse($parameter.alertData)}}',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an alert',
				action: 'Delete alert',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/content/v1/alerts/" + $parameter.alertId }}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a specific alert by ID',
				action: 'Get alert',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/content/v1/alerts/" + $parameter.alertId }}',
					},
				},
			},
			{
				name: 'List',
				value: 'list',
				description: 'Get a list of all alerts',
				action: 'List alerts',
				routing: {
					request: {
						method: 'GET',
						url: '/api/content/v1/alerts',
						qs: {
							limit: '={{Math.min($parameter.limit || 50, 500)}}',
							offset: '={{$parameter.offset || 0}}',
						},
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an alert',
				action: 'Update alert',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/content/v1/alerts/" + $parameter.alertId }}',
						body: '={{JSON.parse($parameter.alertData)}}',
					},
				},
			},
		],
		default: 'list',
	},
];

export const alertFields: INodeProperties[] = [
	// Alert ID field (for get, update, delete)
	{
		displayName: 'Alert ID',
		name: 'alertId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['get', 'update', 'delete'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the alert',
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
				resource: ['alert'],
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
				resource: ['alert'],
				operation: ['list'],
			},
		},
		default: 0,
		description: 'Number of alerts to skip',
	},
	// Create and Update operation fields
	{
		displayName: 'Alert Data',
		name: 'alertData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['create', 'update'],
			},
		},
		default: '{}',
		required: true,
		description: 'JSON object containing alert configuration',
		placeholder: '{"name":"Alert Name","cardId":123,"description":"Alert description","conditions":[{"operator":"GREATER_THAN","value":100}]}',
	},
];

