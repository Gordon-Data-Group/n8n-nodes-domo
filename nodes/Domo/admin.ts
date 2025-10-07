import { INodeProperties } from 'n8n-workflow';

export const adminOperations: INodeProperties[] = [
	{
		displayName: 'Sub-Resource',
		name: 'subResource',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['admin'],
			},
		},
		options: [
			{
				name: 'Audit Logs',
				value: 'auditLogs',
			},
			{
				name: 'Feature Flags',
				value: 'featureFlags',
			},
			{
				name: 'Instance',
				value: 'instance',
			},
			{
				name: 'Security',
				value: 'security',
			},
			{
				name: 'Settings',
				value: 'settings',
			},
		],
		default: 'settings',
		description: 'The admin sub-resource to interact with',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['admin'],
				subResource: ['auditLogs'],
			},
		},
		options: [
			{
				name: 'Get Audit Logs',
				value: 'getAuditLogs',
				description: 'Retrieve audit logs',
				action: 'Get audit logs',
				routing: {
					request: {
						method: 'GET',
						url: '/api/admin/v1/audit/logs',
						qs: {
							limit: '={{Math.min($parameter.limit || 50, 500)}}',
							offset: '={{$parameter.offset || 0}}',
							startDate: '={{$parameter.startDate}}',
							endDate: '={{$parameter.endDate}}',
						},
					},
				},
			},
			{
				name: 'Get Audit Log Details',
				value: 'getAuditLogDetails',
				description: 'Get details of a specific audit log entry',
				action: 'Get audit log details',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/admin/v1/audit/logs/" + $parameter.logId }}',
					},
				},
			},
		],
		default: 'getAuditLogs',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['admin'],
				subResource: ['featureFlags'],
			},
		},
		options: [
			{
				name: 'Get Feature Flag',
				value: 'getFeatureFlag',
				description: 'Get a specific feature flag',
				action: 'Get feature flag',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/admin/v1/features/" + $parameter.featureName }}',
					},
				},
			},
			{
				name: 'List Feature Flags',
				value: 'listFeatureFlags',
				description: 'List all feature flags',
				action: 'List feature flags',
				routing: {
					request: {
						method: 'GET',
						url: '/api/admin/v1/features',
					},
				},
			},
			{
				name: 'Update Feature Flag',
				value: 'updateFeatureFlag',
				description: 'Update a feature flag',
				action: 'Update feature flag',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/admin/v1/features/" + $parameter.featureName }}',
						body: {
							enabled: '={{$parameter.enabled}}',
						},
					},
				},
			},
		],
		default: 'listFeatureFlags',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['admin'],
				subResource: ['instance'],
			},
		},
		options: [
			{
				name: 'Get Instance Info',
				value: 'getInstanceInfo',
				description: 'Get Domo instance information',
				action: 'Get instance info',
				routing: {
					request: {
						method: 'GET',
						url: '/api/admin/v1/instance',
					},
				},
			},
		{
			name: 'Get Instance Settings',
			value: 'getInstanceSettings',
			action: 'Get instance settings',
			routing: {
				request: {
					method: 'GET',
					url: '/api/admin/v1/instance/settings',
				},
			},
		},
		{
			name: 'Update Instance Settings',
			value: 'updateInstanceSettings',
			action: 'Update instance settings',
			routing: {
				request: {
					method: 'PUT',
					url: '/api/admin/v1/instance/settings',
					body: '={{JSON.parse($parameter.settingsData)}}',
				},
			},
		},
		],
		default: 'getInstanceInfo',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['admin'],
				subResource: ['security'],
			},
		},
		options: [
			{
				name: 'Get Password Policy',
				value: 'getPasswordPolicy',
				description: 'Get password policy settings',
				action: 'Get password policy',
				routing: {
					request: {
						method: 'GET',
						url: '/api/admin/v1/security/password-policy',
					},
				},
			},
		{
			name: 'Get Security Settings',
			value: 'getSecuritySettings',
			action: 'Get security settings',
			routing: {
				request: {
					method: 'GET',
					url: '/api/admin/v1/security/settings',
				},
			},
		},
		{
			name: 'Update Password Policy',
			value: 'updatePasswordPolicy',
			action: 'Update password policy',
			routing: {
				request: {
					method: 'PUT',
					url: '/api/admin/v1/security/password-policy',
					body: '={{JSON.parse($parameter.policyData)}}',
				},
			},
		},
		{
			name: 'Update Security Settings',
			value: 'updateSecuritySettings',
			action: 'Update security settings',
			routing: {
				request: {
					method: 'PUT',
					url: '/api/admin/v1/security/settings',
					body: '={{JSON.parse($parameter.securityData)}}',
				},
			},
		},
		],
		default: 'getSecuritySettings',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['admin'],
				subResource: ['settings'],
			},
		},
		options: [
			{
				name: 'Get Settings',
				value: 'getSettings',
				description: 'Get admin settings',
				action: 'Get settings',
				routing: {
					request: {
						method: 'GET',
						url: '/api/admin/v1/settings',
					},
				},
			},
			{
				name: 'Get Setting by Key',
				value: 'getSettingByKey',
				description: 'Get a specific setting by key',
				action: 'Get setting by key',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/admin/v1/settings/" + $parameter.settingKey }}',
					},
				},
			},
			{
				name: 'Update Setting',
				value: 'updateSetting',
				description: 'Update a setting',
				action: 'Update setting',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/admin/v1/settings/" + $parameter.settingKey }}',
						body: {
							value: '={{$parameter.settingValue}}',
						},
					},
				},
			},
			{
				name: 'Update Settings',
				value: 'updateSettings',
				description: 'Update multiple settings',
				action: 'Update settings',
				routing: {
					request: {
						method: 'PUT',
						url: '/api/admin/v1/settings',
						body: '={{JSON.parse($parameter.settingsData)}}',
					},
				},
			},
		],
		default: 'getSettings',
	},
];

