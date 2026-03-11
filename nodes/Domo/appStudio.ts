import { INodeProperties } from 'n8n-workflow';
import { preSendLogger } from './shared/preSendLogger';

export const appStudioOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['appStudio'],
			},
		},
		options: [
			{
				name: 'Bulk Add Owners',
				value: 'bulkAddOwners',
				description: 'Bulk add owners to apps',
				action: 'Bulk add owners',
				routing: {
					request: {
						method: 'PUT',
						url: '/api/content/v1/dataapps/bulk/owners',
						body: {
							note: '={{$parameter.message}}',
							entityIds: '={{[$parameter.appId]}}',
							owners: '={{$parameter.owners.owner}}',
						},
						qs: {
							sendEmail: '={{$parameter.sendEmail}}',
						},
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Bulk Remove Owners',
				value: 'bulkRemoveOwners',
				description: 'Bulk remove owners from apps',
				action: 'Bulk remove owners',
				routing: {
					request: {
						method: 'POST',
						url: '/api/content/v1/dataapps/bulk/owners/remove',
						body: {
							entityIds: '={{[$parameter.appId]}}',
							owners: '={{$parameter.owners.owner}}',
						},
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Create App View (Page)',
				value: 'createAppView',
				description: 'Create a new app view (page)',
				action: 'Create app view page',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/content/v1/dataapps/" + $parameter.appId + "/views" }}',
						body: '={{JSON.parse($parameter.viewData)}}',
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Delete App',
				value: 'deleteApp',
				description: 'Delete an app',
				action: 'Delete app',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/content/v1/dataapps/" + $parameter.appId }}',
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Delete App View (Page)',
				value: 'deleteAppView',
				description: 'Delete an app view (page)',
				action: 'Delete app view page',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/content/v1/dataapps/" + $parameter.appId + "/views/" + $parameter.viewId }}',
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Duplicate App',
				value: 'duplicateApp',
				description: 'Duplicate an app',
				action: 'Duplicate app',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/content/v1/dataapps/" + $parameter.appId + "/duplicate" }}',
						body: {
							title: '={{$parameter.title}}',
							duplicateCards: '={{$parameter.duplicateCards}}',
							beacon: '={{$parameter.beacon}}',
							cardPrefix: '={{$parameter.cardPrefix}}',
							worksheetToApp: '={{$parameter.worksheetToApp}}',
						},
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Get App',
				value: 'getApp',
				description: 'Get details of a specific app',
				action: 'Get app',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/content/v1/dataapps/" + $parameter.appId }}',
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Get App (Admin Summary)',
				value: 'getAppAdminSummary',
				description: 'Get admin summary for a specific app',
				action: 'Get app admin summary',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/content/v1/dataapps/" + $parameter.appId + "/adminsummary" }}',
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Get App Access',
				value: 'getAppAccess',
				description: 'Get access information for an app',
				action: 'Get app access',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/content/v1/dataapps/" + $parameter.appId + "/access" }}',
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'List Apps',
				value: 'listApps',
				description: 'List all apps',
				action: 'List apps',
				routing: {
					request: {
						method: 'GET',
						url: '/api/content/v1/dataapps',
						qs: {
							parts: '={{$parameter.parts}}',
							includeHiddenViews: '={{$parameter.includeHiddenViews}}',
							authoring: '={{$parameter.authoring}}',
						},
					},
				},
			},
			{
				name: 'List Apps (Admin Summary)',
				value: 'listAppsAdminSummary',
				description: 'List all apps with admin summary',
				action: 'List apps admin summary',
				routing: {
					request: {
						method: 'POST',
						url: '/api/content/v1/dataapps/adminsummary',
						body: {
							"includeTitleClause": '={{$parameter.includeTitleClause}}',
							"includeOwnerClause": '={{$parameter.includeOwnerClause}}',
							"orderBy": '={{$parameter.orderBy}}',
							"ascending": '={{$parameter.ascending}}',
							"titleSearchText": '={{$parameter.titleSearchText}}'
						},
						qs: {
							limit: '={{Math.min($parameter.limit || 50, 500)}}',
							offset: '={{$parameter.offset || 0}}',
						},
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
		{
			name: 'Share App',
			value: 'shareApp',
			description: 'Share an app with users or groups',
			action: 'Share app',
			routing: {
				request: {
					method: 'POST',
					url: '/api/content/v1/dataapps/share',
					body: {
						message: '={{$parameter.message}}',
						dataAppIds: '={{[$parameter.appId]}}',
						recipients: '={{$parameter.recipients.recipient}}',
					},
					qs: {
						sendEmail: '={{$parameter.sendEmail}}',
					},
				},
				send: {
					preSend: [preSendLogger],
				},
			},
		},
			{
				name: 'Unshare App',
				value: 'unshareApp',
				description: 'Unshare an app with users or groups',
				action: 'Unshare app',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/content/v1/dataapps/" + $parameter.appId + "/share/" + $parameter.unshareType + "/" + $parameter.unshareWithId }}',
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
		],
		default: 'listApps',
	},
];

export const appStudioFields: INodeProperties[] = [
	// App ID field
	{
		displayName: 'App ID',
		name: 'appId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['appStudio'],
				operation: [
					'bulkAddOwners',
					'bulkRemoveOwners',
					'getApp',
					'getAppAdminSummary',
					'getAppAccess',
					'deleteApp',
					'createAppView',
					'deleteAppView',
					'duplicateApp',
					'duplicateAppSync',
					'shareApp',
					'unshareApp',
				],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the app',
	},
	// Bulk Add Owners fields
	{
		displayName: 'Owners',
		name: 'owners',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['appStudio'],
				operation: ['bulkAddOwners', 'bulkRemoveOwners'],
			},
		},
		default: {},
		options: [
			{
				displayName: 'Owner',
				name: 'owner',
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
						displayName: 'Owner ID',
						name: 'id',
						type: 'number',
						default: '',
						required: true,
						description: 'The ID of the user or group to share with',
					},
				],
			},
		],
	},
	// View ID field
	{
		displayName: 'View ID',
		name: 'viewId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['appStudio'],
				operation: ['deleteAppView'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the app view (page)',
	},
	// List Apps fields
	{
		displayName: 'Parts',
		name: 'parts',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['appStudio'],
				operation: ['listApps'],
			},
		},
		default: 'views',
		description: 'Parts to include in the response',
	},
	{
		displayName: 'Include Hidden Views',
		name: 'includeHiddenViews',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['appStudio'],
				operation: ['listApps'],
			},
		},
		default: true,
		description: 'Whether to include hidden views',
	},
	{
		displayName: 'Authoring',
		name: 'authoring',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['appStudio'],
				operation: ['listApps'],
			},
		},
		default: true,
		description: 'Whether to show authoring mode',
	},
	// List Apps Admin Summary fields
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['appStudio'],
				operation: ['listAppsAdminSummary'],
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
				resource: ['appStudio'],
				operation: ['listAppsAdminSummary'],
			},
		},
		default: 0,
		description: 'Number of records to skip',
	},
	{
		displayName: 'Include Title Clause',
		name: 'includeTitleClause',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['appStudio'],
				operation: ['listAppsAdminSummary'],
			},
		},
		default: true,
		description: 'Whether to include title clause',
	},
	{
		displayName: 'Include Owner Clause',
		name: 'includeOwnerClause',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['appStudio'],
				operation: ['listAppsAdminSummary'],
			},
		},
		default: true,
		description: 'Whether to include owner clause',
	},
	{
		displayName: 'Order By',
		name: 'orderBy',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['appStudio'],
				operation: ['listAppsAdminSummary'],
			},
		},
		default: 'title',
		description: 'Field to order results by',
		required: true,
	},
	{
		displayName: 'Ascending',
		name: 'ascending',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['appStudio'],
				operation: ['listAppsAdminSummary'],
			},
		},
		default: false,
		description: 'Whether to sort in ascending order',
	},
	{
		displayName: 'Title Search Text',
		name: 'titleSearchText',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['appStudio'],
				operation: ['listAppsAdminSummary'],
			},
		},
		default: '',
		description: 'Title search text to filter results',
	},
	// Share App fields
	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['appStudio'],
				operation: ['shareApp'],
			},
		},
		default: 'I thought you might find this interesting.',
		description: 'Message to send with share notification',
	},
	{
		displayName: 'Recipients',
		name: 'recipients',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['appStudio'],
				operation: ['shareApp'],
			},
		},
		default: {},
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
							{ name: 'User', value: 'user' },
							{ name: 'Group', value: 'group' },
						],
						default: 'user',
						required: true,
					},
					{
						displayName: 'Share With ID',
						name: 'id',
						type: 'number',
						default: '',
						required: true,
						description: 'The ID of the user or group to share with',
					},
				],
			},
		],
	},
	{
		displayName: 'Send Email',
		name: 'sendEmail',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['appStudio'],
				operation: ['shareApp', 'bulkAddOwners'],
			},
		},
		default: true,
		description: 'Whether to send email notifications',
	},
	// Create App View fields
	{
		displayName: 'View Data',
		name: 'viewData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['appStudio'],
				operation: ['createAppView'],
			},
		},
		default: '',
		placeholder: '{"type":"dataappview","title":"View Title","hasLayout":true}',
		required: true,
		description: 'JSON object containing view configuration',
	},
	// Duplicate App fields
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['appStudio'],
				operation: ['duplicateApp', 'duplicateAppSync'],
			},
		},
		default: '',
		required: true,
		description: 'Title of the duplicated app',
	},
	{
		displayName: 'Card Prefix',
		name: 'cardPrefix',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['appStudio'],
				operation: ['duplicateApp', 'duplicateAppSync'],
			},
		},
		default: '',
		description: 'Prefix of the duplicated cards',
	},
	{
		displayName: 'Beacon',
		name: 'beacon',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['appStudio'],
				operation: ['duplicateApp', 'duplicateAppSync'],
			},
		},
		default: 0,
		required: true,
		description: 'Beacon to use for the duplicated app',
	},
	{
		displayName: 'Worksheet To App',
		name: 'worksheetToApp',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['appStudio'],
				operation: ['duplicateApp', 'duplicateAppSync'],
			},
		},
		default: true,
		required: true,
		description: 'Whether to convert the duplicated worksheet to an app',
	},
	{
		displayName: 'Duplicate Cards',
		name: 'duplicateCards',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['appStudio'],
				operation: ['duplicateApp', 'duplicateAppSync'],
			},
		},
		default: true,
		required: true,
		description: 'Whether to duplicate cards',
	},
	{
		displayName: 'Unshare Type',
		name: 'unshareType',
		type: 'options',
		options: [
			{ name: 'User', value: 'user' },
			{ name: 'Group', value: 'group' },
		],
		default: 'user',
		required: true,
		description: 'Type of recipient',
		displayOptions: {
			show: {
				resource: ['appStudio'],
				operation: ['unshareApp'],
			},
		},
	},
	{
		displayName: 'Unshare With ID',
		name: 'unshareWithId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['appStudio'],
				operation: ['unshareApp'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the user or group to unshare with',
	},
];
