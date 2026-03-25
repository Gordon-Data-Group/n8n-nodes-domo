import { INodeProperties } from 'n8n-workflow';
import type { IHttpRequestOptions, IExecuteSingleFunctions } from 'n8n-workflow';
import { preSendLogger } from './shared/preSendLogger';

async function preSendReportCardIds(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const cardIds = this.getNodeParameter('cardIds') as { card?: Array<{ id: number }> };
	const body = requestOptions.body as Record<string, unknown>;
	if (body) {
		body.cardIds = (cardIds?.card ?? []).map((c) => c.id);
	}
	return requestOptions;
}

export const reportsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['reports'],
			},
		},
		options: [
			{
				name: 'Create Report',
				value: 'create',
				action: 'Create a slideshow report',
				routing: {
					request: {
						method: 'POST',
						url: '/api/content/v1/reports',
						body: {
							title: '={{ $parameter.title }}',
							type: 'slideshow',
							properties: {
								isShared: '={{ $parameter.isShared }}',
								isAccessCodeRequired: '={{ $parameter.isAccessCodeRequired }}',
								accessCode: '={{ $parameter.accessCode || null }}',
								tokenId: null,
							},
						},
					},
					send: {
						preSend: [preSendReportCardIds, preSendLogger],
					},
				},
			},
			{
				name: 'Delete Report',
				value: 'delete',
				action: 'Delete a report',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/content/v1/reports/{{ $parameter.reportId }}',
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'List Reports',
				value: 'list',
				action: 'List all reports',
				routing: {
					request: {
						method: 'GET',
						url: '/api/content/v1/reports',
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Update Report',
				value: 'update',
				action: 'Update a report',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/content/v1/reports/{{ $parameter.reportId }}',
						body: {
							id: '={{ $parameter.reportId }}',
							title: '={{ $parameter.title }}',
							ownerId: '={{ $parameter.ownerId || undefined }}',
							properties: {
								isShared: '={{ $parameter.isShared }}',
								isAccessCodeRequired: '={{ $parameter.isAccessCodeRequired }}',
								accessCode: '={{ $parameter.accessCode || null }}',
								tokenId: null,
							},
						},
					},
					send: {
						preSend: [preSendReportCardIds, preSendLogger],
					},
				},
			},
		],
		default: 'list',
	},
];

export const reportsFields: INodeProperties[] = [
	// ── Shared: Report ID (delete, update) ───────────────────────────────────
	{
		displayName: 'Report ID',
		name: 'reportId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['reports'],
				operation: ['delete', 'update'],
			},
		},
		default: null,
		required: true,
		description: 'The numeric ID of the report',
		typeOptions: {
			minValue: 1,
		},
	},

	// ── Shared: Title (create, update) ───────────────────────────────────────
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['reports'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		required: true,
		description: 'The title of the report',
	},

	// ── Shared: Card IDs (create, update) ────────────────────────────────────
	{
		displayName: 'Card IDs',
		name: 'cardIds',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['reports'],
				operation: ['create', 'update'],
			},
		},
		default: {},
		description: 'The cards (visualizations) to include in the report',
		options: [
			{
				displayName: 'Card',
				name: 'card',
				values: [
					{
						displayName: 'Card ID',
						name: 'id',
						type: 'number',
						default: null,
						description: 'The numeric ID of the card',
						typeOptions: {
							minValue: 1,
						},
					},
				],
			},
		],
	},

	// ── Shared: Properties (create, update) ──────────────────────────────────
	{
		displayName: 'Is Shared',
		name: 'isShared',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['reports'],
				operation: ['create', 'update'],
			},
		},
		default: false,
		description: 'Whether the report is publicly shared',
	},
	{
		displayName: 'Require Access Code',
		name: 'isAccessCodeRequired',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['reports'],
				operation: ['create', 'update'],
			},
		},
		default: false,
		description: 'Whether an access code is required to view the shared report',
	},
	{
		displayName: 'Access Code',
		name: 'accessCode',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['reports'],
				operation: ['create', 'update'],
				isAccessCodeRequired: [true],
			},
		},
		default: '',
		description: 'The access code required to view the shared report',
	},

	// ── Update only: Owner ID ─────────────────────────────────────────────────
	{
		displayName: 'Owner ID',
		name: 'ownerId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['reports'],
				operation: ['update'],
			},
		},
		default: null,
		description: 'The user ID of the report owner',
	},
];
