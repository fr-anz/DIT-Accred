<script lang="ts">
	import { onMount } from 'svelte';
	import { regionDots, regionGrid } from '$lib/data/regionDots';
	import type { Partner } from '$lib/data/internationalization';

	type Place = { lat: number; lon: number };

	let {
		partners,
		home,
		trip,
		selected = $bindable(),
		showTrip = true
	}: {
		partners: Partner[];
		home: Place & { name: string };
		trip: Place & { event: string; place: string };
		selected: string;
		showTrip?: boolean;
	} = $props();

	const { cols, rows, step, lon0, lat1 } = regionGrid;

	/* Jakarta and South Tangerang sit about 15 km apart, so their pins are
	   nudged apart by a cell to keep both targets readable and tappable. */
	const nudge: Record<string, [number, number]> = { binus: [1.1, -0.9], unpam: [-1.1, 0.9] };
	const labelSide: Record<string, 'start' | 'end'> = {
		binus: 'end',
		unpam: 'start',
		umpsa: 'start',
		picab: 'start'
	};

	const project = ({ lat, lon }: Place, id = ''): [number, number] => {
		const [dx, dy] = nudge[id] ?? [0, 0];
		return [(lon - lon0) / step + dx, (lat1 - lat) / step + dy];
	};

	const [hx, hy] = $derived(project(home));

	/* ── Dithered dot field ──
	   The grid has no frame: an ordered (4×4 Bayer) dither thins the dots out
	   toward the edges so the map dissolves into the page. Coast cells get a
	   heavier dot, and a sparse halo of tiny dots marks the shallow sea within
	   two cells of land. Land near Manila is tinted gold. */
	type Dot = { x: number; y: number; r: number; kind: 'land' | 'coast' | 'sea' | 'near' };

	const bayer = [
		[0, 8, 2, 10],
		[12, 4, 14, 6],
		[3, 11, 1, 9],
		[15, 7, 13, 5]
	].map((row) => row.map((v) => (v + 0.5) / 16));

	const isLand = (x: number, y: number) => regionDots[y]?.[x] === '1';

	function seaDistance(x: number, y: number) {
		for (let d = 1; d <= 2; d++)
			for (let dy = -d; dy <= d; dy++)
				for (let dx = -d; dx <= d; dx++) if (isLand(x + dx, y + dy)) return d;
		return 0;
	}

	const dots: Dot[] = $derived.by(() => {
		const out: Dot[] = [];
		for (let y = 0; y < rows; y++) {
			for (let x = 0; x < cols; x++) {
				const nx = ((x + 0.5) / cols) * 2 - 1;
				const ny = ((y + 0.5) / rows) * 2 - 1;
				const edge = Math.min(1, Math.max(0, (1.02 - Math.hypot(nx, ny)) / 0.52));
				const threshold = bayer[y % 4][x % 4];
				const cx = x + 0.5;
				const cy = y + 0.5;
				if (isLand(x, y)) {
					if (edge <= threshold) continue;
					const coast = [
						[1, 0],
						[-1, 0],
						[0, 1],
						[0, -1]
					].some(([dx, dy]) => !isLand(x + dx, y + dy));
					const near = Math.hypot(cx - hx, cy - hy) < 4.5;
					out.push({
						x: cx,
						y: cy,
						r: (coast ? 0.27 : 0.21) + edge * 0.06,
						kind: near ? 'near' : coast ? 'coast' : 'land'
					});
				} else {
					const d = seaDistance(x, y);
					const shelf = d === 1 ? 0.55 : d === 2 ? 0.22 : 0;
					if (shelf * edge > threshold) out.push({ x: cx, y: cy, r: 0.11, kind: 'sea' });
				}
			}
		}
		return out;
	});

	function arc([tx, ty]: [number, number], bend = 0.28) {
		const mx = (hx + tx) / 2;
		const my = (hy + ty) / 2;
		const dx = tx - hx;
		const dy = ty - hy;
		// Bow every arc to the same side so the routes fan out from Manila.
		const cx = mx + dy * bend;
		const cy = my - dx * bend;
		return `M${hx.toFixed(2)} ${hy.toFixed(2)} Q${cx.toFixed(2)} ${cy.toFixed(2)} ${tx.toFixed(2)} ${ty.toFixed(2)}`;
	}

	const routes = $derived(
		partners.map((partner) => {
			const point = project(partner, partner.id);
			const atHome = Math.hypot(point[0] - hx, point[1] - hy) < 1;
			return { partner, point, atHome, path: atHome ? '' : arc(point) };
		})
	);

	const tripPoint = $derived(project(trip));
	const tripPath = $derived(arc(tripPoint, -0.22));

	let hovered = $state<string | null>(null);
	let animate = $state(false);
	const focusId = $derived(hovered ?? selected);

	/* Land around the focused partner lights up gold. */
	const focusPoint = $derived(
		focusId === 'trip' ? tripPoint : routes.find((r) => r.partner.id === focusId)?.point
	);
	const lit = (dot: Dot) =>
		dot.kind !== 'sea' &&
		!!focusPoint &&
		Math.hypot(dot.x - focusPoint[0], dot.y - focusPoint[1]) < 3.6;

	const pct = ([x, y]: [number, number]) =>
		`left:${((x / cols) * 100).toFixed(3)}%;top:${((y / rows) * 100).toFixed(3)}%`;

	onMount(() => {
		animate = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	});
