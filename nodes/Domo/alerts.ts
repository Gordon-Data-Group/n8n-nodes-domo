import { IExecuteSingleFunctions, IHttpRequestOptions, INodeProperties } from 'n8n-workflow';
import { preSendLogger } from './shared/preSendLogger';

export const alertOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['alert'],
			},
		},
		options: [
			{
				name: 'Create Alert',
				value: 'createAlert',
				description: 'Create a new alert',
				action: 'Create alert',
				routing: {
					request: {
						method: 'POST',
						url: '/api/social/v4/alerts',
						body: '={{JSON.parse($parameter.alertData)}}',
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Delete Alert',
				value: 'deleteAlert',
				description: 'Delete an alert',
				action: 'Delete alert',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/social/v4/alerts/" + $parameter.alertId }}',
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Get Alert',
				value: 'getAlert',
				description: 'Get a specific alert by ID',
				action: 'Get alert',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/social/v4/alerts/" + $parameter.alertId }}',
					},
				},
			},
			{
				name: 'Get Alert Action',
				value: 'getAlertAction',
				description: 'Get a specific alert action',
				action: 'Get alert action',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/social/v4/alerts/" + $parameter.alertId + "/actions/" + $parameter.actionId }}',
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Get Alerts',
				value: 'getAlerts',
				description: 'Get multiple alerts by IDs',
				action: 'Get alerts',
				routing: {
					request: {
						method: 'POST',
						url: '/api/social/v4/alerts/ids',
						body: '={{JSON.parse($parameter.alertIds)}}',
						qs: {
							subscriberId: '={{$parameter.subscriberId}}',
							all: true,
							limit: '={{$parameter.limit}}',
							offset: '={{$parameter.offset}}',
						},
					},
					operations: {
						pagination: {
							type: 'offset',
							properties: {
								limitParameter: 'limit',
								offsetParameter: 'offset',
								pageSize: 50,
								type: 'query',
							},
						},
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Get Evaluations for Alert',
				value: 'getEvaluations',
				description: 'Get evaluations for an alert',
				action: 'Get evaluations for alert',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/social/v4/alerts/" + $parameter.alertId + "/evaluations" }}',
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'List Alert Triggered Preferences',
				value: 'listAlertTriggeredPreferences',
				description: 'Get preferences for authenticated user',
				action: 'List alert triggered preferences',
				routing: {
					request: {
						method: 'GET',
						url: '/api/messaging/v3/preferences/immediate/user/current/alert_triggered',
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'List Alerts',
				value: 'listAlerts',
				description: 'List all alerts',
				action: 'List alerts',
				routing: {
					request: {
						method: 'GET',
						url: '/api/social/v4/alerts',
						qs: {
							limit: '={{$parameter.limit}}',
							offset: '={{$parameter.offset}}',
							all: true,
						},
					},
					operations: {
						pagination: {
							type: 'offset',
							properties: {
								limitParameter: 'limit',
								offsetParameter: 'offset',
								pageSize: 50,
								type: 'query',
							},
						},
					},
				},
			},
			{
				name: 'List Immediate Alerts',
				value: 'listImmediateAlerts',
				action: 'List immediate alerts',
				routing: {
					request: {
						method: 'GET',
						url: '/api/messaging/v3/subscriptions/schedule/primary/immediate',
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Share Alert',
				value: 'shareAlert',
				description: 'Share an alert',
				action: 'Share alert',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/social/v4/alerts/" + $parameter.alertId + "/share" }}',
						body: {
							userMessage: '={{$parameter.shareMessage}}',
							alertSubscriptions:'={{ $parameter["alertSubscriptions"]["alertSubscription"] }}',
							sendEmail: '={{$parameter.sendEmail}}',
							metadata: {}
						},
					},
					send: {
						preSend: [
							async function(this: IExecuteSingleFunctions, requestOptions: IHttpRequestOptions) {
								// Get the alert subscriptions collection
								const alertSubscriptions = this.getNodeParameter('alertSubscriptions.alertSubscription', []) as Array<{type: string, subscriberId: string}>;

								// Update the body with evaluated values
								requestOptions.body = {
									userMessage: this.getNodeParameter('shareMessage', '') as string,
									alertSubscriptions: alertSubscriptions,
									sendEmail: this.getNodeParameter('sendEmail', true) as boolean,
									metadata: {}
								};

								return requestOptions;
							},
							preSendLogger,
						],
					},
				},
			},
			{
				name: 'Unshare Alert',
				value: 'unshareAlert',
				description: 'Unshare an alert',
				action: 'Unshare alert',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/social/v4/alerts/" + $parameter.alertId + "/subscriptions" }}',
						qs: {
							subscriberId: '={{$parameter.subscriberId}}',
							type: '={{$parameter.type}}',
						},
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Update Alert Message',
				value: 'updateAlertMessage',
				description: 'Update alert message template',
				action: 'Update alert message',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/social/v4/alerts/" + $parameter.alertId + "/message-template" }}',
						body: {
							body: '={{$parameter.body}}',
							footer: '={{$parameter.footer}}',
							header: '={{$parameter.header}}',
						},
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Update Alert Name',
				value: 'updateAlertName',
				description: 'Update an alert name',
				action: 'Update alert',
				routing: {
					request: {
						method: 'PATCH',
						url: '={{ "/api/social/v4/alerts/" + $parameter.alertId }}',
						body: {
							name: '={{$parameter.name}}',
							id: '={{$parameter.alertId}}',
						}
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Update Alert Owner',
				value: 'updateAlertOwner',
				description: 'Update an alert owner',
				action: 'Update alert',
				routing: {
					request: {
						method: 'PATCH',
						url: '={{ "/api/social/v4/alerts/" + $parameter.alertId }}',
						body: {
							owner: '={{$parameter.ownerId}}',
							id: '={{$parameter.alertId}}',
						}
					},
				},
			},
			{
				name: 'Update Alert Rules',
				value: 'updateAlertRules',
				action: 'Update alert rules',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/social/v4/alerts/" + $parameter.alertId }}',
						body: '={{JSON.parse($parameter.rulesData)}}',
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
		],
		default: 'listAlerts',
	},
];

export const alertFields: INodeProperties[] = [
	// Alert ID field
	{
		displayName: 'Alert ID',
		name: 'alertId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: [
					'getAlert',
					'getAlertAction',
					'getEvaluations',
					'deleteAlert',
					'shareAlert',
					'unshareAlert',
					'updateAlertMessage',
					'updateAlertName',
					'updateAlertOwner',
					'updateAlertRules',
				],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the alert',
	},
	// Action ID field
	{
		displayName: 'Action ID',
		name: 'actionId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['getAlertAction'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the alert action',
	},
	// List Alerts / Get Alerts fields

	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['listAlerts', 'getAlerts'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
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
				resource: ['alert'],
				operation: ['listAlerts', 'getAlerts'],
				returnAll: [false],
			},
		},
		default: 50,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Offset',
		name: 'offset',
		type: 'number',
		typeOptions: {
			minValue: 0,
		},
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['listAlerts', 'getAlerts'],
				returnAll: [false],
			},
		},
		default: 0,
		description: 'Number of alerts to skip',
	},
	// Get Alerts fields
	{
		displayName: 'Alert IDs',
		name: 'alertIds',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['getAlerts'],
			},
		},
		default: '',
		placeholder: '[123,456]',
		required: true,
		description: 'Array of alert IDs',
	},
	{
		displayName: 'Subscriber ID',
		name: 'subscriberId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['unshareAlert'],
			},
		},
		default: '',
	},
	{
		displayName: 'Alert Name',
		name: 'name',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['updateAlertName'],
			},
		},
		default: '',
	},
	{
		displayName: 'Owner ID',
		name: 'ownerId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['updateAlertOwner'],
			},
		},
		default: '',
		required: true,
		description: 'The User ID of the owner',
	},
	// Create Alert fields
	{
		displayName: 'Alert Data',
		name: 'alertData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['createAlert', 'updateAlert'],
			},
		},
		default: '',
		placeholder: '{"name":"Alert Name","type":"SUMMARY_NUMBER","owner":123456,"active":true,"enabled":true,"resourceType":"CARD","resourceId":"1234"}',
		required: true,
		description: 'JSON object containing alert configuration',
	},
	{
		displayName: 'Alert Subscriptions',
		name: 'alertSubscriptions',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['shareAlert'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Alert Subscription',
				name: 'alertSubscription',
				values: [
					{
						displayName: 'Type',
						name: 'type',
						type: 'options',
						options: [
							{ name: 'User', value: 'USER' },
							{ name: 'Group', value: 'GROUP' },
						],
						default: 'USER',
						required: true,
					},
					{
						displayName: 'Subscriber ID',
						name: 'subscriberId',
						type: 'number',
						default: '',
						required: true,
					},
				],
			},
		],
	},
	// Share Alert fields
	{
		displayName: 'Share Message',
		name: 'shareMessage',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['shareAlert'],
			},
		},
		default: 'I thought you might find this alert interesting.',
		description: 'Message to send with share'
	},
	{
		displayName: 'Send Email',
		name: 'sendEmail',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['shareAlert'],
			},
		},
		default: false,
		description: 'Whether to send email notification upon sharing alert'
	},
	// Update Alert Rules fields
	{
		displayName: 'Rules Data',
		name: 'rulesData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['updateAlertRules'],
			},
		},
		default: '',
		placeholder: '{"configurations":[],"type":"ANY_ROW","name":"Alert Name","resourceType":"DATASET","resourceId":"","owner":123456}',
		required: true,
		description: 'JSON object containing alert rules',
	},
	// Update Alert Message fields
	{
		displayName: 'Body',
		name: 'body',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['updateAlertMessage'],
			},
		},
		default: '',
		required: true,
		description: 'HTML Body of the alert message',
	},
	{
		displayName: 'Footer',
		name: 'footer',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['updateAlertMessage'],
			},
		},
		default: '',
		description: 'HTML Footer of the alert message',
	},
	{
		displayName: 'Header',
		name: 'header',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['updateAlertMessage'],
			},
		},
		default: '',
		description: 'HTML Header of the alert message',
	},
	// Unshare Alert fields
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		options: [
			{
				name: 'USER',
				value: 'USER',
			},
			{
				name: 'GROUP',
				value: 'GROUP',
			},
		],
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['unshareAlert'],
			},
		},
		default: 'USER',
		description: 'Type of subscriber',
	},
];
