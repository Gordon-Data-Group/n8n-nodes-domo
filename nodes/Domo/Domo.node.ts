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
						name: 'DataFlow',
						value: 'dataflow',
					},
					{
						name: 'Dataset',
						value: 'dataset',
					},
					{
						name: 'Domo Everywhere',
						value: 'domoEverywhere',
					},
					{
						name: 'Elevation',
						value: 'elevation',
					},
					{
						name: 'File',
						value: 'files',
					},
					{
						name: 'FileSet',
						value: 'filesets',
					},
					{
						name: 'Form',
						value: 'forms',
					},
					{
						name: 'Function',
						value: 'functions',
					},
					{
						name: 'Group',
						value: 'group',
					},
					{
						name: 'Left Navigation',
						value: 'leftNavigation',
					},
					{
						name: 'Objective',
						value: 'objectives',
					},
					{
						name: 'Page',
						value: 'page',
					},
					{
						name: 'Project',
						value: 'projects',
					},
					{
						name: 'Report',
						value: 'reports',
					},
					{
						name: 'Role',
						value: 'roles',
					},
					{
						name: 'Sandbox',
						value: 'sandbox',
					},
					{
						name: 'Scheduled Report',
						value: 'scheduledReports',
					},
					{
						name: 'Task Center',
						value: 'taskCenter',
					},
					{
						name: 'Token',
						value: 'token',
					},
					{
						name: 'Toolkit',
						value: 'toolkit',
					},
					{
						name: 'User',
						value: 'user',
					},
					{
						name: 'Workflow',
						value: 'workflows',
					},
				],
				default: 'user',
			},
			...domoOperations,
			...domoFields,
		],
	};
}
