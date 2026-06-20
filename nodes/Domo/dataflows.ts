import { IExecuteSingleFunctions, IHttpRequestOptions, INodeProperties } from 'n8n-workflow';
import { preSendLogger } from './shared/preSendLogger';

// ─── preSend helpers ──────────────────────────────────────────────────────────

async function preSendSearchDataFlows(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const query = this.getNodeParameter('searchQuery', '*') as string;
	const count = this.getNodeParameter('count', 100) as number;
	const offset = this.getNodeParameter('offset', 0) as number;

	const wildcard = query === '*' ? '*' : `*${query}*`;

	requestOptions.body = {
		entities: ['DATAFLOW'],
		filters: [
			{
				field: 'name_sort',
				filterType: 'wildcard',
				query: wildcard,
			},
		],
		combineResults: true,
		query: '*',
		count,
		offset,
		sort: {
			isRelevance: false,
			fieldSorts: [{ field: 'create_date', sortOrder: 'DESC' }],
		},
	};
	return requestOptions;
}

async function preSendBulkRunDataFlows(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const idsRaw = this.getNodeParameter('dataFlowIds') as string;
	const dataFlowIds = idsRaw
		.split(',')
		.map((s) => parseInt(s.trim(), 10))
		.filter((n) => !isNaN(n));
	requestOptions.body = { dataFlowIds };
	return requestOptions;
}

async function preSendAddTag(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const tag = this.getNodeParameter('tag') as string;
	requestOptions.body = { tag };
	return requestOptions;
}

async function preSendUpdateTags(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const dataflowId = this.getNodeParameter('dataflowId') as number;
	const tagsRaw = this.getNodeParameter('tagList') as string;
	const tags = tagsRaw
		.split(',')
		.map((s) => s.trim())
		.filter(Boolean);
	requestOptions.body = { flowId: dataflowId, tags };
	return requestOptions;
}

async function preSendBulkAddTags(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const idsRaw = this.getNodeParameter('dataFlowIds') as string;
	const tagsRaw = this.getNodeParameter('tagNames') as string;
	const dataFlowIds = idsRaw
		.split(',')
		.map((s) => parseInt(s.trim(), 10))
		.filter((n) => !isNaN(n));
	const tagNames = tagsRaw
		.split(',')
		.map((s) => s.trim())
		.filter(Boolean);
	requestOptions.body = { dataFlowIds, tagNames };
	return requestOptions;
}

async function preSendBulkRemoveTags(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const idsRaw = this.getNodeParameter('dataFlowIds') as string;
	const tagsRaw = this.getNodeParameter('tagNames') as string;
	const dataFlowIds = idsRaw
		.split(',')
		.map((s) => parseInt(s.trim(), 10))
		.filter((n) => !isNaN(n));
	const tagNames = tagsRaw
		.split(',')
		.map((s) => s.trim())
		.filter(Boolean);
	requestOptions.body = { dataFlowIds, tagNames };
	return requestOptions;
}

async function preSendUpdateOwner(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const name = this.getNodeParameter('dataflowName', '') as string;
	const description = this.getNodeParameter('description', '') as string;
	const enabled = this.getNodeParameter('enabled') as boolean;
	const responsibleUserId = this.getNodeParameter('responsibleUserId', 0) as number;
	const restore = this.getNodeParameter('restore') as boolean;
	const restoreFlow = this.getNodeParameter('restoreFlow') as boolean;
	const useLegacyTriggerBehavior = this.getNodeParameter('useLegacyTriggerBehavior') as boolean;
	const databaseType = this.getNodeParameter('databaseType', '') as string;
	const password = this.getNodeParameter('password', '') as string;

	const body: Record<string, unknown> = { enabled, restore, restoreFlow, useLegacyTriggerBehavior };
	if (name) body.name = name;
	if (description) body.description = description;
	if (responsibleUserId) body.responsibleUserId = responsibleUserId;
	if (databaseType) body.databaseType = databaseType;
	if (password) body.password = password;

	requestOptions.body = body;
	return requestOptions;
}

