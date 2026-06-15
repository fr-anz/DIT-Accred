<script>
	import { X } from 'lucide-svelte';
	import ImageGlobe from '$lib/components/ImageGlobe.svelte';
	import { galleryImages } from '$lib/data/galleryImages.js';

	/** @typedef {{ src: string; alt: string; caption: string }} GalleryImage */

	/** @type {GalleryImage | null} */
	let selected = $state(null);

	/** @param {GalleryImage} img */
	function openImage(img) {
		selected = img;
	}

	function closeImage() {
		selected = null;
	}
</script>

<svelte:head>
	<title>Gallery | DIT-PUP</title>
	<meta name="robots" content="noindex, nofollow" />
	<meta name="description" content="An interactive globe of DIT-PUP accreditation evidence and milestones." />
</svelte:head>

<svelte:window onkeydown={(e) => e.key === 'Escape' && closeImage()} />

<main class="gallery_stage">
	<header class="stage_head">
		<p class="stage_kicker">DIT • PUP</p>
		<h1 class="stage_title">ACCREDITATION GLOBE</h1>
	</header>

	<div class="globe_wrap">
		<ImageGlobe images={galleryImages} radius={340} tileSize={112} onselect={openImage} />
	</div>

	<p class="stage_hint">Drag to explore • Click an image to view</p>
</main>

<!-- ─────────────────────────────────────────────
  LIGHTBOX
───────────────────────────────────────────── -->
{#if selected}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="lightbox_overlay" onclick={closeImage} role="dialog" aria-modal="true">
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="lightbox_card" onclick={(e) => e.stopPropagation()}>
			<button class="lightbox_close" onclick={closeImage} aria-label="Close image">
				<X size={22} />
			</button>
			<img class="lightbox_img" src={selected.src} alt={selected.alt} />
			<p class="lightbox_caption">{selected.caption}</p>
		</div>
	</div>
{/if}

<style>
	:global(html),
	:global(body) {
		margin: 0;
		background: #0d0203;
	}

	.gallery_stage {
		position: relative;
		width: 100%;
		height: 100dvh;
		min-height: 560px;
		overflow: hidden;
		background:
			radial-gradient(circle at 50% 42%, #3a0a0e 0%, #1a0406 45%, #0a0203 100%);
		font-family: 'Inter', sans-serif;
	}

	.stage_head {
		position: absolute;
		top: clamp(1.5rem, 4vw, 3rem);
		left: 0;
		right: 0;
		z-index: 3;
		text-align: center;
		pointer-events: none;
	}

	.stage_kicker {
		font-family: 'Inter', sans-serif;
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.45em;
		text-transform: uppercase;
		color: #fac549;
		margin: 0 0 0.4rem 0;
		opacity: 0.9;
	}

	.stage_title {
		font-family: 'Overpass', 'Inter', sans-serif;
		font-size: clamp(1.6rem, 5vw, 3rem);
		font-weight: 900;
		letter-spacing: 0.08em;
		margin: 0;
		color: #fff;
		text-shadow: 0 2px 30px rgba(0, 0, 0, 0.6);
	}

	.globe_wrap {
		position: absolute;
		inset: 0;
		z-index: 1;
	}

	.stage_hint {
		position: absolute;
		bottom: clamp(1.25rem, 4vw, 2.5rem);
		left: 0;
		right: 0;
		z-index: 3;
		text-align: center;
		pointer-events: none;
		font-size: 0.82rem;
		letter-spacing: 0.06em;
		color: rgba(255, 255, 255, 0.6);
		margin: 0;
	}

	/* ── LIGHTBOX ── */
	.lightbox_overlay {
		position: fixed;
		inset: 0;
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 1.5rem;
		background: rgba(10, 2, 3, 0.82);
		backdrop-filter: blur(8px);
		animation: fadeIn 0.25s ease;
	}

	.lightbox_card {
		position: relative;
		max-width: min(90vw, 720px);
		max-height: 88vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		background: #160405;
		border: 2px solid #941518;
		border-radius: 18px;
		padding: 1.5rem;
		box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
		animation: zoomIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.lightbox_img {
		max-width: 100%;
		max-height: 70vh;
		object-fit: contain;
		border-radius: 10px;
		background: #0a0203;
	}

	.lightbox_caption {
		font-family: 'Inter', sans-serif;
		font-size: 1rem;
		font-weight: 600;
		letter-spacing: 0.02em;
		color: #fac549;
		margin: 0;
		text-align: center;
	}

	.lightbox_close {
		position: absolute;
		top: -14px;
		right: -14px;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: #941518;
		border: 2px solid #fac549;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: transform 0.2s ease;
	}

	.lightbox_close:hover {
		transform: scale(1.1);
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes zoomIn {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
</style>
