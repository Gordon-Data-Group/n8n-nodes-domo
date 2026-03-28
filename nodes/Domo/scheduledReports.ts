import type { INodeProperties, IHttpRequestOptions, IExecuteSingleFunctions } from 'n8n-workflow';
import { preSendLogger } from './shared/preSendLogger';

// ── preSend hooks ────────────────────────────────────────────────────────────

async function preSendCreateScheduledReport(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const subject = this.getNodeParameter('subject') as string;
	const viewId = this.getNodeParameter('viewId') as number;
	const attachmentInclude = this.getNodeParameter('attachmentInclude') as boolean;
	const frequency = this.getNodeParameter('frequency') as string;
	const enabled = this.getNodeParameter('scheduleEnabled') as boolean;
	const daysToRun = this.getNodeParameter('daysToRun') as string;
	const hourOfDay = this.getNodeParameter('hourOfDay') as string;
	const minOfHour = this.getNodeParameter('minOfHour') as string;
	const startDate = this.getNodeParameter('startDate') as number;
	const expirationDate = this.getNodeParameter('expirationDate') as number;
	const recipientsRaw = this.getNodeParameter('additionalRecipients') as string;

	const additionalRecipients =
		recipientsRaw && recipientsRaw.trim() !== '' && recipientsRaw.trim() !== '[]'
			? typeof recipientsRaw === 'string'
				? JSON.parse(recipientsRaw)
				: recipientsRaw
			: [];

	requestOptions.body = {
		subject,
		viewId,
		attachmentInclude,
		schedule: {
			frequency,
			enabled,
			daysToRun,
			hourOfDay,
			minOfHour,
			startDate: startDate || undefined,
			expirationDate: expirationDate || undefined,
			additionalRecipients,
		},
	};
	return requestOptions;
}

async function preSendUpdateScheduledReport(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const reportData = this.getNodeParameter('reportData') as string;
	requestOptions.body = typeof reportData === 'string' ? JSON.parse(reportData) : reportData;
	return requestOptions;
}

async function preSendEnableDisable(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const enabled = this.getNodeParameter('enabled') as boolean;
	// Send the raw JSON primitive (true/false) as a pre-serialized string.
	// Assigning a JS boolean directly can be dropped by n8n when false;
	// JSON.stringify produces the string 'true' or 'false', which axios
	// forwards as-is so the server receives valid JSON boolean.
	requestOptions.body = JSON.stringify(enabled);
	if (!requestOptions.headers) requestOptions.headers = {};
	(requestOptions.headers as Record<string, string>)['Content-Type'] = 'application/json';
	return requestOptions;
}

async function preSendSendNow(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const raw = this.getNodeParameter(
		'recipients',
	) as { recipient?: Array<{ type: string; value: string }> };
	requestOptions.body = (raw?.recipient ?? []).map((r) => ({ type: r.type, value: r.value }));
	return requestOptions;
}

async function preSendSearchHistory(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const scheduleId = this.getNodeParameter('scheduleIdFilter') as string;
	const status = this.getNodeParameter('statusFilter') as string;
	const includeScheduleIdClause = this.getNodeParameter('includeScheduleIdClause') as boolean;
	const includeStatusClause = this.getNodeParameter('includeStatusClause') as boolean;
	const isAutomated = this.getNodeParameter('isAutomated') as boolean;

	requestOptions.body = {
		includeTypeClause: false,
		isAutomated,
		includeTitleClause: false,
		includeStatusClause,
		includeScheduleIdClause,
		scheduleId: scheduleId || undefined,
		status: status || undefined,
	};
	return requestOptions;
}

async function preSendViewBody(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const viewData = this.getNodeParameter('viewData') as string;
	requestOptions.body = typeof viewData === 'string' ? JSON.parse(viewData) : viewData;
	return requestOptions;
}

// ── Operations ───────────────────────────────────────────────────────────────

