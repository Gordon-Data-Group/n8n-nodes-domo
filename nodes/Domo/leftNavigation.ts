import type { INodeProperties } from 'n8n-workflow';

export const leftNavigationOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['leftNavigation'],
			},
		},
		default: 'get-pins',
		options: [
		{
			name: 'Get Pins',
			value: 'get-pins',
			action: 'Get pins',
			routing: {
				request: {
					method: 'GET',
					url: '/nav/v1/pins',
				},
			},
		},
		{
			name: 'Create Pin',
			value: 'create-pin',
			action: 'Create pin',
			routing: {
				request: {
					method: 'POST',
					url: '/nav/v1/pins/append',
				},
			},
		},
		{
			name: 'Update Pins',
			value: 'update-pins',
		action: 'Update pins',
		description: 'The order of pins is determined by their position in the array, not by the order property. Domo UI includes the order property in the request, but it does not affect the order and can be omitted. To reorder, send all pins reordered as desired in the array. The order property will be returned updated to match the order of the array',
			routing: {
				request: {
					method: 'POST',
					url: '/nav/v1/pins/append',
				},
			},
		},
		],
	},
];

export const leftNavigationFields: INodeProperties[] = [
		{
			displayName: 'Data',
			name: 'data',
			type: 'json',
			required: true,
			displayOptions: {
				show: {
					resource: ['leftNavigation'],
					operation: ['create-pin'],
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
					resource: ['leftNavigation'],
					operation: ['update-pins'],
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
