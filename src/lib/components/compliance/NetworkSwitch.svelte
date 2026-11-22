<script lang="ts">
	/* Front panel of a 24-port access switch, drawn after the 2960-series physical
	   view in Cisco Packet Tracer: a light system bezel on the left, three groups
	   of 2×4 RJ45 ports with triangular port LEDs above each group (▲ upper port,
	   ▼ lower port), and two uplink ports on the right.

	   The compliance areas are patched into the lower row, one per column, so
	   their cables drop clear of the upper row. A port's LED lights green once
	   the scroll signal has reached its area and blinks while it carries traffic.
	   Each patched port is an in-page link to its area card. */
	import seal from '#lib/assets/dit-seal-gold.svg';

	type Port = { id: number; title: string };

	let {
		ports,
		linked = 0,
		active = -1,
		hovered = -1,
		boots = $bindable([]),
		onhover
	}: {
		ports: Port[];
		/** How many areas, counted from the first, have link. */
		linked?: number;
		/** Index of the area carrying traffic, or -1. */
		active?: number;
		/** Index of the area under the pointer or focus, or -1. */
		hovered?: number;
		/** The plug boot of each patched port, measured by the cabling overlay. */
		boots?: HTMLElement[];
		onhover?: (index: number) => void;
	} = $props();

	const GROUPS = 3;
	const COLUMNS = 4;

	/* Column c of the panel holds an upper and a lower port. Areas take the lower
	   port of the first columns, left to right. */
	const columns = Array.from({ length: GROUPS * COLUMNS }, (_, c) => c);
	const areaAt = (column: number) => (column < ports.length ? column : -1);

	let allUp = $derived(linked >= ports.length);
	const ledState = (i: number) =>
		i < 0 ? '' : i === active || (i === hovered && i < linked) ? 'busy' : i < linked ? 'lit' : '';
</script>

