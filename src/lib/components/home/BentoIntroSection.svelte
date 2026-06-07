<script>
	import Card from '$lib/components/Card.svelte';
	import { programObjectives } from '$lib/data/homeData';
</script>

<section class="bento-section">
	<div class="bento-grid">
		<Card class="bsit-card" variant="maroon" size="md">
			<h1 class="bsit-title">BSIT</h1>
			<h2 class="bsit-subtitle">Bachelor of Science in Information Technology</h2>
			<p class="bsit-desc">
				The <strong>Bachelor of Science in Information Technology (BSIT)</strong> program is a four-year
				degree program which focuses on the study of computer utilization and computer software to plan,
				install, customize, operate, manage, administer and maintain information technology infrastructure
			</p>
			<img class="bsit-bg-img" src="/img/PYLON.jpg" alt="PUP Monument" />
			<img class="bsit-pop-img" src="/img/Pylon-nobg.svg" alt="" aria-hidden="true" />
		</Card>

		<Card class="years-card" variant="dark" size="md">
			<div class="years-header">
				<span class="number">47</span>
				<span class="text">years</span>
			</div>
			<p class="years-desc">
				of Department's existence.<br />Coding the <strong>PUP Spirit since 1979</strong>
			</p>
		</Card>

		<Card class="objectives-card" variant="gold" size="md">
			<div class="obj-header">
				<h2 class="obj-title">Program Educational Objectives</h2>
				<p class="obj-intro">
					Within 3-5 years of graduation, Bachelor of Science in Information Technology graduates
					are expected to:
				</p>
			</div>
			<div class="obj-grid">
				{#each programObjectives as objective}
					<Card class="obj-subcard" variant="maroon" size="sm">
						<span class="obj-num">{objective.number}</span>
						<h3 class="obj-heading">{objective.title}</h3>
					</Card>
				{/each}
			</div>
		</Card>
	</div>
</section>

<style>
	.bento-section {
		padding: var(--section-space) var(--page-pad);
		margin-bottom: var(--section-space);
		display: flex;
		justify-content: center;
	}

	.bento-grid {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		gap: clamp(1rem, 2vw, 1.5rem);
		max-width: var(--container-max);
		width: 100%;
	}

	:global(.bsit-card),
	:global(.years-card),
	:global(.objectives-card) {
		padding: 32px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		box-sizing: border-box;
	}

	:global(.bsit-card) {
		grid-column: span 12;
		position: relative;
		overflow: hidden;
		min-height: 410px;
		isolation: isolate;
	}

	:global(.bsit-card)::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: 1;
		background:
			linear-gradient(
				90deg,
				rgba(148, 21, 24, 0.98) 0%,
				rgba(148, 21, 24, 0.95) 30%,
				rgba(148, 21, 24, 0.62) 58%,
				rgba(148, 21, 24, 0.22) 100%
			),
			radial-gradient(circle at 36% 38%, rgba(250, 197, 73, 0.08), transparent 34%),
			radial-gradient(circle at 86% 12%, rgba(42, 0, 44, 0.28), transparent 48%);
		pointer-events: none;
	}

	:global(.bsit-card)::after {
		content: '';
		position: absolute;
		inset: 0;
		z-index: 2;
		background:
			linear-gradient(
				90deg,
				rgba(93, 3, 7, 0.98) 0%,
				rgba(93, 3, 7, 0.86) 32%,
				rgba(93, 3, 7, 0.38) 66%,
				transparent 100%
			),
			linear-gradient(180deg, rgba(255, 0, 0, 0.02), rgba(20, 0, 0, 0.12));
		mix-blend-mode: multiply;
		pointer-events: none;
	}

	:global(.years-card) {
		grid-column: span 4;
	}

	:global(.objectives-card) {
		grid-column: span 8;
	}

	.bsit-title {
		font-size: clamp(3.75rem, 9vw, 6.75rem);
		font-weight: 700;
		letter-spacing: 0.12em;
		margin: 0;
		color: #ffffff;
		line-height: 0.9;
	}

	.bsit-subtitle {
		margin: 0.75rem 0 0 0;
		font-size: clamp(1.2rem, 2vw, 1.6rem);
		font-style: italic;
		color: #d6c330;
		font-weight: 600;
		letter-spacing: 0.04em;
	}

	.bsit-desc {
		font-size: clamp(1rem, 1.35vw, 1.1rem);
		text-align: left;
		line-height: 1.24;
		margin: clamp(3.5rem, 7vw, 4.25rem) 0 0 0;
		max-width: 60ch;
		color: #ffffff;
	}

	.bsit-bg-img {
		position: absolute;
		right: -10%;
		top: 0;
		height: 100%;
		width: 60%;
		object-fit: cover;
		object-position: center center;
		z-index: 0;
		pointer-events: none;
		opacity: 1;
		filter: saturate(1.75) contrast(1.28) brightness(0.98);
		mix-blend-mode: luminosity;
		-webkit-mask-image: linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.18) 22%, #000 44%);
		mask-image: linear-gradient(90deg, transparent 0%, rgba(0, 0, 0, 0.18) 22%, #000 44%);
	}

	.bsit-pop-img {
		position: absolute;
		right: -10%;
		top: 0;
		z-index: 2;
		width: 60%;
		height: 110%;
		object-fit: fill;
		pointer-events: none;
		opacity: 0;
		transform: translate3d(0, 18px, 0);
		transform-origin: 58% 100%;
		transition:
			opacity 420ms cubic-bezier(0.16, 1, 0.3, 1),
			transform 520ms cubic-bezier(0.16, 1, 0.3, 1);
		will-change: transform, opacity;
	}

	:global(.bsit-card:hover) .bsit-pop-img {
		opacity: 1;
		transform: translate3d(0, -8px, 0);
	}

	.bsit-title,
	.bsit-subtitle,
	.bsit-desc {
		position: relative;
		z-index: 3;
	}

	.years-header {
		display: flex;
		align-items: baseline;
		gap: 0.75rem;
		color: #fac549;
		margin-bottom: 0.75rem;
	}

	.years-header .number {
		font-size: clamp(2.5rem, 5vw, 5rem);
		font-weight: 700;
		line-height: 1;
	}

	.years-header .text {
		font-size: clamp(1.75rem, 4vw, 3rem);
		font-style: italic;
	}

	.years-desc {
		font-size: clamp(0.95rem, 1.4vw, 1.125rem);
		margin: 0;
		line-height: 1.5;
	}

	.obj-title {
		font-size: clamp(1.5rem, 2.5vw, 2rem);
		font-weight: 700;
		color: #000;
		margin: 0 0 10px 0;
		text-wrap: balance;
	}

	.obj-intro {
		font-size: clamp(0.95rem, 1.4vw, 1.125rem);
		color: #000;
		margin: 0 0 1.5rem 0;
		line-height: 1.55;
	}

	.obj-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: 1.25rem;
	}

	:global(.obj-subcard) {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 1.25rem;
		min-height: 140px;
	}

	.obj-num {
		font-size: 16px;
		opacity: 0.8;
	}

	.obj-heading {
		font-size: clamp(0.95rem, 1.4vw, 1.125rem);
		font-weight: 700;
		text-align: right;
		margin: 0;
		line-height: 1.3;
		overflow-wrap: anywhere;
	}

	@media (max-width: 1200px) {
		:global(.bsit-card),
		:global(.years-card),
		:global(.objectives-card) {
			grid-column: span 12;
		}

		.obj-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 1024px) {
		.bsit-bg-img {
			opacity: 0.42;
			width: 110%;
			right: -8%;
		}

		.bsit-pop-img {
			right: 9%;
			bottom: 0;
			width: min(34%, 310px);
		}

		:global(.bsit-card)::before {
			background:
				linear-gradient(
					90deg,
					rgba(148, 21, 24, 0.98) 0%,
					rgba(148, 21, 24, 0.82) 48%,
					rgba(148, 21, 24, 0.34) 100%
				),
				radial-gradient(circle at 72% 24%, rgba(40, 0, 50, 0.32), transparent 42%);
		}
	}

	@media (max-width: 768px) {
		.bento-section {
			padding: 2rem 1rem;
		}

		.bsit-subtitle {
			font-size: 16px;
		}

		.years-header .text {
			font-size: 28px;
		}

		.years-desc {
			font-size: 14px;
		}

		:global(.bsit-card),
		:global(.years-card),
		:global(.objectives-card) {
			padding: 20px;
		}

		.bsit-bg-img {
			display: block;
			opacity: 0.28;
		}

		.bsit-pop-img {
			right: -4%;
			bottom: 0;
			width: 62%;
			transform: translate3d(0, 0, 0);
		}

		:global(.bsit-card:hover) .bsit-pop-img {
			opacity: 1;
			transform: translate3d(0, -8px, 0);
		}

		.bsit-title {
			font-size: clamp(3rem, 18vw, 5rem);
		}

		.bsit-desc {
			margin-top: 2.5rem;
		}
	}
</style>
