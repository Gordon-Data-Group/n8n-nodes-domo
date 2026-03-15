import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class DomoOAuth2Api implements ICredentialType {
	name = 'domoOAuth2Api';
	displayName = 'Domo OAuth2 API';
	documentationUrl = 'https://developer.domo.com/portal/1845fc11bbe5d-api-authentication';
	httpRequestNode = {
		name: 'Domo',
		docsUrl: 'https://developer.domo.com/portal/1845fc11bbe5d-api-authentication',
		apiBaseUrl: 'https://api.domo.com/',
	};
	properties: INodeProperties[] = [
		{
			displayName: 'Domain',
			name: 'domain',
			type: 'hidden',
			default: 'https://api.domo.com',
		},
		{
			displayName: 'Client ID',
			name: 'clientId',
			type: 'string',
			default: '',
			required: true,
			description: 'OAuth Client ID from your <a href="https://developer.domo.com/manage-clients" target="_blank">Domo Developer Portal</a>',
		},
		{
			displayName: 'Client Secret',
			name: 'clientSecret',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'OAuth Client Secret from your Domo Developer Portal',
		},
		{
			displayName: 'Scope',
			name: 'scope',
			type: 'string',
			default: 'data user dashboard',
			placeholder: 'data user dashboard',
			description: 'Space-separated list of scopes: account, audit, buzz, dashboard, data, user',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: {
					function: '={{Buffer.from($credentials.clientId + ":" + $credentials.clientSecret).toString("base64")}}',
				},
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.domain}}',
			url: '/oauth/token?grant_type=client_credentials&scope={{encodeURIComponent($credentials.scope)}}',
			method: 'GET',
			headers: {
				Authorization: '=Basic {{Buffer.from($credentials.clientId + ":" + $credentials.clientSecret).toString("base64")}}',
				Accept: 'application/json',
			},
		},
	};
}
