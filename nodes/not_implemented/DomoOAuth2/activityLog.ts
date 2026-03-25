import type { INodeProperties } from 'n8n-workflow';

export const activityLogOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['activityLog'],
			},
		},
		default: 'retrieve-activity-log-entries',
		options: [
		{
			name: 'Retrieve Activity Log Entries',
			value: 'retrieve-activity-log-entries',
			action: 'Retrieve activity log entries',
			description: 'Retrieves activity log entries',
			routing: {
				request: {
					method: 'GET',
					url: '/v1/audit',
				},
			},
		},
		],
	},
];

export const activityLogFields: INodeProperties[] = [
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['activityLog'],
				operation: ['retrieve-activity-log-entries'],
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
				resource: ['activityLog'],
				operation: ['retrieve-activity-log-entries'],
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
