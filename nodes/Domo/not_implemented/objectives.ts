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
		default: 'listObjectives',
		options: [
			{
				name: 'Create Category',
				value: 'createCategory',
				action: 'Create category',
				routing: {
					request: {
						method: 'POST',
						url: '/api/social/v1/objectives/tags/categories',
						body: '={{JSON.parse($parameter.categoryData)}}',
					},
				},
			},
			{
				name: 'Create Key Result',
				value: 'createKeyResult',
				action: 'Create key result',
				routing: {
					request: {
						method: 'POST',
						url: '/api/social/v1/objectives/key-results',
						body: '={{JSON.parse($parameter.keyResultData)}}',
					},
				},
			},
			{
				name: 'Create Objective',
				value: 'createObjective',
				action: 'Create objective',
				routing: {
					request: {
						method: 'POST',
						url: '/api/social/v1/objectives',
						body: '={{JSON.parse($parameter.objectiveData)}}',
					},
				},
			},
			{
				name: 'Create Tag',
				value: 'createTag',
				action: 'Create tag',
				routing: {
					request: {
						method: 'POST',
						url: '/api/social/v1/objectives/tags',
						body: '={{JSON.parse($parameter.tagData)}}',
					},
				},
			},
			{
				name: 'Delete Category',
				value: 'deleteCategory',
				action: 'Delete category',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/social/v1/objectives/tags/categories/" + $parameter.categoryId }}',
					},
				},
			},
			{
				name: 'Delete Key Result',
				value: 'deleteKeyResult',
				action: 'Delete key result',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/social/v1/objectives/key-results/" + $parameter.keyResultId }}',
					},
				},
			},
			{
				name: 'Delete Objective',
				value: 'deleteObjective',
				action: 'Delete objective',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/social/v1/objectives/" + $parameter.objectiveId }}',
					},
				},
			},
			{
				name: 'Delete Tag',
				value: 'deleteTag',
				action: 'Delete tag',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/social/v1/objectives/tags/" + $parameter.tagId }}',
					},
				},
			},
			{
				name: 'Get Company Objectives Report',
				value: 'getCompanyObjectivesReport',
				action: 'Get company objectives report',
				routing: {
					request: {
						method: 'GET',
						url: '/api/social/v2/objectives/report',
						qs: {
							filterKeyResults: '={{$parameter.filterKeyResults}}',
							periodId: '={{$parameter.periodId}}',
							type: '={{$parameter.type}}',
						},
					},
				},
			},
			{
				name: 'Get Key Result Chart',
				value: 'getKeyResultChart',
				action: 'Get key result chart',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/social/v1/objectives/key-results/" + $parameter.keyResultId + "/chart" }}',
					},
				},
			},
			{
				name: 'Get Key Result Values',
				value: 'getKeyResultValues',
				action: 'Get key result values',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/social/v1/objectives/key-results/" + $parameter.keyResultId + "/values" }}',
					},
				},
			},
			{
				name: 'List Categories',
				value: 'listCategories',
				action: 'List categories',
				routing: {
					request: {
						method: 'GET',
						url: '/api/social/v1/objectives/tags/categories',
						qs: {
							all: '={{$parameter.all}}',
						},
					},
				},
			},
			{
				name: 'List Events',
				value: 'listEvents',
				action: 'List events',
				routing: {
					request: {
						method: 'GET',
						url: '/api/social/v1/objectives/events',
					},
				},
			},
			{
				name: 'List Objective Drafts',
				value: 'listObjectiveDrafts',
				action: 'List objective drafts',
				routing: {
					request: {
						method: 'GET',
						url: '/api/social/v2/objectives/draft',
						qs: {
							filterKeyResults: '={{$parameter.filterKeyResults}}',
							periodId: '={{$parameter.periodId}}',
							userId: '={{$parameter.userId}}',
						},
					},
				},
			},
			{
				name: 'List Objectives',
				value: 'listObjectives',
				action: 'List objectives',
				routing: {
					request: {
						method: 'GET',
						url: '/api/social/v1/objectives/search',
						qs: {
							filterKeyResults: '={{$parameter.filterKeyResults}}',
							periodId: '={{$parameter.periodId}}',
							query: '={{$parameter.query}}',
						},
					},
				},
			},
			{
				name: 'List Objectives to Update',
				value: 'listObjectivesToUpdate',
				action: 'List objectives to update',
				routing: {
					request: {
						method: 'GET',
						url: '/api/social/v1/objectives/needs-update',
						qs: {
							filterKeyResults: '={{$parameter.filterKeyResults}}',
							periodId: '={{$parameter.periodId}}',
							userId: '={{$parameter.userId}}',
						},
					},
				},
			},
			{
				name: 'List Periods',
				value: 'listPeriods',
				action: 'List periods',
				routing: {
					request: {
						method: 'GET',
						url: '/api/social/v1/objectives/periods',
						qs: {
							all: '={{$parameter.all}}',
						},
					},
				},
			},
			{
				name: 'List Personal Objectives',
				value: 'listPersonalObjectives',
				action: 'List personal objectives',
				routing: {
					request: {
						method: 'GET',
						url: '/api/social/v2/objectives/profile',
						qs: {
							filterKeyResults: '={{$parameter.filterKeyResults}}',
							includeSampleGoal: '={{$parameter.includeSampleGoal}}',
							ownerId: '={{$parameter.ownerId}}',
							periodId: '={{$parameter.periodId}}',
							type: '={{$parameter.type}}',
						},
					},
				},
			},
			{
				name: 'List Tags',
				value: 'listTags',
				action: 'List tags',
				routing: {
					request: {
						method: 'GET',
						url: '/api/social/v1/objectives/tags',
						qs: {
							all: '={{$parameter.all}}',
						},
					},
				},
			},
			{
				name: 'List Team Objectives',
				value: 'listTeamObjectives',
				action: 'List team objectives',
				routing: {
					request: {
						method: 'GET',
						url: '/api/social/v2/objectives/teams-profile',
						qs: {
							filterKeyResults: '={{$parameter.filterKeyResults}}',
							ownerId: '={{$parameter.ownerId}}',
							periodId: '={{$parameter.periodId}}',
						},
					},
				},
			},
			{
				name: 'Update Category',
				value: 'updateCategory',
				action: 'Update category',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/social/v1/objectives/tags/categories/" + $parameter.categoryId }}',
						body: '={{JSON.parse($parameter.categoryData)}}',
					},
				},
			},
			{
				name: 'Update Key Result',
				value: 'updateKeyResult',
				action: 'Update key result',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/social/v1/objectives/key-results/" + $parameter.keyResultId }}',
						body: '={{JSON.parse($parameter.keyResultData)}}',
					},
				},
			},
			{
				name: 'Update Key Result Tags',
				value: 'updateKeyResultTags',
				action: 'Update key result tags',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/social/v1/objectives/key-results/" + $parameter.keyResultId + "/tags" }}',
						qs: {
							periodId: '={{$parameter.periodId}}',
						},
						body: '={{JSON.parse($parameter.tags)}}',
					},
				},
			},
			{
				name: 'Update Objective',
				value: 'updateObjective',
				action: 'Update objective',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/social/v1/objectives/" + $parameter.objectiveId }}',
						qs: {
							periodId: '={{$parameter.periodId}}',
						},
						body: '={{JSON.parse($parameter.objectiveData)}}',
					},
				},
			},
			{
				name: 'Update Tag',
				value: 'updateTag',
				action: 'Update tag',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/social/v1/objectives/tags/" + $parameter.tagId }}',
						body: '={{JSON.parse($parameter.tagData)}}',
					},
				},
			},
		],
	},
];

