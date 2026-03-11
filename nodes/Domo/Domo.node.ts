import {
	INodeType,
	INodeTypeDescription,
	IExecuteFunctions,
	IHttpRequestOptions,
	ILoadOptionsFunctions,
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
	routing = {
		request: {
			// This ensures all operations without explicit routing still go through preSend
		},
		preSend: [
			async function (
				this: IExecuteFunctions,
				requestOptions: IHttpRequestOptions,
			) {
				try {
					const logData = {
						url: requestOptions.url,
						method: requestOptions.method,
						body: requestOptions.body,
						qs: requestOptions.qs,
					};

					// Multiple logging strategies - all error level to ensure visibility
					console.error('╔════════════════════════════════════════════════════════════════╗');
					console.error('║                     DOMO API REQUEST                          ║');
					console.error('╚════════════════════════════════════════════════════════════════╝');
					console.error('URL:', logData.url);
					console.error('METHOD:', logData.method);
					console.error('BODY:', JSON.stringify(logData.body, null, 2));
					console.error('QS:', JSON.stringify(logData.qs, null, 2));
					console.error('════════════════════════════════════════════════════════════════');

					this.logger.error('DOMO REQUEST URL: ' + logData.url);
					this.logger.error('DOMO REQUEST BODY: ' + JSON.stringify(logData.body, null, 2));
				} catch (error) {
					console.error('ERROR IN PRESEND HOOK:', error);
					this.logger.error('ERROR IN PRESEND HOOK: ' + String(error));
				}

				return requestOptions;
			},
		],
	};
	methods = {
    loadOptions: {
		async getAppDBFilterOptions(this: ILoadOptionsFunctions) {
			const allFilterOptions = [
				{ name: 'App (Datastore) Name', value: 'datastorename' },
				{ name: 'Created Date', value: 'createddate' },
				{ name: 'Datastore ID', value: 'datastoreid' },
				{ name: 'Modified Date', value: 'updatedon' },
				{ name: 'Name', value: 'nameof' },
				{ name: 'Owned By (ID)', value: 'ownedby' },
			];
			return allFilterOptions;

		// Get the current value to ensure it's always available
		const currentValue = this.getCurrentNodeParameter('filterType') as string;

		const filters = (this.getNodeParameter('searchFilters.filters', 0) || []) as any[];
		const selectedFilters = filters
			.map((f: any) => f.filterType)
			.filter((v: string) => !!v && v !== currentValue); // Exclude current value from filtering

		const availableOptions = allFilterOptions.filter(option => !selectedFilters.includes(option.value));

		// Return all options if nothing would be available (to prevent empty dropdown)
		return availableOptions.length > 0 ? availableOptions : allFilterOptions;
		}
			}
		}
};
