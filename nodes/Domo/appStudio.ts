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
				name: 'Create App',
				value: 'createApp',
				description: 'Create a new app',
				action: 'Create app',
				routing: {
					request: {
						method: 'POST',
						url: '/api/content/v1/apps',
						body: '={{JSON.parse($parameter.appData)}}',
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
						url: '={{ "/api/content/v1/apps/" + $parameter.appId }}',
					},
				},
			},
			{
				name: 'Deploy App',
				value: 'deployApp',
				description: 'Deploy an app version',
				action: 'Deploy app',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/content/v1/apps/" + $parameter.appId + "/deploy" }}',
						body: {
							version: '={{$parameter.version}}',
						},
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
						url: '={{ "/api/content/v1/apps/" + $parameter.appId }}',
					},
				},
			},
			{
				name: 'Get App Views',
				value: 'getAppViews',
				description: 'Get views for an app',
				action: 'Get app views',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/content/v1/apps/" + $parameter.appId + "/views" }}',
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
						url: '/api/content/v1/apps',
						qs: {
							limit: '={{Math.min($parameter.limit || 50, 500)}}',
							offset: '={{$parameter.offset || 0}}',
						},
					},
				},
			},
			{
				name: 'Publish App',
				value: 'publishApp',
				description: 'Publish an app version',
				action: 'Publish app',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/content/v1/apps/" + $parameter.appId + "/publish" }}',
						body: '={{JSON.parse($parameter.publishData)}}',
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
						url: '={{ "/api/content/v1/apps/" + $parameter.appId + "/share" }}',
						body: '={{JSON.parse($parameter.shareData)}}',
					},
				},
			},
			{
				name: 'Update App',
				value: 'updateApp',
				description: 'Update an app',
				action: 'Update app',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/content/v1/apps/" + $parameter.appId }}',
						body: '={{JSON.parse($parameter.appData)}}',
					},
				},
			},
		],
		default: 'listApps',
	},
];

export const appStudioFields: INodeProperties[] = [
	// App ID field (for most operations)
	{
		displayName: 'App ID',
		name: 'appId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['appStudio'],
				operation: ['getApp', 'updateApp', 'deleteApp', 'publishApp', 'deployApp', 'shareApp', 'getAppViews'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the app',
	},
	// List apps fields
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
				operation: ['listApps'],
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
				operation: ['listApps'],
			},
		},
		default: 0,
		description: 'Number of apps to skip',
	},
	// Create and Update app fields
	{
		displayName: 'App Data',
		name: 'appData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['appStudio'],
				operation: ['createApp', 'updateApp'],
			},
		},
		default: '{}',
		required: true,
		description: 'JSON object containing app configuration',
		placeholder: '{"name":"My App","description":"App description","type":"dashboard"}',
	},
	// Publish app fields
	{
		displayName: 'Publish Data',
		name: 'publishData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['appStudio'],
				operation: ['publishApp'],
			},
		},
		default: '{}',
		required: true,
		description: 'JSON object containing publish configuration',
		placeholder: '{"version":"1.0.0","releaseNotes":"Initial release"}',
	},
	// Deploy app fields
	{
		displayName: 'Version',
		name: 'version',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['appStudio'],
				operation: ['deployApp'],
			},
		},
		default: '',
		required: true,
		description: 'The version to deploy',
	},
	// Share app fields
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
		default: '{}',
		required: true,
		description: 'JSON object containing share configuration',
		placeholder: '{"users":[123,456],"groups":[789],"accessLevel":"view"}',
	},
];

