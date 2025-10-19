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
		default: 'listPublications',
		options: [
			{
				name: 'Count Invites',
				value: 'countInvites',
				action: 'Count invites',
				routing: {
					request: {
						method: 'GET',
						url: '/api/publish/v2/subscriptions/invites/counts',
						qs: {
							searchTerm: '={{$parameter.searchTerm}}',
						},
					},
				},
			},
			{
				name: 'Count Summaries',
				value: 'countSummaries',
				action: 'Count summaries',
				routing: {
					request: {
						method: 'GET',
						url: '/api/publish/v2/subscriptions/summaries/counts',
						qs: {
							searchTerm: '={{$parameter.searchTerm}}',
						},
					},
				},
			},
			{
				name: 'Get Publication',
				value: 'getPublication',
				action: 'Get publication',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/publish/v2/publications/" + $parameter.publicationId }}',
					},
				},
			},
			{
				name: 'Get Status',
				value: 'getStatus',
				action: 'Get status',
				routing: {
					request: {
						method: 'GET',
						url: '/api/publish/v2/publications/status',
					},
				},
			},
			{
				name: 'Get Subscription Share',
				value: 'getSubscriptionShare',
				action: 'Get subscription share',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/publish/v2/subscriptions/" + $parameter.subscriptionId + "/share" }}',
					},
				},
			},
			{
				name: 'Get Summary',
				value: 'getSummary',
				action: 'Get summary',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/publish/v2/publications/summaries/" + $parameter.summaryPublicationId }}',
					},
				},
			},
			{
				name: 'List Automatic Subscription Shares',
				value: 'listAutomaticSubscriptionShares',
				action: 'List automatic subscription shares',
				routing: {
					request: {
						method: 'GET',
						url: '/api/publish/v2/automatic-subscriptions/shares/v1',
					},
				},
			},
			{
				name: 'List Automatic Subscriptions',
				value: 'listAutomaticSubscriptions',
				action: 'List automatic subscriptions',
				routing: {
					request: {
						method: 'GET',
						url: '/api/publish/v2/automatic-subscriptions',
					},
				},
			},
			{
				name: 'List Invites',
				value: 'listInvites',
				action: 'List invites',
				routing: {
					request: {
						method: 'GET',
						url: '/api/publish/v2/subscriptions/invites',
						qs: {
							searchTerm: '={{$parameter.searchTerm}}',
							limit: '={{$parameter.limit}}',
							offset: '={{$parameter.offset}}',
						},
					},
				},
			},
			{
				name: 'List Publications',
				value: 'listPublications',
				action: 'List publications',
				routing: {
					request: {
						method: 'GET',
						url: '/api/publish/v2/publications',
					},
				},
			},
			{
				name: 'List Publication Summaries',
				value: 'listPublicationSummaries',
				action: 'List publication summaries',
				routing: {
					request: {
						method: 'GET',
						url: '/api/publish/v2/publications/summaries',
						qs: {
							public: '={{$parameter.public}}',
							limit: '={{$parameter.limit}}',
							offset: '={{$parameter.offset}}',
							searchTerm: '={{$parameter.searchTerm}}',
							sort: '={{$parameter.sort}}',
						},
					},
				},
			},
			{
				name: 'List Subscription Summaries',
				value: 'listSubscriptionSummaries',
				action: 'List subscription summaries',
				routing: {
					request: {
						method: 'GET',
						url: '/api/publish/v2/subscriptions/summaries',
						qs: {
							searchTerm: '={{$parameter.searchTerm}}',
							limit: '={{$parameter.limit}}',
							offset: '={{$parameter.offset}}',
						},
					},
				},
			},
			{
				name: 'Update Subscription',
				value: 'updateSubscription',
				action: 'Update subscription',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/publish/v2/subscriptions/" + $parameter.subscriptionId }}',
						body: '={{JSON.parse($parameter.subscriptionData)}}',
					},
				},
			},
		],
	},
];

export const domoEverywhereFields: INodeProperties[] = [
	// Publication ID field
	{
		displayName: 'Publication ID',
		name: 'publicationId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['domoEverywhere'],
				operation: ['getPublication'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the publication',
	},
	// Summary Publication ID field (for get summary)
	{
		displayName: 'Publication ID',
		name: 'summaryPublicationId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['domoEverywhere'],
				operation: ['getSummary'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the publication',
	},
	// Subscription ID field
	{
		displayName: 'Subscription ID',
		name: 'subscriptionId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['domoEverywhere'],
				operation: ['getSubscriptionShare', 'updateSubscription'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the subscription',
	},
	// List fields
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
				operation: ['listPublicationSummaries', 'listSubscriptionSummaries', 'listInvites'],
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
				resource: ['domoEverywhere'],
				operation: ['listPublicationSummaries', 'listSubscriptionSummaries', 'listInvites'],
			},
		},
		default: 0,
		description: 'Number of items to skip',
	},
	{
		displayName: 'Search Term',
		name: 'searchTerm',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['domoEverywhere'],
				operation: [
					'countSummaries',
					'countInvites',
					'listInvites',
					'listPublicationSummaries',
					'listSubscriptionSummaries',
				],
			},
		},
		default: '',
		description: 'Search term to filter results',
	},
	{
		displayName: 'Public',
		name: 'public',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['domoEverywhere'],
				operation: ['listPublicationSummaries'],
			},
		},
		default: '',
		description: 'Filter by public status',
	},
	{
		displayName: 'Sort',
		name: 'sort',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['domoEverywhere'],
				operation: ['listPublicationSummaries'],
			},
		},
		default: '',
		description: 'Sort parameter for results',
	},
	// Update subscription field
	{
		displayName: 'Subscription Data',
		name: 'subscriptionData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['domoEverywhere'],
				operation: ['updateSubscription'],
			},
		},
		default: '',
		placeholder: '{"publicationID":"00000000-0000-0000-0000-000000000000","domain":"example.com","customerID":"customer123","userID":1234,"userIDs":[2345,3456],"groupIDs":[4567]}',
		required: true,
		description: 'JSON object containing subscription configuration',
	},
];
