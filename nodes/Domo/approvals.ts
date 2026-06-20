import type { INodeProperties, IHttpRequestOptions, IExecuteSingleFunctions } from 'n8n-workflow';
import { preSendLogger } from './shared/preSendLogger';

// ── GraphQL query/mutation strings ───────────────────────────────────────────

const GQL_LIST_TEMPLATES = `query listTemplates {
  templates {
    id title titleName titlePlaceholder acknowledgment instructions description
    providerName isPublic chainIsLocked type isPublished
    observers { id type displayName avatarKey title ... on Group { userCount __typename } __typename }
    categories { id name __typename }
    owner { id displayName avatarKey __typename }
    __typename
  }
}`;

const GQL_GET_TEMPLATE = `query getTemplateForEdit($id: ID!) {
  template(id: $id) {
    id title titleName titlePlaceholder acknowledgment instructions description
    providerName isPublic chainIsLocked type isPublished
    observers { id type displayName avatarKey title ... on Group { userCount __typename } __typename }
    categories { id name __typename }
    owner { id displayName avatarKey __typename }
    fields {
      key type name data placeholder required isPrivate
      ... on SelectField { option multiselect datasource column order __typename }
      __typename
    }
    approvers {
      type originalType: type key
      ... on ApproverPerson { id: approverId approverId userDetails { id displayName title avatarKey isDeleted __typename } __typename }
      ... on ApproverGroup { id: approverId approverId groupDetails { id displayName userCount isDeleted __typename } __typename }
      ... on ApproverPlaceholder { placeholderText __typename }
      __typename
    }
    workflowIntegration {
      modelId modelVersion startName modelName
      parameterMapping { fields { field parameter required type __typename } __typename }
      __typename
    }
    __typename
  }
  categories { id name __typename }
}`;

const GQL_SEARCH_TEMPLATES = `query getApprovalTemplatesConnection($first: Int $after: ID $orderBy: OrderBy $reverseSort: Boolean $query: TemplateQueryRequest!) {
  templateConnection(first: $first after: $after orderBy: $orderBy reverseSort: $reverseSort query: $query) {
    edges {
      cursor
      node {
        id datasetId title isPublic providerName description
        observers { id type displayName avatarKey title ... on Group { userCount __typename } __typename }
        owner { id displayName avatarKey isCurrentUser title __typename }
        fieldCount useCount
        categories { id name __typename }
        __typename
      }
      __typename
    }
    pageInfo { hasNextPage hasPreviousPage startCursor endCursor __typename }
    __typename
  }
}`;

const GQL_GET_APPROVAL = `query getApprovalForDetails($id: ID!) {
  request: approval(id: $id) {
    ...approvalFields
    __typename
  }
}

fragment approvalFields on Approval {
  newActivity
  observers { id type displayName title ... on Group { currentUserIsMember memberCount: userCount __typename } __typename }
  lastViewed newActivity
  newMessage { created createdByType createdBy { id displayName __typename } content { text __typename } __typename }
  lastAction version submittedTime id title status providerName templateTitle
  buzzChannelId buzzGeneralThreadId templateInstructions templateDescription
  acknowledgment snooze snoozed type
  categories { id name __typename }
  total { value currency __typename }
  modifiedTime
  previousApprover: previousApproverEx {
    id type displayName
    ... on User { title avatarKey isCurrentUser __typename }
    ... on Group { currentUserIsMember userCount isDeleted actor { displayName id __typename } __typename }
    __typename
  }
  pendingApprover: pendingApproverEx {
    id type displayName
    ... on User { title avatarKey isCurrentUser __typename }
    ... on Group { currentUserIsMember userCount isDeleted __typename }
    __typename
  }
  submitter { id displayName title avatarKey isCurrentUser type __typename }
  approvalChainIdx
  reminder { sent sentBy { displayName title id isCurrentUser type __typename } __typename }
  chain {
    actor { displayName __typename }
    approver {
      id type displayName
      ... on User { title avatarKey isCurrentUser __typename }
      ... on Group { currentUserIsMember userCount isDeleted __typename }
      __typename
    }
    status time type key __typename
  }
  fields {
    data name type key
    ... on HeaderField { fields { data name type key ... on HeaderField { fields { data name type key __typename } __typename } __typename } __typename }
    ... on ItemListField { fields { data name type key ... on HeaderField { fields { data name type key __typename } __typename } __typename } __typename }
    ... on NumberField { value __typename }
    ... on CurrencyField { number: value currency __typename }
    ... on DateField { date: value __typename }
    ... on DataSetAttachmentField { dataSet: value { id name description owner { id displayName __typename } provider cardCount __typename } __typename }
    __typename
  }
  history { actor { type id displayName ... on User { avatarKey isCurrentUser __typename } __typename } status time __typename }
  latestMessage { created __typename }
  latestMentioned { created __typename }
  workflowIntegration { modelId modelVersion startName instanceId modelName __typename }
  __typename
}`;

