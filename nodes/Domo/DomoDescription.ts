import { INodeProperties } from 'n8n-workflow';
import { accountFields, accountOperations } from './accounts';
import { approvalsFields, approvalsOperations } from './approvals';
import { categoriesFields, categoriesOperations } from './categories';
import { filesFields, filesOperations } from './files';
import { creditsFields, creditsOperations } from './credits';
import { elevationFields, elevationOperations } from './elevation';
import { achievementFields, achievementOperations } from './achievements';
import { adminFields, adminOperations } from './admin';
import { alertFields, alertOperations } from './alerts';
import { appdbFields, appdbOperations } from './appdb';
import { brandKitFields, brandKitOperations } from './brandKit';
import { bricksFields, bricksOperations } from './bricks';
import { groupFields, groupOperations } from './groups';
import { leftNavigationFields, leftNavigationOperations } from './leftNavigation';
import { pagesFields, pagesOperations } from './pages';
import { reportsFields, reportsOperations } from './reports';
import { rolesFields, rolesOperations } from './roles';
import { scheduledReportsFields, scheduledReportsOperations } from './scheduledReports';
import { userFields, userOperations } from './users';

// Combine all fields
export const domoFields: INodeProperties[] = [
	...accountFields,
	...achievementFields,
	...approvalsFields,
	...categoriesFields,
	...filesFields,
	...adminFields,
	...alertFields,
	...appdbFields,
	...brandKitFields,
	...bricksFields,
	...creditsFields,
	...elevationFields,
	...groupFields,
	...leftNavigationFields,
	...pagesFields,
	...reportsFields,
	...rolesFields,
	...scheduledReportsFields,
	...userFields,
];

export const domoOperations: INodeProperties[] = [
	...accountOperations,
	...achievementOperations,
	...approvalsOperations,
	...categoriesOperations,
	...filesOperations,
	...adminOperations,
	...alertOperations,
	...appdbOperations,
	...brandKitOperations,
	...bricksOperations,
	...creditsOperations,
	...elevationOperations,
	...groupOperations,
	...leftNavigationOperations,
	...pagesOperations,
	...reportsOperations,
	...rolesOperations,
	...scheduledReportsOperations,
	...userOperations,
];
