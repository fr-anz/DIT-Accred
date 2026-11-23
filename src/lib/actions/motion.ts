/* Scroll-driven motion helpers.

   Content is fully visible in the server-rendered HTML. The `reveal` action
   only hides an element after hydration and shows it again when it scrolls
   into view, so the page still reads correctly without JavaScript. Both
   actions skip their animation when reduced motion is requested. */

const prefersReducedMotion = () =>
	typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Longest nested entrance on the page (ruler marker: 0.4s delay + 1.8s). */
const SETTLE_MS = 2600;

type RevealOptions = { threshold?: number; rootMargin?: string } | undefined;

export function reveal(node: HTMLElement, options: RevealOptions = undefined) {
	if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
		node.classList.add('is-revealed');
		return {};
	}

	let settle = 0;
	node.classList.add('reveal-pending');
	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				node.classList.add('is-revealed');
				observer.disconnect();
				// Drop the pending state once every nested entrance has finished, so
				// the element's own hover transitions apply again.
				const stagger = Number(getComputedStyle(node).getPropertyValue('--d')) || 0;
				settle = window.setTimeout(
					() => node.classList.remove('reveal-pending'),
					SETTLE_MS + stagger * 90
				);
			}
		},
		{ threshold: options?.threshold ?? 0.18, rootMargin: options?.rootMargin ?? '0px 0px -8% 0px' }
	);
	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
			window.clearTimeout(settle);
		}
	};
}

type CountOptions = {
	to: number;
	from?: number;
	duration?: number;
	delay?: number;
	/** Digits after the decimal point, e.g. 2 for 89.13. */
	decimals?: number;
};

/* Counts the element's text from `from` to `to` once it enters the viewport.
   The final value is server-rendered, so only the animation depends on JS. */
export function countUp(node: Element, options: CountOptions) {
	const { to, from = 0, duration = 1400, delay = 0, decimals = 0 } = options;
	const format = (value: number) => value.toFixed(decimals);
	if (prefersReducedMotion() || !('IntersectionObserver' in window)) return {};

	let frame = 0;
	let timer = 0;
	node.textContent = format(from);

	const run = () => {
		const start = performance.now();
		const tick = (now: number) => {
			const progress = Math.min(1, (now - start) / duration);
			const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
			node.textContent = format(from + (to - from) * eased);
			if (progress < 1) frame = requestAnimationFrame(tick);
		};
		frame = requestAnimationFrame(tick);
	};

	const observer = new IntersectionObserver(
		([entry]) => {
			if (!entry.isIntersecting) return;
			observer.disconnect();
			timer = window.setTimeout(run, delay);
		},
		{ threshold: 0.6 }
	);
	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
			cancelAnimationFrame(frame);
			window.clearTimeout(timer);
			node.textContent = format(to);
		}
	};
}
