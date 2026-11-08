<script>
	import {
		Globe,
		Flag,
		BadgeCheck,
		Workflow,
		PenLine,
		FileText,
		Briefcase,
		Plane,
		Share2,
		CheckCircle2
	} from 'lucide-svelte';
	import Footer from '$lib/components/footer.svelte';
	import '$lib/styles/accreditation-pages.css';
	let videoPlaying = $state(false);

	/**
	 * @typedef {1 | 2 | 4 | 17} SdgId
	 * @typedef {{ label: string; color: string; range: string }} SdgInfo
	 */

	// SDG data for hover cards
	/** @type {Record<SdgId, SdgInfo>} */
	const sdgData = {
		1: {
			label: 'No Poverty',
			color: 'var(--c-gold-light)',
			range: '43.6 - 52.7'
		},
		2: {
			label: 'Zero Hunger',
			color: 'var(--c-gold-dark)',
			range: '13.7 - 40.9'
		},
		4: {
			label: 'Quality Education',
			color: 'var(--c-maroon)',
			range: '25.7 - 44.1'
		},
		17: {
			label: 'Partnerships for the Goals',
			color: 'var(--c-maroon-deep)',
			range: '36.9 - 52.8'
		}
	};

	/** @type {SdgId | null} */
	let hoveredSdg = $state(null);

	const qsCategories = [
		{ stars: 5, label: 'Employability' },
		{ stars: 5, label: 'Online Learning' },
		{ stars: 5, label: 'Academic Dev.' },
		{ stars: 4, label: 'Facilities' }
	];

	/** @type {SdgId[]} */
	const sdgIds = [1, 2, 4, 17];
</script>

<svelte:head>
	<title>Planning & Quality Assurance | DIT-PUP</title>
	<meta
		name="description"
		content="Explore DIT-PUP's Planning and Quality Assurance initiatives, including international benchmarking, AACCUP accreditation, and institutional rankings."
	/>
</svelte:head>

<main class="assigned_page planning_page">
	<!-- ─────────────────────────────────────────────
  HERO SECTION
───────────────────────────────────────────── -->
	<section class="hero_section">
		<div class="checkerboard_bg" aria-hidden="true"></div>
		<div class="hero_content">
			<h1 class="t_display hero_title">PLANNING &amp; QUALITY<br />ASSURANCE</h1>
		</div>
	</section>

	<!-- ─────────────────────────────────────────────
  SECTION 1: STRATEGIC INTERNATIONAL BENCHMARKING
