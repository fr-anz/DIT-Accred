<script>
	import { Info } from '@lucide/svelte';
	import { reveal } from '#lib/actions/motion.ts';
	import { aboutImages, missionVision } from '#lib/data/homeData.ts';
	import HighlightsBento from './HighlightsBento.svelte';

	/* Split each statement into words so they can rise in one after another. */
	const statements = missionVision.map((item) => {
		let index = 0;
		const words = [
			{ text: item.prefix, strong: false },
			{ text: item.strong, strong: true },
			{ text: item.suffix, strong: false }
		].flatMap(({ text, strong }) =>
			text
				.split(/\s+/)
				.filter(Boolean)
				.map((word) => ({ word, strong, index: index++ }))
		);
		return { ...item, words };
	});

	/** Tilts the photo layers toward the pointer. */
	function parallax(/** @type {HTMLElement} */ node) {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return {};
		const move = (/** @type {PointerEvent} */ event) => {
			const box = node.getBoundingClientRect();
			node.style.setProperty('--px', String((event.clientX - box.left) / box.width - 0.5));
			node.style.setProperty('--py', String((event.clientY - box.top) / box.height - 0.5));
		};
		const leave = () => {
			node.style.setProperty('--px', '0');
			node.style.setProperty('--py', '0');
		};
		node.addEventListener('pointermove', move);
		node.addEventListener('pointerleave', leave);
		return {
			destroy() {
				node.removeEventListener('pointermove', move);
				node.removeEventListener('pointerleave', leave);
			}
		};
	}
</script>

