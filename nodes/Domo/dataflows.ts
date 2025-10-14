import { INodeProperties } from 'n8n-workflow';

export const dataflowOperations: INodeProperties[] = [
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
				action: 'Add tag',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/dataprocessing/v1/dataflows/" + $parameter.dataflowId + "/tags" }}',
						body: '={{JSON.parse($parameter.tagData)}}',
					},
				},
			},
			{
				name: 'Bulk Add Tags',
				value: 'bulkAddTags',
				action: 'Bulk add tags',
				routing: {
					request: {
						method: 'PUT',
						url: '/api/dataprocessing/v1/dataflows/bulk/tag',
						body: '={{JSON.parse($parameter.bulkTagData)}}',
					},
				},
			},
			{
				name: 'Bulk Delete DataFlows',
				value: 'bulkDelete',
				action: 'Bulk delete dataflows',
				routing: {
					request: {
						method: 'PUT',
						url: '/api/dataprocessing/v1/dataflows/bulk/delete',
						body: '={{JSON.parse($parameter.dataflowIds)}}',
					},
				},
			},
			{
				name: 'Bulk Remove Tags',
				value: 'bulkRemoveTags',
				action: 'Bulk remove tags',
				routing: {
					request: {
						method: 'PUT',
						url: '/api/dataprocessing/v1/dataflows/bulk/tag/delete',
						body: '={{JSON.parse($parameter.bulkRemoveTagData)}}',
					},
				},
			},
			{
				name: 'Bulk Run DataFlows',
				value: 'bulkRun',
				action: 'Bulk run dataflows',
				routing: {
					request: {
						method: 'POST',
						url: '/api/dataprocessing/v1/dataflows/bulk/execute',
						body: '={{JSON.parse($parameter.dataflowIds)}}',
					},
				},
			},
			{
				name: 'Bulk Update Owner',
				value: 'bulkUpdateOwner',
				action: 'Bulk update owner',
				routing: {
					request: {
						method: 'PUT',
						url: '/api/dataprocessing/v1/dataflows/bulk/patch',
						body: '={{JSON.parse($parameter.bulkPatchData)}}',
					},
				},
			},
			{
				name: 'Count DataFlows by Type',
				value: 'countByType',
				action: 'Count dataflows by type',
				routing: {
					request: {
						method: 'GET',
						url: '/api/dataprocessing/v2/dataflows/filters/dataflowType',
					},
				},
			},
			{
				name: 'Create DataFlow',
				value: 'create',
				action: 'Create dataflow',
				routing: {
					request: {
						method: 'POST',
						url: '/api/dataprocessing/v1/dataflows',
						body: '={{JSON.parse($parameter.dataflowData)}}',
					},
				},
			},
			{
				name: 'Delete DataFlow',
				value: 'delete',
				action: 'Delete dataflow',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/dataprocessing/v1/dataflows/" + $parameter.dataflowId }}',
					},
				},
			},
			{
				name: 'Get DataFlow',
				value: 'get',
				action: 'Get dataflow',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/dataprocessing/v2/dataflows/" + $parameter.dataflowId }}',
					},
				},
			},
			{
				name: 'Get DataFlow Execution',
				value: 'getExecution',
				action: 'Get dataflow execution',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/dataprocessing/v1/dataflows/" + $parameter.dataflowId + "/executions/" + $parameter.executionId }}',
					},
				},
			},
			{
				name: 'Get DataFlow Executions',
				value: 'getExecutions',
				action: 'Get dataflow executions',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/dataprocessing/v1/dataflows/" + $parameter.dataflowId + "/executions" }}',
						qs: {
							limit: '={{$parameter.limit}}',
							offset: '={{$parameter.offset}}',
						},
					},
				},
			},
			{
				name: 'Get DataFlow Version',
				value: 'getVersion',
				action: 'Get dataflow version',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/dataprocessing/v2/dataflows/" + $parameter.dataflowId + "/versions/" + $parameter.versionId }}',
					},
				},
			},
			{
				name: 'Get DataFlow Version by Version Number',
				value: 'getVersionByNumber',
				action: 'Get dataflow version by version number',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/dataprocessing/v3/dataflows/" + $parameter.dataflowId + "/versions/" + $parameter.versionNumber }}',
					},
				},
			},
			{
				name: 'Get Saved Datacenter Filters',
				value: 'getSavedFilters',
				action: 'Get saved datacenter filters',
				routing: {
					request: {
						method: 'GET',
						url: '/api/search/v1/saved',
						qs: {
							queryProfile: '={{$parameter.queryProfile}}',
						},
					},
				},
			},
			{
				name: 'Get SQL Functions (General)',
				value: 'getSqlFunctions',
				action: 'Get sql functions general',
				routing: {
					request: {
						method: 'GET',
						url: '/api/dataprocessing/v1/expression-docs',
					},
				},
			},
			{
				name: 'Get Tags',
				value: 'getTags',
				action: 'Get tags',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/dataprocessing/v1/dataflows/" + $parameter.dataflowId + "/subscription" }}',
					},
				},
			},
			{
				name: 'Get Timezones (General)',
				value: 'getTimezones',
				action: 'Get timezones general',
				routing: {
					request: {
						method: 'GET',
						url: '/api/dataprocessing/v1/dataflows/timezones',
					},
				},
			},
			{
				name: 'List DataFlow Versions',
				value: 'listVersions',
				action: 'List dataflow versions',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/dataprocessing/v1/dataflows/" + $parameter.dataflowId + "/versions" }}',
					},
				},
			},
			{
				name: 'List DataFlows',
				value: 'list',
				action: 'List dataflows',
				routing: {
					request: {
						method: 'GET',
						url: '/api/dataprocessing/v2/dataflows',
						qs: {
							limit: '={{$parameter.limit}}',
							offset: '={{$parameter.offset}}',
							orderBy: '={{$parameter.orderBy}}',
						},
					},
				},
			},
			{
				name: 'Remove All Tags',
				value: 'removeAllTags',
				action: 'Remove all tags',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/dataprocessing/v1/dataflows/" + $parameter.dataflowId + "/tags" }}',
					},
				},
			},
			{
				name: 'Remove Tag',
				value: 'removeTag',
				action: 'Remove tag',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/dataprocessing/v1/dataflows/" + $parameter.dataflowId + "/tags/" + $parameter.tag }}',
					},
				},
			},
			{
				name: 'Run DataFlow',
				value: 'run',
				action: 'Run dataflow',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/dataprocessing/v1/dataflows/" + $parameter.dataflowId + "/executions" }}',
						qs: {
							activationTypeOverride: '={{$parameter.activationTypeOverride}}',
							createPendingExecution: '={{$parameter.createPendingExecution}}',
						},
					},
				},
			},
			{
				name: 'Run Preview',
				value: 'runPreview',
				action: 'Run preview',
				routing: {
					request: {
						method: 'POST',
						url: '/api/dataprocessing/v1/dataflows/previews/run',
						body: '={{JSON.parse($parameter.previewData)}}',
					},
				},
			},
			{
				name: 'Search DataFlows',
				value: 'search',
				action: 'Search dataflows',
				routing: {
					request: {
						method: 'POST',
						url: '/api/search/v1/query',
						body: '={{JSON.parse($parameter.searchQuery)}}',
					},
				},
			},
			{
				name: 'Update DataFlow',
				value: 'update',
				action: 'Update dataflow',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/dataprocessing/v1/dataflows/" + $parameter.dataflowId }}',
						body: '={{JSON.parse($parameter.dataflowData)}}',
					},
				},
			},
			{
				name: 'Update Owner, Name, and Description',
				value: 'updateMetadata',
				action: 'Update owner name and description',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/dataprocessing/v1/dataflows/" + $parameter.dataflowId + "/patch" }}',
						body: '={{JSON.parse($parameter.patchData)}}',
					},
				},
			},
			{
				name: 'Update Tags',
				value: 'updateTags',
				action: 'Update tags',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/dataprocessing/v1/dataflows/" + $parameter.dataflowId + "/tags" }}',
						body: '={{JSON.parse($parameter.updateTagData)}}',
					},
				},
			},
		],
		default: 'list',
	},
];

