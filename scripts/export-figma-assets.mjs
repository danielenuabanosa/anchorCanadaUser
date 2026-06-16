/**
 * Export images from Figma PROVIDER-APPLICATION file.
 * Requires FIGMA_ACCESS_TOKEN environment variable.
 *
 * Usage: FIGMA_ACCESS_TOKEN=xxx node scripts/export-figma-assets.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const FILE_KEY = 'boUqDwdpCbCoxkDlX4Kk9p';
const TOKEN = process.env.FIGMA_ACCESS_TOKEN;

/** Screens to export — node IDs from Figma URLs (hyphen → colon) */
const SCREENS = {
  'journey-desktop': '3:489',
  'journey-mobile': '3:701',
  'journey-selected-desktop': '3:595',
  'journey-selected-mobile': '3:806',
  'org-type-desktop': '6:1445',
  'org-type-mobile': '10:182',
  'org-type-selected-desktop': '10:851',
  'org-type-selected-mobile': '10:1072',
  'categories-desktop': '11:137',
  'categories-mobile': '11:899',
  'categories-selected-desktop': '11:1128',
  'categories-selected-mobile': '11:1399',
  'org-info-desktop': '15:400',
  'org-info-mobile': '22:873',
  'org-info-filled-desktop': '22:3469',
  'org-info-filled-mobile': '22:2137',
  'verification-desktop': '40:411',
  'verification-mobile': '46:1384',
  'verification-filled-desktop': '47:203',
  'verification-filled-mobile': '44:132',
  'team-desktop': '53:118',
  'team-mobile': '68:579',
  'team-filled-desktop': '68:1230',
  'team-filled-mobile': '69:2293',
  'activation-desktop': '71:2746',
  'activation-mobile': '73:1885',
  'login-desktop': '73:3326',
  'login-mobile': '73:3611',
  'login-filled-desktop': '73:3462',
  'login-filled-mobile': '73:3709',
  'forgot-password-desktop': '74:178',
  'forgot-password-mobile': '74:289',
  'reset-password-desktop': '74:415',
  'reset-password-mobile': '74:725',
  'reset-password-filled-desktop': '74:562',
  'reset-password-filled-mobile': '74:818',
  'reset-success-desktop': '74:1014',
  'reset-success-mobile': '74:1411',
  'dashboard-desktop': '80:2486',
  'dashboard-mobile': '92:1917',
  'guest-desktop': '96:634',
  'guest-mobile': '97:1319',
};

async function figmaFetch(url) {
  const res = await fetch(url, {
    headers: { 'X-Figma-Token': TOKEN },
  });
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  return res.json();
}

async function main() {
  if (!TOKEN) {
    console.error('Set FIGMA_ACCESS_TOKEN to export assets from Figma.');
    process.exit(1);
  }

  const outDir = path.join(ROOT, 'assets', 'images', 'figma-screens');
  fs.mkdirSync(outDir, { recursive: true });

  const nodeIds = Object.values(SCREENS).join(',');
  const images = await figmaFetch(
    `https://api.figma.com/v1/images/${FILE_KEY}?ids=${encodeURIComponent(nodeIds)}&format=png&scale=2`,
  );

  for (const [name, nodeId] of Object.entries(SCREENS)) {
    const url = images.images[nodeId];
    if (!url) {
      console.warn(`No image for ${name} (${nodeId})`);
      continue;
    }
    const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
    const file = path.join(outDir, `${name}.png`);
    fs.writeFileSync(file, buf);
    console.log(`Saved ${file}`);
  }

  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
