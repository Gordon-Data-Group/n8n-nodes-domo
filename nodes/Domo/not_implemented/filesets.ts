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
		default: 'listSearchFilesets',
		options: [
			{
				name: 'Create File Set',
				value: 'createFileset',
				action: 'Create file set',
				routing: {
					request: {
						method: 'POST',
						url: '/api/files/v1/filesets',
						body: '={{JSON.parse($parameter.filesetData)}}',
					},
				},
			},
			{
				name: 'Create Folder',
				value: 'createFolder',
				action: 'Create folder',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/files/v1/filesets/" + $parameter.filesetId + "/files" }}',
						body: '={{JSON.parse($parameter.folderData)}}',
					},
				},
			},
			{
				name: 'Delete File',
				value: 'deleteFile',
				action: 'Delete file',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/files/v1/filesets/" + $parameter.filesetId + "/files/" + $parameter.fileId }}',
					},
				},
			},
			{
				name: 'Delete File by Path',
				value: 'deleteFileByPath',
				action: 'Delete file by path',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/files/v1/filesets/" + $parameter.filesetId + "/path" }}',
						qs: {
							path: '={{$parameter.path}}',
						},
					},
				},
			},
			{
				name: 'Delete File Set',
				value: 'deleteFileset',
				action: 'Delete file set',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/files/v1/filesets/" + $parameter.filesetId }}',
					},
				},
			},
			{
				name: 'Download File',
				value: 'downloadFile',
				action: 'Download file',
				description: 'ResponseEntity with no content–the file will be downloaded via a redirect',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/files/v1/filesets/" + $parameter.filesetId + "/files/" + $parameter.fileId + "/download" }}',
					},
				},
			},
			{
				name: 'Download File by Path',
				value: 'downloadFileByPath',
				action: 'Download file by path',
				description: 'ResponseEntity with no content–the file will be downloaded via a redirect',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/files/v1/filesets/" + $parameter.filesetId + "/path/download" }}',
						qs: {
							path: '={{$parameter.path}}',
						},
					},
				},
			},
			{
				name: 'Get File',
				value: 'getFile',
				action: 'Get file',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/files/v1/filesets/" + $parameter.filesetId + "/files/" + $parameter.fileId }}',
					},
				},
			},
			{
				name: 'Get File by Path',
				value: 'getFileByPath',
				action: 'Get file by path',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/files/v1/filesets/" + $parameter.filesetId + "/path" }}',
						qs: {
							path: '={{$parameter.path}}',
						},
					},
				},
			},
			{
				name: 'Get File Set',
				value: 'getFileset',
				action: 'Get file set',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/files/v1/filesets/" + $parameter.filesetId }}',
					},
				},
			},
			{
				name: 'Get File Set Access',
				value: 'getFilesetAccess',
				action: 'Get file set access',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/files/v1/filesets/" + $parameter.filesetId + "/access" }}',
					},
				},
			},
			{
				name: 'Get File Set Stats',
				value: 'getFilesetStats',
				action: 'Get file set stats',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/files/v1/filesets/" + $parameter.filesetId + "/stats" }}',
					},
				},
			},
			{
				name: 'Get/Search Files',
				value: 'getSearchFiles',
				action: 'Get search files',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/files/v1/filesets/" + $parameter.filesetId + "/files/search" }}',
						qs: {
							directoryPath: '={{$parameter.directoryPath}}',
							immediateChildren: '={{$parameter.immediateChildren}}',
							limit: '={{$parameter.limit}}',
							next: '={{$parameter.next}}',
						},
						body: '={{JSON.parse($parameter.searchData)}}',
					},
				},
			},
			{
				name: 'List/Search File Sets',
				value: 'listSearchFilesets',
				action: 'List search file sets',
				routing: {
					request: {
						method: 'POST',
						url: '/api/files/v1/filesets/search',
						qs: {
							limit: '={{$parameter.limit}}',
							offset: '={{$parameter.offset}}',
						},
						body: '={{JSON.parse($parameter.searchData)}}',
					},
				},
			},
			{
				name: 'Search Files with AI',
				value: 'searchFilesWithAi',
				action: 'Search files with ai',
				description: 'Not working as of 2025-06-02',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/files/v1/filesets/" + $parameter.filesetId + "/query" }}',
						body: '={{JSON.parse($parameter.queryData)}}',
					},
				},
			},
			{
				name: 'Update File Set',
				value: 'updateFileset',
				action: 'Update file set',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/files/v1/filesets/" + $parameter.filesetId }}',
						body: '={{JSON.parse($parameter.filesetData)}}',
					},
				},
			},
			{
				name: 'Update File Set Access',
				value: 'updateFilesetAccess',
				action: 'Update file set access',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/files/v1/filesets/" + $parameter.filesetId + "/access" }}',
						body: '={{JSON.parse($parameter.accessData)}}',
					},
				},
			},
			{
				name: 'Update File Set Owner',
				value: 'updateFilesetOwner',
				action: 'Update file set owner',
				description: 'Oddly, this will return a normal fileSetAccess array with both the old and new owners inside',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/files/v1/filesets/" + $parameter.filesetId + "/ownership" }}',
						body: '={{JSON.parse($parameter.ownerData)}}',
					},
				},
			},
			{
				name: 'Upload File',
				value: 'uploadFile',
				action: 'Upload file',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/files/v1/filesets/" + $parameter.filesetId + "/files" }}',
					},
				},
			},
		],
	},
];

