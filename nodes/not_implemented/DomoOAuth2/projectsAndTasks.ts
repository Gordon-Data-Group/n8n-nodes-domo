import type { INodeProperties } from 'n8n-workflow';

export const projectsAndTasksOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['projectsAndTasks'],
			},
		},
	default: 'retrieve-all-projects',
	options: [
	{
		name: 'Add Attachment',
		value: 'add-attachment',
		action: 'Add attachment',
		description: 'Add a multipart form file to a task item as an attachment',
		routing: {
			request: {
				method: 'POST',
				url: '/v1/projects/={{$parameter["PROJECT_ID"]}}/lists/={{$parameter["LIST_ID"]}}/tasks/={{$parameter["TASK_ID"]}}/attachments',
			},
		},
	},
	{
		name: 'Create a List',
		value: 'create-a-list',
		action: 'Create a list',
		description: 'Creates a new list within the given project ID',
		routing: {
			request: {
				method: 'POST',
				url: '/v1/projects/={{$parameter["PROJECT_ID"]}}/lists',
			},
		},
	},
	{
		name: 'Create a Project',
		value: 'create-a-project',
		action: 'Create a project',
		description: 'Create a new project in your Domo instance',
		routing: {
			request: {
				method: 'POST',
				url: '/v1/projects',
			},
		},
	},
	{
		name: 'Create a Task',
		value: 'create-a-task',
		action: 'Create a task',
		description: 'Add a task to a project list',
		routing: {
			request: {
				method: 'PUT',
				url: '/v1/projects/={{$parameter["PROJECT_ID"]}}/lists/={{$parameter["LIST_ID"]}}/tasks',
			},
		},
	},
	{
		name: 'Delete a List',
		value: 'delete-a-list',
		action: 'Delete a list',
		description: 'Permanently deletes a list from your Domo instance. Warning This is destructive and cannot be reversed.',
		routing: {
			request: {
				method: 'DELETE',
				url: '/v1/projects/={{$parameter["PROJECT_ID"]}}/lists/={{$parameter["LIST_ID"]}}',
			},
		},
	},
	{
		name: 'Delete a Project',
		value: 'delete-a-project',
		action: 'Delete a project',
		description: 'Permanently deletes a project from your Domo instance. Warning This is destructive and cannot be reversed.',
		routing: {
			request: {
				method: 'DELETE',
				url: '/v1/projects/={{$parameter["PROJECT_ID"]}}',
			},
		},
	},
	{
		name: 'Delete an Attachment',
		value: 'delete-an-attachment',
		action: 'Delete an attachment',
		description: 'Permanently deletes an attachment from your task. Warning This is destructive and cannot be reversed.',
		routing: {
			request: {
				method: 'DELETE',
				url: '/v1/project/={{$parameter["PROJECT_ID"]}}/tasks/={{$parameter["TASK_ID"]}}/attachments/={{$parameter["ATTACHMENT_ID"]}}',
			},
		},
	},
	{
		name: 'Download Attachment',
		value: 'download-attachment',
		action: 'Download attachment',
		description: 'Downloads an individual attachment given an attachment ID',
		routing: {
			request: {
				method: 'GET',
				url: '/v1/projects/={{$parameter["PROJECT_ID"]}}/lists/={{$parameter["LIST_ID"]}}/tasks/={{$parameter["TASK_ID"]}}/attachments/={{$parameter["ATTACHMENT_ID"]}}',
			},
		},
	},
	{
		name: 'Retrieve All List Tasks',
		value: 'retrieve-all-list-tasks',
		action: 'Retrieve all list tasks',
		description: 'Retrieves all tasks from a given project ID and list ID',
		routing: {
			request: {
				method: 'GET',
				url: '/v1/projects/={{$parameter["PROJECT_ID"]}}/lists/={{$parameter["LIST_ID"]}}/tasks',
			},
		},
	},
	{
		name: 'Retrieve All Project Lists',
		value: 'retrieve-all-project-lists',
		action: 'Retrieve all project lists',
		description: 'Retrieves all lists available within a given project ID',
		routing: {
			request: {
				method: 'GET',
				url: '/v1/projects/={{$parameter["PROJECT_ID"]}}/lists',
			},
		},
	},
	{
		name: 'Retrieve All Project Tasks',
		value: 'retrieve-all-project-tasks',
		action: 'Retrieve all project tasks',
		description: 'Retrieves all tasks from a given project ID',
		routing: {
			request: {
				method: 'GET',
				url: '/v1/projects/={{$parameter["PROJECT_ID"]}}/tasks',
			},
		},
	},
	{
		name: 'Retrieve All Projects',
		value: 'retrieve-all-projects',
		action: 'Retrieve all projects',
		description: 'Retrieves a list of all projects that the client scope has access to',
		routing: {
			request: {
				method: 'GET',
				url: '/v1/projects',
			},
		},
	},
	{
		name: 'Retrieve Individual List',
		value: 'retrieve-individual-list',
		action: 'Retrieve individual list',
		description: 'Retrieves the details of an individual list given a project ID and a list ID',
		routing: {
			request: {
				method: 'GET',
				url: '/v1/projects/={{$parameter["PROJECT_ID"]}}/lists/={{$parameter["LIST_ID"]}}',
			},
		},
	},
	{
		name: 'Retrieve Individual Project',
		value: 'retrieve-individual-project',
		action: 'Retrieve individual project',
		description: 'Retrieves the details of an individual existing project given a project ID. Use the special project ID me to return your personal project.',
		routing: {
			request: {
				method: 'GET',
				url: '/v1/projects/={{$parameter["PROJECT_ID"]}}',
			},
		},
	},
	{
		name: 'Retrieve Individual Task',
		value: 'retrieve-individual-task',
		action: 'Retrieve individual task',
		description: 'Retrieves an individual task from a given project ID and list ID',
		routing: {
			request: {
				method: 'GET',
				url: '/v1/projects/={{$parameter["PROJECT_ID"]}}/lists/={{$parameter["LIST_ID"]}}/tasks/={{$parameter["TASK_ID"]}}',
			},
		},
	},
	{
		name: 'Retrieve List of Attachments',
		value: 'retrieve-list-of-attachments',
		action: 'Retrieve list of attachments',
		description: 'Retrieve details about all of the attachments belonging to a particular task',
		routing: {
			request: {
				method: 'GET',
				url: '/v1/projects/={{$parameter["PROJECT_ID"]}}/lists/={{$parameter["LIST_ID"]}}/tasks/={{$parameter["TASK_ID"]}}/attachments',
			},
		},
	},
	{
		name: 'Retrieve Project Members',
		value: 'retrieve-project-members',
		action: 'Retrieve project members',
		description: 'Retrieves a list of IDs of the users that are members of the given project ID',
		routing: {
			request: {
				method: 'GET',
				url: '/v1/projects/={{$parameter["PROJECT_ID"]}}/members',
			},
		},
	},
	{
		name: 'Update a List',
		value: 'update-a-list',
		action: 'Update a list',
		description: 'Update the details of a list given an existing project ID and list ID',
		routing: {
			request: {
				method: 'PUT',
				url: '/v1/projects/={{$parameter["PROJECT_ID"]}}/lists/={{$parameter["LIST_ID"]}}',
			},
		},
	},
	{
		name: 'Update a Project',
		value: 'update-a-project',
		action: 'Update a project',
		description: 'Updates attributes of an existing project in your Domo instance. The following properties are read-only and cannot be updated with this request.',
		routing: {
			request: {
				method: 'PUT',
				url: '/v1/projects/={{$parameter["PROJECT_ID"]}}',
			},
		},
	},
	{
		name: 'Update a Task',
		value: 'update-a-task',
		action: 'Update a task',
		description: 'Update the details of a task given an existing project ID, list ID, and task ID',
		routing: {
			request: {
				method: 'PUT',
				url: '/v1/projects/={{$parameter["PROJECT_ID"]}}/lists/={{$parameter["LIST_ID"]}}/tasks/={{$parameter["TASK_ID"]}}',
			},
		},
	},
	{
		name: 'Update Project Members',
		value: 'update-project-members',
		action: 'Update project members',
		description: 'Update the members of a given project ID',
		routing: {
			request: {
				method: 'PUT',
				url: '/v1/projects/={{$parameter["PROJECT_ID"]}}/members',
			},
		},
	},
		],
	},
];

