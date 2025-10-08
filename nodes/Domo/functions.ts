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
	default: 'list-functions',
	options: [
	{
		name: 'Bulk Create Functions',
		value: 'bulk-create-functions',
		action: 'Bulk create functions',
		routing: {
			request: {
				method: 'POST',
				url: '/query/v1/functions/bulk/template',
			},
		},
	},
	{
		name: 'Bulk Delete Functions',
		value: 'bulk-delete-functions',
		action: 'Bulk delete functions',
		routing: {
			request: {
				method: 'POST',
				url: '/query/v1/functions/bulk/template',
			},
		},
	},
	{
		name: 'Bulk Update Functions',
		value: 'bulk-update-functions',
		action: 'Bulk update functions',
		routing: {
			request: {
				method: 'POST',
				url: '/query/v1/functions/bulk/template',
			},
		},
	},
	{
		name: 'Create Function',
		value: 'create-function',
		action: 'Create function',
		routing: {
			request: {
				method: 'POST',
				url: '/query/v1/functions/template',
			},
		},
	},
	{
		name: 'Delete Function',
		value: 'delete-function',
		action: 'Delete function',
		routing: {
			request: {
				method: 'DELETE',
				url: '/query/v1/functions/template/={{$parameter.id}}',
			},
		},
	},
	{
		name: 'Get Cards Function Is Used On',
		value: 'get-cards-function-is-used-on',
		action: 'Get cards function is used on',
		routing: {
			request: {
				method: 'GET',
				url: '/content/v2/cards/formulausage',
			},
		},
	},
	{
		name: 'Get Function',
		value: 'get-function',
		action: 'Get function',
		routing: {
			request: {
				method: 'GET',
				url: '/query/v1/functions/template/={{$parameter.id}}',
			},
		},
	},
	{
		name: 'Get Functions',
		value: 'get-functions',
		action: 'Get functions',
		routing: {
			request: {
				method: 'POST',
				url: '/query/v1/functions/list/id',
			},
		},
	},
	{
		name: 'List Functions',
		value: 'list-functions',
		action: 'List functions',
		routing: {
			request: {
				method: 'POST',
				url: '/query/v1/functions/search',
			},
		},
	},
	{
		name: 'Lock Function',
		value: 'lock-function',
		action: 'Lock function',
		routing: {
			request: {
				method: 'PUT',
				url: '/query/v1/functions/template/={{$parameter.id}}',
			},
		},
	},
	{
		name: 'Update Function',
		value: 'update-function',
		action: 'Update function',
		routing: {
			request: {
				method: 'PUT',
				url: '/query/v1/functions/template/={{$parameter.id}}',
			},
		},
	},
	],
	},
];

export const functionsFields: INodeProperties[] = [
		{
			displayName: 'Data',
			name: 'data',
			type: 'json',
			required: true,
			displayOptions: {
				show: {
					resource: ['functions'],
					operation: ['list-functions'],
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
					resource: ['functions'],
					operation: ['get-functions'],
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
		displayName: 'Function ID',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['functions'],
				operation: ['get-function', 'update-function', 'lock-function', 'delete-function'],
			},
		},
		default: '',
		description: 'The ID of the function',
	},
		{
			displayName: 'Hidden',
			name: 'hidden',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['functions'],
					operation: ['get-function'],
				},
			},
			default: '',
			description: 'The hidden parameter',
			routing: {
				request: {
					qs: {
						hidden: '={{$parameter.hidden}}',
					},
				},
			},
		},
		{
			displayName: 'DatasourceId',
			name: 'datasourceId',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['functions'],
					operation: ['get-cards-function-is-used-on'],
				},
			},
			default: '',
			description: 'The datasourceId parameter',
			routing: {
				request: {
					qs: {
						datasourceId: '={{$parameter.datasourceId}}',
					},
				},
			},
		},
		{
			displayName: 'FormulaId',
			name: 'formulaId',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['functions'],
					operation: ['get-cards-function-is-used-on'],
				},
			},
			default: '',
			description: 'The formulaId parameter',
			routing: {
				request: {
					qs: {
						formulaId: '={{$parameter.formulaId}}',
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
					resource: ['functions'],
					operation: ['create-function'],
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
			displayName: 'Strict',
			name: 'strict',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['functions'],
					operation: ['create-function'],
				},
			},
			default: '',
			description: 'The strict parameter',
			routing: {
				request: {
					qs: {
						strict: '={{$parameter.strict}}',
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
					resource: ['functions'],
					operation: ['bulk-create-functions'],
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
					resource: ['functions'],
					operation: ['update-function'],
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
			displayName: 'Strict',
			name: 'strict',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['functions'],
					operation: ['update-function'],
				},
			},
			default: '',
			description: 'The strict parameter',
			routing: {
				request: {
					qs: {
						strict: '={{$parameter.strict}}',
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
					resource: ['functions'],
					operation: ['bulk-update-functions'],
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
					resource: ['functions'],
					operation: ['lock-function'],
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
					resource: ['functions'],
					operation: ['bulk-delete-functions'],
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
];
