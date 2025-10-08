import type { INodeProperties } from 'n8n-workflow';

export const sandboxOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['sandbox'],
			},
		},
	default: 'list-repositories',
	options: [
	{
		name: 'Create Commit',
		value: 'create-commit',
		action: 'Create commit',
		routing: {
			request: {
				method: 'POST',
				url: '/version/v1/repositories/={{$parameter.repositoryId}}/commitRequests',
			},
		},
	},
	{
		name: 'Get Instance Access',
		value: 'get-instance-access',
		action: 'Get instance access',
		routing: {
			request: {
				method: 'GET',
				url: '/version/v1/repositories/={{$parameter.repositoryId}}/access',
			},
		},
	},
	{
		name: 'Get Repository',
		value: 'get-repository',
		action: 'Get repository',
		routing: {
			request: {
				method: 'GET',
				url: '/version/v1/repositories/={{$parameter.repositoryId}}',
			},
		},
	},
	{
		name: 'Get Repository Commit Requests',
		value: 'get-repository-commit-requests',
		action: 'Get repository commit requests',
		routing: {
			request: {
				method: 'GET',
				url: '/version/v1/repositories/={{$parameter.repositoryId}}/commitRequests',
			},
		},
	},
	{
		name: 'Get Repository Commits',
		value: 'get-repository-commits',
		action: 'Get repository commits',
		routing: {
			request: {
				method: 'GET',
				url: '/version/v1/repositories/={{$parameter.repositoryId}}/commits',
			},
		},
	},
	{
		name: 'Get Sandbox Settings',
		value: 'get-sandbox-settings',
		action: 'Get sandbox settings',
		routing: {
			request: {
				method: 'GET',
				url: '/version/v1/settings',
			},
		},
	},
	{
		name: 'Get User/Group Permissions',
		value: 'get-user-group-permissions',
		action: 'Get user group permissions',
		routing: {
			request: {
				method: 'GET',
				url: '/version/v1/repositories/={{$parameter.repositoryId}}/permissions',
			},
		},
	},
	{
		name: 'List Commit History',
		value: 'list-commit-history',
		action: 'List commit history',
		routing: {
			request: {
				method: 'POST',
				url: '/version/v1/commitRequests/search',
			},
		},
	},
	{
		name: 'List Instances',
		value: 'list-instances',
		action: 'List instances',
		routing: {
			request: {
				method: 'GET',
				url: '/version/v1/authorizations',
			},
		},
	},
	{
		name: 'List Promotion History',
		value: 'list-promotion-history',
		action: 'List promotion history',
		routing: {
			request: {
				method: 'POST',
				url: '/version/v1/promotions/search',
			},
		},
	},
	{
		name: 'List Repositories',
		value: 'list-repositories',
		action: 'List repositories',
		routing: {
			request: {
				method: 'POST',
				url: '/version/v1/repositories/search',
			},
		},
	},
	{
		name: 'Promote and Link',
		value: 'promote-and-link',
		action: 'Promote and link',
		routing: {
			request: {
				method: 'POST',
				url: '/version/v1/repositories/={{$parameter.repositoryId}}/deployments/={{$parameter.deploymentId}}/promoteAndSeed',
			},
		},
	},
	{
		name: 'Update Instance Alias',
		value: 'update-instance-alias',
		action: 'Update instance alias',
		routing: {
			request: {
				method: 'POST',
				url: '/version/v1/authorizations/aliases',
			},
		},
	},
	{
		name: 'Update Repository Instance Access',
		value: 'update-repository-instance-access',
		action: 'Update repository instance access',
		description: 'Must include all domains you want to have access. If a domain is not listed, its access will be removed.',
		routing: {
			request: {
				method: 'POST',
				url: '/version/v1/repositories:repositoryId/access',
			},
		},
	},
	{
		name: 'Update Respoitory User/Group Permissions',
		value: 'update-respoitory-user-group-permissions',
		action: 'Update respoitory user group permissions',
		routing: {
			request: {
				method: 'POST',
				url: '/version/v1/repositories/={{$parameter.repositoryId}}/permissions',
			},
		},
	},
	],
	},
];

export const sandboxFields: INodeProperties[] = [
	{
		displayName: 'Repository ID',
		name: 'repositoryId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['sandbox'],
				operation: ['get-repository', 'get-repository-commits', 'get-repository-commit-requests', 'get-user-group-permissions', 'get-instance-access', 'promote-and-link', 'create-commit', 'update-respoitory-user-group-permissions'],
			},
		},
		default: '',
		description: 'The ID of the repository',
	},
	{
		displayName: 'Deployment ID',
		name: 'deploymentId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['sandbox'],
				operation: ['promote-and-link'],
			},
		},
		default: '',
		description: 'The ID of the deployment',
	},
	{
		displayName: 'Data',
		name: 'data',
		type: 'json',
		required: true,
		displayOptions: {
			show: {
				resource: ['sandbox'],
				operation: ['list-repositories', 'list-promotion-history', 'list-commit-history', 'promote-and-link', 'create-commit', 'update-respoitory-user-group-permissions', 'update-repository-instance-access', 'update-instance-alias'],
			},
		},
		default: '',
		description: 'The data to send',
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
				resource: ['sandbox'],
				operation: ['list-instances'],
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
];
