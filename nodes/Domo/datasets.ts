import { INodeProperties } from 'n8n-workflow';

// TODO: Add create, export data, and update operations

export const datasetOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['dataset'],
			},
		},
		options: [
			{
				name: 'Delete Dataset',
				value: 'delete',
				description: 'Delete a dataset by ID',
				action: 'Delete a dataset',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/data/v3/datasources/{{ $parameter["datasetId"].toString() }}',
						qs: {
							deleteMethod: 'soft',
						},
					},
				},
			},
			{
				name: 'Get Definition',
				value: 'getDefinition',
				description: 'Get a specific dataset definition by ID',
				action: 'Get a dataset definition',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/data/v3/datasources/{{ $parameter["datasetId"].toString() }}',
						qs: {
							includeAllDetails: true,
							includePrivate: true,
						},
					},
				},
			},
			{
				name: 'Get Lineage',
				value: 'getLineage',
				description: 'Get the downstream lineage of a dataset',
				action: 'Get lineage downstream',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/data/v3/datasources/{{ $parameter["datasetId"].toString() }}',
						qs: {
							traverseUp: '={{$parameter.traverseUp || false}}',
							maxDepth: '={{$parameter.maxDepth || 100}}',
							requestEntities: "CARD,ALERT,DATA_SOURCE,DATAFLOW",
						},
					},
				},
			},
			{
				name: 'Get Permissions',
				value: 'getPermissions',
				description: 'Get permissions for the given dataset',
				action: 'Get permissions',
				routing: {
					request: {
						method: 'GET',
						url: '/api/data/v3/datasources/{{ $parameter["datasetId"].toString() }}/permissions',
					},
				},
			},
			{
				name: 'Get Powered Cards',
				value: 'getPoweredCards',
				description: 'Get cards powered by the given dataset',
				action: 'Get powered cards',
				routing: {
					request: {
						method: 'GET',
						url: '/api/data/v3/datasources/{{ $parameter["datasetId"].toString() }}/poweredCards',
						qs: {
							drill: true,
						},
					},
				},
			},
			{
				name: 'Get Schema',
				value: 'getSchema',
				description: 'Get the schema of a dataset',
				action: 'Get a dataset schema',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/data/v3/datasources/{{ $parameter["datasetId"].toString() }}/schema/indexed',
						qs: {
							includeHidden: true,
						},
					},
				},
			},
			{
				name: 'List',
				value: 'list',
				description: 'Get a list of datasets',
				action: 'List datasets',
				routing: {
					request: {
						method: 'GET',
						url: '/api/data/v3/datasources',
						qs: {
							limit: '={{Math.min($parameter.limit || 50, 50)}}',
							offset: '={{$parameter.offset || 0}}',
						},
					},
				},
			},
		],
		default: 'getDefinition',
	},
];

export const datasetFields: INodeProperties[] = [
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['list'],
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
				resource: ['dataset'],
				operation: ['list'],
			},
		},
		default: 0,
		description: 'Number of datasets to skip',
	},
	{
		displayName: 'Dataset ID',
		name: 'datasetId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['getDefinition', 'update', 'delete', 'getSchema', 'getPoweredCards', 'getPermissions'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the dataset',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		required: true,
		description: 'The name of the dataset',
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		description: 'The description of the dataset',
	},
	{
		displayName: 'Schema',
		name: 'schema',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		required: true,
		description: 'The schema definition for the dataset',
		placeholder: '{\n  "columns": [\n    {\n      "type": "STRING",\n      "name": "Column1"\n    }\n  ]\n}',
	},
	{
		displayName: 'Traverse Up',
		name: 'traverseUp',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['lineage'],
			},
		},
		default: false,
		description: 'Whether to traverse up the lineage',
	},
	{
		displayName: 'Max Depth',
		name: 'maxDepth',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['lineage'],
			},
		},
		default: 100,
		typeOptions: {
			minValue: 1,
		},
		description: 'The maximum depth of the lineage',
	},
];
