import { IExecuteSingleFunctions, IHttpRequestOptions, INodeProperties } from 'n8n-workflow';
import { preSendLogger } from './shared/preSendLogger';

// ─── preSend helpers ──────────────────────────────────────────────────────────

async function preSendListPagesAdminSummary(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const orderBy = this.getNodeParameter('orderBy') as string;
	const ascending = this.getNodeParameter('ascending') as boolean;
	const includeAllPages = this.getNodeParameter('includeAllPages') as boolean;
	const includeDetails = this.getNodeParameter('includeDetails') as boolean;
	const addPageWithNoOwner = this.getNodeParameter('addPageWithNoOwner') as boolean;
	const includePermissionsList = this.getNodeParameter('includePermissionsList') as boolean;
	const includePageTitleClause = this.getNodeParameter('includePageTitleClause') as boolean;
	const pageTitleSearchText = this.getNodeParameter('pageTitleSearchText', '') as string;
	const includeLastModifiedDateClause = this.getNodeParameter(
		'includeLastModifiedDateClause',
	) as boolean;
	const lastModifiedDateOperand = this.getNodeParameter('lastModifiedDateOperand', 'BETWEEN') as string;
	const lastModifiedStartDate = this.getNodeParameter('lastModifiedStartDate', '') as string;
	const lastModifiedEndDate = this.getNodeParameter('lastModifiedEndDate', '') as string;
	const includeCardCountClause = this.getNodeParameter('includeCardCountClause') as boolean;

	const body: Record<string, unknown> = {
		orderBy,
		ascending,
		includeAllPages,
		includeDetails,
		addPageWithNoOwner,
		includePermissionsList,
		includePageTitleClause,
		pageTitleSearchText,
		includeCardCountClause,
		includeLastModifiedDateClause,
	};

	if (includeLastModifiedDateClause) {
		body.lastModifiedDateOperand = lastModifiedDateOperand;
		if (lastModifiedStartDate) body.lastModifiedStartDate = lastModifiedStartDate;
		if (lastModifiedEndDate) body.lastModifiedEndDate = lastModifiedEndDate;
	}

	requestOptions.body = body;
	return requestOptions;
}

async function preSendShareAccess(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const resourcesData = this.getNodeParameter('resources') as {
		resource: Array<{ type: string; id: string }>;
	};
	const recipientsData = this.getNodeParameter('recipients') as {
		recipient: Array<{ type: string; id: string }>;
	};
	const message = this.getNodeParameter('message') as string;

	const resources = resourcesData?.resource ?? [];
	const recipients = recipientsData?.recipient ?? [];

	requestOptions.body = { resources, recipients, message };
	return requestOptions;
}

async function preSendMovePages(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const pageIdsRaw = this.getNodeParameter('pageIds') as string;
	const parentPageId = this.getNodeParameter('parentPageId') as number;
	const pagePermission = this.getNodeParameter('pagePermission') as string;

	const pageIds: number[] = pageIdsRaw
		? pageIdsRaw
				.split(',')
				.map((s) => parseInt(s.trim(), 10))
				.filter((n) => !isNaN(n))
		: [];

	const body: Record<string, unknown> = { pageIds, pagePermission };
	if (parentPageId) body.parentPageId = parentPageId;

	requestOptions.body = body;
	return requestOptions;
}

async function preSendDuplicatePage(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const pageTitle = this.getNodeParameter('pageTitle') as string;
	const parentPageId = this.getNodeParameter('parentPageId') as number;
	const cardPrefix = this.getNodeParameter('cardPrefix') as string;
	const beacon = this.getNodeParameter('beacon') as number;

	const body: Record<string, unknown> = { pageTitle };
	if (parentPageId) body.parentPageId = parentPageId;
	if (cardPrefix) body.cardPrefix = cardPrefix;
	if (beacon) body.beacon = beacon;

	requestOptions.body = body;
	return requestOptions;
}

async function preSendBulkRemoveOwners(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const ownersData = this.getNodeParameter('owners') as {
		owner: Array<{ id: number; type: string }>;
	};
	const pageIdsRaw = this.getNodeParameter('pageIds') as string;

	const owners = ownersData?.owner ?? [];
	const pageIds: number[] = pageIdsRaw
		? pageIdsRaw
				.split(',')
				.map((s) => parseInt(s.trim(), 10))
				.filter((n) => !isNaN(n))
		: [];

	requestOptions.body = { owners, pageIds };
	return requestOptions;
}

