import type { INodeProperties } from 'n8n-workflow';

export const objectivesOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['objectives'],
			},
		},
	default: 'list-objectives',
	options: [
	{
		name: 'Create Category',
		value: 'create-category',
		action: 'Create category',
		routing: {
			request: {
				method: 'POST',
				url: '/social/v1/objectives/tags/categories',
			},
		},
	},
	{
		name: 'Create Key Result',
		value: 'create-key-result',
		action: 'Create key result',
		routing: {
			request: {
				method: 'POST',
				url: '/social/v1/objectives/key-results',
			},
		},
	},
	{
		name: 'Create Objective',
		value: 'create-objective',
		action: 'Create objective',
		routing: {
			request: {
				method: 'POST',
				url: '/social/v1/objectives',
			},
		},
	},
	{
		name: 'Create Tag',
		value: 'create-tag',
		action: 'Create tag',
		routing: {
			request: {
				method: 'POST',
				url: '/social/v1/objectives/tags',
			},
		},
	},
	{
		name: 'Delete Category',
		value: 'delete-category',
		action: 'Delete category',
		routing: {
			request: {
				method: 'DELETE',
				url: '/social/v1/objectives/tags/categories/={{$parameter.id}}',
			},
		},
	},
	{
		name: 'Delete Key Result',
		value: 'delete-key-result',
		action: 'Delete key result',
		routing: {
			request: {
				method: 'DELETE',
				url: '/social/v1/objectives/key-results/={{$parameter.id}}',
			},
		},
	},
	{
		name: 'Delete Objective',
		value: 'delete-objective',
		action: 'Delete objective',
		routing: {
			request: {
				method: 'DELETE',
				url: '/social/v1/objectives/={{$parameter.id}}',
			},
		},
	},
	{
		name: 'Delete Tag',
		value: 'delete-tag',
		action: 'Delete tag',
		routing: {
			request: {
				method: 'DELETE',
				url: '/social/v1/objectives/tags/={{$parameter.id}}',
			},
		},
	},
	{
		name: 'Get Company Objectives Report',
		value: 'get-company-objectives-report',
		action: 'Get company objectives report',
		routing: {
			request: {
				method: 'GET',
				url: '/social/v2/objectives/report',
			},
		},
	},
	{
		name: 'Get Key Result Chart',
		value: 'get-key-result-chart',
		action: 'Get key result chart',
		routing: {
			request: {
				method: 'GET',
				url: '/social/v1/objectives/key-results/={{$parameter.id}}/chart',
			},
		},
	},
	{
		name: 'Get Key Result Values',
		value: 'get-key-result-values',
		action: 'Get key result values',
		routing: {
			request: {
				method: 'GET',
				url: '/social/v1/objectives/key-results/={{$parameter.id}}/values',
			},
		},
	},
	{
		name: 'List Categories',
		value: 'list-categories',
		action: 'List categories',
		routing: {
			request: {
				method: 'GET',
				url: '/social/v1/objectives/tags/categories',
			},
		},
	},
	{
		name: 'List Events',
		value: 'list-events',
		action: 'List events',
		routing: {
			request: {
				method: 'GET',
				url: '/social/v1/objectives/events',
			},
		},
	},
	{
		name: 'List Objective Drafts',
		value: 'list-objective-drafts',
		action: 'List objective drafts',
		routing: {
			request: {
				method: 'GET',
				url: '/social/v2/objectives/draft',
			},
		},
	},
	{
		name: 'List Objectives',
		value: 'list-objectives',
		action: 'List objectives',
		routing: {
			request: {
				method: 'GET',
				url: '/social/v1/objectives/search',
			},
		},
	},
	{
		name: 'List Objectives to Update',
		value: 'list-objectives-to-update',
		action: 'List objectives to update',
		routing: {
			request: {
				method: 'GET',
				url: '/social/v1/objectives/needs-update',
			},
		},
	},
	{
		name: 'List Periods',
		value: 'list-periods',
		action: 'List periods',
		routing: {
			request: {
				method: 'GET',
				url: '/social/v1/objectives/periods',
			},
		},
	},
	{
		name: 'List Personal Objectives',
		value: 'list-personal-objectives',
		action: 'List personal objectives',
		routing: {
			request: {
				method: 'GET',
				url: '/social/v2/objectives/profile',
			},
		},
	},
	{
		name: 'List Tags',
		value: 'list-tags',
		action: 'List tags',
		routing: {
			request: {
				method: 'GET',
				url: '/social/v1/objectives/tags',
			},
		},
	},
	{
		name: 'List Team Objectives',
		value: 'list-team-objectives',
		action: 'List team objectives',
		routing: {
			request: {
				method: 'GET',
				url: '/social/v2/objectives/teams-profile',
			},
		},
	},
	{
		name: 'Update Category',
		value: 'update-category',
		action: 'Update category',
		routing: {
			request: {
				method: 'PUT',
				url: '/social/v1/objectives/tags/categories/={{$parameter.id}}',
			},
		},
	},
	{
		name: 'Update Key Result',
		value: 'update-key-result',
		action: 'Update key result',
		routing: {
			request: {
				method: 'PUT',
				url: '/social/v1/objectives/key-results/={{$parameter.id}}',
			},
		},
	},
	{
		name: 'Update Key Result Tags',
		value: 'update-key-result-tags',
		action: 'Update key result tags',
		routing: {
			request: {
				method: 'PUT',
				url: '/social/v1/objectives/key-results/={{$parameter.id}}/tags',
			},
		},
	},
	{
		name: 'Update Objective',
		value: 'update-objective',
		action: 'Update objective',
		routing: {
			request: {
				method: 'PUT',
				url: '/social/v1/objectives/={{$parameter.id}}',
			},
		},
	},
	{
		name: 'Update Tag',
		value: 'update-tag',
		action: 'Update tag',
		routing: {
			request: {
				method: 'PUT',
				url: '/social/v1/objectives/tags/={{$parameter.id}}',
			},
		},
	},
	],
	},
];