───────────────────────────────────────────── -->
	<section class="content_section" id="strategic-benchmarking">
		<div class="section_label">
			<Globe size={26} strokeWidth={1.5} class="section_icon maroon" />
			<span class="t_eyebrow">STRATEGIC INTERNATIONAL BENCHMARKING</span>
		</div>
		<hr class="section_divider" />

		<div class="benchmarking_grid">
			<div class="benchmarking_text">
				<p>
					The Bachelor of Science in Information Technology (BSIT) program benefits directly from
					active engagement in internationally recognized higher education ranking systems and
					regional quality networks. These external validations ensure the curriculum remains
					comparable with global computing education standards.
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
			<Flag size={26} strokeWidth={1.5} class="section_icon maroon" />
			<span class="t_eyebrow">UNIVERSITY SUPPORT FUNCTIONS</span>
		</div>
		<hr class="section_divider" />

		<!-- Video embed -->
		<div class="video_wrapper">
			<div class="video_screen">
				{#if videoPlaying}
					<iframe
						src="https://www.youtube.com/embed/Lp_x4dWvLs4?autoplay=1"
						title="University Support Functions Video"
						class="video_iframe"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowfullscreen
					></iframe>
				{:else}
					<button
						class="video_preview"
						type="button"
						aria-label="Play University Support Functions video"
						onclick={() => (videoPlaying = true)}
					>
						<img
							src="/planning/figma/video-preview.jpg"
							alt="University development and infrastructure"
							loading="lazy"
						/>
						<span class="play_button"
							><svg
								width="30"
								height="30"
								viewBox="0 0 24 24"
								fill="currentColor"
								aria-hidden="true"><path d="M8 4v16l13-8z" /></svg
							></span
						>
					</button>
				{/if}
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
							<span class="priority_text"
								>Academic Program Development &amp; Internationalization</span
							>
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
				<div class="report_status">
					<a class="report-button" href="https://bit.ly/ITL4Area5" target="_blank" rel="noopener noreferrer">
						<FileText size={20} />Narrative Report
					</a>
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
			<Workflow size={26} strokeWidth={1.5} class="section_icon maroon" />
			<span class="t_eyebrow">DEPARTMENT-LEVEL PROCESS</span>
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
				<p class="process_card_desc">Regular updates for industry and government sensitivity.</p>
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
		<div class="photo_strip_item">
			<img
				src="/planning/figma/photo-strip-1.jpg"
				alt="Students and faculty in an IT laboratory setting"
				class="strip_photo img_pos_1"
			/>
		</div>
		<div class="photo_strip_item">
			<img
				src="/planning/figma/photo-strip-2.jpg"
				alt="Students listening to a presentation on Converge ICT Solutions"
				class="strip_photo img_pos_2"
			/>
		</div>
		<div class="photo_strip_item">
			<img
				src="/planning/figma/photo-strip-3.jpg"
				alt="Faculty and staff group with Banua Palawan tribe members"
				class="strip_photo img_pos_3"
			/>
		</div>
		<div class="photo_strip_item">
			<img
				src="/planning/figma/photo-strip-4.jpg"
				alt="Department faculty meeting and planning session"
				class="strip_photo img_pos_4"
			/>
		</div>
	</div>

	<!-- ─────────────────────────────────────────────
  SECTION 4: VERIFIED INTERNATIONAL RANKINGS
───────────────────────────────────────────── -->
	<section class="content_section" id="rankings">
		<div class="section_label">
			<BadgeCheck size={26} strokeWidth={1.5} class="section_icon maroon" />
			<span class="t_eyebrow">VERIFIED INTERNATIONAL RANKINGS &amp; INSTITUTIONAL IMPACT</span>
		</div>
		<hr class="section_divider" />

		<div class="rankings_grid">
			<!-- QS Stars card -->
			<div class="ranking_card qs_card">
				<div class="qs_header">
					<img src="/planning/figma/qs-stars.png" alt="QS Stars" class="qs_logo_img" />
					<div class="qs_rating_crop">
						<img src="/planning/figma/qs-rating.png" alt="3 Stars" class="qs_stars_box_img" />
					</div>
				</div>

				<h3 class="qs_rating_title">3-Star Overall Rating</h3>
				<p class="qs_rating_desc">
					QS Stars University Rating System alignment with global computing education standards.
				</p>

				<div class="qs_category_grid">
					{#each qsCategories as cat (cat.label)}
						<div class="qs_cat_tile">
							<span class="qs_cat_stars">{cat.stars} <span>stars</span></span>
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
					<div class="wuri_logo_crop">
						<img src="/planning/figma/wuri.png" alt="WURI" class="wuri_logo_img" />
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
						{#each sdgIds as id (id)}
							<button
								type="button"
								class="sdg_badge"
								style="background-color: {sdgData[id].color};"
								onmouseenter={() => (hoveredSdg = id)}
								onmouseleave={() => (hoveredSdg = null)}
								aria-label="SDG {id}: {sdgData[id].label}"
								onfocus={() => (hoveredSdg = id)}
								onblur={() => (hoveredSdg = null)}
								onclick={() => (hoveredSdg = hoveredSdg === id ? null : id)}
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
							</button>
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
</main>

<Footer />

<style>
	.report_status {
		display: flex;
		align-items: center;
		gap: 18px;
		font-size: 14px;
		color: var(--c-maroon);
	}
	.report_status a {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 16px 24px;
		border: 1px solid transparent;
	}
	.wuri_logo_crop {
		position: relative;
		width: 54%;
		aspect-ratio: 278 / 102;
		overflow: hidden;
	}
	.qs_cat_stars span {
		font-size: 0.68em;
	}

	.hero_title {
		max-width: 1811px;
		font-size: clamp(38px, 6.77vw, 130px);
		line-height: 1.15;
		background-image: linear-gradient(127deg, #000, #901518);
	}
	#strategic-benchmarking {
		padding-top: clamp(65px, 5.36vw, 103px);
		display: grid;
		grid-template-columns: 1143fr 434fr;
		column-gap: clamp(40px, 6.2vw, 119px);
		align-items: start;
	}
	#strategic-benchmarking .section_label {
		grid-column: 1;
	}
	#strategic-benchmarking .section_divider {
		grid-column: 1;
		margin-bottom: clamp(25px, 2.6vw, 50px);
	}
	.benchmarking_grid {
		display: contents;
	}
	.benchmarking_text {
		grid-column: 1;
	}
	.benchmarking_text p {
		margin: 0;
	}
	.aaccup_card {
		grid-column: 2;
		grid-row: 1 / 4;
		border-radius: 25px;
		background: linear-gradient(104deg, #fac549, #ca8106);
		text-align: center;
		padding: clamp(25px, 2.6vw, 50px) 20px;
	}
	.aaccup_card :global(svg) {
		color: white;
		width: clamp(40px, 3.125vw, 60px);
		height: clamp(40px, 3.125vw, 60px);
		margin: 0 auto 16px;
	}
	.aaccup_level {
		font-size: clamp(17px, 1.25vw, 24px);
		font-weight: 700;
		letter-spacing: 0.27em;
		margin: 0 0 12px;
	}
	.aaccup_status_label {
		color: var(--c-maroon);
		font-size: clamp(17px, 1.25vw, 24px);
		margin: 0;
	}
	.aaccup_divider {
		border: 0;
		border-top: 1px solid #222;
		margin: 18px 0;
	}
	.aaccup_sub {
		font-size: clamp(16px, 1.25vw, 24px);
		font-style: italic;
		margin: 0;
	}
	.video_wrapper {
		width: 79.4%;
		margin: 0 auto clamp(45px, 4.167vw, 80px);
		padding: clamp(24px, 2.656vw, 51px);
		border-radius: 25px;
		background: var(--panel-maroon);
	}
	.video_screen {
		aspect-ratio: 1241 / 590;
		position: relative;
		overflow: hidden;
		border-radius: 10px;
	}
	.video_iframe {
		width: 100%;
		height: 100%;
		border: 0;
	}
	.video_preview {
		width: 100%;
		height: 100%;
		border: 0;
		padding: 0;
		cursor: pointer;
		display: grid;
		place-items: center;
		background: #eee;
	}
	.video_preview img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.play_button {
		position: relative;
		width: clamp(50px, 4.167vw, 80px);
		height: clamp(50px, 4.167vw, 80px);
		display: grid;
		place-items: center;
		color: var(--c-maroon);
		background: #fffc;
		border-radius: 50%;
		box-shadow: 0 4px 20px #0002;
	}
	.support_grid {
		display: grid;
		grid-template-columns: 872fr 772fr;
		gap: clamp(26px, 2.344vw, 45px);
	}
	.support_left {
		display: flex;
		flex-direction: column;
		gap: clamp(25px, 2.344vw, 45px);
	}
	.priority_card {
		border: 2px solid var(--c-gold);
		border-radius: 25px;
		padding: clamp(28px, 3.073vw, 59px);
		flex: 1;
	}
	.priority_card_title {
		color: var(--c-maroon);
		margin: 0 0 clamp(28px, 3.125vw, 60px);
		font: 700 clamp(24px, 2.083vw, 40px)/1.25 var(--font-heading);
		letter-spacing: 0.04em;
	}
	.priority_list {
		padding: 0;
		margin: 0;
		list-style: none;
	}
	.priority_item {
		display: flex;
		gap: clamp(20px, 2.083vw, 40px);
		align-items: center;
		padding: clamp(20px, 1.667vw, 32px) 0;
		border-bottom: 1px solid #ddd;
	}
	.priority_item:first-child {
		padding-top: 0;
	}
	.priority_item.last {
		border: 0;
		padding-bottom: 0;
	}
	.priority_num {
		color: var(--c-gold-dark);
		font-size: clamp(20px, 1.458vw, 28px);
		font-weight: 700;
	}
	.core_functions_card {
		border-radius: 25px;
		padding: clamp(28px, 2.76vw, 53px);
		background: linear-gradient(105deg, #fac549, #ca8106);
	}
	.core_functions_title {
		margin: 0 0 clamp(25px, 2.083vw, 40px);
		color: #000;
		font: 700 clamp(22px, 1.667vw, 32px)/1.3 var(--font-heading);
	}
	.functions_grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: clamp(16px, 1.354vw, 26px);
	}
	.function_pill {
		padding: 18px 20px;
		background: white;
		border-left: 6px solid var(--c-maroon);
		border-radius: 10px;
		font-size: clamp(13px, 1.042vw, 20px);
		color: var(--c-maroon);
	}
	.support_feed {
		background: var(--panel-maroon);
		padding: clamp(30px, 3.646vw, 70px);
		border-radius: 25px;
	}
	.feed_header {
		display: flex;
		align-items: center;
		gap: 15px;
		color: var(--c-gold-light);
		margin-bottom: clamp(32px, 3.125vw, 60px);
	}
	.feed_header :global(svg) {
		display: none;
	}
	.feed_title {
		margin: 0;
		font: 700 clamp(21px, 1.667vw, 32px)/1.3 var(--font-heading);
	}
	.feed_cards {
		display: grid;
		gap: clamp(25px, 2.188vw, 42px);
	}
	.feed_card {
		background: white;
		border-radius: 10px;
		padding: clamp(25px, 2.083vw, 40px);
	}
	.feed_card_title {
		margin: 0 0 20px;
		color: var(--c-gold-dark);
		font: 700 clamp(20px, 1.458vw, 28px)/1.3 var(--font-heading);
	}
	.feed_card_desc {
		margin: 0;
		line-height: 1.3;
	}
	.process_cards_grid {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: clamp(22px, 2.292vw, 44px);
	}
	.process_card {
		padding: clamp(25px, 2.188vw, 42px);
		border: 2px solid var(--c-maroon);
		border-radius: 25px;
		box-shadow: 4px 6px 9px #94151830;
	}
	.process_card:nth-child(even) {
		border-color: var(--c-gold);
		box-shadow: 4px 6px 9px #ca810630;
	}
	.process_icon_wrapper {
		margin-bottom: clamp(24px, 2.083vw, 40px);
	}
	.process_icon_wrapper :global(svg) {
		width: clamp(50px, 5vw, 96px);
		height: clamp(50px, 5vw, 96px);
		color: var(--c-maroon);
	}
	.process_card_title {
		min-height: 2.6em;
		margin: 0;
		color: var(--c-maroon);
		font: 700 clamp(20px, 1.667vw, 32px)/1.3 var(--font-heading);
	}
	.process_divider {
		border: 0;
		border-top: 1px solid #888;
		margin: 22px 0;
	}
	.process_card_desc {
		margin: 0;
	}
	.photo_strip {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		height: clamp(160px, 21.927vw, 421px);
		margin: 0 auto clamp(35px, 3.125vw, 60px);
		max-width: 1920px;
		overflow: hidden;
	}
	.photo_strip_item {
		min-width: 0;
		overflow: hidden;
	}
	.strip_photo {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.rankings_grid {
		display: grid;
		grid-template-columns: 613fr 603fr 393fr;
		gap: clamp(22px, 2.135vw, 41px);
		align-items: start;
	}
	.ranking_card {
		border: 2px solid var(--c-gold);
		border-radius: 25px;
		padding: clamp(24px, 2.083vw, 40px);
	}
	.qs_header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 20px;
		margin-bottom: clamp(25px, 2.604vw, 50px);
	}
	.qs_logo_img {
		width: 40%;
		height: auto;
	}
	.qs_rating_crop {
		position: relative;
		width: 34%;
		aspect-ratio: 172 / 61;
		overflow: hidden;
	}
	.qs_stars_box_img {
		position: absolute;
		max-width: none;
		width: 292.84%;
		height: 579.9%;
		left: -63.58%;
		top: -180.41%;
	}
	.qs_rating_title {
		color: var(--c-gold-dark);
		font: 700 clamp(22px, 1.667vw, 32px)/1.3 var(--font-heading);
		margin: 0 0 22px;
	}
	.qs_rating_desc {
		margin: 0 0 clamp(35px, 3.646vw, 70px);
	}
	.qs_category_grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: clamp(18px, 1.771vw, 34px);
	}
	.qs_cat_tile {
		background: var(--panel-maroon);
		border-radius: 10px;
		padding: clamp(22px, 1.563vw, 30px) 10px;
		text-align: center;
	}
	.qs_cat_stars {
		display: block;
		font: 700 clamp(26px, 3.125vw, 60px)/1.2 var(--font-heading);
		color: white;
		white-space: nowrap;
	}
	.qs_cat_label {
		display: block;
		color: var(--c-gold-light);
		font-size: clamp(13px, 1.25vw, 24px);
		font-style: italic;
	}
	.qs_validated_row {
		border-top: 1px solid #888;
		padding-top: clamp(25px, 2.6vw, 50px);
		display: flex;
		align-items: center;
		gap: 15px;
		color: var(--c-maroon);
		margin-top: clamp(30px, 3.125vw, 60px);
		font-size: clamp(14px, 1.25vw, 24px);
	}
	.qs_validated_row :global(svg) {
		flex: 0 0 auto;
		width: 28px;
		height: 28px;
	}
	.wuri_header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
		margin-bottom: 26px;
	}
	.wuri_logo_img {
		position: absolute;
		max-width: none;
		width: 112.94%;
		height: 383.52%;
		left: -12.94%;
		top: -145.74%;
	}
	.wuri_world_rank {
		text-align: right;
	}
	.wuri_rank_label {
		display: block;
		font-size: clamp(14px, 1.146vw, 22px);
	}
	.wuri_rank_num {
		display: block;
		color: var(--c-gold-dark);
		font: 700 clamp(24px, 1.875vw, 36px)/1.2 var(--font-heading);
	}
	.wuri_desc {
		margin: 0;
	}
	.wuri_divider {
		border: 0;
		border-top: 1px solid #888;
		margin: clamp(25px, 2.604vw, 50px) 0;
	}
	.wuri_rankings_list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: clamp(30px, 2.604vw, 50px);
	}
	.wuri_rank_item {
		display: flex;
		align-items: center;
		gap: clamp(20px, 1.979vw, 38px);
	}
	.wuri_rank_badge {
		display: grid;
		place-items: center;
		width: clamp(56px, 4.688vw, 90px);
		height: clamp(56px, 4.688vw, 90px);
		background: var(--c-maroon);
		color: white;
		border-radius: 0;
		flex: 0 0 auto;
		font: 700 clamp(28px, 2.5vw, 48px)/1 var(--font-heading);
	}
	.wuri_rank_details {
		flex: 1;
	}
	.wuri_rank_text {
		text-transform: uppercase;
		font-family: var(--font-heading);
		font-size: clamp(15px, 1.25vw, 24px);
	}
	.wuri_progress_track {
		height: 7px;
		background: #f4e6c9;
		border-radius: 5px;
		margin-top: 15px;
	}
	.wuri_progress_bar {
		height: 100%;
		border-radius: inherit;
		background: var(--c-gold-dark);
	}
	.impact_column {
		display: grid;
		gap: clamp(28px, 2.083vw, 40px);
	}
	.impact_card {
		border: 0;
		background: var(--panel-maroon);
		color: white;
		text-align: left;
		padding: clamp(24px, 1.875vw, 36px);
	}
	.impact_label {
		margin: 0 0 30px;
		font: 400 clamp(14px, 0.833vw, 16px)/1.3 var(--font-body);
	}
	.impact_number {
		color: var(--c-gold-light);
		font: 700 clamp(46px, 4.167vw, 80px)/1.2 var(--font-heading);
		margin: 0 0 24px;
	}
	.impact_desc {
		font-size: clamp(14px, 1.042vw, 20px);
		margin: 0 0 32px;
	}
	.sdg_badges_row {
		display: flex;
		justify-content: center;
		gap: 12px;
	}
	.sdg_badge {
		position: relative;
		border: 0;
		padding: 0;
		color: white;
		width: clamp(34px, 2.5vw, 48px);
		height: clamp(34px, 2.5vw, 48px);
		border-radius: 3px;
		cursor: pointer;
		display: grid;
		place-items: center;
	}
	.sdg_num {
		font-size: clamp(16px, 1.25vw, 24px);
		font-weight: 700;
	}
	.sdg_tooltip {
		position: absolute;
		bottom: calc(100% + 12px);
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		align-items: center;
		gap: 22px;
		width: 205px;
		padding: 20px;
		background: white;
		border: 1px solid var(--c-gold);
		box-shadow: 0 8px 20px #0002;
		border-radius: 12px;
		color: #111;
		z-index: 5;
	}
	.sdg_tooltip_left {
		display: grid;
	}
	.sdg_tooltip_title {
		font-size: 15px;
	}
	.sdg_tooltip_num {
		font-size: 36px;
		font-weight: 700;
	}
	.sdg_tooltip_range {
		font-size: 18px;
	}
	.aunqa_card {
		border: 0;
		background: linear-gradient(106deg, #fac549, #ca8106);
		color: #000;
	}
	.aunqa_header {
		display: flex;
		gap: 14px;
		align-items: center;
		margin-bottom: 24px;
	}
	.aunqa_header :global(svg) {
		flex: 0 0 auto;
		width: 30px;
		height: 30px;
		color: var(--c-maroon);
	}
	.aunqa_title {
		color: var(--c-maroon);
		font: 700 clamp(21px, 1.667vw, 32px)/1.3 var(--font-heading);
		margin: 0;
	}
	.aunqa_desc {
		font-size: clamp(14px, 1.042vw, 20px);
		margin: 0;
	}
	@media (max-width: 1000px) {
		.rankings_grid {
			grid-template-columns: 1fr 1fr;
		}
		.impact_column {
			grid-column: 1 / -1;
			grid-template-columns: 1fr 1fr;
		}
		.process_cards_grid {
			grid-template-columns: 1fr 1fr;
		}
		.support_feed {
			padding: 28px;
		}
	}
	@media (max-width: 700px) {
		.hero_title {
			font-size: clamp(32px, 6.77vw, 48px);
			padding: 0 15px;
		}
		#strategic-benchmarking {
			display: block;
		}
		.aaccup_card {
			margin-top: 30px;
		}
		.video_wrapper {
			width: 100%;
			padding: 20px;
		}
		.support_grid {
			grid-template-columns: 1fr;
		}
		.photo_strip {
			grid-template-columns: 1fr 1fr;
			height: 320px;
		}
		.rankings_grid {
			grid-template-columns: 1fr;
		}
		.impact_column {
			grid-template-columns: 1fr;
		}
		.qs_cat_stars {
			font-size: 36px;
		}
		.qs_cat_label {
			font-size: 16px;
		}
		.priority_item {
			font-size: 15px;
		}
	}
	@media (max-width: 420px) {
		.process_cards_grid {
			gap: 15px;
		}
		.process_card {
			padding: 20px 16px;
		}
		.process_card_title {
			font-size: 17px;
		}
		.functions_grid {
			grid-template-columns: 1fr;
		}
	}
</style>
