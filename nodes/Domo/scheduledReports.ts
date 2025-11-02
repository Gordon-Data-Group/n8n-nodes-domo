import type { INodeProperties } from 'n8n-workflow';

export const scheduledReportsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['scheduledReports'],
			},
		},
	default: 'list-scheduled-reports',
	options: [
	{
		name: 'Create Scheduled Report',
		value: 'create-scheduled-report',
		action: 'Create scheduled report',
		routing: {
			request: {
				method: 'POST',
				url: '/api/content/v1/reportschedules',
			},
		},
	},
	{
		name: 'Create View',
		value: 'create-view',
		action: 'Create view',
		routing: {
			request: {
				method: 'POST',
				url: '/api/content/v2/views',
			},
		},
	},
	{
		name: 'Delete Scheduled Report',
		value: 'delete-scheduled-report',
		action: 'Delete scheduled report',
		routing: {
			request: {
				method: 'DELETE',
				url: '={{ "/api/content/v1/reportschedules/" + $parameter.id }}',
			},
		},
	},
	{
		name: 'Delete Unsubscribe (Resubscribe Signed In/Token User)',
		value: 'delete-unsubscribe-resubscribe-signed-in-token-user',
		action: 'Delete unsubscribe resubscribe signed in token user',
		routing: {
			request: {
				method: 'DELETE',
				url: '={{ "/api/content/v1/reportschedules/" + $parameter.id + "/unsubscribe/recipient" }}',
			},
		},
	},
	{
		name: 'Enable/Disable Scheduled Report',
		value: 'enable-disable-scheduled-report',
		action: 'Enable disable scheduled report',
		routing: {
			request: {
				method: 'PUT',
				url: '={{ "/api/content/v1/reportschedules/" + $parameter.id + "/enabled" }}',
			},
		},
	},
	{
		name: 'Get Scheduled Report',
		value: 'get-scheduled-report',
		action: 'Get scheduled report',
		routing: {
			request: {
				method: 'GET',
				url: '={{ "/api/content/v1/reportschedules/" + $parameter.id }}',
			},
		},
	},
	{
		name: 'Get Scheduled Report History',
		value: 'get-scheduled-report-history',
		action: 'Get scheduled report history',
		routing: {
			request: {
				method: 'GET',
				url: '={{ "/api/content/v1/reportschedules/" + $parameter.id + "/history" }}',
			},
		},
	},
	{
		name: 'Get Scheduled Reports for Resource',
		value: 'get-scheduled-reports-for-resource',
		action: 'Get scheduled reports for resource',
		routing: {
			request: {
				method: 'GET',
				url: '={{ "/api/content/v1/reportschedules/resources/" + $parameter.resourceType + "/" + $parameter.resourceId }}',
			},
		},
	},
	{
		name: 'Get View',
		value: 'get-view',
		action: 'Get view',
		routing: {
			request: {
				method: 'GET',
				url: '={{ "/api/content/v2/views/" + $parameter.id }}',
			},
		},
	},
	{
		name: 'List Scheduled Report Resources',
		value: 'list-scheduled-report-resources',
		action: 'List scheduled report resources',
		routing: {
			request: {
				method: 'GET',
				url: '/api/content/v1/reportschedules/resources',
			},
		},
	},
	{
		name: 'List Scheduled Reports',
		value: 'list-scheduled-reports',
		action: 'List scheduled reports',
		routing: {
			request: {
				method: 'GET',
				url: '/api/content/v1/reportschedules',
			},
		},
	},
	{
		name: 'Search Scheduled Report History',
		value: 'search-scheduled-report-history',
		action: 'Search scheduled report history',
		routing: {
			request: {
				method: 'POST',
				url: '/api/content/v1/reportschedules/history/search',
			},
		},
	},
	{
		name: 'Send Scheduled Report',
		value: 'send-scheduled-report',
		action: 'Send scheduled report',
		routing: {
			request: {
				method: 'POST',
				url: '={{ "/api/content/v1/reportschedules/" + $parameter.id + "/sendnow" }}',
			},
		},
	},
	{
		name: 'Unsubscribe (Signed In/Token User)',
		value: 'unsubscribe-signed-in-token-user',
		action: 'Unsubscribe signed in token user',
		routing: {
			request: {
				method: 'POST',
				url: '={{ "/api/content/v1/reportschedules/" + $parameter.id + "/unsubscribe" }}',
			},
		},
	},
	{
		name: 'Update Scheduled Report',
		value: 'update-scheduled-report',
		action: 'Update scheduled report',
		routing: {
			request: {
				method: 'PUT',
				url: '={{ "/api/content/v1/reportschedules/" + $parameter.id }}',
			},
		},
	},
	{
		name: 'Update View',
		value: 'update-view',
		action: 'Update view',
		routing: {
			request: {
				method: 'PUT',
				url: '={{ "/api/content/v2/views/" + $parameter.id }}',
			},
		},
	},
	],
	},
];

