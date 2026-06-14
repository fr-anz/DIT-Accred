<script lang="ts">
	import {
		Layers,
		Boxes,
		Network,
		BookOpen,
		TrendingUp,
		Users,
		ChevronDown,
		Download,
		BookMarked
	} from 'lucide-svelte';
	import Footer from '$lib/components/footer.svelte';

	type Pylon = { icon: typeof Layers; title: string; body: string };
	type Strategy = { title: string; detail: string };
	type Faculty = { name: string; role: string; photo: string; studies: number };
	type YearBar = { year: string; value: number };

	const pylons: Pylon[] = [
		{
			icon: Layers,
			title: 'Layered Administration',
			body: 'Dual oversight via OVPRED (macro resources & capacity building) and the Department of IT (discipline-specific paths).'
		},
		{
			icon: Boxes,
			title: 'Inclusive Output Value',
			body: 'Values both peer-reviewed publications and practice-oriented creative works, including deployable software and community solutions.'
		},
		{
			icon: Network,
			title: 'Domain Coverage',
			body: 'Tailors research paths directly into discipline-specific domains including information systems development, data analytics, cybersecurity, software engineering, and educational technology.'
		}
	];

	// NOTE: `detail` copy is placeholder — replace with the official accreditation text per strategy.
	const strategies: Strategy[] = [
		{
			title: 'High-Impact Research Incentivization',
			detail:
				'Structured incentives reward faculty whose outputs land in refereed, high-impact, and internationally indexed venues.'
		},
		{
			title: 'Undergraduate Competition Deployment',
			detail:
				'Capstone and research teams are deployed to local and international competitions to benchmark student capability.'
		},
		{
			title: 'Capstone Commercialization & Standardization',
			detail:
				'Mature capstone outputs are standardized and prepared for technology transfer and real-world deployment.'
		},
		{
			title: 'Joint Global Research Linkages',
			detail:
				'Collaborative agreements with partner institutions expand co-authorship and cross-border research mobility.'
		}
	];

	const distribution: YearBar[] = [
		{ year: '2018', value: 11 },
		{ year: '2019', value: 19 },
		{ year: '2022', value: 14 },
		{ year: '2023', value: 16 },
		{ year: '2024', value: 10 }
	];
	const chartMax = 21;

	// NOTE: faculty names/photos are placeholders sourced from the design — swap in the real directory.
	const facultyPhoto = '/research/faculty-placeholder.jpg';
	const faculty: Faculty[] = Array.from({ length: 9 }, (_, i) => ({
		name: 'Aguila, Fermin',
		role: 'Full Time Faculty',
		photo: facultyPhoto,
		studies: (i % 3) + 1
	}));

	let openStrategy = $state<number | null>(null);

	function toggleStrategy(index: number) {
		openStrategy = openStrategy === index ? null : index;
	}
</script>

<svelte:head>
	<title>Research | DIT-PUP</title>
	<meta
		name="description"
		content="Research at the DIT-PUP: development and policy framework, productivity metrics, faculty engagement, and the faculty research repository."
	/>
</svelte:head>

