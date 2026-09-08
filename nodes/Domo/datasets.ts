import { IExecuteSingleFunctions, IHttpRequestOptions, INodeProperties } from 'n8n-workflow';
import { preSendLogger } from './shared/preSendLogger';

// ─── preSend helpers ──────────────────────────────────────────────────────────

async function preSendSearchDatasets(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const query = this.getNodeParameter('searchQuery', '*') as string;
	const count = this.getNodeParameter('count', 100) as number;
	const offset = this.getNodeParameter('offset', 0) as number;

	const wildcard = query === '*' ? '*' : `*${query}*`;

	requestOptions.body = {
		entities: ['DATASOURCE'],
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

async function preSendCreateDataset(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const name = this.getNodeParameter('datasetName') as string;
	const description = this.getNodeParameter('description', '') as string;
	const updateMethod = this.getNodeParameter('updateMethod', 'REPLACE') as string;
	const columnsRaw = this.getNodeParameter('columns') as string;

	let schema: { columns: { name: string; type: string }[] } = { columns: [] };
	if (columnsRaw) {
		try {
			schema = JSON.parse(columnsRaw);
		} catch {
			const cols = columnsRaw.split(',').map((c) => {
				const [colName, colType] = c.trim().split(':');
				return { name: colName.trim(), type: (colType || 'STRING').trim().toUpperCase() };
			});
			schema = { columns: cols };
		}
	}

	requestOptions.body = {
		updateMethod,
		transport: { type: 'API' },
		dataSource: { name, description, schema },
	};
	return requestOptions;
}

async function preSendCreateUpload(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const action = this.getNodeParameter('uploadAction', 'REPLACE') as string;
	requestOptions.body = { action };
	return requestOptions;
}

async function preSendUploadData(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const csvData = this.getNodeParameter('csvData') as string;
	requestOptions.body = csvData;
	requestOptions.headers = {
		...((requestOptions.headers as Record<string, string>) || {}),
		'Content-Type': 'text/csv',
	};
	return requestOptions;
}

async function preSendCommitUpload(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const index = this.getNodeParameter('index', true) as boolean;
	const message = this.getNodeParameter('commitMessage', '') as string;
	requestOptions.body = { index, message };
	return requestOptions;
}

async function preSendQueryDataset(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const sql = this.getNodeParameter('sqlQuery') as string;
	requestOptions.body = { sql };
	return requestOptions;
}

async function preSendShareDataset(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const permissionsRaw = this.getNodeParameter('permissions') as string;
	const sendEmail = this.getNodeParameter('sendEmail', false) as boolean;
	let permissions: { type: string; id: string; accessLevel: string }[] = [];
	try {
		permissions = JSON.parse(permissionsRaw);
	} catch {
		permissions = [];
	}
	requestOptions.body = { permissions, sendEmail };
	return requestOptions;
}

async function preSendUpdateNameDesc(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const name = this.getNodeParameter('datasetName', '') as string;
	const description = this.getNodeParameter('description', '') as string;
	const body: Record<string, string> = {};
	if (name) body.name = name;
	if (description) body.description = description;
	requestOptions.body = body;
	return requestOptions;
}

async function preSendUpdateOwner(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const userId = this.getNodeParameter('ownerId') as number;
	requestOptions.body = [{ type: 'USER', id: userId }];
	return requestOptions;
}

async function preSendUpdateTags(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const tagsRaw = this.getNodeParameter('tags') as string;
	const tags = tagsRaw
		.split(',')
		.map((t) => t.trim())
		.filter(Boolean);
	requestOptions.body = { tags };
	return requestOptions;
}

// ─── Operations ──────────────────────────────────────────────────────────────

export const datasetOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['dataset'],
			},
		},
		options: [
			{
				name: 'Commit Upload',
				value: 'commitUpload',
				description: 'Commit an upload session to finalize data',
				action: 'Commit upload',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/data/v3/datasources/" + $parameter.datasetId + "/uploads/" + $parameter.uploadId + "/commit" }}',
					},
					send: {
						preSend: [preSendLogger, preSendCommitUpload],
					},
				},
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new API dataset',
				action: 'Create dataset',
				routing: {
					request: {
						method: 'POST',
						url: '/api/data/v1/streams',
					},
					send: {
						preSend: [preSendLogger, preSendCreateDataset],
					},
				},
			},
			{
				name: 'Create Upload',
				value: 'createUpload',
				description: 'Create an upload session for a dataset',
				action: 'Create upload session',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/data/v3/datasources/" + $parameter.datasetId + "/uploads" }}',
					},
					send: {
						preSend: [preSendLogger, preSendCreateUpload],
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a dataset permanently',
				action: 'Delete dataset',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/data/v3/datasources/" + $parameter.datasetId }}',
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a specific dataset by ID',
				action: 'Get dataset',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/data/v3/datasources/" + $parameter.datasetId }}',
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Get Impact Counts',
				value: 'getImpactCounts',
				description: 'Get impact counts (cards, dataflows) for a dataset',
				action: 'Get dataset impact counts',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/data/v1/impacts/DATA_SOURCE/" + $parameter.datasetId }}',
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Get Schema',
				value: 'getSchema',
				description: 'Get the column schema for a dataset',
				action: 'Get dataset schema',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/query/v1/datasources/" + $parameter.datasetId + "/schema/indexed" }}',
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Get Stream',
				value: 'getStream',
				description: 'Get the stream associated with a dataset',
				action: 'Get dataset stream',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/data/v1/streams/" + $parameter.streamId }}',
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'List',
				value: 'list',
				description: 'List all datasets',
				action: 'List datasets',
				routing: {
					request: {
						method: 'GET',
						url: '/api/data/v3/datasources',
						qs: {
							limit: '={{ $parameter.limit ?? 50 }}',
							offset: '={{ $parameter.offset ?? 0 }}',
						},
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Query',
				value: 'query',
				description: 'Query a dataset with SQL',
				action: 'Query dataset',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/query/v1/execute/" + $parameter.datasetId }}',
					},
					send: {
						preSend: [preSendLogger, preSendQueryDataset],
					},
				},
			},
			{
				name: 'Run Stream',
				value: 'runStream',
				description: 'Trigger a stream run to process a dataset',
				action: 'Run dataset stream',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/data/v1/streams/" + $parameter.streamId + "/executions" }}',
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Search',
				value: 'search',
				description: 'Search for datasets by name',
				action: 'Search datasets',
				routing: {
					request: {
						method: 'POST',
						url: '/api/data/ui/v3/datasources/search',
					},
					send: {
						preSend: [preSendLogger, preSendSearchDatasets],
					},
				},
			},
			{
				name: 'Share',
				value: 'share',
				description: 'Share a dataset with users or groups',
				action: 'Share dataset',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/data/v3/datasources/" + $parameter.datasetId + "/share" }}',
					},
					send: {
						preSend: [preSendLogger, preSendShareDataset],
					},
				},
			},
			{
				name: 'Update Name & Description',
				value: 'updateNameDesc',
				description: 'Update the name and/or description of a dataset',
				action: 'Update dataset name and description',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/data/v3/datasources/" + $parameter.datasetId + "/properties" }}',
					},
					send: {
						preSend: [preSendLogger, preSendUpdateNameDesc],
					},
				},
			},
			{
				name: 'Update Owner',
				value: 'updateOwner',
				description: 'Reassign the owner of a dataset',
				action: 'Update dataset owner',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/data/v2/datasources/" + $parameter.datasetId + "/responsibleUsers" }}',
					},
					send: {
						preSend: [preSendLogger, preSendUpdateOwner],
					},
				},
			},
			{
				name: 'Update Tags',
				value: 'updateTags',
				description: 'Replace all tags on a dataset',
				action: 'Update dataset tags',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/data/ui/v3/datasources/" + $parameter.datasetId + "/tags" }}',
					},
					send: {
						preSend: [preSendLogger, preSendUpdateTags],
					},
				},
			},
			{
				name: 'Upload Data',
				value: 'uploadData',
				description: 'Upload CSV data to an open upload session',
				action: 'Upload data to dataset',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/data/v3/datasources/" + $parameter.datasetId + "/uploads/" + $parameter.uploadId + "/parts/" + $parameter.partNumber }}',
					},
					send: {
						preSend: [preSendLogger, preSendUploadData],
					},
				},
			},
		],
		default: 'list',
	},
];

