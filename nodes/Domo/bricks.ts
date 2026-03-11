import { INodeProperties } from 'n8n-workflow';

export const bricksOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['bricks'],
			},
		},
		options: [
			{
				name: 'Count App Designs',
				value: 'countAppDesigns',
				action: 'Count app designs',
				routing: {
					request: {
						method: 'GET',
						url: '/api/apps/v1/designs/count',
						qs: {
							checkAdminAuthority: '={{$parameter.checkAdminAuthority}}',
							creator: '={{$parameter.creator}}',
							deleted: '={{$parameter.deleted}}',
							search: '={{$parameter.search}}',
							withPermission: '={{$parameter.withPermission}}',
						},
					},
				},
			},
			{
				name: 'Create App Instance',
				value: 'createAppInstance',
				description: 'Create a new app instance',
				action: 'Create app instance',
				routing: {
					request: {
						method: 'POST',
						url: '/api/apps/v1/instances',
						body: '={{JSON.parse($parameter.instanceData)}}',
						qs: {
							temporary: '={{$parameter.temporary}}',
						},
					},
				},
			},
			{
				name: 'Delete App Design (Domoapps)',
				value: 'deleteAppDesignDomoapps',
				description: 'Delete an app design',
				action: 'Delete app design domoapps',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/domoapps/designs/" + $parameter.designId }}',
					},
				},
			},
			{
				name: 'Delete App Design V1',
				value: 'deleteAppDesignV1',
				description: 'Delete an app design',
				action: 'Delete app design apps v1',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/apps/v1/designs/" + $parameter.designId }}',
					},
				},
			},
			{
				name: 'Delete App Instance',
				value: 'deleteAppInstance',
				description: 'Delete an app instance',
				action: 'Delete app instance',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/apps/v1/instances/" + $parameter.instanceId }}',
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
						url: '={{ "/api/domoapps/apps/v2/" + $parameter.appId }}',
					},
				},
			},
			{
				name: 'Get App Context',
				value: 'getAppContext',
				action: 'Get app context',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/domoapps/apps/v2/contexts/" + $parameter.contextId }}',
					},
				},
			},
			{
				name: 'Get App Design',
				value: 'getAppDesign',
				description: 'Get details of a specific app design',
				action: 'Get app design',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/apps/v1/designs/" + $parameter.designId }}',
						qs: {
							parts: '={{$parameter.parts}}',
						},
					},
				},
			},
			{
				name: 'Get App File',
				value: 'getAppFile',
				description: 'Get an app file',
				action: 'Get app file',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/v1/designs/" + $parameter.designId + "/versions/" + $parameter.versionNumber + "/assets" }}',
						qs: {
							path: '={{$parameter.path}}',
						},
					},
				},
			},
			{
				name: 'Get App Version',
				value: 'getAppVersion',
				description: 'Returns a list of file names and their extensions in the specified version',
				action: 'Get app version',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/v1/designs/" + $parameter.designId + "/versions/" + $parameter.versionNumber }}',
					},
				},
			},
			{
				name: 'List App Designs',
				value: 'listAppDesigns',
				description: 'List all app designs',
				action: 'List app designs',
				routing: {
					request: {
						method: 'GET',
						url: '/api/apps/v1/designs',
						qs: {
							checkAdminAuthority: '={{$parameter.checkAdminAuthority}}',
							creator: '={{$parameter.creator}}',
							deleted: '={{$parameter.deleted}}',
							order: '={{$parameter.order}}',
							direction: '={{$parameter.direction}}',
							limit: '={{Math.min($parameter.limit || 50, 500)}}',
							offset: '={{$parameter.offset || 0}}',
							search: '={{$parameter.search}}',
							withPermission: '={{$parameter.withPermission}}',
							parts: '={{$parameter.parts}}',
						},
					},
				},
			},
			{
				name: 'Release App Design Version',
				value: 'releaseAppDesignVersion',
				description: 'Release an app design version',
				action: 'Release app design version',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/domoapps/designs/" + $parameter.designId + "/release" }}',
						qs: {
							version: '={{$parameter.version}}',
						},
					},
				},
			},
			{
				name: 'Restore App Design',
				value: 'restoreAppDesign',
				description: 'Restore a deleted app design',
				action: 'Restore app design',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/apps/v1/designs/" + $parameter.designId + "/undelete" }}',
					},
				},
			},
			{
				name: 'Share App Design',
				value: 'shareAppDesign',
				description: 'Share an app design',
				action: 'Share app design',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/apps/v1/designs/" + $parameter.designId + "/permissions/" + $parameter.permissions }}',
						body: '={{JSON.parse($parameter.userIds)}}',
					},
				},
			},
			{
				name: 'Update App Context',
				value: 'updateAppContext',
				description: 'Update an app context',
				action: 'Update app context',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/domoapps/apps/v2/contexts/" + $parameter.contextId }}',
						body: '={{JSON.parse($parameter.contextData)}}',
					},
				},
			},
			{
				name: 'Update App File',
				value: 'updateAppFile',
				description: 'Update an app file',
				action: 'Update app file',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/apps/v1/designs/" + $parameter.designId + "/versions/" + $parameter.versionNumber + "/assets" }}',
						body: '={{JSON.parse($parameter.fileData)}}',
						qs: {
							path: '={{$parameter.path}}',
						},
					},
				},
			},
			{
				name: 'Update App Instance',
				value: 'updateAppInstance',
				description: 'Update an app instance',
				action: 'Update app instance',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/apps/v1/instances/" + $parameter.instanceId }}',
						body: '={{JSON.parse($parameter.instanceData)}}',
					},
				},
			},
		],
		default: 'listAppDesigns',
	},
];

