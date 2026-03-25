import type { INodeProperties } from 'n8n-workflow';

export const workflowsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['workflows'],
			},
		},
		default: 'list-workflows',
		options: [
		{
			name: 'Create Workflow',
			value: 'create-workflow',
			action: 'Create workflow',
			routing: {
				request: {
					method: 'POST',
					url: '/workflow/v2/models',
				},
			},
		},
		{
			name: 'Delete Workflow',
			value: 'delete-workflow',
			action: 'Delete workflow',
			routing: {
				request: {
					method: 'DELETE',
					url: '/workflow/v1/models/={{$parameter.id}}',
				},
			},
		},
		{
			name: 'Get Execution',
			value: 'get-execution',
			action: 'Get execution',
			routing: {
				request: {
					method: 'GET',
					url: '/workflow/v2/executions/={{$parameter.executionId}}',
				},
			},
		},
		{
			name: 'Get Locks',
			value: 'get-locks',
			action: 'Get locks',
			routing: {
				request: {
					method: 'GET',
					url: '/workflow/v1/models/={{$parameter.id}}/locks',
				},
			},
		},
		{
			name: 'Get Package Functions',
			value: 'get-package-functions',
			action: 'Get package functions',
			routing: {
				request: {
					method: 'GET',
					url: '/workflow/v1/library/packages/nebulaFunction',
				},
			},
		},
		{
			name: 'Get Permissions',
			value: 'get-permissions',
			action: 'Get permissions',
			routing: {
				request: {
					method: 'GET',
					url: '/workflow/v1/models/={{$parameter.id}}/permissions',
				},
			},
		},
		{
			name: 'Get Version',
			value: 'get-version',
			action: 'Get version',
			routing: {
				request: {
					method: 'GET',
					url: '/workflow/v2/models/={{$parameter.workflowId}}/versions/={{$parameter.versionNumber}}',
				},
			},
		},
		{
			name: 'Get Version Definition',
			value: 'get-version-definition',
			action: 'Get version definition',
			routing: {
				request: {
					method: 'GET',
					url: '/workflow/v2/models/={{$parameter.workflowId}}/versions/={{$parameter.versionNumber}}/definition',
				},
			},
		},
		{
			name: 'Get Version Lock',
			value: 'get-version-lock',
			action: 'Get version lock',
			routing: {
				request: {
					method: 'GET',
					url: '/workflow/v1/models/={{$parameter.id}}/verison/={{$parameter.versionNumber}}/lock',
				},
			},
		},
		{
			name: 'Get Workflow',
			value: 'get-workflow',
			action: 'Get workflow',
			routing: {
				request: {
					method: 'GET',
					url: '/workflow/v1/models/={{$parameter.id}}',
				},
			},
		},
		{
			name: 'List Executions',
			value: 'list-executions',
			action: 'List executions',
			routing: {
				request: {
					method: 'GET',
					url: '/workflow/v2/executions',
				},
			},
		},
		{
			name: 'List Workflows',
			value: 'list-workflows',
			action: 'List workflows',
			routing: {
				request: {
					method: 'GET',
					url: '/workflow/v1/models',
				},
			},
		},
		{
			name: 'Run Workflow',
			value: 'run-workflow',
			action: 'Run workflow',
			routing: {
				request: {
					method: 'POST',
					url: '/workflow/v2/triggers/={{$parameter.id}}/activate',
				},
			},
		},
		{
			name: 'Search Workflows',
			value: 'search-workflows',
			action: 'Search workflows',
			routing: {
				request: {
					method: 'POST',
					url: '/search/v1/query',
				},
			},
		},
		{
			name: 'Update Version Definition',
			value: 'update-version-definition',
			action: 'Update version definition',
			routing: {
				request: {
					method: 'PUT',
					url: '/workflow/v2/models/={{$parameter.workflowId}}/versions/={{$parameter.versionNumber}}/definition',
				},
			},
		},
		{
			name: 'Update Workflow',
			value: 'update-workflow',
			action: 'Update workflow',
			routing: {
				request: {
					method: 'PUT',
					url: '/workflow/v1/models/={{$parameter.id}}',
				},
			},
		},
		],
	},
];

