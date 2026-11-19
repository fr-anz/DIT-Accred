<script lang="ts">
	import { ArrowRight, ArrowUpRight, Check, RefreshCw, ShieldCheck } from '@lucide/svelte';
	import { reveal } from '#lib/actions/motion.ts';
	import { developmentPlans, pdcaStages, type PdcaStage } from '#lib/data/qualityAssurance.ts';

	const accents: Record<PdcaStage['id'], { fill: string; ink: string }> = {
		plan: { fill: 'var(--c-maroon)', ink: 'var(--c-surface)' },
		do: { fill: 'var(--c-maroon-deep)', ink: 'var(--c-surface)' },
		check: { fill: 'var(--c-gold-dark)', ink: 'var(--c-surface)' },
		act: { fill: 'var(--c-gold)', ink: 'var(--c-maroon-deep)' }
	};

	/* Wheel geometry in a 400×400 box; 0° is twelve o'clock and angles run clockwise. */
	const polar = (r: number, deg: number) => {
		const a = ((deg - 90) * Math.PI) / 180;
		return `${(200 + r * Math.cos(a)).toFixed(2)} ${(200 + r * Math.sin(a)).toFixed(2)}`;
	};
	const outer = 186;
	const inner = 118;
	const middle = (outer + inner) / 2;
	const segment = (start: number, end: number) => {
		const s = start + 1.5;
		const e = end - 1.5;
		return [
			`M ${polar(outer, s)}`,
			`A ${outer} ${outer} 0 0 1 ${polar(outer, e)}`,
			`L ${polar(middle, e + 7)}`,
			`L ${polar(inner, e)}`,
			`A ${inner} ${inner} 0 0 0 ${polar(inner, s)}`,
			`L ${polar(middle, s + 7)}`,
			'Z'
		].join(' ');
	};
	const wheel = pdcaStages.map((stage, i) => {
		const mid = i * 90 + 45;
		const rad = ((mid - 90) * Math.PI) / 180;
		const [x, y] = polar(middle, mid).split(' ');
		return {
			stage,
			path: segment(i * 90, (i + 1) * 90),
			x,
			y,
			dx: Math.cos(rad),
			dy: Math.sin(rad)
		};
	});

	let active = $state<PdcaStage['id']>('plan');
	let paused = $state(false);
	const activeIndex = $derived(pdcaStages.findIndex((stage) => stage.id === active));

	$effect(() => {
		if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const timer = window.setInterval(() => {
			if (document.hidden) return;
			active = pdcaStages[(activeIndex + 1) % pdcaStages.length].id;
		}, 3400);
		return () => window.clearInterval(timer);
	});

	const focusStage = (id: PdcaStage['id']) => {
		active = id;
		paused = true;
	};
</script>

