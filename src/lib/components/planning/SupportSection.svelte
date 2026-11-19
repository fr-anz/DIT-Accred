<script lang="ts">
	import { ArrowUpRight, Flag, Play } from '@lucide/svelte';
	import { reveal } from '#lib/actions/motion.ts';
	import {
		coreFunctions,
		narrativeReportUrl,
		strategicPriorities,
		supportServices
	} from '#lib/data/qualityAssurance.ts';

	const letters = ['P', 'U', 'P'];

	let monument: HTMLElement;
	let playing = $state(false);
	let lit = $state<number | null>(null);
	/* 0 → 1 as the monument travels up the viewport; drives how high the uplight climbs. */
	let rise = $state(0.75);

	$effect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		let frame = 0;
		const update = () => {
			frame = 0;
			const box = monument.getBoundingClientRect();
			const vh = window.innerHeight;
			rise = Math.min(1, Math.max(0, (vh - box.top) / (vh + box.height * 0.3)));
		};
		const onScroll = () => {
			if (!frame) frame = requestAnimationFrame(update);
		};
		update();
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll);
		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
		};
	});
</script>

<section class="content_section support" id="university-support" aria-labelledby="support-title">
	<div class="section_label">
		<Flag size={26} strokeWidth={1.5} class="section_icon maroon" />
		<h2 class="t_eyebrow" id="support-title">UNIVERSITY SUPPORT FUNCTIONS</h2>
	</div>
	<hr class="section_divider" />

	<div bind:this={monument} class="monument" style:--rise={rise} use:reveal={{ threshold: 0.1 }}>
		<div class="upper">
			<span class="uplight" aria-hidden="true"></span>
			<div class="pylon_wrap">
				<h3 class="pylon_label">Strategic Priorities</h3>
				<div class="pylon">
					<ol class="slabs">
						{#each strategicPriorities as priority, i (priority)}
							<li
								class="slab"
								class:is-lit={lit === i}
								style:--i={i}
								onmouseenter={() => (lit = i)}
								onmouseleave={() => (lit = null)}
							>
								<span class="slab_letter" aria-hidden="true">{letters[i]}</span>
								<span class="slab_body">
									<span class="slab_no" aria-hidden="true">0{i + 1}</span>
									<span class="slab_text">{priority}</span>
								</span>
							</li>
						{/each}
					</ol>
				</div>
			</div>

			<div class="media">
				<div class="bezel">
					<div class="screen">
						{#if playing}
							<iframe
								src="https://www.youtube.com/embed/Lp_x4dWvLs4?autoplay=1"
								title="University Support Functions Video"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								allowfullscreen
							></iframe>
						{:else}
							<button
								class="screen_poster"
								type="button"
								aria-label="Play University Support Functions video"
								onclick={() => (playing = true)}
							>
								<img
									src="/planning/figma/video-preview.jpg"
									alt=""
									loading="lazy"
									width="1241"
									height="590"
								/>
								<span class="play" aria-hidden="true">
									<Play size={30} fill="currentColor" strokeWidth={0} />
								</span>
							</button>
						{/if}
					</div>
				</div>

				<div class="media_copy">
					<p class="support_subtitle">Built on University support</p>
					<p class="support_lede">
						The BSIT program does not stand alone. The University's strategic priorities set its
						direction, four core functions carry the work, and University-wide services support it
						day to day.
					</p>
					<a
						class="cta"
						href={narrativeReportUrl}
						target="_blank"
						rel="external noopener noreferrer"
					>
						<span>View Full Narrative Report</span>
						<span class="cta_icon" aria-hidden="true">
							<ArrowUpRight size={22} strokeWidth={2} />
						</span>
					</a>
				</div>
			</div>
		</div>

		<div class="plinth">
			<h3 class="tier_title">Core Functions</h3>
			<ul class="inscriptions">
				{#each coreFunctions as fn, i (fn)}
					<li class="inscription" style:--i={i}>{fn}</li>
				{/each}
			</ul>
		</div>

		<div class="base">
			<h3 class="tier_title">University Support</h3>
			<ul class="services">
				{#each supportServices as service, i (service.title)}
					<li class="service" style:--i={i}>
						<span class="service_icon" aria-hidden="true">
							<service.icon size={22} strokeWidth={1.6} />
						</span>
						<h4 class="service_name">{service.title}</h4>
						<p class="service_desc">{service.description}</p>
					</li>
				{/each}
			</ul>
		</div>

		<span class="ground" aria-hidden="true"></span>
	</div>
</section>

<style>
	.support .section_label .t_eyebrow {
		margin: 0;
	}

	/* One monument: the upper storey (pylon + media) stands on a gold plinth,
	   which stands on a maroon base. Each tier steps out a little wider. */
	.monument {
		--title-w: clamp(160px, 13vw, 250px);
		--concrete-side: #bdb6ab;
		--concrete-face: #f7f5f1;
		--concrete-lit: #fdfcf9;
		--slit: #2a2420;
		--upper-h: clamp(500px, 40vw, 780px);
		position: relative;
		display: grid;
		max-width: 1640px;
		margin: 0 auto;
	}

	/* Shared uplight washing up from the plinth over both columns. */
	.uplight {
		position: absolute;
		inset: 0 -8%;
		background: radial-gradient(
			ellipse 55% calc(40% + var(--rise) * 55%) at 50% 100%,
			#fac54938,
			transparent 72%
		);
		pointer-events: none;
	}

	.upper {
		position: relative;
		display: grid;
		grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
		gap: clamp(36px, 4vw, 84px);
		align-items: stretch;
		margin-inline: 5%;
		min-height: var(--upper-h);
	}

	/* ── The pylon ── */
	.pylon_wrap {
		position: relative;
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		gap: clamp(22px, 2vw, 40px);
	}
	.pylon_label {
		display: flex;
		align-items: center;
		gap: clamp(16px, 1.4vw, 26px);
		margin: 0;
		padding-inline: clamp(24px, 2.4vw, 46px) clamp(4px, 0.6vw, 10px);
		writing-mode: vertical-rl;
		rotate: 180deg;
		color: var(--c-maroon);
		font: 700 clamp(15px, 1.15vw, 22px) / 1 var(--font-heading);
		letter-spacing: var(--track-title);
		white-space: nowrap;
	}
	.pylon_label::after {
		content: '';
		flex: 1;
		width: 0;
		border-left: 1.5px dashed var(--c-gold);
	}
	.pylon {
		position: relative;
		overflow: hidden;
	}
	.slabs {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: clamp(4px, 0.35vw, 6px);
		height: 100%;
		margin: 0;
		padding: 0;
		list-style: none;
		background: var(--slit);
	}
	.slab {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		padding: clamp(30px, 3.2vw, 60px) clamp(12px, 1.1vw, 22px) clamp(26px, 2.6vw, 50px)
			clamp(18px, 1.6vw, 30px);
		overflow: hidden;
		/* Flat slab: a narrow shaded return on the left, then one lit face. */
		background:
			repeating-linear-gradient(
				0deg,
				transparent 0 calc(16.66% - 1px),
				#0000000d calc(16.66% - 1px) 16.66%
			),
			linear-gradient(
				90deg,
				var(--concrete-side) 0 9%,
				#d9d3ca 9% 10%,
				var(--concrete-face) 10%,
				var(--concrete-lit) 60%,
				#efebe4 100%
			);
		text-align: center;
	}
	/* Uplight on the concrete; it climbs with --rise and floods a slab on hover. */
	.slab::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(
			0deg,
			#fac549a6 0,
			#fac54933 calc(var(--rise) * 38%),
			#fac54900 calc(var(--rise) * 75%)
		);
		mix-blend-mode: multiply;
		opacity: 0.6;
		transition: opacity 0.5s ease;
	}
	.slab.is-lit::before {
		opacity: 1;
	}
	.slab > * {
		position: relative;
		z-index: 1;
	}
	.slab_letter {
		color: #1f1b18;
		font: 800 clamp(52px, 6.2vw, 120px) / 0.9 var(--font-display);
		text-shadow: 0 10px 18px #00000021;
		transition:
			color 0.45s ease,
			translate 0.6s var(--motion-ease);
	}
	.slab.is-lit .slab_letter {
		color: var(--c-maroon);
		translate: 0 -6px;
	}
	.slab_body {
		display: grid;
		justify-items: center;
		align-content: start;
		gap: clamp(8px, 0.8vw, 14px);
		min-height: calc(clamp(30px, 2.6vw, 50px) + 3 * 1.3 * clamp(14px, 1.1vw, 21px) + 14px);
	}
	.slab_no {
		color: #b5ab9e;
		font: 800 clamp(26px, 2.4vw, 46px) / 1 var(--font-display);
		letter-spacing: 0.04em;
		text-shadow:
			0 1px 0 #ffffff,
			0 -1px 0 #0000001a;
		transition: color 0.45s ease;
	}
	.slab.is-lit .slab_no {
		color: var(--c-gold-dark);
	}
	.slab_text {
		max-width: 15ch;
		color: #3a332c;
		font: 700 clamp(13px, 1.05vw, 20px) / 1.3 var(--font-heading);
		hyphens: auto;
		letter-spacing: 0.03em;
	}

	/* ── Media: video in a concrete bezel, copy resting on the plinth ── */
	.media {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: clamp(28px, 2.6vw, 52px);
		padding-bottom: clamp(26px, 2.6vw, 50px);
	}
	.bezel {
		padding: clamp(10px, 0.9vw, 16px);
		background: linear-gradient(
			90deg,
			var(--concrete-side) 0 2.5%,
			var(--concrete-face) 2.5%,
			var(--concrete-lit) 60%,
			#efebe4
		);
		box-shadow:
			inset 0 0 0 1px #0000000f,
			0 24px 40px -26px #1a161466;
	}
	.screen {
		position: relative;
		aspect-ratio: 1241 / 590;
		overflow: hidden;
		border: clamp(4px, 0.35vw, 6px) solid var(--slit);
		background: var(--slit);
	}
	.screen iframe {
		display: block;
		width: 100%;
		height: 100%;
		border: 0;
	}
	.screen_poster {
		display: grid;
		place-items: center;
		width: 100%;
		height: 100%;
		padding: 0;
		border: 0;
		background: none;
		cursor: pointer;
	}
	.screen_poster img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition:
			scale 0.8s var(--motion-ease),
			filter 0.5s ease;
	}
	.screen_poster::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(0deg, #5c0f1640, transparent 45%);
	}
	.screen_poster:hover img,
	.screen_poster:focus-visible img {
		scale: 1.04;
		filter: saturate(1.1);
	}
	.screen_poster:focus-visible {
		outline: 3px solid var(--c-gold-light);
		outline-offset: -3px;
	}
	.play {
		position: relative;
		z-index: 1;
		display: grid;
		place-items: center;
		width: clamp(56px, 5vw, 96px);
		aspect-ratio: 1;
		padding-left: 5px;
		border-radius: 50%;
		color: var(--c-maroon-deep);
		background: var(--grad-gold);
		box-shadow:
			0 0 0 6px #fac54940,
			0 16px 34px #1a161466;
		transition: scale 0.35s var(--motion-ease);
	}
	.play::before {
		content: '';
		position: absolute;
		inset: -6px;
		border: 2px solid var(--c-gold-light);
		border-radius: 50%;
		opacity: 0;
	}
	.screen_poster:hover .play {
		scale: 1.1;
	}

	.support_subtitle {
		display: flex;
		align-items: center;
		gap: clamp(14px, 1.5vw, 28px);
		margin: 0 0 clamp(14px, 1.2vw, 22px);
		color: var(--c-maroon);
		font: italic 600 clamp(20px, 1.8vw, 34px) / 1.25 var(--font-display);
		letter-spacing: 0.01em;
	}
	.support_subtitle::after {
		content: '';
		flex: 1;
		min-width: 40px;
		height: 2px;
		background: var(--grad-gold);
	}
	.support_lede {
		max-width: 50ch;
		margin: 0 0 clamp(22px, 2vw, 38px);
		font-size: clamp(15px, 1.12vw, 21px);
		line-height: 1.6;
	}
	.cta {
		display: inline-flex;
		align-items: center;
		gap: clamp(16px, 1.4vw, 26px);
		padding: clamp(8px, 0.7vw, 12px) clamp(8px, 0.7vw, 12px) clamp(8px, 0.7vw, 12px)
			clamp(22px, 1.8vw, 34px);
		border: 2px solid var(--c-maroon);
		border-radius: 999px;
		color: var(--c-maroon);
		background: #ffffffb3;
		font: 700 clamp(15px, 1.1vw, 21px) / 1 var(--font-heading);
		letter-spacing: var(--track-tight);
		text-decoration: none;
		transition:
			background-color 0.3s ease,
			color 0.3s ease;
	}
	.cta_icon {
		display: grid;
		place-items: center;
		width: clamp(38px, 2.8vw, 52px);
		aspect-ratio: 1;
		border-radius: 50%;
		color: var(--c-gold-light);
		background: var(--c-maroon);
		transition:
			rotate 0.4s var(--motion-ease),
			color 0.3s ease;
	}
	.cta:hover,
	.cta:focus-visible {
		color: var(--c-gold-light);
		background: var(--c-maroon);
	}
	.cta:hover .cta_icon,
	.cta:focus-visible .cta_icon {
		rotate: 45deg;
		color: var(--c-maroon-deep);
		background: var(--grad-gold);
	}

	/* ── Plinth and base ── */
	.tier_title {
		display: flex;
		align-items: center;
		margin: 0;
		padding: clamp(18px, 1.6vw, 30px) clamp(20px, 2vw, 40px);
		font: 700 clamp(17px, 1.35vw, 26px) / 1.15 var(--font-heading);
		letter-spacing: var(--track-title);
	}
	.plinth {
		position: relative;
		z-index: 1;
		display: grid;
		grid-template-columns: var(--title-w) minmax(0, 1fr);
		margin-inline: 2.5%;
		background: var(--grad-gold);
		box-shadow:
			inset 0 3px 0 #ffffff66,
			0 10px 20px -12px #5c0f1680;
	}
	.plinth .tier_title {
		color: var(--c-maroon-deep);
		background: #ffffff40;
	}
	.inscriptions {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.inscription {
		display: grid;
		place-items: center;
		padding: clamp(18px, 1.6vw, 30px) clamp(12px, 1.1vw, 20px);
		color: var(--c-maroon-deep);
		font: 700 clamp(14px, 1.15vw, 22px) / 1.25 var(--font-heading);
		letter-spacing: 0.03em;
		text-align: center;
		box-shadow: inset 1px 0 0 #5c0f1626;
		transition: background-color 0.3s ease;
	}
	.inscription:hover {
		background: #ffffff2e;
	}

	.base {
		display: grid;
		grid-template-columns: var(--title-w) minmax(0, 1fr);
		background: var(--panel-maroon);
	}
	.base .tier_title {
		align-items: flex-start;
		padding-top: clamp(28px, 2.6vw, 50px);
		color: var(--c-gold-light);
		box-shadow: inset -1px 0 0 #ffffff1a;
	}
	.services {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.service {
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: clamp(26px, 2.4vw, 46px) clamp(20px, 2vw, 38px);
	}
	.service + .service {
		box-shadow: inset 1px 0 0 #ffffff1a;
	}
	.service_icon {
		display: grid;
		place-items: center;
		width: clamp(40px, 2.8vw, 52px);
		aspect-ratio: 1;
		margin-bottom: 6px;
		border: 1.5px solid #fac54966;
		border-radius: 50%;
		color: var(--c-gold-light);
		transition:
			background-color 0.3s ease,
			color 0.3s ease,
			rotate 0.5s var(--motion-ease);
	}
	.service:hover .service_icon {
		background: var(--c-gold-light);
		color: var(--c-maroon-deep);
		rotate: -10deg;
	}
	.service_name {
		margin: 0;
		color: var(--c-surface);
		font: 700 clamp(18px, 1.4vw, 27px) / 1.2 var(--font-heading);
		letter-spacing: 0.02em;
	}
	.service_desc {
		margin: 0;
		color: #ffffffcc;
		font-size: clamp(15px, 1.05vw, 20px);
		line-height: 1.5;
	}
	.ground {
		display: block;
		height: clamp(12px, 1vw, 18px);
		margin-inline: -1.5%;
		background: var(--c-shell);
		box-shadow: 0 30px 40px -24px #1a161440;
	}

	/* ── Motion: base, plinth, then the pylon rises and the media settles in ── */
	@media (prefers-reduced-motion: no-preference) {
		.play::before {
			animation: play-ring 2.4s ease-out infinite;
		}
		.monument:global(.reveal-pending) :is(.ground, .base, .plinth, .media, .pylon_label) {
			opacity: 0;
			translate: 0 24px;
			transition:
				opacity 0.6s ease,
				translate 0.8s var(--motion-ease);
		}
		.monument:global(.reveal-pending) .base {
			transition-delay: 0.1s;
		}
		.monument:global(.reveal-pending) .plinth {
			transition-delay: 0.2s;
		}
		.monument:global(.reveal-pending) .slab {
			translate: 0 102%;
			transition: translate 1.3s cubic-bezier(0.22, 1, 0.36, 1) calc(0.4s + var(--i) * 0.16s);
		}
		.monument:global(.reveal-pending) .slab_letter {
			opacity: 0;
			scale: 0.7;
			transition:
				opacity 0.5s ease calc(1.3s + var(--i) * 0.16s),
				scale 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) calc(1.3s + var(--i) * 0.16s);
		}
		.monument:global(.reveal-pending) .media {
			transition-delay: 0.9s;
		}
		.monument:global(.reveal-pending) .pylon_label {
			transition-delay: 1.5s;
		}
		.monument:global(.reveal-pending) .uplight {
			opacity: 0;
			transition: opacity 1.6s ease 1s;
		}
		.monument:global(.reveal-pending.is-revealed)
			:is(.ground, .base, .plinth, .slab, .media, .pylon_label, .uplight) {
			opacity: 1;
			translate: 0 0;
		}
		.monument:global(.reveal-pending.is-revealed) .slab_letter {
			opacity: 1;
			scale: 1;
		}
	}
	@keyframes play-ring {
		0% {
			opacity: 0.9;
			scale: 1;
		}
		100% {
			opacity: 0;
			scale: 1.5;
		}
	}

	/* Stacked: copy and video first, then the pylon standing on its plinth. */
	@media (max-width: 1000px) {
		.monument {
			--upper-h: auto;
		}
		.upper {
			grid-template-columns: 1fr;
			margin-inline: 0;
			gap: clamp(40px, 6vw, 64px);
		}
		.media {
			order: -1;
			flex-direction: column-reverse;
			padding-bottom: 0;
		}
		.pylon_wrap {
			grid-template-columns: 1fr;
			justify-self: center;
			width: min(560px, 100%);
			gap: 14px;
		}
		.pylon_label {
			padding-inline: 0;
			writing-mode: horizontal-tb;
			rotate: none;
		}
		.pylon_label::after {
			width: auto;
			height: 0;
			border-left: 0;
			border-top: 1.5px dashed var(--c-gold);
		}
		.slabs {
			height: clamp(480px, 80vw, 640px);
		}
		.plinth,
		.base {
			grid-template-columns: 1fr;
			margin-inline: 0;
		}
		.base .tier_title {
			padding-bottom: 0;
			box-shadow: none;
		}
		.plinth {
			margin-inline: 2%;
		}
		.inscriptions {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
		.inscription:nth-child(n + 3) {
			box-shadow:
				inset 1px 0 0 #5c0f1626,
				inset 0 1px 0 #5c0f1626;
		}
		.services {
			grid-template-columns: 1fr;
		}
		.service + .service {
			box-shadow: inset 0 1px 0 #ffffff1a;
		}
		.ground {
			margin-inline: -2%;
		}
	}
	/* Narrow slabs carry their inscription vertically, like signage on a pylon. */
	@media (max-width: 600px) {
		.slabs {
			height: clamp(460px, 130vw, 600px);
		}
		.slab {
			padding: 22px 6px 20px 12px;
		}
		.slab_letter {
			font-size: clamp(44px, 14vw, 72px);
		}
		.slab_body {
			flex: 1;
			grid-template-rows: auto minmax(0, 1fr);
			min-height: 0;
			margin-top: 14px;
			gap: 14px;
		}
		.slab_no {
			font-size: 22px;
		}
		.slab_text {
			max-width: none;
			max-height: 100%;
			writing-mode: vertical-rl;
			rotate: 180deg;
			font-size: 13px;
			line-height: 1.25;
			text-align: start;
		}
	}
</style>