async function preSendBulkUpdateOwner(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const idsRaw = this.getNodeParameter('dataFlowIds') as string;
	const responsibleUserId = this.getNodeParameter('responsibleUserId') as number;
	const restore = this.getNodeParameter('restore') as boolean;
	const enabled = this.getNodeParameter('enabled') as boolean;
	const dataFlowIds = idsRaw
		.split(',')
		.map((s) => parseInt(s.trim(), 10))
		.filter((n) => !isNaN(n));
	requestOptions.body = { dataFlowIds, responsibleUserId, restore, enabled };
	return requestOptions;
}

async function preSendBulkDeleteDataFlows(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const idsRaw = this.getNodeParameter('dataFlowIds') as string;
	const dataFlowIds = idsRaw
		.split(',')
		.map((s) => parseInt(s.trim(), 10))
		.filter((n) => !isNaN(n));
	requestOptions.body = { dataFlowIds };
	return requestOptions;
}

// ─── Operations ───────────────────────────────────────────────────────────────

export const dataflowsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['dataflow'],
			},
		},
		options: [
			{
				name: 'Add Tag',
				value: 'addTag',
				action: 'Add a tag to a data flow',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/dataprocessing/v1/dataflows/{{$parameter.dataflowId}}/tags',
					},
					send: { preSend: [preSendAddTag, preSendLogger] },
				},
			},
			{
				name: 'Bulk Add Tags',
				value: 'bulkAddTags',
				action: 'Add tags to multiple data flows',
				routing: {
					request: {
						method: 'PUT',
						url: '/api/dataprocessing/v1/dataflows/bulk/tag',
					},
					send: { preSend: [preSendBulkAddTags, preSendLogger] },
				},
			},
			{
				name: 'Bulk Delete DataFlows',
				value: 'bulkDeleteDataFlows',
				action: 'Delete multiple data flows',
				routing: {
					request: {
						method: 'PUT',
						url: '/api/dataprocessing/v1/dataflows/bulk/delete',
					},
					send: { preSend: [preSendBulkDeleteDataFlows, preSendLogger] },
				},
			},
			{
				name: 'Bulk Remove Tags',
				value: 'bulkRemoveTags',
				action: 'Remove tags from multiple data flows',
				routing: {
					request: {
						method: 'PUT',
						url: '/api/dataprocessing/v1/dataflows/bulk/tag/delete',
					},
					send: { preSend: [preSendBulkRemoveTags, preSendLogger] },
				},
			},
			{
				name: 'Bulk Run DataFlows',
				value: 'bulkRunDataFlows',
				action: 'Run multiple data flows',
				routing: {
					request: {
						method: 'POST',
						url: '/api/dataprocessing/v1/dataflows/bulk/execute',
					},
					send: { preSend: [preSendBulkRunDataFlows, preSendLogger] },
				},
			},
			{
				name: 'Bulk Update Owner',
				value: 'bulkUpdateOwner',
				action: 'Bulk update owner for multiple data flows',
				routing: {
					request: {
						method: 'PUT',
						url: '/api/dataprocessing/v1/dataflows/bulk/patch',
					},
					send: { preSend: [preSendBulkUpdateOwner, preSendLogger] },
				},
			},
			{
				name: 'Count DataFlows by Type',
				value: 'countDataFlowsByType',
				action: 'Count data flows grouped by type',
				routing: {
					request: {
						method: 'GET',
						url: '/api/dataprocessing/v2/dataflows/filters/dataflowType',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Create DataFlow',
				value: 'createDataFlow',
				action: 'Create a data flow',
				routing: {
					request: {
						method: 'POST',
						url: '/api/dataprocessing/v1/dataflows',
						body: '={{JSON.parse($parameter.dataflowData)}}',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Delete DataFlow',
				value: 'deleteDataFlow',
				action: 'Delete a data flow',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/dataprocessing/v1/dataflows/{{$parameter.dataflowId}}',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Get DataFlow',
				value: 'getDataFlow',
				action: 'Get a data flow by id',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/dataprocessing/v2/dataflows/{{$parameter.dataflowId}}',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Get DataFlow Execution',
				value: 'getDataFlowExecution',
				action: 'Get a specific data flow execution',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/dataprocessing/v1/dataflows/{{$parameter.dataflowId}}/executions/{{$parameter.executionId}}',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Get DataFlow Executions',
				value: 'getDataFlowExecutions',
				action: 'Get execution history for a data flow',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/dataprocessing/v1/dataflows/{{$parameter.dataflowId}}/executions',
						qs: {
							limit: '={{ $parameter.limit }}',
							offset: '={{ $parameter.offset }}',
						},
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Get DataFlow Version',
				value: 'getDataFlowVersion',
				action: 'Get a specific data flow version by id',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/dataprocessing/v2/dataflows/{{$parameter.dataflowId}}/versions/{{$parameter.versionId}}',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Get DataFlow Version by Number',
				value: 'getDataFlowVersionByNumber',
				action: 'Get a data flow version by version number',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/dataprocessing/v3/dataflows/{{$parameter.dataflowId}}/versions/{{$parameter.versionNumber}}',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Get Saved Datacenter Filters',
				value: 'getSavedDatacenterFilters',
				action: 'Get saved datacenter search filters',
				routing: {
					request: {
						method: 'GET',
						url: '/api/search/v1/saved',
						qs: {
							queryProfile: '={{ $parameter.queryProfile }}',
						},
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Get SQL Functions',
				value: 'getSqlFunctions',
				action: 'Get available sql expression functions',
				routing: {
					request: {
						method: 'GET',
						url: '/api/dataprocessing/v1/expression-docs',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Get Tags',
				value: 'getTags',
				action: 'Get tags for a data flow',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/dataprocessing/v1/dataflows/{{$parameter.dataflowId}}/subscription',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Get Timezones',
				value: 'getTimezones',
				action: 'Get available timezones for data flows',
				routing: {
					request: {
						method: 'GET',
						url: '/api/dataprocessing/v1/dataflows/timezones',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'List DataFlow Versions',
				value: 'listDataFlowVersions',
				action: 'List all versions of a data flow',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/dataprocessing/v1/dataflows/{{$parameter.dataflowId}}/versions',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'List DataFlows',
				value: 'listDataFlows',
				action: 'List data flows',
				routing: {
					request: {
						method: 'GET',
						url: '/api/dataprocessing/v2/dataflows',
						qs: {
							limit: '={{ $parameter.limit }}',
							offset: '={{ $parameter.offset }}',
							orderBy: '={{ $parameter.orderBy || undefined }}',
						},
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Remove All Tags',
				value: 'removeAllTags',
				action: 'Remove all tags from a data flow',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/dataprocessing/v1/dataflows/{{$parameter.dataflowId}}/tags',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Remove Tag',
				value: 'removeTag',
				action: 'Remove a specific tag from a data flow',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/dataprocessing/v1/dataflows/{{$parameter.dataflowId}}/tags/{{$parameter.tag}}',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Run DataFlow',
				value: 'runDataFlow',
				action: 'Trigger a data flow run',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/dataprocessing/v1/dataflows/{{$parameter.dataflowId}}/executions',
						qs: {
							activationTypeOverride: '={{ $parameter.activationTypeOverride || undefined }}',
							createPendingExecution: '={{ $parameter.createPendingExecution }}',
						},
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Run Preview',
				value: 'runPreview',
				action: 'Run a data flow preview',
				routing: {
					request: {
						method: 'POST',
						url: '/api/dataprocessing/v1/dataflows/previews/run',
						body: '={{JSON.parse($parameter.previewData)}}',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Search DataFlows',
				value: 'searchDataFlows',
				action: 'Search data flows by name',
				routing: {
					request: {
						method: 'POST',
						url: '/api/search/v1/query',
					},
					send: { preSend: [preSendSearchDataFlows, preSendLogger] },
				},
			},
			{
				name: 'Update DataFlow',
				value: 'updateDataFlow',
				action: 'Update a data flow full replace',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/dataprocessing/v1/dataflows/{{$parameter.dataflowId}}',
						body: '={{JSON.parse($parameter.dataflowData)}}',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Update Owner, Name, and Description',
				value: 'updateOwner',
				action: 'Update owner name or description of a data flow',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/dataprocessing/v1/dataflows/{{$parameter.dataflowId}}/patch',
					},
					send: { preSend: [preSendUpdateOwner, preSendLogger] },
				},
			},
			{
				name: 'Update Tags',
				value: 'updateTags',
				action: 'Replace all tags on a data flow',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/dataprocessing/v1/dataflows/{{$parameter.dataflowId}}/tags',
					},
					send: { preSend: [preSendUpdateTags, preSendLogger] },
				},
			},
		],
		default: 'listDataFlows',
	},
];

// ─── Fields ───────────────────────────────────────────────────────────────────

export const dataflowsFields: INodeProperties[] = [
	// ── Shared: single DataFlow ID ────────────────────────────────────────────
	{
		displayName: 'DataFlow ID',
		name: 'dataflowId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['dataflow'],
				operation: [
					'addTag',
					'deleteDataFlow',
					'getDataFlow',
					'getDataFlowExecution',
					'getDataFlowExecutions',
					'getDataFlowVersion',
					'getDataFlowVersionByNumber',
					'getTags',
					'listDataFlowVersions',
					'removeAllTags',
					'removeTag',
					'runDataFlow',
					'updateDataFlow',
					'updateOwner',
					'updateTags',
				],
			},
		},
	},

	// ── Shared: bulk DataFlow IDs ─────────────────────────────────────────────
	{
		displayName: 'DataFlow IDs',
		name: 'dataFlowIds',
		type: 'string',
		required: true,
		default: '',
		placeholder: '1234, 2345, 3456',
		description: 'Comma-separated list of DataFlow IDs',
		displayOptions: {
			show: {
				resource: ['dataflow'],
				operation: [
					'bulkAddTags',
					'bulkDeleteDataFlows',
					'bulkRemoveTags',
					'bulkRunDataFlows',
					'bulkUpdateOwner',
				],
			},
		},
	},

	// ── List DataFlows ────────────────────────────────────────────────────────
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['dataflow'],
				operation: ['listDataFlows', 'getDataFlowExecutions'],
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
				resource: ['dataflow'],
				operation: ['listDataFlows', 'getDataFlowExecutions'],
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
				resource: ['dataflow'],
				operation: ['listDataFlows', 'getDataFlowExecutions'],
				returnAll: [false],
			},
		},
	},
	{
		displayName: 'Order By',
		name: 'orderBy',
		type: 'string',
		default: '',
		placeholder: 'name',
		displayOptions: {
			show: {
				resource: ['dataflow'],
				operation: ['listDataFlows'],
			},
		},
	},

	// ── Search DataFlows ──────────────────────────────────────────────────────
	{
		displayName: 'Search Query',
		name: 'searchQuery',
		type: 'string',
		default: '*',
		description: 'Name to search for. Use * for all DataFlows.',
		displayOptions: {
			show: {
				resource: ['dataflow'],
				operation: ['searchDataFlows'],
			},
		},
	},
	{
		displayName: 'Count',
		name: 'count',
		type: 'number',
		typeOptions: { minValue: 1 },
		default: 100,
		description: 'Max number of results to return',
		displayOptions: {
			show: {
				resource: ['dataflow'],
				operation: ['searchDataFlows'],
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
				resource: ['dataflow'],
				operation: ['searchDataFlows'],
			},
		},
	},

	// ── Get DataFlow Version ──────────────────────────────────────────────────
	{
		displayName: 'Version ID',
		name: 'versionId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['dataflow'],
				operation: ['getDataFlowVersion'],
			},
		},
	},
	{
		displayName: 'Version Number',
		name: 'versionNumber',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['dataflow'],
				operation: ['getDataFlowVersionByNumber'],
			},
		},
	},

	// ── Get DataFlow Execution ────────────────────────────────────────────────
	{
		displayName: 'Execution ID',
		name: 'executionId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['dataflow'],
				operation: ['getDataFlowExecution'],
			},
		},
	},

	// ── Get Saved Datacenter Filters ──────────────────────────────────────────
	{
		displayName: 'Query Profile',
		name: 'queryProfile',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['dataflow'],
				operation: ['getSavedDatacenterFilters'],
			},
		},
	},

	// ── Run DataFlow ──────────────────────────────────────────────────────────
	{
		displayName: 'Activation Type Override',
		name: 'activationTypeOverride',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['dataflow'],
				operation: ['runDataFlow'],
			},
		},
	},
	{
		displayName: 'Create Pending Execution',
		name: 'createPendingExecution',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['dataflow'],
				operation: ['runDataFlow'],
			},
		},
	},

	// ── Add Tag / Remove Tag ──────────────────────────────────────────────────
	{
		displayName: 'Tag',
		name: 'tag',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['dataflow'],
				operation: ['addTag', 'removeTag'],
			},
		},
	},

	// ── Update Tags ───────────────────────────────────────────────────────────
	{
		displayName: 'Tags',
		name: 'tagList',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'tag1, tag2, tag3',
		description: 'Comma-separated list of tags to set (replaces all existing tags)',
		displayOptions: {
			show: {
				resource: ['dataflow'],
				operation: ['updateTags'],
			},
		},
	},

	// ── Bulk Add / Remove Tags ────────────────────────────────────────────────
	{
		displayName: 'Tag Names',
		name: 'tagNames',
		type: 'string',
		required: true,
		default: '',
		placeholder: 'tag1, tag2',
		description: 'Comma-separated list of tag names',
		displayOptions: {
			show: {
				resource: ['dataflow'],
				operation: ['bulkAddTags', 'bulkRemoveTags'],
			},
		},
	},

	// ── Update Owner, Name, and Description ───────────────────────────────────
	{
		displayName: 'Name',
		name: 'dataflowName',
		type: 'string',
		default: '',
		description: 'New name for the DataFlow (leave blank to keep existing)',
		displayOptions: {
			show: {
				resource: ['dataflow'],
				operation: ['updateOwner'],
			},
		},
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['dataflow'],
				operation: ['updateOwner'],
			},
		},
	},
	{
		displayName: 'Responsible User ID',
		name: 'responsibleUserId',
		type: 'number',
		default: 0,
		description: 'User ID of the new owner (0 to keep existing)',
		displayOptions: {
			show: {
				resource: ['dataflow'],
				operation: ['updateOwner', 'bulkUpdateOwner'],
			},
		},
	},
	{
		displayName: 'Enabled',
		name: 'enabled',
		type: 'boolean',
		default: true,
		displayOptions: {
			show: {
				resource: ['dataflow'],
				operation: ['updateOwner', 'bulkUpdateOwner'],
			},
		},
	},
	{
		displayName: 'Restore',
		name: 'restore',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['dataflow'],
				operation: ['updateOwner', 'bulkUpdateOwner'],
			},
		},
	},
	{
		displayName: 'Restore Flow',
		name: 'restoreFlow',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['dataflow'],
				operation: ['updateOwner'],
			},
		},
	},
	{
		displayName: 'Use Legacy Trigger Behavior',
		name: 'useLegacyTriggerBehavior',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['dataflow'],
				operation: ['updateOwner'],
			},
		},
	},
	{
		displayName: 'Database Type',
		name: 'databaseType',
		type: 'string',
		default: '',
		placeholder: 'MAGIC',
		displayOptions: {
			show: {
				resource: ['dataflow'],
				operation: ['updateOwner'],
			},
		},
	},
	{
		displayName: 'Password',
		name: 'password',
		type: 'string',
		typeOptions: { password: true },
		default: '',
		displayOptions: {
			show: {
				resource: ['dataflow'],
				operation: ['updateOwner'],
			},
		},
	},

	// ── Create / Update DataFlow (free-form JSON) ─────────────────────────────
	{
		displayName: 'DataFlow Data',
		name: 'dataflowData',
		type: 'json',
		required: true,
		default: '{}',
		description:
			'Full DataFlow definition as JSON. For Update DataFlow, use the response from Get DataFlow as the base.',
		displayOptions: {
			show: {
				resource: ['dataflow'],
				operation: ['createDataFlow', 'updateDataFlow'],
			},
		},
	},

	// ── Run Preview (free-form JSON) ──────────────────────────────────────────
	{
		displayName: 'Preview Data',
		name: 'previewData',
		type: 'json',
		required: true,
		default: '{"databaseType":"MAGIC","engineProperties":{"kettle.mode":"STRICT"},"actions":[],"settings":{"zoneId":"UTC"}}',
		description: 'Preview configuration as JSON',
		displayOptions: {
			show: {
				resource: ['dataflow'],
				operation: ['runPreview'],
			},
		},
	},
];
