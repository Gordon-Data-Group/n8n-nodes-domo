import { INodeProperties } from 'n8n-workflow';

export const brandKitOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['brandKit'],
			},
		},
		options: [
			{
				name: 'Get Email Template',
				value: 'getEmailTemplate',
				action: 'Get email template',
				routing: {
					request: {
						method: 'GET',
						url: '/api/messaging/v1/email/configurations/template',
					},
				},
			},
			{
				name: 'Get Hot URL',
				value: 'getHotUrl',
				action: 'Get hot url',
				routing: {
					request: {
						method: 'GET',
						url: '/api/messaging/v1/email/configurations/backlink',
					},
				},
			},
			{
				name: 'Get Login Settings',
				value: 'getLoginSettings',
				action: 'Get login settings',
				routing: {
					request: {
						method: 'GET',
						url: '/api/content/v1/login-settings/v1',
					},
				},
			},
			{
				name: 'List Color Palettes',
				value: 'listColorPalettes',
				action: 'List color palettes',
				routing: {
					request: {
						method: 'GET',
						url: '/api/brandkit/v1/chartColorPalettes/all',
					},
				},
			},
			{
				name: 'List Email Configurations',
				value: 'listEmailConfigurations',
				action: 'List email configurations',
				routing: {
					request: {
						method: 'GET',
						url: '/api/messaging/v1/email/configurations',
					},
				},
			},
		],
		default: 'listColorPalettes',
	},
];

export const brandKitFields: INodeProperties[] = [];

