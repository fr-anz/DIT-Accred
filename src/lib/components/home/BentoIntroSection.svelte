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
		min-height: 400px;
	}

	:global(.years-card) {
		grid-column: span 4;
	}

	:global(.objectives-card) {
		grid-column: span 8;
	}

	.bsit-title {
		font-size: clamp(2rem, 5vw, 4.5rem);
		font-weight: 700;
		letter-spacing: 4px;
		margin: 0;
	}

	.bsit-subtitle {
		margin: -5px 0 20px 0;
		font-size: clamp(1rem, 1.6vw, 1.25rem);
		font-style: italic;
		color: #cfa83a;
		font-weight: 600;
	}

	.bsit-desc {
		font-size: clamp(0.95rem, 1.2vw, 1rem);
		text-align: left;
		line-height: 1.6;
		margin: clamp(1.5rem, 4vw, 3rem) 0 0 0;
		max-width: 62ch;
	}

	.bsit-bg-img {
		position: absolute;
		right: 0;
		top: 0;
		height: 100%;
		width: 50%;
		object-fit: cover;
		z-index: 0;
		pointer-events: none;
	}

	.bsit-title,
	.bsit-subtitle,
	.bsit-desc {
		position: relative;
		z-index: 1;
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
			opacity: 0.25;
			width: 100%;
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
			display: none;
		}
	}
</style>
