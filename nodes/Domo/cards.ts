import { INodeProperties } from 'n8n-workflow';

export const cardOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['card'],
			},
		},
		options: [
			{
				name: 'Acknowledge Problem',
				value: 'acknowledgeProblem',
				description: 'Acknowledge a problem on a card',
				action: 'Acknowledge problem',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/content/v1/cards/" + $parameter.cardId + "/problems/" + $parameter.problemId + "/acknowledge" }}',
					},
				},
			},
			{
				name: 'Create Card',
				value: 'createCard',
				description: 'Create a new card',
				action: 'Create card',
				routing: {
					request: {
						method: 'POST',
						url: '/api/content/v1/cards',
						body: '={{JSON.parse($parameter.cardData)}}',
					},
				},
			},
			{
				name: 'Delete Card',
				value: 'deleteCard',
				description: 'Delete a card',
				action: 'Delete card',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/content/v1/cards/" + $parameter.cardId }}',
					},
				},
			},
			{
				name: 'Duplicate Card',
				value: 'duplicateCard',
				description: 'Duplicate a card',
				action: 'Duplicate card',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/content/v1/cards/" + $parameter.cardId + "/duplicate" }}',
						body: {
							name: '={{$parameter.newCardName}}',
						},
					},
				},
			},
			{
				name: 'Export Card',
				value: 'exportCard',
				description: 'Export a card',
				action: 'Export card',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/content/v1/cards/" + $parameter.cardId + "/export" }}',
						qs: {
							format: '={{$parameter.exportFormat}}',
						},
					},
				},
			},
			{
				name: 'Get Card',
				value: 'getCard',
				description: 'Get details of a specific card',
				action: 'Get card',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/content/v1/cards/" + $parameter.cardId }}',
					},
				},
			},
			{
				name: 'Get Card Data',
				value: 'getCardData',
				description: 'Get data for a card',
				action: 'Get card data',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/content/v1/cards/" + $parameter.cardId + "/data" }}',
					},
				},
			},
			{
				name: 'Get Problem',
				value: 'getProblem',
				description: 'Get details of a specific problem on a card',
				action: 'Get problem',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/content/v1/cards/" + $parameter.cardId + "/problems/" + $parameter.problemId }}',
					},
				},
			},
			{
				name: 'List Cards',
				value: 'listCards',
				description: 'List all cards',
				action: 'List cards',
				routing: {
					request: {
						method: 'GET',
						url: '/api/content/v1/cards',
						qs: {
							limit: '={{Math.min($parameter.limit || 50, 500)}}',
							offset: '={{$parameter.offset || 0}}',
						},
					},
				},
			},
			{
				name: 'List Problems',
				value: 'listProblems',
				description: 'List all problems for a card',
				action: 'List problems',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/content/v1/cards/" + $parameter.cardId + "/problems" }}',
					},
				},
			},
			{
				name: 'Resolve Problem',
				value: 'resolveProblem',
				description: 'Resolve a problem on a card',
				action: 'Resolve problem',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/content/v1/cards/" + $parameter.cardId + "/problems/" + $parameter.problemId + "/resolve" }}',
						body: {
							resolution: '={{$parameter.resolution}}',
						},
					},
				},
			},
			{
				name: 'Update Card',
				value: 'updateCard',
				description: 'Update a card',
				action: 'Update card',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/content/v1/cards/" + $parameter.cardId }}',
						body: '={{JSON.parse($parameter.cardData)}}',
					},
				},
			},
		],
		default: 'listCards',
	},
];

export const cardFields: INodeProperties[] = [
	// Card ID field (for most operations)
	{
		displayName: 'Card ID',
		name: 'cardId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['getCard', 'updateCard', 'deleteCard', 'duplicateCard', 'exportCard', 'getCardData', 'listProblems', 'getProblem', 'acknowledgeProblem', 'resolveProblem'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the card',
	},
	// Problem ID field (for problem operations)
	{
		displayName: 'Problem ID',
		name: 'problemId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['getProblem', 'acknowledgeProblem', 'resolveProblem'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the problem',
	},
	// List cards fields
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['listCards'],
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
				resource: ['card'],
				operation: ['listCards'],
			},
		},
		default: 0,
		description: 'Number of cards to skip',
	},
	// Create and Update card fields
	{
		displayName: 'Card Data',
		name: 'cardData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['createCard', 'updateCard'],
			},
		},
		default: '{}',
		required: true,
		description: 'JSON object containing card configuration',
		placeholder: '{"name":"My Card","description":"Card description","datasetId":"123","chartType":"bar"}',
	},
	// Duplicate card fields
	{
		displayName: 'New Card Name',
		name: 'newCardName',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['duplicateCard'],
			},
		},
		default: '',
		required: true,
		description: 'The name for the duplicated card',
	},
	// Export card fields
	{
		displayName: 'Export Format',
		name: 'exportFormat',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['exportCard'],
			},
		},
		options: [
			{
				name: 'CSV',
				value: 'csv',
			},
			{
				name: 'Excel',
				value: 'excel',
			},
			{
				name: 'PDF',
				value: 'pdf',
			},
			{
				name: 'PNG',
				value: 'png',
			},
			{
				name: 'PowerPoint',
				value: 'pptx',
			},
		],
		default: 'csv',
		description: 'The format to export the card in',
	},
	// Resolve problem fields
	{
		displayName: 'Resolution',
		name: 'resolution',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['resolveProblem'],
			},
		},
		default: '',
		required: true,
		description: 'The resolution message for the problem',
	},
];

