import { IExecuteSingleFunctions, IHttpRequestOptions, INodeProperties } from 'n8n-workflow';
import { preSendLogger } from './shared/preSendLogger';

// Transform searchFilters into collectionFilteringList format
async function transformSearchFilters(this: IExecuteSingleFunctions, requestOptions: IHttpRequestOptions): Promise<IHttpRequestOptions> {
	const collectionFilteringList: any[] = [];

	let filter = this.getNodeParameter('nameFilter', 0) as any;
	if (filter) {
		collectionFilteringList.push({
			filterType: 'nameof',
			//comparingCriteria: 'equals',
			typedValue: filter.values?.name ? `%${filter.values.name}%` : '%%'
		});
	}

	filter = this.getNodeParameter('datastoreNameFilter', 0) as any;
	if (filter.values?.datastoreName) {
		collectionFilteringList.push({
			filterType: 'datastorename',
			comparingCriteria: 'equals',
			typedValue: filter.values.datastoreName
		});
	}

	filter = this.getNodeParameter('createdDateFilter', 0) as any;
	if (filter.values?.date) {
		collectionFilteringList.push({
			filterType: 'createddate',
			comparingCriteria: filter.values.criteria,
			typedValue: filter.values.date ? new Date(filter.values.date).toISOString().slice(0, 10) : ''
		});
	}

	filter = this.getNodeParameter('modifiedDateFilter', 0) as any;
	if (filter.values?.date) {
		collectionFilteringList.push({
			filterType: 'updatedon',
			comparingCriteria: filter.values.criteria,
			typedValue: filter.values.date ? new Date(filter.values.date).toISOString().slice(0, 10) : ''
		});
	}

	filter = this.getNodeParameter('ownedByFilter', 0) as any;
	if (filter.values?.ownerId) {
		collectionFilteringList.push({
			filterType: 'ownedby',
			comparingCriteria: 'equals',
			typedValue: filter.values.ownerId,
			not: filter.values.not ? true : false
		});
	}

	// Update the request body
	if (requestOptions.body) {
		(requestOptions.body as any).collectionFilteringList = collectionFilteringList;
	}

	return requestOptions;
}

