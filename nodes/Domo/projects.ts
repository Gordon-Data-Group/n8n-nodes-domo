import type { INodeProperties } from 'n8n-workflow';

export const projectsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['projects'],
			},
		},
	default: 'list-projects',
	options: [
	{
		name: 'Create Attachment for Task',
		value: 'create-attachment-for-task',
		action: 'Create attachment for task',
		routing: {
			request: {
				method: 'POST',
				url: '/content/v1/tasks/={{$parameter.taskId}}/attachments',
			},
		},
	},
	{
		name: 'Create List',
		value: 'create-list',
		action: 'Create list',
		routing: {
			request: {
				method: 'POST',
				url: '/content/v1/projects/={{$parameter.projectId}}/lists',
			},
		},
	},
	{
		name: 'Create Project',
		value: 'create-project',
		action: 'Create project',
		routing: {
			request: {
				method: 'POST',
				url: '/v1/projects',
			},
		},
	},
	{
		name: 'Create Task',
		value: 'create-task',
		action: 'Create task',
		routing: {
			request: {
				method: 'POST',
				url: '/content/v1/projects/={{$parameter.projectId}}/lists/={{$parameter.listId}}/tasks',
			},
		},
	},
	{
		name: 'Create User Task',
		value: 'create-user-task',
		action: 'Create user task',
		routing: {
			request: {
				method: 'POST',
				url: '/content/v2/users/={{$parameter.userId}}/tasks',
			},
		},
	},
	{
		name: 'Delete Project',
		value: 'delete-project',
		action: 'Delete project',
		routing: {
			request: {
				method: 'DELETE',
				url: '/content/v1/projects/={{$parameter.projectId}}',
			},
		},
	},
	{
		name: 'Get Lists for Project',
		value: 'get-lists-for-project',
		action: 'Get lists for project',
		routing: {
			request: {
				method: 'GET',
				url: '/content/v1/projects/={{$parameter.projectId}}/lists',
			},
		},
	},
	{
		name: 'Get Project',
		value: 'get-project',
		action: 'Get project',
		routing: {
			request: {
				method: 'GET',
				url: '/content/v1/projects/={{$parameter.projectId}}',
			},
		},
	},
	{
		name: 'Get Projects for User',
		value: 'get-projects-for-user',
		action: 'Get projects for user',
		routing: {
			request: {
				method: 'GET',
				url: '/content/v2/users/={{$parameter.userId}}/projects',
			},
		},
	},
	{
		name: 'Get Tags for Project',
		value: 'get-tags-for-project',
		action: 'Get tags for project',
		routing: {
			request: {
				method: 'GET',
				url: '/content/v1/projects/={{$parameter.projectId}}/tags',
			},
		},
	},
	{
		name: 'Get Task',
		value: 'get-task',
		action: 'Get task',
		routing: {
			request: {
				method: 'GET',
				url: '/content/v1/tasks/={{$parameter.taskId}}',
			},
		},
	},
	{
		name: 'Get Task Assignments for User',
		value: 'get-task-assignments-for-user',
		action: 'Get task assignments for user',
		routing: {
			request: {
				method: 'GET',
				url: '/content/v2/users/={{$parameter.userId}}/tasks/assignments',
			},
		},
	},
	{
		name: 'Get Tasks for List',
		value: 'get-tasks-for-list',
		action: 'Get tasks for list',
		routing: {
			request: {
				method: 'GET',
				url: '/content/v1/projects/={{$parameter.projectId}}/lists/={{$parameter.listId}}/tasks',
			},
		},
	},
	{
		name: 'Get Tasks for Project',
		value: 'get-tasks-for-project',
		action: 'Get tasks for project',
		routing: {
			request: {
				method: 'GET',
				url: '/content/v1/projects/={{$parameter.projectId}}/tasks',
			},
		},
	},
	{
		name: 'List Projects',
		value: 'list-projects',
		action: 'List projects',
		routing: {
			request: {
				method: 'GET',
				url: '/content/v1/projects',
			},
		},
	},
	{
		name: 'List Tags',
		value: 'list-tags',
		action: 'List tags',
		routing: {
			request: {
				method: 'GET',
				url: '/content/v1/tags',
			},
		},
	},
	{
		name: 'Update List',
		value: 'update-list',
		action: 'Update list',
		routing: {
			request: {
				method: 'PUT',
				url: '/content/v1/projects/={{$parameter.projectId}}/lists/={{$parameter.listId}}',
			},
		},
	},
	{
		name: 'Update Project',
		value: 'update-project',
		action: 'Update project',
		routing: {
			request: {
				method: 'PUT',
				url: '/content/v1/projects/={{$parameter.projectId}}',
			},
		},
	},
	{
		name: 'Update Task',
		value: 'update-task',
		action: 'Update task',
		routing: {
			request: {
				method: 'PUT',
				url: '/content/v1/tasks/={{$parameter.taskId}}',
			},
		},
	},
	],
	},
];

