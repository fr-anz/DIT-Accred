<script>
	import { onMount } from 'svelte';
	import {
		BookOpen,
		Building2,
		ChevronDown,
		Download,
		KeyRound,
		Maximize2,
		Network
	} from 'lucide-svelte';
	import Footer from '$lib/components/footer.svelte';
	import ditSeal from '$lib/assets/DIT Logo.svg';

	const frameworkCards = [
		{
			icon: Building2,
			title: 'Layered Administration',
			description:
				'Dual oversight via OVPRED (macro resources & capacity building) and the Department of IT (discipline-specific paths).'
		},
		{
			icon: Maximize2,
			title: 'Inclusive Output Value',
			description:
				'Values both peer-reviewed publications and practice-oriented creative works, including deployable software and community solutions.'
		},
		{
			icon: Network,
			title: 'Domain Coverage',
			description:
				'Tailors research paths directly into discipline-specific domains including information systems development, data analytics, cybersecurity, software engineering, and educational technology.'
		}
	];

	const incentiveTracks = [
		'High-Impact Research Incentivization',
		'Undergraduate Competition Deployment',
		'Capstone Commercialization & Standardization',
		'Joint Global Research Linkages'
	];

	const facultyResearchers = Array.from({ length: 8 }, () => ({
		name: 'Aguila, Fermin',
		role: 'Full Time Faculty',
		count: 1,
		image: '/img/sir-melvin.png'
	}));

	const chartBars = [
		{ year: '2018', count: 11 },
		{ year: '2019', count: 19 },
		{ year: '2022', count: 14 },
		{ year: '2023', count: 16 },
		{ year: '2024', count: 10 }
	];

	/** @type {HTMLDivElement | undefined} */
	let metricsSculpture;

	const metricCardCount = 3;

	onMount(() => {
		const element = metricsSculpture;
		if (!element) return;

		const scrollPerCard = 240;
		let animationFrame = 0;

		const updateSnap = () => {
			animationFrame = 0;

			const rect = element.getBoundingClientRect();
			const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
			const documentTop = rect.top + window.scrollY;
			const start = documentTop - viewportHeight * 0.55;
			const rawIndex = (window.scrollY - start) / scrollPerCard;
			const index = Math.min(metricCardCount - 1, Math.max(0, Math.round(rawIndex)));

			element.style.setProperty('--metrics-orbit', `${index * 120}deg`);
		};

		const requestSnap = () => {
			if (animationFrame) return;
			animationFrame = requestAnimationFrame(updateSnap);
		};

		requestSnap();
		window.addEventListener('scroll', requestSnap, { passive: true });
		window.addEventListener('resize', requestSnap);

		return () => {
			if (animationFrame) cancelAnimationFrame(animationFrame);
			window.removeEventListener('scroll', requestSnap);
			window.removeEventListener('resize', requestSnap);
		};
	});
</script>

<svelte:head>
	<title>Research | DIT-PUP</title>
	<meta
		name="description"
		content="Explore DIT-PUP research governance, productivity metrics, faculty engagement, and research repository evidence."
	/>
</svelte:head>

