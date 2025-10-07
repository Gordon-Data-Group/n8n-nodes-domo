import { INodeProperties } from 'n8n-workflow';

export const creditOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['credit'],
			},
		},
		options: [
			{
				name: 'Get Balance',
				value: 'getBalance',
				description: 'Get current credit balance',
				action: 'Get balance',
				routing: {
					request: {
						method: 'GET',
						url: '/api/metrics/v1/usage/credits/balance',
					},
				},
			},
			{
				name: 'Get Contract Details',
				value: 'getContractDetails',
				description: 'Get subscription and contract details',
				action: 'Get contract details',
				routing: {
					request: {
						method: 'GET',
						url: '/api/metrics/v1/usage/credits/contract/current/details',
					},
				},
			},
			{
				name: 'Get Usage Report',
				value: 'getUsageReport',
				description: 'Get credit usage report by month',
				action: 'Get usage report',
				routing: {
					request: {
						method: 'GET',
						url: '/api/metrics/v1/usage/credits/contract/current/summary',
						qs: {
							startDate: '={{$parameter.startDate}}',
							endDate: '={{$parameter.endDate}}',
						},
					},
				},
			},
		],
		default: 'getBalance',
	},
];

export const creditFields: INodeProperties[] = [
	{
		displayName: 'Start Date',
		name: 'startDate',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['credit'],
				operation: ['getUsageReport'],
			},
		},
		default: '',
		description: 'Start date for usage report (YYYY-MM-DD format)',
		placeholder: '2024-01-01',
	},
	{
		displayName: 'End Date',
		name: 'endDate',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['credit'],
				operation: ['getUsageReport'],
			},
		},
		default: '',
		description: 'End date for usage report (YYYY-MM-DD format)',
		placeholder: '2024-12-31',
	},
];

