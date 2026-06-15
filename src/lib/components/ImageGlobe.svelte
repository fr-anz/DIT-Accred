<script>
	import { onMount } from 'svelte';

	/**
	 * @typedef {{ src: string; alt: string; caption: string }} GalleryImage
	 */

	let {
		/** @type {GalleryImage[]} */
		images = [],
		/** Sphere radius in px. */
		radius = 340,
		/** Square tile edge in px (kept larger than angular spacing so tiles overlap). */
		tileSize = 112,
		/** Auto-spin when idle. */
		autoRotate = true,
		/** Auto-spin speed (deg per frame-ish). */
		rotationSpeed = 0.05,
		/** Called with the image when a tile is clicked. @type {(img: GalleryImage) => void} */
		onselect = () => {}
	} = $props();

	// Globe orientation.
	let rx = $state(-10);
	let ry = $state(0);

	let dragging = $state(false);
	let paused = $state(false);
	let reduceMotion = $state(false);

	// Scene size -> scale the sphere so it always fits the viewport.
	let sceneW = $state(0);
	let sceneH = $state(0);
	let fit = $derived(
		Math.max(0.3, Math.min(1.15, Math.min(sceneW, sceneH) / (radius * 2 + tileSize)))
	);

	/**
	 * Fibonacci-sphere transform for tile i of n: positions the tile on the
	 * sphere AND orients it to face outward, in a single transform.
	 * @param {number} i @param {number} n @param {number} r
	 */
	function tileTransform(i, n, r) {
		const golden = Math.PI * (3 - Math.sqrt(5));
		const y = 1 - (i / Math.max(n - 1, 1)) * 2; // 1 -> -1
		const lat = Math.asin(Math.max(-1, Math.min(1, y))); // -PI/2 .. PI/2
		const lon = i * golden;
		const latDeg = (lat * 180) / Math.PI;
		const lonDeg = (lon * 180) / Math.PI;
		return `rotateY(${lonDeg}deg) rotateX(${-latDeg}deg) translateZ(${r}px)`;
	}

	let tiles = $derived(
		images.map((img, i) => ({ img, transform: tileTransform(i, images.length, radius) }))
	);

	let backingSize = $derived(radius * 1.92 * fit);

	// ── Pointer drag + inertia ──
	let lastX = 0;
	let lastY = 0;
	let velX = 0;
	let velY = 0;
	let moved = 0;

	/** @param {PointerEvent} e */
	function onPointerDown(e) {
		dragging = true;
		moved = 0;
		lastX = e.clientX;
		lastY = e.clientY;
		velX = 0;
		velY = 0;
	}

	/** @param {PointerEvent} e */
	function onPointerMove(e) {
		if (!dragging) return;
		const dx = e.clientX - lastX;
		const dy = e.clientY - lastY;
		lastX = e.clientX;
		lastY = e.clientY;
		moved += Math.abs(dx) + Math.abs(dy);
		ry += dx * 0.25;
		rx = Math.max(-85, Math.min(85, rx - dy * 0.25));
		velX = dx * 0.25;
		velY = dy * 0.25;
	}

	function onPointerUp() {
		dragging = false;
	}

	onMount(() => {
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
		reduceMotion = mq.matches;
		const onMq = () => (reduceMotion = mq.matches);
		mq.addEventListener?.('change', onMq);

		let raf = 0;
		function loop() {
			if (!dragging) {
				// Inertia from the last drag.
				if (Math.abs(velX) > 0.01 || Math.abs(velY) > 0.01) {
					ry += velX;
					rx = Math.max(-85, Math.min(85, rx - velY));
					velX *= 0.94;
					velY *= 0.94;
				} else if (autoRotate && !paused && !reduceMotion) {
					ry += rotationSpeed;
				}
			}
			raf = requestAnimationFrame(loop);
		}
		raf = requestAnimationFrame(loop);

		const upHandler = () => (dragging = false);
		window.addEventListener('pointerup', upHandler);

		return () => {
			cancelAnimationFrame(raf);
			mq.removeEventListener?.('change', onMq);
			window.removeEventListener('pointerup', upHandler);
		};
	});

	/** @param {GalleryImage} img */
	function handleTileClick(img) {
		// Ignore clicks that were actually drags.
		if (moved > 6) return;
		onselect(img);
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="scene"
	class:dragging
	role="application"
	aria-label="Rotating image gallery globe. Drag to explore."
	bind:clientWidth={sceneW}
	bind:clientHeight={sceneH}
	onpointerdown={onPointerDown}
	onpointermove={onPointerMove}
	onpointerup={onPointerUp}
	onmouseenter={() => (paused = true)}
	onmouseleave={() => (paused = false)}
>
	<div class="globe_backing" style="width:{backingSize}px; height:{backingSize}px;"></div>

	<div class="globe" style="transform: scale({fit}) rotateX({rx}deg) rotateY({ry}deg);">
		{#each tiles as tile, i (i)}
			<button
				class="tile"
				type="button"
				style="transform: {tile.transform}; width:{tileSize}px; height:{tileSize}px; margin-left:{-tileSize /
					2}px; margin-top:{-tileSize / 2}px;"
				onclick={() => handleTileClick(tile.img)}
				aria-label={tile.img.caption}
				tabindex="-1"
			>
				<img class="tile_img" src={tile.img.src} alt={tile.img.alt} loading="lazy" draggable="false" />
			</button>
		{/each}
	</div>

	<div class="vignette" aria-hidden="true"></div>
</div>

<style>
	.scene {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		perspective: 1100px;
		cursor: grab;
		touch-action: none;
		user-select: none;
	}

	.scene.dragging {
		cursor: grabbing;
	}

	/* Solid maroon disc behind the globe so the silhouette reads as a filled sphere. */
	.globe_backing {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		border-radius: 50%;
		background: radial-gradient(
			circle at 38% 32%,
			#a8242a 0%,
			#7a161b 32%,
			#4d0d12 62%,
			#2a070a 100%
		);
		box-shadow:
			inset -40px -50px 120px rgba(0, 0, 0, 0.7),
			inset 30px 30px 90px rgba(255, 180, 120, 0.12),
			0 0 120px rgba(148, 21, 24, 0.35);
		filter: blur(1px);
	}

	.globe {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 0;
		height: 0;
		transform-style: preserve-3d;
		will-change: transform;
	}

	.tile {
		position: absolute;
		left: 0;
		top: 0;
		padding: 0;
		border: none;
		background: #2a070a;
		border-radius: 10px;
		overflow: hidden;
		cursor: pointer;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.45);
		transition:
			box-shadow 0.25s ease,
			outline-color 0.2s ease;
		outline: 0 solid rgba(250, 197, 73, 0);
	}

	.tile_img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
		-webkit-user-drag: none;
	}

	.tile:hover {
		outline: 3px solid rgba(250, 197, 73, 0.95);
		outline-offset: 0;
		box-shadow: 0 8px 28px rgba(0, 0, 0, 0.6);
		z-index: 2;
	}

	.tile:hover .tile_img {
		transform: scale(1.16);
	}

	.tile:focus-visible {
		outline: 3px solid #fac549;
	}

	/* Edge darkening for depth + to fade the silhouette into the backdrop. */
	.vignette {
		position: absolute;
		inset: 0;
		pointer-events: none;
		background: radial-gradient(
			circle at 50% 50%,
			rgba(0, 0, 0, 0) 52%,
			rgba(20, 4, 6, 0.45) 78%,
			rgba(10, 2, 3, 0.85) 100%
		);
	}
</style>
