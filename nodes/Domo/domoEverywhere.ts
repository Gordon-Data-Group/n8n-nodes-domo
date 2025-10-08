import type { INodeProperties } from 'n8n-workflow';

export const domoEverywhereOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['domoEverywhere'],
			},
		},
	default: 'list-publications',
	options: [
	{
		name: 'Count Invites',
		value: 'count-invites',
		action: 'Count invites',
		routing: {
			request: {
				method: 'GET',
				url: '/publish/v2/subscriptions/invites/counts',
			},
		},
	},
	{
		name: 'Count Summaries',
		value: 'count-summaries',
		action: 'Count summaries',
		routing: {
			request: {
				method: 'GET',
				url: '/publish/v2/subscriptions/summaries/counts',
			},
		},
	},
	{
		name: 'Get Publication',
		value: 'get-publication',
		action: 'Get publication',
		routing: {
			request: {
				method: 'GET',
				url: '/publish/v2/publications/={{$parameter.id}}',
			},
		},
	},
	{
		name: 'Get Status',
		value: 'get-status',
		action: 'Get status',
		routing: {
			request: {
				method: 'GET',
				url: '/publish/v2/publications/status',
			},
		},
	},
	{
		name: 'Get Subscription Share',
		value: 'get-subscription-share',
		action: 'Get subscription share',
		routing: {
			request: {
				method: 'GET',
				url: '/publish/v2/subscriptions/={{$parameter.subscriptionId}}/share',
			},
		},
	},
	{
		name: 'Get Summary',
		value: 'get-summary',
		action: 'Get summary',
		routing: {
			request: {
				method: 'GET',
				url: '/publish/v2/publications/summaries/={{$parameter.publicationId}}',
			},
		},
	},
	{
		name: 'List Automatic Subscription Shares',
		value: 'list-automatic-subscription-shares',
		action: 'List automatic subscription shares',
		routing: {
			request: {
				method: 'GET',
				url: '/publish/v2/automatic-subscriptions/shares/v1',
			},
		},
	},
	{
		name: 'List Automatic Subscriptions',
		value: 'list-automatic-subscriptions',
		action: 'List automatic subscriptions',
		routing: {
			request: {
				method: 'GET',
				url: '/publish/v2/automatic-subscriptions',
			},
		},
	},
	{
		name: 'List Invites',
		value: 'list-invites',
		action: 'List invites',
		routing: {
			request: {
				method: 'GET',
				url: '/publish/v2/subscriptions/invites',
			},
		},
	},
	{
		name: 'List Publications',
		value: 'list-publications',
		action: 'List publications',
		routing: {
			request: {
				method: 'GET',
				url: '/publish/v2/publications',
			},
		},
	},
	{
		name: 'List Summaries',
		value: 'list-summaries',
		action: 'List summaries',
		routing: {
			request: {
				method: 'GET',
				url: '/publish/v2/publications/summaries',
			},
		},
	},
	{
		name: 'Update Subscription',
		value: 'update-subscription',
		action: 'Update subscription',
		routing: {
			request: {
				method: 'PUT',
				url: '/publish/v2/subscriptions/={{$parameter.subscriptionId}}',
			},
		},
	},
	],
	},
];

export const domoEverywhereFields: INodeProperties[] = [
		{
			displayName: 'Limit',
			name: 'limit',
			type: 'number',
			typeOptions: {
				minValue: 1,
			},
			displayOptions: {
				show: {
					resource: ['domoEverywhere'],
					operation: ['list-summaries'],
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
					resource: ['domoEverywhere'],
					operation: ['list-summaries'],
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
		{
			displayName: 'Public',
			name: 'public',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['domoEverywhere'],
					operation: ['list-summaries'],
				},
			},
			default: '',
			description: 'The public parameter',
			routing: {
				request: {
					qs: {
						public: '={{$parameter.public}}',
					},
				},
			},
		},
		{
			displayName: 'Sort',
			name: 'sort',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['domoEverywhere'],
					operation: ['list-summaries'],
				},
			},
			default: '',
			description: 'The sort parameter',
			routing: {
				request: {
					qs: {
						sort: '={{$parameter.sort}}',
					},
				},
			},
		},
		{
			displayName: 'Publication ID',
			name: 'id',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					resource: ['domoEverywhere'],
					operation: ['get-publication'],
				},
			},
			default: '',
			description: 'The ID oof the publication',
		},
		{
			displayName: 'Publication ID',
			name: 'publicationId',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					resource: ['domoEverywhere'],
					operation: ['get-summary'],
				},
			},
			default: '',
			description: 'The ID of the publication',
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
					resource: ['domoEverywhere'],
					operation: ['list-summaries'],
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
					resource: ['domoEverywhere'],
					operation: ['list-summaries'],
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
		{
			displayName: 'Limit',
			name: 'limit',
			type: 'number',
			typeOptions: {
				minValue: 1,
			},
			displayOptions: {
				show: {
					resource: ['domoEverywhere'],
					operation: ['list-invites'],
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
					resource: ['domoEverywhere'],
					operation: ['list-invites'],
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
		{
			displayName: 'SearchTerm',
			name: 'searchTerm',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['domoEverywhere'],
					operation: ['count-summaries', 'count-invites', 'list-invites', 'list-summaries'],
				},
			},
			default: '',
			description: 'The searchTerm parameter',
			routing: {
				request: {
					qs: {
						searchTerm: '={{$parameter.searchTerm}}',
					},
				},
			},
		},
		{
			displayName: 'Subscription ID',
			name: 'subscriptionId',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					resource: ['domoEverywhere'],
					operation: ['get-subscription-share', 'update-subscription'],
				},
			},
			default: '',
			description: 'The ID of the subscription',
		},
		{
			displayName: 'Data',
			name: 'data',
			type: 'json',
			required: true,
			displayOptions: {
				show: {
					resource: ['domoEverywhere'],
					operation: ['update-subscription'],
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
];
