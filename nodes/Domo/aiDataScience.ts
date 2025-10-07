import { INodeProperties } from 'n8n-workflow';

export const aiDataScienceOperations: INodeProperties[] = [
	{
		displayName: 'Sub-Resource',
		name: 'subResource',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['aiDataScience'],
			},
		},
		options: [
			{
				name: 'Jupyter Workspaces',
				value: 'jupyterWorkspaces',
			},
			{
				name: 'Models',
				value: 'models',
			},
			{
				name: 'Predictions',
				value: 'predictions',
			},
		],
		default: 'models',
		description: 'The AI/Data Science sub-resource to interact with',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['aiDataScience'],
				subResource: ['jupyterWorkspaces'],
			},
		},
		options: [
			{
				name: 'Create Workspace',
				value: 'createWorkspace',
				description: 'Create a new Jupyter workspace',
				action: 'Create jupyter workspace',
				routing: {
					request: {
						method: 'POST',
						url: '/api/data-science/v1/jupyter/workspaces',
						body: '={{JSON.parse($parameter.workspaceData)}}',
					},
				},
			},
			{
				name: 'Delete Workspace',
				value: 'deleteWorkspace',
				description: 'Delete a Jupyter workspace',
				action: 'Delete jupyter workspace',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/data-science/v1/jupyter/workspaces/" + $parameter.workspaceId }}',
					},
				},
			},
			{
				name: 'Get Workspace',
				value: 'getWorkspace',
				description: 'Get details of a Jupyter workspace',
				action: 'Get jupyter workspace',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/data-science/v1/jupyter/workspaces/" + $parameter.workspaceId }}',
					},
				},
			},
			{
				name: 'List Workspaces',
				value: 'listWorkspaces',
				description: 'List all Jupyter workspaces',
				action: 'List jupyter workspaces',
				routing: {
					request: {
						method: 'GET',
						url: '/api/data-science/v1/jupyter/workspaces',
						qs: {
							limit: '={{Math.min($parameter.limit || 50, 500)}}',
							offset: '={{$parameter.offset || 0}}',
						},
					},
				},
			},
			{
				name: 'Start Workspace',
				value: 'startWorkspace',
				description: 'Start a Jupyter workspace',
				action: 'Start jupyter workspace',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/data-science/v1/jupyter/workspaces/" + $parameter.workspaceId + "/start" }}',
					},
				},
			},
			{
				name: 'Stop Workspace',
				value: 'stopWorkspace',
				description: 'Stop a Jupyter workspace',
				action: 'Stop jupyter workspace',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/data-science/v1/jupyter/workspaces/" + $parameter.workspaceId + "/stop" }}',
					},
				},
			},
			{
				name: 'Update Workspace',
				value: 'updateWorkspace',
				description: 'Update a Jupyter workspace',
				action: 'Update jupyter workspace',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/data-science/v1/jupyter/workspaces/" + $parameter.workspaceId }}',
						body: '={{JSON.parse($parameter.workspaceData)}}',
					},
				},
			},
		],
		default: 'listWorkspaces',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['aiDataScience'],
				subResource: ['models'],
			},
		},
		options: [
			{
				name: 'Add Model to Dataset',
				value: 'addModelToDataset',
				description: 'Add a model to a dataset',
				action: 'Add model to dataset',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/data-science/v1/datasets/" + $parameter.datasetId + "/models" }}',
						body: '={{JSON.parse($parameter.modelData)}}',
					},
				},
			},
			{
				name: 'Delete Model',
				value: 'deleteModel',
				description: 'Delete a model from a dataset',
				action: 'Delete model',
				routing: {
					request: {
						method: 'DELETE',
						url: '={{ "/api/data-science/v1/datasets/" + $parameter.datasetId + "/models/" + $parameter.modelId }}',
					},
				},
			},
			{
				name: 'Get Model',
				value: 'getModel',
				description: 'Get details of a specific model',
				action: 'Get model',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/data-science/v1/datasets/" + $parameter.datasetId + "/models/" + $parameter.modelId }}',
					},
				},
			},
			{
				name: 'List Models on Dataset',
				value: 'listModelsOnDataset',
				description: 'List all models on a dataset',
				action: 'List models on dataset',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/data-science/v1/datasets/" + $parameter.datasetId + "/models" }}',
						qs: {
							limit: '={{Math.min($parameter.limit || 50, 500)}}',
							offset: '={{$parameter.offset || 0}}',
						},
					},
				},
			},
			{
				name: 'Train Model',
				value: 'trainModel',
				description: 'Train a model',
				action: 'Train model',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/data-science/v1/datasets/" + $parameter.datasetId + "/models/" + $parameter.modelId + "/train" }}',
						body: '={{JSON.parse($parameter.trainingData)}}',
					},
				},
			},
			{
				name: 'Update Model',
				value: 'updateModel',
				description: 'Update a model',
				action: 'Update model',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/data-science/v1/datasets/" + $parameter.datasetId + "/models/" + $parameter.modelId }}',
						body: '={{JSON.parse($parameter.modelData)}}',
					},
				},
			},
		],
		default: 'listModelsOnDataset',
	},
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['aiDataScience'],
				subResource: ['predictions'],
			},
		},
		options: [
			{
				name: 'Create Prediction',
				value: 'createPrediction',
				description: 'Create a new prediction using a model',
				action: 'Create prediction',
				routing: {
					request: {
						method: 'POST',
						url: '={{ "/api/data-science/v1/datasets/" + $parameter.datasetId + "/models/" + $parameter.modelId + "/predictions" }}',
						body: '={{JSON.parse($parameter.predictionData)}}',
					},
				},
			},
			{
				name: 'Get Prediction',
				value: 'getPrediction',
				description: 'Get details of a prediction',
				action: 'Get prediction',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/data-science/v1/datasets/" + $parameter.datasetId + "/models/" + $parameter.modelId + "/predictions/" + $parameter.predictionId }}',
					},
				},
			},
			{
				name: 'List Predictions',
				value: 'listPredictions',
				description: 'List all predictions for a model',
				action: 'List predictions',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/data-science/v1/datasets/" + $parameter.datasetId + "/models/" + $parameter.modelId + "/predictions" }}',
						qs: {
							limit: '={{Math.min($parameter.limit || 50, 500)}}',
							offset: '={{$parameter.offset || 0}}',
						},
					},
				},
			},
		],
		default: 'listPredictions',
	},
];

