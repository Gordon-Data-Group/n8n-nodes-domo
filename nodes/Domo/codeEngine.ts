import { INodeProperties } from 'n8n-workflow';

export const codeEngineOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['codeEngine'],
			},
		},
		options: [
			{
				name: 'Create Script',
				value: 'createScript',
				description: 'Create a new code engine script',
				action: 'Create script',
				routing: {
					request: {
						method: 'POST',
						url: '/api/code-engine/v1/scripts',
						body: '={{JSON.parse($parameter.scriptData)}}',
					},
				},
			},
			{
				name: 'Delete Script',
				value: 'deleteScript',
				description: 'Delete a code engine script',
				action: 'Delete script',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/code-engine/v1/scripts/" + $parameter.scriptId }}',
					},
				},
			},
			{
				name: 'Execute Script',
				value: 'executeScript',
				description: 'Execute a code engine script',
				action: 'Execute script',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/code-engine/v1/scripts/" + $parameter.scriptId + "/execute" }}',
						body: '={{JSON.parse($parameter.executionData)}}',
					},
				},
			},
			{
				name: 'Get Execution',
				value: 'getExecution',
				description: 'Get details of a script execution',
				action: 'Get execution',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/code-engine/v1/executions/" + $parameter.executionId }}',
					},
				},
			},
			{
				name: 'Get Execution Logs',
				value: 'getExecutionLogs',
				description: 'Get logs from a script execution',
				action: 'Get execution logs',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/code-engine/v1/executions/" + $parameter.executionId + "/logs" }}',
					},
				},
			},
			{
				name: 'Get Script',
				value: 'getScript',
				description: 'Get details of a specific script',
				action: 'Get script',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/code-engine/v1/scripts/" + $parameter.scriptId }}',
					},
				},
			},
			{
				name: 'List Executions',
				value: 'listExecutions',
				description: 'List script executions',
				action: 'List executions',
				routing: {
					request: {
						method: 'GET',
						url: '/api/code-engine/v1/executions',
						qs: {
							scriptId: '={{$parameter.scriptId}}',
							limit: '={{Math.min($parameter.limit || 50, 500)}}',
							offset: '={{$parameter.offset || 0}}',
						},
					},
				},
			},
			{
				name: 'List Packages',
				value: 'listPackages',
				description: 'List available packages',
				action: 'List packages',
				routing: {
					request: {
						method: 'GET',
						url: '/api/code-engine/v1/packages',
						qs: {
							language: '={{$parameter.language}}',
						},
					},
				},
			},
			{
				name: 'List Scripts',
				value: 'listScripts',
				description: 'List all code engine scripts',
				action: 'List scripts',
				routing: {
					request: {
						method: 'GET',
						url: '/api/code-engine/v1/scripts',
						qs: {
							limit: '={{Math.min($parameter.limit || 50, 500)}}',
							offset: '={{$parameter.offset || 0}}',
						},
					},
				},
			},
			{
				name: 'Update Script',
				value: 'updateScript',
				description: 'Update a code engine script',
				action: 'Update script',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/code-engine/v1/scripts/" + $parameter.scriptId }}',
						body: '={{JSON.parse($parameter.scriptData)}}',
					},
				},
			},
		],
		default: 'listScripts',
	},
];

export const codeEngineFields: INodeProperties[] = [
	// Script ID field
	{
		displayName: 'Script ID',
		name: 'scriptId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['codeEngine'],
				operation: ['getScript', 'updateScript', 'deleteScript', 'executeScript', 'listExecutions'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the script',
	},
	// Execution ID field
	{
		displayName: 'Execution ID',
		name: 'executionId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['codeEngine'],
				operation: ['getExecution', 'getExecutionLogs'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the execution',
	},
	// List scripts fields
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['codeEngine'],
				operation: ['listScripts', 'listExecutions'],
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
				resource: ['codeEngine'],
				operation: ['listScripts', 'listExecutions'],
			},
		},
		default: 0,
		description: 'Number of items to skip',
	},
	// Create and Update script fields
	{
		displayName: 'Script Data',
		name: 'scriptData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['codeEngine'],
				operation: ['createScript', 'updateScript'],
			},
		},
		default: '{}',
		required: true,
		description: 'JSON object containing script configuration',
		placeholder: '{"name":"My Script","language":"python","code":"print(\'Hello World\')","packages":["pandas","numpy"]}',
	},
	// Execute script fields
	{
		displayName: 'Execution Data',
		name: 'executionData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['codeEngine'],
				operation: ['executeScript'],
			},
		},
		default: '{}',
		description: 'JSON object containing execution parameters and inputs',
		placeholder: '{"parameters":{"param1":"value1"},"timeout":300}',
	},
	// List packages fields
	{
		displayName: 'Language',
		name: 'language',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['codeEngine'],
				operation: ['listPackages'],
			},
		},
		options: [
			{
				name: 'JavaScript',
				value: 'javascript',
			},
			{
				name: 'Python',
				value: 'python',
			},
		],
		default: 'python',
		description: 'The programming language for packages',
	},
];