export const adminFields: INodeProperties[] = [
	// Audit Logs fields
	{
		displayName: 'Log ID',
		name: 'logId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['admin'],
				subResource: ['auditLogs'],
				operation: ['getAuditLogDetails'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the audit log entry',
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
				resource: ['admin'],
				subResource: ['auditLogs'],
				operation: ['getAuditLogs'],
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
				resource: ['admin'],
				subResource: ['auditLogs'],
				operation: ['getAuditLogs'],
			},
		},
		default: 0,
		description: 'Number of logs to skip',
	},
	{
		displayName: 'Start Date',
		name: 'startDate',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['admin'],
				subResource: ['auditLogs'],
				operation: ['getAuditLogs'],
			},
		},
		default: '',
		description: 'Start date for audit logs (ISO format)',
		placeholder: '2024-01-01T00:00:00Z',
	},
	{
		displayName: 'End Date',
		name: 'endDate',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['admin'],
				subResource: ['auditLogs'],
				operation: ['getAuditLogs'],
			},
		},
		default: '',
		description: 'End date for audit logs (ISO format)',
		placeholder: '2024-12-31T23:59:59Z',
	},
	// Feature Flags fields
	{
		displayName: 'Feature Name',
		name: 'featureName',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['admin'],
				subResource: ['featureFlags'],
				operation: ['getFeatureFlag', 'updateFeatureFlag'],
			},
		},
		default: '',
		required: true,
		description: 'The name of the feature flag',
	},
	{
		displayName: 'Enabled',
		name: 'enabled',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['admin'],
				subResource: ['featureFlags'],
				operation: ['updateFeatureFlag'],
			},
		},
		default: true,
		description: 'Whether the feature flag is enabled',
	},
	// Instance fields
	{
		displayName: 'Settings Data',
		name: 'settingsData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['admin'],
				subResource: ['instance'],
				operation: ['updateInstanceSettings'],
			},
		},
		default: '{}',
		required: true,
		description: 'JSON object containing instance settings',
		placeholder: '{"setting1":"value1","setting2":"value2"}',
	},
	// Security fields
	{
		displayName: 'Policy Data',
		name: 'policyData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['admin'],
				subResource: ['security'],
				operation: ['updatePasswordPolicy'],
			},
		},
		default: '{}',
		required: true,
		description: 'JSON object containing password policy settings',
		placeholder: '{"minLength":8,"requireUppercase":true,"requireNumbers":true}',
	},
	{
		displayName: 'Security Data',
		name: 'securityData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['admin'],
				subResource: ['security'],
				operation: ['updateSecuritySettings'],
			},
		},
		default: '{}',
		required: true,
		description: 'JSON object containing security settings',
		placeholder: '{"twoFactorRequired":true,"sessionTimeout":3600}',
	},
	// Settings fields
	{
		displayName: 'Setting Key',
		name: 'settingKey',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['admin'],
				subResource: ['settings'],
				operation: ['getSettingByKey', 'updateSetting'],
			},
		},
		default: '',
		required: true,
		description: 'The key of the setting',
	},
	{
		displayName: 'Setting Value',
		name: 'settingValue',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['admin'],
				subResource: ['settings'],
				operation: ['updateSetting'],
			},
		},
		default: '',
		required: true,
		description: 'The new value for the setting',
	},
	{
		displayName: 'Settings Data',
		name: 'settingsData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['admin'],
				subResource: ['settings'],
				operation: ['updateSettings'],
			},
		},
		default: '{}',
		required: true,
		description: 'JSON object containing multiple settings',
		placeholder: '{"key1":"value1","key2":"value2"}',
	},
];