// ─── Operations ───────────────────────────────────────────────────────────────

export const pagesOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['page'] } },
		options: [
			{
				name: 'Bulk Remove Owners',
				value: 'bulkRemoveOwners',
				action: 'Bulk remove owners from pages',
				routing: {
					request: {
						method: 'POST',
						url: '/api/content/v1/pages/bulk/owners/remove',
					},
					send: {
						preSend: [preSendBulkRemoveOwners, preSendLogger],
					},
				},
			},
			{
				name: 'Create Page',
				value: 'createPage',
				action: 'Create a page',
				routing: {
					request: {
						method: 'POST',
						url: '/api/content/v1/pages',
						body: {
							title: '={{$parameter.title}}',
							parentPageId: '={{$parameter.parentPageId || 0}}',
						},
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Create Writelock',
				value: 'createWritelock',
				action: 'Create a writelock on a layout',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/content/v4/pages/layouts/{{$parameter.layoutId}}/writelock',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Delete Filter View',
				value: 'deleteFilterView',
				action: 'Delete a filter view',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/content/v3/pages/analyzer/{{$parameter.filterViewId}}',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Delete Page',
				value: 'deletePage',
				action: 'Delete a page',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/content/v1/pages/{{$parameter.pageId}}',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Delete Writelock',
				value: 'deleteWritelock',
				action: 'Delete a writelock from a layout',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/content/v4/pages/layouts/{{$parameter.layoutId}}/writelock',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Duplicate Page',
				value: 'duplicatePage',
				action: 'Duplicate a page',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/content/v1/pages/{{$parameter.pageId}}/duplicate',
						qs: {
							doNotDuplicateCards: '={{$parameter.doNotDuplicateCards}}',
						},
					},
					send: {
						preSend: [preSendDuplicatePage, preSendLogger],
					},
				},
			},
			{
				name: 'Duplicate Page Async',
				value: 'duplicatePageAsync',
				action: 'Duplicate a page asynchronously',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/content/v1/pages/{{$parameter.pageId}}/duplicateAsync',
						qs: {
							doNotDuplicateCards: '={{$parameter.doNotDuplicateCards}}',
						},
					},
					send: {
						preSend: [preSendDuplicatePage, preSendLogger],
					},
				},
			},
			{
				name: 'Get Access',
				value: 'getAccess',
				action: 'Get access list for a page',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/content/v1/share/accesslist/page/{{$parameter.pageId}}',
						qs: {
							filter: '={{$parameter.filter || undefined}}',
							limit: '={{$parameter.limit}}',
							expandUsers: '={{$parameter.expandUsers}}',
						},
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Get Layout',
				value: 'getLayout',
				action: 'Get a page layout',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/content/v4/pages/layouts/{{$parameter.layoutId}}',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Get Navigation Page Order (Individual User)',
				value: 'getNavigationPageOrder',
				action: 'Get navigation page order for the current user',
				routing: {
					request: {
						method: 'GET',
						url: '/api/content/v2/pages/navigation',
						qs: {
							includeStartPage: '={{$parameter.includeStartPage}}',
							elevateSharedPage: '={{$parameter.elevateSharedPage}}',
							includeHidden: '={{$parameter.includeHidden}}',
						},
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Get Page',
				value: 'getPage',
				action: 'Get a page by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/content/v3/stacks/{{$parameter.pageId}}',
						qs: {
							parts: '={{$parameter.parts || undefined}}',
							includeV4PageLayouts: '={{$parameter.includeV4PageLayouts}}',
						},
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Get Page with Cards',
				value: 'getPageWithCards',
				action: 'Get a page with its cards',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/content/v3/stacks/{{$parameter.pageId}}/cards',
						qs: {
							parts: '={{$parameter.parts || undefined}}',
							includeV4PageLayouts: '={{$parameter.includeV4PageLayouts}}',
						},
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'List Filter Views',
				value: 'listFilterViews',
				action: 'List filter views for a page',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/content/v3/pages/{{$parameter.pageId}}/analyzer/named',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'List Pages (Admin Summary)',
				value: 'listPagesAdminSummary',
				action: 'List pages with admin summary',
				routing: {
					request: {
						method: 'POST',
						url: '/api/content/v1/pages/adminsummary',
						qs: {
							limit: '={{$parameter.limit}}',
							skip: '={{$parameter.skip}}',
						},
					},
					send: {
						preSend: [preSendListPagesAdminSummary, preSendLogger],
					},
				},
			},
			{
				name: 'Move Pages',
				value: 'movePages',
				action: 'Move pages to a new parent',
				routing: {
					request: {
						method: 'PUT',
						url: '/api/content/v1/pages/bulk/move',
					},
					send: {
						preSend: [preSendMovePages, preSendLogger],
					},
				},
			},
			{
				name: 'Remove Access',
				value: 'removeAccess',
				action: 'Remove access from a page',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/content/v1/share/bulk/page/{{$parameter.shareType}}/{{$parameter.pageId}}',
						qs: {
							resourceIds: '={{$parameter.resourceIds || undefined}}',
						},
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Reorder Pages (Individual User)',
				value: 'reorderPages',
				action: 'Reorder pages for the current user',
				routing: {
					request: {
						method: 'PUT',
						url: '/api/content/v1/pages/pageorder',
						body: '={{JSON.parse($parameter.pageOrderData)}}',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Share Access',
				value: 'shareAccess',
				action: 'Share access to a page',
				routing: {
					request: {
						method: 'POST',
						url: '/api/content/v1/share',
						qs: {
							sendEmail: '={{$parameter.sendEmail}}',
						},
					},
					send: {
						preSend: [preSendShareAccess, preSendLogger],
					},
				},
			},
			{
				name: 'Update Filter View',
				value: 'updateFilterView',
				action: 'Update a filter view for a page',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/content/v3/pages/{{$parameter.pageId}}/analyzer',
						body: '={{JSON.parse($parameter.filterViewData)}}',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Update Layout',
				value: 'updateLayout',
				action: 'Update a page layout',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/content/v4/pages/layouts/{{$parameter.layoutId}}',
						body: '={{JSON.parse($parameter.layoutData)}}',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Update Page',
				value: 'updatePage',
				action: 'Update a page',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/content/v1/pages/{{$parameter.pageId}}',
						body: {
							title: '={{$parameter.title}}',
							locked: '={{$parameter.locked}}',
						},
					},
					send: { preSend: [preSendLogger] },
				},
			},
		],
		default: 'listPagesAdminSummary',
	},
];

