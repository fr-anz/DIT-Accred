<script lang="ts">
	import { onMount } from 'svelte';
	import { createSkyline, type Rgb } from './skyline';

	/* Size of one dither dot in CSS pixels. */
	let { dot = 2 }: { dot?: number } = $props();

	let host: HTMLDivElement;
	let canvas: HTMLCanvasElement;
	let painted = $state(false);

	const REVEAL_MS = 1800;
	const FRAME_MS = 1000 / 12;

	/* Resolve the ink custom properties to RGB through the canvas colour parser. */
	function readInks(node: HTMLElement): Rgb[] {
		const probe = document.createElement('canvas').getContext('2d')!;
		const style = getComputedStyle(node);
		return [0, 1, 2, 3].map((i) => {
			probe.fillStyle = style.getPropertyValue(`--ink-${i}`).trim() || '#000';
			const hex = probe.fillStyle.slice(1);
			return [0, 2, 4].map((o) => parseInt(hex.slice(o, o + 2), 16)) as Rgb;
		});
	}

	onMount(() => {
		const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
		const skyline = createSkyline(canvas, readInks(host));
		let visible = false;
		let revealStart = -1;
		let raf = 0;
		let last = -Infinity;

		const draw = (now: number) => {
			const still = motion.matches;
			if (revealStart < 0 && visible) revealStart = still ? now - REVEAL_MS : now;
			const reveal = revealStart < 0 ? 0 : Math.min(1, (now - revealStart) / REVEAL_MS);
			skyline.frame(still ? 0 : now / 1000, reveal);
			painted = true;
			last = now;
		};

		const tick = (now: number) => {
			raf = 0;
			if (!visible || document.hidden) return;
			if (now - last >= FRAME_MS) draw(now);
			if (!motion.matches || revealStart < 0) raf = requestAnimationFrame(tick);
		};
		const wake = () => {
			if (!raf && visible) raf = requestAnimationFrame(tick);
		};

		const resizer = new ResizeObserver(([entry]) => {
			const { width, height } = entry.contentRect;
			// Phones get finer dots, or the short art loses the pylon letters.
			const size = width < 640 ? 1 : dot;
			const w = Math.ceil(width / size);
			const h = Math.ceil(height / size);
			canvas.style.width = `${w * size}px`;
			canvas.style.height = `${h * size}px`;
			skyline.resize(w, h);
			draw(performance.now());
		});
		const watcher = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			wake();
		});
		const onVisibility = () => wake();
		const onMotion = () => {
			draw(performance.now());
			wake();
		};

		resizer.observe(host);
		watcher.observe(host);
		document.addEventListener('visibilitychange', onVisibility);
		motion.addEventListener('change', onMotion);

		return () => {
			cancelAnimationFrame(raf);
			resizer.disconnect();
			watcher.disconnect();
			document.removeEventListener('visibilitychange', onVisibility);
			motion.removeEventListener('change', onMotion);
		};
	});
</script>

<div
	class="skyline"
	bind:this={host}
	role="img"
	aria-label="Dithered illustration of the PUP Pylon, the Obelisk and the Main Building at dusk, beside the campus lagoon"
>
	<canvas bind:this={canvas} class:painted></canvas>
</div>

<style>
	.skyline {
		--ink-0: var(--c-maroon-deep);
		--ink-1: var(--c-maroon);
		--ink-2: var(--c-gold);
		--ink-3: #f6ecd6;
		position: relative;
		height: clamp(150px, 30vw, 500px);
		overflow: hidden;
		/* Stands in for the sky until the canvas paints, and without JavaScript. */
		background: linear-gradient(
			to bottom,
			var(--ink-0) 10%,
			var(--ink-1) 55%,
			var(--ink-2) 82%,
			var(--ink-0) 86%
		);
	}

	canvas {
		display: block;
		image-rendering: pixelated;
		opacity: 0;
	}

	canvas.painted {
		opacity: 1;
	}
</style>
