import { INodeProperties } from 'n8n-workflow';
import type { IHttpRequestOptions, IExecuteSingleFunctions } from 'n8n-workflow';
import { preSendLogger } from './shared/preSendLogger';

// Maps the categoryValues fixedCollection to a string[] on the request body
async function preSendCreateCategory(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const raw = this.getNodeParameter('categoryValues') as { value?: Array<{ val: string }> };
	const body = requestOptions.body as Record<string, unknown>;
	if (body) {
		body.values = (raw?.value ?? []).map((v) => v.val);
	}
	return requestOptions;
}

// Replaces the entire request body with the array required by Upsert Entity Categories.
// Each entry has a key and a values string[] derived from a comma-separated input.
async function preSendUpsertCategories(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const raw = this.getNodeParameter('upsertCategories') as {
		category?: Array<{ key: string; values: string }>;
	};
	requestOptions.body = (raw?.category ?? []).map((c) => ({
		key: c.key,
		values: c.values
			.split(',')
			.map((v) => v.trim())
			.filter((v) => v.length > 0),
	}));
	return requestOptions;
}

export const categoriesOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['category'],
			},
		},
		options: [
			{
				name: 'Create Category',
				value: 'create',
				action: 'Create a category',
				routing: {
					request: {
						method: 'POST',
						url: '/api/entity/v1/properties/category',
						body: {
							key: '={{ $parameter.key }}',
							description: '={{ $parameter.description || undefined }}',
						},
					},
					send: {
						preSend: [preSendCreateCategory, preSendLogger],
					},
				},
			},
			{
				name: 'Get Entity Categories',
				value: 'getEntity',
				action: 'Get categories assigned to an entity',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/entity/v1/properties/entity/{{ $parameter.entityType }}/{{ $parameter.entityId }}',
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'List Categories',
				value: 'list',
				action: 'List all categories',
				routing: {
					request: {
						method: 'GET',
						url: '/api/entity/v1/properties/category',
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'List Usage',
				value: 'listUsage',
				action: 'List category usage across entities',
				routing: {
					request: {
						method: 'GET',
						url: '/api/entity/v1/properties/category/usage',
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Upsert Entity Categories',
				value: 'upsert',
				action: 'Assign or update categories on an entity',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/entity/v1/properties/entity/{{ $parameter.entityType }}/{{ $parameter.entityId }}',
					},
					send: {
						preSend: [preSendUpsertCategories, preSendLogger],
					},
				},
			},
		],
		default: 'list',
	},
];

export const categoriesFields: INodeProperties[] = [
	// ── Shared: Entity Type + ID (getEntity, upsert) ──────────────────────────
	{
		displayName: 'Entity Type',
		name: 'entityType',
		type: 'options',
		options: [
			{ name: 'Card', value: 'CARD' },
			{ name: 'DataFlow', value: 'DATAFLOW' },
			{ name: 'Dataset', value: 'DATASET' },
			{ name: 'Page', value: 'PAGE' },
		],
		displayOptions: {
			show: {
				resource: ['category'],
				operation: ['getEntity', 'upsert'],
			},
		},
		default: 'CARD',
		required: true,
		description: 'The type of Domo entity',
	},
	{
		displayName: 'Entity ID',
		name: 'entityId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['category'],
				operation: ['getEntity', 'upsert'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the entity',
	},

	// ── Create: Key ───────────────────────────────────────────────────────────
	{
		displayName: 'Key',
		name: 'key',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['category'],
				operation: ['create'],
			},
		},
		default: '',
		required: true,
		description: 'The unique key (name) for the category',
	},

	// ── Create: Description ───────────────────────────────────────────────────
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['category'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'An optional description for the category',
	},

	// ── Create: Values ────────────────────────────────────────────────────────
	{
		displayName: 'Values',
		name: 'categoryValues',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['category'],
				operation: ['create'],
			},
		},
		default: {},
		description: 'The allowed values for this category',
		options: [
			{
				displayName: 'Value',
				name: 'value',
				values: [
					{
						displayName: 'Value',
						name: 'val',
						type: 'string',
						default: '',
						description: 'A valid value for this category',
					},
				],
			},
		],
	},

	// ── Upsert: Categories ────────────────────────────────────────────────────
	{
		displayName: 'Categories',
		name: 'upsertCategories',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['category'],
				operation: ['upsert'],
			},
		},
		default: {},
		description: 'The categories to assign to the entity',
		options: [
			{
				displayName: 'Category',
				name: 'category',
				values: [
					{
						displayName: 'Key',
						name: 'key',
						type: 'string',
						default: '',
						required: true,
						description: 'The category key',
					},
					{
						displayName: 'Values',
						name: 'values',
						type: 'string',
						default: '',
						placeholder: 'Finance, Operations, HR',
						description: 'Comma-separated list of values to assign for this category',
					},
				],
			},
		],
	},
];
