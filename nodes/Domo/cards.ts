import { IExecuteSingleFunctions, IHttpRequestOptions, INodeProperties } from 'n8n-workflow';
import { preSendLogger } from './shared/preSendLogger';

// ─── preSend helpers ──────────────────────────────────────────────────────────

async function preSendListSearchCards(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const query = this.getNodeParameter('searchQuery', '*') as string;
	const count = this.getNodeParameter('count', 10000) as number;
	const offset = this.getNodeParameter('offset', 0) as number;

	requestOptions.body = {
		count,
		offset,
		combineResults: false,
		query: query || '*',
		filters: [],
		sort: {
			fieldSorts: [
				{ field: 'createDate', sortOrder: 'DESC' },
			],
		},
		facetValuesToInclude: [],
		facetValueLimit: 0,
		facetValueOffset: 0,
		includePhonetic: true,
		queryProfile: 'GLOBAL',
		entityList: [['card']],
	};
	return requestOptions;
}

async function preSendListCardsAdminSummary(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const ascending = this.getNodeParameter('ascending') as boolean;
	const orderBy = this.getNodeParameter('orderBy') as string;
	const includeCardTypeClause = this.getNodeParameter('includeCardTypeClause') as boolean;
	const addCardWithNoOwner = this.getNodeParameter('addCardWithNoOwner') as boolean;
	const includeCardTitleClause = this.getNodeParameter('includeCardTitleClause') as boolean;
	const includePageTitleClause = this.getNodeParameter('includePageTitleClause') as boolean;
	const notOnPage = this.getNodeParameter('notOnPage') as boolean;
	const includeLastModifiedDateClause = this.getNodeParameter(
		'includeLastModifiedDateClause',
	) as boolean;

	const body: Record<string, unknown> = {
		ascending,
		orderBy,
		addCardWithNoOwner,
		notOnPage,
	};

	if (includeCardTypeClause) {
		const cardTypesRaw = this.getNodeParameter('cardTypes') as string[];
		body.includeCardTypeClause = true;
		body.cardTypes = cardTypesRaw;
	}

	if (includeCardTitleClause) {
		const cardTitleSearchText = this.getNodeParameter('cardTitleSearchText', '') as string;
		body.includeCardTitleClause = true;
		body.cardTitleSearchText = cardTitleSearchText;
	}

	if (includePageTitleClause) {
		const pageIdsRaw = this.getNodeParameter('pageIds', '') as string;
		body.includePageTitleClause = true;
		body.pageIds = pageIdsRaw
			? pageIdsRaw
					.split(',')
					.map((s) => parseInt(s.trim(), 10))
					.filter((n) => !isNaN(n))
			: [];
	}

	if (includeLastModifiedDateClause) {
		const lastModifiedDateOperand = this.getNodeParameter(
			'lastModifiedDateOperand',
			'BETWEEN',
		) as string;
		const lastModifiedStartDate = this.getNodeParameter('lastModifiedStartDate', '') as string;
		const lastModifiedEndDate = this.getNodeParameter('lastModifiedEndDate', '') as string;
		body.includeLastModifiedDateClause = true;
		body.lastModifiedDateOperand = lastModifiedDateOperand;
		if (lastModifiedStartDate) body.lastModifiedStartDate = lastModifiedStartDate;
		if (lastModifiedEndDate) body.lastModifiedEndDate = lastModifiedEndDate;
	}

	requestOptions.body = body;
	return requestOptions;
}

async function preSendGetCardsViews(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const urnsRaw = this.getNodeParameter('urns') as string;
	const urns = urnsRaw
		.split(',')
		.map((s) => parseInt(s.trim(), 10))
		.filter((n) => !isNaN(n));
	requestOptions.body = { urns };
	return requestOptions;
}

async function preSendGetCardDetailsForUpdate(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const urn = this.getNodeParameter('cardUrn') as string;
	const dynamicText = this.getNodeParameter('dynamicText') as boolean;
	const variables = this.getNodeParameter('variables') as boolean;
	requestOptions.body = { urn, dynamicText, variables };
	return requestOptions;
}