export const aiDataScienceFields: INodeProperties[] = [
	// Jupyter Workspaces fields
	{
		displayName: 'Workspace ID',
		name: 'workspaceId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['aiDataScience'],
				subResource: ['jupyterWorkspaces'],
				operation: ['getWorkspace', 'updateWorkspace', 'deleteWorkspace', 'startWorkspace', 'stopWorkspace'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the Jupyter workspace',
	},
	{
		displayName: 'Workspace Data',
		name: 'workspaceData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['aiDataScience'],
				subResource: ['jupyterWorkspaces'],
				operation: ['createWorkspace', 'updateWorkspace'],
			},
		},
		default: '{}',
		required: true,
		description: 'JSON object containing workspace configuration',
		placeholder: '{"name":"My Workspace","description":"Description","environment":"python3"}',
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
				resource: ['aiDataScience'],
				subResource: ['jupyterWorkspaces'],
				operation: ['listWorkspaces'],
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
				resource: ['aiDataScience'],
				subResource: ['jupyterWorkspaces'],
				operation: ['listWorkspaces'],
			},
		},
		default: 0,
		description: 'Number of workspaces to skip',
	},
	// Models fields
	{
		displayName: 'Dataset ID',
		name: 'datasetId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['aiDataScience'],
				subResource: ['models', 'predictions'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the dataset',
	},
	{
		displayName: 'Model ID',
		name: 'modelId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['aiDataScience'],
				subResource: ['models'],
				operation: ['getModel', 'updateModel', 'deleteModel', 'trainModel'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the model',
	},
	{
		displayName: 'Model Data',
		name: 'modelData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['aiDataScience'],
				subResource: ['models'],
				operation: ['addModelToDataset', 'updateModel'],
			},
		},
		default: '{}',
		required: true,
		description: 'JSON object containing model configuration',
		placeholder: '{"name":"My Model","type":"classification","algorithm":"random_forest"}',
	},
	{
		displayName: 'Training Data',
		name: 'trainingData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['aiDataScience'],
				subResource: ['models'],
				operation: ['trainModel'],
			},
		},
		default: '{}',
		required: true,
		description: 'JSON object containing training parameters',
		placeholder: '{"targetColumn":"target","features":["feature1","feature2"]}',
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
				resource: ['aiDataScience'],
				subResource: ['models'],
				operation: ['listModelsOnDataset'],
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
				resource: ['aiDataScience'],
				subResource: ['models'],
				operation: ['listModelsOnDataset'],
			},
		},
		default: 0,
		description: 'Number of models to skip',
	},
	// Predictions fields
	{
		displayName: 'Model ID',
		name: 'modelId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['aiDataScience'],
				subResource: ['predictions'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the model',
	},
	{
		displayName: 'Prediction ID',
		name: 'predictionId',
		type: 'string',
		displayOptions: {
			show: {
				resource: ['aiDataScience'],
				subResource: ['predictions'],
				operation: ['getPrediction'],
			},
		},
		default: '',
		required: true,
		description: 'The ID of the prediction',
	},
	{
		displayName: 'Prediction Data',
		name: 'predictionData',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['aiDataScience'],
				subResource: ['predictions'],
				operation: ['createPrediction'],
			},
		},
		default: '{}',
		required: true,
		description: 'JSON object containing prediction input data',
		placeholder: '{"inputData":{"feature1":123,"feature2":456}}',
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
				resource: ['aiDataScience'],
				subResource: ['predictions'],
				operation: ['listPredictions'],
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
				resource: ['aiDataScience'],
				subResource: ['predictions'],
				operation: ['listPredictions'],
			},
		},
		default: 0,
		description: 'Number of predictions to skip',
	},
];

