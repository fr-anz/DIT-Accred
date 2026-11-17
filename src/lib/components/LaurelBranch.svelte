<script>
	/**
	 * Decorative laurel branch drawn along a quadratic curve. `mirror` flips it to
	 * the right-hand side so two instances frame a title like an award wreath.
	 */
	let { mirror = false, class: className = '' } = $props();

	const P0 = [32, 98];
	const P1 = [-6, 52];
	const P2 = [26, 4];

	/** @param {number} t */
	function at(t) {
		const u = 1 - t;
		const x = u * u * P0[0] + 2 * u * t * P1[0] + t * t * P2[0];
		const y = u * u * P0[1] + 2 * u * t * P1[1] + t * t * P2[1];
		const dx = 2 * u * (P1[0] - P0[0]) + 2 * t * (P2[0] - P1[0]);
		const dy = 2 * u * (P1[1] - P0[1]) + 2 * t * (P2[1] - P1[1]);
		return { x, y, angle: (Math.atan2(dy, dx) * 180) / Math.PI };
	}

	const leaves = Array.from({ length: 7 }, (_, i) => {
		const t = 0.1 + i * 0.13;
		const { x, y, angle } = at(t);
		const scale = 1.15 - i * 0.08;
		return [
			{ x, y, angle: angle - 38, scale, tone: i % 2 },
			{ x, y, angle: angle + 38, scale: scale * 0.92, tone: (i + 1) % 2 }
		];
	}).flat();
	const tip = at(1);
</script>

<svg
	class={className}
	viewBox="0 0 40 100"
	aria-hidden="true"
	focusable="false"
	style:transform={mirror ? 'scaleX(-1)' : undefined}
>
	<path
		d="M{P0[0]} {P0[1]} Q{P1[0]} {P1[1]} {P2[0]} {P2[1]}"
		fill="none"
		stroke="currentColor"
		stroke-width="1.6"
		stroke-linecap="round"
	/>
	{#each leaves as leaf, i (i)}
		<path
			d="M0 0 Q6 -3.6 12 0 Q6 3.6 0 0Z"
			fill="currentColor"
			opacity={leaf.tone ? 0.72 : 1}
			transform="translate({leaf.x} {leaf.y}) rotate({leaf.angle}) scale({leaf.scale})"
		/>
	{/each}
	<path
		d="M0 0 Q6 -3.4 12 0 Q6 3.4 0 0Z"
		fill="currentColor"
		transform="translate({tip.x} {tip.y}) rotate({tip.angle})"
	/>
</svg>