async function preSendCreateProblem(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const message = this.getNodeParameter('problemMessage') as string;
	requestOptions.body = message;
	if (!requestOptions.headers) requestOptions.headers = {};
	(requestOptions.headers as Record<string, string>)['Content-Type'] = 'text/plain';
	return requestOptions;
}

async function preSendResolveProblem(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const state = this.getNodeParameter('problemState') as string;
	requestOptions.body = { state };
	return requestOptions;
}

async function preSendShareAccess(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const resourcesData = this.getNodeParameter('shareResources') as {
		resource: Array<{ id: string }>;
	};
	const recipientsData = this.getNodeParameter('shareRecipients') as {
		recipient: Array<{ type: string; id: string }>;
	};
	const message = this.getNodeParameter('shareMessage', '') as string;

	const resources = resourcesData?.resource
		? resourcesData.resource.map((r) => ({ type: 'badge', id: r.id }))
		: [];
	const recipients = recipientsData?.recipient ? recipientsData.recipient : [];

	requestOptions.body = { resources, recipients, message };
	return requestOptions;
}

async function preSendCreateCardChangeInHistory(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const comment = this.getNodeParameter('historyComment') as string;
	const changesRaw = this.getNodeParameter('historyChanges') as string;
	const changes = changesRaw ? JSON.parse(changesRaw) : {};
	requestOptions.body = { changes, comment };
	return requestOptions;
}

async function preSendLockUnlockCard(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const locked = this.getNodeParameter('locked') as boolean;
	requestOptions.body = { locked };
	return requestOptions;
}

async function preSendBulkAddCardsToPages(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const cardIdsRaw = this.getNodeParameter('cardIds') as string;
	const pageIdsRaw = this.getNodeParameter('destinationPageIds') as string;
	const cardIds = cardIdsRaw
		.split(',')
		.map((s) => s.trim())
		.filter(Boolean);
	const destinationPageIds = pageIdsRaw
		.split(',')
		.map((s) => parseInt(s.trim(), 10))
		.filter((n) => !isNaN(n));
	requestOptions.body = { cardIds, destinationPageIds };
	return requestOptions;
}

async function preSendMoveCard(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const pageIdsRaw = this.getNodeParameter('pageIds') as string;
	const pageIds = pageIdsRaw
		.split(',')
		.map((s) => parseInt(s.trim(), 10))
		.filter((n) => !isNaN(n));
	requestOptions.body = pageIds;
	return requestOptions;
}

async function preSendIncrementViews(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const urnsRaw = this.getNodeParameter('urns') as string;
	const context = this.getNodeParameter('viewContext') as string;
	const urns = urnsRaw
		.split(',')
		.map((s) => s.trim())
		.filter(Boolean);
	requestOptions.body = { urns, context };
	return requestOptions;
}

async function preSendUpdateOwners(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const cardIdsRaw = this.getNodeParameter('cardIds') as string;
	const ownersData = this.getNodeParameter('cardOwners') as {
		owner: Array<{ id: string; type: string }>;
	};
	const cardIds = cardIdsRaw
		.split(',')
		.map((s) => parseInt(s.trim(), 10))
		.filter((n) => !isNaN(n));
	const cardOwners = ownersData?.owner ? ownersData.owner : [];
	requestOptions.body = { cardIds, cardOwners };
	return requestOptions;
}

// ─── Operations ───────────────────────────────────────────────────────────────

