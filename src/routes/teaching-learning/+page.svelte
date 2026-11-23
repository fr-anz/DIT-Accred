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
		Network,
		Landmark,
		BookMarked,
		ListChecks,
		Presentation,
		FlaskConical,
		Handshake,
		GraduationCap,
		TrendingUp,
		CodeXml,
		ChartNoAxesColumnIncreasing,
		FileText,
		History,
		Tv,
		Clapperboard,
		BadgeCheck,
		ScrollText,
		UsersRound,
		Gavel,
		RefreshCw,
		GitFork
	} from '@lucide/svelte';
	import Footer from '#lib/components/footer.svelte';
	import StudentAchievementsGallery from '#lib/components/StudentAchievementsGallery.svelte';
	import '#lib/styles/accreditation-pages.css';
	import '#lib/styles/assigned-page-motion.css';
	import { alumniList } from '#lib/data/alumni.ts';
	import {
		revisionSteps,
		curriculumMinutes,
		programHistory,
		learningChain,
		curriculumTerms,
		electiveTracks,
		tracerStudy,
		alumniCertificates
	} from '#lib/data/teachingLearning.ts';
	import Button from '#lib/components/Button.svelte';
	import { resolve } from '$app/paths';
	import { onMount, tick, untrack } from 'svelte';
	/** @type {HTMLDialogElement | undefined} */
	let alumniDialog = $state();
	/** @type {HTMLElement | null} */
	let lastAlumniFocus = null;

	/** @typedef {1 | 2 | 3 | 4} CourseYear */

	// Svelte 5 Runes for page interactivity
	let activeTab = $state('curricular'); // Active curriculum folder tab
	/** @type {CourseYear} */
	let activeYear = $state(1); // Year selector for interactive explorer
	let activeTermIndex = $state(0); // Index into curriculumTerms
	/** @type {string | null} */
	let flashedCode = $state(null); // Course briefly highlighted after a prerequisite jump
	/** @type {number | null} */
	let selectedAlumIndex = $state(null); // Index of alum for detailed modal

	/** @type {CourseYear[]} */
	const courseYears = [1, 2, 3, 4];

	// Three portraits on desktop, one on mobile; allow five seconds to read each position.
	const alumniRotationDelay = 5000;
	let alumniSlide = $state(0);
	let alumniVisibleCount = $state(3);
	let alumniHovered = $state(false);
	let alumniFocused = $state(false);
	let alumniReducedMotion = $state(false);
	let alumniPageVisible = $state(true);
	let alumniInView = $state(false);
	/** @type {HTMLDivElement | undefined} */
	let alumniCarousel = $state();
	const lastAlumniSlide = $derived(Math.max(0, alumniList.length - alumniVisibleCount));
	const alumniStops = $derived(Array.from({ length: lastAlumniSlide + 1 }, (_, i) => i));
	const alumniRotating = $derived(
		!alumniHovered &&
			!alumniFocused &&
			!alumniReducedMotion &&
			alumniPageVisible &&
			alumniInView &&
			selectedAlumIndex === null &&
			lastAlumniSlide > 0
	);

	onMount(() => {
		const mobile = window.matchMedia('(max-width: 540px)');
		const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
		const syncPreferences = () => {
			alumniVisibleCount = mobile.matches ? 1 : 3;
			alumniReducedMotion = reducedMotion.matches;
		};
		const syncVisibility = () => (alumniPageVisible = !document.hidden);
		syncPreferences();
		syncVisibility();
		mobile.addEventListener('change', syncPreferences);
		reducedMotion.addEventListener('change', syncPreferences);
		document.addEventListener('visibilitychange', syncVisibility);
		const observer = new IntersectionObserver(([entry]) => (alumniInView = entry.isIntersecting), {
			threshold: 0.2
		});
		if (alumniCarousel) observer.observe(alumniCarousel);
		return () => {
			observer.disconnect();
			mobile.removeEventListener('change', syncPreferences);
			reducedMotion.removeEventListener('change', syncPreferences);
			document.removeEventListener('visibilitychange', syncVisibility);
		};
	});

	$effect(() => {
		if (alumniSlide > lastAlumniSlide) alumniSlide = lastAlumniSlide;
	});

	$effect(() => {
		const currentSlide = alumniSlide;
		if (!alumniRotating) return;
		const timer = window.setTimeout(() => {
			alumniSlide = currentSlide === lastAlumniSlide ? 0 : currentSlide + 1;
		}, alumniRotationDelay);
		return () => window.clearTimeout(timer);
	});

	function prevSlide() {
		alumniSlide = alumniSlide === 0 ? lastAlumniSlide : alumniSlide - 1;
	}

	function nextSlide() {
		alumniSlide = alumniSlide === lastAlumniSlide ? 0 : alumniSlide + 1;
	}

	// Curriculum highlights share a stable panel area between tabs.
	const folderTabs = [
		{ key: 'curricular', label: 'Curricular Enhancements', icon: BookOpen },
		{ key: 'experiential', label: 'Experiential Learning', icon: Briefcase },
		{ key: 'electives', label: 'Elective Tracks', icon: GitFork }
	];
	const curricularCards = [
		{ title: 'Cloud Architecture', desc: 'Advanced AWS/Azure Integration modules.', icon: Cloud },
		{ title: 'Cybersecurity', desc: 'Offensive/Defensive security operations.', icon: ShieldCheck },
		{ title: '500-hour Practicum', desc: 'Mandatory industry immersion hours.', icon: Briefcase },
		{ title: 'Capstone', desc: 'Product-led research milestones.', icon: Award }
	];
	const experientialCards = [
		{
			title: 'Internship Partners',
			desc: 'Global internship alignment with IT MNCs.',
			icon: Users
		},
		{ title: 'Masterclasses', desc: 'Weekly tech talks by cloud architects.', icon: Award },
		{ title: 'Hackathons', desc: 'Active student innovation challenges.', icon: Target },
		{ title: 'Tech Bootcamps', desc: 'Hands-on certification bootcamps.', icon: ShieldCheck }
	];

	/** Arrow/Home/End keys move between folder tabs (WAI-ARIA tabs pattern). @param {KeyboardEvent} event */
	function onFolderKey(event) {
		const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
		if (!keys.includes(event.key)) return;
		event.preventDefault();
		const current = folderTabs.findIndex((tab) => tab.key === activeTab);
		const last = folderTabs.length - 1;
		const next =
			event.key === 'Home'
				? 0
				: event.key === 'End'
					? last
					: (current + (event.key === 'ArrowRight' ? 1 : -1) + folderTabs.length) %
						folderTabs.length;
		activeTab = folderTabs[next].key;
		document.getElementById(`folder-tab-${activeTab}`)?.focus();
	}

	// Curriculum explorer: terms grouped by year, running unit totals and a code index
	// so a prerequisite chip can jump to the term where that course is taken.
	const termsByYear = courseYears.map((year) =>
		curriculumTerms.map((term, index) => ({ term, index })).filter(({ term }) => term.year === year)
	);
	/** @param {import('#lib/data/teachingLearning.ts').CurriculumTerm} term */
	const sumUnits = (term) => term.courses.reduce((total, course) => total + course.units, 0);
	/** @param {import('#lib/data/teachingLearning.ts').CurriculumTerm} term */
	const sumTuition = (term) => term.courses.reduce((total, course) => total + course.tuition, 0);
	const termUnits = curriculumTerms.map(sumUnits);
	const totalUnits = termUnits.reduce((total, units) => total + units, 0);
	/** @type {Map<string, number>} */
	const termOfCourse = new Map(
		curriculumTerms.flatMap((term, index) => term.courses.map((course) => [course.code, index]))
	);
	let activeTerm = $derived(curriculumTerms[activeTermIndex]);
	let unitsThroughTerm = $derived(
		termUnits.slice(0, activeTermIndex + 1).reduce((total, units) => total + units, 0)
	);

	/** @param {CourseYear} year */
	function selectYear(year) {
		activeYear = year;
		activeTermIndex = termsByYear[year - 1][0].index;
	}

	/** @param {string} code */
	async function jumpToCourse(code) {
		const index = termOfCourse.get(code);
		if (index === undefined) return;
		activeTermIndex = index;
		activeYear = curriculumTerms[index].year;
		flashedCode = code;
		await tick();
		const row = document.getElementById(`course-${code.replace(/\s+/g, '-')}`);
		row?.scrollIntoView({
			block: 'nearest',
			behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'
		});
		row?.focus({ preventScroll: true });
		setTimeout(() => {
			if (flashedCode === code) flashedCode = null;
		}, 1600);
	}

	/** @param {number} value */
	const pct = (value) => `${value.toFixed(2)}%`;

	// Minutes excerpt viewer linked from curriculum revision step 4
	let minutesOpen = $state(false);
	/** @type {HTMLDialogElement | undefined} */
	let minutesDialog = $state();
	/** @param {HTMLDialogElement} dialog */
	function showMinutes(dialog) {
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		dialog.showModal();
		return {
			destroy() {
				document.body.style.overflow = previousOverflow;
			}
		};
	}

	const chainIcons = [
		Landmark,
		BookMarked,
		ListChecks,
		Presentation,
		ClipboardCheck,
		FlaskConical,
		Handshake,
		GraduationCap,
		TrendingUp
	];
	const revisionIcons = [FileText, UsersRound, Presentation, Users, Gavel];
	const trackIcons = {
		isd: CodeXml,
		cyber: ShieldCheck,
		data: ChartNoAxesColumnIncreasing,
		net: Network
	};
	const historyStart = programHistory[0].year;
	const historySpan = programHistory[programHistory.length - 1].year - historyStart;
	/** @param {number} year */
	const yearPos = (year) => ((year - historyStart) / historySpan) * 100;

	// Scroll story: the chapter crossing the viewport centre drives the pinned stage.
	let historyIndex = $state(0);
	let displayYear = $state(programHistory[0].year);
	let activeMilestone = $derived(programHistory[historyIndex]);

	/**
	 * Tracks the active chapter from scroll position: the last chapter whose top has
	 * passed the viewport middle (or the first). Position-based, so jumps such as
	 * Home/End or anchor links never leave a stale year.
	 * @param {HTMLElement} node
	 */
	function storyChapters(node) {
		let frame = 0;
		const update = () => {
			frame = 0;
			const middle = window.innerHeight / 2;
			const chapters = /** @type {HTMLElement[]} */ ([...node.children]);
			let index = 0;
			chapters.forEach((chapter, i) => {
				if (chapter.getBoundingClientRect().top <= middle) index = i;
			});
			historyIndex = index;
		};
		const schedule = () => {
			if (!frame) frame = requestAnimationFrame(update);
		};
		update();
		window.addEventListener('scroll', schedule, { passive: true });
		window.addEventListener('resize', schedule);
		return {
			destroy() {
				cancelAnimationFrame(frame);
				window.removeEventListener('scroll', schedule);
				window.removeEventListener('resize', schedule);
			}
		};
	}

	// Count the year up (or down) to the active milestone; jump when motion is reduced.
	$effect(() => {
		const target = programHistory[historyIndex].year;
		const from = untrack(() => displayYear);
		if (from === target) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			displayYear = target;
			return;
		}
		/** @type {number | undefined} */
		let start;
		let frame = 0;
		/** @param {number} now */
		const step = (now) => {
			start ??= now;
			const t = Math.min(1, (now - start) / 750);
			displayYear = from + (target - from) * (1 - Math.pow(1 - t, 3));
			if (t < 1) frame = requestAnimationFrame(step);
		};
		frame = requestAnimationFrame(step);
		return () => cancelAnimationFrame(frame);
	});

	/** @param {number} year */
	function scrollToChapter(year) {
		document
			.getElementById(`history-${year}`)
			?.scrollIntoView({ block: 'center', behavior: 'smooth' });
	}

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
  INTRODUCTION & PROGRAM HISTORY
