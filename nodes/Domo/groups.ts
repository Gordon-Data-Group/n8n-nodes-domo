import { INodeProperties } from 'n8n-workflow';

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
				name: 'Add Members to Group',
				value: 'addMembers',
				action: 'Add members to group',
				routing: {
					request: {
						method: 'PUT',
						url: '/api/content/v2/groups/access',
						body: '={{JSON.parse($parameter.membersData)}}',
					},
				},
			},
			{
				name: 'Add or Remove Owners',
				value: 'addRemoveOwners',
				action: 'Add or remove owners',
				routing: {
					request: {
						method: 'PUT',
						url: '/api/content/v2/groups/access',
						body: '={{JSON.parse($parameter.ownersData)}}',
					},
				},
			},
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
						body: '={{JSON.parse($parameter.groupData)}}',
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
						url: '={{ "/api/content/v1/avatar/GROUP/" + $parameter.groupId }}',
						qs: {
							size: '={{$parameter.size}}',
							defaultBackground: '={{$parameter.defaultBackground}}',
							defaultForeground: '={{$parameter.defaultForeground}}',
							defaultText: '={{$parameter.defaultText}}',
						},
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
							sort: '={{$parameter.sort}}',
							limit: '={{$parameter.limit}}',
							offset: '={{$parameter.offset}}',
							includeFullMembership: '={{$parameter.includeFullMembership}}',
							owner: '={{$parameter.owner}}',
							ownerType: '={{$parameter.ownerType}}',
							groupType: '={{$parameter.groupType}}',
							createdAfter: '={{$parameter.createdAfter}}',
							createdBefore: '={{$parameter.createdBefore}}',
							members: '={{$parameter.members}}',
							isManageable: '={{$parameter.isManageable}}',
							search: '={{$parameter.search}}',
						},
					},
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
						body: '={{JSON.parse($parameter.groupData)}}',
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
				operation: ['get', 'delete', 'getPermissions', 'getAvatar'],
			},
		},
		default: null,
		required: true,
		description: 'The ID of the group',
	},
	// List Groups fields
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
		displayName: 'Sort',
		name: 'sort',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['list'],
			},
		},
		default: '',
		description: 'Sort field',
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
		displayName: 'Owner',
		name: 'owner',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['list'],
			},
		},
		default: '',
		description: 'Filter by owner ID',
	},
	{
		displayName: 'Owner Type',
		name: 'ownerType',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['list'],
			},
		},
		default: '',
		description: 'Filter by owner type (USER or GROUP)',
	},
	{
		displayName: 'Group Type',
		name: 'groupType',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['list'],
			},
		},
		default: '',
		description: 'Filter by group type',
	},
	{
		displayName: 'Created After',
		name: 'createdAfter',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['list'],
			},
		},
		default: '',
		description: 'Filter by creation date (after)',
	},
	{
		displayName: 'Created Before',
		name: 'createdBefore',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['list'],
			},
		},
		default: '',
		description: 'Filter by creation date (before)',
	},
	{
		displayName: 'Members',
		name: 'members',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['list'],
			},
		},
		default: '',
		description: 'Filter by member IDs',
	},
	{
		displayName: 'Is Manageable',
		name: 'isManageable',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['list'],
			},
		},
		default: false,
		description: 'Whether to filter by manageable groups',
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
		displayName: 'Default Background',
		name: 'defaultBackground',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['getAvatar'],
			},
		},
		default: '',
		description: 'Default background color',
	},
	{
		displayName: 'Default Foreground',
		name: 'defaultForeground',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['getAvatar'],
			},
		},
		default: '',
		description: 'Default foreground color',
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
		description: 'Default text for avatar',
	},
	// Create/Update Group fields
	{
		displayName: 'Group Data',
		name: 'groupData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['create', 'updateDynamicGroupRules'],
			},
		},
		default: '',
		placeholder: '{"name":"Group Name","type":"dynamic","description":""}',
		required: true,
		description: 'JSON object containing group configuration',
	},
	// Add/Remove Owners fields
	{
		displayName: 'Owners Data',
		name: 'ownersData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['addRemoveOwners'],
			},
		},
		default: '',
		placeholder: '[{"groupID":123456,"addOwners":[{"type":"GROUP","ID":"123456"}],"removeOwners":[{"type":"USER","ID":"123456"}]}]',
		required: true,
		description: 'JSON array containing owners to add or remove',
	},
	// Add Members fields
	{
		displayName: 'Members Data',
		name: 'membersData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['addMembers'],
			},
		},
		default: '',
		placeholder: '[{"groupID":252073910,"addMembers":[{"type":"USER","ID":"901072511"}]}]',
		required: true,
		description: 'JSON array containing members to add',
	},
];

