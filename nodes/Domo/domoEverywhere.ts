import { IExecuteSingleFunctions, IHttpRequestOptions, INodeProperties } from 'n8n-workflow';
import { preSendLogger } from './shared/preSendLogger';

// ─── preSend helpers ──────────────────────────────────────────────────────────

async function preSendUpdateSubscription(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const publicationId = this.getNodeParameter('publicationId') as string;
	const domain = this.getNodeParameter('subscriptionDomain', '') as string;
	const customerId = this.getNodeParameter('customerId', '') as string;
	const userId = this.getNodeParameter('userId', 0) as number;
	const userIdsData = this.getNodeParameter('userIds') as { userId: Array<{ id: number }> };
	const groupIdsData = this.getNodeParameter('groupIds') as { groupId: Array<{ id: number }> };

	const userIds: number[] = userIdsData?.userId ? userIdsData.userId.map((u) => u.id) : [];
	const groupIds: number[] = groupIdsData?.groupId ? groupIdsData.groupId.map((g) => g.id) : [];

	const body: Record<string, unknown> = { publicationId };
	if (domain) body.domain = domain;
	if (customerId) body.customerId = customerId;
	if (userId) body.userId = userId;
	if (userIds.length) body.userIds = userIds;
	if (groupIds.length) body.groupIds = groupIds;

	requestOptions.body = body;
	return requestOptions;
}

