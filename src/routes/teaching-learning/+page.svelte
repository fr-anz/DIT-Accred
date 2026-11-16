<script>
	import {
		ClipboardCheck,
		BookOpen,
		Users,
		Target,
		Award,
		ShieldCheck,
		Cloud,
		Briefcase,
		ChevronRight,
		ChevronLeft,
		CheckCircle2,
		X,
		Compass,
		MessageSquareWarning,
		RotateCw,
		Network
	} from 'lucide-svelte';
	import Footer from '$lib/components/footer.svelte';
	import StudentAchievementsGallery from '$lib/components/StudentAchievementsGallery.svelte';
	import '$lib/styles/accreditation-pages.css';
	import '$lib/styles/assigned-page-motion.css';
	import { narrativeReports } from '$lib/data/reportLinks';
	import { alumniList } from '$lib/data/alumni';
	import { resolve } from '$app/paths';
	import { tick } from 'svelte';
	/** @type {HTMLDialogElement | undefined} */
	let alumniDialog = $state();
	/** @type {HTMLElement | null} */
	let lastAlumniFocus = null;

	/**
	 * @typedef {1 | 2 | 3 | 4} CourseYear
	 * @typedef {{ code: string; name: string; units: number }} Course
	 */

	// Svelte 5 Runes for page interactivity
	let activeTab = $state('circular'); // Tab for curriculum enhancements
	/** @type {CourseYear} */
	let activeYear = $state(1); // Year selector for interactive explorer
	/** @type {number | null} */
	let selectedAlumIndex = $state(null); // Index of alum for detailed modal
	const narrativeReport = narrativeReports.find(
		(report) => report.title === 'Teaching and Learning'
	);
	/** @type {CourseYear[]} */
	const courseYears = [1, 2, 3, 4];

	// Mobile carousel: one alum per slide (CSS switches to a single column at ≤540px)
	let mobileIndex = $state(0);

	function prevSlide() {
		mobileIndex = Math.max(0, mobileIndex - 1);
	}

	function nextSlide() {
		mobileIndex = Math.min(alumniList.length - 1, mobileIndex + 1);
	}

	// Interactive explorer course data
	/** @type {Record<CourseYear, Course[]>} */
	const coursesByYear = {
		1: [
			{ code: 'COMP 001', name: 'Introduction to Computing', units: 3 },
			{ code: 'COMP 002', name: 'Computer Programming 1', units: 3 },
			{ code: 'COMP 003', name: 'Computer Programming 2', units: 3 }
		],
		2: [
			{ code: 'COMP 004', name: 'Data Structures and Algorithms', units: 3 },
			{ code: 'COMP 005', name: 'Object-Oriented Programming', units: 3 },
			{ code: 'COMP 006', name: 'Web Development', units: 3 }
		],
		3: [
			{ code: 'COMP 007', name: 'Database Management Systems', units: 3 },
			{ code: 'COMP 008', name: 'Software Engineering', units: 3 },
			{ code: 'COMP 009', name: 'Systems Administration and Maintenance', units: 3 }
		],
		4: [
			{ code: 'COMP 010', name: 'Capstone Project 1', units: 3 },
			{ code: 'COMP 011', name: 'Capstone Project 2', units: 3 },
			{ code: 'COMP 012', name: 'Information Assurance and Security', units: 3 }
		]
	};

	// Close alumni details modal
	function closeModal() {
		alumniDialog?.close();
		selectedAlumIndex = null;
		lastAlumniFocus?.focus();
	}

	/**
	 * Open modal for the alum at the given global index
	 * @param {number} index
	 */
	async function openAlumModal(index) {
		lastAlumniFocus = /** @type {HTMLElement | null} */ (document.activeElement);
		selectedAlumIndex = index;
		await tick();
		alumniDialog?.showModal();
		alumniDialog?.focus();
	}
	$effect(() => {
		if (selectedAlumIndex === null) return;
		const previous = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = previous;
		};
	});

	// Organizations list with high-quality themed images
	const organizations = [
		{
			title: 'IBITS',
			desc: 'Institute of Bachelors of Information Technology Studies',
			img: '/teaching-learning/figma/ibits.jpg'
		},
		{
			title: 'ARK',
			desc: 'Academitech Research and Knowledge',
			img: '/teaching-learning/figma/ark.jpg'
		},
		{
			title: 'AWSCC PUP',
			desc: 'Amazon Web Services Cloud Club - PUP',
			img: '/teaching-learning/figma/awscc.jpg'
		},
		{
			title: 'CNCP',
			desc: 'Cisco NetConnect PUP - Manila',
			img: '/teaching-learning/figma/cncp.jpg'
		}
	];
</script>

<svelte:head>
	<title>Teaching & Learning | DIT-PUP</title>
	<meta
		name="description"
		content="Explore DIT-PUP's curriculum, faculty, student outcomes, and quality assurance framework for the BSIT program."
	/>
</svelte:head>

<main class="assigned_page teaching_page">
	<!-- ─────────────────────────────────────────────
  HERO SECTION
───────────────────────────────────────────── -->
	<section class="hero_section">
		<div class="checkerboard_bg" aria-hidden="true"></div>
		<div class="hero_content">
			<h1 class="t_display hero_title">TEACHING &amp;<br />LEARNING</h1>
		</div>
	</section>

	<!-- ─────────────────────────────────────────────
  SECTION 1: PROGRAM COMPLIANCE & GOVERNANCE