export const appdbOperations: INodeProperties[] = [
	{
		displayName: 'Sub-Resource',
		name: 'subResource',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['appdb'],
			},
		},
		options: [
			{
				name: 'Collections',
				value: 'collections',
			},
			{
				name: 'Datastores',
				value: 'datastores',
			},
			{
				name: 'Documents',
				value: 'documents',
			},
			{
				name: 'Permissions',
				value: 'permissions',
			},
		],
		default: 'collections',
		description: 'The AppDB sub-resource to interact with',
	},
	// Datastores Operations
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['appdb'],
				subResource: ['datastores'],
			},
		},
		options: [
			{
				name: 'Create Datastore',
				value: 'createDatastore',
				description: 'Create a new datastore',
				action: 'Create datastore',
				routing: {
					request: {
						method: 'POST',
						url: '/api/datastores/v1',
						body: { name: '={{$parameter.datastoreName}}' },
					},
				},
			},
			{
				name: 'Delete Datastore',
				value: 'deleteDatastore',
				description: 'Delete a datastore',
				action: 'Delete datastore',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/datastores/v1/" + $parameter.datastoreId }}',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Get Datastore',
				value: 'getDatastore',
				description: 'Get details of a specific datastore',
				action: 'Get datastore',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/datastores/v1/" + $parameter.datastoreId }}',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Get Datastore Collections',
				value: 'getDatastoreCollections',
				description: 'Get collections for a specific datastore',
				action: 'Get datastore collections',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/datastores/v1/" + $parameter.datastoreId + "/collections" }}',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'List Datastores',
				value: 'listDatastores',
				description: 'List all datastores',
				action: 'List datastores',
				routing: {
					request: {
						method: 'GET',
						url: '/api/datastores/v1',
					},
					send: { preSend: [preSendLogger] },
				},
			},
		],
		default: 'listDatastores',
	},
	// Collections Operations
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['appdb'],
				subResource: ['collections'],
			},
		},
		options: [
			{
				name: 'Create Collection',
				value: 'createCollection',
				description: 'Create a new collection in an existing datastore',
				action: 'Create collection in datastore',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/datastores/v1/" + $parameter.datastoreId + "/collections/" }}',
						body: {
							name: '={{$parameter.name}}',
							schema: {columns: '={{$parameter.schema.columns}}'},
							syncEnabled: '={{$parameter.syncEnabled}}',
						},
					},

					send: {
						preSend: [
							async function(this: IExecuteSingleFunctions, requestOptions: IHttpRequestOptions) {
								// Get the alert subscriptions collection
								const schemaColumns = this.getNodeParameter('schema.columns', []) as Array<{name: string, type: string}>;

								// Update the body with evaluated values
								requestOptions.body = {
									name: this.getNodeParameter('collectionName', '') as string,
									schema: {columns: schemaColumns},
									syncEnabled: this.getNodeParameter('syncEnabled', true) as boolean,
								};
								return requestOptions;
							},
							preSendLogger,
						],
					},
				},
			},
			{
				name: 'Delete Collection',
				value: 'deleteCollection',
				description: 'Delete a collection',
				action: 'Delete collection',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/datastores/v1/collections/" + $parameter.collectionId }}',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Disable Sync to DataSet',
				value: 'disableSyncToDataset',
				description: 'Disable sync to dataset for a collection',
				action: 'Disable sync to dataset',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/datastores/v1/collections/" + $parameter.collectionId }}',
						body: {
							id: '={{$parameter.collectionId}}',
							syncEnabled: '={{$parameter.syncEnabled}}',
						},
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Get Collection',
				value: 'getCollection',
				description: 'Get details of a specific collection',
				action: 'Get collection',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/datastores/v1/collections/" + $parameter.collectionId }}',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Get Collection Documents',
				value: 'getCollectionDocuments',
				description: 'Get documents from a collection',
				action: 'Get collection documents',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/datastores/v1/collections/" + $parameter.collectionId + "/documents" }}',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'List Collections',
				value: 'listCollections',
				description: 'List all collections',
				action: 'List collections',
				routing: {
					request: {
						method: 'GET',
						url: '/api/datastores/v1/collections',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Search Collections',
				value: 'searchCollections',
				description: 'Search collections with filters',
				action: 'Search collections',
				routing: {
					request: {
						method: 'POST',
						url: '/api/datastores/v1/collections/query',
						body: {
							collectionFilteringList: [],
							sortBy: '={{$parameter.sortBy}}',
							direction: '={{$parameter.direction}}',
							pageSize: '={{$parameter.pageSize}}',
							pageNumber: '={{$parameter.pageNumber}}',
						},
					},
					send: { preSend: [transformSearchFilters, preSendLogger] },
				},
			},
			{
				name: 'Update Collection',
				value: 'updateCollection',
				description: 'Update a collection',
				action: 'Update collection',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/datastores/v1/collections/" + $parameter.collectionId }}',
						body: {
							id: '={{$parameter.collectionId}}',
							owner: '={{$parameter.ownerId}}',
							schema: {columns: '={{$parameter.schema.columns}}'},
							syncEnabled: '={{$parameter.syncEnabled}}',
						},
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Update Collection JSON',
				value: 'updateCollectionJson',
				description: 'Update a collection with a JSON body',
				action: 'Update collection',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/datastores/v1/collections/" + $parameter.collectionId }}',
						body: '={{JSON.parse($parameter.collectionData)}}',
					},
					send: { preSend: [preSendLogger] },
				},
			},
		],
		default: 'listCollections',
	},
	// Documents Operations
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['appdb'],
				subResource: ['documents'],
			},
		},
		options: [
			{
				name: 'Create Document',
				value: 'createDocument',
				description: 'Create a new document in a collection',
				action: 'Create document',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/datastores/v1/collections/" + $parameter.collectionId + "/documents" }}',
						body: '={{JSON.parse($parameter.documentData)}}',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Create Documents',
				value: 'createDocuments',
				description: 'Create multiple documents in bulk',
				action: 'Create documents',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/datastores/v1/collections/" + $parameter.collectionId + "/documents/bulk" }}',
						body: '={{JSON.parse($parameter.documentsData)}}',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Delete Document',
				value: 'deleteDocument',
				description: 'Delete a document',
				action: 'Delete document',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/datastores/v2/collections/" + $parameter.collectionId + "/documents/" + $parameter.documentId }}',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Delete Documents',
				value: 'deleteDocuments',
				description: 'Delete multiple documents',
				action: 'Delete documents',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/datastores/v2/collections/" + $parameter.collectionId + "/documents/bulk" }}',
						qs: {
							ids: '={{$parameter.documentIds}}',
						},
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Query Collection Documents',
				value: 'queryCollectionDocuments',
				description: 'Query documents in a collection',
				action: 'Query collection documents',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/datastores/v2/collections/" + $parameter.collectionId + "/documents/query" }}',
						body: '={{JSON.parse($parameter.queryData)}}',
						qs: {
							limit: '={{$parameter.limit}}',
							offset: '={{$parameter.offset}}',
							count: '={{$parameter.count}}',
							avg: '={{$parameter.avg}}',
							sum: '={{$parameter.sum}}',
							max: '={{$parameter.max}}',
							min: '={{$parameter.min}}',
							orderby: '={{$parameter.orderby}}',
							groupby: '={{$parameter.groupby}}',
						},
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Update Document',
				value: 'updateDocument',
				description: 'Update a document',
				action: 'Update document',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/datastores/v2/collections/" + $parameter.collectionId + "/documents/" + $parameter.documentId }}',
						body: '={{JSON.parse($parameter.documentData)}}',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Upsert Documents',
				value: 'upsertDocuments',
				description: 'Upsert multiple documents in bulk',
				action: 'Upsert documents',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/datastores/v2/collections/" + $parameter.collectionId + "/documents/bulk" }}',
						body: '={{JSON.parse($parameter.documentsData)}}',
					},
					send: { preSend: [preSendLogger] },
				},
			},
		],
		default: 'queryCollectionDocuments',
	},
	// Permissions Operations
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['appdb'],
				subResource: ['permissions'],
			},
		},
		options: [
			{
				name: 'Get Collection Permissions',
				value: 'getCollectionPermissions',
				description: 'Get permissions for a collection',
				action: 'Get collection permissions',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/datastores/v1/collections/" + $parameter.collectionId + "/permission" }}',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Remove Collection Access',
				value: 'removeCollectionAccess',
				description: 'Remove access from a collection',
				action: 'Remove collection access',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/datastores/v1/collections/" + $parameter.collectionId + "/permission/" + $parameter.entityType + "/" + $parameter.entityId }}',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Update Collection Permissions',
				value: 'updateCollectionPermissions',
				description: 'Update permissions for a collection',
				action: 'Update collection permissions',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/datastores/v1/collections/" + $parameter.collectionId + "/permission/" + $parameter.entityType + "/" + $parameter.entityId }}',
						qs: {
							overwrite: '={{$parameter.overwrite}}',
							permissions: '={{$parameter.permissions.join(",")}}',
						},
					},
					send: { preSend: [preSendLogger] },
				},
			},
		],
		default: 'getCollectionPermissions',
	},
];