export const objectivesFields: INodeProperties[] = [
	// ID fields
	{
		displayName: 'Objective ID',
		name: 'objectiveId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['objectives'],
				operation: ['updateObjective', 'deleteObjective'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the objective',
	},
	{
		displayName: 'Key Result ID',
		name: 'keyResultId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['objectives'],
				operation: [
					'getKeyResultChart',
					'getKeyResultValues',
					'updateKeyResult',
					'updateKeyResultTags',
					'deleteKeyResult',
				],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the key result',
	},
	{
		displayName: 'Tag ID',
		name: 'tagId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['objectives'],
				operation: ['updateTag', 'deleteTag'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the tag',
	},
	{
		displayName: 'Category ID',
		name: 'categoryId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['objectives'],
				operation: ['updateCategory', 'deleteCategory'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the category',
	},
	// Query parameters
	{
		displayName: 'Filter Key Results',
		name: 'filterKeyResults',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['objectives'],
				operation: [
					'listObjectives',
					'listPersonalObjectives',
					'listTeamObjectives',
					'listObjectivesToUpdate',
					'listObjectiveDrafts',
					'getCompanyObjectivesReport',
				],
			},
		},
		default: '',
		description: 'Filter key results',
	},
	{
		displayName: 'Period ID',
		name: 'periodId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['objectives'],
				operation: [
					'listObjectives',
					'listPersonalObjectives',
					'listTeamObjectives',
					'listObjectivesToUpdate',
					'listObjectiveDrafts',
					'getCompanyObjectivesReport',
					'updateObjective',
					'updateKeyResultTags',
				],
			},
		},
		default: '',
		description: 'The period ID',
	},
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['objectives'],
				operation: ['listObjectives'],
			},
		},
		default: '',
		description: 'Search query',
	},
	{
		displayName: 'Include Sample Goal',
		name: 'includeSampleGoal',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['objectives'],
				operation: ['listPersonalObjectives'],
			},
		},
		default: '',
		description: 'Include sample goal',
	},
	{
		displayName: 'Owner ID',
		name: 'ownerId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['objectives'],
				operation: ['listPersonalObjectives', 'listTeamObjectives'],
			},
		},
		default: '',
		description: 'The owner ID',
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['objectives'],
				operation: ['listPersonalObjectives', 'getCompanyObjectivesReport'],
			},
		},
		default: '',
		description: 'The type',
	},
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['objectives'],
				operation: ['listObjectivesToUpdate', 'listObjectiveDrafts'],
			},
		},
		default: '',
		description: 'The user ID',
	},
	{
		displayName: 'All',
		name: 'all',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['objectives'],
				operation: ['listPeriods', 'listTags', 'listCategories'],
			},
		},
		default: '',
		description: 'Return all results',
	},
	// JSON body fields
	{
		displayName: 'Objective Data',
		name: 'objectiveData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['objectives'],
				operation: ['createObjective', 'updateObjective'],
			},
		},
		default: '',
		placeholder: '{"name":"Objective Name","description":"Description","startsAt":"2025-01-01T12:00:00","expiresAt":"2025-01-01T12:00:00","status":"GOOD","owners":[{"ownerID":12345,"ownerType":"USER","primary":true}],"periodID":2,"keyResults":[],"tags":[],"writeAccess":true,"type":"PERSONAL"}',
		required: true,
		description: 'JSON object containing objective configuration',
	},
	{
		displayName: 'Key Result Data',
		name: 'keyResultData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['objectives'],
				operation: ['createKeyResult', 'updateKeyResult'],
			},
		},
		default: '',
		placeholder: '{"keyResult":{"state":"OPEN","ownerID":12345,"ownerType":"USER","owners":[{"ownerID":12345,"ownerType":"USER","primary":true}],"name":"Key Result Name","description":"Description","startValue":1,"currentValue":1,"targetValue":1,"status":"POOR","operator":"GREATER_THAN_EQUALS_TO","startsAt":"2025-01-01T12:00:00","expiresAt":"2025-01-01T12:00:00"}}',
		required: true,
		description: 'JSON object containing key result configuration',
	},
	{
		displayName: 'Tag Data',
		name: 'tagData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['objectives'],
				operation: ['createTag', 'updateTag'],
			},
		},
		default: '',
		placeholder: '{"name":"Tag Name","category":{"ID":1,"name":"Category Name"}}',
		required: true,
		description: 'JSON object containing tag configuration',
	},
	{
		displayName: 'Category Data',
		name: 'categoryData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['objectives'],
				operation: ['createCategory', 'updateCategory'],
			},
		},
		default: '',
		placeholder: '{"name":"Category Name"}',
		required: true,
		description: 'JSON object containing category configuration',
	},
	{
		displayName: 'Tags',
		name: 'tags',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['objectives'],
				operation: ['updateKeyResultTags'],
			},
		},
		default: '',
		placeholder: '[1]',
		required: true,
		description: 'JSON array of tag IDs',
	},
];
