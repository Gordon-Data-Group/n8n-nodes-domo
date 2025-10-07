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
						url: '/api/content/v1/categories',
						body: '={{JSON.parse($parameter.categoryData)}}',
					},
				},
			},
			{
				name: 'Create Certified Attribute',
				value: 'createCertifiedAttribute',
				description: 'Create a new certified attribute',
				action: 'Create certified attribute',
				routing: {
					request: {
						method: 'POST',
						url: '/api/content/v1/certified-attributes',
						body: '={{JSON.parse($parameter.attributeData)}}',
					},
				},
			},
			{
				name: 'Delete Category',
				value: 'deleteCategory',
				description: 'Delete a category',
				action: 'Delete category',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/content/v1/categories/" + $parameter.categoryId }}',
					},
				},
			},
			{
				name: 'Delete Certified Attribute',
				value: 'deleteCertifiedAttribute',
				description: 'Delete a certified attribute',
				action: 'Delete certified attribute',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/content/v1/certified-attributes/" + $parameter.attributeId }}',
					},
				},
			},
			{
				name: 'Get Category',
				value: 'getCategory',
				description: 'Get details of a specific category',
				action: 'Get category',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/content/v1/categories/" + $parameter.categoryId }}',
					},
				},
			},
			{
				name: 'Get Certified Attribute',
				value: 'getCertifiedAttribute',
				description: 'Get details of a specific certified attribute',
				action: 'Get certified attribute',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/content/v1/certified-attributes/" + $parameter.attributeId }}',
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
						url: '/api/content/v1/categories',
						qs: {
							limit: '={{Math.min($parameter.limit || 50, 500)}}',
							offset: '={{$parameter.offset || 0}}',
						},
					},
				},
			},
			{
				name: 'List Certified Attributes',
				value: 'listCertifiedAttributes',
				description: 'List all certified attributes',
				action: 'List certified attributes',
				routing: {
					request: {
						method: 'GET',
						url: '/api/content/v1/certified-attributes',
						qs: {
							limit: '={{Math.min($parameter.limit || 50, 500)}}',
							offset: '={{$parameter.offset || 0}}',
						},
					},
				},
			},
			{
				name: 'Update Category',
				value: 'updateCategory',
				description: 'Update a category',
				action: 'Update category',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/content/v1/categories/" + $parameter.categoryId }}',
						body: '={{JSON.parse($parameter.categoryData)}}',
					},
				},
			},
			{
				name: 'Update Certified Attribute',
				value: 'updateCertifiedAttribute',
				description: 'Update a certified attribute',
				action: 'Update certified attribute',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/content/v1/certified-attributes/" + $parameter.attributeId }}',
						body: '={{JSON.parse($parameter.attributeData)}}',
					},
				},
			},
		],
		default: 'listCategories',
	},
];

export const categoryFields: INodeProperties[] = [
	// Category ID field
	{
		displayName: 'Category ID',
		name: 'categoryId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['category'],
				operation: ['getCategory', 'updateCategory', 'deleteCategory'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the category',
	},
	// Certified Attribute ID field
	{
		displayName: 'Attribute ID',
		name: 'attributeId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['category'],
				operation: ['getCertifiedAttribute', 'updateCertifiedAttribute', 'deleteCertifiedAttribute'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the certified attribute',
	},
	// List categories fields
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['category'],
				operation: ['listCategories', 'listCertifiedAttributes'],
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
				resource: ['category'],
				operation: ['listCategories', 'listCertifiedAttributes'],
			},
		},
		default: 0,
		description: 'Number of items to skip',
	},
	// Create and Update category fields
	{
		displayName: 'Category Data',
		name: 'categoryData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['category'],
				operation: ['createCategory', 'updateCategory'],
			},
		},
		default: '{}',
		required: true,
		description: 'JSON object containing category configuration',
		placeholder: '{"name":"My Category","description":"Category description","color":"#FF0000"}',
	},
	// Create and Update certified attribute fields
	{
		displayName: 'Attribute Data',
		name: 'attributeData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['category'],
				operation: ['createCertifiedAttribute', 'updateCertifiedAttribute'],
			},
		},
		default: '{}',
		required: true,
		description: 'JSON object containing certified attribute configuration',
		placeholder: '{"name":"Certified Data","description":"Attribute description","dataType":"string"}',
	},
];

