import { INodeProperties } from 'n8n-workflow';

export const codeEngineOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['codeEngine'],
			},
		},
		options: [
			{
				name: 'Create Package Release (Deploy)',
				value: 'createPackageRelease',
				description: 'Create a package release (deploy)',
				action: 'Create package release deploy',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/codeengine/v2/packages/" + $parameter.packageId + "/versions/" + $parameter.version + "/release" }}',
					},
				},
			},
			{
				name: 'Get Package',
				value: 'getPackage',
				description: 'Get a package',
				action: 'Get package',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/codeengine/v2/packages/" + $parameter.packageId }}',
						qs: {
							parts: '={{$parameter.parts}}',
						},
					},
				},
			},
			{
				name: 'Get Package Permissions',
				value: 'getPackagePermissions',
				action: 'Get package permissions',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/codeengine/v2/packages/" + $parameter.packageId + "/permissions" }}',
					},
				},
			},
			{
				name: 'Get Package Version',
				value: 'getPackageVersion',
				description: 'Get a package version',
				action: 'Get package version',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/codeengine/v2/packages/" + $parameter.packageId + "/versions/" + $parameter.version }}',
						qs: {
							parts: '={{$parameter.parts}}',
						},
					},
				},
			},
			{
				name: 'Run Function',
				value: 'runFunction',
				description: 'Run a function',
				action: 'Run function',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/codeengine/v2/packages/" + $parameter.packageId + "/versions/" + $parameter.version + "/functions/" + $parameter.functionName }}',
						body: '={{JSON.parse($parameter.functionData)}}',
					},
				},
			},
			{
				name: 'Search Packages',
				value: 'searchPackages',
				action: 'Search packages',
				routing: {
					request: {
						method: 'POST',
						url: '/api/search/v1/query',
						body: '={{JSON.parse($parameter.searchQuery)}}',
					},
				},
			},
			{
				name: 'Update Package',
				value: 'updatePackage',
				description: 'Update a package',
				action: 'Update package',
				routing: {
					request: {
						method: 'POST',
						url: '/api/codeengine/v2/packages',
						body: '={{JSON.parse($parameter.packageData)}}',
					},
				},
			},
			{
				name: 'Update Package Owner',
				value: 'updatePackageOwner',
				action: 'Update package owner',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/codeengine/v2/packages/" + $parameter.packageId }}',
						body: '={{JSON.parse($parameter.ownerData)}}',
					},
				},
			},
			{
				name: 'Update Package Permissions',
				value: 'updatePackagePermissions',
				action: 'Update package permissions',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/codeengine/v2/packages/" + $parameter.packageId + "/permissions" }}',
						body: '={{JSON.parse($parameter.permissionsData)}}',
					},
				},
			},
		],
		default: 'searchPackages',
	},
];

export const codeEngineFields: INodeProperties[] = [
	// Package ID field
	{
		displayName: 'Package ID',
		name: 'packageId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['codeEngine'],
				operation: [
					'getPackage',
					'getPackageVersion',
					'getPackagePermissions',
					'runFunction',
					'createPackageRelease',
					'updatePackageOwner',
					'updatePackagePermissions',
				],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the package',
	},
	// Version field
	{
		displayName: 'Version',
		name: 'version',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['codeEngine'],
				operation: ['getPackageVersion', 'runFunction', 'createPackageRelease'],
			},
		},
		default: '',
		required: true,
		description: 'The version of the package',
	},
	// Function Name field
	{
		displayName: 'Function Name',
		name: 'functionName',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['codeEngine'],
				operation: ['runFunction'],
			},
		},
		default: '',
		required: true,
		description: 'The name of the function to run',
	},
	// Parts field
	{
		displayName: 'Parts',
		name: 'parts',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['codeEngine'],
				operation: ['getPackage', 'getPackageVersion'],
			},
		},
		default: '',
		description: 'Parts to include in the response',
	},
	// Search Query field
	{
		displayName: 'Search Query',
		name: 'searchQuery',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['codeEngine'],
				operation: ['searchPackages'],
			},
		},
		default: '',
		placeholder: '{"query":"*","entityList":[["package"]],"count":100,"offset":0}',
		required: true,
		description: 'JSON query object for searching packages',
	},
	// Package Data field
	{
		displayName: 'Package Data',
		name: 'packageData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['codeEngine'],
				operation: ['updatePackage'],
			},
		},
		default: '',
		placeholder: '{"name":"Package Name","version":"1.0.0","code":"","environment":"LAMBDA","language":"JAVASCRIPT","manifest":{"functions":[]}}',
		required: true,
		description: 'JSON object containing package configuration',
	},
	// Function Data field
	{
		displayName: 'Function Data',
		name: 'functionData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['codeEngine'],
				operation: ['runFunction'],
			},
		},
		default: '',
		placeholder: '{"inputVariables":{"variable1":"input"},"settings":{"getLogs":true}}',
		required: true,
		description: 'JSON object containing function inputs and settings',
	},
	// Owner Data field
	{
		displayName: 'Owner Data',
		name: 'ownerData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['codeEngine'],
				operation: ['updatePackageOwner'],
			},
		},
		default: '',
		placeholder: '{"owner":123456}',
		required: true,
		description: 'JSON object containing owner ID',
	},
	// Permissions Data field
	{
		displayName: 'Permissions Data',
		name: 'permissionsData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['codeEngine'],
				operation: ['updatePackagePermissions'],
			},
		},
		default: '',
		placeholder: '[{"ID":"123456","permissions":["ADMIN","READ","WRITE"],"name":"User Name","type":"USER"}]',
		required: true,
		description: 'JSON array containing permissions configuration',
	},
];

