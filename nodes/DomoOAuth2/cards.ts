import type { INodeProperties } from 'n8n-workflow';

export const cardsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['cards'],
			},
		},
	default: 'list-cards',
	options: [
	{
		name: 'Add Drill View',
		value: 'add-drill-view',
		action: 'Add drill view',
		description: 'Adds a new drill view definition to an existing Card',
		routing: {
			request: {
				method: 'POST',
				url: '/v1/cards/chart/={{$parameter["cardUrn"]}}/drill',
			},
		},
	},
	{
		name: 'Create Chart Card',
		value: 'create-chart-card',
		action: 'Create chart card',
		description: 'Create a new Card to visualize data from an existing DataSet',
		routing: {
			request: {
				method: 'POST',
				url: '/v1/cards/chart',
			},
		},
	},
	{
		name: 'Get Card',
		value: 'get-card',
		action: 'Get card',
		description: 'Retrieves a Card',
		routing: {
			request: {
				method: 'GET',
				url: '/v1/cards/={{$parameter["cardUrn"]}}',
			},
		},
	},
	{
		name: 'Get Chart Card Definition',
		value: 'get-chart-card-definition',
		action: 'Get chart card definition',
		description: 'Retrieves the definition for an existing chart Card',
		routing: {
			request: {
				method: 'GET',
				url: '/v1/cards/chart/={{$parameter["cardUrn"]}}',
			},
		},
	},
	{
		name: 'Get Drill Properties',
		value: 'get-drill-properties',
		action: 'Get drill properties',
		description: 'Retrieves drill views of a Card',
		routing: {
			request: {
				method: 'GET',
				url: '/v1/cards/chart/={{$parameter["cardUrn"]}}/drillpath',
			},
		},
	},
	{
		name: 'List Cards',
		value: 'list-cards',
		action: 'List cards',
		description: 'Get a list of Cards for which the user has permission. Use `limit` in conjunction with `offset` for pagination.',
		routing: {
			request: {
				method: 'GET',
				url: '/v1/cards',
			},
		},
	},
	{
		name: 'Update Chart Card Definition',
		value: 'update-chart-card-definition',
		action: 'Update chart card definition',
		description: 'Updates definition of an existing chart Card',
		routing: {
			request: {
				method: 'PUT',
				url: '/v1/cards/chart/={{$parameter["cardUrn"]}}',
			},
		},
	},
	],
	},
];

export const cardsFields: INodeProperties[] = [
	{
		displayName: 'Card URN',
		name: 'cardUrn',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['cards'],
				operation: ['get-card', 'get-chart-card-definition', 'update-chart-card-definition', 'add-drill-view', 'get-drill-properties'],
			},
		},
		default: '',
		description: 'The URN of the card',
	},
	{
		displayName: 'Data',
		name: 'data',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				resource: ['cards'],
				operation: ['create-chart-card', 'update-chart-card-definition', 'add-drill-view'],
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
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['cards'],
				operation: ['list-cards'],
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
		displayName: 'Offset',
		name: 'offset',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['cards'],
				operation: ['list-cards'],
			},
		},
		default: 0,
		description: 'The number of results to skip',
		routing: {
			request: {
				qs: {
					offset: '={{$parameter.offset}}',
				},
			},
		},
	},
];
