import type { INodeProperties } from 'n8n-workflow';

export const datasetOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['dataset'],
			},
		},
	default: 'list-datasets',
	options: [
	{
		name: 'Create a DataSet',
		value: 'create-a-dataset',
		action: 'Create a data set',
		description: 'Creates a new DataSet in your Domo instance. Once a DataSet has been created, data can be imported into the DataSet.',
		routing: {
			request: {
				method: 'POST',
				url: '/v1/datasets',
			},
		},
	},
	{
		name: 'Create a Personalized Data Permission (PDP) Policy',
		value: 'create-a-personalized-data-permission-pdp-policy',
		action: 'Create a personalized data permission pdp policy',
		description: 'Create a PDP policy for user and or group access to data within a DataSet. Users and groups must exist before creating PDP policy. The number of characters for the list of values for a single PDP policy, including a delimiter character for each value, must be less than 255 characters',
		routing: {
			request: {
				method: 'POST',
				url: '/v1/datasets/={{$parameter["dataset_id"]}}/policies',
			},
		},
	},
	{
		name: 'Delete a DataSet',
		value: 'delete-a-dataset',
		action: 'Delete a data set',
		description: 'Permanently deletes a DataSet from your Domo instance. This can be done for all DataSets, not just those created through the API. Warning This is destructive and cannot be reversed',
		routing: {
			request: {
				method: 'DELETE',
				url: '/v1/datasets/={{$parameter["dataset_id"]}}',
			},
		},
	},
	{
		name: 'Delete a Personlized Data Permission (PDP) Policy',
		value: 'delete-a-personlized-data-permission-pdp-policy',
		action: 'Delete a personlized data permission pdp policy',
		description: 'Permanently deletes a PDP policy on a DataSet in your Domo instance. Warning This is destructive and cannot be reversed.',
		routing: {
			request: {
				method: 'DELETE',
				url: '/v1/datasets/={{$parameter["dataset_id"]}}/policies/={{$parameter["pdp_id"]}}',
			},
		},
	},
	{
		name: 'Export Data From DataSet',
		value: 'export-data-from-dataset',
		action: 'Export data from data set',
		description: 'Export data from a DataSet in your Domo instance. Data types will be exported as they are currently stored in the dataset. In addition, the only supported export type is CSV',
		routing: {
			request: {
				method: 'GET',
				url: '/v1/datasets/={{$parameter["dataset_id"]}}/data',
			},
		},
	},
	{
		name: 'Import Data Into DataSet',
		value: 'import-data-into-dataset',
		action: 'Import data into data set',
		description: 'Import data into a DataSet in your Domo instance. You can replace everything or append new data.',
		routing: {
			request: {
				method: 'PUT',
				url: '/v1/datasets/={{$parameter["dataset_id"]}}/data',
			},
		},
	},
	{
		name: 'List DataSets',
		value: 'list-datasets',
		action: 'List data sets',
		description: 'Get a list of all DataSets in your Domo instance',
		routing: {
			request: {
				method: 'GET',
				url: '/v1/datasets',
			},
		},
	},
	{
		name: 'List Personalized Data Permission (PDP) Policies',
		value: 'list-personalized-data-permission-pdp-policies',
		action: 'List personalized data permission pdp policies',
		description: 'List the Personalized Data Permission (PDP) policies for a specified DataSet',
		routing: {
			request: {
				method: 'GET',
				url: '/v1/datasets/={{$parameter["dataset_id"]}}/policies',
			},
		},
	},
	{
		name: 'Query a DataSet',
		value: 'query-a-dataset',
		action: 'Query a data set',
		description: 'Queries the data in an existing Domo DataSet',
		routing: {
			request: {
				method: 'POST',
				url: '/v1/datasets/query/execute/={{$parameter["dataset_id"]}}',
			},
		},
	},
	{
		name: 'Retrieve a Personalized Data Permission (PDP) Policy',
		value: 'retrieve-a-personalized-data-permission-pdp-policy',
		action: 'Retrieve a personalized data permission pdp policy',
		description: 'Retrieve a policy from a DataSet within Domo. A DataSet is required for a PDP policy to exist.',
		routing: {
			request: {
				method: 'GET',
				url: '/v1/datasets/={{$parameter["dataset_id"]}}/policies/={{$parameter["pdp_id"]}}',
			},
		},
	},
	{
		name: 'Retrieve DataSet Details',
		value: 'retrieve-dataset-details',
		action: 'Retrieve data set details',
		description: 'Retrieves the details of an existing DataSet',
		routing: {
			request: {
				method: 'GET',
				url: '/v1/datasets/={{$parameter["dataset_id"]}}',
			},
		},
	},
	{
		name: 'Update a Personalized Data Permission (PDP) Policy',
		value: 'update-a-personalized-data-permission-pdp-policy',
		action: 'Update a personalized data permission pdp policy',
		description: 'Update the specific PDP policy for a DataSet by providing values to parameters passed. The number of characters for the list of values for a single PDP policy, including a delimiter character for each value, must be less than 255 characters.',
		routing: {
			request: {
				method: 'PUT',
				url: '/v1/datasets/={{$parameter["dataset_id"]}}/policies/={{$parameter["pdp_id"]}}',
			},
		},
	},
	{
		name: 'Update DataSet Details',
		value: 'update-dataset-details',
		action: 'Update data set details',
		description: 'Updates the specified DataSet metadata by providing values to parameters passed. To import additional rows into an existing DataSet, use the DataSet Import endpoint or the Simple API.',
		routing: {
			request: {
				method: 'PUT',
				url: '/v1/datasets/={{$parameter["dataset_id"]}}',
			},
		},
	},
	],
	},
];

export const datasetFields: INodeProperties[] = [
	{
		displayName: 'Dataset ID',
		name: 'dataset_id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['retrieve-dataset-details', 'update-dataset-details', 'delete-a-dataset', 'query-a-dataset', 'import-data-into-dataset', 'export-data-from-dataset', 'retrieve-a-personalized-data-permission-pdp-policy', 'update-a-personalized-data-permission-pdp-policy', 'delete-a-personlized-data-permission-pdp-policy', 'create-a-personalized-data-permission-pdp-policy', 'list-personalized-data-permission-pdp-policies'],
			},
		},
		default: '',
		description: 'The ID of the dataset',
	},
	{
		displayName: 'PDP Policy ID',
		name: 'pdp_id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['retrieve-a-personalized-data-permission-pdp-policy', 'update-a-personalized-data-permission-pdp-policy', 'delete-a-personlized-data-permission-pdp-policy'],
			},
		},
		default: '',
		description: 'The ID of the PDP policy',
	},
	{
		displayName: 'Data',
		name: 'data',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['create-a-dataset', 'update-dataset-details', 'query-a-dataset', 'import-data-into-dataset', 'update-a-personalized-data-permission-pdp-policy', 'create-a-personalized-data-permission-pdp-policy'],
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
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['list-datasets'],
			},
		},
		default: 50,
		description: 'Max number of results to return',
		routing: {
			request: {
				qs: {
					limit: '={{$parameter.limit}}',
				},
			},
		},
	},
	{
		displayName: 'Offset',
		name: 'offset',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['list-datasets'],
			},
		},
		default: 0,
		description: 'The number of results to skip',
		routing: {
			request: {
				qs: {
					offset: '={{$parameter.offset}}',
				},
			},
		},
	},
];