export const dataflowFields: INodeProperties[] = [
	// DataFlow ID field
	{
		displayName: 'DataFlow ID',
		name: 'dataflowId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['dataflow'],
				operation: [
					'get',
					'getExecutions',
					'getExecution',
					'getTags',
					'getVersion',
					'getVersionByNumber',
					'listVersions',
					'run',
					'addTag',
					'updateTags',
					'removeAllTags',
					'removeTag',
					'update',
					'updateMetadata',
					'delete',
				],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the dataflow',
	},
	// Execution ID field
	{
		displayName: 'Execution ID',
		name: 'executionId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['dataflow'],
				operation: ['getExecution'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the execution',
	},
	// Version ID field
	{
		displayName: 'Version ID',
		name: 'versionId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['dataflow'],
				operation: ['getVersion'],
			},
		},
		default: '',
		required: true,
		description: 'The version ID (not version number)',
	},
	// Version Number field
	{
		displayName: 'Version Number',
		name: 'versionNumber',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['dataflow'],
				operation: ['getVersionByNumber'],
			},
		},
		default: '',
		required: true,
		description: 'The version number (not version ID)',
	},
	// Tag field
	{
		displayName: 'Tag',
		name: 'tag',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['dataflow'],
				operation: ['removeTag'],
			},
		},
		default: '',
		required: true,
		description: 'The tag to remove',
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
				resource: ['dataflow'],
				operation: ['list', 'getExecutions'],
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
				resource: ['dataflow'],
				operation: ['list', 'getExecutions'],
			},
		},
		default: 0,
		description: 'Number of items to skip',
	},
	{
		displayName: 'Order By',
		name: 'orderBy',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['dataflow'],
				operation: ['list'],
			},
		},
		default: 'name',
		description: 'Field to order results by (e.g., name, created, modified)',
	},
	// Run DataFlow fields
	{
		displayName: 'Activation Type Override',
		name: 'activationTypeOverride',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['dataflow'],
				operation: ['run'],
			},
		},
		default: '',
		description: 'Override the activation type',
	},
	{
		displayName: 'Create Pending Execution',
		name: 'createPendingExecution',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['dataflow'],
				operation: ['run'],
			},
		},
		default: false,
		description: 'Whether to create a pending execution',
	},
	// Get Saved Filters field
	{
		displayName: 'Query Profile',
		name: 'queryProfile',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['dataflow'],
				operation: ['getSavedFilters'],
			},
		},
		default: '',
		description: 'Query profile parameter',
	},
	// Search operation fields
	{
		displayName: 'Search Query',
		name: 'searchQuery',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['dataflow'],
				operation: ['search'],
			},
		},
		default: '',
		placeholder: '{"entities":["DATAFLOW"],"query":"*","count":100,"offset":0}',
		required: true,
		description: 'JSON search query object',
	},
	// Create and Update operation fields
	{
		displayName: 'DataFlow Data',
		name: 'dataflowData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['dataflow'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		placeholder: '{"name":"My DataFlow","actions":[],"engineProperties":{}}',
		required: true,
		description: 'JSON object containing dataflow configuration',
	},
	// Update metadata fields
	{
		displayName: 'Patch Data',
		name: 'patchData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['dataflow'],
				operation: ['updateMetadata'],
			},
		},
		default: '',
		placeholder: '{"name":"New Name","responsibleUserId":1234,"description":"Description"}',
		required: true,
		description: 'JSON object with fields to update (name, description, responsibleUserId, etc.)',
	},
	// Tag operations fields
	{
		displayName: 'Tag Data',
		name: 'tagData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['dataflow'],
				operation: ['addTag'],
			},
		},
		default: '',
		placeholder: '{"tag":"MyTag"}',
		required: true,
		description: 'JSON object containing tag information',
	},
	{
		displayName: 'Update Tag Data',
		name: 'updateTagData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['dataflow'],
				operation: ['updateTags'],
			},
		},
		default: '',
		placeholder: '{"flowId":1234,"tags":["tag1"]}',
		required: true,
		description: 'JSON object containing flow ID and tags',
	},
	// Bulk operations fields
	{
		displayName: 'DataFlow IDs',
		name: 'dataflowIds',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['dataflow'],
				operation: ['bulkRun', 'bulkDelete'],
			},
		},
		default: '',
		placeholder: '{"dataFlowIds":[1234,2345]}',
		required: true,
		description: 'JSON object containing array of dataflow IDs',
	},
	{
		displayName: 'Bulk Tag Data',
		name: 'bulkTagData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['dataflow'],
				operation: ['bulkAddTags'],
			},
		},
		default: '',
		placeholder: '{"dataFlowIds":[1234,2345],"tagNames":["tag1","tag2"]}',
		required: true,
		description: 'JSON object with dataflow IDs and tag names',
	},
	{
		displayName: 'Bulk Remove Tag Data',
		name: 'bulkRemoveTagData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['dataflow'],
				operation: ['bulkRemoveTags'],
			},
		},
		default: '',
		placeholder: '{"dataFlowIds":[1234,2345],"tagNames":["tag1","tag2"]}',
		required: true,
		description: 'JSON object with dataflow IDs and tag names to remove',
	},
	{
		displayName: 'Bulk Patch Data',
		name: 'bulkPatchData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['dataflow'],
				operation: ['bulkUpdateOwner'],
			},
		},
		default: '',
		placeholder: '{"dataFlowIds":[1234,2345],"responsibleUserId":1234,"enabled":true}',
		required: true,
		description: 'JSON object with dataflow IDs and update fields',
	},
	// Preview operation fields
	{
		displayName: 'Preview Data',
		name: 'previewData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['dataflow'],
				operation: ['runPreview'],
			},
		},
		default: '',
		placeholder: '{"databaseType":"MAGIC","engineProperties":{"kettle.mode":"STRICT"},"actions":[]}',
		required: true,
		description: 'JSON object containing dataflow preview configuration',
	},
];
