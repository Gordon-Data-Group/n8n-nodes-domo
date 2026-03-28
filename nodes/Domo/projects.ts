import { IExecuteSingleFunctions, IHttpRequestOptions, INodeProperties } from 'n8n-workflow';
import { preSendLogger } from './shared/preSendLogger';

// ─── preSend helpers ──────────────────────────────────────────────────────────

async function preSendCreateProject(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const projectName = this.getNodeParameter('projectName') as string;
	const description = this.getNodeParameter('description') as string;
	const hidden = this.getNodeParameter('hidden') as boolean;
	const membersRaw = this.getNodeParameter('members') as string;
	const dueDate = this.getNodeParameter('dueDate') as string;

	const members: number[] = membersRaw
		? membersRaw
				.split(',')
				.map((s) => parseInt(s.trim(), 10))
				.filter((n) => !isNaN(n))
		: [];

	const body: Record<string, unknown> = { projectName, hidden, members };
	if (description) body.description = description;
	if (dueDate) body.dueDate = dueDate;

	requestOptions.body = body;
	return requestOptions;
}

async function preSendCreateTask(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const taskName = this.getNodeParameter('taskName') as string;
	const disabled = this.getNodeParameter('disabled') as boolean;
	const priority = this.getNodeParameter('priority') as number;
	const ownersData = this.getNodeParameter('owners') as { owner: Array<{ userId: number }> };

	const owners: number[] = ownersData?.owner ? ownersData.owner.map((o) => o.userId) : [];

	requestOptions.body = { taskName, disabled, owners, priority };
	return requestOptions;
}

async function preSendCreateUserTask(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const taskName = this.getNodeParameter('taskName') as string;
	const dueDate = this.getNodeParameter('dueDate') as string;
	const primaryTaskOwner = this.getNodeParameter('primaryTaskOwner') as number;
	const description = this.getNodeParameter('description') as string;
	const tagsRaw = this.getNodeParameter('tags') as string;
	const contributorsRaw = this.getNodeParameter('contributors') as string;

	const tags: string[] = tagsRaw ? tagsRaw.split(',').map((s) => s.trim()).filter(Boolean) : [];
	const contributors: number[] = contributorsRaw
		? contributorsRaw
				.split(',')
				.map((s) => parseInt(s.trim(), 10))
				.filter((n) => !isNaN(n))
		: [];

	const body: Record<string, unknown> = { taskName, primaryTaskOwner };
	if (dueDate) body.dueDate = dueDate;
	if (description) body.description = description;
	if (tags.length) body.tags = tags;
	if (contributors.length) body.contributors = contributors;

	requestOptions.body = body;
	return requestOptions;
}

async function preSendUpdateList(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const name = this.getNodeParameter('listName') as string;
	const type = this.getNodeParameter('listType') as string;
	const listOrder = this.getNodeParameter('listOrder') as number;
	const archived = this.getNodeParameter('archived') as boolean;

	requestOptions.body = { name, type, listOrder, archived };
	return requestOptions;
}

// ─── Operations ───────────────────────────────────────────────────────────────