export const cardOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['card'],
			},
		},
		options: [
			{
				name: 'Bulk Add Cards to Pages',
				value: 'bulkAddCardsToPages',
				action: 'Bulk add cards to pages without removing existing',
				routing: {
					request: {
						method: 'PUT',
						url: '/api/content/v1/cards/bulk/pages',
					},
					send: { preSend: [preSendBulkAddCardsToPages, preSendLogger] },
				},
			},
			{
				name: 'Create Card',
				value: 'createCard',
				action: 'Create a card',
				routing: {
					request: {
						method: 'PUT',
						url: '/api/content/v3/cards/kpi',
						qs: {
							pageId: '={{ $parameter.pageId || undefined }}',
							parentUrn: '={{ $parameter.parentUrn || undefined }}',
						},
						body: '={{JSON.parse($parameter.cardData)}}',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Create Card Change in History',
				value: 'createCardChangeInHistory',
				action: 'Create a change entry in card history',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/kpis/{{$parameter.cardId}}/history',
					},
					send: { preSend: [preSendCreateCardChangeInHistory, preSendLogger] },
				},
			},
			{
				name: 'Create Problem',
				value: 'createProblem',
				action: 'Create a problem issue on a card',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/content/v1/badges/{{$parameter.cardId}}/problems',
					},
					send: { preSend: [preSendCreateProblem, preSendLogger] },
				},
			},
			{
				name: 'Delete Cards',
				value: 'deleteCards',
				action: 'Delete cards',
				routing: {
					request: {
						method: 'DELETE',
						url: '/api/content/v1/cards/bulk',
						qs: {
							cardIds: '={{ $parameter.cardIdsQs }}',
						},
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Delete Drill Path',
				value: 'deleteDrillPath',
				action: 'Delete a drill path from a card',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/kpis/{{$parameter.cardId}}/drillPath/{{$parameter.drillNumber}}/drillView/{{$parameter.drillPathId}}',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Get Card Access',
				value: 'getCardAccess',
				action: 'Get access list for a card',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/content/v1/share/accesslist/badge/{{$parameter.cardId}}',
						qs: {
							expandUsers: '={{ $parameter.expandUsers }}',
						},
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Get Card Dataset Schema',
				value: 'getCardDataSetSchema',
				action: 'Get dataset columns and controls used by a card',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/content/v1/cards/{{$parameter.cardId}}/details',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Get Card Details for Update',
				value: 'getCardDetailsForUpdate',
				action: 'Get card definition object to use in update',
				routing: {
					request: {
						method: 'PUT',
						url: '/api/content/v3/cards/kpi/definition',
					},
					send: { preSend: [preSendGetCardDetailsForUpdate, preSendLogger] },
				},
			},
			{
				name: 'Get Card Problems',
				value: 'getCardProblems',
				action: 'Get problems issues for cards',
				routing: {
					request: {
						method: 'GET',
						url: '/api/content/v1/cards',
						qs: {
							urns: '={{ $parameter.urns }}',
							parts: '={{ $parameter.parts || undefined }}',
						},
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Get Cards',
				value: 'getCards',
				action: 'Get cards by ur ns',
				routing: {
					request: {
						method: 'GET',
						url: '/api/content/v1/cards',
						qs: {
							urns: '={{ $parameter.urns }}',
							parts: '={{ $parameter.parts || undefined }}',
							includeFiltered: '={{ $parameter.includeFiltered }}',
						},
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Get Cards for Dataset',
				value: 'getCardsForDataSet',
				action: 'Get cards that use a dataset',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/content/v1/datasources/{{$parameter.datasetId}}/cards',
						qs: {
							drill: '={{ $parameter.drill }}',
						},
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Get Cards Min/Max Dates',
				value: 'getCardsMinMaxDates',
				action: 'Get min and max dates for cards',
				routing: {
					request: {
						method: 'GET',
						url: '/api/content/v1/cards/minmaxdates',
						qs: {
							urns: '={{ $parameter.urns }}',
						},
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Get Cards User Has Access To',
				value: 'getCardsUserHasAccessTo',
				action: 'Get cards a user has access to',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/content/v1/access/users/{{$parameter.userId}}/cards',
						qs: {
							limit: '={{ $parameter.limit }}',
							offset: '={{ $parameter.offset }}',
						},
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Get Cards Views',
				value: 'getCardsViews',
				action: 'Get view counts for cards',
				routing: {
					request: {
						method: 'PUT',
						url: '/api/content/v1/analytics/views/cards/counts',
					},
					send: { preSend: [preSendGetCardsViews, preSendLogger] },
				},
			},
			{
				name: 'Get Chart Type Settings',
				value: 'getChartTypeSettings',
				action: 'Get settings for a chart type',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/content/v1/cards/kpi/{{$parameter.chartType}}/options',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Get Color Palette',
				value: 'getColorPalette',
				action: 'Get the color palette for cards',
				routing: {
					request: {
						method: 'GET',
						url: '/api/content/v1/cards/kpi/palette',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Get Linked Cards',
				value: 'getLinkedCards',
				action: 'Get cards linked to a card',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/content/v1/cards/{{$parameter.cardId}}/link',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Get Notebook Card',
				value: 'getNotebookCard',
				action: 'Get a notebook card by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/content/v1/cards/notebook/{{$parameter.cardId}}',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Increment Views',
				value: 'incrementViews',
				action: 'Increment view counts for cards',
				routing: {
					request: {
						method: 'PUT',
						url: '/api/content/v1/analytics/views/cards/increment',
					},
					send: { preSend: [preSendIncrementViews, preSendLogger] },
				},
			},
			{
				name: 'List Cards (Admin Summary)',
				value: 'listCardsAdminSummary',
				action: 'List cards with admin level summary and filters',
				routing: {
					request: {
						method: 'POST',
						url: '/api/content/v2/cards/adminsummary',
						qs: {
							limit: '={{ $parameter.limit }}',
							skip: '={{ $parameter.skip }}',
						},
					},
					send: { preSend: [preSendListCardsAdminSummary, preSendLogger] },
				},
			},
			{
				name: 'List/Search Cards',
				value: 'listSearchCards',
				action: 'Search cards by query',
				routing: {
					request: {
						method: 'POST',
						url: '/api/search/v1/query',
					},
					send: { preSend: [preSendListSearchCards, preSendLogger] },
				},
			},
			{
				name: 'Lock/Unlock Card',
				value: 'lockUnlockCard',
				action: 'Lock or unlock a card',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/content/v1/cards/{{$parameter.cardId}}',
					},
					send: { preSend: [preSendLockUnlockCard, preSendLogger] },
				},
			},
			{
				name: 'Move Card (Update Pages)',
				value: 'moveCard',
				action: 'Move a card to different pages',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/content/v1/cards/{{$parameter.cardId}}/pages',
					},
					send: { preSend: [preSendMoveCard, preSendLogger] },
				},
			},
			{
				name: 'Remove Access to Cards',
				value: 'removeAccessToCards',
				action: 'Remove entity access to cards',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/content/v1/share/bulk/badge/{{$parameter.accessType}}/{{$parameter.accessId}}',
						qs: {
							resourceIds: '={{ $parameter.resourceIds }}',
						},
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Remove Card From Page',
				value: 'removeCardFromPage',
				action: 'Remove a card from a page',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/kpis/{{$parameter.cardId}}/remove',
						qs: {
							pageid: '={{ $parameter.pageId }}',
						},
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Render Card (Data)',
				value: 'renderCard',
				action: 'Render card data',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/content/v1/cards/kpi/{{$parameter.cardId}}/render',
						qs: {
							parts: '={{ $parameter.parts || undefined }}',
						},
						body: '={{JSON.parse($parameter.renderData)}}',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Resolve Problem',
				value: 'resolveProblem',
				action: 'Resolve or reopen a card problem',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/content/v1/badges/{{$parameter.cardId}}/problems/{{$parameter.problemId}}/states',
					},
					send: { preSend: [preSendResolveProblem, preSendLogger] },
				},
			},
			{
				name: 'Share Access',
				value: 'shareAccess',
				action: 'Share card access with users or groups',
				routing: {
					request: {
						method: 'POST',
						url: '/api/content/v1/share',
						qs: {
							sendEmail: '={{ $parameter.sendEmail }}',
						},
					},
					send: { preSend: [preSendShareAccess, preSendLogger] },
				},
			},
			{
				name: 'Update Card',
				value: 'updateCard',
				action: 'Update a card definition',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/content/v3/cards/kpi/{{$parameter.cardId}}',
						body: '={{JSON.parse($parameter.cardData)}}',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Update Owners',
				value: 'updateOwners',
				action: 'Add or remove owners for cards',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/content/v1/cards/owners/{{$parameter.ownersAction}}',
					},
					send: { preSend: [preSendUpdateOwners, preSendLogger] },
				},
			},
			{
				name: 'Validate Move to New Dataset',
				value: 'validateMoveToNewDataSet',
				action: 'Validate moving a card to a new dataset',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/content/v1/cards/kpi/{{$parameter.cardId}}/comparemove/{{$parameter.datasetId}}',
					},
					send: { preSend: [preSendLogger] },
				},
			},
		],
		default: 'getCards',
	},
];

