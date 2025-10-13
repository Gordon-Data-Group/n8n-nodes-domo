import { INodeProperties } from 'n8n-workflow';
import { accountFields, accountOperations } from './accounts';
import { achievementFields, achievementOperations } from './achievements';
import { adminFields, adminOperations } from './admin';
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
import { datasetFields, datasetOperations } from './datasets';
import { domoEverywhereFields, domoEverywhereOperations } from './domoEverywhere';
import { elevationFields, elevationOperations } from './elevation';
import { filesFields, filesOperations } from './files';
import { filesetsFields, filesetsOperations } from './filesets';
import { formsFields, formsOperations } from './forms';
import { functionsFields, functionsOperations } from './functions';
import { groupFields, groupOperations } from './groups';
import { leftNavigationFields, leftNavigationOperations } from './leftNavigation';
import { objectivesFields, objectivesOperations } from './objectives';
import { pageFields, pageOperations } from './pages';
import { projectsFields, projectsOperations } from './projects';
import { reportsFields, reportsOperations } from './reports';
import { rolesFields, rolesOperations } from './roles';
import { sandboxFields, sandboxOperations } from './sandbox';
import { scheduledReportsFields, scheduledReportsOperations } from './scheduledReports';
import { taskCenterFields, taskCenterOperations } from './taskCenter';
import { tokenFields, tokenOperations } from './tokens';
import { toolkitFields, toolkitOperations } from './toolkit';
import { userFields, userOperations } from './users';
import { workflowsFields, workflowsOperations } from './workflows';

// Combine all fields
export const domoFields: INodeProperties[] = [
	...accountFields,
	...achievementFields,
	...adminFields,
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
	...datasetFields,
	...domoEverywhereFields,
	...elevationFields,
	...filesFields,
	...filesetsFields,
	...formsFields,
	...functionsFields,
	...groupFields,
	...leftNavigationFields,
	...objectivesFields,
	...pageFields,
	...projectsFields,
	...reportsFields,
	...rolesFields,
	...sandboxFields,
	...scheduledReportsFields,
	...taskCenterFields,
	...tokenFields,
	...toolkitFields,
	...userFields,
	...workflowsFields,
];

export const domoOperations: INodeProperties[] = [
	...accountOperations,
	...achievementOperations,
	...adminOperations,
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
	...datasetOperations,
	...domoEverywhereOperations,
	...elevationOperations,
	...filesOperations,
	...filesetsOperations,
	...formsOperations,
	...functionsOperations,
	...groupOperations,
	...leftNavigationOperations,
	...objectivesOperations,
	...pageOperations,
	...projectsOperations,
	...reportsOperations,
	...rolesOperations,
	...sandboxOperations,
	...scheduledReportsOperations,
	...taskCenterOperations,
	...tokenOperations,
	...toolkitOperations,
	...userOperations,
	...workflowsOperations,
];
