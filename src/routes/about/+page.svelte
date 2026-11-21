<script>
	import { BadgeCheck, Info, LayoutDashboard, Users } from '@lucide/svelte';
	import Footer from '#lib/components/footer.svelte';
	import QualityControlDiagram from '#lib/components/home/QualityControlDiagram.svelte';
	import {
		campusPhotos,
		certifications,
		chairpersons,
		milestones,
		programObjectives,
		quickFacts,
		strategicGoals
	} from '#lib/data/about.ts';
	import '#lib/styles/accreditation-pages.css';
	import '#lib/styles/assigned-page-motion.css';

	/** @param {number} i */
	const pad = (i) => String(i + 1).padStart(2, '0');
</script>

<svelte:head>
	<title>About the Department | DIT-PUP</title>
	<meta
		name="description"
		content="Learn about the PUP Department of Information Technology: the BSIT program, mission and vision, strategic goals, quick facts, history, and program objectives."
	/>
</svelte:head>

<!-- Geometry and type sampled from Figma frame 1287:1064. -->
<main class="assigned_page about_page">
	<section class="hero_section">
		<div class="checkerboard_bg" aria-hidden="true"></div>
		<div class="hero_content">
			<p class="t_eyebrow hero_eyebrow">About the</p>
			<h1 class="t_display hero_title">Department</h1>
			<p class="hero_lead">
				Bridging academic excellence and real-world IT innovation. Explore our department’s core
				faculty, research initiatives, and the corporate insights driving our accredited curriculum
				forward.
			</p>
		</div>
	</section>

	<p class="t_eyebrow tagline">Innovation • Excellence • Future Ready</p>
	<div class="campus_strip" aria-hidden="true">
		{#each campusPhotos as src (src)}
			<div class="campus_photo"><img {src} alt="" loading="lazy" /></div>
		{/each}
	</div>

	<section class="about_section program_section" aria-labelledby="bsit-title">
		<div class="bsit_card">
			<img class="bsit_pylon" src="/about/pup-fade.webp" alt="" aria-hidden="true" />
			<div class="bsit_text">
				<h2 class="bsit_title" id="bsit-title">BSIT</h2>
				<p class="bsit_subtitle">Bachelor of Science in Information Technology</p>
				<p class="bsit_body">
					The <strong>Bachelor of Science in Information Technology</strong> program provides an engaging
					environment for learners passionate about building modern digital solutions. The program allows
					creative and critical thinkers to transform complex technological concepts into practical, in-demand
					skillsets. Learners are trained in software development, network architecture, and data management,
					with a sharp focus on engineering innovative solutions to real-world problems.
				</p>
			</div>
		</div>

		<div class="statement_grid">
			<article class="statement_card mission_card">
				<h2 class="statement_title">Mission</h2>
				<p>
					The <strong>Department of Information Technology</strong> is committed to providing exceptional
					ICT education, conducting groundbreaking research, and driving innovation within the University,
					establishing ourselves as a recognized leader in the field
				</p>
			</article>
			<article class="statement_card vision_card">
				<h2 class="statement_title">Vision</h2>
				<p>
					A leading academic department, recognized for its exceptional
					<strong>ICT education, research, and innovation</strong>.
				</p>
			</article>
		</div>
	</section>

	<section class="about_section" id="strategic-goals" aria-labelledby="goals-title">
		<div class="section_label">
			<Info size={42} strokeWidth={1.75} class="section_icon" />
			<h2 class="t_eyebrow" id="goals-title">DIT Strategic Goals</h2>
		</div>
		<hr class="section_divider" />

		<ol class="goals_grid">
			{#each strategicGoals as goal, i (goal.title)}
				<li class="goal_card">
					<span class="goal_number">{pad(i)}</span>
					<h3 class="goal_title">{goal.title}</h3>
					<p class="goal_desc">{goal.description}</p>
				</li>
			{/each}
		</ol>
	</section>

	<section class="facts_section" id="quick-facts" aria-labelledby="facts-title">
		<header class="facts_header">
			<div class="section_label">
				<LayoutDashboard size={47} strokeWidth={1.75} class="section_icon facts_icon" />
				<h2 class="t_eyebrow" id="facts-title">Quick Facts Dashboard</h2>
			</div>
			<span class="facts_pill">Operational Metrics</span>
		</header>

		<div class="facts_body">
			<ul class="facts_grid">
				{#each quickFacts as fact (fact.image)}
					<li class="fact_card" style="background-image: url({fact.image})">
						<span class="fact_label">{fact.label}</span>
						<p class="fact_value">
							{fact.value}{#if fact.unit}<span class="fact_unit">{fact.unit}</span>{/if}
						</p>
						<p class="fact_desc">{fact.description}</p>
					</li>
				{/each}
			</ul>

			<div class="qa_band">
				<div class="qa_text">
					<p class="qa_kicker">Standardization</p>
					<h3 class="qa_title">Quality Assurance &amp; Operational Control</h3>
					<p class="qa_body">
						We maintain rigorous adherence to ISO 9001:2015 and AACCUP Level IV standards to ensure
						the highest quality of ICT education and administrative services.
					</p>
				</div>
				<div class="qa_visual">
					<QualityControlDiagram />
				</div>
			</div>
		</div>

		<ul class="cert_list">
			{#each certifications as cert (cert)}
				<li class="cert_item">
					<BadgeCheck size={45} strokeWidth={1.5} aria-hidden="true" />
					<span>{cert}</span>
				</li>
			{/each}
		</ul>
	</section>

	<section class="about_section legacy_section" aria-labelledby="legacy-title">
		<h2 class="legacy_heading" id="legacy-title">Legacy of Innovation</h2>
		<p class="archive_credit">Photographs from across the department’s history</p>

		<ol class="timeline">
			{#each milestones as milestone, i (milestone.year)}
				<li class="milestone" class:milestone_flip={i % 2 === 1}>
					<div class="milestone_text">
						<p class="milestone_year">{milestone.year}</p>
						<h3 class="milestone_title">{milestone.title}</h3>
						<p class="milestone_desc">{milestone.description}</p>
					</div>
					<span class="milestone_dot" aria-hidden="true"></span>
					<div class="milestone_frame">
						<img
							src={milestone.photo.src}
							alt={milestone.photo.alt}
							loading="lazy"
							decoding="async"
						/>
					</div>
				</li>
			{/each}
		</ol>

		<p class="legacy_heading legacy_closing">Excellence Will Continue</p>
	</section>

	<section class="about_section chairpersons_section" aria-labelledby="chairpersons-title">
		<div class="section_label">
			<Users size={42} strokeWidth={1.75} class="section_icon" aria-hidden="true" />
			<h2 class="t_eyebrow" id="chairpersons-title">CCIS-DIT Chairpersons</h2>
		</div>
		<hr class="section_divider" />
		<ul class="chairpersons_gallery">
			{#each chairpersons as chair (chair.src)}
				<li class="chairperson">
					<figure class="chairperson_frame">
						<img src={chair.src} alt="" loading="lazy" decoding="async" />
						<figcaption>{chair.name}</figcaption>
					</figure>
				</li>
			{/each}
		</ul>
	</section>

	<section class="about_section objectives_section" aria-labelledby="objectives-title">
		<div class="section_label">
			<Info size={42} strokeWidth={1.75} class="section_icon" />
			<h2 class="t_eyebrow" id="objectives-title">Program Objectives</h2>
		</div>
		<hr class="section_divider" />

		<ol class="objectives_grid">
			{#each programObjectives as objective (objective.title)}
				<li class="objective_card">
					<img class="objective_photo" src={objective.image} alt="" loading="lazy" />
					<div class="objective_text">
						<h3 class="objective_title">{objective.title}</h3>
						<p class="objective_desc">{objective.description}</p>
					</div>
				</li>
			{/each}
		</ol>
	</section>
</main>

<Footer />

<style>
	.about_page {
		--about-gutter: clamp(20px, 7.448vw, 143px);
		--grad-maroon: linear-gradient(141.79deg, #921518 1.43%, #6d1719 96.86%);
	}
	.about_page :where(ol, ul) {
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.about_page :where(h2, h3, p) {
		margin: 0;
	}

	/* Hero: left-aligned title block on the shared page texture. */
	.about_page .hero_section {
		place-items: center start;
		height: auto;
		min-height: min(100dvh, 55.05vw);
	}
	.about_page .hero_content {
		width: auto;
		padding: clamp(110px, 10vw, 160px) var(--about-gutter) clamp(48px, 5vw, 96px)
			clamp(20px, 10.156vw, 195px);
		text-align: left;
	}
	.hero_eyebrow {
		margin-bottom: clamp(8px, 1vw, 20px);
	}
	.hero_title {
		color: var(--c-maroon-deep);
		background-image: linear-gradient(129deg, #000 8.9%, #901518 89%);
	}
	.hero_lead {
		max-width: 684px;
		margin-top: clamp(20px, 2.4vw, 46px);
		color: #000;
		font: 400 clamp(17px, 1.667vw, 32px) / 1.21 var(--font-body);
	}

	/* Tagline + photo strip */
	.tagline {
		padding: clamp(40px, 5vw, 96px) var(--about-gutter) clamp(36px, 4.2vw, 80px);
		font-size: clamp(14px, 2.083vw, 40px);
		font-weight: 600;
		text-align: center;
	}
	.campus_strip {
		display: grid;
		grid-template-columns: repeat(5, minmax(0, 1fr));
		height: clamp(110px, 16.354vw, 314px);
		overflow: hidden;
		background: #000;
	}
	.campus_photo {
		min-width: 0;
		background: rgb(0 0 0 / 0.8);
	}
	.campus_photo img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		opacity: 0.6;
	}

	/* Shared section shell */
	.about_section {
		max-width: 1920px;
		margin: 0 auto;
		padding: clamp(40px, 4.3vw, 82px) var(--about-gutter);
	}
	.about_page .section_label {
		gap: clamp(14px, 2.03vw, 39px);
	}
	.about_page :global(.section_icon) {
		width: clamp(24px, 2.19vw, 42px);
		height: clamp(24px, 2.19vw, 42px);
		color: var(--c-maroon);
	}
	.about_page .section_divider {
		margin-bottom: clamp(32px, 4.74vw, 91px);
	}

	/* BSIT program card */
	.program_section {
		padding-top: clamp(48px, 5.47vw, 105px);
	}
	.bsit_card {
		position: relative;
		overflow: hidden;
		min-height: clamp(360px, 33.125vw, 636px);
		border-radius: clamp(20px, 1.823vw, 35px);
		background: var(--grad-maroon);
	}
	.bsit_pylon {
		position: absolute;
		top: -65%;
		right: -27%;
		width: 64.3%;
		max-width: none;
		mix-blend-mode: overlay;
		pointer-events: none;
	}
	.bsit_text {
		position: relative;
		max-width: 1018px;
		padding: clamp(28px, 2.66vw, 51px) clamp(24px, 3.96vw, 76px) clamp(32px, 3.6vw, 70px);
		color: #fff;
	}
	.bsit_title {
		font: 700 clamp(72px, 9.375vw, 180px) / 1.1 var(--font-heading);
		letter-spacing: 0.06em;
		color: #fff;
	}
	.bsit_subtitle {
		margin-top: clamp(-36px, -1.5vw, -8px);
		color: var(--c-gold);
		font: italic 600 clamp(18px, 2.083vw, 40px) / 1.25 var(--font-heading);
		letter-spacing: 0.03em;
	}
	.bsit_body {
		max-width: 948px;
		margin-top: clamp(16px, 1.3vw, 25px);
		font: 400 clamp(15px, 1.458vw, 28px) / 1.22 var(--font-body);
	}
	.bsit_body strong,
	.statement_card strong {
		font-weight: 700;
	}

	/* Mission & Vision */
	.statement_grid {
		display: grid;
		grid-template-columns: 817fr 767fr;
		gap: clamp(20px, 2.6vw, 50px);
		margin-top: clamp(20px, 2.6vw, 50px);
	}
	.statement_card {
		min-height: clamp(220px, 18.96vw, 364px);
		padding: clamp(28px, 2.92vw, 56px) clamp(24px, 4.06vw, 78px);
		font: 400 clamp(15px, 1.25vw, 24px) / 1.21 var(--font-body);
	}
	.mission_card {
		border-radius: 25px;
		color: #fff;
		background: linear-gradient(148.86deg, #941518 18.3%, #000 49.65%, #875f23 117.6%);
	}
	.vision_card {
		border-radius: 15px;
		color: #000;
		background: var(--grad-gold);
	}
	.statement_title {
		margin-bottom: clamp(16px, 1.5vw, 30px);
		font: 700 clamp(36px, 3.333vw, 64px) / 1 var(--font-heading);
		text-transform: uppercase;
	}
	.mission_card .statement_title {
		color: var(--c-gold-light);
	}
	.vision_card .statement_title {
		color: var(--c-maroon);
	}

	/* Strategic goals */
	.goals_grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: clamp(20px, 2.34vw, 45px);
	}
	.goal_card {
		min-height: clamp(200px, 15.43vw, 296px);
		padding: clamp(24px, 2.08vw, 40px) clamp(22px, 2.34vw, 45px);
		border: 1px solid var(--c-maroon);
		border-radius: 15px;
		background: #fff;
		box-shadow:
			-4px 4px 4px rgb(109 23 25 / 0.5),
			4px 4px 4px rgb(207 168 58 / 0.5),
			inset -4px 4px 4px rgb(148 21 24 / 0.5);
	}
	.goal_number {
		display: block;
		color: var(--c-gold-light);
		font: 500 clamp(32px, 2.5vw, 48px) / 1.2 var(--font-heading);
	}
	.goal_title {
		margin-top: clamp(22px, 2.03vw, 39px);
		color: #000;
		font: 700 clamp(17px, 1.25vw, 24px) / 1.21 var(--font-body);
	}
	.goal_desc {
		max-width: 430px;
		margin-top: clamp(12px, 0.9vw, 17px);
		color: #000;
		font: 400 clamp(15px, 1.042vw, 20px) / 1.21 var(--font-body);
	}

	/* Quick facts dashboard */
	.facts_section {
		margin-top: clamp(32px, 4.74vw, 91px);
		color: #fff;
		background: linear-gradient(133.36deg, #451516 1.29%, #1a1614 59.26%, #392e1f 92.43%);
	}
	.facts_header {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
		max-width: 1920px;
		min-height: clamp(110px, 9.27vw, 178px);
		margin: 0 auto;
		padding: 20px clamp(20px, 7.03vw, 135px) 20px clamp(20px, 6.77vw, 130px);
	}
	.facts_header .section_label {
		margin: 0;
	}
	.facts_section :global(.facts_icon) {
		width: clamp(26px, 2.45vw, 47px);
		height: clamp(26px, 2.45vw, 47px);
		color: var(--c-gold-light);
	}
	.facts_pill {
		display: inline-flex;
		align-items: center;
		min-height: clamp(44px, 3.65vw, 70px);
		padding: 10px clamp(20px, 2.34vw, 45px);
		border-radius: 10px;
		background: #ffe9b6;
		color: var(--c-gold-dark);
		font: 600 clamp(13px, 1.25vw, 24px) / 1.2 var(--font-body);
		letter-spacing: var(--track-eyebrow);
		text-transform: uppercase;
	}
	.facts_body {
		padding-top: clamp(40px, 5.36vw, 103px);
		background: linear-gradient(
			109.82deg,
			#ffddde 4.03%,
			#fff0f0 22.33%,
			#fff 51.39%,
			#faf2e5 75.5%,
			#edd3a6 96.25%
		);
	}
	.facts_grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: clamp(20px, 2.34vw, 45px);
		max-width: 1920px;
		margin: 0 auto;
		padding: 0 clamp(20px, 7.03vw, 135px) 0 clamp(20px, 6.77vw, 130px);
	}
	.fact_card {
		display: flex;
		flex-direction: column;
		aspect-ratio: 521 / 316;
		padding: clamp(18px, 2.14vw, 41px) clamp(18px, 2.14vw, 41px) clamp(16px, 2.14vw, 41px);
		border-radius: 15px;
		background: center / cover no-repeat;
		overflow: hidden;
	}
	.fact_label {
		padding-left: 6px;
		font: 400 clamp(12px, 1.146vw, 22px) / 1.2 var(--font-body);
		letter-spacing: var(--track-eyebrow);
		text-transform: uppercase;
	}
	.fact_value {
		display: flex;
		align-items: baseline;
		gap: 0.15em;
		margin-top: auto;
		color: var(--c-gold-light);
		font: 700 clamp(40px, 5vw, 96px) / 1 var(--font-body);
		letter-spacing: 0.04em;
	}
	.fact_unit {
		font-size: 0.75em;
	}
	.fact_desc {
		min-height: 2.4em;
		margin-top: clamp(14px, 2.4vw, 46px);
		font: 400 clamp(13px, 1.146vw, 22px) / 1.2 var(--font-body);
	}

	.qa_band {
		display: grid;
		grid-template-columns: 1051fr 869fr;
		margin-top: clamp(48px, 6.15vw, 118px);
		background: linear-gradient(142.35deg, #921518 1.46%, #801619 22%, #6d1719 42.55%);
	}
	.qa_text {
		padding: clamp(40px, 5.42vw, 104px) clamp(24px, 4vw, 80px) clamp(40px, 4vw, 80px)
			clamp(20px, 7.08vw, 136px);
	}
	.qa_kicker {
		font: 700 clamp(15px, 1.458vw, 28px) / 1.2 var(--font-heading);
		text-transform: uppercase;
	}
	.qa_title {
		max-width: 699px;
		margin-top: clamp(28px, 3.9vw, 75px);
		color: var(--c-gold-dark);
		font: 700 clamp(30px, 3.333vw, 64px) / 1.2 var(--font-body);
		letter-spacing: 0.04em;
	}
	.qa_title,
	.legacy_heading,
	.milestone_title {
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.qa_title {
		background-image: var(--grad-gold);
	}
	.qa_body {
		max-width: 786px;
		margin-top: clamp(28px, 4vw, 77px);
		font: 400 clamp(16px, 1.667vw, 32px) / 1.25 var(--font-body);
	}
	.qa_visual {
		display: grid;
		place-items: center;
		padding: clamp(24px, 2.6vw, 50px);
		background: var(--grad-gold);
	}

	.cert_list {
		display: flex;
		flex-wrap: wrap;
		gap: clamp(20px, 2.6vw, 50px);
		max-width: 1920px;
		margin: 0 auto;
		padding: clamp(24px, 2.14vw, 41px) var(--about-gutter) clamp(24px, 2.6vw, 50px)
			clamp(20px, 6.77vw, 130px);
	}
	.cert_item {
		display: flex;
		align-items: center;
		gap: clamp(16px, 2.45vw, 49px);
		font: 700 clamp(14px, 1.146vw, 22px) / 1.2 var(--font-body);
		text-transform: uppercase;
	}
	.cert_item :global(svg) {
		width: clamp(28px, 2.34vw, 45px);
		height: clamp(28px, 2.34vw, 45px);
	}

	/* Legacy timeline */
	.legacy_section {
		padding-top: clamp(48px, 5.16vw, 99px);
		padding-bottom: clamp(56px, 9.9vw, 190px);
	}
	.legacy_heading {
		color: var(--c-maroon-deep);
		background-image: linear-gradient(90deg, #000, #911518);
		font: 800 clamp(36px, 6.25vw, 120px) / 1.17 var(--font-heading);
		text-align: center;
		text-transform: uppercase;
		width: fit-content;
		margin-inline: auto;
	}
	.legacy_closing {
		font-size: clamp(30px, 5vw, 96px);
	}
	.archive_credit {
		margin-top: 0.75rem;
		color: var(--c-maroon-deep);
		font-size: clamp(0.875rem, 1.2vw, 1rem);
		text-align: center;
	}
	.timeline {
		--spine: 50px;
		--col-gap: clamp(24px, 3.65vw, 70px);
		position: relative;
		display: grid;
		gap: clamp(40px, 4.5vw, 86px);
		max-width: 1323px;
		margin: clamp(40px, 5.2vw, 100px) auto clamp(80px, 8.1vw, 156px);
		padding-bottom: calc(var(--spine) + clamp(24px, 2vw, 40px));
	}
	.timeline::before,
	.timeline::after {
		content: '';
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}
	.timeline::before {
		top: calc(var(--spine) / 2);
		bottom: calc(var(--spine) / 2);
		width: 3px;
		background: #000;
	}
	.timeline::after {
		bottom: 0;
		width: var(--spine);
		height: var(--spine);
		border-radius: 50%;
		background: linear-gradient(90deg, var(--c-gold-light), var(--c-gold-dark));
	}
	.milestone {
		position: relative;
		display: grid;
		grid-template-columns: 1fr var(--spine) 1fr;
		column-gap: var(--col-gap);
		align-items: start;
	}
	.milestone_text {
		grid-column: 1;
		grid-row: 1;
		text-align: right;
	}
	.milestone_dot {
		grid-column: 2;
		grid-row: 1;
		position: relative;
		width: var(--spine);
		aspect-ratio: 1;
		margin-top: clamp(4px, 0.4vw, 8px);
		border-radius: 50%;
		background: linear-gradient(90deg, var(--c-gold-light), var(--c-gold-dark));
	}
	.milestone_flip .milestone_text {
		grid-column: 3;
		text-align: left;
	}
	.milestone_frame {
		grid-column: 3;
		grid-row: 1;
		min-width: 0;
		aspect-ratio: 568 / 328;
		overflow: hidden;
		border: clamp(3px, 0.3vw, 5px) solid transparent;
		border-radius: 10px;
		background:
			linear-gradient(var(--c-shell), var(--c-shell)) padding-box,
			linear-gradient(180deg, var(--c-maroon), var(--c-ink) 55%, var(--c-gold-dark)) border-box;
	}
	.milestone_flip .milestone_frame {
		grid-column: 1;
	}
	.milestone_frame img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.milestone_year {
		color: var(--c-gold-light);
		font: 700 clamp(36px, 3.75vw, 72px) / 1.1 var(--font-heading);
	}
	.milestone_title {
		margin-top: clamp(10px, 1.2vw, 24px);
		color: var(--c-maroon);
		background-image: linear-gradient(90deg, #941518, #791618);
		font: 700 clamp(20px, 1.875vw, 36px) / 1.2 var(--font-body);
	}
	.milestone_desc {
		margin-top: clamp(14px, 1.5vw, 29px);
		color: #000;
		font: 400 clamp(15px, 1.25vw, 24px) / 1.21 var(--font-body);
		text-align: justify;
		text-align-last: left;
	}

	.chairpersons_section :global(.t_eyebrow) {
		color: var(--c-maroon);
		background-image: none;
		-webkit-text-fill-color: currentColor;
	}
	.chairpersons_section {
		padding-bottom: clamp(40px, 5vw, 96px);
	}
	.chairpersons_gallery {
		--portrait-gap: clamp(12px, 2vw, 32px);
		--portraits-per-row: 4;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: var(--portrait-gap);
	}
	.chairperson {
		flex: 0 0 calc((100% + var(--portrait-gap)) / var(--portraits-per-row) - var(--portrait-gap));
		min-width: 0;
	}
	.chairperson_frame {
		display: flex;
		flex-direction: column;
		height: 100%;
		margin: 0;
		overflow: hidden;
		border: 1px solid var(--c-maroon-deep);
		border-radius: 16px;
		background: var(--c-maroon-deep);
	}
	.chairperson_frame img {
		display: block;
		width: 100%;
		aspect-ratio: 4 / 5;
		object-fit: cover;
		object-position: center 12%;
	}
	.chairperson_frame figcaption {
		flex: 1;
		display: flex;
		align-items: center;
		padding: clamp(10px, 1.35vw, 24px);
		border-top: 2px solid var(--c-gold);
		background: var(--c-maroon-deep);
		color: var(--c-surface);
		font: 700 clamp(0.9rem, 1.32vw, 1.35rem) / 1.3 var(--font-heading);
		overflow-wrap: anywhere;
	}
	@media (hover: hover) and (prefers-reduced-motion: no-preference) {
		.milestone_frame img,
		.chairperson_frame img {
			transition: transform 0.4s var(--motion-ease);
		}
		.milestone_frame:hover img,
		.chairperson_frame:hover img {
			transform: scale(1.035);
		}
	}

	/* Program objectives */
	.objectives_section {
		padding-top: clamp(32px, 2.55vw, 49px);
		padding-bottom: clamp(56px, 4.7vw, 90px);
	}
	.objectives_grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: clamp(20px, 3.23vw, 62px);
	}
	.objective_card {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		aspect-ratio: 503 / 562;
		overflow: hidden;
		padding: clamp(28px, 3.9vw, 75px) clamp(24px, 2.24vw, 43px) clamp(28px, 2.8vw, 54px)
			clamp(24px, 2.66vw, 51px);
		border-radius: 15px;
		color: #fff;
		background: linear-gradient(113.9deg, #921518 1.43%, #6d1719 96.86%);
	}
	.objective_card::after {
		content: '';
		position: absolute;
		inset: 0;
		background: rgb(0 0 0 / 0.2);
	}
	.objective_photo {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		opacity: 0.4;
	}
	.objective_text {
		position: relative;
		z-index: 1;
		max-width: 467px;
		margin-left: auto;
		text-align: right;
	}
	.objective_title {
		font: 700 clamp(22px, 1.875vw, 36px) / 1.1 var(--font-heading);
	}
	.objective_desc {
		margin-top: clamp(12px, 1vw, 20px);
		font: 400 clamp(16px, 1.354vw, 26px) / 1.1 var(--font-heading);
	}

	@supports not ((background-clip: text) or (-webkit-background-clip: text)) {
		.qa_title,
		.legacy_heading,
		.milestone_title {
			-webkit-text-fill-color: currentColor;
		}
	}

	@media (max-width: 1024px) {
		.goals_grid,
		.facts_grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
		.qa_band {
			grid-template-columns: 1fr;
		}
		.qa_visual {
			justify-items: center;
		}
		.qa_visual > :global(*) {
			max-width: 640px;
		}
		.bsit_pylon {
			opacity: 0.6;
		}
	}

	@media (max-width: 768px) {
		.campus_strip {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
		.campus_photo:nth-child(n + 4) {
			display: none;
		}
		.statement_grid,
		.objectives_grid {
			grid-template-columns: 1fr;
		}
		.objective_card {
			aspect-ratio: auto;
			min-height: 380px;
		}
		.bsit_pylon {
			top: auto;
			bottom: -30%;
			right: -40%;
			width: 110%;
		}

		/* Single-column timeline with the spine on the left. */
		.timeline {
			--spine: 28px;
			--col-gap: 18px;
		}
		.timeline::before,
		.timeline::after {
			left: calc(var(--spine) / 2);
		}
		.milestone,
		.milestone_flip {
			grid-template-columns: var(--spine) 1fr;
			row-gap: 18px;
		}
		.milestone_dot {
			grid-column: 1;
			margin-top: 6px;
		}
		.milestone .milestone_text,
		.milestone_flip .milestone_text {
			grid-column: 2;
			grid-row: 1;
			text-align: left;
		}
		.milestone .milestone_frame,
		.milestone_flip .milestone_frame {
			grid-column: 2;
			grid-row: 2;
		}
		.chairpersons_gallery {
			--portraits-per-row: 3;
		}
	}

	@media (max-width: 560px) {
		.goals_grid,
		.facts_grid {
			grid-template-columns: 1fr;
		}
		.chairpersons_gallery {
			--portraits-per-row: 2;
		}
		.facts_header {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>
