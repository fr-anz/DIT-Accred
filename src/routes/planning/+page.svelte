<script>
	import {
		Globe,
		Flag,
		SquareCheck,
		BookOpen,
		Users,
		Building2,
		PenLine,
		FileText,
		Briefcase,
		Plane,
		Star,
		Share2,
		CircleDot
	} from 'lucide-svelte';

	// SDG data for hover cards
	const sdgData = {
		1: {
			label: 'No Poverty',
			color: '#E5243B',
			description: 'End poverty in all its forms everywhere.'
		},
		2: {
			label: 'Zero Hunger',
			color: '#DDA63A',
			description: 'End hunger, achieve food security and improved nutrition.'
		},
		4: {
			label: 'Quality Education',
			color: '#C5192D',
			description: 'Ensure inclusive and equitable quality education for all.'
		},
		17: {
			label: 'Partnerships for the Goals',
			color: '#19486A',
			description: 'Strengthen the means of implementation and revitalize global partnerships.'
		}
	};

	let hoveredSdg = $state(null);

	const wuriRankings = [
		{ rank: 21, label: 'Generative AI Application' },
		{ rank: 39, label: 'Student Support Engagement' },
		{ rank: 50, label: 'Symbol / Promotion' }
	];

	const qsCategories = [
		{ stars: 5, label: 'Employability' },
		{ stars: 5, label: 'Online Learning' },
		{ stars: 5, label: 'Academic Dev.' },
		{ stars: 4, label: 'Facilities' }
	];

	const sdgIds = [1, 2, 4, 17];
</script>

<svelte:head>
	<title>Planning & Quality Assurance | DIT-PUP</title>
	<meta
		name="description"
		content="Explore DIT-PUP's Planning and Quality Assurance initiatives, including international benchmarking, AACCUP accreditation, and institutional rankings."
	/>
</svelte:head>

<!-- ─────────────────────────────────────────────
  HERO SECTION
───────────────────────────────────────────── -->
<section class="hero_section">
	<div class="checkerboard_bg" aria-hidden="true"></div>
	<div class="hero_content">
		<h1 class="hero_title">PLANNING &amp; QUALITY<br />ASSURANCE</h1>
	</div>
</section>

<!-- ─────────────────────────────────────────────
  SECTION 1: STRATEGIC INTERNATIONAL BENCHMARKING
───────────────────────────────────────────── -->
<section class="content_section" id="strategic-benchmarking">
	<div class="section_label">
		<Globe size={18} strokeWidth={1.5} class="section_icon" />
		<span>STRATEGIC INTERNATIONAL BENCHMARKING</span>
	</div>
	<hr class="section_divider" />

	<div class="benchmarking_grid">
		<div class="benchmarking_text">
			<p>
				The Bachelor of Science in Information Technology (BSIT) program benefits directly from
				active engagement in internationally recognized higher education ranking systems and regional
				quality networks. These external validations ensure the curriculum remains comparable with
				global computing education standards.
			</p>
		</div>
		<div class="aaccup_card">
			<SquareCheck size={32} strokeWidth={1.5} class="aaccup_icon" />
			<p class="aaccup_level">LEVEL IV</p>
			<p class="aaccup_status_label">AACCUP STATUS</p>
			<hr class="aaccup_divider" />
			<p class="aaccup_sub">On-going Application</p>
		</div>
	</div>
</section>

<!-- ─────────────────────────────────────────────
  SECTION 2: UNIVERSITY SUPPORT FUNCTIONS
