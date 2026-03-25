import { INodeProperties } from 'n8n-workflow';
import type { IHttpRequestOptions, IExecuteSingleFunctions } from 'n8n-workflow';
import { preSendLogger } from './shared/preSendLogger';

// Builds the full search body for List/Search Forms
async function preSendListForms(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const query = this.getNodeParameter('query') as string;
	const count = this.getNodeParameter('count') as number;
	const offset = this.getNodeParameter('offset') as number;
	requestOptions.body = {
		count,
		offset,
		filters: [],
		useEntities: true,
		combineResults: true,
		facetValueLimit: 1000,
		entityList: [['form']],
		sort: {
			isRelevance: true,
			fieldSorts: [{ field: 'lastModified', sortOrder: 'DESC' }],
		},
		query: query || '*',
		hideSearchObjects: false,
		state: 'facet',
	};
	return requestOptions;
}

// Builds the Create Instance body, parsing the free-form fieldConfiguration JSON
async function preSendCreateInstance(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const formId = this.getNodeParameter('formId') as string;
	const fieldConfiguration = this.getNodeParameter('fieldConfiguration') as string;
	const submitConfigName = this.getNodeParameter('submitConfigurationName') as string;
	requestOptions.body = {
		formId,
		fieldConfiguration: JSON.parse(fieldConfiguration),
		submitConfiguration: {
			type: 'DATASET',
			name: submitConfigName,
		},
	};
	return requestOptions;
}

// Parses the submissionData JSON array and sets it as the entire request body
async function preSendCreateSubmission(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const submissionData = this.getNodeParameter('submissionData') as string;
	requestOptions.body = JSON.parse(submissionData);
	return requestOptions;
}

// Builds the Update Instance body, parsing the free-form fieldConfiguration JSON
async function preSendUpdateInstance(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const instanceId = this.getNodeParameter('instanceId') as string;
	const formId = this.getNodeParameter('formId') as string;
	const fieldConfiguration = this.getNodeParameter('fieldConfiguration') as string;
	const submitConfigName = this.getNodeParameter('submitConfigurationName') as string;
	const submitConfigId = this.getNodeParameter('submitConfigurationId') as string;
	requestOptions.body = {
		formInstanceId: instanceId,
		formId,
		fieldConfiguration: JSON.parse(fieldConfiguration),
		submitConfiguration: {
			type: 'DATASET',
			...(submitConfigId ? { id: submitConfigId } : {}),
			name: submitConfigName,
		},
	};
	return requestOptions;
}

// Parses the fieldHydration JSON map and sets it as the entire request body
async function preSendUpdateFormFields(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const fieldHydration = this.getNodeParameter('fieldHydration') as string;
	requestOptions.body = JSON.parse(fieldHydration);
	return requestOptions;
}

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
		options: [
			{
				name: 'Create Instance',
				value: 'createInstance',
				action: 'Create a form instance',
				routing: {
					request: {
						method: 'POST',
						url: '/api/forms/v1/instances',
					},
					send: {
						preSend: [preSendCreateInstance, preSendLogger],
					},
				},
			},
			{
				name: 'Create Submission',
				value: 'createSubmission',
				action: 'Submit a form instance',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/forms/v1/instances/{{ $parameter.instanceId }}/submission',
					},
					send: {
						preSend: [preSendCreateSubmission, preSendLogger],
					},
				},
			},
			{
				name: 'Get Form',
				value: 'get',
				action: 'Get a form by ID',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/forms/v1/{{ $parameter.formId }}',
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'List / Search Forms',
				value: 'list',
				action: 'List or search forms',
				routing: {
					request: {
						method: 'POST',
						url: '/api/search/v1/query',
					},
					send: {
						preSend: [preSendListForms, preSendLogger],
					},
				},
			},
			{
				name: 'Update Form Fields',
				value: 'updateFormFields',
				action: 'Update form field configuration (hydration)',
				routing: {
					request: {
						method: 'POST',
						url: '=/api/forms/v1/{{ $parameter.formId }}/hydration',
					},
					send: {
						preSend: [preSendUpdateFormFields, preSendLogger],
					},
				},
			},
			{
				name: 'Update Instance',
				value: 'updateInstance',
				action: 'Update a form instance',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/forms/v1/instances/{{ $parameter.instanceId }}',
					},
					send: {
						preSend: [preSendUpdateInstance, preSendLogger],
					},
				},
			},
		],
		default: 'list',
	},
];

