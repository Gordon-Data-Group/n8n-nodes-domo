import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class DomoTokenApi implements ICredentialType {
	name = 'domoTokenApi';
	displayName = 'Domo Token API';
	documentationUrl = 'https://developer.domo.com/docs/api-docs/users-2';
	properties: INodeProperties[] = [
		{
			displayName: 'API Token',
			name: 'apiToken',
			type: 'string',
			default: '',
			typeOptions: {
				password: true,
			},
			required: true,
		},
		{
			displayName: 'Domain',
			name: 'domain',
			type: 'string',
			default: '',
			placeholder: 'https://mycompany.domo.com',
			required: true,
			description: 'Your Domo domain.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-DOMO-DEVELOPER-TOKEN': '={{$credentials.apiToken}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.domain}}',
			url: '/api/content/v3/users/me',
			method: 'GET',
		},
	};
}