export const scheduledReportsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['scheduledReports'],
			},
		},
		default: 'listScheduledReports',
		options: [
			{
				name: 'Create Scheduled Report',
				value: 'createScheduledReport',
				action: 'Create a scheduled report',
				routing: {
					request: {
						method: 'POST',
						url: '/api/content/v1/reportschedules',
					},
					send: {
						preSend: [preSendCreateScheduledReport, preSendLogger],
					},
				},
			},
			{
				name: 'Create View',
				value: 'createView',
				action: 'Create a view',
				routing: {
					request: {
						method: 'POST',
						url: '/api/content/v2/views',
					},
					send: {
						preSend: [preSendViewBody, preSendLogger],
					},
				},
			},
			{
				name: 'Delete Scheduled Report',
				value: 'deleteScheduledReport',
				action: 'Delete a scheduled report',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/content/v1/reportschedules/{{ $parameter.scheduleId }}',
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Enable / Disable Scheduled Report',
				value: 'enableScheduledReport',
				action: 'Enable or disable a scheduled report',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/content/v1/reportschedules/{{ $parameter.scheduleId }}/enabled',
					},
					send: {
						preSend: [preSendEnableDisable, preSendLogger],
					},
				},
			},
			{
				name: 'Get Scheduled Report',
				value: 'getScheduledReport',
				action: 'Get a scheduled report by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/content/v1/reportschedules/{{ $parameter.scheduleId }}',
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Get Scheduled Report History',
				value: 'getScheduledReportHistory',
				action: 'Get send history for a scheduled report',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/content/v1/reportschedules/{{ $parameter.scheduleId }}/history',
						qs: {
							limit: '={{ $parameter.limit }}',
							skip: '={{ $parameter.skip }}',
						},
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Get Scheduled Reports for Resource',
				value: 'getScheduledReportsForResource',
				action: 'Get scheduled reports attached to a resource',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/content/v1/reportschedules/resources/{{ $parameter.resourceType }}/{{ $parameter.resourceId }}',
						qs: {
							limit: '={{ $parameter.limit }}',
							skip: '={{ $parameter.skip }}',
							showAll: '={{ $parameter.showAll }}',
						},
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Get View',
				value: 'getView',
				action: 'Get a view by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/content/v2/views/{{ $parameter.viewId }}',
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'List Scheduled Report Resources',
				value: 'listScheduledReportResources',
				action: 'List resources that can have scheduled reports',
				routing: {
					request: {
						method: 'GET',
						url: '/api/content/v1/reportschedules/resources',
						qs: {
							limit: '={{ $parameter.limit }}',
							skip: '={{ $parameter.skip }}',
						},
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'List Scheduled Reports',
				value: 'listScheduledReports',
				action: 'List scheduled reports',
				routing: {
					request: {
						method: 'GET',
						url: '/api/content/v1/reportschedules',
						qs: {
							filter: '={{ $parameter.filter || undefined }}',
							isAscending: '={{ $parameter.isAscending }}',
							orderBy: '={{ $parameter.orderBy || undefined }}',
						},
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Resubscribe',
				value: 'resubscribe',
				action: 'Resubscribe the authenticated user to a scheduled report',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/content/v1/reportschedules/{{ $parameter.scheduleId }}/unsubscribe/recipient',
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Search Scheduled Report History',
				value: 'searchScheduledReportHistory',
				action: 'Search across all scheduled report history',
				routing: {
					request: {
						method: 'POST',
						url: '/api/content/v1/reportschedules/history/search',
						qs: {
							limit: '={{ $parameter.limit }}',
							skip: '={{ $parameter.skip }}',
						},
					},
					send: {
						preSend: [preSendSearchHistory, preSendLogger],
					},
				},
			},
			{
				name: 'Send Scheduled Report',
				value: 'sendScheduledReport',
				action: 'Send a scheduled report immediately',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/content/v1/reportschedules/{{ $parameter.scheduleId }}/sendnow',
					},
					send: {
						preSend: [preSendSendNow, preSendLogger],
					},
				},
			},
			{
				name: 'Unsubscribe',
				value: 'unsubscribe',
				action: 'Unsubscribe the authenticated user from a scheduled report',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/content/v1/reportschedules/{{ $parameter.scheduleId }}/unsubscribe',
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Update Scheduled Report',
				value: 'updateScheduledReport',
				action: 'Update a scheduled report',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/content/v1/reportschedules/{{ $parameter.scheduleId }}',
					},
					send: {
						preSend: [preSendUpdateScheduledReport, preSendLogger],
					},
				},
			},
			{
				name: 'Update View',
				value: 'updateView',
				action: 'Update a view',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/content/v2/views/{{ $parameter.viewId }}',
					},
					send: {
						preSend: [preSendViewBody, preSendLogger],
					},
				},
			},
		],
	},
];

// ── Fields ───────────────────────────────────────────────────────────────────

