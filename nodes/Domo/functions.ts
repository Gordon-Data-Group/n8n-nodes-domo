import type { INodeProperties, IHttpRequestOptions, IExecuteSingleFunctions } from 'n8n-workflow';
import { preSendLogger } from './shared/preSendLogger';

// ── preSend hooks ────────────────────────────────────────────────────────────

// Builds the search body for List Functions.
async function preSendListFunctions(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const name = this.getNodeParameter('name') as string;
	const datasetId = this.getNodeParameter('datasetId') as string;
	const excludeVariables = this.getNodeParameter('excludeVariables') as boolean;
	const sortField = this.getNodeParameter('sortField') as string;
	const sortAscending = this.getNodeParameter('sortAscending') as boolean;
	const returnAll = this.getNodeParameter('returnAll') as boolean;
	const limit = returnAll ? 50000 : (this.getNodeParameter('limit') as number);
	const offset = returnAll ? 0 : (this.getNodeParameter('offset') as number);

	const filters: Array<Record<string, unknown>> = [];
	if (datasetId) {
		filters.push({ field: 'dataset', idList: [datasetId] });
	}
	if (excludeVariables) {
		filters.push({ field: 'notvariable' });
	}

	requestOptions.body = {
		name,
		filters,
		sort: { field: sortField, ascending: sortAscending },
		limit,
		offset,
	};
	return requestOptions;
}

// Builds the body for Get Functions (bulk fetch by IDs).
async function preSendGetFunctions(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const raw = this.getNodeParameter('functionIds') as string;
	const ids = raw
		.split(',')
		.map((s) => s.trim())
		.filter((s) => s.length > 0);
	requestOptions.body = { ids };
	return requestOptions;
}

// Builds the Create Function body from discrete fields.
async function preSendCreateFunction(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const name = this.getNodeParameter('functionName') as string;
	const expression = this.getNodeParameter('expression') as string;
	const owner = this.getNodeParameter('owner') as number;
	const dataType = this.getNodeParameter('dataType') as string;
	const locked = this.getNodeParameter('locked') as boolean;
	const global_ = this.getNodeParameter('global') as boolean;
	const variable = this.getNodeParameter('variable') as boolean;
	const hidden = this.getNodeParameter('hidden') as boolean;
	const archived = this.getNodeParameter('archived') as boolean;
	const linksRaw = this.getNodeParameter('links') as string;

	const links =
		linksRaw && linksRaw.trim() !== '' && linksRaw.trim() !== '[]'
			? typeof linksRaw === 'string'
				? JSON.parse(linksRaw)
				: linksRaw
			: [];

	requestOptions.body = {
		name,
		expression,
		owner: owner || undefined,
		dataType,
		locked,
		global: global_,
		variable,
		hidden,
		archived,
		aggregated: false,
		analytic: false,
		nonAggregatedColumns: [],
		columnPositions: [],
		functions: [],
		functionTemplateDependencies: [],
		checkSum: null,
		status: 'VALID',
		cacheWindow: 'non_dynamic',
		links,
	};
	return requestOptions;
}

// Builds the Update Function body from discrete fields.
async function preSendUpdateFunction(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const name = this.getNodeParameter('functionName') as string;
	const expression = this.getNodeParameter('expression') as string;
	const status = this.getNodeParameter('status') as string;
	const archived = this.getNodeParameter('archived') as boolean;
	const certificationState = this.getNodeParameter('certificationState') as string;

	requestOptions.body = {
		name,
		expression,
		status,
		archived,
		certification: { state: certificationState },
	};
	return requestOptions;
}

// Parses the JSON textarea for bulk operations.
async function preSendBulkBody(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const bulkBody = this.getNodeParameter('bulkBody') as string;
	requestOptions.body = typeof bulkBody === 'string' ? JSON.parse(bulkBody) : bulkBody;
	return requestOptions;
}