// ─── Fields ───────────────────────────────────────────────────────────────────

export const pagesFields: INodeProperties[] = [
	// ── Shared: pageId ────────────────────────────────────────────────────────
	{
		displayName: 'Page ID',
		name: 'pageId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['page'],
				operation: [
					'deletePage',
					'duplicatePage',
					'duplicatePageAsync',
					'getAccess',
					'getPage',
					'getPageWithCards',
					'listFilterViews',
					'removeAccess',
					'updateFilterView',
					'updatePage',
				],
			},
		},
	},

	// ── Shared: layoutId ─────────────────────────────────────────────────────
	{
		displayName: 'Layout ID',
		name: 'layoutId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['createWritelock', 'deleteWritelock', 'getLayout', 'updateLayout'],
			},
		},
	},

	// ── Get Layout / Update Layout / Delete Writelock path var note ───────────
	// filterViewId for Delete Filter View
	{
		displayName: 'Filter View ID',
		name: 'filterViewId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['deleteFilterView'],
			},
		},
	},

	// ── Get Page / Get Page with Cards ────────────────────────────────────────
	{
		displayName: 'Parts',
		name: 'parts',
		type: 'string',
		default: '',
		description: 'Comma-separated parts to include in the response',
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['getPage', 'getPageWithCards'],
			},
		},
	},
	{
		displayName: 'Include V4 Page Layouts',
		name: 'includeV4PageLayouts',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['getPage', 'getPageWithCards'],
			},
		},
	},

	// ── Get Access ────────────────────────────────────────────────────────────
	{
		displayName: 'Filter',
		name: 'filter',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['getAccess'],
			},
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		typeOptions: { minValue: 1 },
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['getAccess', 'listPagesAdminSummary'],
			},
		},
	},
	{
		displayName: 'Expand Users',
		name: 'expandUsers',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['getAccess'],
			},
		},
	},

	// ── Get Navigation Page Order ─────────────────────────────────────────────
	{
		displayName: 'Include Start Page',
		name: 'includeStartPage',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['getNavigationPageOrder'],
			},
		},
	},
	{
		displayName: 'Elevate Shared Page',
		name: 'elevateSharedPage',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['getNavigationPageOrder'],
			},
		},
	},
	{
		displayName: 'Include Hidden',
		name: 'includeHidden',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['getNavigationPageOrder'],
			},
		},
	},

	// ── List Pages Admin Summary ──────────────────────────────────────────────
	{
		displayName: 'Skip',
		name: 'skip',
		type: 'number',
		default: 0,
		typeOptions: { minValue: 0 },
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['listPagesAdminSummary'],
			},
		},
	},
	{
		displayName: 'Order By',
		name: 'orderBy',
		type: 'options',
		default: 'pageTitle',
		options: [
			{ name: 'Dashboard', value: 'pageTitle' },
			{ name: 'Parent Dashboard', value: 'parentPageTitle' },
			{ name: 'Cards', value: 'cardCount' },
			{ name: 'Last Updated', value: 'lastModified' },
		],
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['listPagesAdminSummary'],
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
				resource: ['page'],
				operation: ['listPagesAdminSummary'],
			},
		},
	},
	{
		displayName: 'Include All Pages',
		name: 'includeAllPages',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['listPagesAdminSummary'],
			},
		},
	},
	{
		displayName: 'Include Details',
		name: 'includeDetails',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['listPagesAdminSummary'],
			},
		},
	},
	{
		displayName: 'Add Page with No Owner',
		name: 'addPageWithNoOwner',
		type: 'boolean',
		default: true,
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['listPagesAdminSummary'],
			},
		},
	},
	{
		displayName: 'Include Permissions List',
		name: 'includePermissionsList',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['listPagesAdminSummary'],
			},
		},
	},
	{
		displayName: 'Include Card Count',
		name: 'includeCardCountClause',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['listPagesAdminSummary'],
			},
		},
	},
	{
		displayName: 'Filter by Page Title',
		name: 'includePageTitleClause',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['listPagesAdminSummary'],
			},
		},
	},
	{
		displayName: 'Page Title Search Text',
		name: 'pageTitleSearchText',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['listPagesAdminSummary'],
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
				resource: ['page'],
				operation: ['listPagesAdminSummary'],
			},
		},
	},
	{
		displayName: 'Last Modified Date Operand',
		name: 'lastModifiedDateOperand',
		type: 'options',
		default: 'BETWEEN',
		options: [
			{ name: 'Between', value: 'BETWEEN' },
			{ name: 'Before', value: 'BEFORE' },
			{ name: 'After', value: 'AFTER' },
		],
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['listPagesAdminSummary'],
				includeLastModifiedDateClause: [true],
			},
		},
	},
	{
		displayName: 'Last Modified Start Date',
		name: 'lastModifiedStartDate',
		type: 'string',
		default: '',
		description: 'Date in YYYY-MM-DD format',
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['listPagesAdminSummary'],
				includeLastModifiedDateClause: [true],
			},
		},
	},
	{
		displayName: 'Last Modified End Date',
		name: 'lastModifiedEndDate',
		type: 'string',
		default: '',
		description: 'Date in YYYY-MM-DD format',
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['listPagesAdminSummary'],
				includeLastModifiedDateClause: [true],
			},
		},
	},

	// ── Create Page / Update Page ──────────────────────────────────────────────
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['createPage', 'updatePage'],
			},
		},
	},
	{
		displayName: 'Parent Page ID',
		name: 'parentPageId',
		type: 'number',
		default: 0,
		description: 'Parent page ID (0 for top-level)',
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['createPage', 'duplicatePage', 'duplicatePageAsync', 'movePages'],
			},
		},
	},
	{
		displayName: 'Locked',
		name: 'locked',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['updatePage'],
			},
		},
	},

	// ── Duplicate Page / Duplicate Page Async ─────────────────────────────────
	{
		displayName: 'Page Title',
		name: 'pageTitle',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['duplicatePage', 'duplicatePageAsync'],
			},
		},
	},
	{
		displayName: 'Do Not Duplicate Cards',
		name: 'doNotDuplicateCards',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['duplicatePage', 'duplicatePageAsync'],
			},
		},
	},
	{
		displayName: 'Card Prefix',
		name: 'cardPrefix',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['duplicatePage', 'duplicatePageAsync'],
			},
		},
	},
	{
		displayName: 'Beacon',
		name: 'beacon',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['duplicatePage', 'duplicatePageAsync'],
			},
		},
	},

	// ── Share Access ──────────────────────────────────────────────────────────
	{
		displayName: 'Resources',
		name: 'resources',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true },
		required: true,
		default: {},
		description: 'Pages or other resources to share',
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['shareAccess'],
			},
		},
		options: [
			{
				name: 'resource',
				displayName: 'Resource',
				values: [
					{
						displayName: 'Type',
						name: 'type',
						type: 'options',
						default: 'page',
						options: [
							{ name: 'Page', value: 'page' },
							{ name: 'Card', value: 'card' },
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
		displayName: 'Recipients',
		name: 'recipients',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true },
		required: true,
		default: {},
		description: 'Users or groups to share with',
		displayOptions: {
			show: {
				resource: ['page'],
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
		name: 'message',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['page'],
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
				resource: ['page'],
				operation: ['shareAccess'],
			},
		},
	},

	// ── Move Pages ────────────────────────────────────────────────────────────
	{
		displayName: 'Page IDs',
		name: 'pageIds',
		type: 'string',
		required: true,
		default: '',
		description: 'Comma-separated list of page IDs to move or remove',
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['bulkRemoveOwners', 'movePages'],
			},
		},
	},
	{
		displayName: 'Page Permission',
		name: 'pagePermission',
		type: 'options',
		default: 'ORIGINAL',
		options: [
			{ name: 'Original', value: 'ORIGINAL' },
			{ name: 'Inherit', value: 'INHERIT' },
		],
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['movePages'],
			},
		},
	},

	// ── Reorder Pages ─────────────────────────────────────────────────────────
	{
		displayName: 'Page Order Data (JSON)',
		name: 'pageOrderData',
		type: 'string',
		required: true,
		default: '{"pageOrderMap":{"0":""}}',
		typeOptions: { rows: 4 },
		description:
			'JSON object with pageOrderMap. Key "0" orders top-level pages; use a page ID as the key to order its subpages. Values are comma-separated page ID strings.',
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['reorderPages'],
			},
		},
	},

	// ── Remove Access ─────────────────────────────────────────────────────────
	{
		displayName: 'Share Type',
		name: 'shareType',
		type: 'options',
		required: true,
		default: 'user',
		description: 'Type of entity whose access is being removed',
		options: [
			{ name: 'User', value: 'user' },
			{ name: 'Group', value: 'group' },
		],
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['removeAccess'],
			},
		},
	},
	{
		displayName: 'Resource IDs',
		name: 'resourceIds',
		type: 'string',
		default: '',
		description: 'Comma-separated resource IDs to remove access from',
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['removeAccess'],
			},
		},
	},

	// ── Bulk Remove Owners ────────────────────────────────────────────────────
	{
		displayName: 'Owners',
		name: 'owners',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true },
		required: true,
		default: {},
		description: 'Owners to remove from the specified pages',
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['bulkRemoveOwners'],
			},
		},
		options: [
			{
				name: 'owner',
				displayName: 'Owner',
				values: [
					{
						displayName: 'ID',
						name: 'id',
						type: 'number',
						default: 0,
					},
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
				],
			},
		],
	},

	// ── Update Layout ─────────────────────────────────────────────────────────
	{
		displayName: 'Layout Data (JSON)',
		name: 'layoutData',
		type: 'string',
		required: true,
		default: '{}',
		typeOptions: { rows: 6 },
		description: 'Full layout object as JSON',
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['updateLayout'],
			},
		},
	},

	// ── Update Filter View ────────────────────────────────────────────────────
	{
		displayName: 'Filter View Data (JSON)',
		name: 'filterViewData',
		type: 'string',
		required: true,
		default: '{}',
		typeOptions: { rows: 6 },
		description: 'Full filter view object as JSON',
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['updateFilterView'],
			},
		},
	},

	// ── Request Options (all operations) ─────────────────────────────────────
	{
		displayName: 'Request Options',
		name: 'requestOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['page'],
			},
		},
		options: [
			{
				displayName: 'Return Full Response',
				name: 'returnFullResponse',
				type: 'boolean',
				default: false,
			},
		],
	},
];