export const appdbFields: INodeProperties[] = [
	// Datastore ID field
	{
		displayName: 'Datastore ID',
		name: 'datastoreId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['appdb'],
				subResource: ['datastores'],
				operation: ['getDatastore', 'deleteDatastore', 'getDatastoreCollections'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the datastore',
	},
	{
		displayName: 'Datastore ID',
		name: 'datastoreId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['appdb'],
				subResource: ['collections'],
				operation: ['createCollection'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the datastore',
	},
	// Collection ID field
	{
		displayName: 'Collection ID',
		name: 'collectionId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['appdb'],
				subResource: ['collections', 'documents', 'permissions'],
			},
			hide: {
				operation: ['listCollections', 'searchCollections', 'createCollection'],
			}
		},
		default: '',
		required: true,
		description: 'The ID of the collection',
	},
	// Document ID field
	{
		displayName: 'Document ID',
		name: 'documentId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['appdb'],
				subResource: ['documents'],
				operation: ['updateDocument', 'deleteDocument'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the document',
	},
	// Datastore operations fields
	{
		displayName: 'Datastore Name',
		name: 'datastoreName',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['appdb'],
				subResource: ['datastores'],
				operation: ['createDatastore'],
			},
		},
		default: '',
		placeholder: 'My Datastore',
		required: true,
		description: 'The name of the datastore',
	},
	{
		displayName: 'Collection Name',
		name: 'collectionName',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['appdb'],
				subResource: ['collections'],
				operation: ['createCollection'],
			},
		},
		default: '',
		placeholder: 'My Collection',
		required: true,
		description: 'The name of the collection',
	},
	{
		displayName: 'Sync Enabled',
		name: 'syncEnabled',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['appdb'],
				subResource: ['collections'],
				operation: ['disableSyncToDataset', 'updateCollection'],
			},
		},
		default: false,
		description: 'Whether to enable sync to dataset',
	},
	{
		displayName: 'Collection Schema',
		name: 'schema',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['appdb'],
				operation: ['createCollection', 'updateCollection'],
			},
		},
		default: {
			columns: [],
		},
		options: [
			{
				displayName: 'Columns',
				name: 'columns',
				values: [
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						required: true,
					},
					{
						displayName: 'Type',
						name: 'type',
						type: 'options',
						options: [
							{ name: 'DATE', value: 'DATE' },
							{ name: 'DATETIME', value: 'DATETIME' },
							{ name: 'DECIMAL', value: 'DECIMAL' },
							{ name: 'DOUBLE', value: 'DOUBLE' },
							{ name: 'LONG', value: 'LONG' },
							{ name: 'STRING', value: 'STRING' },
						],
						default: 'STRING',
						required: true,
					},
				],
			},
		],
	},
	{
		displayName: 'Collection JSON Data',
		name: 'collectionJSONData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['appdb'],
				operation: ['updateCollectionJson'],
			},
		},
		default: '',
		placeholder: '{"name":"My Collection","schema":{"columns":[{"name":"Name","type":"STRING"},{"name":"Age","type":"INTEGER"}]}}',
		required: true,
		description: 'JSON object containing collection data',
	},
	// --- Search Filters (Section Header – Optional) ---
{
	displayName: 'Search Filters',
	name: 'searchFiltersNotice',
	type: 'notice',
	default: '',
	displayOptions: {
		show: {
			resource: ['appdb'],
			operation: ['searchCollections'],
		},
	},
	description: 'Add optional filters below. Each filter can only be added once.',
},