<section class="content_section pdca" id="pdca" aria-labelledby="pdca-title">
	<div class="section_label">
		<RefreshCw size={26} strokeWidth={1.5} class="section_icon maroon" />
		<h2 class="t_eyebrow" id="pdca-title">CONTINUOUS QUALITY IMPROVEMENT</h2>
	</div>
	<hr class="section_divider" />

	<p class="pdca_subtitle" use:reveal>The Plan–Do–Check–Act Cycle</p>
	<p class="pdca_intro" use:reveal style:--d="1">
		The Department follows a systematic planning process aligned with the University's Vision,
		Mission, Goals and Objectives (VMGO). The same Plan–Do–Check–Act method behind PUP's ISO 9001
		and ISO 21001 quality management systems guides how we plan, deliver, review and improve the
		BSIT program.
	</p>

	<div class="pdca_layout">
		<div class="wheel_wrap" use:reveal={{ threshold: 0.3 }}>
			<svg class="wheel" viewBox="0 0 400 400" aria-hidden="true">
				<circle class="wheel_orbit" cx="200" cy="200" r="197" />
				{#each wheel as part (part.stage.id)}
					<g
						class="wheel_segment"
						class:is-active={active === part.stage.id}
						style:--fill={accents[part.stage.id].fill}
						style:--ink={accents[part.stage.id].ink}
						style:--dx={part.dx}
						style:--dy={part.dy}
					>
						<path d={part.path} />
						<text x={part.x} y={part.y}>{part.stage.name.toUpperCase()}</text>
					</g>
				{/each}
				<circle class="wheel_hub" cx="200" cy="200" r="100" />
				<text class="hub_name" x="200" y="190">{pdcaStages[activeIndex].name}</text>
				<text class="hub_caption" x="200" y="234">PDCA CYCLE</text>
			</svg>
		</div>

		<ol class="stage_grid">
			{#each pdcaStages as stage, i (stage.id)}
				<li
					class="stage"
					class:is-active={active === stage.id}
					style:--fill={accents[stage.id].fill}
					style:--ink={accents[stage.id].ink}
					style:--d={i}
					use:reveal
					onmouseenter={() => focusStage(stage.id)}
					onmouseleave={() => (paused = false)}
					onfocusin={() => focusStage(stage.id)}
					onfocusout={() => (paused = false)}
				>
					<div class="stage_head">
						<span class="stage_letter" aria-hidden="true">{stage.name[0]}</span>
						<div>
							<p class="stage_step">Stage 0{i + 1}</p>
							<h3 class="stage_name">{stage.name}</h3>
						</div>
					</div>
					<p class="stage_question">{stage.question}</p>
					<ul class="stage_actions">
						{#each stage.actions as action (action)}
							<li>
								<span class="stage_tick" aria-hidden="true">
									<Check size={13} strokeWidth={3} />
								</span>
								{action}
							</li>
						{/each}
					</ul>
					{#if stage.evidence}
						<div class="stage_evidence">
							<p class="evidence_label">Certifications and accreditation</p>
							<ul class="evidence_row">
								{#each stage.evidence as item (item.src)}
									<li>
										<a
											class="evidence_item"
											href={item.src}
											target="_blank"
											rel="external noopener noreferrer"
										>
											<span class="evidence_frame">
												<img src={item.src} alt={item.alt} loading="lazy" />
											</span>
											<span class="evidence_caption">{item.caption}</span>
										</a>
									</li>
								{/each}
							</ul>
						</div>
					{/if}
					{#if stage.link}
						<a class="stage_link" href="#{stage.link.anchor}">
							{stage.link.label}
							<ArrowRight size={16} strokeWidth={2} />
						</a>
					{/if}
				</li>
			{/each}
		</ol>
	</div>

	<div class="reporting" id="development-plans" use:reveal>
		<div class="reporting_intro">
			<p class="reporting_kicker">Under Check</p>
			<h3 class="reporting_title">Development Plans</h3>
			<p class="reporting_desc">
				The Check stage measures DIT's results against the targets in the College and DIT
				development plans.
			</p>
		</div>
		<ol class="cascade">
			{#each developmentPlans as plan, i (plan.name)}
				<li class="cascade_step" style:--i={i}>
					<span class="cascade_unit">{plan.unit}</span>
					<span class="cascade_name">{plan.name}</span>
					<span class="cascade_level">{plan.level}</span>
				</li>
			{/each}
		</ol>
	</div>

	<aside class="iso_note" use:reveal>
		<span class="iso_seal" aria-hidden="true"><ShieldCheck strokeWidth={1.5} /></span>
		<div class="iso_copy">
			<p class="iso_badges">
				<span>ISO 9001:2015</span>
				<span>ISO 21001:2018</span>
			</p>
			<p>
				PUP holds ISO 9001:2015 and ISO 21001:2018 certification across all of its campuses. Both
				standards follow the Plan–Do–Check–Act method, with mid-year and year-end assessments
				running from delivery units up to top management.
			</p>
		</div>
		<a
			class="iso_link"
			href="https://www.pup.edu.ph/about/qps"
			target="_blank"
			rel="external noopener noreferrer"
		>
			Read PUP's Quality Policy
			<ArrowUpRight size={18} strokeWidth={2} />
		</a>
	</aside>
</section>

<style>
	.pdca .section_label .t_eyebrow {
		margin: 0;
	}
	.pdca_subtitle {
		display: flex;
		align-items: center;
		gap: clamp(14px, 1.5vw, 28px);
		margin: 0 0 clamp(16px, 1.4vw, 26px);
		color: var(--c-maroon);
		font: italic 600 clamp(18px, 1.6vw, 31px) / 1.3 var(--font-display);
		letter-spacing: 0.01em;
	}
	.pdca_subtitle::after {
		content: '';
		flex: 1;
		min-width: 40px;
		height: 2px;
		background: var(--grad-gold);
	}
	.pdca_intro {
		max-width: 72ch;
		margin: 0 0 clamp(40px, 4vw, 76px);
		font-size: clamp(15px, 1.15vw, 22px);
		line-height: 1.55;
	}

	.pdca_layout {
		display: grid;
		grid-template-columns: minmax(280px, 0.85fr) minmax(0, 1.6fr);
		gap: clamp(32px, 4vw, 80px);
		align-items: start;
	}
	.wheel_wrap {
		position: sticky;
		top: 120px;
	}
	.wheel {
		display: block;
		width: 100%;
		max-width: 560px;
		height: auto;
		margin: 0 auto;
		overflow: visible;
	}
	.wheel_orbit {
		fill: none;
		stroke: var(--c-gold);
		stroke-width: 1.5;
		stroke-dasharray: 2 9;
		stroke-linecap: round;
		transform-box: fill-box;
		transform-origin: center;
	}
	.wheel_segment {
		opacity: 0.4;
		transition:
			opacity 0.45s ease,
			transform 0.6s var(--motion-ease);
	}
	.wheel_segment.is-active {
		opacity: 1;
		transform: translate(calc(var(--dx) * 9px), calc(var(--dy) * 9px));
	}
	.wheel_segment path {
		fill: var(--fill);
	}
	.wheel_segment text {
		fill: var(--ink);
		font: 800 18px var(--font-display);
		letter-spacing: 0.06em;
		text-anchor: middle;
		dominant-baseline: central;
	}
	.wheel_hub {
		fill: var(--c-surface);
		stroke: #efe2c4;
		stroke-width: 2;
	}
	.hub_caption {
		fill: #8a7350;
		font: 600 13px var(--font-body);
		letter-spacing: 0.22em;
		text-anchor: middle;
	}
	.hub_name {
		fill: var(--c-maroon);
		font: 800 46px var(--font-display);
		text-anchor: middle;
		dominant-baseline: central;
	}

	.stage_grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: clamp(16px, 1.6vw, 30px);
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.stage {
		position: relative;
		display: flex;
		flex-direction: column;
		padding: clamp(22px, 2vw, 38px);
		border: 1.5px solid #e9dcc0;
		border-radius: 18px;
		overflow: hidden;
		background: var(--c-surface);
		transition:
			transform 0.4s var(--motion-ease),
			box-shadow 0.4s ease,
			border-color 0.3s ease;
	}
	.stage::before {
		content: '';
		position: absolute;
		inset: 0 0 auto;
		height: 6px;
		background: var(--fill);
		transform-origin: left;
		scale: 0.2 1;
		transition: scale 0.6s var(--motion-ease);
	}
	.stage.is-active {
		border-color: var(--fill);
		box-shadow: 0 18px 40px #5c0f161c;
		transform: translateY(-4px);
	}
	.stage.is-active::before {
		scale: 1 1;
	}
	.stage_head {
		display: flex;
		align-items: center;
		gap: 16px;
	}
	.stage_letter {
		display: grid;
		place-items: center;
		flex: 0 0 auto;
		width: clamp(46px, 3.3vw, 62px);
		height: clamp(46px, 3.3vw, 62px);
		border-radius: 14px;
		color: var(--ink);
		background: var(--fill);
		font: 800 clamp(22px, 1.7vw, 32px) / 1 var(--font-display);
		transition: rotate 0.5s var(--motion-ease);
	}
	.stage.is-active .stage_letter {
		rotate: -8deg;
	}
	.stage_step {
		margin: 0 0 2px;
		color: #8a7350;
		font: 600 clamp(11px, 0.72vw, 13px) / 1.2 var(--font-body);
		letter-spacing: 0.22em;
		text-transform: uppercase;
	}
	.stage_name {
		margin: 0;
		color: var(--c-maroon);
		font: 700 clamp(22px, 1.75vw, 34px) / 1.1 var(--font-heading);
		letter-spacing: 0.03em;
	}
	.stage_question {
		margin: clamp(16px, 1.3vw, 24px) 0;
		padding-left: 14px;
		border-left: 3px solid var(--c-gold);
		color: var(--c-maroon);
		font-style: italic;
		font-size: clamp(15px, 1.1vw, 21px);
		line-height: 1.35;
	}
	.stage_actions {
		display: grid;
		gap: 11px;
		margin: 0;
		padding: 0;
		list-style: none;
		font-size: clamp(14px, 0.95vw, 18px);
		line-height: 1.4;
		letter-spacing: 0.01em;
	}
	.stage_actions li {
		display: grid;
		grid-template-columns: 22px minmax(0, 1fr);
		gap: 12px;
		align-items: start;
	}
	.stage_tick {
		display: grid;
		place-items: center;
		width: 22px;
		height: 22px;
		margin-top: 1px;
		border-radius: 50%;
		color: var(--c-surface);
		background: var(--c-gold-dark);
	}
	.stage_evidence {
		margin-top: clamp(18px, 1.5vw, 28px);
		padding-top: clamp(16px, 1.3vw, 24px);
		border-top: 1px dashed #e2cd9a;
	}
	.evidence_label {
		margin: 0 0 12px;
		color: #8a7350;
		font: 600 clamp(11px, 0.72vw, 13px) / 1.2 var(--font-body);
		letter-spacing: 0.2em;
		text-transform: uppercase;
	}
	.evidence_row {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: clamp(10px, 0.9vw, 16px);
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.evidence_item {
		display: flex;
		flex-direction: column;
		gap: 8px;
		height: 100%;
		color: inherit;
		text-decoration: none;
	}
	.evidence_frame {
		position: relative;
		display: block;
		height: clamp(92px, 7.4vw, 140px);
		padding: 8px;
		border: 1px solid #efe2c4;
		border-radius: 12px;
		background: #fffaf1;
		transition:
			transform 0.35s var(--motion-ease),
			box-shadow 0.35s ease,
			border-color 0.25s ease;
	}
	.evidence_frame img {
		position: absolute;
		inset: 8px;
		width: calc(100% - 16px);
		height: calc(100% - 16px);
		object-fit: contain;
		filter: drop-shadow(0 4px 8px #5c0f1620);
	}
	.evidence_caption {
		color: #5a4a30;
		font-size: clamp(11px, 0.72vw, 13px);
		line-height: 1.3;
		text-align: center;
	}
	@media (hover: hover) {
		.evidence_item:hover .evidence_frame {
			transform: translateY(-3px);
			border-color: var(--c-gold);
			box-shadow: 0 10px 22px #5c0f1618;
		}
	}
	.stage_link {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		align-self: flex-start;
		margin-top: auto;
		padding-top: clamp(16px, 1.3vw, 24px);
		color: var(--c-gold-dark);
		font: 700 clamp(12px, 0.78vw, 15px) / 1.2 var(--font-heading);
		letter-spacing: 0.08em;
		text-decoration: none;
		text-transform: uppercase;
		transition: color 0.2s ease;
	}
	.stage_link :global(svg) {
		transition: translate 0.25s var(--motion-ease);
	}
	.stage_link:hover {
		color: var(--c-maroon);
	}
	.stage_link:hover :global(svg) {
		translate: 3px 0;
	}

	.reporting {
		display: grid;
		grid-template-columns: minmax(240px, 0.8fr) minmax(0, 1.6fr);
		gap: clamp(28px, 3.6vw, 70px);
		align-items: center;
		margin-top: clamp(56px, 5.4vw, 104px);
		padding: clamp(30px, 3.4vw, 66px);
		border-radius: 25px;
		color: white;
		background: var(--panel-maroon);
		scroll-margin-top: 120px;
	}
	.reporting_kicker {
		margin: 0 0 10px;
		color: var(--c-gold-light);
		font: 600 clamp(11px, 0.78vw, 15px) / 1.2 var(--font-body);
		letter-spacing: 0.24em;
		text-transform: uppercase;
	}
	.reporting_title {
		margin: 0 0 16px;
		font: 700 clamp(24px, 2.1vw, 40px) / 1.15 var(--font-heading);
		letter-spacing: 0.02em;
	}
	.reporting_desc {
		margin: 0;
		color: #f1e4e4;
		font-size: clamp(14px, 1vw, 19px);
		line-height: 1.5;
	}
	.cascade {
		display: grid;
		gap: clamp(10px, 0.9vw, 16px);
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.cascade_step {
		position: relative;
		display: grid;
		grid-template-columns: clamp(86px, 6.6vw, 126px) minmax(0, 1fr) auto;
		align-items: center;
		gap: clamp(14px, 1.4vw, 26px);
		margin-left: calc(var(--i) * clamp(14px, 3.4vw, 64px));
		padding: clamp(12px, 1vw, 18px) clamp(14px, 1.3vw, 24px);
		border: 1px solid #ffffff24;
		border-radius: 14px;
		background: #ffffff0f;
		transition:
			background-color 0.25s ease,
			translate 0.35s var(--motion-ease);
	}
	.cascade_step:not(:first-child)::before {
		content: '';
		position: absolute;
		left: clamp(28px, 2.4vw, 44px);
		bottom: 100%;
		width: 2px;
		height: clamp(10px, 0.9vw, 16px);
		margin-left: calc(-1 * clamp(14px, 3.4vw, 64px));
		background: var(--c-gold);
		opacity: 0.6;
	}
	.cascade_unit {
		padding: 0.35em 0;
		border-radius: 9px;
		color: var(--c-maroon-deep);
		background: var(--grad-gold);
		font: 800 clamp(16px, 1.3vw, 25px) / 1 var(--font-display);
		letter-spacing: 0.08em;
		text-align: center;
	}
	.cascade_name {
		font: 600 clamp(14px, 1.05vw, 20px) / 1.3 var(--font-heading);
		letter-spacing: 0.02em;
	}
	.cascade_level {
		color: var(--c-gold-light);
		font-style: italic;
		font-size: clamp(12px, 0.85vw, 16px);
		white-space: nowrap;
	}
	@media (hover: hover) {
		.cascade_step:hover {
			background: #ffffff1c;
			translate: 6px 0;
		}
	}

	.iso_note {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr) auto;
		align-items: center;
		gap: clamp(20px, 2.4vw, 46px);
		margin-top: clamp(28px, 2.6vw, 50px);
		padding: clamp(24px, 2.4vw, 46px);
		border-radius: 25px;
		background: var(--grad-gold);
	}
	.iso_seal {
		display: grid;
		place-items: center;
		width: clamp(64px, 5.4vw, 104px);
		height: clamp(64px, 5.4vw, 104px);
		border-radius: 50%;
		color: var(--c-gold-light);
		background: linear-gradient(150deg, var(--c-maroon), var(--c-maroon-deep));
		box-shadow: 0 10px 24px #5c0f1640;
	}
	.iso_seal :global(svg) {
		width: 52%;
		height: 52%;
	}
	.iso_copy p {
		margin: 0;
		max-width: 80ch;
		color: #1e1408;
		font-size: clamp(14px, 1.02vw, 20px);
		line-height: 1.5;
	}
	.iso_copy .iso_badges {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-bottom: 12px;
	}
	.iso_badges span {
		padding: 6px 12px;
		border-radius: 8px;
		color: var(--c-maroon-deep);
		background: #ffffffb3;
		font: 800 clamp(12px, 0.85vw, 16px) / 1 var(--font-display);
		letter-spacing: 0.06em;
	}
	.iso_link {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 14px 22px;
		border: 2px solid var(--c-maroon);
		border-radius: 12px;
		color: var(--c-maroon);
		font: 700 clamp(14px, 0.95vw, 18px) / 1.2 var(--font-heading);
		text-decoration: none;
		white-space: nowrap;
		transition:
			background-color 0.2s ease,
			color 0.2s ease;
	}
	.iso_link:hover {
		color: var(--c-gold-light);
		background: var(--c-maroon);
	}

	@media (prefers-reduced-motion: no-preference) {
		.pdca :global(.reveal-pending) {
			opacity: 0;
			translate: 0 28px;
			transition:
				opacity 0.8s ease,
				translate 1s var(--motion-ease);
			transition-delay: calc(var(--d, 0) * 90ms);
		}
		.pdca :global(.reveal-pending.is-revealed) {
			opacity: 1;
			translate: 0 0;
		}
		.wheel_wrap:global(.reveal-pending) .wheel {
			scale: 0.85;
			rotate: -90deg;
			transition:
				scale 1.1s var(--motion-ease),
				rotate 1.3s var(--motion-ease);
		}
		.wheel_wrap:global(.is-revealed) .wheel {
			scale: 1;
			rotate: 0deg;
		}
		.wheel_orbit {
			animation: wheel-orbit 40s linear infinite;
		}
		.reporting:global(.reveal-pending) .cascade_step {
			opacity: 0;
			translate: -24px 0;
			transition:
				opacity 0.6s ease calc(0.3s + var(--i) * 0.15s),
				translate 0.8s var(--motion-ease) calc(0.3s + var(--i) * 0.15s);
		}
		.reporting:global(.is-revealed) .cascade_step {
			opacity: 1;
			translate: 0 0;
		}
	}
	@keyframes wheel-orbit {
		to {
			rotate: 360deg;
		}
	}

	@media (max-width: 1000px) {
		.pdca_layout,
		.reporting {
			grid-template-columns: 1fr;
		}
		.wheel_wrap {
			position: static;
		}
		.wheel {
			max-width: 380px;
		}
		.iso_note {
			grid-template-columns: auto minmax(0, 1fr);
		}
		.iso_link {
			grid-column: 1 / -1;
			justify-self: start;
		}
	}
	@media (max-width: 700px) {
		.stage_grid {
			grid-template-columns: 1fr;
		}
		.cascade_step {
			grid-template-columns: 76px minmax(0, 1fr);
			margin-left: 0;
		}
		.cascade_step::before {
			display: none;
		}
		.cascade_level {
			grid-column: 2;
			white-space: normal;
		}
		.iso_note {
			grid-template-columns: 1fr;
		}
		.iso_link {
			white-space: normal;
		}
	}
</style>