export const projectsFields: INodeProperties[] = [
		{
			displayName: 'Limit',
			name: 'limit',
			type: 'number',
			typeOptions: {
				minValue: 1,
			},
			displayOptions: {
				show: {
					resource: ['projects'],
					operation: ['list-projects'],
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
					resource: ['projects'],
					operation: ['list-projects'],
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
		{
			displayName: 'Status',
			name: 'status',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['projects'],
					operation: ['list-projects'],
				},
			},
			default: '',
			description: 'The status parameter',
			routing: {
				request: {
					qs: {
						status: '={{$parameter.status}}',
					},
				},
			},
		},
		{
			displayName: 'Q',
			name: 'q',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['projects'],
					operation: ['list-tags'],
				},
			},
			default: '',
			description: 'The q parameter',
			routing: {
				request: {
					qs: {
						q: '={{$parameter.q}}',
					},
				},
			},
		},
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['projects'],
				operation: ['get-projects-for-user', 'get-task-assignments-for-user', 'create-user-task'],
			},
		},
		default: '',
		description: 'The ID of the user',
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
					resource: ['projects'],
					operation: ['get-projects-for-user'],
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
					resource: ['projects'],
					operation: ['get-projects-for-user'],
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
		{
			displayName: 'Status',
			name: 'status',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['projects'],
					operation: ['get-projects-for-user'],
				},
			},
			default: '',
			description: 'The status parameter',
			routing: {
				request: {
					qs: {
						status: '={{$parameter.status}}',
					},
				},
			},
		},
	{
		displayName: 'Project ID',
		name: 'projectId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['projects'],
				operation: ['get-tasks-for-project', 'get-tasks-for-list', 'get-lists-for-project', 'get-tags-for-project', 'get-project', 'create-task', 'create-list', 'update-project', 'update-list', 'delete-project'],
			},
		},
		default: '',
		description: 'The ID of the project',
	},
		{
			displayName: 'Search',
			name: 'search',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['projects'],
					operation: ['get-tasks-for-project'],
				},
			},
			default: '',
			description: 'The search parameter',
			routing: {
				request: {
					qs: {
						search: '={{$parameter.search}}',
					},
				},
			},
		},
		{
			displayName: 'Archived',
			name: 'archived',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['projects'],
					operation: ['get-tasks-for-project'],
				},
			},
			default: '',
			description: 'The archived parameter',
			routing: {
				request: {
					qs: {
						archived: '={{$parameter.archived}}',
					},
				},
			},
		},
		{
			displayName: 'AssignedToOwnerId',
			name: 'assignedToOwnerId',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['projects'],
					operation: ['get-tasks-for-project'],
				},
			},
			default: '',
			description: 'The assignedToOwnerId parameter',
			routing: {
				request: {
					qs: {
						assignedToOwnerId: '={{$parameter.assignedToOwnerId}}',
					},
				},
			},
		},
	{
		displayName: 'List ID',
		name: 'listId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['projects'],
				operation: ['get-tasks-for-list', 'create-task', 'update-list'],
			},
		},
		default: '',
		description: 'The ID of the list',
	},
		{
			displayName: 'Fields',
			name: 'fields',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['projects'],
					operation: ['get-tasks-for-list'],
				},
			},
			default: '',
			description: 'The fields parameter',
			routing: {
				request: {
					qs: {
						fields: '={{$parameter.fields}}',
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
					resource: ['projects'],
					operation: ['get-task-assignments-for-user'],
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
					resource: ['projects'],
					operation: ['get-task-assignments-for-user'],
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
		{
			displayName: 'Status',
			name: 'status',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['projects'],
					operation: ['get-task-assignments-for-user'],
				},
			},
			default: '',
			description: 'The status parameter',
			routing: {
				request: {
					qs: {
						status: '={{$parameter.status}}',
					},
				},
			},
		},
		{
			displayName: 'Archived',
			name: 'archived',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['projects'],
					operation: ['get-lists-for-project'],
				},
			},
			default: '',
			description: 'The archived parameter',
			routing: {
				request: {
					qs: {
						archived: '={{$parameter.archived}}',
					},
				},
			},
		},
		{
			displayName: 'Archived',
			name: 'archived',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['projects'],
					operation: ['get-tags-for-project'],
				},
			},
			default: '',
			description: 'The archived parameter',
			routing: {
				request: {
					qs: {
						archived: '={{$parameter.archived}}',
					},
				},
			},
		},
	{
		displayName: 'Task ID',
		name: 'taskId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['projects'],
				operation: ['get-task', 'create-attachment-for-task', 'update-task'],
			},
		},
		default: '',
		description: 'The ID of the task',
	},
		{
			displayName: 'Data',
			name: 'data',
			type: 'json',
			required: true,
			displayOptions: {
				show: {
					resource: ['projects'],
					operation: ['create-project'],
				},
			},
			default: '',
			description: 'The data to send',
			routing: {
				request: {
					body: {
						data: '={{JSON.parse($parameter.data)}}',
					},
				},
			},
		},
		{
			displayName: 'Data',
			name: 'data',
			type: 'json',
			required: true,
			displayOptions: {
				show: {
					resource: ['projects'],
					operation: ['create-task'],
				},
			},
			default: '',
			description: 'The data to send',
			routing: {
				request: {
					body: {
						data: '={{JSON.parse($parameter.data)}}',
					},
				},
			},
		},
		{
			displayName: 'Data',
			name: 'data',
			type: 'json',
			required: true,
			displayOptions: {
				show: {
					resource: ['projects'],
					operation: ['create-user-task'],
				},
			},
			default: '',
			description: 'The data to send',
			routing: {
				request: {
					body: {
						data: '={{JSON.parse($parameter.data)}}',
					},
				},
			},
		},
		{
			displayName: 'Data',
			name: 'data',
			type: 'json',
			required: true,
			displayOptions: {
				show: {
					resource: ['projects'],
					operation: ['create-list'],
				},
			},
			default: '',
			description: 'The data to send',
			routing: {
				request: {
					body: {
						data: '={{JSON.parse($parameter.data)}}',
					},
				},
			},
		},
		{
			displayName: 'Data',
			name: 'data',
			type: 'json',
			required: true,
			displayOptions: {
				show: {
					resource: ['projects'],
					operation: ['create-attachment-for-task'],
				},
			},
			default: '',
			description: 'The data to send',
			routing: {
				request: {
					body: {
						data: '={{JSON.parse($parameter.data)}}',
					},
				},
			},
		},
		{
			displayName: 'Data',
			name: 'data',
			type: 'json',
			required: true,
			displayOptions: {
				show: {
					resource: ['projects'],
					operation: ['update-project'],
				},
			},
			default: '',
			description: 'The data to send',
			routing: {
				request: {
					body: {
						data: '={{JSON.parse($parameter.data)}}',
					},
				},
			},
		},
		{
			displayName: 'Data',
			name: 'data',
			type: 'json',
			required: true,
			displayOptions: {
				show: {
					resource: ['projects'],
					operation: ['update-task'],
				},
			},
			default: '',
			description: 'The data to send',
			routing: {
				request: {
					body: {
						data: '={{JSON.parse($parameter.data)}}',
					},
				},
			},
		},
		{
			displayName: 'Data',
			name: 'data',
			type: 'json',
			required: true,
			displayOptions: {
				show: {
					resource: ['projects'],
					operation: ['update-list'],
				},
			},
			default: '',
			description: 'The data to send',
			routing: {
				request: {
					body: {
						data: '={{JSON.parse($parameter.data)}}',
					},
				},
			},
		},
];
