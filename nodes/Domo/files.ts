import type { INodeProperties } from 'n8n-workflow';

export const filesOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['files'],
			},
		},
		default: 'create-file',
		options: [
		{
			name: 'Create File',
			value: 'create-file',
			action: 'Create file',
			description: 'Include file in body as binary',
			routing: {
				request: {
					method: 'POST',
					url: '/data/v1/data-files',
				},
			},
		},
		{
			name: 'Create File Card',
			value: 'create-file-card',
			action: 'Create file card',
			routing: {
				request: {
					method: 'POST',
					url: '/content/v1/cards',
				},
			},
		},
		{
			name: 'Get File Details',
			value: 'get-file-details',
			action: 'Get file details',
			routing: {
				request: {
					method: 'GET',
					url: '/data/v1/data-files/={{$parameter.id}}/details',
				},
			},
		},
		{
			name: 'Get Revision',
			value: 'get-revision',
			action: 'Get revision',
			routing: {
				request: {
					method: 'GET',
					url: '/data/v1/data-files/={{$parameter.fileId}}/revisions/={{$parameter.revisionId}}',
				},
			},
		},
		{
			name: 'Get Revision Details',
			value: 'get-revision-details',
			action: 'Get revision details',
			routing: {
				request: {
					method: 'GET',
					url: '/data/v1/data-files/={{$parameter.fileId}}/revisions/={{$parameter.revisionId}}/details',
				},
			},
		},
		{
			name: 'Update File',
			value: 'update-file',
			action: 'Update file',
			description: 'Include new file version in body as binary',
			routing: {
				request: {
					method: 'PUT',
					url: '/data/v1/data-files/={{$parameter.id}}',
				},
			},
		},
		{
			name: 'Update File Card',
			value: 'update-file-card',
			action: 'Update file card',
			routing: {
				request: {
					method: 'PUT',
					url: '/content/v1/cards/={{$parameter.id}}',
				},
			},
		},
		],
	},
];

export const filesFields: INodeProperties[] = [
		{
			displayName: 'FileId ID',
			name: 'fileId',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					resource: ['files'],
					operation: ['get-revision'],
				},
			},
			default: '',
			description: 'The ID of the fileId',
		},
		{
			displayName: 'RevisionId ID',
			name: 'revisionId',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					resource: ['files'],
					operation: ['get-revision'],
				},
			},
			default: '',
			description: 'The ID of the revisionId',
		},
		{
			displayName: 'FileName',
			name: 'fileName',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['files'],
					operation: ['get-revision'],
				},
			},
			default: '',
			description: 'The fileName parameter',
			routing: {
				request: {
					qs: {
						fileName: '={{$parameter.fileName}}',
					},
				},
			},
		},
		{
			displayName: 'FileId ID',
			name: 'fileId',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					resource: ['files'],
					operation: ['get-revision-details'],
				},
			},
			default: '',
			description: 'The ID of the fileId',
		},
		{
			displayName: 'RevisionId ID',
			name: 'revisionId',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					resource: ['files'],
					operation: ['get-revision-details'],
				},
			},
			default: '',
			description: 'The ID of the revisionId',
		},
		{
			displayName: 'ID ID',
			name: 'id',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					resource: ['files'],
					operation: ['get-file-details'],
				},
			},
		default: '',
		description: 'The ID',
		},
		{
			displayName: 'Expand',
			name: 'expand',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['files'],
					operation: ['get-file-details'],
				},
			},
			default: '',
			description: 'The expand parameter',
			routing: {
				request: {
					qs: {
						expand: '={{$parameter.expand}}',
					},
				},
			},
		},
		{
			displayName: 'Name',
			name: 'name',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['files'],
					operation: ['create-file'],
				},
			},
			default: '',
			description: 'The name parameter',
			routing: {
				request: {
					qs: {
						name: '={{$parameter.name}}',
					},
				},
			},
		},
		{
			displayName: 'Public',
			name: 'public',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['files'],
					operation: ['create-file'],
				},
			},
			default: '',
			description: 'The public parameter',
			routing: {
				request: {
					qs: {
						public: '={{$parameter.public}}',
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
					resource: ['files'],
					operation: ['create-file-card'],
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
			displayName: 'PageId',
			name: 'pageId',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['files'],
					operation: ['create-file-card'],
				},
			},
			default: '',
			description: 'The pageId parameter',
			routing: {
				request: {
					qs: {
						pageId: '={{$parameter.pageId}}',
					},
				},
			},
		},
		{
			displayName: 'ID ID',
			name: 'id',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					resource: ['files'],
					operation: ['update-file'],
				},
			},
		default: '',
		description: 'The ID',
		},
		{
			displayName: 'Public',
			name: 'public',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['files'],
					operation: ['update-file'],
				},
			},
			default: '',
			description: 'The public parameter',
			routing: {
				request: {
					qs: {
						public: '={{$parameter.public}}',
					},
				},
			},
		},
		{
			displayName: 'Description',
			name: 'description',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['files'],
					operation: ['update-file'],
				},
			},
			default: '',
			description: 'The description parameter',
			routing: {
				request: {
					qs: {
						description: '={{$parameter.description}}',
					},
				},
			},
		},
		{
			displayName: 'ID ID',
			name: 'id',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					resource: ['files'],
					operation: ['update-file-card'],
				},
			},
		default: '',
		description: 'The ID',
		},
		{
			displayName: 'Data',
			name: 'data',
			type: 'json',
			required: true,
			displayOptions: {
				show: {
					resource: ['files'],
					operation: ['update-file-card'],
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