// --- Name Filter ---
{
	displayName: 'Name Filter',
	name: 'nameFilter',
	type: 'fixedCollection',
	typeOptions: {
		multipleValues: false, // Only one name filter allowed
	},
	default: {},
	displayOptions: {
		show: {
			resource: ['appdb'],
			operation: ['searchCollections'],
		},
	},
	options: [
		{
			displayName: 'Name Filter',
			name: 'values',
			values: [
				{
					displayName: 'Name',
					name: 'name',
					type: 'string',
					default: '',
					placeholder: 'Collection name to search for',
				},
			],
		},
	],
},

// --- Datastore Name Filter ---
{
	displayName: 'App (Datastore) Name Filter',
	name: 'datastoreNameFilter',
	type: 'fixedCollection',
	typeOptions: {
		multipleValues: false,
	},
	default: {},
	displayOptions: {
		show: {
			resource: ['appdb'],
			operation: ['searchCollections'],
		},
	},
	options: [
		{
			displayName: 'App Name Filter',
			name: 'values',
			values: [
				{
					displayName: 'App Name',
					name: 'datastoreName',
					type: 'string',
					default: '',
					placeholder: 'App/Datastore name to search for',
				},
			],
		},
	],
},

// --- Created Date Filter ---
{
	displayName: 'Created Date Filter',
	name: 'createdDateFilter',
	type: 'fixedCollection',
	typeOptions: {
		multipleValues: false,
	},
	default: {},
	displayOptions: {
		show: {
			resource: ['appdb'],
			operation: ['searchCollections'],
		},
	},
	options: [
		{
			displayName: 'Created Date Filter',
			name: 'values',
			values: [
				{
					displayName: 'Criteria',
					name: 'criteria',
					type: 'options',
					options: [
						{ name: 'After', value: 'after' },
						{ name: 'Before', value: 'before' },
						{ name: 'On', value: 'on' },
					],
					default: 'after',
				},
				{
					displayName: 'Date',
					name: 'date',
					type: 'dateTime',
					default: '',
				},
			],
		},
	],
},