───────────────────────────────────────────── -->
	<section class="content_section" id="program-compliance">
		<div class="section_label">
			<ClipboardCheck size={26} strokeWidth={1.5} class="section_icon maroon" />
			<span class="t_eyebrow">PROGRAM COMPLIANCE &amp; GOVERNANCE</span>
		</div>
		<hr class="section_divider" />

		<div class="compliance_block">
			<!-- Governance Summary Card -->
			<div class="governance_summary_card">
				<h3 class="card_section_title">GOVERNANCE SUMMARY</h3>
				<p class="governance_desc">
					The Bachelor of Science in Information Technology operates under a robust regulatory
					architecture, strictly adhering to <span class="highlight_text">COPC No. 008</span> for
					operations, <span class="highlight_text">OBE Principles</span> for instructional delivery,
					and <span class="highlight_text">CMO No. 25</span> for curriculum alignment. Our framework ensures
					global competitiveness through rigorous standard-setting.
				</p>

				<div class="compliance_grid">
					<div class="compliance_subcard copc_card">
						<div
							class="card_bg_image"
							style="background-image: url('/teaching-learning/figma/copc.png')"
							aria-hidden="true"
						></div>
						<div class="card_bg_overlay"></div>
						<div class="subcard_content">
							<span class="subcard_label">COPC STATUS</span>
							<h4 class="subcard_title">No. 008</h4>
							<p class="subcard_desc">Full Accreditation</p>
						</div>
					</div>

					<div class="compliance_subcard obe_card">
						<div
							class="card_bg_image"
							style="background-image: url('/teaching-learning/figma/obe.png')"
							aria-hidden="true"
						></div>
						<div class="card_bg_overlay"></div>
						<div class="subcard_content">
							<span class="subcard_label">FRAMEWORK</span>
							<h4 class="subcard_title">OBE-Driven</h4>
							<p class="subcard_desc">Alignment Verified</p>
						</div>
					</div>

					<div class="compliance_subcard cmo_card">
						<div
							class="card_bg_image"
							style="background-image: url('/teaching-learning/figma/cmo.png')"
							aria-hidden="true"
						></div>
						<div class="card_bg_overlay"></div>
						<div class="subcard_content">
							<span class="subcard_label">STANDARD</span>
							<h4 class="subcard_title">CMO 25</h4>
							<p class="subcard_desc">Series of 2015</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Curriculum Revision Lifecycle Card -->
			<div class="lifecycle_card">
				<div
					class="lifecycle_bg_image"
					style="background-image: url('/teaching-learning/figma/lifecycle.jpg')"
					aria-hidden="true"
				></div>
				<div class="lifecycle_bg_overlay"></div>
				<div class="dot_grid_overlay" aria-hidden="true"></div>

				<h3 class="lifecycle_title">EVIDENCE-BASED CURRICULUM REVISION LIFECYCLE</h3>

				<div class="lifecycle_timeline">
					<!-- Step 1 -->
					<div class="timeline_node">
						<div class="node_icon_wrapper">
							<Compass size={28} strokeWidth={1.5} class="node_icon" />
						</div>
						<h4 class="node_title">Benchmarking</h4>
						<p class="node_desc">DLSU, Mapua, UP Diliman</p>
					</div>

					<div class="timeline_arrow" aria-hidden="true">
						<div class="arrow_line"></div>
					</div>

					<!-- Step 2 -->
					<div class="timeline_node">
						<div class="node_icon_wrapper">
							<MessageSquareWarning size={28} strokeWidth={1.5} class="node_icon" />
						</div>
						<h4 class="node_title">Industry Feedback</h4>
						<p class="node_desc">Stakeholder Consultation</p>
					</div>

					<div class="timeline_arrow" aria-hidden="true">
						<div class="arrow_line"></div>
					</div>

					<!-- Step 3 -->
					<div class="timeline_node">
						<div class="node_icon_wrapper">
							<RotateCw size={28} strokeWidth={1.5} class="node_icon" />
						</div>
						<h4 class="node_title">Revision Cycle</h4>
						<p class="node_desc">Curriculum Committee</p>
					</div>

					<div class="timeline_arrow" aria-hidden="true">
						<div class="arrow_line"></div>
					</div>

					<!-- Step 4 -->
					<div class="timeline_node">
						<div class="node_icon_wrapper">
							<Network size={28} strokeWidth={1.5} class="node_icon" />
						</div>
						<h4 class="node_title">Layered Governance</h4>
						<p class="node_desc">BOR Approval Flow</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- ─────────────────────────────────────────────
  SECTION 2: CURRICULUM ARCHITECTURE
