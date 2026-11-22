<script lang="ts">
	/* The compliance areas as a patched switch. A cable runs from each port into
	   a braided loom and leaves the loom beside its area card. As the reader
	   scrolls, a link signal travels down the loom and brings each port up. The
	   cards are ordinary links and read correctly without the cabling, which is
	   measured and drawn only after hydration. */
	import { onMount } from 'svelte';
	import { ArrowUpRight } from '@lucide/svelte';
	import NetworkSwitch from './NetworkSwitch.svelte';

	type Area = { id: number; title: string; href: string };
	let { areas }: { areas: Area[] } = $props();

	type Geometry = {
		width: number;
		height: number;
		loomX: number;
		loomTop: number;
		loomEnd: number;
		loom: string;
		feeds: string[];
		drops: string[];
		ties: { x: number; y: number; w: number }[];
		exits: number[];
		/** Link-light positions at the switch end and the card end of each cable. */
		lights: { x: number; y: number }[][];
	};

	let bay: HTMLDivElement;
	let switchWrap: HTMLDivElement;
	let boots: HTMLElement[] = $state([]);
	let jacks: HTMLElement[] = $state([]);

	let geo = $state<Geometry | null>(null);
	let signalY = $state(-Infinity);
	let hovered = $state(-1);

	const r = (n: number) => Math.round(n * 10) / 10;

	let linked = $derived(geo ? geo.exits.filter((y) => y <= signalY).length : 0);
	/* Traffic flows on the newest link until the reader moves well past the last area. */
	let active = $derived(
		geo && linked > 0 && signalY < geo.exits[geo.exits.length - 1] + 240 ? linked - 1 : -1
	);
	/* Packet Tracer link lights: green ▲ when up, amber ● while the link comes
	   up (the signal is close), red ▼ when down. */
	const linkState = (i: number) =>
		i < linked ? 'up' : geo && geo.exits[i] - signalY < 160 ? 'coming' : 'down';

	let signalEnd = $derived(geo ? Math.max(geo.loomTop, Math.min(signalY, geo.loomEnd)) : 0);

	function measure() {
		if (!bay || !switchWrap || boots.length < areas.length || jacks.length < areas.length) return;
		const box = bay.getBoundingClientRect();
		const narrow = box.width < 760;
		const n = areas.length;
		const lane = narrow ? 3 : 5;
		const halfAt = (k: number) => (lane * (n - k)) / 2 + (narrow ? 4 : 7);

		const switchBottom = switchWrap.getBoundingClientRect().bottom - box.top;
		const firstJack = jacks[0].getBoundingClientRect();
		const firstExit = firstJack.top + firstJack.height / 2 - box.top;
		const loomX = narrow ? 22 : box.width / 2;
		const loomTop = Math.min(switchBottom + (narrow ? 64 : 110), firstExit - 70);
		const fan = loomTop - switchBottom;

		const lights: { x: number; y: number }[][] = [];
		const feeds = boots.map((boot, i) => {
			const b = boot.getBoundingClientRect();
			const x = b.left + b.width / 2 - box.left;
			const y = b.top + b.height / 2 - box.top;
			const laneX = loomX + (i - (n - 1) / 2) * lane;
			const drop = switchBottom + 4;
			lights[i] = [{ x, y: switchBottom + 16 }];
			return `M${r(x)} ${r(y)}L${r(x)} ${r(drop)}C${r(x)} ${r(drop + fan * 0.6)} ${r(laneX)} ${r(
				loomTop - fan * 0.55
			)} ${r(laneX)} ${r(loomTop + 8)}`;
		});

		const exits: number[] = [];
		const drops = jacks.map((jack, i) => {
			const j = jack.getBoundingClientRect();
			const dir = narrow || j.left - box.left > loomX ? 1 : -1;
			const ex = (dir > 0 ? j.left : j.right) - box.left;
			const ey = j.top + j.height / 2 - box.top;
			exits.push(ey);
			lights[i].push({ x: ex - dir * 18, y: ey + (narrow ? 0 : 1) });
			const x0 = loomX + dir * (halfAt(i) - 2);
			const y0 = ey - (narrow ? 22 : 34);
			const reach = Math.abs(ex - x0);
			return `M${r(x0)} ${r(y0)}C${r(x0 + dir * reach * 0.35)} ${r(y0)} ${r(ex - dir * reach * 0.45)} ${r(
				ey
			)} ${r(ex)} ${r(ey)}`;
		});

		// Braided loom: it narrows by one cable after each exit.
		const right: [number, number][] = [[loomX + halfAt(0) + 3, loomTop - 6]];
		right.push([loomX + halfAt(0), loomTop + 10]);
		exits.forEach((y, k) => {
			right.push([loomX + halfAt(k), y - (narrow ? 18 : 28)]);
			right.push([loomX + halfAt(k + 1), y + (narrow ? 6 : 10)]);
		});
		const loomEnd = exits[n - 1] + (narrow ? 26 : 40);
		right.push([loomX + halfAt(n), loomEnd - halfAt(n)]);
		const left = right.map(([x, y]) => [2 * loomX - x, y] as [number, number]).reverse();
		const tip = halfAt(n);
		const loom =
			`M${right.map(([x, y]) => `${r(x)} ${r(y)}`).join('L')}` +
			`Q${r(loomX + tip)} ${r(loomEnd)} ${r(loomX)} ${r(loomEnd)}` +
			`Q${r(loomX - tip)} ${r(loomEnd)} ${r(left[0][0])} ${r(left[0][1])}` +
			`L${left.map(([x, y]) => `${r(x)} ${r(y)}`).join('L')}Z`;

		const ties = exits.map((y, k) => ({
			x: loomX - halfAt(k) - 2,
			y: y - (narrow ? 40 : 58),
			w: 2 * halfAt(k) + 4
		}));

		geo = {
			width: box.width,
			height: box.height,
			loomX,
			loomTop,
			loomEnd,
			loom,
			feeds,
			drops,
			ties,
			exits,
			lights
		};
		track();
	}

	function track() {
		if (!bay) return;
		signalY = window.innerHeight * 0.58 - bay.getBoundingClientRect().top;
	}

	onMount(() => {
		let frame = 0;
		const onScroll = () => {
			if (frame) return;
			frame = requestAnimationFrame(() => {
				frame = 0;
				track();
			});
		};
		const resizer = new ResizeObserver(() => measure());
		resizer.observe(bay);
		measure();
		document.fonts?.ready.then(measure);
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll, { passive: true });
		return () => {
			resizer.disconnect();
			cancelAnimationFrame(frame);
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
		};
	});

	const setHover = (i: number) => (hovered = i);
