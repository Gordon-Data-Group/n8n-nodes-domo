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
				name: 'Bulk Add Cards to Pages',
				value: 'bulkAddCardsToPages',
				description: 'Bulk add cards to pages (does not remove)',
				action: 'Bulk add cards to pages',
				routing: {
					request: {
						method: 'PUT',
						url: '/api/content/v1/cards/bulk/pages',
						body: '={{JSON.parse($parameter.bulkData)}}',
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
						method: 'PUT',
						url: '/api/content/v3/cards/kpi',
						body: '={{JSON.parse($parameter.cardData)}}',
						qs: {
							pageId: '={{$parameter.pageId}}',
							parentUrn: '={{$parameter.parentUrn}}',
						},
					},
				},
			},
			{
				name: 'Create Card Change in History',
				value: 'createCardChangeInHistory',
				description: 'Create a card change in history',
				action: 'Create card change in history',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/kpis/" + $parameter.cardId + "/history" }}',
						body: '={{JSON.parse($parameter.historyData)}}',
					},
				},
			},
			{
				name: 'Create Problem',
				value: 'createProblem',
				description: 'Create a problem on a card',
				action: 'Create problem',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/content/v1/badges/" + $parameter.cardId + "/problems" }}',
						body: '={{$parameter.problemMessage}}',
					},
				},
			},
			{
				name: 'Delete Cards',
				value: 'deleteCards',
				description: 'Delete multiple cards',
				action: 'Delete cards',
				routing: {
					request: {
						method: 'DELETE',
						url: '/api/content/v1/cards/bulk',
						qs: {
							cardIds: '={{$parameter.cardIds}}',
						},
					},
				},
			},
			{
				name: 'Delete Drill Path',
				value: 'deleteDrillPath',
				description: 'Delete a drill path',
				action: 'Delete drill path',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/kpis/" + $parameter.cardId + "/drillPath/" + $parameter.drillNumber + "/drillView/" + $parameter.drillPathId }}',
					},
				},
			},
			{
				name: 'Get Card Access',
				value: 'getCardAccess',
				description: 'Get card access information',
				action: 'Get card access',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/content/v1/share/accesslist/badge/" + $parameter.cardId }}',
						qs: {
							expandUsers: '={{$parameter.expandUsers}}',
						},
					},
				},
			},
			{
				name: 'Get Card DataSet Schema',
				value: 'getCardDataSetSchema',
				description: 'Returns all DataSet columns and controls (filters) used',
				action: 'Get card dataset schema',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/content/v1/cards/" + $parameter.cardId + "/details" }}',
					},
				},
			},
			{
				name: 'Get Card Details for Update',
				value: 'getCardDetailsForUpdate',
				action: 'Get card details for update',
				routing: {
					request: {
						method: 'PUT',
						url: '/api/content/v3/cards/kpi/definition',
						body: '={{JSON.parse($parameter.definitionData)}}',
					},
				},
			},
			{
				name: 'Get Card Problems',
				value: 'getCardProblems',
				action: 'Get card problems',
				routing: {
					request: {
						method: 'GET',
						url: '/api/content/v1/cards',
						qs: {
							urns: '={{$parameter.urns}}',
							parts: '={{$parameter.parts}}',
						},
					},
				},
			},
			{
				name: 'Get Cards',
				value: 'getCards',
				description: 'Get multiple cards',
				action: 'Get cards',
				routing: {
					request: {
						method: 'GET',
						url: '/api/content/v1/cards',
						qs: {
							urns: '={{$parameter.urns}}',
							parts: '={{$parameter.parts}}',
							includeFiltered: '={{$parameter.includeFiltered}}',
						},
					},
				},
			},
			{
				name: 'Get Cards for DataSet',
				value: 'getCardsForDataSet',
				description: 'Get cards for a dataset',
				action: 'Get cards for dataset',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/content/v1/datasources/" + $parameter.datasetId + "/cards" }}',
						qs: {
							drill: '={{$parameter.drill}}',
						},
					},
				},
			},
			{
				name: 'Get Cards Min/Max Dates',
				value: 'getCardsMinMaxDates',
				action: 'Get cards min max dates',
				routing: {
					request: {
						method: 'GET',
						url: '/api/content/v1/cards/minmaxdates',
						qs: {
							urns: '={{$parameter.urns}}',
						},
					},
				},
			},
			{
				name: 'Get Cards User Has Access To',
				value: 'getCardsUserHasAccessTo',
				action: 'Get cards user has access to',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/content/v1/access/users/" + $parameter.userId + "/cards" }}',
						qs: {
							limit: '={{Math.min($parameter.limit || 50, 500)}}',
							offset: '={{$parameter.offset || 0}}',
						},
					},
				},
			},
			{
				name: 'Get Cards Views',
				value: 'getCardsViews',
				action: 'Get cards views',
				routing: {
					request: {
						method: 'PUT',
						url: '/api/content/v1/analytics/views/cards/counts',
						body: '={{JSON.parse($parameter.viewsData)}}',
					},
				},
			},
			{
				name: 'Get Chart Type Settings (General)',
				value: 'getChartTypeSettings',
				description: 'Get chart type settings',
				action: 'Get chart type settings',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/content/v1/cards/kpi/" + $parameter.chartType + "/options" }}',
					},
				},
			},
			{
				name: 'Get Color Palette (General)',
				value: 'getColorPalette',
				description: 'Get color palette',
				action: 'Get color palette',
				routing: {
					request: {
						method: 'GET',
						url: '/api/content/v1/cards/kpi/palette',
					},
				},
			},
			{
				name: 'Get Linked Cards',
				value: 'getLinkedCards',
				action: 'Get linked cards',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/content/v1/cards/" + $parameter.cardId + "/link" }}',
					},
				},
			},
			{
				name: 'Get Notebook Card',
				value: 'getNotebookCard',
				action: 'Get notebook card',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/content/v1/cards/notebook/" + $parameter.cardId }}',
					},
				},
			},
			{
				name: 'Increment Views',
				value: 'incrementViews',
				description: 'Increment card views',
				action: 'Increment views',
				routing: {
					request: {
						method: 'PUT',
						url: '/api/content/v1/analytics/views/cards/increment',
						body: '={{JSON.parse($parameter.incrementData)}}',
					},
				},
			},
			{
				name: 'List Cards (Admin Summary)',
				value: 'listCardsAdminSummary',
				description: 'List cards with admin summary',
				action: 'List cards admin summary',
				routing: {
					request: {
						method: 'POST',
						url: '/api/content/v2/cards/adminsummary',
						body: '={{JSON.parse($parameter.summaryData)}}',
						qs: {
							limit: '={{Math.min($parameter.limit || 50, 500)}}',
							skip: '={{$parameter.skip || 0}}',
						},
					},
				},
			},
			{
				name: 'List/Search Cards',
				value: 'searchCards',
				description: 'List or search cards',
				action: 'List search cards',
				routing: {
					request: {
						method: 'POST',
						url: '/api/search/v1/query',
						body: '={{JSON.parse($parameter.searchQuery)}}',
					},
				},
			},
			{
				name: 'Lock/Unlock Card',
				value: 'lockUnlockCard',
				description: 'Lock or unlock a card',
				action: 'Lock unlock card',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/content/v1/cards/" + $parameter.cardId }}',
						body: '={{JSON.parse($parameter.lockData)}}',
					},
				},
			},
			{
				name: 'Move Card (Update Pages)',
				value: 'moveCard',
				description: 'Move card to different pages',
				action: 'Move card update pages',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/content/v1/cards/" + $parameter.cardId + "/pages" }}',
						body: '={{JSON.parse($parameter.pageIds)}}',
					},
				},
			},
			{
				name: 'Remove Access to Cards',
				value: 'removeAccessToCards',
				action: 'Remove access to cards',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/content/v1/share/bulk/badge/" + $parameter.type + "/" + $parameter.entityId }}',
						qs: {
							resourceIds: '={{$parameter.resourceIds}}',
						},
					},
				},
			},
			{
				name: 'Remove Card From Page',
				value: 'removeCardFromPage',
				description: 'Remove card from a page',
				action: 'Remove card from page',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/kpis/" + $parameter.cardId + "/remove" }}',
						qs: {
							pageid: '={{$parameter.pageId}}',
						},
					},
				},
			},
			{
				name: 'Render Card (Data)',
				value: 'renderCard',
				description: 'Render card data',
				action: 'Render card data',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/content/v1/cards/kpi/" + $parameter.cardId + "/render" }}',
						body: '={{JSON.parse($parameter.renderData)}}',
						qs: {
							parts: '={{$parameter.parts}}',
						},
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
						method: 'PUT',
						url: '={{ "/api/content/v1/badges/" + $parameter.cardId + "/problems/" + $parameter.problemId + "/states" }}',
						body: '={{JSON.parse($parameter.stateData)}}',
					},
				},
			},
			{
				name: 'Share Access',
				value: 'shareAccess',
				description: 'Share access to cards',
				action: 'Share access',
				routing: {
					request: {
						method: 'POST',
						url: '/api/content/v1/share',
						body: '={{JSON.parse($parameter.shareData)}}',
						qs: {
							sendEmail: '={{$parameter.sendEmail}}',
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
						url: '={{ "/api/content/v3/cards/kpi/" + $parameter.cardId }}',
						body: '={{JSON.parse($parameter.cardData)}}',
					},
				},
			},
			{
				name: 'Update Owners',
				value: 'updateOwners',
				description: 'Update card owners',
				action: 'Update owners',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/content/v1/cards/owners/" + $parameter.action }}',
						body: '={{JSON.parse($parameter.ownersData)}}',
					},
				},
			},
			{
				name: 'Validate Move to New DataSet',
				value: 'validateMoveToNewDataSet',
				description: 'Validate moving card to new dataset',
				action: 'Validate move to new dataset',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/content/v1/cards/kpi/" + $parameter.cardId + "/comparemove/" + $parameter.datasetId }}',
					},
				},
			},
		],
		default: 'searchCards',
	},
];