// ─── Fields ──────────────────────────────────────────────────────────────────

export const datasetFields: INodeProperties[] = [
	// ── dataset ID (all ops that need it) ──────────────────────────────────────
	{
		displayName: 'Dataset ID',
		name: 'datasetId',
		type: 'string',
		required: true,
		default: '',
		description: 'The unique identifier of the dataset',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: [
					'get',
					'getSchema',
					'getImpactCounts',
					'delete',
					'updateNameDesc',
					'updateOwner',
					'updateTags',
					'share',
					'query',
					'createUpload',
					'uploadData',
					'commitUpload',
				],
			},
		},
	},
	// ── stream ID ──────────────────────────────────────────────────────────────
	{
		displayName: 'Stream ID',
		name: 'streamId',
		type: 'string',
		required: true,
		default: '',
		description: 'The stream ID (returned by Create or Get Dataset)',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['getStream', 'runStream'],
			},
		},
	},
	// ── upload ID ──────────────────────────────────────────────────────────────
	{
		displayName: 'Upload ID',
		name: 'uploadId',
		type: 'string',
		required: true,
		default: '',
		description: 'The upload session ID returned by Create Upload',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['uploadData', 'commitUpload'],
			},
		},
	},
	// ── part number ────────────────────────────────────────────────────────────
	{
		displayName: 'Part Number',
		name: 'partNumber',
		type: 'number',
		required: true,
		default: 1,
		description: 'Part number for the upload (starts at 1)',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['uploadData'],
			},
		},
	},
	// ── List: limit / offset ───────────────────────────────────────────────────
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
				resource: ['dataset'],
				operation: ['list'],
			},
		},
	},
	{
		displayName: 'Offset',
		name: 'offset',
		type: 'number',
		default: 0,
		description: 'Number of datasets to skip before returning results',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['list'],
			},
		},
	},
	// ── Search ─────────────────────────────────────────────────────────────────
	{
		displayName: 'Search Query',
		name: 'searchQuery',
		type: 'string',
		default: '*',
		description: 'Name to search for, or * to return all',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Count',
		name: 'count',
		type: 'number',
		default: 100,
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['search'],
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
				resource: ['dataset'],
				operation: ['search'],
			},
		},
	},
	// ── Create ─────────────────────────────────────────────────────────────────
	{
		displayName: 'Dataset Name',
		name: 'datasetName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['create', 'updateNameDesc'],
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
				resource: ['dataset'],
				operation: ['create', 'updateNameDesc'],
			},
		},
	},
	{
		displayName: 'Update Method',
		name: 'updateMethod',
		type: 'options',
		options: [
			{ name: 'Replace', value: 'REPLACE' },
			{ name: 'Append', value: 'APPEND' },
		],
		default: 'REPLACE',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Columns',
		name: 'columns',
		type: 'string',
		typeOptions: { rows: 4 },
		default: '{"columns":[{"name":"Name","type":"STRING"},{"name":"Value","type":"LONG"}]}',
		description:
			'Column schema as JSON {"columns":[{"name":"Col","type":"STRING"}]} or comma-separated name:TYPE pairs',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['create'],
			},
		},
	},
	// ── Create Upload ──────────────────────────────────────────────────────────
	{
		displayName: 'Upload Action',
		name: 'uploadAction',
		type: 'options',
		options: [
			{ name: 'Replace', value: 'REPLACE' },
			{ name: 'Append', value: 'APPEND' },
		],
		default: 'REPLACE',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['createUpload'],
			},
		},
	},
	// ── Upload Data ────────────────────────────────────────────────────────────
	{
		displayName: 'CSV Data',
		name: 'csvData',
		type: 'string',
		typeOptions: { rows: 6 },
		required: true,
		default: '',
		description: 'CSV text with header row to upload (e.g. "Name,Value\\nAlice,1\\nBob,2")',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['uploadData'],
			},
		},
	},
	// ── Commit Upload ──────────────────────────────────────────────────────────
	{
		displayName: 'Index Data',
		name: 'index',
		type: 'boolean',
		default: true,
		description: 'Whether to index data after commit for querying',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['commitUpload'],
			},
		},
	},
	{
		displayName: 'Commit Message',
		name: 'commitMessage',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['commitUpload'],
			},
		},
	},
	// ── Query ──────────────────────────────────────────────────────────────────
	{
		displayName: 'SQL Query',
		name: 'sqlQuery',
		type: 'string',
		typeOptions: { rows: 4 },
		required: true,
		default: 'SELECT * FROM table LIMIT 10',
		description: 'SQL query to run against the dataset',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['query'],
			},
		},
	},
	// ── Share ──────────────────────────────────────────────────────────────────
	{
		displayName: 'Permissions',
		name: 'permissions',
		type: 'string',
		typeOptions: { rows: 4 },
		required: true,
		default:
			'[{"type":"USER","id":"12345","accessLevel":"CAN_VIEW"}]',
		description: 'JSON array of permission objects with type (USER/GROUP), ID, and accessLevel (CAN_VIEW/CAN_SHARE/OWNER)',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['share'],
			},
		},
	},
	{
		displayName: 'Send Email',
		name: 'sendEmail',
		type: 'boolean',
		default: false,
		description: 'Whether to send email notifications to shared users',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['share'],
			},
		},
	},
	// ── Update Owner ───────────────────────────────────────────────────────────
	{
		displayName: 'New Owner User ID',
		name: 'ownerId',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['updateOwner'],
			},
		},
	},
	// ── Update Tags ────────────────────────────────────────────────────────────
	{
		displayName: 'Tags',
		name: 'tags',
		type: 'string',
		required: true,
		default: '',
		description: 'Comma-separated list of tags (replaces all existing tags)',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['updateTags'],
			},
		},
	},
];
