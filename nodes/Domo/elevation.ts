import type { INodeProperties } from 'n8n-workflow';

export const elevationOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['elevation'],
			},
		},
		default: 'get-otp-elevation-setting',
		options: [
		{
			name: 'Get OTP Elevation Setting',
			value: 'get-otp-elevation-setting',
			action: 'Get otp elevation setting',
			routing: {
				request: {
					method: 'GET',
					url: '/customer/v1/properties/authentication.otp_elevation',
				},
			},
		},
		{
			name: 'Authenticate with OTP',
			value: 'authenticate-with-otp',
			action: 'Authenticate with OTP',
			routing: {
				request: {
					method: 'PUT',
					url: '/identity/v1/authentication/elevations/={{$parameter.userId}}',
				},
			},
		},
		{
			name: 'Update OTP Elevation Setting',
			value: 'update-otp-elevation-setting',
			action: 'Update otp elevation setting',
			routing: {
				request: {
					method: 'PUT',
					url: '/customer/v1/properties/authentication.otp_elevation',
				},
			},
		},
		],
	},
];

export const elevationFields: INodeProperties[] = [
		{
			displayName: 'UserId ID',
			name: 'userId',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					resource: ['elevation'],
					operation: ['authenticate-with-otp'],
				},
			},
			default: '',
			description: 'The ID of the userId',
		},
		{
			displayName: 'Data',
			name: 'data',
			type: 'json',
			required: true,
			displayOptions: {
				show: {
					resource: ['elevation'],
					operation: ['authenticate-with-otp'],
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
					resource: ['elevation'],
					operation: ['update-otp-elevation-setting'],
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
