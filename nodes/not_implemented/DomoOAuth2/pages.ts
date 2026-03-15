import type { INodeProperties } from 'n8n-workflow';

export const pagesOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['pages'],
			},
		},
	default: 'list-pages',
	options: [
	{
		name: 'Create a Page',
		value: 'create-a-page',
		action: 'Create a page',
		description: 'Creates a new page in your Domo instance',
		routing: {
			request: {
				method: 'POST',
				url: '/v1/pages',
			},
		},
	},
	{
		name: 'Create a Page Collection',
		value: 'create-a-page-collection',
		action: 'Create a page collection',
		routing: {
			request: {
				method: 'POST',
				url: '/v1/pages/={{$parameter["page_id"]}}/collections',
			},
		},
	},
	{
		name: 'Delete a Page',
		value: 'delete-a-page',
		action: 'Delete a page',
		description: 'Permanently deletes a page from your Domo instance. Warning This is destructive and cannot be reversed.',
		routing: {
			request: {
				method: 'DELETE',
				url: '/v1/pages/={{$parameter["page_id"]}}',
			},
		},
	},
	{
		name: 'Delete a Page Collection',
		value: 'delete-a-page-collection',
		action: 'Delete a page collection',
		description: 'Permanently deletes a page collection from your Domo instance. Warning This is destructive and cannot be reversed.',
		routing: {
			request: {
				method: 'DELETE',
				url: '/v1/pages/={{$parameter["page_id"]}}/collections/={{$parameter["page_collection_id"]}}',
			},
		},
	},
	{
		name: 'List Pages',
		value: 'list-pages',
		action: 'List pages',
		description: 'Get a list of all pages in your Domo instance',
		routing: {
			request: {
				method: 'GET',
				url: '/v1/pages',
			},
		},
	},
	{
		name: 'Retrieve a Page',
		value: 'retrieve-a-page',
		action: 'Retrieve a page',
		description: 'Retrieves the details of an existing page',
		routing: {
			request: {
				method: 'GET',
				url: '/v1/pages/={{$parameter["page_id"]}}',
			},
		},
	},
	{
		name: 'Retrieve a Page Collection',
		value: 'retrieve-a-page-collection',
		action: 'Retrieve a page collection',
		routing: {
			request: {
				method: 'GET',
				url: '/v1/pages/={{$parameter["page_id"]}}/collections',
			},
		},
	},
	{
		name: 'Update a Page',
		value: 'update-a-page',
		action: 'Update a page',
		description: 'Updates the specified page by providing values to parameters passed. Any parameter left out of the request will cause the specific page attribute to remain unchanged. Collections cannot be added or removed via this endpoint, only reordered.',
		routing: {
			request: {
				method: 'PUT',
				url: '/v1/pages/={{$parameter["page_id"]}}',
			},
		},
	},
	{
		name: 'Update a Page Collection',
		value: 'update-a-page-collection',
		action: 'Update a page collection',
		routing: {
			request: {
				method: 'PUT',
				url: '/v1/pages/={{$parameter["page_id"]}}/collections/={{$parameter["page_collection_id"]}}',
			},
		},
	},
	],
	},
];

export const pagesFields: INodeProperties[] = [
	{
		displayName: 'Page ID',
		name: 'page_id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['pages'],
				operation: ['retrieve-a-page', 'update-a-page', 'delete-a-page', 'retrieve-a-page-collection', 'create-a-page-collection', 'update-a-page-collection', 'delete-a-page-collection'],
			},
		},
		default: '',
		description: 'The ID of the page',
	},
	{
		displayName: 'Page Collection ID',
		name: 'page_collection_id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['pages'],
				operation: ['update-a-page-collection', 'delete-a-page-collection'],
			},
		},
		default: '',
		description: 'The ID of the page collection',
	},
	{
		displayName: 'Data',
		name: 'data',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				resource: ['pages'],
				operation: ['create-a-page', 'update-a-page', 'create-a-page-collection', 'update-a-page-collection'],
			},
		},
		default: '',
		description: 'The data to send in JSON format',
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
				resource: ['pages'],
				operation: ['list-pages'],
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
				resource: ['pages'],
				operation: ['list-pages'],
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
];
