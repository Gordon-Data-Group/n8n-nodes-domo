import type { INodeProperties, IHttpRequestOptions, IExecuteSingleFunctions } from 'n8n-workflow';
import { preSendLogger } from './shared/preSendLogger';

// Parses a comma-separated string of IDs into a number[].
function parseIdList(raw: string): number[] {
	return raw
		.split(',')
		.map((s) => s.trim())
		.filter((s) => s.length > 0)
		.map(Number)
		.filter((n) => !isNaN(n));
}

// Builds the share/unshare request body from discrete parameters.
async function preSendShareJob(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const ownerUserId = this.getNodeParameter('ownerUserId') as number;
	const grantUserIds = this.getNodeParameter('grantUserIds') as string;
	const revokeUserIds = this.getNodeParameter('revokeUserIds') as string;
	const grantGroupIds = this.getNodeParameter('grantGroupIds') as string;
	const revokeGroupIds = this.getNodeParameter('revokeGroupIds') as string;

	requestOptions.body = {
		ownerUserId: ownerUserId || null,
		grantUserIds: parseIdList(grantUserIds),
		revokeUserIds: parseIdList(revokeUserIds),
		grantGroupIds: parseIdList(grantGroupIds),
		revokeGroupIds: parseIdList(revokeGroupIds),
	};
	return requestOptions;
}

// Parses the JSON textarea for Update Job into the request body.
async function preSendUpdateJob(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const jobData = this.getNodeParameter('jobData') as string;
	requestOptions.body = typeof jobData === 'string' ? JSON.parse(jobData) : jobData;
	return requestOptions;
}

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
		default: 'listApplications',
		options: [
			{
				name: 'Create Trigger',
				value: 'createTrigger',
				action: 'Create a job trigger',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/executor/v1/applications/{{ $parameter.applicationId }}/jobs/{{ $parameter.jobId }}/triggers',
						body: {
							eventEntity: '={{ $parameter.eventEntity }}',
							eventType: '={{ $parameter.eventType }}',
						},
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Delete Job',
				value: 'deleteJob',
				action: 'Delete a job',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/executor/v1/applications/{{ $parameter.applicationId }}/jobs/{{ $parameter.jobId }}',
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Get Job',
				value: 'getJob',
				action: 'Get a job by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/executor/v1/applications/{{ $parameter.applicationId }}/jobs/{{ $parameter.jobId }}',
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Get Jobs',
				value: 'getJobs',
				action: 'List jobs for an application',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/executor/v2/applications/{{ $parameter.applicationId }}/jobs',
						qs: {
							limit: '={{ $parameter.limit }}',
							offset: '={{ $parameter.offset }}',
						},
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'List Applications',
				value: 'listApplications',
				action: 'List all Toolkit applications',
				routing: {
					request: {
						method: 'GET',
						url: '/api/executor/v1/applications',
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Run Job',
				value: 'runJob',
				action: 'Trigger a job execution',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/executor/v1/applications/{{ $parameter.applicationId }}/jobs/{{ $parameter.jobId }}/executions',
						body: {},
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Share / Unshare Job',
				value: 'shareJob',
				action: 'Share or unshare a job with users or groups',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/executor/v1/applications/{{ $parameter.applicationId }}/jobs/{{ $parameter.jobId }}/share',
					},
					send: {
						preSend: [preSendShareJob, preSendLogger],
					},
				},
			},
			{
				name: 'Update Job',
				value: 'updateJob',
				action: 'Update a job',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/executor/v1/applications/{{ $parameter.applicationId }}/jobs/{{ $parameter.jobId }}',
					},
					send: {
						preSend: [preSendUpdateJob, preSendLogger],
					},
				},
			},
		],
	},
];

export const toolkitFields: INodeProperties[] = [
	// ── Shared: Application ID ────────────────────────────────────────────────
	{
		displayName: 'Application ID',
		name: 'applicationId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['toolkit'],
				operation: [
					'getJobs',
					'getJob',
					'runJob',
					'shareJob',
					'createTrigger',
					'updateJob',
					'deleteJob',
				],
			},
		},
		default: '',
		required: true,
		description: 'The UUID of the Toolkit application',
	},

	// ── Shared: Job ID ────────────────────────────────────────────────────────
	{
		displayName: 'Job ID',
		name: 'jobId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['toolkit'],
				operation: ['getJob', 'runJob', 'shareJob', 'createTrigger', 'updateJob', 'deleteJob'],
			},
		},
		default: '',
		required: true,
		description: 'The UUID of the job',
	},

	// ── Get Jobs: pagination ──────────────────────────────────────────────────
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['toolkit'],
				operation: ['getJobs'],
			},
		},
		default: 100,
		description: 'Maximum number of jobs to return',
	},
	{
		displayName: 'Offset',
		name: 'offset',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['toolkit'],
				operation: ['getJobs'],
			},
		},
		default: 0,
		description: 'Number of jobs to skip before returning results',
	},

	// ── Create Trigger fields ─────────────────────────────────────────────────
	{
		displayName: 'Event Entity (Dataset UUID)',
		name: 'eventEntity',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['toolkit'],
				operation: ['createTrigger'],
			},
		},
		default: '',
		required: true,
		placeholder: '00000000-0000-0000-0000-000000000000',
		description: 'The UUID of the dataset that triggers the job',
	},
	{
		displayName: 'Event Type',
		name: 'eventType',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['toolkit'],
				operation: ['createTrigger'],
			},
		},
		default: 'datasetUpdated',
		required: true,
		description: 'The event type that fires the trigger (e.g. datasetUpdated)',
	},

	// ── Share / Unshare Job fields ────────────────────────────────────────────
	{
		displayName: 'Owner User ID',
		name: 'ownerUserId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['toolkit'],
				operation: ['shareJob'],
			},
		},
		default: 0,
		description: 'User ID to set as the new job owner (0 to leave unchanged)',
	},
	{
		displayName: 'Grant User IDs',
		name: 'grantUserIds',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['toolkit'],
				operation: ['shareJob'],
			},
		},
		default: '',
		placeholder: '123, 456, 789',
		description: 'Comma-separated list of user IDs to grant access to the job',
	},
	{
		displayName: 'Revoke User IDs',
		name: 'revokeUserIds',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['toolkit'],
				operation: ['shareJob'],
			},
		},
		default: '',
		placeholder: '123, 456',
		description: 'Comma-separated list of user IDs to revoke access from the job',
	},
	{
		displayName: 'Grant Group IDs',
		name: 'grantGroupIds',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['toolkit'],
				operation: ['shareJob'],
			},
		},
		default: '',
		placeholder: '123, 456',
		description: 'Comma-separated list of group IDs to grant access to the job',
	},
	{
		displayName: 'Revoke Group IDs',
		name: 'revokeGroupIds',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['toolkit'],
				operation: ['shareJob'],
			},
		},
		default: '',
		placeholder: '123, 456',
		description: 'Comma-separated list of group IDs to revoke access from the job',
	},

	// ── Update Job fields ─────────────────────────────────────────────────────
	{
		displayName: 'Job Data',
		name: 'jobData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['toolkit'],
				operation: ['updateJob'],
			},
		},
		default: '',
		required: true,
		description:
			'Full job object as JSON (jobId, applicationId, jobName, jobDescription, executionTimeout, jobStatus, executionPayload, accounts, etc.)',
	},
];
