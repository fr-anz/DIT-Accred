import { chromium } from 'playwright';

const prefix = process.argv[2] ?? 'nav';
const browser = await chromium.launch();

// Desktop, tablet, mobile widths
for (const width of [1920, 1280, 1024, 768, 390]) {
	const page = await browser.newPage({ viewport: { width, height: 1080 } });
	await page.goto('http://127.0.0.1:5174/research', { waitUntil: 'networkidle' });
	await page.waitForTimeout(700);
	await page.screenshot({ path: `/tmp/shots/${prefix}-${width}-research.png` });

	// hover a section tab to open the dropdown (desktop widths only)
	if (width > 1180) {
		await page.locator('.tab-group').nth(1).hover();
		await page.waitForTimeout(400);
		await page.screenshot({ path: `/tmp/shots/${prefix}-${width}-dropdown.png` });
		await page.mouse.move(10, 500);
		await page.waitForTimeout(400);
	}

	// mobile drawer
	if (width <= 1180) {
		await page.locator('.drawer-toggle').click();
		await page.waitForTimeout(400);
		await page.screenshot({ path: `/tmp/shots/${prefix}-${width}-drawer.png` });
		// open an accordion
		const acc = page.locator('.mobile-accordion').first();
		if (await acc.count()) {
			await acc.click();
			await page.waitForTimeout(300);
			await page.screenshot({ path: `/tmp/shots/${prefix}-${width}-drawer-open.png` });
		}
	}

	// scroll check: pill should scroll away
	await page.evaluate(() => window.scrollTo(0, 600));
	await page.waitForTimeout(400);
	await page.screenshot({ path: `/tmp/shots/${prefix}-${width}-scrolled.png` });
	await page.close();
}

// planning route desktop
const p = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await p.goto('http://127.0.0.1:5174/planning', { waitUntil: 'networkidle' });
await p.waitForTimeout(700);
await p.screenshot({ path: `/tmp/shots/${prefix}-1920-planning.png` });
await p.close();

await browser.close();
console.log('done', prefix);