const GQL_SEARCH_APPROVALS = `query getFilteredRequests($query: QueryRequest!, $after: ID, $reverseSort: Boolean) {
  workflowSearch(query: $query type: "AC" after: $after reverseSort: $reverseSort) {
    edges {
      cursor
      node {
        approval {
          id title templateID templateTitle status modifiedTime version providerName approvalChainIdx
          pendingApprover: pendingApproverEx {
            id type displayName
            ... on User { title avatarKey __typename }
            ... on Group { isDeleted __typename }
            __typename
          }
          submitter { id type displayName avatarKey isCurrentUser __typename }
          __typename
        }
        __typename
      }
      __typename
    }
    pageInfo { hasNextPage hasPreviousPage startCursor endCursor __typename }
    __typename
  }
}`;

const GQL_UPDATE_TEMPLATE = `mutation saveTemplate($template: TemplateInput!) {
  template: saveTemplate(template: $template) {
    id title titleName titlePlaceholder acknowledgment instructions description
    providerName isPublic chainIsLocked
    owner { id displayName avatarKey __typename }
    fields { key type name placeholder required isLocked __typename }
    approvers {
      type originalType: type key
      ... on ApproverPerson { approverId userDetails { id displayName title avatarKey __typename } __typename }
      ... on ApproverGroup { approverId groupDetails { id displayName userCount isDeleted __typename } __typename }
      ... on ApproverPlaceholder { placeholderText __typename }
      __typename
    }
    __typename
  }
}`;

// ── preSend hooks ────────────────────────────────────────────────────────────

async function preSendListTemplates(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	requestOptions.body = {
		operationName: 'listTemplates',
		query: GQL_LIST_TEMPLATES,
	};
	return requestOptions;
}

async function preSendGetTemplate(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const id = this.getNodeParameter('templateId') as string;
	requestOptions.body = [
		{
			operationName: 'getTemplateForEdit',
			variables: { id },
			query: GQL_GET_TEMPLATE,
		},
	];
	return requestOptions;
}

async function preSendSearchTemplates(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const first = this.getNodeParameter('first') as number;
	const after = this.getNodeParameter('after') as string;
	const orderBy = this.getNodeParameter('orderBy') as string;
	const reverseSort = this.getNodeParameter('reverseSort') as boolean;
	const searchTerm = this.getNodeParameter('searchTerm') as string;
	const publishedOnly = this.getNodeParameter('publishedOnly') as boolean;

	requestOptions.body = {
		operationName: 'getApprovalTemplatesConnection',
		query: GQL_SEARCH_TEMPLATES,
		variables: {
			first,
			after: after || null,
			orderBy,
			reverseSort,
			query: {
				type: 'AC',
				searchTerm,
				category: [],
				ownerId: null,
				publishedOnly,
			},
		},
	};
	return requestOptions;
}

async function preSendGetApproval(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const id = this.getNodeParameter('approvalId') as string;
	requestOptions.body = {
		operationName: 'getApprovalForDetails',
		variables: { id },
		query: GQL_GET_APPROVAL,
	};
	return requestOptions;
}