// Builds the Bulk Delete body from a comma-separated list of numeric IDs.
async function preSendBulkDeleteFunctions(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const raw = this.getNodeParameter('functionIds') as string;
	const ids = raw
		.split(',')
		.map((s) => s.trim())
		.filter((s) => s.length > 0)
		.map(Number)
		.filter((n) => !isNaN(n));
	requestOptions.body = { delete: ids };
	return requestOptions;
}

// ── Operations ───────────────────────────────────────────────────────────────

export const functionsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['functions'],
			},
		},
		default: 'listFunctions',
		options: [
			{
				name: 'Bulk Create Functions',
				value: 'bulkCreateFunctions',
				action: 'Bulk create functions',
				routing: {
					request: {
						method: 'POST',
						url: '/api/query/v1/functions/bulk/template',
					},
					send: {
						preSend: [preSendBulkBody, preSendLogger],
					},
				},
			},
			{
				name: 'Bulk Delete Functions',
				value: 'bulkDeleteFunctions',
				action: 'Bulk delete functions by ID',
				routing: {
					request: {
						method: 'POST',
						url: '/api/query/v1/functions/bulk/template',
					},
					send: {
						preSend: [preSendBulkDeleteFunctions, preSendLogger],
					},
				},
			},
			{
				name: 'Bulk Update Functions',
				value: 'bulkUpdateFunctions',
				action: 'Bulk update functions',
				routing: {
					request: {
						method: 'POST',
						url: '/api/query/v1/functions/bulk/template',
					},
					send: {
						preSend: [preSendBulkBody, preSendLogger],
					},
				},
			},
			{
				name: 'Create Function',
				value: 'createFunction',
				action: 'Create a beast mode function',
				routing: {
					request: {
						method: 'POST',
						url: '/api/query/v1/functions/template',
						qs: {
							strict: '={{ $parameter.strict }}',
						},
					},
					send: {
						preSend: [preSendCreateFunction, preSendLogger],
					},
				},
			},
			{
				name: 'Delete Function',
				value: 'deleteFunction',
				action: 'Delete a function by ID',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/query/v1/functions/template/{{ $parameter.functionId }}',
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Get Cards Function Is Used On',
				value: 'getCardUsage',
				action: 'Get cards a function is used on',
				routing: {
					request: {
						method: 'GET',
						url: '/api/content/v2/cards/formulausage',
						qs: {
							datasourceId: '={{ $parameter.datasourceId }}',
							formulaId: '={{ $parameter.formulaId }}',
						},
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Get Function',
				value: 'getFunction',
				action: 'Get a function by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/query/v1/functions/template/{{ $parameter.functionId }}',
						qs: {
							hidden: '={{ $parameter.hidden }}',
						},
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Get Functions',
				value: 'getFunctions',
				action: 'Get multiple functions by ID',
				routing: {
					request: {
						method: 'POST',
						url: '/api/query/v1/functions/list/id',
					},
					send: {
						preSend: [preSendGetFunctions, preSendLogger],
					},
				},
			},
			{
				name: 'List Functions',
				value: 'listFunctions',
				action: 'Search and list functions',
				routing: {
					request: {
						method: 'POST',
						url: '/api/query/v1/functions/search',
					},
					send: {
						preSend: [preSendListFunctions, preSendLogger],
					},
				},
			},
			{
				name: 'Lock Function',
				value: 'lockFunction',
				action: 'Lock a function to prevent editing',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/query/v1/functions/template/{{ $parameter.functionId }}',
						body: {
							locked: true,
						},
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Update Function',
				value: 'updateFunction',
				action: 'Update a function',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/query/v1/functions/template/{{ $parameter.functionId }}',
						qs: {
							strict: '={{ $parameter.strict }}',
						},
					},
					send: {
						preSend: [preSendUpdateFunction, preSendLogger],
					},
				},
			},
		],
	},
];

// ── Fields ───────────────────────────────────────────────────────────────────

