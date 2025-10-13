import { INodeProperties } from 'n8n-workflow';

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
						body: '={{JSON.parse($parameter.ownersData)}}',
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
						body: '={{JSON.parse($parameter.ownersData)}}',
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
						body: '={{JSON.parse($parameter.duplicateData)}}',
					},
				},
			},
			{
				name: 'Duplicate App Synchronously',
				value: 'duplicateAppSync',
				description: 'Duplicate an app synchronously',
				action: 'Duplicate app synchronously',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/content/v1/dataapps/" + $parameter.appId + "/duplicate/synchronous" }}',
						body: '={{JSON.parse($parameter.duplicateData)}}',
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
						body: '={{JSON.parse($parameter.summaryData)}}',
						qs: {
							limit: '={{Math.min($parameter.limit || 50, 500)}}',
							skip: '={{$parameter.skip || 0}}',
						},
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
						body: '={{JSON.parse($parameter.shareData)}}',
						qs: {
							sendEmail: '={{$parameter.sendEmail}}',
						},
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
					'getApp',
					'getAppAdminSummary',
					'getAppAccess',
					'deleteApp',
					'createAppView',
					'deleteAppView',
					'duplicateApp',
					'duplicateAppSync',
				],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the app',
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
		default: '',
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
		default: false,
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
		default: false,
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
		displayName: 'Skip',
		name: 'skip',
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
		description: 'Number of apps to skip',
	},
	{
		displayName: 'Summary Data',
		name: 'summaryData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['appStudio'],
				operation: ['listAppsAdminSummary'],
			},
		},
		default: '',
		placeholder: '{"includeTitleClause":true,"includeOwnerClause":true,"orderBy":"title","ascending":false,"titleSearchText":""}',
		required: true,
		description: 'JSON object containing summary filter criteria',
	},
	// Share App fields
	{
		displayName: 'Share Data',
		name: 'shareData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['appStudio'],
				operation: ['shareApp'],
			},
		},
		default: '',
		placeholder: '{"message":"I thought you might find this app interesting.","dataAppIds":["12345"],"recipients":[{"ID":123456,"type":"user"}]}',
		required: true,
		description: 'JSON object containing share configuration',
	},
	{
		displayName: 'Send Email',
		name: 'sendEmail',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['appStudio'],
				operation: ['shareApp'],
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
	// Bulk Owners fields
	{
		displayName: 'Owners Data',
		name: 'ownersData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['appStudio'],
				operation: ['bulkAddOwners', 'bulkRemoveOwners'],
			},
		},
		default: '',
		placeholder: '{"entityIds":["123456"],"owners":[{"type":"USER","ID":1234}],"sendEmail":false}',
		required: true,
		description: 'JSON object containing owners configuration',
	},
	// Duplicate App fields
	{
		displayName: 'Duplicate Data',
		name: 'duplicateData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['appStudio'],
				operation: ['duplicateApp', 'duplicateAppSync'],
			},
		},
		default: '',
		placeholder: '{"title":"Duplicated App","duplicateCards":true,"beacon":0,"cardPrefix":"Copy of","worksheetToApp":true}',
		required: true,
		description: 'JSON object containing duplication configuration',
	},
];
