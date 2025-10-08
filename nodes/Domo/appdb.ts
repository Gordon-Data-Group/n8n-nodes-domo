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
						url: '/api/data/v1/datastores',
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
						url: '={{ "/api/data/v1/datastores/" + $parameter.datastoreId }}',
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
						url: '={{ "/api/data/v1/datastores/" + $parameter.datastoreId }}',
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
						url: '/api/data/v1/datastores',
						qs: {
							limit: '={{Math.min($parameter.limit || 50, 500)}}',
							offset: '={{$parameter.offset || 0}}',
						},
					},
				},
			},
			{
				name: 'Update Datastore',
				value: 'updateDatastore',
				description: 'Update a datastore',
				action: 'Update datastore',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/data/v1/datastores/" + $parameter.datastoreId }}',
						body: '={{JSON.parse($parameter.datastoreData)}}',
					},
				},
			},
		],
		default: 'listDatastores',
	},
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
				description: 'Create a new collection in a datastore',
				action: 'Create collection',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/data/v1/datastores/" + $parameter.datastoreId + "/collections" }}',
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
						url: '={{ "/api/data/v1/datastores/" + $parameter.datastoreId + "/collections/" + $parameter.collectionId }}',
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
						url: '={{ "/api/data/v1/datastores/" + $parameter.datastoreId + "/collections/" + $parameter.collectionId }}',
					},
				},
			},
			{
				name: 'List Collections',
				value: 'listCollections',
				description: 'List all collections in a datastore',
				action: 'List collections',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/data/v1/datastores/" + $parameter.datastoreId + "/collections" }}',
						qs: {
							limit: '={{Math.min($parameter.limit || 50, 500)}}',
							offset: '={{$parameter.offset || 0}}',
						},
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
						url: '={{ "/api/data/v1/datastores/" + $parameter.datastoreId + "/collections/" + $parameter.collectionId }}',
						body: '={{JSON.parse($parameter.collectionData)}}',
					},
				},
			},
		],
		default: 'listCollections',
	},
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
						url: '={{ "/api/data/v1/datastores/" + $parameter.datastoreId + "/collections/" + $parameter.collectionId + "/documents" }}',
						body: '={{JSON.parse($parameter.documentData)}}',
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
						url: '={{ "/api/data/v1/datastores/" + $parameter.datastoreId + "/collections/" + $parameter.collectionId + "/documents/" + $parameter.documentId }}',
					},
				},
			},
			{
				name: 'Get Document',
				value: 'getDocument',
				description: 'Get a specific document',
				action: 'Get document',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/data/v1/datastores/" + $parameter.datastoreId + "/collections/" + $parameter.collectionId + "/documents/" + $parameter.documentId }}',
					},
				},
			},
			{
				name: 'Query Documents',
				value: 'queryDocuments',
				description: 'Query documents in a collection',
				action: 'Query documents',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/data/v1/datastores/" + $parameter.datastoreId + "/collections/" + $parameter.collectionId + "/documents/query" }}',
						body: '={{JSON.parse($parameter.queryData)}}',
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
						url: '={{ "/api/data/v1/datastores/" + $parameter.datastoreId + "/collections/" + $parameter.collectionId + "/documents/" + $parameter.documentId }}',
						body: '={{JSON.parse($parameter.documentData)}}',
					},
				},
			},
		],
		default: 'queryDocuments',
	},
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
						url: '={{ "/api/data/v1/datastores/" + $parameter.datastoreId + "/collections/" + $parameter.collectionId + "/permissions" }}',
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
						url: '={{ "/api/data/v1/datastores/" + $parameter.datastoreId + "/collections/" + $parameter.collectionId + "/permissions" }}',
						body: '={{JSON.parse($parameter.permissionsData)}}',
					},
				},
			},
		],
		default: 'getCollectionPermissions',
	},
];

export const appdbFields: INodeProperties[] = [
	// Datastore ID field (used across multiple sub-resources)
	{
		displayName: 'Datastore ID',
		name: 'datastoreId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['appdb'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the datastore',
	},
	// Collection ID field (for collections, documents, permissions)
	{
		displayName: 'Collection ID',
		name: 'collectionId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['appdb'],
				subResource: ['collections', 'documents', 'permissions'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the collection',
	},
	// Document ID field (for documents)
	{
		displayName: 'Document ID',
		name: 'documentId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['appdb'],
				subResource: ['documents'],
				operation: ['getDocument', 'updateDocument', 'deleteDocument'],
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
				operation: ['createDatastore', 'updateDatastore'],
			},
		},
		default: '{}',
		required: true,
		description: 'JSON object containing datastore configuration',
		placeholder: '{"name":"My Datastore","description":"Datastore description"}',
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
				subResource: ['datastores'],
				operation: ['listDatastores'],
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
				resource: ['appdb'],
				subResource: ['datastores'],
				operation: ['listDatastores'],
			},
		},
		default: 0,
		description: 'Number of datastores to skip',
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
				operation: ['createCollection', 'updateCollection'],
			},
		},
		default: '{}',
		required: true,
		description: 'JSON object containing collection configuration',
		placeholder: '{"name":"My Collection","schema":{"properties":{"field1":{"type":"string"}}}}',
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
				subResource: ['collections'],
				operation: ['listCollections'],
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
				resource: ['appdb'],
				subResource: ['collections'],
				operation: ['listCollections'],
			},
		},
		default: 0,
		description: 'Number of collections to skip',
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
		default: '{}',
		required: true,
		description: 'JSON object containing document data',
		placeholder: '{"field1":"value1","field2":"value2"}',
	},
	{
		displayName: 'Query Data',
		name: 'queryData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['appdb'],
				subResource: ['documents'],
				operation: ['queryDocuments'],
			},
		},
		default: '{}',
		required: true,
		description: 'JSON object containing query parameters',
		placeholder: '{"filter":{"field1":"value1"},"limit":10,"offset":0}',
	},
	// Permissions operations fields
	{
		displayName: 'Permissions Data',
		name: 'permissionsData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['appdb'],
				subResource: ['permissions'],
				operation: ['updateCollectionPermissions'],
			},
		},
		default: '{}',
		required: true,
		description: 'JSON object containing permissions configuration',
		placeholder: '{"users":[{"ID":123,"permissions":["READ","WRITE"]}],"groups":[{"ID":456,"permissions":["READ"]}]}',
	},
];

