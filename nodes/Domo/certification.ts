import { INodeProperties } from 'n8n-workflow';

export const certificationOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['certification'],
			},
		},
		options: [
			{
				name: 'Approve Certification',
				value: 'approveCertification',
				description: 'Approve a certification request',
				action: 'Approve certification',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/content/v1/certifications/" + $parameter.certificationId + "/approve" }}',
						body: {
							comments: '={{$parameter.comments}}',
						},
					},
				},
			},
			{
				name: 'Certify Content',
				value: 'certifyContent',
				description: 'Certify a piece of content',
				action: 'Certify content',
				routing: {
					request: {
						method: 'POST',
						url: '/api/content/v1/certifications',
						body: '={{JSON.parse($parameter.certificationData)}}',
					},
				},
			},
			{
				name: 'Get Certification',
				value: 'getCertification',
				description: 'Get details of a specific certification',
				action: 'Get certification',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/content/v1/certifications/" + $parameter.certificationId }}',
					},
				},
			},
			{
				name: 'Get Certification Status',
				value: 'getCertificationStatus',
				description: 'Get certification status for content',
				action: 'Get certification status',
				routing: {
					request: {
						method: 'GET',
						url: '/api/content/v1/certifications/status',
						qs: {
							contentId: '={{$parameter.contentId}}',
							contentType: '={{$parameter.contentType}}',
						},
					},
				},
			},
			{
				name: 'List Certifications',
				value: 'listCertifications',
				description: 'List all certifications',
				action: 'List certifications',
				routing: {
					request: {
						method: 'GET',
						url: '/api/content/v1/certifications',
						qs: {
							limit: '={{Math.min($parameter.limit || 50, 500)}}',
							offset: '={{$parameter.offset || 0}}',
						},
					},
				},
			},
			{
				name: 'Reject Certification',
				value: 'rejectCertification',
				description: 'Reject a certification request',
				action: 'Reject certification',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/content/v1/certifications/" + $parameter.certificationId + "/reject" }}',
						body: {
							reason: '={{$parameter.reason}}',
							comments: '={{$parameter.comments}}',
						},
					},
				},
			},
			{
				name: 'Request Certification',
				value: 'requestCertification',
				description: 'Request certification for content',
				action: 'Request certification',
				routing: {
					request: {
						method: 'POST',
						url: '/api/content/v1/certifications/request',
						body: '={{JSON.parse($parameter.requestData)}}',
					},
				},
			},
			{
				name: 'Revoke Certification',
				value: 'revokeCertification',
				description: 'Revoke a certification',
				action: 'Revoke certification',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/content/v1/certifications/" + $parameter.certificationId }}',
						body: {
							reason: '={{$parameter.reason}}',
						},
					},
				},
			},
		],
		default: 'listCertifications',
	},
];

export const certificationFields: INodeProperties[] = [
	// Certification ID field
	{
		displayName: 'Certification ID',
		name: 'certificationId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['certification'],
				operation: ['getCertification', 'approveCertification', 'rejectCertification', 'revokeCertification'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the certification',
	},
	// Content ID and Type fields (for status check)
	{
		displayName: 'Content ID',
		name: 'contentId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['certification'],
				operation: ['getCertificationStatus'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the content to check',
	},
	{
		displayName: 'Content Type',
		name: 'contentType',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['certification'],
				operation: ['getCertificationStatus'],
			},
		},
		options: [
			{
				name: 'Card',
				value: 'card',
			},
			{
				name: 'Dataset',
				value: 'dataset',
			},
			{
				name: 'Page',
				value: 'page',
			},
		],
		default: 'card',
		required: true,
		description: 'The type of content to check',
	},
	// List certifications fields
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['certification'],
				operation: ['listCertifications'],
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
				resource: ['certification'],
				operation: ['listCertifications'],
			},
		},
		default: 0,
		description: 'Number of certifications to skip',
	},
	// Certify content fields
	{
		displayName: 'Certification Data',
		name: 'certificationData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['certification'],
				operation: ['certifyContent'],
			},
		},
		default: '{}',
		required: true,
		description: 'JSON object containing certification details',
		placeholder: '{"contentId":"123","contentType":"card","certifiedBy":"user@example.com","notes":"Data validated"}',
	},
	// Request certification fields
	{
		displayName: 'Request Data',
		name: 'requestData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['certification'],
				operation: ['requestCertification'],
			},
		},
		default: '{}',
		required: true,
		description: 'JSON object containing certification request details',
		placeholder: '{"contentId":"123","contentType":"card","requestedBy":"user@example.com","justification":"Ready for certification"}',
	},
	// Comments field (for approve)
	{
		displayName: 'Comments',
		name: 'comments',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['certification'],
				operation: ['approveCertification', 'rejectCertification'],
			},
		},
		default: '',
		description: 'Comments about the certification decision',
	},
	// Reason field (for reject and revoke)
	{
		displayName: 'Reason',
		name: 'reason',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['certification'],
				operation: ['rejectCertification', 'revokeCertification'],
			},
		},
		default: '',
		required: true,
		description: 'Reason for rejection or revocation',
	},
];