// --- Modified Date Filter ---
{
	displayName: 'Modified Date Filter',
	name: 'modifiedDateFilter',
	type: 'fixedCollection',
	typeOptions: {
		multipleValues: false,
	},
	default: {},
	displayOptions: {
		show: {
			resource: ['appdb'],
			operation: ['searchCollections'],
		},
	},
	options: [
		{
			displayName: 'Modified Date Filter',
			name: 'values',
			values: [
				{
					displayName: 'Criteria',
					name: 'criteria',
					type: 'options',
					options: [
						{ name: 'After', value: 'after' },
						{ name: 'Before', value: 'before' },
						{ name: 'On', value: 'on' },
					],
					default: 'after',
				},
				{
					displayName: 'Date',
					name: 'date',
					type: 'dateTime',
					default: '',
				},
			],
		},
	],
},

// --- Owned By Filter ---
{
	displayName: 'Owned By Filter',
	name: 'ownedByFilter',
	type: 'fixedCollection',
	typeOptions: {
		multipleValues: false,
	},
	default: {},
	displayOptions: {
		show: {
			resource: ['appdb'],
			operation: ['searchCollections'],
		},
	},
	options: [
		{
			displayName: 'Owned By Filter',
			name: 'values',
			values: [
				{
					displayName: 'Owner ID',
					name: 'ownerId',
					type: 'number',
					default: '',
					placeholder: 'User ID of the owner',
				},
				{
					displayName: 'Not',
					name: 'not',
					type: 'boolean',
					default: false,
					description: 'Whether to exclude this owner',
				},
			],
		},
	],
},
	{
		displayName: 'Page Number',
		name: 'pageNumber',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['appdb'],
				operation: ['searchCollections'],
			},
		},
		default: 1,
		required: true
	},
	{
		displayName: 'Page Size',
		name: 'pageSize',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['appdb'],
				operation: ['searchCollections'],
			},
		},
		default: 100,
		required: true
	},
	{
		displayName: 'Sort By',
		name: 'sortBy',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['appdb'],
				operation: ['searchCollections'],
			},
		},
		options: [
			{ name: 'App Name', value: 'datastoreName' },
			{ name: 'Collection Name', value: 'name' },
			{ name: 'Created Date', value: 'createdOn' },
			{ name: 'Modified Date', value: 'updatedOn' },
		],
		default: 'name',
		required: true
	},
	{
		displayName: 'Sort Order',
		name: 'direction',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['appdb'],
				operation: ['searchCollections'],
			},
		},
		options: [
			{ name: 'Ascending', value: 'asc' },
			{ name: 'Descending', value: 'desc' },
		],
		default: 'asc',
		required: true
	},
	// Document operations fields
	{
		displayName: 'Document Data',
		name: 'documentData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['appdb'],
				subResource: ['documents'],
				operation: ['createDocument', 'updateDocument'],
			},
		},
		default: '{"content":{"column1":"value1","column2":"value2"}}',
		required: true,
		description: 'JSON object containing document data',
	},
	{
		displayName: 'Documents Data',
		name: 'documentsData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['appdb'],
				subResource: ['documents'],
				operation: ['createDocuments', 'upsertDocuments'],
			},
		},
		default: '[{"content":{"column1":"value1"}},{"content":{"column1":"value2"}}]',
		required: true,
		description: 'JSON array containing multiple documents',
	},
	{
		displayName: 'Query Data',
		name: 'queryData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['appdb'],
				subResource: ['documents'],
				operation: ['queryCollectionDocuments'],
			},
		},
		default: '{"$or":[{"content.field1":{"$regex":"value"}}]}',
		required: true,
		description: 'JSON object containing MongoDB-style query',
	},
	{
		displayName: 'Document IDs',
		name: 'documentIds',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['appdb'],
				subResource: ['documents'],
				operation: ['deleteDocuments'],
			},
		},
		default: '',
		required: true,
		description: 'Comma-separated list of document IDs to delete',
	},
	// Query parameters for queryCollectionDocuments

	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['appdb'],
				operation: ['queryCollectionDocuments'],
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
				resource: ['appdb'],
				subResource: ['documents'],
				operation: ['queryCollectionDocuments'],
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
				resource: ['appdb'],
				subResource: ['documents'],
				operation: ['queryCollectionDocuments'],
				returnAll: [false],
			},
		},
		default: 0,
		description: 'Number of documents to skip',
	},
	{
		displayName: 'Count',
		name: 'count',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['appdb'],
				subResource: ['documents'],
				operation: ['queryCollectionDocuments'],
			},
		},
		default: '',
		description: 'Alias for count aggregation',
	},
	{
		displayName: 'Average',
		name: 'avg',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['appdb'],
				subResource: ['documents'],
				operation: ['queryCollectionDocuments'],
			},
		},
		default: '',
		description: 'Comma-separated list of properties for average aggregation',
	},
	{
		displayName: 'Sum',
		name: 'sum',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['appdb'],
				subResource: ['documents'],
				operation: ['queryCollectionDocuments'],
			},
		},
		default: '',
		description: 'Comma-separated list of properties for sum aggregation',
	},
	{
		displayName: 'Max',
		name: 'max',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['appdb'],
				subResource: ['documents'],
				operation: ['queryCollectionDocuments'],
			},
		},
		default: '',
		description: 'Comma-separated list of properties for max aggregation',
	},
	{
		displayName: 'Min',
		name: 'min',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['appdb'],
				subResource: ['documents'],
				operation: ['queryCollectionDocuments'],
			},
		},
		default: '',
		description: 'Comma-separated list of properties for min aggregation',
	},
	{
		displayName: 'Order By',
		name: 'orderby',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['appdb'],
				subResource: ['documents'],
				operation: ['queryCollectionDocuments'],
			},
		},
		default: '',
		description: 'Alias of the aggregation to order by',
	},
	{
		displayName: 'Group By',
		name: 'groupby',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['appdb'],
				subResource: ['documents'],
				operation: ['queryCollectionDocuments'],
			},
		},
		default: '',
		description: 'Comma-separated list of properties to group by',
	},
	// Permissions operations fields
	{
		displayName: 'Entity Type',
		name: 'entityType',
		type: 'options',
		options: [
			{
				name: 'USER',
				value: 'USER',
			},
			{
				name: 'GROUP',
				value: 'GROUP',
			},
		],
		displayOptions: {
			show: {
				resource: ['appdb'],
				subResource: ['permissions'],
				operation: ['updateCollectionPermissions', 'removeCollectionAccess'],
			},
		},
		default: 'USER',
		required: true,
		description: 'The type of entity (e.g., USER, GROUP)',
	},
	{
		displayName: 'Entity ID',
		name: 'entityId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['appdb'],
				subResource: ['permissions'],
				operation: ['updateCollectionPermissions', 'removeCollectionAccess'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the entity',
	},
	{
		displayName: 'Owner ID',
		name: 'ownerId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['appdb'],
				subResource: ['collections'],
				operation: ['updateCollection'],
			},
		},
		default: '',
		required: true,
		description: 'The User ID of the owner',
	},
	{
		displayName: 'Overwrite',
		name: 'overwrite',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['appdb'],
				subResource: ['permissions'],
				operation: ['updateCollectionPermissions'],
			},
		},
		default: false,
		description: 'Whether to overwrite existing permissions',
	},
	{
		displayName: 'Permissions',
		name: 'permissions',
		type: 'multiOptions',
		options: [
			{
				name: 'ADMIN',
				value: 'ADMIN',
			},
			{
				name: 'CREATE_CONTENT',
				value: 'CREATE_CONTENT',
			},
			{
				name: 'DELETE',
				value: 'DELETE',
			},
			{
				name: 'DELETE_CONTENT',
				value: 'DELETE_CONTENT',
			},
			{
				name: 'READ',
				value: 'READ',
			},
			{
				name: 'READ_CONTENT',
				value: 'READ_CONTENT',
			},
			{
				name: 'SHARE',
				value: 'SHARE',
			},
			{
				name: 'UPDATE_CONTENT',
				value: 'UPDATE_CONTENT',
			},
			{
				name: 'WRITE',
				value: 'WRITE',
			},
		],
		displayOptions: {
			show: {
				resource: ['appdb'],
				subResource: ['permissions'],
				operation: ['updateCollectionPermissions'],
			},
		},
		default: ['READ', 'WRITE'],
		description: 'List of permissions (e.g., READ,WRITE)',
	},
];

