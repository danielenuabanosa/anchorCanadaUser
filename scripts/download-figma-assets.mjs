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
