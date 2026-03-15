import type { INodeProperties } from 'n8n-workflow';

export const simpleOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['simple'],
			},
		},
		default: 'create-dataset',
		options: [
		{
			name: 'Create DataSet',
			value: 'create-dataset',
			action: 'Create data set',
			description: 'Creates a new DataSet in your Domo instance. Once the DataSet has been created, data can then be imported into the DataSet.',
			routing: {
				request: {
					method: 'POST',
					url: '/v1/json',
				},
			},
		},
		{
			name: 'Import Data Into DataSet',
			value: 'import-data-into-dataset',
			action: 'Import data into data set',
			description: 'Imports data into an already existing DataSet in your Domo instance',
			routing: {
				request: {
					method: 'PUT',
					url: '/v1/json/={{$parameter["DATASET_ID"]}}/data',
				},
			},
		},
		],
	},
];

export const simpleFields: INodeProperties[] = [
	{
		displayName: 'Data',
		name: 'data',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				resource: ['simple'],
				operation: ['create-dataset'],
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
		displayName: 'DATASET ID',
		name: 'DATASET_ID',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['simple'],
				operation: ['import-data-into-dataset'],
			},
		},
		default: '',
	},
	{
		displayName: 'Data',
		name: 'data',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				resource: ['simple'],
				operation: ['import-data-into-dataset'],
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
];
