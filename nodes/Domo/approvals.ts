import { INodeProperties } from 'n8n-workflow';

export const approvalOperations: INodeProperties[] = [
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
		options: [
			{
				name: 'Get Approval',
				value: 'getApproval',
				description: 'Get details of a specific approval',
				action: 'Get approval',
				routing: {
					request: {
						method: 'POST',
						url: '/api/content/v1/approvals/graphql',
						body: {
							query: '={{`query { getApproval(id: "${$parameter.approvalId}") { id name status type createdAt updatedAt requester { id name } approvers { id name status } } }`}}',
						},
					},
				},
			},
			{
				name: 'Get Template',
				value: 'getTemplate',
				description: 'Get details of a specific approval template',
				action: 'Get template',
				routing: {
					request: {
						method: 'POST',
						url: '/api/content/v1/approvals/graphql',
						body: {
							query: '={{`query { getTemplate(id: "${$parameter.templateId}") { id name description type createdAt updatedAt approvers { id name } } }`}}',
						},
					},
				},
			},
			{
				name: 'List Templates',
				value: 'listTemplates',
				description: 'List all approval templates',
				action: 'List templates',
				routing: {
					request: {
						method: 'POST',
						url: '/api/content/v1/approvals/graphql',
						body: {
							query: '={{`query { listTemplates(limit: ${$parameter.limit || 50}, offset: ${$parameter.offset || 0}) { templates { id name description type } total } }`}}',
						},
					},
				},
			},
			{
				name: 'Replace Approver',
				value: 'replaceApprover',
				description: 'Replace an approver in an approval',
				action: 'Replace approver',
				routing: {
					request: {
						method: 'POST',
						url: '/api/content/v1/approvals/graphql',
						body: {
							query: '={{`mutation { replaceApprover(approvalId: "${$parameter.approvalId}", oldApproverId: ${$parameter.oldApproverId}, newApproverId: ${$parameter.newApproverId}) { id status } }`}}',
						},
					},
				},
			},
			{
				name: 'Search Approvals',
				value: 'searchApprovals',
				description: 'Search for approvals based on criteria',
				action: 'Search approvals',
				routing: {
					request: {
						method: 'POST',
						url: '/api/content/v1/approvals/graphql',
						body: '={{JSON.parse($parameter.searchQuery)}}',
					},
				},
			},
			{
				name: 'Search Templates',
				value: 'searchTemplates',
				description: 'Search for approval templates based on criteria',
				action: 'Search templates',
				routing: {
					request: {
						method: 'POST',
						url: '/api/content/v1/approvals/graphql',
						body: '={{JSON.parse($parameter.searchQuery)}}',
					},
				},
			},
			{
				name: 'Update Template',
				value: 'updateTemplate',
				description: 'Update an approval template',
				action: 'Update template',
				routing: {
					request: {
						method: 'POST',
						url: '/api/content/v1/approvals/graphql',
						body: '={{JSON.parse($parameter.templateData)}}',
					},
				},
			},
		],
		default: 'listTemplates',
	},
];

export const approvalFields: INodeProperties[] = [
	// Approval ID field (for getApproval, replaceApprover)
	{
		displayName: 'Approval ID',
		name: 'approvalId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['approval'],
				operation: ['getApproval', 'replaceApprover'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the approval',
	},
	// Template ID field (for getTemplate)
	{
		displayName: 'Template ID',
		name: 'templateId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['approval'],
				operation: ['getTemplate'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the approval template',
	},
	// List templates fields
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['approval'],
				operation: ['listTemplates'],
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
				resource: ['approval'],
				operation: ['listTemplates'],
			},
		},
		default: 0,
		description: 'Number of templates to skip',
	},
	// Replace approver fields
	{
		displayName: 'Old Approver ID',
		name: 'oldApproverId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['approval'],
				operation: ['replaceApprover'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the approver to be replaced',
	},
	{
		displayName: 'New Approver ID',
		name: 'newApproverId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['approval'],
				operation: ['replaceApprover'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the new approver',
	},
	// Search operations fields
	{
		displayName: 'Search Query',
		name: 'searchQuery',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['approval'],
				operation: ['searchApprovals', 'searchTemplates'],
			},
		},
		default: '{}',
		required: true,
		description: 'GraphQL query object for searching',
		placeholder: '{"query":"query { searchApprovals(filter: { status: \"PENDING\" }) { ID name status } }"}',
	},
	// Update template field
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
		default: '{}',
		required: true,
		description: 'GraphQL mutation object for updating template',
		placeholder: '{"query":"mutation { updateTemplate(ID: "123", input: { name: "New Name" }) { ID name } }"}',
	},
];

