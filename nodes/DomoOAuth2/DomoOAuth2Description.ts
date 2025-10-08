import type { INodeProperties } from 'n8n-workflow';
import { accountFields, accountOperations } from './account';
import { activityLogFields, activityLogOperations } from './activityLog';
import { cardsFields, cardsOperations } from './cards';
import { datasetFields, datasetOperations } from './dataset';
import { embedTokenFields, embedTokenOperations } from './embedToken';
import { groupsFields, groupsOperations } from './groups';
import { pagesFields, pagesOperations } from './pages';
import { projectsAndTasksFields, projectsAndTasksOperations } from './projectsAndTasks';
import { simpleFields, simpleOperations } from './simple';
import { streamFields, streamOperations } from './stream';
import { usersFields, usersOperations } from './users';

// Combine all fields
export const domoOAuth2Fields: INodeProperties[] = [
	...accountFields,
	...activityLogFields,
	...cardsFields,
	...datasetFields,
	...embedTokenFields,
	...groupsFields,
	...pagesFields,
	...projectsAndTasksFields,
	...simpleFields,
	...streamFields,
	...usersFields,
];

export const domoOAuth2Operations: INodeProperties[] = [
	...accountOperations,
	...activityLogOperations,
	...cardsOperations,
	...datasetOperations,
	...embedTokenOperations,
	...groupsOperations,
	...pagesOperations,
	...projectsAndTasksOperations,
	...simpleOperations,
	...streamOperations,
	...usersOperations,
];

