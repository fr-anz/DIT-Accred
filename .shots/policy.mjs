import { chromium } from 'playwright';
const [prefix, width = '1920'] = process.argv.slice(2);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: +width, height: 1080 } });
await page.goto('http://127.0.0.1:5174/research', { waitUntil: 'networkidle' });
await page.waitForTimeout(700);
await page.evaluate(() => document.getElementById('policy')?.scrollIntoView({ block: 'start' }));
await page.waitForTimeout(600);
await page.screenshot({ path: `/tmp/shots/${prefix}-policy.png` });
// measure the divider geometry
const metrics = await page.evaluate(() => {
	const r = (sel) => {
		const el = document.querySelector(sel);
		if (!el) return null;
		const b = el.getBoundingClientRect();
		return { top: Math.round(b.top), bottom: Math.round(b.bottom), left: Math.round(b.left), right: Math.round(b.right), h: Math.round(b.height) };
	};
	const row = document.querySelector('.incentive_row');
	const rb = row ? row.getBoundingClientRect() : null;
	return {
		shell: r('.framework_shell'),
		cards_row: r('.framework_cards_row'),
		split: r('.framework_detail_split'),
		nav: r('.incentive_nav'),
		detail: r('.incentive_detail'),
		row: rb ? { top: Math.round(rb.top), bottom: Math.round(rb.bottom), h: Math.round(rb.height) } : null
	};
});
console.log(JSON.stringify(metrics, null, 1));
await browser.close();
console.log('done', prefix);
