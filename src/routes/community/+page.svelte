<script>
	import { ArrowUpRight } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import Footer from '#lib/components/footer.svelte';

	import ivote1 from '#lib/assets/community/ivote1.png';
	import ivote2 from '#lib/assets/community/ivote2.png';
	import ivote3 from '#lib/assets/community/ivote3.png';
	import ivote4 from '#lib/assets/community/ivote4.png';
	import ivote5 from '#lib/assets/community/ivote5.png';
	import ivote6 from '#lib/assets/community/ivote6.png';
	import ivote7 from '#lib/assets/community/ivote7.png';
	import ivote8 from '#lib/assets/community/ivote8.png';
	import partnerLogos from '#lib/assets/community/partner-logos.png';

	import aiCarousel1 from '#lib/assets/community/Carousel1.jpg';
	import aiCarousel2 from '#lib/assets/community/Carousel2.jpg';
	import aiCarousel3 from '#lib/assets/community/Carousel3.jpg';
	import aiCarousel4 from '#lib/assets/community/Carousel4.jpg';
	import aiCarousel5 from '#lib/assets/community/Carousel5.jpg';
	import aiCarousel6 from '#lib/assets/community/Carousel6.jpg';
	import aiCarousel7 from '#lib/assets/community/Carousel7.jpg';
	import aiCarousel8 from '#lib/assets/community/Carousel8.jpg';
	import aiCarousel9 from '#lib/assets/community/Carousel9.jpg';
	import responsibleAiPhoto from '#lib/assets/community/responsible-ai-workshop.webp';

	const aiTrainingPhotos = [
		{
			file: 'Carousel1.jpg',
			src: aiCarousel1,
			alt: 'Computer laboratory session and facilitator walkthrough during the August 2025 AI training'
		},
		{
			file: 'Carousel2.jpg',
			src: aiCarousel2,
			alt: 'Participants seated at laboratory workstations following responsible AI guidelines'
		},
		{
			file: 'Carousel3.jpg',
			src: aiCarousel3,
			alt: 'Hands-on computer lab instruction and ethical AI onboarding session'
		},
		{
			file: 'Carousel4.jpg',
			src: aiCarousel4,
			alt: 'Group learning and guided prompt engineering practice across lab rows'
		},
		{
			file: 'Carousel5.jpg',
			src: aiCarousel5,
			alt: 'Interactive discussion on data privacy, transparency, and responsible AI use'
		},
		{
			file: 'Carousel6.jpg',
			src: aiCarousel6,
			alt: 'Facilitators and participants engaged during the laboratory workshop session'
		},
		{
			file: 'Carousel7.jpg',
			src: aiCarousel7,
			alt: 'Presentation deck walkthrough and practical AI application briefing'
		},
		{
			file: 'Carousel8.jpg',
			src: aiCarousel8,
			alt: 'Speaker and training team leading the session at the front of the computer lab'
		},
		{
			file: 'Carousel9.jpg',
			src: aiCarousel9,
			alt: 'Full-room documentation with participants and facilitators at the close of the session'
		}
	];

	let activeTab = $state(0);
	let activeInfographicStage = $state(0);
	let infographicProgress = $state(0);
	let currentImageIndex = $state(0);
	let showGallery = $state(false);
	let statusFilter = $state('ALL');
	let aiPageVisible = $state(true);
	let aiInView = $state(false);
	/** @type {HTMLElement | undefined} */
	let aiMarqueeEl = $state();

	const prefersReducedMotion = () =>
		typeof window !== 'undefined' &&
		window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	const aiShouldAnimate = $derived(
		!prefersReducedMotion() && aiPageVisible && aiInView
	);

	/**
	 * Scroll-fade & glide reveal action matching the reference motion system.
	 * @param {HTMLElement} node
	 * @param {{ threshold?: number }} [options]
	 */
	function reveal(node, options = {}) {
		if (prefersReducedMotion()) {
			node.classList.add('is-revealed');
			return {};
		}
		node.classList.add('reveal-pending');

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						node.classList.add('is-revealed');
						observer.unobserve(node);
					}
				}
			},
			{
				threshold: options.threshold ?? 0.12,
				rootMargin: '0px 0px -36px 0px'
			}
		);

		observer.observe(node);

		return {
			destroy() {
				observer.disconnect();
			}
		};
	}

	/**
	 * Tracks vertical scroll progress through the infographic band so the
	 * connecting rail, active stage (0..2), and focused metric scrub smoothly.
	 * @param {HTMLElement} node
	 */
	function scrubInfographics(node) {
		let frame = 0;

		const update = () => {
			frame = 0;
			const rect = node.getBoundingClientRect();
			const vh = window.innerHeight;
			const totalTravel = rect.height + vh * 0.45;
			const raw = (vh * 0.72 - rect.top) / Math.max(totalTravel, 1);
			const clamped = Math.max(0, Math.min(1, raw));

			infographicProgress = clamped;

			if (!prefersReducedMotion()) {
				const stage = Math.min(2, Math.floor(clamped * 3));
				activeInfographicStage = stage;
			}
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

	/**
	 * Cubic ease-out counter triggered once the element enters view.
	 * @param {HTMLElement} node
	 * @param {{ from?: number, to: number, duration?: number }} params
	 */
	function countUp(node, { from = 0, to, duration = 1250 }) {
		if (prefersReducedMotion()) {
			node.textContent = String(to);
			return {};
		}

		let started = false;
		let frame = 0;

		const run = () => {
			if (started) return;
			started = true;
			const startTime = performance.now();

			/** @param {number} now */
			const step = (now) => {
				const t = Math.min(1, (now - startTime) / duration);
				const eased = 1 - Math.pow(1 - t, 3);
				node.textContent = String(Math.round(from + (to - from) * eased));
				if (t < 1) {
					frame = requestAnimationFrame(step);
				}
			};

			frame = requestAnimationFrame(step);
		};

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries.some((e) => e.isIntersecting)) {
					run();
					observer.disconnect();
				}
			},
			{ threshold: 0.25 }
		);

		observer.observe(node);

		return {
			destroy() {
				cancelAnimationFrame(frame);
				observer.disconnect();
			}
		};
	}

	/** @param {HTMLDialogElement} dialog */
	function openGalleryDialog(dialog) {
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		dialog.showModal();

		return {
			destroy() {
				document.body.style.overflow = previousOverflow;
			}
		};
	}

	const infographicStages = [
		{
			code: '01 · MOA',
			title: 'CUMC & LGU Anchors',
			desc: 'Formalized partnerships with CUMC and City of Mandaluyong / DTI Negosyo Center & MIPO',
			linkNote: 'Feeds 9 documented initiatives across LGUs, cooperatives, schools & orgs',
			metricCaption: '2018–2028 documented extension portfolio across partner communities'
		},
		{
			code: '02 · WORKSHOPS',
			title: 'Digital & AI Readiness',
			desc: 'Presentation literacy, e-commerce skill mapping, and Responsible AI prompt engineering',
			linkNote: 'Drives 7 completed deliveries and 2 active multi-year tracks (77.8% done)',
			metricCaption: '77.8% completion milestone across workshops, seminars, and deployments'
		},
		{
			code: '03 · SYSTEMS',
			title: 'iVOTE++ & MEAL Rollout',
			desc: 'Production election deployments and 2026–2028 examination system with MEAL governance',
			linkNote: 'Scales into 5 live iVOTE++ elections from PHC & Novotel to PUP branches',
			metricCaption: 'PHC MPC • NuSEPHC & PACSSM (Novotel) • PUP MPC & Provident Fund'
		}
	];

	const communityChapters = [
		{
			number: '01',
			era: '2018',
			title: 'Philippine Heart Center Multi-Purpose Cooperative',
			partner: 'PHC MPC Members & Officers',
			summary:
				'BSIT faculty and student technical teams configured, tested, and deployed iVOTE++ on-site for the 2018 PHC Multi-Purpose Cooperative election—replacing manual ballot counting with verified digital tallying.',
			image: ivote5,
			caption:
				'Figure 38. Implementation of iVOTE++ during the election of Philippine Heart Center Multi-Purpose Cooperative in 2018'
		},
		{
			number: '02',
			era: '2019 · NOVOTEL',
			title: 'NuSEPHC & PACSSM General Elections',
			partner:
				'Nursing Service Employees of PHC & Philippine Association of Central Services and Sterilization Management',
			summary:
				'Scaled iVOTE++ operations at Novotel for two major healthcare professional assemblies, complete with student-manned on-site registration booths, voter verification desks, and real-time election support.',
			image: ivote7,
			caption:
				'Implementation of iVOTE++ during the 2019 elections of NuSEPHC and PACSSM at Novotel'
		},
		{
			number: '03',
			era: 'INSTITUTIONAL',
			title: 'PUP Multi-Purpose Cooperative & PUP Provident Fund',
			partner: 'PUP MPC & PUP Provident Fund Members across Campuses',
			summary:
				'Expanded iVOTE++ to support simultaneous on-site and remote online voting, enabling members across different PUP branches outside the Main Campus to participate securely alongside hands-on voter orientation.',
			image: ivote1,
			caption:
				'Implementation of iVOTE++ during the elections of PUP Provident Fund and PUP Multi-Purpose Cooperative'
		},
		{
			number: '04',
			era: '2022–2025',
			title: 'Mandaluyong City, CUMC & Responsible AI Literacy',
			partner: 'CUMC • DTI Negosyo Center Mandaluyong • MIPO',
			summary:
				'Formalized via a Memorandum of Agreement with CUMC and extended on August 19, 2025 with DTI Negosyo Center Mandaluyong and MIPO—delivering presentation software training, an ongoing e-commerce seminar series, and Responsible AI prompt engineering workshops.',
			image: responsibleAiPhoto,
			imagePosition: '62% center',
			alt: 'An instructor presents AI applications while participants watch from computer workstations',
			caption:
				'Responsible AI literacy workshop in cooperation with DTI Negosyo Center Mandaluyong and MIPO'
		},
		{
			number: '05',
			era: '2026–2028',
			title: 'Claro M. Recto High School Examination Management System',
			partner: 'Claro M. Recto High School Faculty & Students',
			summary:
				'Transitions department research into a multi-year production platform automating test preparation, grade logging, and academic assessments—governed by Monitoring, Evaluation, Accountability, and Learning (MEAL) protocols.',
			image: ivote4,
			caption:
				'Multi-phase software rollout, user training, and continuous system optimization (2026–2028)'
		}
	];

	const profiles = [
		{
			tabLabel: 'DIGITAL LITERACY',
			title: 'DIGITAL LITERACY AND ETHICAL TECHNOLOGY USE (RESPONSIBLE AI ONBOARDING)',
			partner:
				'PARTNER: INVESTMENT PROMOTION OFFICE – NEGOSYO CENTER OF MANDALUYONG CITY (AUGUST 19, 2025)',
			challenge:
				'Responding directly to emerging corporate concerns regarding generative AI misuse, lack of data privacy, and missing digital ethics parameters among local entrepreneurs and MSMEs.',
			content:
				'Conducted on August 19, 2025 in cooperation with the City Government of Mandaluyong, DTI Negosyo Center Mandaluyong, and Mandaluyong Investment Promotion Office (MIPO). Facilitated a complete extension cycle from planning to assessment—covering responsible AI principles (transparency, fairness, privacy, and human oversight) plus hands-on prompt engineering labs, backed by evaluation tools, attendance records, photo documentation, and certificates of recognition with high participant satisfaction ratings.',
			showPartnerStrip: true,
			photos: [
				{
					src: ivote1,
					alt: 'Facilitator and participant briefing during the digital literacy extension session'
				},
				{
					src: ivote3,
					alt: 'Hands-on computer lab guidance and digital ethics walkthrough'
				}
			]
		},
		{
			tabLabel: 'ECONOMIC EMPOWERMENT',
			title:
				'DIGITAL ECONOMIC EMPOWERMENT TRACK (E-COMMERCE, DIGITAL MARKETING & PRESENTATION LITERACY)',
			partner:
				'PARTNER: COOPERATIVE UNION OF MANDALUYONG CITY (CUMC) — FORMAL MOA PARTNERSHIP',
			challenge:
				'Improving productivity, widening market reach, and ensuring the business sustainability of small local distributors, cooperative officers, and micro and small enterprise (MSE) owners.',
			content:
				'Anchored on a formal Memorandum of Agreement between PUP (represented by VP for Research, Extension, Planning and Development Dr. Anna Ruby P. Gapasin) and CUMC (represented by Chairperson Mr. Ernesto E. Victorino, witnessed by CCIS Dean Dr. Benilda Eleonor V. Comendador and EMO Chief Dr. Henry R. Prudente). Combines completed Computer Literacy on Presentation Software with the ongoing E-Commerce Awareness, Skills, and Readiness Seminar Series that maps skill gaps and builds actionable digital marketing plans.',
			showPartnerStrip: true,
			photos: [
				{
					src: ivote2,
					alt: 'One-on-one technical guidance during enterprise digital readiness training'
				},
				{
					src: ivote6,
					alt: 'Collaborative orientation and systems walkthrough with cooperative members'
				}
			]
		},
		{
			tabLabel: 'SOLUTION ENGINEERING',
			title:
				'HIGH-MATURITY SOLUTION ENGINEERING (CLARO M. RECTO HIGH SCHOOL EXAMINATION MANAGEMENT SYSTEM)',
			partner: 'PARTNER: CLARO M. RECTO HIGH SCHOOL ADMINISTRATION (2026–2028)',
			challenge:
				'Eliminating administrative inefficiencies regarding paper-based test preparation, grade logs, and data assessments for faculty members and students.',
			content:
				'Scheduled for active deployment from 2026 through 2028, this initiative marks a high level of extension maturity by transforming core department research outputs into a deployable software platform. The project features a structured, multi-phase rollout covering software installation, user training, system enhancements, and long-term impact analysis with embedded MEAL mechanisms.',
			showPartnerStrip: false,
			photos: [
				{
					src: ivote4,
					alt: 'System walk-through and hands-on workflow testing for end users'
				},
				{
					src: ivote8,
					alt: 'Field coordination and deployment support team documentation'
				}
			]
		}
	];

	const initiatives = [
		{
			no: 1,
			name: 'Computer Literacy on Presentation Software for Cooperative Union of Mandaluyong City',
			partner: 'Cooperative Union of Mandaluyong City (CUMC)',
			beneficiaries:
				'Micro and small enterprise owners of Mandaluyong; Cooperative officers and staff; Local entrepreneurs affiliated with the cooperative',
			status: 'Completed',
			docUrl: 'https://tinyurl.com/3d8yr5k7',
			docLabel: 'View Doc'
		},
		{
			no: 2,
			name: 'Computer Literacy on the Responsible Use of Artificial Intelligence',
			partner: 'Investment Promotion Office – Negosyo Center, City of Mandaluyong',
			beneficiaries: 'Members of the Negosyo Center',
			status: 'Completed',
			docUrl: 'https://tinyurl.com/2jhstwr3',
			docLabel: 'View Doc'
		},
		{
			no: 3,
			name:
				'Empowering Micro and Small Enterprises of Mandaluyong in the Digital Age: E-Commerce Awareness, Skills, and Readiness Seminar Series',
			partner: 'Cooperative Union of Mandaluyong City (CUMC)',
			beneficiaries:
				'Micro and small enterprise owners of Mandaluyong; Cooperative officers and staff; Local entrepreneurs affiliated with the cooperative',
			status: 'Ongoing',
			docUrl: 'https://tinyurl.com/mrym5bzt',
			docLabel: 'View Doc'
		},
		{
			no: 4,
			name: 'Examination Management System',
			partner: 'Claro M. Recto High School',
			beneficiaries: 'Faculty Members; Students',
			status: 'Ongoing',
			docUrl: 'https://tinyurl.com/3dh6m6ah',
			docLabel: 'View Doc'
		},
		{
			no: 5,
			name: 'Implementation of iVOTE++ in PUP Provident Fund Election',
			partner: 'PUP Provident Fund',
			beneficiaries: 'Provident Fund Members and Officers',
			status: 'Completed',
			docUrl: 'https://tinyurl.com/f963p9d7',
			docLabel: 'View Doc'
		},
		{
			no: 6,
			name: 'Implementation of iVOTE++ in PUP Multi-Purpose Cooperative Election',
			partner: 'PUP Multi-Purpose Cooperative',
			beneficiaries: 'PUP MPC Members and Officers',
			status: 'Completed',
			docUrl: 'https://tinyurl.com/f963p9d7',
			docLabel: 'View Doc'
		},
		{
			no: 7,
			name:
				'Implementation of iVOTE++ in Philippine Heart Center Multi-Purpose Cooperative Election',
			partner: 'Philippine Heart Center Multi-Purpose Cooperative (2018)',
			beneficiaries: 'PHC MPC Members and Officers',
			status: 'Completed',
			docUrl: '',
			docLabel: 'Figure 38 Archive'
		},
		{
			no: 8,
			name:
				'Implementation of iVOTE++ in Nursing Service Employees of the Philippine Heart Center Election',
			partner: 'Nursing Service Employees of the Philippine Heart Center (2019, Novotel)',
			beneficiaries: 'NuSEPHC Members and Officers',
			status: 'Completed',
			docUrl: '',
			docLabel: 'Novotel 2019 Archive'
		},
		{
			no: 9,
			name:
				'Implementation of iVOTE++ in Philippine Association of Central Services and Sterilization Management Election',
			partner:
				'Philippine Association of Central Services and Sterilization Management (2019, Novotel)',
			beneficiaries: 'PACSSM Members and Officers',
			status: 'Completed',
			docUrl: '',
			docLabel: 'Novotel 2019 Archive'
		}
	];

	const filteredInitiatives = $derived(
		statusFilter === 'ALL'
			? initiatives
			: initiatives.filter((item) => item.status.toUpperCase() === statusFilter)
	);

	const archiveSlides = [
		{
			src: ivote1,
			caption: 'PUP Provident Fund General Assembly & Election'
		},
		{
			src: ivote2,
			caption: 'On-Site Voter Orientation & System Verification (PUP)'
		},
		{
			src: ivote3,
			caption: 'PUP Multi-Purpose Cooperative Hybrid Election Session'
		},
		{
			src: ivote4,
			caption: 'Student Technical Facilitator Assisting Cooperative Voter'
		},
		{
			src: ivote5,
			caption: '2018 Philippine Heart Center Multi-Purpose Cooperative Election Team'
		},
		{
			src: ivote6,
			caption: '2018 PHC Multi-Purpose Cooperative Live Voting Operations'
		},
		{
			src: ivote7,
			caption: '2019 NuSEPHC Election Deployment at Novotel'
		},
		{
			src: ivote8,
			caption: '2019 PACSSM On-Site Registration & Voting Operations at Novotel'
		}
	];

	onMount(() => {
		const syncVisibility = () => {
			aiPageVisible = !document.hidden;
		};
		syncVisibility();
		document.addEventListener('visibilitychange', syncVisibility);

		const aiObserver = new IntersectionObserver(
			([entry]) => {
				aiInView = entry.isIntersecting;
			},
			{ threshold: 0.1 }
		);
		if (aiMarqueeEl) aiObserver.observe(aiMarqueeEl);

		const archiveInterval = setInterval(() => {
			currentImageIndex = (currentImageIndex + 1) % archiveSlides.length;
		}, 4000);

		return () => {
			aiObserver.disconnect();
			clearInterval(archiveInterval);
			document.removeEventListener('visibilitychange', syncVisibility);
		};
	});