<div class="research_page">
	<!-- ─────────────────────────────────────────────
	  HERO
	───────────────────────────────────────────── -->
	<section class="hero_section">
		<div class="hero_seal" aria-hidden="true"></div>
		<div class="hero_content">
			<h1 class="hero_title">RESEARCH</h1>
		</div>
	</section>

	<!-- ─────────────────────────────────────────────
	  SECTION 1: RESEARCH DEVELOPMENT & POLICY FRAMEWORK
	───────────────────────────────────────────── -->
	<section class="content_section" id="policy">
		<div class="section_label">
			<BookOpen size={22} strokeWidth={1.75} class="section_icon" />
			<span>Research Development &amp; Policy Framework</span>
		</div>
		<hr class="section_divider" />

		<div class="pylon_grid">
			{#each pylons as pylon (pylon.title)}
				<article class="pylon_card">
					<div class="pylon_icon">
						<pylon.icon size={44} strokeWidth={1.5} />
					</div>
					<h3 class="pylon_title">{pylon.title}</h3>
					<p class="pylon_body">{pylon.body}</p>
				</article>
			{/each}
		</div>

		<div class="strategy_stack">
			{#each strategies as strategy, index (strategy.title)}
				<div class="strategy_item" class:open={openStrategy === index} style="--tier: {index}">
					<button
						class="strategy_header"
						type="button"
						aria-expanded={openStrategy === index}
						aria-controls={`strategy-panel-${index}`}
						onclick={() => toggleStrategy(index)}
					>
						<span class="strategy_title">{strategy.title}</span>
						<span class="strategy_chevron"><ChevronDown size={22} strokeWidth={2} /></span>
					</button>
					{#if openStrategy === index}
						<div class="strategy_panel" id={`strategy-panel-${index}`}>
							<p>{strategy.detail}</p>
						</div>
					{/if}
				</div>
			{/each}
		</div>

		<a class="manual_button" href="#policy">
			<Download size={26} strokeWidth={2} />
			<span>Access Full PUP Research &amp; Development Manual</span>
		</a>
	</section>

	<!-- ─────────────────────────────────────────────
	  SECTION 2: KEY PRODUCTIVITY METRICS & FACULTY ENGAGEMENT
	───────────────────────────────────────────── -->
	<section class="content_section" id="productivity">
		<div class="section_label">
			<TrendingUp size={22} strokeWidth={1.75} class="section_icon" />
			<span>Key Productivity Metrics &amp; Faculty Engagement</span>
		</div>
		<hr class="section_divider" />

		<div class="metrics_grid">
			<article class="metric_card metric_feature">
				<span class="metric_value">70</span>
				<span class="metric_label">Completed Research</span>
				<span class="metric_sub">Spanning 2018 to 2024 academic cycles</span>
			</article>
			<article class="metric_card">
				<span class="metric_value">46</span>
				<span class="metric_sub">Papers published in refereed and indexed platforms</span>
			</article>
			<article class="metric_card metric_dark">
				<span class="metric_value">89.13%</span>
				<span class="metric_sub">Of all published articles are indexed in premier global databases</span>
			</article>
		</div>

		<div class="distribution">
			<h3 class="distribution_title">Annual Distribution of Completed Research</h3>
			<p class="distribution_desc">
				Dissemination tracking underscores the strong peer verification of the department's scientific
				outputs, with a clear post-pandemic growth trajectory driven by targeted faculty mentoring.
			</p>

			<div class="chart">
				<div class="chart_bars" role="img" aria-label="Studies completed per year from 2018 to 2024">
					{#each distribution as bar (bar.year)}
						<div class="chart_col">
							<div class="chart_track">
								<div
									class="chart_bar"
									style="height: {(bar.value / chartMax) * 100}%"
								>
									<span class="chart_count">{bar.value}</span>
								</div>
							</div>
							<span class="chart_year">{bar.year}</span>
						</div>
					{/each}
				</div>
				<span class="chart_axis">Studies per Year</span>
			</div>
		</div>
	</section>

	<!-- ─────────────────────────────────────────────
	  SECTION 3: FACULTY RESEARCHER & RESEARCH REPOSITORY
	───────────────────────────────────────────── -->
	<section class="content_section" id="research-repository">
		<div class="section_label">
			<Users size={22} strokeWidth={1.75} class="section_icon" />
			<span>Faculty Researcher &amp; Research Repository</span>
		</div>
		<hr class="section_divider" />

		<div class="faculty_wrap">
			<div class="faculty_grid">
				{#each faculty as person, index (index)}
					<article class="faculty_card">
						<img class="faculty_photo" src={person.photo} alt={person.name} loading="lazy" />
						<div class="faculty_badge">
							<span class="faculty_badge_label">Published<br />Studies</span>
							<span class="faculty_badge_count">{person.studies}</span>
						</div>
						<div class="faculty_overlay">
							<span class="faculty_name">{person.name}</span>
							<span class="faculty_role">{person.role}</span>
						</div>
					</article>
				{/each}

				<article class="faculty_card faculty_seal_card">
					<img class="faculty_seal" src="/research/dit-seal.png" alt="Department of Information Technology seal" loading="lazy" />
					<span class="faculty_seal_caption"><BookMarked size={18} strokeWidth={1.75} /> DIT Research Repository</span>
				</article>
			</div>
		</div>
	</section>

	<Footer />
</div>

<style>
	.research_page {
		--color-maroon: #941518;
		--color-maroon-deep: #6e181a;
		--color-gold: #cfa83a;
		--color-gold-bright: #fac549;
		--color-gold-deep: #ca8106;
		--font-body: 'Inter', sans-serif;
		--font-heading: 'Overpass', sans-serif;
		--page-pad: clamp(1.5rem, 8vw, 10rem);
		background: #ffffff;
	}

	/* ── HERO ── */
	.hero_section {
		position: relative;
		height: 100dvh;
		min-height: 560px;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		background:
			radial-gradient(120% 90% at 50% 0%, #fff6f6 0%, #ffffff 45%, #faf2e5 100%);
	}

	.hero_seal {
		position: absolute;
		inset: 0;
		background-image: url('/research/dit-seal.png');
		background-repeat: no-repeat;
		background-position: center 42%;
		background-size: min(70vh, 720px);
		opacity: 0.06;
		filter: grayscale(0.1);
		animation: sealFade 1.4s ease-out forwards;
	}

	.hero_content {
		position: relative;
		z-index: 1;
		text-align: center;
		padding: 2rem;
		animation: heroFadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}

	.hero_title {
		font-family: 'Montserrat', var(--font-heading);
		font-size: clamp(3.5rem, 14vw, 11rem);
		font-weight: 900;
		line-height: 1;
		letter-spacing: 0.02em;
		margin: 0;
		background: linear-gradient(90deg, #000000 0%, #8e1518 100%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		color: transparent;
	}

	@keyframes sealFade {
		from {
			opacity: 0;
			transform: scale(1.05);
		}
		to {
			opacity: 0.06;
			transform: scale(1);
		}
	}

	@keyframes heroFadeIn {
		from {
			opacity: 0;
			transform: translateY(24px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* ── SHARED SECTION ── */
	.content_section {
		width: 100%;
		box-sizing: border-box;
		padding: 3.5rem var(--page-pad) 4.5rem;
	}

	.section_label {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		font-family: var(--font-body);
		font-size: clamp(1rem, 1.6vw, 1.4rem);
		font-weight: 700;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: var(--color-maroon);
		margin: 0 0 0.85rem;
		line-height: 1.3;
	}

	:global(.research_page .section_icon) {
		color: var(--color-maroon);
		flex-shrink: 0;
	}

	.section_divider {
		border: none;
		border-top: 1.5px solid rgba(0, 0, 0, 0.1);
		margin: 0.5rem 0 3rem;
	}

	/* ── PYLON CARDS ── */
	.pylon_grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
		margin-bottom: 3.5rem;
	}

	@media (max-width: 860px) {
		.pylon_grid {
			grid-template-columns: 1fr;
			gap: 1.5rem;
		}
	}

	.pylon_card {
		background: #ffffff;
		border: 4px solid var(--color-gold);
		border-radius: 25px;
		padding: 3rem 2rem;
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.25rem;
		transition:
			transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
			box-shadow 0.3s ease;
	}

	.pylon_card:hover {
		transform: translateY(-6px);
		box-shadow: 0 16px 36px rgba(207, 168, 58, 0.22);
	}

	.pylon_icon {
		color: var(--color-maroon);
	}

	.pylon_title {
		font-family: var(--font-body);
		font-size: 1.35rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-maroon);
		margin: 0;
	}

	.pylon_body {
		font-family: var(--font-body);
		font-size: 1rem;
		line-height: 1.6;
		color: #2c2c2c;
		margin: 0;
	}

	/* ── STRATEGY PYRAMID / ACCORDIONS ── */
	.strategy_stack {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.85rem;
		margin-bottom: 2.75rem;
	}

	.strategy_item {
		width: calc(76% + var(--tier) * 8%);
		max-width: 100%;
		background: #ffffff;
		border: 4px solid var(--color-gold);
		border-radius: 25px;
		overflow: hidden;
		transition: border-color 0.25s ease;
	}

	@media (max-width: 860px) {
		.strategy_item {
			width: 100%;
		}
	}

	.strategy_item.open {
		border-color: var(--color-gold-deep);
	}

	.strategy_header {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		position: relative;
		background: transparent;
		border: none;
		cursor: pointer;
		padding: 1.5rem 4rem;
		font-family: var(--font-body);
		font-size: clamp(0.85rem, 1.4vw, 1.05rem);
		font-weight: 700;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--color-maroon);
		text-align: center;
	}

	.strategy_chevron {
		position: absolute;
		right: 1.5rem;
		display: inline-flex;
		color: var(--color-gold-deep);
		transition: transform 0.25s ease;
	}

	.strategy_item.open .strategy_chevron {
		transform: rotate(180deg);
	}

	.strategy_header:focus-visible {
		outline: 2px solid var(--color-gold-deep);
		outline-offset: -6px;
		border-radius: 20px;
	}

	.strategy_panel {
		padding: 0 2.5rem 1.75rem;
	}

	.strategy_panel p {
		margin: 0;
		font-family: var(--font-body);
		font-size: 0.98rem;
		line-height: 1.65;
		color: #444;
		text-align: center;
	}

	/* ── MANUAL DOWNLOAD BUTTON ── */
	.manual_button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		width: min(879px, 100%);
		margin: 0 auto;
		padding: 1.4rem 2.5rem;
		border: 4px solid var(--color-gold-bright);
		border-radius: 20px;
		background: linear-gradient(90deg, var(--color-gold-bright) 0%, var(--color-gold-deep) 100%);
		color: #ffffff;
		font-family: var(--font-body);
		font-size: clamp(1rem, 1.6vw, 1.3rem);
		font-weight: 600;
		text-align: center;
		text-decoration: none;
		box-shadow: 0 10px 28px rgba(202, 129, 6, 0.25);
		transition:
			transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
			box-shadow 0.3s ease;
	}

	.manual_button:hover {
		transform: translateY(-4px);
		box-shadow: 0 16px 36px rgba(202, 129, 6, 0.38);
	}

	/* ── METRICS ── */
	.metrics_grid {
		display: grid;
		grid-template-columns: 1.3fr 1fr 1fr;
		gap: 1.5rem;
		margin-bottom: 3.5rem;
	}

	@media (max-width: 860px) {
		.metrics_grid {
			grid-template-columns: 1fr;
		}
	}

	.metric_card {
		border-radius: 20px;
		border: 4px solid var(--color-gold);
		background: #ffffff;
		padding: 2.25rem 2rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		transition:
			transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
			box-shadow 0.3s ease;
	}

	.metric_card:hover {
		transform: translateY(-5px);
		box-shadow: 0 14px 30px rgba(0, 0, 0, 0.08);
	}

	.metric_feature {
		background: linear-gradient(135deg, var(--color-gold-bright) 0%, var(--color-gold-deep) 100%);
		border-color: var(--color-gold-bright);
		color: #1a1a1a;
		justify-content: center;
	}

	.metric_dark {
		background: linear-gradient(148deg, var(--color-maroon) 2%, #000000 100%);
		border-color: var(--color-maroon);
		color: #ffffff;
	}

	.metric_value {
		font-family: var(--font-heading);
		font-size: clamp(2.75rem, 5vw, 4rem);
		font-weight: 900;
		line-height: 1;
		color: var(--color-maroon);
	}

	.metric_feature .metric_value {
		color: #1a1a1a;
	}

	.metric_dark .metric_value {
		color: var(--color-gold-bright);
	}

	.metric_label {
		font-family: var(--font-heading);
		font-size: 1.25rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	.metric_sub {
		font-family: var(--font-body);
		font-size: 0.95rem;
		line-height: 1.55;
		opacity: 0.92;
	}

	/* ── DISTRIBUTION / CHART ── */
	.distribution_title {
		font-family: var(--font-heading);
		font-size: clamp(1.3rem, 2.4vw, 2rem);
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.06em;
		text-align: center;
		color: #000000;
		margin: 0 0 1rem;
	}

	.distribution_desc {
		font-family: var(--font-body);
		font-size: 1.05rem;
		line-height: 1.7;
		color: #2c2c2c;
		max-width: 900px;
		margin: 0 auto 2.5rem;
		text-align: center;
	}

	.chart {
		border: 1.5px solid rgba(0, 0, 0, 0.12);
		border-radius: 16px;
		padding: 2rem 1.5rem 1.25rem;
		background: #ffffff;
	}

	.chart_bars {
		display: flex;
		align-items: flex-end;
		justify-content: center;
		gap: clamp(1rem, 6vw, 5rem);
		height: 320px;
	}

	.chart_col {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.65rem;
		height: 100%;
		justify-content: flex-end;
		flex: 0 1 90px;
	}

	.chart_track {
		width: 100%;
		max-width: 70px;
		height: 100%;
		display: flex;
		align-items: flex-end;
	}

	.chart_bar {
		width: 100%;
		border-radius: 6px 6px 0 0;
		background: linear-gradient(180deg, var(--color-maroon) 0%, #5c0f16 100%);
		position: relative;
		min-height: 8px;
		transition: height 0.6s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.chart_count {
		position: absolute;
		top: -1.6rem;
		left: 50%;
		transform: translateX(-50%);
		font-family: var(--font-body);
		font-size: 0.9rem;
		font-weight: 700;
		color: var(--color-maroon);
	}

	.chart_year {
		font-family: var(--font-body);
		font-size: 0.9rem;
		color: #54555a;
	}

	.chart_axis {
		display: block;
		text-align: center;
		margin-top: 1rem;
		font-family: var(--font-body);
		font-size: 0.85rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #54555a;
	}

	/* ── FACULTY REPOSITORY ── */
	.faculty_wrap {
		background: linear-gradient(135deg, var(--color-gold-bright) 0%, var(--color-gold-deep) 100%);
		border-radius: 28px;
		padding: clamp(1.5rem, 3vw, 2.75rem);
	}

	.faculty_grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1.5rem;
	}

	@media (max-width: 1100px) {
		.faculty_grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (max-width: 760px) {
		.faculty_grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 460px) {
		.faculty_grid {
			grid-template-columns: 1fr;
		}
	}

	.faculty_card {
		position: relative;
		aspect-ratio: 345 / 478;
		border-radius: 25px;
		overflow: hidden;
		border: 4px solid #ffffff;
		background: linear-gradient(148deg, var(--color-maroon) 2%, #000000 100%);
		transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.faculty_card:hover {
		transform: translateY(-5px);
	}

	.faculty_photo {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center top;
	}

	.faculty_overlay {
		position: absolute;
		inset: auto 0 0 0;
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		padding: 1.5rem 1.25rem 1.25rem;
		background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.85) 92%);
	}

	.faculty_name {
		font-family: var(--font-heading);
		font-size: 1.5rem;
		font-weight: 700;
		letter-spacing: 0.03em;
		color: #ffffff;
	}

	.faculty_role {
		font-family: var(--font-body);
		font-size: 1rem;
		font-style: italic;
		font-weight: 500;
		color: var(--color-gold-bright);
	}

	.faculty_badge {
		position: absolute;
		top: 1.1rem;
		right: 1.1rem;
		width: 72px;
		height: 76px;
		border: 1px solid var(--color-gold-bright);
		border-radius: 10px;
		background: linear-gradient(107deg, #ffddde 0%, #ffffff 50%, #ffe9b6 100%);
		box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.1rem;
		text-align: center;
	}

	.faculty_badge_label {
		font-family: var(--font-heading);
		font-size: 0.6rem;
		font-weight: 600;
		letter-spacing: 0.05em;
		color: #000000;
		line-height: 1.05;
	}

	.faculty_badge_count {
		font-family: var(--font-heading);
		font-size: 1.6rem;
		font-weight: 800;
		line-height: 1;
		color: var(--color-maroon);
	}

	.faculty_seal_card {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		background: linear-gradient(148deg, #5c0f16 0%, #000000 100%);
		padding: 1.5rem;
	}

	.faculty_seal {
		width: 62%;
		max-width: 180px;
		height: auto;
		object-fit: contain;
	}

	.faculty_seal_caption {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--font-body);
		font-size: 0.85rem;
		font-weight: 600;
		letter-spacing: 0.05em;
		color: var(--color-gold-bright);
		text-align: center;
	}
</style>
