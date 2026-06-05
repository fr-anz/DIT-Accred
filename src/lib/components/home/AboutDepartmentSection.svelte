<script>
	import { Building2, GraduationCap, Info, Network, Users } from 'lucide-svelte';
	import { aboutImages, departmentStats, ditGoals, missionVision } from '$lib/data/homeData';
	import QualityControlDiagram from './QualityControlDiagram.svelte';
</script>

<section class="about-section">
	<div class="about-header">
		<Info size={35} color="#941518" />
		<h2 class="about-title">About the Department</h2>
	</div>
	<div class="header-line"></div>

	<div class="intro-container">
		<div class="intro-image-collage" aria-label="Department activities">
			{#each aboutImages as image}
				<img src={image.src} alt={image.alt} />
			{/each}
		</div>

		<div class="intro-text">
			<p>
				The <strong>Bachelor of Science in Information Technology</strong> program provides an engaging
				environment for learners passionate about building modern digital solutions. The program allows
				creative and critical thinkers to transform complex technological concepts into practical, in-demand
				skillsets. Learners are trained in software development, network architecture, and data management,
				with a sharp focus on engineering innovative solutions to real-world problems.
			</p>

			<div class="mv-container">
				{#each missionVision as item}
					<div class="mv-card">
						<h3>{item.title}</h3>
						<p>{item.prefix}<strong>{item.strong}</strong>{item.suffix}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<div class="stats-banner">
		{#each departmentStats as stat}
			<div class="stat-card">
				{#if stat.icon === 'users'}
					<Users size={48} color="#941518" />
				{:else if stat.icon === 'graduation'}
					<GraduationCap size={48} color="#941518" />
				{:else if stat.icon === 'building'}
					<Building2 size={48} color="#941518" />
				{:else}
					<Network size={48} color="#941518" />
				{/if}
				<span class="stat-number">{stat.value}</span>
				<span class="stat-label">{stat.label}</span>
			</div>
		{/each}
	</div>
</section>

<style>
	.about-section {
		width: 100%;
		max-width: var(--container-max);
		margin: 0 auto var(--section-space) auto;
		padding: clamp(2rem, 4vw, 3rem) clamp(1.25rem, 3vw, 2rem);
		box-sizing: border-box;
		background: #ffffff;
		font-family: 'Inter', sans-serif;
		position: relative;
	}

	.about-header {
		display: flex;
		align-items: center;
		gap: clamp(0.75rem, 2vw, 1.25rem);
	}

	.about-title {
		color: #fac549;
		font-size: clamp(1rem, 2vw, 2rem);
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: clamp(0.12em, 1vw, 0.27em);
		margin: 0;
		line-height: 1.3;
	}

	.header-line {
		width: 100%;
		height: 2px;
		background-color: #5e5e5e;
		margin: clamp(1.25rem, 3vw, 2rem) 0 clamp(2rem, 5vw, 3.75rem) 0;
	}

	.intro-container {
		display: grid;
		grid-template-columns: minmax(260px, 0.82fr) minmax(0, 1.18fr);
		gap: clamp(1.75rem, 3.5vw, 3rem);
		align-items: start;
		margin-bottom: clamp(3rem, 6vw, 5rem);
	}

	.intro-image-collage {
		width: 100%;
		max-width: 634px;
		aspect-ratio: 634 / 854;
		border-radius: 15px;
		overflow: hidden;
		display: grid;
		grid-template-rows: 1fr 1fr 1fr;
		background: #6d1012;
	}

	.intro-image-collage img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		filter: sepia(0.15) saturate(0.9) brightness(0.85);
	}

	.intro-text {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}

	.intro-text p {
		color: #000000;
		font-size: clamp(0.95rem, 1.35vw, 1.12rem);
		line-height: 1.55;
		font-weight: 400;
		text-align: right;
		margin: clamp(0.5rem, 2vw, 2rem) 0 0 0;
		max-width: 68ch;
	}

	.mv-container {
		display: grid;
		grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
		gap: clamp(1rem, 2.5vw, 2rem);
		margin-top: clamp(1.5rem, 3vw, 2.5rem);
		width: 100%;
	}

	.mv-card {
		background: #ffffff;
		border: 1px #941518 solid;
		border-radius: 15px;
		box-shadow:
			4px 4px 4px rgba(207, 168, 58, 0.5),
			inset -4px 4px 4px rgba(148, 21, 24, 0.5),
			-4px 4px 4px rgba(109, 23, 25, 0.5);
		padding: clamp(1.5rem, 3vw, 2.75rem);
		box-sizing: border-box;
		min-height: clamp(190px, 22vw, 286px);
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	.mv-card h3 {
		font-family: 'Overpass', sans-serif;
		font-size: clamp(1.9rem, 3.1vw, 3rem);
		font-weight: 700;
		margin: 0 0 clamp(1.75rem, 3vw, 3rem) 0;
		line-height: 1;
		text-align: left;
		letter-spacing: 0.02em;
		overflow-wrap: anywhere;
	}

	.mv-card:nth-child(1) h3 {
		color: #fac549;
	}

	.mv-card:nth-child(2) h3 {
		color: #f8c246;
		font-size: clamp(1.8rem, 2.55vw, 2.55rem);
	}

	.mv-card p {
		color: #000000;
		font-size: clamp(0.78rem, 1.05vw, 1rem);
		line-height: 1.25;
		font-weight: 400;
		margin: 0;
		text-align: left;
	}

	.stats-banner {
		background: linear-gradient(137deg, #fac549 0%, #ca8106 100%);
		border-radius: clamp(1rem, 3vw, 2.2rem);
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: clamp(1.5rem, 3vw, 2.5rem);
		align-items: center;
		padding: clamp(1.5rem, 4vw, 3.75rem) clamp(1rem, 3vw, 2.5rem);
		margin-bottom: clamp(3rem, 7vw, 6.25rem);
	}

	.stat-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		width: 100%;
		max-width: 280px;
		margin: 0 auto;
	}

	.stat-number {
		font-family: 'Overpass', sans-serif;
		color: #941518;
		font-size: clamp(2.5rem, 5vw, 4.5rem);
		font-weight: 700;
		margin: 15px 0;
	}

	.stat-label {
		color: #000000;
		font-size: clamp(0.72rem, 1.35vw, 1.15rem);
		line-height: 1.3;
		text-wrap: balance;
	}

	@media (max-width: 1400px) {
		.intro-text {
			align-items: center;
		}

		.intro-text p {
			text-align: center;
			max-width: 100%;
			margin: 0;
		}
	}

	@media (max-width: 1024px) {
		:global(.qc-visualizer) {
			max-width: 720px;
		}
	}

	@media (max-width: 768px) {
		.about-section {
			padding-inline: 1.25rem;
		}

		.about-header {
			gap: 10px;
		}

		.intro-container {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}

		.intro-image-collage {
			max-width: 420px;
			margin: 0 auto;
			aspect-ratio: 4 / 3;
		}

		.intro-text {
			align-items: stretch;
		}

		.intro-text p {
			text-align: center;
			font-size: clamp(0.92rem, 2.8vw, 1.05rem);
			line-height: 1.55;
			max-width: 62ch;
			margin: 0 auto;
		}

		.mv-container {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			max-width: 460px;
			margin-inline: auto;
		}

		.mv-card {
			min-height: 180px;
			padding: 1rem;
		}

		.mv-card h3 {
			font-size: clamp(1.45rem, 4vw, 2rem);
			margin-bottom: 0.75rem;
		}

		.mv-card p {
			font-size: clamp(0.68rem, 2vw, 0.82rem);
			line-height: 1.4;
		}

		.stats-banner {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 0.75rem;
			padding: 1.5rem 1rem;
		}

		.stat-number {
			font-size: clamp(1.7rem, 6vw, 2.8rem);
		}

		.stat-label {
			font-size: clamp(0.72rem, 2vw, 0.85rem);
		}
	}

	@media (max-width: 480px) {
		.intro-image-collage {
			max-width: 100%;
		}

		.mv-container {
			grid-template-columns: 1fr;
			max-width: 100%;
		}

		.mv-card p {
			font-size: 0.78rem;
		}

		.stats-banner {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			border-radius: 12px;
		}
	}
</style>
