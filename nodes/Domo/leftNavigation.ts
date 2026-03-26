import type { INodeProperties, IHttpRequestOptions, IExecuteSingleFunctions } from 'n8n-workflow';
import { preSendLogger } from './shared/preSendLogger';

async function preSendCreatePin(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const label = this.getNodeParameter('label') as string;
	const userId = this.getNodeParameter('userId') as number;
	const icon = this.getNodeParameter('icon') as string;
	const iconColor = this.getNodeParameter('iconColor') as string;
	const iconBackgroundColor = this.getNodeParameter('iconBackgroundColor') as string;
	const actionId = this.getNodeParameter('actionId') as string;
	const actionType = this.getNodeParameter('actionType') as string;
	const actionNewTab = this.getNodeParameter('actionNewTab') as boolean;

	requestOptions.body = {
		label,
		userID: userId,
		...(icon && { icon }),
		...(iconColor && { iconColor }),
		...(iconBackgroundColor && { iconBackgroundColor }),
		action: {
			...(actionId && { ID: actionId }),
			...(actionType && { type: actionType }),
			newTab: actionNewTab,
		},
	};
	return requestOptions;
}

async function preSendUpdatePins(
	this: IExecuteSingleFunctions,
	requestOptions: IHttpRequestOptions,
): Promise<IHttpRequestOptions> {
	const pinData = this.getNodeParameter('pinData') as string;
	requestOptions.body = typeof pinData === 'string' ? JSON.parse(pinData) : pinData;
	return requestOptions;
}

export const leftNavigationOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['leftNavigation'],
			},
		},
		default: 'getPins',
		options: [
			{
				name: 'Create Pin',
				value: 'createPin',
				action: 'Create a pin',
				routing: {
					request: {
						method: 'POST',
						url: '/api/nav/v1/pins/append',
					},
					send: {
						preSend: [preSendCreatePin, preSendLogger],
					},
				},
			},
			{
				name: 'Get Pins',
				value: 'getPins',
				action: 'Get pins',
				routing: {
					request: {
						method: 'GET',
						url: '/api/nav/v1/pins',
					},
					send: {
						preSend: [preSendLogger],
					},
				},
			},
			{
				name: 'Update Pins',
				value: 'updatePins',
				action: 'Update pins',
				description:
					'The order of pins is determined by their position in the array. To add a pin, send the pin data in the array without an ID.',
				routing: {
					request: {
						method: 'POST',
						url: '/api/nav/v1/pins/append',
					},
					send: {
						preSend: [preSendUpdatePins, preSendLogger],
					},
				},
			},
		],
	},
];

export const leftNavigationFields: INodeProperties[] = [
	// ── Create Pin fields ─────────────────────────────────────────────────────
	{
		displayName: 'Label',
		name: 'label',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['leftNavigation'],
				operation: ['createPin'],
			},
		},
		default: '',
		required: true,
		description: 'The display label for the pin',
	},
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['leftNavigation'],
				operation: ['createPin'],
			},
		},
		default: 0,
		required: true,
		description: 'The ID of the user the pin belongs to',
	},
	{
		displayName: 'Icon',
		name: 'icon',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['leftNavigation'],
				operation: ['createPin'],
			},
		},
		default: '',
		placeholder: 'workflow',
		description: 'The icon identifier for the pin',
	},
	{
		displayName: 'Icon Color',
		name: 'iconColor',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['leftNavigation'],
				operation: ['createPin'],
			},
		},
		default: '#FFFFFFB3',
		description: 'The icon color as a hex color string (with optional alpha)',
	},
	{
		displayName: 'Icon Background Color',
		name: 'iconBackgroundColor',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['leftNavigation'],
				operation: ['createPin'],
			},
		},
		default: '#FFFFFF00',
		description: 'The icon background color as a hex color string (with optional alpha)',
	},
	{
		displayName: 'Action ID',
		name: 'actionId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['leftNavigation'],
				operation: ['createPin'],
			},
		},
		default: '',
		placeholder: 'automate_workflow',
		description: 'The identifier of the action to trigger when the pin is clicked',
	},
	{
		displayName: 'Action Type',
		name: 'actionType',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['leftNavigation'],
				operation: ['createPin'],
			},
		},
		default: '',
		placeholder: 'feature',
		description: 'The type of the action (e.g. feature)',
	},
	{
		displayName: 'Open in New Tab',
		name: 'actionNewTab',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['leftNavigation'],
				operation: ['createPin'],
			},
		},
		default: false,
		description: 'Whether the action should open in a new tab',
	},

	// ── Update Pins fields ────────────────────────────────────────────────────
	{
		displayName: 'Pin Data',
		name: 'pinData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['leftNavigation'],
				operation: ['updatePins'],
			},
		},
		default: '',
		placeholder:
			'[{"action":{"ID":"automate_workflow","type":"feature","newTab":false},"icon":"workflow","iconColor":"#FFFFFFB3","iconBackgroundColor":"#FFFFFF00","label":"Label","userID":1234}]',
		required: true,
		description: 'JSON array of pin objects to set',
	},
];