───────────────────────────────────────────── -->
<section class="content_section" id="university-support">
	<div class="section_label">
		<Flag size={18} strokeWidth={1.5} class="section_icon" />
		<span>UNIVERSITY SUPPORT FUNCTIONS</span>
	</div>
	<hr class="section_divider" />

	<!-- Video embed placeholder -->
	<div class="video_wrapper">
		<div class="video_screen">
			<div class="video_checkerboard" aria-hidden="true"></div>
			<div class="video_overlay">
				<button class="play_btn" aria-label="Play video">
					<svg class="play_icon" viewBox="0 0 24 24" fill="currentColor">
						<polygon points="6,3 20,12 6,21" />
					</svg>
				</button>
				<div class="video_meta">
					<p class="video_title_text">UNIVERSITY SUPPORT FUNCTIONS</p>
					<p class="video_subtitle_text">DIT-PUP — AACCUP Level IV</p>
				</div>
			</div>
			<!-- Fake video control bar -->
			<div class="video_controls" aria-hidden="true">
				<span class="ctrl_icon">▶</span>
				<div class="timeline_track">
					<div class="timeline_progress"></div>
				</div>
				<span class="ctrl_time">1:24 / 5:00</span>
				<span class="ctrl_icon">⤢</span>
			</div>
		</div>
	</div>

	<!-- Two-column support content -->
	<div class="support_grid">
		<!-- Left column -->
		<div class="support_left">
			<!-- Strategic Priority card -->
			<div class="priority_card">
				<h3 class="priority_card_title">STRATEGIC PRIORITY</h3>
				<ul class="priority_list">
					<li class="priority_item">
						<span class="priority_num">01</span>
						<span class="priority_text">Academic Program Development &amp; Internationalization</span>
					</li>
					<li class="priority_item">
						<span class="priority_num">02</span>
						<span class="priority_text">Human Resource Development</span>
					</li>
					<li class="priority_item last">
						<span class="priority_num">03</span>
						<span class="priority_text">Institutional-Level Quality Assurance</span>
					</li>
				</ul>
			</div>

			<!-- Core Functions card -->
			<div class="core_functions_card">
				<h3 class="core_functions_title">CORE FUNCTIONS</h3>
				<div class="functions_grid">
					<div class="function_pill">Higher Education Programs</div>
					<div class="function_pill">Research Programs</div>
					<div class="function_pill">Extension &amp; Tech Advisory</div>
					<div class="function_pill">Customer Satisfaction</div>
				</div>
			</div>
		</div>

		<!-- Right column: Support Feed -->
		<div class="support_feed">
			<div class="feed_header">
				<Share2 size={16} strokeWidth={1.5} />
				<h3 class="feed_title">UNIVERSITY SUPPORT FEED</h3>
			</div>
			<div class="feed_cards">
				<div class="feed_card">
					<h4 class="feed_card_title">Quality Assurance</h4>
					<p class="feed_card_desc">
						Training via QAC and UTLDO for syllabi development and accreditation monitoring.
					</p>
				</div>
				<div class="feed_card">
					<h4 class="feed_card_title">Research &amp; Faculty</h4>
					<p class="feed_card_desc">
						Incentives for research presentation and faculty development grants (FSD PHP 20,000).
					</p>
				</div>
				<div class="feed_card">
					<h4 class="feed_card_title">Infrastructure</h4>
					<p class="feed_card_desc">
						PUP SINTA and Document Tracking System (DTS) for efficient request management.
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ─────────────────────────────────────────────
  SECTION 3: DEPARTMENT-LEVEL PROCESS
───────────────────────────────────────────── -->
<section class="content_section" id="dept-process">
	<div class="section_label">
		<Flag size={18} strokeWidth={1.5} class="section_icon maroon" />
		<span>DEPARTMENT-LEVEL PROCESS</span>
	</div>
	<hr class="section_divider" />

	<div class="process_cards_grid">
		<div class="process_card">
			<div class="process_icon_wrapper">
				<PenLine size={28} strokeWidth={1.5} class="process_icon" />
			</div>
			<h4 class="process_card_title">Curriculum<br />Revision</h4>
			<p class="process_card_desc">Based on CHED Memorandum Order No. 32 series of 2017.</p>
		</div>
		<div class="process_card">
			<div class="process_icon_wrapper">
				<FileText size={28} strokeWidth={1.5} class="process_icon" />
			</div>
			<h4 class="process_card_title">Syllabi<br />Prep</h4>
			<p class="process_card_desc">
				Regular updates for industry and government sensitivity.
			</p>
		</div>
		<div class="process_card">
			<div class="process_icon_wrapper">
				<Briefcase size={28} strokeWidth={1.5} class="process_icon" />
			</div>
			<h4 class="process_card_title">Internship</h4>
			<p class="process_card_desc">Established MOA with strategic industry partners.</p>
		</div>
		<div class="process_card">
			<div class="process_icon_wrapper">
				<Plane size={28} strokeWidth={1.5} class="process_icon" />
			</div>
			<h4 class="process_card_title">International<br />Affairs</h4>
			<p class="process_card_desc">Institutionalization of global partnerships and mobility.</p>
		</div>
	</div>
