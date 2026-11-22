<script lang="ts">
	/* The narrative reports as servers in a rack. Each unit reads as a card:
	   title, what the report covers, the report link, and the site section for
	   the same area. The hardware details are decorative. */
	import { ArrowRight, ArrowUpRight } from '@lucide/svelte';
	import { resolve } from '$app/paths';
	import { reveal } from '#lib/actions/motion.ts';
	import type { narrativeReports } from '#lib/data/reportLinks.ts';

	let { reports }: { reports: typeof narrativeReports } = $props();
</script>

<div class="rack" use:reveal={{ threshold: 0.08 }}>
	<div class="rack-top" aria-hidden="true">
		<span class="plate">DIT · NARRATIVE RACK</span>
		<span class="uplink-tag"><i></i>UPLINK FROM CS-10</span>
	</div>

	<div class="rack-bay">
		<span class="rail" aria-hidden="true"></span>
		<ol class="units">
			{#each reports as report, i (report.href)}
				<li class="unit" style="--i: {i}">
					<span class="handle" aria-hidden="true"></span>
					<div class="bezel" aria-hidden="true">
						<span class="mesh"></span>
					</div>

					<div class="unit-body">
						<h3 class="unit-title">{report.title}</h3>
						<p class="unit-summary">{report.summary}</p>
					</div>

					<div class="unit-side">
						<div class="status" aria-hidden="true">
							<span><i class="led pwr"></i>PWR</span>
							<span><i class="led hdd"></i>HDD</span>
							<span><i class="led net"></i>NET</span>
						</div>
						<div class="drives" aria-hidden="true">
							{#each { length: 4 }, d (d)}<span class="drive" style="--d: {d}"><i></i></span>{/each}
						</div>
						<div class="actions">
							<a class="read" href={report.href} target="_blank" rel="external noopener noreferrer">
								Read report
								<ArrowUpRight size={17} strokeWidth={2.2} aria-hidden="true" />
								<span class="visually-hidden">: {report.title} narrative (opens in a new tab)</span>
							</a>
							<a class="visit" href={resolve(report.section)}>
								Visit section
								<ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
								<span class="visually-hidden">: {report.title}</span>
							</a>
						</div>
					</div>
					<span class="handle" aria-hidden="true"></span>
				</li>
			{/each}
		</ol>
		<span class="rail" aria-hidden="true"></span>
	</div>

	<div class="rack-base" aria-hidden="true">
		<span class="blank"></span>
	</div>
</div>

<style>
	.rack {
		--metal-hi: #45484e;
		--metal: #2a2c30;
		--metal-lo: #1c1d20;
		--silk: #a9acb3;
		--cream: #f4ecd9;
		--mono: ui-monospace, 'SFMono-Regular', 'JetBrains Mono', Menlo, Consolas, monospace;

		position: relative;
		border-radius: 14px;
		padding: 14px;
		background: linear-gradient(180deg, #19191c 0%, #0f0f11 100%);
		box-shadow:
			inset 0 1px 0 rgb(255 255 255 / 0.08),
			inset 0 0 0 1px rgb(0 0 0 / 0.6),
			0 40px 80px -30px rgb(40 10 10 / 0.55),
			0 12px 24px -12px rgb(0 0 0 / 0.4);
	}

	.rack-top,
	.rack-base {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 10px 14px;
		border-radius: 6px;
		background:
			radial-gradient(circle, #0a0a0b 1.4px, transparent 1.8px) 0 0 / 7px 7px,
			linear-gradient(180deg, var(--metal-hi), var(--metal) 20%, var(--metal-lo));
		box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.12);
	}
	.rack-top {
		margin-bottom: 10px;
	}
	.rack-base {
		margin-top: 10px;
		min-height: 30px;
	}
	.plate,
	.uplink-tag {
		padding: 4px 8px;
		border-radius: 3px;
		font-family: var(--mono);
		font-size: 0.62rem;
		letter-spacing: 0.14em;
		color: var(--silk);
		background: #1a1b1e;
		box-shadow: inset 0 1px 2px rgb(0 0 0 / 0.7);
	}
	.plate {
		color: var(--c-gold);
	}
	.uplink-tag {
		display: inline-flex;
		align-items: center;
		gap: 7px;
	}
	.uplink-tag i {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #3dfc78;
		box-shadow: 0 0 6px #3dfc78;
	}

	.rack-bay {
		display: grid;
		grid-template-columns: 22px 1fr 22px;
		gap: 8px;
	}

	/* Mounting rails with square cage-nut holes, three to each rack unit. */
	.rail {
		position: relative;
		border-radius: 3px;
		background: linear-gradient(90deg, #26272b, #3a3c41 50%, #26272b);
		box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.5);
	}
	.rail::before {
		content: '';
		position: absolute;
		inset: 6px 6px;
		background: repeating-linear-gradient(
			180deg,
			#08080a 0 9px,
			transparent 9px 15px,
			#08080a 15px 24px,
			transparent 24px 30px,
			#08080a 30px 39px,
			transparent 39px 48px
		);
	}

	.units {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 8px;
	}

	/* ── Server unit ────────────────────────────────────── */
	.unit {
		position: relative;
		display: grid;
		grid-template-columns: 16px 92px minmax(0, 1fr) auto 16px;
		align-items: stretch;
		gap: 18px;
		min-height: 150px;
		padding: 14px 10px;
		border-radius: 6px;
		background:
			repeating-linear-gradient(90deg, rgb(255 255 255 / 0.015) 0 1px, transparent 1px 3px),
			linear-gradient(180deg, var(--metal-hi) 0%, var(--metal) 10%, #232528 75%, var(--metal-lo));
		box-shadow:
			inset 0 1px 0 rgb(255 255 255 / 0.14),
			inset 0 -2px 0 rgb(0 0 0 / 0.5),
			0 1px 0 #070708;
		transition:
			transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
			box-shadow 0.4s ease;
	}

	/* Pull handles on both ends of the faceplate. */
	.handle {
		align-self: center;
		width: 12px;
		height: 74%;
		border-radius: 6px;
		background: linear-gradient(90deg, #5d6168, #c6c9ce 45%, #6b6f76);
		box-shadow:
			0 3px 6px rgb(0 0 0 / 0.55),
			inset 0 0 0 1px rgb(0 0 0 / 0.3);
	}

	.bezel {
		position: relative;
		display: grid;
		place-items: center;
		border-radius: 4px;
		overflow: hidden;
		background: #0e0e10;
		box-shadow:
			inset 0 0 0 1px rgb(0 0 0 / 0.7),
			inset 0 2px 6px rgb(0 0 0 / 0.8);
	}
	.mesh {
		position: absolute;
		inset: 0;
		background:
			radial-gradient(circle, #2e3035 2px, transparent 2.4px) 0 0 / 9px 8px,
			radial-gradient(circle, #2e3035 2px, transparent 2.4px) 4.5px 4px / 9px 8px;
		opacity: 0.9;
	}

	.unit-body {
		display: grid;
		align-content: center;
		gap: 6px;
		padding: 4px 0;
	}
	.unit-title {
		margin: 0;
		font-family: var(--font-heading);
		font-size: clamp(1.35rem, 1.8vw, 1.7rem);
		font-weight: 700;
		line-height: 1.15;
		color: var(--cream);
	}
	.unit-summary {
		margin: 0;
		max-width: 46ch;
		font-family: var(--font-body);
		font-size: 0.92rem;
		line-height: 1.5;
		color: rgb(244 236 217 / 0.68);
	}

	.unit-side {
		display: grid;
		grid-template-rows: auto auto 1fr;
		justify-items: end;
		gap: 10px;
		padding: 2px 0;
	}

	.status {
		display: flex;
		gap: 10px;
		font-family: var(--mono);
		font-size: 0.56rem;
		letter-spacing: 0.1em;
		color: var(--silk);
	}
	.status span {
		display: inline-flex;
		align-items: center;
		gap: 4px;
	}
	.led {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #222;
	}
	.led.pwr,
	.led.net {
		background: #3dfc78;
		box-shadow: 0 0 6px rgb(61 252 120 / 0.8);
	}
	.led.hdd {
		background: #3a2c14;
	}

	.drives {
		display: flex;
		gap: 4px;
	}
	.drive {
		position: relative;
		width: 30px;
		height: 12px;
		border-radius: 2px;
		background: linear-gradient(180deg, #17181b, #0c0c0e);
		box-shadow:
			inset 0 0 0 1px rgb(255 255 255 / 0.06),
			inset 0 1px 2px rgb(0 0 0 / 0.8);
	}
	.drive i {
		position: absolute;
		right: 3px;
		top: 50%;
		width: 3px;
		height: 3px;
		border-radius: 50%;
		transform: translateY(-50%);
		background: #3dfc78;
		opacity: 0.55;
	}

	.actions {
		align-self: end;
		display: grid;
		justify-items: end;
		gap: 8px;
	}
	.read,
	.visit {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		text-decoration: none;
		font-family: var(--font-heading);
		font-weight: 700;
		letter-spacing: var(--track-tight);
		white-space: nowrap;
	}
	.read {
		padding: 10px 16px;
		border-radius: 10px;
		font-size: 0.98rem;
		color: #2b1a05;
		background: var(--grad-gold);
		box-shadow:
			inset 0 1px 0 rgb(255 255 255 / 0.45),
			0 6px 16px -6px rgb(250 197 73 / 0.55);
		transition:
			filter 0.2s ease,
			transform 0.2s ease;
	}
	.visit {
		padding: 2px 2px;
		font-size: 0.85rem;
		font-weight: 600;
		color: rgb(244 236 217 / 0.75);
		transition: color 0.2s ease;
	}
	.read:focus-visible,
	.visit:focus-visible {
		outline: 2px solid var(--c-gold-light);
		outline-offset: 3px;
	}
	.visit :global(svg),
	.read :global(svg) {
		transition: transform 0.25s ease;
	}

	@media (hover: hover) {
		.read:hover {
			filter: saturate(1.1) brightness(1.05);
		}
		.visit:hover {
			color: var(--c-gold-light);
		}
		.visit:hover :global(svg) {
			transform: translateX(3px);
		}
		.read:hover :global(svg) {
			transform: translate(2px, -2px);
		}
	}

	/* Pulling a unit forward on its rails. */
	.unit:hover,
	.unit:focus-within {
		z-index: 1;
		box-shadow:
			inset 0 1px 0 rgb(255 255 255 / 0.18),
			inset 0 -2px 0 rgb(0 0 0 / 0.5),
			0 18px 36px -10px rgb(0 0 0 / 0.9),
			0 0 0 1px rgb(207 168 58 / 0.35);
	}
	.unit:hover .led.hdd,
	.unit:focus-within .led.hdd {
		background: #ffb12a;
		box-shadow: 0 0 6px rgb(255 177 42 / 0.8);
	}

	@media (prefers-reduced-motion: no-preference) {
		.unit:hover,
		.unit:focus-within {
			transform: scale(1.015);
		}
		.unit:hover .led.hdd,
		.unit:focus-within .led.hdd {
			animation: hdd 0.7s steps(1, end) infinite;
		}
		.unit:hover .drive i,
		.unit:focus-within .drive i {
			animation: hdd 0.5s steps(1, end) infinite;
			animation-delay: calc(var(--d) * 0.13s);
		}
		@media (hover: hover) {
			.read:hover {
				transform: translateY(-1px);
			}
		}

		/* Units slide into the rack one after another. */
		.rack:global(.reveal-pending) .unit {
			opacity: 0;
			transform: translateY(18px);
		}
		.rack:global(.reveal-pending.is-revealed) .unit {
			opacity: 1;
			transform: none;
			transition:
				opacity 0.5s ease,
				transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
			transition-delay: calc(0.1s + var(--i) * 0.1s);
		}
	}

	@keyframes hdd {
		0%,
		40% {
			opacity: 1;
		}
		20%,
		70% {
			opacity: 0.2;
		}
	}

	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
		clip-path: inset(50%);
		white-space: nowrap;
	}

	/* ── Narrow racks ───────────────────────────────────── */
	@media (max-width: 1100px) {
		.unit {
			grid-template-columns: 12px 72px minmax(0, 1fr) auto 12px;
			gap: 14px;
		}
		.drives {
			display: none;
		}
	}
	@media (max-width: 640px) {
		.rack {
			padding: 8px;
			border-radius: 10px;
		}
		.rack-bay {
			grid-template-columns: 10px 1fr 10px;
			gap: 5px;
		}
		.rail::before {
			inset: 6px 2px;
		}
		.uplink-tag {
			display: none;
		}
		.unit {
			grid-template-columns: 52px minmax(0, 1fr);
			grid-template-areas:
				'bezel body'
				'side side';
			gap: 12px 14px;
			padding: 14px;
		}
		.handle {
			display: none;
		}
		.bezel {
			grid-area: bezel;
			align-self: start;
			aspect-ratio: 1;
		}
		.unit-body {
			grid-area: body;
		}
		.unit-side {
			grid-area: side;
			grid-template-rows: none;
			grid-template-columns: auto 1fr;
			align-items: center;
			justify-items: stretch;
			padding-top: 12px;
			border-top: 1px solid rgb(255 255 255 / 0.07);
		}
		.actions {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			flex-wrap: wrap;
			gap: 12px;
		}
	}
</style>
