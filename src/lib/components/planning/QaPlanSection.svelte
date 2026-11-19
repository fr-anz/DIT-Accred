<script lang="ts">
	import { tick } from 'svelte';
	import { ArrowRight, ArrowUpRight, MoveRight } from '@lucide/svelte';
	import { implementationCycle, qaInitiatives } from '#lib/data/qualityAssurance.ts';

	const currentYear = new Date().getFullYear();
	const count = qaInitiatives.length;
	const rings = [170, 130, 90, 50];

	let section: HTMLElement;
	let track: HTMLElement;
	let road: HTMLElement;

	/* Wide screens pin the section and turn vertical scroll into travel along the
	   road. Everywhere else, and without JS, the same markup reads as a vertical road. */
	let pinned = $state(false);
	let height = $state(0);
	let shift = $state(0);
	let fill = $state(0);
	let progress = $state(0);
	let reached = $state(count + implementationCycle.length);

	$effect(() => {
		const media = window.matchMedia(
			'(min-width: 1000px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)'
		);
		let distance = 0;
		let roadLeft = 0;
		let stops: number[] = [];
		let frame = 0;

		const offsetIn = (el: Element) =>
			el.getBoundingClientRect().left - track.getBoundingClientRect().left;

		const update = () => {
			frame = 0;
			if (!pinned) return;
			progress = Math.min(1, Math.max(0, -section.getBoundingClientRect().top / distance));
			shift = progress * distance;
			const focus = shift + window.innerWidth * 0.62;
			fill = Math.max(0, focus - roadLeft);
			reached = stops.filter((center) => center <= focus).length;
		};

		const measure = async () => {
			pinned = media.matches;
			await tick();
			if (!pinned) {
				reached = count + implementationCycle.length;
				return;
			}
			distance = track.scrollWidth - window.innerWidth;
			height = distance + window.innerHeight;
			roadLeft = offsetIn(road);
			stops = [...track.querySelectorAll('[data-stop]')].map(
				(el) => offsetIn(el) + el.getBoundingClientRect().width / 2
			);
			update();
		};

		const onScroll = () => {
			if (!frame) frame = requestAnimationFrame(update);
		};

		/* Keyboard focus inside the moving track scrolls the page to bring it into view. */
		const onFocus = (event: FocusEvent) => {
			if (!pinned || !(event.target instanceof Element)) return;
			const target = Math.min(
				distance,
				Math.max(0, offsetIn(event.target) - window.innerWidth * 0.35)
			);
			window.scrollTo({ top: section.offsetTop + target, behavior: 'instant' });
		};

		measure();
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', measure);
		media.addEventListener('change', measure);
		section.addEventListener('focusin', onFocus);
		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', measure);
			media.removeEventListener('change', measure);
			section.removeEventListener('focusin', onFocus);
		};
	});
</script>

<section
	bind:this={section}
	class="qa_journey"
	class:is-pinned={pinned}
	id="qa-plan"
	aria-labelledby="qa-plan-title"
	style:height={pinned ? `${height}px` : null}
