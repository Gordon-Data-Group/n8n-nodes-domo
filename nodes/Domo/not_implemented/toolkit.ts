import type { INodeProperties } from 'n8n-workflow';

export const toolkitOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['toolkit'],
			},
		},
	default: 'list-applications',
	options: [
	{
		name: 'Create Trigger',
		value: 'create-trigger',
		action: 'Create trigger',
		routing: {
			request: {
				method: 'POST',
				url: '={{ "/api/executor/v1/applications/" + $parameter.appId + "/jobs/" + $parameter.jobId + "/triggers" }}',
			},
		},
	},
	{
		name: 'Delete Job',
		value: 'delete-job',
		action: 'Delete job',
		routing: {
			request: {
				method: 'DELETE',
				url: '={{ "/api/executor/v1/applications/" + $parameter.appId + "/jobs/" + $parameter.jobId }}',
			},
		},
	},
	{
		name: 'Get Job',
		value: 'get-job',
		action: 'Get job',
		routing: {
			request: {
				method: 'GET',
				url: '={{ "/api/executor/v1/applications/" + $parameter.applicationId + "/jobs/" + $parameter.jobId }}',
			},
		},
	},
	{
		name: 'Get Jobs',
		value: 'get-jobs',
		action: 'Get jobs',
		routing: {
			request: {
				method: 'GET',
				url: '={{ "/api/executor/v2/applications/" + $parameter.applicationId + "/jobs" }}',
			},
		},
	},
	{
		name: 'List Applications',
		value: 'list-applications',
		action: 'List applications',
		routing: {
			request: {
				method: 'GET',
				url: '/api/executor/v1/applications',
			},
		},
	},
	{
		name: 'Run Job',
		value: 'run-job',
		action: 'Run job',
		routing: {
			request: {
				method: 'POST',
				url: '={{ "/api/executor/v1/applications/" + $parameter.applicationId + "/jobs/" + $parameter.jobId + "/executions" }}',
			},
		},
	},
	{
		name: 'Share/Unshare Job',
		value: 'share-unshare-job',
		action: 'Share unshare job',
		routing: {
			request: {
				method: 'PUT',
				url: '={{ "/api/executor/v1/applications/" + $parameter.applicationId + "/jobs/" + $parameter.jobId + "/share" }}',
			},
		},
	},
	{
		name: 'Update Job',
		value: 'update-job',
		action: 'Update job',
		routing: {
			request: {
				method: 'PUT',
				url: '={{ "/api/executor/v1/applications/" + $parameter.appId + "/jobs/" + $parameter.jobId }}',
			},
		},
	},
	],
	},
];

export const toolkitFields: INodeProperties[] = [
	{
		displayName: 'Application ID',
		name: 'applicationId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['toolkit'],
				operation: ['get-jobs', 'get-job', 'run-job', 'share-unshare-job'],
			},
		},
		default: '',
		description: 'The ID of the application',
	},
	{
		displayName: 'App ID',
		name: 'appId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['toolkit'],
				operation: ['create-trigger', 'update-job', 'delete-job'],
			},
		},
		default: '',
		description: 'The ID of the app',
	},
	{
		displayName: 'Job ID',
		name: 'jobId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['toolkit'],
				operation: ['get-job', 'run-job', 'share-unshare-job', 'create-trigger', 'update-job', 'delete-job'],
			},
		},
		default: '',
		description: 'The ID of the job',
	},
	{
		displayName: 'Data',
		name: 'data',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				resource: ['toolkit'],
				operation: ['run-job', 'share-unshare-job', 'create-trigger', 'update-job'],
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
			displayName: 'Limit',
			name: 'limit',
			type: 'number',
			typeOptions: {
				minValue: 1,
			},
			displayOptions: {
				show: {
					resource: ['toolkit'],
					operation: ['get-jobs'],
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
					resource: ['toolkit'],
					operation: ['get-jobs'],
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
