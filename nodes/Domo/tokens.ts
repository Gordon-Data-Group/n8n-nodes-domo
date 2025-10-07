import { INodeProperties } from 'n8n-workflow';
// import { IExecuteFunctions } from 'n8n-workflow';
// import { parseResponse } from './utils';

export const tokenOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['token'],
			},
		},
		options: [
			{
				name: 'Create Token',
				value: 'create',
				description: 'Create a new token',
				action: 'Create token',
				routing: {
					request: {
						method: 'POST',
						url: '/api/data/v1/accesstokens',
						body: {
							name: '={{$parameter.tokenName}}',
							ownerId: '={{$parameter.ownerUserId}}',
							expires: '={{$parameter.tokenExpiresAt}}',
						},
					},
				},
			},
			{
				name: 'List Tokens',
				value: 'list',
				description: 'Get a list of tokens',
				action: 'Get token',
				routing: {
					request: {
						method: 'GET',
						url: '/api/data/v1/accesstokens',
					},
				},
			},
			{
				name: 'Revoke Token',
				value: 'revoke',
				description: 'Revoke a token',
				action: 'Revoke token',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/data/v1/accesstokens/{{ $parameter["tokenId"].toString() }}',
					},
				},
			},
		],
		default: 'create',
	},
];

export const tokenFields: INodeProperties[] = [
	{
		displayName: 'Token ID',
		name: 'tokenId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['token'],
				operation: ['revoke', 'get'],
			},
		},
		default: null,
		required: true,
		description: 'The ID of the token',
	},
	{
		displayName: 'Token Name',
		name: 'tokenName',
		type: 'string',
		typeOptions: {
			password: true,
		},
		displayOptions: {
			show: {
				resource: ['token'],
				operation: ['create'],
			},
		},
		default: '',
		required: true,
		description: 'The name of the token',
	},
	{
		displayName: 'Owner User ID',
		name: 'ownerUserId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['token'],
				operation: ['create'],
			},
		},
		default: null,
		required: true,
		description: 'The ID of the user who owns the token',
	},
	{
		displayName: 'Token Expires At',
		name: 'tokenExpiresAt',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['token'],
				operation: ['create'],
			},
		},
		default: null,
		required: true,
		description: 'The expiration date of the token',
	},
];
