import type { INodeProperties } from 'n8n-workflow';

export const groupsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['groups'],
			},
		},
	default: 'list-groups',
	options: [
	{
		name: 'Add a User to a Group',
		value: 'add-a-user-to-a-group',
		action: 'Add a user to a group',
		description: 'Add user to a group in your Domo instance',
		routing: {
			request: {
				method: 'PUT',
				url: '/v1/groups/={{$parameter["group_id"]}}/users/={{$parameter["user_id"]}}',
			},
		},
	},
	{
		name: 'Create a Group',
		value: 'create-a-group',
		action: 'Create a group',
		description: 'Creates a new group in your Domo instance',
		routing: {
			request: {
				method: 'POST',
				url: '/v1/groups',
			},
		},
	},
	{
		name: 'Delete a Group',
		value: 'delete-a-group',
		action: 'Delete a group',
		description: 'Permanently deletes a group from your Domo instance. Warning This is destructive and cannot be reversed.',
		routing: {
			request: {
				method: 'DELETE',
				url: '/v1/groups/={{$parameter["group_id"]}}',
			},
		},
	},
	{
		name: 'List Groups',
		value: 'list-groups',
		action: 'List groups',
		description: 'Get a list of all groups in your Domo instance',
		routing: {
			request: {
				method: 'GET',
				url: '/v1/groups',
			},
		},
	},
	{
		name: 'List Users in a Group',
		value: 'list-users-in-a-group',
		action: 'List users in a group',
		description: 'List the users in a group in your Domo instance',
		routing: {
			request: {
				method: 'GET',
				url: '/v1/groups/={{$parameter["group_id"]}}/users',
			},
		},
	},
	{
		name: 'Remove a User From a Group',
		value: 'remove-a-user-from-a-group',
		action: 'Remove a user from a group',
		description: 'Remove a user from a group in your Domo instance',
		routing: {
			request: {
				method: 'DELETE',
				url: '/v1/groups/={{$parameter["group_id"]}}/users/={{$parameter["user_id"]}}',
			},
		},
	},
	{
		name: 'Retrieve a Group',
		value: 'retrieve-a-group',
		action: 'Retrieve a group',
		description: 'Retrieves the details of an existing group',
		routing: {
			request: {
				method: 'GET',
				url: '/v1/groups/={{$parameter["group_id"]}}',
			},
		},
	},
	{
		name: 'Update a Group',
		value: 'update-a-group',
		action: 'Update a group',
		description: 'Updates the specified group by providing values to parameters passed. Any parameter left out of the request will cause the specific group attribute to remain unchanged.',
		routing: {
			request: {
				method: 'PUT',
				url: '/v1/groups/={{$parameter["group_id"]}}',
			},
		},
	},
	],
	},
];

export const groupsFields: INodeProperties[] = [
	{
		displayName: 'Group ID',
		name: 'group_id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['groups'],
				operation: ['retrieve-a-group', 'update-a-group', 'delete-a-group', 'add-a-user-to-a-group', 'remove-a-user-from-a-group', 'list-users-in-a-group'],
			},
		},
		default: '',
		description: 'The ID of the group',
	},
	{
		displayName: 'User ID',
		name: 'user_id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['groups'],
				operation: ['add-a-user-to-a-group', 'remove-a-user-from-a-group'],
			},
		},
		default: '',
		description: 'The ID of the user',
	},
	{
		displayName: 'Data',
		name: 'data',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				resource: ['groups'],
				operation: ['create-a-group', 'update-a-group'],
			},
		},
		default: '',
		description: 'The data to send in JSON format',
		routing: {
			request: {
				body: {
					data: '={{JSON.parse($parameter.data)}}',
				},
			},
		},
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
				resource: ['groups'],
				operation: ['list-groups', 'list-users-in-a-group'],
			},
		},
		default: 50,
		description: 'Max number of results to return',
		routing: {
			request: {
				qs: {
					limit: '={{$parameter.limit}}',
				},
			},
		},
	},
	{
		displayName: 'Offset',
		name: 'offset',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['groups'],
				operation: ['list-groups', 'list-users-in-a-group'],
			},
		},
		default: 0,
		description: 'The number of results to skip',
		routing: {
			request: {
				qs: {
					offset: '={{$parameter.offset}}',
				},
			},
		},
	},
];