export const cardFields: INodeProperties[] = [
	// Card ID field
	{
		displayName: 'Card ID',
		name: 'cardId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: [
					'getCardAccess',
					'getCardDataSetSchema',
					'getLinkedCards',
					'getNotebookCard',
					'lockUnlockCard',
					'moveCard',
					'createCardChangeInHistory',
					'createProblem',
					'deleteDrillPath',
					'removeCardFromPage',
					'renderCard',
					'resolveProblem',
					'updateCard',
					'validateMoveToNewDataSet',
				],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the card',
	},
	// Problem ID field
	{
		displayName: 'Problem ID',
		name: 'problemId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['resolveProblem'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the problem',
	},
	// Dataset ID field
	{
		displayName: 'Dataset ID',
		name: 'datasetId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['getCardsForDataSet', 'validateMoveToNewDataSet'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the dataset',
	},
	// User ID field
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['getCardsUserHasAccessTo'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the user',
	},
	// Chart Type field
	{
		displayName: 'Chart Type',
		name: 'chartType',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['getChartTypeSettings'],
			},
		},
		default: '',
		required: true,
		description: 'The chart type (e.g., badge_basic_table, badge_line_bar)',
	},
	// Drill Path fields
	{
		displayName: 'Drill Number',
		name: 'drillNumber',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['deleteDrillPath'],
			},
		},
		default: '',
		required: true,
	},
	{
		displayName: 'Drill Path ID',
		name: 'drillPathId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['deleteDrillPath'],
			},
		},
		default: '',
		required: true,
	},
	// URNs field
	{
		displayName: 'URNs',
		name: 'urns',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['getCardProblems', 'getCards', 'getCardsMinMaxDates'],
			},
		},
		default: '',
		description: 'Comma-separated list of card URNs',
	},
	// Parts field
	{
		displayName: 'Parts',
		name: 'parts',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['getCardProblems', 'getCards', 'renderCard'],
			},
		},
		default: '',
		description: 'Parts to include in the response',
	},
	// Include Filtered field
	{
		displayName: 'Include Filtered',
		name: 'includeFiltered',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['getCards'],
			},
		},
		default: false,
		description: 'Whether to include filtered cards',
	},
	// Expand Users field
	{
		displayName: 'Expand Users',
		name: 'expandUsers',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['getCardAccess'],
			},
		},
		default: false,
		description: 'Whether to expand user details',
	},
	// Drill field
	{
		displayName: 'Drill',
		name: 'drill',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['getCardsForDataSet'],
			},
		},
		default: false,
		description: 'Whether to include drill information',
	},
	// Limit and Offset
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
				operation: ['getCardsUserHasAccessTo', 'listCardsAdminSummary'],
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
				operation: ['getCardsUserHasAccessTo'],
			},
		},
		default: 0,
		description: 'Number of cards to skip',
	},
	{
		displayName: 'Skip',
		name: 'skip',
		type: 'number',
		typeOptions: {
			minValue: 0,
		},
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['listCardsAdminSummary'],
			},
		},
		default: 0,
		description: 'Number of cards to skip',
	},
	// Page ID fields
	{
		displayName: 'Page ID',
		name: 'pageId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['createCard', 'removeCardFromPage'],
			},
		},
		default: '',
		description: 'The ID of the page',
	},
	{
		displayName: 'Parent URN',
		name: 'parentUrn',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['createCard'],
			},
		},
		default: '',
	},
	// Type and Entity ID for remove access
	{
		displayName: 'Type',
		name: 'type',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['removeAccessToCards'],
			},
		},
		default: '',
		required: true,
		description: 'The type (e.g., USER, GROUP)',
	},
	{
		displayName: 'Entity ID',
		name: 'entityId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['removeAccessToCards'],
			},
		},
		default: '',
		required: true,
	},
	{
		displayName: 'Resource IDs',
		name: 'resourceIds',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['removeAccessToCards'],
			},
		},
		default: '',
		required: true,
		description: 'Comma-separated list of card IDs',
	},
	// Action field for update owners
	{
		displayName: 'Action',
		name: 'action',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['updateOwners'],
			},
		},
		default: '',
		required: true,
	},
	// Card IDs field
	{
		displayName: 'Card IDs',
		name: 'cardIds',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['deleteCards'],
			},
		},
		default: '',
		required: true,
		description: 'Comma-separated list of card IDs',
	},
	// Send Email field
	{
		displayName: 'Send Email',
		name: 'sendEmail',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['shareAccess'],
			},
		},
		default: true,
		description: 'Whether to send email notifications',
	},
	// JSON Data fields
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
		default: '',
		placeholder: '{"definition":{"subscriptions":{},"formulas":{}}}',
		required: true,
		description: 'JSON object containing card configuration',
	},
	{
		displayName: 'Bulk Data',
		name: 'bulkData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['bulkAddCardsToPages'],
			},
		},
		default: '',
		placeholder: '{"cardIds":["123","234"],"destinationPageIds":[123456]}',
		required: true,
		description: 'JSON object containing bulk operation data',
	},
	{
		displayName: 'Definition Data',
		name: 'definitionData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['getCardDetailsForUpdate'],
			},
		},
		default: '',
		placeholder: '{"dynamicText":true,"variables":true,"urn":"123456"}',
		required: true,
		description: 'JSON object containing definition parameters',
	},
	{
		displayName: 'History Data',
		name: 'historyData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['createCardChangeInHistory'],
			},
		},
		default: '',
		placeholder: '{"changes":{"kpi":{"title":true}},"comment":"Updated card"}',
		required: true,
		description: 'JSON object containing history data',
	},
	{
		displayName: 'Increment Data',
		name: 'incrementData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['incrementViews'],
			},
		},
		default: '',
		placeholder: '{"urns":["1234","2345"],"context":"AUTHENTICATED"}',
		required: true,
		description: 'JSON object containing increment data',
	},
	{
		displayName: 'Lock Data',
		name: 'lockData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['lockUnlockCard'],
			},
		},
		default: '',
		placeholder: '{"locked":true}',
		required: true,
		description: 'JSON object containing lock status',
	},
	{
		displayName: 'Owners Data',
		name: 'ownersData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['updateOwners'],
			},
		},
		default: '',
		placeholder: '{"cardIds":[123456],"cardOwners":[{"ID":"1234","type":"USER"}]}',
		required: true,
		description: 'JSON object containing owners configuration',
	},
	{
		displayName: 'Page IDs',
		name: 'pageIds',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['moveCard'],
			},
		},
		default: '',
		placeholder: '[123456,234567]',
		required: true,
		description: 'JSON array of page IDs',
	},
	{
		displayName: 'Problem Message',
		name: 'problemMessage',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['createProblem'],
			},
		},
		default: '',
		required: true,
		description: 'Raw message text for the problem',
	},
	{
		displayName: 'Render Data',
		name: 'renderData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['renderCard'],
			},
		},
		default: '',
		placeholder: '{"queryOverrides":{},"width":960,"height":400,"scale":1}',
		required: true,
		description: 'JSON object containing render parameters',
	},
	{
		displayName: 'Search Query',
		name: 'searchQuery',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['searchCards'],
			},
		},
		default: '',
		placeholder: '{"count":10000,"offset":0,"query":"*","entityList":[["card"]]}',
		required: true,
		description: 'JSON query object for searching cards',
	},
	{
		displayName: 'Share Data',
		name: 'shareData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['shareAccess'],
			},
		},
		default: '',
		placeholder: '{"resources":[{"type":"badge","ID":"12345"}],"recipients":[{"type":"user","ID":"12345"}],"message":""}',
		required: true,
		description: 'JSON object containing share configuration',
	},
	{
		displayName: 'State Data',
		name: 'stateData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['resolveProblem'],
			},
		},
		default: '',
		placeholder: '{"state":"RESOLVED"}',
		required: true,
		description: 'JSON object containing problem state',
	},
	{
		displayName: 'Summary Data',
		name: 'summaryData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['listCardsAdminSummary'],
			},
		},
		default: '',
		placeholder: '{"ascending":true,"orderBy":"cardTitle","includeCardTypeClause":true}',
		required: true,
		description: 'JSON object containing summary filter criteria',
	},
	{
		displayName: 'Views Data',
		name: 'viewsData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['card'],
				operation: ['getCardsViews'],
			},
		},
		default: '',
		placeholder: '{"urns":[12345]}',
		required: true,
		description: 'JSON object containing URNs',
	},
];
