import { chromium } from 'playwright';
const [prefix, width = '1920'] = process.argv.slice(2);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: +width, height: 1080 } });
await page.goto('http://127.0.0.1:5174/research', { waitUntil: 'networkidle' });
await page.waitForTimeout(700);
// measure section content widths
const metrics = await page.evaluate(() => {
	const w = (sel) => {
		const el = document.querySelector(sel);
		return el ? Math.round(el.getBoundingClientRect().width) : null;
	};
	return {
		policy: w('.policy_section'),
		framework_grid: w('.framework_grid'),
		incentive_stack: w('.incentive_stack'),
		metrics_carousel: w('.metrics_carousel'),
		distribution_panel: w('.distribution_panel'),
		faculty_repository: w('.faculty_repository')
	};
});
console.log(JSON.stringify(metrics));
await page.evaluate(() => document.getElementById('research-repository')?.scrollIntoView({ block: 'center' }));
await page.waitForTimeout(900);
await page.screenshot({ path: `/tmp/shots/${prefix}-engagement.png` });
// slide 2 (indexation chart)
await page.locator('.metric_control_next').click();
await page.waitForTimeout(900);
await page.screenshot({ path: `/tmp/shots/${prefix}-indexation.png` });
await browser.close();
console.log('done', prefix);
