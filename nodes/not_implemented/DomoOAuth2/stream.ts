import type { INodeProperties } from 'n8n-workflow';

export const streamOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['stream'],
			},
		},
	default: 'list-streams',
	options: [
	{
		name: 'Abort a Stream Execution',
		value: 'abort-a-stream-execution',
		action: 'Abort a stream execution',
		description: 'If needed during an execution, aborts an entire Stream execution. Best Practice To abort the current stream execution within a Stream, simply identify the Stream ID within request.',
		routing: {
			request: {
				method: 'PUT',
				url: '/v1/streams/={{$parameter["STREAM_ID"]}}/executions/={{$parameter["EXECUTION_ID"]}}/abort',
			},
		},
	},
	{
		name: 'Commit a Stream Execution',
		value: 'commit-a-stream-execution',
		action: 'Commit a stream execution',
		description: 'Commits stream execution to import combined set of data parts that have been successfully uploaded. Known Limitation By default, the Stream API only supports the ability to execute a commit every 15 minutes. For valid use cases, contact Domo Support if you would like to execute commits more frequently than 15 minutes',
		routing: {
			request: {
				method: 'PUT',
				url: '/v1/streams/={{$parameter["STREAM_ID"]}}/executions/={{$parameter["EXECUTION_ID"]}}/commit',
			},
		},
	},
	{
		name: 'Create a Stream',
		value: 'create-a-stream',
		action: 'Create a stream',
		description: 'When creating a Stream, specify the DataSet properties (name and description) and as a convenience, the create Stream API will create a DataSet for you. Streams support both append and replace import methods, as well as Upsert.',
		routing: {
			request: {
				method: 'POST',
				url: '/v1/streams',
			},
		},
	},
	{
		name: 'Create a Stream Execution',
		value: 'create-a-stream-execution',
		action: 'Create a stream execution',
		description: 'When you are ready to upload data to your DataSet via a Stream, you first tell Domo that you are ready to start sending data by creating an Execution',
		routing: {
			request: {
				method: 'POST',
				url: '/v1/streams/={{$parameter["STREAM_ID"]}}/executions',
			},
		},
	},
	{
		name: 'Delete a Stream',
		value: 'delete-a-stream',
		action: 'Delete a stream',
		description: 'Deletes a Stream from your Domo instance. This does not delete the associated DataSet. Warning This is destructive and cannot be reversed',
		routing: {
			request: {
				method: 'DELETE',
				url: '/v1/streams/={{$parameter["STREAM_ID"]}}',
			},
		},
	},
	{
		name: 'List Stream Executions',
		value: 'list-stream-executions',
		action: 'List stream executions',
		description: 'Returns all Stream Execution objects that meet argument criteria from original request',
		routing: {
			request: {
				method: 'GET',
				url: '/v1/streams/={{$parameter["STREAM_ID"]}}/executions',
			},
		},
	},
	{
		name: 'List Streams',
		value: 'list-streams',
		action: 'List streams',
		description: 'Get a list of all Streams for which the user has view permissions',
		routing: {
			request: {
				method: 'GET',
				url: '/v1/streams',
			},
		},
	},
	{
		name: 'Retrieve a Stream',
		value: 'retrieve-a-stream',
		action: 'Retrieve a stream',
		description: 'Retrieves the details of an existing stream',
		routing: {
			request: {
				method: 'GET',
				url: '/v1/streams/={{$parameter["STREAM_ID"]}}',
			},
		},
	},
	{
		name: 'Retrieve a Stream Execution',
		value: 'retrieve-a-stream-execution',
		action: 'Retrieve a stream execution',
		description: 'Import data into a DataSet in your Domo instance. This request will replace the data currently in the DataSet. Known Limitation The only supported content type is currently CSV format.',
		routing: {
			request: {
				method: 'GET',
				url: '/v1/streams/={{$parameter["STREAM_ID"]}}/executions/={{$parameter["EXECUTION_ID"]}}',
			},
		},
	},
	{
		name: 'Search Streams',
		value: 'search-streams',
		action: 'Search streams',
		description: 'Returns all Stream objects that meet argument criteria from original request',
		routing: {
			request: {
				method: 'GET',
				url: '/v1/streams/search',
			},
		},
	},
	{
		name: 'Update a Stream',
		value: 'update-a-stream',
		action: 'Update a stream',
		description: 'Updates the specified Stream metadata by providing values to parameters passed',
		routing: {
			request: {
				method: 'PATCH',
				url: '/v1/streams/={{$parameter["STREAM_ID"]}}',
			},
		},
	},
	{
		name: 'Upload a Data Part',
		value: 'upload-a-data-part',
		action: 'Upload a data part',
		description: 'Creates a data part within the Stream execution to upload chunks of rows to the DataSet. The calling client should keep track of parts and order them accordingly in an increasing sequence.',
		routing: {
			request: {
				method: 'PUT',
				url: '/v1/streams/={{$parameter["STREAM_ID"]}}/executions/={{$parameter["EXECUTION_ID"]}}/part/={{$parameter["PART_ID"]}}',
			},
		},
	},
	],
	},
];

export const streamFields: INodeProperties[] = [
	{
		displayName: 'Stream ID',
		name: 'STREAM_ID',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['stream'],
				operation: ['retrieve-a-stream', 'update-a-stream', 'delete-a-stream', 'retrieve-a-stream-execution', 'create-a-stream-execution', 'list-stream-executions', 'upload-a-data-part', 'commit-a-stream-execution', 'abort-a-stream-execution'],
			},
		},
		default: '',
		description: 'The ID of the stream',
	},
	{
		displayName: 'Execution ID',
		name: 'EXECUTION_ID',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['stream'],
				operation: ['retrieve-a-stream-execution', 'upload-a-data-part', 'commit-a-stream-execution', 'abort-a-stream-execution'],
			},
		},
		default: '',
		description: 'The ID of the execution',
	},
	{
		displayName: 'Part ID',
		name: 'PART_ID',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['stream'],
				operation: ['upload-a-data-part'],
			},
		},
		default: '',
		description: 'The ID of the part',
	},
	{
		displayName: 'Data',
		name: 'data',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				resource: ['stream'],
				operation: ['create-a-stream', 'update-a-stream'],
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
				resource: ['stream'],
				operation: ['list-streams', 'list-stream-executions'],
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
				resource: ['stream'],
				operation: ['list-streams', 'list-stream-executions'],
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
