import type { INodeProperties } from 'n8n-workflow';

export const taskCenterOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['taskCenter'],
			},
		},
	default: 'list-queues',
	options: [
	{
		name: 'Complete Task',
		value: 'complete-task',
		action: 'Complete task',
		description: 'Completes the task with the values given in the body. The request body accepts an object containing key value pairs for each input property of the task in question.',
		routing: {
			request: {
				method: 'POST',
				url: '={{ "/api/queues/v1/" + $parameter.queueId + "/tasks/" + $parameter.taskId + "/complete" }}',
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
				url: '={{ "/api/queues/v1/" + $parameter.queueId + "/tasks" }}',
			},
		},
	},
	{
		name: 'Get Queue',
		value: 'get-queue',
		action: 'Get queue',
		description: 'Returns a queue by ID',
		routing: {
			request: {
				method: 'GET',
				url: '={{ "/api/queues/v1/" + $parameter.queueId }}',
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
				url: '={{ "/api/queues/v1/" + $parameter.queueId + "/tasks/" + $parameter.taskId }}',
			},
		},
	},
	{
		name: 'List Queues',
		value: 'list-queues',
		action: 'List queues',
		description: 'Returns all queues the signed-in user/token owner has access to',
		routing: {
			request: {
				method: 'GET',
				url: '/api/queues/v1',
			},
		},
	},
	{
		name: 'List Tasks',
		value: 'list-tasks',
		action: 'List tasks',
		description: 'Returns tasks based on the filters provided in the body. If the body is an empty object, it returns all tasks the user has access to.',
		routing: {
			request: {
				method: 'POST',
				url: '/api/queues/v1/tasks/list',
			},
		},
	},
	{
		name: 'Save Task Progress',
		value: 'save-task-progress',
		action: 'Save task progress',
		description: 'Saves current task values given in the body, which contains the key value pairs for each input property of the task in question. The request body accepts an object containing key value pairs for each input property of the task in question.',
		routing: {
			request: {
				method: 'PUT',
				url: '={{ "/api/queues/v1/" + $parameter.queueId + "/tasks/" + $parameter.taskId + "/outputs" }}',
			},
		},
	},
	{
		name: 'Search Queues',
		value: 'search-queues',
		action: 'Search queues',
		routing: {
			request: {
				method: 'POST',
				url: '/api/search/v1/query',
			},
		},
	},
	{
		name: 'Transfer Task to Another Queue',
		value: 'transfer-task-to-another-queue',
		action: 'Transfer task to another queue',
		routing: {
			request: {
				method: 'PUT',
				url: '={{ "/api/queues/v1/" + $parameter.currentQueueId + "/tasks/" + $parameter.taskId + "/move" }}',
			},
		},
	},
	{
		name: 'Transfer Task to Another User/Group',
		value: 'transfer-task-to-another-user-group',
		action: 'Transfer task to another user group',
		description: 'Transfer a task to another User. The request body accepts an object containing an array of task IDs, type and userId.',
		routing: {
			request: {
				method: 'PUT',
				url: '={{ "/api/queues/v1/" + $parameter.queueId + "/tasks/" + $parameter.taskId + "/assign" }}',
			},
		},
	},
	{
		name: 'Update Queue Owner',
		value: 'update-queue-owner',
		action: 'Update queue owner',
		routing: {
			request: {
				method: 'PUT',
				url: '={{ "/api/queues/v1/" + $parameter.queueId + "/owner/" + $parameter.ownerId }}',
			},
		},
	},
	{
		name: 'Update Queue Permissions',
		value: 'update-queue-permissions',
		action: 'Update queue permissions',
		description: 'Update a queue user/group permissions',
		routing: {
			request: {
				method: 'POST',
				url: '={{ "/api/queues/v1/" + $parameter.queueId + "/permissions" }}',
			},
		},
	},
	{
		name: 'Void Task',
		value: 'void-task',
		action: 'Void task',
		description: 'Void a task',
		routing: {
			request: {
				method: 'POST',
				url: '={{ "/api/queues/v1/" + $parameter.queueId + "/tasks/" + $parameter.taskId + "/void" }}',
			},
		},
	},
	],
	},
];

