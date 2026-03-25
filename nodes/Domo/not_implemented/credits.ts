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
				name: 'Get Credit Balance/Statements',
				value: 'getCreditBalance',
				action: 'Get credit balance statements',
				routing: {
					request: {
						method: 'GET',
						url: '/api/metrics/v1/usage/credits/reports/balance',
					},
				},
			},
			{
				name: 'Get Credit Usage Report by Month',
				value: 'getCreditUsageReport',
				action: 'Get credit usage report by month',
				routing: {
					request: {
						method: 'GET',
						url: '/api/metrics/v1/usage/credits/reports/usage',
						qs: {
							startDate: '={{$parameter.startDate}}',
							endDate: '={{$parameter.endDate}}',
						},
					},
				},
			},
			{
				name: 'Get Subscription Page/Contract Details',
				value: 'getSubscriptionDetails',
				action: 'Get subscription page contract details',
				routing: {
					request: {
						method: 'GET',
						url: '/api/metrics/v1/usage/credits/reports/subscription',
					},
				},
			},
		],
		default: 'getCreditBalance',
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
				operation: ['getCreditUsageReport'],
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
				operation: ['getCreditUsageReport'],
			},
		},
		default: '',
		description: 'End date for usage report (YYYY-MM-DD format)',
		placeholder: '2024-12-31',
	},
];