export const objectivesFields: INodeProperties[] = [
		{
			displayName: 'FilterKeyResults',
			name: 'filterKeyResults',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['objectives'],
					operation: ['list-objectives'],
				},
			},
			default: '',
			description: 'The filterKeyResults parameter',
			routing: {
				request: {
					qs: {
						filterKeyResults: '={{$parameter.filterKeyResults}}',
					},
				},
			},
		},
		{
			displayName: 'PeriodId',
			name: 'periodId',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['objectives'],
					operation: ['list-objectives'],
				},
			},
			default: '',
			description: 'The periodId parameter',
			routing: {
				request: {
					qs: {
						periodId: '={{$parameter.periodId}}',
					},
				},
			},
		},
		{
			displayName: 'Query',
			name: 'query',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['objectives'],
					operation: ['list-objectives'],
				},
			},
			default: '',
			description: 'The query parameter',
			routing: {
				request: {
					qs: {
						query: '={{$parameter.query}}',
					},
				},
			},
		},
		{
			displayName: 'FilterKeyResults',
			name: 'filterKeyResults',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['objectives'],
					operation: ['list-personal-objectives'],
				},
			},
			default: '',
			description: 'The filterKeyResults parameter',
			routing: {
				request: {
					qs: {
						filterKeyResults: '={{$parameter.filterKeyResults}}',
					},
				},
			},
		},
		{
			displayName: 'IncludeSampleGoal',
			name: 'includeSampleGoal',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['objectives'],
					operation: ['list-personal-objectives'],
				},
			},
			default: '',
			description: 'The includeSampleGoal parameter',
			routing: {
				request: {
					qs: {
						includeSampleGoal: '={{$parameter.includeSampleGoal}}',
					},
				},
			},
		},
		{
			displayName: 'OwnerId',
			name: 'ownerId',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['objectives'],
					operation: ['list-personal-objectives'],
				},
			},
			default: '',
			description: 'The ownerId parameter',
			routing: {
				request: {
					qs: {
						ownerId: '={{$parameter.ownerId}}',
					},
				},
			},
		},
		{
			displayName: 'PeriodId',
			name: 'periodId',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['objectives'],
					operation: ['list-personal-objectives'],
				},
			},
			default: '',
			description: 'The periodId parameter',
			routing: {
				request: {
					qs: {
						periodId: '={{$parameter.periodId}}',
					},
				},
			},
		},
		{
			displayName: 'Type',
			name: 'type',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['objectives'],
					operation: ['list-personal-objectives'],
				},
			},
			default: '',
			description: 'The type parameter',
			routing: {
				request: {
					qs: {
						type: '={{$parameter.type}}',
					},
				},
			},
		},
		{
			displayName: 'FilterKeyResults',
			name: 'filterKeyResults',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['objectives'],
					operation: ['list-team-objectives'],
				},
			},
			default: '',
			description: 'The filterKeyResults parameter',
			routing: {
				request: {
					qs: {
						filterKeyResults: '={{$parameter.filterKeyResults}}',
					},
				},
			},
		},
		{
			displayName: 'OwnerId',
			name: 'ownerId',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['objectives'],
					operation: ['list-team-objectives'],
				},
			},
			default: '',
			description: 'The ownerId parameter',
			routing: {
				request: {
					qs: {
						ownerId: '={{$parameter.ownerId}}',
					},
				},
			},
		},
		{
			displayName: 'PeriodId',
			name: 'periodId',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['objectives'],
					operation: ['list-team-objectives'],
				},
			},
			default: '',
			description: 'The periodId parameter',
			routing: {
				request: {
					qs: {
						periodId: '={{$parameter.periodId}}',
					},
				},
			},
		},
		{
			displayName: 'All',
			name: 'all',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['objectives'],
					operation: ['list-periods'],
				},
			},
			default: '',
			description: 'The all parameter',
			routing: {
				request: {
					qs: {
						all: '={{$parameter.all}}',
					},
				},
			},
		},
		{
			displayName: 'All',
			name: 'all',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['objectives'],
					operation: ['list-tags'],
				},
			},
			default: '',
			description: 'The all parameter',
			routing: {
				request: {
					qs: {
						all: '={{$parameter.all}}',
					},
				},
			},
		},
		{
			displayName: 'All',
			name: 'all',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['objectives'],
					operation: ['list-categories'],
				},
			},
			default: '',
			description: 'The all parameter',
			routing: {
				request: {
					qs: {
						all: '={{$parameter.all}}',
					},
				},
			},
		},
		{
			displayName: 'FilterKeyResults',
			name: 'filterKeyResults',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['objectives'],
					operation: ['list-objectives-to-update'],
				},
			},
			default: '',
			description: 'The filterKeyResults parameter',
			routing: {
				request: {
					qs: {
						filterKeyResults: '={{$parameter.filterKeyResults}}',
					},
				},
			},
		},
		{
			displayName: 'PeriodId',
			name: 'periodId',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['objectives'],
					operation: ['list-objectives-to-update'],
				},
			},
			default: '',
			description: 'The periodId parameter',
			routing: {
				request: {
					qs: {
						periodId: '={{$parameter.periodId}}',
					},
				},
			},
		},
		{
			displayName: 'UserId',
			name: 'userId',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['objectives'],
					operation: ['list-objectives-to-update'],
				},
			},
			default: '',
			description: 'The userId parameter',
			routing: {
				request: {
					qs: {
						userId: '={{$parameter.userId}}',
					},
				},
			},
		},
		{
			displayName: 'FilterKeyResults',
			name: 'filterKeyResults',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['objectives'],
					operation: ['list-objective-drafts'],
				},
			},
			default: '',
			description: 'The filterKeyResults parameter',
			routing: {
				request: {
					qs: {
						filterKeyResults: '={{$parameter.filterKeyResults}}',
					},
				},
			},
		},
		{
			displayName: 'PeriodId',
			name: 'periodId',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['objectives'],
					operation: ['list-objective-drafts'],
				},
			},
			default: '',
			description: 'The periodId parameter',
			routing: {
				request: {
					qs: {
						periodId: '={{$parameter.periodId}}',
					},
				},
			},
		},
		{
			displayName: 'UserId',
			name: 'userId',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['objectives'],
					operation: ['list-objective-drafts'],
				},
			},
			default: '',
			description: 'The userId parameter',
			routing: {
				request: {
					qs: {
						userId: '={{$parameter.userId}}',
					},
				},
			},
		},
		{
			displayName: 'FilterKeyResults',
			name: 'filterKeyResults',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['objectives'],
					operation: ['get-company-objectives-report'],
				},
			},
			default: '',
			description: 'The filterKeyResults parameter',
			routing: {
				request: {
					qs: {
						filterKeyResults: '={{$parameter.filterKeyResults}}',
					},
				},
			},
		},
		{
			displayName: 'PeriodId',
			name: 'periodId',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['objectives'],
					operation: ['get-company-objectives-report'],
				},
			},
			default: '',
			description: 'The periodId parameter',
			routing: {
				request: {
					qs: {
						periodId: '={{$parameter.periodId}}',
					},
				},
			},
		},
		{
			displayName: 'Type',
			name: 'type',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['objectives'],
					operation: ['get-company-objectives-report'],
				},
			},
			default: '',
			description: 'The type parameter',
			routing: {
				request: {
					qs: {
						type: '={{$parameter.type}}',
					},
				},
			},
		},
	{
		displayName: 'ID',
		name: 'id',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['objectives'],
				operation: ['get-key-result-chart', 'get-key-result-values', 'update-objective', 'update-key-result', 'update-key-result-tags', 'update-tag', 'update-category', 'delete-objective', 'delete-key-result', 'delete-tag', 'delete-category'],
			},
		},
		default: '',
		description: 'The ID of the objective, key result, tag, or category',
	},
		{
			displayName: 'Data',
			name: 'data',
			type: 'json',
			required: true,
			displayOptions: {
				show: {
					resource: ['objectives'],
					operation: ['create-objective'],
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
			displayName: 'Data',
			name: 'data',
			type: 'json',
			required: true,
			displayOptions: {
				show: {
					resource: ['objectives'],
					operation: ['create-key-result'],
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
			displayName: 'Data',
			name: 'data',
			type: 'json',
			required: true,
			displayOptions: {
				show: {
					resource: ['objectives'],
					operation: ['create-tag'],
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
			displayName: 'Data',
			name: 'data',
			type: 'json',
			required: true,
			displayOptions: {
				show: {
					resource: ['objectives'],
					operation: ['create-category'],
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
			displayName: 'Data',
			name: 'data',
			type: 'json',
			required: true,
			displayOptions: {
				show: {
					resource: ['objectives'],
					operation: ['update-objective'],
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
			displayName: 'PeriodId',
			name: 'periodId',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['objectives'],
					operation: ['update-objective'],
				},
			},
			default: '',
			description: 'The periodId parameter',
			routing: {
				request: {
					qs: {
						periodId: '={{$parameter.periodId}}',
					},
				},
			},
		},
		{
			displayName: 'Data',
			name: 'data',
			type: 'json',
			required: true,
			displayOptions: {
				show: {
					resource: ['objectives'],
					operation: ['update-key-result'],
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
			displayName: 'Data',
			name: 'data',
			type: 'json',
			required: true,
			displayOptions: {
				show: {
					resource: ['objectives'],
					operation: ['update-key-result-tags'],
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
			displayName: 'PeriodId',
			name: 'periodId',
			type: 'string',
			displayOptions: {
				show: {
					resource: ['objectives'],
					operation: ['update-key-result-tags'],
				},
			},
			default: '',
			description: 'The periodId parameter',
			routing: {
				request: {
					qs: {
						periodId: '={{$parameter.periodId}}',
					},
				},
			},
		},
		{
			displayName: 'Data',
			name: 'data',
			type: 'json',
			required: true,
			displayOptions: {
				show: {
					resource: ['objectives'],
					operation: ['update-tag'],
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
			displayName: 'Data',
			name: 'data',
			type: 'json',
			required: true,
			displayOptions: {
				show: {
					resource: ['objectives'],
					operation: ['update-category'],
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
];