export const taskCenterFields: INodeProperties[] = [
	{
		displayName: 'Queue ID',
		name: 'queueId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['taskCenter'],
				operation: ['get-queue', 'get-task', 'save-task-progress', 'complete-task', 'transfer-task-to-another-user-group', 'void-task', 'create-task', 'update-queue-permissions', 'update-queue-owner'],
			},
		},
		default: '',
		description: 'The ID of the queue',
	},
	{
		displayName: 'Task ID',
		name: 'taskId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['taskCenter'],
				operation: ['get-task', 'save-task-progress', 'complete-task', 'transfer-task-to-another-queue', 'transfer-task-to-another-user-group', 'void-task'],
			},
		},
		default: '',
		description: 'The ID of the task',
	},
	{
		displayName: 'Current Queue ID',
		name: 'currentQueueId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['taskCenter'],
				operation: ['transfer-task-to-another-queue'],
			},
		},
		default: '',
		description: 'The ID of the current queue',
	},
	{
		displayName: 'Owner ID',
		name: 'ownerId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['taskCenter'],
				operation: ['update-queue-owner'],
			},
		},
		default: '',
		description: 'The ID of the owner',
	},
	{
		displayName: 'Data',
		name: 'data',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				resource: ['taskCenter'],
				operation: ['search-queues', 'list-tasks', 'save-task-progress', 'complete-task', 'transfer-task-to-another-user-group', 'create-task', 'update-queue-permissions'],
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
		displayName: 'CombineAttributes',
		name: 'combineAttributes',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['taskCenter'],
				operation: ['list-queues'],
			},
		},
		default: '',
		description: 'The combineAttributes parameter',
		routing: {
			request: {
				qs: {
					combineAttributes: '={{$parameter.combineAttributes}}',
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
					resource: ['taskCenter'],
					operation: ['list-queues'],
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
			displayName: 'Limit',
			name: 'limit',
			type: 'number',
			typeOptions: {
				minValue: 1,
			},
			displayOptions: {
				show: {
					resource: ['taskCenter'],
					operation: ['list-tasks'],
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
					resource: ['taskCenter'],
					operation: ['list-tasks'],
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
			displayName: 'Render',
			name: 'render',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['taskCenter'],
					operation: ['list-tasks'],
				},
			},
			default: '',
			description: 'The render parameter',
			routing: {
				request: {
					qs: {
						render: '={{$parameter.render}}',
					},
				},
			},
		},
		{
			displayName: 'RenderParts',
			name: 'renderParts',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['taskCenter'],
					operation: ['list-tasks'],
				},
			},
			default: '',
			description: 'The renderParts parameter',
			routing: {
				request: {
					qs: {
						renderParts: '={{$parameter.renderParts}}',
					},
				},
			},
		},
		{
			displayName: 'Direction',
			name: 'direction',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['taskCenter'],
					operation: ['list-tasks'],
				},
			},
			default: '',
			description: 'The direction parameter',
			routing: {
				request: {
					qs: {
						direction: '={{$parameter.direction}}',
					},
				},
			},
		},
		{
			displayName: 'OrderBy',
			name: 'orderBy',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['taskCenter'],
					operation: ['list-tasks'],
				},
			},
			default: '',
			description: 'The orderBy parameter',
			routing: {
				request: {
					qs: {
						orderBy: '={{$parameter.orderBy}}',
					},
				},
			},
		},
		{
			displayName: 'Render',
			name: 'render',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['taskCenter'],
					operation: ['get-task'],
				},
			},
			default: '',
			description: 'The render parameter',
			routing: {
				request: {
					qs: {
						render: '={{$parameter.render}}',
					},
				},
			},
		},
		{
			displayName: 'Version',
			name: 'version',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['taskCenter'],
					operation: ['complete-task'],
				},
			},
			default: '',
			description: 'The version parameter',
			routing: {
				request: {
					qs: {
						version: '={{$parameter.version}}',
					},
				},
			},
		},
		{
			displayName: 'TargetQueueId',
			name: 'targetQueueId',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['taskCenter'],
					operation: ['transfer-task-to-another-queue'],
				},
			},
			default: '',
			description: 'The targetQueueId parameter',
			routing: {
				request: {
					qs: {
						targetQueueId: '={{$parameter.targetQueueId}}',
					},
				},
			},
		},
];