</script>

<div class="network_map" class:animate>
	<svg viewBox="0 0 {cols} {rows}" aria-hidden="true" focusable="false">
		<defs>
			<mask id="map-scan" maskUnits="userSpaceOnUse">
				<circle class="scan" cx={hx} cy={hy} r="80" fill="#fff" />
			</mask>
			<linearGradient id="route-ink" x1="0" x2="1">
				<stop offset="0" stop-color="var(--c-gold-dark)" />
				<stop offset="1" stop-color="var(--c-maroon)" />
			</linearGradient>
		</defs>

		<g class="land" mask="url(#map-scan)">
			{#each dots as dot (`${dot.x}-${dot.y}`)}
				<circle class={dot.kind} class:lit={lit(dot)} cx={dot.x} cy={dot.y} r={dot.r} />
			{/each}
		</g>

		{#if showTrip}
			<path
				class="route trip"
				class:focus={focusId === 'trip'}
				d={tripPath}
				pathLength="1"
				style:--i={partners.length}
			/>
		{/if}

		{#each routes as route, i (route.partner.id)}
			{#if !route.atHome}
				<path
					class="route"
					class:focus={focusId === route.partner.id}
					class:dim={focusId !== route.partner.id && focusId !== 'trip'}
					d={route.path}
					pathLength="1"
					style:--i={i}
				/>
				{#if animate}
					<circle class="spark" r="0.42">
						<animateMotion
							dur="{3.2 + i * 0.4}s"
							begin="{1.6 + i * 0.35}s"
							repeatCount="indefinite"
							path={route.path}
						/>
					</circle>
				{/if}
			{/if}
		{/each}

		<g class="home_rings">
			<circle cx={hx} cy={hy} r="1.4" />
			<circle cx={hx} cy={hy} r="1.4" />
			<circle cx={hx} cy={hy} r="1.4" />
		</g>
	</svg>

	<span class="pin home" class:focus={focusId === 'picab'} style={pct([hx, hy])}>
		<span class="pin_dot"></span>
		<span class="pin_label end"><strong>PUP</strong> Manila</span>
	</span>

	{#each routes as route, i (route.partner.id)}
		{#if !route.atHome}
			<button
				type="button"
				class="pin"
				class:focus={focusId === route.partner.id}
				style="{pct(route.point)};--i:{i}"
				aria-pressed={selected === route.partner.id}
				aria-label="{route.partner.name}, {route.partner.place}, {route.partner.country}"
				onclick={() => (selected = route.partner.id)}
				onpointerenter={() => (hovered = route.partner.id)}
				onpointerleave={() => (hovered = null)}
				onfocus={() => (selected = route.partner.id)}
			>
				<span class="pin_dot"></span>
				<span class="pin_label {labelSide[route.partner.id] ?? 'end'}">
					<strong>{route.partner.short}</strong>
					{route.partner.place}
				</span>
			</button>
		{/if}
	{/each}

	{#if showTrip}
		<span class="pin trip_pin" class:focus={focusId === 'trip'} style="{pct(tripPoint)};--i:5">
			<span class="pin_dot"></span>
			<span class="pin_label start"><strong>{trip.event}</strong> Jeju</span>
		</span>
	{/if}
</div>

<style>
	.network_map {
		--map-ink: color-mix(in srgb, var(--c-maroon-deep) 30%, transparent);
		position: relative;
		width: 100%;
		aspect-ratio: 53 / 65;
		isolation: isolate;
		container-type: inline-size;
	}

	svg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		overflow: visible;
	}

	.land circle {
		fill: var(--map-ink);
	}

	.land circle {
		transition: fill 0.5s ease;
	}

	.land .coast {
		fill: color-mix(in srgb, var(--c-maroon) 46%, transparent);
	}

	.land .lit {
		fill: var(--c-gold);
	}

	.land .sea {
		fill: color-mix(in srgb, var(--c-gold-dark) 45%, transparent);
	}

	.land .near {
		fill: var(--c-gold-dark);
	}

	.route {
		fill: none;
		stroke: url(#route-ink);
		stroke-width: 0.26;
		stroke-linecap: round;
		transition:
			stroke-width 0.35s ease,
			opacity 0.35s ease;
	}

	.route.dim {
		opacity: 0.38;
	}

	.route.focus {
		stroke-width: 0.44;
		filter: drop-shadow(0 0 0.4px rgb(202 129 6 / 0.6));
	}

	.route.trip {
		stroke: var(--c-maroon-deep);
		stroke-dasharray: 0.012 0.018;
		stroke-width: 0.2;
	}

	.spark {
		fill: var(--c-gold-light);
		stroke: var(--c-maroon);
		stroke-width: 0.12;
	}

	.home_rings circle {
		fill: none;
		stroke: var(--c-maroon);
		stroke-width: 0.12;
		opacity: 0;
		transform-box: fill-box;
		transform-origin: center;
	}

	/* ── Pins ── */
	.pin {
		position: absolute;
		z-index: 1;
		display: grid;
		place-items: center;
		width: clamp(28px, 7cqi, 44px);
		height: clamp(28px, 7cqi, 44px);
		padding: 0;
		color: var(--c-surface);
		background: none;
		border: 0;
		translate: -50% -50%;
		cursor: pointer;
		font: inherit;
	}

	.pin.home,
	.pin.trip_pin {
		cursor: default;
	}

	.pin_dot {
		width: 38%;
		height: 38%;
		background: var(--c-gold-light);
		border: 2px solid var(--c-maroon);
		border-radius: 50%;
		box-shadow: 0 0 0 0 color-mix(in srgb, var(--c-gold) 60%, transparent);
		transition:
			scale 0.35s var(--motion-ease, ease),
			box-shadow 0.35s ease;
	}

	.home .pin_dot {
		width: 46%;
		height: 46%;
		background: #fff;
		border-color: var(--c-maroon);
		border-width: 3px;
	}

	.trip_pin .pin_dot {
		background: #fff;
		border: 2px solid var(--c-maroon-deep);
	}

	.pin.focus .pin_dot {
		scale: 1.35;
		box-shadow: 0 0 0 6px color-mix(in srgb, var(--c-gold) 28%, transparent);
	}

	.pin:focus-visible {
		outline: 2px solid var(--c-gold-dark);
		outline-offset: 2px;
		border-radius: 50%;
	}

	.pin_label {
		position: absolute;
		top: 50%;
		display: flex;
		flex-direction: column;
		padding: 5px 9px;
		color: color-mix(in srgb, var(--c-ink) 70%, transparent);
		background: rgb(255 255 255 / 0.92);
		border: 1px solid color-mix(in srgb, var(--c-gold-dark) 30%, transparent);
		box-shadow: 0 6px 16px -8px rgb(92 15 22 / 0.35);
		border-radius: 8px;
		font-size: clamp(9px, 2.4cqi, 13px);
		letter-spacing: 0.02em;
		line-height: 1.2;
		text-align: start;
		white-space: nowrap;
		translate: 0 -50%;
		backdrop-filter: blur(4px);
		transition:
			border-color 0.3s ease,
			background-color 0.3s ease;
	}

	.pin_label strong {
		color: var(--c-maroon);
		font-family: var(--font-heading);
		font-size: 1.15em;
		letter-spacing: 0.06em;
	}

	.pin_label.end {
		left: calc(100% - 4px);
	}

	.pin_label.start {
		right: calc(100% - 4px);
		text-align: end;
	}

	.pin_label.start {
		align-items: flex-end;
	}

	.pin.focus .pin_label {
		background: var(--c-maroon-deep);
		border-color: var(--c-maroon-deep);
		color: #fff;
	}

	.pin.focus .pin_label strong {
		color: var(--c-gold-light);
	}

	/* ── Entrance: land scans out from Manila, then routes draw in turn ── */
	@media (prefers-reduced-motion: no-preference) {
		.animate .scan {
			transform-box: fill-box;
			transform-origin: center;
			transform: scale(0);
			transition: transform 1.8s cubic-bezier(0.22, 1, 0.36, 1);
		}

		.animate .route {
			stroke-dashoffset: 1;
			stroke-dasharray: 1;
			transition:
				stroke-dashoffset 1.3s cubic-bezier(0.65, 0, 0.35, 1) calc(0.7s + var(--i) * 0.22s),
				stroke-width 0.35s ease,
				opacity 0.35s ease;
		}

		.animate .route.trip {
			stroke-dasharray: 0.012 0.018;
			stroke-dashoffset: 0;
			opacity: 0;
			transition: opacity 1s ease calc(0.7s + var(--i) * 0.22s);
		}

		.animate .pin:not(.home) {
			opacity: 0;
			scale: 0.6;
			transition:
				opacity 0.5s ease calc(1.4s + var(--i) * 0.22s),
				scale 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) calc(1.4s + var(--i) * 0.22s);
		}

		:global(.is-revealed) .animate .scan {
			transform: scale(1);
		}

		:global(.is-revealed) .animate .route {
			stroke-dashoffset: 0;
		}

		:global(.is-revealed) .animate .route.trip {
			opacity: 1;
		}

		:global(.is-revealed) .animate .pin:not(.home) {
			opacity: 1;
			scale: 1;
		}

		.animate .home_rings circle {
			animation: ring 3.6s cubic-bezier(0.2, 0.6, 0.3, 1) infinite;
		}

		.animate .home_rings circle:nth-child(2) {
			animation-delay: 1.2s;
		}

		.animate .home_rings circle:nth-child(3) {
			animation-delay: 2.4s;
		}
	}

	@keyframes ring {
		0% {
			opacity: 0.9;
			transform: scale(0.4);
		}
		100% {
			opacity: 0;
			transform: scale(3.4);
		}
	}
</style>