export const projectsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: { show: { resource: ['projects'] } },
		options: [
			{
				name: 'Create Attachment for Task',
				value: 'createAttachmentForTask',
				action: 'Create an attachment for a task',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/content/v1/tasks/{{$parameter.taskId}}/attachments',
						body: {
							dataFileId: '={{$parameter.dataFileId}}',
							name: '={{$parameter.attachmentName}}',
							type: '={{$parameter.attachmentType}}',
							previewImage: '={{$parameter.previewImage}}',
						},
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Create List',
				value: 'createList',
				action: 'Create a list in a project',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/content/v1/projects/{{$parameter.projectId}}/lists',
						body: {
							name: '={{$parameter.listName}}',
							type: '={{$parameter.listType}}',
							listOrder: '={{$parameter.listOrder}}',
						},
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Create Project',
				value: 'createProject',
				action: 'Create a project',
				routing: {
					request: {
						method: 'POST',
						url: '/api/content/v1/projects',
					},
					send: {
						preSend: [preSendCreateProject, preSendLogger],
					},
				},
			},
			{
				name: 'Create Task',
				value: 'createTask',
				action: 'Create a task in a project list',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/content/v1/projects/{{$parameter.projectId}}/lists/{{$parameter.listId}}/tasks',
					},
					send: {
						preSend: [preSendCreateTask, preSendLogger],
					},
				},
			},
			{
				name: 'Create User Task',
				value: 'createUserTask',
				action: 'Create a personal task for a user',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/content/v2/users/{{$parameter.userId}}/tasks',
					},
					send: {
						preSend: [preSendCreateUserTask, preSendLogger],
					},
				},
			},
			{
				name: 'Delete Project',
				value: 'deleteProject',
				action: 'Delete a project',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/content/v1/projects/{{$parameter.projectId}}',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Get Lists for Project',
				value: 'getListsForProject',
				action: 'Get lists for a project',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/content/v1/projects/{{$parameter.projectId}}/lists',
						qs: {
							archived: '={{$parameter.archivedFilter}}',
						},
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Get Project',
				value: 'getProject',
				action: 'Get a project by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/content/v1/projects/{{$parameter.projectId}}',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Get Projects for User',
				value: 'getProjectsForUser',
				action: 'Get projects for a user',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/content/v2/users/{{$parameter.userId}}/projects',
						qs: {
							limit: '={{$parameter.limit}}',
							offset: '={{$parameter.offset}}',
							status: '={{$parameter.statusFilter || undefined}}',
						},
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Get Tags for Project',
				value: 'getTagsForProject',
				action: 'Get tags for a project',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/content/v1/projects/{{$parameter.projectId}}/tags',
						qs: {
							archived: '={{$parameter.archivedFilter}}',
						},
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Get Task',
				value: 'getTask',
				action: 'Get a task by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/content/v1/tasks/{{$parameter.taskId}}',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Get Task Assignments for User',
				value: 'getTaskAssignmentsForUser',
				action: 'Get task assignments for a user',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/content/v2/users/{{$parameter.userId}}/tasks/assignments',
						qs: {
							limit: '={{$parameter.limit}}',
							offset: '={{$parameter.offset}}',
							status: '={{$parameter.statusFilter || undefined}}',
						},
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Get Tasks for List',
				value: 'getTasksForList',
				action: 'Get tasks for a project list',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/content/v1/projects/{{$parameter.projectId}}/lists/{{$parameter.listId}}/tasks',
						qs: {
							fields: '={{$parameter.fields || undefined}}',
						},
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Get Tasks for Project',
				value: 'getTasksForProject',
				action: 'Get tasks for a project',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/content/v1/projects/{{$parameter.projectId}}/tasks',
						qs: {
							search: '={{$parameter.search || undefined}}',
							archived: '={{$parameter.archivedFilter}}',
							assignedToOwnerId: '={{$parameter.assignedToOwnerId || undefined}}',
						},
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'List Projects',
				value: 'listProjects',
				action: 'List all projects',
				routing: {
					request: {
						method: 'GET',
						url: '/api/content/v1/projects',
						qs: {
							limit: '={{$parameter.limit}}',
							offset: '={{$parameter.offset}}',
							status: '={{$parameter.statusFilter || undefined}}',
						},
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'List Tags',
				value: 'listTags',
				action: 'List all project tags',
				routing: {
					request: {
						method: 'GET',
						url: '/api/content/v1/tags',
						qs: {
							q: '={{$parameter.q || undefined}}',
						},
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Update List',
				value: 'updateList',
				action: 'Update a project list',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/content/v1/projects/{{$parameter.projectId}}/lists/{{$parameter.listId}}',
					},
					send: {
						preSend: [preSendUpdateList, preSendLogger],
					},
				},
			},
			{
				name: 'Update Project',
				value: 'updateProject',
				action: 'Update a project',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/content/v1/projects/{{$parameter.projectId}}',
						body: '={{JSON.parse($parameter.projectData)}}',
					},
					send: { preSend: [preSendLogger] },
				},
			},
			{
				name: 'Update Task',
				value: 'updateTask',
				action: 'Update a task',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/content/v1/tasks/{{$parameter.taskId}}',
						body: '={{JSON.parse($parameter.taskData)}}',
					},
					send: { preSend: [preSendLogger] },
				},
			},
		],
		default: 'listProjects',
	},
];

// ─── Fields ───────────────────────────────────────────────────────────────────

