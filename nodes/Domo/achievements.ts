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
				name: 'Assign to User',
				value: 'assignToUser',
				description: 'Assign an achievement to a user',
				action: 'Assign achievement to user',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/content/v1/achievements/" + $parameter.achievementId + "/assign" }}',
						body: {
							userId: '={{$parameter.userId}}',
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
						body: '={{JSON.parse($parameter.achievementData)}}',
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
						url: '={{ "/api/content/v1/users/" + $parameter.userId + "/achievements" }}',
					},
				},
			},
			{
				name: 'Revoke From User',
				value: 'revokeFromUser',
				description: 'Revoke an achievement from a user',
				action: 'Revoke achievement from user',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/content/v1/achievements/" + $parameter.achievementId + "/users/" + $parameter.userId }}',
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
						body: '={{JSON.parse($parameter.achievementData)}}',
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
				operation: ['get', 'update', 'delete', 'assignToUser', 'revokeFromUser'],
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
				operation: ['assignToUser', 'revokeFromUser', 'listUserAchievements'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the user',
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
				operation: ['list'],
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
				operation: ['list'],
			},
		},
		default: 0,
		description: 'Number of achievements to skip',
	},
	// Create and Update operation fields
	{
		displayName: 'Achievement Data',
		name: 'achievementData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['achievement'],
				operation: ['create', 'update'],
			},
		},
		default: '{}',
		required: true,
		description: 'JSON object containing achievement data',
		placeholder: '{"name":"Achievement Name","description":"Description","imageUrl":"https://...","badgeType":"custom"}',
	},
];

