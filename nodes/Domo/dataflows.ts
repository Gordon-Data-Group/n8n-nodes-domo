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
				description: 'Add a tag to a dataflow',
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
				description: 'Add tags to multiple dataflows',
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
				name: 'Bulk Delete',
				value: 'bulkDelete',
				description: 'Delete multiple dataflows',
				action: 'Bulk delete',
				routing: {
					request: {
						method: 'PUT',
						url: '/api/dataprocessing/v1/dataflows/bulk/delete',
						body: '={{JSON.parse($parameter.dataflowIds)}}',
					},
				},
			},
			{
				name: 'Bulk Run',
				value: 'bulkRun',
				description: 'Run multiple dataflows',
				action: 'Bulk run',
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
				description: 'Update owner for multiple dataflows',
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
				name: 'Count by Type',
				value: 'countByType',
				description: 'Count dataflows by type',
				action: 'Count by type',
				routing: {
					request: {
						method: 'GET',
						url: '/api/dataprocessing/v2/dataflows/filters/dataflowType',
					},
				},
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new dataflow',
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
				name: 'Delete',
				value: 'delete',
				description: 'Delete a dataflow',
				action: 'Delete dataflow',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/dataprocessing/v1/dataflows/" + $parameter.dataflowId }}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a specific dataflow by ID',
				action: 'Get dataflow',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/dataprocessing/v2/dataflows/" + $parameter.dataflowId }}',
					},
				},
			},
			{
				name: 'Get Execution',
				value: 'getExecution',
				description: 'Get details of a specific dataflow execution',
				action: 'Get execution',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/dataprocessing/v1/dataflows/" + $parameter.dataflowId + "/executions/" + $parameter.executionId }}',
					},
				},
			},
			{
				name: 'Get Executions',
				value: 'getExecutions',
				description: 'Get execution history for a dataflow',
				action: 'Get executions',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/dataprocessing/v1/dataflows/" + $parameter.dataflowId + "/executions" }}',
						qs: {
							limit: '={{Math.min($parameter.limit || 100, 500)}}',
							offset: '={{$parameter.offset || 0}}',
						},
					},
				},
			},
			{
				name: 'Get SQL Functions',
				value: 'getSqlFunctions',
				description: 'Get available SQL functions for dataflows',
				action: 'Get SQL functions',
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
				description: 'Get tags for a dataflow',
				action: 'Get tags',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/dataprocessing/v1/dataflows/" + $parameter.dataflowId + "/subscription" }}',
					},
				},
			},
			{
				name: 'Get Timezones',
				value: 'getTimezones',
				description: 'Get available timezones for dataflows',
				action: 'Get timezones',
				routing: {
					request: {
						method: 'GET',
						url: '/api/dataprocessing/v1/dataflows/timezones',
					},
				},
			},
			{
				name: 'Get Version',
				value: 'getVersion',
				description: 'Get a specific version of a dataflow',
				action: 'Get version',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/dataprocessing/v2/dataflows/" + $parameter.dataflowId + "/versions/" + $parameter.versionId }}',
					},
				},
			},
			{
				name: 'Get Version by Number',
				value: 'getVersionByNumber',
				description: 'Get a dataflow version by version number',
				action: 'Get version by number',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/dataprocessing/v3/dataflows/" + $parameter.dataflowId + "/versions/" + $parameter.versionNumber }}',
					},
				},
			},
			{
				name: 'List',
				value: 'list',
				description: 'List all dataflows',
				action: 'List dataflows',
				routing: {
					request: {
						method: 'GET',
						url: '/api/dataprocessing/v2/dataflows',
						qs: {
							limit: '={{Math.min($parameter.limit || 100, 500)}}',
							offset: '={{$parameter.offset || 0}}',
							orderBy: '={{$parameter.orderBy || "name"}}',
						},
					},
				},
			},
			{
				name: 'List Versions',
				value: 'listVersions',
				description: 'List all versions of a dataflow',
				action: 'List versions',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/dataprocessing/v1/dataflows/" + $parameter.dataflowId + "/versions" }}',
					},
				},
			},
			{
				name: 'Remove All Tags',
				value: 'removeAllTags',
				description: 'Remove all tags from a dataflow',
				action: 'Remove all tags',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/dataprocessing/v1/dataflows/" + $parameter.dataflowId + "/tags" }}',
					},
				},
			},
			{
				name: 'Run',
				value: 'run',
				description: 'Run a dataflow',
				action: 'Run dataflow',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/dataprocessing/v1/dataflows/" + $parameter.dataflowId + "/executions" }}',
					},
				},
			},
			{
				name: 'Run Preview',
				value: 'runPreview',
				description: 'Run a dataflow preview',
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
				name: 'Search',
				value: 'search',
				description: 'Search for dataflows',
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
				name: 'Update',
				value: 'update',
				description: 'Update a dataflow',
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
				name: 'Update Metadata',
				value: 'updateMetadata',
				description: 'Update dataflow owner, name, and description',
				action: 'Update metadata',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/dataprocessing/v1/dataflows/" + $parameter.dataflowId + "/patch" }}',
						body: '={{JSON.parse($parameter.patchData)}}',
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
					'removeAllTags',
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
		default: '{}',
		required: true,
		description: 'JSON search query object',
		placeholder: '{"entities":["DATAFLOW"],"query":"*","count":100,"offset":0}',
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
		default: '{}',
		required: true,
		description: 'JSON object containing dataflow configuration',
		placeholder: '{"name":"My DataFlow","actions":[],"engineProperties":{}}',
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
		default: '{}',
		required: true,
		description: 'JSON object with fields to update (name, description, responsibleUserId, etc.)',
		placeholder: '{"name":"New Name","responsibleUserId":1234,"description":"Description"}',
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
		default: '{"tag":""}',
		required: true,
		description: 'JSON object containing tag information',
		placeholder: '{"tag":"MyTag"}',
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
		default: '{"dataFlowIds":[]}',
		required: true,
		description: 'JSON object containing array of dataflow IDs',
		placeholder: '{"dataFlowIds":[1234,2345]}',
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
		default: '{"dataFlowIds":[],"tagNames":[]}',
		required: true,
		description: 'JSON object with dataflow IDs and tag names',
		placeholder: '{"dataFlowIds":[1234,2345],"tagNames":["tag1","tag2"]}',
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
		default: '{"dataFlowIds":[],"responsibleUserId":0}',
		required: true,
		description: 'JSON object with dataflow IDs and update fields',
		placeholder: '{"dataFlowIds":[1234,2345],"responsibleUserId":1234,"enabled":true}',
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
		default: '{"databaseType":"MAGIC","actions":[],"settings":{"zoneId":"UTC"}}',
		required: true,
		description: 'JSON object containing dataflow preview configuration',
		placeholder: '{"databaseType":"MAGIC","engineProperties":{"kettle.mode":"STRICT"},"actions":[]}',
	},
];

