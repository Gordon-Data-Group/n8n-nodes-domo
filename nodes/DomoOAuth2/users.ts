import type { INodeProperties } from 'n8n-workflow';

export const usersOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['users'],
			},
		},
	default: 'list-users',
	options: [
	{
		name: 'Create a User',
		value: 'create-a-user',
		action: 'Create a user',
		description: 'Creates a new user in your Domo instance',
		routing: {
			request: {
				method: 'POST',
				url: '/v1/users',
			},
		},
	},
	{
		name: 'Delete a User',
		value: 'delete-a-user',
		action: 'Delete a user',
		description: 'Permanently deletes a user from your Domo instance. Warning This is destructive and cannot be reversed. Heads up Domo will not allow deletion of users if they own Datasets or Dataflows.',
		routing: {
			request: {
				method: 'DELETE',
				url: '/v1/users/={{$parameter["id"]}}',
			},
		},
	},
	{
		name: 'List Users',
		value: 'list-users',
		action: 'List users',
		description: 'Get a list of all users in your Domo instance',
		routing: {
			request: {
				method: 'GET',
				url: '/v1/users',
			},
		},
	},
	{
		name: 'Retrieve a User',
		value: 'retrieve-a-user',
		action: 'Retrieve a user',
		description: 'Retrieves the details of an existing user',
		routing: {
			request: {
				method: 'GET',
				url: '/v1/users/={{$parameter["id"]}}',
			},
		},
	},
	{
		name: 'Update a User',
		value: 'update-a-user',
		action: 'Update a user',
		description: 'Updates the specified user by providing values to parameters passed. Any parameter left out of the request will cause the specific user attribute to remain unchanged. Known Limitation Currently all user fields are required',
		routing: {
			request: {
				method: 'PUT',
				url: '/v1/users/={{$parameter["id"]}}',
			},
		},
	},
	],
	},
];

export const usersFields: INodeProperties[] = [
	{
		displayName: 'User ID',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['users'],
				operation: ['retrieve-a-user', 'update-a-user', 'delete-a-user'],
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
				resource: ['users'],
				operation: ['create-a-user', 'update-a-user'],
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
				resource: ['users'],
				operation: ['list-users'],
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
				resource: ['users'],
				operation: ['list-users'],
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