>
	<div class="journey_pin">
		<p
			class="journey_backdrop"
			aria-hidden="true"
			style:translate={pinned ? `${-shift * 0.35}px 0` : null}
		>
			Quality Assurance Plan · 2025–2028 · Quality Assurance Plan
		</p>

		<div bind:this={track} class="journey_track" style:translate={pinned ? `${-shift}px 0` : null}>
			<header class="journey_intro">
				<h2 class="intro_title" id="qa-plan-title">
					Quality Assurance Plan <span>2025–2028</span>
				</h2>

				<p class="intro_lede">
					<strong>A system-wide commitment to quality.</strong> The University's Quality Assurance Plan
					is a coordinated roadmap for strengthening institutional systems, academic programs, accreditation,
					continuous improvement and global competitiveness. The BSIT program of the Department of Information
					Technology contributes to each of its eleven initiatives.
				</p>
				<p class="intro_cue" aria-hidden="true">
					Scroll to travel the roadmap <MoveRight size={22} strokeWidth={1.8} />
				</p>
			</header>

			<div bind:this={road} class="journey_road" style:--fill="{fill}px">
				<span class="road_traveler" aria-hidden="true"></span>
				<div class="road_sign" aria-hidden="true"></div>

				<ol class="stations">
					{#each qaInitiatives as item, i (item.no)}
						<li class="station" class:down={i % 2 === 1} class:is-reached={i < reached} data-stop>
							<span class="road_node" aria-hidden="true"></span>
							<article class="station_card">
								<div class="card_top">
									<span class="card_no">{item.no}</span>
									<span class="card_icon" aria-hidden="true"><item.icon strokeWidth={1.6} /></span>
								</div>
								<h4 class="card_title">{item.title}</h4>
								<p class="card_desc">{item.description}</p>
								{#if item.link && 'url' in item.link}
									<a
										class="card_link"
										href={item.link.url}
										target="_blank"
										rel="external noopener noreferrer"
									>
										{item.link.label}
										<ArrowUpRight size={15} strokeWidth={2} />
									</a>
								{:else if item.link}
									<a class="card_link" href="#{item.link.anchor}">
										{item.link.label}
										<ArrowRight size={15} strokeWidth={2} />
									</a>
								{/if}
							</article>
						</li>
					{/each}
				</ol>

				<div class="road_sign">
					<p class="sign_kicker">{implementationCycle.length} years</p>
					<h3 class="sign_title">2025–2028 Implementation Cycle</h3>
				</div>

				<ol class="gates">
					{#each implementationCycle as phase, i (phase.year)}
						<li
							class="gate"
							class:is-reached={count + i < reached}
							class:is-current={phase.year === currentYear}
							data-stop
						>
							<span class="gate_year">{phase.year}</span>
							<span class="road_node" aria-hidden="true"></span>
							<div class="gate_body">
								<p class="gate_phase">{phase.phase}</p>
								{#if phase.year === currentYear}
									<p class="gate_now">Current phase</p>
								{/if}
								{#if phase.milestone}
									<p class="gate_milestone">{phase.milestone}</p>
								{/if}
							</div>
						</li>
					{/each}
				</ol>
			</div>

			<footer class="journey_finale" class:is-arrived={progress > 0.97 || !pinned}>
				<svg class="target" viewBox="0 0 400 400" aria-hidden="true">
					<g class="target_rings">
						{#each rings as r, i (r)}
							<circle
								class="ring"
								class:gold={i % 2 === 1}
								cx="200"
								cy="200"
								{r}
								pathLength="1"
								style:--i={i}
							/>
						{/each}
						<circle class="bull" cx="200" cy="200" r="20" />
					</g>
					<g class="arrow">
						<line x1="206" y1="194" x2="338" y2="62" />
						<polygon points="200,200 222,192 208,178" />
						<polygon class="fletch" points="338,62 362,58 352,76 332,80" />
						<polygon class="fletch" points="322,78 346,74 336,92 316,96" />
					</g>
				</svg>
				<p class="finale_text">
					Transforming quality standards into <span>lasting impact.</span>
				</p>
			</footer>
		</div>

		<div class="journey_hud" aria-hidden="true">
			<span class="hud_label">Commitment</span>
			<span class="hud_bar"><span style:scale="{progress} 1"></span></span>
			<span class="hud_label">Impact</span>
		</div>
	</div>
</section>

<style>
	.qa_journey {
		--paper: #fbf3e4;
		--rail: #ecdcb6;
		--road-y: 50%;
		position: relative;
		color: var(--c-ink);
		background:
			radial-gradient(circle at 12% 20%, #fac5491f, transparent 38%),
			radial-gradient(circle at 88% 85%, #9415180f, transparent 40%),
			linear-gradient(180deg, #fffdf8, var(--paper));
		font-family: var(--font-body);
		letter-spacing: 0.02em;
	}
	.journey_backdrop {
		display: none;
	}
	.journey_hud {
		display: none;
	}

	/* ── Shared pieces (vertical road by default) ── */
	.journey_intro {
		max-width: 1920px;
		margin: 0 auto;
		padding: clamp(60px, 6vw, 120px) var(--page-gutter) clamp(30px, 3vw, 60px);
	}
	.intro_title {
		margin: 0 0 clamp(14px, 1.3vw, 24px);
		color: var(--c-maroon);
		font: 800 clamp(40px, 5.2vw, 100px) / 0.98 var(--font-display);
		letter-spacing: -0.01em;
		text-transform: uppercase;
	}
	.intro_title span {
		display: block;
		color: var(--c-gold-dark);
		background-image: var(--grad-gold);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.intro_lede {
		max-width: 60ch;
		margin: 0;
		color: #3a3a3a;
		font-size: clamp(15px, 1.12vw, 21px);
		line-height: 1.6;
	}
	.intro_lede strong {
		color: var(--c-maroon);
	}
	.intro_cue {
		display: none;
	}

	.journey_road {
		--node: 22px;
		position: relative;
		max-width: 1920px;
		margin: 0 auto;
		padding: 0 var(--page-gutter) 0 calc(var(--page-gutter) + 52px);
	}
	.journey_road::before,
	.journey_road::after {
		content: '';
		position: absolute;
		left: calc(var(--page-gutter) + 9px);
		top: 0;
		bottom: 0;
		width: 4px;
		border-radius: 4px;
	}
	.journey_road::before {
		background: var(--rail);
	}
	.journey_road::after {
		background: linear-gradient(var(--c-gold-light), var(--c-gold-dark));
	}
	.road_sign {
		padding: clamp(30px, 3vw, 56px) 0 clamp(18px, 1.6vw, 30px);
	}
	.sign_kicker {
		margin: 0 0 8px;
		color: var(--c-gold-dark);
		font: 700 clamp(11px, 0.8vw, 15px) / 1 var(--font-body);
		letter-spacing: 0.26em;
		text-transform: uppercase;
	}
	.sign_title {
		margin: 0;
		color: var(--c-maroon);
		font: 800 clamp(26px, 2.8vw, 54px) / 1.02 var(--font-display);
		letter-spacing: -0.01em;
		text-transform: uppercase;
	}
	.stations,
	.gates {
		display: grid;
		gap: clamp(16px, 1.5vw, 26px);
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.station,
	.gate {
		position: relative;
	}
	.road_node {
		position: absolute;
		top: 28px;
		left: -52px;
		z-index: 1;
		width: var(--node);
		height: var(--node);
		border: 4px solid var(--rail);
		border-radius: 50%;
		background: var(--c-surface);
		transition:
			border-color 0.4s ease,
			background-color 0.4s ease,
			box-shadow 0.4s ease;
	}
	.is-reached > .road_node {
		border-color: var(--c-gold-dark);
		background: var(--c-gold-dark);
		box-shadow:
			inset 0 0 0 4px var(--c-surface),
			0 0 0 6px #ca81062b;
	}

	.station_card {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: clamp(20px, 1.6vw, 30px);
		border: 1.5px solid #ecdcb6;
		border-radius: 20px;
		background: var(--c-surface);
		box-shadow: 0 16px 36px #5c0f1612;
		transition:
			opacity 0.6s ease,
			translate 0.7s var(--motion-ease),
			border-color 0.4s ease,
			box-shadow 0.4s ease;
	}
	.station_card:hover,
	.station_card:focus-within {
		border-color: var(--c-gold);
		box-shadow: 0 22px 44px #5c0f1624;
	}
	.card_top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
	}
	.card_no {
		color: #ca810640;
		font: 800 clamp(44px, 3.6vw, 70px) / 0.85 var(--font-display);
		letter-spacing: -0.03em;
		transition: color 0.6s ease;
	}
	.is-reached .card_no {
		color: var(--c-gold-dark);
	}
	.card_icon {
		display: grid;
		place-items: center;
		width: clamp(42px, 3vw, 56px);
		height: clamp(42px, 3vw, 56px);
		border-radius: 50%;
		color: var(--c-gold-light);
		background: linear-gradient(150deg, var(--c-maroon), var(--c-maroon-deep));
		transition: rotate 0.6s var(--motion-ease);
	}
	.card_icon :global(svg) {
		width: 50%;
		height: 50%;
	}
	.station_card:hover .card_icon {
		rotate: -12deg;
	}
	.card_title {
		margin: 4px 0 0;
		color: var(--c-maroon);
		font: 700 clamp(18px, 1.3vw, 25px) / 1.2 var(--font-heading);
		letter-spacing: 0.02em;
	}
	.card_desc {
		margin: 0;
		color: #3a3a3a;
		font-size: clamp(14px, 0.95vw, 18px);
		line-height: 1.5;
	}
	.card_link {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		align-self: flex-start;
		margin-top: 4px;
		color: var(--c-gold-dark);
		font: 700 clamp(11px, 0.75vw, 14px) / 1.2 var(--font-heading);
		letter-spacing: 0.08em;
		text-decoration: none;
		text-transform: uppercase;
		transition: color 0.2s ease;
	}
	.card_link :global(svg) {
		flex: 0 0 auto;
		transition: translate 0.25s var(--motion-ease);
	}
	.card_link:hover {
		color: var(--c-maroon);
	}
	.card_link:hover :global(svg) {
		translate: 3px 0;
	}

	.gate {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 18px 0;
	}
	.gate .road_node {
		top: 30px;
	}
	.gate_year {
		color: #ca810659;
		font: 800 clamp(40px, 4.6vw, 92px) / 0.9 var(--font-display);
		letter-spacing: -0.02em;
		transition: color 0.6s ease;
	}
	.gate.is-reached .gate_year {
		color: var(--c-maroon);
	}
	.gate_phase {
		display: inline-block;
		margin: 0;
		padding: 12px 20px;
		border-radius: 14px;
		background: var(--paper);
		color: #2a1c10;
		font: 600 clamp(15px, 1.15vw, 22px) / 1.25 var(--font-heading);
		box-shadow: inset 0 0 0 1.5px #ecdcb6;
	}
	.gate.is-current .gate_phase {
		color: var(--c-surface);
		background: linear-gradient(150deg, var(--c-maroon), var(--c-maroon-deep));
		box-shadow: 0 14px 30px #5c0f1630;
	}
	.gate_now {
		margin: 12px 0 0;
		color: var(--c-gold-dark);
		font: 700 clamp(11px, 0.7vw, 13px) / 1 var(--font-body);
		letter-spacing: 0.22em;
		text-transform: uppercase;
	}
	.gate_milestone {
		max-width: 30ch;
		margin: 8px 0 0;
		color: var(--c-maroon);
		font-style: italic;
		font-size: clamp(13px, 0.9vw, 17px);
		line-height: 1.4;
	}

	.journey_finale {
		display: grid;
		justify-items: center;
		gap: clamp(20px, 2vw, 40px);
		padding: clamp(60px, 6vw, 120px) var(--page-gutter);
		text-align: center;
	}
	.target {
		display: block;
		width: clamp(180px, 18vw, 340px);
		overflow: visible;
	}
	.ring {
		fill: none;
		stroke: var(--c-maroon);
		stroke-width: 15;
		stroke-dasharray: 1;
		stroke-dashoffset: 0;
	}
	.ring.gold {
		stroke: var(--c-gold-light);
	}
	.bull {
		fill: var(--c-maroon);
	}
	.target_rings {
		transform-box: fill-box;
		transform-origin: center;
	}
	.arrow line {
		stroke: var(--c-gold-dark);
		stroke-width: 7;
		stroke-linecap: round;
	}
	.arrow polygon {
		fill: var(--c-gold-dark);
	}
	.arrow .fletch {
		fill: var(--c-maroon-deep);
	}
	.finale_text {
		max-width: 18ch;
		margin: 0;
		color: var(--c-maroon);
		font: italic 800 clamp(28px, 3.4vw, 66px) / 1.08 var(--font-display);
	}
	.finale_text span {
		color: var(--c-gold-dark);
		background-image: var(--grad-gold);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	/* ── Pinned horizontal journey ── */
	.is-pinned .journey_pin {
		position: sticky;
		top: 0;
		height: 100vh;
		overflow: hidden;
	}
	.is-pinned .journey_track {
		display: flex;
		width: max-content;
		height: 100%;
		will-change: translate;
	}
	.is-pinned .journey_backdrop {
		position: absolute;
		top: 50%;
		left: 0;
		display: block;
		margin: 0;
		translate: 0 -50%;
		color: #9415180a;
		font: 800 clamp(160px, 22vh, 260px) / 1 var(--font-display);
		letter-spacing: -0.02em;
		text-transform: uppercase;
		white-space: nowrap;
		pointer-events: none;
	}
	.is-pinned .journey_intro {
		display: flex;
		flex: 0 0 min(80vw, 1250px);
		flex-direction: column;
		justify-content: center;
		margin: 0;
		padding: 90px clamp(40px, 5vw, 100px) 60px var(--page-gutter);
	}
	.is-pinned .intro_cue {
		display: inline-flex;
		align-items: center;
		gap: 12px;
		margin: clamp(30px, 3vw, 56px) 0 0;
		color: var(--c-gold-dark);
		font: 700 clamp(12px, 0.85vw, 16px) / 1 var(--font-heading);
		letter-spacing: 0.14em;
		text-transform: uppercase;
	}

	.is-pinned .journey_road {
		display: grid;
		grid-auto-flow: column;
		grid-auto-rows: minmax(0, 1fr);
		align-items: stretch;
		max-width: none;
		margin: 0;
		padding: 0 clamp(60px, 6vw, 120px) 0 0;
	}
	.is-pinned .journey_road::before,
	.is-pinned .journey_road::after {
		top: var(--road-y);
		bottom: auto;
		left: 0;
		width: auto;
		height: 4px;
		margin-top: -2px;
	}
	.is-pinned .journey_road::before {
		right: 0;
	}
	.is-pinned .journey_road::after {
		width: min(var(--fill), 100%);
		background: linear-gradient(90deg, var(--c-gold-light), var(--c-gold-dark));
	}
	.is-pinned .road_sign {
		display: flex;
		width: clamp(300px, 22vw, 420px);
		flex-direction: column;
		justify-content: flex-end;
		height: var(--road-y);
		padding: 0 clamp(48px, 4vw, 80px) 40px 0;
	}
	.is-pinned .stations + .road_sign {
		width: clamp(380px, 28vw, 520px);
		padding-right: 40px;
		padding-left: clamp(90px, 7vw, 140px);
	}
	.road_traveler {
		display: none;
	}
	.is-pinned .road_traveler {
		position: absolute;
		top: var(--road-y);
		left: min(var(--fill), 100%);
		z-index: 2;
		display: block;
		width: 16px;
		height: 16px;
		margin: -8px 0 0 -8px;
		border-radius: 50%;
		background: var(--c-maroon);
		box-shadow:
			0 0 0 5px #94151826,
			0 0 24px 6px #fac54966;
	}
	.is-pinned .stations {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: clamp(250px, 18vw, 330px);
		grid-auto-rows: minmax(0, 1fr);
		gap: 0;
	}
	.is-pinned .gates {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: clamp(280px, 20vw, 380px);
		grid-auto-rows: minmax(0, 1fr);
		gap: 0;
	}
	.is-pinned .gate {
		padding: 0;
	}
	.is-pinned .road_node {
		top: var(--road-y);
		left: 50%;
		margin: calc(var(--node) / -2) 0 0 calc(var(--node) / -2);
	}
	.is-pinned .station_card {
		position: absolute;
		left: 50%;
		bottom: calc(100% - var(--road-y) + 32px);
		width: clamp(300px, 23vw, 420px);
		translate: -50% 0;
	}
	.is-pinned .station.down .station_card {
		top: calc(var(--road-y) + 32px);
		bottom: auto;
	}
	.is-pinned .station_card::after {
		content: '';
		position: absolute;
		left: 50%;
		top: 100%;
		width: 2px;
		height: 32px;
		margin-left: -1px;
		background: repeating-linear-gradient(var(--c-gold) 0 4px, transparent 4px 8px);
	}
	.is-pinned .station.down .station_card::after {
		top: auto;
		bottom: 100%;
	}
	.is-pinned .station:not(.is-reached) .station_card {
		opacity: 0.35;
		translate: -50% -24px;
	}
	.is-pinned .station.down:not(.is-reached) .station_card {
		translate: -50% 24px;
	}
	.is-pinned .gate_year {
		position: absolute;
		left: 0;
		right: 0;
		bottom: calc(100% - var(--road-y) + 34px);
		text-align: center;
	}
	.is-pinned .gate_body {
		position: absolute;
		left: 50%;
		top: calc(var(--road-y) + 34px);
		width: 86%;
		translate: -50% 0;
		text-align: center;
	}
	.is-pinned .gate_milestone {
		margin-inline: auto;
	}
	.is-pinned .journey_finale {
		flex: 0 0 80vw;
		align-content: center;
		padding-top: 90px;
	}
	.is-pinned .journey_hud {
		position: absolute;
		left: var(--page-gutter);
		right: var(--page-gutter);
		bottom: 28px;
		display: flex;
		align-items: center;
		gap: 16px;
		color: #8a7350;
		font: 700 11px / 1 var(--font-body);
		letter-spacing: 0.22em;
		text-transform: uppercase;
	}
	.hud_bar {
		flex: 1;
		height: 3px;
		border-radius: 3px;
		background: #ecdcb6;
		overflow: hidden;
	}
	.hud_bar span {
		display: block;
		height: 100%;
		background: var(--c-maroon);
		transform-origin: left;
	}

	/* The finale target: rings draw in and the arrow lands once the road ends. */
	@media (prefers-reduced-motion: no-preference) {
		.journey_finale:not(.is-arrived) .ring {
			stroke-dashoffset: 1;
		}
		.ring {
			transition: stroke-dashoffset 1s cubic-bezier(0.65, 0, 0.35, 1) calc(var(--i) * 0.12s);
		}
		.journey_finale:not(.is-arrived) .arrow {
			opacity: 0;
			translate: 160px -160px;
		}
		.arrow {
			transition:
				opacity 0.2s ease 0.7s,
				translate 0.5s cubic-bezier(0.5, 0, 0.75, 0) 0.7s;
		}
		.is-pinned .road_traveler {
			animation: traveler-pulse 1.8s ease-out infinite;
		}
		.journey_finale.is-arrived .target_rings {
			animation: target-hit 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 1.2s;
		}
		.journey_finale:not(.is-arrived) .finale_text {
			opacity: 0;
			translate: 0 24px;
		}
		.finale_text {
			transition:
				opacity 0.8s ease 1.1s,
				translate 1s var(--motion-ease) 1.1s;
		}
	}
	@keyframes traveler-pulse {
		50% {
			box-shadow:
				0 0 0 10px #94151814,
				0 0 30px 10px #fac54988;
		}
	}
	@keyframes target-hit {
		30% {
			scale: 0.94;
		}
		60% {
			scale: 1.03;
		}
	}

	@media (max-width: 700px) {
		.journey_road {
			padding-left: calc(var(--page-gutter) + 40px);
		}
		.road_node {
			left: -40px;
		}
		.journey_road::before,
		.journey_road::after {
			left: calc(var(--page-gutter) + 9px);
		}
	}
</style>