export const bricksFields: INodeProperties[] = [
	// App ID field
	{
		displayName: 'App ID',
		name: 'appId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['bricks'],
				operation: ['getApp'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the app',
	},
	// Design ID field
	{
		displayName: 'Design ID',
		name: 'designId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['bricks'],
				operation: [
					'getAppDesign',
					'getAppFile',
					'getAppVersion',
					'deleteAppDesignV1',
					'deleteAppDesignDomoapps',
					'releaseAppDesignVersion',
					'restoreAppDesign',
					'shareAppDesign',
					'updateAppFile',
				],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the app design',
	},
	// Version Number field
	{
		displayName: 'Version Number',
		name: 'versionNumber',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['bricks'],
				operation: ['getAppFile', 'getAppVersion', 'updateAppFile'],
			},
		},
		default: '',
		required: true,
		description: 'The version number of the app',
	},
	// Instance ID field
	{
		displayName: 'Instance ID',
		name: 'instanceId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['bricks'],
				operation: ['updateAppInstance', 'deleteAppInstance'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the app instance',
	},
	// Context ID field
	{
		displayName: 'Context ID',
		name: 'contextId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['bricks'],
				operation: ['getAppContext', 'updateAppContext'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the app context',
	},
	// List App Designs fields
	{
		displayName: 'Check Admin Authority',
		name: 'checkAdminAuthority',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['bricks'],
				operation: ['listAppDesigns', 'countAppDesigns'],
			},
		},
		default: false,
		description: 'Whether to check admin authority',
	},
	{
		displayName: 'Creator',
		name: 'creator',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['bricks'],
				operation: ['listAppDesigns', 'countAppDesigns'],
			},
		},
		default: false,
		description: 'Whether to filter to authenticated user',
	},
	{
		displayName: 'Deleted',
		name: 'deleted',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['bricks'],
				operation: ['listAppDesigns', 'countAppDesigns'],
			},
		},
		default: false,
		description: 'Whether to include deleted designs',
	},
	{
		displayName: 'Order',
		name: 'order',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['bricks'],
				operation: ['listAppDesigns'],
			},
		},
		default: '',
		description: 'Order by field',
	},
	{
		displayName: 'Direction',
		name: 'direction',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['bricks'],
				operation: ['listAppDesigns'],
			},
		},
		default: '',
		description: 'Sort direction (asc or desc)',
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
				resource: ['bricks'],
				operation: ['listAppDesigns'],
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
				resource: ['bricks'],
				operation: ['listAppDesigns'],
			},
		},
		default: 0,
		description: 'Number of designs to skip',
	},
	{
		displayName: 'Search',
		name: 'search',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['bricks'],
				operation: ['listAppDesigns', 'countAppDesigns'],
			},
		},
		default: '',
		description: 'Search term',
	},
	{
		displayName: 'With Permission',
		name: 'withPermission',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['bricks'],
				operation: ['listAppDesigns', 'countAppDesigns'],
			},
		},
		default: '',
		description: 'Filter by permission',
	},
	{
		displayName: 'Parts',
		name: 'parts',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['bricks'],
				operation: ['listAppDesigns', 'getAppDesign'],
			},
		},
		default: '',
		description: 'Parts to include in the response',
	},
	// File path field
	{
		displayName: 'Path',
		name: 'path',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['bricks'],
				operation: ['getAppFile', 'updateAppFile'],
			},
		},
		default: '',
		description: 'File path within the app',
	},
	// Version field
	{
		displayName: 'Version',
		name: 'version',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['bricks'],
				operation: ['releaseAppDesignVersion'],
			},
		},
		default: '',
		required: true,
		description: 'The version to release',
	},
	// Permissions field
	{
		displayName: 'Permissions',
		name: 'permissions',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['bricks'],
				operation: ['shareAppDesign'],
			},
		},
		default: '',
		required: true,
		description: 'Permission level to grant',
	},
	// User IDs field for sharing
	{
		displayName: 'User IDs',
		name: 'userIds',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['bricks'],
				operation: ['shareAppDesign'],
			},
		},
		default: '',
		placeholder: '["1234","2345"]',
		required: true,
		description: 'JSON array of user IDs to share with',
	},
	// Temporary field
	{
		displayName: 'Temporary',
		name: 'temporary',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['bricks'],
				operation: ['createAppInstance'],
			},
		},
		default: false,
		description: 'Whether to create a temporary instance',
	},
	// Instance Data field
	{
		displayName: 'Instance Data',
		name: 'instanceData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['bricks'],
				operation: ['createAppInstance', 'updateAppInstance'],
			},
		},
		default: '',
		placeholder: '{"designId":"00000000-0000-0000-0000-000000000000","designVersion":"0.0.1"}',
		required: true,
		description: 'JSON object containing app instance configuration',
	},
	// Context Data field
	{
		displayName: 'Context Data',
		name: 'contextData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['bricks'],
				operation: ['updateAppContext'],
			},
		},
		default: '',
		placeholder: '{"designId":"00000000-0000-0000-0000-000000000000","designVersion":"0.0.1","mapping":[]}',
		required: true,
		description: 'JSON object containing app context configuration',
	},
	// File Data field
	{
		displayName: 'File Data',
		name: 'fileData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['bricks'],
				operation: ['updateAppFile'],
			},
		},
		default: '',
		placeholder: '{"ID":"00000000-0000-0000-0000-000000000000","name":"file.js","version":"0.0.1"}',
		required: true,
		description: 'JSON object containing file data',
	},
];
