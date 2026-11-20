<script>
	import { onMount } from 'svelte';

	let { videoUrl = 'https://cdn.theavenir.dev/videos/home.mov' } = $props();

	/** @type {HTMLElement | undefined} */
	let hero = $state();

	// Drive the exit by scroll position: 0 at the top, 1 once the hero is ~55% scrolled past.
	onMount(() => {
		if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		let frame = 0;
		const update = () => {
			frame = 0;
			if (!hero) return;
			const distance = hero.offsetHeight * 0.55;
			const progress = Math.min(Math.max(window.scrollY / distance, 0), 1);
			hero.style.setProperty('--hero-exit', progress.toFixed(4));
		};
		const onScroll = () => {
			if (!frame) frame = requestAnimationFrame(update);
		};

		update();
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll, { passive: true });
		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
			if (frame) cancelAnimationFrame(frame);
		};
	});
</script>

<header class="video-container" bind:this={hero}>
	<video src={videoUrl} autoplay loop muted playsinline class="video-home"></video>

	<div class="hero-title-wrap">
		<h2 class="hero-title" aria-label="Excellence in Every Byte">
			<span class="hero-line" aria-hidden="true">
				<span class="hero-word hero-word-major hero-w1">Excellence</span>
				<span class="hero-word hero-word-minor hero-w2">in</span>
			</span>
			<span class="hero-line" aria-hidden="true">
				<span class="hero-word hero-word-minor hero-w3">Every</span>
				<span class="hero-word hero-word-major hero-word-gold hero-w4">Byte</span>
			</span>
		</h2>
	</div>
</header>

<style>
	.video-container {
		--hero-exit: 0;
		--hero-ease-out: cubic-bezier(0.23, 1, 0.32, 1);
		position: relative;
		width: 100%;
		min-height: 100dvh;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.video-home {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		object-fit: cover;
		z-index: 1;
	}

	/* Scroll-linked exit lives on the wrapper so it never fights the entrance keyframes. */
	.hero-title-wrap {
		position: relative;
		z-index: 2;
		padding-inline: var(--page-pad, 1.5rem);
		text-align: center;
		pointer-events: none;
		opacity: calc(1 - var(--hero-exit));
		transform: translateY(calc(var(--hero-exit) * -12vh)) scale(calc(1 + var(--hero-exit) * 0.08));
		filter: blur(calc(var(--hero-exit) * 10px));
		will-change: opacity, transform, filter;
	}

	/* Soft dark oval behind the title: dims the bright obelisk only where the words sit. */
	.hero-title-wrap::before {
		content: '';
		position: absolute;
		inset: -45% -12%;
		z-index: -1;
		background: radial-gradient(
			ellipse closest-side,
			rgb(0 0 0 / 0.42),
			rgb(0 0 0 / 0.2) 55%,
			transparent
		);
	}

	/* Two interlocking lines: a major word paired with a minor one on a shared baseline,
	   with the pairing flipped on the second line (EXCELLENCE in / every BYTE). */
	.hero-title {
		margin: 0;
		font-family: var(--font-display);
		font-size: clamp(2.25rem, 10.2vw, 176px);
		line-height: 0.92;
		text-transform: uppercase;
		display: flex;
		flex-direction: column;
		align-items: center;
		row-gap: 0.12em;
	}

	.hero-line {
		display: flex;
		align-items: baseline;
		justify-content: center;
		column-gap: 0.14em;
		white-space: nowrap;
		/* Drop shadow lives here; the entrance only touches the words, so it never overrides it. */
		filter: drop-shadow(0 4px 24px rgb(0 0 0 / 0.5));
	}

	.hero-word {
		display: inline-block;
	}

	.hero-word-major {
		font-weight: 800;
		letter-spacing: -0.015em;
		color: #fffdf7;
	}

	.hero-word-minor {
		font-size: 0.4em;
		font-weight: 700;
		letter-spacing: 0.16em;
		/* Cancel the trailing tracking so the pair stays optically centred. */
		margin-inline-end: -0.16em;
		color: var(--c-gold-light);
	}

	/* Gold fill plus a highlight band parked off-canvas; the entrance sweeps it across once.
	   background-clip must be on the element holding the text. */
	.hero-word-gold {
		/* Montserrat's Y/T kerning pair pulls the T's bar into the Y's arm at 800 weight. */
		font-kerning: none;
		letter-spacing: 0.02em;
		margin-inline-end: -0.02em;
		color: var(--c-gold-dark);
		background-image:
			linear-gradient(105deg, transparent 40%, rgb(255 248 220 / 0.85) 50%, transparent 60%),
			var(--grad-gold);
		background-size:
			200% 100%,
			100% 100%;
		background-position:
			150% 0,
			0 0;
		background-repeat: no-repeat;
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	@supports not ((background-clip: text) or (-webkit-background-clip: text)) {
		.hero-word-gold {
			background: none;
			-webkit-text-fill-color: currentColor;
		}
	}

	/* Entrance: the two major words rise out of a baseline mask, then the minor words slide
	   out from their partners, then light sweeps across BYTE. Runs once per page load. */
	@media (prefers-reduced-motion: no-preference) {
		.hero-title-wrap::before {
			animation: hero-fade-in 2.4s ease-out 0.2s both;
		}
		.hero-w1 {
			animation: hero-rise 1.2s var(--hero-ease-out) 0.25s both;
		}
		.hero-w4 {
			animation:
				hero-rise 1.2s var(--hero-ease-out) 0.35s both,
				hero-shimmer 1.4s ease-in-out 1.45s both;
		}
		.hero-w2 {
			animation: hero-minor-from-left 0.8s var(--hero-ease-out) 0.95s both;
		}
		.hero-w3 {
			animation: hero-minor-from-right 0.8s var(--hero-ease-out) 1.05s both;
		}
	}

	/* Reduced motion: no travel, just a gentle fade so the title still arrives softly. */
	@media (prefers-reduced-motion: reduce) {
		.hero-word,
		.hero-title-wrap::before {
			animation: hero-fade-in 0.6s ease 0.2s both;
		}
	}

	@keyframes hero-fade-in {
		from {
			opacity: 0;
		}
	}

	/* The clip and the travel share one timeline, so the visible edge stays pinned to the
	   baseline and the word appears to rise out of it. */
	@keyframes hero-rise {
		from {
			transform: translateY(100%);
			clip-path: inset(-0.1em -0.1em 100% -0.1em);
		}
		to {
			transform: translateY(0);
			clip-path: inset(-0.1em -0.1em -0.1em -0.1em);
		}
	}

	@keyframes hero-minor-from-left {
		from {
			opacity: 0;
			filter: blur(4px);
			transform: translateX(-0.75em);
		}
	}

	@keyframes hero-minor-from-right {
		from {
			opacity: 0;
			filter: blur(4px);
			transform: translateX(0.75em);
		}
	}

	@keyframes hero-shimmer {
		from {
			background-position:
				150% 0,
				0 0;
		}
		to {
			background-position:
				-50% 0,
				0 0;
		}
	}
</style>
