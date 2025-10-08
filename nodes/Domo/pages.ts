import { INodeProperties } from 'n8n-workflow';

export const pageOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['page'],
			},
		},
		options: [
			{
				name: 'Bulk Remove Owners',
				value: 'bulkRemoveOwners',
				description: 'Remove owners from multiple pages',
				action: 'Bulk remove owners',
				routing: {
					request: {
						method: 'POST',
						url: '/api/content/v1/pages/bulk/owner/remove',
						body: '={{JSON.parse($parameter.bulkData)}}',
					},
				},
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new page',
				action: 'Create page',
				routing: {
					request: {
						method: 'POST',
						url: '/api/content/v1/pages',
						body: '={{JSON.parse($parameter.pageData)}}',
					},
				},
			},
			{
				name: 'Create Layout Writelock',
				value: 'createLayoutWritelock',
				description: 'Create a writelock for a layout',
				action: 'Create layout writelock',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/content/v4/pages/layouts/" + $parameter.layoutId + "/writelock" }}',
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a page',
				action: 'Delete page',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/content/v1/pages/" + $parameter.pageId }}',
					},
				},
			},
			{
				name: 'Delete Filter View',
				value: 'deleteFilterView',
				description: 'Delete a filter view',
				action: 'Delete filter view',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/content/v3/pages/analyzer/" + $parameter.filterViewId }}',
					},
				},
			},
			{
				name: 'Delete Layout Writelock',
				value: 'deleteLayoutWritelock',
				description: 'Delete a layout writelock',
				action: 'Delete layout writelock',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/content/v4/pages/layouts/" + $parameter.layoutId + "/writelock" }}',
					},
				},
			},
			{
				name: 'Duplicate',
				value: 'duplicate',
				description: 'Duplicate a page',
				action: 'Duplicate page',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/content/v1/pages/" + $parameter.pageId + "/duplicate" }}',
						qs: {
							doNotDuplicateCards: '={{$parameter.doNotDuplicateCards || false}}',
						},
						body: '={{JSON.parse($parameter.duplicateData)}}',
					},
				},
			},
			{
				name: 'Duplicate Async',
				value: 'duplicateAsync',
				description: 'Duplicate a page asynchronously',
				action: 'Duplicate page async',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/content/v1/pages/" + $parameter.pageId + "/duplicateAsync" }}',
						qs: {
							doNotDuplicateCards: '={{$parameter.doNotDuplicateCards || false}}',
						},
						body: '={{JSON.parse($parameter.duplicateData)}}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a specific page by ID',
				action: 'Get page',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/content/v3/stacks/" + $parameter.pageId }}',
						qs: {
							parts: '={{$parameter.parts || "metadata,datasources,library,drillPathURNs,owners,certification,dateInfo,subscriptions,slicers,metadataOverrides"}}',
						},
					},
				},
			},
			{
				name: 'Get Access',
				value: 'getAccess',
				description: 'Get access list for a page',
				action: 'Get access',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/content/v1/share/accesslist/page/" + $parameter.pageId }}',
						qs: {
							expandUsers: '={{$parameter.expandUsers || false}}',
						},
					},
				},
			},
			{
				name: 'Get Layout',
				value: 'getLayout',
				description: 'Get page layout details',
				action: 'Get layout',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/content/v4/pages/layouts/" + $parameter.layoutId }}',
					},
				},
			},
			{
				name: 'Get Navigation Order',
				value: 'getNavigationOrder',
				description: 'Get navigation page order for current user',
				action: 'Get navigation order',
				routing: {
					request: {
						method: 'GET',
						url: '/api/content/v2/pages/navigation',
						qs: {
							includeStartPage: '={{$parameter.includeStartPage !== undefined ? $parameter.includeStartPage : true}}',
							elevateSharedPage: '={{$parameter.elevateSharedPage !== undefined ? $parameter.elevateSharedPage : true}}',
							includeHidden: '={{$parameter.includeHidden !== undefined ? $parameter.includeHidden : true}}',
						},
					},
				},
			},
			{
				name: 'Get with Cards',
				value: 'getWithCards',
				description: 'Get a page with all its cards',
				action: 'Get with cards',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/content/v3/stacks/" + $parameter.pageId + "/cards" }}',
						qs: {
							parts: '={{$parameter.parts || "metadata,datasources,library,drillPathURNs,owners,certification,dateInfo,subscriptions,slicers,metadataOverrides"}}',
						},
					},
				},
			},
			{
				name: 'List',
				value: 'list',
				description: 'List pages with admin summary',
				action: 'List pages',
				routing: {
					request: {
						method: 'POST',
						url: '/api/content/v1/pages/adminsummary',
						qs: {
							limit: '={{Math.min($parameter.limit || 15, 500)}}',
							skip: '={{$parameter.skip || 0}}',
						},
						body: '={{JSON.parse($parameter.filterData)}}',
					},
				},
			},
			{
				name: 'List Filter Views',
				value: 'listFilterViews',
				description: 'List filter views for a page',
				action: 'List filter views',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/content/v3/pages/" + $parameter.pageId + "/analyzer/named" }}',
					},
				},
			},
			{
				name: 'Move Pages',
				value: 'movePages',
				description: 'Move pages to a different parent',
				action: 'Move pages',
				routing: {
					request: {
						method: 'PUT',
						url: '/api/content/v1/pages/bulk/move',
						body: '={{JSON.parse($parameter.moveData)}}',
					},
				},
			},
			{
				name: 'Remove Access',
				value: 'removeAccess',
				description: 'Remove access from pages for a user or group',
				action: 'Remove access',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/content/v1/share/bulk/page/" + $parameter.type + "/" + $parameter.recipientId }}',
						qs: {
							resourceIds: '={{$parameter.resourceIds}}',
						},
					},
				},
			},
			{
				name: 'Reorder Pages',
				value: 'reorderPages',
				description: 'Reorder pages for current user',
				action: 'Reorder pages',
				routing: {
					request: {
						method: 'PUT',
						url: '/api/content/v1/pages/pageorder',
						body: '={{JSON.parse($parameter.orderData)}}',
					},
				},
			},
			{
				name: 'Share Access',
				value: 'shareAccess',
				description: 'Share page access with users or groups',
				action: 'Share access',
				routing: {
					request: {
						method: 'POST',
						url: '/api/content/v1/share',
						qs: {
							sendEmail: '={{$parameter.sendEmail || false}}',
						},
						body: '={{JSON.parse($parameter.shareData)}}',
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a page',
				action: 'Update page',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/content/v1/pages/" + $parameter.pageId }}',
						body: '={{JSON.parse($parameter.pageData)}}',
					},
				},
			},
			{
				name: 'Update Filter View',
				value: 'updateFilterView',
				description: 'Update a filter view',
				action: 'Update filter view',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/content/v3/pages/" + $parameter.pageId + "/analyzer" }}',
						body: '={{JSON.parse($parameter.filterViewData)}}',
					},
				},
			},
			{
				name: 'Update Layout',
				value: 'updateLayout',
				description: 'Update page layout',
				action: 'Update layout',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/content/v4/pages/layouts/" + $parameter.layoutId }}',
						body: '={{JSON.parse($parameter.layoutData)}}',
					},
				},
			},
		],
		default: 'list',
	},
];