export const formsFields: INodeProperties[] = [
	// ── Shared: Form ID (get, createInstance, updateInstance, updateFormFields) ─
	{
		displayName: 'Form ID',
		name: 'formId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['forms'],
				operation: ['get', 'createInstance', 'updateInstance', 'updateFormFields'],
			},
		},
		default: '',
		required: true,
		description: 'The UUID of the form',
		placeholder: '00000000-0000-0000-0000-000000000000',
	},

	// ── Shared: Instance ID (createSubmission, updateInstance) ────────────────
	{
		displayName: 'Instance ID',
		name: 'instanceId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['forms'],
				operation: ['createSubmission', 'updateInstance'],
			},
		},
		default: '',
		required: true,
		description: 'The UUID of the form instance',
		placeholder: '00000000-0000-0000-0000-000000000000',
	},

	// ── List / Search: query params ───────────────────────────────────────────
	{
		displayName: 'Query',
		name: 'query',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['forms'],
				operation: ['list'],
			},
		},
		default: '*',
		description: 'Search query string. Use * to return all forms.',
	},
	{
		displayName: 'Count',
		name: 'count',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['forms'],
				operation: ['list'],
			},
		},
		default: 50,
		description: 'Maximum number of results to return',
		typeOptions: {
			minValue: 1,
		},
	},
	{
		displayName: 'Offset',
		name: 'offset',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['forms'],
				operation: ['list'],
			},
		},
		default: 0,
		description: 'Number of results to skip for pagination',
		typeOptions: {
			minValue: 0,
		},
	},

	// ── Create/Update Instance: Field Configuration ───────────────────────────
	{
		displayName: 'Field Configuration',
		name: 'fieldConfiguration',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['forms'],
				operation: ['createInstance', 'updateInstance'],
			},
		},
		default: '{}',
		required: true,
		description:
			'A JSON object mapping field UUIDs to their configuration. Each key is a field UUID and each value defines the options and value for that field.',
		placeholder:
			'{"00000000-0000-0000-0000-000000000000": {"options": {"type": "DATASET", "datasetMapping": {"id": "...", "column": "Column 1"}}, "value": {"type": "DATASET"}}}',
	},

	// ── Create/Update Instance: Submit Configuration ──────────────────────────
	{
		displayName: 'Submit Configuration Name',
		name: 'submitConfigurationName',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['forms'],
				operation: ['createInstance', 'updateInstance'],
			},
		},
		default: '',
		required: true,
		description: 'The name of the dataset to write form submissions to',
	},
	{
		displayName: 'Submit Configuration Dataset ID',
		name: 'submitConfigurationId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['forms'],
				operation: ['updateInstance'],
			},
		},
		default: '',
		description: 'The ID of an existing dataset to write submissions to (optional for updates)',
		placeholder: '00000000-0000-0000-0000-000000000000',
	},

	// ── Create Submission: field answers ─────────────────────────────────────
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
		default: '[]',
		required: true,
		description:
			'A JSON array of field answer objects. Each object should include the field id and value.',
		placeholder:
			'[{"id": "00000000-0000-0000-0000-000000000000", "fieldType": "SINGLE_CHOICE", "value": "answer"}]',
	},

	// ── Update Form Fields: field hydration ───────────────────────────────────
	{
		displayName: 'Field Hydration',
		name: 'fieldHydration',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['forms'],
				operation: ['updateFormFields'],
			},
		},
		default: '{}',
		required: true,
		description:
			'A JSON object mapping field UUIDs to their updated options and values.',
		placeholder:
			'{"00000000-0000-0000-0000-000000000000": {"options": {"type": "DATASET", "datasetMapping": {"id": "...", "column": "Column 1"}}, "value": {"type": "DATASET"}}}',
	},
];
