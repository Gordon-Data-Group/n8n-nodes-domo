import { INodeProperties } from 'n8n-workflow';

export const datasetOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['dataset'],
			},
		},
		options: [
			{
				name: 'Abort Stream',
				value: 'abortStream',
				action: 'Abort stream',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/data/v1/streams/" + $parameter.streamId + "/executions/" + $parameter.executionId }}',
						body: '={{JSON.parse($parameter.abortData)}}',
					},
				},
			},
			{
				name: 'Append to Webhook DataSet',
				value: 'appendWebhook',
				action: 'Append to webhook dataset',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/iot/v1/webhook/data/" + $parameter.datasetId }}',
					},
				},
			},
			{
				name: 'Bulk Add Tags',
				value: 'bulkAddTags',
				action: 'Bulk add tags',
				routing: {
					request: {
						method: 'POST',
						url: '/api/data/v1/ui/bulk/tag',
						body: '={{JSON.parse($parameter.bulkTagData)}}',
					},
				},
			},
			{
				name: 'Bulk Delete Data Versions',
				value: 'bulkDeleteDataVersions',
				action: 'Bulk delete data versions',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/data/v2/datasources/" + $parameter.datasetId + "/dataversions" }}',
						body: '={{JSON.parse($parameter.versionIds)}}',
					},
				},
			},
			{
				name: 'Bulk Delete DataSets',
				value: 'bulkDelete',
				action: 'Bulk delete datasets',
				routing: {
					request: {
						method: 'POST',
						url: '/api/data/v1/ui/bulk/delete',
						body: '={{JSON.parse($parameter.bulkDeleteData)}}',
					},
				},
			},
			{
				name: 'Bulk Update Owners (V1/UI)',
				value: 'bulkUpdateOwnersV1',
				action: 'Bulk update owners v1 ui',
				routing: {
					request: {
						method: 'POST',
						url: '/api/data/v1/ui/bulk/reassign',
						body: '={{JSON.parse($parameter.bulkReassignData)}}',
					},
				},
			},
			{
				name: 'Bulk Update Owners (V2/Datasources)',
				value: 'bulkUpdateOwnersV2',
				action: 'Bulk update owners v2 datasources',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/data/v2/datasources/responsible-user/" + $parameter.userId }}',
						body: '={{JSON.parse($parameter.datasetIds)}}',
					},
				},
			},
			{
				name: 'Commit Upload',
				value: 'commitUpload',
				action: 'Commit upload',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/data/v3/datasources/" + $parameter.datasetId + "/uploads/" + $parameter.uploadId + "/commit" }}',
						body: '={{JSON.parse($parameter.commitData)}}',
					},
				},
			},
			{
				name: 'Create Column PDP Policy',
				value: 'createColumnPdpPolicy',
				action: 'Create column pdp policy',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/query/v2/data-control/" + $parameter.datasetId + "/policy-group" }}',
						body: '={{JSON.parse($parameter.policyData)}}',
					},
				},
			},
			{
				name: 'Create Column PDP Policy Mapping',
				value: 'createColumnPdpPolicyMapping',
				action: 'Create column pdp policy mapping',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/query/v2/data-control/" + $parameter.datasetId + "/column-policy-mapping" }}',
						body: '={{JSON.parse($parameter.mappingData)}}',
					},
				},
			},
			{
				name: 'Create Data Dictionary',
				value: 'createDataDictionary',
				action: 'Create data dictionary',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/ai/readiness/v1/data-dictionary/dataset/" + $parameter.datasetId }}',
						body: '={{JSON.parse($parameter.dictionaryData)}}',
					},
				},
			},
			{
				name: 'Create New Upload',
				value: 'createUpload',
				action: 'Create new upload',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/data/v3/datasources/" + $parameter.datasetId + "/uploads" }}',
						body: '={{JSON.parse($parameter.uploadConfig)}}',
					},
				},
			},
			{
				name: 'Create Row PDP Policy',
				value: 'createRowPdpPolicy',
				action: 'Create row pdp policy',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/query/v1/data-control/" + $parameter.datasetId + "/filter-groups" }}',
						body: '={{JSON.parse($parameter.policyData)}}',
					},
				},
			},
			{
				name: 'Create Stream and DataSet',
				value: 'createStream',
				action: 'Create stream and dataset',
				routing: {
					request: {
						method: 'POST',
						url: '/api/data/v1/streams',
						body: '={{JSON.parse($parameter.streamData)}}',
					},
				},
			},
			{
				name: 'Create View (Views Explorer)',
				value: 'createView',
				action: 'Create view views explorer',
				routing: {
					request: {
						method: 'POST',
						url: '/api/query/v1/views',
						body: '={{JSON.parse($parameter.viewData)}}',
					},
				},
			},
			{
				name: 'Defrost (Unvault) DataSet',
				value: 'defrost',
				action: 'Defrost unvault dataset',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/data/ui/v3/datasources/" + $parameter.datasetId + "/defrost" }}',
					},
				},
			},
			{
				name: 'Delete Check',
				value: 'deleteCheck',
				action: 'Delete check',
				routing: {
					request: {
						method: 'POST',
						url: '/api/data/v1/ui/bulk/delete/check',
						body: '={{JSON.parse($parameter.deleteCheckData)}}',
					},
				},
			},
			{
				name: 'Delete Column PDP Policy',
				value: 'deleteColumnPdpPolicy',
				action: 'Delete column pdp policy',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/query/v2/data-control/" + $parameter.datasetId + "/policy-group/" + $parameter.policyId }}',
					},
				},
			},
			{
				name: 'Delete Column PDP Policy Mapping',
				value: 'deleteColumnPdpPolicyMapping',
				action: 'Delete column pdp policy mapping',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/query/v2/data-control/" + $parameter.datasetId + "/column-policy-mapping/" + $parameter.columnPdpPolicyMappingId }}',
					},
				},
			},
			{
				name: 'Delete DataSet',
				value: 'delete',
				action: 'Delete dataset',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/data/v3/datasources/" + $parameter.datasetId }}',
						qs: {
							deleteMethod: '={{$parameter.deleteMethod}}',
						},
					},
				},
			},
			{
				name: 'Delete Row PDP Policy',
				value: 'deleteRowPdpPolicy',
				action: 'Delete row pdp policy',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/query/v1/data-control/" + $parameter.datasetId + "/filter-groups/" + $parameter.policyId }}',
					},
				},
			},
			{
				name: 'Enable/Disable PDP on DataSet',
				value: 'togglePdp',
				action: 'Enable disable pdp on dataset',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/query/v1/data-control/" + $parameter.datasetId }}',
						body: '={{JSON.parse($parameter.pdpConfig)}}',
					},
				},
			},
			{
				name: 'Get Column PDP Policies',
				value: 'getColumnPdpPolicies',
				action: 'Get column pdp policies',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/query/v2/data-control/" + $parameter.datasetId + "/policy-group" }}',
					},
				},
			},
			{
				name: 'Get Column PDP Policy Mapping',
				value: 'getColumnPdpPolicyMapping',
				action: 'Get column pdp policy mapping',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/query/v2/data-control/" + $parameter.datasetId + "/column-policy-mapping" }}',
					},
				},
			},
			{
				name: 'Get Data Dictionary',
				value: 'getDataDictionary',
				action: 'Get data dictionary',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/ai/readiness/v1/data-dictionary/dataset/" + $parameter.datasetId }}',
					},
				},
			},
			{
				name: 'Get Data Version',
				value: 'getDataVersion',
				action: 'Get data version',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/data/v2/datasources/" + $parameter.datasetId + "/dataversions/" + $parameter.versionId }}',
						qs: {
							excludeAppendedData: '={{$parameter.excludeAppendedData}}',
							rowLimit: '={{$parameter.rowLimit}}',
						},
					},
				},
			},
			{
				name: 'Get DataSet',
				value: 'get',
				action: 'Get dataset',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/data/v3/datasources/" + $parameter.datasetId }}',
						qs: {
							includeAllDetails: '={{$parameter.includeAllDetails}}',
							part: '={{$parameter.part}}',
						},
					},
				},
			},
			{
				name: 'Get DataSet PDP Impacted Resources',
				value: 'getDatasetPdpImpactedResources',
				action: 'Get dataset pdp impacted resources',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/data/v3/datasources/" + $parameter.datasetId + "/impacted-resources" }}',
					},
				},
			},
			{
				name: 'Get DataSet PDP Status',
				value: 'getDatasetPdpStatus',
				action: 'Get dataset pdp status',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/query/v2/data-control/" + $parameter.datasetId }}',
					},
				},
			},
			{
				name: 'Get DataSets',
				value: 'getDatasets',
				action: 'Get datasets',
				routing: {
					request: {
						method: 'POST',
						url: '/api/data/v3/datasources/bulk',
						qs: {
							includePrivate: '={{$parameter.includePrivate}}',
							includeAllDetails: '={{$parameter.includeAllDetails}}',
						},
						body: '={{JSON.parse($parameter.datasetIds)}}',
					},
				},
			},
			{
				name: 'Get DataSets Owned by User/Group',
				value: 'getDatasetsOwnedBy',
				action: 'Get datasets owned by user group',
				routing: {
					request: {
						method: 'POST',
						url: '/api/data/ui/v3/datasources/ownedBy',
						body: '={{JSON.parse($parameter.ownerData)}}',
					},
				},
			},
			{
				name: 'Get Impact Counts',
				value: 'getImpactCounts',
				action: 'Get impact counts',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/data/v1/impacts/DATA_SOURCE/" + $parameter.datasetId }}',
					},
				},
			},
			{
				name: 'Get Lineage',
				value: 'getLineage',
				action: 'Get lineage',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/data/v1/lineage/DATA_SOURCE/" + $parameter.datasetId }}',
						qs: {
							traverseUp: '={{$parameter.traverseUp}}',
							traverseDown: '={{$parameter.traverseDown}}',
							requestEntities: '={{$parameter.requestEntities}}',
							maxDepth: '={{$parameter.maxDepth}}',
						},
					},
				},
			},
			{
				name: 'Get Row PDP Policies',
				value: 'getRowPdpPolicies',
				action: 'Get row pdp policies',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/query/v1/data-control/" + $parameter.datasetId + "/filter-groups" }}',
						qs: {
							options: '={{$parameter.options}}',
						},
					},
				},
			},
			{
				name: 'Get Saved Datacenter Filters',
				value: 'getSavedFilters',
				action: 'Get saved datacenter filters',
				routing: {
					request: {
						method: 'GET',
						url: '/api/search/v1/saved',
						qs: {
							queryProfile: '={{$parameter.queryProfile}}',
						},
					},
				},
			},
			{
				name: 'Get Schema',
				value: 'getSchema',
				action: 'Get schema',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/query/v1/datasources/" + $parameter.datasetId + "/schema/indexed" }}',
						qs: {
							includeHidden: '={{$parameter.includeHidden}}',
						},
					},
				},
			},
			{
				name: 'Get Stream',
				value: 'getStream',
				action: 'Get stream',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/data/v1/streams/" + $parameter.streamId }}',
						qs: {
							fields: '={{$parameter.fields}}',
						},
					},
				},
			},
			{
				name: 'Get Stream Execution',
				value: 'getStreamExecution',
				action: 'Get stream execution',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/data/v1/streams/" + $parameter.streamId + "/executions/" + $parameter.executionId }}',
					},
				},
			},
			{
				name: 'Get Stream Executions',
				value: 'getStreamExecutions',
				action: 'Get stream executions',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/data/v1/streams/" + $parameter.streamId + "/executions" }}',
					},
				},
			},
			{
				name: 'Get Webform Data',
				value: 'getWebformData',
				action: 'Get webform data',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/data/v2/webforms/" + $parameter.datasetId + "/grid" }}',
					},
				},
			},
			{
				name: 'Get Wrangle (Column Tags, Descriptions, and Order)',
				value: 'getWrangle',
				action: 'Get wrangle column tags descriptions and order',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/query/v1/datasources/" + $parameter.datasetId + "/wrangle" }}',
					},
				},
			},
			{
				name: 'Insert Data Version',
				value: 'insertDataVersion',
				action: 'Insert data version',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/data/v3/datasources/" + $parameter.datasetId + "/dataversions" }}',
						qs: {
							repairDataVersionId: '={{$parameter.repairDataVersionId}}',
							repairAction: '={{$parameter.repairAction}}',
						},
					},
				},
			},
			{
				name: 'List Data Versions (V2)',
				value: 'listDataVersionsV2',
				action: 'List data versions v2',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/data/v2/datasources/" + $parameter.datasetId + "/dataversions" }}',
					},
				},
			},
			{
				name: 'List Data Versions (V3)',
				value: 'listDataVersionsV3',
				action: 'List data versions v3',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/data/v3/datasources/" + $parameter.datasetId + "/dataversions/details" }}',
					},
				},
			},
			{
				name: 'List DataSets',
				value: 'list',
				action: 'List datasets',
				routing: {
					request: {
						method: 'GET',
						url: '/api/data/v3/datasources',
						qs: {
							limit: '={{$parameter.limit}}',
							offset: '={{$parameter.offset}}',
							part: '={{$parameter.part}}',
							includeHidden: '={{$parameter.includeHidden}}',
							orderBy: '={{$parameter.orderBy}}',
							ownerId: '={{$parameter.ownerId}}',
							displayType: '={{$parameter.displayType}}',
							type: '={{$parameter.type}}',
							dataProviderType: '={{$parameter.dataProviderType}}',
							nameLike: '={{$parameter.nameLike}}',
							createdSince: '={{$parameter.createdSince}}',
						},
					},
				},
			},
			{
				name: 'List Tags',
				value: 'listTags',
				action: 'List tags',
				routing: {
					request: {
						method: 'GET',
						url: '/api/data/ui/v3/datasources/search/tags/all',
					},
				},
			},
			{
				name: 'Query DataSet',
				value: 'queryDataset',
				action: 'Query dataset',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/query/v1/execute/" + $parameter.datasetId }}',
						body: '={{JSON.parse($parameter.queryData)}}',
					},
				},
			},
			{
				name: 'Query DataSet with SQL',
				value: 'queryDatasetSql',
				action: 'Query dataset with sql',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/query/v1/execute/" + $parameter.datasetId }}',
						body: '={{JSON.parse($parameter.sqlQuery)}}',
					},
				},
			},
			{
				name: 'Query Preview (Views Explorer)',
				value: 'queryPreview',
				action: 'Query preview views explorer',
				routing: {
					request: {
						method: 'POST',
						url: '/api/query/v1/views/query-preview',
						body: '={{JSON.parse($parameter.previewQuery)}}',
					},
				},
			},
			{
				name: 'Run Stream/DataSet',
				value: 'runStream',
				action: 'Run stream dataset',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/data/v1/streams/" + $parameter.streamId + "/executions" }}',
						body: '={{$parameter.executionBody || ""}}',
					},
				},
			},
			{
				name: 'Search DataSets',
				value: 'search',
				action: 'Search datasets',
				routing: {
					request: {
						method: 'POST',
						url: '/api/data/ui/v3/datasources/search',
						body: '={{JSON.parse($parameter.searchQuery)}}',
					},
				},
			},
			{
				name: 'Share DataSet',
				value: 'share',
				action: 'Share dataset',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/data/v3/datasources/" + $parameter.datasetId + "/share" }}',
						body: '={{JSON.parse($parameter.shareData)}}',
					},
				},
			},
			{
				name: 'Sync Cloud Amplifier DataSet',
				value: 'syncCloudAmplifier',
				action: 'Sync cloud amplifier dataset',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/query/v1/byos/accounts/" + $parameter.cloudId + "/polling/refresh" }}',
					},
				},
			},
			{
				name: 'Update Column PDP Policy',
				value: 'updateColumnPdpPolicy',
				action: 'Update column pdp policy',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/query/v2/data-control/" + $parameter.datasetId + "/policy-group/" + $parameter.policyId }}',
						body: '={{JSON.parse($parameter.policyData)}}',
					},
				},
			},
			{
				name: 'Update Column PDP Policy Mapping',
				value: 'updateColumnPdpPolicyMapping',
				action: 'Update column pdp policy mapping',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/query/v2/data-control/" + $parameter.datasetId + "/column-policy-mapping/" + $parameter.columnPdpPolicyMappingId }}',
						body: '={{JSON.parse($parameter.mappingData)}}',
					},
				},
			},
			{
				name: 'Update Data Dictionary',
				value: 'updateDataDictionary',
				action: 'Update data dictionary',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/ai/readiness/v1/data-dictionary/dataset/" + $parameter.datasetId }}',
						body: '={{JSON.parse($parameter.dictionaryData)}}',
					},
				},
			},
			{
				name: 'Update Name and Description',
				value: 'updateNameDescription',
				action: 'Update name and description',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/data/v3/datasources/" + $parameter.datasetId + "/properties" }}',
						body: '={{JSON.parse($parameter.propertiesData)}}',
					},
				},
			},
			{
				name: 'Update Owner',
				value: 'updateOwner',
				action: 'Update owner',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/data/v2/datasources/" + $parameter.datasetId + "/responsibleUsers" }}',
						body: '={{JSON.parse($parameter.ownerData)}}',
					},
				},
			},
			{
				name: 'Update Row PDP Policy',
				value: 'updateRowPdpPolicy',
				action: 'Update row pdp policy',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/query/v1/data-control/" + $parameter.datasetId + "/filter-groups/" + $parameter.policyId }}',
						body: '={{JSON.parse($parameter.policyData)}}',
					},
				},
			},
			{
				name: 'Update Stream',
				value: 'updateStream',
				action: 'Update stream',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/data/v1/streams/" + $parameter.streamId }}',
						body: '={{JSON.parse($parameter.streamData)}}',
					},
				},
			},
			{
				name: 'Update Tags',
				value: 'updateTags',
				action: 'Update tags',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/data/ui/v3/datasources/" + $parameter.datasetId + "/tags" }}',
						body: '={{JSON.parse($parameter.tags)}}',
					},
				},
			},
			{
				name: 'Update Webform Data',
				value: 'updateWebformData',
				action: 'Update webform data',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/data/v2/webforms/" + $parameter.streamId }}',
						body: '={{JSON.parse($parameter.webformData)}}',
					},
				},
			},
			{
				name: 'Upload Data',
				value: 'uploadData',
				action: 'Upload data',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/data/v3/datasources/" + $parameter.datasetId + "/uploads/" + $parameter.uploadId + "/parts/" + $parameter.partNumber }}',
						body: '={{$parameter.csvData}}',
					},
				},
			},
			{
				name: 'Wrangle (Update Column Tags, Descriptions, and Order)',
				value: 'wrangle',
				action: 'Wrangle update column tags descriptions and order',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/query/v1/datasources/" + $parameter.datasetId + "/wrangle" }}',
						body: '={{JSON.parse($parameter.wrangleData)}}',
					},
				},
			},
		],
		default: 'list',
	},
];

