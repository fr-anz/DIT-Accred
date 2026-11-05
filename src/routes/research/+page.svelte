<script>
	import {
		BookOpen,
		Building2,
		ChevronDown,
		ChevronLeft,
		ChevronRight,
		Download,
		KeyRound,
		Maximize2,
		Network
	} from 'lucide-svelte';
	import Footer from '$lib/components/footer.svelte';

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
		{
			title: 'High-Impact Research Incentivization',
			width: '79%',
			placeholder:
				'Placeholder details for publication incentives, faculty mentoring, and indexed research targets.'
		},
		{
			title: 'Undergraduate Competition Deployment',
			width: '88%',
			placeholder:
				'Placeholder details for student research competitions, prototype reviews, and coach assignments.'
		},
		{
			title: 'Capstone Commercialization & Standardization',
			width: '96%',
			placeholder:
				'Placeholder details for capstone packaging, deployment readiness, and documentation standards.'
		},
		{
			title: 'Joint Global Research Linkages',
			width: '100%',
			placeholder:
				'Placeholder details for partner institutions, collaborative research tracks, and exchange outputs.'
		}
	];

	const facultyResearchers = Array.from({ length: 8 }, () => ({
		name: 'Aguila, Fermin',
		role: 'Full Time Faculty',
		count: 1,
		image: '/img/sir-melvin.png',
		publications: ['Placeholder research publication for faculty repository.']
	}));

	const metricCards = [
		{
			label: 'Completed Research',
			value: '70',
			desc: 'Spanning 2018 to 2024 academic cycles',
			longValue: false,
			left: 323.5,
			top: -19
		},
		{
			label: 'High-Impact Indexation Rate',
			value: '89.13%',
			desc: 'All published articles are indexed in premier global databases.',
			longValue: true,
			left: 540.87,
			top: 375
		},
		{
			label: 'Disseminated Publications',
			value: '46',
			desc: 'Papers published in refereed and indexed platforms.',
			longValue: false,
			left: 106.13,
			top: 375
		}
	];

	const indexationByYear = [
		{ year: '2018', count: 3 },
		{ year: '2019', count: 10 },
		{ year: '2020', count: 3 },
		{ year: '2021', count: 16 },
		{ year: '2022', count: 7 },
		{ year: '2023', count: 7 },
		{ year: '2024', count: 3 },
		{ year: '2025', count: 10 }
	];

	const facultyStatus = [
		{ label: 'Full time faculty', value: 15, note: '', tone: 'ft' },
		{
			label: 'Full time faculty engaged in research',
			value: 11,
			note: '73% of full-time',
			tone: 'ft-engaged'
		},
		{ label: 'Part-time faculty', value: 27, note: '', tone: 'pt' },
		{
			label: 'Part-time faculty engaged in research',
			value: 1,
			note: '4% of part-time',
			tone: 'pt-engaged'
		}
	];

	const metricCardCount = metricCards.length;
	/** @type {number | null} */
	let activeIncentiveIndex = $state(null);
	let activeMetricIndex = $state(0);
	let activePanelSlide = $state(0);
	let flippedFacultyIndices = $state(new Set());

	/** @param {number} index */
	const toggleIncentiveTrack = (index) => {
		activeIncentiveIndex = activeIncentiveIndex === index ? null : index;
	};

	/** @param {number} index */
	const toggleFacultyCard = (index) => {
		if (flippedFacultyIndices.has(index)) {
			flippedFacultyIndices.delete(index);
		} else {
			flippedFacultyIndices.add(index);
		}
		flippedFacultyIndices = new Set(flippedFacultyIndices);
	};

	/** @param {number} direction */
	const rotateMetrics = (direction) => {
		activeMetricIndex = (activeMetricIndex + direction + metricCardCount) % metricCardCount;
		activePanelSlide = (activePanelSlide + direction + 2) % 2;
	};

	/** @param {number} index */
	const setActiveMetric = (index) => {
		activeMetricIndex = index;
	};
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
		<div class="hero_content">
			<h1 class="t_display hero_title">RESEARCH</h1>
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
			{#each incentiveTracks as track, index}
				<div class="incentive_item" style="--track-width: {track.width};">
					<button
						class="incentive_row"
						type="button"
						aria-expanded={activeIncentiveIndex === index}
						aria-controls="incentive-panel-{index}"
						onclick={() => toggleIncentiveTrack(index)}
					>
						<span>{track.title}</span>
						<ChevronDown
							size={26}
							strokeWidth={2.3}
							class={activeIncentiveIndex === index ? 'chevron_open' : ''}
						/>
					</button>

					{#if activeIncentiveIndex === index}
						<div class="incentive_panel" id="incentive-panel-{index}">
							<p>{track.placeholder}</p>
						</div>
					{/if}
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

		<div class="metrics_carousel" id="metrics-ring" role="group" aria-roledescription="carousel" aria-label="Research metrics">
			<div class="metrics_stage" style="--metrics-orbit: {activeMetricIndex * -120}deg;">
				<svg class="hex_web" viewBox="0 0 707 739" aria-hidden="true">
					<defs>
						<linearGradient id="hexStroke" x1="496.275" y1="121.209" x2="209.94" y2="617.156" gradientUnits="userSpaceOnUse">
							<stop stop-color="#FAC549" />
							<stop offset="1" stop-color="#CA8106" />
						</linearGradient>
					</defs>
					<path d="M444.215 696.215L680.215 287.451L631.737 199.418L173.126 196.756L120.375 287.451L346.875 696.215L444.215 696.215Z" fill="#fff" stroke="url(#hexStroke)" stroke-width="6" />
					<path d="M122 290L398 411" stroke="url(#hexStroke)" stroke-width="6" />
					<path d="M171 196L398 409" stroke="url(#hexStroke)" stroke-width="6" />
					<path d="M633.998 204.002L397.998 409.002" stroke="url(#hexStroke)" stroke-width="6" />
					<path d="M681 289.999L398 408.999" stroke="url(#hexStroke)" stroke-width="6" />
					<path d="M444.998 696.999L397.998 408.999" stroke="url(#hexStroke)" stroke-width="6" />
					<path d="M346 697.001L398 409.001" stroke="url(#hexStroke)" stroke-width="6" />
				</svg>

				{#each metricCards as card, i}
					<button
						type="button"
						class="metric_card"
						class:is_active={i === activeMetricIndex}
						class:has_long_value={card.longValue}
						style="--card-left: {card.left}px; --card-top: {card.top}px; --card-rotate: {i * 120}deg;"
						aria-label={card.label}
						aria-current={i === activeMetricIndex ? 'true' : 'false'}
						onclick={() => setActiveMetric(i)}
					>
						<span class="metric_card_label">{card.label}</span>
						<span class="metric_card_value">{card.value}</span>
						<span class="metric_card_desc">{card.desc}</span>
					</button>
				{/each}

				<img class="center_logo" src="/research/Center_Building.svg" alt="" aria-hidden="true" />
			</div>

			<button
				class="metric_control metric_control_previous"
				type="button"
				aria-label="Rotate left"
				aria-controls="metrics-ring"
				onclick={() => rotateMetrics(-1)}
			>
				<ChevronLeft size={22} strokeWidth={3.2} />
			</button>
			<button
				class="metric_control metric_control_next"
				type="button"
				aria-label="Rotate right"
				aria-controls="metrics-ring"
				onclick={() => rotateMetrics(1)}
			>
				<ChevronRight size={22} strokeWidth={3.2} />
			</button>
		</div>

		<div class="distribution_panel" id="research-repository" aria-live="polite">
			<div class="panel_slide" class:is_hidden={activePanelSlide !== 0}>
				<h3>FACULTY RESEARCH ENGAGEMENT</h3>
				<p>
					The department's research quality is driven by a dedicated core of active faculty whose
					sustained scholarly engagement continues to elevate the program's international academic
					footprint.
				</p>

				<div class="engagement_row">
					<svg class="engagement_donut" viewBox="0 0 340 340" role="img" aria-label="12 of 42 faculty engaged in research">
						<g transform="translate(170 170) rotate(-90)">
							<circle r="142" fill="none" stroke="#EFDADB" stroke-width="36" />
							<circle class="donut_outer" r="142" fill="none" stroke="#9B1C1A" stroke-width="36" stroke-dasharray="654.29 892.21" />
							<circle r="100" fill="none" stroke="#FAE8D6" stroke-width="36" />
							<circle class="donut_inner" r="100" fill="none" stroke="#E5862A" stroke-width="36" stroke-dasharray="23.27 628.32" />
						</g>
						<text x="170" y="178" text-anchor="middle" class="donut_value">12</text>
						<text x="170" y="206" text-anchor="middle" class="donut_sub">of 42 faculty</text>
						<text x="170" y="225" text-anchor="middle" class="donut_note">engaged in research</text>
					</svg>

					<div class="faculty_status">
						<div class="faculty_status_title">FACULTY STATUS</div>
						{#each facultyStatus as row}
							<div class="status_row tone_{row.tone}">
								<span class="status_dot" aria-hidden="true"></span>
								<div class="status_text">
									<span class="status_label">{row.label}</span>
									{#if row.note}
										<span class="status_note">{row.note}</span>
									{/if}
								</div>
								<span class="status_value">{row.value}</span>
							</div>
						{/each}
					</div>
				</div>
			</div>

			<div class="panel_slide" class:is_hidden={activePanelSlide !== 1}>
				<h3>INDEXATION BREAKDOWN BY CALENDAR YEAR</h3>
				<p>
					The BSIT program has consistently published across premier academic databases from 2018
					to 2025, totaling 59 papers — 54 indexed in SCOPUS or Web of Science and 5 in other
					refereed journals.
				</p>

				<svg class="year_chart" viewBox="0 0 700 300" role="img" aria-label="Articles per year bar chart">
					<defs>
						<linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0" stop-color="#FCD97C" />
							<stop offset="1" stop-color="#F2A53A" />
						</linearGradient>
					</defs>
					<text x="0" y="14" class="chart_axis_title">ARTICLES PER YEAR</text>
					<rect x="550" y="5" width="11" height="11" rx="3" fill="#F7B94A" />
					<text x="567" y="14.5" class="chart_legend_text">Articles</text>
					{#each [0, 5, 10, 15, 20] as tick}
						{@const y = 246 - tick * 10.3}
						<line x1="44" x2="684" y1={y} y2={y} class="grid_line" class:baseline={tick === 0} />
						<text x="34" y={y + 4} text-anchor="end" class="chart_tick">{tick}</text>
					{/each}
					{#each indexationByYear as item, i}
						{@const h = item.count * 10.3}
						{@const x = 61.6 + i * 80}
						<g>
							<rect
								x={x + 10}
								y={246 - h}
								width="45"
								height={h}
								rx="10"
								fill="url(#barGrad)"
							/>
							<text x={x + 32.5} y={246 - h - 8} text-anchor="middle" class="bar_value">{item.count}</text>
							<text x={x + 32.5} y="268" text-anchor="middle" class="bar_year">{item.year}</text>
						</g>
					{/each}
					<text x="364" y="290" text-anchor="middle" class="chart_axis_title">YEAR</text>
				</svg>
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
			{#each facultyResearchers as researcher, index}
				<button
					class="faculty_card"
					class:is_flipped={flippedFacultyIndices.has(index)}
					type="button"
					aria-pressed={flippedFacultyIndices.has(index)}
					onclick={() => toggleFacultyCard(index)}
				>
					<span class="faculty_card_inner">
						<span class="faculty_card_face faculty_front">
							<img src={researcher.image} alt="{researcher.name}, {researcher.role}" />
							<span class="published_badge">
								<span>Published<br />Studies</span>
								<strong>{researcher.count}</strong>
							</span>
							<span class="faculty_overlay">
								<strong>{researcher.name}</strong>
								<span>{researcher.role}</span>
							</span>
						</span>
						<span class="faculty_card_face faculty_back">
							<span class="faculty_back_label">Published Research</span>
							<strong>{researcher.name}</strong>
							<span class="faculty_publications">
								{#each researcher.publications as publication}
									<span>{publication}</span>
								{/each}
							</span>
						</span>
					</span>
				</button>
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
		position: relative;
		isolation: isolate;
		background: #ffffff;
		color: #120f0f;
		min-height: 100vh;
	}

	.research_page > section,
	.research_page > :global(footer) {
		position: relative;
		z-index: 1;
	}

	.hero_section {
		position: relative;
		min-height: 100dvh;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		background: transparent;
	}

	.hero_content {
		position: relative;
		z-index: 1;
		padding: 2rem;
	}

	/* Font, weight, tracking and the black→maroon gradient all come from the
	   global .t_display role. Only the page-specific bit stays here. */
	.hero_title {
		position: relative;
		z-index: 1;
		font-family: 'Helvetica', Arial, sans-serif;
		font-size: clamp(4rem, 8vw, 8rem);
		font-weight: 600;
		letter-spacing: 0.05em;
		margin: 0;
		background: linear-gradient(to right, #000000 0%, #941518 80%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		color: transparent;
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
		gap: 1.6rem;
		width: min(100%, 1160px);
		margin: 0 auto;
	}

	.framework_card {
		min-height: 610px;
		border: 2px solid #d2a32a;
		border-radius: 18px;
		padding: 5.75rem 2.5rem 3.75rem;
		text-align: center;
		display: grid;
		grid-template-rows: 4.5rem 8.25rem auto;
		justify-items: center;
		align-content: start;
		row-gap: 1.6rem;
		background: #fff;
	}

	:global(.framework_icon) {
		color: #050505;
		align-self: end;
	}

	.framework_card h3 {
		font-family: var(--font-heading);
		font-size: clamp(1.2rem, 1.45vw, 1.62rem);
		font-weight: 800;
		letter-spacing: 0.14em;
		line-height: 1.15;
		text-transform: uppercase;
		color: var(--color-maroon);
		margin: 0;
		max-width: 100%;
		text-wrap: balance;
	}

	.framework_card p {
		font-family: var(--font-body);
		font-size: clamp(1rem, 1.25vw, 1.28rem);
		line-height: 1.12;
		margin: 0;
		max-width: 300px;
		color: #0d0d0d;
		text-wrap: pretty;
	}

	.incentive_stack {
		width: min(100%, 1500px);
		margin: 0 auto 4.25rem;
		display: grid;
		justify-items: center;
	}

	.incentive_item {
		width: var(--track-width);
		margin-top: -3px;
	}

	.incentive_row {
		width: 100%;
		height: 70px;
		border: 2px solid #d2a32a;
		border-radius: 18px;
		background: #fff;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 3rem;
		padding: 0 3rem;
		color: var(--color-maroon);
		cursor: pointer;
		transition:
			transform 0.22s cubic-bezier(0.16, 1, 0.3, 1),
			border-color 0.22s ease,
			background 0.22s ease;
	}

	.incentive_row span {
		font-family: var(--font-heading);
		font-size: clamp(0.95rem, 1.2vw, 1.35rem);
		font-weight: 800;
		letter-spacing: 0.26em;
		text-transform: uppercase;
	}

	.incentive_row:hover {
		background: #fffaf0;
		border-color: #bd850d;
		transform: translateY(-1px);
	}

	.incentive_row:active {
		transform: translateY(1px);
	}

	.incentive_row:focus-visible {
		outline: 3px solid rgba(140, 15, 19, 0.28);
		outline-offset: 3px;
	}

	:global(.chevron_open) {
		transform: rotate(180deg);
	}

	.incentive_row :global(svg) {
		flex: 0 0 auto;
		transition: transform 0.24s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.incentive_panel {
		border: 2px solid #d2a32a;
		border-top: 0;
		border-radius: 0 0 18px 18px;
		background: #fffaf0;
		margin: -14px auto 0;
		padding: 1.75rem 2.25rem 1.5rem;
		box-sizing: border-box;
		color: #4c1415;
		animation: dropdown-reveal 0.22s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.incentive_panel p {
		font-family: var(--font-body);
		font-size: clamp(0.95rem, 1.05vw, 1.12rem);
		font-weight: 600;
		line-height: 1.35;
		margin: 0 auto;
		max-width: 72ch;
		text-align: center;
	}

	@keyframes dropdown-reveal {
		from {
			opacity: 0;
			transform: translateY(-0.6rem);
		}

		to {
			opacity: 1;
			transform: translateY(0);
		}
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

	/* Key Productivity — hexagon metric carousel (ported from the Framer reference) */
	.metrics_carousel {
		--carousel-scale: 0.88;
		--carousel-w: calc(866px * var(--carousel-scale));
		--carousel-h: calc(704px * var(--carousel-scale));
		position: relative;
		width: var(--carousel-w);
		max-width: 100%;
		height: var(--carousel-h);
		margin: 0 auto 3.5rem;
	}

	.metrics_stage {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 866px;
		height: 704px;
		margin-left: -433px;
		margin-top: -352px;
		transform-origin: 50% 50%;
		transform: rotate(var(--metrics-orbit, 0deg)) scale(var(--carousel-scale));
		transition: transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
		z-index: 1;
		pointer-events: none;
	}

	.hex_web {
		position: absolute;
		left: 183.5px;
		top: 117px;
		width: 442px;
		height: 462px;
		display: block;
		overflow: visible;
	}

	.metric_card {
		position: absolute;
		left: var(--card-left);
		top: var(--card-top);
		width: 219px;
		height: 247px;
		box-sizing: border-box;
		border-radius: 26px;
		border: 4px solid transparent;
		background:
			linear-gradient(#fff, #fff) padding-box,
			linear-gradient(0deg, #ca8106, #fac549) border-box;
		padding: 0 14px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 8px;
		text-align: center;
		cursor: pointer;
		pointer-events: auto;
		transform: rotate(var(--card-rotate, 0deg));
		transform-origin: 50% 50%;
		transition:
			transform 0.65s cubic-bezier(0.22, 1, 0.36, 1),
			box-shadow 0.3s ease;
	}

	.metric_card.is_active {
		box-shadow: 0 16px 34px rgba(0, 0, 0, 0.25);
		z-index: 120;
	}

	.metric_card:not(.is_active) {
		box-shadow: 0 8px 18px rgba(0, 0, 0, 0.18);
		z-index: 45;
	}

	.metric_card:focus-visible {
		outline: 3px solid rgba(140, 15, 19, 0.35);
		outline-offset: 4px;
	}

	.metric_card_label {
		font-family: var(--font-body);
		font-size: 17px;
		font-weight: 700;
		line-height: 1.2;
		color: #1b1b1b;
	}

	.metric_card_value {
		font-family: var(--font-body);
		font-size: 58px;
		font-weight: 800;
		line-height: 1.05;
		color: #6e0f12;
	}

	.metric_card.has_long_value .metric_card_value {
		font-size: 46px;
	}

	.metric_card_desc {
		font-family: var(--font-body);
		font-size: 13.5px;
		line-height: 1.35;
		color: #555;
	}

	.center_logo {
		position: absolute;
		left: 367px;
		top: 307px;
		width: 132px;
		height: 132px;
		object-fit: contain;
		z-index: 250;
		pointer-events: none;
	}

	.metric_control {
		position: absolute;
		top: 347px;
		z-index: 300;
		width: 52px;
		height: 52px;
		border-radius: 50%;
		border: none;
		padding: 0;
		display: grid;
		place-items: center;
		cursor: pointer;
		color: #fff;
		background: linear-gradient(135deg, #fac549, #ca8106);
		box-shadow: 0 6px 16px rgba(202, 129, 6, 0.4);
		transition:
			transform 0.22s cubic-bezier(0.16, 1, 0.3, 1),
			filter 0.22s ease;
	}

	.metric_control:hover {
		transform: scale(1.06);
		filter: saturate(1.1);
	}

	.metric_control:active {
		transform: scale(0.98);
	}

	.metric_control:focus-visible {
		outline: 3px solid rgba(140, 15, 19, 0.35);
		outline-offset: 3px;
	}

	.metric_control_previous {
		left: 0;
	}

	.metric_control_next {
		right: 0;
	}

	/* Detail panel — gold-bordered slides (faculty engagement / indexation by year) */
	.distribution_panel {
		position: relative;
		z-index: 2;
		width: 800px;
		max-width: 100%;
		height: 560px;
		margin: -36px auto 0;
		box-sizing: border-box;
		border-radius: 30px;
		border: 4px solid transparent;
		background:
			linear-gradient(#fff, #fff) padding-box,
			linear-gradient(0deg, #ca8106, #fac549) border-box;
		box-shadow: 0 18px 40px rgba(0, 0, 0, 0.22);
		overflow: hidden;
	}

	.panel_slide {
		position: absolute;
		inset: 0;
		padding: 30px 36px;
		box-sizing: border-box;
		opacity: 1;
		transform: translateX(0);
		transition:
			opacity 0.5s ease,
			transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
		pointer-events: auto;
	}

	.panel_slide.is_hidden {
		opacity: 0;
		transform: translateX(-48px);
		pointer-events: none;
	}

	.distribution_panel h3 {
		margin: 0;
		text-align: center;
		font-family: var(--font-body);
		font-size: 22px;
		font-weight: 800;
		letter-spacing: 0.05em;
		color: #111;
	}

	.distribution_panel p {
		margin: 16px 0 18px;
		font-family: var(--font-body);
		font-size: 17px;
		line-height: 1.55;
		text-align: justify;
		color: #222;
	}

	.engagement_row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 36px;
	}

	.engagement_donut {
		width: 290px;
		height: 290px;
	}

	.donut_outer {
		transition: stroke-dasharray 1.1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.15s;
	}

	.donut_inner {
		transition: stroke-dasharray 1.1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.35s;
	}

	.donut_value {
		font-family: var(--font-body);
		font-size: 58px;
		font-weight: 800;
		fill: #6e0f12;
	}

	.donut_sub {
		font-family: var(--font-body);
		font-size: 16px;
		fill: #444;
	}

	.donut_note {
		font-family: var(--font-body);
		font-size: 12px;
		fill: #777;
	}

	.faculty_status {
		flex: 0 1 330px;
		box-sizing: border-box;
		border: 2px solid #fac549;
		border-radius: 22px;
		padding: 20px 22px;
		background: #fff;
	}

	.faculty_status_title {
		font-family: var(--font-body);
		font-size: 15px;
		font-weight: 700;
		letter-spacing: 0.06em;
		margin-bottom: 6px;
	}

	.status_row {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 10px 0;
		border-top: 1px solid #222;
	}

	.status_dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		flex-shrink: 0;
		box-sizing: border-box;
	}

	.tone_ft .status_dot {
		border: 2px solid #9b1c1a;
		background: #f4e3e4;
	}

	.tone_ft-engaged .status_dot {
		background: #9b1c1a;
	}

	.tone_pt .status_dot {
		border: 2px solid #f0b36b;
		background: #fbebd9;
	}

	.tone_pt-engaged .status_dot {
		background: #e5862a;
	}

	.status_text {
		flex: 1;
	}

	.status_label {
		display: block;
		font-family: var(--font-body);
		font-size: 12px;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: #1b1b1b;
	}

	.status_note {
		display: block;
		font-family: var(--font-body);
		font-size: 11px;
		color: #777;
	}

	.status_value {
		font-family: var(--font-body);
		font-size: 20px;
		font-weight: 700;
		color: #ca8106;
	}

	.year_chart {
		display: block;
		width: 100%;
	}

	.chart_axis_title {
		font-family: var(--font-body);
		font-size: 10px;
		font-weight: 600;
		letter-spacing: 0.12em;
		fill: #666;
	}

	.chart_legend_text {
		font-family: var(--font-body);
		font-size: 13px;
		fill: #444;
	}

	.chart_tick {
		font-family: var(--font-body);
		font-size: 12px;
		fill: #555;
	}

	.grid_line {
		stroke: #e4e4e4;
		stroke-dasharray: 4 5;
	}

	.grid_line.baseline {
		stroke: #b8b8b8;
		stroke-dasharray: none;
	}

	.bar_value {
		font-family: var(--font-body);
		font-size: 17px;
		font-weight: 700;
		fill: #6e0f12;
	}

	.bar_year {
		font-family: var(--font-body);
		font-size: 13px;
		fill: #333;
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
		padding: 0;
		border: 0;
		background: #730f12;
		box-shadow: 0 8px 18px rgba(0, 0, 0, 0.28);
		cursor: pointer;
		perspective: 1200px;
		text-align: left;
		color: inherit;
	}

	.faculty_card_inner {
		position: absolute;
		inset: 0;
		display: block;
		transform-style: preserve-3d;
		transition: transform 0.65s cubic-bezier(0.2, 0.7, 0.2, 1);
	}

	.faculty_card.is_flipped .faculty_card_inner {
		transform: rotateY(180deg);
	}

	.faculty_card_face {
		position: absolute;
		inset: 0;
		display: block;
		backface-visibility: hidden;
		-webkit-backface-visibility: hidden;
	}

	.faculty_front::after {
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

	.faculty_front img {
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

	.faculty_overlay strong {
		font-family: var(--font-body);
		font-size: clamp(1.3rem, 1.6vw, 2rem);
		font-weight: 800;
		color: #fff;
		margin: 0 0 0.2rem;
		line-height: 1;
	}

	.faculty_overlay span {
		font-family: var(--font-body);
		font-size: clamp(1rem, 1.2vw, 1.45rem);
		font-style: italic;
		font-weight: 800;
		color: #ffd138;
		margin: 0;
	}

	.faculty_back {
		background: #fff8e4;
		color: var(--color-maroon);
		padding: 2rem;
		box-sizing: border-box;
		transform: rotateY(180deg);
	}

	.faculty_back_label {
		display: block;
		font-size: 0.7rem;
		font-weight: 800;
		letter-spacing: 0.16em;
		text-transform: uppercase;
		color: #a96800;
		margin-bottom: 1.25rem;
	}

	.faculty_back > strong {
		display: block;
		font-family: var(--font-heading);
		font-size: clamp(1.4rem, 1.8vw, 2.2rem);
		line-height: 1.05;
		margin-bottom: 1.5rem;
	}

	.faculty_publications {
		display: block;
		font-size: clamp(1rem, 1.15vw, 1.35rem);
		font-weight: 600;
		line-height: 1.4;
		color: #322626;
	}

	@media (max-width: 1180px) {
		.content_section {
			padding-left: 4rem;
			padding-right: 4rem;
		}

		.framework_card {
			min-height: 560px;
			padding: 5.5rem 2rem 3rem;
		}

		.faculty_repository {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 900px) {
		.framework_grid {
			grid-template-columns: 1fr;
			gap: 1rem;
		}

		.framework_card {
			min-height: auto;
			padding: 3rem 1.5rem;
			grid-template-rows: auto;
			row-gap: 1.4rem;
		}

		.framework_card p {
			margin-top: 0.8rem;
		}
	}

	@media (max-width: 760px) {
		.hero_section {
			min-height: 72dvh;
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
			grid-template-rows: auto;
			row-gap: 1.4rem;
		}

		.framework_card p {
			margin-top: 0.8rem;
		}

		.incentive_stack {
			margin-top: 1.5rem;
		}

		.incentive_item {
			width: 100%;
		}

		.incentive_row {
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

		.incentive_panel {
			margin-top: -10px;
			padding: 1.35rem 1rem 1.15rem;
		}

		.incentive_panel p {
			text-align: left;
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

		.metrics_carousel {
			width: 100%;
			height: auto;
			margin: 0 0 2.5rem;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			align-items: center;
			justify-content: center;
			gap: 1.25rem;
		}

		.metrics_stage {
			position: static;
			width: 100%;
			height: auto;
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 1rem;
			transform: none;
			pointer-events: auto;
		}

		.hex_web,
		.center_logo {
			display: none;
		}

		.metric_card {
			position: static;
			width: min(100%, 340px);
			height: auto;
			min-height: 200px;
			padding: 2rem 1.25rem;
			transform: none;
		}

		.metric_card_value {
			font-size: 3.5rem;
		}

		.metric_card.has_long_value .metric_card_value {
			font-size: 2.75rem;
		}

		.metric_control {
			position: static;
			transform: none;
		}

		.metric_control_previous,
		.metric_control_next {
			left: auto;
			right: auto;
		}

		.distribution_panel {
			width: 100%;
			height: auto;
			min-height: 480px;
			margin: 0;
		}

		.panel_slide {
			padding: 1.75rem 1.25rem;
		}

		.distribution_panel p {
			text-align: left;
			font-size: 15px;
		}

		.engagement_donut {
			width: 220px;
			height: 220px;
		}

		.faculty_status {
			flex: 1 1 100%;
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
