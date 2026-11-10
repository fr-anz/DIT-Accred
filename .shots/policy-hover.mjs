import { chromium } from 'playwright';
const [prefix, width = '1920'] = process.argv.slice(2);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: +width, height: 1080 } });
await page.goto('http://127.0.0.1:5174/research', { waitUntil: 'networkidle' });
await page.waitForTimeout(700);
await page.evaluate(() => document.getElementById('policy')?.scrollIntoView({ block: 'start' }));
await page.waitForTimeout(600);
// hover the middle card
await page.locator('.framework_card').nth(1).hover();
await page.waitForTimeout(400);
await page.screenshot({ path: `/tmp/shots/${prefix}-policy-hover.png` });
await browser.close();
console.log('done', prefix);
