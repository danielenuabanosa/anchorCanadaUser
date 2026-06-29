/**
 * Download all raster/SVG assets from PROVIDER-APPLICATION Figma screens.
 *
 * Setup:
 *   1. Create a Figma personal access token: https://www.figma.com/developers/api#access-tokens
 *   2. Add to provider/.env.local: FIGMA_ACCESS_TOKEN=your_token
 *   3. Run: node scripts/download-figma-assets.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const FILE_KEY = 'boUqDwdpCbCoxkDlX4Kk9p';

/** Load token from env or .env.local */
function loadToken() {
  if (process.env.FIGMA_ACCESS_TOKEN) return process.env.FIGMA_ACCESS_TOKEN;
  const envPath = path.join(ROOT, '.env.local');
  if (fs.existsSync(envPath)) {
    const match = fs.readFileSync(envPath, 'utf8').match(/^FIGMA_ACCESS_TOKEN=(.+)$/m);
    if (match) return match[1].trim();
  }
  return null;
}

const SCREENS = {
  journey: ['3:489', '3:701', '3:595', '3:806'],
  'org-type': ['6:1445', '10:182', '10:851', '10:1072'],
  categories: ['11:137', '11:899', '11:1128', '11:1399'],
  'org-info': ['15:400', '22:873', '22:3469', '22:2137'],
  verification: ['40:411', '46:1384', '47:203', '44:132'],
  team: ['53:118', '68:579', '68:1230', '69:2293'],
  activation: ['71:2746', '73:1885'],
  login: ['73:3326', '73:3611', '73:3462', '73:3709'],
  'forgot-password': ['74:178', '74:289'],
  'reset-password': ['74:415', '74:725', '74:562', '74:818'],
  'reset-success': ['74:1014', '74:1411'],
  dashboard: ['80:2486', '92:1917'],
  guest: ['96:634', '97:1319'],
  'opportunities-hub': ['132:675', '143:1620', '148:3578', '148:4385'],
  'opp-type': ['163:510', '168:2897', '168:4131', '168:4360'],
  'opp-category': ['169:5182', '170:6583', '170:7733', '172:1003'],
  'opp-template': ['181:1133', '191:1949', '192:2344', '192:3137'],
  'opp-requirements': [
    '203:1319', '211:2187', '210:2229', '211:2635', '211:3035', '214:2352',
    '231:4905', '231:6557', '231:6106', '231:8157', '231:5705', '231:7007',
    '231:8609', '231:7409', '231:5354', '231:7805',
  ],
  'opp-details': ['246:5680', '256:4711', '255:3339', '256:5309'],
  'opp-workflow': ['273:5961', '277:6914', '277:6199', '277:7612'],
  'opp-workflow-internal': [
    '285:3777', '287:6444', '287:7280', '287:7900', '287:9087', '287:9645',
    '287:10335', '287:10911', '287:11453', '287:11879', '288:12393', '288:12819',
  ],
  'opp-workflow-external': [
    '301:13269', '303:14729', '303:15624', '306:16101', '306:16437',
    '307:17227', '307:17759', '307:18266', '307:18764', '307:19179',
  ],
  'opp-workflow-express': [
    '327:5815', '330:6052', '331:6861', '331:7309', '331:8374', '332:8618',
    '332:9117', '334:9657', '334:10117', '334:10577', '335:11738', '335:12207',
    '335:12842', '335:13318', '335:13918', '335:14376', '335:14979', '335:15816',
    '335:16112', '335:16750', '335:17420', '335:18254', '335:18734', '335:19193',
    '335:20046', '335:20072',
  ],
};

async function figmaFetch(url, token) {
  const res = await fetch(url, { headers: { 'X-Figma-Token': token } });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  return res.json();
}

function collectImageNodes(node, list = []) {
  if (!node || node.visible === false) return list;
  if (node.type === 'RECTANGLE' || node.type === 'ELLIPSE' || node.type === 'VECTOR' || node.type === 'FRAME') {
    const fills = node.fills ?? [];
    const hasImage = fills.some((f) => f.type === 'IMAGE');
    if (hasImage || node.type === 'VECTOR') {
      list.push({ id: node.id, name: (node.name || 'asset').replace(/[^\w.-]+/g, '-').slice(0, 60) });
    }
  }
  for (const child of node.children ?? []) collectImageNodes(child, list);
  return list;
}

async function downloadBuffer(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed: ${url}`);
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  const token = loadToken();
  if (!token) {
    console.error('Missing FIGMA_ACCESS_TOKEN. Add it to .env.local or environment.');
    process.exit(1);
  }

  const iconsDir = path.join(ROOT, 'assets', 'icons');
  const imagesDir = path.join(ROOT, 'assets', 'images');
  const screensDir = path.join(ROOT, 'assets', 'images', 'figma-screens');
  fs.mkdirSync(iconsDir, { recursive: true });
  fs.mkdirSync(imagesDir, { recursive: true });
  fs.mkdirSync(screensDir, { recursive: true });

  const allNodeIds = [...new Set(Object.values(SCREENS).flat())];
  console.log(`Fetching ${allNodeIds.length} screen nodes...`);

  // Export full screens as PNG
  const screenExport = await figmaFetch(
    `https://api.figma.com/v1/images/${FILE_KEY}?ids=${encodeURIComponent(allNodeIds.join(','))}&format=png&scale=2`,
    token,
  );

  for (const [group, ids] of Object.entries(SCREENS)) {
    for (const nodeId of ids) {
      const url = screenExport.images?.[nodeId];
      if (!url) {
        console.warn(`No screen export for ${group} ${nodeId}`);
        continue;
      }
      const safeId = nodeId.replace(':', '-');
      const file = path.join(screensDir, `${group}-${safeId}.png`);
      fs.writeFileSync(file, await downloadBuffer(url));
      console.log(`Screen: ${file}`);
    }
  }

  // Fetch file tree and export embedded images per screen
  const fileData = await figmaFetch(`https://api.figma.com/v1/files/${FILE_KEY}?ids=${encodeURIComponent(allNodeIds.join(','))}`, token);
  const imageRefs = new Map();

  for (const nodeId of allNodeIds) {
    const node = fileData.nodes?.[nodeId]?.document;
    if (!node) continue;
    for (const img of collectImageNodes(node)) {
      imageRefs.set(img.id, img.name);
    }
  }

  if (imageRefs.size === 0) {
    console.log('No embedded image nodes found in screen frames.');
    return;
  }

  const ids = [...imageRefs.keys()].join(',');
  const imgExport = await figmaFetch(
    `https://api.figma.com/v1/images/${FILE_KEY}?ids=${encodeURIComponent(ids)}&format=png&scale=2`,
    token,
  );

  for (const [nodeId, name] of imageRefs) {
    const url = imgExport.images?.[nodeId];
    if (!url) continue;
    const isIcon = name.toLowerCase().includes('icon') || name.toLowerCase().includes('logo');
    const dir = isIcon ? iconsDir : imagesDir;
    const file = path.join(dir, `figma-${name}-${nodeId.replace(':', '-')}.png`);
    fs.writeFileSync(file, await downloadBuffer(url));
    console.log(`Asset: ${file}`);
  }

  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
