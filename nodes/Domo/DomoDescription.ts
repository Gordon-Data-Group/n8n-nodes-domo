import { INodeProperties } from 'n8n-workflow';
import { accountFields, accountOperations } from './accounts';
import { approvalsFields, approvalsOperations } from './approvals';
import { cardFields, cardOperations } from './cards';
import { categoriesFields, categoriesOperations } from './categories';
import { filesFields, filesOperations } from './files';
import { creditsFields, creditsOperations } from './credits';
import { dataflowsFields, dataflowsOperations } from './dataflows';
import { domoEverywhereFields, domoEverywhereOperations } from './domoEverywhere';
import { elevationFields, elevationOperations } from './elevation';
import { achievementFields, achievementOperations } from './achievements';
import { adminFields, adminOperations } from './admin';
import { alertFields, alertOperations } from './alerts';
import { appdbFields, appdbOperations } from './appdb';
import { brandKitFields, brandKitOperations } from './brandKit';
import { bricksFields, bricksOperations } from './bricks';
import { functionsFields, functionsOperations } from './functions';
import { groupFields, groupOperations } from './groups';
import { leftNavigationFields, leftNavigationOperations } from './leftNavigation';
import { reportsFields, reportsOperations } from './reports';
import { rolesFields, rolesOperations } from './roles';
import { userFields, userOperations } from './users';

// Combine all fields
export const domoFields: INodeProperties[] = [
	...accountFields,
	...achievementFields,
	...approvalsFields,
	...cardFields,
	...categoriesFields,
	...filesFields,
	...adminFields,
	...alertFields,
	...appdbFields,
	...brandKitFields,
	...bricksFields,
	...creditsFields,
	...dataflowsFields,
	...domoEverywhereFields,
	...elevationFields,
	...functionsFields,
	...groupFields,
	...leftNavigationFields,
	...reportsFields,
	...rolesFields,
	...userFields,
];

export const domoOperations: INodeProperties[] = [
	...accountOperations,
	...achievementOperations,
	...approvalsOperations,
	...cardOperations,
	...categoriesOperations,
	...filesOperations,
	...adminOperations,
	...alertOperations,
	...appdbOperations,
	...brandKitOperations,
	...bricksOperations,
	...creditsOperations,
	...dataflowsOperations,
	...domoEverywhereOperations,
	...elevationOperations,
	...functionsOperations,
	...groupOperations,
	...leftNavigationOperations,
	...reportsOperations,
	...rolesOperations,
	...userOperations,
];
