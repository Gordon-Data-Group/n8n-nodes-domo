import { INodeProperties } from 'n8n-workflow';
import type { IHttpRequestOptions, IExecuteSingleFunctions } from 'n8n-workflow';
import FormData from 'form-data';
import { preSendLogger } from './shared/preSendLogger';

// Sends binary data as multipart/form-data under the "file" key.
async function preSendBinaryUpload(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const binaryPropertyName = this.getNodeParameter('binaryPropertyName') as string;
	const binaryData = this.helpers.assertBinaryData(binaryPropertyName);
	const buffer = await this.helpers.getBinaryDataBuffer(binaryPropertyName);

	const form = new FormData();
	form.append('file', buffer, {
		filename: binaryData.fileName || 'upload',
		contentType: binaryData.mimeType || 'application/octet-stream',
	});

	requestOptions.body = form as unknown as FormData;
	requestOptions.json = false;
	if (requestOptions.headers) {
		delete requestOptions.headers['Content-Type'];
		delete requestOptions.headers['content-type'];
	}
	requestOptions.headers = {
		...requestOptions.headers,
		...form.getHeaders(),
	};
	return requestOptions;
}

// Builds the Create File Card body
async function preSendCreateFileCard(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const title = this.getNodeParameter('title') as string;
	const description = this.getNodeParameter('description') as string;
	const documentId = this.getNodeParameter('documentId') as string;
	requestOptions.body = {
		type: 'document',
		description,
		metadata: {
			title,
			documentId,
			usingSampleData: '',
			kpiType: 'document',
			description,
		},
	};
	return requestOptions;
}

// Builds the Update File Card body
async function preSendUpdateFileCard(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const title = this.getNodeParameter('title') as string;
	const documentId = this.getNodeParameter('documentId') as string;
	const cardRevisionId = this.getNodeParameter('cardRevisionId') as string;
	requestOptions.body = {
		metadata: {
			documentId,
			revisionId: cardRevisionId,
			title,
			kpiType: 'document',
			usingSampleData: '',
		},
	};
	return requestOptions;
}

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
		options: [
			{
				name: 'Create File',
				value: 'createFile',
				action: 'Upload a new file',
				routing: {
					request: {
						method: 'POST',
						url: '/api/data/v1/data-files',
						qs: {
							name: '={{ $parameter.fileName }}',
							public: '={{ $parameter.isPublic }}',
						},
					},
					send: {
						preSend: [preSendBinaryUpload, preSendLogger],
					},
				},
			},
			{
				name: 'Create File Card',
				value: 'createFileCard',
				action: 'Create a document card linked to a file',
				routing: {
					request: {
						method: 'POST',
						url: '/api/content/v1/cards',
						qs: {
							pageId: '={{ $parameter.pageId }}',
						},
					},
					send: {
						preSend: [preSendCreateFileCard, preSendLogger],
					},
				},
			},
			{
				name: 'Get File Details',
				value: 'getFileDetails',
				action: 'Get file details including revisions',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/data/v1/data-files/{{ $parameter.fileId }}/details',
						qs: {
							expand: 'revisions',
						},
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Get Revision',
				value: 'getRevision',
				action: 'Download a file revision',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/data/v1/data-files/{{ $parameter.fileId }}/revisions/{{ $parameter.revisionId }}',
						qs: {
							fileName: '={{ $parameter.fileNameOverride || undefined }}',
						},
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Get Revision Details',
				value: 'getRevisionDetails',
				action: 'Get metadata for a file revision',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/data/v1/data-files/{{ $parameter.fileId }}/revisions/{{ $parameter.revisionId }}/details',
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Update File',
				value: 'updateFile',
				action: 'Upload a new version of a file',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/data/v1/data-files/{{ $parameter.fileId }}',
						qs: {
							public: '={{ $parameter.isPublic }}',
							description: '={{ $parameter.description || undefined }}',
						},
					},
					send: {
						preSend: [preSendBinaryUpload, preSendLogger],
					},
				},
			},
			{
				name: 'Update File Card',
				value: 'updateFileCard',
				action: 'Update a document card to point to a new file revision',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/content/v1/cards/{{ $parameter.cardId }}',
					},
					send: {
						preSend: [preSendUpdateFileCard, preSendLogger],
					},
				},
			},
		],
		default: 'getFileDetails',
	},
];

export const filesFields: INodeProperties[] = [
	// ── Shared: File ID ───────────────────────────────────────────────────────
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

	// ── Shared: Revision ID (getRevision, getRevisionDetails) ─────────────────
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
		default: '-1',
		required: true,
		description: 'The revision ID. Use -1 for the most recent revision.',
	},

	// ── Get Revision: optional fileName override ──────────────────────────────
	{
		displayName: 'File Name Override',
		name: 'fileNameOverride',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['files'],
				operation: ['getRevision'],
			},
		},
		default: '',
		description: 'Optional filename to use when downloading the revision',
	},

	// ── Shared: Binary property (createFile, updateFile) ─────────────────────
	{
		displayName: 'Binary Property',
		name: 'binaryPropertyName',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['files'],
				operation: ['createFile', 'updateFile'],
			},
		},
		default: 'data',
		required: true,
		description:
			'Name of the binary property from the input item that contains the file to upload',
	},

	// ── Create File fields ────────────────────────────────────────────────────
	{
		displayName: 'File Name',
		name: 'fileName',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['files'],
				operation: ['createFile'],
			},
		},
		default: '',
		required: true,
		placeholder: 'report.pdf',
		description: 'The file name including extension',
	},
	{
		displayName: 'Public',
		name: 'isPublic',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['files'],
				operation: ['createFile', 'updateFile'],
			},
		},
		default: true,
		description: 'Whether the file should be publicly accessible',
	},

	// ── Shared: Description (updateFile, createFileCard) ─────────────────────
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['files'],
				operation: ['updateFile', 'createFileCard'],
			},
		},
		default: '',
		description: 'An optional description',
	},

	// ── Create File Card fields ───────────────────────────────────────────────
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
		required: true,
		description: 'The ID of the page to add the card to',
	},
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['files'],
				operation: ['createFileCard', 'updateFileCard'],
			},
		},
		default: '',
		required: true,
		description: 'The title of the file card',
	},
	{
		displayName: 'Document ID',
		name: 'documentId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['files'],
				operation: ['createFileCard', 'updateFileCard'],
			},
		},
		default: '',
		required: true,
		placeholder: '123:456',
		description: 'The document ID in "fileId:revisionId" format',
	},

	// ── Update File Card fields ───────────────────────────────────────────────
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
		description: 'The ID of the card to update',
	},
	{
		displayName: 'Revision ID',
		name: 'cardRevisionId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['files'],
				operation: ['updateFileCard'],
			},
		},
		default: '',
		required: true,
		description: 'The revision ID to associate with the card',
	},
];
