<script>
	import { sections } from '$lib/data/homeData';
</script>

<section class="quick-links">
	{#each sections as section}
		<a href="/{section.id}" class="panel">
			<img
				src={section.image}
				alt={section.title}
				class="panel-image"
				loading="lazy"
				decoding="async"
			/>
			<div class="panel-overlay"></div>
			<div class="panel-content">
				<h2 class="panel-title">{section.title}</h2>
				<p class="panel-subtitle">{section.subtitle}</p>
			</div>
		</a>
	{/each}
</section>

<style>
	.quick-links {
		display: flex;
		width: 100%;
		height: 480px;
		overflow: hidden;
		margin-bottom: var(--section-space);
	}

	.panel {
		flex: 1;
		position: relative;
		overflow: hidden;
		cursor: pointer;
		text-decoration: none;
		transition: flex 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.panel:hover {
		flex: 2.5;
	}

	.panel-image {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
		background-color: #941518;
	}

	.panel:hover .panel-image {
		transform: scale(1.05);
	}

	.panel-overlay {
		position: absolute;
		inset: 0;
		background: rgba(148, 21, 24, 0.55);
		transition: background 0.3s ease;
	}

	.panel:hover .panel-overlay {
		background: rgba(148, 21, 24, 0.35);
	}

	.panel-content {
		position: absolute;
		inset: 0;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 1.5rem 1rem;
		gap: 0.5rem;
	}

	.panel-title {
		color: white;
		font-size: clamp(1rem, 1.5vw, 1.5rem);
		font-family: Overpass, sans-serif;
		font-weight: 800;
		text-align: center;
		margin: 0;
		line-height: 1.2;
		transition: font-size 0.3s ease;
	}

	.panel:hover .panel-title {
		font-size: clamp(1.1rem, 1.8vw, 1.75rem);
	}

	.panel-subtitle {
		color: rgba(255, 255, 255, 0.9);
		font-size: clamp(0.7rem, 0.9vw, 0.95rem);
		font-family: Inter, sans-serif;
		font-weight: 400;
		text-align: center;
		margin: 0;
		line-height: 1.4;
	}

	.panel:hover .panel-subtitle {
		opacity: 1;
		transform: translateY(0);
	}

	@media (max-width: 768px) {
		.quick-links {
			height: auto;
			display: grid;
			grid-template-columns: repeat(2, 1fr);
		}

		.panel:hover {
			flex: 1;
		}

		.quick-links .panel {
			min-height: 200px;
		}
	}

	@media (max-width: 480px) {
		.quick-links {
			grid-template-columns: 1fr;
		}

		.quick-links .panel {
			min-height: 140px;
		}
	}
</style>