async function preSendSearchApprovals(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const after = this.getNodeParameter('after') as string;
	const reverseSort = this.getNodeParameter('reverseSort') as boolean;
	const activeParam = this.getNodeParameter('active') as string;
	const submitterId = this.getNodeParameter('submitterId') as number;
	const approverId = this.getNodeParameter('approverId') as number;
	const templateId = this.getNodeParameter('approvalTemplateId') as string;
	const title = this.getNodeParameter('approvalTitle') as string;
	const lastModifiedBefore = this.getNodeParameter('lastModifiedBefore') as string;

	const active = activeParam === 'all' ? null : activeParam === 'true';

	requestOptions.body = {
		operationName: 'getFilteredRequests',
		variables: {
			query: {
				active,
				submitterId: submitterId || null,
				approverId: approverId || null,
				templateId: templateId || null,
				title: title || null,
				lastModifiedBefore: lastModifiedBefore || null,
			},
			after: after || null,
			reverseSort,
		},
		query: GQL_SEARCH_APPROVALS,
	};
	return requestOptions;
}

async function preSendUpdateTemplate(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const templateData = this.getNodeParameter('templateData') as string;
	const template = typeof templateData === 'string' ? JSON.parse(templateData) : templateData;
	requestOptions.body = [
		{
			operationName: 'saveTemplate',
			variables: { template },
			query: GQL_UPDATE_TEMPLATE,
		},
	];
	return requestOptions;
}

async function preSendReplaceApprover(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const gqlBody = this.getNodeParameter('gqlBody') as string;
	requestOptions.body = typeof gqlBody === 'string' ? JSON.parse(gqlBody) : gqlBody;
	return requestOptions;
}

// ── Operations ───────────────────────────────────────────────────────────────

export const approvalsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['approval'],
			},
		},
		default: 'listTemplates',
		options: [
			{
				name: 'Get Approval',
				value: 'getApproval',
				action: 'Get an approval by ID',
				routing: {
					request: {
						method: 'POST',
						url: '/synapse/approval/graphql',
					},
					send: {
						preSend: [preSendGetApproval, preSendLogger],
					},
				},
			},
			{
				name: 'Get Template',
				value: 'getTemplate',
				action: 'Get an approval template by ID',
				routing: {
					request: {
						method: 'POST',
						url: '/synapse/approval/graphql',
					},
					send: {
						preSend: [preSendGetTemplate, preSendLogger],
					},
				},
			},
			{
				name: 'List Templates',
				value: 'listTemplates',
				action: 'List all approval templates',
				routing: {
					request: {
						method: 'POST',
						url: '/synapse/approval/graphql',
					},
					send: {
						preSend: [preSendListTemplates, preSendLogger],
					},
				},
			},
			{
				name: 'Replace Approver',
				value: 'replaceApprover',
				action: 'Replace an approver on an approval',
				routing: {
					request: {
						method: 'POST',
						url: '/synapse/approval/graphql',
					},
					send: {
						preSend: [preSendReplaceApprover, preSendLogger],
					},
				},
			},
			{
				name: 'Search Approvals',
				value: 'searchApprovals',
				action: 'Search approvals with filters',
				routing: {
					request: {
						method: 'POST',
						url: '/synapse/approval/graphql',
					},
					send: {
						preSend: [preSendSearchApprovals, preSendLogger],
					},
				},
			},
			{
				name: 'Search Templates',
				value: 'searchTemplates',
				action: 'Search approval templates',
				routing: {
					request: {
						method: 'POST',
						url: '/synapse/approval/graphql',
					},
					send: {
						preSend: [preSendSearchTemplates, preSendLogger],
					},
				},
			},
			{
				name: 'Update Template',
				value: 'updateTemplate',
				action: 'Update an approval template',
				routing: {
					request: {
						method: 'POST',
						url: '/synapse/approval/graphql',
					},
					send: {
						preSend: [preSendUpdateTemplate, preSendLogger],
					},
				},
			},
		],
	},
];

// ── Fields ───────────────────────────────────────────────────────────────────

