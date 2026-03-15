import type { IExecuteSingleFunctions, IHttpRequestOptions } from 'n8n-workflow';
import { INodeProperties } from 'n8n-workflow';
import { preSendLogger } from './shared/preSendLogger';

// Match n8n expressions: ={{ ... }} or {{ ... }}
const EXPRESSION_REGEX = /^\s*=\{\{[\s\S]*\}\}\s*$|^\s*\{\{[\s\S]*\}\}\s*$/;

/** Normalize to #RRGGBB or return empty string if not valid hex */
function normalizeHex(s: unknown): string {
	if (s == null || typeof s !== 'string') return '';
	const trimmed = s.trim().replace(/^#/, '');
	if (/^[0-9A-Fa-f]{3}$/.test(trimmed)) {
		return '#' + (trimmed[0] + trimmed[0] + trimmed[1] + trimmed[1] + trimmed[2] + trimmed[2]);
	}
	if (/^[0-9A-Fa-f]{6}$/.test(trimmed)) return '#' + trimmed;
	return '';
}

function stripLeadingEqualsFromStrings(obj: unknown): unknown {
	if (typeof obj === 'string') {
		return obj.charAt(0) === '=' ? obj.slice(1) : obj;
	}
	if (Array.isArray(obj)) {
		return obj.map(stripLeadingEqualsFromStrings);
	}
	if (obj !== null && typeof obj === 'object') {
		const out: Record<string, unknown> = {};
		for (const [k, v] of Object.entries(obj)) {
			out[k] = stripLeadingEqualsFromStrings(v);
		}
		return out;
	}
	return obj;
}

async function resolveExpressionsInBody(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const self = this;
	function resolve(obj: unknown): unknown {
		if (typeof obj === 'string' && EXPRESSION_REGEX.test(obj)) {
			const expr = obj.trimStart().startsWith('={{') ? obj : `=${obj.trim()}`;
			return self.evaluateExpression(expr, 0);
		}
		if (Array.isArray(obj)) {
			return obj.map((item) => resolve(item));
		}
		if (obj !== null && typeof obj === 'object') {
			const out: Record<string, unknown> = {};
			for (const [k, v] of Object.entries(obj)) {
				out[k] = resolve(v);
			}
			return out;
		}
		return obj;
	}
	if (requestOptions.body != null) {
		let body = resolve(requestOptions.body) as IHttpRequestOptions['body'];
		body = stripLeadingEqualsFromStrings(body) as IHttpRequestOptions['body'];
		requestOptions.body = body;
	}
	return requestOptions;
}

async function normalizeAvatarHexColors(
	_requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const body = _requestOptions.body as Record<string, unknown> | undefined;
	if (body && typeof body === 'object' && !Array.isArray(body)) {
		if ('background' in body) body.background = normalizeHex(body.background);
		if ('foreground' in body) body.foreground = normalizeHex(body.foreground);
	}
	return _requestOptions;
}

async function prepareUpdateAvatarBody(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const body = requestOptions.body as Record<string, unknown> | undefined;
	if (!body || typeof body !== 'object' || Array.isArray(body)) return requestOptions;
	const avatarType = this.getNodeParameter('avatarType', 0) as string;
	if (avatarType === 'image') {
		delete body.background;
		delete body.foreground;
		delete body.text;
	} else {
		delete body.encodedImage;
	}
	return requestOptions;
}

export const groupOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['group'],
			},
		},
		options: [
			{
				name: 'Bulk Delete Groups',
				value: 'bulkDelete',
				action: 'Bulk delete groups',
				routing: {
					request: {
						method: 'DELETE',
						url: '/api/content/v2/groups',
						body: '={{JSON.parse($parameter.groupIds)}}',
					},
				},
			},
			{
				name: 'Create Group',
				value: 'create',
				action: 'Create group',
				routing: {
					request: {
						method: 'POST',
						url: '/api/content/v2/groups',
						body: {
							name: '={{$parameter.name}}',
							description: '={{$parameter.description}}',
							type: '={{$parameter.type}}',
						},
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Delete Group',
				value: 'delete',
				action: 'Delete group',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/content/v2/groups/" + $parameter.groupId }}',
					},
				},
			},
			{
				name: 'Get Avatar',
				value: 'getAvatar',
				action: 'Get avatar',
				routing: {
					request: {
						method: 'GET',
						headers: {
							'Accept': '*/*',
						},
						url: '={{ "/api/content/v1/avatar/GROUP/" + $parameter.groupId }}',
						qs: {
							size: '={{$parameter.size}}',
							defaultBackground: '={{$parameter.defaultBackground}}',
							defaultForeground: '={{$parameter.defaultForeground}}',
							defaultText: '={{$parameter.defaultText}}',
						},
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Get Group',
				value: 'get',
				action: 'Get a group',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/content/v2/groups/" + $parameter.groupId }}',
					},
				},
			},
			{
				name: 'Get Groups',
				value: 'getGroups',
				action: 'Get groups',
				routing: {
					request: {
						method: 'POST',
						url: '/api/content/v2/groups/get',
						qs: {
							includeActive: '={{$parameter.includeActive}}',
							includeUsers: '={{$parameter.includeUsers}}',
						},
						body: '={{JSON.parse($parameter.groupIds)}}',
					},
				},
			},
			{
				name: 'Get Permissions',
				value: 'getPermissions',
				action: 'Get permissions',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/content/v2/groups/" + $parameter.groupId + "/permissions" }}',
						qs: {
							checkOwnership: '={{$parameter.checkOwnership}}',
							includeUsers: '={{$parameter.includeUsers}}',
						},
					},
				},
			},
			{
				name: 'List Groups',
				value: 'list',
				action: 'List groups',
				routing: {
					request: {
						method: 'GET',
						url: '/api/content/v2/groups/grouplist',
						qs: {
							ascending: '={{$parameter.ascending}}',
							limit: '={{$parameter.limit}}',
							offset: '={{$parameter.offset}}',
							includeFullMembership: '={{$parameter.includeFullMembership}}',
							search: '={{$parameter.search}}',
							// Only include the following parameters if they are not empty
							owner: '={{ $parameter.ownerFilter?.owner?.id != null && $parameter.ownerFilter.owner.id !== "" ? $parameter.ownerFilter.owner.id : undefined }}',
							ownerType: '={{ $parameter.ownerFilter?.owner?.type != null && $parameter.ownerFilter.owner.type !== "" ? $parameter.ownerFilter.owner.type : undefined }}',
							createdBefore: '={{ $parameter.createdBefore ? (typeof $parameter.createdBefore.toISOString === "function" ? $parameter.createdBefore.toISOString() : $parameter.createdBefore) : undefined }}',
							createdAfter: '={{ $parameter.createdAfter ? (typeof $parameter.createdAfter.toISOString === "function" ? $parameter.createdAfter.toISOString() : $parameter.createdAfter) : undefined }}',
							groupType: '={{ $parameter.typeFilter != null && $parameter.typeFilter !== "" &&$parameter.typeFilter.toLowerCase() !== "none" ? $parameter.typeFilter : undefined }}',
						},
					},
				},
			},
			{
				name: 'Modify Group Members',
				value: 'modifyGroupMembers',
				action: 'Modify group members',
				routing: {
					request: {
						method: 'PUT',
						url: '/api/content/v2/groups/access',
						body: '={{ (() => { const gid = $parameter.groupId; const toId = (o) => (o && (o.id != null || o.id === 0) ? { type: o.type, id: String(o.id) } : null); const ao = ($parameter.addOwners && $parameter.addOwners.owner) || []; const ro = ($parameter.removeOwners && $parameter.removeOwners.owner) || []; const am = ($parameter.addMembers && $parameter.addMembers.member) || []; const rm = ($parameter.removeMembers && $parameter.removeMembers.member) || []; const addOwners = ao.map(toId).filter(Boolean); const removeOwners = ro.map(toId).filter(Boolean); const addMembers = am.map(toId).filter(Boolean); const removeMembers = rm.map(toId).filter(Boolean); const entry = { groupId: gid }; if (addOwners.length) entry.addOwners = addOwners; if (removeOwners.length) entry.removeOwners = removeOwners; if (addMembers.length) entry.addMembers = addMembers; if (removeMembers.length) entry.removeMembers = removeMembers; return [entry]; })() }}',
					},
					send: {
						preSend: [resolveExpressionsInBody, preSendLogger],
					},
				},
			},
			{
				name: 'Update Avatar',
				value: 'updateAvatar',
				action: 'Update avatar',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/content/v1/avatar/GROUP/" + $parameter.groupId }}',
						body: {
							background: '={{$parameter.avatarBackground}}',
							foreground: '={{$parameter.avatarForeground}}',
							text: '={{$parameter.avatarText}}',
							encodedImage: '={{$parameter.avatarEncodedImage}}',
						},
					},
					send: { preSend: [prepareUpdateAvatarBody, normalizeAvatarHexColors, preSendLogger] },
				},
			},
			{
				name: 'Update Dynamic Group Rules',
				value: 'updateDynamicGroupRules',
				action: 'Update dynamic group rules',
				routing: {
					request: {
						method: 'PUT',
						url: '/api/content/v2/groups',
						body: '={{JSON.parse($parameter.dynamicGroupDefinition)}}',
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
		],
		default: 'list',
	},
];

