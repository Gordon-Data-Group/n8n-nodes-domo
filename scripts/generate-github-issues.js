#!/usr/bin/env node
/**
 * Generates GitHub issues for Domo API resources defined in api-definitions/
 * that are not yet implemented in the Domo node.
 *
 * Usage:
 *   node scripts/generate-github-issues.js [--dry-run] [--create]
 *
 *   --dry-run  (default) Print issues that would be created; do not call GitHub.
 *   --create  Create issues via GitHub CLI (gh). Requires: gh auth login.
 *
 * Prereq for --create: Install GitHub CLI (brew install gh) and run: gh auth login
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.resolve(__dirname, '..');
const API_DEFINITIONS_DIR = path.join(REPO_ROOT, 'api-definitions');

// Resources currently implemented (from nodes/Domo/DomoDescription.ts)
const IMPLEMENTED_RESOURCES = new Set([
  'account',
  'achievement',
  'admin',
  'alert',
  'appdb',
  'brandKit',
  'bricks',
  'group',
  'leftNavigation',
  'user',
]);

// Map api-definition filename stem (e.g. "01-accounts") to node resource value.
// Used to decide if a definition is already implemented.
const API_FILE_TO_RESOURCE = {
  '01-accounts': 'account',
  '02-achievements': 'achievement',
  '03-admin': 'admin',
  '04-ai-data-science': null, // no direct node resource; still create issue
  '05-alerts': 'alert',
  '06-appdb': 'appdb',
  '07-approvals': null,
  '08-app-studio': 'appStudio',
  '09-brand-kit': 'brandKit',
  '10-bricks-and-pro-code-apps': 'bricks',
  '11-cards': 'card',
  '12-categories-certified-attributes': 'category',
  '13-certification': 'certification',
  '14-code-engine': 'codeEngine',
  '15-credits': 'credit',
  '16-dataflows': 'dataflow',
  '17-datasets-and-streams': 'dataset',
  '18-domo-everywhere': 'domoEverywhere',
  '19-elevation': 'elevation',
  '20-files': 'files',
  '21-filesets': 'filesets',
  '22-forms': 'forms',
  '23-functions-beast-modes-and-variables': 'functions',
  '24-groups': 'group',
  '25-left-navigation': 'leftNavigation',
  '26-objectives-goals': 'objectives',
  '27-pages-dashboards': 'page',
  '28-projects-and-tasks': 'projects',
  '29-reports-slideshow-publications': 'reports',
  '30-roles-and-authorities-grants': 'roles',
  '31-sandbox': 'sandbox',
  '32-scheduled-reports': 'scheduledReports',
  '33-task-center': 'taskCenter',
  '34-toolkit': 'toolkit',
  '35-users': 'user',
  '37-search': null,
};

function loadApiDefinitions() {
  if (!fs.existsSync(API_DEFINITIONS_DIR)) {
    console.error('api-definitions directory not found at:', API_DEFINITIONS_DIR);
    process.exit(1);
  }
  const files = fs.readdirSync(API_DEFINITIONS_DIR).filter((f) => f.endsWith('.api.json'));
  const definitions = [];
  for (const file of files) {
    const filePath = path.join(API_DEFINITIONS_DIR, file);
    let stem = path.basename(file, '.api.json');
    stem = stem.replace(/-+$/, ''); // normalize trailing dashes (e.g. 12-categories-certified-attributes-.api.json)
    const resource = API_FILE_TO_RESOURCE[stem];
    if (resource !== undefined && IMPLEMENTED_RESOURCES.has(resource)) {
      continue; // skip implemented
    }
    let data;
    try {
      data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (e) {
      console.warn('Skip (invalid JSON):', file, e.message);
      continue;
    }
    const collectionName = data.collectionName || stem;
    const operations = data.operations || [];
    const totalOperations = data.totalOperations ?? operations.length;
    definitions.push({
      file,
      stem,
      resource: resource || stem,
      collectionName,
      totalOperations,
      operations,
    });
  }
  return definitions;
}

function formatOperation(op, index) {
  const name = op.name || op.path || `Operation ${index + 1}`;
  const method = (op.method || '').toUpperCase();
  const path = op.path || '';
  const pathVars = (op.pathVars || []).length ? ` Path params: \`${op.pathVars.join(', ')}\`.` : '';
  const queryParams = (op.queryParams || []).length ? ` Query params: \`${op.queryParams.join(', ')}\`.` : '';
  const bodyNote = op.hasBody ? ' Request body required.' : '';
  const desc = op.description ? ` ${op.description}` : '';
  const folder = op.folder ? ` _(${op.folder})_` : '';
  return `- **${name}** — \`${method} ${path}\`${pathVars}${queryParams}${bodyNote}${folder}${desc}`;
}

function buildIssueBody(def) {
  const opList =
    def.operations.length > 0
      ? def.operations.map((op, i) => formatOperation(op, i)).join('\n')
      : '_No operations defined._';
  return `## Summary

Implement the **${def.collectionName}** resource for the Domo n8n node.

**Operations to implement:** ${def.totalOperations}

## API operations (reference)

Each item: operation name — \`METHOD path\` — path/query params and notes.

${opList}

## Implementation notes

- Add a new resource file under \`nodes/Domo/\` (e.g. \`${def.stem.replace(/^\d+-/, '')}.ts\`) or extend an existing one.
- Export \`*Operations\` and \`*Fields\` and register them in \`nodes/Domo/DomoDescription.ts\`.
- Add the resource to the Resource dropdown in \`nodes/Domo/Domo.node.ts\` if not already present.
- Follow existing patterns (e.g. \`accounts.ts\`, \`alerts.ts\`) and use \`preSendLogger\` from \`shared/preSendLogger.ts\`.
- Domo API docs: https://developer.domo.com/docs/domo-apis/getting-started
`;
}

function buildIssueTitle(def) {
  return `Implement resource: ${def.collectionName}`;
}

function main() {
  const args = process.argv.slice(2);
  const dryRun = !args.includes('--create');
  if (dryRun && !args.includes('--dry-run')) {
    args.push('--dry-run');
  }

  const definitions = loadApiDefinitions();
  if (definitions.length === 0) {
    console.log('No unimplemented api-definitions found.');
    return;
  }

  console.log(`Found ${definitions.length} unimplemented resource(s):\n`);

  if (dryRun) {
    for (const def of definitions) {
      console.log('---');
      console.log('Title:', buildIssueTitle(def));
      console.log('Body (first 400 chars):', buildIssueBody(def).slice(0, 400) + '...');
      console.log('');
    }
    console.log('Run with --create to create these issues via GitHub CLI (gh).');
    return;
  }

  // --create: use gh to create issues
  const { execSync } = require('child_process');
  const tmpDir = path.join(REPO_ROOT, '.tmp-issue-bodies');
  if (!fs.existsSync(tmpDir)) {
    fs.mkdirSync(tmpDir, { recursive: true });
  }
  for (const def of definitions) {
    const title = buildIssueTitle(def);
    const body = buildIssueBody(def);
    const bodyFile = path.join(tmpDir, `${def.stem}.md`);
    fs.writeFileSync(bodyFile, body, 'utf8');
    try {
      execSync(
        `gh issue create --title ${JSON.stringify(title)} --body-file ${JSON.stringify(bodyFile)} --label "enhancement"`,
        { cwd: REPO_ROOT, stdio: 'inherit' }
      );
      console.log('Created:', title);
    } catch (e) {
      console.error('Failed to create issue:', title, e.message);
    } finally {
      try {
        fs.unlinkSync(bodyFile);
      } catch (_) {}
    }
  }
  try {
    fs.rmdirSync(tmpDir);
  } catch (_) {}
}

main();
