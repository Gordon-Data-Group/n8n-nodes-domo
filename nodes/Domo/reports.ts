import type { INodeProperties } from 'n8n-workflow';

export const reportsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['reports'],
			},
		},
	default: 'list-reports',
	options: [
	{
		name: 'Create Reports',
		value: 'create-reports',
		action: 'Create reports',
		routing: {
			request: {
				method: 'POST',
				url: '/content/v1/reports',
			},
		},
	},
	{
		name: 'Delete Reports',
		value: 'delete-reports',
		action: 'Delete reports',
		routing: {
			request: {
				method: 'DELETE',
				url: '/content/v1/reports/={{$parameter.id}}',
			},
		},
	},
	{
		name: 'List Reports',
		value: 'list-reports',
		action: 'List reports',
		routing: {
			request: {
				method: 'GET',
				url: '/content/v1/reports',
			},
		},
	},
	{
		name: 'Update Reports',
		value: 'update-reports',
		action: 'Update reports',
		routing: {
			request: {
				method: 'PUT',
				url: '/content/v1/reports/={{$parameter.id}}',
			},
		},
	},
	],
	},
];

export const reportsFields: INodeProperties[] = [
	{
		displayName: 'Report ID',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['reports'],
				operation: ['update-reports', 'delete-reports'],
			},
		},
		default: '',
		description: 'The ID of the report',
	},
	{
		displayName: 'Data',
		name: 'data',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				resource: ['reports'],
				operation: ['create-reports', 'update-reports'],
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
