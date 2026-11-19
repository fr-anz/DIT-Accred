<script lang="ts">
	import { onMount, tick } from 'svelte';
	import ditSeal from '#lib/assets/dit-seal-gold.svg';
	import { programObjectives } from '#lib/data/homeData.ts';

	const FOUNDED = 1979;
	const years = new Date().getFullYear() - FOUNDED;

	const description =
		'is a four-year degree program which focuses on the study of computer utilization and computer software to plan, install, customize, operate, manage, administer and maintain information technology infrastructure';
	const words = description.split(' ');

	/* Scroll timeline, as a fraction of the whole section (0 → 1). The scene
	   pins at 0.2, once the section top reaches the viewport top. */
	const T = {
		rise: [0.04, 0.2],
		titleOut: [0.23, 0.31],
		move: [0.23, 0.33],
		descIn: [0.3, 0.34],
		words: [0.34, 0.5],
		descOut: [0.53, 0.56],
		legacyIn: [0.56, 0.59],
		count: [0.58, 0.69],
		legacyOut: [0.71, 0.74],
		objIn: [0.74, 0.77],
		pillars: [0.79, 0.86, 0.93]
	};

	/* Each pillar's slice of Pylon-nobg.svg, split along the seams between
	   pillars. The image itself masks the outer silhouette. */
	const pillars = [
		'polygon(0 0, 33.6% 0, 33.6% 14%, 28.6% 100%, 0 100%)',
		'polygon(33.6% 0, 57.1% 0, 57.1% 100%, 28.6% 100%, 33.6% 14%)',
		'polygon(57.1% 0, 100% 0, 100% 100%, 57.1% 100%)'
	];
	const span = ([a, b]: number[]) => `--a:${a};--d:${b - a}`;
	const window2 = (enter: number[], exit: number[]) =>
		`${span(enter)};--xa:${exit[0]};--xd:${exit[1] - exit[0]}`;

	let section: HTMLElement | undefined = $state();
	let live = $state(false);
	let count = $state(years);

	onMount(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		let target = 0;
		let current = 0;
		let frame = 0;
		const clamp = (v: number) => Math.min(Math.max(v, 0), 1);

		const step = () => {
			current += (target - current) * 0.16;
			if (Math.abs(target - current) < 0.0004) current = target;
			section?.style.setProperty('--p', current.toFixed(4));
			const [a, b] = T.count;
			count = Math.round(clamp((current - a) / (b - a)) * years);
			frame = current === target ? 0 : requestAnimationFrame(step);
		};
		const measure = () => {
			if (!section) return;
			const rect = section.getBoundingClientRect();
			target = clamp((window.innerHeight - rect.top) / rect.height);
			if (!frame) frame = requestAnimationFrame(step);
		};

		live = true;
		tick().then(() => {
			measure();
			current = target;
			step();
		});
		window.addEventListener('scroll', measure, { passive: true });
		window.addEventListener('resize', measure, { passive: true });
		return () => {
			window.removeEventListener('scroll', measure);
			window.removeEventListener('resize', measure);
			if (frame) cancelAnimationFrame(frame);
		};
	});
</script>

