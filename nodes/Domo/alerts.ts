import { INodeProperties } from 'n8n-workflow';

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
							all: '={{$parameter.all}}',
							subscriberId: '={{$parameter.subscriberId}}',
							fields: '={{$parameter.fields}}',
							limit: '={{$parameter.limit}}',
							offset: '={{$parameter.offset}}',
						},
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
				},
			},
			{
				name: 'List Alert Triggered Preferences',
				value: 'listAlertTriggeredPreferences',
				action: 'List alert triggered preferences',
				routing: {
					request: {
						method: 'GET',
						url: '/api/messaging/v3/preferences/immediate/user/current/alert_triggered',
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
							all: '={{$parameter.all}}',
							fields: '={{$parameter.fields}}',
							limit: '={{Math.min($parameter.limit || 50, 500)}}',
							offset: '={{$parameter.offset || 0}}',
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
				},
			},
			{
				name: 'Search Alerts',
				value: 'searchAlerts',
				action: 'Search alerts',
				routing: {
					request: {
						method: 'POST',
						url: '/api/search/v1/query',
						body: '={{JSON.parse($parameter.searchQuery)}}',
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
						body: '={{JSON.parse($parameter.shareData)}}',
					},
				},
			},
			{
				name: 'Unshare Alert',
				value: 'unshareAlert',
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
				},
			},
			{
				name: 'Update Alert',
				value: 'updateAlert',
				description: 'Update an alert',
				action: 'Update alert',
				routing: {
					request: {
						method: 'PATCH',
						url: '={{ "/api/social/v4/alerts/" + $parameter.alertId }}',
						body: '={{JSON.parse($parameter.alertData)}}',
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
						body: '={{JSON.parse($parameter.messageData)}}',
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
					'updateAlert',
					'updateAlertMessage',
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
	// List Alerts fields
	{
		displayName: 'All',
		name: 'all',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['listAlerts', 'getAlerts'],
			},
		},
		default: false,
		description: 'Whether to retrieve all alerts',
	},
	{
		displayName: 'Fields',
		name: 'fields',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['listAlerts', 'getAlerts'],
			},
		},
		default: '',
		description: 'Comma-separated list of fields to return',
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
		default: '["123","456"]',
		required: true,
		description: 'JSON array of alert IDs',
	},
	{
		displayName: 'Subscriber ID',
		name: 'subscriberId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['getAlerts', 'unshareAlert'],
			},
		},
		default: '',
		description: 'Subscriber ID to filter by',
	},
	// Search Alerts fields
	{
		displayName: 'Search Query',
		name: 'searchQuery',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['searchAlerts'],
			},
		},
		default: '{"count":1000,"offset":0,"combineResults":false,"query":"*","filters":[],"entityList":[["alert"]]}',
		required: true,
		description: 'JSON query object for searching alerts',
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
		default: '{"name":"Alert Name","type":"SUMMARY_NUMBER","owner":123456,"active":true,"enabled":true,"resourceType":"CARD","resourceId":"1234"}',
		required: true,
		description: 'JSON object containing alert configuration',
	},
	// Share Alert fields
	{
		displayName: 'Share Data',
		name: 'shareData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['shareAlert'],
			},
		},
		default: '{"userMessage":"","alertSubscriptions":[{"subscriberId":123456,"type":"USER"}],"sendEmail":true}',
		required: true,
		description: 'JSON object containing share configuration',
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
		default: '{"configurations":[],"type":"ANY_ROW","name":"Alert Name","resourceType":"DATASET","resourceId":"","owner":123456}',
		required: true,
		description: 'JSON object containing alert rules',
	},
	// Update Alert Message fields
	{
		displayName: 'Message Data',
		name: 'messageData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['updateAlertMessage'],
			},
		},
		default: '{"body":"","footer":"","header":"","formulas":{}}',
		required: true,
		description: 'JSON object containing message template',
	},
	// Unshare Alert fields
	{
		displayName: 'Type',
		name: 'type',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['alert'],
				operation: ['unshareAlert'],
			},
		},
		default: '',
		description: 'Type of subscriber (USER or GROUP)',
	},
];
