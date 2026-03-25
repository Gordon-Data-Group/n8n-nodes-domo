import { INodeProperties } from 'n8n-workflow';
import { preSendLogger } from './shared/preSendLogger';

export const creditsOperations: INodeProperties[] = [
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
				name: 'Get Balance and Statements',
				value: 'getBalance',
				action: 'Get credit balance and statements',
				routing: {
					request: {
						method: 'GET',
						url: '/api/metrics/v1/usage/credits/reports/balance',
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Get Subscription and Contract Details',
				value: 'getSubscription',
				action: 'Get subscription and contract details',
				routing: {
					request: {
						method: 'GET',
						url: '/api/metrics/v1/usage/credits/reports/subscription',
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Get Usage Report by Month',
				value: 'getUsageReport',
				action: 'Get credit usage report by month',
				routing: {
					request: {
						method: 'GET',
						url: '/api/metrics/v1/usage/credits/reports/usage',
						qs: {
							startDate: '={{ $parameter.startDate }}',
							endDate: '={{ $parameter.endDate }}',
						},
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
		],
		default: 'getUsageReport',
	},
];

export const creditsFields: INodeProperties[] = [
	{
		displayName: 'This endpoint must be enabled by Domo for your instance. If it has not been enabled, the request will return a 404 Not Found error. Contact Domo Support to request access.',
		name: 'usageReportNotice',
		type: 'notice',
		default: '',
		displayOptions: {
			show: {
				resource: ['credit'],
				operation: ['getUsageReport'],
			},
		},
	},
	{
		displayName: 'This endpoint must be enabled by Domo for your instance. If it has not been enabled, the request will return a 404 Not Found error. Contact Domo Support to request access.',
		name: 'subscriptionNotice',
		type: 'notice',
		default: '',
		displayOptions: {
			show: {
				resource: ['credit'],
				operation: ['getSubscription'],
			},
		},
	},
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
		required: true,
		placeholder: '2024-01-01',
		description: 'Start of the reporting period (YYYY-MM-DD)',
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
		required: true,
		placeholder: '2024-12-31',
		description: 'End of the reporting period (YYYY-MM-DD)',
	},
];
