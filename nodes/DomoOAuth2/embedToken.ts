import type { INodeProperties } from 'n8n-workflow';

export const embedTokenOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['embedToken'],
			},
		},
		default: 'create-an-embed-token-cards',
		options: [
		{
			name: 'Create an Embed Token (Cards)',
			value: 'create-an-embed-token-cards',
			action: 'Create an embed token cards',
			routing: {
				request: {
					method: 'POST',
					url: '/v1/cards/embed/auth',
				},
			},
		},
		{
			name: 'Create an Embed Token (Dashboard)',
			value: 'create-an-embed-token-dashboard',
			action: 'Create an embed token dashboard',
			routing: {
				request: {
					method: 'POST',
					url: '/v1/stories/embed/auth',
				},
			},
		},
		],
	},
];

export const embedTokenFields: INodeProperties[] = [
	{
		displayName: 'Data',
		name: 'data',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				resource: ['embedToken'],
				operation: ['create-an-embed-token-cards'],
			},
		},
		default: '',
		description: 'The data to send in JSON format',
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
				resource: ['embedToken'],
				operation: ['create-an-embed-token-dashboard'],
			},
		},
		default: '',
		description: 'The data to send in JSON format',
		routing: {
			request: {
				body: {
					data: '={{JSON.parse($parameter.data)}}',
				},
			},
		},
	},
];
