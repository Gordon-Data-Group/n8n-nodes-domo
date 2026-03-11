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
				name: 'Create/Update Pins',
				value: 'updatePins',
				action: 'Update pins',
				description: 'The order of pins is determined by their position in the array. To add a pin, send the pin data in the array without an ID.',
				routing: {
					request: {
						method: 'POST',
						url: '/api/nav/v1/pins',
						body: '={{$parameter.pinData}}',
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