export const projectsFields: INodeProperties[] = [
	// ── Shared: projectId ────────────────────────────────────────────────────
	{
		displayName: 'Project ID',
		name: 'projectId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['projects'],
				operation: [
					'createList',
					'createTask',
					'deleteProject',
					'getListsForProject',
					'getProject',
					'getTagsForProject',
					'getTasksForList',
					'getTasksForProject',
					'updateList',
					'updateProject',
				],
			},
		},
	},

	// ── Shared: taskId ────────────────────────────────────────────────────────
	{
		displayName: 'Task ID',
		name: 'taskId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['projects'],
				operation: ['createAttachmentForTask', 'getTask', 'updateTask'],
			},
		},
	},

	// ── Shared: listId ────────────────────────────────────────────────────────
	{
		displayName: 'List ID',
		name: 'listId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['projects'],
				operation: ['createTask', 'getTasksForList', 'updateList'],
			},
		},
	},

	// ── Shared: userId ────────────────────────────────────────────────────────
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['projects'],
				operation: ['createUserTask', 'getProjectsForUser', 'getTaskAssignmentsForUser'],
			},
		},
	},

	// ── List Projects / Get Projects for User / Get Task Assignments ──────────
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 50,
		typeOptions: { minValue: 1 },
		displayOptions: {
			show: {
				resource: ['projects'],
				operation: ['listProjects', 'getProjectsForUser', 'getTaskAssignmentsForUser'],
			},
		},
	},
	{
		displayName: 'Offset',
		name: 'offset',
		type: 'number',
		default: 0,
		typeOptions: { minValue: 0 },
		displayOptions: {
			show: {
				resource: ['projects'],
				operation: ['listProjects', 'getProjectsForUser', 'getTaskAssignmentsForUser'],
			},
		},
	},
	{
		displayName: 'Status Filter',
		name: 'statusFilter',
		type: 'options',
		default: '',
		options: [
			{ name: 'Any', value: '' },
			{ name: 'Active', value: 'active' },
			{ name: 'Completed', value: 'completed' },
		],
		displayOptions: {
			show: {
				resource: ['projects'],
				operation: ['listProjects', 'getProjectsForUser', 'getTaskAssignmentsForUser'],
			},
		},
	},

	// ── List Tags ─────────────────────────────────────────────────────────────
	{
		displayName: 'Search Query',
		name: 'q',
		type: 'string',
		default: '',
		description: 'Filter tags by name',
		displayOptions: {
			show: {
				resource: ['projects'],
				operation: ['listTags'],
			},
		},
	},

	// ── Archived filter (Get Lists, Get Tags, Get Tasks for Project) ───────────
	{
		displayName: 'Show Archived',
		name: 'archivedFilter',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['projects'],
				operation: ['getListsForProject', 'getTagsForProject', 'getTasksForProject'],
			},
		},
	},

	// ── Get Tasks for List ─────────────────────────────────────────────────────
	{
		displayName: 'Fields',
		name: 'fields',
		type: 'string',
		default: '',
		description: 'Comma-separated list of fields to return',
		displayOptions: {
			show: {
				resource: ['projects'],
				operation: ['getTasksForList'],
			},
		},
	},

	// ── Get Tasks for Project ─────────────────────────────────────────────────
	{
		displayName: 'Search',
		name: 'search',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['projects'],
				operation: ['getTasksForProject'],
			},
		},
	},
	{
		displayName: 'Assigned To Owner ID',
		name: 'assignedToOwnerId',
		type: 'number',
		default: 0,
		description: 'Filter tasks by assigned owner user ID (0 = no filter)',
		displayOptions: {
			show: {
				resource: ['projects'],
				operation: ['getTasksForProject'],
			},
		},
	},

	// ── Create Project ────────────────────────────────────────────────────────
	{
		displayName: 'Project Name',
		name: 'projectName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['projects'],
				operation: ['createProject'],
			},
		},
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['projects'],
				operation: ['createProject', 'createUserTask'],
			},
		},
	},
	{
		displayName: 'Hidden',
		name: 'hidden',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['projects'],
				operation: ['createProject'],
			},
		},
	},
	{
		displayName: 'Members',
		name: 'members',
		type: 'string',
		default: '',
		description: 'Comma-separated list of user IDs to add as members',
		displayOptions: {
			show: {
				resource: ['projects'],
				operation: ['createProject'],
			},
		},
	},
	{
		displayName: 'Due Date',
		name: 'dueDate',
		type: 'string',
		default: '',
		description: 'Due date in ISO 8601 format (e.g. 2024-12-31T00:00:00.000Z)',
		displayOptions: {
			show: {
				resource: ['projects'],
				operation: ['createProject', 'createUserTask'],
			},
		},
	},

	// ── Create Task ───────────────────────────────────────────────────────────
	{
		displayName: 'Task Name',
		name: 'taskName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['projects'],
				operation: ['createTask', 'createUserTask'],
			},
		},
	},
	{
		displayName: 'Disabled',
		name: 'disabled',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['projects'],
				operation: ['createTask'],
			},
		},
	},
	{
		displayName: 'Priority',
		name: 'priority',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['projects'],
				operation: ['createTask'],
			},
		},
	},
	{
		displayName: 'Owners',
		name: 'owners',
		type: 'fixedCollection',
		typeOptions: { multipleValues: true },
		default: {},
		description: 'Users assigned as task owners',
		displayOptions: {
			show: {
				resource: ['projects'],
				operation: ['createTask'],
			},
		},
		options: [
			{
				name: 'owner',
				displayName: 'Owner',
				values: [
					{
						displayName: 'User ID',
						name: 'userId',
						type: 'number',
						default: 0,
					},
				],
			},
		],
	},

	// ── Create User Task ──────────────────────────────────────────────────────
	{
		displayName: 'Primary Task Owner',
		name: 'primaryTaskOwner',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['projects'],
				operation: ['createUserTask'],
			},
		},
	},
	{
		displayName: 'Tags',
		name: 'tags',
		type: 'string',
		default: '',
		description: 'Comma-separated list of tag strings',
		displayOptions: {
			show: {
				resource: ['projects'],
				operation: ['createUserTask'],
			},
		},
	},
	{
		displayName: 'Contributors',
		name: 'contributors',
		type: 'string',
		default: '',
		description: 'Comma-separated list of user IDs',
		displayOptions: {
			show: {
				resource: ['projects'],
				operation: ['createUserTask'],
			},
		},
	},

	// ── Create List ───────────────────────────────────────────────────────────
	{
		displayName: 'List Name',
		name: 'listName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['projects'],
				operation: ['createList', 'updateList'],
			},
		},
	},
	{
		displayName: 'List Type',
		name: 'listType',
		type: 'options',
		default: 'todo',
		options: [
			{ name: 'To Do', value: 'todo' },
			{ name: 'In Progress', value: 'workingOn' },
			{ name: 'Completed', value: 'complete' },
		],
		displayOptions: {
			show: {
				resource: ['projects'],
				operation: ['createList', 'updateList'],
			},
		},
	},
	{
		displayName: 'List Order',
		name: 'listOrder',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['projects'],
				operation: ['createList', 'updateList'],
			},
		},
	},

	// ── Update List ───────────────────────────────────────────────────────────
	{
		displayName: 'Archived',
		name: 'archived',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['projects'],
				operation: ['updateList'],
			},
		},
	},

	// ── Create Attachment for Task ────────────────────────────────────────────
	{
		displayName: 'Data File ID',
		name: 'dataFileId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['projects'],
				operation: ['createAttachmentForTask'],
			},
		},
	},
	{
		displayName: 'Attachment Name',
		name: 'attachmentName',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['projects'],
				operation: ['createAttachmentForTask'],
			},
		},
	},
	{
		displayName: 'Attachment Type',
		name: 'attachmentType',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['projects'],
				operation: ['createAttachmentForTask'],
			},
		},
	},
	{
		displayName: 'Preview Image',
		name: 'previewImage',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['projects'],
				operation: ['createAttachmentForTask'],
			},
		},
	},

	// ── Update Project ────────────────────────────────────────────────────────
	{
		displayName: 'Project Data (JSON)',
		name: 'projectData',
		type: 'string',
		required: true,
		default: '{}',
		typeOptions: { rows: 6 },
		description: 'Full project object as JSON',
		displayOptions: {
			show: {
				resource: ['projects'],
				operation: ['updateProject'],
			},
		},
	},

	// ── Update Task ───────────────────────────────────────────────────────────
	{
		displayName: 'Task Data (JSON)',
		name: 'taskData',
		type: 'string',
		required: true,
		default: '{}',
		typeOptions: { rows: 6 },
		description: 'Full task object as JSON',
		displayOptions: {
			show: {
				resource: ['projects'],
				operation: ['updateTask'],
			},
		},
	},

	// ── Request Options (all operations) ─────────────────────────────────────
	{
		displayName: 'Request Options',
		name: 'requestOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['projects'],
			},
		},
		options: [
			{
				displayName: 'Return Full Response',
				name: 'returnFullResponse',
				type: 'boolean',
				default: false,
			},
		],
	},
];
