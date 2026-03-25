import { INodeProperties } from 'n8n-workflow';
import { accountFields, accountOperations } from './accounts';
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
import { reportsFields, reportsOperations } from './reports';
import { rolesFields, rolesOperations } from './roles';
import { userFields, userOperations } from './users';

// Combine all fields
export const domoFields: INodeProperties[] = [
	...accountFields,
	...achievementFields,
	...adminFields,
	...alertFields,
	...appdbFields,
	...brandKitFields,
	...bricksFields,
	...creditsFields,
	...elevationFields,
	...groupFields,
	...leftNavigationFields,
	...reportsFields,
	...rolesFields,
	...userFields,
];

export const domoOperations: INodeProperties[] = [
	...accountOperations,
	...achievementOperations,
	...adminOperations,
	...alertOperations,
	...appdbOperations,
	...brandKitOperations,
	...bricksOperations,
	...creditsOperations,
	...elevationOperations,
	...groupOperations,
	...leftNavigationOperations,
	...reportsOperations,
	...rolesOperations,
	...userOperations,
];