───────────────────────────────────────────── -->
	<section class="content_section" id="curriculum-architecture">
		<div class="section_label">
			<BookOpen size={26} strokeWidth={1.5} class="section_icon maroon" />
			<span class="t_eyebrow">CURRICULUM ARCHITECTURE &amp; INSTRUCTION DELIVERY</span>
		</div>
		<hr class="section_divider" />

		<div class="curriculum_columns">
			<!-- Left Column: Academic Unit Allocation -->
			<div class="unit_allocation_card">
				<h3 class="allocation_title">ACADEMIC UNIT ALLOCATION</h3>
				<div class="allocation_list">
					<!-- Category 1 -->
					<div class="allocation_item">
						<div class="item_header">
							<span class="item_label">Professional Core</span>
							<span class="item_value">78 Units</span>
						</div>
						<div class="progress_track">
							<div class="progress_bar" style="width: calc(78 / 167 * 100%);"></div>
						</div>
					</div>
					<!-- Category 2 -->
					<div class="allocation_item">
						<div class="item_header">
							<span class="item_label">General Education</span>
							<span class="item_value">42 Units</span>
						</div>
						<div class="progress_track">
							<div class="progress_bar" style="width: calc(42 / 167 * 100%);"></div>
						</div>
					</div>
					<!-- Category 3 -->
					<div class="allocation_item">
						<div class="item_header">
							<span class="item_label">Common Computing</span>
							<span class="item_value">18 Units</span>
						</div>
						<div class="progress_track">
							<div class="progress_bar" style="width: calc(18 / 167 * 100%);"></div>
						</div>
					</div>
					<!-- Category 4 -->
					<div class="allocation_item">
						<div class="item_header">
							<span class="item_label">Support Courses</span>
							<span class="item_value">17 Units</span>
						</div>
						<div class="progress_track">
							<div class="progress_bar" style="width: calc(17 / 167 * 100%);"></div>
						</div>
					</div>
					<!-- Category 5 -->
					<div class="allocation_item">
						<div class="item_header">
							<span class="item_label">Electives</span>
							<span class="item_value">12 Units</span>
						</div>
						<div class="progress_track">
							<div class="progress_bar" style="width: calc(12 / 167 * 100%);"></div>
						</div>
					</div>
				</div>

				<div class="total_credits_banner">
					<div class="banner_left">
						<p class="banner_label">Total Requirement:</p>
					</div>
					<div class="banner_right">
						<span class="total_units_num">167</span>
						<p class="banner_sublabel">Academic Credits</p>
					</div>
				</div>
			</div>

			<!-- Right Column: Tabs & Interactive Explorer -->
			<div class="curriculum_right_panel">
				<!-- Enhancement Tabs -->
				<div class="enhancements_section">
					<div class="enhancement_tabs">
						<button
							class="enhancement_tab_btn circular_btn"
							class:active={activeTab === 'circular'}
							aria-pressed={activeTab === 'circular'}
							onclick={() => (activeTab = 'circular')}
						>
							CIRCULAR ENHANCEMENTS
						</button>
						<button
							class="enhancement_tab_btn experiential_btn"
							class:active={activeTab === 'experiential'}
							aria-pressed={activeTab === 'experiential'}
							onclick={() => (activeTab = 'experiential')}
						>
							EXPERIENTAL TAX
						</button>
					</div>

					<div class="enhancement_content_panel">
						{#if activeTab === 'circular'}
							<div class="enhancement_grid">
								<div class="enhancement_card">
									<div class="card_icon_row">
										<Cloud size={24} strokeWidth={1.5} class="card_icon" />
										<h4 class="card_title">CLOUD ARCHITECTURE</h4>
									</div>
									<p class="card_desc">Advanced AWS/Azure Integration modules.</p>
								</div>

								<div class="enhancement_card">
									<div class="card_icon_row">
										<ShieldCheck size={24} strokeWidth={1.5} class="card_icon" />
										<h4 class="card_title">CYBERSECURITY</h4>
									</div>
									<p class="card_desc">Offensive/Defensive security operations.</p>
								</div>

								<div class="enhancement_card">
									<div class="card_icon_row">
										<Briefcase size={24} strokeWidth={1.5} class="card_icon" />
										<h4 class="card_title">500H PRACTICUM</h4>
									</div>
									<p class="card_desc">Mandatory industry immersion hours.</p>
								</div>

								<div class="enhancement_card">
									<div class="card_icon_row">
										<Award size={24} strokeWidth={1.5} class="card_icon" />
										<h4 class="card_title">CAPSTONE</h4>
									</div>
									<p class="card_desc">Product-led research milestones.</p>
								</div>
							</div>
						{:else}
							<div class="enhancement_grid">
								<div class="enhancement_card">
									<div class="card_icon_row">
										<Users size={24} strokeWidth={1.5} class="card_icon" />
										<h4 class="card_title">INTERNSHIP PARTNERS</h4>
									</div>
									<p class="card_desc">Global internship alignment with IT MNCs.</p>
								</div>

								<div class="enhancement_card">
									<div class="card_icon_row">
										<Award size={24} strokeWidth={1.5} class="card_icon" />
										<h4 class="card_title">MASTERCLASSES</h4>
									</div>
									<p class="card_desc">Weekly tech talks by cloud architects.</p>
								</div>

								<div class="enhancement_card">
									<div class="card_icon_row">
										<Target size={24} strokeWidth={1.5} class="card_icon" />
										<h4 class="card_title">HACKATHONS</h4>
									</div>
									<p class="card_desc">Active student innovation challenges.</p>
								</div>

								<div class="enhancement_card">
									<div class="card_icon_row">
										<ShieldCheck size={24} strokeWidth={1.5} class="card_icon" />
										<h4 class="card_title">TECH BOOTCAMPS</h4>
									</div>
									<p class="card_desc">Hands-on certification bootcamps.</p>
								</div>
							</div>
						{/if}
					</div>
				</div>

				<!-- Interactive Explorer Card -->
				<div class="interactive_explorer_card">
					<h3 class="explorer_title">INTERACTIVE CURRICULUM EXPLORER</h3>

					<div class="explorer_tabs">
						{#each courseYears as year (year)}
							<button
								class="explorer_tab_btn"
								class:active={activeYear === year}
								aria-pressed={activeYear === year}
								onclick={() => (activeYear = year)}
							>
								YEAR {year}
							</button>
						{/each}
					</div>

					{#key activeYear}
						<div class="courses_list_container">
							{#each coursesByYear[activeYear] as course (course.code)}
								<div class="course_row">
									<div class="course_details">
										<span class="course_code">{course.code}:</span>
										<span class="course_name">{course.name}</span>
									</div>
									<span class="course_units">{course.units} units</span>
								</div>
							{/each}
						</div>
					{/key}
				</div>
			</div>

				<div class="narrative-action-wrapper">
					<a href="https://bit.ly/ITL4Area2" class="narrative-btn" target="_blank" rel="noopener noreferrer">
						View Full Narrative Report
					</a>
			</div>
		</div>
	</section>

	<!-- ─────────────────────────────────────────────
  SECTION 3: ACADEMIC STAFF & FACULTY PROFILES
───────────────────────────────────────────── -->
	<section class="content_section" id="staff-faculty-profile">
		<div class="section_label">
			<Users size={26} strokeWidth={1.5} class="section_icon maroon" />
			<span class="t_eyebrow">ACADEMIC STAFF &amp; FACULTY PROFILES</span>
		</div>
		<hr class="section_divider" />

		<div class="faculty_grid">
			<!-- Full-Time Card (links to the faculty directory subpage, full-time section) -->
			<a class="faculty_profile_card" href={resolve('/teaching-learning/faculty#full-time')}>
				<div class="card_decor_strip red_strip"></div>
				<div class="faculty_header">
					<div class="faculty_icon_box red_bg">
						<Users size={24} class="faculty_icon" />
					</div>
					<div class="header_titles">
						<h3 class="faculty_type">FULL-TIME FACULTY</h3>
						<span class="faculty_sub">RESEARCH LEADERS</span>
					</div>
				</div>

				<p class="faculty_desc">
					Dedicated faculty members with some Ph.D., Masteral, and Bachelors credentials focusing on
					pedagogical innovation and institutional research trajectories. Expertise spans across
					Data Science, AI Ethics, and Network Engineering.
				</p>

				<ul class="faculty_checklist">
					<li class="checklist_item">
						<CheckCircle2 size={18} class="check_icon red_check" />
						<span>85% with Advanced Degrees</span>
					</li>
					<li class="checklist_item">
						<CheckCircle2 size={18} class="check_icon red_check" />
						<span>Published Research in IEEE/ACM</span>
					</li>
				</ul>

				<span class="faculty_cta">
					View Full-time Faculty
					<ChevronRight size={18} strokeWidth={2.5} class="faculty_cta_icon" />
				</span>
			</a>

			<!-- Part-Time Card (links to the faculty directory subpage, part-time section) -->
			<a class="faculty_profile_card" href={resolve('/teaching-learning/faculty#part-time')}>
				<div class="card_decor_strip gold_strip"></div>
				<div class="faculty_header">
					<div class="faculty_icon_box gold_bg">
						<Target size={24} class="faculty_icon" />
					</div>
					<div class="header_titles">
						<h3 class="faculty_type">PART-TIME EDUCATOR</h3>
						<span class="faculty_sub">PRACTITIONER-EDUCATORS</span>
					</div>
				</div>

				<p class="faculty_desc">
					Active industry professionals bringing real-world DevOps, Cloud Architecture, and Software
					Engineering methodologies directly into the classroom. Bridging the gap between theory and
					production.
				</p>

				<ul class="faculty_checklist">
					<li class="checklist_item">
						<CheckCircle2 size={18} class="check_icon gold_check" />
						<span>Active Industry Certifications</span>
					</li>
					<li class="checklist_item">
						<CheckCircle2 size={18} class="check_icon gold_check" />
						<span>Direct Liaison for OJT Programs</span>
					</li>
				</ul>

				<span class="faculty_cta">
					View Part-time Faculty
					<ChevronRight size={18} strokeWidth={2.5} class="faculty_cta_icon" />
				</span>
			</a>
		</div>
	</section>

	<!-- ─────────────────────────────────────────────
  SECTION 4: STUDENT OUTCOMES & ECO-SYSTEM
───────────────────────────────────────────── -->
	<section class="content_section" id="student-outcomes">
		<div class="section_label">
			<Target size={26} strokeWidth={1.5} class="section_icon maroon" />
			<span class="t_eyebrow">STUDENT OUTCOMES &amp; ECO-SYSTEM</span>
		</div>
		<hr class="section_divider" />

		<div class="orgs_marquee_wrapper">
			<div class="orgs_marquee_track">
				{#each [false, true] as duplicate (duplicate)}
					<div class="orgs_marquee_group" aria-hidden={duplicate}>
						{#each organizations as org (org.title)}
							<div class="org_card" style="background-image: url('{org.img}')">
								<div class="org_overlay"></div>
								<div class="org_content">
									<h3 class="org_title">{org.title}</h3>
									<p class="org_desc">{org.desc}</p>
								</div>
							</div>
						{/each}
					</div>
				{/each}
			</div>
		</div>
		<StudentAchievementsGallery />
	</section>

	<!-- ─────────────────────────────────────────────
  SECTION 5: LEARNING & GRADUATES OUTCOME
───────────────────────────────────────────── -->
	<section class="content_section" id="learner-graduate-qa">
		<div class="section_label">
			<Award size={26} strokeWidth={1.5} class="section_icon maroon" />
			<span class="t_eyebrow">LEARNING &amp; GRADUATES OUTCOME</span>
		</div>
		<hr class="section_divider" />

		<!-- Notable Alumni Section -->
		<div class="alumni_section_container">
			<h2 class="notable_alumni_title">NOTABLE ALUMNI</h2>

			<!-- Slideshow wrapper -->
			<div class="alumni_slideshow_wrapper">
				<div class="alumni_slideshow">
					<!-- Prev button (mobile only) -->
					<button
						class="slide_nav_btn slide_prev"
						onclick={prevSlide}
						disabled={mobileIndex === 0}
						aria-label="Previous alumni"
					>
						<ChevronLeft size={24} strokeWidth={2.5} />
					</button>

					<!-- Alumni cards: 3-up on desktop, one per slide on mobile -->
					<div class="alumni_cards_container">
						{#each alumniList as alum, i (alum.name)}
							<button
								type="button"
								class="alumni_portrait_card"
								class:slide_hidden={i !== mobileIndex}
								onclick={() => openAlumModal(i)}
							>
								<div class="portrait_info">
									<h4 class="alum_name">{alum.name}</h4>
									<span class="alum_role_tag">{alum.role}</span>
								</div>
							</button>
						{/each}
					</div>

					<!-- Next button (mobile only) -->
					<button
						class="slide_nav_btn slide_next"
						onclick={nextSlide}
						disabled={mobileIndex === alumniList.length - 1}
						aria-label="Next alumni"
					>
						<ChevronRight size={24} strokeWidth={2.5} />
					</button>
				</div>

				<!-- Slide dot indicators (mobile only) -->
				<div class="carousel_indicators">
					{#each alumniList as alum, p (alum.name)}
						<button
							class="dot_indicator"
							class:active={mobileIndex === p}
							onclick={() => (mobileIndex = p)}
							aria-label="Show {alum.name}"
							aria-current={mobileIndex === p}
						></button>
					{/each}
				</div>
			</div>
		</div>

		<!-- Tracer Grid -->
		<div class="tracer_grid">
			<!-- Employment Horizon Table -->
			<div class="employment_horizon_card">
				<h3 class="horizon_title">EMPLOYMENT HORIZON<br />(GRADUATE TRACER)</h3>

				<div class="table_container">
					<table class="tracer_table">
						<thead>
							<tr>
								<th class="th_left">TIME TO EMPLOYMENT</th>
								<th class="th_right">GRADUATES COUNT</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td class="td_left">&lt; 1 MONTH</td>
								<td class="td_right">50</td>
							</tr>
							<tr>
								<td class="td_left">1 - 3 MONTHS</td>
								<td class="td_right">25</td>
							</tr>
							<tr>
								<td class="td_left">4 - 6 MONTHS</td>
								<td class="td_right">40</td>
							</tr>
							<tr>
								<td class="td_left">7 - 9 MONTHS</td>
								<td class="td_right">18</td>
							</tr>
							<tr>
								<td class="td_left">10 MONTHS - 1 YEAR</td>
								<td class="td_right">18</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			<!-- PEO Attainment Card -->
			<div class="peo_attainment_card">
				<h3 class="peo_title">PEO ATTAINMENT SCORES</h3>

				<div class="peo_scores_grid">
					<div class="peo_score_tile">
						<span class="peo_num_label">PEO 1</span>
						<span class="peo_score_num">3.49</span>
						<span class="peo_status">EXCELLENT</span>
					</div>
					<div class="peo_score_tile">
						<span class="peo_num_label">PEO 2</span>
						<span class="peo_score_num">3.49</span>
						<span class="peo_status">EXCELLENT</span>
					</div>
					<div class="peo_score_tile">
						<span class="peo_num_label">PEO 3</span>
						<span class="peo_score_num">3.50</span>
						<span class="peo_status">OUTSTANDING</span>
					</div>
				</div>

				<!-- Satisfaction Progress Card -->
				<div class="satisfaction_loop_box">
					<div class="loop_header">
						<span class="loop_label">ITEES SATISFACTION LOOP</span>
						<span class="loop_percentage">96%</span>
					</div>
					<div class="loop_progress_track">
						<div class="loop_progress_bar" style="width: 96%;"></div>
					</div>
					<p class="loop_subtext">
						Continuous feedback loop via Graduate Tracer Surveys (2017-2022 Data Set).
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- ─────────────────────────────────────────────
  ALUMNI DETAILS OVERLAY MODAL
───────────────────────────────────────────── -->
	{#if selectedAlumIndex !== null}
		<dialog
			class="modal_overlay"
			bind:this={alumniDialog}
			aria-labelledby="alumni-dialog-title"
			oncancel={closeModal}
		>
			<button
				type="button"
				class="modal_backdrop"
				onclick={closeModal}
				aria-label="Close alumni profile"
				tabindex="-1"
			></button>
			<div class="modal_content">
				<div class="modal_toolbar">
					<button class="close_modal_btn" onclick={closeModal} aria-label="Close modal">
						<X size={24} />
					</button>
				</div>

				<div class="modal_grid">
					<!-- Left Panel: Profile Detail (Figma-aligned) -->
					<div class="modal_profile_panel">
						<div class="modal_profile_card">
							<div class="detail_info_block">
								<h3 class="detail_alum_name" id="alumni-dialog-title">
									{alumniList[selectedAlumIndex].name}
								</h3>
								<p class="detail_alum_role">{alumniList[selectedAlumIndex].role}</p>
								<p class="detail_alum_company">{alumniList[selectedAlumIndex].company}</p>
								{#if alumniList[selectedAlumIndex].additionalRole}
									<p class="detail_alum_company">{alumniList[selectedAlumIndex].additionalRole}</p>
								{/if}

								<div class="detail_meta_row">
									<span class="detail_batch_tag">
										BSIT Class of {alumniList[selectedAlumIndex].classYear}
									</span>
								</div>
							</div>
						</div>
					</div>

					<!-- Right Panel: Testimonial Video (Figma-aligned) -->
					<div class="modal_video_panel">
						<div class="testimonial_video_wrapper">
							<iframe
								src={alumniList[selectedAlumIndex].videoEmbedUrl}
								class="testimonial_video"
								title="Testimonial video from {alumniList[selectedAlumIndex].name}"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								allowfullscreen
							></iframe>
						</div>
					</div>
				</div>
			</div>
		</dialog>
	{/if}
</main>

<Footer />

<style>
    .narrative-action-wrapper {
		display: flex;
		justify-content: center; 
		width: 100%;
		margin-top: 1.5rem; 
		margin-bottom: 0;   
	}

	.narrative-btn {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		max-width: 700px; /* Stretches it out to match the research button */
		padding: 18px 32px; /* Increased height slightly for a larger click target */
		border: 3px solid #941518;
		border-radius: 12px;
		background-color: transparent;
		color: #941518;
		font-family: var(--font-heading, 'Overpass', sans-serif);
		font-size: 1.4rem;
		font-weight: 700;
		text-decoration: none;
		transition: all 0.2s ease;
	}

	.narrative-btn:hover {
		background-color: #941518;
		color: #dfb75f;
	}
	/* Reduces the bottom space of the curriculum section */
	#curriculum-architecture {
		margin-bottom: 0;
		padding-bottom: 80px;
	}

	/* Reduces the top space of the faculty section */
	#staff-faculty-profile {
		margin-top: 0;
		padding-top: 40px;
	}
	.modal_backdrop {
		position: absolute;
		inset: 0;
		background: none;
		border: 0;
	}
	/* Teaching & Learning: Figma sections 622:558 through 622:876. */
	.hero_title {
		max-width: 1256px;
		font-size: clamp(48px, 9.27vw, 178px);
		line-height: 1;
		background-image: linear-gradient(111.16deg, #000000 8.896%, #901518 89.049%);
	}
	#program-compliance {
		padding-top: clamp(70px, 10.156vw, 195px);
	}
	.compliance_block {
		display: grid;
		gap: clamp(32px, 3.49vw, 67px);
	}
	.governance_summary_card {
		border-radius: clamp(18px, 1.823vw, 35px);
		background: var(--panel-dark);
		color: white;
		padding: clamp(28px, 4.635vw, 89px) clamp(24px, 5.365vw, 103px) clamp(28px, 4.375vw, 84px);
	}
	.card_section_title {
		margin: 0 0 clamp(24px, 2.083vw, 40px);
		color: var(--c-gold-light);
		font: 700 clamp(21px, 1.875vw, 36px)/1.2 var(--font-heading);
		letter-spacing: 0.04em;
	}
	.governance_desc {
		margin: 0;
		font-size: clamp(14px, 1.14583vw, 22px);
		line-height: 1.35;
	}
	.highlight_text {
		color: var(--c-gold-light);
		font-weight: 700;
	}
	.compliance_grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: clamp(18px, 2.344vw, 45px);
		margin-top: clamp(32px, 3.125vw, 60px);
	}
	.compliance_subcard {
		position: relative;
		min-height: clamp(140px, 10.417vw, 200px);
		overflow: hidden;
		border-radius: 10px;
		padding: clamp(18px, 1.875vw, 36px);
		display: flex;
		align-items: center;
	}
	.card_bg_image,
	.card_bg_overlay,
	.lifecycle_bg_image,
	.lifecycle_bg_overlay,
	.dot_grid_overlay {
		position: absolute;
		inset: 0;
	}
	.card_bg_image {
		background-size: cover;
		background-position: center;
	}
	.card_bg_overlay {
		background: rgba(255, 255, 255, 0.66);
	}
	.subcard_content {
		position: relative;
		z-index: 1;
	}
	.subcard_label {
		color: var(--c-gold-dark);
		font-size: clamp(11px, 0.833vw, 16px);
		font-style: italic;
	}
	.subcard_title {
		margin: 4px 0 16px;
		color: var(--c-maroon);
		font: 700 clamp(24px, 2.083vw, 40px)/1.2 var(--font-heading);
		letter-spacing: 0.06em;
	}
	.subcard_desc {
		margin: 0;
		color: #111;
		font-size: clamp(12px, 0.833vw, 16px);
		letter-spacing: 0;
	}
	.lifecycle_card {
		position: relative;
		overflow: hidden;
		border-radius: clamp(18px, 1.302vw, 25px);
		padding: clamp(28px, 3.49vw, 67px) clamp(24px, 3.802vw, 73px);
		color: white;
	}
	.lifecycle_bg_image {
		background-size: cover;
		background-position: center 42%;
	}
	.lifecycle_bg_overlay {
		background: rgba(148, 21, 24, 0.64);
	}
	.dot_grid_overlay {
		opacity: 0.22;
		background-image: radial-gradient(#fff 1.5px, transparent 1.5px);
		background-size: 22px 22px;
	}
	.lifecycle_title {
		position: relative;
		margin: 0 0 clamp(28px, 2.5vw, 48px);
		color: var(--c-gold-light);
		font: 700 clamp(18px, 1.875vw, 36px)/1.25 var(--font-heading);
		letter-spacing: 0.02em;
	}
	.lifecycle_timeline {
		position: relative;
		display: grid;
		grid-template-columns: 1fr 64px 1fr 64px 1fr 64px 1fr;
		align-items: start;
	}
	.timeline_node {
		text-align: center;
		min-width: 0;
	}
	.node_icon_wrapper {
		margin: 0 auto 14px;
		display: grid;
		place-items: center;
		height: clamp(42px, 4.167vw, 80px);
	}
	.node_icon_wrapper :global(svg) {
		width: clamp(36px, 4.167vw, 80px);
		height: clamp(36px, 4.167vw, 80px);
		stroke: white;
	}
	.node_title {
		margin: 0 0 14px;
		color: var(--c-gold-light);
		font: 700 clamp(14px, 1.25vw, 24px)/1.3 var(--font-heading);
	}
	.node_desc {
		margin: 0;
		font-size: clamp(11px, 1.042vw, 20px);
		font-style: italic;
	}
	.timeline_arrow {
		padding-top: clamp(22px, 2.083vw, 40px);
	}
	.arrow_line {
		height: 1px;
		background: white;
		position: relative;
	}
	.arrow_line::after {
		content: '';
		position: absolute;
		right: 0;
		top: -3px;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: white;
	}
	.curriculum_columns {
		display: grid;
		grid-template-columns: 707fr 935fr;
		gap: clamp(28px, 2.552vw, 49px);
		align-items: stretch;
	}
	.unit_allocation_card {
		border: 2px solid var(--c-gold);
		border-radius: 25px;
		padding: clamp(28px, 3.802vw, 73px);
		display: flex;
		flex-direction: column;
	}
	.allocation_title {
		font: 700 clamp(20px, 1.875vw, 36px)/1.25 var(--font-heading);
		letter-spacing: 0.05em;
		color: var(--c-maroon);
		margin: 0 0 clamp(34px, 3.646vw, 70px);
	}
	.allocation_list {
		display: grid;
		gap: clamp(27px, 2.24vw, 43px);
	}
	.item_header {
		display: flex;
		justify-content: space-between;
		gap: 16px;
		margin-bottom: clamp(20px, 1.875vw, 36px);
	}
	.item_label {
		font-weight: 400;
	}
	.item_value {
		color: var(--c-maroon);
		font-weight: 700;
		font-style: italic;
		white-space: nowrap;
	}
	.progress_track {
		height: 8px;
		border-radius: 20px;
		background: #fff1d2;
		overflow: hidden;
	}
	.progress_bar {
		height: 100%;
		background: var(--c-gold);
		border-radius: inherit;
	}
	.total_credits_banner {
		display: flex;
		justify-content: space-between;
		align-items: start;
		gap: 15px;
		padding: clamp(20px, 1.25vw, 24px);
		background: linear-gradient(120deg, #941518, #6d1719);
		border-radius: 9px;
		color: white;
		margin-top: clamp(48px, 6.042vw, 116px);
	}
	.banner_label {
		font-size: inherit;
		margin: 8px 0 0;
	}
	.banner_right {
		text-align: right;
	}
	.total_units_num {
		color: var(--c-gold-light);
		font: 700 clamp(36px, 3.125vw, 60px)/1 var(--font-heading);
	}
	.banner_sublabel {
		margin: 6px 0 0;
		font-style: italic;
		font-size: clamp(12px, 1.042vw, 20px);
	}
	.curriculum_right_panel {
		display: flex;
		flex-direction: column;
		gap: clamp(28px, 2.188vw, 42px);
	}
	.enhancement_tabs {
		display: flex;
		align-items: end;
		gap: 0;
	}
	.enhancement_tab_btn {
		position: relative;
		border: 0;
		border-radius: 15px 15px 0 0;
		padding: clamp(14px, 1.25vw, 24px);
		color: white;
		font: 500 clamp(12px, 1.25vw, 24px)/1.3 var(--font-heading);
		letter-spacing: 0.08em;
		cursor: pointer;
		white-space: nowrap;
	}
	.circular_btn {
		background: linear-gradient(120deg, #941518, #6d1719);
		box-shadow: inset 0 5px 0 var(--c-gold-light);
	}
	.experiential_btn {
		background: linear-gradient(90deg, #ca8106, #9d6200);
	}
	.enhancement_tab_btn:not(.active) {
		padding-top: clamp(10px, 0.833vw, 16px);
		padding-bottom: clamp(10px, 0.833vw, 16px);
	}
	.enhancement_content_panel {
		background: var(--panel-maroon);
		border-radius: 0 20px 20px 20px;
		padding: clamp(22px, 2.552vw, 49px);
	}
	.enhancement_grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: clamp(20px, 1.875vw, 36px);
	}
	.enhancement_card {
		background: white;
		border-radius: 10px;
		padding: clamp(18px, 1.146vw, 22px);
		min-height: clamp(155px, 10.365vw, 199px);
	}
	.card_icon_row {
		display: flex;
		flex-direction: column;
		align-items: start;
		gap: clamp(15px, 1.146vw, 22px);
	}
	.card_icon_row :global(svg) {
		color: var(--c-gold-light);
		width: 28px;
		height: 28px;
	}
	.card_title {
		margin: 0;
		color: var(--c-gold-dark);
		font: 500 clamp(14px, 1.146vw, 22px)/1.35 var(--font-heading);
		letter-spacing: 0.06em;
	}
	.card_desc {
		margin: 8px 0 0;
		color: #111;
		font-size: clamp(12px, 1.042vw, 20px);
		line-height: 1.25;
		letter-spacing: 0;
	}
	.interactive_explorer_card {
		background: linear-gradient(163.75deg, #451516 1.7%, #1a1614 47.27%, #392e1f 73.34%);
		border-radius: 20px;
		padding: clamp(24px, 2.813vw, 54px);
		flex: 1;
	}
	.explorer_title {
		color: white;
		font: 700 clamp(18px, 1.875vw, 36px)/1.25 var(--font-heading);
		letter-spacing: 0.04em;
		margin: 0 0 18px;
	}
	.explorer_tabs {
		display: flex;
		gap: clamp(12px, 1.302vw, 25px);
		margin-bottom: clamp(24px, 1.823vw, 35px);
	}
	.explorer_tab_btn {
		background: var(--c-gold-light);
		color: white;
		font: 500 clamp(12px, 1.146vw, 22px)/1.3 var(--font-heading);
		border: 0;
		padding: 5px 16px;
		border-radius: 5px;
		cursor: pointer;
	}
	.explorer_tab_btn.active {
		background: var(--c-gold-dark);
	}
	.courses_list_container {
		border-radius: 10px;
		background: var(--panel-paper);
		color: #000;
		padding: clamp(14px, 1.25vw, 24px) clamp(20px, 1.875vw, 36px);
	}
	.course_row {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		gap: 18px;
		padding: clamp(10px, 0.677vw, 13px) 0;
		border-bottom: 1px solid #7b7772;
		font-size: clamp(12px, 1.146vw, 22px);
		letter-spacing: 0;
	}
	.course_row:last-child {
		border-bottom: 0;
	}
	.course_code,
	.course_units {
		font-weight: 700;
	}
	.course_units {
		white-space: nowrap;
	}
	.faculty_grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: clamp(28px, 2.604vw, 50px);
	}
	.faculty_profile_card {
		border: 2px solid var(--c-gold);
		border-radius: 25px;
		padding: clamp(28px, 3.177vw, 61px);
		color: inherit;
		text-decoration: none;
		position: relative;
		transition: box-shadow 0.2s;
	}
	.faculty_profile_card:hover {
		box-shadow: 0 12px 30px #5c0f1612;
	}
	.card_decor_strip {
		display: none;
	}
	.faculty_header {
		display: flex;
		align-items: center;
		gap: clamp(22px, 1.771vw, 34px);
		margin-bottom: clamp(30px, 2.708vw, 52px);
	}
	.faculty_icon_box {
		width: clamp(55px, 4.688vw, 90px);
		height: clamp(55px, 4.688vw, 90px);
		display: grid;
		place-items: center;
		color: var(--c-maroon);
		flex: 0 0 auto;
	}
	.faculty_icon_box :global(svg) {
		width: 100%;
		height: 100%;
	}
	.faculty_type {
		font: 600 clamp(19px, 1.667vw, 32px)/1.3 var(--font-heading);
		color: var(--c-maroon);
		margin: 0 0 8px;
		letter-spacing: 0.04em;
	}
	.faculty_sub {
		color: var(--c-gold-dark);
		font-size: clamp(14px, 1.25vw, 24px);
		font-style: italic;
	}
	.faculty_desc {
		margin: 0 0 clamp(28px, 2.083vw, 40px);
	}
	.faculty_checklist {
		list-style: none;
		padding: 0 clamp(0px, 1.979vw, 38px);
		margin: 0;
		display: grid;
		gap: 20px;
	}
	.checklist_item {
		display: flex;
		align-items: center;
		gap: clamp(15px, 1.563vw, 30px);
		color: var(--c-gold-dark);
	}
	.checklist_item :global(svg) {
		flex: 0 0 auto;
		width: clamp(20px, 1.823vw, 35px);
		height: clamp(20px, 1.823vw, 35px);
	}
	.faculty_cta {
		display: none;
	}
	.org_card {
		aspect-ratio: 395 / 678;
		background-size: auto 100%;
		background-position: center;
	}
	.org_overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, #9415184d, #fac5494d);
	}
	.org_content {
		position: absolute;
		inset: auto 0 0;
		color: white;
		padding: clamp(18px, 2.188vw, 42px);
		background: linear-gradient(0deg, #a67c1b90, #a67c1b00);
	}
	.org_title {
		margin: 0 0 10px;
		font: 800 clamp(28px, 3.333vw, 64px)/1 var(--font-heading);
		letter-spacing: 0.05em;
	}
	.org_desc {
		margin: 0;
		font: italic 500 clamp(12px, 1.25vw, 24px)/1.1 var(--font-heading);
		letter-spacing: 0.05em;
	}
	.notable_alumni_title {
		color: var(--c-gold-dark);
		background: var(--grad-gold);
		background-clip: text;
		-webkit-text-fill-color: transparent;
		margin: 0 0 clamp(30px, 2.604vw, 50px);
		font: 700 clamp(32px, 4.167vw, 80px)/1.2 var(--font-heading);
		letter-spacing: 0.06em;
	}
	.alumni_section_container {
		margin-bottom: clamp(45px, 4.688vw, 90px);
	}
	.alumni_slideshow {
		position: relative;
	}
	.alumni_cards_container {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: clamp(30px, 3.281vw, 63px);
		width: 90%;
		margin: auto;
	}
	.alumni_portrait_card {
		border: 0;
		padding: 0;
		color: white;
		font: inherit;
		text-align: left;
		position: relative;
		aspect-ratio: 460 / 600;
		border-radius: 25px;
		background: linear-gradient(103.84deg, #8e1518, #1e1e1e);
		cursor: pointer;
		overflow: hidden;
	}
	.portrait_info {
		position: absolute;
		inset: auto 0 0;
		padding: clamp(18px, 2.5vw, 48px);
		background: linear-gradient(0deg, #0006, transparent);
	}
	.alum_name {
		margin: 0 0 4px;
		font: 700 clamp(20px, 2.083vw, 40px)/1.25 var(--font-heading);
	}
	.alum_role_tag {
		color: var(--c-gold-light);
		font: italic 500 clamp(13px, 1.25vw, 24px)/1.3 var(--font-body);
	}
	.slide_nav_btn {
		position: absolute;
		top: 45%;
		border: 0;
		border-radius: 50%;
		width: 42px;
		height: 42px;
		background: white;
		color: var(--c-maroon);
		display: grid;
		place-items: center;
		cursor: pointer;
		opacity: 0;
		transition: opacity 0.2s;
	}
	.alumni_slideshow:hover .slide_nav_btn:not(:disabled),
	.slide_nav_btn:focus-visible:not(:disabled) {
		opacity: 1;
	}
	.slide_prev {
		left: -5px;
	}
	.slide_next {
		right: -5px;
	}
	.slide_nav_btn:disabled {
		opacity: 0.35;
		cursor: default;
	}
	.carousel_indicators {
		display: flex;
		justify-content: center;
		gap: 10px;
		margin-top: 22px;
	}
	/* Desktop shows all three cards on a single page: hide carousel controls */
	@media (min-width: 541px) {
		.slide_nav_btn,
		.carousel_indicators {
			display: none;
		}
	}
	.dot_indicator {
		width: 7px;
		height: 7px;
		padding: 0;
		border: 0;
		border-radius: 50%;
		background: #ddd;
		cursor: pointer;
	}
	.dot_indicator.active {
		background: var(--c-gold-dark);
	}
	.tracer_grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: clamp(28px, 3.281vw, 63px);
	}
	.employment_horizon_card {
		border: 2px solid var(--c-gold);
		border-radius: 25px;
		padding: clamp(28px, 3.333vw, 64px);
	}
	.horizon_title {
		margin: 0 0 clamp(35px, 3.229vw, 62px);
		color: var(--c-maroon);
		font: 700 clamp(19px, 1.875vw, 36px)/1.3 var(--font-heading);
		letter-spacing: 0.05em;
	}
	.tracer_table {
		width: 100%;
		border-collapse: collapse;
		font-size: clamp(12px, 1.146vw, 22px);
	}
	.tracer_table th {
		text-align: left;
		padding: 0 0 20px;
		font-size: clamp(12px, 1.25vw, 24px);
		font-weight: 700;
		border-bottom: 1px solid #888;
	}
	.tracer_table td {
		padding: clamp(20px, 2.24vw, 43px) 0;
		border-bottom: 1px solid #888;
	}
	.tracer_table tr:last-child td {
		border: 0;
		padding-bottom: 0;
	}
	.tracer_table .th_right,
	.tracer_table .td_right {
		text-align: right;
		color: var(--c-gold-dark);
	}
	.tracer_table .td_right {
		font-weight: 700;
	}
	.peo_attainment_card {
		padding: clamp(28px, 3.646vw, 70px);
		border-radius: 25px;
		background: linear-gradient(99deg, #fac549 5.596%, #ca8106 92.972%);
		color: #000;
	}
	.peo_title {
		margin: 0 0 clamp(35px, 3.646vw, 70px);
		font: 700 clamp(20px, 1.667vw, 32px)/1.3 var(--font-body);
	}
	.peo_scores_grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: clamp(12px, 1.563vw, 30px);
	}
	.peo_score_tile {
		border-top: clamp(6px, 0.625vw, 12px) solid var(--c-maroon);
		border-radius: 10px;
		background: white;
		min-height: clamp(165px, 14.427vw, 277px);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
		padding: 18px 5px;
	}
	.peo_num_label {
		font-size: clamp(12px, 1.042vw, 20px);
	}
	.peo_score_num {
		font: 600 clamp(26px, 2.5vw, 48px)/1 var(--font-heading);
		color: var(--c-maroon);
	}
	.peo_status {
		font-size: clamp(10px, 1.042vw, 20px);
		color: var(--c-gold-dark);
	}
	.satisfaction_loop_box {
		border-radius: 20px;
		margin-top: clamp(20px, 1.406vw, 27px);
		padding: clamp(18px, 1.875vw, 36px);
		background: linear-gradient(
			135.55deg,
			#ffddde 4%,
			#fff0f0 22.33%,
			#fff 51.39%,
			#faf2e5 75.5%,
			#edd3a6 96.25%
		);
	}
	.loop_header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		font-size: clamp(11px, 1.042vw, 20px);
		font-weight: 500;
	}
	.loop_percentage {
		color: var(--c-maroon);
	}
	.loop_progress_track {
		height: 7px;
		border-radius: 8px;
		background: white;
		margin: 25px 0 20px;
		overflow: hidden;
	}
	.loop_progress_bar {
		height: 100%;
		border-radius: inherit;
		background: var(--c-maroon);
	}
	.loop_subtext {
		font-size: clamp(10px, 0.938vw, 18px);
		font-style: italic;
		line-height: 1.2;
		margin: 0;
	}
	@media (max-width: 1000px) {
		.lifecycle_timeline {
			grid-template-columns: 1fr 28px 1fr 28px 1fr 28px 1fr;
		}
		.faculty_header {
			gap: 18px;
		}
		.enhancement_tab_btn {
			white-space: normal;
		}
	}
	@media (max-width: 800px) {
		.curriculum_columns,
		.faculty_grid,
		.tracer_grid {
			grid-template-columns: 1fr;
		}
		.compliance_grid {
			gap: 14px;
		}
		.compliance_subcard {
			padding: 16px;
		}
		.total_credits_banner {
			margin-top: 40px;
		}
		.curriculum_right_panel {
			gap: 28px;
		}
		.alumni_cards_container {
			gap: 18px;
		}
		.portrait_info {
			padding: 18px;
		}
		.alum_name {
			font-size: 17px;
		}
		.peo_score_tile {
			min-height: 180px;
		}
	}
	@media (max-width: 540px) {
		.hero_title {
			font-size: clamp(36px, 9.27vw, 50px);
		}
		.compliance_grid {
			grid-template-columns: 1fr;
		}
		.compliance_subcard {
			min-height: 145px;
		}
		.lifecycle_timeline {
			grid-template-columns: 1fr 1fr;
			gap: 30px 15px;
		}
		.timeline_arrow {
			display: none;
		}
		.enhancement_grid {
			gap: 14px;
		}
		.enhancement_card {
			padding: 16px;
		}
		.explorer_tabs {
			gap: 10px;
		}
		.explorer_tab_btn {
			flex: 1;
			padding: 7px 6px;
		}
		.course_row {
			gap: 10px;
		}
		.org_desc {
			font-size: 12px;
		}
		.alumni_cards_container {
			grid-template-columns: 1fr;
			width: 80%;
		}
		.alumni_portrait_card.slide_hidden {
			display: none;
		}
		.alum_name {
			font-size: 23px;
		}
		.alum_role_tag {
			font-size: 14px;
		}
		.slide_nav_btn {
			opacity: 1;
		}
		.tracer_table {
			letter-spacing: 0;
		}
		.peo_attainment_card {
			padding: 25px;
		}
	}

	.modal_overlay {
		position: fixed;
		inset: 0;
		background: rgba(22, 5, 7, 0.7);
		backdrop-filter: blur(10px);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		padding: 1.5rem;
		width: 100%;
		height: 100%;
		max-width: none;
		max-height: none;
		margin: 0;
		border: 0;
		box-sizing: border-box;
		animation: overlayFadeIn 0.3s ease;
	}

	.modal_content {
		animation: modalZoomIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
		overscroll-behavior: contain;
	}

	.modal_toolbar {
		display: flex;
		justify-content: flex-end;
		padding: 8px 12px;
		background: var(--c-surface);
	}

	.close_modal_btn {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: rgba(0, 0, 0, 0.07);
		border: none;
		color: #333;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		z-index: 10;
		transition: all 0.2s ease;
	}

	.close_modal_btn:hover {
		background: rgba(0, 0, 0, 0.14);
		transform: scale(1.08);
	}

	.modal_grid {
		display: grid;
		grid-template-columns: 280px 1fr;
	}

	@media (max-width: 760px) {
		.modal_grid {
			grid-template-columns: 1fr;
		}
	}

	/* ── Left Profile Panel ── */
	.modal_profile_panel {
		background: linear-gradient(160deg, #fdfbf7 0%, #f4ede0 100%);
		padding: 2.5rem 2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		border-right: 1px solid rgba(0, 0, 0, 0.06);
	}

	@media (max-width: 760px) {
		.modal_profile_panel {
			border-right: none;
			border-bottom: 1px solid rgba(0, 0, 0, 0.06);
		}
	}

	.modal_profile_card {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		width: 100%;
	}

	.detail_info_block {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.1rem;
	}

	.detail_alum_name {
		font-family: var(--font-heading);
		font-size: 1.3rem;
		font-weight: 900;
		color: var(--color-maroon);
		margin: 0 0 0.2rem 0;
		line-height: 1.15;
	}

	.detail_alum_role {
		font-family: var(--font-body);
		font-size: 0.85rem;
		color: var(--color-gold-dark);
		font-weight: 700;
		font-style: italic;
		margin: 0 0 0.15rem 0;
	}

	.detail_alum_company {
		font-family: var(--font-body);
		font-size: 0.85rem;
		color: #444;
		margin: 0;
	}

	.detail_meta_row {
		display: flex;
		gap: 0.4rem;
		margin: 0.9rem 0 0;
		flex-wrap: wrap;
		justify-content: center;
	}

	.detail_batch_tag {
		background: var(--color-maroon);
		color: #fff;
		font-family: var(--font-body);
		font-size: 0.68rem;
		font-weight: 700;
		padding: 0.3rem 0.75rem;
		border-radius: 20px;
	}

	/* ── Right Video Panel ── */
	.modal_video_panel {
		padding: 16px;
		min-width: 0;
		display: flex;
		flex-direction: column;
		background: #fff;
		justify-content: center;
	}

	.testimonial_video_wrapper {
		position: relative;
		width: 100%;
		flex: none;
		min-width: 0;
		overflow: hidden;
		border-radius: 12px;
		background: #0e0e0e;
		aspect-ratio: 16 / 9;
	}

	.testimonial_video {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		border: 0;
		display: block;
	}


	@keyframes overlayFadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes modalZoomIn {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
</style>
