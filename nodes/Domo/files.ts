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
		default: 'getFileDetails',
		options: [
			{
				name: 'Create File',
				value: 'createFile',
				action: 'Create file',
				description: 'Include file in body as binary',
				routing: {
					request: {
						method: 'POST',
						url: '/api/data/v1/data-files',
						qs: {
							name: '={{$parameter.name}}',
							public: '={{$parameter.public}}',
						},
					},
				},
			},
			{
				name: 'Create File Card',
				value: 'createFileCard',
				action: 'Create file card',
				routing: {
					request: {
						method: 'POST',
						url: '/api/content/v1/cards',
						qs: {
							pageId: '={{$parameter.pageId}}',
						},
						body: '={{JSON.parse($parameter.cardData)}}',
					},
				},
			},
			{
				name: 'Get File Details',
				value: 'getFileDetails',
				action: 'Get file details',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/data/v1/data-files/" + $parameter.fileId + "/details" }}',
						qs: {
							expand: '={{$parameter.expand}}',
						},
					},
				},
			},
			{
				name: 'Get Revision',
				value: 'getRevision',
				action: 'Get revision',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/data/v1/data-files/" + $parameter.fileId + "/revisions/" + $parameter.revisionId }}',
						qs: {
							fileName: '={{$parameter.fileName}}',
						},
					},
				},
			},
			{
				name: 'Get Revision Details',
				value: 'getRevisionDetails',
				action: 'Get revision details',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/data/v1/data-files/" + $parameter.fileId + "/revisions/" + $parameter.revisionId + "/details" }}',
					},
				},
			},
			{
				name: 'Update File',
				value: 'updateFile',
				action: 'Update file',
				description: 'Include new file version in body as binary',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/data/v1/data-files/" + $parameter.fileId }}',
						qs: {
							public: '={{$parameter.public}}',
							description: '={{$parameter.description}}',
						},
					},
				},
			},
			{
				name: 'Update File Card',
				value: 'updateFileCard',
				action: 'Update file card',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/content/v1/cards/" + $parameter.cardId }}',
						body: '={{JSON.parse($parameter.cardData)}}',
					},
				},
			},
		],
	},
];

export const filesFields: INodeProperties[] = [
	// File ID field
	{
		displayName: 'File ID',
		name: 'fileId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['files'],
				operation: ['getFileDetails', 'getRevision', 'getRevisionDetails', 'updateFile'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the file',
	},
	// Revision ID field
	{
		displayName: 'Revision ID',
		name: 'revisionId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['files'],
				operation: ['getRevision', 'getRevisionDetails'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the revision',
	},
	// Card ID field
	{
		displayName: 'Card ID',
		name: 'cardId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['files'],
				operation: ['updateFileCard'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the card',
	},
	// Query params
	{
		displayName: 'File Name',
		name: 'fileName',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['files'],
				operation: ['getRevision'],
			},
		},
		default: '',
		description: 'The file name parameter',
	},
	{
		displayName: 'Expand',
		name: 'expand',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['files'],
				operation: ['getFileDetails'],
			},
		},
		default: '',
		description: 'The expand parameter',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['files'],
				operation: ['createFile'],
			},
		},
		default: '',
		description: 'The name of the file',
	},
	{
		displayName: 'Public',
		name: 'public',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['files'],
				operation: ['createFile', 'updateFile'],
			},
		},
		default: '',
		description: 'Whether the file is public',
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['files'],
				operation: ['updateFile'],
			},
		},
		default: '',
		description: 'The description of the file',
	},
	{
		displayName: 'Page ID',
		name: 'pageId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['files'],
				operation: ['createFileCard'],
			},
		},
		default: '',
		description: 'The page ID parameter',
	},
	// Body params
	{
		displayName: 'Card Data',
		name: 'cardData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['files'],
				operation: ['createFileCard', 'updateFileCard'],
			},
		},
		default: '',
		placeholder: '{"type":"document","description":"Description","metadata":{"title":"Title","documentID":"123:123","kpiType":"document"}}',
		required: true,
		description: 'JSON object containing card configuration',
	},
];
