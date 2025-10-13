import { INodeProperties } from 'n8n-workflow';

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
						body: '={{JSON.parse($parameter.datastoreData)}}',
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
				},
			},
			{
				name: 'Get Datastore Cards',
				value: 'getDatastoreCards',
				action: 'Get datastore cards',
				routing: {
					request: {
						method: 'POST',
						url: '/api/domoapps/apps/v2/card',
						body: '={{JSON.parse($parameter.cardIds)}}',
					},
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
				name: 'Create Collection and Datastore',
				value: 'createCollectionAndDatastore',
				description: 'Create a new collection and datastore',
				action: 'Create collection and datastore',
				routing: {
					request: {
						method: 'POST',
						url: '/api/datastores/v1/collections',
						body: '={{JSON.parse($parameter.collectionData)}}',
					},
				},
			},
			{
				name: 'Create Collection in Datastore',
				value: 'createCollectionInDatastore',
				description: 'Create a new collection in an existing datastore',
				action: 'Create collection in datastore',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/datastores/v1/" + $parameter.datastoreId + "/collections/" }}',
						body: '={{JSON.parse($parameter.collectionData)}}',
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
						body: '={{JSON.parse($parameter.syncData)}}',
					},
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
				},
			},
			{
				name: 'Search Collections',
				value: 'searchCollections',
				action: 'Search collections',
				routing: {
					request: {
						method: 'POST',
						url: '/api/datastores/v1/collections/query',
						body: '={{JSON.parse($parameter.searchQuery)}}',
					},
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
						body: '={{JSON.parse($parameter.collectionData)}}',
					},
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
							permissions: '={{$parameter.permissions}}',
						},
					},
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
				operation: ['createCollectionInDatastore'],
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
				operation: ['listCollections', 'searchCollections'],
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
		displayName: 'Datastore Data',
		name: 'datastoreData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['appdb'],
				subResource: ['datastores'],
				operation: ['createDatastore'],
			},
		},
		default: '',
		placeholder: '{"name":"My Datastore"}',
		required: true,
		description: 'JSON object containing datastore configuration',
	},
	{
		displayName: 'Card IDs',
		name: 'cardIds',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['appdb'],
				subResource: ['datastores'],
				operation: ['getDatastoreCards'],
			},
		},
		default: '["00000000-0000-0000-0000-000000000000"]',
		required: true,
		description: 'JSON array of card IDs',
	},
	// Collection operations fields
	{
		displayName: 'Collection Data',
		name: 'collectionData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['appdb'],
				subResource: ['collections'],
				operation: ['createCollectionAndDatastore', 'createCollectionInDatastore', 'updateCollection'],
			},
		},
		default: '',
		placeholder: '{"name":"My Collection","schema":{"columns":[{"name":"Column 1","type":"STRING"}]},"syncEnabled":true}',
		required: true,
		description: 'JSON object containing collection configuration',
	},
	{
		displayName: 'Search Query',
		name: 'searchQuery',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['appdb'],
				subResource: ['collections'],
				operation: ['searchCollections'],
			},
		},
		default: '',
		placeholder: '{"collectionFilteringList":[{"filterType":"nameof","typedValue":"%%"}],"sortBy":"createdOn","direction":"desc","pageSize":100,"pageNumber":1}',
		required: true,
		description: 'JSON query object for searching collections',
	},
	{
		displayName: 'Sync Data',
		name: 'syncData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['appdb'],
				subResource: ['collections'],
				operation: ['disableSyncToDataset'],
			},
		},
		default: '',
		placeholder: '{"ID":"00000000-0000-0000-0000-000000000000","syncEnabled":false}',
		required: true,
		description: 'JSON object containing sync configuration',
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
		type: 'string',
		displayOptions: {
			show: {
				resource: ['appdb'],
				subResource: ['permissions'],
				operation: ['updateCollectionPermissions'],
			},
		},
		default: '',
		description: 'Comma-separated list of permissions (e.g., READ,WRITE)',
	},
];