export const scheduledReportsFields: INodeProperties[] = [
	{
		displayName: 'ID',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['scheduledReports'],
				operation: ['get-scheduled-report', 'get-scheduled-report-history', 'get-view', 'send-scheduled-report', 'update-scheduled-report', 'enable-disable-scheduled-report', 'update-view', 'delete-scheduled-report', 'delete-unsubscribe-resubscribe-signed-in-token-user', 'unsubscribe-signed-in-token-user'],
			},
		},
		default: '',
		description: 'The ID of the scheduled report or view',
	},
	{
		displayName: 'Resource Type',
		name: 'resourceType',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['scheduledReports'],
				operation: ['get-scheduled-reports-for-resource'],
			},
		},
		default: '',
		description: 'The type of the resource',
	},
	{
		displayName: 'Resource ID',
		name: 'resourceId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['scheduledReports'],
				operation: ['get-scheduled-reports-for-resource'],
			},
		},
		default: '',
		description: 'The ID of the resource',
	},
	{
		displayName: 'Data',
		name: 'data',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				resource: ['scheduledReports'],
				operation: ['search-scheduled-report-history', 'send-scheduled-report', 'create-scheduled-report', 'create-view', 'update-scheduled-report', 'enable-disable-scheduled-report', 'update-view'],
			},
		},
		default: '',
		description: 'The data to send',
		routing: {
			request: {
				body: {
					data: '={{JSON.parse($parameter.data)}}',
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
				resource: ['scheduledReports'],
				operation: ['list-scheduled-reports'],
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
			displayName: 'IsAscending',
			name: 'isAscending',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['scheduledReports'],
					operation: ['list-scheduled-reports'],
				},
			},
			default: '',
			description: 'The isAscending parameter',
			routing: {
				request: {
					qs: {
						isAscending: '={{$parameter.isAscending}}',
					},
				},
			},
		},
		{
			displayName: 'OrderBy',
			name: 'orderBy',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['scheduledReports'],
					operation: ['list-scheduled-reports'],
				},
			},
			default: '',
			description: 'The orderBy parameter',
			routing: {
				request: {
					qs: {
						orderBy: '={{$parameter.orderBy}}',
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
					resource: ['scheduledReports'],
					operation: ['list-scheduled-report-resources'],
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
			displayName: 'Skip',
			name: 'skip',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['scheduledReports'],
					operation: ['list-scheduled-report-resources'],
				},
			},
			default: '',
			description: 'The skip parameter',
			routing: {
				request: {
					qs: {
						skip: '={{$parameter.skip}}',
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
					resource: ['scheduledReports'],
					operation: ['get-scheduled-report-history'],
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
			displayName: 'Skip',
			name: 'skip',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['scheduledReports'],
					operation: ['get-scheduled-report-history'],
				},
			},
			default: '',
			description: 'The skip parameter',
			routing: {
				request: {
					qs: {
						skip: '={{$parameter.skip}}',
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
					resource: ['scheduledReports'],
					operation: ['get-scheduled-reports-for-resource'],
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
			displayName: 'Skip',
			name: 'skip',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['scheduledReports'],
					operation: ['get-scheduled-reports-for-resource'],
				},
			},
			default: '',
			description: 'The skip parameter',
			routing: {
				request: {
					qs: {
						skip: '={{$parameter.skip}}',
					},
				},
			},
		},
		{
			displayName: 'ShowAll',
			name: 'showAll',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['scheduledReports'],
					operation: ['get-scheduled-reports-for-resource'],
				},
			},
			default: '',
			description: 'The showAll parameter',
			routing: {
				request: {
					qs: {
						showAll: '={{$parameter.showAll}}',
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
					resource: ['scheduledReports'],
					operation: ['search-scheduled-report-history'],
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
			displayName: 'Skip',
			name: 'skip',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['scheduledReports'],
					operation: ['search-scheduled-report-history'],
				},
			},
			default: '',
			description: 'The skip parameter',
			routing: {
				request: {
					qs: {
						skip: '={{$parameter.skip}}',
					},
				},
			},
		},
];
