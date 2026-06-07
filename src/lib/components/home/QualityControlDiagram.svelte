<script>
	let visualizerEl = $state();
	let isVisible = $state(false);

	$effect(() => {
		if (!visualizerEl || typeof IntersectionObserver === 'undefined') return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					isVisible = true;
					observer.disconnect();
				}
			},
			{ threshold: 0.3 }
		);

		observer.observe(visualizerEl);
		return () => observer.disconnect();
	});
</script>

<figure
	class="qc-visualizer"
	class:animate={isVisible}
	bind:this={visualizerEl}
	aria-label="Quality control diagram"
>
	<svg class="qc-svg" viewBox="0 0 1030 884" role="img">
		<title>Quality control connects instruction, research, extension, and compliance.</title>
		<defs>
			<linearGradient id="qc-bg" x1="100" y1="0" x2="850" y2="884" gradientUnits="userSpaceOnUse">
				<stop stop-color="#451516" />
				<stop offset="0.64" stop-color="#1a1614" />
				<stop offset="1" stop-color="#392e1f" />
			</linearGradient>
			<linearGradient
				id="qc-badge"
				x1="389"
				y1="442"
				x2="641"
				y2="442"
				gradientUnits="userSpaceOnUse"
			>
				<stop stop-color="#cfa83a" />
				<stop offset="1" stop-color="#ce870c" />
			</linearGradient>
		</defs>

		<rect width="1030" height="884" rx="60" fill="url(#qc-bg)" />

		<g class="rings">
			<ellipse cx="515" cy="442" rx="282" ry="270" />
			<ellipse cx="515" cy="442" rx="192" ry="184" />
			<ellipse cx="515" cy="442" rx="96" ry="92" />
		</g>

		<g class="connectors">
			<line x1="515" y1="154" x2="515" y2="442" />
			<line x1="515" y1="442" x2="796" y2="442" />
			<line x1="234" y1="442" x2="515" y2="442" />
			<line x1="515" y1="442" x2="515" y2="720" />
		</g>

		<g class="dots">
			<circle cx="515" cy="154" r="5" />
			<circle cx="796" cy="442" r="5" />
			<circle cx="234" cy="442" r="5" />
			<circle cx="515" cy="720" r="5" />
		</g>

		<g class="core">
			<rect x="378" y="387" width="274" height="110" rx="55" fill="url(#qc-badge)" />
			<text x="515" y="442">Quality Control</text>
		</g>

		<g class="node node-instruction">
			<rect x="425" y="62" width="180" height="54" rx="27" />
			<text x="515" y="89">Instruction</text>
		</g>

		<g class="node node-extension">
			<rect x="30" y="415" width="184" height="54" rx="27" />
			<text x="122" y="442">Extension</text>
		</g>

		<g class="node node-research">
			<rect x="830" y="415" width="160" height="54" rx="27" />
			<text x="910" y="442">Research</text>
		</g>

		<g class="node node-compliance">
			<rect x="406" y="762" width="228" height="54" rx="27" />
			<text x="520" y="789">Compliance</text>
		</g>
	</svg>
</figure>

<style>
	.qc-visualizer {
		width: 100%;
		max-width: 1030px;
		aspect-ratio: 1030 / 884;
		margin: 0;
	}

	.qc-svg {
		display: block;
		width: 100%;
		height: 100%;
		overflow: visible;
	}

	.rings ellipse {
		fill: none;
		stroke: rgba(255, 255, 255, 0.72);
		stroke-width: 2;
		stroke-dasharray: 9 9;
		transform-box: fill-box;
		transform-origin: center;
		opacity: 0;
	}

	.connectors line {
		stroke: #fac549;
		stroke-width: 2;
		opacity: 0;
	}

	.dots circle {
		fill: #fac549;
		opacity: 0;
	}

	.core,
	.node {
		opacity: 0;
		transform-box: fill-box;
		transform-origin: center;
	}

	.core text {
		fill: #b30e12;
		font-family: 'Overpass', sans-serif;
		font-size: 32px;
		font-weight: 700;
		letter-spacing: 1px;
		text-anchor: middle;
		dominant-baseline: middle;
	}

	.node rect {
		fill: transparent;
		stroke: #ffffff;
		stroke-width: 4;
	}

	.node text {
		fill: #ffffff;
		font-family: 'Inter', sans-serif;
		font-size: 26px;
		font-weight: 500;
		text-anchor: middle;
		dominant-baseline: middle;
	}

	.animate .rings ellipse {
		animation: ringExpand 0.5s linear forwards;
	}

	.animate .rings ellipse:nth-child(1) {
		animation-delay: 0.4s;
	}

	.animate .rings ellipse:nth-child(2) {
		animation-delay: 0.2s;
	}

	.animate .rings ellipse:nth-child(3) {
		animation-delay: 0s;
	}

	.animate .core {
		animation: nodePop 0.35s ease-out 0.8s forwards;
	}

	.animate .connectors line {
		animation: fadeIn 0.3s linear forwards;
	}

	.animate .connectors line:nth-child(1) {
		animation-delay: 1.2s;
	}

	.animate .connectors line:nth-child(2) {
		animation-delay: 1.5s;
	}

	.animate .connectors line:nth-child(3) {
		animation-delay: 1.8s;
	}

	.animate .connectors line:nth-child(4) {
		animation-delay: 2.1s;
	}

	.animate .dots circle,
	.animate .node {
		animation: nodePop 0.25s ease-out forwards;
	}

	.animate .dots circle:nth-child(1),
	.animate .node-instruction {
		animation-delay: 1.5s;
	}

	.animate .dots circle:nth-child(2),
	.animate .node-research {
		animation-delay: 1.8s;
	}

	.animate .dots circle:nth-child(3),
	.animate .node-extension {
		animation-delay: 2.1s;
	}

	.animate .dots circle:nth-child(4),
	.animate .node-compliance {
		animation-delay: 2.4s;
	}

	@keyframes ringExpand {
		from {
			opacity: 0;
			transform: scale(0);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	@keyframes nodePop {
		from {
			opacity: 0;
			transform: scale(0);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	@keyframes fadeIn {
		to {
			opacity: 1;
		}
	}
</style>
