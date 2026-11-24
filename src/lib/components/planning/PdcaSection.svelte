<script lang="ts">
	import { ArrowUpRight, Check, RefreshCw } from '@lucide/svelte';
	import { reveal } from '#lib/actions/motion.ts';
	import {
		isoCertifications,
		pdcaStages,
		type EvidenceDoc,
		type PdcaStage
	} from '#lib/data/qualityAssurance.ts';
	import EvidencePreview from './EvidencePreview.svelte';

	let preview = $state<EvidenceDoc | null>(null);

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

	<div class="pdca_board">
		<div class="wheel_wrap" use:reveal={{ threshold: 0.3 }}>
			<svg class="wheel" viewBox="0 0 400 400" aria-hidden="true">
				<circle class="wheel_orbit" cx="200" cy="200" r="197" />
				{#each wheel as part (part.stage.id)}
					<g
						role="presentation"
						class="wheel_segment"
						class:is-active={active === part.stage.id}
						style:--fill={accents[part.stage.id].fill}
						style:--ink={accents[part.stage.id].ink}
						style:--dx={part.dx}
						style:--dy={part.dy}
						onpointerenter={() => focusStage(part.stage.id)}
						onpointerleave={() => (paused = false)}
					>
						<path d={part.path} />
						<text x={part.x} y={part.y}>{part.stage.name.toUpperCase()}</text>
					</g>
				{/each}
				<circle class="wheel_hub" cx="200" cy="200" r="100" />
				{#key active}
					<text class="hub_name" x="200" y="190">{pdcaStages[activeIndex].name}</text>
				{/key}
				<text class="hub_caption" x="200" y="234">PDCA CYCLE</text>
			</svg>
		</div>

		<ol class="stage_grid">
			{#each pdcaStages as stage, i (stage.id)}
				<li
					class="stage"
					data-stage={stage.id}
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
					<div class="stage_card">
						<span class="stage_ghost" aria-hidden="true">{stage.name[0]}</span>
						<h3 class="stage_name">{stage.name}</h3>
						<p class="stage_question">{stage.question}</p>
						<ul class="stage_actions">
							{#each stage.actions as action (action)}
								<li>
									<span class="stage_tick" aria-hidden="true">
										<Check size={15} strokeWidth={3} />
									</span>
									{action}
								</li>
							{/each}
						</ul>
						{#if stage.plans}
							<div class="stage_plans" id="development-plans">
								<p class="plans_label">Development plans</p>
								<ul class="plans_list">
									{#each stage.plans as plan (plan.name)}
										<li>
											<a
												class="plan_row"
												href={plan.url || undefined}
												aria-disabled={plan.url ? undefined : 'true'}
												title={plan.url ? undefined : 'Link coming soon'}
												target="_blank"
												rel="external noopener noreferrer"
											>
												<span class="plan_unit">{plan.unit}</span>
												<span class="plan_text">
													<span class="plan_name">{plan.name}</span>
													<span class="plan_level">{plan.level}</span>
												</span>
												<span class="plan_go" aria-hidden="true">
													<ArrowUpRight size={16} strokeWidth={2.2} />
												</span>
											</a>
										</li>
									{/each}
								</ul>
							</div>
						{/if}
						{#if stage.evidence}
							<div class="stage_seals">
								<ul class="stage_badges" aria-label="Certifications and accreditation">
									{#each stage.evidence as item (item.src)}
										<li>
											<button
												class="badge"
												type="button"
												aria-haspopup="dialog"
												aria-label="Preview {item.caption}"
												onclick={() => (preview = item)}
											>
												<span class="badge_seal">
													<img src={item.seal ?? item.src} alt="" loading="lazy" />
												</span>
												<span class="badge_tip" aria-hidden="true">{item.caption}</span>
											</button>
										</li>
									{/each}
								</ul>
								<p class="seals_label" aria-hidden="true">Certified &amp;<br />accredited</p>
							</div>
						{/if}
					</div>
				</li>
			{/each}
		</ol>
	</div>

	<aside class="iso" aria-labelledby="iso-title" use:reveal>
		<p class="iso_byline">
			<img src="/img/PUP.png" alt="" width="40" height="40" loading="lazy" />
			Polytechnic University of the Philippines
		</p>
		<div class="iso_spread">
			<div class="iso_lead">
				<h3 class="iso_title" id="iso-title">
					<span class="iso_rank">1<sup>st</sup></span>
					NCR State University
					<em>to secure two ISO certifications across its campuses.</em>
				</h3>
				<a
					class="iso_link"
					href="https://www.pup.edu.ph/about/qps"
					target="_blank"
					rel="external noopener noreferrer"
				>
					Read PUP's Quality Policy
					<ArrowUpRight size={18} strokeWidth={2} />
				</a>
			</div>
			<ul class="iso_list">
				{#each isoCertifications as cert, i (cert.standard)}
					<li class="iso_item" style:--i={i}>
						<p class="iso_meta"><span>ISO</span><span>{cert.year}</span></p>
						<p class="iso_number" aria-label="ISO {cert.standard}:{cert.year}">
							{cert.standard}
						</p>
						<p class="iso_scope">{cert.scope}</p>
						<button
							class="iso_seal"
							type="button"
							aria-haspopup="dialog"
							aria-label="Preview the ISO {cert.standard}:{cert.year} certificate"
							onclick={() =>
								(preview = {
									src: cert.certificate,
									alt: `TÜV SÜD PSB Philippines ISO ${cert.standard}:${cert.year} certificate for the Polytechnic University of the Philippines`,
									caption: `ISO ${cert.standard}:${cert.year} · TÜV SÜD`
								})}
						>
							<img src={cert.seal} alt="" width="120" height="120" loading="lazy" />
						</button>
					</li>
				{/each}
			</ul>
		</div>
	</aside>

	<EvidencePreview bind:item={preview} />
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
		cursor: pointer;
		pointer-events: auto;
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

	/* The board: four equal cards meet around the wheel. Each card's inner corner is
	   cut by a circle centred on the wheel, so the cards wrap the cycle with an even
	   gap. --inner keeps text clear of that curve. */
	.pdca_board {
		--wheel: clamp(300px, 24vw, 440px);
		--gx: calc(var(--wheel) * 0.56);
		--gy: clamp(18px, 1.4vw, 26px);
		--cut: calc(var(--wheel) / 2 + clamp(12px, 1vw, 18px));
		--inner: calc(var(--wheel) * 0.23 + clamp(30px, 2.4vw, 44px));
		--pad: clamp(26px, 2.2vw, 42px);
		position: relative;
	}
	.wheel_wrap {
		position: absolute;
		inset: 0;
		z-index: 2;
		width: var(--wheel);
		height: var(--wheel);
		margin: auto;
		pointer-events: none;
	}
	.stage_grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		grid-auto-rows: 1fr;
		gap: var(--gy) var(--gx);
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.stage[data-stage='act'] {
		grid-area: 1 / 1;
	}
	.stage[data-stage='plan'] {
		grid-area: 1 / 2;
	}
	.stage[data-stage='check'] {
		grid-area: 2 / 1;
	}
	.stage[data-stage='do'] {
		grid-area: 2 / 2;
	}
	.stage {
		position: relative;
		min-height: calc(var(--wheel) / 2 + 40px);
		/* drop-shadow follows the cut-out shape; the first one draws the hairline edge. */
		filter: drop-shadow(0 0 0.6px #cdb889) drop-shadow(0 14px 26px #5c0f160d);
		transition: filter 0.45s ease;
	}
	.stage.is-active {
		filter: drop-shadow(0 0 1px var(--fill)) drop-shadow(0 22px 38px #5c0f1626);
	}
	.stage_card {
		--cx: 0;
		--cy: 0;
		position: relative;
		display: flex;
		flex-direction: column;
		height: 100%;
		box-sizing: border-box;
		padding: var(--pad);
		border-radius: 22px;
		overflow: hidden;
		background:
			radial-gradient(
				circle at var(--cx) var(--cy),
				transparent calc(var(--cut) + 6px),
				color-mix(in srgb, var(--fill) 7%, transparent) calc(var(--cut) + 7px),
				transparent calc(var(--cut) + 90px)
			),
			var(--c-surface);
		mask-image: radial-gradient(
			circle at var(--cx) var(--cy),
			transparent var(--cut),
			#000 calc(var(--cut) + 0.5px)
		);
	}
	.stage[data-stage='act'] .stage_card,
	.stage[data-stage='check'] .stage_card {
		--cx: calc(100% + var(--gx) / 2);
		padding-right: var(--inner);
	}
	.stage[data-stage='plan'] .stage_card,
	.stage[data-stage='do'] .stage_card {
		--cx: calc(var(--gx) / -2);
		padding-left: var(--inner);
	}
	.stage[data-stage='act'] .stage_card,
	.stage[data-stage='plan'] .stage_card {
		--cy: calc(100% + var(--gy) / 2);
	}
	.stage[data-stage='check'] .stage_card,
	.stage[data-stage='do'] .stage_card {
		--cy: calc(var(--gy) / -2);
	}
	/* Accent bar on the outer top edge; it runs toward the wheel when active. */
	.stage_card::before {
		content: '';
		position: absolute;
		inset: 0 0 auto;
		height: 6px;
		background: var(--fill);
		transform-origin: left;
		scale: 0.2 1;
		transition: scale 0.7s var(--motion-ease);
	}
	.stage[data-stage='plan'] .stage_card::before,
	.stage[data-stage='do'] .stage_card::before {
		transform-origin: right;
	}
	.stage.is-active .stage_card::before {
		scale: 1 1;
	}
	.stage_ghost {
		position: absolute;
		bottom: -0.18em;
		z-index: -1;
		color: color-mix(in srgb, var(--fill) 4%, transparent);
		font: 800 clamp(150px, 13vw, 250px) / 1 var(--font-display);
		pointer-events: none;
		transition:
			color 0.5s ease,
			translate 0.8s var(--motion-ease);
	}
	.stage[data-stage='act'] .stage_ghost,
	.stage[data-stage='check'] .stage_ghost {
		left: 0.08em;
	}
	.stage[data-stage='plan'] .stage_ghost,
	.stage[data-stage='do'] .stage_ghost {
		right: 0.08em;
	}
	.stage.is-active .stage_ghost {
		color: color-mix(in srgb, var(--fill) 7%, transparent);
		translate: 0 -6px;
	}
	.stage_card > :not(.stage_ghost) {
		position: relative;
	}
	.stage_name {
		margin: 0;
		color: var(--c-maroon);
		font: 700 clamp(30px, 2.5vw, 48px) / 1.05 var(--font-heading);
		letter-spacing: 0.02em;
	}
	.stage_question {
		margin: clamp(14px, 1.1vw, 22px) 0 clamp(18px, 1.5vw, 28px);
		padding-left: 14px;
		border-left: 3px solid var(--c-gold);
		color: var(--c-maroon);
		font-style: italic;
		font-size: clamp(17px, 1.3vw, 25px);
		line-height: 1.35;
	}
	.stage_actions {
		display: grid;
		gap: clamp(12px, 0.9vw, 16px);
		margin: 0;
		padding: 0;
		list-style: none;
		font-size: clamp(16px, 1.12vw, 21px);
		line-height: 1.4;
		letter-spacing: 0.01em;
	}
	.stage_actions li {
		display: grid;
		grid-template-columns: 26px minmax(0, 1fr);
		gap: 14px;
		align-items: start;
	}
	.stage_tick {
		display: grid;
		place-items: center;
		width: 26px;
		height: 26px;
		margin-top: 0;
		border-radius: 50%;
		color: var(--c-surface);
		background: var(--c-gold-dark);
	}
	/* Evidence seals: round badges that lift and name themselves on hover or focus. */
	.stage_seals {
		display: flex;
		align-items: center;
		gap: 16px;
		margin-top: auto;
		padding-top: clamp(20px, 1.6vw, 30px);
	}
	.stage_badges {
		display: flex;
		gap: clamp(10px, 0.8vw, 14px);
		margin: 0;
		padding: 4px;
		list-style: none;
	}
	.seals_label {
		margin: 0;
		color: #8a7350;
		font: 600 clamp(11px, 0.8vw, 14px) / 1.4 var(--font-body);
		letter-spacing: 0.2em;
		text-transform: uppercase;
	}
	.stage_badges li {
		position: relative;
	}
	.stage_badges li:hover,
	.stage_badges li:focus-within {
		z-index: 4;
	}
	.badge {
		position: relative;
		display: block;
		padding: 0;
		border: 0;
		cursor: zoom-in;
		width: clamp(60px, 4.4vw, 82px);
		aspect-ratio: 1;
		border-radius: 50%;
		background: #fff;
		box-shadow:
			0 0 0 2.5px var(--c-surface),
			0 0 0 4px #e2cd9a,
			0 8px 16px #5c0f161a;
		transition:
			translate 0.35s var(--motion-ease),
			scale 0.35s var(--motion-ease),
			box-shadow 0.3s ease;
	}
	.stage.is-active .badge {
		box-shadow:
			0 0 0 2.5px var(--c-surface),
			0 0 0 4px var(--fill),
			0 8px 16px #5c0f161a;
	}
	.badge_seal {
		position: absolute;
		inset: 0;
		overflow: hidden;
		border-radius: 50%;
	}
	.badge img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		padding: 7px;
		box-sizing: border-box;
		border-radius: 50%;
		object-fit: contain;
	}
	.badge:hover,
	.badge:focus-visible {
		translate: 0 -4px;
		scale: 1.1;
		outline: none;
		box-shadow:
			0 0 0 2.5px var(--c-surface),
			0 0 0 4px var(--c-gold-dark),
			0 12px 22px #5c0f1626;
	}
	.badge_tip {
		position: absolute;
		left: -6px;
		bottom: calc(100% + 12px);
		padding: 6px 10px;
		border-radius: 8px;
		color: var(--c-surface);
		background: var(--c-maroon-deep);
		font: 600 12px / 1.2 var(--font-body);
		letter-spacing: 0.04em;
		white-space: nowrap;
		opacity: 0;
		translate: 0 4px;
		pointer-events: none;
		transition:
			opacity 0.2s ease,
			translate 0.25s var(--motion-ease);
	}
	.badge:hover .badge_tip,
	.badge:focus-visible .badge_tip {
		opacity: 1;
		translate: 0 0;
	}

	/* Development plans inside the Plan card: a ruled list of document links. */
	.stage_plans {
		margin-top: auto;
		padding-top: clamp(20px, 1.6vw, 30px);
	}
	.plans_label {
		margin: 0 0 10px;
		color: #8a7350;
		font: 600 clamp(11px, 0.8vw, 14px) / 1.2 var(--font-body);
		letter-spacing: 0.2em;
		text-transform: uppercase;
	}
	.plans_list {
		display: grid;
		gap: 10px;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.plan_row {
		display: flex;
		align-items: center;
		gap: clamp(12px, 1vw, 18px);
		padding: 10px 12px 10px 10px;
		border-radius: 14px;
		color: inherit;
		background: color-mix(in srgb, var(--fill) 5%, #fff);
		box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--fill) 14%, transparent);
		text-decoration: none;
		transition:
			background-color 0.3s ease,
			box-shadow 0.3s ease,
			translate 0.35s var(--motion-ease);
	}
	.plan_unit {
		display: grid;
		place-items: center;
		flex: 0 0 auto;
		min-width: clamp(58px, 4.4vw, 80px);
		padding: 0.55em 0.7em;
		border-radius: 10px;
		color: var(--c-gold-light);
		background: linear-gradient(150deg, var(--c-maroon), var(--c-maroon-deep));
		font: 800 clamp(14px, 1.05vw, 19px) / 1 var(--font-display);
		letter-spacing: 0.06em;
	}
	.plan_text {
		display: grid;
		flex: 1;
		gap: 3px;
		min-width: 0;
	}
	.plan_name {
		color: #2a1c10;
		font: 600 clamp(15px, 1.05vw, 19px) / 1.2 var(--font-heading);
		letter-spacing: 0.01em;
	}
	.plan_level {
		color: #8a7350;
		font: 600 clamp(10px, 0.7vw, 12px) / 1 var(--font-body);
		letter-spacing: 0.2em;
		text-transform: uppercase;
	}
	.plan_go {
		display: grid;
		place-items: center;
		flex: 0 0 auto;
		width: 32px;
		height: 32px;
		border-radius: 50%;
		color: var(--fill);
		background: #fff;
		box-shadow: 0 0 0 1px color-mix(in srgb, var(--fill) 18%, transparent);
		transition:
			color 0.3s ease,
			background-color 0.3s ease;
	}
	.plan_row[href]:hover {
		translate: 3px 0;
		background: color-mix(in srgb, var(--fill) 9%, #fff);
		box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--fill) 30%, transparent);
	}
	.plan_row[href]:hover .plan_go {
		color: #fff;
		background: var(--fill);
	}
	.plan_row[aria-disabled='true'] {
		cursor: default;
	}

	/* ISO showcase: a magazine spread — headline on the left, the two standards set as
	   large numerals on the right. */
	.iso {
		margin-top: clamp(90px, 8vw, 160px);
		padding-top: clamp(22px, 1.8vw, 34px);
		border-top: 2px solid var(--c-maroon);
	}
	.iso_byline {
		display: flex;
		align-items: center;
		gap: 12px;
		margin: 0;
		color: var(--c-maroon);
		font: 700 clamp(11px, 0.8vw, 14px) / 1.2 var(--font-body);
		letter-spacing: 0.22em;
		text-transform: uppercase;
	}
	.iso_byline img {
		width: clamp(32px, 2.4vw, 44px);
		height: auto;
	}
	.iso_spread {
		display: grid;
		grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
		gap: clamp(32px, 5vw, 110px);
		align-items: end;
		margin-top: clamp(30px, 3vw, 60px);
	}
	.iso_title {
		margin: 0;
		color: var(--c-maroon);
		font: 800 clamp(44px, 5vw, 96px) / 0.95 var(--font-display);
		letter-spacing: -0.02em;
		text-transform: uppercase;
	}
	/* "1st": the ordinal hangs off the cap line of the numeral, like a typeset ordinal. */
	.iso_rank {
		display: flex;
		align-items: flex-start;
		width: fit-content;
		margin-bottom: 0.12em;
		color: var(--c-gold-dark);
		font-size: 1.7em;
		line-height: 0.74;
		letter-spacing: -0.04em;
	}
	.iso_rank sup {
		margin-left: 0.06em;
		font-size: 0.34em;
		line-height: 1;
		letter-spacing: 0;
		text-transform: lowercase;
		vertical-align: baseline;
		translate: 0 0.42em;
	}
	.iso_title em {
		display: block;
		max-width: 22ch;
		margin-top: clamp(16px, 1.4vw, 26px);
		color: #2a2422;
		font: italic 500 clamp(19px, 1.7vw, 32px) / 1.3 var(--font-heading);
		letter-spacing: 0;
		text-transform: none;
	}
	.iso_link {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		margin-top: clamp(26px, 2.4vw, 44px);
		color: var(--c-maroon);
		font: 700 clamp(14px, 0.95vw, 17px) / 1.2 var(--font-heading);
		letter-spacing: 0.02em;
		text-decoration: underline 2px color-mix(in srgb, var(--c-maroon) 28%, transparent);
		text-underline-offset: 7px;
		transition: text-decoration-color 0.25s ease;
	}
	.iso_link :global(svg) {
		transition: translate 0.3s var(--motion-ease);
	}
	.iso_link:hover {
		text-decoration-color: var(--c-maroon);
	}
	.iso_link:hover :global(svg) {
		translate: 2px -2px;
	}
	.iso_list {
		display: grid;
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.iso_item {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr) auto;
		align-items: end;
		column-gap: clamp(16px, 1.6vw, 30px);
		padding: clamp(18px, 1.6vw, 30px) 0;
		border-bottom: 1px solid #e2d3b4;
	}
	.iso_item:first-child {
		padding-top: 0;
	}
	.iso_meta {
		display: grid;
		grid-row: 1 / 3;
		align-self: stretch;
		align-content: space-between;
		margin: 0;
		padding: 0.5em 0 0.35em;
		color: var(--c-maroon);
		font: 800 clamp(13px, 0.95vw, 18px) / 1 var(--font-display);
		letter-spacing: 0.18em;
		writing-mode: vertical-rl;
		rotate: 180deg;
		text-transform: uppercase;
	}
	.iso_meta span + span {
		color: var(--c-gold-dark);
	}
	.iso_number {
		grid-column: 2;
		margin: 0;
		color: var(--c-maroon);
		font: 800 clamp(72px, 8.4vw, 168px) / 0.82 var(--font-display);
		letter-spacing: -0.04em;
		font-variant-numeric: lining-nums;
	}
	.iso_item + .iso_item .iso_number {
		color: var(--c-gold-dark);
	}
	.iso_seal {
		padding: 0;
		border: 0;
		cursor: zoom-in;
		grid-row: 1 / 3;
		grid-column: 3;
		align-self: center;
		display: grid;
		place-items: center;
		width: clamp(72px, 6.6vw, 128px);
		aspect-ratio: 1;
		overflow: hidden;
		border-radius: 50%;
		background: #fff;
		box-shadow:
			0 0 0 3px var(--c-surface),
			0 0 0 4.5px #e2cd9a,
			0 12px 26px #5c0f161c;
		transition:
			rotate 0.6s var(--motion-ease),
			box-shadow 0.3s ease;
	}
	.iso_seal img {
		width: 70%;
		height: auto;
	}
	.iso_seal:focus-visible {
		outline: 3px solid var(--c-gold-dark);
		outline-offset: 4px;
	}
	.iso_item:hover .iso_seal,
	.iso_seal:focus-visible {
		rotate: -8deg;
		box-shadow:
			0 0 0 3px var(--c-surface),
			0 0 0 4.5px var(--c-gold-dark),
			0 16px 30px #5c0f1626;
	}
	.iso_scope {
		grid-column: 2;
		margin: clamp(10px, 0.9vw, 16px) 0 0;
		color: #4a4038;
		font: 600 clamp(12px, 0.85vw, 16px) / 1.3 var(--font-body);
		letter-spacing: 0.16em;
		text-transform: uppercase;
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
		.hub_name {
			transform-box: fill-box;
			transform-origin: center;
			animation: hub-swap 0.55s var(--motion-ease);
		}
		.iso:global(.reveal-pending) .iso_item {
			opacity: 0;
			translate: 0 18px;
			transition:
				opacity 0.6s ease calc(0.25s + var(--i) * 0.14s),
				translate 0.8s var(--motion-ease) calc(0.25s + var(--i) * 0.14s);
		}
		.iso:global(.is-revealed) .iso_item {
			opacity: 1;
			translate: 0 0;
		}
	}
	@keyframes hub-swap {
		from {
			opacity: 0;
			scale: 0.82;
		}
	}
	@keyframes wheel-orbit {
		to {
			rotate: 360deg;
		}
	}

	@media (max-width: 1100px) {
		.pdca_board {
			display: grid;
			gap: clamp(32px, 4vw, 60px);
		}
		.wheel_wrap {
			position: static;
			width: min(380px, 100%);
			height: auto;
			pointer-events: auto;
		}
		.stage_grid {
			gap: clamp(16px, 2vw, 26px);
		}
		.stage[data-stage] {
			grid-area: auto;
			min-height: 0;
		}
		.stage[data-stage] .stage_card {
			padding: var(--pad);
			mask-image: none;
			background: var(--c-surface);
		}
	}
	@media (max-width: 1000px) {
		.iso_spread {
			grid-template-columns: 1fr;
			align-items: start;
		}
	}
	@media (max-width: 700px) {
		.stage_grid {
			grid-template-columns: 1fr;
		}
	}
</style>
