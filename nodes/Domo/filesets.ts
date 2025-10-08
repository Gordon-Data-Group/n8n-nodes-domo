import type { INodeProperties } from 'n8n-workflow';

export const filesetsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['filesets'],
			},
		},
	default: 'list-search-filesets',
	options: [
	{
		name: 'Create FileSet',
		value: 'create-fileset',
		action: 'Create file set',
		routing: {
			request: {
				method: 'POST',
				url: '/files/v1/filesets',
			},
		},
	},
	{
		name: 'Create Folder',
		value: 'create-folder',
		action: 'Create folder',
		routing: {
			request: {
				method: 'POST',
				url: '/files/v1/filesets/={{$parameter.filesetId}}/files',
			},
		},
	},
	{
		name: 'Delete File',
		value: 'delete-file',
		action: 'Delete file',
		routing: {
			request: {
				method: 'DELETE',
				url: '/files/v1/filesets/={{$parameter.filesetId}}/files/={{$parameter.fileId}}',
			},
		},
	},
	{
		name: 'Delete File by Path',
		value: 'delete-file-by-path',
		action: 'Delete file by path',
		routing: {
			request: {
				method: 'DELETE',
				url: '/files/v1/filesets/={{$parameter.filesetId}}/path',
			},
		},
	},
	{
		name: 'Delete FileSet',
		value: 'delete-fileset',
		action: 'Delete file set',
		routing: {
			request: {
				method: 'DELETE',
				url: '/files/v1/filesets/={{$parameter.id}}',
			},
		},
	},
	{
		name: 'Download File',
		value: 'download-file',
		action: 'Download file',
		description: 'ResponseEntity with no content–the file will be downloaded via a redirect',
		routing: {
			request: {
				method: 'GET',
				url: '/files/v1/filesets/={{$parameter.filesetId}}/files/={{$parameter.fileId}}/download',
			},
		},
	},
	{
		name: 'Download File by Path',
		value: 'download-file-by-path',
		action: 'Download file by path',
		description: 'ResponseEntity with no content–the file will be downloaded via a redirect',
		routing: {
			request: {
				method: 'GET',
				url: '/files/v1/filesets/={{$parameter.filesetId}}/path/download',
			},
		},
	},
	{
		name: 'Get File',
		value: 'get-file',
		action: 'Get file',
		routing: {
			request: {
				method: 'GET',
				url: '/files/v1/filesets/={{$parameter.filesetId}}/files/={{$parameter.fileId}}',
			},
		},
	},
	{
		name: 'Get File by Path',
		value: 'get-file-by-path',
		action: 'Get file by path',
		routing: {
			request: {
				method: 'GET',
				url: '/files/v1/filesets/={{$parameter.filesetId}}/path',
			},
		},
	},
	{
		name: 'Get FileSet',
		value: 'get-fileset',
		action: 'Get file set',
		routing: {
			request: {
				method: 'GET',
				url: '/files/v1/filesets/={{$parameter.id}}',
			},
		},
	},
	{
		name: 'Get FileSet Access',
		value: 'get-fileset-access',
		action: 'Get file set access',
		routing: {
			request: {
				method: 'GET',
				url: '/files/v1/filesets/={{$parameter.id}}/access',
			},
		},
	},
	{
		name: 'Get FileSet Stats',
		value: 'get-fileset-stats',
		action: 'Get file set stats',
		routing: {
			request: {
				method: 'GET',
				url: '/files/v1/filesets/={{$parameter.id}}/stats',
			},
		},
	},
	{
		name: 'Get/Search Files',
		value: 'get-search-files',
		action: 'Get search files',
		routing: {
			request: {
				method: 'POST',
				url: '/files/v1/filesets/={{$parameter.filesetId}}/files/search',
			},
		},
	},
	{
		name: 'List/Search FileSets',
		value: 'list-search-filesets',
		action: 'List search file sets',
		routing: {
			request: {
				method: 'POST',
				url: '/files/v1/filesets/search',
			},
		},
	},
	{
		name: 'Search Files with AI',
		value: 'search-files-with-ai',
		action: 'Search files with ai',
		description: 'Not working as of 2025-06-02',
		routing: {
			request: {
				method: 'POST',
				url: '/files/v1/filesets/={{$parameter.id}}/query',
			},
		},
	},
	{
		name: 'Update FileSet',
		value: 'update-fileset',
		action: 'Update file set',
		routing: {
			request: {
				method: 'POST',
				url: '/files/v1/filesets/={{$parameter.id}}',
			},
		},
	},
	{
		name: 'Update FileSet Access',
		value: 'update-fileset-access',
		action: 'Update file set access',
		routing: {
			request: {
				method: 'POST',
				url: '/files/v1/filesets/={{$parameter.id}}/access',
			},
		},
	},
	{
		name: 'Update FileSet Owner',
		value: 'update-fileset-owner',
		action: 'Update file set owner',
		description: 'Oddly, this will return a normal fileSetAccess array with both the old and new owners inside',
		routing: {
			request: {
				method: 'POST',
				url: '/files/v1/filesets/={{$parameter.id}}/ownership',
			},
		},
	},
	{
		name: 'Upload File',
		value: 'upload-file',
		action: 'Upload file',
		routing: {
			request: {
				method: 'POST',
				url: '/files/v1/filesets/={{$parameter.id}}/files',
			},
		},
	},
	],
	},
];

