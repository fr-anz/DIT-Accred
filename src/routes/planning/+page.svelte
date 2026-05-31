<script lang="ts">
	import { 
		FileText,
		BookOpen,
		Users,
		Globe
	} from 'lucide-svelte';
	import RankingCards from '$lib/components/ranking_cards.svelte';
</script>

<svelte:head>
	<title>Planning & Quality Assurance | DIT Accreditation</title>
	<meta name="description" content="Department of Information Technology Planning & Quality Assurance Portal. External benchmarking, AACCUP status, and Document Tracking System workflows." />
</svelte:head>

<div class="planning_layout">
	<!-- Hero Section -->
	<section class="hero_section">
		<div class="hero_grid_background"></div>
		<div class="hero_content">
			<h1 class="hero_title font_serif">PLANNING & QUALITY ASSURANCE</h1>
		</div>
	</section>

	<div class="container_wrapper">
		<!-- Section: Strategic International Benchmarking -->
		<section class="benchmarking_section">
			<div class="section_header_bar">
				<span class="square_icon gold_bg"></span>
				<h2 class="section_title font_serif">STRATEGIC INTERNATIONAL BENCHMARKING</h2>
			</div>

			<div class="benchmarking_grid">
				<div class="benchmarking_text_col">
					<p class="benchmarking_intro">
						The Bachelor of Science in Information Technology (BSIT) program benefits directly from active engagement in internationally recognized higher education ranking systems and regional quality networks. These external validations ensure the curriculum remains comparable with global computing education standards.
					</p>
				</div>
				
				<!-- AACCUP Status Box -->
				<div class="aaccup_status_card">
					<span class="square_icon bg_maroon"></span>
					<div class="aaccup_badge_title">LEVEL IV</div>
					<h3 class="aaccup_main_status font_serif">AACCUP STATUS</h3>
					<div class="card_thin_line"></div>
					<p class="aaccup_status_sub">On-going Application</p>
				</div>
			</div>
		</section>

		<!-- Section: University Support Functions -->
		<section class="support_section">
			<div class="section_header_bar">
				<span class="square_icon gold_bg"></span>
				<h2 class="section_title font_serif">UNIVERSITY SUPPORT FUNCTIONS</h2>
			</div>

			<!-- University Support Functions Showcase Frame -->
			<div class="display_mock_frame">
				<div class="display_mock_screen">
					<!-- Checkerboard Pattern Background representing the Figma graphic -->
					<div class="screen_checkerboard"></div>
					
					<!-- Play Overlay representing the Supposed Video/Image player -->
					<div class="screen_video_overlay">
						<button class="play_button" aria-label="Play Walkthrough Video">
							<!-- Play Icon SVG -->
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#5c0f16" stroke="#5c0f16" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="play_icon_svg"><polygon points="6 3 20 12 6 21 6 3"/></svg>
						</button>
						<div class="video_info_text">
							<h3 class="video_title font_sans">UNIVERSITY SUPPORT PORTALS</h3>
							<p class="video_subtitle font_sans">Watch SINTA & Document Workflows walk-through (3:45)</p>
						</div>
					</div>

					<!-- Video Progress/Control Bar at the bottom -->
					<div class="video_control_bar">
						<span class="control_icon">▶</span>
						<div class="video_timeline_track">
							<span class="video_timeline_progress"></span>
						</div>
						<span class="control_time font_mono">0:00 / 3:45</span>
						<span class="control_icon">⛶</span>
					</div>
				</div>
			</div>

			<!-- Core Priorities and Support Feed Block -->
			<div class="support_grid">
				<!-- Left Area: Priorities & Core Functions -->
				<div class="priorities_left_col">
					<!-- Priority Card -->
					<div class="priority_card">
						<h3 class="priority_title font_serif">STRATEGIC PRIORITY</h3>
						<div class="priority_list">
							<div class="priority_item">
								<span class="priority_num">01</span>
								<p class="priority_text">Academic Program Development & Internationalization</p>
							</div>
							<div class="priority_item">
								<span class="priority_num">02</span>
								<p class="priority_text">Human Resource Development</p>
							</div>
							<div class="priority_item">
								<span class="priority_num">03</span>
								<p class="priority_text">Institutional-Level Quality Assurance</p>
							</div>
						</div>
					</div>

					<!-- Core Functions Card -->
					<div class="core_functions_card">
						<h3 class="core_functions_title">CORE FUNCTIONS</h3>
						
						<!-- Static Functions Grid -->
						<div class="functions_grid">
							<div class="function_item_block">
								<span class="function_text">Higher Education Programs</span>
							</div>
							<div class="function_item_block">
								<span class="function_text">Research Programs</span>
							</div>
							<div class="function_item_block">
								<span class="function_text">Extension & Tech Advisory</span>
							</div>
							<div class="function_item_block">
								<span class="function_text">Customer Satisfaction</span>
							</div>
						</div>
					</div>
				</div>

				<!-- Right Area: Support Feed -->
				<div class="support_feed_container">
					<div class="feed_header">
						<div class="feed_header_left">
							<span class="square_icon feed_square_icon"></span>
							<h3 class="feed_title">UNIVERSITY SUPPORT FEED</h3>
						</div>
					</div>

					<div class="feed_alerts_list">
						<div class="feed_alert_card">
							<h4 class="alert_card_title">Quality Assurance</h4>
							<p class="alert_card_desc">Training via QAC and UTLDO for syllabi development and accreditation monitoring.</p>
						</div>
						<div class="feed_alert_card">
							<h4 class="alert_card_title">Research & Faculty</h4>
							<p class="alert_card_desc">Incentives for research presentation and faculty development grants (FSD PHP 20,000).</p>
						</div>
						<div class="feed_alert_card">
							<h4 class="alert_card_title">Infrastructure</h4>
							<p class="alert_card_desc">PUP SINTA and Document Tracking System (DTS) for efficient request management.</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Section: Department-Level Process -->
		<section class="process_section">
			<div class="section_header_bar">
				<span class="square_icon gold_bg"></span>
				<h2 class="section_title font_serif">DEPARTMENT-LEVEL PROCESS</h2>
			</div>

			<div class="process_cards_grid">
				<!-- Card 1 -->
				<div class="process_card">
					<div class="process_icon_wrapper bg_maroon_light">
						<BookOpen size={24} class="process_icon" />
					</div>
					<h3 class="process_card_title font_serif font_maroon">Curriculum Revision</h3>
					<p class="process_card_desc">Based on CHED Memorandum Order No. 32 series of 2017.</p>
				</div>
				<!-- Card 2 -->
				<div class="process_card">
					<div class="process_icon_wrapper bg_maroon_light">
						<FileText size={24} class="process_icon" />
					</div>
					<h3 class="process_card_title font_serif font_maroon">Syllabi Prep</h3>
					<p class="process_card_desc">Regular updates for industry and government sensitivity.</p>
				</div>
				<!-- Card 3 -->
				<div class="process_card">
					<div class="process_icon_wrapper bg_maroon_light">
						<Users size={24} class="process_icon" />
					</div>
					<h3 class="process_card_title font_serif font_maroon">Internship</h3>
					<p class="process_card_desc">Established MOA with strategic industry partners.</p>
				</div>
				<!-- Card 4 -->
				<div class="process_card">
					<div class="process_icon_wrapper bg_maroon_light">
						<Globe size={24} class="process_icon" />
					</div>
					<h3 class="process_card_title font_serif font_maroon">International Affairs</h3>
					<p class="process_card_desc">Institutionalization of global partnerships and mobility.</p>
				</div>
			</div>
		</section>

		<!-- Section: Verified Rankings & Institutional Impact -->
		<section class="rankings_section">
			<div class="section_header_bar">
				<span class="square_icon gold_bg"></span>
				<h2 class="section_title font_serif">VERIFIED INTERNATIONAL RANKINGS & INSTITUTIONAL IMPACT</h2>
			</div>

			<RankingCards />
		</section>
	</div>