<main class="research_page">
	<section class="hero_section">
		<div class="checkerboard_bg" aria-hidden="true"></div>
		<div class="hero_content">
			<h1 class="hero_title">RESEARCH</h1>
		</div>
	</section>

	<section class="content_section policy_section" id="policy">
		<header class="section_header">
			<BookOpen size={22} strokeWidth={1.8} class="section_icon" />
			<h2>Research Development &amp; Policy Framework</h2>
		</header>
		<hr class="section_divider" />

		<div class="framework_grid">
			{#each frameworkCards as card}
				{@const Icon = card.icon}
				<div class="framework_card">
					<Icon size={44} strokeWidth={2.6} class="framework_icon" />
					<h3>{card.title}</h3>
					<p>{card.description}</p>
				</div>
			{/each}
		</div>

		<div class="incentive_stack" aria-label="Research development priority tracks">
			{#each incentiveTracks as track}
				<div class="incentive_row">
					<span>{track}</span>
					<ChevronDown size={26} strokeWidth={2.3} />
				</div>
			{/each}
		</div>

		<a
			class="manual_link"
			href="/research"
			aria-label="Access full PUP Research and Development Manual"
		>
			<Download size={24} strokeWidth={1.8} />
			<span>Access Full PUP Research &amp; Development Manual</span>
		</a>
	</section>

	<section class="content_section productivity_section" id="productivity">
		<header class="section_header">
			<KeyRound size={24} strokeWidth={1.8} class="section_icon" />
			<h2>Key Productivity Metrics &amp; Faculty Engagement</h2>
		</header>
		<hr class="section_divider" />

		<div class="metrics_sculpture" bind:this={metricsSculpture}>
			<div class="origami_mark" aria-hidden="true">
				<svg class="origami_svg" viewBox="0 0 325 430" role="presentation">
					<defs>
						<linearGradient id="goldStroke" x1="0" y1="0" x2="0.4" y2="1">
							<stop offset="0" stop-color="#eec25c" />
							<stop offset="0.5" stop-color="#d99b1d" />
							<stop offset="1" stop-color="#c07f06" />
						</linearGradient>
					</defs>

					<g fill="#fff" stroke="url(#goldStroke)" stroke-width="3" stroke-linejoin="round">
						<path d="M60 20 L265 20 L305 90 L185 300 L140 300 L20 90 Z" />
						/>
					</g>

					<g stroke="url(#goldStroke)" stroke-width="2.5" stroke-linecap="round">
						<path d="M60 20 L162.5 155" />
						<path d="M265 20 L162.5 155" />
						<path d="M20 90 L162.5 155" />
						<path d="M305 90 L162.5 155" />
						<path d="M162.5 155 L140 300" />
						<path d="M162.5 155 L185 300" />
					</g>
					<circle cx="162.5" cy="140" r="64" fill="#fff" />
					<image href={ditSeal} x="100" y="78" width="125" height="125" />
				</svg>
			</div>

			<div class="cards_ring">
				<div class="metric_spoke" style="--spoke-angle: 0deg;">
					<article class="metric_card">
						<h3>Completed Research</h3>
						<strong>70</strong>
						<p>Spanning 2018 to 2024 academic cycles</p>
					</article>
				</div>

				<div class="metric_spoke" style="--spoke-angle: 120deg;">
					<article class="metric_card">
						<h3>High-Impact Indexation Rate</h3>
						<strong>89.13%</strong>
						<p>All published articles are indexed in premier global databases.</p>
					</article>
				</div>

				<div class="metric_spoke" style="--spoke-angle: 240deg;">
					<article class="metric_card">
						<h3>Disseminated Publications</h3>
						<strong>46</strong>
						<p>Papers published in refereed and indexed platforms.</p>
					</article>
				</div>
			</div>
		</div>

		<div class="distribution_panel" id="research-repository">
			<h3>Annual Distribution of Completed Research</h3>
			<p>
				Dissemination tracking underscores the strong peer verification of the department's
				scientific outputs, with a clear post-pandemic growth trajectory driven by targeted faculty
				mentoring.
			</p>

			<div class="chart_frame" aria-label="Annual completed research bar chart">
				<div class="chart_legend">
					<span class="legend_dot"></span>
					<span>Studies per Year</span>
				</div>
				<div class="chart_body">
					<span class="axis_label">Studies Count</span>
					<div class="chart_grid">
						{#each chartBars as item}
							<div class="bar_group">
								<div class="bar" style="--value: {item.count};">
									<span>{item.count}</span>
								</div>
								<span class="bar_year">{item.year}</span>
							</div>
						{/each}
					</div>
				</div>
				<span class="year_axis">Year</span>
			</div>
		</div>
	</section>

	<section class="content_section faculty_section" id="published-research">
		<header class="section_header">
			<Network size={24} strokeWidth={1.8} class="section_icon" />
			<h2>Faculty Researcher and Research Repository</h2>
		</header>
		<hr class="section_divider" />

		<div class="faculty_repository">
			{#each facultyResearchers as researcher}
				<article class="faculty_card">
					<img src={researcher.image} alt="{researcher.name}, {researcher.role}" />
					<div class="published_badge">
						<span>Published<br />Studies</span>
						<strong>{researcher.count}</strong>
					</div>
					<div class="faculty_overlay">
						<h3>{researcher.name}</h3>
						<p>{researcher.role}</p>
					</div>
				</article>
			{/each}
		</div>
	</section>

	<Footer />
</main>

<style>
	:root {
		--color-maroon: #8c0f13;
		--color-maroon-deep: #210000;
		--color-gold: #d49b1d;
		--color-gold-bright: #f7c443;
		--font-body: 'Inter', sans-serif;
		--font-heading: 'Overpass', sans-serif;
	}

	.research_page {
		background: #ffffff;
		color: #120f0f;
		min-height: 100vh;
	}

	.hero_section {
		position: relative;
		min-height: 100dvh;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		background: #f5f5f5;
	}

	.checkerboard_bg {
		position: absolute;
		inset: 0;
		background-color: #f7f7f7;
		background-image:
			linear-gradient(45deg, #e2e2e2 25%, transparent 25%),
			linear-gradient(-45deg, #e2e2e2 25%, transparent 25%),
			linear-gradient(45deg, transparent 75%, #e2e2e2 75%),
			linear-gradient(-45deg, transparent 75%, #e2e2e2 75%);
		background-position:
			0 0,
			0 60px,
			60px -60px,
			-60px 0;
		background-size: 120px 120px;
	}

	.hero_content {
		position: relative;
		z-index: 1;
		padding: 2rem;
	}

	.hero_title {
		font-family: Helvetica, Arial, sans-serif;
		font-size: clamp(4.25rem, 12vw, 10rem);
		font-weight: 800;
		letter-spacing: -0.03em;
		line-height: 0.9;
		margin: 0;
		background: linear-gradient(90deg, #120000 0%, #941518 78%);
		background-clip: text;
		color: transparent;
		text-align: center;
	}

	.content_section {
		width: min(100%, 1660px);
		margin: 0 auto;
		box-sizing: border-box;
		padding: 6.25rem 6.75rem 3rem;
	}

	.policy_section {
		padding-top: 6.75rem;
	}

	.section_header {
		display: flex;
		align-items: center;
		gap: 2.25rem;
	}

	.section_header h2 {
		font-family: var(--font-heading);
		font-size: clamp(1.35rem, 2vw, 2rem);
		font-weight: 800;
		letter-spacing: 0.34em;
		line-height: 1.2;
		margin: 0;
		text-transform: uppercase;
		color: var(--color-maroon);
	}

	:global(.section_icon) {
		color: var(--color-maroon);
		flex: 0 0 auto;
	}

	.section_divider {
		border: none;
		border-top: 1.5px solid rgba(0, 0, 0, 0.42);
		margin: 3.25rem 0 6.5rem;
	}

	.framework_grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1.8rem;
		width: min(100%, 1190px);
		margin: 0 auto;
	}

	.framework_card {
		min-height: 795px;
		border: 4px solid #d2a32a;
		border-radius: 22px;
		padding: 8.5rem 3.5rem 5rem;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		background: #fff;
	}

	:global(.framework_icon) {
		color: #050505;
		margin-bottom: 3rem;
	}

	.framework_card h3 {
		font-family: var(--font-heading);
		font-size: clamp(1.5rem, 2.1vw, 2.25rem);
		font-weight: 800;
		letter-spacing: 0.22em;
		line-height: 1.15;
		text-transform: uppercase;
		color: var(--color-maroon);
		margin: 0;
	}

	.framework_card p {
		font-family: var(--font-body);
		font-size: clamp(1.05rem, 1.55vw, 1.75rem);
		line-height: 1.06;
		margin: auto 0 0;
		max-width: 330px;
		color: #0d0d0d;
	}

	.incentive_stack {
		width: min(100%, 1500px);
		margin: 0 auto 4.25rem;
		display: grid;
		justify-items: center;
	}

	.incentive_row {
		height: 75px;
		border: 4px solid #d2a32a;
		border-radius: 18px;
		background: #fff;
		margin-top: -5px;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 3rem;
		padding: 0 3rem;
		color: var(--color-maroon);
	}

	.incentive_row:nth-child(1) {
		width: 79%;
	}

	.incentive_row:nth-child(2) {
		width: 88%;
	}

	.incentive_row:nth-child(3) {
		width: 96%;
	}

	.incentive_row:nth-child(4) {
		width: 100%;
	}

	.incentive_row span {
		font-family: var(--font-heading);
		font-size: clamp(0.95rem, 1.2vw, 1.35rem);
		font-weight: 800;
		letter-spacing: 0.26em;
		text-transform: uppercase;
	}

	.manual_link {
		width: min(100%, 855px);
		min-height: 82px;
		margin: 0 auto;
		padding: 1.2rem 2.25rem;
		border-radius: 16px;
		background: linear-gradient(90deg, #f9c644 0%, #d78a00 100%);
		color: #fff;
		text-decoration: none;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 4rem;
		font-family: var(--font-body);
		font-size: clamp(1rem, 1.4vw, 1.55rem);
		box-sizing: border-box;
		transition:
			transform 0.2s ease,
			filter 0.2s ease;
	}

	.manual_link:hover {
		transform: translateY(-2px);
		filter: saturate(1.08);
	}

	.productivity_section {
		padding-top: 11rem;
	}

	.metrics_sculpture {
		--metric-card-width: 234px;
		--metric-card-height: 222px;
		--wheel-radius: 206px;
		--seal-offset: 72px;

		position: relative;
		width: min(100%, 760px);
		min-height: 720px;
		margin: 0 auto 3.5rem;
	}

	.origami_mark {
		position: absolute;
		left: 50%;
		top: calc(50% + var(--seal-offset));
		width: 325px;
		height: 430px;
		transform: translate(-50%, -50%) scale(0.96);
		z-index: 1;
	}

	.origami_svg {
		display: block;
		width: 100%;
		height: 100%;
	}

	.cards_ring {
		position: absolute;
		inset: 0;
		transform-origin: 50% 50%;
		transform: rotate(var(--metrics-orbit, 0deg));
		transition: transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
		will-change: transform;
		z-index: 3;
	}

	.metric_spoke {
		position: absolute;
		left: 50%;
		top: 50%;
		width: var(--metric-card-width);
		height: var(--metric-card-height);
		margin-left: calc(var(--metric-card-width) / -2);
		margin-top: calc(var(--metric-card-height) / -2);
		transform: rotate(var(--spoke-angle)) translateY(calc(-1 * var(--wheel-radius)));
	}

	.metric_card {
		width: 100%;
		height: 100%;
		border: 3px solid transparent;
		border-radius: 12px;
		background:
			linear-gradient(#fff, #fff) padding-box,
			linear-gradient(155deg, #eec25c, #d99b1d 45%, #c07f06) border-box;
		box-sizing: border-box;
		padding: 1.4rem 1.25rem 1.6rem;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.55rem;
	}

	.metric_card h3 {
		font-family: var(--font-body);
		font-size: 1.18rem;
		font-weight: 800;
		line-height: 1.1;
		margin: 0;
	}

	.metric_card strong {
		display: block;
		font-size: 3.9rem;
		font-weight: 300;
		line-height: 0.9;
		margin: 0.2rem 0;
	}

	.metric_card p {
		font-size: 0.9rem;
		line-height: 1.2;
		margin: 0;
	}

	.distribution_panel {
		width: min(100%, 1300px);
		margin: 0 auto;
		border: 4px solid #d88c00;
		border-radius: 24px;
		padding: 5rem 7rem 5.5rem;
		box-sizing: border-box;
	}

	.distribution_panel h3 {
		font-family: var(--font-heading);
		font-size: clamp(1.45rem, 2vw, 2.3rem);
		font-weight: 800;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		text-align: center;
		margin: 0 0 4rem;
	}

	.distribution_panel p {
		font-family: var(--font-body);
		font-size: clamp(1.2rem, 1.8vw, 2.05rem);
		line-height: 1.25;
		margin: 0 auto 3rem;
		text-align: justify;
		max-width: 950px;
	}

	.chart_frame {
		position: relative;
		width: min(100%, 820px);
		margin: 0 auto;
		border: 2px solid rgba(0, 0, 0, 0.55);
		padding: 5rem 5.5rem 3.5rem;
		box-sizing: border-box;
	}

	.chart_legend {
		position: absolute;
		top: 2.25rem;
		right: 8rem;
		display: flex;
		align-items: center;
		gap: 1.25rem;
		font-size: 0.85rem;
		color: #6a6a6a;
	}

	.legend_dot {
		width: 28px;
		height: 28px;
		border-radius: 999px;
		background: #7f1518;
	}

	.chart_body {
		position: relative;
		display: grid;
		grid-template-columns: 70px 1fr;
		align-items: end;
		min-height: 360px;
	}

	.axis_label {
		align-self: center;
		justify-self: center;
		writing-mode: vertical-rl;
		transform: rotate(180deg);
		font-size: 1.35rem;
		text-transform: uppercase;
		color: #3d3d3d;
		letter-spacing: 0.04em;
	}

	.chart_grid {
		height: 320px;
		border-left: 1px solid rgba(0, 0, 0, 0.18);
		border-bottom: 1px solid rgba(0, 0, 0, 0.45);
		background-image:
			linear-gradient(to top, rgba(0, 0, 0, 0.12) 1px, transparent 1px),
			linear-gradient(to right, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
		background-size:
			100% 53px,
			20% 100%;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		align-items: end;
		padding: 0 1.4rem;
		gap: 1.8rem;
	}

	.bar_group {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;
		height: 100%;
		gap: 1rem;
	}

	.bar {
		width: 78px;
		height: calc(var(--value) * 14px);
		min-height: 120px;
		border-radius: 999px 999px 26px 26px;
		background: #7f1518;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-size: 0.9rem;
	}

	.bar_year {
		font-size: 0.8rem;
		color: #595959;
	}

	.year_axis {
		display: block;
		text-align: center;
		font-size: 1.4rem;
		text-transform: uppercase;
		color: #646464;
		margin-top: 2rem;
	}

	.faculty_section {
		padding-top: 10rem;
		padding-bottom: 9.5rem;
	}

	.faculty_repository {
		width: min(100%, 1570px);
		margin: 0 auto;
		background: linear-gradient(90deg, #fac645 0%, #d58c00 100%);
		border-radius: 22px;
		padding: 4.25rem 5.5rem;
		box-sizing: border-box;
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 3.8rem 3.2rem;
	}

	.faculty_card {
		position: relative;
		aspect-ratio: 1 / 1.22;
		border-radius: 22px;
		overflow: hidden;
		background: #730f12;
		box-shadow: 0 8px 18px rgba(0, 0, 0, 0.28);
	}

	.faculty_card::after {
		content: '';
		position: absolute;
		inset: 42% 0 0;
		background: linear-gradient(
			180deg,
			transparent 0%,
			rgba(15, 16, 17, 0.34) 42%,
			rgba(237, 247, 247, 0.8) 100%
		);
		pointer-events: none;
	}

	.faculty_card img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: 34% 18%;
		display: block;
	}

	.published_badge {
		position: absolute;
		top: 1.6rem;
		right: 1.6rem;
		width: 88px;
		height: 92px;
		border-radius: 8px;
		background: #fff8e4;
		color: var(--color-maroon);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		box-shadow: 0 3px 7px rgba(0, 0, 0, 0.22);
		z-index: 2;
	}

	.published_badge span {
		font-size: 0.58rem;
		font-weight: 800;
		line-height: 1.05;
		letter-spacing: 0.08em;
		text-align: center;
	}

	.published_badge strong {
		font-size: 3rem;
		line-height: 0.9;
		font-weight: 500;
	}

	.faculty_overlay {
		position: absolute;
		left: 2rem;
		right: 1.5rem;
		bottom: 1.75rem;
		z-index: 2;
	}

	.faculty_overlay h3 {
		font-family: var(--font-body);
		font-size: clamp(1.3rem, 1.6vw, 2rem);
		font-weight: 800;
		color: #fff;
		margin: 0 0 0.2rem;
		line-height: 1;
	}

	.faculty_overlay p {
		font-family: var(--font-body);
		font-size: clamp(1rem, 1.2vw, 1.45rem);
		font-style: italic;
		font-weight: 800;
		color: #ffd138;
		margin: 0;
	}

	@media (max-width: 1180px) {
		.content_section {
			padding-left: 4rem;
			padding-right: 4rem;
		}

		.framework_card {
			min-height: 620px;
			padding: 5.5rem 2rem 3rem;
		}

		.metrics_sculpture {
			transform: scale(0.86);
			transform-origin: top center;
			margin-bottom: -4rem;
		}

		.faculty_repository {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 760px) {
		.hero_section {
			min-height: 72dvh;
		}

		.hero_title {
			font-size: clamp(2.75rem, 15vw, 3.7rem);
		}

		.checkerboard_bg {
			background-size: 82px 82px;
			background-position:
				0 0,
				0 41px,
				41px -41px,
				-41px 0;
		}

		.content_section {
			padding: 4rem 1.25rem 2.5rem;
		}

		.section_header {
			gap: 1rem;
			align-items: flex-start;
		}

		.section_header h2 {
			font-size: 1rem;
			letter-spacing: 0.2em;
		}

		.section_divider {
			margin: 1.75rem 0 3rem;
		}

		.framework_grid {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.framework_card {
			min-height: auto;
			padding: 3rem 1.5rem;
		}

		.framework_card p {
			margin-top: 2.5rem;
		}

		.incentive_stack {
			margin-top: 1.5rem;
		}

		.incentive_row,
		.incentive_row:nth-child(n) {
			width: 100%;
			height: auto;
			min-height: 64px;
			justify-content: space-between;
			gap: 1rem;
			padding: 0.9rem 1rem;
		}

		.incentive_row span {
			font-size: 0.78rem;
			letter-spacing: 0.14em;
			line-height: 1.35;
		}

		.manual_link {
			gap: 1rem;
			font-size: 0.95rem;
			text-align: left;
			justify-content: flex-start;
		}

		.productivity_section {
			padding-top: 5.5rem;
		}

		.metrics_sculpture {
			width: 100%;
			min-height: auto;
			margin: 0 0 2.5rem;
			transform: none;
		}

		.cards_ring {
			position: static;
			display: flex;
			flex-direction: column;
			gap: 1rem;
			transform: none;
		}

		.metric_spoke {
			position: static;
			width: 100%;
			height: auto;
			margin: 0;
			transform: none;
		}

		.metric_card {
			width: 100%;
			height: auto;
			min-height: auto;
			padding: 2.75rem 2rem;
		}

		.metric_card strong {
			font-size: 4.5rem;
		}

		.origami_mark {
			display: none;
		}

		.distribution_panel {
			padding: 2.25rem 1.25rem;
		}

		.distribution_panel p {
			text-align: left;
		}

		.chart_frame {
			padding: 4rem 1rem 2rem;
		}

		.chart_legend {
			top: 1rem;
			right: 1rem;
		}

		.chart_body {
			grid-template-columns: 36px 1fr;
			min-height: 260px;
		}

		.axis_label {
			font-size: 0.85rem;
		}

		.chart_grid {
			height: 240px;
			gap: 0.5rem;
			padding: 0 0.5rem;
		}

		.bar {
			width: 34px;
			height: calc(var(--value) * 9px);
			min-height: 76px;
			font-size: 0.65rem;
		}

		.faculty_section {
			padding-top: 5rem;
			padding-bottom: 5rem;
		}

		.faculty_repository {
			grid-template-columns: 1fr;
			padding: 1.25rem;
			gap: 1.25rem;
		}
	}
</style>