<div class="switch">
	<div class="chassis">
		<span class="ear" aria-hidden="true"><i class="screw"></i><i class="screw"></i></span>

		<div class="bezel" aria-hidden="true">
			<div class="logo">
				<img src={seal} alt="" width="26" height="26" />
				<span class="logo-word">DIT</span>
			</div>
			<span class="series">CS-2410 Series</span>
			<div class="sys-leds">
				<span><i class="sys on"></i>SYST</span>
				<span><i class="sys"></i>RPS</span>
				<span><i class="sys" class:on={allUp}></i>STAT</span>
				<span><i class="sys"></i>DUPLX</span>
				<span><i class="sys"></i>SPEED</span>
			</div>
			<span class="mode"><i></i>MODE</span>
		</div>

		<div class="panel">
			<div class="groups">
				{#each { length: GROUPS }, g (g)}
					<div class="group">
						<div class="port-leds" aria-hidden="true">
							{#each columns.slice(g * COLUMNS, (g + 1) * COLUMNS) as c (c)}
								<span class="led-pair">
									<i class="tri up"></i>
									<i class="tri down {ledState(areaAt(c))}"></i>
								</span>
							{/each}
						</div>
						<div class="jacks">
							{#each columns.slice(g * COLUMNS, (g + 1) * COLUMNS) as c (c)}
								<span class="jack upper" aria-hidden="true"><span class="cavity"></span></span>
							{/each}
							{#each columns.slice(g * COLUMNS, (g + 1) * COLUMNS) as c (c)}
								{@const i = areaAt(c)}
								{#if i >= 0}
									<a
										class="jack lower"
										class:is-hovered={i === hovered}
										href="#area-{ports[i].id}"
										aria-label="Go to Area {ports[i].id}, {ports[i].title}"
										onpointerenter={() => onhover?.(i)}
										onpointerleave={() => onhover?.(-1)}
										onfocus={() => onhover?.(i)}
										onblur={() => onhover?.(-1)}
									>
										<span class="cavity"></span>
										<span class="boot" class:alt={ports[i].id % 2 === 0} bind:this={boots[i]}
										></span>
									</a>
								{:else}
									<span class="jack lower" aria-hidden="true"><span class="cavity"></span></span>
								{/if}
							{/each}
						</div>
					</div>
				{/each}
			</div>

			<a class="uplinks" href="#narrative" aria-label="Uplink: go to the narrative reports">
				<span class="port-leds" aria-hidden="true">
					<span class="led-pair"><i class="tri up {allUp ? 'lit' : ''}"></i></span>
					<span class="led-pair"><i class="tri up"></i></span>
				</span>
				<span class="jacks uplink-jacks" aria-hidden="true">
					<span class="jack lower"><span class="cavity"></span></span>
					<span class="jack lower"><span class="cavity"></span></span>
				</span>
				<span class="silk" aria-hidden="true">10/100/1000</span>
			</a>
		</div>

		<span class="ear" aria-hidden="true"><i class="screw"></i><i class="screw"></i></span>
	</div>
</div>

<style>
	.switch {
		--slate-hi: #4b5157;
		--slate: #363b40;
		--slate-lo: #272b2f;
		--bezel-hi: #eef0f1;
		--bezel: #d6d9dc;
		--bezel-lo: #b9bdc1;
		--silk: #c9ccd0;
		--led-green: #3dfc78;
		--cable-a: #d6a73b;
		--cable-b: #b9282d;
		--mono: ui-monospace, 'SFMono-Regular', 'JetBrains Mono', Menlo, Consolas, monospace;

		container: switch / inline-size;
		position: relative;
		width: 100%;
	}

	/* ── Chassis ────────────────────────────────────────── */
	.chassis {
		position: relative;
		display: flex;
		align-items: stretch;
		border-radius: 4px;
		background:
			repeating-linear-gradient(90deg, rgb(255 255 255 / 0.02) 0 1px, transparent 1px 3px),
			linear-gradient(
				180deg,
				var(--slate-hi) 0%,
				var(--slate) 10%,
				var(--slate) 80%,
				var(--slate-lo)
			);
		box-shadow:
			inset 0 1px 0 rgb(255 255 255 / 0.18),
			inset 0 -2px 0 rgb(0 0 0 / 0.45),
			0 2px 0 #0c0d0e,
			0 24px 48px -16px rgb(0 0 0 / 0.45),
			0 0 0 1px rgb(0 0 0 / 0.6);
	}

	.ear {
		flex: 0 0 38px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		padding: 16px 0;
		background: linear-gradient(90deg, #2b2f33, #41464c 45%, #2e3236);
	}
	.ear:first-child {
		border-radius: 4px 0 0 4px;
		box-shadow: inset -1px 0 0 rgb(0 0 0 / 0.5);
	}
	.ear:last-child {
		border-radius: 0 4px 4px 0;
		box-shadow: inset 1px 0 0 rgb(0 0 0 / 0.5);
	}
	.screw {
		width: 13px;
		height: 13px;
		border-radius: 50%;
		background:
			linear-gradient(45deg, transparent 44%, #4a4e54 44% 56%, transparent 56%),
			linear-gradient(-45deg, transparent 44%, #4a4e54 44% 56%, transparent 56%),
			radial-gradient(circle at 35% 30%, #f1f2f4, #a6aab0 45%, #5e6268);
		box-shadow:
			0 0 0 2px #1d2023,
			0 1px 2px 2px rgb(0 0 0 / 0.5);
	}

	/* ── System bezel ───────────────────────────────────── */
	.bezel {
		flex: 0 0 auto;
		display: grid;
		grid-template-columns: auto auto;
		grid-template-areas:
			'logo logo'
			'series series'
			'leds mode';
		align-items: end;
		column-gap: 14px;
		row-gap: 6px;
		padding: 12px 16px 12px 14px;
		background: linear-gradient(180deg, var(--bezel-hi), var(--bezel) 40%, var(--bezel-lo));
		box-shadow:
			inset -1px 0 0 rgb(0 0 0 / 0.35),
			inset 0 1px 0 #fff,
			4px 0 8px -4px rgb(0 0 0 / 0.45);
	}
	.logo {
		grid-area: logo;
		display: flex;
		align-items: center;
		gap: 7px;
	}
	.logo img {
		width: 26px;
		height: 26px;
	}
	.logo-word {
		font-family: var(--font-heading);
		font-size: 1.15rem;
		font-weight: 800;
		letter-spacing: 0.14em;
		color: var(--c-maroon);
	}
	.series {
		grid-area: series;
		font-family: var(--font-body);
		font-size: 0.66rem;
		font-weight: 600;
		letter-spacing: 0.04em;
		color: #4b5056;
		white-space: nowrap;
	}
	.sys-leds {
		grid-area: leds;
		display: grid;
		grid-template-columns: repeat(2, auto);
		gap: 3px 10px;
		font-family: var(--font-body);
		font-size: 0.5rem;
		font-weight: 600;
		letter-spacing: 0.06em;
		color: #50555b;
	}
	.sys-leds span {
		display: inline-flex;
		align-items: center;
		gap: 4px;
	}
	.sys {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: #7d8186;
		box-shadow: inset 0 1px 1px rgb(0 0 0 / 0.4);
		transition:
			background-color 0.3s ease,
			box-shadow 0.3s ease;
	}
	.sys.on {
		background: var(--led-green);
		box-shadow: 0 0 5px 1px rgb(61 252 120 / 0.7);
	}
	.mode {
		grid-area: mode;
		display: grid;
		justify-items: center;
		gap: 3px;
		font-family: var(--font-body);
		font-size: 0.5rem;
		font-weight: 600;
		letter-spacing: 0.06em;
		color: #50555b;
	}
	.mode i {
		width: 14px;
		height: 14px;
		border-radius: 50%;
		background: radial-gradient(circle at 40% 35%, #6c7177, #2a2d31 70%);
		box-shadow:
			0 0 0 2px #9ea2a7,
			0 1px 2px 2px rgb(0 0 0 / 0.25);
	}

	/* ── Port panel ─────────────────────────────────────── */
	.panel {
		flex: 1;
		min-width: 0;
		display: flex;
		align-items: center;
		gap: clamp(10px, 2cqi, 26px);
		padding: 12px clamp(10px, 1.8cqi, 22px);
	}
	.groups {
		flex: 1;
		min-width: 0;
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: clamp(8px, 1.6cqi, 18px);
	}
	.group {
		display: grid;
		gap: 5px;
	}

	/* Triangular port LEDs: ▲ for the upper port, ▼ for the lower port. */
	.port-leds {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: clamp(2px, 0.5cqi, 5px);
	}
	.led-pair {
		display: flex;
		justify-content: center;
		gap: 3px;
	}
	.tri {
		width: 7px;
		height: 6px;
		background: #1c2a20;
		transition:
			background-color 0.25s ease,
			filter 0.25s ease;
	}
	.tri.up {
		clip-path: polygon(50% 0, 100% 100%, 0 100%);
	}
	.tri.down {
		clip-path: polygon(0 0, 100% 0, 50% 100%);
	}
	.tri.lit,
	.tri.busy {
		background: var(--led-green);
		filter: drop-shadow(0 0 3px rgb(61 252 120 / 0.9));
	}

	.jacks {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 4px clamp(2px, 0.5cqi, 5px);
		padding: 4px;
		border-radius: 2px;
		background: #1e2124;
		box-shadow: inset 0 1px 3px rgb(0 0 0 / 0.7);
	}

	/* RJ45 jack: steel shield and a black cavity. The upper row is mounted
	   latch-up and the lower row latch-down, as on the real panel. */
	.jack {
		position: relative;
		display: block;
		aspect-ratio: 1.15;
		border-radius: 2px;
		background: linear-gradient(180deg, #c5c8cc, #8b8f95 50%, #6a6e74);
		box-shadow:
			inset 0 0 0 1px rgb(0 0 0 / 0.4),
			0 1px 0 rgb(255 255 255 / 0.08);
	}
	.cavity {
		position: absolute;
		inset: 10% 9%;
		background: radial-gradient(120% 90% at 50% 15%, #1c1d1f, #040404 70%);
	}
	.jack.lower .cavity {
		clip-path: polygon(0 0, 100% 0, 100% 74%, 67% 74%, 67% 100%, 33% 100%, 33% 74%, 0 74%);
	}
	.jack.upper .cavity {
		clip-path: polygon(33% 0, 67% 0, 67% 26%, 100% 26%, 100% 100%, 0 100%, 0 26%, 33% 26%);
	}
	/* Contacts sit opposite the latch. */
	.cavity::after {
		content: '';
		position: absolute;
		left: 18%;
		right: 18%;
		height: 22%;
		background: repeating-linear-gradient(90deg, #e0bf63 0 1.4px, transparent 1.4px 3.6px);
		opacity: 0.85;
	}
	.jack.lower .cavity::after {
		top: 6%;
	}
	.jack.upper .cavity::after {
		bottom: 6%;
	}

	a.jack {
		outline-offset: 3px;
	}
	a.jack:focus-visible {
		outline: 2px solid var(--c-gold-light);
	}

	/* The patch plug's rubber boot, seen end-on. The cable leaves from its centre. */
	.boot {
		position: absolute;
		left: 22%;
		right: 22%;
		top: 8%;
		bottom: 22%;
		border-radius: 2px 2px 4px 4px;
		background:
			repeating-linear-gradient(180deg, rgb(0 0 0 / 0.16) 0 1px, transparent 1px 3px),
			linear-gradient(90deg, rgb(0 0 0 / 0.35), transparent 30% 70%, rgb(0 0 0 / 0.35)),
			linear-gradient(180deg, color-mix(in srgb, var(--cable-a) 70%, #fff), var(--cable-a) 60%);
		box-shadow:
			0 2px 3px rgb(0 0 0 / 0.6),
			inset 0 1px 0 rgb(255 255 255 / 0.3);
		transition: box-shadow 0.25s ease;
	}
	.boot.alt {
		background:
			repeating-linear-gradient(180deg, rgb(0 0 0 / 0.18) 0 1px, transparent 1px 3px),
			linear-gradient(90deg, rgb(0 0 0 / 0.35), transparent 30% 70%, rgb(0 0 0 / 0.35)),
			linear-gradient(180deg, color-mix(in srgb, var(--cable-b) 70%, #fff), var(--cable-b) 60%);
	}
	a.jack.is-hovered .boot,
	a.jack:focus-visible .boot {
		box-shadow:
			0 0 0 2px rgb(250 197 73 / 0.9),
			0 0 12px rgb(250 197 73 / 0.6);
	}

	/* ── Uplinks ────────────────────────────────────────── */
	.uplinks {
		flex: 0 0 auto;
		display: grid;
		justify-items: center;
		gap: 5px;
		padding: 4px;
		border-radius: 3px;
		text-decoration: none;
	}
	.uplinks:focus-visible {
		outline: 2px solid var(--c-gold-light);
	}
	.uplinks .port-leds,
	.uplink-jacks {
		grid-template-columns: repeat(2, 38px);
	}
	.silk {
		font-family: var(--mono);
		font-size: 0.5rem;
		letter-spacing: 0.1em;
		color: var(--silk);
	}
	.uplinks:hover .jack:first-child .cavity,
	.uplinks:focus-visible .jack:first-child .cavity {
		box-shadow: inset 0 0 8px rgb(250 197 73 / 0.5);
	}

	/* ── Behaviour ──────────────────────────────────────── */
	@media (prefers-reduced-motion: no-preference) {
		.tri.busy {
			animation: led-traffic 0.9s steps(1, end) infinite;
		}
	}
	@keyframes led-traffic {
		0%,
		22%,
		48%,
		70% {
			opacity: 1;
		}
		12%,
		36%,
		58%,
		88% {
			opacity: 0.2;
		}
	}

	/* ── Narrow chassis ─────────────────────────────────── */
	@container switch (width < 860px) {
		.series,
		.silk,
		.mode {
			display: none;
		}
		.bezel {
			grid-template-areas:
				'logo'
				'leds';
			grid-template-columns: auto;
		}
		.uplinks .port-leds,
		.uplink-jacks {
			grid-template-columns: repeat(2, 28px);
		}
	}
	@container switch (width < 600px) {
		.bezel,
		.uplinks {
			display: none;
		}
		.ear {
			flex-basis: 16px;
			padding: 10px 0;
		}
		.screw {
			width: 8px;
			height: 8px;
		}
		.panel {
			padding: 8px 6px;
		}
		.groups {
			gap: 5px;
		}
		.jacks {
			padding: 2px;
			gap: 2px;
		}
		.tri {
			width: 5px;
			height: 4px;
		}
	}
</style>