export const groupFields: INodeProperties[] = [
	// Group ID field
	{
		displayName: 'Group ID',
		name: 'groupId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['get', 'delete', 'getPermissions', 'getAvatar', 'modifyGroupMembers', 'updateAvatar'],
			},
		},
		default: null,
		required: true,
		description: 'The ID of the group',
	},
	// List Groups fields
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['list'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['list'],
				returnAll: [false],
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
				resource: ['group'],
				operation: ['list'],
				returnAll: [false],
			},
		},
		default: 0,
		description: 'Number of groups to skip',
	},
	{
		displayName: 'Ascending',
		name: 'ascending',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['list'],
			},
		},
		default: true,
		description: 'Whether to sort in ascending order',
	},
	{
		displayName: 'Include Full Membership',
		name: 'includeFullMembership',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['list'],
			},
		},
		default: false,
		description: 'Whether to include full membership details',
	},
	{
		displayName: 'Search',
		name: 'search',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['list'],
			},
		},
		default: '',
		description: 'Search term',
	},
	// Get Groups fields
	{
		displayName: 'Group IDs',
		name: 'groupIds',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['getGroups', 'bulkDelete'],
			},
		},
		default: '',
		placeholder: '["1234","2345"]',
		required: true,
		description: 'JSON array of group IDs',
	},
	{
		displayName: 'Include Active',
		name: 'includeActive',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['getGroups'],
			},
		},
		default: false,
		description: 'Whether to include active status',
	},
	{
		displayName: 'Include Users',
		name: 'includeUsers',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['getGroups', 'getPermissions'],
			},
		},
		default: false,
		description: 'Whether to include user details',
	},
	// Get Permissions fields
	{
		displayName: 'Check Ownership',
		name: 'checkOwnership',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['getPermissions'],
			},
		},
		default: false,
		description: 'Whether to check ownership',
	},
	// Get Avatar fields
	{
		displayName: 'Size',
		name: 'size',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['getAvatar'],
			},
		},
		default: '',
		description: 'Avatar size',
	},
	{
		displayName: 'Default Background Color (Hex)',
		name: 'defaultBackground',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['getAvatar'],
			},
		},
		default: '',
		description: 'Default background color in hex (e.g. #FFFFFF or #FFF)',
	},
	{
		displayName: 'Default Foreground Color (Hex)',
		name: 'defaultForeground',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['getAvatar'],
			},
		},
		default: '',
		description: 'Default foreground color in hex (e.g. #000000 or #000)',
	},
	{
		displayName: 'Default Text',
		name: 'defaultText',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['getAvatar'],
			},
		},
		default: '',
		description: 'Default text for avatar (max 3 characters)',
	},
	// Update Avatar fields
	{
		displayName: 'Avatar Type',
		name: 'avatarType',
		type: 'options',
		options: [
			{ name: 'Text', value: 'text' },
			{ name: 'Image', value: 'image' },
		],
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['updateAvatar'],
			},
		},
		default: 'text',
		description: 'Type of avatar',
	},
	{
		displayName: 'Avatar Encoded Image',
		name: 'avatarEncodedImage',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['updateAvatar'],
				avatarType: ['image'],
			},
		},
		default: '',
		placeholder: 'data:image/png;base64,iVBORw0KGgo... or paste raw base64',
		description:
			'Base64-encoded image (e.g. from a previous node\'s binary data, or a data URL like data:image/png;base64,...). Data URL prefix is stripped before sending.',
	},
	{
		displayName: 'Avatar Background Color (Hex)',
		name: 'avatarBackground',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['updateAvatar'],
				avatarType: ['text'],
			},
		},
		default: '',
		placeholder: '#FFFFFF',
		description: 'Background color in hex (e.g. #FFFFFF or #FFF)',
	},
	{
		displayName: 'Avatar Foreground Color (Hex)',
		name: 'avatarForeground',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['updateAvatar'],
				avatarType: ['text'],
			},
		},
		default: '',
		placeholder: '#000000',
		description: 'Foreground color in hex (e.g. #000000 or #000)',
	},
	{
		displayName: 'Avatar Text',
		name: 'avatarText',
		type: 'string',
		typeOptions: {
			maxLength: 3,
		},
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['updateAvatar'],
				avatarType: ['text'],
			},
		},
		default: '',
		description: 'Text (max 3 characters) for avatar',
	},
	// Create/Update Group fields
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['create'],
			},
		},
		default: '',
		required: true,
		description: 'The name of the group',
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['create'],
			},
		},
		default: '',
		required: true,
		description: 'The description of the group',
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'options',
		options: [
			{
				name: 'Open',
				value: 'open',
			},
			{
				name: 'Closed',
				value: 'closed',
			},
			{
				name: 'Dynamic',
				value: 'dynamic',
			},
		],
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['create'],
			},
		},
		default: 'open',
		required: true,
		description: 'The type of the group',
	},
	{
		displayName: 'Type',
		name: 'typeFilter',
		type: 'options',
		options: [
			{
				name: 'Ad Hoc',
				value: 'adHoc',
			},
			{
				name: 'Closed',
				value: 'closed',
			},
			{
				name: 'Directory',
				value: 'directory',
			},
			{
				name: 'Dynamic',
				value: 'dynamic',
			},
			{
				name: 'None',
				value: '',
			},
			{
				name: 'Open',
				value: 'open',
			},
			{
				name: 'System',
				value: 'system',
			},
		],
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['list'],
			},
		},
		default: '',
		description: 'Filter by type',
	},
	// List Groups: single owner filter
	{
		displayName: 'Owner Filter',
		name: 'ownerFilter',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: false,
		},
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['list'],
			},
		},
		default: {},
		description: 'Filter the list by a single owner (user or group)',
		options: [
			{
				displayName: 'Owner',
				name: 'owner',
				values: [
					{
						displayName: 'Type',
						name: 'type',
						type: 'options',
						options: [
							{ name: 'User', value: 'USER' },
							{ name: 'Group', value: 'GROUP' },
						],
						default: 'USER',
						required: true,
					},
					{
						displayName: 'Owner ID',
						name: 'id',
						type: 'number',
						default: '',
						required: true,
						description: 'The ID of the user or group to share with',
					},
				],
			},
		],
	},
	// Modify Group Members: multiple owner entries
	{
		displayName: 'Add Owners',
		name: 'addOwners',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['modifyGroupMembers'],
			},
		},
		default: {},
		description: 'Add owners to a group; each entry can target a group and specify owners to add',
		options: [
			{
				displayName: 'Owner',
				name: 'owner',
				values: [
					{
						displayName: 'Type',
						name: 'type',
						type: 'options',
						options: [
							{ name: 'User', value: 'USER' },
							{ name: 'Group', value: 'GROUP' },
						],
						default: 'USER',
						required: true,
					},
					{
						displayName: 'Owner ID',
						name: 'id',
						type: 'number',
						default: '',
						required: true,
						description: 'The ID of the user or group to share with',
					},
				],
			},
		],
	},
	{
		displayName: 'Remove Owners',
		name: 'removeOwners',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['modifyGroupMembers'],
			},
		},
		default: {},
		description: 'Remove owners from a group; each entry can target a group and specify owners to remove',
		options: [
			{
				displayName: 'Owner',
				name: 'owner',
				values: [
					{
						displayName: 'Type',
						name: 'type',
						type: 'options',
						options: [
							{ name: 'User', value: 'USER' },
							{ name: 'Group', value: 'GROUP' },
						],
						default: 'USER',
						required: true,
					},
					{
						displayName: 'Owner ID',
						name: 'id',
						type: 'number',
						default: '',
						required: true,
						description: 'The ID of the user or group to share with',
					},
				],
			},
		],
	},
	{
		displayName: 'Add Members',
		name: 'addMembers',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['modifyGroupMembers'],
			},
		},
		default: {},
		description: 'Add owners to a group; each entry can target a group and specify owners to add',
		options: [
			{
				displayName: 'Member',
				name: 'member',
				values: [
					{
						displayName: 'Type',
						name: 'type',
						type: 'options',
						options: [
							{ name: 'User', value: 'USER' },
							{ name: 'Group', value: 'GROUP' },
						],
						default: 'USER',
						required: true,
					},
					{
						displayName: 'Member ID',
						name: 'id',
						type: 'number',
						default: '',
						required: true,
						description: 'The ID of the user or group to add as a member',
					},
				],
			},
		],
	},
	{
		displayName: 'Remove Members',
		name: 'removeMembers',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['modifyGroupMembers'],
			},
		},
		default: {},
		description: 'Remove members from a group; each entry can target a group and specify members to remove',
		options: [
			{
				displayName: 'Member',
				name: 'member',
				values: [
					{
						displayName: 'Type',
						name: 'type',
						type: 'options',
						options: [
							{ name: 'User', value: 'USER' },
							{ name: 'Group', value: 'GROUP' },
						],
						default: 'USER',
						required: true,
					},
					{
						displayName: 'Member ID',
						name: 'id',
						type: 'number',
						default: '',
						required: true,
						description: 'The ID of the user or group to remove as a member',
					},
				],
			},
		],
	},
	{
		displayName: 'Created Before',
		name: 'createdBefore',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['list'],
			},
		},
		default: '',
		description: 'Filter by creation date',
	},
	{
		displayName: 'Created After',
		name: 'createdAfter',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['list'],
			},
		},
		default: '',
		description: 'Filter by creation date',
	},
	// updateDynamicGroupRules: always show Dynamic Group Definition
	{
		displayName: 'Dynamic Group Definition',
		name: 'dynamicGroupDefinition',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['updateDynamicGroupRules'],
			},
		},
		default: '',
		placeholder: '{"name":"Group Name","type":"dynamic","description":""}',
		required: true,
		description: 'JSON object containing group configuration',
	}
];

