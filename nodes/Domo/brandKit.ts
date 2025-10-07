import { INodeProperties } from 'n8n-workflow';

export const brandKitOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['brandKit'],
			},
		},
		options: [
			{
				name: 'Get Brand Kit',
				value: 'getBrandKit',
				description: 'Get the current brand kit configuration',
				action: 'Get brand kit',
				routing: {
					request: {
						method: 'GET',
						url: '/api/content/v1/brand-kit',
					},
				},
			},
			{
				name: 'Get Colors',
				value: 'getColors',
				description: 'Get brand colors',
				action: 'Get colors',
				routing: {
					request: {
						method: 'GET',
						url: '/api/content/v1/brand-kit/colors',
					},
				},
			},
			{
				name: 'Get Fonts',
				value: 'getFonts',
				description: 'Get brand fonts',
				action: 'Get fonts',
				routing: {
					request: {
						method: 'GET',
						url: '/api/content/v1/brand-kit/fonts',
					},
				},
			},
			{
				name: 'Get Logo',
				value: 'getLogo',
				description: 'Get brand logo',
				action: 'Get logo',
				routing: {
					request: {
						method: 'GET',
						url: '/api/content/v1/brand-kit/logo',
					},
				},
			},
			{
				name: 'Update Brand Kit',
				value: 'updateBrandKit',
				description: 'Update the brand kit configuration',
				action: 'Update brand kit',
				routing: {
					request: {
						method: 'PUT',
						url: '/api/content/v1/brand-kit',
						body: '={{JSON.parse($parameter.brandKitData)}}',
					},
				},
			},
			{
				name: 'Update Colors',
				value: 'updateColors',
				description: 'Update brand colors',
				action: 'Update colors',
				routing: {
					request: {
						method: 'PUT',
						url: '/api/content/v1/brand-kit/colors',
						body: '={{JSON.parse($parameter.colorsData)}}',
					},
				},
			},
			{
				name: 'Update Fonts',
				value: 'updateFonts',
				description: 'Update brand fonts',
				action: 'Update fonts',
				routing: {
					request: {
						method: 'PUT',
						url: '/api/content/v1/brand-kit/fonts',
						body: '={{JSON.parse($parameter.fontsData)}}',
					},
				},
			},
			{
				name: 'Upload Logo',
				value: 'uploadLogo',
				description: 'Upload a brand logo',
				action: 'Upload logo',
				routing: {
					request: {
						method: 'POST',
						url: '/api/content/v1/brand-kit/logo',
						body: '={{JSON.parse($parameter.logoData)}}',
					},
				},
			},
		],
		default: 'getBrandKit',
	},
];

export const brandKitFields: INodeProperties[] = [
	// Update Brand Kit fields
	{
		displayName: 'Brand Kit Data',
		name: 'brandKitData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['brandKit'],
				operation: ['updateBrandKit'],
			},
		},
		default: '{}',
		required: true,
		description: 'JSON object containing brand kit configuration',
		placeholder: '{"name":"My Brand","primaryColor":"#FF0000","secondaryColor":"#00FF00"}',
	},
	// Update Colors fields
	{
		displayName: 'Colors Data',
		name: 'colorsData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['brandKit'],
				operation: ['updateColors'],
			},
		},
		default: '{}',
		required: true,
		description: 'JSON object containing brand colors',
		placeholder: '{"primary":"#FF0000","secondary":"#00FF00","accent":"#0000FF","palette":["#FF0000","#00FF00","#0000FF"]}',
	},
	// Update Fonts fields
	{
		displayName: 'Fonts Data',
		name: 'fontsData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['brandKit'],
				operation: ['updateFonts'],
			},
		},
		default: '{}',
		required: true,
		description: 'JSON object containing brand fonts',
		placeholder: '{"headingFont":"Arial","bodyFont":"Helvetica","monoFont":"Courier"}',
	},
	// Upload Logo fields
	{
		displayName: 'Logo Data',
		name: 'logoData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['brandKit'],
				operation: ['uploadLogo'],
			},
		},
		default: '{}',
		required: true,
		description: 'JSON object containing logo information (base64 encoded image or URL)',
		placeholder: '{"imageData":"data:image/png;base64,iVBORw0KG...","format":"png"}',
	},
];

