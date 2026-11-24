/* Site-wide micro-interactions for capable devices.

   Everything here is decoration layered on top of finished pages. It only
   switches on for a fine pointer that can hover, no reduced-motion request,
   and enough CPU and memory, by setting `data-fx="rich"` on <html>. The CSS
   in `#lib/styles/polish.css` keys every effect off that attribute, so phones,
   tablets and low-end laptops render the site exactly as before. */

/* Cards that get the cursor spotlight. Add `data-spotlight` to opt in others. */
const SPOTLIGHT = [
	'[data-spotlight]',
	'.ranking_card',
	'.stage_card',
	'.objective_card',
	'.goal_card',
	'.process_card',
	'.framework_card',
	'.lifecycle_card',
	'.statement_card',
	'.folder_card',
	'.peo_attainment_card',
	'.station_card',
	'.mv-card',
	'.pillar-card',
	'.unit_allocation_card'
].join(',');

type NavigatorHints = Navigator & { deviceMemory?: number };

function capable() {
	const nav = navigator as NavigatorHints;
	return (
		window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
		!window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
		(nav.hardwareConcurrency ?? 8) >= 6 &&
		(nav.deviceMemory ?? 8) >= 4
	);
}

/* Absolutely positioned descendants that a `position: relative` card would re-anchor. */
function anchorsChildren(card: HTMLElement) {
	for (const child of card.querySelectorAll<HTMLElement>('*')) {
		if (getComputedStyle(child).position === 'absolute' && !card.contains(child.offsetParent)) {
			return true;
		}
	}
	return false;
}

/* Lazily adds the overlay the spotlight paints into. A static card becomes
   `relative` to hold it, unless that would move one of its children. */
function spotlightLayer(card: HTMLElement) {
	let layer = card.querySelector<HTMLElement>(':scope > .fx_spotlight');
	if (layer) return layer;
	if (card.dataset.fxSkip) return null;
	if (getComputedStyle(card).position === 'static') {
		if (anchorsChildren(card)) {
			card.dataset.fxSkip = '1';
			return null;
		}
		card.style.position = 'relative';
	}
	layer = document.createElement('span');
	layer.className = 'fx_spotlight';
	layer.setAttribute('aria-hidden', 'true');
	card.append(layer);
	return layer;
}

export function initPolish() {
	const root = document.documentElement;
	const queries = [
		window.matchMedia('(hover: hover) and (pointer: fine)'),
		window.matchMedia('(prefers-reduced-motion: reduce)')
	];

	let lit: HTMLElement | null = null;
	let frame = 0;
	let pending: PointerEvent | null = null;

	const unlight = () => {
		lit?.classList.remove('fx_lit');
		lit = null;
	};

	const paint = () => {
		frame = 0;
		const event = pending;
		pending = null;
		if (!event || root.dataset.fx !== 'rich') return;

		const target = event.target instanceof Element ? event.target : null;
		const card = target?.closest<HTMLElement>(SPOTLIGHT) ?? null;
		if (card !== lit) unlight();
		if (!card || !spotlightLayer(card)) return;

		const box = card.getBoundingClientRect();
		card.style.setProperty('--fx-x', `${event.clientX - box.left}px`);
		card.style.setProperty('--fx-y', `${event.clientY - box.top}px`);
		card.classList.add('fx_lit');
		lit = card;
	};

	const onMove = (event: PointerEvent) => {
		if (event.pointerType !== 'mouse') return;
		pending = event;
		if (!frame) frame = requestAnimationFrame(paint);
	};

	const update = () => {
		if (capable()) {
			root.dataset.fx = 'rich';
		} else {
			delete root.dataset.fx;
			unlight();
		}
	};

	update();
	for (const query of queries) query.addEventListener('change', update);
	document.addEventListener('pointermove', onMove, { passive: true });
	document.documentElement.addEventListener('pointerleave', unlight);

	return () => {
		cancelAnimationFrame(frame);
		for (const query of queries) query.removeEventListener('change', update);
		document.removeEventListener('pointermove', onMove);
		document.documentElement.removeEventListener('pointerleave', unlight);
		unlight();
		delete root.dataset.fx;
	};
}
