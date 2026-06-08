<script>
	import {
		ClipboardCheck,
		BookOpen,
		Users,
		Target,
		Award,
		ArrowRight,
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
		Network,
		Layers
	} from 'lucide-svelte';
	import Footer from '$lib/components/footer.svelte';

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
	/** Slideshow: which page of 3 we're on (0 = first 3, 1 = second 3) */
	let slidePage = $state(0);
	/** @type {CourseYear[]} */
	const courseYears = [1, 2, 3, 4];

	// Alumni profiles - 6 total, shown 3 per slide
	const alumniList = [
		{
			name: 'Sehun Domingo',
			shortName: 'Sehun',
			role: 'Data Analyst at Google',
			batch: 'Batch 2018 - 2022',
			honors: 'Cum Laude',
			degree: 'Bachelor of Science in Information Technology',
			img: '/teaching-learning/alum-sehun.png',
			badgeColor: '#2563EB',
			badgeLetter: 'A',
			testimonialVideoUrl: ''
		},
		{
			name: 'Dahyun Dela Cruz',
			shortName: 'Dahyun',
			role: 'IT Global Entrepreneur',
			batch: 'Batch 2018 - 2022',
			honors: 'Magna Cumlaude',
			degree: 'Bachelor of Science in Information Technology',
			img: '/teaching-learning/alum-dahyun.png',
			badgeColor: '#7C3AED',
			badgeLetter: 'F',
			testimonialVideoUrl: ''
		},
		{
			name: 'Irene Joy Reyes',
			shortName: 'Irene',
			role: 'Data Scientist at Microsoft',
			batch: 'Batch 2018 - 2022',
			honors: 'Summa Cum Laude',
			degree: 'Bachelor of Science in Information Technology',
			img: '/teaching-learning/alum-irene.png',
			badgeColor: '#EC4899',
			badgeLetter: 'S',
			testimonialVideoUrl: ''
		},
		{
			name: 'Hoshi Batumbakal',
			shortName: 'Hoshi',
			role: 'CTO at Start-up Inc.',
			batch: 'Batch 2017 - 2021',
			honors: 'Cum Laude',
			degree: 'Bachelor of Science in Information Technology',
			img: '/teaching-learning/alum-hoshi.png',
			badgeColor: '#10B981',
			badgeLetter: 'C',
			testimonialVideoUrl: ''
		},
		{
			name: 'Jaemin Suarez',
			shortName: 'Jaemin',
			role: 'Project Manager at Azure',
			batch: 'Batch 2016 - 2020',
			honors: 'Magna Cumlaude',
			degree: 'Bachelor of Science in Information Technology',
			img: '/teaching-learning/alum-jaemin.png',
			badgeColor: '#F59E0B',
			badgeLetter: 'M',
			testimonialVideoUrl: ''
		},
		{
			name: 'Winter Mendoza',
			shortName: 'Winter',
			role: 'Professor at UPD',
			batch: 'Batch 2018 - 2022',
			honors: 'Magna Cumlaude',
			degree: 'Bachelor of Science in Information Technology',
			img: '/teaching-learning/alum-winter.png',
			badgeColor: '#EF4444',
			badgeLetter: 'N',
			testimonialVideoUrl: ''
		}
	];

	// Total slide pages: one page per 3 alumni
	const totalSlidePages = Math.ceil(alumniList.length / 3);

	/** Returns the 3 alumni visible on the current slide page */
	function visibleAlumni() {
		return alumniList.slice(slidePage * 3, slidePage * 3 + 3);
	}

	function prevSlide() {
		slidePage = (slidePage - 1 + totalSlidePages) % totalSlidePages;
	}

	function nextSlide() {
		slidePage = (slidePage + 1) % totalSlidePages;
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
		selectedAlumIndex = null;
	}

	/** 
	 * Open modal with the correct global index from the visible slice 
	 * @param {number} localIndex
	 */
	function openAlumModal(localIndex) {
		selectedAlumIndex = slidePage * 3 + localIndex;
	}

	// Organizations list with high-quality themed images
	const organizations = [
		{
			title: 'IBITS',
			desc: 'Institute of Bachelors of Information Technology Studies',
			img: '/teaching-learning/org-ibits.jpg'
		},
		{
			title: 'ARK',
			desc: 'Academitech Research and Knowledge',
			img: '/teaching-learning/org-ark.jpg'
		},
		{
			title: 'AWSCC PUP',
			desc: 'Amazon Web Services Cloud Club - PUP',
			img: '/teaching-learning/org-awscc.jpg'
		},
		{
			title: 'CNCP',
			desc: 'Cisco NetConnect PUP - Manila',
			img: '/teaching-learning/org-cncp.jpg'
		},
		{
			title: 'GDGOC PUP',
			desc: 'Google Developer Groups on Campus - PUP Chapter',
			img: '/teaching-learning/org-gdgoc.jpg'
		},
		{
			title: 'JBECP PUP',
			desc: 'Junior Blockchain Education Consortium of the Philippines - PUP Manila',
			img: '/teaching-learning/org-jbecp.jpg'
		},
		{
			title: 'JPCS PUP',
			desc: 'Junior Philippine Computer Society - PUP Manila',
			img: '/teaching-learning/org-jpcs.jpg'
		},
		{
			title: 'PUP TPG',
			desc: "PUP The Programmers' Guild",
			img: '/teaching-learning/org-tpg.jpg'
		},
		{
			title: 'PUPMSC',
			desc: 'PUP Microsoft Student Community',
			img: '/teaching-learning/org-pupmsc.jpg'
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

<!-- ─────────────────────────────────────────────
  HERO SECTION
───────────────────────────────────────────── -->
<section class="hero_section">
	<div class="checkerboard_bg" aria-hidden="true"></div>
	<div class="hero_content">
		<h1 class="hero_title">TEACHING &amp;<br />LEARNING</h1>
	</div>
</section>

<!-- ─────────────────────────────────────────────
  SECTION 1: PROGRAM COMPLIANCE & GOVERNANCE
───────────────────────────────────────────── -->
<section class="content_section" id="program-compliance">
	<div class="section_label">
		<ClipboardCheck size={20} strokeWidth={1.5} class="section_icon maroon" />
		<span>PROGRAM COMPLIANCE &amp; GOVERNANCE</span>
	</div>
	<hr class="section_divider" />

	<div class="compliance_block">
		<!-- Governance Summary Card -->
		<div class="governance_summary_card">
			<h3 class="card_section_title">GOVERNANCE SUMMARY</h3>
			<p class="governance_desc">
				The Bachelor of Science in Information Technology operates under a robust regulatory architecture, strictly adhering to <span class="highlight_text">COPC No. 008</span> for operations, <span class="highlight_text">OBE Principles</span> for instructional delivery, and <span class="highlight_text">CMO No. 25</span> for curriculum alignment. Our framework ensures global competitiveness through rigorous standard-setting.
			</p>

			<div class="compliance_grid">
				<div class="compliance_subcard copc_card">
					<div class="card_bg_image" style="background-image: url('/teaching-learning/copc-status.jpg')" aria-hidden="true"></div>
					<div class="card_bg_overlay"></div>
					<div class="subcard_content">
						<span class="subcard_label">COPC STATUS</span>
						<h4 class="subcard_title">No. 008</h4>
						<p class="subcard_desc">Full Accreditation</p>
					</div>
				</div>

				<div class="compliance_subcard obe_card">
					<div class="card_bg_image" style="background-image: url('/teaching-learning/obe-framework.jpg')" aria-hidden="true"></div>
					<div class="card_bg_overlay"></div>
					<div class="subcard_content">
						<span class="subcard_label">FRAMEWORK</span>
						<h4 class="subcard_title">OBE-Driven</h4>
						<p class="subcard_desc">Alignment Verified</p>
					</div>
				</div>

				<div class="compliance_subcard cmo_card">
					<div class="card_bg_image" style="background-image: url('/teaching-learning/cmo-standard.jpg')" aria-hidden="true"></div>
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
			<div class="lifecycle_bg_image" style="background-image: url('/teaching-learning/curriculum-lifecycle.jpg')" aria-hidden="true"></div>
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
		<BookOpen size={20} strokeWidth={1.5} class="section_icon maroon" />
		<span>CURRICULUM ARCHITECTURE &amp; INSTRUCTION DELIVERY</span>
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
						onclick={() => (activeTab = 'circular')}
					>
						CIRCULAR ENHANCEMENTS
					</button>
					<button
						class="enhancement_tab_btn experiential_btn"
						class:active={activeTab === 'experiential'}
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
					{#each courseYears as year}
						<button
							class="explorer_tab_btn"
							class:active={activeYear === year}
							onclick={() => (activeYear = year)}
						>
							YEAR {year}
						</button>
					{/each}
				</div>

				<div class="courses_list_container">
					{#each coursesByYear[activeYear] as course}
						<div class="course_row">
							<div class="course_details">
								<span class="course_code">{course.code}:</span>
								<span class="course_name">{course.name}</span>
							</div>
							<span class="course_units">{course.units} units</span>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<!-- ─────────────────────────────────────────────
  SECTION 3: ACADEMIC STAFF & FACULTY PROFILES
───────────────────────────────────────────── -->
<section class="content_section" id="staff-faculty-profile">
	<div class="section_label">
		<Users size={20} strokeWidth={1.5} class="section_icon maroon" />
		<span>ACADEMIC STAFF &amp; FACULTY PROFILES</span>
	</div>
	<hr class="section_divider" />

	<div class="faculty_grid">
		<!-- Full-Time Card -->
		<div class="faculty_profile_card">
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
				Dedicated faculty members with some Ph.D., Masteral, and Bachelors credentials focusing on pedagogical innovation and institutional research trajectories. Expertise spans across Data Science, AI Ethics, and Network Engineering.
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
		</div>

		<!-- Part-Time Card -->
		<div class="faculty_profile_card">
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
				Active industry professionals bringing real-world DevOps, Cloud Architecture, and Software Engineering methodologies directly into the classroom. Bridging the gap between theory and production.
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
		</div>
	</div>
</section>

<!-- ─────────────────────────────────────────────
  SECTION 4: STUDENT OUTCOMES & ECO-SYSTEM
───────────────────────────────────────────── -->
<section class="content_section" id="student-outcomes">
	<div class="section_label">
		<Target size={20} strokeWidth={1.5} class="section_icon maroon" />
		<span>STUDENT OUTCOMES &amp; ECO-SYSTEM</span>
	</div>
	<hr class="section_divider" />

	<div class="orgs_marquee_wrapper">
		<div class="orgs_marquee_track">
			<!-- First set of 9 cards -->
			{#each organizations as org}
				<div class="org_card" style="background-image: url('{org.img}')">
					<div class="org_overlay"></div>
					<div class="org_content">
						<h3 class="org_title">{org.title}</h3>
						<p class="org_desc">{org.desc}</p>
					</div>
				</div>
			{/each}
			<!-- Second set of 9 cards for seamless looping -->
			{#each organizations as org}
				<div class="org_card" style="background-image: url('{org.img}')">
					<div class="org_overlay"></div>
					<div class="org_content">
						<h3 class="org_title">{org.title}</h3>
						<p class="org_desc">{org.desc}</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- ─────────────────────────────────────────────
  SECTION 5: LEARNING & GRADUATES OUTCOME
───────────────────────────────────────────── -->
<section class="content_section" id="learner-graduate-qa">
	<div class="section_label">
		<Award size={20} strokeWidth={1.5} class="section_icon maroon" />
		<span>LEARNING &amp; GRADUATES OUTCOME</span>
	</div>
	<hr class="section_divider" />

	<!-- Notable Alumni Card - 3-per-page Slideshow -->
	<div class="alumni_section_container">
		<div class="notable_alumni_card">
			<div class="alumni_left">
				<h2 class="notable_alumni_title">NOTABLE<br />ALUMNI</h2>
				<p class="alumni_intro_desc">
					Our graduates are the blueprint of our success. From visionary software engineers and tech entrepreneurs to global IT leaders, the <span class="bold_text">Department of Information Technology</span> proudly celebrates the alumni who are redefining industries, driving digital transformation, and shaping the future of technology across the globe.
				</p>
			</div>

			<div class="alumni_right">
				<!-- Slideshow wrapper -->
				<div class="alumni_slideshow">
					<!-- Prev button -->
					<button class="slide_nav_btn slide_prev" onclick={prevSlide} aria-label="Previous alumni">
						<ChevronLeft size={20} strokeWidth={2.5} />
					</button>

					<!-- 3 alumni cards -->
					<div class="alumni_cards_container">
						{#each visibleAlumni() as alum, i}
							<!-- svelte-ignore a11y_click_events_have_key_events -->
							<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
							<div
								class="alumni_portrait_card"
								onclick={() => openAlumModal(i)}
								role="listitem"
							>
								<div class="portrait_image_wrapper">
									<img src={alum.img} alt={alum.name} class="portrait_img" />
									<div class="portrait_play_overlay">
										<div class="play_icon_circle">
											<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
										</div>
									</div>
								</div>
								<div class="portrait_info">
									<h4 class="alum_name">{alum.name}</h4>
									<span class="alum_role_tag">{alum.role}</span>
								</div>
							</div>
						{/each}
					</div>

					<!-- Next button -->
					<button class="slide_nav_btn slide_next" onclick={nextSlide} aria-label="Next alumni">
						<ChevronRight size={20} strokeWidth={2.5} />
					</button>
				</div>

				<!-- Page dot indicators -->
				<div class="carousel_indicators">
					{#each Array(totalSlidePages) as _, p}
						<button
							class="dot_indicator"
							class:active={slidePage === p}
							onclick={() => (slidePage = p)}
							aria-label="Go to slide {p + 1}"
						></button>
					{/each}
				</div>
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
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<!-- svelte-ignore a11y_interactive_supports_focus -->
	<div class="modal_overlay" onclick={closeModal} role="dialog" aria-modal="true">
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="modal_content" onclick={(e) => e.stopPropagation()}>
			<button class="close_modal_btn" onclick={closeModal} aria-label="Close modal">
				<X size={24} />
			</button>

			<div class="modal_grid">
				<!-- Left Panel: Profile Detail (Figma-aligned) -->
				<div class="modal_profile_panel">
					<div class="modal_profile_card">
						<!-- Circular photo with ring border -->
						<div class="detail_image_wrapper">
							<img src={alumniList[selectedAlumIndex].img} alt={alumniList[selectedAlumIndex].name} class="detail_img" />
						</div>

						<div class="detail_info_block">
							<h3 class="detail_alum_name">{alumniList[selectedAlumIndex].name}</h3>
							<p class="detail_alum_role">{alumniList[selectedAlumIndex].role}</p>

							<!-- Decorative social icon row -->
							<div class="detail_social_row" aria-label="Social links">
								<span class="social_icon_btn" aria-label="Facebook">
									<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
								</span>
								<span class="social_icon_btn" aria-label="Instagram">
									<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
								</span>
								<span class="social_icon_btn" aria-label="LinkedIn">
									<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
								</span>
								<span class="social_icon_btn" aria-label="GitHub">
									<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
								</span>
							</div>

							<div class="detail_meta_row">
								<span class="detail_batch_tag">{alumniList[selectedAlumIndex].batch}</span>
								<span class="detail_honors_tag">{alumniList[selectedAlumIndex].honors}</span>
							</div>

							<p class="detail_degree_title"><em>{alumniList[selectedAlumIndex].degree}</em></p>
						</div>
					</div>
				</div>

				<!-- Right Panel: Testimonial Video (Figma-aligned) -->
				<div class="modal_video_panel">
					<p class="video_panel_title">TESTIMONIAL VIDEO</p>
					<div class="testimonial_video_wrapper">
						{#if alumniList[selectedAlumIndex].testimonialVideoUrl}
							<!-- svelte-ignore a11y_media_has_caption -->
							<video
								src={alumniList[selectedAlumIndex].testimonialVideoUrl}
								controls
								class="testimonial_video"
								poster={alumniList[selectedAlumIndex].img}
							>
								<track kind="captions" />
								Your browser does not support the video tag.
							</video>
						{:else}
							<!-- Placeholder: dark maroon gradient area with glowing play button -->
							<div class="video_placeholder">
								<div class="video_placeholder_inner">
									<div class="video_play_btn">
										<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
									</div>
									<p class="video_placeholder_text">Testimonial video coming soon</p>
								</div>
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}

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
	}

	.content_section {
		width: 100%;
		box-sizing: border-box;
		padding: 2.5rem 10% 4rem 10%;
		font-size: 1.05rem;
		background: #fff;
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

	#program-compliance {
		padding-top: 4.5rem;
	}

	#curriculum-architecture,
	#staff-faculty-profile,
	#student-outcomes,
	#learner-graduate-qa {
		padding-top: 1rem;
	}

	/* ── HERO ── */
	.hero_section {
		position: relative;
		height: 100dvh;
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
		animation: checkerboardFade 1.2s ease-out forwards;
	}

	.hero_content {
		position: relative;
		z-index: 1;
		text-align: center;
		padding: 4rem 2rem;
		animation: heroFadeIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
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

	@keyframes checkerboardFade {
		from {
			opacity: 0;
		}
		to {
			opacity: 0.85;
		}
	}

	@keyframes heroFadeIn {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	/* ── SECTION HEADERS ── */
	.section_label {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		font-family: var(--font-body);
		font-size: 1.15rem;
		font-weight: 700;
		letter-spacing: 0.2em;
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

	:global(.section_icon.maroon) {
		color: var(--color-maroon);
	}

	.section_divider {
		border: none;
		border-top: 1.5px solid rgba(0, 0, 0, 0.08);
		margin: 0.5rem 0 3rem 0;
	}

	/* ── SECTION 1: PROGRAM COMPLIANCE ── */
	.compliance_block {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.governance_summary_card {
		background: linear-gradient(135deg, #2a0a0d 0%, #160507 100%);
		border-radius: 24px;
		padding: 3rem 2.5rem;
		color: #fff;
		box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
	}

	.card_section_title {
		font-family: var(--font-heading);
		font-size: 1.1rem;
		font-weight: 900;
		color: var(--color-gold);
		letter-spacing: 0.1em;
		margin: 0 0 1.5rem 0;
		text-transform: uppercase;
	}

	.governance_desc {
		font-family: var(--font-body);
		font-size: 1.1rem;
		line-height: 1.8;
		color: rgba(255, 255, 255, 0.85);
		margin: 0 0 2.5rem 0;
		max-width: 900px;
	}

	.highlight_text {
		color: var(--color-gold-light);
		font-weight: 700;
	}

	.compliance_grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.5rem;
	}

	@media (max-width: 900px) {
		.compliance_grid {
			grid-template-columns: 1fr;
		}
	}

	.compliance_subcard {
		position: relative;
		border-radius: 16px;
		overflow: hidden;
		height: 150px;
		display: flex;
		align-items: flex-end;
		padding: 1.5rem;
		border: 1px solid rgba(255, 255, 255, 0.1);
		transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease;
	}

	.compliance_subcard:hover {
		transform: translateY(-4px);
		border-color: var(--color-gold-light);
	}

	.card_bg_image {
		position: absolute;
		inset: 0;
		background-size: cover;
		background-position: center;
		filter: grayscale(40%) brightness(0.65);
		transition: transform 0.4s ease;
	}

	.compliance_subcard:hover .card_bg_image {
		transform: scale(1.05);
	}

	.card_bg_overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(0deg, rgba(22, 5, 7, 0.9) 0%, rgba(22, 5, 7, 0.4) 100%);
	}

	.subcard_content {
		position: relative;
		z-index: 2;
	}

	.subcard_label {
		display: block;
		font-family: var(--font-body);
		font-size: 0.72rem;
		font-weight: 800;
		color: var(--color-gold-light);
		letter-spacing: 0.1em;
		margin-bottom: 0.25rem;
	}

	.subcard_title {
		font-family: var(--font-heading);
		font-size: 1.5rem;
		font-weight: 800;
		color: #fff;
		margin: 0 0 0.15rem 0;
	}

	.subcard_desc {
		font-family: var(--font-body);
		font-size: 0.8rem;
		color: rgba(255, 255, 255, 0.7);
		margin: 0;
	}

	/* Revision Lifecycle Card */
	.lifecycle_card {
		position: relative;
		border-radius: 24px;
		overflow: hidden;
		padding: 3.5rem 2.5rem;
		color: #fff;
		box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
	}

	.lifecycle_bg_image {
		position: absolute;
		inset: 0;
		background-size: cover;
		background-position: center;
		filter: brightness(0.85) contrast(1.05);
	}

	.lifecycle_bg_overlay {
		position: absolute;
		inset: 0;
		background: rgba(128, 27, 30, 0.82);
	}

	.dot_grid_overlay {
		position: absolute;
		inset: 0;
		background-image: radial-gradient(rgba(255, 255, 255, 0.22) 1.2px, transparent 1.2px);
		background-size: 16px 16px;
		opacity: 0.85;
	}

	.lifecycle_title {
		position: relative;
		z-index: 2;
		font-family: var(--font-heading);
		font-size: 1.1rem;
		font-weight: 900;
		color: var(--color-gold);
		letter-spacing: 0.08em;
		margin: 0 0 3.5rem 0;
		text-transform: uppercase;
		text-align: center;
	}

	.lifecycle_timeline {
		position: relative;
		z-index: 2;
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1.5rem;
	}

	@media (max-width: 820px) {
		.lifecycle_timeline {
			flex-direction: column;
			align-items: center;
			gap: 2.5rem;
		}
		.timeline_arrow {
			transform: rotate(90deg);
			margin: -0.75rem 0;
		}
	}

	.timeline_node {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		flex: 1;
	}

	.node_icon_wrapper {
		width: 64px;
		height: 64px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.08);
		border: 1px solid rgba(255, 255, 255, 0.25);
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 1.25rem;
		transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.timeline_node:hover .node_icon_wrapper {
		transform: scale(1.1) translateY(-3px);
		background: #fff;
		border-color: #fff;
	}

	:global(.node_icon) {
		color: #fff;
		transition: color 0.3s ease;
	}

	.timeline_node:hover :global(.node_icon) {
		color: var(--color-maroon);
	}

	.node_title {
		font-family: var(--font-heading);
		font-size: 1.05rem;
		font-weight: 700;
		color: #fff;
		margin: 0 0 0.4rem 0;
	}

	.node_desc {
		font-family: var(--font-body);
		font-size: 0.8rem;
		color: rgba(255, 255, 255, 0.7);
		margin: 0;
		line-height: 1.4;
	}

	.timeline_arrow {
		flex-grow: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		align-self: center;
		padding-bottom: 4rem; /* Lift up to line up with circle icons */
	}

	@media (max-width: 820px) {
		.timeline_arrow {
			padding-bottom: 0;
		}
	}

	.arrow_line {
		width: 64px;
		height: 2px;
		background: rgba(255, 255, 255, 0.4);
		position: relative;
	}

	.arrow_line::after {
		content: '';
		position: absolute;
		right: 0;
		top: -3px;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: #fff;
	}

	/* ── SECTION 2: CURRICULUM ARCHITECTURE ── */
	.curriculum_columns {
		display: grid;
		grid-template-columns: 420px 1fr;
		gap: 3.5rem;
	}

	@media (max-width: 1024px) {
		.curriculum_columns {
			grid-template-columns: 1fr;
			gap: 2.5rem;
		}
	}

	.unit_allocation_card {
		background: #fff;
		border: 1.5px solid var(--color-gold);
		border-radius: 20px;
		padding: 2.25rem 2rem;
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.03);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-sizing: border-box;
	}

	.allocation_title {
		font-family: var(--font-heading);
		font-size: 1.2rem;
		font-weight: 800;
		color: var(--color-maroon);
		margin: 0 0 2rem 0;
		letter-spacing: 0.02em;
	}

	.allocation_list {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin-bottom: 2.5rem;
	}

	.allocation_item {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.item_header {
		display: flex;
		justify-content: space-between;
		font-family: var(--font-body);
		font-size: 0.9rem;
		font-weight: 700;
		color: #2b2b2b;
	}

	.item_value {
		color: var(--color-maroon);
		font-weight: 800;
	}

	.progress_track {
		width: 100%;
		height: 4px;
		background: #eae5db;
		border-radius: 2px;
		overflow: hidden;
	}

	.progress_bar {
		height: 100%;
		border-radius: 2px;
		background: var(--color-gold);
	}

	.total_credits_banner {
		background: var(--color-maroon);
		border-radius: 12px;
		padding: 1.25rem 1.75rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #fff;
	}

	.banner_label {
		font-family: var(--font-body);
		font-size: 0.9rem;
		font-weight: 600;
		margin: 0;
		opacity: 0.9;
	}

	.banner_right {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		line-height: 1.1;
	}

	.total_units_num {
		font-family: var(--font-heading);
		font-size: 2.2rem;
		font-weight: 900;
		color: var(--color-gold-light);
		line-height: 1;
	}

	.banner_sublabel {
		font-family: var(--font-body);
		font-size: 0.8rem;
		font-weight: 500;
		font-style: italic;
		margin: 0;
		color: #fff;
	}

	.curriculum_right_panel {
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
	}

	/* Enhancements block */
	.enhancements_section {
		display: flex;
		flex-direction: column;
		gap: 0;
	}

	.enhancement_tabs {
		display: flex;
		gap: 4px;
		border-bottom: none;
	}

	.enhancement_tab_btn {
		font-family: var(--font-heading);
		font-size: 0.82rem;
		font-weight: 800;
		letter-spacing: 0.05em;
		padding: 0.75rem 1.5rem;
		border: none;
		cursor: pointer;
		border-radius: 10px 10px 0 0;
		color: #fff;
		opacity: 0.65;
		transition: opacity 0.25s ease;
	}

	.enhancement_tab_btn.active {
		opacity: 1;
	}

	.circular_btn {
		background: var(--color-maroon);
	}

	.experiential_btn {
		background: #a8811d;
	}

	.enhancement_content_panel {
		background: linear-gradient(180deg, #2a0a0d 0%, #160507 100%);
		border-radius: 0 12px 12px 12px;
		padding: 2.25rem;
	}

	.enhancement_grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
	}

	@media (max-width: 600px) {
		.enhancement_grid {
			grid-template-columns: 1fr;
		}
	}

	.enhancement_card {
		background: #ffffff;
		border-radius: 12px;
		padding: 1.5rem;
		box-shadow: none;
		transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.enhancement_card:hover {
		transform: translateY(-3px);
		box-shadow: 0 6px 20px rgba(255, 255, 255, 0.05);
	}

	.card_icon_row {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 0.6rem;
	}

	:global(.card_icon) {
		color: #cfa83a;
	}

	.card_title {
		font-family: var(--font-heading);
		font-size: 0.88rem;
		font-weight: 800;
		color: #cfa83a;
		letter-spacing: 0.05em;
		margin: 0;
	}

	.card_desc {
		font-family: var(--font-body);
		font-size: 0.82rem;
		line-height: 1.5;
		color: #444;
		margin: 0;
	}

	/* Interactive Explorer Card */
	.interactive_explorer_card {
		background: linear-gradient(135deg, #2a0a0d 0%, #160507 100%);
		border-radius: 20px;
		padding: 2.25rem 2rem;
		color: #fff;
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
	}

	.explorer_title {
		font-family: var(--font-heading);
		font-size: 1.1rem;
		font-weight: 900;
		color: var(--color-gold);
		letter-spacing: 0.05em;
		margin: 0 0 1.5rem 0;
	}

	.explorer_tabs {
		display: flex;
		gap: 0.6rem;
		flex-wrap: wrap;
		margin-bottom: 1.5rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		padding-bottom: 1rem;
	}

	.explorer_tab_btn {
		font-family: var(--font-heading);
		font-size: 0.78rem;
		font-weight: 800;
		letter-spacing: 0.05em;
		padding: 0.6rem 1.25rem;
		border-radius: 8px;
		border: 1px solid rgba(207, 168, 58, 0.35);
		background: transparent;
		color: var(--color-gold-light);
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.explorer_tab_btn:hover {
		background: rgba(207, 168, 58, 0.1);
	}

	.explorer_tab_btn.active {
		background: var(--color-gold);
		color: #1a1a1a;
		border-color: var(--color-gold);
		box-shadow: 0 4px 12px rgba(207, 168, 58, 0.25);
	}

	.courses_list_container {
		display: flex;
		flex-direction: column;
		background: #848484;
		border-radius: 12px;
		padding: 1.5rem;
		border: none;
	}

	.course_row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0.85rem 0;
		border-bottom: 1.5px solid rgba(255, 255, 255, 0.35);
		font-family: var(--font-body);
		font-size: 0.9rem;
		color: #fff;
	}

	.course_row:last-child {
		border-bottom: none;
		padding-bottom: 0;
	}

	.course_row:first-child {
		padding-top: 0;
	}

	.course_code {
		font-weight: 800;
		color: #fff;
	}

	.course_name {
		color: #fff;
	}

	.course_units {
		font-weight: 800;
		color: #fff;
		font-size: 0.9rem;
	}

	/* ── SECTION 3: ACADEMIC STAFF & FACULTY ── */
	.faculty_grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 2rem;
	}

	@media (max-width: 760px) {
		.faculty_grid {
			grid-template-columns: 1fr;
		}
	}

	.faculty_profile_card {
		background: #fff;
		border: 1px solid rgba(0, 0, 0, 0.08);
		border-radius: 20px;
		padding: 2.5rem 2.25rem;
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.03);
		position: relative;
		overflow: hidden;
		transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.faculty_profile_card:hover {
		transform: translateY(-4px);
		box-shadow: 0 12px 35px rgba(0, 0, 0, 0.06);
	}

	.card_decor_strip {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 4px;
	}

	.red_strip {
		background: var(--color-maroon);
	}

	.gold_strip {
		background: var(--color-gold);
	}

	.faculty_header {
		display: flex;
		align-items: center;
		gap: 1.25rem;
		margin-bottom: 1.5rem;
	}

	.faculty_icon_box {
		width: 48px;
		height: 48px;
		border-radius: 12px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
	}

	.red_bg {
		background: var(--color-maroon);
	}

	.gold_bg {
		background: var(--color-gold);
	}

	.header_titles {
		display: flex;
		flex-direction: column;
	}

	.faculty_type {
		font-family: var(--font-heading);
		font-size: 1.15rem;
		font-weight: 800;
		color: var(--color-maroon);
		margin: 0;
	}

	.faculty_sub {
		font-family: var(--font-body);
		font-size: 0.72rem;
		font-weight: 800;
		letter-spacing: 0.08em;
		color: #777;
		text-transform: uppercase;
		margin-top: 0.15rem;
	}

	.faculty_desc {
		font-family: var(--font-body);
		font-size: 0.95rem;
		line-height: 1.7;
		color: #444;
		margin: 0 0 2rem 0;
		min-height: 90px;
	}

	.faculty_checklist {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		border-top: 1px solid rgba(0, 0, 0, 0.06);
		padding-top: 1.5rem;
	}

	.checklist_item {
		display: flex;
		align-items: center;
		gap: 0.85rem;
		font-family: var(--font-body);
		font-size: 0.9rem;
		font-weight: 700;
		color: #2b2b2b;
	}

	:global(.check_icon) {
		flex-shrink: 0;
	}

	:global(.red_check) {
		color: var(--color-maroon);
	}

	:global(.gold_check) {
		color: var(--color-gold-dark);
	}

	/* ── SECTION 4: STUDENT OUTCOMES ── */
	.orgs_marquee_wrapper {
		width: 100%;
		overflow: hidden;
		position: relative;
		padding: 0.5rem 0 1.5rem 0;
	}

	.orgs_marquee_track {
		display: flex;
		gap: 1.5rem;
		width: max-content;
		animation: scrollMarquee 35s linear infinite;
	}

	.orgs_marquee_track:hover {
		animation-play-state: paused;
	}

	@keyframes scrollMarquee {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(calc(-50% - 0.75rem));
		}
	}

	.org_card {
		position: relative;
		border-radius: 20px;
		width: 280px;
		height: 420px;
		background-size: cover;
		background-position: center;
		overflow: hidden;
		display: flex;
		align-items: flex-end;
		padding: 2rem 1.5rem;
		cursor: pointer;
		box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05);
		transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
		flex-shrink: 0;
		box-sizing: border-box;
	}

	.org_card:hover {
		transform: translateY(-6px);
		box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
	}

	.org_overlay {
		position: absolute;
		inset: 0;
		background: linear-gradient(0deg, rgba(92, 15, 22, 0.95) 0%, rgba(92, 15, 22, 0.45) 50%, rgba(22, 5, 7, 0.1) 100%);
		transition: background 0.3s ease;
	}

	.org_card:hover .org_overlay {
		background: linear-gradient(0deg, rgba(207, 168, 58, 0.95) 0%, rgba(92, 15, 22, 0.5) 60%, rgba(22, 5, 7, 0.1) 100%);
	}

	.org_content {
		position: relative;
		z-index: 2;
		color: #fff;
	}

	.org_title {
		font-family: var(--font-heading);
		font-size: 2.2rem;
		font-weight: 900;
		color: #fff;
		margin: 0 0 0.5rem 0;
		letter-spacing: -0.01em;
	}

	.org_desc {
		font-family: var(--font-body);
		font-size: 0.85rem;
		font-style: italic;
		line-height: 1.5;
		color: rgba(255, 255, 255, 0.9);
		margin: 0;
	}

	/* ── SECTION 5: LEARNING & GRADUATES OUTCOME ── */
	.alumni_section_container {
		width: 100%;
		box-sizing: border-box;
		margin-bottom: 2.5rem;
	}

	.notable_alumni_card {
		background: linear-gradient(135deg, #5c0f16 0%, #220205 100%);
		border-radius: 24px;
		padding: 3.5rem;
		display: grid;
		grid-template-columns: 1fr 1.1fr;
		gap: 4.5rem;
		color: #fff;
		box-shadow: 0 12px 40px rgba(92, 15, 22, 0.15);
		align-items: center;
	}

	@media (max-width: 960px) {
		.notable_alumni_card {
			grid-template-columns: 1fr;
			gap: 3rem;
			padding: 2.5rem;
		}
	}

	.notable_alumni_title {
		font-family: var(--font-heading);
		font-size: clamp(2.2rem, 4vw, 3.2rem);
		font-weight: 900;
		color: #fff;
		margin: 0 0 1.5rem 0;
		line-height: 1.1;
		letter-spacing: -0.01em;
	}

	.alumni_intro_desc {
		font-family: var(--font-body);
		font-size: 1.05rem;
		line-height: 1.8;
		color: rgba(255, 255, 255, 0.85);
		margin: 0;
	}

	.bold_text {
		font-weight: 700;
		color: var(--color-gold-light);
	}

	.alumni_right {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		align-items: center;
	}

	/* ── Slideshow wrapper ── */
	.alumni_slideshow {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		width: 100%;
	}

	.slide_nav_btn {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		border: 1.5px solid rgba(255,255,255,0.35);
		background: rgba(255,255,255,0.08);
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		flex-shrink: 0;
		transition: all 0.25s ease;
	}

	.slide_nav_btn:hover {
		background: rgba(207,168,58,0.25);
		border-color: var(--color-gold);
		transform: scale(1.08);
	}

	.alumni_cards_container {
		display: flex;
		gap: 1.25rem;
		justify-content: center;
		align-items: flex-end;
		flex: 1;
		min-height: 260px;
	}

	@media (max-width: 600px) {
		.alumni_cards_container {
			flex-direction: column;
			align-items: center;
			gap: 2rem;
		}
		.alumni_slideshow {
			flex-wrap: wrap;
			justify-content: center;
		}
	}

	.alumni_portrait_card {
		background: rgba(255,255,255,0.06);
		border: 1px solid rgba(255,255,255,0.12);
		border-radius: 18px;
		overflow: hidden;
		width: 150px;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		cursor: pointer;
		transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
		position: relative;
		padding-bottom: 1rem;
	}

	.alumni_portrait_card:hover {
		transform: translateY(-6px);
		border-color: rgba(207,168,58,0.5);
		box-shadow: 0 12px 30px rgba(0,0,0,0.3);
	}

	.portrait_image_wrapper {
		width: 100%;
		height: 165px;
		position: relative;
		overflow: hidden;
		border-radius: 14px 14px 0 0;
		margin-bottom: 0.85rem;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		background: linear-gradient(180deg, #6b1a22 0%, #3a0a0e 100%);
	}

	.portrait_img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center top;
		display: block;
		transition: transform 0.4s ease;
	}

	.alumni_portrait_card:hover .portrait_img {
		transform: scale(1.05);
	}

	/* Play icon overlay on hover */
	.portrait_play_overlay {
		position: absolute;
		inset: 0;
		background: rgba(92, 15, 22, 0.55);
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0;
		transition: opacity 0.3s ease;
		border-radius: 14px 14px 0 0;
	}

	.alumni_portrait_card:hover .portrait_play_overlay {
		opacity: 1;
	}

	.play_icon_circle {
		width: 44px;
		height: 44px;
		border-radius: 50%;
		background: rgba(207,168,58,0.9);
		color: #1a1a1a;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4px 16px rgba(0,0,0,0.35);
	}

	.portrait_info {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		padding: 0 0.75rem;
		align-items: center;
	}

	.alum_name {
		font-family: var(--font-heading);
		font-size: 0.78rem;
		font-weight: 800;
		color: #fff;
		margin: 0;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		line-height: 1.2;
	}

	.alum_role_tag {
		font-family: var(--font-body);
		font-size: 0.65rem;
		color: var(--color-gold);
		font-weight: 600;
		font-style: italic;
		line-height: 1.3;
	}

	.carousel_indicators {
		display: flex;
		gap: 0.5rem;
		justify-content: center;
	}

	.dot_indicator {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.4);
		border: none;
		padding: 0;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.dot_indicator.active {
		background: var(--color-gold);
		transform: scale(1.4);
		width: 20px;
		border-radius: 4px;
	}

	/* Tracer stats columns */
	.tracer_grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3rem;
	}

	@media (max-width: 900px) {
		.tracer_grid {
			grid-template-columns: 1fr;
			gap: 2.5rem;
		}
	}

	.employment_horizon_card {
		background: #fff;
		border: 1.5px solid var(--color-gold);
		border-radius: 20px;
		padding: 2.5rem 2.25rem;
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.03);
	}

	.horizon_title {
		font-family: var(--font-heading);
		font-size: 1.25rem;
		font-weight: 900;
		color: var(--color-maroon);
		margin: 0 0 1.75rem 0;
		line-height: 1.35;
		letter-spacing: 0.02em;
	}

	.table_container {
		width: 100%;
	}

	.tracer_table {
		width: 100%;
		border-collapse: collapse;
		font-family: var(--font-body);
	}

	.tracer_table th {
		padding: 0.85rem 0;
		font-size: 0.72rem;
		font-weight: 800;
		letter-spacing: 0.05em;
		border-bottom: 1.5px solid rgba(0, 0, 0, 0.12);
	}

	.tracer_table td {
		padding: 1rem 0;
		font-size: 0.88rem;
		border-bottom: 1px solid rgba(0, 0, 0, 0.06);
	}

	.th_left {
		text-align: left;
		font-weight: 800;
		color: #1a1a1a;
	}

	.th_right {
		text-align: right;
		font-weight: 800;
		color: var(--color-gold-dark);
	}

	.td_left {
		text-align: left;
		font-weight: 700;
		color: #1a1a1a;
	}

	.td_right {
		text-align: right;
		font-weight: 800;
		color: var(--color-gold-dark);
	}

	/* PEO Score Card */
	.peo_attainment_card {
		background: linear-gradient(135deg, #cfa83a 0%, #b8912d 100%);
		border-radius: 20px;
		padding: 2.5rem 2.25rem;
		color: #1a1a1a;
		box-shadow: 0 8px 30px rgba(207, 168, 58, 0.15);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.peo_title {
		font-family: var(--font-heading);
		font-size: 1.2rem;
		font-weight: 800;
		color: #1a1a1a;
		margin: 0 0 1.75rem 0;
		letter-spacing: 0.02em;
	}

	.peo_scores_grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.85rem;
		margin-bottom: 2rem;
	}

	.peo_score_tile {
		background: #fff;
		border-radius: 12px;
		padding: 1.25rem 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		border-top: 4px solid var(--color-maroon);
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
	}

	.peo_num_label {
		font-family: var(--font-body);
		font-size: 0.68rem;
		font-weight: 800;
		color: #666;
		margin-bottom: 0.25rem;
	}

	.peo_score_num {
		font-family: var(--font-heading);
		font-size: 1.6rem;
		font-weight: 900;
		color: var(--color-maroon);
		line-height: 1.1;
		margin-bottom: 0.25rem;
	}

	.peo_status {
		font-family: var(--font-body);
		font-size: 0.58rem;
		font-weight: 800;
		color: var(--color-gold-dark);
		letter-spacing: 0.05em;
	}

	.satisfaction_loop_box {
		background: #fff;
		border-radius: 12px;
		padding: 1.25rem 1.5rem;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
	}

	.loop_header {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: 0.5rem;
		font-family: var(--font-body);
	}

	.loop_label {
		font-size: 0.72rem;
		font-weight: 800;
		color: var(--color-maroon);
		letter-spacing: 0.02em;
	}

	.loop_percentage {
		font-size: 1.15rem;
		font-weight: 900;
		color: var(--color-maroon);
	}

	.loop_progress_track {
		width: 100%;
		height: 5px;
		background: #eae5db;
		border-radius: 3px;
		overflow: hidden;
		margin-bottom: 0.6rem;
	}

	.loop_progress_bar {
		height: 100%;
		background: var(--color-maroon);
		border-radius: 3px;
	}

	.loop_subtext {
		font-family: var(--font-body);
		font-size: 0.65rem;
		color: #666;
		margin: 0;
		line-height: 1.4;
	}



	/* ── DETAILS MODAL ── */
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
		animation: overlayFadeIn 0.3s ease;
	}

	.modal_content {
		background: #fff;
		border-radius: 28px;
		width: 100%;
		max-width: 860px;
		box-shadow: 0 24px 70px rgba(0, 0, 0, 0.3);
		position: relative;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.08);
		animation: modalZoomIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.close_modal_btn {
		position: absolute;
		top: 1.25rem;
		right: 1.25rem;
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background: rgba(0,0,0,0.07);
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
		background: rgba(0,0,0,0.14);
		transform: scale(1.08);
	}

	.modal_grid {
		display: grid;
		grid-template-columns: 280px 1fr;
		min-height: 460px;
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

	.detail_image_wrapper {
		position: relative;
		width: 140px;
		height: 140px;
		border-radius: 50%;
		box-shadow: 0 8px 24px rgba(92,15,22,0.15);
		border: 4px solid #fff;
		margin-bottom: 1.25rem;
		background: #f8f0e8;
		overflow: hidden;
	}

	.detail_img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		border-radius: 50%;
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
		margin: 0 0 0.9rem 0;
	}

	/* Decorative social icon buttons */
	.detail_social_row {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	.social_icon_btn {
		width: 30px;
		height: 30px;
		border-radius: 50%;
		background: rgba(0,0,0,0.07);
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 0.7rem;
		font-weight: 900;
		color: #444;
		cursor: default;
		transition: background 0.2s;
	}

	.detail_meta_row {
		display: flex;
		gap: 0.4rem;
		margin-bottom: 0.75rem;
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

	.detail_honors_tag {
		background: rgba(207, 168, 58, 0.15);
		color: var(--color-gold-dark);
		font-family: var(--font-body);
		font-size: 0.68rem;
		font-weight: 700;
		padding: 0.3rem 0.75rem;
		border-radius: 20px;
		border: 1px solid rgba(207, 168, 58, 0.25);
	}

	.detail_degree_title {
		font-family: var(--font-body);
		font-size: 0.75rem;
		color: #666;
		margin: 0;
		line-height: 1.5;
		max-width: 220px;
		text-align: center;
	}

	/* ── Right Video Panel ── */
	.modal_video_panel {
		padding: 2.5rem 2rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		background: #fff;
		justify-content: center;
	}

	.video_panel_title {
		font-family: var(--font-heading);
		font-size: 0.8rem;
		font-weight: 900;
		color: #1a1a1a;
		letter-spacing: 0.1em;
		margin: 0;
		text-transform: uppercase;
	}

	.testimonial_video_wrapper {
		width: 100%;
		border-radius: 16px;
		overflow: hidden;
		background: #0e0e0e;
		aspect-ratio: 16 / 9;
		box-shadow: 0 8px 28px rgba(0,0,0,0.18);
	}

	.testimonial_video {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}

	/* Placeholder state (no video URL yet) */
	.video_placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(135deg, #3a0a0e 0%, #6b1a22 50%, #3a0800 100%);
	}

	.video_placeholder_inner {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.video_play_btn {
		width: 64px;
		height: 64px;
		border-radius: 50%;
		background: rgba(207, 168, 58, 0.15);
		border: 2px solid rgba(207, 168, 58, 0.45);
		color: var(--color-gold);
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 0 28px rgba(207, 168, 58, 0.2);
	}

	.video_placeholder_text {
		font-family: var(--font-body);
		font-size: 0.78rem;
		color: rgba(255,255,255,0.5);
		margin: 0;
		font-style: italic;
	}

	@keyframes overlayFadeIn {
		from { opacity: 0; }
		to   { opacity: 1; }
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
