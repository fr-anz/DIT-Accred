<script>
	import {
		BookOpen,
		Building2,
		ChevronLeft,
		ChevronRight,
		Download,
		KeyRound,
		Maximize2,
		Network
	} from 'lucide-svelte';
	import { tick } from 'svelte';
	import Footer from '$lib/components/footer.svelte';
	import ditLogo from '$lib/assets/DIT Logo.svg';

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
			placeholder:
				'Placeholder details for publication incentives, faculty mentoring, and indexed research targets.'
		},
		{
			title: 'Undergraduate Competition Deployment',
			placeholder:
				'Placeholder details for student research competitions, prototype reviews, and coach assignments.'
		},
		{
			title: 'Capstone Commercialization & Standardization',
			placeholder:
				'Placeholder details for capstone packaging, deployment readiness, and documentation standards.'
		},
		{
			title: 'Joint Global Research Linkages',
			placeholder:
				'Placeholder details for partner institutions, collaborative research tracks, and exchange outputs.'
		}
	];

	const facultyResearchers = Array.from({ length: 8 }, () => ({
		name: 'Aguila, Fermin',
		role: 'Full Time Faculty',
		count: 1,
		image: '/img/sir-melvin.jpg',
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
	const incentiveTrackCount = incentiveTracks.length;
	let activeIncentiveIndex = $state(incentiveTracks.length - 1);
	let activeMetricIndex = $state(0);
	let activePanelSlide = $state(0);
	let activeFacultyIndex = $state(0);
	/** @type {HTMLDivElement | null} */
	let facultyStripEl = $state(null);

	/** @param {number} index */
	const toggleFacultyCard = (index) => {
		if (activeFacultyIndex === index) return; // one panel always stays open
		activeFacultyIndex = index;
		focusFacultyPanel(index);
	};

	/** @param {number} direction */
	const stepFaculty = (direction) => {
		const total = facultyResearchers.length;
		activeFacultyIndex = (activeFacultyIndex + direction + total) % total;
		focusFacultyPanel(activeFacultyIndex);
	};

	/** Only the strip scrolls; the page never moves. No auto-scroll on first load.
	 *  @param {number} index */
	const focusFacultyPanel = async (index) => {
		await tick();
		const strip = facultyStripEl;
		if (!strip) return;
		const panel = strip.querySelector(`[data-faculty-index="${index}"]`);
		if (!(panel instanceof HTMLElement)) return;
		const target =
			panel.offsetLeft - (strip.clientWidth - panel.offsetWidth) / 2;
		strip.scrollTo({
			left: Math.max(0, target),
			behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
				? 'auto'
				: 'smooth'
		});
	};

	/** @param {number} index */
	const selectIncentiveTrack = (index) => {
		activeIncentiveIndex = index;
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

		<div class="framework_shell">
			<div class="framework_cards_row">
				{#each frameworkCards as card}
					{@const Icon = card.icon}
					<div class="framework_card">
						<Icon size={220} strokeWidth={1.1} class="framework_bg_icon" aria-hidden="true" />
						<h3>{card.title}</h3>
						<p>{card.description}</p>
					</div>
				{/each}
			</div>

			<div class="framework_detail_split">
				<nav class="incentive_nav" aria-label="Research development priority tracks">
					{#each incentiveTracks as track, index}
						<button
							class="incentive_row"
							type="button"
							class:is_active={activeIncentiveIndex === index}
							aria-current={activeIncentiveIndex === index ? 'true' : undefined}
							onclick={() => selectIncentiveTrack(index)}
						>
							<span>{track.title}</span>
							<ChevronRight size={24} strokeWidth={2.6} aria-hidden="true" />
						</button>
					{/each}
				</nav>

				<div class="incentive_detail" aria-live="polite">
					<img src={ditLogo} alt="" class="incentive_detail_logo" aria-hidden="true" />
					<div class="incentive_detail_text">
						<h3>{incentiveTracks[activeIncentiveIndex].title}</h3>
						<p>{incentiveTracks[activeIncentiveIndex].placeholder}</p>
					</div>
				</div>
			</div>
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

		<div
			class="metrics_carousel"
			id="metrics-ring"
			role="group"
			aria-roledescription="carousel"
			aria-label="Research metrics"
		>
			<div class="metrics_stage" style="--metrics-orbit: {activeMetricIndex * -120}deg;">
				<svg class="hex_web" viewBox="0 0 707 739" aria-hidden="true">
					<defs>
						<linearGradient
							id="hexStroke"
							x1="496.275"
							y1="121.209"
							x2="209.94"
							y2="617.156"
							gradientUnits="userSpaceOnUse"
						>
							<stop stop-color="#FAC549" />
							<stop offset="1" stop-color="#CA8106" />
						</linearGradient>
					</defs>
					<path
						d="M444.215 696.215L680.215 287.451L631.737 199.418L173.126 196.756L120.375 287.451L346.875 696.215L444.215 696.215Z"
						fill="#fff"
						stroke="url(#hexStroke)"
						stroke-width="6"
					/>
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
						style="--card-left: {card.left}px; --card-top: {card.top}px; --card-rotate: {i *
							120}deg;"
						aria-label={card.label}
						aria-current={i === activeMetricIndex ? 'true' : 'false'}
						onclick={() => setActiveMetric(i)}
					>
						<span class="metric_card_label">{card.label}</span>
						<span class="metric_card_value">{card.value}</span>
						<span class="metric_card_desc">{card.desc}</span>
					</button>
				{/each}

				<img class="center_logo" src={ditLogo} alt="DIT logo" aria-hidden="true" />
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
					<svg
						class="engagement_donut"
						viewBox="0 0 340 340"
						role="img"
						aria-label="12 of 42 faculty engaged in research"
					>
						<g transform="translate(170 170) rotate(-90)">
							<circle r="142" fill="none" stroke="#EFDADB" stroke-width="36" />
							<circle
								class="donut_outer"
								r="142"
								fill="none"
								stroke="#9B1C1A"
								stroke-width="36"
								stroke-dasharray="654.29 892.21"
							/>
							<circle r="100" fill="none" stroke="#FAE8D6" stroke-width="36" />
							<circle
								class="donut_inner"
								r="100"
								fill="none"
								stroke="#E5862A"
								stroke-width="36"
								stroke-dasharray="23.27 628.32"
							/>
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
					The BSIT program has consistently published across premier academic databases from 2018 to
					2025, totaling 59 papers — 54 indexed in SCOPUS or Web of Science and 5 in other refereed
					journals.
				</p>

				<svg
					class="year_chart"
					viewBox="0 0 700 300"
					role="img"
					aria-label="Articles per year bar chart"
				>
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
							<rect x={x + 10} y={246 - h} width="45" height={h} rx="10" fill="url(#barGrad)" />
							<text x={x + 32.5} y={246 - h - 8} text-anchor="middle" class="bar_value"
								>{item.count}</text
							>
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

		<div class="faculty_controls">
			<span class="faculty_counter" aria-live="polite">
				{activeFacultyIndex + 1} / {facultyResearchers.length}
			</span>
			<button
				class="faculty_nav_button"
				type="button"
				aria-label="Previous faculty"
				onclick={() => stepFaculty(-1)}
			>
				<ChevronLeft size={22} strokeWidth={3.2} />
			</button>
			<button
				class="faculty_nav_button"
				type="button"
				aria-label="Next faculty"
				onclick={() => stepFaculty(1)}
			>
				<ChevronRight size={22} strokeWidth={3.2} />
			</button>
		</div>

		<div class="faculty_repository" bind:this={facultyStripEl}>
			{#each facultyResearchers as researcher, index}
				{@const isOpen = activeFacultyIndex === index}
				<div
					class="faculty_panel"
					class:is_open={isOpen}
					data-faculty-index={index}
				>
					<button
						class="faculty_portrait"
						type="button"
						aria-expanded={isOpen}
						aria-controls="faculty-repository-{index}"
						onclick={() => toggleFacultyCard(index)}
					>
						<img src={researcher.image} alt="{researcher.name}, {researcher.role}" />
						<span class="faculty_portrait_gradient" aria-hidden="true"></span>
						<span class="faculty_portrait_name" aria-hidden="true">{researcher.name}</span>
						<span class="faculty_portrait_count" aria-hidden="true">
							<strong>{researcher.count}</strong>
							<span>Published<br />Studies</span>
						</span>
					</button>
					<div
						class="faculty_page"
						id="faculty-repository-{index}"
						aria-hidden={!isOpen}
						aria-label="Published research by {researcher.name}"
					>
						<span class="faculty_page_label">Published Research</span>
						<strong class="faculty_page_name">{researcher.name}</strong>
						<span class="faculty_page_role">{researcher.role}</span>
						<ul class="faculty_publications">
							{#each researcher.publications as publication}
								<li>{publication}</li>
							{/each}
						</ul>
					</div>
				</div>
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

	/* Development & Policy Framework — gold-gradient-bordered shell (same border
	   styling as the key productivity distribution panel), border-only top cards,
	   and a nav-list + cream detail split below. */
	.framework_shell {
		width: min(100%, 1444px);
		margin: 0 auto 4.25rem;
		box-sizing: border-box;
		border-radius: 34px;
		border: 4px solid transparent;
		background: linear-gradient(0deg, #ca8106, #fac549) border-box;
		box-shadow: 0 18px 40px rgba(0, 0, 0, 0.22);
		overflow: hidden;
	}

	.framework_cards_row {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
	}

	.framework_card {
		position: relative;
		overflow: hidden;
		box-sizing: border-box;
		padding: 3.25rem 2.75rem 3.5rem;
		background: #fff;
		transition:
			background 0.25s ease,
			box-shadow 0.25s ease;
	}

	.framework_card:hover {
		background: #fff8e8;
		box-shadow: inset 0 0 0 2px rgba(202, 129, 6, 0.55);
	}

	.framework_card + .framework_card {
		border-left: 2px solid rgba(202, 129, 6, 0.55);
	}

	:global(.framework_bg_icon) {
		position: absolute;
		right: -2.5rem;
		bottom: -3rem;
		color: #fac549;
		opacity: 0.28;
		pointer-events: none;
	}

	.framework_card h3,
	.framework_card p {
		position: relative;
		z-index: 1;
	}

	.framework_card h3 {
		font-family: var(--font-heading);
		font-size: clamp(1.05rem, 1.3vw, 1.4rem);
		font-weight: 800;
		letter-spacing: 0.14em;
		line-height: 1.2;
		text-transform: uppercase;
		text-align: center;
		color: var(--color-maroon);
		margin: 0;
		padding-bottom: 1.1rem;
		border-bottom: 1px solid rgba(0, 0, 0, 0.25);
		text-wrap: balance;
	}

	.framework_card p {
		font-family: var(--font-body);
		font-size: clamp(0.98rem, 1.1vw, 1.18rem);
		font-weight: 600;
		line-height: 1.45;
		margin: 1.4rem 0 0;
		color: #1c1c1c;
		text-wrap: pretty;
	}

	.framework_detail_split {
		display: grid;
		/* 1fr / 2fr keeps the nav|detail divider aligned with the first
		   card-column divider above, so the lines form a clean grid. */
		grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
		border-top: 2px solid rgba(202, 129, 6, 0.55);
	}

	.incentive_nav {
		display: grid;
		grid-template-rows: repeat(4, minmax(0, 1fr));
		background: #fff;
	}

	.incentive_row {
		width: 100%;
		box-sizing: border-box;
		border: 0;
		border-bottom: 1px solid rgba(0, 0, 0, 0.18);
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		padding: 1.1rem 1.75rem;
		color: var(--color-maroon);
		cursor: pointer;
		text-align: left;
		transition:
			background 0.22s ease,
			color 0.22s ease;
	}

	.incentive_row:last-child {
		border-bottom: 0;
	}

	.incentive_row span {
		font-family: var(--font-heading);
		font-size: clamp(0.8rem, 0.95vw, 1.02rem);
		font-weight: 800;
		letter-spacing: 0.18em;
		line-height: 1.45;
		text-transform: uppercase;
	}

	.incentive_row :global(svg) {
		flex: 0 0 auto;
		transition: transform 0.24s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.incentive_row:hover {
		background: #fffaf0;
	}

	.incentive_row:focus-visible {
		outline: 3px solid rgba(140, 15, 19, 0.28);
		outline-offset: -3px;
	}

	.incentive_row.is_active {
		background: #fdf3df;
	}

	.incentive_row.is_active :global(svg) {
		color: #ca8106;
		transform: translateX(4px);
	}

	.incentive_detail {
		position: relative;
		overflow: hidden;
		box-sizing: border-box;
		background: #fdf3df;
		border-left: 2px solid rgba(202, 129, 6, 0.55);
		padding: 3.25rem 3.5rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.incentive_detail_logo {
		position: absolute;
		right: -3rem;
		bottom: -3.5rem;
		width: 340px;
		height: 340px;
		object-fit: contain;
		opacity: 0.16;
		pointer-events: none;
	}

	.incentive_detail_text {
		position: relative;
		z-index: 1;
	}

	.incentive_detail h3 {
		font-family: var(--font-heading);
		font-size: clamp(1.15rem, 1.6vw, 1.7rem);
		font-weight: 800;
		letter-spacing: 0.12em;
		line-height: 1.25;
		text-transform: uppercase;
		color: var(--color-maroon);
		margin: 0;
	}

	.incentive_detail p {
		font-family: var(--font-body);
		font-size: clamp(1rem, 1.2vw, 1.25rem);
		line-height: 1.55;
		margin: 1.5rem 0 0;
		max-width: 56ch;
		color: #242424;
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
		--carousel-scale: 1.2;
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
		/* Matches the incentive stack and faculty repository widths (1444px)
		   so the panel fills the section like the other blocks do. */
		width: min(100%, 1444px);
		height: 640px;
		margin: -36px auto 0;
		box-sizing: border-box;
		border-radius: 34px;
		border: 4px solid transparent;
		background: linear-gradient(0deg, #ca8106, #fac549) border-box;
		box-shadow: 0 18px 40px rgba(0, 0, 0, 0.22);
		overflow: hidden;
	}

	.panel_slide {
		background: #fff;
	}

	.panel_slide {
		position: absolute;
		inset: 0;
		padding: 40px 56px;
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
		font-size: 28px;
		font-weight: 800;
		letter-spacing: 0.05em;
		color: #111;
	}

	.distribution_panel p {
		margin: 20px auto 24px;
		max-width: 1100px;
		font-family: var(--font-body);
		font-size: 20px;
		line-height: 1.55;
		text-align: justify;
		color: #222;
	}

	.engagement_row {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: 64px;
	}

	.engagement_donut {
		width: 360px;
		height: 360px;
	}

	.donut_outer {
		transition: stroke-dasharray 1.1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.15s;
	}

	.donut_inner {
		transition: stroke-dasharray 1.1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.35s;
	}

	.donut_value {
		font-family: var(--font-body);
		font-size: 72px;
		font-weight: 800;
		fill: #6e0f12;
	}

	.donut_sub {
		font-family: var(--font-body);
		font-size: 20px;
		fill: #444;
	}

	.donut_note {
		font-family: var(--font-body);
		font-size: 15px;
		fill: #777;
	}

	.faculty_status {
		flex: 0 1 460px;
		box-sizing: border-box;
		border: 2px solid #fac549;
		border-radius: 26px;
		padding: 28px 32px;
		background: #fff;
	}

	.faculty_status_title {
		font-family: var(--font-body);
		font-size: 18px;
		font-weight: 700;
		letter-spacing: 0.06em;
		margin-bottom: 8px;
	}

	.status_row {
		display: flex;
		align-items: center;
		gap: 14px;
		padding: 14px 0;
		border-top: 1px solid #222;
	}

	.status_dot {
		width: 15px;
		height: 15px;
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
		font-size: 15px;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		color: #1b1b1b;
	}

	.status_note {
		display: block;
		font-family: var(--font-body);
		font-size: 13px;
		color: #777;
	}

	.status_value {
		font-family: var(--font-body);
		font-size: 26px;
		font-weight: 700;
		color: #ca8106;
	}

	.year_chart {
		display: block;
		width: 100%;
		height: calc(100% - 130px);
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

	/* Faculty Researcher and Research Repository — expanding portrait strip.
	   Closed panels are fixed-width slices; one open panel grows like a book
	   opening (portrait shrinks left + returns to color, cream repository page
	   slides in on the right). */
	.faculty_controls {
		width: min(100%, 1444px);
		margin: 0 auto 1rem;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 0.75rem;
	}

	.faculty_counter {
		font-family: var(--font-body);
		font-size: 0.85rem;
		font-weight: 600;
		letter-spacing: 0.08em;
		color: var(--color-maroon);
		margin-right: 0.25rem;
	}

	.faculty_nav_button {
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 50%;
		border: 1.5px solid var(--color-gold);
		background: #fff;
		color: var(--color-maroon);
		display: grid;
		place-items: center;
		cursor: pointer;
		padding: 0;
		transition:
			background 0.22s ease,
			color 0.22s ease,
			transform 0.22s ease;
	}

	.faculty_nav_button:hover {
		background: var(--color-maroon);
		color: #fff;
	}

	.faculty_nav_button:focus-visible {
		outline: 2.5px solid var(--color-gold);
		outline-offset: 3px;
	}

	.faculty_repository {
		width: min(100%, 1444px);
		margin: 0 auto;
		display: flex;
		gap: 0.6rem;
		height: 600px;
		border-radius: 16px;
		overflow-x: auto;
		overflow-y: hidden;
		/* Scrollbar stays functional but invisible */
		scrollbar-width: none;
	}

	.faculty_repository::-webkit-scrollbar {
		display: none;
	}

	.faculty_panel {
		position: relative;
		flex: 1 1 0;
		min-width: 5.5rem;
		height: 100%;
		border-radius: 16px;
		overflow: hidden;
		display: flex;
		box-sizing: border-box;
		/* Transparent border on every panel keeps open/closed sizes stable;
		   the open panel fills it with the page's gold gradient border. */
		border: 2px solid transparent;
		transition: flex-grow 0.7s cubic-bezier(0.22, 1, 0.36, 1);
	}

	.faculty_panel.is_open {
		flex-grow: 7.5;
		border-color: transparent;
		background: linear-gradient(0deg, #ca8106, #fac549) border-box;
	}

	.faculty_portrait {
		position: relative;
		flex: 0 0 100%;
		width: 100%;
		min-width: 0;
		height: 100%;
		border: 0;
		padding: 0;
		margin: 0;
		background: var(--color-maroon-deep);
		cursor: pointer;
		overflow: hidden;
		display: block;
		text-align: left;
		transition:
			flex-basis 0.7s cubic-bezier(0.22, 1, 0.36, 1),
			width 0.7s cubic-bezier(0.22, 1, 0.36, 1);
	}

	.faculty_panel.is_open .faculty_portrait {
		flex-basis: 40%;
		width: 40%;
	}

	.faculty_portrait img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		filter: grayscale(1) sepia(0.35);
		transition: filter 0.7s cubic-bezier(0.22, 1, 0.36, 1);
	}

	.faculty_portrait_gradient {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			180deg,
			rgba(148, 21, 24, 0.78) 0%,
			rgba(33, 0, 0, 0.94) 100%
		);
		pointer-events: none;
		transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1);
	}

	.faculty_portrait_name {
		position: absolute;
		left: 50%;
		bottom: 1.25rem;
		transform: translateX(-50%) rotate(180deg);
		writing-mode: vertical-rl;
		font-family: var(--font-heading);
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: #fff;
		white-space: nowrap;
		pointer-events: none;
		transition: opacity 0.55s ease;
	}

	.faculty_portrait_count {
		position: absolute;
		left: 1.1rem;
		bottom: 1.1rem;
		display: flex;
		align-items: baseline;
		gap: 0.6rem;
		color: var(--color-gold-bright);
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.55s ease 0.3s;
	}

	.faculty_portrait_count strong {
		font-family: var(--font-heading);
		font-size: 2.6rem;
		font-weight: 800;
		line-height: 1;
	}

	.faculty_portrait_count > span {
		font-family: var(--font-body);
		font-size: 0.62rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		line-height: 1.3;
		text-transform: uppercase;
		color: #fff;
	}

	.faculty_panel.is_open .faculty_portrait img {
		filter: none;
	}

	.faculty_panel.is_open .faculty_portrait_gradient {
		opacity: 0;
	}

	.faculty_panel.is_open .faculty_portrait_name {
		opacity: 0;
	}

	.faculty_panel.is_open .faculty_portrait_count {
		opacity: 1;
	}

	.faculty_page {
		flex: 1 1 60%;
		width: 60%;
		min-width: 0;
		flex-shrink: 1;
		height: 100%;
		box-sizing: border-box;
		background: #fdf6e9;
		padding: 1.75rem 1.9rem;
		display: flex;
		flex-direction: column;
		overflow-y: auto;
		opacity: 0;
		transform: translateX(12%);
		pointer-events: none;
		transition:
			opacity 0.55s ease 0.25s,
			transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.25s;
	}

	.faculty_panel.is_open .faculty_page {
		opacity: 1;
		transform: translateX(0);
		pointer-events: auto;
	}

	.faculty_page_label {
		font-family: var(--font-body);
		font-size: 0.68rem;
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: #b8860b;
	}

	.faculty_page_name {
		font-family: var(--font-heading);
		font-size: 1.55rem;
		font-weight: 800;
		line-height: 1.2;
		color: var(--color-maroon);
		margin-top: 0.5rem;
	}

	.faculty_page_role {
		font-family: var(--font-body);
		font-size: 0.92rem;
		font-style: italic;
		color: #4a4a4a;
		margin-top: 0.15rem;
	}

	.faculty_publications {
		list-style: none;
		margin: 1.1rem 0 0;
		padding: 0.9rem 0 0;
		border-top: 1.5px solid var(--color-gold);
		flex: 1 0 auto;
	}

	.faculty_publications li {
		font-family: var(--font-body);
		font-size: 0.9rem;
		line-height: 1.5;
		color: #2c2c2c;
		padding: 0.75rem 0;
		border-bottom: 1px solid rgba(212, 155, 29, 0.45);
	}

	.faculty_publications li:last-child {
		border-bottom: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.faculty_panel,
		.faculty_portrait img,
		.faculty_portrait_gradient,
		.faculty_portrait_name,
		.faculty_portrait_count,
		.faculty_page {
			transition: none !important;
		}
	}

	@media (max-width: 1180px) {
		.content_section {
			padding-left: 4rem;
			padding-right: 4rem;
		}

		.framework_card {
			padding: 2.5rem 1.75rem 2.75rem;
		}

		.incentive_detail {
			padding: 2.5rem 2.25rem;
		}
	}

	@media (max-width: 920px) {
		.faculty_controls {
			width: 100%;
			padding: 0 0.25rem;
			box-sizing: border-box;
		}

		.faculty_repository {
			width: 100%;
			flex-direction: column;
			height: auto;
			max-height: 44rem;
			gap: 0.6rem;
			overflow-x: hidden;
			overflow-y: auto;
			padding-bottom: 0.5rem;
		}

		.faculty_panel {
			flex: 0 0 4.5rem;
			width: 100%;
			min-width: 100%;
			height: 4.5rem;
			flex-direction: column;
			transition: flex-basis 0.7s cubic-bezier(0.22, 1, 0.36, 1);
		}

		.faculty_panel.is_open {
			flex-basis: 36rem;
			height: 36rem;
		}

		.faculty_panel.is_open .faculty_portrait {
			flex-basis: 17rem;
			width: 100%;
			height: 17rem;
		}

		.faculty_portrait_name {
			writing-mode: horizontal-tb;
			left: 1rem;
			right: 1rem;
			bottom: 0.9rem;
			transform: none;
			text-align: center;
		}

		.faculty_portrait_count {
			left: 1rem;
			bottom: 0.9rem;
		}

		.faculty_page {
			width: 100%;
			flex: 1 1 auto;
			height: 19rem;
			padding: 1.25rem 1.1rem;
		}
	}

	@media (max-width: 900px) {
		.framework_cards_row {
			grid-template-columns: 1fr;
		}

		.framework_card + .framework_card {
			border-left: 0;
			border-top: 2px solid rgba(202, 129, 6, 0.55);
		}

		.framework_detail_split {
			grid-template-columns: 1fr;
		}

		.incentive_detail {
			border-left: 0;
			border-top: 2px solid rgba(202, 129, 6, 0.55);
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

		.framework_shell {
			border-radius: 24px;
			margin-bottom: 3rem;
		}

		.framework_card {
			padding: 2rem 1.5rem;
		}

		.incentive_row {
			min-height: 64px;
			gap: 1rem;
			padding: 0.9rem 1rem;
		}

		.incentive_row span {
			font-size: 0.78rem;
			letter-spacing: 0.14em;
			line-height: 1.35;
		}

		.incentive_detail {
			padding: 1.75rem 1.25rem;
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
			min-height: 560px;
			margin: 0;
		}

		.panel_slide {
			position: relative;
			inset: auto;
			padding: 1.75rem 1.25rem;
		}

		.panel_slide.is_hidden {
			display: none;
		}

		.distribution_panel h3 {
			font-size: 20px;
		}

		.distribution_panel p {
			text-align: left;
			font-size: 15px;
			margin: 14px 0 18px;
		}

		.engagement_row {
			gap: 28px;
		}

		.engagement_donut {
			width: 240px;
			height: 240px;
		}

		.donut_value {
			font-size: 56px;
		}

		.faculty_status {
			flex: 1 1 100%;
			padding: 20px 22px;
		}

		.faculty_section {
			padding-top: 5rem;
			padding-bottom: 5rem;
		}
	}
</style>