───────────────────────────────────────────── -->
	<section class="content_section" id="program-introduction">
		<div class="section_label">
			<History size={26} strokeWidth={1.5} class="section_icon maroon" />
			<h2 class="t_eyebrow">INTRODUCTION &amp; PROGRAM HISTORY</h2>
		</div>
		<hr class="section_divider" />

		<!-- Scroll story: chapters scroll past a pinned year counter and 1969–2022 scale -->
		<div class="history_story">
			<h3 class="story_heading">From BCDPM to BSIT</h3>
			<div class="story_grid">
				<div
					class="story_stage"
					style="--progress: {yearPos(displayYear)}%; --bcdpm: {yearPos(1979)}%; --bsit: {yearPos(
						1997
					)}%"
				>
					<div class="stage_now" aria-hidden="true">
						<span class="stage_year">{Math.round(displayYear)}</span>
						{#key historyIndex}
							<span class="stage_tag">{activeMilestone.tag}</span>
						{/key}
					</div>

					<div class="stage_scale">
						<div class="scale_track" aria-hidden="true">
							<span class="scale_band scale_band_bcdpm"></span>
							<span class="scale_band scale_band_bsit"></span>
							<span class="scale_fill">
								<span class="scale_band scale_band_bcdpm"></span>
								<span class="scale_band scale_band_bsit"></span>
							</span>
							<span class="scale_marker"></span>
						</div>
						<ul class="scale_ticks">
							{#each programHistory as milestone, i (milestone.year)}
								<li style="--pos: {yearPos(milestone.year)}%">
									<button
										type="button"
										class="scale_tick"
										class:reached={i <= historyIndex}
										class:current={i === historyIndex}
										aria-label="Go to {milestone.year}: {milestone.title}"
										onclick={() => scrollToChapter(milestone.year)}
									>
										<span class="tick_dot" aria-hidden="true"></span>
										<span class="tick_year">{milestone.year}</span>
									</button>
								</li>
							{/each}
						</ul>
					</div>
				</div>

				<ol class="story_chapters" use:storyChapters>
					{#each programHistory as milestone, i (milestone.year)}
						<li class="chapter" class:active={i === historyIndex} id="history-{milestone.year}">
							<span class="chapter_year">{milestone.year}</span>
							<h4 class="chapter_title">{milestone.title}</h4>
							<p class="chapter_desc">{milestone.desc}</p>
						</li>
					{/each}
				</ol>
			</div>
		</div>

		<!-- The Teaching and Learning system as a continuous chain -->
		<div class="chain_card">
			<div class="dot_grid_overlay" aria-hidden="true"></div>
			<div class="chain_head">
				<h3 class="chain_title">The Teaching &amp; Learning Chain</h3>
			</div>
			<ol class="chain_list">
				{#each learningChain as link, i (link)}
					{@const Icon = chainIcons[i]}
					<li class="chain_link" style="--i: {i}">
						<span class="chain_node">
							<span class="chain_num" aria-hidden="true">{i + 1}</span>
							<Icon size={30} strokeWidth={1.5} aria-hidden="true" />
						</span>
						<span class="chain_label">{link}</span>
					</li>
				{/each}
			</ol>
			<div class="chain_loop" aria-hidden="true">
				<span class="loop_pill">
					<RefreshCw size={16} strokeWidth={2} />
					Continuous Improvement
				</span>
			</div>
			<p class="visually_hidden">
				After Continuous Improvement, the chain returns to CHED Standards and starts again.
			</p>
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
					and <span class="highlight_text">CMO No. 25</span> for curriculum alignment. Our framework
					ensures global competitiveness through rigorous standard-setting. In 2025 it became the
					first PUP program to undergo international accreditation by
					<span class="highlight_text">PICAB</span>.
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

				<!-- PICAB milestone: external, international accreditation (2025) -->
				<div class="picab_plate">
					<div class="picab_seal">
						<img
							src="/teaching-learning/area2/picab-logo.png"
							alt="PICAB, PCS Information and Computing Accreditation Board"
							width="788"
							height="206"
						/>
					</div>
					<div class="picab_copy">
						<span class="picab_kicker">2025 · International accreditation</span>
						<h4 class="picab_title">First in PUP to undergo PICAB accreditation</h4>
						<p class="picab_desc">
							The PCS Information and Computing Accreditation Board evaluated BSIT against
							established standards for computing education: curriculum, faculty, teaching and
							learning, student outcomes, learning resources and program management.
						</p>
					</div>
					<div
						class="picab_photo"
						style="background-image: url('/teaching-learning/area2/picab-visit.jpg')"
						role="img"
						aria-label="BSIT faculty and PICAB accreditors together during the 2025 accreditation visit"
					></div>
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

				<ul class="revision_tiles">
					{#each revisionSteps as step, i (step.title)}
						{@const Icon = revisionIcons[i]}
						<li class="revision_tile">
							<span class="tile_icon">
								<Icon size={26} strokeWidth={1.5} aria-hidden="true" />
							</span>
							<span class="tile_tier">{step.tier}</span>
							<h4 class="tile_title">{step.title}</h4>
							{#if step.detail || i === 3}
								<div class="tile_foot">
									{#if step.detail}
										<span class="tile_tag">{step.detail}</span>
									{/if}
									{#if i === 3}
										<button
											type="button"
											class="tile_link"
											aria-haspopup="dialog"
											onclick={() => (minutesOpen = true)}
										>
											<ScrollText size={16} strokeWidth={2} aria-hidden="true" />
											Minutes excerpt
										</button>
									{/if}
								</div>
							{/if}
						</li>
					{/each}
				</ul>
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
				<!-- Curriculum folder: enhancements, experiential learning and elective tracks -->
				<div class="folder">
					<div class="folder_tabs" role="tablist" aria-label="Curriculum highlights">
						{#each folderTabs as tab (tab.key)}
							{@const Icon = tab.icon}
							<button
								type="button"
								role="tab"
								class="folder_tab"
								class:active={activeTab === tab.key}
								id="folder-tab-{tab.key}"
								aria-selected={activeTab === tab.key}
								aria-controls="folder-panel-{tab.key}"
								tabindex={activeTab === tab.key ? 0 : -1}
								onclick={() => (activeTab = tab.key)}
								onkeydown={onFolderKey}
							>
								<Icon size={18} strokeWidth={1.75} aria-hidden="true" />
								<span class="folder_tab_label">{tab.label}</span>
							</button>
						{/each}
					</div>

					<div class="folder_body">
						{#each [{ key: 'curricular', cards: curricularCards }, { key: 'experiential', cards: experientialCards }] as group (group.key)}
							<div
								class="folder_panel"
								class:shown={activeTab === group.key}
								role="tabpanel"
								id="folder-panel-{group.key}"
								aria-labelledby="folder-tab-{group.key}"
								inert={activeTab !== group.key}
							>
								<ul class="folder_grid">
									{#each group.cards as card (card.title)}
										{@const Icon = card.icon}
										<li class="folder_card">
											<span class="folder_card_icon">
												<Icon size={22} strokeWidth={1.5} aria-hidden="true" />
											</span>
											<h4 class="folder_card_title">{card.title}</h4>
											<p class="folder_card_desc">{card.desc}</p>
										</li>
									{/each}
								</ul>
							</div>
						{/each}

						<div
							class="folder_panel"
							class:shown={activeTab === 'electives'}
							role="tabpanel"
							id="folder-panel-electives"
							aria-labelledby="folder-tab-electives"
							inert={activeTab !== 'electives'}
						>
							<div class="tracks_cross">
								<ul class="folder_grid tracks_grid">
									{#each electiveTracks as track (track.key)}
										{@const Icon = trackIcons[track.key]}
										<li class="folder_card track_card">
											<span class="folder_card_icon">
												<Icon size={22} strokeWidth={1.5} aria-hidden="true" />
											</span>
											<h4 class="folder_card_title">{track.title}</h4>
											<p class="folder_card_desc">{track.desc}</p>
										</li>
									{/each}
								</ul>
							</div>
							<p class="tracks_note">IT Electives 1–4 · choose one track from Year 3</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Interactive Explorer: full 2022 curriculum, every term including midyear -->
		<div class="interactive_explorer_card" id="curriculum-explorer">
			<div class="explorer_head">
				<h3 class="explorer_title">Curriculum explorer</h3>
				<p class="explorer_meta">2022 curriculum</p>
			</div>
			<div class="explorer_workspace">
				<div class="explorer_sidebar">
					<div class="explorer_tabs" role="group" aria-label="Year level">
						{#each courseYears as year (year)}
							<button
								type="button"
								class="explorer_tab_btn"
								class:active={activeYear === year}
								aria-pressed={activeYear === year}
								onclick={() => selectYear(year)}
							>
								<span class="year_label">Year</span><span class="year_number">
									{year}
								</span><ChevronRight size={18} aria-hidden="true" />
							</button>
						{/each}
					</div>
					<div class="explorer_progress" aria-live="polite">
						<span class="progress_value">
							<strong>{unitsThroughTerm}</strong> / {totalUnits} units
						</span>
						<span class="progress_caption">Units through this term</span>
						<div class="term_meter" aria-hidden="true">
							{#each termUnits as units, i (i)}
								<span
									class="term_seg"
									class:done={i < activeTermIndex}
									class:current={i === activeTermIndex}
									style="flex-grow: {units}"
								></span>
							{/each}
						</div>
					</div>
				</div>
				<div class="explorer_courses">
					<div class="term_tabs" role="group" aria-label="Term">
						{#each termsByYear[activeYear - 1] as { term, index } (index)}
							<button
								type="button"
								class="term_tab_btn"
								class:active={activeTermIndex === index}
								class:midyear={term.term === 'Midyear'}
								aria-pressed={activeTermIndex === index}
								onclick={() => (activeTermIndex = index)}
							>
								{term.term}
								<span class="term_units">{termUnits[index]} units</span>
							</button>
						{/each}
					</div>

					{#key activeTermIndex}
						<div class="courses_list_container">
							<table class="course_table">
								<caption class="visually_hidden">
									Year {activeTerm.year}, {activeTerm.term} courses
								</caption>
								<thead>
									<tr>
										<th scope="col">Code</th>
										<th scope="col">Course</th>
										<th scope="col" class="num"><abbr title="Lecture hours">Lec</abbr></th>
										<th scope="col" class="num"><abbr title="Laboratory hours">Lab</abbr></th>
										<th scope="col" class="num">Units</th>
										<th scope="col" class="num"><abbr title="Tuition hours">Tuition</abbr></th>
										<th scope="col">Prerequisite</th>
									</tr>
								</thead>
								<tbody>
									{#each activeTerm.courses as course (course.code)}
										<tr
											class="course_row"
											class:flash={flashedCode === course.code}
											class:elective_row={course.code.startsWith('ELEC')}
											id="course-{course.code.replace(/\s+/g, '-')}"
											tabindex="-1"
										>
											<th scope="row" class="course_code">{course.code}</th>
											<td class="course_name">{course.title}</td>
											<td class="num" data-label="Lec">{course.lec}</td>
											<td class="num" data-label="Lab">{course.lab}</td>
											<td class="num course_units" data-label="Units">{course.units}</td>
											<td class="num" data-label="Tuition">{course.tuition}</td>
											<td class="prereq_cell" data-label="Prerequisite">
												{#if course.prereqs.length}
													{#each course.prereqs as code (code)}
														<button
															type="button"
															class="prereq_chip"
															onclick={() => jumpToCourse(code)}
															aria-label="Go to prerequisite {code}"
														>
															{code}
														</button>
													{/each}
												{:else}
													<span class="no_prereq" aria-label="None">—</span>
												{/if}
											</td>
										</tr>
									{/each}
								</tbody>
								<tfoot>
									<tr>
										<th scope="row" colspan="4">Term total</th>
										<td class="num course_units" data-label="Units">{sumUnits(activeTerm)}</td>
										<td class="num" data-label="Tuition">{sumTuition(activeTerm)}</td>
										<td></td>
									</tr>
								</tfoot>
							</table>
						</div>
					{/key}
					{#if activeTerm.courses.some((course) => course.prereqs.length)}
						<p class="explorer_hint">Select a prerequisite to view its course.</p>
					{/if}
				</div>
			</div>
		</div>

		<div class="narrative-action-wrapper">
			<a
				href="https://bit.ly/ITL4Area2"
				class="narrative-btn"
				target="_blank"
				rel="noopener noreferrer"
			>
				View Full Narrative Report
			</a>
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

		<a class="faculty_profile_card" href={resolve('/teaching-learning/faculty#full-time')}>
			<div class="faculty_header">
				<div class="faculty_icon_box">
					<Users size={24} />
				</div>
				<div>
					<h3 class="faculty_type">FULL-TIME FACULTY</h3>
					<span class="faculty_sub">RESEARCH LEADERS</span>
				</div>
			</div>

			<p class="faculty_desc">
				Dedicated faculty members with some Ph.D., Masteral, and Bachelors credentials focusing on
				pedagogical innovation and institutional research trajectories. Expertise spans across Data
				Science, AI Ethics, and Network Engineering.
			</p>

			<ul class="faculty_checklist">
				<li class="checklist_item">
					<CheckCircle2 size={18} />
					<span>85% with Advanced Degrees</span>
				</li>
				<li class="checklist_item">
					<CheckCircle2 size={18} />
					<span>Published Research in IEEE/ACM</span>
				</li>
			</ul>

			<span class="faculty_cta">
				View Full-time Faculty
				<ChevronRight size={18} strokeWidth={2.5} />
			</span>
		</a>
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

		<!-- Graduate Achievements: intro, feature stories and certifications -->
		<div class="grad_achievements">
			<article class="story">
				<figure class="story_media">
					<img
						src="/teaching-learning/area2/sakaygo-dzmm.jpg"
						alt="Patricia Quitoriano discussing SakayGo during a DZMM Teleradyo interview"
						loading="lazy"
						decoding="async"
						width="1300"
						height="600"
					/>
					<figcaption>
						Patricia Quitoriano discussing SakayGo on DZMM Teleradyo's “Dekalibreng Balita”.
					</figcaption>
				</figure>
				<div class="story_body">
					<span class="story_kicker">
						<Tv size={16} strokeWidth={2} aria-hidden="true" /> IT innovation
					</span>
					<h3 class="story_title">SakayGo</h3>
					<p class="story_byline">Patricia Mae Quitoriano · BSIT Class of 2024</p>
					<p class="story_text">
						A web-based transportation platform that helps Filipino commuters navigate public
						transport with route recommendations and fare calculations. Its AI-powered assistant
						understands conversational Taglish, and it covers local routes that mainstream
						navigation apps often miss: technology turned into a practical, community-centered
						solution.
					</p>
					<span class="story_badge">Featured on DZMM Teleradyo</span>
				</div>
			</article>

			<article class="story story_reverse">
				<figure class="story_media">
					<img
						src="/teaching-learning/area2/pobya-awards.jpg"
						alt="Award trophies and plaques received by the short film Pobya"
						loading="lazy"
						decoding="async"
						width="960"
						height="720"
					/>
					<figcaption>
						Awards given to Pobya, directed by BSIT alumnus Mark Elloran, at the Gawad Sining Short
						Film Festival.
					</figcaption>
				</figure>
				<div class="story_body">
					<span class="story_kicker">
						<Clapperboard size={16} strokeWidth={2} aria-hidden="true" /> Creative production
					</span>
					<h3 class="story_title">Pobya</h3>
					<p class="story_byline">Mark Joseph H. Elloran · BSIT Class of 2015</p>
					<p class="story_text">
						A short film recognized at the 2020 Gawad Sining Short Film Festival. It shows BSIT
						graduates applying creative and technical competencies beyond software development, with
						multimedia production as a platform for artistic expression and storytelling.
					</p>
					<span class="story_badge">2020 Gawad Sining Short Film Festival</span>
				</div>
			</article>

			<div class="cert_note">
				<div class="cert_copy">
					<span class="story_kicker">
						<BadgeCheck size={16} strokeWidth={2} aria-hidden="true" /> Alumni certifications
					</span>
					<p>
						Alumni keep pace with industry standards by earning professional certifications, a
						commitment to lifelong learning that validates their skills beyond their degree.
					</p>
				</div>
				<ul class="cert_fan" aria-label="Sample certifications earned by BSIT graduates">
					{#each alumniCertificates as cert, i (cert.src)}
						<li style="--i: {i}">
							<img src={cert.src} alt={cert.alt} loading="lazy" decoding="async" />
						</li>
					{/each}
				</ul>
			</div>
		</div>

		<!-- Notable Alumni Section -->
		<div class="alumni_section_container">
			<h2 class="notable_alumni_title">NOTABLE ALUMNI</h2>

			<!-- Slideshow wrapper -->
			<div
				class="alumni_slideshow_wrapper"
				bind:this={alumniCarousel}
				role="region"
				aria-roledescription="carousel"
				aria-label="Notable alumni"
				onpointerenter={(event) => {
					if (event.pointerType === 'mouse') alumniHovered = true;
				}}
				onpointerleave={() => (alumniHovered = false)}
				onfocusin={() => (alumniFocused = true)}
				onfocusout={(event) => {
					alumniFocused =
						event.relatedTarget instanceof Node &&
						event.currentTarget.contains(event.relatedTarget);
				}}
			>
				<div class="alumni_slideshow">
					<button
						type="button"
						class="slide_nav_btn slide_prev"
						onclick={prevSlide}
						disabled={lastAlumniSlide === 0}
						aria-label="Previous alumni"
					>
						<ChevronLeft size={24} strokeWidth={2.5} />
					</button>

					<!-- Clip a single row: three portraits on desktop, one on mobile. -->
					<div class="alumni_cards_viewport">
						<div
							class="alumni_cards_container"
							style:transform="translateX(calc(-{alumniSlide} * (100% + var(--alumni-gap)) / var(--alumni-visible)))"
						>
							{#each alumniList as alum, i (alum.name)}
								<button
									type="button"
									class="alumni_portrait_card"
									inert={i < alumniSlide || i >= alumniSlide + alumniVisibleCount}
									aria-hidden={i < alumniSlide || i >= alumniSlide + alumniVisibleCount}
									onclick={() => openAlumModal(i)}
								>
									<img
										class="alumni_portrait"
										src={alum.imageUrl}
										alt={alum.imageAlt}
										style:object-position={alum.imagePosition ?? 'center top'}
										loading="lazy"
										decoding="async"
										width="460"
										height="600"
									/>
									<div class="portrait_info">
										<h4 class="alum_name">{alum.name}</h4>
										<span class="alum_role_tag">{alum.role}</span>
									</div>
								</button>
							{/each}
						</div>
					</div>

					<button
						type="button"
						class="slide_nav_btn slide_next"
						onclick={nextSlide}
						disabled={lastAlumniSlide === 0}
						aria-label="Next alumni"
					>
						<ChevronRight size={24} strokeWidth={2.5} />
					</button>
				</div>

				<div class="carousel_controls">
					<div class="carousel_indicators">
						{#each alumniStops as p (p)}
							<button
								type="button"
								class="dot_indicator"
								class:active={alumniSlide === p}
								onclick={() => (alumniSlide = p)}
								aria-label={alumniVisibleCount === 1
									? `Show ${alumniList[p].name}`
									: `Show alumni ${p + 1} to ${p + alumniVisibleCount}`}
								aria-current={alumniSlide === p}
							></button>
						{/each}
					</div>
				</div>
				<p class="sr-only" aria-live={alumniRotating ? 'off' : 'polite'} aria-atomic="true">
					Showing alumni {alumniSlide + 1} to {Math.min(
						alumniSlide + alumniVisibleCount,
						alumniList.length
					)} of {alumniList.length}
				</p>
			</div>
		</div>

		<!-- Tracer Grid -->
		<div class="tracer_grid">
			<!-- 2024 Graduate Tracer Study, Batch 2022 (IDSA) -->
			<div class="employment_horizon_card">
				<h3 class="horizon_title">GRADUATE TRACER STUDY</h3>
				<p class="horizon_source">2024 Graduate Tracer Study · Batch 2022 · conducted by IDSA</p>

				<div class="tracer_climb">
					{#each [{ months: 12, value: tracerStudy.employedWithin12 }, { months: 24, value: tracerStudy.employedWithin24 }] as row (row.months)}
						<div class="climb_row">
							<span class="climb_value">{pct(row.value)}</span>
							<span class="climb_label">employed or self-employed within {row.months} months</span>
							<div class="climb_track" aria-hidden="true">
								<div class="climb_bar" style="width: {row.value}%"></div>
							</div>
						</div>
					{/each}
				</div>

				<dl class="tracer_facts">
					<div class="tracer_fact">
						<dt>Jobs aligned with the degree</dt>
						<dd>{pct(tracerStudy.aligned)}</dd>
						<span class="fact_note">of graduates employed within 24 months</span>
					</div>
					<div class="tracer_fact">
						<dt>Hired by their practicum hosts (HTEs)</dt>
						<dd>{pct(tracerStudy.hiredByHte)}</dd>
						<span class="fact_note">highest among Main Campus colleges</span>
					</div>
				</dl>

				<p class="tracer_footnote">
					{pct(tracerStudy.responseRate)} response rate ({tracerStudy.respondents} of {tracerStudy.graduates}
					graduates), significantly above the Main Campus average.
				</p>
			</div>

			<!-- PEO Attainment Card -->
			<div class="peo_attainment_card">
				<h3 class="peo_title">PEO ATTAINMENT SCORES</h3>

				<div class="peo_scores_grid">
					<div class="peo_score_tile">
						<span class="peo_num_label">PEO 1</span>
						<span class="peo_score_num">3.49</span>
						<span class="peo_status">VERY GREAT EXTENT</span>
					</div>
					<div class="peo_score_tile">
						<span class="peo_num_label">PEO 2</span>
						<span class="peo_score_num">3.49</span>
						<span class="peo_status">VERY GREAT EXTENT</span>
					</div>
					<div class="peo_score_tile">
						<span class="peo_num_label">PEO 3</span>
						<span class="peo_score_num">3.50</span>
						<span class="peo_status">VERY GREAT EXTENT</span>
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
				<button class="close_modal_btn" onclick={closeModal} aria-label="Close modal">
					<X size={24} />
				</button>

				<div class="modal_grid">
					<!-- Left Panel: Profile Detail (Figma-aligned) -->
					<div class="modal_profile_panel">
						<div class="modal_profile_card">
							<img
								class="detail_alum_portrait"
								src={alumniList[selectedAlumIndex].imageUrl}
								alt={alumniList[selectedAlumIndex].imageAlt}
								style:object-position={alumniList[selectedAlumIndex].imagePosition ?? 'center top'}
								width="200"
								height="200"
								decoding="async"
							/>
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
	{#if minutesOpen}
		<dialog
			bind:this={minutesDialog}
			class="minutes_dialog"
			aria-labelledby="minutes-title"
			use:showMinutes
			onclose={() => (minutesOpen = false)}
			onclick={(event) => {
				if (event.target === event.currentTarget) event.currentTarget.close();
			}}
		>
			<div class="modal_content minutes_viewer">
				<div class="minutes_close">
					<Button
						size="sm"
						aria-label="Close minutes excerpt"
						style="min-height: 44px"
						onclick={() => minutesDialog?.close()}
					>
						<X size={22} strokeWidth={1.75} aria-hidden="true" />
					</Button>
				</div>
				<h3 class="minutes_title" id="minutes-title">
					University Curriculum Revision for 2022 Curricula
				</h3>
				<p class="minutes_sub">
					Excerpt from the minutes of the meeting (step 4: presentation to the UCEC and University
					Academic Council).
				</p>
				<div class="minutes_pages">
					{#each curriculumMinutes as page (page.src)}
						<figure class="minutes_page">
							<img src={page.src} alt={page.alt} width="603" height="945" />
						</figure>
					{/each}
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
	/* First section after the hero gets the extra top spacing. */
	#program-introduction {
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
	.curriculum_columns {
		display: grid;
		grid-template-columns: 707fr 935fr;
		gap: clamp(28px, 2.552vw, 49px);
		align-items: stretch;
	}
	.unit_allocation_card {
		border: 2px solid var(--c-gold);
		border-radius: 25px;
		padding: clamp(28px, 2.5vw, 48px);
		display: flex;
		flex-direction: column;
	}
	.allocation_title {
		font: 700 clamp(20px, 1.875vw, 36px)/1.25 var(--font-heading);
		letter-spacing: 0.05em;
		color: var(--c-maroon);
		margin: 0 0 32px;
	}
	.allocation_list {
		display: grid;
		gap: 24px;
	}
	.item_header {
		display: flex;
		justify-content: space-between;
		gap: 16px;
		margin-bottom: 14px;
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
		margin-top: 36px;
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
	.faculty_profile_card {
		display: block;
		max-width: 960px;
		margin-inline: auto;
		border: 2px solid var(--c-gold);
		border-radius: 25px;
		padding: clamp(28px, 3.177vw, 61px);
		color: inherit;
		text-decoration: none;
		transition: box-shadow 0.2s;
	}
	.faculty_profile_card:hover {
		box-shadow: 0 12px 30px #5c0f1612;
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
		display: inline-flex;
		align-items: center;
		gap: 8px;
		margin-top: clamp(24px, 2.083vw, 40px);
		color: var(--c-maroon);
		font-weight: 700;
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
	.alumni_cards_viewport {
		--alumni-visible: 3;
		--alumni-gap: clamp(30px, 3.281vw, 63px);
		width: 90%;
		margin: auto;
		padding: 10px;
		overflow: hidden;
	}
	.alumni_cards_container {
		display: flex;
		gap: var(--alumni-gap);
	}
	@media (prefers-reduced-motion: no-preference) {
		.alumni_cards_container {
			transition: transform 250ms var(--motion-ease);
		}
	}
	.alumni_portrait_card {
		flex: 0 0 calc((100% - (var(--alumni-visible) - 1) * var(--alumni-gap)) / var(--alumni-visible));
		min-width: 0;
		border: 0;
		padding: 0;
		color: var(--c-surface);
		font: inherit;
		text-align: left;
		position: relative;
		aspect-ratio: 460 / 600;
		border-radius: 25px;
		background: linear-gradient(103.84deg, #8e1518, #1e1e1e);
		cursor: pointer;
		overflow: hidden;
	}
	.alumni_portrait {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.portrait_info {
		position: absolute;
		inset: auto 0 0;
		padding: clamp(18px, 2.5vw, 48px);
		background: linear-gradient(0deg, rgb(0 0 0 / 0.95), rgb(0 0 0 / 0.65) 65%, transparent);
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
		background: var(--c-surface);
		color: var(--c-maroon);
		display: grid;
		place-items: center;
		cursor: pointer;
		opacity: 1;
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
	.carousel_controls {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 18px;
		margin-top: 22px;
	}
	.carousel_indicators {
		display: flex;
		align-items: center;
		gap: 4px;
	}
	.dot_indicator {
		display: grid;
		place-items: center;
		width: 28px;
		height: 36px;
		padding: 0;
		border: 0;
		border-radius: 8px;
		background: transparent;
		cursor: pointer;
	}
	.dot_indicator::before {
		content: '';
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--c-shell);
	}
	.dot_indicator.active::before {
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
		text-align: center;
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
		.faculty_header {
			gap: 18px;
		}
	}
	@media (max-width: 800px) {
		.curriculum_columns,
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
		.alumni_cards_viewport {
			--alumni-gap: 18px;
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
		.explorer_tabs {
			gap: 10px;
		}
		.explorer_tab_btn {
			flex: 1;
			padding: 7px 6px;
		}
		.org_desc {
			font-size: 12px;
		}
		.alumni_cards_viewport {
			--alumni-visible: 1;
			width: 80%;
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

	.close_modal_btn {
		position: absolute;
		top: 1.25rem;
		right: 1.25rem;
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
	.detail_alum_portrait {
		width: min(100%, 200px);
		height: auto;
		aspect-ratio: 1;
		object-fit: cover;
		border-radius: 16px;
		margin-bottom: 1.25rem;
		background: var(--c-surface);
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
		padding: 2.5rem 2rem;
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
		border-radius: 16px;
		background: #0e0e0e;
		aspect-ratio: 16 / 9;
		box-shadow: 0 8px 28px rgba(0, 0, 0, 0.18);
	}

	.testimonial_video {
		position: absolute;
		/* Drive's nested player has a 300px minimum height; crop its letterboxing. */
		top: min(0px, calc((100% - 300px) / 2));
		left: 0;
		width: 100%;
		height: max(100%, 300px);
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

	/* ── Shared helpers ── */
	.visually_hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		margin: -1px;
		padding: 0;
		overflow: hidden;
		clip: rect(0 0 0 0);
		white-space: nowrap;
		border: 0;
	}

	/* ── Governance: PICAB milestone plate ── */
	.picab_plate {
		display: grid;
		grid-template-columns: minmax(0, 3fr) minmax(0, 5fr) minmax(0, 4fr);
		align-items: stretch;
		margin-top: clamp(24px, 2.344vw, 45px);
		border-radius: 15px;
		overflow: hidden;
		background: rgb(255 255 255 / 0.05);
		box-shadow: inset 0 0 0 1px rgb(250 197 73 / 0.35);
	}
	.picab_seal {
		display: grid;
		place-items: center;
		padding: clamp(18px, 1.875vw, 36px);
		background: white;
	}
	.picab_seal img {
		display: block;
		width: 100%;
		max-width: 300px;
		height: auto;
	}
	.picab_copy {
		padding: clamp(20px, 2.083vw, 40px);
		align-self: center;
	}
	.picab_kicker {
		color: var(--c-gold-light);
		font-size: clamp(11px, 0.833vw, 16px);
		font-weight: 600;
		letter-spacing: 0.18em;
		text-transform: uppercase;
	}
	.picab_title {
		margin: 8px 0 10px;
		color: white;
		font: 700 clamp(18px, 1.563vw, 30px)/1.2 var(--font-heading);
		letter-spacing: 0.02em;
	}
	.picab_desc {
		margin: 0;
		color: rgb(255 255 255 / 0.82);
		font-size: clamp(12px, 0.885vw, 17px);
		line-height: 1.5;
		letter-spacing: 0;
	}
	.picab_photo {
		min-height: 180px;
		background-size: cover;
		background-position: center;
		-webkit-mask-image: linear-gradient(90deg, transparent, #000 35%);
		mask-image: linear-gradient(90deg, transparent, #000 35%);
	}

	/* ── Governance: curriculum revision bodies ──
	   Five equal tiles: every body carries the same visual weight, no order or rank. */
	.lifecycle_title {
		margin-bottom: clamp(24px, 2.344vw, 45px);
	}
	.revision_tiles {
		position: relative;
		display: grid;
		grid-template-columns: repeat(5, minmax(0, 1fr));
		gap: clamp(10px, 1.042vw, 20px);
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.revision_tile {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 12px;
		min-height: clamp(220px, 13.5vw, 260px);
		padding: clamp(18px, 1.458vw, 28px);
		border-radius: 18px;
		background: rgb(26 22 20 / 0.72);
		backdrop-filter: blur(8px);
		box-shadow: inset 0 0 0 1px rgb(250 197 73 / 0.3);
	}
	.tile_icon {
		display: grid;
		place-items: center;
		width: clamp(44px, 2.917vw, 56px);
		height: clamp(44px, 2.917vw, 56px);
		border-radius: 50%;
		box-shadow: inset 0 0 0 1.5px var(--c-gold-light);
		color: var(--c-gold-light);
	}
	.tile_tier {
		margin-top: 6px;
		color: var(--c-gold-light);
		font-size: clamp(10px, 0.677vw, 13px);
		font-weight: 600;
		letter-spacing: 0.14em;
		text-transform: uppercase;
	}
	.tile_title {
		margin: 0;
		color: white;
		font: 600 clamp(13px, 0.99vw, 19px)/1.3 var(--font-heading);
		letter-spacing: 0.01em;
	}
	.tile_foot {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: auto;
		padding-top: 6px;
	}
	.tile_tag {
		padding: 4px 10px;
		border-radius: 6px;
		box-shadow: inset 0 0 0 1px rgb(250 197 73 / 0.6);
		color: var(--c-gold-light);
		font-size: clamp(10px, 0.729vw, 14px);
		font-weight: 600;
		letter-spacing: 0.02em;
	}
	.tile_link {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		min-height: 36px;
		padding: 6px 12px;
		border: 0;
		border-radius: 999px;
		background: white;
		color: var(--c-maroon);
		font: 600 clamp(11px, 0.729vw, 14px)/1 var(--font-body);
		cursor: pointer;
	}

	/* ── Introduction & history ── */
	/* ── Scroll story: From BCDPM to BSIT ── */
	.history_story {
		margin-bottom: clamp(40px, 4.167vw, 80px);
	}
	.story_heading {
		margin: 0;
		color: var(--c-maroon);
		font: 700 clamp(20px, 1.875vw, 36px)/1.25 var(--font-heading);
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}
	.story_grid {
		display: grid;
		grid-template-columns: minmax(0, 6fr) minmax(0, 5fr);
		gap: clamp(32px, 5.208vw, 100px);
	}
	.story_stage {
		position: sticky;
		top: 18vh;
		align-self: start;
		display: grid;
		gap: clamp(28px, 3.125vw, 60px);
		padding-top: clamp(24px, 3vh, 48px);
	}
	.stage_now {
		display: grid;
		justify-items: start;
	}
	.stage_year {
		font: 800 clamp(96px, 13.5vw, 260px)/0.85 var(--font-display);
		letter-spacing: -0.04em;
		font-variant-numeric: tabular-nums;
		background: var(--grad-title);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.stage_tag {
		margin-top: clamp(10px, 1.25vw, 24px);
		padding: 8px 18px;
		border-radius: 999px;
		background: var(--grad-gold);
		color: var(--c-maroon-deep);
		font: 800 clamp(14px, 1.25vw, 24px)/1 var(--font-heading);
		letter-spacing: 0.12em;
		text-transform: uppercase;
	}
	.stage_scale {
		position: relative;
		padding-bottom: 34px;
	}
	.scale_track {
		position: relative;
		height: 12px;
		border-radius: 999px;
		background: var(--c-shell);
	}
	.scale_band {
		position: absolute;
		top: 0;
		bottom: 0;
		border-radius: 999px;
	}
	.scale_band_bcdpm {
		left: var(--bcdpm);
		width: calc(var(--bsit) - var(--bcdpm));
		background: var(--c-maroon);
		opacity: 0.18;
	}
	.scale_band_bsit {
		left: var(--bsit);
		right: 0;
		background: var(--c-gold-dark);
		opacity: 0.22;
	}
	/* The fill repeats the bands at full strength, clipped at the current year. */
	.scale_fill {
		position: absolute;
		inset: 0;
		clip-path: inset(0 calc(100% - var(--progress)) 0 0);
	}
	.scale_fill::before {
		content: '';
		position: absolute;
		inset: 5px 0;
		background: #9c9690;
		border-radius: 999px;
	}
	.scale_fill .scale_band {
		opacity: 1;
	}
	.scale_fill .scale_band_bsit {
		background: var(--grad-gold);
	}
	.scale_marker {
		position: absolute;
		top: 50%;
		left: var(--progress);
		z-index: 1;
		width: 26px;
		height: 26px;
		border-radius: 50%;
		background: white;
		border: 6px solid var(--c-maroon);
		box-shadow:
			0 0 0 6px rgb(148 21 24 / 0.15),
			0 6px 16px rgb(92 15 22 / 0.3);
		transform: translate(-50%, -50%);
	}
	.scale_ticks {
		position: absolute;
		inset: 0;
		margin: 0;
		padding: 0;
		list-style: none;
		pointer-events: none;
	}
	.scale_ticks li {
		position: absolute;
		top: 0;
		left: var(--pos);
		transform: translateX(-50%);
	}
	.scale_tick {
		display: grid;
		justify-items: center;
		gap: 10px;
		padding: 0 4px 4px;
		border: 0;
		background: none;
		color: #9c9690;
		font: 700 12px/1 var(--font-heading);
		letter-spacing: 0.04em;
		font-variant-numeric: tabular-nums;
		cursor: pointer;
		pointer-events: auto;
		transition: color 0.3s ease;
	}
	.tick_dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: white;
		box-shadow: inset 0 0 0 2px #b9b3ab;
		transition: box-shadow 0.3s ease;
	}
	.scale_tick.reached {
		color: var(--c-maroon);
	}
	.scale_tick.reached .tick_dot {
		box-shadow: inset 0 0 0 4px var(--c-maroon);
	}
	.scale_tick.current .tick_year {
		color: var(--c-gold-dark);
	}

	.story_chapters {
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.chapter {
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-height: 78vh;
		padding-left: clamp(20px, 1.875vw, 36px);
		border-left: 2px solid var(--c-shell);
		opacity: 0.28;
		transition:
			opacity 0.5s ease,
			border-color 0.5s ease;
	}
	.chapter:first-child {
		min-height: 60vh;
	}
	.chapter:last-child {
		min-height: 64vh;
	}
	.chapter.active {
		opacity: 1;
		border-left-color: var(--c-gold);
	}
	.chapter_year {
		color: var(--c-gold-dark);
		font: 700 clamp(16px, 1.25vw, 24px)/1 var(--font-heading);
		letter-spacing: 0.14em;
	}
	.chapter_title {
		margin: 12px 0 16px;
		color: var(--c-maroon);
		font: 700 clamp(28px, 2.708vw, 52px)/1.08 var(--font-display);
		letter-spacing: -0.01em;
	}
	.chapter_desc {
		max-width: 34ch;
		margin: 0;
		font-size: clamp(16px, 1.25vw, 24px);
		line-height: 1.5;
		letter-spacing: 0;
		color: #333;
	}
	@media (prefers-reduced-motion: no-preference) {
		.stage_tag {
			animation: stage-tag-in 0.45s var(--motion-ease);
		}
		.chapter_title,
		.chapter_desc {
			transform: translateY(14px);
			transition: transform 0.6s var(--motion-ease);
		}
		.chapter.active :is(.chapter_title, .chapter_desc) {
			transform: none;
		}
	}
	@keyframes stage-tag-in {
		from {
			opacity: 0;
			transform: translateY(12px) scale(0.96);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}

	/* The chain: nine linked stages with a return loop beneath. */
	.chain_card {
		position: relative;
		overflow: hidden;
		border-radius: 25px;
		padding: clamp(28px, 3.49vw, 67px) clamp(20px, 2.604vw, 50px) clamp(48px, 4.167vw, 80px);
		background: var(--panel-dark);
		color: white;
	}
	.chain_card .dot_grid_overlay {
		opacity: 0.08;
	}
	.chain_head {
		position: relative;
		max-width: 70ch;
		margin-bottom: clamp(28px, 2.604vw, 50px);
	}
	.chain_title {
		margin: 0 0 10px;
		color: var(--c-gold-light);
		font: 700 clamp(20px, 1.875vw, 36px)/1.25 var(--font-heading);
		letter-spacing: 0.04em;
		text-transform: uppercase;
	}
	.chain_list {
		position: relative;
		display: grid;
		grid-template-columns: repeat(9, minmax(0, 1fr));
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.chain_link {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 14px;
		padding-inline: 4px;
		text-align: center;
	}
	.chain_link:not(:last-child)::after {
		content: '';
		position: absolute;
		top: calc(var(--node) / 2);
		left: calc(50% + var(--node) / 2);
		width: calc(100% - var(--node));
		height: 2px;
		background: linear-gradient(90deg, var(--c-gold-light), var(--c-gold-dark));
	}
	.chain_list {
		--node: clamp(52px, 4.167vw, 80px);
	}
	.chain_node {
		position: relative;
		z-index: 1;
		display: grid;
		place-items: center;
		width: var(--node);
		height: var(--node);
		border-radius: 30%;
		background: rgb(255 255 255 / 0.06);
		box-shadow: inset 0 0 0 1.5px rgb(250 197 73 / 0.55);
		color: var(--c-gold-light);
	}
	.chain_node :global(svg) {
		width: 46%;
		height: 46%;
	}
	.chain_link:last-child .chain_node {
		background: var(--grad-gold);
		box-shadow: none;
		color: var(--c-maroon-deep);
	}
	.chain_num {
		position: absolute;
		top: -8px;
		left: -8px;
		display: grid;
		place-items: center;
		width: 24px;
		height: 24px;
		border-radius: 50%;
		background: var(--c-maroon);
		color: var(--c-gold-light);
		font: 700 12px/1 var(--font-heading);
	}
	.chain_label {
		font: 600 clamp(11px, 0.833vw, 16px)/1.25 var(--font-heading);
		letter-spacing: 0.01em;
	}
	.chain_loop {
		position: relative;
		height: clamp(36px, 2.604vw, 50px);
		margin: 18px calc(100% / 18) 0;
		border: 2px solid var(--c-gold-light);
		border-top: 0;
		border-radius: 0 0 28px 28px;
	}
	.chain_loop::before,
	.chain_loop::after {
		content: '';
		position: absolute;
		top: -2px;
		width: 0;
		height: 0;
		border-inline: 7px solid transparent;
	}
	/* Arrow re-enters the first stage; the far end leaves the last one. */
	.chain_loop::before {
		left: -8px;
		border-bottom: 10px solid var(--c-gold-light);
		transform: translateY(-100%);
	}
	.loop_pill {
		position: absolute;
		left: 50%;
		bottom: 0;
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 8px 18px;
		border-radius: 999px;
		background: #241a17;
		box-shadow: inset 0 0 0 1.5px var(--c-gold-light);
		color: var(--c-gold-light);
		font: 700 clamp(12px, 0.833vw, 16px)/1 var(--font-heading);
		letter-spacing: 0.04em;
		white-space: nowrap;
		transform: translate(-50%, 50%);
	}

	/* Curriculum highlights: one surface with clear, accessible tabs. */
	.folder {
		display: flex;
		flex-direction: column;
		flex: 1;
		min-width: 0;
		border-radius: 24px;
		background: var(--panel-dark);
		color: var(--c-surface);
		padding: clamp(22px, 2.5vw, 48px);
	}
	.folder_tabs {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 12px;
		border-bottom: 1px solid color-mix(in srgb, var(--c-gold) 35%, transparent);
	}
	.folder_tab {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 12px;
		padding: 0 0 20px;
		border: 0;
		border-bottom: 3px solid transparent;
		margin-bottom: -2px;
		background: transparent;
		color: color-mix(in srgb, var(--c-surface) 65%, transparent);
		font: 600 clamp(12px, 1vw, 18px)/1.4 var(--font-heading);
		text-align: left;
		cursor: pointer;
	}
	.folder_tab.active {
		color: var(--c-gold-light);
		border-bottom-color: var(--c-gold-light);
	}
	.folder_tab:focus-visible {
		outline: 2px solid var(--c-gold-light);
		outline-offset: 5px;
	}
	.folder_body {
		display: grid;
		flex: 1;
		padding-top: 12px;
	}
	.folder_panel {
		grid-area: 1 / 1;
		display: flex;
		flex-direction: column;
		visibility: hidden;
	}
	.folder_panel.shown {
		visibility: visible;
	}
	.folder_grid {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		flex: 1;
	}
	.folder_card {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 16px;
		justify-content: center;
		padding: 28px 22px 28px 0;
		min-width: 0;
	}
	.folder_card:nth-child(even) {
		padding-left: 24px;
		padding-right: 0;
		border-left: 1px solid color-mix(in srgb, var(--c-gold) 25%, transparent);
	}
	.folder_card:nth-child(n + 3) {
		border-top: 1px solid color-mix(in srgb, var(--c-gold) 25%, transparent);
	}
	.folder_card_icon {
		color: var(--c-gold);
	}
	.folder_card_title {
		margin: 0;
		font: 600 clamp(21px, 1.8vw, 34px)/1.15 var(--font-heading);
		color: var(--c-surface);
		letter-spacing: -0.02em;
	}
	.folder_card_desc {
		margin: 0;
		color: color-mix(in srgb, var(--c-surface) 75%, transparent);
		font: 400 clamp(12px, 0.95vw, 17px)/1.6 var(--font-body);
		letter-spacing: 0;
	}
	.tracks_cross {
		display: flex;
		flex: 1;
	}
	.tracks_note {
		margin: 20px 0 0;
		padding-top: 16px;
		border-top: 1px solid color-mix(in srgb, var(--c-gold) 35%, transparent);
		color: var(--c-gold-light);
		font: 400 13px/1.5 var(--font-body);
		letter-spacing: 0;
	}
	@media (max-width: 540px) {
		.folder {
			padding: 24px 20px;
		}
		.folder_card {
			padding: 24px 14px 24px 0;
		}
		.folder_card:nth-child(even) {
			padding-left: 14px;
		}
		.folder_card_title {
			font-size: 21px;
		}
	}

	@media (max-width: 800px) {
		.folder_panel {
			display: none;
		}
		.folder_panel.shown {
			display: flex;
		}
	}
	@media (max-width: 380px) {
		.folder_tabs {
			grid-template-columns: 1fr;
			gap: 0;
		}
		.folder_tab {
			flex-direction: row;
			align-items: center;
			padding: 12px 0;
			gap: 10px;
		}
		.folder_grid {
			grid-template-columns: 1fr;
		}
		.folder_card:nth-child(n) {
			padding: 24px 0;
			border-left: 0;
		}
		.folder_card + .folder_card {
			border-top: 1px solid color-mix(in srgb, var(--c-gold) 25%, transparent);
		}
	}

	/* Curriculum explorer: year rail, semester navigation, course ledger. */
	.interactive_explorer_card {
		margin-top: clamp(40px, 4vw, 76px);
		scroll-margin-top: 24px;
		border: 1px solid color-mix(in srgb, var(--c-gold) 65%, transparent);
		border-radius: 24px;
		background: var(--c-surface);
		overflow: clip;
	}
	.explorer_head {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 12px;
		padding: clamp(24px, 2.5vw, 48px);
		border-bottom: 1px solid var(--c-shell);
	}
	.explorer_title {
		margin: 0;
		color: var(--c-maroon-deep);
		font: 700 clamp(28px, 2.6vw, 48px)/1.15 var(--font-heading);
		letter-spacing: -0.025em;
	}
	.explorer_meta {
		margin: 0;
		color: var(--c-maroon-deep);
		font: 400 14px/1.5 var(--font-body);
		letter-spacing: 0;
	}
	.explorer_workspace {
		display: grid;
		grid-template-columns: 210px minmax(0, 1fr);
	}
	.explorer_sidebar {
		background: var(--panel-dark);
		padding: 26px 18px;
		display: flex;
		flex-direction: column;
		gap: 40px;
	}
	.explorer_tabs {
		display: grid;
		gap: 8px;
		margin: 0;
	}
	.explorer_tab_btn {
		display: grid;
		grid-template-columns: 1fr auto 18px;
		align-items: center;
		gap: 20px;
		padding: 14px 16px;
		border: 1px solid transparent;
		border-radius: 8px;
		background: transparent;
		color: var(--c-surface);
		cursor: pointer;
		font: 500 16px/1 var(--font-heading);
	}
	.explorer_tab_btn.active {
		background: var(--c-gold-light);
		color: var(--c-maroon-deep);
	}
	.explorer_tab_btn :global(svg) {
		opacity: 0;
	}
	.explorer_tab_btn.active :global(svg) {
		opacity: 1;
	}
	.year_number {
		font-size: 32px;
		font-weight: 700;
		font-variant-numeric: tabular-nums;
	}
	.explorer_progress {
		display: flex;
		flex-direction: column;
		gap: 10px;
		color: var(--c-surface);
		margin-top: auto;
		padding: 0 12px 8px;
	}
	.progress_caption {
		order: -1;
		font: 400 12px/1.4 var(--font-body);
		color: color-mix(in srgb, var(--c-surface) 75%, transparent);
		letter-spacing: 0;
	}
	.progress_value {
		font: 400 14px/1 var(--font-heading);
		font-variant-numeric: tabular-nums;
	}
	.progress_value strong {
		font-size: 32px;
		font-weight: 600;
		color: var(--c-gold-light);
	}
	.term_meter {
		display: flex;
		gap: 3px;
		margin-top: 4px;
	}
	.term_seg {
		height: 5px;
		background: color-mix(in srgb, var(--c-surface) 20%, transparent);
		border-radius: 2px;
	}
	.term_seg.done {
		background: var(--c-gold);
	}
	.term_seg.current {
		background: var(--c-gold-light);
	}
	.explorer_courses {
		min-width: 0;
		padding: 0 clamp(20px, 2.5vw, 48px) 24px;
	}
	.term_tabs {
		display: flex;
		gap: 28px;
		border-bottom: 1px solid var(--c-shell);
		margin-bottom: 14px;
	}
	.term_tab_btn {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 6px 12px;
		padding: 24px 0 20px;
		border: 0;
		border-bottom: 3px solid transparent;
		background: transparent;
		color: var(--c-ink);
		font: 600 16px/1.3 var(--font-heading);
		cursor: pointer;
	}
	.term_tab_btn.active {
		color: var(--c-maroon);
		border-bottom-color: var(--c-maroon);
	}
	.term_units {
		font: 400 12px/1.3 var(--font-body);
		color: inherit;
	}
	.courses_list_container {
		color: var(--c-ink);
	}
	.course_table {
		width: 100%;
		border-collapse: collapse;
		font: 400 clamp(12px, 0.95vw, 17px)/1.5 var(--font-body);
		letter-spacing: 0;
	}
	.course_table thead th {
		padding: 16px 8px;
		border-bottom: 1px solid var(--c-gold);
		color: var(--c-maroon-deep);
		font-size: 12px;
		font-weight: 600;
		text-align: left;
		white-space: nowrap;
	}
	.course_table abbr {
		text-decoration: none;
	}
	.course_table tbody :is(th, td) {
		padding: 17px 8px;
		border-bottom: 1px solid var(--c-shell);
		text-align: left;
		vertical-align: middle;
	}
	.course_table .num {
		text-align: right;
		font-variant-numeric: tabular-nums;
		width: 3.5em;
	}
	.course_code {
		font: 600 12px/1.5 var(--font-body);
		white-space: nowrap;
		color: var(--c-maroon-deep);
	}
	.course_name {
		min-width: 150px;
	}
	.course_row {
		outline: none;
	}
	.course_row.elective_row .course_name {
		font-style: italic;
	}
	.course_units {
		font-weight: 700;
		color: var(--c-maroon);
	}
	.course_row.flash {
		background: color-mix(in srgb, var(--c-gold-light) 28%, white);
	}
	.prereq_cell {
		min-width: 100px;
	}
	.prereq_chip {
		display: inline-block;
		margin: 2px 5px 2px 0;
		padding: 8px 0;
		min-height: 36px;
		border: 0;
		border-bottom: 1px solid var(--c-gold);
		border-radius: 0;
		background: transparent;
		color: var(--c-maroon);
		font: 600 11px/1.3 var(--font-body);
		cursor: pointer;
	}
	.no_prereq {
		color: var(--c-ink);
		opacity: 0.5;
	}
	.course_table tfoot :is(th, td) {
		padding: 20px 8px;
		border-top: 2px solid var(--c-gold);
		font-weight: 700;
		text-align: left;
	}
	.course_table tfoot .num {
		text-align: right;
	}
	.explorer_hint {
		margin: 12px 0 0;
		font: 400 12px/1.5 var(--font-body);
		color: var(--c-maroon-deep);
		letter-spacing: 0;
	}
	:is(.explorer_tab_btn, .term_tab_btn, .prereq_chip):focus-visible {
		outline: 2px solid var(--c-gold-dark);
		outline-offset: 3px;
	}
	@media (hover: hover) {
		.prereq_chip:hover {
			color: var(--c-maroon-deep);
			border-color: var(--c-maroon);
		}
		.explorer_tab_btn:not(.active):hover {
			background: color-mix(in srgb, var(--c-surface) 10%, transparent);
		}
	}
	@media (max-width: 1100px) {
		.explorer_workspace {
			grid-template-columns: 160px minmax(0, 1fr);
		}
		.explorer_sidebar {
			padding: 20px 12px;
		}
		.explorer_tab_btn {
			gap: 10px;
			padding: 14px 10px;
		}
		.explorer_courses {
			padding-inline: 18px;
		}
		.course_table tbody :is(th, td) {
			padding-inline: 5px;
		}
	}
	@media (max-width: 900px) {
		.explorer_workspace {
			grid-template-columns: 1fr;
		}
		.explorer_sidebar {
			padding: 16px 20px;
			gap: 20px;
		}
		.explorer_tabs {
			grid-template-columns: repeat(4, minmax(0, 1fr));
			gap: 8px;
		}
		.explorer_tab_btn {
			display: flex;
			justify-content: center;
			gap: 10px;
			padding: 12px 6px;
		}
		.explorer_tab_btn :global(svg) {
			display: none;
		}
		.year_number {
			font-size: 24px;
		}
		.explorer_progress {
			display: grid;
			grid-template-columns: 1fr auto;
			align-items: baseline;
			padding: 0;
			gap: 10px;
		}
		.term_meter {
			grid-column: 1 / -1;
			margin: 0;
		}
		.progress_value strong {
			font-size: 24px;
		}
		.term_tabs {
			gap: 20px;
		}
		.term_tab_btn {
			font-size: 14px;
		}
	}

	/* ── Graduate achievements ── */
	.grad_achievements {
		margin-bottom: clamp(48px, 5.208vw, 100px);
	}
	.story {
		display: grid;
		grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
		align-items: center;
		margin-bottom: clamp(36px, 4.167vw, 80px);
	}
	.story_reverse {
		grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
	}
	.story_reverse .story_media {
		order: 2;
	}
	.story_media {
		margin: 0;
	}
	.story_media img {
		display: block;
		width: 100%;
		aspect-ratio: 13 / 7;
		object-fit: cover;
		border-radius: 25px;
	}
	.story_reverse .story_media img {
		aspect-ratio: 4 / 3;
	}
	.story_media figcaption {
		margin-top: 10px;
		color: #666;
		font-size: clamp(11px, 0.781vw, 15px);
		font-style: italic;
		letter-spacing: 0;
	}
	/* The copy card overlaps the photo edge like a magazine pull-out. */
	.story_body {
		position: relative;
		z-index: 1;
		margin-left: -12%;
		padding: clamp(24px, 2.604vw, 50px);
		border: 2px solid var(--c-gold);
		border-radius: 25px;
		background: white;
		box-shadow: 0 24px 60px rgb(92 15 22 / 0.12);
	}
	.story_reverse .story_body {
		margin-left: 0;
		margin-right: -12%;
	}
	.story_kicker {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		color: var(--c-gold-dark);
		font-size: clamp(11px, 0.781vw, 15px);
		font-weight: 600;
		letter-spacing: 0.18em;
		text-transform: uppercase;
	}
	.story_title {
		margin: 10px 0 6px;
		font: 700 clamp(36px, 3.646vw, 70px)/1 var(--font-display);
		letter-spacing: -0.01em;
		background: var(--grad-title);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}
	.story_byline {
		margin: 0 0 16px;
		color: var(--c-maroon);
		font-style: italic;
		font-weight: 500;
		letter-spacing: 0;
	}
	.story_text {
		margin: 0 0 18px;
		line-height: 1.55;
		letter-spacing: 0;
	}
	.story_badge {
		display: inline-block;
		padding: 6px 14px;
		border-radius: 999px;
		background: var(--grad-gold);
		color: var(--c-maroon-deep);
		font-size: clamp(11px, 0.781vw, 15px);
		font-weight: 700;
		letter-spacing: 0.02em;
	}
	.cert_note {
		display: grid;
		grid-template-columns: minmax(0, 4fr) minmax(0, 8fr);
		gap: clamp(20px, 3.125vw, 60px);
		align-items: center;
		padding: clamp(24px, 2.604vw, 50px);
		border-radius: 25px;
		background: var(--panel-paper);
	}
	.cert_copy p {
		margin: 12px 0 0;
		line-height: 1.55;
		letter-spacing: 0;
	}
	.cert_fan {
		display: flex;
		justify-content: center;
		margin: 0;
		padding: 12px 0;
		list-style: none;
	}
	.cert_fan li {
		flex: 0 1 30%;
		margin-left: -5%;
		transform: rotate(calc((var(--i) - 1.5) * 4deg))
			translateY(calc((var(--i) - 1.5) * (var(--i) - 1.5) * 4px));
		transition: transform 0.3s var(--motion-ease, ease);
	}
	.cert_fan li:first-child {
		margin-left: 0;
	}
	.cert_fan img {
		display: block;
		width: 100%;
		aspect-ratio: 7 / 5;
		object-fit: cover;
		border-radius: 8px;
		border: 4px solid white;
		box-shadow: 0 12px 28px rgb(0 0 0 / 0.18);
	}
	@media (hover: hover) and (pointer: fine) {
		.cert_fan li:hover {
			z-index: 1;
			transform: translateY(-12px) scale(1.08);
		}
	}

	/* ── Tracer study ── */
	.horizon_title {
		margin-bottom: 8px;
	}
	.horizon_source {
		margin: 0 0 clamp(24px, 2.344vw, 45px);
		color: var(--c-gold-dark);
		font-style: italic;
		font-size: clamp(12px, 0.938vw, 18px);
		letter-spacing: 0;
	}
	.tracer_climb {
		display: grid;
		gap: clamp(18px, 1.563vw, 30px);
	}
	.climb_row {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: baseline;
		gap: 6px 16px;
	}
	.climb_value {
		color: var(--c-maroon);
		font: 700 clamp(36px, 3.385vw, 65px)/1 var(--font-heading);
		font-variant-numeric: tabular-nums;
	}
	.climb_label {
		font-size: clamp(12px, 0.938vw, 18px);
		letter-spacing: 0;
		line-height: 1.3;
	}
	.climb_track {
		grid-column: 1 / -1;
		height: 8px;
		border-radius: 20px;
		background: #fff1d2;
		overflow: hidden;
	}
	.climb_bar {
		height: 100%;
		border-radius: inherit;
		background: var(--c-maroon);
	}
	.tracer_facts {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: clamp(16px, 1.563vw, 30px);
		margin: clamp(28px, 2.604vw, 50px) 0 0;
	}
	.tracer_fact {
		padding-top: 14px;
		border-top: 2px solid var(--c-gold);
	}
	.tracer_fact dt {
		font-size: clamp(11px, 0.833vw, 16px);
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}
	.tracer_fact dd {
		margin: 8px 0 4px;
		color: var(--c-gold-dark);
		font: 700 clamp(28px, 2.5vw, 48px)/1 var(--font-heading);
		font-variant-numeric: tabular-nums;
	}
	.fact_note {
		color: #555;
		font-size: clamp(11px, 0.833vw, 16px);
		font-style: italic;
		letter-spacing: 0;
	}
	.tracer_footnote {
		margin: clamp(24px, 2.083vw, 40px) 0 0;
		padding-top: 14px;
		border-top: 1px dashed #c9bfb3;
		color: #555;
		font-size: clamp(11px, 0.833vw, 16px);
		font-style: italic;
		letter-spacing: 0;
	}

	/* ── Minutes excerpt dialog ── */
	.minutes_dialog {
		width: 100%;
		height: 100%;
		max-width: none;
		max-height: none;
		margin: 0;
		padding: 1.5rem;
		border: 0;
		background: transparent;
		box-sizing: border-box;
		overscroll-behavior: contain;
	}
	.minutes_dialog[open] {
		display: grid;
		place-items: center;
	}
	.minutes_dialog::backdrop {
		background: rgba(22, 5, 7, 0.7);
		backdrop-filter: blur(10px);
	}
	.minutes_viewer {
		padding: clamp(24px, 2.604vw, 50px);
	}
	.minutes_close {
		position: absolute;
		top: 1.25rem;
		right: 1.25rem;
	}
	.minutes_title {
		margin: 0 56px 6px 0;
		color: var(--c-maroon);
		font: 700 clamp(18px, 1.563vw, 28px)/1.25 var(--font-heading);
	}
	.minutes_sub {
		margin: 0 0 20px;
		color: #555;
		font-style: italic;
		letter-spacing: 0;
	}
	.minutes_pages {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 16px;
	}
	.minutes_page {
		margin: 0;
	}
	.minutes_page img {
		display: block;
		width: 100%;
		height: auto;
		border: 1px solid #ddd;
		border-radius: 8px;
	}

	/* ── Motion for the new diagrams ── */
	@media (prefers-reduced-motion: no-preference) {
		.chain_node {
			animation: chain-pulse 9s ease-in-out infinite;
			animation-delay: calc(var(--i) * 1s);
		}
		.course_row.flash {
			scroll-margin: 80px;
		}
	}
	@keyframes chain-pulse {
		0%,
		12%,
		100% {
			transform: none;
		}
		5% {
			transform: translateY(-4px);
			box-shadow:
				inset 0 0 0 1.5px var(--c-gold-light),
				0 0 24px rgb(250 197 73 / 0.45);
		}
	}

	/* ── Responsive ── */
	@media (max-width: 1100px) {
		.revision_tiles {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
		.picab_plate {
			grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
		}
		.picab_photo {
			display: none;
		}
	}
	@media (max-width: 1000px) {
		.cert_note {
			grid-template-columns: 1fr;
		}
		/* Story: the stage becomes a compact bar pinned to the top (inner-page navbar scrolls away). */
		.story_grid {
			grid-template-columns: 1fr;
			gap: 0;
		}
		.story_stage {
			top: 0;
			z-index: 2;
			gap: 14px;
			margin-inline: calc(var(--page-gutter) * -1);
			padding: 14px var(--page-gutter) 6px;
			background: rgb(255 255 255 / 0.92);
			backdrop-filter: blur(10px);
			box-shadow: 0 10px 24px rgb(0 0 0 / 0.06);
		}
		.stage_now {
			grid-auto-flow: column;
			justify-content: start;
			align-items: center;
			gap: 14px;
		}
		.stage_year {
			font-size: 52px;
		}
		.stage_tag {
			margin: 0;
			padding: 6px 12px;
			font-size: 13px;
		}
		.stage_scale {
			padding-bottom: 26px;
		}
		.scale_track {
			height: 8px;
		}
		.scale_marker {
			width: 20px;
			height: 20px;
			border-width: 5px;
		}
		.chapter {
			min-height: 62vh;
		}
		.chapter:first-child,
		.chapter:last-child {
			min-height: 50vh;
		}
		.chain_list {
			grid-template-columns: 1fr;
			gap: 18px;
			--node: 56px;
		}
		.chain_link {
			flex-direction: row;
			gap: 18px;
			text-align: left;
		}
		.chain_link:not(:last-child)::after {
			top: var(--node);
			left: calc(var(--node) / 2 + 4px);
			width: 2px;
			height: 18px;
		}
		.chain_loop {
			height: auto;
			margin: 26px 0 0;
			border: 0;
		}
		.chain_loop::before {
			display: none;
		}
		.loop_pill {
			position: static;
			transform: none;
		}
		.story,
		.story_reverse {
			grid-template-columns: 1fr;
		}
		.story_reverse .story_media {
			order: 0;
		}
		.story_body,
		.story_reverse .story_body {
			margin: 16px 0 0;
		}
	}
	@media (max-width: 800px) {
		.revision_tiles {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
		.revision_tile {
			min-height: 0;
		}
		.picab_plate {
			grid-template-columns: 1fr;
		}
	}
	@media (max-width: 540px) {
		.revision_tiles {
			grid-template-columns: 1fr;
		}
	}
	@media (max-width: 700px) {
		/* Course table collapses to stacked cards. */
		.course_table thead {
			display: none;
		}
		.course_table,
		.course_table tbody,
		.course_table tfoot {
			display: block;
		}
		.course_table tr {
			display: grid;
			grid-template-columns: repeat(4, minmax(0, 1fr));
			gap: 10px 12px;
			padding: 22px 0;
			border-bottom: 1px solid #c9bfb3;
		}
		.course_table tbody :is(th, td),
		.course_table tfoot :is(th, td) {
			padding: 0;
			border: 0;
			width: auto;
			text-align: left;
		}
		.course_table .course_code,
		.course_table .course_name,
		.course_table .prereq_cell {
			grid-column: 1 / -1;
		}
		.course_table .num {
			width: auto;
			text-align: left;
		}
		.course_table .course_name {
			font-size: 16px;
			min-width: 0;
		}
		.course_table .prereq_cell {
			white-space: normal;
			margin-top: 4px;
		}
		.course_table td[data-label]::before {
			content: attr(data-label);
			display: block;
			color: #7b7772;
			font-size: 10px;
			font-weight: 600;
			letter-spacing: 0.1em;
			text-transform: uppercase;
		}
		.course_table tfoot tr {
			border-bottom: 0;
			border-top: 1.5px solid var(--c-maroon);
		}
		.course_table tfoot th {
			grid-column: 1 / 3;
			align-self: end;
		}
		.course_table tfoot td:empty {
			display: none;
		}
		.explorer_progress {
			text-align: left;
		}
		.tracer_facts,
		.minutes_pages {
			grid-template-columns: 1fr;
		}
		.cert_fan li {
			flex-basis: 34%;
		}
	}
</style>