</div>

<style>
	/* Font variables fallback */
	.font_serif {
		font-family: 'Georgia', 'Times New Roman', serif;
	}

	.font_mono {
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
	}


	.font_maroon {
		color: #5c0f16;
	}

	/* Base Section Spacing */
	.planning_layout {
		background-color: #fcfbfa; /* Soft clean warm cream background */
		color: #2b2b2b;
		padding-bottom: 5rem;
		min-height: 100vh;
	}

	.container_wrapper {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 5rem;
	}

	/* Title Bar */
	.section_header_bar {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		border-bottom: 1px solid rgba(0, 0, 0, 0.08);
		padding-bottom: 0.75rem;
		margin-bottom: 2rem;
	}

	.square_icon {
		width: 12px;
		height: 12px;
		display: inline-block;
		flex-shrink: 0;
	}

	.gold_bg {
		background-color: #cfa83a;
	}

	.section_title {
		font-size: 1.15rem;
		font-weight: 700;
		color: #cfa83a;
		letter-spacing: 0.05em;
		margin: 0;
	}

	/* Hero Section Style */
	.hero_section {
		position: relative;
		height: 48vh;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
		background-color: #ffffff;
		border-bottom: 1px solid rgba(0, 0, 0, 0.05);
		margin-bottom: 3.5rem;
	}

	.hero_grid_background {
		position: absolute;
		inset: 0;
		opacity: 0.55;
		background-image: 
			linear-gradient(to right, #ecebe8 1px, transparent 1px),
			linear-gradient(to bottom, #ecebe8 1px, transparent 1px);
		background-size: 26px 26px;
		mask-image: radial-gradient(circle at center, black 60%, transparent 100%);
		-webkit-mask-image: radial-gradient(circle at center, black 60%, transparent 100%);
	}

	.hero_content {
		position: relative;
		z-index: 2;
		text-align: center;
		padding: 0 1.5rem;
	}

	.hero_title {
		font-size: clamp(1.8rem, 4vw, 3.2rem);
		font-weight: 800;
		color: #5c0f16;
		letter-spacing: -0.01em;
		margin: 0;
		line-height: 1.2;
		text-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
	}

	/* Benchmarking Grid */
	.benchmarking_grid {
		display: grid;
		grid-template-columns: 1.6fr 1fr;
		gap: 3rem;
		align-items: center;
	}

	@media (max-width: 768px) {
		.benchmarking_grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
	}

	.benchmarking_intro {
		font-size: 1.05rem;
		line-height: 1.7;
		color: #4a4a4a;
		margin: 0;
	}

	/* Status Box Card */
	.aaccup_status_card {
		background-color: #e5e3de; /* Grey card background from Figma */
		border-radius: 12px;
		padding: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
	}

	.aaccup_status_card .square_icon {
		width: 14px;
		height: 14px;
		margin-bottom: 0.75rem;
	}

	.bg_maroon {
		background-color: #5c0f16;
	}

	.aaccup_badge_title {
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.05em;
		color: #2b2b2b;
		margin-bottom: 0.25rem;
	}

	.aaccup_main_status {
		font-size: 1.25rem;
		font-weight: 800;
		color: #000000;
		margin: 0;
		letter-spacing: 0.04em;
	}

	.card_thin_line {
		width: 80px;
		height: 1px;
		background-color: rgba(0, 0, 0, 0.15);
		margin: 0.75rem 0;
	}

	.aaccup_status_sub {
		font-size: 0.8rem;
		font-style: italic;
		color: #4a4a4a;
		margin: 0;
	}

	/* Display monitor frame from figma */
	.display_mock_frame {
		background: linear-gradient(135deg, #2b1114 0%, #150809 100%); /* Dark maroon/black frame border */
		padding: 1.5rem;
		border-radius: 20px;
		box-shadow: 
			0 15px 35px rgba(0, 0, 0, 0.25),
			inset 0 2px 5px rgba(255, 255, 255, 0.15);
		width: 100%;
		aspect-ratio: 2.1 / 1;
		margin-bottom: 3.5rem;
		display: flex;
		position: relative;
	}

	.display_mock_screen {
		background-color: #ffffff;
		border-radius: 12px;
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.screen_checkerboard {
		position: absolute;
		inset: 0;
		opacity: 0.85;
		background-image: 
			linear-gradient(45deg, #e5e3de 25%, transparent 25%), 
			linear-gradient(-45deg, #e5e3de 25%, transparent 25%), 
			linear-gradient(45deg, transparent 75%, #e5e3de 75%), 
			linear-gradient(-45deg, transparent 75%, #e5e3de 75%);
		background-size: 24px 24px;
		background-position: 0 0, 0 12px, 12px -12px, -12px 0px;
	}

	.screen_video_overlay {
		position: relative;
		z-index: 10;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1.25rem;
		text-align: center;
		background-color: rgba(92, 15, 22, 0.15); /* Light maroon glass shade overlay */
		width: 100%;
		height: 100%;
		transition: background-color 0.3s ease;
	}

	.screen_video_overlay:hover {
		background-color: rgba(92, 15, 22, 0.25);
	}

	.play_button {
		width: 68px;
		height: 68px;
		border-radius: 50%;
		background-color: #ffffff;
		border: 1px solid rgba(255, 255, 255, 0.8);
		box-shadow: 0 8px 25px rgba(92, 15, 22, 0.3);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.2s ease;
		padding-left: 5px; /* offset play alignment triangle */
	}

	.play_button:hover {
		transform: scale(1.1);
		box-shadow: 0 12px 35px rgba(92, 15, 22, 0.4);
	}

	.play_icon_svg {
		width: 24px;
		height: 24px;
	}

	.video_info_text {
		color: #5c0f16;
	}

	.video_title {
		font-size: 1.1rem;
		font-weight: 800;
		letter-spacing: 0.05em;
		margin: 0;
	}

	.video_subtitle {
		font-size: 0.8rem;
		font-weight: 600;
		opacity: 0.85;
		margin: 0.25rem 0 0 0;
	}

	/* Video timeline control bar */
	.video_control_bar {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 15;
		background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
		padding: 1.5rem 1rem 0.5rem 1rem;
		display: flex;
		align-items: center;
		gap: 1rem;
		color: #ffffff;
		font-size: 0.8rem;
		opacity: 0;
		transform: translateY(5px);
		transition: opacity 0.3s ease, transform 0.3s ease;
	}

	.display_mock_screen:hover .video_control_bar {
		opacity: 1;
		transform: translateY(0);
	}

	.control_icon {
		cursor: pointer;
		font-size: 1rem;
		opacity: 0.85;
		transition: opacity 0.2s ease;
	}

	.control_icon:hover {
		opacity: 1;
	}

	.video_timeline_track {
		flex-grow: 1;
		height: 4px;
		background-color: rgba(255, 255, 255, 0.3);
		border-radius: 2px;
		position: relative;
		cursor: pointer;
	}

	.video_timeline_progress {
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 25%; /* Mock progress */
		background-color: #cfa83a; /* Gold indicator line */
		border-radius: 2px;
	}

	.control_time {
		font-size: 0.7rem;
		opacity: 0.85;
	}

	/* Supporting Grid */
	.support_grid {
		display: grid;
		grid-template-columns: 1.1fr 1fr;
		gap: 2rem;
	}

	@media (max-width: 900px) {
		.support_grid {
			grid-template-columns: 1fr;
		}
	}

	.priorities_left_col {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	/* Priority Card layout */
	.priority_card {
		background-color: #ffffff;
		border: 1px solid rgba(207, 168, 58, 0.35);
		border-radius: 12px;
		padding: 1.75rem;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
	}

	.priority_title {
		font-size: 1.15rem;
		font-weight: 850;
		color: #5c0f16;
		margin: 0 0 1.25rem 0;
		letter-spacing: 0.02em;
	}

	.priority_list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.priority_item {
		display: flex;
		gap: 1rem;
		align-items: flex-start;
		padding-bottom: 0.85rem;
		border-bottom: 1px solid rgba(0, 0, 0, 0.06);
	}

	.priority_item {
		display: flex;
		gap: 1.25rem;
		align-items: center;
		padding-bottom: 0.85rem;
		border-bottom: 1px solid rgba(0, 0, 0, 0.08);
	}

	.priority_num {
		font-size: 0.95rem;
		font-weight: 700;
		color: #cfa83a;
		font-family: system-ui, sans-serif;
	}

	.priority_text {
		font-size: 0.82rem;
		color: #111111;
		line-height: 1.5;
		margin: 0;
		font-family: system-ui, sans-serif;
	}

	/* Core Functions Card Layout */
	.core_functions_card {
		background-color: #cfa83a; /* Mustard Yellow Background from Figma */
		border-radius: 12px;
		padding: 1.5rem 1.75rem;
		color: #3d0a0e;
		box-shadow: 0 4px 20px rgba(207, 168, 58, 0.08);
	}

	.core_functions_title {
		font-size: 1.15rem;
		font-weight: 850;
		color: #000000;
		margin: 0 0 1.25rem 0;
		letter-spacing: 0.02em;
		font-family: system-ui, -apple-system, sans-serif;
	}

	.functions_grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.75rem;
	}

	.function_item_block {
		background-color: #ffffff;
		border-radius: 6px;
		padding: 0.8rem 1rem;
		border-left: 5px solid #5c0f16;
		display: flex;
		align-items: center;
		min-height: 48px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.03);
	}

	.function_text {
		font-size: 0.78rem;
		font-weight: 700;
		color: #5c0f16;
		line-height: 1.3;
		font-family: system-ui, -apple-system, sans-serif;
	}

	/* Support Feed Alerts */
	.support_feed_container {
		background-color: #5c0f16; /* Deep Maroon Theme container from Figma */
		border-radius: 12px;
		padding: 1.75rem;
		color: #ffffff;
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		box-shadow: 0 4px 20px rgba(92, 15, 22, 0.12);
	}

	.feed_header {
		display: flex;
		align-items: center;
		border-bottom: 1px solid rgba(255, 255, 255, 0.15);
		padding-bottom: 1rem;
		gap: 0.75rem;
	}

	.feed_square_icon {
		background-color: #666666;
		margin-right: 0.25rem;
	}

	.feed_title {
		font-size: 1.05rem;
		font-weight: 700;
		color: #cfa83a;
		letter-spacing: 0.05em;
		margin: 0;
		font-family: system-ui, -apple-system, sans-serif;
	}

	.feed_alerts_list {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.feed_alert_card {
		background-color: #ffffff;
		border-radius: 8px;
		padding: 1.25rem;
		color: #2b2b2b;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
	}

	.alert_card_title {
		font-size: 0.95rem;
		font-weight: 700;
		color: #b8912d;
		margin: 0 0 0.5rem 0;
		font-family: system-ui, -apple-system, sans-serif;
	}

	.alert_card_desc {
		font-size: 0.78rem;
		line-height: 1.6;
		color: #333333;
		margin: 0;
		font-family: system-ui, -apple-system, sans-serif;
	}

	/* Process Cards */
	.process_cards_grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
		gap: 1.5rem;
	}

	.process_card {
		background-color: #ffffff;
		border: 1.5px solid rgba(92, 15, 22, 0.08);
		border-radius: 12px;
		padding: 2rem 1.5rem;
		text-align: center;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.01);
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.75rem;
		transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
		cursor: default;
	}

	.process_card:hover {
		transform: translateY(-4px);
		border-color: #cfa83a;
		box-shadow: 0 8px 25px rgba(207, 168, 58, 0.08);
	}

	.process_icon_wrapper {
		width: 46px;
		height: 46px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 0.5rem;
	}

	.bg_maroon_light {
		background-color: rgba(92, 15, 22, 0.06);
	}

	:global(.process_icon) {
		color: #5c0f16;
	}

	.process_card_title {
		font-size: 1rem;
		font-weight: 700;
		margin: 0;
	}

	.process_card_desc {
		font-size: 0.75rem;
		line-height: 1.5;
		color: #666666;
		margin: 0;
	}
</style>