// ─── Operations ───────────────────────────────────────────────────────────────

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
		options: [
			// ── Publications ────────────────────────────────────────────────────
			{
				name: 'Count Invites',
				value: 'countInvites',
				action: 'Count subscription invites',
				routing: {
					request: {
						method: 'GET',
						url: '/publish/v2/subscriptions/invites/counts',
						qs: {
							searchTerm: '={{ $parameter.searchTerm || undefined }}',
						},
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Count Subscription Summaries',
				value: 'countSubscriptionSummaries',
				action: 'Count subscription summaries',
				routing: {
					request: {
						method: 'GET',
						url: '/publish/v2/subscriptions/summaries/counts',
						qs: {
							searchTerm: '={{ $parameter.searchTerm || undefined }}',
						},
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Get Publication',
				value: 'getPublication',
				action: 'Get a publication by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/publish/v2/publications/{{$parameter.publicationId}}',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Get Publication Status',
				value: 'getPublicationStatus',
				action: 'Get publication status',
				routing: {
					request: {
						method: 'GET',
						url: '/publish/v2/publications/status',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Get Publication Summary',
				value: 'getPublicationSummary',
				action: 'Get summary for a publication',
				routing: {
					request: {
						method: 'GET',
						url: '=/publish/v2/publications/summaries/{{$parameter.publicationId}}',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Get Subscription Share',
				value: 'getSubscriptionShare',
				action: 'Get share details for a subscription',
				routing: {
					request: {
						method: 'GET',
						url: '=/publish/v2/subscriptions/{{$parameter.subscriptionId}}/share',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'List Automatic Subscription Shares',
				value: 'listAutomaticSubscriptionShares',
				action: 'List automatic subscription shares',
				routing: {
					request: {
						method: 'GET',
						url: '/publish/v2/automatic-subscriptions/shares/v1',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'List Automatic Subscriptions',
				value: 'listAutomaticSubscriptions',
				action: 'List automatic subscriptions',
				routing: {
					request: {
						method: 'GET',
						url: '/publish/v2/automatic-subscriptions',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'List Invites',
				value: 'listInvites',
				action: 'List subscription invites',
				routing: {
					request: {
						method: 'GET',
						url: '/publish/v2/subscriptions/invites',
						qs: {
							limit: '={{ $parameter.limit }}',
							offset: '={{ $parameter.offset }}',
						},
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'List Publications',
				value: 'listPublications',
				action: 'List all publications',
				routing: {
					request: {
						method: 'GET',
						url: '/publish/v2/publications',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'List Publication Summaries',
				value: 'listPublicationSummaries',
				action: 'List publication summaries',
				routing: {
					request: {
						method: 'GET',
						url: '/publish/v2/publications/summaries',
						qs: {
							public: '={{ $parameter.isPublic }}',
							limit: '={{ $parameter.limit }}',
							offset: '={{ $parameter.offset }}',
							searchTerm: '={{ $parameter.searchTerm || undefined }}',
							sort: '={{ $parameter.sort }}',
						},
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'List Subscription Summaries',
				value: 'listSubscriptionSummaries',
				action: 'List subscription summaries',
				routing: {
					request: {
						method: 'GET',
						url: '/publish/v2/subscriptions/summaries',
						qs: {
							limit: '={{ $parameter.limit }}',
							offset: '={{ $parameter.offset }}',
							searchTerm: '={{ $parameter.searchTerm || undefined }}',
						},
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Update Subscription',
				value: 'updateSubscription',
				action: 'Update a subscription',
				routing: {
					request: {
						method: 'PUT',
						url: '=/publish/v2/subscriptions/{{$parameter.subscriptionId}}',
					},
					send: { preSend: [preSendUpdateSubscription, preSendLogger] },
				},
			},
		],
		default: 'listPublications',
	},
];

// ─── Fields ───────────────────────────────────────────────────────────────────

export const domoEverywhereFields: INodeProperties[] = [
	// ── Shared: Publication ID ────────────────────────────────────────────────
	{
		displayName: 'Publication ID',
		name: 'publicationId',
		type: 'string',
		required: true,
		default: '',
		description: 'UUID of the publication',
		displayOptions: {
			show: {
				resource: ['domoEverywhere'],
				operation: ['getPublication', 'getPublicationSummary', 'updateSubscription'],
			},
		},
	},

	// ── Shared: Subscription ID ───────────────────────────────────────────────
	{
		displayName: 'Subscription ID',
		name: 'subscriptionId',
		type: 'string',
		required: true,
		default: '',
		description: 'UUID of the subscription',
		displayOptions: {
			show: {
				resource: ['domoEverywhere'],
				operation: ['getSubscriptionShare', 'updateSubscription'],
			},
		},
	},

	// ── Shared: limit / offset ────────────────────────────────────────────────
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 50,
		description: 'Max number of results to return',
		displayOptions: {
			show: {
				resource: ['domoEverywhere'],
				operation: ['listPublicationSummaries', 'listSubscriptionSummaries', 'listInvites'],
			},
		},
	},
	{
		displayName: 'Offset',
		name: 'offset',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['domoEverywhere'],
				operation: ['listPublicationSummaries', 'listSubscriptionSummaries', 'listInvites'],
			},
		},
	},

	// ── Shared: search term ───────────────────────────────────────────────────
	{
		displayName: 'Search Term',
		name: 'searchTerm',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['domoEverywhere'],
				operation: [
					'listPublicationSummaries',
					'listSubscriptionSummaries',
					'listInvites',
					'countSubscriptionSummaries',
					'countInvites',
				],
			},
		},
	},

	// ── List Publication Summaries ────────────────────────────────────────────
	{
		displayName: 'Public Only',
		name: 'isPublic',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['domoEverywhere'],
				operation: ['listPublicationSummaries'],
			},
		},
	},
	{
		displayName: 'Sort',
		name: 'sort',
		type: 'options',
		default: 'NAME_ASC',
		options: [
			{ name: 'Name (A → Z)', value: 'NAME_ASC' },
			{ name: 'Name (Z → A)', value: 'NAME_DESC' },
		],
		displayOptions: {
			show: {
				resource: ['domoEverywhere'],
				operation: ['listPublicationSummaries'],
			},
		},
	},

	// ── Update Subscription ───────────────────────────────────────────────────
	{
		displayName: 'Domain',
		name: 'subscriptionDomain',
		type: 'string',
		default: '',
		description: 'Subscriber domain',
		displayOptions: {
			show: {
				resource: ['domoEverywhere'],
				operation: ['updateSubscription'],
			},
		},
	},
	{
		displayName: 'Customer ID',
		name: 'customerId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['domoEverywhere'],
				operation: ['updateSubscription'],
			},
		},
	},
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['domoEverywhere'],
				operation: ['updateSubscription'],
			},
		},
	},
	{
		displayName: 'Additional User IDs',
		name: 'userIds',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true },
		default: {},
		description: 'Additional users to include in the subscription',
		displayOptions: {
			show: {
				resource: ['domoEverywhere'],
				operation: ['updateSubscription'],
			},
		},
		options: [
			{
				name: 'userId',
				displayName: 'User',
				values: [
					{
						displayName: 'User ID',
						name: 'id',
						type: 'number',
						default: 0,
					},
				],
			},
		],
	},
	{
		displayName: 'Group IDs',
		name: 'groupIds',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true },
		default: {},
		description: 'Groups to include in the subscription',
		displayOptions: {
			show: {
				resource: ['domoEverywhere'],
				operation: ['updateSubscription'],
			},
		},
		options: [
			{
				name: 'groupId',
				displayName: 'Group',
				values: [
					{
						displayName: 'Group ID',
						name: 'id',
						type: 'number',
						default: 0,
					},
				],
			},
		],
	},
];
