import { INodeProperties } from 'n8n-workflow';
import { accountFields, accountOperations } from './accounts';
import { achievementFields, achievementOperations } from './achievements';
import { adminFields, adminOperations } from './admin';
import { aiDataScienceFields, aiDataScienceOperations } from './aiDataScience';
import { alertFields, alertOperations } from './alerts';
import { appdbFields, appdbOperations } from './appdb';
import { approvalFields, approvalOperations } from './approvals';
import { appStudioFields, appStudioOperations } from './appStudio';
import { brandKitFields, brandKitOperations } from './brandKit';
import { bricksFields, bricksOperations } from './bricks';
import { cardFields, cardOperations } from './cards';
import { categoryFields, categoryOperations } from './categories';
import { certificationFields, certificationOperations } from './certification';
import { codeEngineFields, codeEngineOperations } from './codeEngine';
import { creditFields, creditOperations } from './credits';
import { userFields, userOperations } from './users';
import { groupFields, groupOperations } from './groups';
import { tokenFields, tokenOperations } from './tokens';
import { datasetFields, datasetOperations } from './datasets';

// Combine all fields
export const domoFields: INodeProperties[] = [
	...accountFields,
	...achievementFields,
	...adminFields,
	...aiDataScienceFields,
	...alertFields,
	...appdbFields,
	...approvalFields,
	...appStudioFields,
	...brandKitFields,
	...bricksFields,
	...cardFields,
	...categoryFields,
	...certificationFields,
	...codeEngineFields,
	...creditFields,
	...userFields,
	...groupFields,
	...tokenFields,
	...datasetFields,
];

export const domoOperations: INodeProperties[] = [
	...accountOperations,
	...achievementOperations,
	...adminOperations,
	...aiDataScienceOperations,
	...alertOperations,
	...appdbOperations,
	...approvalOperations,
	...appStudioOperations,
	...brandKitOperations,
	...bricksOperations,
	...cardOperations,
	...categoryOperations,
	...certificationOperations,
	...codeEngineOperations,
	...creditOperations,
	...userOperations,
	...groupOperations,
	...tokenOperations,
	...datasetOperations,
];