export const scheduledReportsFields: INodeProperties[] = [
	// ── Shared: Schedule ID ───────────────────────────────────────────────────
	{
		displayName: 'Schedule ID',
		name: 'scheduleId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['scheduledReports'],
				operation: [
					'getScheduledReport',
					'getScheduledReportHistory',
					'sendScheduledReport',
					'updateScheduledReport',
					'enableScheduledReport',
					'deleteScheduledReport',
					'unsubscribe',
					'resubscribe',
				],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the scheduled report',
	},

	// ── Shared: View ID (getView, updateView) ─────────────────────────────────
	{
		displayName: 'View ID',
		name: 'viewId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['scheduledReports'],
				operation: ['getView', 'updateView'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the view',
	},

	// ── Shared: limit + skip (list/get history, list resources, search history) ──
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['scheduledReports'],
				operation: [
					'listScheduledReportResources',
					'getScheduledReportHistory',
					'getScheduledReportsForResource',
					'searchScheduledReportHistory',
				],
			},
		},
		default: 100,
		description: 'Maximum number of results to return',
	},
	{
		displayName: 'Skip',
		name: 'skip',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['scheduledReports'],
				operation: [
					'listScheduledReportResources',
					'getScheduledReportHistory',
					'getScheduledReportsForResource',
					'searchScheduledReportHistory',
				],
			},
		},
		default: 0,
		description: 'Number of results to skip before returning',
	},

	// ── List Scheduled Reports fields ─────────────────────────────────────────
	{
		displayName: 'Filter',
		name: 'filter',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['scheduledReports'],
				operation: ['listScheduledReports'],
			},
		},
		default: '',
		description: 'Text filter to apply to results',
	},
	{
		displayName: 'Order By',
		name: 'orderBy',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['scheduledReports'],
				operation: ['listScheduledReports'],
			},
		},
		default: '',
		description: 'Field to sort results by',
	},
	{
		displayName: 'Ascending',
		name: 'isAscending',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['scheduledReports'],
				operation: ['listScheduledReports'],
			},
		},
		default: true,
		description: 'Whether to sort results in ascending order',
	},

	// ── Get Scheduled Reports for Resource ────────────────────────────────────
	{
		displayName: 'Resource Type',
		name: 'resourceType',
		type: 'options',
		options: [
			{ name: 'Card', value: 'CARD' },
			{ name: 'Page', value: 'PAGE' },
		],
		displayOptions: {
			show: {
				resource: ['scheduledReports'],
				operation: ['getScheduledReportsForResource'],
			},
		},
		default: 'CARD',
		required: true,
		description: 'The type of resource to look up scheduled reports for',
	},
	{
		displayName: 'Resource ID',
		name: 'resourceId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['scheduledReports'],
				operation: ['getScheduledReportsForResource'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the resource',
	},
	{
		displayName: 'Show All',
		name: 'showAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['scheduledReports'],
				operation: ['getScheduledReportsForResource'],
			},
		},
		default: false,
		description: 'Whether to return all scheduled reports regardless of ownership',
	},

	// ── Search Scheduled Report History fields ────────────────────────────────
	{
		displayName: 'Schedule ID Filter',
		name: 'scheduleIdFilter',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['scheduledReports'],
				operation: ['searchScheduledReportHistory'],
			},
		},
		default: '',
		description: 'Filter by schedule ID',
	},
	{
		displayName: 'Include Schedule ID Clause',
		name: 'includeScheduleIdClause',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['scheduledReports'],
				operation: ['searchScheduledReportHistory'],
			},
		},
		default: true,
		description: 'Whether to apply the schedule ID filter',
	},
	{
		displayName: 'Status Filter',
		name: 'statusFilter',
		type: 'options',
		options: [
			{ name: 'Any', value: '' },
			{ name: 'Success', value: 'success' },
			{ name: 'Failure', value: 'failure' },
		],
		displayOptions: {
			show: {
				resource: ['scheduledReports'],
				operation: ['searchScheduledReportHistory'],
			},
		},
		default: '',
		description: 'Filter history by send status',
	},
	{
		displayName: 'Include Status Clause',
		name: 'includeStatusClause',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['scheduledReports'],
				operation: ['searchScheduledReportHistory'],
			},
		},
		default: true,
		description: 'Whether to apply the status filter',
	},
	{
		displayName: 'Is Automated',
		name: 'isAutomated',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['scheduledReports'],
				operation: ['searchScheduledReportHistory'],
			},
		},
		default: false,
		description: 'Whether to filter for automated sends only',
	},

	// ── Send Scheduled Report fields ──────────────────────────────────────────
	{
		displayName: 'Recipients',
		name: 'recipients',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['scheduledReports'],
				operation: ['sendScheduledReport'],
			},
		},
		default: {},
		description: 'Recipients to send the report to',
		options: [
			{
				displayName: 'Recipient',
				name: 'recipient',
				values: [
					{
						displayName: 'Type',
						name: 'type',
						type: 'options',
						options: [
							{ name: 'User', value: 'USER' },
							{ name: 'Email', value: 'EMAIL' },
							{ name: 'Group', value: 'GROUP' },
						],
						default: 'USER',
						description: 'The type of recipient',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
						description: 'User ID, group ID, or email address depending on type',
					},
				],
			},
		],
	},

	// ── Enable / Disable fields ───────────────────────────────────────────────
	{
		displayName: 'Enabled',
		name: 'enabled',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['scheduledReports'],
				operation: ['enableScheduledReport'],
			},
		},
		default: true,
		description: 'Whether the scheduled report should be enabled',
	},

	// ── Create Scheduled Report fields ────────────────────────────────────────
	{
		displayName: 'Subject',
		name: 'subject',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['scheduledReports'],
				operation: ['createScheduledReport'],
			},
		},
		default: '',
		required: true,
		description: 'The email subject line for the scheduled report',
	},
	{
		displayName: 'View ID',
		name: 'viewId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['scheduledReports'],
				operation: ['createScheduledReport'],
			},
		},
		default: 0,
		required: true,
		description: 'The ID of the view to include in the report',
	},
	{
		displayName: 'Include Attachment',
		name: 'attachmentInclude',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['scheduledReports'],
				operation: ['createScheduledReport'],
			},
		},
		default: true,
		description: 'Whether to attach the report as a file',
	},
	{
		displayName: 'Frequency',
		name: 'frequency',
		type: 'options',
		options: [
			{ name: 'Daily', value: 'DAILY' },
			{ name: 'Weekly', value: 'WEEKLY' },
			{ name: 'Monthly', value: 'MONTHLY' },
			{ name: 'Once', value: 'ONCE' },
		],
		displayOptions: {
			show: {
				resource: ['scheduledReports'],
				operation: ['createScheduledReport'],
			},
		},
		default: 'WEEKLY',
		description: 'How often the report should be sent',
	},
	{
		displayName: 'Schedule Enabled',
		name: 'scheduleEnabled',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['scheduledReports'],
				operation: ['createScheduledReport'],
			},
		},
		default: true,
		description: 'Whether the schedule is active',
	},
	{
		displayName: 'Days to Run',
		name: 'daysToRun',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['scheduledReports'],
				operation: ['createScheduledReport'],
			},
		},
		default: '1',
		placeholder: '1',
		description:
			'Day(s) to send the report. For weekly: 1=Sunday … 7=Saturday. For monthly: day of month (1–31).',
	},
	{
		displayName: 'Hour of Day',
		name: 'hourOfDay',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['scheduledReports'],
				operation: ['createScheduledReport'],
			},
		},
		default: '8',
		placeholder: '8',
		description: 'Hour of the day to send (0–23)',
	},
	{
		displayName: 'Minute of Hour',
		name: 'minOfHour',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['scheduledReports'],
				operation: ['createScheduledReport'],
			},
		},
		default: '0',
		placeholder: '0',
		description: 'Minute of the hour to send (0–59)',
	},
	{
		displayName: 'Start Date (Unix ms)',
		name: 'startDate',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['scheduledReports'],
				operation: ['createScheduledReport'],
			},
		},
		default: 0,
		description: 'Unix timestamp in milliseconds for when the schedule starts (0 to omit)',
	},
	{
		displayName: 'Expiration Date (Unix ms)',
		name: 'expirationDate',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['scheduledReports'],
				operation: ['createScheduledReport'],
			},
		},
		default: 0,
		description: 'Unix timestamp in milliseconds for when the schedule expires (0 to omit)',
	},
	{
		displayName: 'Additional Recipients',
		name: 'additionalRecipients',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['scheduledReports'],
				operation: ['createScheduledReport'],
			},
		},
		default: '[]',
		description:
			'JSON array of recipients. Each entry: { "type": "USER"|"EMAIL", "value": "userId or email", "email": "email@domain.tld" }',
	},

	// ── Update Scheduled Report ───────────────────────────────────────────────
	{
		displayName: 'Report Data',
		name: 'reportData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['scheduledReports'],
				operation: ['updateScheduledReport'],
			},
		},
		default: '',
		required: true,
		description:
			'Full scheduled report object as JSON (id, title, ownerId, subject, viewId, active, attachmentInclude, schedule)',
	},

	// ── Create View / Update View ─────────────────────────────────────────────
	{
		displayName: 'View Data',
		name: 'viewData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['scheduledReports'],
				operation: ['createView', 'updateView'],
			},
		},
		default: '',
		required: true,
		description:
			'Full view object as JSON (name, resourceType, resourceId, type, purpose, filters, chartState, etc.)',
	},
];
