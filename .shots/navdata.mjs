import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto('http://127.0.0.1:5174/research', { waitUntil: 'networkidle' });
await page.waitForTimeout(700);

// hover each tab group and screenshot the dropdown for Research and Community
for (const [i, name] of [[0, 'research'], [2, 'community']]) {
	await page.locator('.tab-group').nth(i).hover();
	await page.waitForTimeout(400);
	await page.screenshot({ path: `/tmp/shots/navdata-${name}-dropdown.png` });
	await page.mouse.move(10, 600);
	await page.waitForTimeout(400);
}

// planning dropdown
await page.goto('http://127.0.0.1:5174/planning', { waitUntil: 'networkidle' });
await page.waitForTimeout(600);
await page.locator('.tab-group').nth(4).hover();
await page.waitForTimeout(400);
await page.screenshot({ path: `/tmp/shots/navdata-planning-dropdown.png` });
await page.mouse.move(10, 600);
await page.waitForTimeout(400);

// verify intl + compliance have no chevron and no dropdown on hover
const chevrons = await page.evaluate(() => {
	const tabs = document.querySelectorAll('.tab-group .section-tab');
	return Array.from(tabs).map((t) => ({
		label: t.textContent.trim().replace(/\s+/g, ' '),
		hasChevron: Boolean(t.querySelector('.chevron'))
	}));
});
console.log(JSON.stringify(chevrons, null, 1));

// click intl tab (should navigate, no dropdown)
await page.locator('.tab-group', { hasText: 'Internationalization' }).hover();
await page.waitForTimeout(400);
const dropdownVisible = await page.locator('.dropdown').count();
console.log('intl dropdown count after hover:', dropdownVisible);
await page.screenshot({ path: `/tmp/shots/navdata-intl-hover.png` });

// community: verify anchors resolve
await page.goto('http://127.0.0.1:5174/community', { waitUntil: 'networkidle' });
await page.waitForTimeout(500);
for (const id of ['community-extension-agenda', 'technical-profiles', 'ivote-showcase']) {
	const found = await page.evaluate((i) => Boolean(document.getElementById(i)), id);
	console.log(id, found ? 'FOUND' : 'MISSING');
}

await browser.close();
console.log('done');