export const projectsAndTasksFields: INodeProperties[] = [
	{
		displayName: 'Project ID',
		name: 'PROJECT_ID',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['projectsAndTasks'],
				operation: ['retrieve-individual-project', 'update-a-project', 'delete-a-project', 'delete-an-attachment', 'retrieve-project-members', 'update-project-members', 'retrieve-all-project-lists', 'create-a-list', 'retrieve-individual-list', 'update-a-list', 'delete-a-list', 'retrieve-all-project-tasks', 'retrieve-all-list-tasks', 'retrieve-individual-task', 'update-a-task', 'create-a-task', 'retrieve-list-of-attachments', 'add-attachment', 'download-attachment'],
			},
		},
		default: '',
		description: 'The ID of the project',
	},
	{
		displayName: 'List ID',
		name: 'LIST_ID',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['projectsAndTasks'],
				operation: ['retrieve-individual-list', 'update-a-list', 'delete-a-list', 'retrieve-all-list-tasks', 'retrieve-individual-task', 'update-a-task', 'create-a-task', 'retrieve-list-of-attachments', 'add-attachment', 'download-attachment'],
			},
		},
		default: '',
		description: 'The ID of the list',
	},
	{
		displayName: 'Task ID',
		name: 'TASK_ID',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['projectsAndTasks'],
				operation: ['delete-an-attachment', 'retrieve-individual-task', 'update-a-task', 'retrieve-list-of-attachments', 'add-attachment', 'download-attachment'],
			},
		},
		default: '',
		description: 'The ID of the task',
	},
	{
		displayName: 'Attachment ID',
		name: 'ATTACHMENT_ID',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['projectsAndTasks'],
				operation: ['delete-an-attachment', 'download-attachment'],
			},
		},
		default: '',
		description: 'The ID of the attachment',
	},
	{
		displayName: 'Data',
		name: 'data',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				resource: ['projectsAndTasks'],
				operation: ['create-a-project', 'update-a-project', 'update-project-members', 'create-a-list', 'update-a-list', 'update-a-task', 'create-a-task'],
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
				resource: ['projectsAndTasks'],
				operation: ['retrieve-all-project-tasks', 'retrieve-all-list-tasks'],
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
				resource: ['projectsAndTasks'],
				operation: ['retrieve-all-project-tasks', 'retrieve-all-list-tasks'],
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