</section>

<!-- ─────────────────────────────────────────────
  PHOTO STRIP
───────────────────────────────────────────── -->
<div class="photo_strip" aria-label="Department photo gallery">
	<img
		src="/planning/photo-strip-1.jpg"
		alt="Students and faculty in a classroom setting"
		class="strip_photo"
	/>
	<img
		src="/planning/photo-strip-2.jpg"
		alt="Faculty group photo outdoors"
		class="strip_photo"
	/>
	<img
		src="/planning/photo-strip-3.jpg"
		alt="Faculty coaching a student in an IT lab"
		class="strip_photo"
	/>
</div>

<!-- ─────────────────────────────────────────────
  SECTION 4: VERIFIED INTERNATIONAL RANKINGS
───────────────────────────────────────────── -->
<section class="content_section" id="rankings">
	<div class="section_label">
		<Globe size={18} strokeWidth={1.5} class="section_icon" />
		<span>VERIFIED INTERNATIONAL RANKINGS &amp; INSTITUTIONAL IMPACT</span>
	</div>
	<hr class="section_divider" />

	<div class="rankings_grid">

		<!-- QS Stars card -->
		<div class="ranking_card qs_card">
			<div class="qs_header">
				<div class="qs_logo_row">
					<Users size={18} strokeWidth={1.5} />
					<span class="qs_org">QS Stars</span>
				</div>
				<div class="qs_stars_row" aria-label="3 out of 5 stars">
					{#each [1, 2, 3, 4, 5] as s}
						<Star
							size={14}
							strokeWidth={0}
							fill={s <= 3 ? '#D4A843' : '#E0E0E0'}
						/>
					{/each}
				</div>
			</div>

			<h3 class="qs_rating_title">3-Star Overall Rating</h3>
			<p class="qs_rating_desc">
				QS Stars University Rating System alignment with global computing education standards.
			</p>

			<div class="qs_category_grid">
				{#each qsCategories as cat}
					<div class="qs_cat_tile">
						<span class="qs_cat_stars">{cat.stars} stars</span>
						<span class="qs_cat_label">{cat.label}</span>
					</div>
				{/each}
			</div>

			<div class="qs_validated_row">
				<SquareCheck size={14} strokeWidth={2} class="validated_icon" />
				<span>Validated Module: Teaching &amp; IT Systems</span>
			</div>
		</div>

		<!-- WURI Rankings card -->
		<div class="ranking_card wuri_card">
			<div class="wuri_header">
				<div>
					<h3 class="wuri_title">WURI Rankings<br />2024</h3>
				</div>
				<div class="wuri_world_rank">
					<span class="wuri_rank_label">World Rank:</span>
					<span class="wuri_rank_num">271st</span>
				</div>
			</div>
			<p class="wuri_desc">Innovative Universities globally among 1,072 institutions.</p>
			<hr class="wuri_divider" />
			<ul class="wuri_rankings_list">
				{#each wuriRankings as item}
					<li class="wuri_rank_item">
						<span class="wuri_rank_badge">{item.rank}</span>
						<span class="wuri_rank_text">{item.label}</span>
					</li>
				{/each}
			</ul>
		</div>

		<!-- Impact Rankings & AUN-QA column -->
		<div class="impact_column">
			<!-- Impact Rankings card -->
			<div class="ranking_card impact_card">
				<p class="impact_label">The Impact Rankings</p>
				<h2 class="impact_number">1501+</h2>
				<p class="impact_desc">
					Validated against UN Sustainable Development Goals (SDGs) through community digital
					inclusion.
				</p>

				<!-- SDG Badges with hover tooltip -->
				<div class="sdg_badges_row">
					{#each sdgIds as id}
						<div
							class="sdg_badge"
							style="background-color: {sdgData[id].color};"
							onmouseenter={() => (hoveredSdg = id)}
							onmouseleave={() => (hoveredSdg = null)}
							role="button"
							tabindex="0"
							aria-label="SDG {id}: {sdgData[id].label}"
							onkeydown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') hoveredSdg = hoveredSdg === id ? null : id;
							}}
						>
							<span class="sdg_num">{String(id).padStart(2, '0')}</span>

							{#if hoveredSdg === id}
								<div class="sdg_tooltip" role="tooltip">
									<span class="sdg_tooltip_num">SDG {id}</span>
									<strong class="sdg_tooltip_label">{sdgData[id].label}</strong>
									<span class="sdg_tooltip_desc">{sdgData[id].description}</span>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>

			<!-- AUN-QA Network card -->
			<div class="ranking_card aunqa_card">
				<div class="aunqa_header">
					<Share2 size={18} strokeWidth={1.5} class="aunqa_icon" />
					<h3 class="aunqa_title">AUN-QA Network</h3>
				</div>
				<p class="aunqa_desc">
					Active regional alignment of learning outcomes with ASEAN higher education standards.
				</p>
			</div>
		</div>
	</div>
</section>

<style>
	/* ── DESIGN TOKENS ── */
	:root {
		--color-maroon: #5c0f16;
		--color-maroon-mid: #801b1e;
		--color-gold: #cfa83a;
		--color-gold-light: #d4a843;
		--color-gold-dark: #b8912d;
		--color-bg: #ffffff;
		--font-body: 'Inter', sans-serif;
		--font-heading: 'Overpass', sans-serif;
		--section-max-width: 1100px;
	}

	/* ── HERO ── */
	.hero_section {
		position: relative;
		min-height: 360px;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		background-color: #f8f6f3;
	}

	.checkerboard_bg {
		position: absolute;
		inset: 0;
		opacity: 0.85;
		background-image: linear-gradient(45deg, #e5e3de 25%, transparent 25%),
			linear-gradient(-45deg, #e5e3de 25%, transparent 25%),
			linear-gradient(45deg, transparent 75%, #e5e3de 75%),
			linear-gradient(-45deg, transparent 75%, #e5e3de 75%);
		background-size: 40px 40px;
		background-position:
			0 0,
			0 20px,
			20px -20px,
			-20px 0px;
	}

	.hero_content {
		position: relative;
		z-index: 1;
		text-align: center;
		padding: 4rem 2rem;
	}

	.hero_title {
		font-family: var(--font-heading);
		font-size: clamp(2.5rem, 6vw, 5rem);
		font-weight: 900;
		color: var(--color-maroon);
		line-height: 1.1;
		letter-spacing: -0.01em;
		margin: 0;
	}

	/* ── SHARED SECTION WRAPPER ── */
	.content_section {
		max-width: var(--section-max-width);
		margin: 0 auto;
		padding: 4rem 2rem;
	}

	.section_label {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		color: var(--color-gold-dark);
		font-family: var(--font-body);
		font-size: 0.78rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		margin-bottom: 0.75rem;
	}

	:global(.section_icon) {
		color: var(--color-gold-dark);
		flex-shrink: 0;
	}

	:global(.section_icon.maroon) {
		color: var(--color-maroon);
	}

	.section_divider {
		border: none;
		border-top: 1px solid rgba(0, 0, 0, 0.12);
		margin: 0 0 2.5rem 0;
	}

	/* ── STRATEGIC BENCHMARKING ── */
	.benchmarking_grid {
		display: grid;
		grid-template-columns: 1fr auto;
		gap: 3rem;
		align-items: start;
	}

	@media (max-width: 640px) {
		.benchmarking_grid {
			grid-template-columns: 1fr;
		}
	}

	.benchmarking_text p {
		font-family: var(--font-body);
		font-size: 0.95rem;
		color: #333;
		line-height: 1.75;
		max-width: 560px;
		margin: 0;
	}

	.aaccup_card {
		background: linear-gradient(135deg, var(--color-gold) 0%, var(--color-gold-dark) 100%);
		border-radius: 14px;
		padding: 2rem 2.25rem;
		text-align: center;
		min-width: 180px;
		box-shadow: 0 8px 24px rgba(207, 168, 58, 0.3);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.35rem;
	}

	:global(.aaccup_icon) {
		color: rgba(255, 255, 255, 0.85);
		margin-bottom: 0.5rem;
	}

	.aaccup_level {
		font-family: var(--font-heading);
		font-size: 1.3rem;
		font-weight: 900;
		color: var(--color-maroon);
		margin: 0;
		letter-spacing: 0.05em;
	}

	.aaccup_status_label {
		font-family: var(--font-body);
		font-size: 0.65rem;
		font-weight: 800;
		letter-spacing: 0.14em;
		color: var(--color-maroon);
		margin: 0;
	}

	.aaccup_divider {
		border: none;
		border-top: 1px solid rgba(92, 15, 22, 0.25);
		width: 80%;
		margin: 0.4rem 0;
	}

	.aaccup_sub {
		font-family: var(--font-body);
		font-size: 0.75rem;
		font-style: italic;
		color: rgba(92, 15, 22, 0.8);
		margin: 0;
	}

	/* ── VIDEO ── */
	.video_wrapper {
		margin-bottom: 2.5rem;
		border-radius: 16px;
		overflow: hidden;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
		border: 3px solid #1a1a1a;
		background: #1a1a1a;
	}

	.video_screen {
		position: relative;
		width: 100%;
		aspect-ratio: 16 / 7;
		overflow: hidden;
		cursor: pointer;
	}

	.video_checkerboard {
		position: absolute;
		inset: 0;
		background-color: #f0ece5;
		background-image: linear-gradient(45deg, #d9d4c9 25%, transparent 25%),
			linear-gradient(-45deg, #d9d4c9 25%, transparent 25%),
			linear-gradient(45deg, transparent 75%, #d9d4c9 75%),
			linear-gradient(-45deg, transparent 75%, #d9d4c9 75%);
		background-size: 32px 32px;
		background-position:
			0 0,
			0 16px,
			16px -16px,
			-16px 0px;
	}

	.video_overlay {
		position: relative;
		z-index: 10;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1.25rem;
		background-color: rgba(92, 15, 22, 0.1);
		transition: background-color 0.3s ease;
	}

	.video_screen:hover .video_overlay {
		background-color: rgba(92, 15, 22, 0.2);
	}

	.play_btn {
		width: 72px;
		height: 72px;
		border-radius: 50%;
		background: #fff;
		border: none;
		box-shadow: 0 8px 28px rgba(92, 15, 22, 0.25);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition:
			transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275),
			box-shadow 0.2s ease;
		padding-left: 5px;
	}

	.play_btn:hover {
		transform: scale(1.12);
		box-shadow: 0 12px 36px rgba(92, 15, 22, 0.35);
	}

	.play_icon {
		width: 26px;
		height: 26px;
		color: var(--color-maroon);
	}

	.video_meta {
		text-align: center;
		color: var(--color-maroon);
	}

	.video_title_text {
		font-family: var(--font-heading);
		font-size: 1.1rem;
		font-weight: 800;
		letter-spacing: 0.05em;
		margin: 0;
	}

	.video_subtitle_text {
		font-size: 0.78rem;
		font-weight: 600;
		opacity: 0.8;
		margin: 0.2rem 0 0 0;
	}

	.video_controls {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 15;
		background: linear-gradient(transparent, rgba(0, 0, 0, 0.65));
		padding: 2rem 1.25rem 0.6rem;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		color: #fff;
		font-size: 0.75rem;
		opacity: 0;
		transform: translateY(4px);
		transition:
			opacity 0.3s ease,
			transform 0.3s ease;
		pointer-events: none;
	}

	.video_screen:hover .video_controls {
		opacity: 1;
		transform: translateY(0);
	}

	.ctrl_icon {
		font-size: 0.9rem;
		opacity: 0.85;
	}

	.timeline_track {
		flex-grow: 1;
		height: 4px;
		background: rgba(255, 255, 255, 0.3);
		border-radius: 2px;
		position: relative;
	}

	.timeline_progress {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 28%;
		background: var(--color-gold);
		border-radius: 2px;
	}

	.ctrl_time {
		font-size: 0.7rem;
		opacity: 0.85;
		white-space: nowrap;
	}

	/* ── SUPPORT GRID ── */
	.support_grid {
		display: grid;
		grid-template-columns: 1.05fr 1fr;
		gap: 2rem;
	}

	@media (max-width: 760px) {
		.support_grid {
			grid-template-columns: 1fr;
		}
	}

	.support_left {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	/* Priority card */
	.priority_card {
		background: #fff;
		border: 1px solid rgba(207, 168, 58, 0.3);
		border-radius: 12px;
		padding: 1.75rem;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
	}

	.priority_card_title {
		font-family: var(--font-heading);
		font-size: 1rem;
		font-weight: 900;
		color: var(--color-maroon);
		letter-spacing: 0.05em;
		margin: 0 0 1.25rem 0;
	}

	.priority_list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
	}

	.priority_item {
		display: flex;
		align-items: center;
		gap: 1.25rem;
		padding: 0.85rem 0;
		border-bottom: 1px solid rgba(0, 0, 0, 0.07);
	}

	.priority_item.last {
		border-bottom: none;
	}

	.priority_num {
		font-size: 0.9rem;
		font-weight: 700;
		color: var(--color-gold);
		font-family: var(--font-body);
		min-width: 24px;
	}

	.priority_text {
		font-size: 0.85rem;
		color: #222;
		font-family: var(--font-body);
		line-height: 1.45;
	}

	/* Core Functions card */
	.core_functions_card {
		background: var(--color-gold);
		border-radius: 12px;
		padding: 1.5rem 1.75rem;
		box-shadow: 0 4px 20px rgba(207, 168, 58, 0.2);
	}

	.core_functions_title {
		font-family: var(--font-heading);
		font-size: 1rem;
		font-weight: 900;
		color: #1a1a1a;
		letter-spacing: 0.05em;
		margin: 0 0 1rem 0;
	}

	.functions_grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.65rem;
	}

	.function_pill {
		background: #fff;
		border-radius: 6px;
		padding: 0.7rem 1rem;
		border-left: 5px solid var(--color-maroon);
		font-size: 0.78rem;
		font-weight: 700;
		color: var(--color-maroon);
		font-family: var(--font-body);
		line-height: 1.3;
	}

	/* Support Feed */
	.support_feed {
		background: var(--color-maroon);
		border-radius: 12px;
		padding: 1.75rem;
		color: #fff;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
		box-shadow: 0 4px 20px rgba(92, 15, 22, 0.15);
	}

	.feed_header {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.15);
		padding-bottom: 0.85rem;
	}

	.feed_title {
		font-size: 0.85rem;
		font-weight: 800;
		color: var(--color-gold);
		letter-spacing: 0.1em;
		font-family: var(--font-body);
		margin: 0;
	}

	.feed_cards {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
	}

	.feed_card {
		background: #fff;
		border-radius: 8px;
		padding: 1.1rem 1.25rem;
		color: #2b2b2b;
	}

	.feed_card_title {
		font-size: 0.92rem;
		font-weight: 700;
		color: var(--color-gold-dark);
		margin: 0 0 0.4rem 0;
		font-family: var(--font-body);
	}

	.feed_card_desc {
		font-size: 0.78rem;
		line-height: 1.6;
		color: #444;
		margin: 0;
		font-family: var(--font-body);
	}

	/* ── DEPARTMENT-LEVEL PROCESS ── */
	.process_cards_grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 1.25rem;
	}

	@media (max-width: 760px) {
		.process_cards_grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 460px) {
		.process_cards_grid {
			grid-template-columns: 1fr;
		}
	}

	.process_card {
		border: 1.5px solid rgba(92, 15, 22, 0.15);
		border-radius: 12px;
		padding: 1.75rem 1.25rem;
		text-align: center;
		background: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.65rem;
		transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
		cursor: default;
	}

	.process_card:hover {
		transform: translateY(-4px);
		border-color: var(--color-gold);
		box-shadow: 0 8px 24px rgba(207, 168, 58, 0.15);
	}

	.process_icon_wrapper {
		width: 52px;
		height: 52px;
		border-radius: 50%;
		background: rgba(92, 15, 22, 0.06);
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 0.25rem;
	}

	:global(.process_icon) {
		color: var(--color-maroon);
	}

	.process_card_title {
		font-family: var(--font-heading);
		font-size: 1rem;
		font-weight: 700;
		color: var(--color-maroon);
		margin: 0;
		line-height: 1.3;
	}

	.process_card_desc {
		font-family: var(--font-body);
		font-size: 0.78rem;
		color: #555;
		line-height: 1.55;
		margin: 0;
	}

	/* ── PHOTO STRIP ── */
	.photo_strip {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		height: 260px;
		overflow: hidden;
		margin: 1rem 0 0 0;
	}

	.strip_photo {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		filter: brightness(0.92);
		transition: filter 0.3s ease;
	}

	.strip_photo:hover {
		filter: brightness(1);
	}

	/* ── RANKINGS SECTION ── */
	.rankings_grid {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 1.5rem;
		align-items: start;
	}

	@media (max-width: 900px) {
		.rankings_grid {
			grid-template-columns: 1fr 1fr;
		}
	}

	@media (max-width: 600px) {
		.rankings_grid {
			grid-template-columns: 1fr;
		}
	}

	.ranking_card {
		border-radius: 14px;
		padding: 1.75rem;
		border: 1px solid rgba(0, 0, 0, 0.08);
		background: #fff;
		box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
	}

	/* QS Stars card */
	.qs_card {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
	}

	.qs_header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.qs_logo_row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--font-body);
		font-size: 0.9rem;
		font-weight: 700;
		color: #222;
	}

	.qs_stars_row {
		display: flex;
		gap: 2px;
	}

	.qs_rating_title {
		font-family: var(--font-heading);
		font-size: 1rem;
		font-weight: 700;
		color: var(--color-maroon);
		margin: 0;
	}

	.qs_rating_desc {
		font-family: var(--font-body);
		font-size: 0.8rem;
		color: #555;
		line-height: 1.6;
		margin: 0;
	}

	.qs_category_grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.65rem;
	}

	.qs_cat_tile {
		background: var(--color-maroon);
		border-radius: 6px;
		padding: 0.6rem 0.85rem;
		display: flex;
		flex-direction: column;
		gap: 0.1rem;
	}

	.qs_cat_stars {
		font-family: var(--font-heading);
		font-size: 1rem;
		font-weight: 900;
		color: #fff;
	}

	.qs_cat_label {
		font-family: var(--font-body);
		font-size: 0.7rem;
		color: rgba(255, 255, 255, 0.75);
		font-style: italic;
	}

	.qs_validated_row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--font-body);
		font-size: 0.78rem;
		font-weight: 600;
		color: var(--color-maroon);
		padding-top: 0.25rem;
	}

	:global(.validated_icon) {
		color: var(--color-maroon);
		flex-shrink: 0;
	}

	/* WURI card */
	.wuri_card {
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
	}

	.wuri_header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
	}

	.wuri_title {
		font-family: var(--font-heading);
		font-size: 1.1rem;
		font-weight: 900;
		color: #222;
		margin: 0;
		line-height: 1.2;
	}

	.wuri_world_rank {
		text-align: right;
		white-space: nowrap;
	}

	.wuri_rank_label {
		display: block;
		font-size: 0.65rem;
		color: #888;
		font-family: var(--font-body);
	}

	.wuri_rank_num {
		font-family: var(--font-heading);
		font-size: 1.2rem;
		font-weight: 900;
		color: #2879e0;
	}

	.wuri_desc {
		font-family: var(--font-body);
		font-size: 0.8rem;
		color: #555;
		line-height: 1.6;
		margin: 0;
	}

	.wuri_divider {
		border: none;
		border-top: 1px solid rgba(0, 0, 0, 0.1);
	}

	.wuri_rankings_list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
	}

	.wuri_rank_item {
		display: flex;
		align-items: center;
		gap: 1rem;
		border-bottom: 1px solid rgba(0, 0, 0, 0.07);
		padding-bottom: 0.85rem;
	}

	.wuri_rank_item:last-child {
		border-bottom: none;
		padding-bottom: 0;
	}

	.wuri_rank_badge {
		background: var(--color-maroon);
		color: #fff;
		font-family: var(--font-heading);
		font-size: 1rem;
		font-weight: 900;
		border-radius: 4px;
		padding: 0.25rem 0.65rem;
		min-width: 42px;
		text-align: center;
		flex-shrink: 0;
	}

	.wuri_rank_text {
		font-family: var(--font-body);
		font-size: 0.8rem;
		color: #333;
		line-height: 1.4;
		font-weight: 500;
		text-transform: uppercase;
		letter-spacing: 0.04em;
	}

	/* Impact + AUN column */
	.impact_column {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.impact_card {
		background: #1a1313;
		border-color: #1a1313;
		color: #fff;
	}

	.impact_label {
		font-family: var(--font-body);
		font-size: 0.72rem;
		color: rgba(255, 255, 255, 0.55);
		margin: 0 0 0.35rem 0;
		letter-spacing: 0.05em;
	}

	.impact_number {
		font-family: var(--font-heading);
		font-size: 3rem;
		font-weight: 900;
		color: #fff;
		margin: 0 0 0.5rem 0;
		line-height: 1;
	}

	.impact_desc {
		font-family: var(--font-body);
		font-size: 0.78rem;
		color: rgba(255, 255, 255, 0.7);
		line-height: 1.65;
		margin: 0 0 1.25rem 0;
	}

	/* SDG badges */
	.sdg_badges_row {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.sdg_badge {
		position: relative;
		width: 40px;
		height: 40px;
		border-radius: 6px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: transform 0.2s ease;
		user-select: none;
	}

	.sdg_badge:hover {
		transform: scale(1.1);
		z-index: 10;
	}

	.sdg_num {
		font-family: var(--font-heading);
		font-size: 0.85rem;
		font-weight: 900;
		color: #fff;
	}

	.sdg_tooltip {
		position: absolute;
		bottom: calc(100% + 10px);
		left: 50%;
		transform: translateX(-50%);
		background: #fff;
		color: #111;
		border-radius: 10px;
		padding: 0.85rem 1rem;
		width: 200px;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		z-index: 100;
		pointer-events: none;

		/* small arrow */
		&::after {
			content: '';
			position: absolute;
			top: 100%;
			left: 50%;
			transform: translateX(-50%);
			border: 7px solid transparent;
			border-top-color: #fff;
		}
	}

	.sdg_tooltip_num {
		font-size: 0.65rem;
		font-weight: 700;
		color: #888;
		letter-spacing: 0.08em;
		font-family: var(--font-body);
	}

	.sdg_tooltip_label {
		font-size: 0.9rem;
		font-weight: 800;
		font-family: var(--font-heading);
		color: #111;
		line-height: 1.2;
	}

	.sdg_tooltip_desc {
		font-size: 0.72rem;
		color: #555;
		line-height: 1.5;
		font-family: var(--font-body);
		margin-top: 0.2rem;
	}

	/* AUN-QA card */
	.aunqa_card {
		background: var(--color-gold);
		border-color: var(--color-gold);
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.aunqa_header {
		display: flex;
		align-items: center;
		gap: 0.6rem;
	}

	:global(.aunqa_icon) {
		color: #3d0a0e;
	}

	.aunqa_title {
		font-family: var(--font-heading);
		font-size: 1rem;
		font-weight: 800;
		color: #3d0a0e;
		margin: 0;
	}

	.aunqa_desc {
		font-family: var(--font-body);
		font-size: 0.82rem;
		color: rgba(61, 10, 14, 0.8);
		line-height: 1.6;
		margin: 0;
	}
</style>
