// import { IExecuteFunctions, IHttpRequestMethods, INodeProperties } from 'n8n-workflow';
import { INodeProperties } from 'n8n-workflow';

// TODO: Fix include all records in list operation

export const userOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['user'],
			},
		},
		options: [
			{
				name: 'Create User',
				value: 'create',
				action: 'Create a user',
				routing: {
					request: {
						body: {
							displayName: '={{$parameter.displayName}}',
							email: '={{$parameter.email}}',
							roleId: '={{$parameter.roleId}}',
						},
						method: 'POST',
						url: '/api/content/v3/users',
					},
				},
			},
			{
				name: 'Delete User',
				value: 'delete',
				action: 'Delete a user',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/api/identity/v1/users/{{ $parameter["userId"].toString() }}',
					},
				},
			},
			{
				name: 'Get Authenticated User',
				value: 'me',
				action: 'Get authenticated user',
				routing: {
					request: {
						method: 'GET',
						url: '/api/content/v3/users/me',
					},
				},
			},
			{
				name: 'Get User',
				value: 'get',
				action: 'Get a user',
				routing: {
					request: {
						method: 'GET',
						url: '=/api/content/v3/users/{{ $parameter["userId"].toString() }}',
					},
				},
			},
			{
				name: 'List Users',
				value: 'list',
				action: 'List users',
				routing: {
					request: {
						method: 'GET',
						url: '/api/content/v3/users',
					},
					operations: {
						pagination: {
							type: 'offset',
							properties: {
								limitParameter: 'limit',
								offsetParameter: 'offset',
								pageSize: 50,
								type: 'query',
							},
						},
					},
				},
			},
			{
				name: 'Update User',
				value: 'update',
				action: 'Update a user',
				routing: {
					request: {
						method: 'PUT',
						url: '=/api/content/v3/users/{{ $parameter["userId"].toString() }}',
						body: {
							displayName: '={{$parameter.displayName}}',
							email: '={{$parameter.email}}',
							alternateEmail: '={{$parameter.alternateEmail}}',
							phoneNumber: '={{$parameter.phoneNumber}}',
							deskPhoneNumber: '={{$parameter.deskPhoneNumber}}',
							title: '={{$parameter.title}}',
							department: '={{$parameter.department}}',
							webLandingPage: '={{$parameter.webLandingPage}}',
							webMobileLandingPage: '={{$parameter.webMobileLandingPage}}',
							roleId: '={{$parameter.roleId}}',
							employeeId: '={{$parameter.employeeId.toString()}}',
							employeeNumber: '={{$parameter.employeeNumber.toString()}}',
							invitorUserId: '={{$parameter.invitorUserId.toString()}}',
							hireDate: '={{$parameter.hireDate}}',
							reportsTo: '={{$parameter.reportsTo.toString()}}',
							locale: '={{$parameter.locale}}',
							timeZone: '={{$parameter.timeZone}}',
							employeeLocation: '={{$parameter.employeeLocation}}',
						},
					},
				},
			}
		],
		default: 'create',
	},
];

export const userFields: INodeProperties[] = [
	{
		displayName: 'Get All Records',
		name: 'getAllRecords',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['list'],
			},
		},
		default: false,
		description: 'Whether to fetch all records by automatically handling pagination',
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
				resource: ['user'],
				operation: ['list'],
				getAllRecords: [false],
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
				resource: ['user'],
				operation: ['list'],
				getAllRecords: [false],
			},
		},
		default: 0,
		description: 'Number of users to skip',
	},
	{
		displayName: 'Empty Value Handling',
		name: 'emptyValueHandling',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['update'],
			},
		},
		options: [
			{
				name: 'Ignore Empty Values',
				value: 'ignore',
				description: 'Skip fields that are empty or null',
			},
			{
				name: 'Overwrite with Empty Values',
				value: 'overwrite',
				description: 'Include empty/null values in the update',
			},
		],
		default: 'ignore',
		description: 'How to handle empty or null values when updating user',
	},
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['get', 'update', 'delete'],
			},
		},
		default: null,
		required: true,
		description: 'The ID of the user',
		typeOptions: {
			minValue: 1,
		},
	},
	{
		displayName: 'Display Name',
		name: 'displayName',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		required: true,
		description: 'The display name of the user',
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		typeOptions: {
			email: true
		},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		required: true,
		placeholder: 'email@example.com',
		description: 'The primary email address of the user',
	},
	{
		displayName: 'Role ID',
		name: 'roleId',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['create', 'update'],
			},
		},
		required: true,
		default: 4,
		placeholder: '4',
		description: 'Role ID (1=Admin, 2=Privileged, 3=Editor, 4=Participant, 5=Social) or custom role ID',
	},
	{
		displayName: 'Alternate Email',
		name: 'alternateEmail',
		type: 'string',
		typeOptions: {
			email: true,
		},
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['update'],
			},
		},
		default: '',
		placeholder: 'alternate@example.com',
		description: 'The alternate email address of the user',
	},
	{
		displayName: 'Phone Number',
		name: 'phoneNumber',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The phone number of the user',
	},
	{
		displayName: 'Desk Phone Number',
		name: 'deskPhoneNumber',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The desk phone number of the user',
	},
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The job title of the user',
	},
	{
		displayName: 'Department',
		name: 'department',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The department of the user',
	},
	{
		displayName: 'Web Landing Page ID',
		name: 'webLandingPage',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['update'],
			},
		},
		default: null,
		description: 'The web landing page ID for the user',
	},
	{
		displayName: 'Web Mobile Landing Page ID',
		name: 'webMobileLandingPage',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['update'],
			},
		},
		default: null,
		description: 'The mobile web landing page ID for the user',
	},
	{
		displayName: 'Employee ID',
		name: 'employeeId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The employee ID of the user',
	},
	{
		displayName: 'Employee Number',
		name: 'employeeNumber',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The employee number of the user',
	},
	{
		displayName: 'Invitor User ID',
		name: 'invitorUserId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['update'],
			},
		},
		default: null,
		description: 'The ID of the user who invited this user',
	},
	{
		displayName: 'Hire Date',
		name: 'hireDate',
		type: 'dateTime',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['update'],
			},
		},
		default: null,
		description: 'The hire date in Unix timestamp milliseconds format',
	},
	{
		displayName: 'Reports To',
		name: 'reportsTo',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['update'],
			},
		},
		default: null,
		description: 'The user ID of the person this user reports to',
	},
	{
		displayName: 'Locale',
		name: 'locale',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The locale setting for the user (e.g., en-US)',
	},
	{
		displayName: 'Time Zone',
		name: 'timeZone',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The time zone for the user (e.g., America/New_York)',
	},
	{
		displayName: 'Employee Location',
		name: 'employeeLocation',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['user'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The physical location of the employee',
	},
];