export const approvalsFields: INodeProperties[] = [
	// ── Notice ────────────────────────────────────────────────────────────────
	{
		displayName:
			'Note: Domo will return a 404 Not Found error if the Approvals feature is not enabled in your Domo instance.',
		name: 'approvalsNotice',
		type: 'notice',
		displayOptions: {
			show: {
				resource: ['approval'],
			},
		},
		default: '',
	},

	// ── Shared: Template ID (getTemplate, updateTemplate) ─────────────────────
	{
		displayName: 'Template ID',
		name: 'templateId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['approval'],
				operation: ['getTemplate', 'updateTemplate'],
			},
		},
		default: '',
		required: true,
		description: 'The UUID of the approval template',
	},

	// ── Get Approval ──────────────────────────────────────────────────────────
	{
		displayName: 'Approval ID',
		name: 'approvalId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['approval'],
				operation: ['getApproval'],
			},
		},
		default: '',
		required: true,
		description: 'The UUID of the approval request',
	},

	// ── Search Templates fields ───────────────────────────────────────────────
	{
		displayName: 'Search Term',
		name: 'searchTerm',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['approval'],
				operation: ['searchTemplates'],
			},
		},
		default: '',
		description: 'Filter templates by name. Leave blank to return all.',
	},
	{
		displayName: 'Page Size',
		name: 'first',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['approval'],
				operation: ['searchTemplates'],
			},
		},
		default: 20,
		description: 'Maximum number of templates to return',
	},
	{
		displayName: 'Order By',
		name: 'orderBy',
		type: 'options',
		options: [
			{ name: 'Template', value: 'TEMPLATE' },
			{ name: 'Use Count', value: 'USE_COUNT' },
		],
		displayOptions: {
			show: {
				resource: ['approval'],
				operation: ['searchTemplates'],
			},
		},
		default: 'TEMPLATE',
		description: 'Field to sort results by',
	},
	{
		displayName: 'Published Only',
		name: 'publishedOnly',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['approval'],
				operation: ['searchTemplates'],
			},
		},
		default: false,
		description: 'Whether to return only published templates',
	},

	// ── Shared: Pagination cursor (searchTemplates, searchApprovals) ──────────
	{
		displayName: 'After Cursor',
		name: 'after',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['approval'],
				operation: ['searchTemplates', 'searchApprovals'],
			},
		},
		default: '',
		description: 'Pagination cursor from a previous response to fetch the next page',
	},
	{
		displayName: 'Reverse Sort',
		name: 'reverseSort',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['approval'],
				operation: ['searchTemplates', 'searchApprovals'],
			},
		},
		default: false,
		description: 'Whether to reverse the sort order',
	},

	// ── Search Approvals fields ───────────────────────────────────────────────
	{
		displayName: 'Status',
		name: 'active',
		type: 'options',
		options: [
			{ name: 'All', value: 'all' },
			{ name: 'Active', value: 'true' },
			{ name: 'Inactive', value: 'false' },
		],
		displayOptions: {
			show: {
				resource: ['approval'],
				operation: ['searchApprovals'],
			},
		},
		default: 'all',
		description: 'Filter by approval active status',
	},
	{
		displayName: 'Template ID',
		name: 'approvalTemplateId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['approval'],
				operation: ['searchApprovals'],
			},
		},
		default: '',
		description: 'Filter by template UUID',
	},
	{
		displayName: 'Title',
		name: 'approvalTitle',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['approval'],
				operation: ['searchApprovals'],
			},
		},
		default: '',
		description: 'Filter by approval title',
	},
	{
		displayName: 'Submitter ID',
		name: 'submitterId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['approval'],
				operation: ['searchApprovals'],
			},
		},
		default: 0,
		description: 'Filter by submitter user ID (0 to ignore)',
	},
	{
		displayName: 'Approver ID',
		name: 'approverId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['approval'],
				operation: ['searchApprovals'],
			},
		},
		default: 0,
		description: 'Filter by approver user ID (0 to ignore)',
	},
	{
		displayName: 'Last Modified Before',
		name: 'lastModifiedBefore',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['approval'],
				operation: ['searchApprovals'],
			},
		},
		default: '',
		placeholder: '2024-01-01T00:00:00Z',
		description: 'Filter approvals last modified before this ISO 8601 timestamp',
	},

	// ── Update Template ───────────────────────────────────────────────────────
	{
		displayName: 'Template Data',
		name: 'templateData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['approval'],
				operation: ['updateTemplate'],
			},
		},
		default: '',
		required: true,
		description: 'JSON object representing the full template input (ID, title, description, fields, approvers, observers, etc.)',
	},

	// ── Replace Approver ──────────────────────────────────────────────────────
	{
		displayName: 'GraphQL Body',
		name: 'gqlBody',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['approval'],
				operation: ['replaceApprover'],
			},
		},
		default: '',
		required: true,
		description:
			'Full GraphQL request body as JSON (operationName, variables, query)',
	},
];