<section class="story" class:is-live={live} bind:this={section} aria-labelledby="bsit-title">
	<div class="scene">
		<div class="glow" aria-hidden="true"></div>

		<header class="opening fx" style={window2([-1, 0], T.titleOut)}>
			<h1 id="bsit-title" class="title">
				<span class="title-lead">Bachelor of Science in</span>
				<span class="title-word">Information</span>
				<span class="title-word">Technology</span>
			</h1>
		</header>

		<div class="pylon-rig" style="{span(T.rise)};--ma:{T.move[0]};--md:{T.move[1] - T.move[0]}">
			<img
				class="seal fx"
				src={ditSeal}
				alt=""
				aria-hidden="true"
				style={window2([T.legacyIn[0] - 0.01, T.legacyIn[1] + 0.02], T.objIn)}
			/>
			<div class="pylon">
				<img src="/img/Pylon-nobg.svg" alt="The PUP pylon and its three pillars" />
				{#each pillars as shape, i (shape)}
					<span
						class="pillar-glow fx"
						style:clip-path={shape}
						style={span([T.pillars[i], T.pillars[i] + 0.025])}
						aria-hidden="true"
					></span>
				{/each}
			</div>
		</div>

		<div class="panel panel-desc fx" style={window2(T.descIn, T.descOut)}>
			<p class="manifesto">
				<span class="lead">
					The <strong>Bachelor of Science in Information Technology (BSIT)</strong> program
				</span>
				{#each words as word, i (i)}
					<span
						class="word"
						style="--wa:{T.words[0] + (i / words.length) * (T.words[1] - T.words[0])}"
					>
						{`${word} `}
					</span>
				{/each}
			</p>
		</div>

		<div class="panel panel-legacy fx" style={window2(T.legacyIn, T.legacyOut)}>
			<p class="legacy-figure">
				<span class="legacy-number">{count}</span>
				<span class="legacy-unit">years</span>
			</p>
			<p class="legacy-text">
				of Department's existence.<br />Coding the <strong>PUP Spirit since {FOUNDED}</strong>
			</p>
		</div>

		<div class="panel panel-obj fx" style={span(T.objIn)}>
			<h2 class="obj-title">Program Educational Objectives</h2>
			<p class="obj-intro">
				Within 3-5 years of graduation, Bachelor of Science in Information Technology graduates are
				expected to:
			</p>
			<ol class="obj-list">
				{#each programObjectives as objective, i (objective.number)}
					<li class="obj fx" style={span([T.pillars[i], T.pillars[i] + 0.025])}>
						<span class="obj-number">{objective.number}</span>
						<h3 class="obj-name">{objective.title}</h3>
					</li>
				{/each}
			</ol>
		</div>
	</div>
</section>

<style>
	.story {
		--p: 1;
		--gold: var(--c-gold-light);
		position: relative;
		color: #fff;
		background:
			radial-gradient(ellipse 70% 55% at 50% 100%, rgba(148, 21, 24, 0.55), transparent 70%),
			linear-gradient(180deg, #14030a 0%, #2a050b 45%, #3a070d 100%);
	}

	/* Film grain. */
	.story::after {
		content: '';
		position: absolute;
		inset: 0;
		pointer-events: none;
		opacity: 0.2;
		mix-blend-mode: overlay;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
	}

	/* Progress helpers. Each .fx element reads the section's --p against its
	   own window: --a/--d for entering, --xa/--xd for leaving. */
	.fx {
		--a: -1;
		--d: 1;
		--xa: 2;
		--xd: 1;
		--in: clamp(0, (var(--p) - var(--a)) / var(--d), 1);
		--out: clamp(0, (var(--p) - var(--xa)) / var(--xd), 1);
		--vis: calc(var(--in) - var(--out));
	}

	/* ── Static layout: no JavaScript or reduced motion ── */

	.scene {
		position: relative;
		z-index: 1;
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(280px, 38%);
		grid-template-areas:
			'opening pylon'
			'desc pylon'
			'legacy pylon'
			'obj pylon';
		column-gap: 4vw;
		row-gap: clamp(2rem, 5vw, 4rem);
		max-width: var(--container-max);
		margin-inline: auto;
		padding: var(--section-space) var(--page-pad) 0;
		overflow: hidden;
	}

	.opening {
		grid-area: opening;
	}
	.panel-desc {
		grid-area: desc;
	}
	.panel-legacy {
		grid-area: legacy;
	}
	.panel-obj {
		grid-area: obj;
		padding-bottom: var(--section-space);
	}
	.pylon-rig {
		grid-area: pylon;
		align-self: end;
	}

	.glow {
		position: absolute;
		inset: auto 0 0;
		height: 70%;
		background: radial-gradient(ellipse 40% 60% at 70% 100%, rgba(250, 197, 73, 0.14), transparent);
		pointer-events: none;
	}

	.title {
		margin: 0;
		font-family: var(--font-display);
		font-weight: 800;
		letter-spacing: -0.035em;
	}

	.title > span {
		display: block;
	}

	.title-lead {
		margin-bottom: 0.4em;
		font-family: var(--font-heading);
		font-size: clamp(1.25rem, 2.4vw, 2.25rem);
		font-style: italic;
		font-weight: 600;
		letter-spacing: 0.01em;
		color: var(--gold);
	}

	.title-word {
		font-size: clamp(2.75rem, 7vw, 6.25rem);
		line-height: 0.92;
	}

	.manifesto {
		margin: 0;
		max-width: 26ch;
		font-family: var(--font-heading);
		font-size: clamp(1.4rem, 2.6vw, 2.6rem);
		font-weight: 600;
		line-height: 1.22;
		letter-spacing: -0.005em;
		text-wrap: pretty;
	}

	.lead strong {
		color: var(--gold);
		font-weight: 700;
	}

	.legacy-figure {
		margin: 0;
		display: flex;
		align-items: baseline;
		gap: 0.15em;
		line-height: 0.78;
	}

	.legacy-number {
		font-family: var(--font-display);
		font-size: clamp(8rem, 22vw, 20rem);
		font-weight: 800;
		letter-spacing: -0.05em;
		font-variant-numeric: tabular-nums;
		color: var(--gold);
		background-image: var(--grad-gold);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.legacy-unit {
		font-size: clamp(2rem, 4.5vw, 4rem);
		font-style: italic;
		color: var(--gold);
	}

	.legacy-text {
		margin: clamp(1.25rem, 2.5vw, 2rem) 0 0;
		font-size: clamp(1.05rem, 1.6vw, 1.4rem);
		line-height: 1.45;
		color: rgba(255, 255, 255, 0.8);
	}

	.legacy-text strong {
		color: #fff;
	}

	.obj-title {
		margin: 0;
		font-size: clamp(1.6rem, 3vw, 2.75rem);
		font-weight: 700;
		line-height: 1.1;
		text-wrap: balance;
	}

	.obj-intro {
		margin: 0.75rem 0 0;
		max-width: 44ch;
		font-size: clamp(0.95rem, 1.25vw, 1.1rem);
		line-height: 1.55;
		color: rgba(255, 255, 255, 0.7);
	}

	.obj-list {
		margin: clamp(1.5rem, 3vw, 2.5rem) 0 0;
		padding: 0;
		list-style: none;
		display: grid;
		gap: clamp(0.75rem, 1.6vw, 1.25rem);
	}

	.obj {
		display: grid;
		grid-template-columns: 3.2em 1fr;
		align-items: baseline;
		font-size: clamp(1.15rem, 2.1vw, 2rem);
	}

	.obj-number {
		font-family: var(--font-display);
		font-weight: 800;
		color: var(--gold);
	}

	.obj-name {
		margin: 0;
		font-size: inherit;
		font-weight: 700;
		line-height: 1.15;
	}

	/* The DIT seal rings the monument; its own pylon emblem sits right behind
	   the real one. Gold-only artwork, so it has no backdrop to hide. */
	.pylon-rig {
		position: relative;
	}

	.seal {
		position: absolute;
		top: -16%;
		left: -20%;
		width: 140%;
		max-width: none;
		aspect-ratio: 1;
		opacity: 0.32;
		pointer-events: none;
		user-select: none;
	}

	.pylon {
		position: relative;
		container-type: inline-size;
	}

	.pylon img {
		display: block;
		width: 100%;
		height: auto;
		aspect-ratio: 475.5 / 640.5;
		filter: drop-shadow(-30px 0 50px rgba(0, 0, 0, 0.45));
	}

	.pillar-glow {
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, #fac549 0%, #e9a52a 55%, #ca8106 100%);
		mix-blend-mode: multiply;
		opacity: 0.85;
		pointer-events: none;
		-webkit-mask: url('/img/Pylon-nobg.svg') center / 100% 100% no-repeat;
		mask: url('/img/Pylon-nobg.svg') center / 100% 100% no-repeat;
	}

	/* ── Live: pinned, scroll-scrubbed scene ── */

	.story.is-live {
		--p: 0;
		height: 520svh;
	}

	.is-live .scene {
		position: sticky;
		top: 0;
		display: block;
		height: 100svh;
		max-width: none;
		padding: 0;
	}

	.is-live .glow {
		height: 100%;
		background: radial-gradient(ellipse 45% 55% at 62% 100%, rgba(250, 197, 73, 0.16), transparent);
	}

	.is-live .scene {
		--move-x: 21vw;
		--rest: 40%;
	}

	/* Opening: the program name fills the frame and the pylon rises in front of it,
	   then finishes rising as the name leaves. */
	.is-live .opening {
		position: absolute;
		inset: 11svh 0 auto;
		text-align: center;
		opacity: calc(1 - var(--out));
		translate: 0 calc(var(--out) * -10svh);
		scale: calc(1 - var(--out) * 0.08);
	}

	.is-live .title-lead {
		font-size: clamp(1.25rem, 2.6vw, 2.5rem);
	}

	.is-live .title-word {
		font-size: min(12.5vw, 19svh);
		line-height: 0.88;
		letter-spacing: -0.045em;
	}

	.is-live .pylon-rig {
		--rise: clamp(0, (var(--p) - var(--a)) / var(--d), 1);
		--m: clamp(0, (var(--p) - var(--ma)) / var(--md), 1);
		position: absolute;
		bottom: 0;
		left: 50%;
		width: min(64svh, 72vw);
		translate: calc(-50% + var(--m) * var(--move-x))
			calc((1 - var(--rise)) * 75% + (1 - var(--m)) * var(--rest));
		scale: calc(1 - var(--m) * 0.1);
		transform-origin: 50% 100%;
	}

	.is-live .seal {
		opacity: calc(var(--in) * (0.55 - var(--out) * 0.3));
		scale: calc(0.86 + var(--in) * 0.14);
		rotate: calc((var(--p) - 0.55) * 28deg);
	}

	.is-live .pillar-glow {
		opacity: calc(var(--in) * 0.85);
	}

	.is-live .panel {
		position: absolute;
		top: 50%;
		left: var(--page-pad);
		width: min(46vw, 640px);
		opacity: var(--vis);
		translate: 0 calc(-50% + (1 - var(--in)) * 6svh + var(--out) * -6svh);
		pointer-events: none;
	}

	.is-live .word {
		--lit: clamp(0, (var(--p) - var(--wa)) / 0.012, 1);
		opacity: calc(0.16 + var(--lit) * 0.84);
	}

	.is-live .panel-obj {
		padding-bottom: 0;
	}

	.is-live .obj {
		opacity: calc(0.22 + var(--in) * 0.78);
		translate: calc((1 - var(--in)) * -1rem) 0;
	}

	.is-live .obj-number {
		color: color-mix(in srgb, var(--gold) calc(var(--in) * 100%), rgba(255, 255, 255, 0.5));
	}

	/* ── Narrow / portrait ── */

	@media (max-width: 860px) {
		.scene {
			grid-template-columns: minmax(0, 1fr);
			grid-template-areas: 'opening' 'desc' 'legacy' 'obj' 'pylon';
		}

		.pylon-rig {
			justify-self: center;
			width: min(100%, 380px);
		}

		.panel-obj {
			padding-bottom: 0;
		}

		.is-live .scene {
			--move-x: 0px;
			--rest: 14%;
		}

		.is-live .opening {
			inset: 14svh 0 auto;
		}

		.is-live .pylon-rig {
			width: min(42svh, 78vw);
			scale: calc(1 - var(--m) * 0.25);
		}

		.is-live .panel {
			top: 11svh;
			left: var(--page-pad);
			right: var(--page-pad);
			width: auto;
			translate: 0 calc((1 - var(--in)) * 4svh + var(--out) * -4svh);
		}

		.is-live .manifesto {
			font-size: clamp(1.25rem, 5.4vw, 1.75rem);
		}

		.is-live .legacy-number {
			font-size: min(40vw, 22svh);
		}

		.is-live .obj {
			font-size: clamp(1rem, 4.6vw, 1.35rem);
		}

		.is-live .obj-list {
			margin-top: 1.25rem;
		}
	}
</style>