export const filesetsFields: INodeProperties[] = [
	// FileSet ID field
	{
		displayName: 'File Set ID',
		name: 'filesetId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['filesets'],
				operation: [
					'getFileset',
					'getFilesetAccess',
					'getFilesetStats',
					'getSearchFiles',
					'searchFilesWithAi',
					'getFile',
					'getFileByPath',
					'downloadFile',
					'downloadFileByPath',
					'createFolder',
					'uploadFile',
					'updateFileset',
					'updateFilesetAccess',
					'updateFilesetOwner',
					'deleteFileset',
					'deleteFile',
					'deleteFileByPath',
				],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the fileset',
	},
	// File ID field
	{
		displayName: 'File ID',
		name: 'fileId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['filesets'],
				operation: ['getFile', 'downloadFile', 'deleteFile'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the file',
	},
	// Path field
	{
		displayName: 'Path',
		name: 'path',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['filesets'],
				operation: ['getFileByPath', 'downloadFileByPath', 'deleteFileByPath'],
			},
		},
		default: '',
		required: true,
		description: 'The file path',
	},
	// List/Search FileSets fields
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
				operation: ['listSearchFilesets', 'getSearchFiles'],
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
				resource: ['filesets'],
				operation: ['listSearchFilesets'],
			},
		},
		default: 0,
		description: 'Number of items to skip',
	},
	{
		displayName: 'Search Data',
		name: 'searchData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['filesets'],
				operation: ['listSearchFilesets', 'getSearchFiles'],
			},
		},
		default: '',
		placeholder: '{"fieldSort":[{"field":"updated","order":"DESC"}],"filters":[],"dateFilters":[]}',
		required: true,
		description: 'JSON object containing search criteria',
	},
	// Get/Search Files fields
	{
		displayName: 'Directory Path',
		name: 'directoryPath',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['filesets'],
				operation: ['getSearchFiles'],
			},
		},
		default: '',
		description: 'The directory path to search in',
	},
	{
		displayName: 'Immediate Children',
		name: 'immediateChildren',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['filesets'],
				operation: ['getSearchFiles'],
			},
		},
		default: '',
		description: 'Return only immediate children',
	},
	{
		displayName: 'Next',
		name: 'next',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['filesets'],
				operation: ['getSearchFiles'],
			},
		},
		default: '',
		description: 'Pagination token for next page',
	},
	// Search Files with AI fields
	{
		displayName: 'Query Data',
		name: 'queryData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['filesets'],
				operation: ['searchFilesWithAi'],
			},
		},
		default: '',
		placeholder: '{"query":"","directoryPath":"","topK":10}',
		required: true,
		description: 'JSON object containing AI search query',
	},
	// Create/Update FileSet fields
	{
		displayName: 'File Set Data',
		name: 'filesetData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['filesets'],
				operation: ['createFileset', 'updateFileset'],
			},
		},
		default: '',
		placeholder: '{"name":"FileSet Name","description":"Description","aiEnabled":false,"batchType":"INCREMENTAL","connector":"DOMO"}',
		required: true,
		description: 'JSON object containing fileset configuration',
	},
	// Create Folder fields
	{
		displayName: 'Folder Data',
		name: 'folderData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['filesets'],
				operation: ['createFolder'],
			},
		},
		default: '',
		placeholder: '{"directoryPath":"/folder/path"}',
		required: true,
		description: 'JSON object containing folder path',
	},
	// Update FileSet Access fields
	{
		displayName: 'Access Data',
		name: 'accessData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['filesets'],
				operation: ['updateFilesetAccess'],
			},
		},
		default: '',
		placeholder: '{"fileSetAccess":[{"entityID":1234,"entityType":"USER","permission":"READ"}]}',
		required: true,
		description: 'JSON object containing access permissions',
	},
	// Update FileSet Owner fields
	{
		displayName: 'Owner Data',
		name: 'ownerData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['filesets'],
				operation: ['updateFilesetOwner'],
			},
		},
		default: '',
		placeholder: '{"userID":1234}',
		required: true,
		description: 'JSON object containing new owner user ID',
	},
];
