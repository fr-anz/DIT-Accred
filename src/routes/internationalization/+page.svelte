<script>
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

	let activeTab = $state(0);
	let currentImageIndex = $state(0);
	let showGallery = $state(false);
	let statusFilter = $state('ALL');

	/**
	 * Scroll-fade action matching the reference motion pattern:
	 * marks elements pending, then fades & settles them when intersecting.
	 * @param {HTMLElement} node
	 * @param {{ threshold?: number }} [options]
	 */
	function reveal(node, options = {}) {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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
				threshold: options.threshold ?? 0.14,
				rootMargin: '0px 0px -40px 0px'
			}
		);

		observer.observe(node);

		return {
			destroy() {
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
			image: ivote2,
			caption: 'CCIS Extension Project in cooperation with DTI Negosyo Center Mandaluyong & CUMC'
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
					caption: 'Facilitator & participant briefing during the digital literacy extension session'
				},
				{
					src: ivote3,
					caption: 'Hands-on computer lab guidance and digital ethics walkthrough'
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
					caption: 'One-on-one technical guidance during enterprise digital readiness training'
				},
				{
					src: ivote6,
					caption: 'Collaborative orientation and systems walkthrough with cooperative members'
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
					caption: 'System walk-through and hands-on workflow testing for end users'
				},
				{
					src: ivote8,
					caption: 'Field coordination and deployment support team documentation'
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
		const interval = setInterval(() => {
			currentImageIndex = (currentImageIndex + 1) % archiveSlides.length;
		}, 4000);
		return () => clearInterval(interval);
	});
</script>

<main class="community_page">
	<!-- ─────────────────────────────────────────────
  HERO SECTION (ORIGINAL — UNCHANGED)
───────────────────────────────────────────── -->
	<section class="community-hero">
		<div class="hero-bg"></div>
		<h1 class="t_display hero-title">COMMUNITY</h1>
	</section>

	<!-- ─────────────────────────────────────────────
  STRATEGIC AGENDA & OPEN SCOREBOARD BELOW
───────────────────────────────────────────── -->
	<section id="community-extension-agenda" class="strategic-agenda">
		<header class="agenda-header">
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

		<!-- OPEN EDITORIAL SCOREBOARD BELOW THE TWO COLUMNS -->
		<div class="editorial-scoreboard-band" use:reveal>
			<div class="scoreboard_grid">
				<div class="score_col" style:--d="0">
					<p class="score_num">9<small>initiatives</small></p>
					<h3 class="score_label">Documented Extension Portfolio</h3>
					<p class="score_sub">2018–2028 span across LGUs, cooperatives, and schools</p>
				</div>

				<div class="score_col" style:--d="1">
					<p class="score_num">7<small>of 9 done</small></p>
					<h3 class="score_label">Implementation Progress</h3>
					<div class="progress_rule" aria-hidden="true">
						<div class="progress_fill" style="width: 77.78%;"></div>
					</div>
					<p class="score_sub">7 completed · 2 active (2026–2028)</p>
				</div>

				<div class="score_col" style:--d="2">
					<p class="score_num">5<small>elections</small></p>
					<h3 class="score_label">iVOTE++ Digital Governance</h3>
					<p class="score_sub">PHC • Novotel (NuSEPHC &amp; PACSSM) • PUP MPC &amp; Provident</p>
				</div>
			</div>

			<ol class="moa_strip" aria-label="Institutional partnership milestones">
				<li style:--d="0">
					<strong>CUMC MOA</strong>
					<span>Formal partnership with Cooperative Union of Mandaluyong City</span>
				</li>
				<li style:--d="1">
					<strong>Mandaluyong · DTI · MIPO</strong>
					<span>Digital literacy, e-commerce &amp; Responsible AI onboarding</span>
				</li>
				<li style:--d="2">
					<strong>MEAL Rollout</strong>
					<span>Multi-year examination system deployment (2026–2028)</span>
				</li>
			</ol>
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

		<div class="verification-bar">
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

	<!-- ─────────────────────────────────────────────
  EDITORIAL ALTERNATING + SCROLL FADE:
  CHRONICLES OF EXTENSION & FIELD DEPLOYMENT
