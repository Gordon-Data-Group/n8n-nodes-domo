import { INodeProperties } from 'n8n-workflow';

export const achievementOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['achievement'],
			},
		},
		options: [
			{
				name: 'Add Achievement Admin',
				value: 'addAchievementAdmin',
				description: 'Assign an achievement to a user',
				action: 'Assign achievement to user',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/content/v1/achievements/" + $parameter.achievementId + "/admins" }}',
						body: {
							userId: '={{$parameter.userId}}'
						},
					},
				},
			},
			{
				name: 'Assign to User',
				value: 'assignToUser',
				description: 'Assign an achievement to a user',
				action: 'Assign achievement to user',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/content/v2/users/" + $parameter.userId + "/achievements" }}',
						body: {
							achievementId: '={{$parameter.achievementId}}'
						},
					},
				},
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new achievement',
				action: 'Create achievement',
				routing: {
					request: {
						method: 'POST',
						url: '/api/content/v1/achievements',
						body: {
							name: '={{$parameter.name}}',
							description: '={{$parameter.description}}',
							image: '={{$parameter.image}}',
						},
					},
				},
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete an achievement',
				action: 'Delete achievement',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/content/v1/achievements/" + $parameter.achievementId }}',
					},
				},
			},
			{
				name: 'Delete Achievement Admin',
				value: 'deleteAchievementAdmin',
				description: 'Revoke an achievement from a user',
				action: 'Revoke achievement from user',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "api/content/v1/achievements/" + $parameter.achievementId + "/admins/" + $parameter.adminId }}',
					},
				},
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a specific achievement by ID',
				action: 'Get achievement',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/content/v1/achievements/" + $parameter.achievementId }}',
					},
				},
			},

			{
				name: 'Get Achievement Admins',
				value: 'getAchievementAdmins',
				description: 'Get all admins for an achievement',
				action: 'Get achievement admins',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/content/v1/achievements/" + $parameter.achievementId + "/admins" }}',
					},
				},
			},
			{
				name: 'List',
				value: 'list',
				description: 'Get a list of all achievements',
				action: 'List achievements',
				routing: {
					request: {
						method: 'GET',
						url: '/api/content/v1/achievements',
						qs: {
							limit: '={{Math.min($parameter.limit || 50, 500)}}',
							offset: '={{$parameter.offset || 0}}',
						},
					},
				},
			},
			{
				name: 'List User Achievements',
				value: 'listUserAchievements',
				description: 'Get all achievements assigned to a user',
				action: 'List user achievements',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/content/v2/users/" + $parameter.userId + "/achievements" }}',
						qs: {
							limit: '={{$parameter.limit}}',
							offset: '={{$parameter.offset}}',
						}
					},
				},
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an achievement',
				action: 'Update achievement',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/content/v1/achievements/" + $parameter.achievementId }}',
						body: {
							name: '={{$parameter.name}}',
							description: '={{$parameter.description}}',
							image: '={{$parameter.image}}',
						},
					},
				},
			},
		],
		default: 'list',
	},
];

export const achievementFields: INodeProperties[] = [
	// Achievement ID field (for get, update, delete, assignToUser, revokeFromUser)
	{
		displayName: 'Achievement ID',
		name: 'achievementId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['achievement'],
				operation: ['get', 'update', 'delete', 'assignToUser', 'revokeFromUser', 'getAchievementAdmins', 'deleteAchievementAdmin', 'addAchievementAdmin'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the achievement',
	},
	// User ID field (for assignToUser, revokeFromUser, listUserAchievements)
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['achievement'],
				operation: ['assignToUser', 'revokeFromUser', 'listUserAchievements', 'addAchievementAdmin'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the user',
	},
		// Admin ID field (for deleteAchievementAdmin)
		{
			displayName: 'Admin ID',
			name: 'adminId',
			type: 'number',
			displayOptions: {
				show: {
					resource: ['achievement'],
					operation: ['deleteAchievementAdmin'],
				},
			},
			default: '',
			required: true,
			description: 'The ID of the admin (Not the user ID)',
		},
	// List operation fields
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['achievement'],
				operation: ['list', 'listUserAchievements'],
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
				resource: ['achievement'],
				operation: ['list', 'listUserAchievements'],
			},
		},
		default: 0,
		description: 'Number of achievements to skip',
	},
	// Create and Update operation fields
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['achievement'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		required: true,
		description: 'The name of the achievement',
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['achievement'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		required: true,
		description: 'The description of the achievement',
	},
	{
		displayName: 'Image',
		name: 'image',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['achievement'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		required: true,
		description: 'Base64 encoded image of the achievement',
		placeholder: 'data:image/png;base64,iVBORw...',
	}
];
