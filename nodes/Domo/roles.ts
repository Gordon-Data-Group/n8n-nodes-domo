import { INodeProperties } from 'n8n-workflow';
import { preSendLogger } from './shared/preSendLogger';

export const rolesOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['roles'],
			},
		},
		options: [
			{
				name: 'Get Role',
				value: 'getRole',
				action: 'Get a role',
				routing: {
					request: {
						method: 'GET',
						url: '=/authorization/v1/roles/{{ $parameter.roleId }}',
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Get Role Authorities',
				value: 'getRoleAuthorities',
				action: 'Get authorities for a role',
				routing: {
					request: {
						method: 'GET',
						url: '=/authorization/v1/roles/{{ $parameter.roleId }}/authorities',
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Get Users for Authority',
				value: 'getUsersForAuthority',
				action: 'Get users that have an authority grant',
				routing: {
					request: {
						method: 'GET',
						url: '/content/v1/typeahead',
						qs: {
							authorities: '={{ $parameter.authority }}',
							limit: '={{ $parameter.limit }}',
							type: '={{ $parameter.searchTypes }}',
							filter: '={{ $parameter.filter || undefined }}',
							fields: '={{ $parameter.additionalField || undefined }}',
						},
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'List Authorities',
				value: 'listAuthorities',
				action: 'List all authorities grants',
				routing: {
					request: {
						method: 'GET',
						url: '/authorization/v1/authorities',
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'List Roles',
				value: 'listRoles',
				action: 'List all roles',
				routing: {
					request: {
						method: 'GET',
						url: '/authorization/v1/roles',
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
		],
		default: 'listRoles',
	},
];

export const rolesFields: INodeProperties[] = [
	// ── Get Role / Get Role Authorities ─────────────────────────────────────
	{
		displayName: 'Role ID',
		name: 'roleId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['roles'],
				operation: ['getRole', 'getRoleAuthorities'],
			},
		},
		default: null,
		required: true,
		description: 'The numeric ID of the role',
		typeOptions: {
			minValue: 1,
		},
	},

	// ── Get Users for Authority ──────────────────────────────────────────────
	{
		displayName: 'Authority (Grant)',
		name: 'authority',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['roles'],
				operation: ['getUsersForAuthority'],
			},
		},
		default: '',
		required: true,
		placeholder: 'content.card.edit',
		description: 'The authority (grant) to look up users for (e.g. content.card.edit)',
	},
	{
		displayName: 'Search Types',
		name: 'searchTypes',
		type: 'multiOptions',
		displayOptions: {
			show: {
				resource: ['roles'],
				operation: ['getUsersForAuthority'],
			},
		},
		options: [
			{
				name: 'User by Email',
				value: 'userByEmail',
			},
			{
				name: 'User by Name',
				value: 'userByName',
			},
		],
		default: ['userByName', 'userByEmail'],
		description: 'How to match users — by name, email, or both',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['roles'],
				operation: ['getUsersForAuthority'],
			},
		},
		default: 50,
		typeOptions: {
			minValue: 1,
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Filter',
		name: 'filter',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['roles'],
				operation: ['getUsersForAuthority'],
			},
		},
		default: '',
		description: 'Optional text to filter users by name or email',
	},
	{
		displayName: 'Additional Field',
		name: 'additionalField',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['roles'],
				operation: ['getUsersForAuthority'],
			},
		},
		options: [
			{
				name: 'None',
				value: '',
			},
			{
				name: 'User Trial Details',
				value: 'USER_TRIAL_DETAILS',
			},
		],
		default: '',
		description: 'Additional field data to include in the response',
	},
];