export const pageFields: INodeProperties[] = [
	// Page ID field
	{
		displayName: 'Page ID',
		name: 'pageId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['page'],
				operation: [
					'get',
					'getWithCards',
					'getAccess',
					'update',
					'duplicate',
					'duplicateAsync',
					'delete',
					'listFilterViews',
					'updateFilterView',
				],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the page',
	},
	// Layout ID field
	{
		displayName: 'Layout ID',
		name: 'layoutId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['getLayout', 'updateLayout', 'createLayoutWritelock', 'deleteLayoutWritelock'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the layout',
	},
	// Filter View ID field
	{
		displayName: 'Filter View ID',
		name: 'filterViewId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['deleteFilterView'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the filter view',
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
				resource: ['page'],
				operation: ['list'],
			},
		},
		default: 50,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Skip',
		name: 'skip',
		type: 'number',
		typeOptions: {
			minValue: 0,
		},
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['list'],
			},
		},
		default: 0,
		description: 'Number of items to skip',
	},
	{
		displayName: 'Filter Data',
		name: 'filterData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['list'],
			},
		},
		default: '{"includePageTitleClause":true,"orderBy":"createdTime","ascending":true}',
		description: 'JSON filter object for listing pages',
		placeholder: '{"includePageTitleClause":true,"orderBy":"createdTime","ascending":true}',
	},
	// Get operation fields
	{
		displayName: 'Parts',
		name: 'parts',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['get', 'getWithCards'],
			},
		},
		default: 'metadata,datasources,library,drillPathURNs,owners,certification,dateInfo,subscriptions,slicers,metadataOverrides',
		description: 'Comma-separated list of parts to include',
	},
	{
		displayName: 'Expand Users',
		name: 'expandUsers',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['getAccess'],
			},
		},
		default: false,
		description: 'Whether to expand user details in the access list',
	},
	// Navigation order fields
	{
		displayName: 'Include Start Page',
		name: 'includeStartPage',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['getNavigationOrder'],
			},
		},
		default: true,
		description: 'Whether to include the start page',
	},
	{
		displayName: 'Elevate Shared Page',
		name: 'elevateSharedPage',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['getNavigationOrder'],
			},
		},
		default: true,
		description: 'Whether to elevate shared pages',
	},
	{
		displayName: 'Include Hidden',
		name: 'includeHidden',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['getNavigationOrder'],
			},
		},
		default: true,
		description: 'Whether to include hidden pages',
	},
	// Create and Update operation fields
	{
		displayName: 'Page Data',
		name: 'pageData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['create', 'update'],
			},
		},
		default: '{}',
		required: true,
		description: 'JSON object containing page data',
		placeholder: '{"parentPageId":0,"title":"Page Title"}',
	},
	// Duplicate operation fields
	{
		displayName: 'Duplicate Data',
		name: 'duplicateData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['duplicate', 'duplicateAsync'],
			},
		},
		default: '{}',
		required: true,
		description: 'JSON object containing duplication settings',
		placeholder: '{"parentPageId":0,"pageTitle":"Duplicate Page","cardPrefix":"Copy"}',
	},
	{
		displayName: 'Do Not Duplicate Cards',
		name: 'doNotDuplicateCards',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['duplicate', 'duplicateAsync'],
			},
		},
		default: false,
		description: 'Whether to skip duplicating cards',
	},
	// Share access fields
	{
		displayName: 'Share Data',
		name: 'shareData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['shareAccess'],
			},
		},
		default: '{}',
		required: true,
		description: 'JSON object containing share information',
		placeholder: '{"resources":[{"type":"page","ID":"123"}],"recipients":[{"type":"user","ID":"456"}]}',
	},
	{
		displayName: 'Send Email',
		name: 'sendEmail',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['shareAccess'],
			},
		},
		default: false,
		description: 'Whether to send email notification',
	},
	// Remove access fields
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['removeAccess'],
			},
		},
		options: [
			{
				name: 'User',
				value: 'user',
			},
			{
				name: 'Group',
				value: 'group',
			},
		],
		default: 'user',
		required: true,
		description: 'Type of recipient',
	},
	{
		displayName: 'Recipient ID',
		name: 'recipientId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['removeAccess'],
			},
		},
		default: '',
		required: true,
		description: 'User or Group ID',
	},
	{
		displayName: 'Resource IDs',
		name: 'resourceIds',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['removeAccess'],
			},
		},
		default: '',
		required: true,
		description: 'Comma-separated list of Page IDs',
		placeholder: '123,456,789',
	},
	// Move pages fields
	{
		displayName: 'Move Data',
		name: 'moveData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['movePages'],
			},
		},
		default: '{}',
		required: true,
		description: 'JSON object containing move information',
		placeholder: '{"parentPageId":123,"pageIds":[456,789],"pagePermission":"ORIGINAL"}',
	},
	// Reorder pages fields
	{
		displayName: 'Order Data',
		name: 'orderData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['reorderPages'],
			},
		},
		default: '{}',
		required: true,
		description: 'JSON object containing page order map',
		placeholder: '{"pageOrderMap":{"0":"123,456,789"}}',
	},
	// Layout operation fields
	{
		displayName: 'Layout Data',
		name: 'layoutData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['updateLayout'],
			},
		},
		default: '{}',
		required: true,
		description: 'JSON object containing layout configuration',
	},
	// Filter view operation fields
	{
		displayName: 'Filter View Data',
		name: 'filterViewData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['updateFilterView'],
			},
		},
		default: '{}',
		required: true,
		description: 'JSON object containing filter view configuration',
		placeholder: '{"analyzerId":123,"name":"My Filter","filters":[]}',
	},
	// Bulk operations fields
	{
		displayName: 'Bulk Data',
		name: 'bulkData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['page'],
				operation: ['bulkRemoveOwners'],
			},
		},
		default: '{}',
		required: true,
		description: 'JSON object containing bulk operation data',
	},
];

