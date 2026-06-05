<script>
	import { scatteredImages } from '$lib/data/homeData';

	function imageStyle(image) {
		const blur = image.blur ?? 0;
		const shadow = image.shadow ?? 0;
		const opacity = image.opacity ?? 1;

		return `--w:${image.w}; --h:${image.h}; --x:${image.x}; --y:${image.y}; --op:${opacity}; --shadow:${shadow}px; --blur:${blur}px;`;
	}
</script>

<div class="section5-wrapper">
	<section class="section-5">
		{#each scatteredImages as image}
			<img class="bg-rect" alt="" src={image.src} style={imageStyle(image)} />
		{/each}

		<h3 class="subtitle-top">we build systems that</h3>

		<h1 class="main-title">that solve real problems —</h1>

		<h3 class="subtitle-bottom">from classrooms to communities,<br />to the country.</h3>

		<p class="description">
			The Department of Information Technology was founded in 1979 as part of PUP's commitment to
			accessible technical education. Forty-six years later, that mission still holds.
		</p>

		<a href="https://www.pup.edu.ph" class="btn-pup" target="_blank" rel="noopener noreferrer">
			Learn More About DIT
		</a>
	</section>
</div>

<style>
	.section5-wrapper {
		overflow-x: hidden;
	}

	.section-5 {
		width: min(100%, 1920px);
		aspect-ratio: 1920 / 1596;
		margin: 0 auto;
		position: relative;
		overflow: hidden;
		min-height: 560px;
		background: #ffffff;
	}

	.section-5::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: 1;
		pointer-events: none;
		background: radial-gradient(
			ellipse at center,
			rgba(255, 255, 255, 0.96) 0%,
			rgba(255, 255, 255, 0.9) 34%,
			rgba(255, 255, 255, 0.58) 55%,
			rgba(255, 255, 255, 0.08) 82%
		);
	}

	.bg-rect {
		position: absolute;
		width: calc(var(--w) / 1920 * 100%);
		height: auto;
		aspect-ratio: var(--w) / var(--h);
		left: calc(var(--x) / 1920 * 100%);
		top: calc(var(--y) / 1596 * 100%);
		opacity: calc(var(--op, 1) * 0.72);
		filter: sepia(0.45) saturate(0.75) brightness(0.92) blur(var(--blur, 0px));
		box-shadow: var(--shadow, 0px) var(--shadow, 0px) var(--shadow, 0px) rgba(0, 0, 0, 0.15);
		background: #941518;
		object-fit: cover;
		display: block;
		z-index: 0;
	}

	.subtitle-top {
		position: absolute;
		z-index: 2;
		width: 36%;
		left: 32%;
		top: 9%;
		margin: 0;
		text-align: center;
		color: #000000;
		font:
			italic 400 clamp(1.5rem, 3.4vw, 3.5rem) / 1.16 'Inter',
			sans-serif;
	}

	.main-title {
		position: absolute;
		z-index: 2;
		width: 60.3%;
		left: 19.85%;
		top: 20.5%;
		margin: 0;
		text-align: center;
		color: #f5be42;
		font:
			700 clamp(3.5rem, 7.2vw, 8.5rem) / 1.08 'Overpass',
			sans-serif;
		word-wrap: break-word;
	}

	.subtitle-bottom {
		position: absolute;
		z-index: 2;
		width: 52.5%;
		left: 26.1%;
		top: 43%;
		margin: 0;
		text-align: center;
		color: #000000;
		font:
			italic 400 clamp(1.5rem, 3.2vw, 3.5rem) / 1.2 'Inter',
			sans-serif;
	}

	.description {
		position: absolute;
		z-index: 2;
		width: 54%;
		left: 23%;
		top: 61%;
		margin: 0;
		text-align: center;
		color: #000000;
		font:
			400 clamp(1rem, 1.7vw, 1.8rem) / 1.35 'Inter',
			sans-serif;
		text-shadow: 0px 4px 4px rgba(255, 251, 251, 0.25);
	}

	.btn-pup {
		position: absolute;
		z-index: 2;
		left: 35.15%;
		top: 80%;
		width: 29.65%;
		min-height: 8%;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		border-radius: clamp(0.75rem, 2vw, 1.25rem);
		border: clamp(3px, 0.5vw, 6px) #901518 solid;
		text-decoration: none;
		color: #921518;
		font:
			400 clamp(1.1rem, 2.4vw, 2.5rem) 'Inter',
			sans-serif;
		text-align: center;
		padding: 0.75rem 1.25rem;
		box-sizing: border-box;
		transition:
			background-color 0.2s ease,
			color 0.2s ease;
	}

	.btn-pup:hover {
		background-color: #901518;
		color: #ffffff;
	}

	@media (max-width: 768px) {
		.section-5 {
			min-height: 520px;
		}

		.bg-rect {
			opacity: min(var(--op, 1), 0.82);
		}
	}

	@media (max-width: 480px) {
		.section-5 {
			aspect-ratio: auto;
			min-height: 720px;
		}

		.subtitle-top {
			width: 78%;
			left: 11%;
			top: 10%;
			font-size: clamp(1.1rem, 4.8vw, 1.35rem);
			line-height: 1.15;
		}

		.main-title {
			width: 82%;
			left: 9%;
			top: 19%;
			font-size: clamp(2.35rem, 11.5vw, 3.1rem);
			line-height: 1.04;
		}

		.subtitle-bottom {
			width: 82%;
			left: 9%;
			top: 50%;
			font-size: clamp(1.1rem, 4.8vw, 1.35rem);
			line-height: 1.2;
		}

		.description {
			width: 80%;
			left: 10%;
			top: 63%;
			font-size: clamp(1rem, 4vw, 1.1rem);
			line-height: 1.35;
		}

		.btn-pup {
			width: 56%;
			left: 22%;
			top: 82%;
			min-height: auto;
			border-width: 3px;
			border-radius: 0.65rem;
			padding: 0.85rem 1rem;
			font-size: 1rem;
			line-height: 1.2;
		}

		.bg-rect {
			opacity: min(var(--op, 1), 0.72);
		}
	}
</style>
