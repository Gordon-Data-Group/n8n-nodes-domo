import { INodeProperties } from 'n8n-workflow';

export const bricksOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['bricks'],
			},
		},
		options: [
			{
				name: 'Create Brick',
				value: 'createBrick',
				description: 'Create a new brick',
				action: 'Create brick',
				routing: {
					request: {
						method: 'POST',
						url: '/api/content/v1/bricks',
						body: '={{JSON.parse($parameter.brickData)}}',
					},
				},
			},
			{
				name: 'Delete Brick',
				value: 'deleteBrick',
				description: 'Delete a brick',
				action: 'Delete brick',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/content/v1/bricks/" + $parameter.brickId }}',
					},
				},
			},
			{
				name: 'Deploy Brick',
				value: 'deployBrick',
				description: 'Deploy a brick to production',
				action: 'Deploy brick',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/content/v1/bricks/" + $parameter.brickId + "/deploy" }}',
						body: {
							version: '={{$parameter.version}}',
						},
					},
				},
			},
			{
				name: 'Get Brick',
				value: 'getBrick',
				description: 'Get details of a specific brick',
				action: 'Get brick',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/content/v1/bricks/" + $parameter.brickId }}',
					},
				},
			},
			{
				name: 'Get Brick Code',
				value: 'getBrickCode',
				description: 'Get the source code of a brick',
				action: 'Get brick code',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/content/v1/bricks/" + $parameter.brickId + "/code" }}',
					},
				},
			},
			{
				name: 'List Bricks',
				value: 'listBricks',
				description: 'List all bricks',
				action: 'List bricks',
				routing: {
					request: {
						method: 'GET',
						url: '/api/content/v1/bricks',
						qs: {
							limit: '={{Math.min($parameter.limit || 50, 500)}}',
							offset: '={{$parameter.offset || 0}}',
						},
					},
				},
			},
			{
				name: 'Update Brick',
				value: 'updateBrick',
				description: 'Update a brick',
				action: 'Update brick',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/content/v1/bricks/" + $parameter.brickId }}',
						body: '={{JSON.parse($parameter.brickData)}}',
					},
				},
			},
			{
				name: 'Update Brick Code',
				value: 'updateBrickCode',
				description: 'Update the source code of a brick',
				action: 'Update brick code',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/content/v1/bricks/" + $parameter.brickId + "/code" }}',
						body: '={{JSON.parse($parameter.codeData)}}',
					},
				},
			},
		],
		default: 'listBricks',
	},
];

export const bricksFields: INodeProperties[] = [
	// Brick ID field (for most operations)
	{
		displayName: 'Brick ID',
		name: 'brickId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['bricks'],
				operation: ['getBrick', 'updateBrick', 'deleteBrick', 'deployBrick', 'getBrickCode', 'updateBrickCode'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the brick',
	},
	// List bricks fields
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['bricks'],
				operation: ['listBricks'],
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
				resource: ['bricks'],
				operation: ['listBricks'],
			},
		},
		default: 0,
		description: 'Number of bricks to skip',
	},
	// Create and Update brick fields
	{
		displayName: 'Brick Data',
		name: 'brickData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['bricks'],
				operation: ['createBrick', 'updateBrick'],
			},
		},
		default: '{}',
		required: true,
		description: 'JSON object containing brick configuration',
		placeholder: '{"name":"My Brick","description":"Brick description","type":"custom"}',
	},
	// Deploy brick fields
	{
		displayName: 'Version',
		name: 'version',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['bricks'],
				operation: ['deployBrick'],
			},
		},
		default: '',
		required: true,
		description: 'The version to deploy',
	},
	// Update brick code fields
	{
		displayName: 'Code Data',
		name: 'codeData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['bricks'],
				operation: ['updateBrickCode'],
			},
		},
		default: '{}',
		required: true,
		description: 'JSON object containing brick source code',
		placeholder: '{"html":"<div>Content</div>","css":"body { color: #000; }","javascript":"console.log(\'Hello\');"}',
	},
];

