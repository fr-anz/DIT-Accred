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
			<span class="hero-line hero-line-top" aria-hidden="true">Excellence</span>
			<span class="hero-line hero-line-mid" aria-hidden="true">in</span>
			<span class="hero-line hero-line-bottom" aria-hidden="true"
				>Every <span class="hero-word-gold">Byte</span></span
			>
		</h2>
	</div>
</header>

<style>
	.video-container {
		--hero-exit: 0;
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
		inset: -35% -20%;
		z-index: -1;
		background: radial-gradient(
			ellipse closest-side,
			rgb(0 0 0 / 0.35),
			rgb(0 0 0 / 0.18) 55%,
			transparent
		);
	}

	.hero-title {
		margin: 0;
		font-family: var(--font-display);
		font-size: clamp(2.25rem, 7vw, 128px);
		font-weight: 700;
		line-height: 1.05;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.hero-line {
		display: block;
		color: #fffdf7;
		/* Drop shadow lives here; the entrance only touches transform/opacity so it never overrides it. */
		filter: drop-shadow(0 4px 24px rgb(0 0 0 / 0.5));
	}

	/* Gradient fill sits on the word itself; background-clip must be on the element holding the text. */
	.hero-word-gold {
		color: var(--c-gold-dark);
		background-image: var(--grad-gold);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	/* Entrance: "Excellence" slides in from the left and "Every Byte" from the right; they converge
	   on the centre, then "in" settles into the gap between them as they land. */
	.video-container {
		--hero-ease-out: cubic-bezier(0.23, 1, 0.32, 1);
	}

	@media (prefers-reduced-motion: no-preference) {
		.hero-title-wrap::before {
			animation: hero-fade-in 2.4s ease-out 0.2s both;
		}
		.hero-line-top {
			animation: hero-line-from-left 1.6s var(--hero-ease-out) 0.3s both;
		}
		.hero-line-bottom {
			animation: hero-line-from-right 1.6s var(--hero-ease-out) 0.3s both;
		}
		.hero-line-mid {
			animation: hero-mid-in 1s var(--hero-ease-out) 1.05s both;
		}
	}

	/* Reduced motion: no travel, just a gentle fade so the title still arrives softly. */
	@media (prefers-reduced-motion: reduce) {
		.hero-line,
		.hero-title-wrap::before {
			animation: hero-fade-in 0.6s ease 0.2s both;
		}
	}

	@keyframes hero-fade-in {
		from {
			opacity: 0;
		}
	}

	@keyframes hero-line-from-left {
		from {
			opacity: 0;
			transform: translateX(-60%);
		}
	}

	@keyframes hero-line-from-right {
		from {
			opacity: 0;
			transform: translateX(60%);
		}
	}

	@keyframes hero-mid-in {
		from {
			opacity: 0;
			transform: scale(0.94);
		}
	}
</style>
