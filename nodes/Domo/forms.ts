import type { INodeProperties } from 'n8n-workflow';

export const formsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['forms'],
			},
		},
		default: 'listSearchForms',
		options: [
			{
				name: 'Create Instance',
				value: 'createInstance',
				action: 'Create instance',
				routing: {
					request: {
						method: 'POST',
						url: '/api/forms/v1/instances',
						body: '={{JSON.parse($parameter.instanceData)}}',
					},
				},
			},
			{
				name: 'Create Submission',
				value: 'createSubmission',
				action: 'Create submission',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/forms/v1/instances/" + $parameter.formId + "/submission" }}',
						body: '={{JSON.parse($parameter.submissionData)}}',
					},
				},
			},
			{
				name: 'Get Form',
				value: 'getForm',
				action: 'Get form',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/forms/v1/" + $parameter.formId }}',
					},
				},
			},
			{
				name: 'List/Search Forms',
				value: 'listSearchForms',
				action: 'List search forms',
				routing: {
					request: {
						method: 'POST',
						url: '/api/search/v1/query',
						body: '={{JSON.parse($parameter.searchData)}}',
					},
				},
			},
			{
				name: 'Update Form Fields',
				value: 'updateFormFields',
				action: 'Update form fields',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/forms/v1/" + $parameter.formId + "/hydration" }}',
						body: '={{JSON.parse($parameter.fieldData)}}',
					},
				},
			},
			{
				name: 'Update Instance',
				value: 'updateInstance',
				action: 'Update instance',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/forms/v1/instances/" + $parameter.formId }}',
						body: '={{JSON.parse($parameter.instanceData)}}',
					},
				},
			},
		],
	},
];

export const formsFields: INodeProperties[] = [
	// Form ID field
	{
		displayName: 'Form ID',
		name: 'formId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['forms'],
				operation: ['getForm', 'createSubmission', 'updateInstance', 'updateFormFields'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the form or instance',
	},
	// List/Search Forms fields
	{
		displayName: 'Search Data',
		name: 'searchData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['forms'],
				operation: ['listSearchForms'],
			},
		},
		default: '',
		placeholder: '{"count":50,"offset":0,"filters":[],"useEntities":true,"combineResults":true,"facetValueLimit":1000,"entityList":[["form"]],"sort":{"isRelevance":true,"fieldSorts":[{"field":"lastModified","sortOrder":"DESC"}]},"query":"*","hideSearchObjects":false,"state":"facet"}',
		required: true,
		description: 'JSON object containing search criteria',
	},
	// Create Instance fields
	{
		displayName: 'Instance Data',
		name: 'instanceData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['forms'],
				operation: ['createInstance', 'updateInstance'],
			},
		},
		default: '',
		placeholder: '{"formID":"00000000-0000-0000-0000-000000000000","fieldConfiguration":{},"submitConfiguration":{"type":"DATASET","name":"Dataset Name"}}',
		required: true,
		description: 'JSON object containing instance configuration',
	},
	// Create Submission fields
	{
		displayName: 'Submission Data',
		name: 'submissionData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['forms'],
				operation: ['createSubmission'],
			},
		},
		default: '',
		placeholder: '[{"ID":"00000000-0000-0000-0000-000000000000","label":"Field Label","optional":false,"fieldType":"SINGLE_CHOICE","dataType":"text","acceptsInput":true,"acceptsOutput":true,"options":{"values":[]},"alias":"alias","isList":true,"useExternalValues":true,"displayAsDropdown":true,"value":"value"}]',
		required: true,
		description: 'JSON array containing submission data',
	},
	// Update Form Fields
	{
		displayName: 'Field Data',
		name: 'fieldData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['forms'],
				operation: ['updateFormFields'],
			},
		},
		default: '',
		placeholder: '{"00000000-0000-0000-0000-000000000000":{"options":{"type":"DATASET","customMapping":null,"datasetMapping":{"ID":"00000000-0000-0000-0000-000000000000","column":"Column 1"}},"value":{"type":"DATASET"}}}',
		required: true,
		description: 'JSON object containing field configuration',
	},
];
