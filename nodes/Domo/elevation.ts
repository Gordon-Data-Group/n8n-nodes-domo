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
		default: 'getOtpElevationSetting',
		options: [
			{
				name: 'Authenticate with OTP',
				value: 'authenticateWithOtp',
				action: 'Authenticate with OTP',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/identity/v1/authentication/elevations/" + $parameter.userId }}',
						body: '={{JSON.parse($parameter.otpData)}}',
					},
				},
			},
			{
				name: 'Get OTP Elevation Setting',
				value: 'getOtpElevationSetting',
				action: 'Get otp elevation setting',
				routing: {
					request: {
						method: 'GET',
						url: '/api/customer/v1/properties/authentication.otp_elevation',
					},
				},
			},
			{
				name: 'Update OTP Elevation Setting',
				value: 'updateOtpElevationSetting',
				action: 'Update otp elevation setting',
				routing: {
					request: {
						method: 'PUT',
						url: '/api/customer/v1/properties/authentication.otp_elevation',
						body: '={{JSON.parse($parameter.settingData)}}',
					},
				},
			},
		],
	},
];

export const elevationFields: INodeProperties[] = [
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['elevation'],
				operation: ['authenticateWithOtp'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the user',
	},
	{
		displayName: 'OTP Data',
		name: 'otpData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['elevation'],
				operation: ['authenticateWithOtp'],
			},
		},
		default: '',
		placeholder: '{"timeBasedOneTimePassword":"000000"}',
		required: true,
		description: 'JSON object containing OTP authentication data',
	},
	{
		displayName: 'Setting Data',
		name: 'settingData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['elevation'],
				operation: ['updateOtpElevationSetting'],
			},
		},
		default: '',
		placeholder: '{"value":"false"}',
		required: true,
		description: 'JSON object containing OTP elevation setting',
	},
];