export const workflowsFields: INodeProperties[] = [
		{
			displayName: 'Data',
			name: 'data',
			type: 'json',
			required: true,
			displayOptions: {
				show: {
					resource: ['workflows'],
					operation: ['search-workflows'],
				},
			},
			default: '',
			description: 'The data to send',
			routing: {
				request: {
					body: {
						data: '={{JSON.parse($parameter.data)}}',
					},
				},
			},
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
					resource: ['workflows'],
					operation: ['list-workflows'],
				},
			},
			default: 50,
			description: 'Max number of results to return',
			routing: {
				request: {
					qs: {
						limit: '={{$parameter.limit}}',
					},
				},
			},
		},
		{
			displayName: 'ModelId',
			name: 'modelId',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['workflows'],
					operation: ['list-executions'],
				},
			},
			default: '',
			description: 'The modelId parameter',
			routing: {
				request: {
					qs: {
						modelId: '={{$parameter.modelId}}',
					},
				},
			},
		},
		{
			displayName: 'TriggerTypes',
			name: 'triggerTypes',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['workflows'],
					operation: ['list-executions'],
				},
			},
			default: '',
			description: 'The triggerTypes parameter',
			routing: {
				request: {
					qs: {
						triggerTypes: '={{$parameter.triggerTypes}}',
					},
				},
			},
		},
		{
			displayName: 'Version',
			name: 'version',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['workflows'],
					operation: ['list-executions'],
				},
			},
			default: '',
			description: 'The version parameter',
			routing: {
				request: {
					qs: {
						version: '={{$parameter.version}}',
					},
				},
			},
		},
		{
			displayName: 'Status',
			name: 'status',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['workflows'],
					operation: ['list-executions'],
				},
			},
			default: '',
			description: 'The status parameter',
			routing: {
				request: {
					qs: {
						status: '={{$parameter.status}}',
					},
				},
			},
		},
		{
			displayName: 'ExecutionId ID',
			name: 'executionId',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					resource: ['workflows'],
					operation: ['get-execution'],
				},
			},
			default: '',
			description: 'The ID of the executionId',
		},
		{
			displayName: 'ID ID',
			name: 'id',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					resource: ['workflows'],
					operation: ['get-workflow'],
				},
			},
			default: '',
			description: 'The ID',
		},
		{
			displayName: 'Parts',
			name: 'parts',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['workflows'],
					operation: ['get-workflow'],
				},
			},
			default: '',
			description: 'The parts parameter',
			routing: {
				request: {
					qs: {
						parts: '={{$parameter.parts}}',
					},
				},
			},
		},
		{
			displayName: 'WorkflowId ID',
			name: 'workflowId',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					resource: ['workflows'],
					operation: ['get-version'],
				},
			},
			default: '',
			description: 'The ID of the workflowId',
		},
		{
			displayName: 'VersionNumber ID',
			name: 'versionNumber',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					resource: ['workflows'],
					operation: ['get-version'],
				},
			},
			default: '',
			description: 'The ID of the versionNumber',
		},
		{
			displayName: 'WorkflowId ID',
			name: 'workflowId',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					resource: ['workflows'],
					operation: ['get-version-definition'],
				},
			},
			default: '',
			description: 'The ID of the workflowId',
		},
		{
			displayName: 'VersionNumber ID',
			name: 'versionNumber',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					resource: ['workflows'],
					operation: ['get-version-definition'],
				},
			},
			default: '',
			description: 'The ID of the versionNumber',
		},
		{
			displayName: 'ID ID',
			name: 'id',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					resource: ['workflows'],
					operation: ['get-permissions'],
				},
			},
			default: '',
			description: 'The ID',
		},
		{
			displayName: 'ID ID',
			name: 'id',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					resource: ['workflows'],
					operation: ['get-locks'],
				},
			},
			default: '',
			description: 'The ID',
		},
		{
			displayName: 'ID ID',
			name: 'id',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					resource: ['workflows'],
					operation: ['get-version-lock'],
				},
			},
			default: '',
			description: 'The ID',
		},
		{
			displayName: 'VersionNumber ID',
			name: 'versionNumber',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					resource: ['workflows'],
					operation: ['get-version-lock'],
				},
			},
			default: '',
			description: 'The ID of the versionNumber',
		},
		{
			displayName: 'ID',
			name: 'id',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['workflows'],
					operation: ['get-package-functions'],
				},
			},
			default: '',
			description: 'The ID parameter',
			routing: {
				request: {
					qs: {
						id: '={{$parameter.id}}',
					},
				},
			},
		},
		{
			displayName: 'Version',
			name: 'version',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['workflows'],
					operation: ['get-package-functions'],
				},
			},
			default: '',
			description: 'The version parameter',
			routing: {
				request: {
					qs: {
						version: '={{$parameter.version}}',
					},
				},
			},
		},
		{
			displayName: 'ID ID',
			name: 'id',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					resource: ['workflows'],
					operation: ['run-workflow'],
				},
			},
			default: '',
			description: 'The ID',
		},
		{
			displayName: 'Data',
			name: 'data',
			type: 'json',
			required: true,
			displayOptions: {
				show: {
					resource: ['workflows'],
					operation: ['run-workflow'],
				},
			},
			default: '',
			description: 'The data to send',
			routing: {
				request: {
					body: {
						data: '={{JSON.parse($parameter.data)}}',
					},
				},
			},
		},
		{
			displayName: 'Data',
			name: 'data',
			type: 'json',
			required: true,
			displayOptions: {
				show: {
					resource: ['workflows'],
					operation: ['create-workflow'],
				},
			},
			default: '',
			description: 'The data to send',
			routing: {
				request: {
					body: {
						data: '={{JSON.parse($parameter.data)}}',
					},
				},
			},
		},
		{
			displayName: 'ID ID',
			name: 'id',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					resource: ['workflows'],
					operation: ['update-workflow'],
				},
			},
			default: '',
			description: 'The ID',
		},
		{
			displayName: 'Data',
			name: 'data',
			type: 'json',
			required: true,
			displayOptions: {
				show: {
					resource: ['workflows'],
					operation: ['update-workflow'],
				},
			},
			default: '',
			description: 'The data to send',
			routing: {
				request: {
					body: {
						data: '={{JSON.parse($parameter.data)}}',
					},
				},
			},
		},
		{
			displayName: 'WorkflowId ID',
			name: 'workflowId',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					resource: ['workflows'],
					operation: ['update-version-definition'],
				},
			},
			default: '',
			description: 'The ID of the workflowId',
		},
		{
			displayName: 'VersionNumber ID',
			name: 'versionNumber',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					resource: ['workflows'],
					operation: ['update-version-definition'],
				},
			},
			default: '',
			description: 'The ID of the versionNumber',
		},
		{
			displayName: 'Data',
			name: 'data',
			type: 'json',
			required: true,
			displayOptions: {
				show: {
					resource: ['workflows'],
					operation: ['update-version-definition'],
				},
			},
			default: '',
			description: 'The data to send',
			routing: {
				request: {
					body: {
						data: '={{JSON.parse($parameter.data)}}',
					},
				},
			},
		},
		{
			displayName: 'ID ID',
			name: 'id',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					resource: ['workflows'],
					operation: ['delete-workflow'],
				},
			},
			default: '',
			description: 'The ID',
		},
];