// ─── Fields ───────────────────────────────────────────────────────────────────

export const cardFields: INodeProperties[] = [
	// ── Shared: single card ID ────────────────────────────────────────────────
	{
		displayName: 'Card ID',
		name: 'cardId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: [
					'createCardChangeInHistory',
					'createProblem',
					'deleteDrillPath',
					'getCardAccess',
					'getCardDataSetSchema',
					'getLinkedCards',
					'getNotebookCard',
					'lockUnlockCard',
					'moveCard',
					'removeCardFromPage',
					'renderCard',
					'resolveProblem',
					'updateCard',
					'validateMoveToNewDataSet'
				],
			},
		},
	},

	// ── Shared: URNs (comma-separated card IDs) ───────────────────────────────
	{
		displayName: 'Card URNs',
		name: 'urns',
		type: 'string',
		required: true,
		default: '',
		placeholder: '12345, 23456',
		description: 'Comma-separated list of card URNs (numeric IDs)',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['getCardProblems', 'getCards', 'getCardsMinMaxDates', 'getCardsViews', 'incrementViews'],
			},
		},
	},

	// ── Shared: parts ─────────────────────────────────────────────────────────
	{
		displayName: 'Parts',
		name: 'parts',
		type: 'string',
		default: '',
		placeholder: 'title,owner',
		description: 'Comma-separated list of card parts to include in the response',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['getCardProblems', 'getCards', 'renderCard'],
			},
		},
	},

	// ── Get Cards ─────────────────────────────────────────────────────────────
	{
		displayName: 'Include Filtered',
		name: 'includeFiltered',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['getCards'],
			},
		},
	},

	// ── Get Card Access ───────────────────────────────────────────────────────
	{
		displayName: 'Expand Users',
		name: 'expandUsers',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['getCardAccess'],
			},
		},
	},

	// ── Get Cards for DataSet ─────────────────────────────────────────────────
	{
		displayName: 'Dataset ID',
		name: 'datasetId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['getCardsForDataSet', 'validateMoveToNewDataSet'],
			},
		},
	},
	{
		displayName: 'Include Drill Cards',
		name: 'drill',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['getCardsForDataSet'],
			},
		},
	},

	// ── Get Cards User Has Access To ──────────────────────────────────────────
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['getCardsUserHasAccessTo'],
			},
		},
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['getCardsUserHasAccessTo'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: { minValue: 1 },
		default: 50,
		description: 'Max number of results to return',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['getCardsUserHasAccessTo', 'listCardsAdminSummary'],
				returnAll: [false],
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
				resource: ['card'],
				operation: ['getCardsUserHasAccessTo'],
				returnAll: [false],
			},
		},
	},

	// ── Get Chart Type Settings ───────────────────────────────────────────────
	{
		displayName: 'Chart Type',
		name: 'chartType',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'badge_basic_table',
		description: 'Chart type identifier (e.g. badge_basic_table, badge_singlevalue)',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['getChartTypeSettings'],
			},
		},
	},

	// ── Get Card Details for Update ───────────────────────────────────────────
	{
		displayName: 'Card URN',
		name: 'cardUrn',
		type: 'string',
		required: true,
		default: '',
		description: 'Numeric URN of the card',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['getCardDetailsForUpdate'],
			},
		},
	},
	{
		displayName: 'Include Dynamic Text',
		name: 'dynamicText',
		type: 'boolean',
		default: true,
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['getCardDetailsForUpdate'],
			},
		},
	},
	{
		displayName: 'Include Variables',
		name: 'variables',
		type: 'boolean',
		default: true,
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['getCardDetailsForUpdate'],
			},
		},
	},

	// ── Create Problem ────────────────────────────────────────────────────────
	{
		displayName: 'Message',
		name: 'problemMessage',
		type: 'string',
		required: true,
		default: '',
		description: 'Problem description text',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['createProblem'],
			},
		},
	},

	// ── Resolve Problem ───────────────────────────────────────────────────────
	{
		displayName: 'Problem ID',
		name: 'problemId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['resolveProblem'],
			},
		},
	},
	{
		displayName: 'State',
		name: 'problemState',
		type: 'options',
		default: 'RESOLVED',
		options: [
			{ name: 'Resolved', value: 'RESOLVED' },
			{ name: 'Open', value: 'OPEN' },
		],
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['resolveProblem'],
			},
		},
	},

	// ── List/Search Cards ─────────────────────────────────────────────────────
	{
		displayName: 'Search Query',
		name: 'searchQuery',
		type: 'string',
		default: '*',
		description: 'Card name to search for. Use * for all cards.',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['listSearchCards'],
			},
		},
	},
	{
		displayName: 'Count',
		name: 'count',
		type: 'number',
		typeOptions: { minValue: 1 },
		default: 10000,
		description: 'Max number of results to return',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['listSearchCards'],
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
				resource: ['card'],
				operation: ['listSearchCards'],
			},
		},
	},

	// ── List Cards Admin Summary ──────────────────────────────────────────────
	{
		displayName: 'Skip',
		name: 'skip',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['listCardsAdminSummary'],
			},
		},
	},
	{
		displayName: 'Order By',
		name: 'orderBy',
		type: 'options',
		default: 'cardTitle',
		options: [
			{ name: 'Card Title', value: 'cardTitle' },
			{ name: 'Last Modified', value: 'lastModified' },
			{ name: 'Owner', value: 'owner' },
		],
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['listCardsAdminSummary'],
			},
		},
	},
	{
		displayName: 'Ascending',
		name: 'ascending',
		type: 'boolean',
		default: true,
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['listCardsAdminSummary'],
			},
		},
	},
	{
		displayName: 'Add Cards With No Owner',
		name: 'addCardWithNoOwner',
		type: 'boolean',
		default: true,
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['listCardsAdminSummary'],
			},
		},
	},
	{
		displayName: 'Not On Page',
		name: 'notOnPage',
		type: 'boolean',
		default: false,
		description: 'Whether to filter to cards not on any page',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['listCardsAdminSummary'],
			},
		},
	},
	{
		displayName: 'Filter by Card Type',
		name: 'includeCardTypeClause',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['listCardsAdminSummary'],
			},
		},
	},
	{
		displayName: 'Card Types',
		name: 'cardTypes',
		type: 'multiOptions',
		default: ['kpi', 'badge'],
		options: [
			{ name: 'KPI', value: 'kpi' },
			{ name: 'Badge', value: 'badge' },
		],
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['listCardsAdminSummary'],
				includeCardTypeClause: [true],
			},
		},
	},
	{
		displayName: 'Filter by Card Title',
		name: 'includeCardTitleClause',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['listCardsAdminSummary'],
			},
		},
	},
	{
		displayName: 'Card Title Search Text',
		name: 'cardTitleSearchText',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['listCardsAdminSummary'],
				includeCardTitleClause: [true],
			},
		},
	},
	{
		displayName: 'Filter by Page',
		name: 'includePageTitleClause',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['listCardsAdminSummary'],
			},
		},
	},
	{
		displayName: 'Page IDs',
		name: 'pageIds',
		type: 'string',
		default: '',
		placeholder: '123456, 234567',
		description: 'Comma-separated list of page IDs to filter by',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['listCardsAdminSummary'],
				includePageTitleClause: [true],
			},
		},
	},
	{
		displayName: 'Filter by Last Modified Date',
		name: 'includeLastModifiedDateClause',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['listCardsAdminSummary'],
			},
		},
	},
	{
		displayName: 'Date Operand',
		name: 'lastModifiedDateOperand',
		type: 'options',
		default: 'BETWEEN',
		options: [
			{ name: 'Between', value: 'BETWEEN' },
			{ name: 'After', value: 'AFTER' },
			{ name: 'Before', value: 'BEFORE' },
		],
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['listCardsAdminSummary'],
				includeLastModifiedDateClause: [true],
			},
		},
	},
	{
		displayName: 'Start Date',
		name: 'lastModifiedStartDate',
		type: 'string',
		default: '',
		placeholder: '2025-01-01',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['listCardsAdminSummary'],
				includeLastModifiedDateClause: [true],
			},
		},
	},
	{
		displayName: 'End Date',
		name: 'lastModifiedEndDate',
		type: 'string',
		default: '',
		placeholder: '2025-12-31',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['listCardsAdminSummary'],
				includeLastModifiedDateClause: [true],
			},
		},
	},

	// ── Lock/Unlock Card ──────────────────────────────────────────────────────
	{
		displayName: 'Locked',
		name: 'locked',
		type: 'boolean',
		default: true,
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['lockUnlockCard'],
			},
		},
	},

	// ── Create / Update Card (free-form JSON) ─────────────────────────────────
	{
		displayName: 'Card Data',
		name: 'cardData',
		type: 'json',
		required: true,
		default: '{}',
		description:
			'Full card definition as JSON. Use Get Card Details for Update to retrieve the current definition.',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['createCard', 'updateCard'],
			},
		},
	},

	// ── Create Card: optional page placement ──────────────────────────────────
	{
		displayName: 'Page ID',
		name: 'pageId',
		type: 'string',
		default: '',
		description: 'Page to place the new card on',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['createCard'],
			},
		},
	},
	{
		displayName: 'Parent URN',
		name: 'parentUrn',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['createCard'],
			},
		},
	},

	// ── Render Card ───────────────────────────────────────────────────────────
	{
		displayName: 'Render Data',
		name: 'renderData',
		type: 'json',
		required: true,
		default:
			'{"queryOverrides":{"filters":[],"overrideSlicers":false,"segments":[],"functionOverrides":{},"overrideDateRange":false},"width":960,"height":400,"scale":1,"treatLongsAsStrings":false}',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['renderCard'],
			},
		},
	},

	// ── Create Card Change in History ─────────────────────────────────────────
	{
		displayName: 'Comment',
		name: 'historyComment',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['createCardChangeInHistory'],
			},
		},
	},
	{
		displayName: 'Changes',
		name: 'historyChanges',
		type: 'json',
		default: '{"kpi":{"title":true,"description":true},"data":{},"initial":false}',
		description: 'Changes object describing what was modified',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['createCardChangeInHistory'],
			},
		},
	},

	// ── Share Access ──────────────────────────────────────────────────────────
	{
		displayName: 'Cards (Resources)',
		name: 'shareResources',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true },
		required: true,
		default: {},
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['shareAccess'],
			},
		},
		options: [
			{
				name: 'resource',
				displayName: 'Card',
				values: [
					{
						displayName: 'Card ID',
						name: 'id',
						type: 'string',
						default: '',
					},
				],
			},
		],
	},
	{
		displayName: 'Recipients',
		name: 'shareRecipients',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true },
		required: true,
		default: {},
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['shareAccess'],
			},
		},
		options: [
			{
				name: 'recipient',
				displayName: 'Recipient',
				values: [
					{
						displayName: 'Type',
						name: 'type',
						type: 'options',
						default: 'user',
						options: [
							{ name: 'User', value: 'user' },
							{ name: 'Group', value: 'group' },
						],
					},
					{
						displayName: 'ID',
						name: 'id',
						type: 'string',
						default: '',
					},
				],
			},
		],
	},
	{
		displayName: 'Message',
		name: 'shareMessage',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['shareAccess'],
			},
		},
	},
	{
		displayName: 'Send Email',
		name: 'sendEmail',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['shareAccess'],
			},
		},
	},

	// ── Bulk Add Cards to Pages ───────────────────────────────────────────────
	{
		displayName: 'Card IDs',
		name: 'cardIds',
		type: 'string',
		required: true,
		default: '',
		placeholder: '123, 234, 345',
		description: 'Comma-separated list of card IDs',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['bulkAddCardsToPages', 'updateOwners'],
			},
		},
	},
	{
		displayName: 'Destination Page IDs',
		name: 'destinationPageIds',
		type: 'string',
		required: true,
		default: '',
		placeholder: '123456, 234567',
		description: 'Comma-separated list of destination page IDs',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['bulkAddCardsToPages'],
			},
		},
	},

	// ── Move Card ─────────────────────────────────────────────────────────────
	{
		displayName: 'Page IDs',
		name: 'pageIds',
		type: 'string',
		required: true,
		default: '',
		placeholder: '123456, 234567',
		description: 'Comma-separated list of page IDs to assign the card to',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['moveCard'],
			},
		},
	},

	// ── Increment Views ───────────────────────────────────────────────────────
	{
		displayName: 'Context',
		name: 'viewContext',
		type: 'options',
		default: 'AUTHENTICATED',
		options: [
			{ name: 'Authenticated', value: 'AUTHENTICATED' },
			{ name: 'Embedded', value: 'EMBEDDED' },
		],
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['incrementViews'],
			},
		},
	},

	// ── Update Owners ─────────────────────────────────────────────────────────
	{
		displayName: 'Action',
		name: 'ownersAction',
		type: 'options',
		required: true,
		default: 'add',
		options: [
			{ name: 'Add', value: 'add' },
			{ name: 'Remove', value: 'remove' },
		],
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['updateOwners'],
			},
		},
	},
	{
		displayName: 'Owners',
		name: 'cardOwners',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true },
		default: {},
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['updateOwners'],
			},
		},
		options: [
			{
				name: 'owner',
				displayName: 'Owner',
				values: [
					{
						displayName: 'Type',
						name: 'type',
						type: 'options',
						default: 'USER',
						options: [
							{ name: 'User', value: 'USER' },
							{ name: 'Group', value: 'GROUP' },
						],
					},
					{
						displayName: 'ID',
						name: 'id',
						type: 'string',
						default: '',
					},
				],
			},
		],
	},

	// ── Remove Card from Page ─────────────────────────────────────────────────
	{
		displayName: 'Page ID',
		name: 'pageId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['removeCardFromPage'],
			},
		},
	},

	// ── Remove Access to Cards ────────────────────────────────────────────────
	{
		displayName: 'Entity Type',
		name: 'accessType',
		type: 'options',
		required: true,
		default: 'user',
		options: [
			{ name: 'User', value: 'user' },
			{ name: 'Group', value: 'group' },
		],
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['removeAccessToCards'],
			},
		},
	},
	{
		displayName: 'Entity ID',
		name: 'accessId',
		type: 'string',
		required: true,
		default: '',
		description: 'ID of the user or group to remove access from',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['removeAccessToCards'],
			},
		},
	},
	{
		displayName: 'Card IDs to Remove',
		name: 'resourceIds',
		type: 'string',
		required: true,
		default: '',
		placeholder: '12345, 23456',
		description: 'Comma-separated list of card IDs to remove access from',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['removeAccessToCards'],
			},
		},
	},

	// ── Delete Cards ──────────────────────────────────────────────────────────
	{
		displayName: 'Card IDs',
		name: 'cardIdsQs',
		type: 'string',
		required: true,
		default: '',
		placeholder: '12345, 23456',
		description: 'Comma-separated list of card IDs to delete',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['deleteCards'],
			},
		},
	},

	// ── Delete Drill Path ─────────────────────────────────────────────────────
	{
		displayName: 'Drill Number',
		name: 'drillNumber',
		type: 'number',
		required: true,
		default: 1,
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['deleteDrillPath'],
			},
		},
	},
	{
		displayName: 'Drill Path ID',
		name: 'drillPathId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['deleteDrillPath'],
			},
		},
	},
];
