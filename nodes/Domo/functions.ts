import type { INodeProperties } from 'n8n-workflow';

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
						body: '={{JSON.parse($parameter.bulkData)}}',
					},
				},
			},
			{
				name: 'Bulk Delete Functions',
				value: 'bulkDeleteFunctions',
				action: 'Bulk delete functions',
				routing: {
					request: {
						method: 'POST',
						url: '/api/query/v1/functions/bulk/template',
						body: '={{JSON.parse($parameter.bulkData)}}',
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
						body: '={{JSON.parse($parameter.bulkData)}}',
					},
				},
			},
			{
				name: 'Create Function',
				value: 'createFunction',
				action: 'Create function',
				routing: {
					request: {
						method: 'POST',
						url: '/api/query/v1/functions/template',
						qs: {
							strict: '={{$parameter.strict}}',
						},
						body: '={{JSON.parse($parameter.functionData)}}',
					},
				},
			},
			{
				name: 'Delete Function',
				value: 'deleteFunction',
				action: 'Delete function',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/query/v1/functions/template/" + $parameter.functionId }}',
					},
				},
			},
			{
				name: 'Get Cards Function Is Used On',
				value: 'getCardsFunctionIsUsedOn',
				action: 'Get cards function is used on',
				routing: {
					request: {
						method: 'GET',
						url: '/api/content/v2/cards/formulausage',
						qs: {
							datasourceId: '={{$parameter.datasourceId}}',
							formulaId: '={{$parameter.formulaId}}',
						},
					},
				},
			},
			{
				name: 'Get Function',
				value: 'getFunction',
				action: 'Get function',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/query/v1/functions/template/" + $parameter.functionId }}',
						qs: {
							hidden: '={{$parameter.hidden}}',
						},
					},
				},
			},
			{
				name: 'Get Functions',
				value: 'getFunctions',
				action: 'Get functions',
				routing: {
					request: {
						method: 'POST',
						url: '/api/query/v1/functions/list/id',
						body: '={{JSON.parse($parameter.functionIds)}}',
					},
				},
			},
			{
				name: 'List Functions',
				value: 'listFunctions',
				action: 'List functions',
				routing: {
					request: {
						method: 'POST',
						url: '/api/query/v1/functions/search',
						body: '={{JSON.parse($parameter.searchData)}}',
					},
				},
			},
			{
				name: 'Lock Function',
				value: 'lockFunction',
				action: 'Lock function',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/query/v1/functions/template/" + $parameter.functionId }}',
						body: '={{JSON.parse($parameter.lockData)}}',
					},
				},
			},
			{
				name: 'Update Function',
				value: 'updateFunction',
				action: 'Update function',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/query/v1/functions/template/" + $parameter.functionId }}',
						qs: {
							strict: '={{$parameter.strict}}',
						},
						body: '={{JSON.parse($parameter.functionData)}}',
					},
				},
			},
		],
	},
];

export const functionsFields: INodeProperties[] = [
	// Function ID field
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
		description: 'The ID of the function',
	},
	// List Functions fields
	{
		displayName: 'Search Data',
		name: 'searchData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['functions'],
				operation: ['listFunctions'],
			},
		},
		default: '',
		placeholder: '{"name":"","filters":[{"field":"dataset","idList":["00000000-0000-0000-0000-000000000000"]},{"field":"notvariable"}],"sort":{"field":"name","ascending":true},"limit":5000,"offset":0}',
		required: true,
		description: 'JSON object containing search criteria',
	},
	// Get Functions fields
	{
		displayName: 'Function IDs',
		name: 'functionIds',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['functions'],
				operation: ['getFunctions'],
			},
		},
		default: '',
		placeholder: '{"IDs":["1234","2345"]}',
		required: true,
		description: 'JSON object containing array of function IDs',
	},
	// Get Function fields
	{
		displayName: 'Hidden',
		name: 'hidden',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['functions'],
				operation: ['getFunction'],
			},
		},
		default: '',
		description: 'Include hidden functions',
	},
	// Get Cards Function is Used On fields
	{
		displayName: 'Datasource ID',
		name: 'datasourceId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['functions'],
				operation: ['getCardsFunctionIsUsedOn'],
			},
		},
		default: '',
		description: 'The datasource ID',
	},
	{
		displayName: 'Formula ID',
		name: 'formulaId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['functions'],
				operation: ['getCardsFunctionIsUsedOn'],
			},
		},
		default: '',
		description: 'The formula ID',
	},
	// Create/Update Function fields
	{
		displayName: 'Function Data',
		name: 'functionData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['functions'],
				operation: ['createFunction', 'updateFunction'],
			},
		},
		default: '',
		placeholder: '{"name":"Function Name","owner":123456,"locked":false,"global":false,"expression":"\'test\'","links":[{"resource":{"type":"DATA_SOURCE","ID":"00000000-0000-0000-0000-000000000000"},"visible":true,"active":false,"valid":"INCOMPATIBLE_LINK"}],"aggregated":false,"analytic":false,"nonAggregatedColumns":[],"dataType":"STRING","status":"VALID","cacheWindow":"non_dynamic","columnPositions":[],"functions":[],"functionTemplateDependencies":[],"archived":false,"hidden":false,"variable":false}',
		required: true,
		description: 'JSON object containing function configuration',
	},
	{
		displayName: 'Strict',
		name: 'strict',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['functions'],
				operation: ['createFunction', 'updateFunction'],
			},
		},
		default: '',
		description: 'Strict validation mode',
	},
	// Bulk operations fields
	{
		displayName: 'Bulk Data',
		name: 'bulkData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['functions'],
				operation: ['bulkCreateFunctions', 'bulkUpdateFunctions', 'bulkDeleteFunctions'],
			},
		},
		default: '',
		placeholder: '{"create":[],"update":[],"delete":[],"links":{},"strict":false,"replaceLinks":true,"copyDependencies":true}',
		required: true,
		description: 'JSON object containing bulk operation data',
	},
	// Lock Function fields
	{
		displayName: 'Lock Data',
		name: 'lockData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['functions'],
				operation: ['lockFunction'],
			},
		},
		default: '',
		placeholder: '{"locked":true}',
		required: true,
		description: 'JSON object to lock/unlock function',
	},
];
