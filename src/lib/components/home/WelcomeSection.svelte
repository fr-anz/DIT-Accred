<script>
	import { ArrowUpRight, FileBadge } from '@lucide/svelte';
	import { asset } from '$app/paths';

	const logos = [
		{ src: '/img/DIT-logo.jpg', alt: 'Department of Information Technology logo' },
		{ src: '/img/PUP.png', alt: 'Polytechnic University of the Philippines logo' },
		{ src: '/img/CCIS.png', alt: 'College of Computer and Information Sciences logo' }
	];
</script>

<section class="welcome-container" aria-labelledby="welcome-heading">
	<div class="logo-row" aria-label="Accreditation partner logos">
		{#each logos as logo (logo.src)}
			<img src={logo.src} alt={logo.alt} />
		{/each}
	</div>

	<div class="headline-row">
		<div class="line"></div>
		<h1 id="welcome-heading" class="welcome-text">
			WELCOME AACCUP<br />
			ACCREDITORS
		</h1>
		<div class="line"></div>
	</div>

	<p class="visit-subtitle">Level IV Cycle II Accreditation Visit - November 2026</p>

	<a
		class="certificate-link"
		href={asset('accreditation/certificate-of-authenticity-november-2026.pdf')}
		type="application/pdf"
		target="_blank"
		rel="noopener"
	>
		<span class="certificate-icon" aria-hidden="true">
			<FileBadge size={22} strokeWidth={1.8} />
		</span>
		<span class="certificate-label">
			<strong>Certificate of Authenticity</strong>
			<small>Quality Assurance Center · PDF</small>
		</span>
		<ArrowUpRight size={18} strokeWidth={2} aria-hidden="true" />
		<span class="sr-only">(opens in a new tab)</span>
	</a>
</section>

<style>
	.welcome-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		margin: 0 auto var(--section-space) auto;
		padding: clamp(3rem, 7vw, 5rem) 0 clamp(2.5rem, 6vw, 4.5rem) 0;
		box-sizing: border-box;
		background: #ffffff;
	}

	.logo-row {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: clamp(1rem, 2vw, 1.4rem);
		margin-bottom: clamp(1.65rem, 3.5vw, 2.4rem);
	}

	.logo-row img {
		width: clamp(3.5rem, 7vw, 6rem);
		aspect-ratio: 1 / 1;
		object-fit: contain;
		display: block;
	}

	.headline-row {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
		align-items: center;
		gap: clamp(2rem, 4.5vw, 3.25rem);
		width: 100%;
	}

	.line {
		height: 1.5px;
		background-color: #cfa83a;
		width: 100%;
	}

	.welcome-text {
		font-weight: 800;
		text-align: center;
		line-height: 1.18;
		margin: 0;
		font-size: clamp(2.8rem, 6.2vw, 4.8rem);
		letter-spacing: 0.02em;
		background: linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(145, 21, 24, 1) 100%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		color: transparent;
	}

	.visit-subtitle {
		font-family: 'Inter', sans-serif;
		font-style: italic;
		font-size: clamp(1.2rem, 2.5vw, 1.95rem);
		line-height: 1.25;
		color: #000000;
		text-align: center;
		margin: clamp(1.25rem, 2.4vw, 1.65rem) var(--page-pad) 0 var(--page-pad);
	}

	.certificate-link {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr) auto;
		align-items: center;
		gap: 0.75rem;
		max-width: calc(100% - 2 * var(--page-pad));
		margin-top: clamp(1.5rem, 3vw, 2.25rem);
		padding: 0.625rem 0.875rem 0.625rem 0.625rem;
		border: 1px solid var(--c-gold);
		border-radius: 0.875rem;
		background: var(--c-surface);
		color: var(--c-maroon);
		text-decoration: none;
	}

	.certificate-icon {
		display: grid;
		place-items: center;
		inline-size: 2.5rem;
		block-size: 2.5rem;
		border-radius: 0.5rem;
		background: color-mix(in srgb, var(--c-gold-light) 22%, var(--c-surface));
	}

	.certificate-label {
		display: grid;
		gap: 0.125rem;
		padding-inline-end: clamp(0rem, 1vw, 0.5rem);
		font-family: var(--font-heading);
		font-size: var(--fs-sm);
		line-height: var(--lh-snug);
	}

	.certificate-label small {
		color: var(--c-ink);
		font-family: var(--font-body);
		font-size: 0.75rem;
	}

	.certificate-link:hover,
	.certificate-link:focus-visible {
		border-color: var(--c-maroon);
		background: color-mix(in srgb, var(--c-gold-light) 10%, var(--c-surface));
	}

	.certificate-link:focus-visible {
		outline: 2px solid var(--c-maroon);
		outline-offset: 3px;
	}

	@media (max-width: 768px) {
		.welcome-container {
			padding: 2.5rem 0;
		}

		.logo-row {
			gap: 0.75rem;
			margin-bottom: 1.5rem;
		}

		.logo-row img {
			width: 3rem;
			height: 3rem;
		}

		.headline-row {
			grid-template-columns: 1fr;
			gap: 1rem;
			padding: 0 1rem;
		}

		.line {
			display: none;
		}

		.welcome-text {
			font-size: clamp(2.35rem, 12vw, 3.75rem);
		}

		.visit-subtitle {
			font-size: clamp(1rem, 5vw, 1.35rem);
		}
	}
</style>
