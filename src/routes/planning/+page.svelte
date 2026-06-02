<script>
	import {
		Globe,
		Flag,
		BadgeCheck,
		SquareCheck,
		BookOpen,
		Award,
		Building2,
		PenLine,
		FileText,
		Briefcase,
		Plane,
		Star,
		Share2,
		CircleDot,
		CheckCircle2
	} from 'lucide-svelte';
	import Footer from '$lib/components/footer.svelte';

	// SDG data for hover cards
	const sdgData = {
		1: {
			label: 'No Poverty',
			color: '#F5C242',
			range: '43.6 - 52.7'
		},
		2: {
			label: 'Zero Hunger',
			color: '#C57E00',
			range: '13.7 - 40.9'
		},
		4: {
			label: 'Quality Education',
			color: '#8C0F13',
			range: '25.7 - 44.1'
		},
		17: {
			label: 'Partnerships for the Goals',
			color: '#5F1013',
			range: '36.9 - 52.8'
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
		<Globe size={20} strokeWidth={1.5} class="section_icon maroon" />
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
			<BadgeCheck size={42} strokeWidth={1.5} class="aaccup_icon" />
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
		<Flag size={20} strokeWidth={1.5} class="section_icon maroon" />
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
		<Flag size={20} strokeWidth={1.5} class="section_icon maroon" />
		<span>DEPARTMENT-LEVEL PROCESS</span>
	</div>
	<hr class="section_divider" />

	<div class="process_cards_grid">
		<div class="process_card">
			<div class="process_icon_wrapper">
				<PenLine size={36} strokeWidth={1.5} class="process_icon" />
			</div>
			<h4 class="process_card_title">Curriculum<br />Revision</h4>
			<hr class="process_divider" />
			<p class="process_card_desc">Based on CHED Memorandum Order No. 32 series of 2017.</p>
		</div>
		<div class="process_card">
			<div class="process_icon_wrapper">
				<FileText size={36} strokeWidth={1.5} class="process_icon" />
			</div>
			<h4 class="process_card_title">Syllabi<br />Prep</h4>
			<hr class="process_divider" />
			<p class="process_card_desc">
				Regular updates for industry and government sensitivity.
			</p>
		</div>
		<div class="process_card">
			<div class="process_icon_wrapper">
				<Briefcase size={36} strokeWidth={1.5} class="process_icon" />
			</div>
			<h4 class="process_card_title">Internship</h4>
			<hr class="process_divider" />
			<p class="process_card_desc">Established MOA with strategic industry partners.</p>
		</div>
		<div class="process_card">
			<div class="process_icon_wrapper">
				<Plane size={36} strokeWidth={1.5} class="process_icon" />
			</div>
			<h4 class="process_card_title">International<br />Affairs</h4>
			<hr class="process_divider" />
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
		alt="Students and faculty in an IT laboratory setting"
		class="strip_photo img_pos_1"
	/>
	<img
		src="/planning/photo-strip-2.jpg"
		alt="Students listening to a presentation on Converge ICT Solutions"
		class="strip_photo img_pos_2"
	/>
	<img
		src="/planning/photo-strip-3.jpg"
		alt="Faculty and staff group with Banua Palawan tribe members"
		class="strip_photo img_pos_3"
	/>
	<img
		src="/planning/photo-strip-4.jpg"
		alt="Department faculty meeting and planning session"
		class="strip_photo img_pos_4"
	/>
</div>

<!-- ─────────────────────────────────────────────
  SECTION 4: VERIFIED INTERNATIONAL RANKINGS
───────────────────────────────────────────── -->
<section class="content_section" id="rankings">
	<div class="section_label">
		<BadgeCheck size={20} strokeWidth={1.5} class="section_icon maroon" />
		<span>VERIFIED INTERNATIONAL RANKINGS &amp; INSTITUTIONAL IMPACT</span>
	</div>
	<hr class="section_divider" />

	<div class="rankings_grid">

		<!-- QS Stars card -->
		<div class="ranking_card qs_card">
			<div class="qs_header">
				<div class="qs_logo_row">
					<Award size={18} strokeWidth={1.5} class="qs_logo_icon" />
					<span class="qs_org">QS Stars</span>
				</div>
				<div class="qs_stars_row" aria-label="3 out of 5 stars">
					{#each [1, 2, 3, 4, 5] as s}
						<Star
							size={14}
							strokeWidth={0}
							fill={s <= 3 ? '#FAC549' : '#FCEFCA'}
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
				<CheckCircle2 size={16} class="validated_icon_circle" />
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
				<li class="wuri_rank_item">
					<span class="wuri_rank_badge">21</span>
					<div class="wuri_rank_details">
						<span class="wuri_rank_text">Generative AI Application</span>
						<div class="wuri_progress_track">
							<div class="wuri_progress_bar" style="width: 85%;"></div>
						</div>
					</div>
				</li>
				<li class="wuri_rank_item">
					<span class="wuri_rank_badge">39</span>
					<div class="wuri_rank_details">
						<span class="wuri_rank_text">Student Support Engagement</span>
						<div class="wuri_progress_track">
							<div class="wuri_progress_bar" style="width: 65%;"></div>
						</div>
					</div>
				</li>
				<li class="wuri_rank_item">
					<span class="wuri_rank_badge">50</span>
					<div class="wuri_rank_details">
						<span class="wuri_rank_text">Symbol / Promotion</span>
						<div class="wuri_progress_track">
							<div class="wuri_progress_bar" style="width: 50%;"></div>
						</div>
					</div>
				</li>
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
									<div class="sdg_tooltip_left">
										<span class="sdg_tooltip_title">SDG</span>
										<span class="sdg_tooltip_num" style="color: {sdgData[id].color};">
											{String(id).padStart(2, '0')}
										</span>
									</div>
									<div class="sdg_tooltip_right">
										<span class="sdg_tooltip_range">{sdgData[id].range}</span>
									</div>
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

<Footer />

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
		--section-max-width: 1280px; /* Zoom 125% equivalent sizing (less white space) */
	}

	.content_section {
		width: 100%;
		box-sizing: border-box;
		padding: 2.5rem 10% 4rem 10%; /* Fluid 10% side padding matching the community page scale at 100% zoom */
		font-size: 1.05rem;
	}

	@media (max-width: 1024px) {
		.content_section {
			padding: 2.5rem 6% 4rem 6%;
		}
	}

	@media (max-width: 640px) {
		.content_section {
			padding: 2rem 1.5rem 3.5rem 1.5rem;
		}
	}

	#strategic-benchmarking {
		padding-top: 4.5rem; /* Separator from hero fold */
	}

	#university-support,
	#dept-process {
		padding-top: 1rem; /* Reduced top padding to tighten the spacing between consecutive sections */
	}

	/* ── HERO ── */
	.hero_section {
		position: relative;
		height: 100dvh; /* Covers the screen completely when landing/clicking Planning */
		min-height: 600px;
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
		font-size: clamp(2.5rem, 6vw, 5.5rem);
		font-weight: 900;
		color: var(--color-maroon);
		line-height: 1.15;
		letter-spacing: -0.01em;
		margin: 0;
		text-transform: uppercase;
	}

	/* ── SHARED SECTION WRAPPER ── */
	.section_label {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		font-family: var(--font-body);
		font-size: 1.15rem; /* Proportional scale to match figma reference */
		font-weight: 700;
		letter-spacing: 0.2em; /* 20% letter-spacing for the adjusted font scale */
		text-transform: uppercase;
		margin-bottom: 0.85rem;
		line-height: 1.3;
	}

	.section_label span {
		background: linear-gradient(180deg, #FAC549 0%, #CA8106 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		text-fill-color: transparent;
		display: inline-block;
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
		border-top: 1.5px solid rgba(0, 0, 0, 0.08);
		margin: 0.5rem 0 3rem 0;
	}

	/* ── STRATEGIC BENCHMARKING ── */
	.benchmarking_grid {
		display: grid;
		grid-template-columns: 1fr 380px;
		gap: 4.5rem;
		align-items: center;
	}

	@media (max-width: 900px) {
		.benchmarking_grid {
			grid-template-columns: 1fr;
			gap: 2.5rem;
		}
	}

	.benchmarking_text p {
		font-family: var(--font-body);
		font-size: 1.15rem;
		color: #2c2c2c;
		line-height: 1.85;
		max-width: 720px;
		margin: 0;
	}

	.aaccup_card {
		background: linear-gradient(180deg, #FAC549 0%, #CA8106 100%);
		border-radius: 20px;
		padding: 1.75rem 2rem;
		text-align: center;
		width: 380px;
		height: 250px;
		box-shadow: 0 8px 24px rgba(202, 129, 6, 0.15);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.4rem;
		box-sizing: border-box;
	}

	@media (max-width: 900px) {
		.aaccup_card {
			width: 100%;
			max-width: 380px;
			margin: 0 auto;
		}
	}

	:global(.aaccup_icon) {
		color: #ffffff;
		margin-bottom: 0.25rem;
	}

	.aaccup_level {
		font-family: var(--font-heading);
		font-size: 1.6rem;
		font-weight: 800;
		color: #1a1a1a;
		margin: 0;
		letter-spacing: 0.05em;
	}

	.aaccup_status_label {
		font-family: var(--font-body);
		font-size: 0.8rem;
		font-weight: 800;
		letter-spacing: 0.12em;
		color: #8c0f13;
		margin: 0;
		text-transform: uppercase;
	}

	.aaccup_divider {
		border: none;
		border-top: 1px solid rgba(140, 15, 19, 0.25);
		width: 60px;
		margin: 0.4rem 0;
	}

	.aaccup_sub {
		font-family: var(--font-body);
		font-size: 0.9rem;
		font-style: italic;
		color: #1a1a1a;
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
		gap: 3rem; /* Expanded for better breathing room on desktop */
	}

	@media (max-width: 760px) {
		.support_grid {
			grid-template-columns: 1fr;
			gap: 2rem;
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
		padding: 2rem; /* Expanded from 1.75rem for premium feel */
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
		padding: 2rem; /* Expanded padding */
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
		padding: 2rem; /* Expanded padding */
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
		gap: 1.5rem; /* Expanded from 1.25rem for alignment with rankings grid */
	}

	@media (max-width: 760px) {
		.process_cards_grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 1.25rem;
		}
	}

	@media (max-width: 460px) {
		.process_cards_grid {
			grid-template-columns: 1fr;
		}
	}

	.process_card {
		border: 1.5px solid rgba(140, 15, 19, 0.28); /* Red/maroon thin borders matching figma */
		border-radius: 10px; /* Tighter matching figma */
		padding: 2.25rem 1.5rem;
		text-align: center;
		background: #fff;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.85rem;
		min-height: 330px; /* Tall portrait rectangular shape */
		box-sizing: border-box;
		transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
		cursor: default;
	}

	.process_card:hover {
		transform: translateY(-4px);
		border-color: var(--color-gold);
		box-shadow: 0 8px 24px rgba(207, 168, 58, 0.15);
	}

	.process_divider {
		border: none;
		border-top: 1.5px solid rgba(140, 15, 19, 0.18);
		width: 45px;
		margin: 0.4rem auto;
	}

	.process_icon_wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 0.5rem; /* Clean white card backgrounds, no background circle behind icons */
	}

	:global(.process_icon) {
		color: var(--color-maroon);
	}

	.process_card_title {
		font-family: var(--font-heading); /* Overpass */
		font-size: 2rem; /* 32px matching Figma specification */
		font-weight: 600; /* SemiBold matching Figma specification */
		color: #941518; /* Maroon color matching Figma specification */
		margin: 0;
		line-height: 1; /* 100% line-height matching Figma specification */
		letter-spacing: 0.04em; /* 4% letter-spacing matching Figma specification */
		text-align: center;
	}

	.process_card_desc {
		font-family: var(--font-body);
		font-size: 0.85rem; /* Matching figma */
		color: #444;
		line-height: 1.6;
		margin: 0.5rem 0 0 0;
	}

	/* ── PHOTO STRIP ── */
	.photo_strip {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		height: 260px;
		overflow: hidden;
		margin: 0; /* Let it sit perfectly flush between process and rankings sections */
	}

	@media (max-width: 768px) {
		.photo_strip {
			grid-template-columns: repeat(2, 1fr);
			height: 520px;
		}
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

	/* Target center/crop focus to show the humans clearly */
	.img_pos_1 {
		object-position: center 20%;
	}

	.img_pos_2 {
		object-position: center 30%;
	}

	.img_pos_3 {
		object-position: center 40%;
	}

	.img_pos_4 {
		object-position: center 25%;
	}

	/* ── RANKINGS SECTION ── */
	.rankings_grid {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 1.5rem; /* Expanded from 1.25rem */
		align-items: stretch;
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
		border-radius: 20px;
		padding: 1.75rem 1.5rem;
		border: 1.5px dashed rgba(180, 150, 80, 0.35);
		background: #fff;
		box-sizing: border-box;
	}

	/* QS Stars card */
	.qs_card {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.qs_header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 0.5rem;
	}

	.qs_logo_row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	:global(.qs_logo_icon) {
		color: #8c0f13;
		flex-shrink: 0;
	}

	.qs_org {
		font-family: var(--font-body);
		font-size: 0.95rem;
		font-weight: 800;
		color: #1a1a1a;
	}

	.qs_stars_row {
		display: flex;
		gap: 3px;
	}

	.qs_rating_title {
		font-family: var(--font-heading);
		font-size: 1.15rem;
		font-weight: 800;
		color: #8c0f13;
		margin: 0;
	}

	.qs_rating_desc {
		font-family: var(--font-body);
		font-size: 0.82rem;
		color: #444;
		line-height: 1.55;
		margin: 0;
	}

	.qs_category_grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.6rem;
		margin-top: 0.25rem;
	}

	.qs_cat_tile {
		background: #8c0f13;
		border-radius: 10px;
		padding: 0.85rem 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}

	.qs_cat_stars {
		font-family: var(--font-heading);
		font-size: 1.3rem;
		font-weight: 900;
		color: #fff;
		line-height: 1.1;
	}

	.qs_cat_label {
		font-family: var(--font-body);
		font-size: 0.72rem;
		color: #fac549;
		font-style: italic;
		font-weight: 600;
	}

	.qs_validated_row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--font-body);
		font-size: 0.82rem;
		font-weight: 700;
		color: #8c0f13;
		padding-top: 1rem;
		border-top: 1.5px solid rgba(0, 0, 0, 0.08);
		margin-top: auto;
	}

	:global(.validated_icon_circle) {
		fill: #8c0f13;
		color: #ffffff;
		flex-shrink: 0;
	}

	/* WURI card */
	.wuri_card {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.wuri_header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 0.25rem;
	}

	.wuri_title {
		font-family: var(--font-heading);
		font-size: 1.2rem;
		font-weight: 900;
		color: #1a1a1a;
		margin: 0;
		line-height: 1.25;
	}

	.wuri_world_rank {
		text-align: right;
		white-space: nowrap;
	}

	.wuri_rank_label {
		display: block;
		font-size: 0.6rem;
		color: #888;
		font-family: var(--font-body);
	}

	.wuri_rank_num {
		font-family: var(--font-heading);
		font-size: 1.25rem;
		font-weight: 900;
		color: #8c0f13;
	}

	.wuri_desc {
		font-family: var(--font-body);
		font-size: 0.82rem;
		color: #444;
		line-height: 1.55;
		margin: 0;
	}

	.wuri_divider {
		border: none;
		border-top: 1.5px solid rgba(0, 0, 0, 0.08);
		margin: 0.25rem 0;
	}

	.wuri_rankings_list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-top: auto;
	}

	.wuri_rank_item {
		display: flex;
		align-items: center;
		gap: 0.85rem;
	}

	.wuri_rank_badge {
		background: #8c0f13;
		color: #fff;
		font-family: var(--font-heading);
		font-size: 1.2rem;
		font-weight: 900;
		border-radius: 6px;
		width: 48px;
		height: 42px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		box-sizing: border-box;
	}

	.wuri_rank_details {
		display: flex;
		flex-direction: column;
		gap: 5px;
		flex-grow: 1;
	}

	.wuri_rank_text {
		font-family: var(--font-body);
		font-size: 0.78rem;
		color: #1a1a1a;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.02em;
		line-height: 1.2;
	}

	.wuri_progress_track {
		width: 100%;
		height: 3px;
		background: #EAE5DB;
		border-radius: 2px;
		overflow: hidden;
	}

	.wuri_progress_bar {
		height: 100%;
		background: linear-gradient(90deg, #ca8106 0%, #fac549 100%);
		border-radius: 2px;
	}

	/* Impact + AUN column */
	.impact_column {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.impact_card {
		background: linear-gradient(180deg, #451516 0%, #1A1614 65%, #392E1F 100%);
		border: none;
		color: #fff;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-sizing: border-box;
		border-radius: 20px;
		padding: 1.75rem 1.5rem;
	}

	.impact_label {
		font-family: var(--font-body);
		font-size: 0.75rem;
		color: rgba(255, 255, 255, 0.6);
		margin: 0 0 0.35rem 0;
		letter-spacing: 0.05em;
	}

	.impact_number {
		font-family: var(--font-heading);
		font-size: 3.5rem;
		font-weight: 900;
		color: #fff;
		margin: 0 0 0.5rem 0;
		line-height: 1;
	}

	.impact_desc {
		font-family: var(--font-body);
		font-size: 0.82rem;
		color: rgba(255, 255, 255, 0.75);
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
		width: 44px;
		height: 44px;
		border-radius: 6px;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: transform 0.2s ease;
		user-select: none;
	}

	.sdg_badge:hover {
		transform: scale(1.08);
		z-index: 20;
	}

	.sdg_num {
		font-family: var(--font-heading);
		font-size: 0.95rem;
		font-weight: 900;
		color: #fff;
	}

	.sdg_tooltip {
		position: absolute;
		top: calc(100% + 12px);
		left: 50%;
		transform: translateX(-50%);
		background: #fff;
		border-radius: 8px;
		padding: 0.5rem 0.85rem;
		width: 170px;
		box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
		display: flex;
		align-items: center;
		justify-content: space-between;
		z-index: 100;
		pointer-events: none;
	}

	/* Arrow pointing up */
	.sdg_tooltip::after {
		content: '';
		position: absolute;
		bottom: 100%;
		left: 50%;
		transform: translateX(-50%);
		border: 8px solid transparent;
		border-bottom-color: #fff;
	}

	.sdg_tooltip_left {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		line-height: 1.1;
	}

	.sdg_tooltip_title {
		font-family: var(--font-body);
		font-size: 0.6rem;
		font-weight: 800;
		color: #555;
		letter-spacing: 0.05em;
		margin: 0;
	}

	.sdg_tooltip_num {
		font-family: var(--font-heading);
		font-size: 1.25rem;
		font-weight: 800;
		margin: 1px 0 0 0;
	}

	.sdg_tooltip_right {
		display: flex;
		align-items: center;
	}

	.sdg_tooltip_range {
		font-family: var(--font-body);
		font-size: 1.1rem;
		font-weight: 700;
		color: #1a1a1a;
		letter-spacing: -0.02em;
		white-space: nowrap;
	}

	.aunqa_card {
		background: linear-gradient(180deg, #FAC549 0%, #CA8106 100%);
		border: none;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		box-shadow: 0 6px 24px rgba(202, 129, 6, 0.2);
		justify-content: center;
		box-sizing: border-box;
		border-radius: 20px;
		padding: 1.75rem 1.5rem;
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