export const datasetFields: INodeProperties[] = [
	// Dataset ID field
	{
		displayName: 'Dataset ID',
		name: 'datasetId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: [
					'get',
					'delete',
					'getSchema',
					'getLineage',
					'getImpactCounts',
					'getDataDictionary',
					'createDataDictionary',
					'updateDataDictionary',
					'listDataVersionsV2',
					'listDataVersionsV3',
					'getDataVersion',
					'insertDataVersion',
					'bulkDeleteDataVersions',
					'getColumnPdpPolicies',
					'getColumnPdpPolicyMapping',
					'createColumnPdpPolicy',
					'createColumnPdpPolicyMapping',
					'updateColumnPdpPolicy',
					'updateColumnPdpPolicyMapping',
					'deleteColumnPdpPolicy',
					'deleteColumnPdpPolicyMapping',
					'getRowPdpPolicies',
					'createRowPdpPolicy',
					'updateRowPdpPolicy',
					'deleteRowPdpPolicy',
					'getDatasetPdpStatus',
					'getDatasetPdpImpactedResources',
					'togglePdp',
					'createUpload',
					'uploadData',
					'commitUpload',
					'getWebformData',
					'queryDataset',
					'queryDatasetSql',
					'defrost',
					'share',
					'appendWebhook',
					'wrangle',
					'getWrangle',
					'updateNameDescription',
					'updateOwner',
					'updateTags',
				],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the dataset',
	},
	// Stream ID field
	{
		displayName: 'Stream ID',
		name: 'streamId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: [
					'getStream',
					'getStreamExecutions',
					'getStreamExecution',
					'runStream',
					'updateStream',
					'updateWebformData',
					'abortStream',
				],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the stream',
	},
	// Execution ID field
	{
		displayName: 'Execution ID',
		name: 'executionId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['getStreamExecution', 'abortStream'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the execution',
	},
	// Version ID field
	{
		displayName: 'Version ID',
		name: 'versionId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['getDataVersion'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the data version',
	},
	// Policy ID field
	{
		displayName: 'Policy ID',
		name: 'policyId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: [
					'updateColumnPdpPolicy',
					'deleteColumnPdpPolicy',
					'updateRowPdpPolicy',
					'deleteRowPdpPolicy',
				],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the PDP policy',
	},
	// Column PDP Policy Mapping ID field
	{
		displayName: 'Column PDP Policy Mapping ID',
		name: 'columnPdpPolicyMappingId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['updateColumnPdpPolicyMapping', 'deleteColumnPdpPolicyMapping'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the column PDP policy mapping',
	},
	// Upload ID field
	{
		displayName: 'Upload ID',
		name: 'uploadId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['uploadData', 'commitUpload'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the upload',
	},
	// Part Number field
	{
		displayName: 'Part Number',
		name: 'partNumber',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['uploadData'],
			},
		},
		default: 1,
		required: true,
		description: 'The part number for the upload',
	},
	// User ID field
	{
		displayName: 'User ID',
		name: 'userId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['bulkUpdateOwnersV2'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the user',
	},
	// Cloud ID field
	{
		displayName: 'Cloud ID',
		name: 'cloudId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['syncCloudAmplifier'],
			},
		},
		default: '',
		required: true,
		description: 'The cloud ID for amplifier',
	},
	// List datasets fields
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['list'],
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
				resource: ['dataset'],
				operation: ['list'],
			},
		},
		default: 0,
		description: 'Number of items to skip',
	},
	{
		displayName: 'Part',
		name: 'part',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['list', 'get'],
			},
		},
		default: '',
		description: 'Part parameter to include specific sections',
	},
	{
		displayName: 'Include Hidden',
		name: 'includeHidden',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['list', 'getSchema'],
			},
		},
		default: false,
		description: 'Whether to include hidden datasets',
	},
	{
		displayName: 'Order By',
		name: 'orderBy',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['list'],
			},
		},
		default: '',
		description: 'Field to order results by',
	},
	{
		displayName: 'Owner ID',
		name: 'ownerId',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['list'],
			},
		},
		default: '',
		description: 'Filter by owner ID',
	},
	{
		displayName: 'Display Type',
		name: 'displayType',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['list'],
			},
		},
		default: '',
		description: 'Filter by display type',
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['list'],
			},
		},
		default: '',
		description: 'Filter by type',
	},
	{
		displayName: 'Data Provider Type',
		name: 'dataProviderType',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['list'],
			},
		},
		default: '',
		description: 'Filter by data provider type',
	},
	{
		displayName: 'Name Like',
		name: 'nameLike',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['list'],
			},
		},
		default: '',
		description: 'Filter by name pattern',
	},
	{
		displayName: 'Created Since',
		name: 'createdSince',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['list'],
			},
		},
		default: '',
		description: 'Filter by creation date',
	},
	{
		displayName: 'Include All Details',
		name: 'includeAllDetails',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['get', 'getDatasets'],
			},
		},
		default: false,
		description: 'Whether to include all details',
	},
	{
		displayName: 'Include Private',
		name: 'includePrivate',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['getDatasets'],
			},
		},
		default: false,
		description: 'Whether to include private datasets',
	},
	// Lineage fields
	{
		displayName: 'Traverse Up',
		name: 'traverseUp',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['getLineage'],
			},
		},
		default: false,
		description: 'Whether to traverse up the lineage',
	},
	{
		displayName: 'Traverse Down',
		name: 'traverseDown',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['getLineage'],
			},
		},
		default: true,
		description: 'Whether to traverse down the lineage',
	},
	{
		displayName: 'Request Entities',
		name: 'requestEntities',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['getLineage'],
			},
		},
		default: 'CARD,ALERT,DATA_SOURCE,DATAFLOW',
		description: 'Comma-separated list of entity types to include',
	},
	{
		displayName: 'Max Depth',
		name: 'maxDepth',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['getLineage'],
			},
		},
		default: 100,
		description: 'Maximum depth of lineage traversal',
	},
	// Delete fields
	{
		displayName: 'Delete Method',
		name: 'deleteMethod',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['delete'],
			},
		},
		options: [
			{
				name: 'Soft',
				value: 'soft',
			},
			{
				name: 'Hard',
				value: 'hard',
			},
		],
		default: 'soft',
		description: 'Method for deleting the dataset',
	},
	// Data Version fields
	{
		displayName: 'Exclude Appended Data',
		name: 'excludeAppendedData',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['getDataVersion'],
			},
		},
		default: false,
		description: 'Whether to exclude appended data',
	},
	{
		displayName: 'Row Limit',
		name: 'rowLimit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['getDataVersion'],
			},
		},
		default: '',
		description: 'Limit number of rows returned',
	},
	{
		displayName: 'Repair Data Version ID',
		name: 'repairDataVersionId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['insertDataVersion'],
			},
		},
		default: '',
		description: 'The data version ID to repair',
	},
	{
		displayName: 'Repair Action',
		name: 'repairAction',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['insertDataVersion'],
			},
		},
		default: '',
	},
	// Other query params
	{
		displayName: 'Options',
		name: 'options',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['getRowPdpPolicies'],
			},
		},
		default: '',
		description: 'Options parameter for row PDP policies',
	},
	{
		displayName: 'Query Profile',
		name: 'queryProfile',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['getSavedFilters'],
			},
		},
		default: '',
		description: 'Query profile parameter',
	},
	{
		displayName: 'Fields',
		name: 'fields',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['getStream'],
			},
		},
		default: '',
		description: 'Fields to include in stream response',
	},
	// JSON body fields
	{
		displayName: 'Dictionary Data',
		name: 'dictionaryData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['createDataDictionary', 'updateDataDictionary'],
			},
		},
		default: '',
		placeholder: '{"name":"Dataset","description":"Description","columns":[]}',
		required: true,
		description: 'JSON object containing data dictionary configuration',
	},
	{
		displayName: 'Version IDs',
		name: 'versionIds',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['bulkDeleteDataVersions'],
			},
		},
		default: '',
		placeholder: '[1,2,3,4]',
		required: true,
		description: 'JSON array of version IDs to delete',
	},
	{
		displayName: 'Policy Data',
		name: 'policyData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: [
					'createColumnPdpPolicy',
					'updateColumnPdpPolicy',
					'createRowPdpPolicy',
					'updateRowPdpPolicy',
				],
			},
		},
		default: '',
		placeholder: '{"name":"Policy Name","type":"user","columnPolicies":[]}',
		required: true,
		description: 'JSON object containing PDP policy configuration',
	},
	{
		displayName: 'Mapping Data',
		name: 'mappingData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['createColumnPdpPolicyMapping', 'updateColumnPdpPolicyMapping'],
			},
		},
		default: '',
		placeholder: '{"filterGroupId":12345,"dataSourceId":"00000000-0000-0000-0000-000000000000","columnName":"Column1"}',
		required: true,
		description: 'JSON object containing policy mapping configuration',
	},
	{
		displayName: 'PDP Config',
		name: 'pdpConfig',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['togglePdp'],
			},
		},
		default: '',
		placeholder: '{"enabled":true,"secured":false,"external":false,"enabledColumn":true}',
		required: true,
		description: 'JSON object containing PDP configuration',
	},
	{
		displayName: 'Upload Config',
		name: 'uploadConfig',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['createUpload'],
			},
		},
		default: '',
		placeholder: '{"action":"APPEND","message":"Uploading","appendId":"latest"}',
		required: true,
		description: 'JSON object containing upload configuration',
	},
	{
		displayName: 'CSV Data',
		name: 'csvData',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['uploadData'],
			},
		},
		default: '',
		placeholder: 'text,formatted,as,csv',
		required: true,
		description: 'CSV data to upload',
	},
	{
		displayName: 'Commit Data',
		name: 'commitData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['commitUpload'],
			},
		},
		default: '',
		placeholder: '{"index":true,"appendId":"latest","message":"Upload complete"}',
		required: true,
		description: 'JSON object containing commit configuration',
	},
	{
		displayName: 'Webform Data',
		name: 'webformData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['updateWebformData'],
			},
		},
		default: '',
		placeholder: '{"rows":[],"columns":[],"name":"Dataset Name"}',
		required: true,
		description: 'JSON object containing webform data',
	},
	{
		displayName: 'Search Query',
		name: 'searchQuery',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['search'],
			},
		},
		default: '',
		placeholder: '{"entities":["DATASET"],"query":"*","count":100,"offset":0}',
		required: true,
		description: 'JSON search query object',
	},
	{
		displayName: 'Dataset IDs',
		name: 'datasetIds',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['getDatasets', 'bulkUpdateOwnersV2'],
			},
		},
		default: '',
		placeholder: '["00000000-0000-0000-0000-000000000000"]',
		required: true,
		description: 'JSON array of dataset IDs',
	},
	{
		displayName: 'Owner Data',
		name: 'ownerData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['getDatasetsOwnedBy', 'updateOwner'],
			},
		},
		default: '',
		placeholder: '[{"ID":1234,"type":"USER"}]',
		required: true,
		description: 'JSON object or array containing owner information',
	},
	{
		displayName: 'Query Data',
		name: 'queryData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['queryDataset'],
			},
		},
		default: '',
		placeholder: '{"querySource":"data_table","useCache":true,"query":{"columns":[]}}',
		required: true,
		description: 'JSON query object',
	},
	{
		displayName: 'SQL Query',
		name: 'sqlQuery',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['queryDatasetSql'],
			},
		},
		default: '',
		placeholder: '{"sql":"SELECT * FROM table WHERE column = \'value\'"}',
		required: true,
		description: 'JSON object containing SQL query',
	},
	{
		displayName: 'Preview Query',
		name: 'previewQuery',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['queryPreview'],
			},
		},
		default: '',
		placeholder: '{"querySource":"judoTable","schema":{},"query":{}}',
		required: true,
		description: 'JSON object for views explorer preview query',
	},
	{
		displayName: 'Stream Data',
		name: 'streamData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['createStream', 'updateStream'],
			},
		},
		default: '',
		placeholder: '{"updateMethod":"REPLACE","transport":{},"dataSource":{"name":"Stream Name"}}',
		required: true,
		description: 'JSON object containing stream configuration',
	},
	{
		displayName: 'View Data',
		name: 'viewData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['createView'],
			},
		},
		default: '',
		placeholder: '{"dataSourceName":"View Name","schema":{"tables":[]}}',
		required: true,
		description: 'JSON object containing view configuration',
	},
	{
		displayName: 'Bulk Tag Data',
		name: 'bulkTagData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['bulkAddTags'],
			},
		},
		default: '',
		placeholder: '{"bulkItems":{"IDs":["00000000-0000-0000-0000-000000000000"],"type":"DATA_SOURCE"},"tags":["Tag1"]}',
		required: true,
		description: 'JSON object containing bulk tag data',
	},
	{
		displayName: 'Execution Body',
		name: 'executionBody',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['runStream'],
			},
		},
		default: '',
		description: 'Optional body for stream execution',
	},
	{
		displayName: 'Share Data',
		name: 'shareData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['share'],
			},
		},
		default: '',
		placeholder: '{"permissions":[{"type":"GROUP","ID":"1234","accessLevel":"CAN_SHARE"}],"sendEmail":false}',
		required: true,
		description: 'JSON object containing share permissions',
	},
	{
		displayName: 'Wrangle Data',
		name: 'wrangleData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['wrangle'],
			},
		},
		default: '',
		placeholder: '{"columns":[{"name":"Column1","type":"STRING","visible":true,"order":0}]}',
		required: true,
		description: 'JSON object containing column wrangle configuration',
	},
	{
		displayName: 'Properties Data',
		name: 'propertiesData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['updateNameDescription'],
			},
		},
		default: '',
		placeholder: '{"dataSourceName":"New Name","dataSourceDescription":"New Description"}',
		required: true,
		description: 'JSON object containing name and description',
	},
	{
		displayName: 'Bulk Reassign Data',
		name: 'bulkReassignData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['bulkUpdateOwnersV1'],
			},
		},
		default: '',
		placeholder: '{"type":"DATA_SOURCE","IDs":["00000000-0000-0000-0000-000000000000"],"groupID":1234}',
		required: true,
		description: 'JSON object containing bulk reassignment data',
	},
	{
		displayName: 'Bulk Delete Data',
		name: 'bulkDeleteData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['bulkDelete'],
			},
		},
		default: '',
		placeholder: '{"type":"DATA_SOURCE","IDs":["00000000-0000-0000-0000-000000000000"]}',
		required: true,
		description: 'JSON object containing bulk delete data',
	},
	{
		displayName: 'Tags',
		name: 'tags',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['updateTags'],
			},
		},
		default: '',
		placeholder: '["Tag1","Tag2"]',
		required: true,
		description: 'JSON array of tags',
	},
	{
		displayName: 'Delete Check Data',
		name: 'deleteCheckData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['deleteCheck'],
			},
		},
		default: '',
		placeholder: '{"type":"DATA_SOURCE","IDs":["00000000-0000-0000-0000-000000000000"]}',
		required: true,
		description: 'JSON object containing delete check data',
	},
	{
		displayName: 'Abort Data',
		name: 'abortData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['dataset'],
				operation: ['abortStream'],
			},
		},
		default: '',
		placeholder: '{"category":"CONNECTOR","message":"Abort reason"}',
		required: true,
		description: 'JSON object containing abort information',
	},
];
