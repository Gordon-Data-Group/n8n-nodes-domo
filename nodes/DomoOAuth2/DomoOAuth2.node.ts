import type {
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { domoOAuth2Fields, domoOAuth2Operations } from './DomoOAuth2Description';

export class DomoOAuth2 implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Domo OAuth2',
		name: 'domoOAuth2',
		icon: 'file:domo.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Domo Platform APIs using OAuth2',
		defaults: {
			name: 'Domo OAuth2',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'domoOAuth2Api',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.domo.com',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Account',
						value: 'account',
					},
					{
						name: 'Activity Log',
						value: 'activityLog',
					},
					{
						name: 'Card',
						value: 'cards',
					},
					{
						name: 'Dataset',
						value: 'dataset',
					},
					{
						name: 'Embed Token',
						value: 'embedToken',
					},
					{
						name: 'Group',
						value: 'groups',
					},
					{
						name: 'Page',
						value: 'pages',
					},
					{
						name: 'Project',
						value: 'projectsAndTasks',
					},
					{
						name: 'Simple',
						value: 'simple',
					},
					{
						name: 'Stream',
						value: 'stream',
					},
					{
						name: 'User',
						value: 'users',
					},
				],
				default: 'dataset',
			},
			...domoOAuth2Operations,
			...domoOAuth2Fields,
		],
	};
}