export const functionsFields: INodeProperties[] = [
	// ── Shared: Function ID ───────────────────────────────────────────────────
	{
		displayName: 'Function ID',
		name: 'functionId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['functions'],
				operation: ['getFunction', 'updateFunction', 'lockFunction', 'deleteFunction'],
			},
		},
		default: '',
		required: true,
		description: 'The numeric ID of the function',
	},

	// ── Shared: strict query param (createFunction, updateFunction) ───────────
	{
		displayName: 'Strict',
		name: 'strict',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['functions'],
				operation: ['createFunction', 'updateFunction'],
			},
		},
		default: false,
		description: 'Whether to use strict validation when saving the function',
	},

	// ── List Functions fields ─────────────────────────────────────────────────
	{
		displayName: 'Name Filter',
		name: 'name',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['functions'],
				operation: ['listFunctions'],
			},
		},
		default: '',
		description: 'Filter functions by name. Leave blank to return all.',
	},
	{
		displayName: 'Dataset ID',
		name: 'datasetId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['functions'],
				operation: ['listFunctions'],
			},
		},
		default: '',
		placeholder: '00000000-0000-0000-0000-000000000000',
		description: 'Filter to functions linked to this dataset UUID',
	},
	{
		displayName: 'Exclude Variables',
		name: 'excludeVariables',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['functions'],
				operation: ['listFunctions'],
			},
		},
		default: true,
		description: 'Whether to exclude variable-type functions from results',
	},
	{
		displayName: 'Sort Field',
		name: 'sortField',
		type: 'options',
		options: [{ name: 'Name', value: 'name' }],
		displayOptions: {
			show: {
				resource: ['functions'],
				operation: ['listFunctions'],
			},
		},
		default: 'name',
		description: 'Field to sort results by',
	},
	{
		displayName: 'Sort Ascending',
		name: 'sortAscending',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['functions'],
				operation: ['listFunctions'],
			},
		},
		default: true,
		description: 'Whether to sort results in ascending order',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['functions'],
				operation: ['listFunctions'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
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
				resource: ['functions'],
				operation: ['listFunctions'],
				returnAll: [false],
			},
		},
		default: 50,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Offset',
		name: 'offset',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['functions'],
				operation: ['listFunctions'],
				returnAll: [false],
			},
		},
		default: 0,
		description: 'Number of functions to skip before returning results',
	},

	// ── Get Functions / Bulk Delete: comma-separated IDs ─────────────────────
	{
		displayName: 'Function IDs',
		name: 'functionIds',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['functions'],
				operation: ['getFunctions', 'bulkDeleteFunctions'],
			},
		},
		default: '',
		required: true,
		placeholder: '1234, 2345, 3456',
		description: 'Comma-separated list of function IDs',
	},

	// ── Get Function: hidden flag ─────────────────────────────────────────────
	{
		displayName: 'Include Hidden',
		name: 'hidden',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['functions'],
				operation: ['getFunction'],
			},
		},
		default: false,
		description: 'Whether to include hidden function details in the response',
	},

	// ── Get Cards Function is Used On ─────────────────────────────────────────
	{
		displayName: 'Datasource ID',
		name: 'datasourceId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['functions'],
				operation: ['getCardUsage'],
			},
		},
		default: '',
		required: true,
		placeholder: '00000000-0000-0000-0000-000000000000',
		description: 'The UUID of the dataset the function belongs to',
	},
	{
		displayName: 'Formula ID',
		name: 'formulaId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['functions'],
				operation: ['getCardUsage'],
			},
		},
		default: '',
		required: true,
		placeholder: 'calculation_00000000-0000-0000-0000-000000000000',
		description: 'The formula ID of the function (e.g. calculation_uuid)',
	},

	// ── Shared: Create / Update Function fields ───────────────────────────────
	{
		displayName: 'Name',
		name: 'functionName',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['functions'],
				operation: ['createFunction', 'updateFunction'],
			},
		},
		default: '',
		required: true,
		description: 'The display name of the function',
	},
	{
		displayName: 'Expression',
		name: 'expression',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		displayOptions: {
			show: {
				resource: ['functions'],
				operation: ['createFunction', 'updateFunction'],
			},
		},
		default: '',
		required: true,
		placeholder: "CASE WHEN `Status` = 'Active' THEN 1 ELSE 0 END",
		description: 'The beast mode SQL expression',
	},

	// ── Create Function only ──────────────────────────────────────────────────
	{
		displayName: 'Data Type',
		name: 'dataType',
		type: 'options',
		options: [
			{ name: 'Date', value: 'DATE' },
			{ name: 'Datetime', value: 'DATETIME' },
			{ name: 'Double', value: 'DOUBLE' },
			{ name: 'Long', value: 'LONG' },
			{ name: 'String', value: 'STRING' },
		],
		displayOptions: {
			show: {
				resource: ['functions'],
				operation: ['createFunction'],
			},
		},
		default: 'STRING',
		description: 'The return data type of the function',
	},
	{
		displayName: 'Owner User ID',
		name: 'owner',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['functions'],
				operation: ['createFunction'],
			},
		},
		default: 0,
		description: 'The user ID of the function owner (0 to use the authenticated user)',
	},
	{
		displayName: 'Locked',
		name: 'locked',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['functions'],
				operation: ['createFunction'],
			},
		},
		default: false,
		description: 'Whether the function is locked from editing',
	},
	{
		displayName: 'Global',
		name: 'global',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['functions'],
				operation: ['createFunction'],
			},
		},
		default: false,
		description: 'Whether the function is available globally across datasets',
	},
	{
		displayName: 'Variable',
		name: 'variable',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['functions'],
				operation: ['createFunction'],
			},
		},
		default: false,
		description: 'Whether this function is a variable type',
	},
	{
		displayName: 'Hidden',
		name: 'hidden',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['functions'],
				operation: ['createFunction'],
			},
		},
		default: false,
		description: 'Whether the function is hidden',
	},
	{
		displayName: 'Archived',
		name: 'archived',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['functions'],
				operation: ['createFunction', 'updateFunction'],
			},
		},
		default: false,
		description: 'Whether the function is archived',
	},
	{
		displayName: 'Links',
		name: 'links',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['functions'],
				operation: ['createFunction'],
			},
		},
		default: '[]',
		description: 'JSON array of resource links (dataset or card associations). Each entry: { "resource": { "type": "DATA_SOURCE"|"CARD", "ID": "..." }, "visible": true, "active": false, "valid": "INCOMPATIBLE_LINK"|"VALID" }.',
	},

	// ── Update Function only ──────────────────────────────────────────────────
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		options: [
			{ name: 'Valid', value: 'VALID' },
			{ name: 'Invalid', value: 'INVALID' },
		],
		displayOptions: {
			show: {
				resource: ['functions'],
				operation: ['updateFunction'],
			},
		},
		default: 'VALID',
		description: 'The validation status of the function',
	},
	{
		displayName: 'Certification State',
		name: 'certificationState',
		type: 'options',
		options: [
			{ name: 'Not Certified', value: 'NOT_CERTIFIED' },
			{ name: 'Pending', value: 'PENDING' },
			{ name: 'Certified', value: 'CERTIFIED' },
		],
		displayOptions: {
			show: {
				resource: ['functions'],
				operation: ['updateFunction'],
			},
		},
		default: 'NOT_CERTIFIED',
		description: 'The certification state of the function',
	},

	// ── Bulk Create / Bulk Update: JSON textarea ──────────────────────────────
	{
		displayName: 'Bulk Body',
		name: 'bulkBody',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['functions'],
				operation: ['bulkCreateFunctions', 'bulkUpdateFunctions'],
			},
		},
		default: '',
		required: true,
		description:
			'Full bulk request body as JSON. For create: { "create": [...], "strict": false, "replaceLinks": true, "copyDependencies": true }. For update: { "update": [...] }',
	},
];