</script>

<svelte:head>
	<title>Community | DIT-PUP</title>
	<meta
		name="description"
		content="Explore PUP BSIT’s community extension initiatives, digital literacy and e-commerce workshops, and iVOTE++ digital governance deployments."
	/>
</svelte:head>

<main class="community_page">
	<!-- ══ 1. HERO SECTION ══ -->
	<section class="community-hero">
		<img
			class="hero-bg"
			src="/img/pages/community-hero.webp"
			alt="Participants pose in front of a computer literacy training banner in Mandaluyong"
			fetchpriority="high"
		/>
		<h1 class="t_display hero-title">COMMUNITY</h1>
	</section>

	<!-- ══ 2. STRATEGIC AGENDA, CONNECTED SCROLL INFOGRAPHICS & MATURITY FRAMEWORK ══ -->
	<section id="community-extension-agenda" class="strategic-agenda">
		<header class="agenda-header" use:reveal>
			<div class="accent-square"></div>
			<h2 class="t_eyebrow">COMMUNITY EXTENSION POLICY AND STRATEGIC AGENDA</h2>
		</header>

		<div class="agenda-content-grid">
			<div class="agenda-panel panel-red" use:reveal style:--d="0">
				<h3>SOCIAL STANCE &amp; SERVICE ORIENTATION</h3>
				<hr class="accent-line" />
				<p>
					The Bachelor of Science in Information Technology (BSIT) program demonstrates a sustained
					and well-documented commitment to community development. Through technology-driven
					extension initiatives, the department applies its information technology expertise to
					promote digital inclusion, capacity building, and organizational modernization across
					local government units, cooperatives, public schools, and community-based organizations.
				</p>
			</div>

			<div class="agenda-panel panel-gold" use:reveal style:--d="1">
				<h3>EXPERIENTIAL LEARNING INTEGRATION</h3>
				<hr class="accent-line" />
				<p>
					Extension projects consistently exhibit strong faculty leadership, interdisciplinary
					collaboration, and active student involvement—linking community service with academic
					expertise and instructional objectives. Faculty members serve as project leaders,
					trainers, system developers, and evaluators, while IT students participate as
					facilitators, moderators, and technical assistants.
				</p>
			</div>
		</div>

		<!-- CONNECTED SCROLL-LINKED PATHWAY + SCOREBOARD BAND -->
		<div
			class="editorial-scoreboard-band"
			use:scrubInfographics
			style="--scrub: {infographicProgress};"
		>
			<div class="pathway_wrap">
				<div class="pathway_scrub_rail" aria-hidden="true">
					<div class="pathway_scrub_fill" style="width: {Math.round(infographicProgress * 100)}%;"></div>
				</div>

				<ol class="pathway_line" aria-label="Community extension progression" use:reveal>
					{#each infographicStages as stage, idx (stage.code)}
						<li class:is-stage-active={activeInfographicStage === idx} style:--d={idx}>
							<button
								type="button"
								class="pathway_trigger"
								aria-pressed={activeInfographicStage === idx}
								onclick={() => (activeInfographicStage = idx)}
							>
								<span class="pathway_dot" aria-hidden="true"></span>
								<strong>{stage.code}</strong>
								<h4>{stage.title}</h4>
								<span>{stage.desc}</span>
								<small class="pathway_link_hint">↳ {stage.linkNote}</small>
							</button>
						</li>
					{/each}
				</ol>
			</div>

			<div class="scoreboard_grid" use:reveal>
				<div
					class="score_col"
					class:is-focused={activeInfographicStage === 0}
					style:--d="0"
				>
					<div class="score_top">
						<p class="score_num">
							<span use:countUp={{ to: 9 }}>9</span><small>initiatives</small>
						</p>
						<span class="score_tag">01 · MOA &amp; REACH</span>
					</div>
					<h3 class="score_label">Documented Extension Portfolio</h3>
					<p class="score_sub">
						Spanning local government units, cooperatives, public schools, and community organizations.
					</p>
					<div class="segment_bar" aria-hidden="true">
						<span class="seg seg-maroon" style="--w: 55%;">LGUs &amp; Co-ops</span>
						<span class="seg seg-gold" style="--w: 45%;">Systems &amp; Schools</span>
					</div>
				</div>

				<div
					class="score_col"
					class:is-focused={activeInfographicStage === 1}
					style:--d="1"
				>
					<div class="score_top">
						<p class="score_num">
							<span use:countUp={{ to: 7 }}>7</span><small>of 9 done</small>
						</p>
						<span class="score_tag">02 · 77.8%</span>
					</div>
					<h3 class="score_label">Implementation Progress</h3>
					<p class="score_sub">7 initiatives completed · 2 ongoing rollouts through 2026–2028.</p>

					<div class="mini_ruler" role="img" aria-label="7 out of 9 extension initiatives completed">
						<div class="mini_ruler_track">
							{#each [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as tick (tick)}
								<span class="mini_tick" class:done={tick <= 7} style="--pos: {tick / 9}">
									<em>{tick}</em>
								</span>
							{/each}
							<span class="mini_progress_fill" style="--target: 77.78%;"></span>
							<span class="mini_pin" style="--target: 77.78%;"><b>NOW · 7</b></span>
						</div>
					</div>
				</div>

				<div
					class="score_col"
					class:is-focused={activeInfographicStage === 2}
					style:--d="2"
				>
					<div class="score_top">
						<p class="score_num">
							<span use:countUp={{ to: 5 }}>5</span><small>elections</small>
						</p>
						<span class="score_tag">03 · iVOTE++</span>
					</div>
					<h3 class="score_label">Digital Governance Deployments</h3>
					<p class="score_sub">
						PHC MPC • Novotel (NuSEPHC &amp; PACSSM) • PUP Multi-Purpose Co-op &amp; Provident Fund.
					</p>
					<div class="node_badges" aria-hidden="true">
						<span>On-Site Tally</span>
						<span>Novotel Assembly</span>
						<span>Cross-Branch</span>
					</div>
				</div>
			</div>
		</div>

		<div class="maturity-framework">
			<div class="framework-header" use:reveal>
				<h2 class="t_eyebrow">EVOLUTION OF EXTENSION MATURITY FRAMEWORK</h2>
				<hr class="framework-divider" />
				<p class="framework-description">
					The department’s extension agenda operates as a strategic, needs-driven, and
					technology-enabled cycle. The program has systematically transitioned away from episodic
					awareness campaigns toward highly scalable, sustainable ICT interventions divided into
					three core pillars—each backed by needs assessments, attendance logs, evaluation tools,
					and certificates of recognition:
				</p>
			</div>

			<div class="framework-cards-grid">
				<div class="pillar-card card-bg-1" style="--bg-image: url('{ivote1}'); --d: 0;" use:reveal>
					<span class="card-number">0 1</span>
					<div class="card-content">
						<h4>Awareness &amp; Digital Ethics</h4>
						<p>
							Addressing emerging digital concerns, data privacy, and ethical technology adoption
							through responsible AI literacy and prompt engineering workshops.
						</p>
						<div class="maturity-meter">
							<span class="meter-label">Pillar 1 • Foundation &amp; Ethics</span>
							<div class="meter-track"><div class="meter-fill fill-1"></div></div>
						</div>
					</div>
				</div>

				<div class="pillar-card card-bg-2" style="--bg-image: url('{ivote2}'); --d: 1;" use:reveal>
					<span class="card-number">0 2</span>
					<div class="card-content">
						<h4>Economic &amp; Skills Empowerment Seminars</h4>
						<p>
							Assessing technological skill gaps of local distributors, cooperative officers, and
							MSE owners to guide them toward presentation, e-commerce, and digital marketing
							adoption.
						</p>
						<div class="maturity-meter">
							<span class="meter-label">Pillar 2 • MSME &amp; Cooperative Growth</span>
							<div class="meter-track"><div class="meter-fill fill-2"></div></div>
						</div>
					</div>
				</div>

				<div class="pillar-card card-bg-3" style="--bg-image: url('{ivote3}'); --d: 2;" use:reveal>
					<span class="card-number">0 3</span>
					<div class="card-content">
						<h4>Applied Technical Solution Deployment</h4>
						<p>
							Translating faculty research and student configurations into practical, deployable
							systems—including iVOTE++ and the Claro M. Recto High School Examination Management
							System.
						</p>
						<div class="maturity-meter">
							<span class="meter-label">Pillar 3 • Production Systems &amp; MEAL</span>
							<div class="meter-track"><div class="meter-fill fill-3"></div></div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="verification-bar" use:reveal>
			<div class="verification-item">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="badge-icon"
					><path
						d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.76 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
					/><path d="m9 12 2 2 4-4" /></svg
				>
				<span>DATA VERIFICATION: STRATEGIC PLAN &amp; MOAs</span>
			</div>
			<div class="verification-item">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="badge-icon"
					><path
						d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.76 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
					/><path d="m9 12 2 2 4-4" /></svg
				>
				<span>VERIFICATION: INTEGRATION &amp; PROCEEDINGS LOGS</span>
			</div>
		</div>
	</section>

	<!-- ══ 3. CHRONICLES OF EXTENSION & FIELD DEPLOYMENT ══ -->
	<section id="community-story" class="editorial-chronicles">
		<div class="editorial-section-head" use:reveal>
			<div class="section-header">
				<div class="icon-box">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="26"
						height="26"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg
					>
				</div>
				<h2 class="t_eyebrow">CHRONICLES OF EXTENSION &amp; FIELD DEPLOYMENT</h2>
			</div>
		</div>

		<div class="chronicle_list">
			{#each communityChapters as chap, i (chap.number)}
				<article
					class="chronicle_card {i % 2 === 1 ? 'is-reversed' : ''}"
					use:reveal={{ threshold: 0.14 }}
					style:--d={i % 2}
				>
					<div class="chronicle_media_col">
						<div class="chronicle_frame">
							<img
								src={chap.image}
								alt={chap.alt ?? chap.caption}
								style:object-position={chap.imagePosition}
								loading="lazy"
							/>
						</div>
						<p class="chronicle_caption">{chap.caption}</p>
					</div>

					<div class="chronicle_copy_col">
						<div class="chronicle_meta_row">
							<span class="chronicle_num">{chap.number}</span>
							<span class="chronicle_era">{chap.era}</span>
						</div>
						<h3 class="chronicle_title">{chap.title}</h3>
						<p class="chronicle_partner">{chap.partner}</p>
						<p class="chronicle_summary">{chap.summary}</p>
					</div>
				</article>
			{/each}
		</div>
	</section>

	<!-- ══ 3B. RESPONSIBLE AI TRAINING AUTO-CAROUSEL (AUGUST 2025) ══ -->
<!-- ══ 3B. RESPONSIBLE AI TRAINING AUTO-CAROUSEL (AUGUST 2025) ══ -->
	<section id="responsible-ai-training" class="ai-training-section">
		<div class="editorial-section-head" use:reveal>
			<div class="section-header">
				<div class="icon-box">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="26"
						height="26"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						><rect x="2" y="3" width="20" height="14" rx="2" /><line
							x1="8"
							y1="21"
							x2="16"
							y2="21"
						/><line x1="12" y1="17" x2="12" y2="21" /></svg
					>
				</div>
				<h2 class="t_eyebrow">
					COMPUTER LITERACY TRAINING ON THE RESPONSIBLE USE OF ARTIFICIAL INTELLIGENCE (AI)
					CONDUCTED IN AUGUST 2025
				</h2>
			</div>
			<hr class="header-divider" />
		</div>

		<div
			class="ai-marquee-viewport"
			bind:this={aiMarqueeEl}
			aria-label="Computer Literacy Training on the Responsible Use of Artificial Intelligence (AI) conducted in August 2025"
			use:reveal
		>
			<div class="ai-marquee-track" class:is-paused={!aiShouldAnimate}>
				{#each [false, true] as isClone (isClone)}
					<div class="ai-marquee-group" aria-hidden={isClone}>
						{#each aiTrainingPhotos as photo, i (photo.file + '-' + isClone)}
							<div class="ai-strip-item" style="--i: {i};">
								<img
									src={photo.src}
									alt={isClone ? '' : photo.alt}
									loading="eager"
									decoding="async"
									width="640"
									height="400"
								/>
							</div>
						{/each}
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- ══ 4. TECHNICAL PROFILES & INITIATIVES LEDGER ══ -->
	<section id="technical-profiles" class="technical-profiles">
		<header class="section-header" use:reveal>
			<div class="icon-box">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="26"
					height="26"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					><path
						d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"
					/><path d="M9 10h6" /><path d="M9 14h6" /></svg
				>
			</div>
			<h2 class="t_eyebrow">TECHNICAL PROFILES</h2>
		</header>

		<hr class="header-divider" />

		<div class="tab-container" use:reveal>
			<div class="tabs" role="tablist" aria-label="Technical Profiles">
				{#each profiles as profile, index (profile.tabLabel)}
					<button
						type="button"
						role="tab"
						aria-selected={activeTab === index}
						class="tab-btn {activeTab === index ? 'active' : ''}"
						onclick={() => (activeTab = index)}
					>
						{profile.tabLabel}
					</button>
				{/each}
			</div>

			{#key activeTab}
				<div class="profile-card animate-panel">
					<div class="card-header-split">
						<div class="header-left">
							<div class="badge">FEATURED</div>
							<h3 class="profile-title">{profiles[activeTab].title}</h3>
							<p class="partner-text">{profiles[activeTab].partner}</p>
						</div>

						<div class="header-right">
							<h4 class="archives-title">DEPLOYMENT ARCHIVES</h4>
						</div>
					</div>

					<div class="card-content-split">
						<div class="content-left">
							<div class="info-box">
								<h4>STRATEGIC CHALLENGE</h4>
								<p>{profiles[activeTab].challenge}</p>
							</div>

							<div class="info-box">
								<h4>TECHNICAL CONTENT</h4>
								<p>{profiles[activeTab].content}</p>
							</div>

							{#if profiles[activeTab].showPartnerStrip}
								<div class="partner-emblem-box">
									<span class="emblem-label">COOPERATING LGU &amp; INSTITUTIONAL PARTNERS</span>
									<img
										src={partnerLogos}
										alt="City of Mandaluyong, Negosyo Center Mandaluyong City, and Mandaluyong Investment Promotion Office (MIPO) logos"
									/>
								</div>
							{/if}
						</div>

						<div class="content-right">
							<div class="horizontal-photo-stack">
								{#each profiles[activeTab].photos as photo (photo.src)}
									<div class="horizontal-photo-card">
										<img src={photo.src} alt={photo.alt} loading="lazy" />
									</div>
								{/each}
							</div>
						</div>
					</div>
				</div>
			{/key}
		</div>

		<div class="initiatives-ledger" use:reveal>
			<div class="ledger-header">
				<div>
					<span class="ledger-kicker">VERIFIABLE EVIDENCE MATRIX</span>
					<h3 class="ledger-heading">
						COMPLETED AND ONGOING INITIATIVES IN COMMUNITY DEVELOPMENT
					</h3>
					<p class="ledger-desc">
						Tabulated summary of documented extension proposals, partner communities, target
						beneficiaries, implementation status, and supporting documentation.
					</p>
				</div>

				<div class="filter-pills" role="group" aria-label="Filter projects by status">
					<button
						type="button"
						class="filter-pill {statusFilter === 'ALL' ? 'active' : ''}"
						onclick={() => (statusFilter = 'ALL')}
					>
						All ({initiatives.length})
					</button>
					<button
						type="button"
						class="filter-pill {statusFilter === 'COMPLETED' ? 'active' : ''}"
						onclick={() => (statusFilter = 'COMPLETED')}
					>
						Completed (7)
					</button>
					<button
						type="button"
						class="filter-pill {statusFilter === 'ONGOING' ? 'active' : ''}"
						onclick={() => (statusFilter = 'ONGOING')}
					>
						Ongoing (2)
					</button>
				</div>
			</div>

			<div class="table-scroll">
				<table class="initiatives-table">
					<thead>
						<tr>
							<th>No.</th>
							<th>Name of Project</th>
							<th>Partner Community / Organization</th>
							<th>Target Beneficiaries</th>
							<th>Status</th>
							<th>Supporting Document/s</th>
						</tr>
					</thead>
					<tbody>
						{#each filteredInitiatives as row (row.no)}
							<tr class="ledger-row">
								<td class="row-num">{row.no}</td>
								<td class="row-title"><strong>{row.name}</strong></td>
								<td>{row.partner}</td>
								<td>{row.beneficiaries}</td>
								<td>
									<span
										class="status-badge {row.status === 'Ongoing' ? 'ongoing' : 'completed'}"
									>
										{row.status}
									</span>
								</td>
								<td class="row-doc">
									{#if row.docUrl}
										<a
											href={row.docUrl}
											target="_blank"
											rel="external noopener noreferrer"
											class="doc-anchor"
										>
											{row.docLabel} ↗
										</a>
									{:else}
										<span class="doc-archive-tag">{row.docLabel}</span>
									{/if}
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
		</div>

		<div class="narrative-action-wrapper" use:reveal>
			<a
				href="https://bit.ly/ITL4Area3"
				class="report-button"
				target="_blank"
				rel="noopener noreferrer"
			>
				<span>View Full Narrative Report</span>
				<ArrowUpRight size={19} aria-hidden="true" />
			</a>
		</div>
	</section>

	<!-- ══ 5. PUP IVOTE++ SHOWCASE ══ -->
	<section id="ivote-showcase" class="ivote-showcase">
		<div class="ivote-left">
			<div class="ivote-header" use:reveal>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="26"
					height="26"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="ivote-icon"
					><path
						d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"
					/><path d="M9 10h6" /><path d="M9 14h6" /></svg
				>
				<h2 class="t_eyebrow">PUP IVOTE++</h2>
			</div>

			<h3 class="ivote-sub" use:reveal style:--d="1">
				High-Impact Special Deployment<br />Showcase: The PUP iVOTE++ System
			</h3>

			<div class="ivote-divider" use:reveal style:--d="1">
				<h4>SYSTEM OVERVIEW &amp; ARCHITECTURAL PURPOSE</h4>
				<hr />
			</div>

			<p class="ivote-desc" use:reveal style:--d="2">
				The PUP iVOTE++ system is a secure, technology-enabled digital voting platform designed,
				configured, and deployed by BSIT students and faculty members in partnership with the
				Philippine Heart Center (Multi-Purpose Cooperative &amp; Nursing Service Employees),
				Philippine Association of Central Services and Sterilization Management (PACSSM), PUP
				Multi-Purpose Cooperative, and the PUP Provident Fund—modernizing administrative elections
				with hybrid on-site and online participation.
			</p>

			<div class="ivote-cards-container">
				<div class="ivote-card" use:reveal style:--d="0">
					<div class="iv-card-bg" style="background-image: url('{ivote5}');"></div>
					<div class="iv-card-content">
						<h5>HYBRID<br />OPERATIONS</h5>
						<span>100% RELIABLE</span>
						<p>Fully supports simultaneous secure on-site and online remote voting.</p>
					</div>
				</div>

				<div class="ivote-card" use:reveal style:--d="1">
					<div class="iv-card-bg" style="background-image: url('{ivote7}');"></div>
					<div class="iv-card-content">
						<h5>CROSS-BRANCH</h5>
						<span>ALL ACCESS</span>
						<p>
							Enabled secure remote voting for across-campus members, establishing a blueprint for
							inclusive digital governance.
						</p>
					</div>
				</div>

				<div class="ivote-card" use:reveal style:--d="2">
					<div class="iv-card-bg" style="background-image: url('{ivote2}');"></div>
					<div class="iv-card-content">
						<h5>TECH-TRANSFER</h5>
						<span>COMMUNITY LEAD</span>
						<p>
							Beyond installation, faculty and students completed training, code verification, and
							orientation to build digital confidence and governance acceptance.
						</p>
					</div>
				</div>
			</div>
		</div>

		<div class="ivote-right" use:reveal={{ threshold: 0.12 }}>
			<div class="archive-fade-container">
				{#each archiveSlides as slide, idx (slide.src)}
					<div
						class="fade-slide {currentImageIndex === idx ? 'active' : ''}"
						style="background-image: url('{slide.src}');"
					></div>
				{/each}
				<div class="fade-scrim"></div>

				<button class="gallery-link" type="button" onclick={() => (showGallery = true)}>
					VIEW FULL GALLERY
				</button>

				<div class="fade-archive-text">
					<h2 class="archive-title-large">PUP IVOTE++</h2>
					<p class="archive-subtitle">{archiveSlides[currentImageIndex].caption}</p>
				</div>
			</div>
		</div>
	</section>

	<!-- ══ 6. MULA SA'YO CLOSING BANNER ══ -->
	<section class="motto-text-section" use:reveal>
		<div class="motto-content">
			<h1
				class="motto-title"
				data-text="Mula sa'yo,&#10;para sa bayan"
				style="--motto-bg: url('{ivote1}');"
			>
				<span class="keep-together">Mula sa'yo,</span><br />
				<span class="keep-together">para sa bayan</span>
			</h1>
			<p class="motto-subtitle">
				Bridging <span class="text-yellow">technology and people</span> through open-source collaboration,
				digital literacy outreach, and tech workshops.
			</p>
		</div>
	</section>

	<!-- ══ 7. PUP IVOTE++ GALLERY MODAL ══ -->
	{#if showGallery}
		<dialog
			class="gallery-modal-overlay"
			aria-labelledby="gallery-title"
			use:openGalleryDialog
			onclose={() => (showGallery = false)}
			onclick={(event) => {
				if (event.target === event.currentTarget) event.currentTarget.close();
			}}
		>
			<div class="gallery-modal-content">
				<button
					class="close-modal"
					type="button"
					aria-label="Close gallery"
					onclick={(event) => event.currentTarget.closest('dialog')?.close()}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="32"
						height="32"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
						><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"
						></line></svg
					>
				</button>

				<div class="gallery-header">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="26"
						height="26"
						viewBox="0 0 24 24"
						fill="none"
						stroke="#6a1316"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						><path
							d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"
						/><path d="M9 10h6" /><path d="M9 14h6" /></svg
					>
					<h2 id="gallery-title" class="t_eyebrow">PUP IVOTE++ DEPLOYMENT GALLERY</h2>
				</div>

				<div class="gallery-grid-container">
					{#each archiveSlides as slide (slide.src)}
						<figure class="gallery-img-box">
							<img src={slide.src} alt={slide.caption} />
							<figcaption>{slide.caption}</figcaption>
						</figure>
					{/each}
				</div>
			</div>
		</dialog>
	{/if}

	<Footer />
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,500;0,600;1,400;1,600&family=Overpass:wght@600;700;800;900&display=swap');

	.community_page {
		--ease: cubic-bezier(0.16, 1, 0.3, 1);
		--rule: rgba(184, 121, 16, 0.28);
		--muted: #574b44;
	}

	/* Global scroll-fade & glide reveal system */
	@media (prefers-reduced-motion: no-preference) {
		.community_page :global(.reveal-pending) {
			opacity: 0;
			translate: 0 32px;
			transition:
				opacity 0.9s ease,
				translate 1.05s var(--ease);
			transition-delay: calc(var(--d, 0) * 110ms);
		}

		.community_page :global(.reveal-pending.is-revealed) {
			opacity: 1;
			translate: 0 0;
		}

		.pathway_line:global(.reveal-pending) li {
			opacity: 0;
			translate: 0 16px;
			transition:
				opacity 0.6s ease,
				translate 0.8s var(--ease);
			transition-delay: calc(0.2s + var(--d) * 0.2s);
		}

		.pathway_line:global(.is-revealed) li {
			opacity: 1;
			translate: 0 0;
		}
	}

	/* --- KEYFRAMES & MOTION --- */
	@keyframes panelReveal {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.animate-panel {
		animation: panelReveal 0.35s cubic-bezier(0.22, 1, 0.36, 1);
	}

	.ledger-row {
		animation: panelReveal 0.28s var(--ease) both;
	}

	.narrative-action-wrapper {
		display: flex;
		justify-content: center;
		width: 100%;
		margin-top: 2.25rem;
		margin-bottom: 0;
	}

	/* --- HERO SECTION --- */
	.community-hero {
		position: relative;
		width: 100%;
		height: 100dvh;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #f0f0f0;
		overflow: hidden;
	}

	.hero-bg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center 62%;
		opacity: 0.3;
		z-index: 0;
	}

	.hero-title {
		position: relative;
		z-index: 1;
	}

	/* --- STRATEGIC AGENDA --- */
	.strategic-agenda {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.agenda-header {
		background: linear-gradient(to right, #420607 0%, #000000 80%);
		padding: 24px 5%;
		display: flex;
		align-items: center;
		gap: 16px;
	}

	.accent-square {
		width: 20px;
		height: 20px;
		background-color: #ef9b08;
		flex-shrink: 0;
	}

	.agenda-header :global(.t_eyebrow) {
		display: inline-block;
	}

	.agenda-content-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		width: 100%;
	}

	.agenda-panel {
		padding: 60px 10%;
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.agenda-panel h3 {
		font-family: 'Overpass', sans-serif;
		font-size: 1.15rem;
		font-weight: 800;
		letter-spacing: 0.05em;
		margin: 0;
	}

	.accent-line {
		border: none;
		height: 1px;
		width: 100%;
		background-color: rgba(255, 255, 255, 0.4);
		margin: 0;
	}

	.agenda-panel p {
		font-family: 'Inter', sans-serif;
		font-size: 1rem;
		line-height: 1.65;
		margin: 0;
	}

	.panel-red {
		background-color: #941518;
		color: #ffffff;
	}

	.panel-gold {
		background-color: #f8b209;
		color: #ffffff;
	}

	/* ══ CHRONICLES-ALIGNED PATHWAY + SCOREBOARD INFOGRAPHICS ══ */
	.editorial-scoreboard-band {
		background-color: #ffffff;
		padding: clamp(56px, 6vw, 96px) 10%;
		border-bottom: 1px solid #e5dfd5;
	}

	.pathway_wrap {
		position: relative;
		margin-bottom: clamp(36px, 4vw, 56px);
	}

	.pathway_scrub_rail {
		position: relative;
		width: 100%;
		height: 3px;
		background-color: #ece5d8;
		border-radius: 999px;
		overflow: hidden;
		margin-bottom: 18px;
	}

	.pathway_scrub_fill {
		height: 100%;
		background: linear-gradient(90deg, #6a1316 0%, #d49814 100%);
		transition: width 0.22s linear;
	}

	.pathway_line {
		position: relative;
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: clamp(18px, 2.5vw, 32px);
	}

	.pathway_line li {
		position: relative;
		display: flex;
	}

	.pathway_trigger {
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		text-align: left;
		gap: 6px;
		padding: 18px 20px;
		border-radius: 12px;
		border: 1px solid #e5dfd5;
		background-color: #ffffff;
		cursor: pointer;
		transition:
			transform 0.35s var(--ease),
			border-color 0.3s ease,
			background-color 0.3s ease,
			box-shadow 0.35s var(--ease);
	}

	.pathway_trigger:hover {
		transform: translateY(-3px);
		background-color: #faf6ef;
		border-color: #d49814;
	}

	.pathway_line li.is-stage-active .pathway_trigger {
		background-color: #faf6ef;
		border-color: #6a1316;
		box-shadow: 0 10px 24px rgba(106, 19, 22, 0.08);
		transform: translateY(-3px);
	}

	.pathway_dot {
		width: 11px;
		height: 11px;
		border-radius: 50%;
		background-color: #ffffff;
		border: 2.5px solid #d49814;
		margin-bottom: 4px;
		transition: transform 0.3s var(--ease), background-color 0.3s ease, border-color 0.3s ease;
	}

	.pathway_line li.is-stage-active .pathway_dot {
		background-color: #6a1316;
		border-color: #6a1316;
		transform: scale(1.2);
		box-shadow: 0 0 0 4px rgba(106, 19, 22, 0.14);
	}

	.pathway_trigger strong {
		font-family: 'Overpass', sans-serif;
		font-size: 0.78rem;
		font-weight: 800;
		letter-spacing: 0.14em;
		color: #b87910;
	}

	.pathway_trigger h4 {
		margin: 0;
		font-family: 'Overpass', sans-serif;
		font-size: clamp(1.12rem, 1.38vw, 1.38rem);
		font-weight: 900;
		color: #6a1316;
	}

	.pathway_trigger span {
		font-family: 'Inter', sans-serif;
		font-size: 0.9rem;
		line-height: 1.55;
		color: #3d332e;
	}

	.pathway_link_hint {
		margin-top: 6px;
		font-family: 'Overpass', sans-serif;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.03em;
		color: #6a1316;
	}

	.scoreboard_grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		border-top: 1.5px solid #420607;
		border-bottom: 1.5px solid #420607;
		background-color: #ffffff;
	}

	.score_col {
		padding: clamp(28px, 3vw, 48px) clamp(20px, 2.5vw, 40px);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 14px;
		transition: background-color 0.35s ease;
	}

	.score_col:hover,
	.score_col.is-focused {
		background-color: #faf6ef;
	}

	.score_col.is-focused {
		box-shadow: inset 0 -3px 0 #6a1316;
	}

	.score_col + .score_col {
		border-inline-start: 1px solid #e5dfd5;
	}

	.score_top {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 12px;
	}

	.score_num {
		display: flex;
		align-items: baseline;
		gap: 10px;
		margin: 0;
		font-family: 'Overpass', sans-serif;
		font-size: clamp(4rem, 6.8vw, 7.2rem);
		font-weight: 900;
		line-height: 0.86;
		letter-spacing: -0.05em;
		font-variant-numeric: tabular-nums;
		color: #6a1316;
	}

	.score_num small {
		font-family: 'Overpass', sans-serif;
		font-size: clamp(0.9rem, 1.1vw, 1.18rem);
		font-weight: 800;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #b87910;
	}

	.score_tag {
		padding: 5px 10px;
		border-radius: 6px;
		background-color: #ffffff;
		border: 1px solid #d49814;
		color: #6a1316;
		font-family: 'Overpass', sans-serif;
		font-size: 0.72rem;
		font-weight: 800;
		letter-spacing: 0.08em;
		white-space: nowrap;
	}

	.score_label {
		margin: 4px 0 0 0;
		font-family: 'Overpass', sans-serif;
		font-size: clamp(1.02rem, 1.22vw, 1.25rem);
		font-weight: 900;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: #1a1515;
	}

	.score_sub {
		margin: 0;
		font-family: 'Inter', sans-serif;
		font-size: 0.92rem;
		line-height: 1.58;
		color: #3d332e;
	}

	.segment_bar {
		display: flex;
		gap: 8px;
		margin-top: 6px;
	}

	.seg {
		width: var(--w);
		padding: 6px 10px;
		border-radius: 6px;
		font-family: 'Overpass', sans-serif;
		font-size: 0.72rem;
		font-weight: 800;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.seg-maroon {
		background-color: #6a1316;
		color: #ffffff;
	}

	.seg-gold {
		background-color: #d49814;
		color: #ffffff;
	}

	.mini_ruler {
		padding: 18px 0 22px 0;
	}

	.mini_ruler_track {
		position: relative;
		height: 5px;
		background-color: #e8e0d2;
		border-radius: 999px;
	}

	.mini_progress_fill {
		position: absolute;
		inset: 0 auto 0 0;
		width: 0%;
		border-radius: 999px;
		background: linear-gradient(90deg, #6a1316, #d49814);
		transition: width 1.4s var(--ease) 0.2s;
	}

	.scoreboard_grid:global(.is-revealed) .mini_progress_fill {
		width: var(--target, 77.78%);
	}

	.mini_tick {
		position: absolute;
		top: -4px;
		left: calc(var(--pos) * 100%);
		width: 1.5px;
		height: 13px;
		background-color: rgba(26, 21, 21, 0.22);
		translate: -50% 0;
	}

	.mini_tick.done {
		background-color: #6a1316;
	}

	.mini_tick em {
		position: absolute;
		top: 18px;
		left: 50%;
		font-style: normal;
		font-family: 'Overpass', sans-serif;
		font-size: 0.72rem;
		font-weight: 700;
		color: #5c4f47;
		translate: -50% 0;
	}

	.mini_pin {
		position: absolute;
		top: 50%;
		left: 0%;
		width: 13px;
		height: 13px;
		border-radius: 50%;
		background-color: #6a1316;
		box-shadow: 0 0 0 4px rgba(212, 152, 20, 0.3);
		translate: -50% -50%;
		transition: left 1.4s var(--ease) 0.2s;
	}

	.scoreboard_grid:global(.is-revealed) .mini_pin {
		left: var(--target, 77.78%);
	}

	.mini_pin b {
		position: absolute;
		bottom: calc(100% + 8px);
		left: 50%;
		font-family: 'Overpass', sans-serif;
		font-size: 0.68rem;
		font-weight: 900;
		letter-spacing: 0.06em;
		color: #6a1316;
		white-space: nowrap;
		translate: -50% 0;
	}

	.node_badges {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: 6px;
	}

	.node_badges span {
		padding: 5px 10px;
		border-radius: 999px;
		border: 1px solid #d49814;
		background-color: #ffffff;
		color: #6a1316;
		font-family: 'Overpass', sans-serif;
		font-size: 0.72rem;
		font-weight: 800;
		letter-spacing: 0.04em;
	}

	/* --- RESPONSIBLE AI TRAINING AUTO-SCROLL CAROUSEL --- */
	.ai-training-section {
		width: 100%;
		background-color: #faf6ef;
		padding: 76px 10%;
		border-top: 1px solid #e5dfd5;
		border-bottom: 1px solid #e5dfd5;
		overflow: hidden;
	}

	.ai-marquee-viewport {
		width: 100%;
		overflow: hidden;
		padding: 12px 0;
		-webkit-mask-image: linear-gradient(
			90deg,
			transparent 0%,
			#000 5%,
			#000 95%,
			transparent 100%
		);
		mask-image: linear-gradient(
			90deg,
			transparent 0%,
			#000 5%,
			#000 95%,
			transparent 100%
		);
	}

	.ai-marquee-track {
		display: flex;
		width: max-content;
		will-change: transform;
		animation: aiStripScroll 42s linear infinite;
	}

	.ai-marquee-track.is-paused {
		animation-play-state: paused;
	}

	.ai-marquee-group {
		display: flex;
		align-items: center;
		gap: 24px;
		padding-right: 24px;
	}

	.ai-strip-item {
		flex: 0 0 clamp(290px, 28vw, 420px);
		animation: aiItemFloat 6s ease-in-out infinite;
		animation-delay: calc(var(--i) * -0.65s);
	}

	.ai-strip-item img {
		display: block;
		width: 100%;
		aspect-ratio: 16 / 10;
		object-fit: cover;
		object-position: center 20%;
		border-radius: 10px;
		border-bottom: 3px solid #d49814;
		box-shadow: 0 10px 22px rgba(106, 19, 22, 0.1);
		transition: transform 0.5s var(--ease);
	}

	.ai-strip-item:hover img {
		transform: scale(1.03);
	}

	@keyframes aiStripScroll {
		0% {
			transform: translate3d(0, 0, 0);
		}
		100% {
			transform: translate3d(-50%, 0, 0);
		}
	}

	@keyframes aiItemFloat {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-6px);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.ai-marquee-track,
		.ai-strip-item {
			animation: none !important;
			transform: none !important;
		}
		.ai-marquee-viewport {
			overflow-x: auto;
			-webkit-mask-image: none;
			mask-image: none;
		}
	}

	/* --- MATURITY FRAMEWORK --- */
	.maturity-framework {
		background: linear-gradient(135deg, #fcedeb 0%, #f4e8cf 100%);
		padding: 60px 10%;
		color: #1a1515;
	}

	.framework-header :global(.t_eyebrow) {
		display: inline-block;
		margin: 0 0 16px 0;
	}

	.framework-divider {
		border: none;
		height: 1px;
		background-color: rgba(0, 0, 0, 0.3);
		margin: 0 0 24px 0;
	}

	.framework-description {
		font-family: 'Inter', sans-serif;
		font-size: 1.05rem;
		line-height: 1.6;
		max-width: 900px;
		margin-bottom: 40px;
	}

	.framework-cards-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 24px;
	}

	.pillar-card {
		position: relative;
		border-radius: 16px;
		padding: 24px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		min-height: 360px;
		color: #ffffff;
		background-color: #6a1316;
		background-image: var(--bg-image);
		background-size: cover;
		background-position: center;
		overflow: hidden;
		transition: transform 0.35s var(--ease), box-shadow 0.35s var(--ease);
	}

	.pillar-card:hover {
		transform: translateY(-6px);
		box-shadow: 0 16px 32px rgba(106, 19, 22, 0.24);
	}

	.pillar-card::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to bottom,
			rgba(106, 19, 22, 0.4) 0%,
			rgba(32, 12, 13, 0.95) 100%
		);
		z-index: 1;
	}

	.card-number {
		font-family: 'Overpass', sans-serif;
		font-size: 1.1rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		align-self: flex-end;
		position: relative;
		z-index: 2;
		color: #fac549;
	}

	.card-content {
		position: relative;
		z-index: 2;
	}

	.card-content h4 {
		font-family: 'Overpass', sans-serif;
		color: #ef9b08;
		font-size: 1.15rem;
		font-weight: 800;
		margin: 0 0 12px 0;
		line-height: 1.4;
	}

	.card-content p {
		font-family: 'Inter', sans-serif;
		font-size: 0.94rem;
		line-height: 1.6;
		margin: 0 0 16px 0;
		color: #f0f0f0;
	}

	.maturity-meter {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.meter-label {
		font-family: 'Overpass', sans-serif;
		font-size: 0.72rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: #f8d477;
	}

	.fill-1 {
		width: 74%;
	}
	.fill-2 {
		width: 86%;
	}
	.fill-3 {
		width: 96%;
	}

	.verification-bar {
		background-color: #312b27;
		padding: 24px 10%;
		display: flex;
		align-items: center;
		gap: 60px;
	}

	.verification-item {
		display: flex;
		align-items: center;
		gap: 12px;
		color: #ffffff;
		font-family: 'Inter', sans-serif;
		font-weight: 700;
		font-size: 0.95rem;
		letter-spacing: 0.05em;
	}

	.badge-icon {
		width: 24px;
		height: 24px;
		color: #fac549;
	}

	/* --- COMPACT, ANIMATED & ALTERNATING CHRONICLES --- */
	.editorial-chronicles {
		width: 100%;
		background-color: #ffffff;
		padding: 84px 10%;
	}

	.editorial-section-head {
		margin-bottom: 12px;
	}

	.chronicle_list {
		display: flex;
		flex-direction: column;
		border-top: 1.5px solid #420607;
	}

	.chronicle_card {
		display: grid;
		grid-template-columns: minmax(280px, 430px) minmax(0, 1fr);
		align-items: center;
		gap: clamp(24px, 4vw, 56px);
		padding: clamp(28px, 3.2vw, 48px) clamp(12px, 1.5vw, 24px);
		border-bottom: 1px solid var(--rule);
		transition: background-color 0.35s ease, transform 0.4s var(--ease);
	}

	.chronicle_card:hover {
		background-color: #faf6ef;
	}

	.chronicle_card.is-reversed .chronicle_media_col {
		order: 2;
	}

	.chronicle_card.is-reversed .chronicle_copy_col {
		order: 1;
	}

	.chronicle_media_col {
		display: flex;
		flex-direction: column;
		gap: 10px;
		max-width: 440px;
		width: 100%;
		justify-self: center;
	}

	.chronicle_frame {
		position: relative;
		width: 100%;
		aspect-ratio: 4 / 3;
		border-radius: 14px;
		overflow: hidden;
		background: #231717;
		border: 2px solid rgba(184, 121, 16, 0.35);
		box-shadow: 0 12px 26px rgba(32, 12, 13, 0.12);
	}

	.chronicle_frame img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center 20%;
		transition: transform 0.7s var(--ease);
	}

	.chronicle_card:hover .chronicle_frame img {
		transform: scale(1.05);
	}

	.chronicle_caption {
		margin: 0;
		font-family: 'Inter', sans-serif;
		font-size: 0.78rem;
		font-style: italic;
		line-height: 1.45;
		color: #6c6057;
	}

	.chronicle_copy_col {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.chronicle_meta_row {
		display: flex;
		align-items: baseline;
		gap: 14px;
	}

	.chronicle_num {
		font-family: 'Overpass', sans-serif;
		font-size: clamp(2rem, 3vw, 3rem);
		font-weight: 900;
		line-height: 0.9;
		letter-spacing: -0.04em;
		color: transparent;
		-webkit-text-stroke: 2px #d49814;
		transition:
			color 0.35s ease,
			-webkit-text-stroke-color 0.35s ease,
			transform 0.35s var(--ease);
	}

	.chronicle_card:hover .chronicle_num {
		color: #941518;
		-webkit-text-stroke-color: #941518;
		transform: translateX(4px);
	}

	.chronicle_era {
		font-family: 'Overpass', sans-serif;
		font-size: 0.8rem;
		font-weight: 800;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: #b87910;
	}

	.chronicle_title {
		margin: 2px 0 0 0;
		font-family: 'Overpass', sans-serif;
		font-size: clamp(1.35rem, 2vw, 1.9rem);
		font-weight: 900;
		line-height: 1.18;
		color: #6a1316;
	}

	.chronicle_partner {
		margin: 0;
		font-family: 'Inter', sans-serif;
		font-size: 0.9rem;
		font-style: italic;
		font-weight: 600;
		color: #5a493a;
	}

	.chronicle_summary {
		margin: 6px 0 0 0;
		max-width: 62ch;
		font-family: 'Inter', sans-serif;
		font-size: 0.98rem;
		line-height: 1.68;
		color: #241e1e;
	}

	/* --- TECHNICAL PROFILES SECTION --- */
	.technical-profiles {
		padding: 80px 10%;
		background-color: #ffffff;
		width: 100%;
		margin-bottom: 40px;
	}
	.section-header {
		display: flex;
		align-items: center;
		gap: 16px;
		margin-bottom: 24px;
	}
	.icon-box {
		color: #941518;
		display: flex;
		align-items: center;
		justify-content: center;
	}
.section-header :global(.t_eyebrow) {
		display: inline-block;
		line-height: 1.25;
	}
	.header-divider {
		border: none;
		height: 1px;
		background-color: #d1d1d1;
		margin-bottom: 40px;
	}
	.tab-container {
		display: flex;
		flex-direction: column;
	}
	.tabs {
		display: flex;
		gap: 4px;
		padding-left: 0;
		position: relative;
		z-index: 10;
	}
	.tab-btn {
		font-family: 'Overpass', sans-serif;
		font-size: 0.95rem;
		font-weight: 500;
		letter-spacing: 0.05em;
		color: #ffffff;
		background-color: #b87910;
		border: none;
		border-top: 3px solid transparent;
		padding: 16px 24px;
		border-radius: 8px 8px 0 0;
		cursor: pointer;
		transition: all 0.2s ease;
	}
	.tab-btn:hover {
		background-color: #9c660c;
	}
	.tab-btn.active {
		background-color: #6a1316;
		font-weight: 800;
		border-top: 3px solid #ef9b08;
		position: relative;
		z-index: 2;
	}
	.profile-card {
		background: linear-gradient(135deg, #6a1316 0%, #201a1a 100%);
		border-radius: 0 12px 12px 12px;
		padding: 48px;
		color: #ffffff;
		position: relative;
		z-index: 1;
		margin-top: -1px;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
	}
	.card-header-split {
		display: grid;
		grid-template-columns: 1.15fr 0.85fr;
		gap: 48px;
		margin-bottom: 36px;
	}
	.header-left {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
	.header-right {
		display: flex;
		align-items: flex-end;
		justify-content: flex-start;
	}
	.badge {
		font-family: 'Overpass', sans-serif;
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		color: #ef9b08;
		border: 1px solid #ef9b08;
		padding: 6px 12px;
		border-radius: 4px;
		margin-bottom: 20px;
	}
	.profile-title {
		font-family: 'Overpass', sans-serif;
		font-size: 1.35rem;
		font-weight: 800;
		line-height: 1.4;
		letter-spacing: 0.05em;
		margin: 0 0 12px 0;
	}
	.partner-text {
		font-family: 'Inter', sans-serif;
		font-size: 0.95rem;
		font-style: italic;
		color: #d1d1d1;
		margin: 0;
	}
	.archives-title {
		font-family: 'Overpass', sans-serif;
		font-size: 1rem;
		font-weight: 700;
		letter-spacing: 0.15em;
		margin: 0;
		color: #e5e5e5;
	}

	.card-content-split {
		display: grid;
		grid-template-columns: 1.15fr 0.85fr;
		gap: 48px;
		align-items: start;
	}
	.content-left {
		display: flex;
		flex-direction: column;
	}
	.content-right {
		position: relative;
		width: 100%;
	}
	.info-box {
		background-color: #ffffff;
		color: #1a1515;
		padding: 24px 32px;
		border-left: 8px solid #d49814;
		margin-bottom: 24px;
		border-radius: 0 8px 8px 0;
		width: 100%;
	}
	.info-box:last-child {
		margin-bottom: 0;
	}
	.info-box h4 {
		font-family: 'Overpass', sans-serif;
		color: #d49814;
		font-size: 1.1rem;
		font-weight: 800;
		letter-spacing: 0.1em;
		margin: 0 0 14px 0;
	}
	.info-box p {
		font-family: 'Inter', sans-serif;
		font-size: 0.95rem;
		line-height: 1.65;
		margin: 0;
	}

	.partner-emblem-box {
		background: #ffffff;
		border-radius: 10px;
		padding: 16px 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 10px;
		box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18);
	}

	.emblem-label {
		font-family: 'Overpass', sans-serif;
		font-size: 0.72rem;
		font-weight: 800;
		letter-spacing: 0.12em;
		color: #6a1316;
	}

	.partner-emblem-box img {
		max-width: 100%;
		max-height: 82px;
		width: auto;
		object-fit: contain;
	}

	.horizontal-photo-stack {
		display: flex;
		flex-direction: column;
		gap: 20px;
		width: 100%;
	}

	.horizontal-photo-card {
		margin: 0;
		background: #2b1a1b;
		border: 1px solid rgba(250, 197, 73, 0.25);
		border-radius: 10px;
		overflow: hidden;
	}

	.horizontal-photo-card img {
		display: block;
		width: 100%;
		aspect-ratio: 16 / 9;
		object-fit: cover;
		object-position: center 20%;
		opacity: 0.95;
		transition: transform 0.35s ease, opacity 0.3s ease;
	}

	.horizontal-photo-card:hover img {
		opacity: 1;
		transform: scale(1.02);
	}

	/* --- INITIATIVES REGISTER TABLE --- */
	.initiatives-ledger {
		margin-top: 56px;
		background: #faf6ef;
		border: 1px solid #e4d6bb;
		border-radius: 16px;
		padding: 32px;
	}

	.ledger-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 20px;
		flex-wrap: wrap;
		margin-bottom: 24px;
	}

	.ledger-kicker {
		font-family: 'Overpass', sans-serif;
		font-size: 0.78rem;
		font-weight: 800;
		letter-spacing: 0.14em;
		color: #941518;
	}

	.ledger-heading {
		font-family: 'Overpass', sans-serif;
		font-size: 1.35rem;
		font-weight: 800;
		color: #1a1515;
		margin: 4px 0 8px 0;
	}

	.ledger-desc {
		font-family: 'Inter', sans-serif;
		font-size: 0.92rem;
		color: #4f443d;
		margin: 0;
		max-width: 720px;
	}

	.filter-pills {
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}

	.filter-pill {
		font-family: 'Overpass', sans-serif;
		font-size: 0.85rem;
		font-weight: 700;
		padding: 8px 14px;
		border-radius: 8px;
		border: 1.5px solid #941518;
		background: #ffffff;
		color: #941518;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.filter-pill.active,
	.filter-pill:hover {
		background: #941518;
		color: #fac549;
	}

	.table-scroll {
		width: 100%;
		overflow-x: auto;
		border-radius: 12px;
		background: #ffffff;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
	}

	.initiatives-table {
		width: 100%;
		border-collapse: collapse;
		font-family: 'Inter', sans-serif;
		font-size: 0.88rem;
		text-align: left;
	}

	.initiatives-table thead {
		background: #201a1a;
		color: #fac549;
		font-family: 'Overpass', sans-serif;
		font-size: 0.8rem;
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}

	.initiatives-table th,
	.initiatives-table td {
		padding: 14px 16px;
		border-bottom: 1px solid #ece4d4;
		vertical-align: top;
	}

	.initiatives-table tbody tr:hover {
		background: #fff9ec;
	}

	.row-num {
		font-family: 'Overpass', sans-serif;
		font-weight: 800;
		color: #941518;
	}

	.status-badge {
		display: inline-block;
		padding: 4px 10px;
		border-radius: 999px;
		font-family: 'Overpass', sans-serif;
		font-size: 0.76rem;
		font-weight: 800;
		letter-spacing: 0.05em;
		white-space: nowrap;
	}

	.status-badge.completed {
		background: #e6f4ea;
		color: #137333;
	}

	.status-badge.ongoing {
		background: #fef3c7;
		color: #92400e;
	}

	.doc-anchor {
		color: #941518;
		font-weight: 700;
		text-decoration: underline;
		white-space: nowrap;
	}

	.doc-anchor:hover {
		color: #b87910;
	}

	.doc-archive-tag {
		color: #6e645e;
		font-style: italic;
		font-size: 0.82rem;
	}

	/* --- PUP IVOTE++ SHOWCASE SECTION --- */
	.ivote-showcase {
		display: grid;
		grid-template-columns: 1.2fr 1fr;
		width: 100%;
		min-height: 80vh;
	}
	.ivote-left {
		background: linear-gradient(to right, #451516 0%, #1a1614 64%, #392e1f 100%);
		padding: 80px 10%;
		color: #ffffff;
	}
	.ivote-header {
		display: flex;
		align-items: center;
		gap: 16px;
		margin-bottom: 24px;
	}
	.ivote-icon {
		color: #fac549;
	}
	.ivote-header :global(.t_eyebrow) {
		display: inline-block;
	}
	.ivote-sub {
		font-family: 'Inter', sans-serif;
		font-size: 1.35rem;
		font-weight: 400;
		line-height: 1.4;
		margin: 0 0 48px 0;
	}
	.ivote-divider h4 {
		font-family: 'Overpass', sans-serif;
		font-size: 1.1rem;
		font-weight: 800;
		margin: 0 0 16px 0;
		color: #ffffff;
	}
	.ivote-divider hr {
		border: none;
		height: 1px;
		background-color: #5e5e5e;
		margin-bottom: 24px;
	}
	.ivote-desc {
		font-family: 'Inter', sans-serif;
		font-size: 0.95rem;
		line-height: 1.6;
		color: #d1d1d1;
		margin-bottom: 40px;
	}
	.ivote-cards-container {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 16px;
	}

	.ivote-card {
		position: relative;
		background: linear-gradient(to bottom, #fac549 0%, #ca8106 100%);
		border-radius: 12px;
		display: flex;
		flex-direction: column;
		min-height: 280px;
		overflow: hidden;
		transition: transform 0.3s var(--ease);
	}
	.ivote-card:hover {
		transform: translateY(-5px);
	}
	.iv-card-bg {
		position: absolute;
		inset: 0;
		background-size: cover;
		background-position: center;
		opacity: 0.3;
		z-index: 0;
	}
	.iv-card-bg::after {
		content: '';
		position: absolute;
		inset: 0;
		background-color: rgba(255, 255, 255, 0.2);
	}
	.iv-card-content {
		position: relative;
		z-index: 1;
		padding: 32px 24px;
		display: flex;
		flex-direction: column;
		height: 100%;
	}
	.iv-card-content h5 {
		font-family: 'Overpass', sans-serif;
		font-size: 1.35rem;
		font-weight: 800;
		color: #941518;
		margin: 0 0 8px 0;
		line-height: 1.2;
		letter-spacing: 0.05em;
	}
	.iv-card-content span {
		display: block;
		font-family: 'Inter', sans-serif;
		font-size: 1rem;
		font-style: italic;
		color: #4a3821;
		margin-bottom: 24px;
	}
	.iv-card-content p {
		font-family: 'Inter', sans-serif;
		font-size: 0.95rem;
		line-height: 1.5;
		color: #000000;
		margin: auto 0 0 0;
	}

	.ivote-right {
		position: relative;
		width: 100%;
		min-height: 500px;
		overflow: hidden;
		background-color: #3b0e10;
	}
	.archive-fade-container {
		position: relative;
		width: 100%;
		height: 100%;
	}
	.fade-slide {
		position: absolute;
		inset: 0;
		background-size: cover;
		background-position: center;
		opacity: 0;
		transition: opacity 1.2s ease-in-out, transform 6s ease-out;
		z-index: 1;
	}
	.fade-slide.active {
		opacity: 1;
		transform: scale(1.03);
		z-index: 2;
	}
	.fade-scrim {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to top,
			rgba(35, 8, 9, 0.94) 0%,
			rgba(148, 21, 24, 0.22) 50%,
			rgba(20, 10, 10, 0.55) 100%
		);
		z-index: 3;
		pointer-events: none;
	}
	.gallery-link {
		position: absolute;
		top: 36px;
		right: 40px;
		z-index: 10;
		font-family: 'Overpass', sans-serif;
		color: #ffffff;
		background: none;
		border: none;
		padding: 0;
		cursor: pointer;
		font-size: 0.9rem;
		font-weight: 700;
		letter-spacing: 0.1em;
		text-decoration: underline;
		transition: color 0.2s ease;
	}
	.gallery-link:hover {
		color: #fac549;
	}
	.fade-archive-text {
		position: absolute;
		bottom: 50px;
		left: 40px;
		right: 40px;
		z-index: 10;
	}
	.archive-title-large {
		font-family: 'Overpass', sans-serif;
		font-size: 2.2rem;
		font-weight: 900;
		color: #fac549;
		letter-spacing: 0.08em;
		margin: 0 0 6px 0;
	}
	.archive-subtitle {
		font-family: 'Overpass', sans-serif;
		font-size: 0.95rem;
		font-weight: 700;
		color: #ffffff;
		letter-spacing: 0.08em;
		margin: 0;
	}

	/* --- MULA SA'YO TEXT SECTION --- */
	.motto-text-section {
		width: 100%;
		background-color: #ffffff;
		padding-top: 120px;
		padding-bottom: 120px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.motto-content {
		text-align: center;
		width: 100%;
		max-width: 1400px;
		padding: 0 5%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.motto-title {
		position: relative;
		font-family: 'Overpass', Arial, sans-serif;
		font-size: clamp(3rem, 11vw, 9rem);
		font-weight: 800;
		line-height: 1.1;
		letter-spacing: -0.02em;
		margin: 0 0 24px 0;
		display: inline-block;
		background:
			linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)),
			linear-gradient(to bottom, #fac549 0%, #ca8106 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		color: transparent;
		filter: drop-shadow(0px 8px 12px rgba(0, 0, 0, 0.15));
	}

	.motto-title::before {
		content: attr(data-text);
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		white-space: pre-line;
		background-image: var(--motto-bg);
		background-size: cover;
		background-position: center;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		opacity: 0.3;
		pointer-events: none;
		z-index: 1;
	}
	.keep-together {
		display: inline-block;
		white-space: nowrap;
	}

	.motto-subtitle {
		font-family: 'Inter', sans-serif;
		font-size: 1.25rem;
		font-style: italic;
		color: #1a1515;
		line-height: 1.5;
		margin: 0;
		max-width: 600px;
	}

	.text-yellow {
		color: #c98e16;
		font-weight: 600;
	}

	/* --- MODAL GALLERY STYLES --- */
	.gallery-modal-overlay {
		width: 100%;
		height: 100%;
		max-width: none;
		max-height: none;
		margin: 0;
		border: none;
		box-sizing: border-box;
		color: inherit;
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.85);
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 40px;
		animation: fadeIn 0.2s ease-out;
	}
	.gallery-modal-overlay::backdrop {
		background: transparent;
	}
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
	.gallery-modal-content {
		background: radial-gradient(circle at center, #fcedeb 0%, #f4e8cf 100%);
		padding: 40px;
		border-radius: 16px;
		max-width: 1200px;
		width: 100%;
		max-height: 90vh;
		overflow-y: auto;
		position: relative;
		box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
	}
	.close-modal {
		position: absolute;
		top: 24px;
		right: 24px;
		background: transparent;
		border: none;
		cursor: pointer;
		color: #6a1316;
		transition: transform 0.2s ease;
	}
	.close-modal:hover {
		transform: scale(1.1);
	}
	.gallery-header {
		display: flex;
		align-items: center;
		gap: 16px;
		margin-bottom: 32px;
	}
	.gallery-header :global(.t_eyebrow) {
		display: inline-block;
	}
	.gallery-grid-container {
		background-color: #2a1f1b;
		border-radius: 16px;
		padding: 24px;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 16px;
	}
	.gallery-img-box {
		margin: 0;
		width: 100%;
		background-color: #1a1515;
		padding: 8px;
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	.gallery-img-box img {
		width: 100%;
		aspect-ratio: 4/3;
		object-fit: cover;
		border-radius: 4px;
	}
	.gallery-img-box figcaption {
		font-family: 'Inter', sans-serif;
		font-size: 0.76rem;
		line-height: 1.35;
		color: #e8dfd5;
	}

	/* --- RESPONSIVE ADJUSTMENTS --- */
	@media (max-width: 1024px) {
		.agenda-content-grid,
		.pathway_line,
		.scoreboard_grid,
		.framework-cards-grid,
		.chronicle_card,
		.card-header-split,
		.card-content-split {
			grid-template-columns: 1fr;
			gap: 20px;
		}
		.profile-card {
			padding: 24px;
		}
		.header-right {
			justify-content: flex-start;
		}
		.tabs {
			flex-wrap: wrap;
		}
		.scoreboard_grid {
			border-block: 0;
		}
		.score_col,
		.score_col:first-child {
			padding-inline: 0;
			border-block-start: 1px solid var(--rule);
		}
		.score_col + .score_col {
			border-inline-start: 0;
		}
		.chronicle_card.is-reversed .chronicle_media_col,
		.chronicle_card.is-reversed .chronicle_copy_col {
			order: unset;
		}
		.chronicle_media_col {
			max-width: 100%;
		}
		.verification-bar {
			flex-direction: column;
			align-items: flex-start;
			gap: 20px;
		}
		.ivote-showcase {
			grid-template-columns: 1fr;
		}
		.ivote-right {
			min-height: 400px;
		}
		.ivote-cards-container {
			grid-template-columns: 1fr;
		}
		.gallery-grid-container {
			grid-template-columns: repeat(2, 1fr);
		}
		.gallery-modal-overlay {
			padding: 16px;
		}
		.gallery-modal-content {
			padding: 24px;
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		.hero-bg {
			animation: hero-backdrop-in 1.2s ease-out;
		}
		.hero-title {
			animation: hero-title-in 1s cubic-bezier(0.16, 1, 0.3, 1);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.animate-panel,
		.ledger-row,
		.chronicle_frame img,
		.meter-fill,
		.fade-slide {
			animation: none !important;
			transition: none !important;
		}
		.scoreboard_grid .mini_progress_fill {
			width: var(--target, 77.78%) !important;
		}
		.scoreboard_grid .mini_pin {
			left: var(--target, 77.78%) !important;
		}
	}
</style>