───────────────────────────────────────────── -->
	<section id="community-story" class="editorial-chronicles">
		<div class="editorial-section-head" use:reveal>
			<div class="section-header">
				<div class="icon-box">
					<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
				</div>
				<h2 class="t_eyebrow">CHRONICLES OF EXTENSION &amp; FIELD DEPLOYMENT</h2>
			</div>
			<hr class="header-divider" />
		</div>

		<div class="editorial-stream">
			{#each communityChapters as chap, i}
				<article
					class="editorial-row {i % 2 === 1 ? 'is-reversed' : ''}"
					use:reveal={{ threshold: 0.16 }}
				>
					<div class="editorial-photo-bleed">
						<img src={chap.image} alt={chap.caption} />
					</div>

					<div class="editorial-copy-pane">
						<span class="editorial-index">{chap.number} — {chap.era}</span>
						<h3 class="editorial-heading">{chap.title}</h3>
						<p class="editorial-partner">{chap.partner}</p>
						<p class="editorial-body">{chap.summary}</p>
						<p class="editorial-note">{chap.caption}</p>
					</div>
				</article>
			{/each}
		</div>
	</section>

	<!-- ─────────────────────────────────────────────
  TECHNICAL PROFILES SECTION & INITIATIVES REGISTER
───────────────────────────────────────────── -->
	<section id="technical-profiles" class="technical-profiles">
		<header class="section-header" use:reveal>
			<div class="icon-box">
				<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /><path d="M9 10h6" /><path d="M9 14h6" /></svg>
			</div>
			<h2 class="t_eyebrow">TECHNICAL PROFILES</h2>
		</header>

		<hr class="header-divider" />

		<div class="tab-container">
			<div class="tabs" role="tablist" aria-label="Technical Profiles">
				{#each profiles as profile, index}
					<button
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
								{#each profiles[activeTab].photos as photo}
									<figure class="horizontal-photo-card">
										<img src={photo.src} alt={photo.caption} />
										<figcaption>{photo.caption}</figcaption>
									</figure>
								{/each}
							</div>
						</div>
					</div>
				</div>
			{/key}

			<!-- COMPLETED & ONGOING INITIATIVES TABLE -->
			<div class="initiatives-ledger" use:reveal>
				<div class="ledger-header">
					<div>
						<span class="ledger-kicker">VERIFIABLE EVIDENCE MATRIX</span>
						<h3 class="ledger-heading">COMPLETED AND ONGOING INITIATIVES IN COMMUNITY DEVELOPMENT</h3>
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
												rel="noopener noreferrer"
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
					class="narrative-btn"
					target="_blank"
					rel="noopener noreferrer"
				>
					View Full Narrative Report
				</a>
			</div>
		</div>
	</section>

	<!-- ─────────────────────────────────────────────
  PUP IVOTE++ SHOWCASE SECTION
───────────────────────────────────────────── -->
	<section id="ivote-showcase" class="ivote-showcase">
		<div class="ivote-left">
			<div class="ivote-header">
				<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="ivote-icon"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /><path d="M9 10h6" /><path d="M9 14h6" /></svg>
				<h2 class="t_eyebrow">PUP IVOTE++</h2>
			</div>

			<h3 class="ivote-sub">
				High-Impact Special Deployment<br />Showcase: The PUP iVOTE++ System
			</h3>

			<div class="ivote-divider">
				<h4>SYSTEM OVERVIEW &amp; ARCHITECTURAL PURPOSE</h4>
				<hr />
			</div>

			<p class="ivote-desc">
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

		<div class="ivote-right">
			<div class="archive-fade-container">
				{#each archiveSlides as slide, idx}
					<div
						class="fade-slide {currentImageIndex === idx ? 'active' : ''}"
						style="background-image: url('{slide.src}');"
					></div>
				{/each}
				<div class="fade-scrim"></div>

				<button class="gallery-link" onclick={() => (showGallery = true)}>VIEW FULL GALLERY</button>

				<div class="fade-archive-text">
					<h2 class="archive-title-large">PUP IVOTE++</h2>
					<p class="archive-subtitle">{archiveSlides[currentImageIndex].caption}</p>
				</div>
			</div>
		</div>
	</section>

	<!-- ─────────────────────────────────────────────
  MULA SA'YO TEXT SECTION
───────────────────────────────────────────── -->
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

	<!-- ─────────────────────────────────────────────
  PUP IVOTE++ GALLERY MODAL (ALL 8 PHOTOS)
───────────────────────────────────────────── -->
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
						><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /><path
							d="M9 10h6"
						/><path d="M9 14h6" /></svg
					>
					<h2 id="gallery-title" class="t_eyebrow">PUP IVOTE++ DEPLOYMENT GALLERY</h2>
				</div>

				<div class="gallery-grid-container">
					{#each archiveSlides as slide}
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

	/* Scroll-fade motion matching the reference pattern */
	@media (prefers-reduced-motion: no-preference) {
		.community_page :global(.reveal-pending) {
			opacity: 0;
			translate: 0 28px;
			transition:
				opacity 0.85s ease,
				translate 1s var(--ease);
			transition-delay: calc(var(--d, 0) * 110ms);
		}

		.community_page :global(.reveal-pending.is-revealed) {
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

	@keyframes barFill {
		from {
			transform: scaleX(0);
		}
		to {
			transform: scaleX(1);
		}
	}

	.animate-panel {
		animation: panelReveal 0.35s cubic-bezier(0.22, 1, 0.36, 1);
	}

	.ledger-row {
		animation: panelReveal 0.25s ease-out both;
	}

	.narrative-action-wrapper {
		display: flex;
		justify-content: center;
		width: 100%;
		margin-top: 2rem;
		margin-bottom: 0;
	}

	.narrative-btn {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		max-width: 700px;
		padding: 18px 32px;
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

	/* --- HERO SECTION (ORIGINAL — UNTOUCHED) --- */
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
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-image: url('/img/pages/Community.jpg');
		background-size: cover;
		background-position: center;
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
		justify-content: space-between;
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

	/* --- OPEN EDITORIAL SCOREBOARD BELOW TWO COLUMNS --- */
	.editorial-scoreboard-band {
		background-color: #faf6ef;
		padding: 48px 10%;
		border-bottom: 1px solid #e6dcc8;
	}

	.scoreboard_grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		border-block: 1.5px solid #420607;
	}

	.score_col {
		padding: clamp(24px, 2.6vw, 44px) clamp(18px, 2.4vw, 44px);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 10px;
	}

	.score_col:first-child {
		padding-inline-start: 0;
	}

	.score_col + .score_col {
		border-inline-start: 1px solid var(--rule);
	}

	.score_num {
		display: flex;
		align-items: baseline;
		gap: 10px;
		margin: 0;
		font-family: 'Overpass', sans-serif;
		font-size: clamp(3.2rem, 5.4vw, 5.6rem);
		font-weight: 900;
		line-height: 0.9;
		letter-spacing: -0.04em;
		font-variant-numeric: tabular-nums;
		color: #941518;
	}

	.score_num small {
		font-family: 'Overpass', sans-serif;
		font-size: clamp(0.95rem, 1.15vw, 1.25rem);
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: #b87910;
	}

	.score_label {
		margin: 4px 0 0 0;
		font-family: 'Overpass', sans-serif;
		font-size: 1.05rem;
		font-weight: 800;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: #1a1515;
	}

	.score_sub {
		margin: 0;
		font-family: 'Inter', sans-serif;
		font-size: 0.92rem;
		line-height: 1.5;
		color: var(--muted);
	}

	.progress_rule {
		width: 100%;
		height: 6px;
		background: rgba(148, 21, 24, 0.14);
		border-radius: 999px;
		overflow: hidden;
		margin-block: 4px;
	}

	.progress_fill {
		height: 100%;
		background: linear-gradient(90deg, #941518, #ef9b08);
		border-radius: 999px;
	}

	.moa_strip {
		list-style: none;
		margin: 28px 0 0 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 24px;
	}

	.moa_strip li {
		display: flex;
		flex-direction: column;
		gap: 4px;
		padding-inline-start: 16px;
		border-inline-start: 3px solid #d49814;
	}

	.moa_strip strong {
		font-family: 'Overpass', sans-serif;
		font-size: 1rem;
		font-weight: 800;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: #6a1316;
	}

	.moa_strip span {
		font-family: 'Inter', sans-serif;
		font-size: 0.9rem;
		line-height: 1.45;
		color: var(--muted);
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
		transition: transform 0.3s ease, box-shadow 0.3s ease;
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

	.meter-track {
		width: 100%;
		height: 6px;
		background: rgba(255, 255, 255, 0.2);
		border-radius: 999px;
		overflow: hidden;
	}

	.meter-fill {
		height: 100%;
		background: linear-gradient(90deg, #fac549, #ef9b08);
		transform-origin: left;
		animation: barFill 1s ease-out both;
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

	/* --- EDITORIAL ALTERNATING CHRONICLES --- */
	.editorial-chronicles {
		width: 100%;
		background-color: #ffffff;
		padding-top: 80px;
	}

	.editorial-section-head {
		padding: 0 10%;
	}

	.editorial-stream {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	.editorial-row {
		display: grid;
		grid-template-columns: 1fr 1fr;
		width: 100%;
		min-height: 540px;
		background-color: #faf6ef;
		border-bottom: 1px solid #e7ddd0;
		overflow: hidden;
	}

	.editorial-row:nth-child(even) {
		background-color: #fffdfa;
	}

	/* Alternate position: row 2, 4 -> text on left, full image on right */
	.editorial-row.is-reversed .editorial-photo-bleed {
		order: 2;
	}

	.editorial-row.is-reversed .editorial-copy-pane {
		order: 1;
	}

	.editorial-photo-bleed {
		width: 100%;
		height: 100%;
		min-height: 460px;
		overflow: hidden;
	}

	.editorial-photo-bleed img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center 20%;
		border-radius: 0;
		transition: scale 1.2s var(--ease);
	}

	.editorial-row:hover .editorial-photo-bleed img {
		scale: 1.04;
	}

	.editorial-copy-pane {
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 56px 8%;
	}

	.editorial-index {
		font-family: 'Overpass', sans-serif;
		font-size: 0.95rem;
		font-weight: 800;
		letter-spacing: 0.16em;
		color: #b87910;
		margin-bottom: 10px;
	}

	.editorial-heading {
		font-family: 'Overpass', sans-serif;
		font-size: clamp(1.5rem, 2.3vw, 2.2rem);
		font-weight: 900;
		line-height: 1.18;
		color: #6a1316;
		margin: 0 0 10px 0;
	}

	.editorial-partner {
		font-family: 'Inter', sans-serif;
		font-size: 0.92rem;
		font-style: italic;
		font-weight: 600;
		color: #5c4b3b;
		margin: 0 0 18px 0;
	}

	.editorial-body {
		font-family: 'Inter', sans-serif;
		font-size: 1rem;
		line-height: 1.7;
		color: #262020;
		margin: 0 0 18px 0;
	}

	.editorial-note {
		font-family: 'Inter', sans-serif;
		font-size: 0.82rem;
		font-style: italic;
		color: #6e6259;
		margin: 0;
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

	.horizontal-photo-card figcaption {
		padding: 10px 14px;
		font-family: 'Inter', sans-serif;
		font-size: 0.82rem;
		color: #ede3d8;
		background: rgba(20, 14, 14, 0.75);
	}

	/* --- INITIATIVES REGISTER TABLE --- */
	.initiatives-ledger {
		margin-top: 48px;
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
		transition: transform 0.25s ease;
	}
	.ivote-card:hover {
		transform: translateY(-4px);
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
		.card-header-split,
		.card-content-split,
		.agenda-content-grid,
		.scoreboard_grid,
		.moa_strip,
		.framework-cards-grid,
		.editorial-row {
			grid-template-columns: 1fr;
			gap: 0;
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
		.moa_strip {
			gap: 18px;
			margin-top: 24px;
		}
		.editorial-row.is-reversed .editorial-photo-bleed,
		.editorial-row.is-reversed .editorial-copy-pane {
			order: unset;
		}
		.editorial-photo-bleed {
			min-height: 280px;
			aspect-ratio: 16 / 10;
		}
		.editorial-copy-pane {
			padding: 36px 7%;
		}
		.agenda-content-grid,
		.framework-cards-grid,
		.card-header-split,
		.card-content-split {
			gap: 32px;
		}
		.header-right {
			justify-content: flex-start;
		}
		.tabs {
			flex-wrap: wrap;
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
		.editorial-photo-bleed img,
		.meter-fill,
		.fade-slide {
			animation: none !important;
			transition: none !important;
		}
	}
</style>