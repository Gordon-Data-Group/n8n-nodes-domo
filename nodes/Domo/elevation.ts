import { INodeProperties } from 'n8n-workflow';
import { preSendLogger } from './shared/preSendLogger';

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
		options: [
			{
				name: 'Authenticate with OTP',
				value: 'authenticateOtp',
				action: 'Authenticate a user with a time based one time password',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/identity/v1/authentication/elevations/{{ $parameter.userId }}',
						body: {
							timeBasedOneTimePassword: '={{ $parameter.timeBasedOneTimePassword }}',
						},
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Get OTP Elevation Setting',
				value: 'getOtpSetting',
				action: 'Get the OTP elevation setting for the instance',
				routing: {
					request: {
						method: 'GET',
						url: '/api/customer/v1/properties/authentication.otp_elevation',
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Update OTP Elevation Setting',
				value: 'updateOtpSetting',
				action: 'Update the OTP elevation setting for the instance',
				routing: {
					request: {
						method: 'PUT',
						url: '/api/customer/v1/properties/authentication.otp_elevation',
						body: {
							value: '={{ $parameter.enabled }}',
						},
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
		],
		default: 'getOtpSetting',
	},
];

export const elevationFields: INodeProperties[] = [
	// ── Authenticate with OTP ────────────────────────────────────────────────
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['elevation'],
				operation: ['authenticateOtp'],
			},
		},
		default: null,
		required: true,
		description: 'The ID of the user to elevate',
		typeOptions: {
			minValue: 1,
		},
	},
	{
		displayName: 'One-Time Password',
		name: 'timeBasedOneTimePassword',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['elevation'],
				operation: ['authenticateOtp'],
			},
		},
		default: '',
		required: true,
		placeholder: '000000',
		description: 'The 6-digit time-based one-time password (TOTP) for the user',
		typeOptions: {
			password: true,
		},
	},

	// ── Update OTP Elevation Setting ─────────────────────────────────────────
	{
		displayName: 'Enabled',
		name: 'enabled',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['elevation'],
				operation: ['updateOtpSetting'],
			},
		},
		options: [
			{
				name: 'True',
				value: 'true',
			},
			{
				name: 'False',
				value: 'false',
			},
		],
		default: 'true',
		required: true,
		description: 'Whether OTP elevation is enabled for the instance',
	},
];