export const filesetsFields: INodeProperties[] = [
		{
			displayName: 'Data',
			name: 'data',
			type: 'json',
			required: true,
			displayOptions: {
				show: {
					resource: ['filesets'],
					operation: ['list-search-filesets'],
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
			displayName: 'Limit',
			name: 'limit',
			type: 'number',
			typeOptions: {
				minValue: 1,
			},
			displayOptions: {
				show: {
					resource: ['filesets'],
					operation: ['list-search-filesets'],
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
					resource: ['filesets'],
					operation: ['list-search-filesets'],
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
			displayName: 'FilesetId ID',
			name: 'filesetId',
			type: 'string',
			required: true,
			displayOptions: {
				show: {
					resource: ['filesets'],
					operation: ['get-search-files'],
				},
			},
			default: '',
			description: 'The ID of the filesetId',
		},
		{
			displayName: 'Data',
			name: 'data',
			type: 'json',
			required: true,
			displayOptions: {
				show: {
					resource: ['filesets'],
					operation: ['get-search-files'],
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
			displayName: 'Limit',
			name: 'limit',
			type: 'number',
			typeOptions: {
				minValue: 1,
			},
			displayOptions: {
				show: {
					resource: ['filesets'],
					operation: ['get-search-files'],
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
			displayName: 'DirectoryPath',
			name: 'directoryPath',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['filesets'],
					operation: ['get-search-files'],
				},
			},
			default: '',
			description: 'The directoryPath parameter',
			routing: {
				request: {
					qs: {
						directoryPath: '={{$parameter.directoryPath}}',
					},
				},
			},
		},
		{
			displayName: 'ImmediateChildren',
			name: 'immediateChildren',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['filesets'],
					operation: ['get-search-files'],
				},
			},
			default: '',
			description: 'The immediateChildren parameter',
			routing: {
				request: {
					qs: {
						immediateChildren: '={{$parameter.immediateChildren}}',
					},
				},
			},
		},
		{
			displayName: 'Next',
			name: 'next',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['filesets'],
					operation: ['get-search-files'],
				},
			},
			default: '',
			description: 'The next parameter',
			routing: {
				request: {
					qs: {
						next: '={{$parameter.next}}',
					},
				},
			},
		},
	{
		displayName: 'FileSet ID',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['filesets'],
				operation: ['search-files-with-ai', 'get-fileset', 'get-fileset-access', 'get-fileset-stats', 'upload-file', 'update-fileset', 'update-fileset-access', 'update-fileset-owner', 'delete-fileset'],
			},
		},
		default: '',
		description: 'The ID of the fileset',
	},
		{
			displayName: 'Data',
			name: 'data',
			type: 'json',
			required: true,
			displayOptions: {
				show: {
					resource: ['filesets'],
					operation: ['search-files-with-ai'],
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
		displayName: 'FileSet ID',
		name: 'filesetId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['filesets'],
				operation: ['get-search-files', 'get-file', 'get-file-by-path', 'download-file', 'download-file-by-path', 'create-folder', 'delete-file', 'delete-file-by-path'],
			},
		},
		default: '',
		description: 'The ID of the fileset',
	},
	{
		displayName: 'File ID',
		name: 'fileId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['filesets'],
				operation: ['get-file', 'download-file', 'delete-file'],
			},
		},
		default: '',
		description: 'The ID of the file',
	},
		{
			displayName: 'Path',
			name: 'path',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['filesets'],
					operation: ['get-file-by-path'],
				},
			},
			default: '',
			description: 'The path parameter',
			routing: {
				request: {
					qs: {
						path: '={{$parameter.path}}',
					},
				},
			},
		},
		{
			displayName: 'Path',
			name: 'path',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['filesets'],
					operation: ['download-file-by-path'],
				},
			},
			default: '',
			description: 'The path parameter',
			routing: {
				request: {
					qs: {
						path: '={{$parameter.path}}',
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
					resource: ['filesets'],
					operation: ['create-fileset'],
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
					resource: ['filesets'],
					operation: ['create-folder'],
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
					resource: ['filesets'],
					operation: ['update-fileset'],
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
					resource: ['filesets'],
					operation: ['update-fileset-access'],
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
					resource: ['filesets'],
					operation: ['update-fileset-owner'],
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
			displayName: 'Path',
			name: 'path',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['filesets'],
					operation: ['delete-file-by-path'],
				},
			},
			default: '',
			description: 'The path parameter',
			routing: {
				request: {
					qs: {
						path: '={{$parameter.path}}',
					},
				},
			},
		},
];
