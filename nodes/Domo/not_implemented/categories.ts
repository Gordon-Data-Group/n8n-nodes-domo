import { INodeProperties } from 'n8n-workflow';

export const categoryOperations: INodeProperties[] = [
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
				value: 'createCategory',
				description: 'Create a new category',
				action: 'Create category',
				routing: {
					request: {
						method: 'POST',
						url: '/api/entity/v1/properties/category',
						body: '={{JSON.parse($parameter.categoryData)}}',
					},
				},
			},
			{
				name: 'Get Entity Categories',
				value: 'getEntityCategories',
				description: 'Get categories for an entity',
				action: 'Get entity categories',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/entity/v1/properties/entity/" + $parameter.type + "/" + $parameter.entityId }}',
					},
				},
			},
			{
				name: 'List Categories',
				value: 'listCategories',
				description: 'List all categories',
				action: 'List categories',
				routing: {
					request: {
						method: 'GET',
						url: '/api/entity/v1/properties/category',
					},
				},
			},
			{
				name: 'List Usage',
				value: 'listUsage',
				description: 'List category usage',
				action: 'List usage',
				routing: {
					request: {
						method: 'GET',
						url: '/api/entity/v1/properties/category/usage',
					},
				},
			},
			{
				name: 'Upsert Entity Categories',
				value: 'upsertEntityCategories',
				description: 'Upsert categories for an entity',
				action: 'Upsert entity categories',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/entity/v1/properties/entity/" + $parameter.type + "/" + $parameter.entityId }}',
						body: '={{JSON.parse($parameter.categoriesData)}}',
					},
				},
			},
		],
		default: 'listCategories',
	},
];

export const categoryFields: INodeProperties[] = [
	// Type field
	{
		displayName: 'Type',
		name: 'type',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['category'],
				operation: ['getEntityCategories', 'upsertEntityCategories'],
			},
		},
		default: '',
		required: true,
		description: 'The entity type',
	},
	// Entity ID field
	{
		displayName: 'Entity ID',
		name: 'entityId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['category'],
				operation: ['getEntityCategories', 'upsertEntityCategories'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the entity',
	},
	// Create category fields
	{
		displayName: 'Category Data',
		name: 'categoryData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['category'],
				operation: ['createCategory'],
			},
		},
		default: '',
		placeholder: '{"key":"category-key","description":"Category description","values":["value1","value2"]}',
		required: true,
		description: 'JSON object containing category configuration',
	},
	// Upsert entity categories fields
	{
		displayName: 'Categories Data',
		name: 'categoriesData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['category'],
				operation: ['upsertEntityCategories'],
			},
		},
		default: '',
		placeholder: '[{"key":"category-key","values":["value1","value2"]}]',
		required: true,
		description: 'JSON array containing category assignments',
	},
];
