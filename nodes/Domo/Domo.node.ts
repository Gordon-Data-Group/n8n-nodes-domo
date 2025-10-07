import {
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { domoFields, domoOperations } from './DomoDescription';

export class Domo implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Domo',
		name: 'domo',
		icon: 'file:domo.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Domo API',
		defaults: {
			name: 'Domo',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'domoTokenApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.domain.replace(new RegExp("/$"), "")}}',
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
						name: 'Achievement',
						value: 'achievement',
					},
					{
						name: 'Admin',
						value: 'admin',
					},
					{
						name: 'AI/Data Science',
						value: 'aiDataScience',
					},
					{
						name: 'Alert',
						value: 'alert',
					},
					{
						name: 'App Studio',
						value: 'appStudio',
					},
					{
						name: 'AppDB',
						value: 'appdb',
					},
					{
						name: 'Approval',
						value: 'approval',
					},
					{
						name: 'Brand Kit',
						value: 'brandKit',
					},
					{
						name: 'Brick',
						value: 'bricks',
					},
					{
						name: 'Card',
						value: 'card',
					},
					{
						name: 'Category',
						value: 'category',
					},
					{
						name: 'Certification',
						value: 'certification',
					},
					{
						name: 'Code Engine',
						value: 'codeEngine',
					},
					{
						name: 'Credit',
						value: 'credit',
					},
					{
						name: 'Dataset',
						value: 'dataset',
					},
					{
						name: 'Group',
						value: 'group',
					},
					{
						name: 'Token',
						value: 'token',
					},
					{
						name: 'User',
						value: 'user',
					},
				],
				default: 'user',
			},
			...domoOperations,
			...domoFields,
		],
	};
}