</script>

<div class="bay" class:is-wired={geo !== null} bind:this={bay}>
	{#if geo}
		<svg
			class="cabling"
			width={geo.width}
			height={geo.height}
			viewBox="0 0 {geo.width} {geo.height}"
			aria-hidden="true"
		>
			<defs>
				<pattern id="pb-braid" width="8" height="8" patternUnits="userSpaceOnUse">
					<rect width="8" height="8" fill="#17130f" />
					<path d="M0 8 8 0M-2 2 2-2M6 10 10 6" stroke="#5b4a23" stroke-width="1.6" />
					<path d="M0 0 8 8M-2 6 2 10M6-2 10 2" stroke="#2c241a" stroke-width="1.6" />
				</pattern>
				<linearGradient id="pb-loom-shade" x1="0" x2="1" y1="0" y2="0">
					<stop offset="0" stop-color="#000" stop-opacity="0.55" />
					<stop offset="0.35" stop-color="#fff" stop-opacity="0.06" />
					<stop offset="0.65" stop-color="#000" stop-opacity="0" />
					<stop offset="1" stop-color="#000" stop-opacity="0.6" />
				</linearGradient>
				<!-- User-space bounds: a vertical line has a zero-width bounding box, which
				     would otherwise clip the filter region to nothing. -->
				<filter
					id="pb-glow"
					filterUnits="userSpaceOnUse"
					x="0"
					y="0"
					width={geo.width}
					height={geo.height}
				>
					<feGaussianBlur stdDeviation="4" result="blur" />
					<feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
				</filter>
			</defs>

			<!-- Patch leads from each port into the mouth of the loom. -->
			{#each geo.feeds as d, i (i)}
				<g
					class="cable"
					class:alt={areas[i].id % 2 === 0}
					class:is-linked={i < linked}
					class:is-hovered={i === hovered}
				>
					<path class="cable-shadow" {d} />
					<path class="cable-core" {d} />
					<path class="cable-sheen" {d} />
					<path class="cable-packets" {d} />
				</g>
			{/each}

			<path class="loom" d={geo.loom} fill="url(#pb-braid)" />
			<path class="loom loom-edge" d={geo.loom} fill="url(#pb-loom-shade)" />

			<!-- The link signal, travelling down the inside of the loom. -->
			{#if signalEnd > geo.loomTop}
				<line
					class="signal"
					x1={geo.loomX}
					y1={geo.loomTop}
					x2={geo.loomX}
					y2={signalEnd}
					filter="url(#pb-glow)"
				/>
				{#if signalEnd < geo.loomEnd}
					<circle class="signal-head" cx={geo.loomX} cy={signalEnd} r="5" filter="url(#pb-glow)" />
				{/if}
			{/if}

			{#each geo.ties as tie, i (i)}
				<rect class="tie" x={tie.x} y={tie.y} width={tie.w} height="7" rx="2" />
			{/each}
			<rect
				class="collar"
				x={geo.ties[0].x - 4}
				y={geo.loomTop - 10}
				width={geo.ties[0].w + 8}
				height="14"
				rx="4"
			/>

			<!-- Each cable leaves the loom and runs to its area. -->
			{#each geo.drops as d, i (i)}
				<g
					class="cable"
					class:alt={areas[i].id % 2 === 0}
					class:is-linked={i < linked}
					class:is-hovered={i === hovered}
				>
					<path class="cable-shadow" {d} />
					<path class="cable-core" {d} />
					<path class="cable-sheen" {d} />
					<path class="cable-packets" {d} />
				</g>
			{/each}

			{#each geo.lights as ends, i (i)}
				{#each ends as { x, y }, e (e)}
					{@const state = linkState(i)}
					{#if state === 'coming'}
						<circle class="link-light coming" cx={x} cy={y} r="4.5" />
					{:else}
						<path
							class="link-light {state}"
							d={state === 'up'
								? `M${x} ${y - 5}L${x + 5.5} ${y + 4}L${x - 5.5} ${y + 4}Z`
								: `M${x - 5.5} ${y - 4}L${x + 5.5} ${y - 4}L${x} ${y + 5}Z`}
						/>
					{/if}
				{/each}
			{/each}
		</svg>
	{/if}

	<div class="switch-wrap" bind:this={switchWrap}>
		<NetworkSwitch ports={areas} {linked} {active} {hovered} bind:boots onhover={setHover} />
	</div>

	<ol class="areas">
		{#each areas as area, i (area.id)}
			<li
				class="area"
				class:side-left={i % 2 === 1}
				class:is-linked={i < linked}
				class:is-active={i === active}
				class:is-hovered={i === hovered}
				id="area-{area.id}"
				style="--row: {i + 1}"
			>
				<a
					class="card"
					href={area.href}
					target="_blank"
					rel="external noopener noreferrer"
					onpointerenter={() => setHover(i)}
					onpointerleave={() => setHover(-1)}
					onfocus={() => setHover(i)}
					onblur={() => setHover(-1)}
				>
					<span class="nic" bind:this={jacks[i]} aria-hidden="true">
						<span class="nic-jack"><span class="plug" class:alt={area.id % 2 === 0}></span></span>
						<i class="nic-led link"></i>
						<i class="nic-led act"></i>
					</span>
					<span class="screws" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
					<span class="vents" aria-hidden="true"></span>
					<span class="tag">Area {area.id}</span>
					<h3 class="card-title">{area.title}</h3>
					<span class="card-foot">
						<span class="leds" aria-hidden="true">
							<span><i class="led pwr"></i>PWR</span>
							<span><i class="led link"></i>LINK</span>
							<span><i class="led act"></i>ACT</span>
						</span>
						<span class="card-cta">
							Open compliance report
							<ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" />
						</span>
					</span>
					<span class="visually-hidden">(opens in a new tab)</span>
				</a>
			</li>
		{/each}
	</ol>

	<div class="closer">
		<p class="closer-line">technology connects people.</p>
	</div>
</div>

<style>
	.bay {
		--cable-a: #d6a73b;
		--cable-b: #b9282d;
		--ink-cream: #f4ecd9;
		--mono: ui-monospace, 'SFMono-Regular', 'JetBrains Mono', Menlo, Consolas, monospace;
		--gutter: 200px;
		--row-gap: 24px;

		position: relative;
		width: min(100%, 1240px);
		margin-inline: auto;
	}

	.cabling {
		position: absolute;
		inset: 0;
		z-index: 2;
		pointer-events: none;
		overflow: visible;
	}

	.switch-wrap {
		position: relative;
		z-index: 1;
		margin-bottom: 190px;
	}
	/* ── Cables ─────────────────────────────────────────── */
	.cable {
		--c: var(--cable-a);
		fill: none;
		stroke-linecap: round;
		stroke-linejoin: round;
	}
	.cable.alt {
		--c: var(--cable-b);
	}
	.cable-shadow {
		stroke: #000;
		stroke-opacity: 0.55;
		stroke-width: 7;
		transform: translate(1.5px, 3px);
	}
	.cable-core {
		stroke: var(--c);
		stroke-width: 4.5;
		stroke-opacity: 0.55;
		transition:
			stroke-opacity 0.35s ease,
			stroke-width 0.25s ease;
	}
	.cable-sheen {
		stroke: #fff;
		stroke-width: 1.2;
		stroke-opacity: 0.12;
		transform: translate(-0.8px, -0.8px);
	}
	.cable-packets {
		stroke: #fff6dc;
		stroke-width: 2;
		stroke-dasharray: 2 26;
		stroke-opacity: 0;
		transition: stroke-opacity 0.4s ease;
	}
	.cable.is-linked .cable-core {
		stroke-opacity: 1;
	}
	.cable.is-linked .cable-packets {
		stroke-opacity: 0.75;
	}
	.cable.is-hovered .cable-core {
		stroke-opacity: 1;
		stroke-width: 6;
	}
	.cable.is-hovered .cable-shadow {
		stroke: var(--c);
		stroke-opacity: 0.35;
		stroke-width: 16;
		transform: none;
		filter: blur(5px);
	}

	.loom {
		stroke: none;
	}
	.loom-edge {
		stroke: #070605;
		stroke-width: 1.5;
		stroke-linejoin: round;
	}
	.tie {
		fill: #6e1216;
		stroke: #2a0507;
		stroke-width: 1;
	}
	.collar {
		fill: #2b2d31;
		stroke: #0b0b0c;
		stroke-width: 1;
	}
	.signal {
		stroke: #3dfc78;
		stroke-width: 3;
		stroke-linecap: round;
		opacity: 0.9;
	}
	.link-light {
		stroke: rgb(0 0 0 / 0.6);
		stroke-width: 1;
		transition: fill 0.25s ease;
	}
	.link-light.up {
		fill: #2bd34f;
	}
	.link-light.coming {
		fill: #ff9a1a;
	}
	.link-light.down {
		fill: #e3262b;
	}

	.signal-head {
		fill: #c9ffd9;
	}

	/* ── Area cards ─────────────────────────────────────── */
	.areas {
		position: relative;
		z-index: 3;
		list-style: none;
		margin: 0;
		padding: 0;
		/* Every card spans two equal rows and the next card starts one row lower
		   on the other side, so the gaps between cards are identical throughout. */
		display: grid;
		grid-template-columns: 1fr var(--gutter) 1fr;
		grid-auto-rows: 1fr;
		row-gap: var(--row-gap);
	}

	.area {
		display: grid;
		grid-column: 3;
		grid-row: var(--row) / span 2;
		scroll-margin-block: 28vh;
	}
	.area.side-left {
		grid-column: 1;
	}

	/* Each area is a small network appliance: a slate faceplate with corner
	   screws and vent slots, an RJ45 port on the edge facing the loom where its
	   cable plugs in, a label-maker tag, and status LEDs. */
	.card {
		--pad-nic: 40px;
		--pad-vent: 46px;

		position: relative;
		display: grid;
		grid-template-rows: auto auto 1fr;
		justify-items: start;
		gap: 10px;
		padding: 22px var(--pad-vent) 18px var(--pad-nic);
		border-radius: 6px;
		text-decoration: none;
		color: var(--ink-cream);
		background:
			repeating-linear-gradient(90deg, rgb(255 255 255 / 0.018) 0 1px, transparent 1px 3px),
			linear-gradient(180deg, #4b5157 0%, #363b40 9%, #30353a 75%, #272b2f 100%);
		box-shadow:
			inset 0 1px 0 rgb(255 255 255 / 0.18),
			inset 0 -2px 0 rgb(0 0 0 / 0.45),
			0 0 0 1px rgb(0 0 0 / 0.65),
			0 2px 0 #0c0d0e,
			0 18px 36px -18px rgb(0 0 0 / 0.45);
		transition:
			transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
			box-shadow 0.3s ease;
	}
	.side-left .card {
		padding: 22px var(--pad-nic) 18px var(--pad-vent);
	}
	.card:focus-visible {
		outline: 2px solid var(--c-gold-light);
		outline-offset: 4px;
	}
	.area.is-active .card,
	.area.is-hovered .card {
		box-shadow:
			inset 0 1px 0 rgb(255 255 255 / 0.22),
			inset 0 -2px 0 rgb(0 0 0 / 0.45),
			0 0 0 1px rgb(250 197 73 / 0.55),
			0 2px 0 #0c0d0e,
			0 22px 44px -16px rgb(0 0 0 / 0.5),
			0 0 36px -8px rgb(214 167 59 / 0.4);
	}

	/* Pan-head screws in the four corners. */
	.screws i {
		position: absolute;
		width: 9px;
		height: 9px;
		border-radius: 50%;
		background:
			linear-gradient(45deg, transparent 42%, #4a4e54 42% 58%, transparent 58%),
			radial-gradient(circle at 35% 30%, #eceef0, #9ea2a8 45%, #565a60);
		box-shadow:
			0 0 0 1.5px #1d2023,
			0 1px 1px 1.5px rgb(0 0 0 / 0.4);
	}
	.screws i:nth-child(1) {
		top: 8px;
		left: 8px;
	}
	.screws i:nth-child(2) {
		top: 8px;
		right: 8px;
	}
	.screws i:nth-child(3) {
		bottom: 8px;
		left: 8px;
	}
	.screws i:nth-child(4) {
		bottom: 8px;
		right: 8px;
	}

	/* Vent slots along the edge away from the port. */
	.vents {
		position: absolute;
		top: 24px;
		bottom: 24px;
		right: 14px;
		width: 16px;
		border-radius: 2px;
		background: repeating-linear-gradient(
			180deg,
			#0b0c0d 0 3px,
			rgb(255 255 255 / 0.07) 3px 4px,
			transparent 4px 7px
		);
		mask-image: linear-gradient(180deg, transparent, #000 12% 88%, transparent);
	}
	.side-left .vents {
		right: auto;
		left: 14px;
	}

	/* RJ45 port on the edge facing the loom, with the cable's plug seated in it. */
	.nic {
		position: absolute;
		top: 50%;
		left: -16px;
		display: grid;
		justify-items: center;
		gap: 4px;
		padding: 5px 4px;
		transform: translateY(-50%);
		border-radius: 4px;
		background: linear-gradient(180deg, #3f4449, #2a2e32);
		box-shadow:
			0 0 0 1px rgb(0 0 0 / 0.7),
			inset 0 1px 0 rgb(255 255 255 / 0.12),
			0 4px 8px rgb(0 0 0 / 0.5);
	}
	.side-left .nic {
		left: auto;
		right: -16px;
	}
	.nic-jack {
		position: relative;
		display: block;
		width: 28px;
		height: 24px;
		border-radius: 2px;
		background: linear-gradient(180deg, #c5c8cc, #8b8f95 50%, #6a6e74);
		box-shadow: inset 0 0 0 1px rgb(0 0 0 / 0.4);
	}
	.nic-jack::before {
		content: '';
		position: absolute;
		inset: 3px;
		background: #050505;
		clip-path: polygon(0 0, 100% 0, 100% 74%, 67% 74%, 67% 100%, 33% 100%, 33% 74%, 0 74%);
	}
	.plug {
		position: absolute;
		inset: 3px 6px 6px;
		border-radius: 2px 2px 3px 3px;
		background:
			repeating-linear-gradient(180deg, rgb(0 0 0 / 0.16) 0 1px, transparent 1px 3px),
			linear-gradient(90deg, rgb(0 0 0 / 0.35), transparent 30% 70%, rgb(0 0 0 / 0.35)),
			linear-gradient(180deg, color-mix(in srgb, var(--cable-a) 70%, #fff), var(--cable-a) 60%);
		box-shadow: 0 1px 2px rgb(0 0 0 / 0.6);
	}
	.plug.alt {
		background:
			repeating-linear-gradient(180deg, rgb(0 0 0 / 0.18) 0 1px, transparent 1px 3px),
			linear-gradient(90deg, rgb(0 0 0 / 0.35), transparent 30% 70%, rgb(0 0 0 / 0.35)),
			linear-gradient(180deg, color-mix(in srgb, var(--cable-b) 70%, #fff), var(--cable-b) 60%);
	}
	.nic-led {
		position: absolute;
		top: 2px;
		width: 5px;
		height: 3px;
		border-radius: 1px;
		background: #1c2a20;
	}
	.nic-led.link {
		left: 5px;
	}
	.nic-led.act {
		right: 5px;
		background: #2a2112;
	}

	/* Label-maker tape. */
	.tag {
		padding: 3px 9px 2px;
		border-radius: 2px;
		font-family: var(--mono);
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: #141414;
		background:
			linear-gradient(180deg, rgb(255 255 255 / 0.6), transparent 40%),
			linear-gradient(180deg, #f4f1e6, #e2ddcc);
		box-shadow:
			0 1px 0 rgb(0 0 0 / 0.35),
			0 2px 4px rgb(0 0 0 / 0.3);
		transform: rotate(-0.6deg);
	}
	.card-title {
		margin: 0;
		font-family: var(--font-heading);
		font-size: clamp(1.3rem, 1.9vw, 1.75rem);
		font-weight: 700;
		line-height: 1.2;
		letter-spacing: 0.01em;
		color: #f1f2f3;
		text-shadow: 0 1px 0 rgb(0 0 0 / 0.5);
		text-wrap: balance;
	}

	.card-foot {
		align-self: end;
		justify-self: stretch;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		margin-top: 6px;
		padding-top: 12px;
		border-top: 1px solid rgb(0 0 0 / 0.45);
		box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.06);
	}
	.leds {
		display: flex;
		gap: 12px;
		font-family: var(--mono);
		font-size: 0.6rem;
		letter-spacing: 0.1em;
		color: #c9ccd0;
	}
	.leds span {
		display: inline-flex;
		align-items: center;
		gap: 5px;
	}
	.led {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: #1c2a20;
		box-shadow: inset 0 1px 1px rgb(0 0 0 / 0.6);
		transition:
			background-color 0.3s ease,
			box-shadow 0.3s ease;
	}
	.led.act {
		background: #2a2112;
	}
	.led.pwr,
	.area.is-linked .led.link,
	.area.is-linked .nic-led.link {
		background: #3dfc78;
		box-shadow: 0 0 6px 1px rgb(61 252 120 / 0.75);
	}
	.area.is-linked.is-active .led.act,
	.area.is-linked.is-hovered .led.act,
	.area.is-linked.is-active .nic-led.act,
	.area.is-linked.is-hovered .nic-led.act {
		background: #ffb12a;
		box-shadow: 0 0 6px 1px rgb(255 177 42 / 0.75);
	}

	.card-cta {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-family: var(--font-heading);
		font-size: 0.95rem;
		font-weight: 600;
		letter-spacing: var(--track-tight);
		color: var(--c-gold-light);
		white-space: nowrap;
	}
	.card-cta :global(svg) {
		transition: transform 0.25s ease;
	}
	.card:hover .card-cta :global(svg),
	.card:focus-visible .card-cta :global(svg) {
		transform: translate(2px, -2px);
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

	/* ── Closer ─────────────────────────────────────────── */
	.closer {
		position: relative;
		z-index: 3;
		display: grid;
		justify-items: center;
		gap: 40px;
		margin-top: 120px;
	}

	.closer-line {
		margin: 0;
		font-family: var(--font-heading);
		font-weight: 800;
		font-size: clamp(2rem, 5.4vw, 4.75rem);
		line-height: 1.05;
		letter-spacing: -0.01em;
		text-align: center;
		color: var(--c-gold);
		background: var(--grad-gold);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	@media (prefers-reduced-motion: no-preference) {
		.cable.is-linked .cable-packets {
			animation: packets 1.1s linear infinite;
		}
		.area.is-active .card {
			transform: translateY(-3px);
		}
		.area.is-linked.is-active .led.act,
		.area.is-linked.is-hovered .led.act,
		.area.is-linked.is-active .nic-led.act,
		.area.is-linked.is-hovered .nic-led.act {
			animation: card-traffic 0.9s steps(1, end) infinite;
		}
	}

	@keyframes card-traffic {
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

	@keyframes packets {
		to {
			stroke-dashoffset: -28;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.card,
		.cable-core,
		.cable-packets {
			transition: none;
		}
	}

	/* ── Narrow layout: loom on the left, cards stacked to its right. ── */
	@media (max-width: 1100px) {
		.bay {
			--gutter: 150px;
		}
	}
	@media (max-width: 759px) {
		.switch-wrap {
			margin-bottom: 120px;
		}
		.areas {
			grid-template-columns: 1fr;
			grid-auto-rows: auto;
			row-gap: 18px;
		}
		.area,
		.area.side-left {
			grid-column: 1;
			grid-row: auto;
			margin-left: 56px;
		}
		.card,
		.side-left .card {
			--pad-vent: 40px;
			padding: 20px var(--pad-vent) 16px 30px;
		}
		.side-left .nic {
			left: -16px;
			right: auto;
		}
		.side-left .vents {
			left: auto;
			right: 12px;
		}
		.card-foot {
			flex-wrap: wrap;
		}
		.card-cta {
			font-size: 0.9rem;
		}
		.closer {
			margin-top: 80px;
		}
	}
</style>
