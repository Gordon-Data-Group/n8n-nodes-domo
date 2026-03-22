import { INodeProperties } from 'n8n-workflow';
import { accountFields, accountOperations } from './accounts';
import { achievementFields, achievementOperations } from './achievements';
import { adminFields, adminOperations } from './admin';
import { alertFields, alertOperations } from './alerts';
import { appdbFields, appdbOperations } from './appdb';
import { brandKitFields, brandKitOperations } from './brandKit';
import { bricksFields, bricksOperations } from './bricks';
import { groupFields, groupOperations } from './groups';
import { leftNavigationFields, leftNavigationOperations } from './leftNavigation';
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
	...groupFields,
	...leftNavigationFields,
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
	...groupOperations,
	...leftNavigationOperations,
	...rolesOperations,
	...userOperations,
];
