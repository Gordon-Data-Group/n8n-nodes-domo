import type { INodeProperties } from 'n8n-workflow';

export const formsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['forms'],
			},
		},
	default: 'list-search-forms',
	options: [
	{
		name: 'Create Instance',
		value: 'create-instance',
		action: 'Create instance',
		routing: {
			request: {
				method: 'POST',
				url: '/forms/v1/instances',
			},
		},
	},
	{
		name: 'Create Submission',
		value: 'create-submission',
		action: 'Create submission',
		routing: {
			request: {
				method: 'POST',
				url: '/forms/v1/instances/={{$parameter.id}}/submission',
			},
		},
	},
	{
		name: 'Get Form',
		value: 'get-form',
		action: 'Get form',
		routing: {
			request: {
				method: 'GET',
				url: '/forms/v1/={{$parameter.id}}',
			},
		},
	},
	{
		name: 'List/Search Forms',
		value: 'list-search-forms',
		action: 'List search forms',
		routing: {
			request: {
				method: 'POST',
				url: '/search/v1/query',
			},
		},
	},
	{
		name: 'Update Form Fields',
		value: 'update-form-fields',
		action: 'Update form fields',
		routing: {
			request: {
				method: 'POST',
				url: '/forms/v1/={{$parameter.id}}/hydration',
			},
		},
	},
	{
		name: 'Update Instance',
		value: 'update-instance',
		action: 'Update instance',
		routing: {
			request: {
				method: 'PUT',
				url: '/forms/v1/instances/={{$parameter.id}}',
			},
		},
	},
	],
	},
];

export const formsFields: INodeProperties[] = [
		{
			displayName: 'Data',
			name: 'data',
			type: 'json',
			required: true,
			displayOptions: {
				show: {
					resource: ['forms'],
					operation: ['list-search-forms'],
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
		displayName: 'Form ID',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['forms'],
				operation: ['get-form', 'create-submission', 'update-instance', 'update-form-fields'],
			},
		},
		default: '',
		description: 'The ID of the form or instance',
	},
		{
			displayName: 'Data',
			name: 'data',
			type: 'json',
			required: true,
			displayOptions: {
				show: {
					resource: ['forms'],
					operation: ['create-instance'],
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
					resource: ['forms'],
					operation: ['create-submission'],
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
					resource: ['forms'],
					operation: ['update-instance'],
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
					resource: ['forms'],
					operation: ['update-form-fields'],
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
