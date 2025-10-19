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
		default: 'getPins',
		options: [
			{
				name: 'Create Pin',
				value: 'createPin',
				action: 'Create pin',
				routing: {
					request: {
						method: 'POST',
						url: '/api/nav/v1/pins/append',
						body: '={{JSON.parse($parameter.pinData)}}',
					},
				},
			},
			{
				name: 'Get Pins',
				value: 'getPins',
				action: 'Get pins',
				routing: {
					request: {
						method: 'GET',
						url: '/api/nav/v1/pins',
					},
				},
			},
			{
				name: 'Update Pins',
				value: 'updatePins',
				action: 'Update pins',
				description: 'The order of pins is determined by their position in the array, not by the order property. Domo UI includes the order property in the request, but it does not affect the order and can be omitted. To reorder, send all pins reordered as desired in the array. The order property will be returned updated to match the order of the array',
				routing: {
					request: {
						method: 'POST',
						url: '/api/nav/v1/pins/append',
						body: '={{JSON.parse($parameter.pinData)}}',
					},
				},
			},
		],
	},
];

export const leftNavigationFields: INodeProperties[] = [
	{
		displayName: 'Pin Data',
		name: 'pinData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['leftNavigation'],
				operation: ['createPin', 'updatePins'],
			},
		},
		default: '',
		placeholder: '{"action":{"ID":"automate_workflow","type":"feature","newTab":false},"icon":"workflow","iconColor":"#FFFFFFB3","iconBackgroundColor":"#FFFFFF00","label":"Label","userID":1234}',
		required: true,
		description: 'JSON object or array containing pin configuration',
	},
];
