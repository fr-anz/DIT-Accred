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
	} from '@lucide/svelte';
	import { resolve } from '$app/paths';
	import { tick } from 'svelte';
	import { countUp, reveal } from '#lib/actions/motion.ts';
	import Footer from '#lib/components/footer.svelte';
	import ditLogo from '#lib/assets/DIT Logo.svg';
	import { facultyResearch, facultyResearchByYear } from '#lib/data/facultyResearch.ts';

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

	/* Key Productivity, set as a feature: three headline figures between gold
	   rules, then faculty engagement and indexed articles side by side. */
	const metricFigures = [
		{
			label: 'Completed research',
			value: 70,
			decimals: 0,
			suffix: '',
			note: '2018–2024 academic cycles'
		},
		{
			label: 'Disseminated publications',
			value: 46,
			decimals: 0,
			suffix: '',
			note: 'Refereed and indexed platforms'
		},
		{
			label: 'High-impact indexation',
			value: 89.13,
			decimals: 2,
			suffix: '%',
			note: 'Premier global databases'
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

	const facultyGroups = [
		{ key: 'full', label: 'Full-time', total: 15, engaged: 11 },
		{ key: 'part', label: 'Part-time', total: 27, engaged: 1 }
	];
	const facultyTotal = facultyGroups.reduce((sum, group) => sum + group.total, 0);
	const facultyEngaged = facultyGroups.reduce((sum, group) => sum + group.engaged, 0);
	const indexedTotal = indexationByYear.reduce((sum, entry) => sum + entry.count, 0);
	const indexedPeak = Math.max(...indexationByYear.map((entry) => entry.count));

	/* Research-by-year spines: each year is a card-style spine whose height
	   follows that year's total output. */
	const researchYears = facultyResearchByYear.map((entry) => ({
		...entry,
		total: entry.presentations + entry.publications
	}));
	const researchScale = Math.max(...researchYears.map((entry) => entry.total));
	const researchYearSpan = `${facultyResearchByYear[0].year}–${facultyResearchByYear.at(-1)?.year}`;
	const researchTotals = facultyResearchByYear.reduce(
		(sum, entry) => ({
			presentations: sum.presentations + entry.presentations,
			publications: sum.publications + entry.publications
		}),
		{ presentations: 0, publications: 0 }
	);

	/** @param {string} status */
	const recordTone = (status) => {
		const value = status.toLowerCase();
		if (value.includes('published') || value.includes('indexed')) return 'published';
		if (value.includes('presented')) return 'presented';
		return 'pending';
	};

	/* Newest research first. */
	const facultyRepository = facultyResearch.map((researcher) => ({
		...researcher,
		records: [...researcher.records]
			.sort((a, b) => b.year - a.year)
			.map((record) => ({
				...record,
				tone: record.status ? recordTone(record.status) : 'pending'
			}))
	}));

	let activeIncentiveIndex = $state(incentiveTracks.length - 1);
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
		const total = facultyResearch.length;
		activeFacultyIndex = (activeFacultyIndex + direction + total) % total;
		focusFacultyPanel(activeFacultyIndex);
	};

	/** Only the strip scrolls; the page never moves. No auto-scroll on first load.
	 *  @param {number} index */
	const focusFacultyPanel = async (index) => {
		await tick();
		const strip = facultyStripEl;
		if (!strip || activeFacultyIndex !== index) return;
		const panel = strip.querySelector(`[data-faculty-index="${index}"]`);
		if (!(panel instanceof HTMLElement)) return;

		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const vertical = getComputedStyle(strip).flexDirection === 'column';
		/** @param {ScrollBehavior} behavior */
		const align = (behavior) => {
			const card = panel.getBoundingClientRect();
			const viewport = strip.getBoundingClientRect();

			strip.scrollTo(
				vertical
					? { top: strip.scrollTop + card.top - viewport.top, behavior }
					: {
							left:
								strip.scrollLeft + card.left - viewport.left - (viewport.width - card.width) / 2,
							behavior
						}
			);
		};

		align(reducedMotion ? 'instant' : 'smooth');
		if (reducedMotion) return;

		const resizing = strip
			.getAnimations({ subtree: true })
			.filter(
				(animation) =>
					animation instanceof CSSTransition &&
					['flex-grow', 'flex-basis'].includes(animation.transitionProperty)
			);
		if (resizing.length === 0) return;

		await Promise.allSettled(resizing.map((animation) => animation.finished));
		if (activeFacultyIndex === index) align('smooth');
	};

	/** @param {number} index */
	const selectIncentiveTrack = (index) => {
		activeIncentiveIndex = index;
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
		<div class="hero_bg" aria-hidden="true"></div>
		<div class="hero_content">
			<h1 class="t_display hero_title">RESEARCH</h1>
		</div>
	</section>

	<section class="content_section policy_section" id="policy">
		<header class="section_header reveal_surface" use:reveal>
			<BookOpen size={26} strokeWidth={1.5} class="section_icon maroon" />
			<h2 class="t_eyebrow">Research Development &amp; Policy Framework</h2>
		</header>
		<hr class="section_divider" />

		<div class="framework_shell">
			<div class="framework_cards_row">
				{#each frameworkCards as card (card.title)}
					{@const Icon = card.icon}
					<div class="framework_card reveal_surface" use:reveal>
						<Icon size={220} strokeWidth={1.1} class="framework_bg_icon" aria-hidden="true" />
						<h3>{card.title}</h3>
						<p>{card.description}</p>
					</div>
				{/each}
			</div>

			<div class="framework_detail_split">
				<nav class="incentive_nav" aria-label="Research development priority tracks">
					{#each incentiveTracks as track, index (track.title)}
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
			class="manual_link report-button"
			href={resolve('/research')}
			aria-label="Access full PUP Research and Development Manual"
		>
			<Download size={24} strokeWidth={1.8} />
			<span>Access Full PUP Research &amp; Development Manual</span>
		</a>
	</section>

	<section class="content_section productivity_section" id="productivity">
		<header class="section_header reveal_surface" use:reveal>
			<KeyRound size={26} strokeWidth={1.5} class="section_icon maroon" />
			<h2 class="t_eyebrow">Key Productivity Metrics &amp; Faculty Engagement</h2>
		</header>
		<hr class="section_divider" />

		<article class="productivity_feature">
			<div class="feature_intro" use:reveal={{ threshold: 0.4 }}>
				<h3 class="feature_headline">Seventy completed studies, forty-six of them published.</h3>
				<p class="feature_lede">
					Between 2018 and 2024 the department completed seventy studies. Forty-six were
					disseminated through refereed and indexed platforms, with an 89.13% high-impact indexation
					rate.
				</p>
			</div>

			<dl class="feature_figures" use:reveal={{ threshold: 0.3 }}>
				{#each metricFigures as figure, index (figure.label)}
					<div class="feature_figure" style:--figure-index={index}>
						<dt class="feature_figure_label">{figure.label}</dt>
						<dd class="feature_figure_value">
							<span
								use:countUp={{ to: figure.value, decimals: figure.decimals, delay: index * 150 }}
							>
								{figure.value.toFixed(figure.decimals)}
							</span>{#if figure.suffix}<small>{figure.suffix}</small>{/if}
						</dd>
						<dd class="feature_figure_note">{figure.note}</dd>
					</div>
				{/each}
			</dl>

			<div class="feature_lower">
				<section
					class="feature_faculty"
					aria-labelledby="faculty-engagement-title"
					use:reveal={{ threshold: 0.3 }}
				>
					<h4 class="feature_label" id="faculty-engagement-title">Faculty engaged in research</h4>
					<p class="feature_stat">
						<strong use:countUp={{ to: facultyEngaged, delay: 200 }}>{facultyEngaged}</strong> of {facultyTotal}
						faculty
					</p>
					<p class="feature_body">
						The department's research quality is driven by a dedicated core of active faculty whose
						sustained scholarly engagement continues to elevate the program's international academic
						footprint.
					</p>
					{#each facultyGroups as group (group.key)}
						<div class="faculty_group">
							<p class="feature_caption">
								{group.label}: {group.engaged} of {group.total} engaged ({Math.round(
									(group.engaged / group.total) * 100
								)}%)
							</p>
							<div class="faculty_dots" aria-hidden="true">
								{#each { length: group.total }, index (index)}
									<span
										class="faculty_dot is_{group.key}"
										class:is_engaged={index < group.engaged}
										style:--dot-index={index}
									></span>
								{/each}
							</div>
						</div>
					{/each}
				</section>

				<section class="feature_indexation" aria-labelledby="indexation-title">
					<h4 class="feature_label" id="indexation-title">Indexed articles by year</h4>
					<ol class="indexation_bars" use:reveal={{ threshold: 0.3 }}>
						{#each indexationByYear as entry, index (entry.year)}
							<li
								class="indexation_bar"
								class:is_peak={entry.count === indexedPeak}
								style:--bar-share={entry.count / indexedPeak}
								style:--bar-index={index}
							>
								<span class="indexation_value">{entry.count}</span>
								<span class="indexation_column" aria-hidden="true"></span>
								<span class="indexation_year">{entry.year}</span>
							</li>
						{/each}
					</ol>
					<p class="feature_foot">
						{indexedTotal} papers, 2018–2025. 54 indexed in Scopus or Web of Science, 5 in other refereed
						journals.
					</p>
				</section>
			</div>
		</article>
	</section>

	<section class="content_section faculty_section" id="published-research">
		<header class="section_header reveal_surface" use:reveal>
			<Network size={26} strokeWidth={1.5} class="section_icon maroon" />
			<h2 class="t_eyebrow">Faculty Researcher and Research Repository</h2>
		</header>
		<hr class="section_divider" />

		<div class="faculty_controls">
			<span class="faculty_counter" aria-live="polite">
				{activeFacultyIndex + 1} / {facultyResearch.length}
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
			{#each facultyRepository as researcher, index (researcher.name)}
				{@const isOpen = activeFacultyIndex === index}
				<div class="faculty_panel" class:is_open={isOpen} data-faculty-index={index}>
					<button
						class="faculty_portrait"
						type="button"
						aria-label={researcher.name}
						aria-expanded={isOpen}
						aria-controls="faculty-repository-{index}"
						onclick={() => toggleFacultyCard(index)}
					>
						{#if researcher.image}
							<img src={researcher.image} alt="" loading="lazy" />
						{:else}
							<span class="faculty_portrait_symbol" aria-hidden="true">
								<BookOpen strokeWidth={1} />
							</span>
						{/if}
						<span class="faculty_portrait_gradient" aria-hidden="true"></span>
						<span class="faculty_portrait_name" aria-hidden="true">{researcher.name}</span>
						<span class="faculty_portrait_count" aria-hidden="true">
							<strong>{researcher.records.length}</strong>
							<span>Research<br />{researcher.records.length === 1 ? 'Record' : 'Records'}</span>
						</span>
					</button>
					<!-- svelte-ignore a11y_no_noninteractive_tabindex (Keyboard users need to scroll the active research records.) -->
					<div
						class="faculty_page"
						id="faculty-repository-{index}"
						role="region"
						aria-hidden={!isOpen}
						aria-label="Research by {researcher.name}"
						tabindex={isOpen ? 0 : undefined}
					>
						<strong class="faculty_page_name">{researcher.name}</strong>
						<ul class="faculty_publications">
							{#each researcher.records as record (`${record.year}:${record.title}`)}
								<li class="faculty_record">
									<p class="faculty_record_meta">
										<time class="faculty_record_year" datetime={String(record.year)}>
											{record.year}
										</time>
										{#if record.status}
											<span class="faculty_record_status tone_{record.tone}">{record.status}</span>
										{/if}
									</p>
									<p class="faculty_record_title">{record.title}</p>
								</li>
							{/each}
						</ul>
					</div>
				</div>
			{/each}
		</div>

		<figure
			class="research_spines"
			aria-labelledby="faculty-research-by-year"
			use:reveal={{ threshold: 0.15 }}
		>
			<figcaption class="spines_summary">
				<strong class="spines_title" id="faculty-research-by-year">
					BSIT faculty research by year
				</strong>
				<span class="spines_span">{researchYearSpan}</span>
			</figcaption>

			<dl class="spines_totals">
				<div class="spines_total is_publication">
					<dd>{researchTotals.publications}</dd>
					<dt>Publications</dt>
				</div>
				<div class="spines_total is_presentation">
					<dd>{researchTotals.presentations}</dd>
					<dt>Presentations</dt>
				</div>
			</dl>

			<ol class="spines_chart">
				{#each researchYears as entry, index (entry.year)}
					<li class="spine_column" style:--spine-index={index}>
						<span class="spine_year">{entry.year}</span>
						<span class="spine_total" aria-hidden="true">{entry.total}</span>
						<span class="spine" style:--spine-share={entry.total / researchScale}>
							{#if entry.publications}
								<span class="spine_segment is_publication" style:flex-grow={entry.publications}>
									<strong>{entry.publications}</strong>
									<span class="visually_hidden">
										{entry.publications === 1 ? 'publication' : 'publications'},
									</span>
								</span>
							{/if}
							{#if entry.presentations}
								<span class="spine_segment is_presentation" style:flex-grow={entry.presentations}>
									<strong>{entry.presentations}</strong>
									<span class="visually_hidden">
										{entry.presentations === 1 ? 'presentation' : 'presentations'}
									</span>
								</span>
							{/if}
						</span>
					</li>
				{/each}
			</ol>
		</figure>
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

	/* Photo sits at 30% so the gradient title stays readable, matching the
	   other page heroes. */
	.hero_bg {
		position: absolute;
		inset: 0;
		background: url('/img/pages/research-hero.jpg') center / cover no-repeat;
		opacity: 0.3;
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

	/* Same pattern as the Planning & QA page: maroon icon + the global
	   .t_eyebrow role (Inter SemiBold, --fs-xl, 0.27em, gold gradient fill). */
	.section_header {
		display: flex;
		align-items: center;
		gap: 0.85rem;
	}

	.section_header :global(.t_eyebrow) {
		display: inline-block;
	}

	:global(.section_icon.maroon) {
		color: var(--c-maroon);
		flex-shrink: 0;
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
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 4rem;
		font-family: var(--font-body);
		font-size: clamp(1rem, 1.4vw, 1.55rem);
		box-sizing: border-box;
	}

	.productivity_section {
		padding-top: 11rem;
	}

	/* Key Productivity — set as an editorial feature in the site's type:
	   headline and intro, three figures between gold rules, then faculty
	   engagement and indexed articles side by side. */
	.productivity_feature {
		width: min(100%, 1444px);
		margin: 0 auto;
		font-family: var(--font-body);
		color: var(--c-ink);
	}

	.feature_headline {
		margin: 0;
		max-width: 22ch;
		font-family: var(--font-heading);
		font-size: clamp(1.9rem, 3.6vw, 3.25rem);
		font-weight: 800;
		line-height: 1.1;
		color: var(--color-maroon);
		text-wrap: balance;
	}

	.feature_lede {
		max-width: 62ch;
		margin: clamp(0.9rem, 1.6vw, 1.25rem) 0 0;
		font-size: clamp(1rem, 1.3vw, 1.2rem);
		line-height: 1.6;
		color: #2c2c2c;
	}

	.feature_figures {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		margin: clamp(2rem, 4vw, 3rem) 0;
		border-top: 1.5px solid var(--color-gold);
		border-bottom: 1.5px solid var(--color-gold);
	}

	.feature_figure {
		display: flex;
		flex-direction: column;
		padding: clamp(1.25rem, 2.4vw, 2rem) clamp(1rem, 2.4vw, 2rem);
	}

	.feature_figure:first-child {
		padding-left: 0;
	}

	.feature_figure + .feature_figure {
		border-left: 1px solid rgba(212, 155, 29, 0.45);
	}

	.feature_figure {
		position: relative;
	}

	/* Hover draws a gold rule in under the figure. */
	.feature_figure::after {
		content: '';
		position: absolute;
		left: clamp(1rem, 2.4vw, 2rem);
		right: clamp(1rem, 2.4vw, 2rem);
		bottom: -1.5px;
		height: 3px;
		background: linear-gradient(90deg, #ca8106, #fac549);
		transform: scaleX(0);
		transform-origin: left center;
		transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
	}

	.feature_figure:first-child::after {
		left: 0;
	}

	.feature_figure_value {
		transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
	}

	@media (hover: hover) {
		.feature_figure:hover::after {
			transform: scaleX(1);
		}

		.feature_figure:hover .feature_figure_value {
			transform: translateY(-4px);
		}
	}

	/* The figure reads first; the label stays first in the markup. */
	.feature_figure_value {
		order: -1;
		margin: 0 0 0.6rem;
		font-family: var(--font-heading);
		font-size: clamp(3rem, 6vw, 5.5rem);
		font-weight: 800;
		line-height: 1;
		color: var(--color-maroon);
		font-variant-numeric: tabular-nums;
	}

	.feature_figure_value small {
		font-size: 0.55em;
	}

	.feature_figure_label {
		font-size: clamp(0.72rem, 0.9vw, 0.85rem);
		font-weight: 700;
		letter-spacing: 0.14em;
		line-height: 1.3;
		text-transform: uppercase;
	}

	.feature_figure_note {
		margin: 0.3rem 0 0;
		font-size: 0.95rem;
		line-height: 1.45;
		color: #555;
	}

	.feature_lower {
		display: grid;
		grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
		gap: clamp(2rem, 4vw, 4rem);
	}

	.feature_indexation {
		padding-left: clamp(2rem, 4vw, 4rem);
		border-left: 1px solid rgba(212, 155, 29, 0.45);
	}

	.feature_label {
		margin: 0 0 0.75rem;
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: #555;
	}

	.feature_stat {
		margin: 0;
		font-family: var(--font-heading);
		font-size: clamp(1.25rem, 1.8vw, 1.6rem);
		font-weight: 800;
		color: var(--color-maroon);
	}

	.feature_stat strong {
		font-size: 2em;
		line-height: 1;
	}

	.feature_body {
		max-width: 52ch;
		margin: 0.75rem 0 1.5rem;
		font-size: 0.98rem;
		line-height: 1.6;
		color: #2c2c2c;
	}

	.faculty_group + .faculty_group {
		margin-top: 1.1rem;
	}

	.feature_caption {
		margin: 0 0 0.5rem;
		font-size: 0.85rem;
		font-weight: 600;
		color: #2c2c2c;
	}

	/* One dot per faculty member; filled dots are engaged in research. */
	.faculty_dots {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}

	.faculty_dot {
		width: 14px;
		height: 14px;
		box-sizing: border-box;
		border: 1.5px solid #e2cfa0;
		border-radius: 50%;
	}

	.faculty_dot {
		transition:
			transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
			background 0.3s ease,
			border-color 0.3s ease;
	}

	/* Hovering a group lifts its engaged dots. */
	@media (hover: hover) {
		.faculty_group:hover .faculty_dot.is_engaged {
			transform: scale(1.25);
		}
	}

	.faculty_dot.is_full.is_engaged {
		border-color: var(--color-maroon);
		background: var(--color-maroon);
	}

	.faculty_dot.is_part.is_engaged {
		border-color: var(--c-gold-dark);
		background: var(--c-gold-dark);
	}

	.indexation_bars {
		display: flex;
		align-items: flex-end;
		gap: clamp(0.35rem, 0.8vw, 0.6rem);
		height: clamp(11rem, 16vw, 14rem);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.indexation_bar {
		flex: 1 1 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-end;
		min-width: 0;
		height: 100%;
	}

	.indexation_value {
		margin-bottom: 0.3rem;
		font-family: var(--font-heading);
		font-size: 0.9rem;
		font-weight: 800;
		color: var(--color-maroon);
	}

	.indexation_column {
		width: 100%;
		height: calc((100% - 3.2rem) * var(--bar-share));
		border-radius: 8px 8px 0 0;
		background: linear-gradient(0deg, #ca8106, #fac549);
		transform-origin: bottom center;
	}

	.indexation_bar {
		cursor: default;
		transition: opacity 0.3s ease;
	}

	.indexation_column,
	.indexation_value {
		transition:
			transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
			filter 0.3s ease;
	}

	/* Hovering a year brings it forward and quiets the rest. */
	@media (hover: hover) {
		.indexation_bars:hover .indexation_bar:not(:hover) {
			opacity: 0.4;
		}

		.indexation_bar:hover .indexation_value {
			transform: translateY(-4px) scale(1.15);
		}

		.indexation_bar:hover .indexation_column {
			filter: brightness(1.08) saturate(1.1);
		}
	}

	.indexation_bar.is_peak .indexation_column {
		background: linear-gradient(180deg, #941518, #3a0505);
	}

	.indexation_year {
		width: 100%;
		margin-top: 0;
		padding-top: 0.4rem;
		border-top: 1.5px solid var(--color-gold);
		font-family: var(--font-heading);
		font-size: clamp(0.68rem, 0.85vw, 0.8rem);
		font-weight: 700;
		letter-spacing: 0.06em;
		text-align: center;
		color: var(--color-maroon);
	}

	.feature_foot {
		margin: 1rem 0 0;
		font-size: 0.9rem;
		line-height: 1.5;
		color: #555;
	}

	@media (max-width: 900px) {
		.feature_figures,
		.feature_lower {
			grid-template-columns: minmax(0, 1fr);
		}

		.feature_figure,
		.feature_figure:first-child {
			padding: 1.25rem 0;
		}

		.feature_figure + .feature_figure {
			border-left: 0;
			border-top: 1px solid rgba(212, 155, 29, 0.45);
		}

		.feature_indexation {
			padding: 2rem 0 0;
			border-left: 0;
			border-top: 1px solid rgba(212, 155, 29, 0.45);
		}
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
		min-width: min(100%, 26rem);
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

	.faculty_portrait_symbol {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		color: var(--c-gold-light);
	}
	.faculty_portrait_symbol :global(svg) {
		width: min(55%, 100px);
		height: auto;
	}

	.faculty_portrait_gradient {
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, rgba(148, 21, 24, 0.78) 0%, rgba(33, 0, 0, 0.94) 100%);
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

	.faculty_portrait:focus-visible,
	.faculty_page:focus-visible {
		outline: 2px solid var(--c-gold-dark);
		outline-offset: -4px;
	}

	.faculty_page_name {
		font-family: var(--font-heading);
		font-size: 1.55rem;
		font-weight: 800;
		line-height: 1.2;
		color: var(--color-maroon);
		margin-top: 0.5rem;
	}

	.faculty_publications {
		list-style: none;
		margin: 1.1rem 0 0;
		padding: 0.4rem 0 0;
		border-top: 1.5px solid var(--color-gold);
		flex: 1 0 auto;
	}

	/* Each record: a meta line (year, then status tag) over the title.
	   Spacing and a hairline separate records; no decorative markers. */
	.faculty_record {
		padding: 0.7rem 0;
		font-family: var(--font-body);
	}

	.faculty_record + .faculty_record {
		border-top: 1px solid rgba(212, 155, 29, 0.35);
	}

	.faculty_record_meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.3rem 0.6rem;
		margin: 0 0 0.3rem;
	}

	.faculty_record_year {
		font-family: var(--font-heading);
		font-size: 0.95rem;
		font-weight: 800;
		line-height: 1.2;
		color: var(--color-maroon);
		font-variant-numeric: tabular-nums;
	}

	.faculty_record_title {
		margin: 0;
		font-size: 0.93rem;
		font-weight: 500;
		line-height: 1.45;
		color: #1f1a1a;
		text-wrap: pretty;
	}

	.faculty_record_status {
		display: inline-block;
		padding: 0.12rem 0.55rem;
		border: 1px solid;
		border-radius: 999px;
		font-size: 0.7rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		line-height: 1.4;
		text-transform: uppercase;
		white-space: nowrap;
	}

	.faculty_record_status.tone_published {
		border-color: #e0a93a;
		background: rgba(250, 197, 73, 0.28);
		color: #6b3f00;
	}

	.faculty_record_status.tone_presented {
		border-color: rgba(148, 21, 24, 0.35);
		background: rgba(148, 21, 24, 0.07);
		color: var(--c-maroon);
	}

	.faculty_record_status.tone_pending {
		border-color: #b9b2a6;
		border-style: dashed;
		background: transparent;
		color: #57514a;
	}

	/* Faculty research by year — the same language as the repository strip:
	   a cream page in the gold gradient frame, holding one maroon card-spine per
	   year. Spine height follows the year's total; the gold top segment is
	   publications, the maroon base is presentations. */
	.research_spines {
		--spines-h: clamp(14rem, 30vw, 28rem);
		width: min(100%, 1444px);
		margin: clamp(2.5rem, 5vw, 4.5rem) auto 0;
		box-sizing: border-box;
		display: grid;
		grid-template-columns: minmax(12rem, 16rem) minmax(0, 1fr);
		gap: clamp(1.5rem, 3vw, 2.5rem) clamp(1.5rem, 4vw, 4rem);
		align-items: end;
		padding: clamp(1.75rem, 3vw, 2.5rem) clamp(1.5rem, 3.5vw, 3rem);
		border: 2px solid transparent;
		border-radius: 16px;
		background:
			linear-gradient(#fdf6e9, #fdf6e9) padding-box,
			linear-gradient(0deg, #ca8106, #fac549) border-box;
		font-family: var(--font-body);
		font-variant-numeric: tabular-nums;
	}

	.visually_hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		margin: -1px;
		padding: 0;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
		border: 0;
	}

	/* Title row spans the panel so the heading stays on one line. */
	.spines_summary {
		grid-column: 1 / -1;
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0.35rem 1.25rem;
		padding-bottom: clamp(1rem, 2vw, 1.5rem);
		border-bottom: 1.5px solid var(--color-gold);
	}

	.spines_title {
		font-family: var(--font-heading);
		font-size: clamp(1.6rem, 2.6vw, 2.5rem);
		font-weight: 800;
		line-height: 1.2;
		color: var(--color-maroon);
		scroll-margin-top: 7rem;
	}

	.spines_span {
		color: var(--c-maroon);
		font-size: clamp(0.95rem, 1.3vw, 1.2rem);
		font-weight: 700;
		letter-spacing: 0.08em;
	}

	.spines_totals {
		display: grid;
		gap: 0.9rem;
		margin: 0;
	}

	.spines_total {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	/* Small spine swatch doubles as the legend key. */
	.spines_total::before {
		content: '';
		flex: 0 0 0.7rem;
		height: 2.6rem;
		border-radius: 4px;
		background: var(--spine-fill);
	}

	.spines_total dd {
		margin: 0;
		min-width: 2ch;
		font-family: var(--font-heading);
		font-size: 2.6rem;
		font-weight: 800;
		line-height: 1;
		color: var(--color-maroon);
	}

	.spines_total dt {
		font-size: 0.68rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: #2c2c2c;
	}

	.is_publication {
		--spine-fill: linear-gradient(0deg, #ca8106, #fac549);
	}

	.is_presentation {
		--spine-fill: linear-gradient(180deg, #941518 0%, #3a0505 100%);
	}

	.spines_chart {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		align-items: flex-end;
		gap: 0.6rem;
	}

	/* Spines share the full chart width, with the faculty strip's gap. */
	.spine_column {
		flex: 1 1 0;
		min-width: 0;
		display: grid;
		grid-template-areas: 'total' 'spine' 'year';
		justify-items: stretch;
		text-align: center;
	}

	.spine_total {
		grid-area: total;
		margin-bottom: 0.45rem;
		font-family: var(--font-heading);
		font-size: clamp(1rem, 1.8vw, 1.5rem);
		font-weight: 800;
		line-height: 1;
		color: var(--color-maroon);
	}

	.spine {
		grid-area: spine;
		display: flex;
		flex-direction: column;
		height: calc(var(--spines-h) * var(--spine-share));
		border-radius: 16px;
		overflow: hidden;
		transform-origin: bottom center;
		box-shadow: 0 0 0 0 transparent;
		transition:
			transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
			box-shadow 0.35s ease;
	}

	.spine_segment {
		flex: 1 1 0;
		display: flex;
		justify-content: center;
		padding-top: 0.55rem;
		background: var(--spine-fill);
	}

	.spine_segment + .spine_segment {
		border-top: 2px solid #fdf6e9;
	}

	.spine_segment strong {
		font-family: var(--font-heading);
		font-size: clamp(0.8rem, 1.3vw, 1.1rem);
		font-weight: 800;
		line-height: 1;
	}

	.spine_segment.is_publication strong {
		color: var(--color-maroon-deep);
	}

	.spine_segment.is_presentation strong {
		color: var(--color-gold-bright);
	}

	.spine_year {
		grid-area: year;
		padding-top: 0.7rem;
		font-family: var(--font-heading);
		font-size: clamp(0.72rem, 1.1vw, 0.85rem);
		font-weight: 700;
		letter-spacing: 0.16em;
		color: var(--color-maroon);
	}

	@media (hover: hover) {
		.spine_column:hover .spine {
			transform: translateY(-6px);
			box-shadow: 0 0 0 2px #fac549;
		}
	}

	@media (max-width: 920px) {
		.research_spines {
			grid-template-columns: 1fr;
		}

		.spines_totals {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 760px) {
		.research_spines {
			--spines-h: 14rem;
			padding: 1.4rem 1rem 2.5rem;
		}

		.spines_title {
			font-size: 1.6rem;
		}

		.spines_chart {
			gap: 0.35rem;
		}

		.spine {
			border-radius: 10px;
		}

		.spines_total {
			display: grid;
			grid-template-columns: auto minmax(0, 1fr);
			column-gap: 0.6rem;
			row-gap: 0.3rem;
		}

		.spines_total::before {
			grid-row: span 2;
			height: 100%;
		}

		.spines_total dd,
		.spines_total dt {
			grid-column: 2;
		}

		.spines_total dd {
			font-size: 2rem;
		}

		.spine_year {
			letter-spacing: 0.02em;
		}
	}

	@media (forced-colors: active) {
		.spine_segment,
		.spines_total::before {
			forced-color-adjust: none;
			background: CanvasText;
			color: Canvas;
		}

		.spine_segment.is_publication,
		.spines_total.is_publication::before {
			background: Canvas;
			border: 1px solid CanvasText;
		}

		.spine_segment strong {
			color: inherit !important;
		}

		.spine_segment.is_publication strong {
			color: CanvasText !important;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.incentive_row :global(svg),
		.feature_figure::after,
		.feature_figure_value,
		.faculty_dot,
		.indexation_bar,
		.indexation_column,
		.indexation_value,
		.faculty_nav_button,
		.faculty_panel,
		.faculty_portrait,
		.faculty_portrait img,
		.faculty_portrait_gradient,
		.faculty_portrait_name,
		.faculty_portrait_count,
		.faculty_page,
		.spine {
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
			min-width: 100%;
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
			white-space: normal;
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
		.content_section {
			padding: 4rem 1.25rem 2.5rem;
		}

		.section_header {
			gap: 1rem;
			align-items: flex-start;
		}

		.section_header :global(.t_eyebrow) {
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

		.faculty_section {
			padding-top: 5rem;
			padding-bottom: 5rem;
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		.hero_bg {
			animation: hero-backdrop-in 1.2s ease-out;
		}
		.hero_content {
			animation: hero-title-in 1s cubic-bezier(0.16, 1, 0.3, 1);
		}

		.reveal_surface:global(.reveal-pending.is-revealed) {
			animation: research-surface-in 0.55s cubic-bezier(0.16, 1, 0.3, 1);
		}

		/* Headline and intro rise in together. */
		.feature_intro:global(.reveal-pending) > * {
			opacity: 0;
		}

		.feature_intro:global(.reveal-pending.is-revealed) > * {
			opacity: 1;
			animation: metric-in 0.7s cubic-bezier(0.22, 1, 0.36, 1) backwards;
		}

		.feature_intro:global(.reveal-pending.is-revealed) > :nth-child(2) {
			animation-delay: 0.12s;
		}

		/* Engaged dots fill in one by one, like a tally. */
		.feature_faculty:global(.reveal-pending:not(.is-revealed)) .faculty_dot.is_engaged {
			border-color: #e2cfa0;
			background: transparent;
		}

		.feature_faculty:global(.reveal-pending.is-revealed) .faculty_dot.is_engaged {
			animation: dot-fill 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
			animation-delay: calc(0.3s + var(--dot-index) * 70ms);
		}

		/* Figures settle in one after another; the year columns rise. */
		.feature_figures:global(.reveal-pending) .feature_figure {
			opacity: 0;
		}

		.feature_figures:global(.reveal-pending.is-revealed) .feature_figure {
			opacity: 1;
			animation: metric-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) backwards;
			animation-delay: calc(var(--figure-index) * 0.12s);
		}

		.indexation_bars:global(.reveal-pending) .indexation_column {
			transform: scaleY(0);
		}

		.indexation_bars:global(.reveal-pending.is-revealed) .indexation_column {
			transform: none;
			animation: spine-rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) backwards;
			animation-delay: calc(var(--bar-index) * 60ms);
		}

		/* Spines rise from the baseline one year after another. */
		.research_spines:global(.reveal-pending) .spine {
			transform: scaleY(0);
		}

		.research_spines:global(.reveal-pending.is-revealed) .spine {
			transform: none;
			animation: spine-rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) backwards;
			animation-delay: calc(var(--spine-index) * 70ms);
		}
	}

	@keyframes research-surface-in {
		from {
			opacity: 0.75;
			transform: translateY(8px);
		}
	}

	@keyframes dot-fill {
		from {
			transform: scale(0.4);
			border-color: #e2cfa0;
			background: transparent;
		}
	}

	@keyframes metric-in {
		from {
			opacity: 0;
			transform: translateY(12px);
		}
	}

	@keyframes spine-rise {
		from {
			transform: scaleY(0);
		}
	}
</style>