<section class="about-section">
	<div class="about-header">
		<Info size={26} strokeWidth={1.5} class="section_icon maroon" />
		<h2 class="t_eyebrow">About the Department</h2>
	</div>
	<div class="header-line"></div>

	<div class="intro-container">
		<div class="collage" use:parallax use:reveal aria-label="Department activities" role="group">
			<span class="collage_dots" aria-hidden="true"></span>
			{#each aboutImages as image, i (image.src)}
				<figure class="collage_photo photo_{i + 1}">
					<img src={image.src} alt={image.alt} loading="lazy" />
				</figure>
			{/each}
		</div>

		<div class="intro-text">
			<p class="lead" use:reveal style:--d="1">
				The <strong>Bachelor of Science in Information Technology</strong> program provides an engaging
				environment for learners passionate about building modern digital solutions. The program allows
				creative and critical thinkers to transform complex technological concepts into practical, in-demand
				skillsets. Learners are trained in software development, network architecture, and data management,
				with a sharp focus on engineering innovative solutions to real-world problems.
			</p>

			<div class="mv-container">
				{#each statements as item, i (item.title)}
					<article
						class="mv-card"
						class:is-vision={item.title === 'VISION'}
						use:reveal
						style:--d={i + 2}
					>
						<h3 class="t_eyebrow">{item.title}</h3>
						<p class="mv_statement">
							<span class="sr-only">{item.prefix}<strong>{item.strong}</strong>{item.suffix}</span>
							<span aria-hidden="true">
								{#each item.words as w (w.index)}
									<span class="word" class:is-strong={w.strong} style:--w={w.index}>{w.word}</span>
								{/each}
							</span>
						</p>
					</article>
				{/each}
			</div>
		</div>
	</div>

	<HighlightsBento />
</section>

<style>
	.about-section {
		--out: cubic-bezier(0.22, 1, 0.36, 1);
		--spring: cubic-bezier(0.34, 1.56, 0.64, 1);
		width: 100%;
		max-width: var(--container-max);
		margin: 0 auto var(--section-space) auto;
		padding: clamp(2rem, 4vw, 3rem) clamp(1.25rem, 3vw, 2rem);
		box-sizing: border-box;
		background: #ffffff;
		font-family: 'Inter', sans-serif;
		position: relative;
	}

	/* Same pattern as the Planning & QA page: maroon icon + the global
	   .t_eyebrow role (Inter SemiBold, --fs-xl, 0.27em, gold gradient fill). */
	.about-header {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		margin-bottom: 0.85rem;
	}

	.about-header :global(.t_eyebrow) {
		display: inline-block;
	}

	:global(.section_icon.maroon) {
		color: var(--c-maroon);
		flex-shrink: 0;
	}

	.header-line {
		width: 100%;
		height: 2px;
		background-color: #5e5e5e;
		margin: clamp(1.25rem, 3vw, 2rem) 0 clamp(2rem, 5vw, 3.75rem) 0;
	}

	.intro-container {
		display: grid;
		grid-template-columns: minmax(260px, 0.9fr) minmax(0, 1.1fr);
		gap: clamp(2rem, 4.5vw, 4.5rem);
		align-items: center;
		margin-bottom: clamp(3rem, 6vw, 5rem);
	}

	/* ── Photo collage ───────────────────────────── */
	.collage {
		--px: 0;
		--py: 0;
		position: relative;
		width: 100%;
		max-width: 560px;
		aspect-ratio: 5 / 6;
		justify-self: center;
	}

	.collage_photo {
		position: absolute;
		margin: 0;
		overflow: hidden;
		border-radius: 16px;
		background: var(--c-maroon-deep);
		box-shadow: 0 24px 48px -28px rgb(60 10 12 / 0.55);
		transition:
			translate 0.6s var(--out),
			rotate 0.6s var(--out),
			scale 0.6s var(--out);
	}

	.collage_photo img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		filter: saturate(0.92);
		transition:
			scale 1.2s var(--out),
			filter 0.6s ease;
	}

	.collage:hover .collage_photo img {
		scale: 1.05;
		filter: saturate(1.05);
	}

	.photo_1 {
		top: 0;
		left: 0;
		width: 80%;
		height: 62%;
		translate: calc(var(--px) * -10px) calc(var(--py) * -10px);
	}

	.photo_2 {
		right: 0;
		bottom: 6%;
		width: 66%;
		height: 46%;
		border: 6px solid var(--c-surface);
		rotate: 2.5deg;
		translate: calc(var(--px) * 16px) calc(var(--py) * 16px);
		z-index: 2;
	}

	.photo_3 {
		left: 4%;
		bottom: 0;
		width: 36%;
		aspect-ratio: 1;
		border: 5px solid var(--c-surface);
		rotate: -5deg;
		translate: calc(var(--px) * 24px) calc(var(--py) * 24px);
		z-index: 3;
	}

	.collage:hover .photo_2 {
		rotate: 0deg;
	}

	.collage:hover .photo_3 {
		rotate: -1deg;
		scale: 1.04;
	}

	.collage_dots {
		position: absolute;
		top: -4%;
		right: 2%;
		width: 34%;
		height: 30%;
		background: radial-gradient(var(--c-gold-light) 1.6px, transparent 1.8px) 0 0 / 14px 14px;
		opacity: 0.9;
		translate: calc(var(--px) * 6px) calc(var(--py) * 6px);
		transition: translate 0.6s var(--out);
	}

	/* ── Lead copy ───────────────────────────────── */
	.intro-text {
		display: flex;
		flex-direction: column;
		gap: clamp(1.5rem, 3vw, 2.5rem);
	}

	.lead {
		position: relative;
		margin: 0;
		padding-left: clamp(1rem, 2vw, 1.5rem);
		color: var(--c-ink);
		font-size: clamp(0.95rem, 1.3vw, 1.12rem);
		line-height: 1.65;
		text-align: justify;
	}

	.lead::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.35em;
		bottom: 0.35em;
		width: 3px;
		border-radius: 3px;
		background: linear-gradient(var(--c-maroon), var(--c-gold-light));
	}

	.lead strong {
		color: var(--c-maroon);
	}

	/* ── Vision and mission ──────────────────────── */
	.mv-container {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: clamp(0.9rem, 2vw, 1.5rem);
	}

	.mv-card {
		--ink: var(--c-ink);
		--accent: var(--c-maroon);
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: clamp(1.5rem, 3vw, 2.5rem);
		min-height: clamp(220px, 21vw, 290px);
		padding: clamp(1.25rem, 2.4vw, 2rem);
		border-radius: 18px;
		background: #faf6ef;
		border: 1.5px solid color-mix(in srgb, var(--c-gold-dark) 35%, transparent);
		color: var(--ink);
		overflow: hidden;
		isolation: isolate;
		transition:
			translate 0.45s var(--out),
			box-shadow 0.45s ease;
	}

	.mv-card.is-vision {
		--ink: var(--c-surface);
		--accent: var(--c-gold-light);
		border: 0;
		background:
			radial-gradient(
				110% 80% at 100% 0%,
				color-mix(in srgb, var(--c-gold-light) 26%, transparent),
				transparent 60%
			),
			linear-gradient(150deg, var(--c-maroon) 0%, var(--c-maroon-deep) 100%);
	}

	.mv-card:hover {
		translate: 0 -5px;
		box-shadow: 0 26px 40px -28px rgb(60 10 12 / 0.7);
	}

	/* Light sweep across the card on hover. */
	.mv-card::after {
		content: '';
		position: absolute;
		inset: 0;
		z-index: 1;
		pointer-events: none;
		background: linear-gradient(
			105deg,
			transparent 35%,
			rgb(255 255 255 / 0.28) 50%,
			transparent 65%
		);
		translate: -110% 0;
	}

	.mv-card:hover::after {
		translate: 110% 0;
		transition: translate 0.9s var(--out);
	}

	.mv_statement {
		margin: 0;
		font: 700 clamp(1.2rem, 1.95vw, 1.75rem) / 1.22 var(--font-heading);
		letter-spacing: 0.005em;
		color: var(--ink);
		text-wrap: balance;
	}

	.mv_statement .word {
		display: inline-block;
		margin-right: 0.25em;
	}

	.mv_statement .is-strong {
		color: var(--accent);
	}

	.mv-card.is-vision .mv_statement .is-strong {
		background: var(--grad-gold);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}

	/* ── Motion ──────────────────────────────────── */
	@media (prefers-reduced-motion: no-preference) {
		.intro-container :global(.reveal-pending) {
			opacity: 0;
			translate: 0 28px;
			transition:
				opacity 0.8s ease,
				translate 1s var(--out);
			transition-delay: calc(var(--d, 0) * 110ms);
		}

		.intro-container :global(.reveal-pending.is-revealed) {
			opacity: 1;
			translate: 0 0;
		}

		.collage:global(.reveal-pending) .collage_photo {
			opacity: 0;
			scale: 0.92;
		}

		.collage:global(.reveal-pending) .photo_2 {
			transition-delay: 0.2s;
		}

		.collage:global(.reveal-pending) .photo_3 {
			transition-delay: 0.4s;
		}

		.collage:global(.reveal-pending.is-revealed) .collage_photo {
			opacity: 1;
			scale: 1;
		}

		.collage:global(.reveal-pending) .collage_photo {
			transition:
				opacity 0.8s ease,
				scale 1s var(--out);
		}

		.mv-card:global(.reveal-pending) .word {
			opacity: 0;
			translate: 0 0.5em;
			filter: blur(4px);
			transition:
				opacity 0.5s ease,
				translate 0.6s var(--out),
				filter 0.5s ease;
			transition-delay: calc(400ms + var(--w) * 45ms);
		}

		.mv-card:global(.reveal-pending.is-revealed) .word {
			opacity: 1;
			translate: 0 0;
			filter: blur(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.about-section :global(*),
		.about-section :global(*::before),
		.about-section :global(*::after) {
			transition: none !important;
		}

		.mv-card:hover {
			translate: none;
		}
	}

	/* ── Layouts ─────────────────────────────────── */
	@media (max-width: 1024px) {
		:global(.qc-visualizer) {
			max-width: 720px;
		}
	}

	@media (max-width: 900px) {
		.intro-container {
			grid-template-columns: 1fr;
		}

		.collage {
			max-width: 480px;
		}
	}

	@media (max-width: 768px) {
		.about-section {
			padding-inline: 1.25rem;
		}

		.about-header {
			gap: 10px;
		}

		.lead {
			font-size: clamp(0.92rem, 2.8vw, 1.05rem);
		}
	}

	@media (max-width: 560px) {
		.mv-container {
			grid-template-columns: 1fr;
		}

		.mv-card {
			min-height: 200px;
		}
	}
</style>
