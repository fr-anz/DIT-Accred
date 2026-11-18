<script lang="ts">
	import {
		ArrowUpRight,
		BadgeCheck,
		CalendarDays,
		ClipboardCheck,
		FileSearch,
		FlaskConical,
		Globe,
		GraduationCap,
		Hourglass,
		MapPin,
		Mic,
		Plane,
		Presentation,
		Star,
		TrendingUp,
		Trophy
	} from 'lucide-svelte';
	import { untrack } from 'svelte';
	import Footer from '$lib/components/footer.svelte';
	import NetworkMap from '$lib/components/internationalization/NetworkMap.svelte';
	import { countUp, reveal } from '$lib/actions/motion';
	import {
		facultyConferences,
		facultyResearchers,
		floodTimeline,
		home,
		ifloodsenseTeam,
		partners,
		studentPapers,
		studentTrip,
		wuriTimeline
	} from '$lib/data/internationalization';
	import { narrativeReports } from '$lib/data/reportLinks';
	import '$lib/styles/accreditation-pages.css';

	const report = narrativeReports.find(({ title }) => title === 'International Linkages');
	const umpsa = partners.find(({ id }) => id === 'umpsa');

	const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	/* ── WURI scroll story ──
	   Chapters scroll past a pinned stage; the stage rank counts to the
	   chapter nearest the middle of the viewport. */
	const wuriEntries = wuriTimeline.flatMap(({ year, entries }) =>
		entries.map((entry) => ({ ...entry, year }))
	);

	const rankParts = (rank: string | null) => {
		const match = rank?.match(/^(\d+)(\D*)$/);
		return match ? { value: Number(match[1]), suffix: match[2] } : null;
	};

	let wuriIndex = $state(0);
	const wuriActive = $derived(wuriEntries[wuriIndex]);
	const wuriRank = $derived(rankParts(wuriActive.rank));
	let shownRank = $state(rankParts(wuriEntries[0].rank)?.value ?? 0);

	function rankChapters(node: HTMLElement) {
		let frame = 0;
		const update = () => {
			frame = 0;
			const middle = window.innerHeight / 2;
			let index = 0;
			[...node.children].forEach((chapter, i) => {
				if (chapter.getBoundingClientRect().top <= middle) index = i;
			});
			wuriIndex = index;
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

	$effect(() => {
		const target = wuriRank?.value;
		if (target === undefined) return;
		const from = untrack(() => shownRank);
		if (prefersReducedMotion() || from === target) {
			shownRank = target;
			return;
		}
		const start = performance.now();
		let frame = requestAnimationFrame(function step(now) {
			const t = Math.min(1, (now - start) / 700);
			shownRank = Math.round(from + (target - from) * (1 - Math.pow(1 - t, 3)));
			if (t < 1) frame = requestAnimationFrame(step);
		});
		return () => cancelAnimationFrame(frame);
	});

	function scrollToEntry(id: string) {
		document.getElementById(`wuri-${id}`)?.scrollIntoView({
			behavior: prefersReducedMotion() ? 'instant' : 'smooth',
			block: 'center'
		});
	}

	/* ── Partners ── */
	let selectedPartner = $state(partners[0].id);

	/* ── Flood timeline: the last dated stop is where the solid river ends ── */
	const lastDoneStop = floodTimeline.findLastIndex((stop) => stop.datetime);

	/* ── Faculty ── */
	const tallestYear = Math.max(
		...facultyConferences.map((y) => y.events.length + (y.award ? 1 : 0))
	);
	const conferenceCount = facultyConferences.reduce((sum, y) => sum + y.events.length, 0);

	const facultyRoles = [
		{
			title: 'Technical committee',
			note: 'Shaping the programs of international conferences.',
			Icon: ClipboardCheck
		},
		{
			title: 'Paper reviewer',
			note: 'Reviewing papers submitted to international conferences.',
			Icon: FileSearch
		},
		{ title: 'Session chair', note: 'Chairing a session at ICFET 2026.', Icon: Mic }
	];

	/* ── Photos ── */
	type Photo = { src: string; alt: string; caption: string; width: number; height: number };

	const photos = {
		binusSigning: {
			src: '/internationalization/binus-signing.webp',
			alt: 'Representatives signing the agreement for IICTC 2022',
			caption: 'PUP and BINUS sign the agreement to co-host IICTC 2022',
			width: 450,
			height: 450
		},
		binusAgreement: {
			src: '/internationalization/binus-agreement.webp',
			alt: 'Representatives holding the signed agreement',
			caption: 'The signed PUP and BINUS agreement',
			width: 450,
			height: 448
		},
		meeting: {
			src: '/internationalization/ifloodsense-meeting.webp',
			alt: 'PUP and UMPSA researchers gathered on a video call',
			caption: 'IfloodSense proposal meeting with UMPSA, July 28, 2026',
			width: 448,
			height: 201
		},
		demo: {
			src: '/internationalization/flood-alert-demo.webp',
			alt: 'A flood-alert map demonstrated on a phone during the meeting',
			caption: 'The flood-alert map demonstrated during the meeting',
			width: 257,
			height: 142
		},
		icfet: {
			src: '/internationalization/icfet-2026.webp',
			alt: 'A faculty member presenting research at ICFET 2026',
			caption: 'Research presentation at ICFET 2026',
			width: 912,
			height: 409
		},
		jeju: {
			src: '/internationalization/wcse-2025-jeju.webp',
			alt: 'PUP BSIT student presenters and their CCIS advisers at WCSE 2025',
			caption: 'PUP BSIT presenters and CCIS advisers at WCSE 2025 in Jeju Island',
			width: 723,
			height: 407
		},
		risk: {
			src: '/internationalization/wcse-risk-classifier.webp',
			alt: 'Presenters pictured in front of the slide for Risk Statement Classifier Using BERT and DistilBERT',
			caption: 'Risk Statement Classifier Using BERT and DistilBERT',
			width: 450,
			height: 255
		},
		yolo: {
			src: '/internationalization/wcse-object-detection.webp',
			alt: 'Presenters pictured in front of the slide for the YOLO object detection paper',
			caption: 'Object Detection in Computer Laboratory Setting Utilizing YOLO Model',
			width: 450,
			height: 256
		}
	} satisfies Record<string, Photo>;

	/* Papers with a presentation photo show it as a hover preview. */
	const paperPhotos: Record<string, Photo> = {
		'Risk Statement Classifier Using BERT and DistilBERT': photos.risk,
		'Object Detection in Computer Laboratory Setting Utilizing YOLO Model': photos.yolo
	};
</script>

<svelte:head>
	<title>Internationalization | DIT-PUP</title>
	<meta
		name="description"
		content="Explore PUP BSIT’s international accreditation, university partnerships, and faculty and student research across borders."
	/>
</svelte:head>

{#snippet sectionHeading(id: string, title: string, Icon: typeof Globe)}
	<div class="section_label">
		<Icon size={26} strokeWidth={1.5} class="section_icon" aria-hidden="true" />
		<h2 {id} class="t_eyebrow">{title}</h2>
	</div>
	<hr class="section_divider" />
{/snippet}

{#snippet photoButton(photo: Photo, className = '')}
	<span class="photo_button {className}">
		<img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" />
	</span>
{/snippet}

<main class="assigned_page intl_page">
	<section class="hero-section">
		<div class="hero-bg"></div>
		<h1 class="t_display hero-title">INTERNATIONALIZATION</h1>
	</section>

	<!-- ══ 1. Recognition: photo cover, pathway and a ruled scoreboard ══ -->
	<section id="recognition" class="content_section" aria-labelledby="recognition-title">
		{@render sectionHeading(
			'recognition-title',
			'International Recognition & Quality Assurance',
			BadgeCheck
		)}

		<figure class="cover" use:reveal>
			<div class="seal" aria-hidden="true">
				<svg viewBox="0 0 120 120">
					<defs>
						<path id="seal-ring" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
					</defs>
					<text textLength="268" lengthAdjust="spacing">
						<textPath href="#seal-ring">PICAB-CAC CERTIFIED JULY 2026</textPath>
					</text>
				</svg>
				<span><BadgeCheck size={34} strokeWidth={1.6} /></span>
			</div>
			<img
				src="/teaching-learning/area2/picab-visit.jpg"
				alt="PUP faculty and staff with the computing accreditation team during the PICAB visit"
				width="1400"
				height="596"
				loading="lazy"
			/>
			<figcaption class="cover_copy">
				<h3 class="cover_title">PUP’s first international program accreditation</h3>
				<p>
					In <time datetime="2026-07">July 2026</time>, PICAB-CAC certified BSIT and BSCS.
				</p>
			</figcaption>
		</figure>

		<ol class="pathway" aria-label="From program to international accord" use:reveal>
			<li style:--d="0">
				<strong>BSIT</strong>
				<span>PUP’s Bachelor of Science in Information Technology</span>
			</li>
			<li style:--d="1">
				<strong>PICAB-CAC</strong>
				<span>Certified the program in July 2026</span>
			</li>
			<li style:--d="2">
				<strong>Seoul Accord</strong>
				<span>PICAB is a provisional signatory</span>
			</li>
		</ol>

		<div class="scoreboard">
			<div class="score" use:reveal style:--d="0">
				<p class="score_value">
					<span use:countUp={{ from: 271, to: 250, duration: 1800 }}>250</span><small>of 400</small>
				</p>
				<h3 class="score_title">WURI 2025 global ranking</h3>
				<p class="score_note">
					<TrendingUp size={16} aria-hidden="true" /> Up 21 places from 271st in 2024
				</p>
				<div class="ruler" role="img" aria-label="Ranked 271st in 2024 and 250th in 2025">
					<div class="ruler_track">
						{#each Array.from({ length: 9 }, (_, i) => 280 - i * 5) as tickValue (tickValue)}
							<span
								class="ruler_tick"
								class:major={tickValue % 10 === 0}
								style:--p={(280 - tickValue) / 40}
							>
								{#if tickValue % 10 === 0}<em>{tickValue}</em>{/if}
							</span>
						{/each}
						<span class="ruler_ghost" style:--p={(280 - 271) / 40}><b>2024</b></span>
						<span class="ruler_trail" style:--from={(280 - 271) / 40} style:--to={(280 - 250) / 40}
						></span>
						<span class="ruler_marker" style:--from={(280 - 271) / 40} style:--to={(280 - 250) / 40}
							><b>2025</b></span
						>
					</div>
				</div>
			</div>

			<div class="score qs_score" use:reveal style:--d="1">
				<p class="score_value">3<small>Stars</small></p>
				<h3 class="score_title">QS Stars 2025</h3>
				<p class="score_note">Computer and Information Systems</p>
				<p class="qs_stars" aria-hidden="true">
					{#each [0, 1, 2, 3, 4] as star (star)}
						<span class:lit={star < 3} style:--s={star}><Star size={30} strokeWidth={1.4} /></span>
					{/each}
				</p>
			</div>

			<div class="score" use:reveal style:--d="2">
				<p class="score_value">
					<span use:countUp={{ to: 15 }}>15</span><small>th</small>
				</p>
				<h3 class="score_title">EduRank 2025</h3>
				<p class="score_note">Computer Science in the Philippines</p>
			</div>
		</div>

		<p class="score_footnote" use:reveal>
			PUP also takes part in the <strong>THE Impact Rankings</strong> and in
			<strong>AUN-QA</strong> regional quality assurance.
		</p>
	</section>

	<!-- ══ 2. WURI: pinned rank, scrolling chapters ══ -->
	<section id="wuri-innovation" class="content_section" aria-labelledby="innovation-title">
		{@render sectionHeading('innovation-title', 'WURI Innovation Entries', TrendingUp)}

		<div class="rank_story">
			<div class="rank_stage">
				<div class="rank_now" aria-hidden="true">
					{#if wuriRank}
						<p class="rank_value">{shownRank}<sup>{wuriRank.suffix}</sup></p>
						<p class="rank_caption">Global rank in its category, WURI {wuriActive.year}</p>
					{:else}
						<p class="rank_value rank_pending"><Hourglass strokeWidth={1.1} /></p>
						<p class="rank_caption">Endorsed to WURI {wuriActive.year}, awaiting results</p>
					{/if}
				</div>

				<ol class="rank_ladder" style:--active={wuriIndex} style:--count={wuriEntries.length}>
					<span class="ladder_marker" aria-hidden="true"></span>
					{#each wuriEntries as entry, i (entry.id)}
						<li>
							<button
								type="button"
								class:current={i === wuriIndex}
								aria-current={i === wuriIndex ? 'step' : undefined}
								onclick={() => scrollToEntry(entry.id)}
							>
								<span class="ladder_year">{entry.year}</span>
								<span class="ladder_name">{entry.project}</span>
								<span class="ladder_rank">{entry.rank ?? 'Pending'}</span>
							</button>
						</li>
					{/each}
				</ol>
			</div>

			<ol class="rank_chapters" use:rankChapters>
				{#each wuriEntries as entry, i (entry.id)}
					<li class="rank_chapter" class:active={i === wuriIndex} id="wuri-{entry.id}">
						<p class="chapter_rank">
							{#if entry.rank}{entry.rank} globally{:else}Awaiting results{/if}
						</p>
						<h3 class="chapter_title">{entry.project}</h3>
						<p class="chapter_category">{entry.category}, WURI {entry.year}</p>
						<p class="chapter_desc">{entry.description}</p>
						{#if entry.featured}
							<p class="chapter_flag">
								<Star size={16} aria-hidden="true" /> DIT’s first WURI ranking
							</p>
						{/if}
					</li>
				{/each}
			</ol>
		</div>
	</section>

	<!-- ══ 3. Partners: map spread with a typographic index ══ -->
	<section id="partners" class="content_section" aria-labelledby="partners-title">
		{@render sectionHeading('partners-title', 'Partner Institutions', Globe)}

		<div class="network" use:reveal={{ threshold: 0.2 }}>
			<div class="network_map_wrap">
				<NetworkMap {partners} {home} trip={studentTrip} bind:selected={selectedPartner} />
			</div>

			<div class="network_index">
				<h3 class="block_title">Four institutions in three countries</h3>
				<ol class="partner_index">
					{#each partners as partner (partner.id)}
						{@const open = selectedPartner === partner.id}
						<li class:open>
							<button
								type="button"
								aria-expanded={open}
								aria-controls="partner-{partner.id}"
								onclick={() => (selectedPartner = partner.id)}
							>
								<span class="partner_short" aria-hidden="true">{partner.short}</span>
								<span class="partner_meta">
									<span class="partner_name">{partner.name}</span>
									<span class="partner_place">
										<MapPin size={14} aria-hidden="true" />
										{partner.place}, {partner.country}
									</span>
								</span>
								<span class="partner_logo"><img src={partner.logo} alt="" loading="lazy" /></span>
							</button>
							<div class="partner_detail" id="partner-{partner.id}" inert={!open}>
								<div>
									<p>{partner.description}</p>
									{#if partner.id === 'binus'}
										<div class="partner_photos">
											{@render photoButton(photos.binusSigning)}
											{@render photoButton(photos.binusAgreement)}
										</div>
									{/if}
								</div>
							</div>
						</li>
					{/each}
				</ol>
			</div>
		</div>
	</section>

	<!-- ══ 4. Joint research: feature story and a river timeline ══ -->
	<section id="joint-research" class="content_section" aria-labelledby="research-title">
		{@render sectionHeading('research-title', 'Joint Research with UMPSA', FlaskConical)}

		<article class="feature_story">
			<figure class="story_collage" use:reveal>
				{@render photoButton(photos.meeting, 'collage_main')}
				{@render photoButton(photos.demo, 'collage_inset')}
				<figcaption>Proposal meeting with UMPSA, July 28, 2026</figcaption>
			</figure>
			<div class="story_body" use:reveal style:--d="1">
				<h3 class="story_title">IfloodSense</h3>
				<p class="story_lead">
					An international research project building on FloodDetectWaze, PUP’s flood-alert app.
				</p>
				<p class="story_text">
					Three BSIT students are developing the project with UMPSA. Prof. Ma. Leonila Amata also
					contributes to UMPSA’s study on probabilistic flood-risk classification.
				</p>
				{#if umpsa}
					<p class="story_partner">
						<span class="story_partner_logo"><img src={umpsa.logo} alt="" loading="lazy" /></span>
						In partnership with {umpsa.name}
					</p>
				{/if}
				<ul class="people" aria-label="IfloodSense team">
					{#each ifloodsenseTeam as member (member.name)}
						<li>
							<span class="people_name">{member.name}</span>
							<span class="people_role">{member.role}</span>
						</li>
					{/each}
				</ul>
			</div>
		</article>

		<h3 class="block_title" use:reveal>From Floodwatcher to IfloodSense</h3>
		<div class="river" use:reveal={{ threshold: 0.3 }} style:--stops={floodTimeline.length}>
			<svg class="river_line" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true">
				<path
					class="river_done"
					d="M0 60 L100 60 C166 10 233 10 300 60 C366 110 433 110 500 60 C566 10 633 10 700 60"
					pathLength="1"
				/>
				<path
					class="river_flow"
					d="M0 60 L100 60 C166 10 233 10 300 60 C366 110 433 110 500 60 C566 10 633 10 700 60"
					pathLength="1"
				/>
				<path class="river_next" d="M700 60 C766 110 833 110 900 60 L1000 60" />
			</svg>
			<ol class="river_stops">
				{#each floodTimeline as stop, i (stop.title)}
					<li
						class:below={i % 2 === 1}
						class:next={!stop.datetime}
						class:current={i === lastDoneStop}
						style:--i={i}
					>
						<span class="stop_dot" aria-hidden="true"></span>
						<div class="stop_text">
							{#if stop.datetime}
								<time datetime={stop.datetime}>{stop.date}</time>
							{:else}
								<span class="stop_date">{stop.date}</span>
							{/if}
							<h4>{stop.title}</h4>
							<p>{stop.detail}</p>
						</div>
					</li>
				{/each}
			</ol>
		</div>
	</section>

	<!-- ══ 5. Faculty: banner, roles strip, credits and conference skyline ══ -->
	<section id="faculty-engagement" class="content_section" aria-labelledby="faculty-title">
		{@render sectionHeading('faculty-title', 'International Faculty Engagement', Presentation)}

		<figure class="banner" use:reveal>
			{@render photoButton(photos.icfet, 'banner_photo')}
			<figcaption>Research presentation at ICFET 2026</figcaption>
		</figure>

		<ul class="role_strip" aria-label="Conference roles" use:reveal>
			{#each facultyRoles as role, i (role.title)}
				<li style:--d={i}>
					<role.Icon size={30} strokeWidth={1.4} aria-hidden="true" />
					<h3>{role.title}</h3>
					<p>{role.note}</p>
				</li>
			{/each}
		</ul>

		<div class="faculty_split">
			<div class="credits" use:reveal>
				<h3 class="block_title">Faculty with international research</h3>
				<ul>
					{#each facultyResearchers as researcher, i (researcher)}
						<li style:--d={i}>
							<span class="credit_name">{researcher}</span>
						</li>
					{/each}
				</ul>
			</div>

			<div class="conferences" use:reveal={{ threshold: 0.3 }}>
				<h3 class="block_title">Conference participation</h3>
				<p class="conference_total">
					<span use:countUp={{ to: conferenceCount }}>{conferenceCount}</span>
					<small>international conferences from 2023 to 2026</small>
				</p>
				<ol class="skyline" style:--rows={tallestYear} aria-label="Conferences by year">
					{#each facultyConferences as year, col (year.year)}
						<li>
							<ul class="skyline_stack">
								{#each year.events as event, row (event)}
									<li style:--d={col * 2 + row}>{event}</li>
								{/each}
								{#if year.award}
									<li class="award_chip" style:--d={col * 2}>
										<Trophy size={14} aria-hidden="true" />
										{year.award}
									</li>
								{/if}
							</ul>
							<span class="skyline_year">{year.year}</span>
						</li>
					{/each}
				</ol>
				<blockquote class="award_note">
					<Trophy size={28} strokeWidth={1.5} aria-hidden="true" />
					<p>
						<strong>2nd Best Research Paper</strong> at ICHESMET 2022 for the Credit Assessment and Recommendation
						System (CARS).
					</p>
				</blockquote>
			</div>
		</div>
	</section>

	<!-- ══ 6. Students: conference pass, photos and proceedings index ══ -->
	<section id="student-research" class="content_section" aria-labelledby="student-title">
		{@render sectionHeading('student-title', 'Student Research Abroad', GraduationCap)}

		<article class="pass" use:reveal>
			<div class="pass_main">
				<div class="pass_route" aria-hidden="true">
					<div>
						<span class="pass_code">MNL</span>
						<span class="pass_city">PUP Manila</span>
					</div>
					<span class="pass_flight">
						<span class="pass_line"></span>
						<Plane size={26} strokeWidth={1.6} />
					</span>
					<div>
						<span class="pass_code">CJU</span>
						<span class="pass_city">Jeju Island</span>
					</div>
				</div>
				<h3 class="pass_title">{studentTrip.event}</h3>
				<p class="pass_event">{studentTrip.eventName}</p>
				<dl class="pass_fields">
					<div>
						<dt><CalendarDays size={16} aria-hidden="true" /> Dates</dt>
						<dd>{studentTrip.dates}</dd>
					</div>
					<div>
						<dt><MapPin size={16} aria-hidden="true" /> Venue</dt>
						<dd>{studentTrip.place}</dd>
					</div>
				</dl>
			</div>
			<div class="pass_stub">
				<span class="pass_stub_value">{studentPapers.length}</span>
				<span class="pass_stub_label">papers presented by BSIT students</span>
				<span class="barcode" aria-hidden="true"></span>
			</div>
		</article>

		<div class="dispatch_photos" use:reveal>
			{@render photoButton(photos.jeju, 'dispatch_main')}
			{@render photoButton(photos.risk)}
			{@render photoButton(photos.yolo)}
		</div>

		<h3 class="block_title proceedings_title" use:reveal>Research presented</h3>
		<ol class="proceedings">
			{#each studentPapers as paper, i (paper.title)}
				{@const peek = paperPhotos[paper.title]}
				<li use:reveal style:--d={i}>
					<span class="proc_number" aria-hidden="true">0{i + 1}</span>
					<div class="proc_body">
						<h4>{paper.title}</h4>
						<p>
							<strong>{paper.authors}</strong>
							<span class="proc_adviser">Adviser: {paper.adviser}</span>
						</p>
					</div>
					<span class="proc_model">{paper.model}</span>
					{#if peek}
						<img
							class="proc_peek"
							src={peek.src}
							alt=""
							width={peek.width}
							height={peek.height}
							loading="lazy"
						/>
					{/if}
				</li>
			{/each}
		</ol>

		{#if report}
			<a
				class="report-button"
				href={report.href}
				target="_blank"
				rel="external noopener noreferrer"
			>
				View Full Narrative Report <ArrowUpRight size={19} aria-hidden="true" />
			</a>
		{/if}
	</section>

	<Footer />
</main>

<style>
	main {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	/* ── HERO SECTION (unchanged) ── */
	.hero-section {
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
		background-image: url('/img/pages/internationalization-hero.jpg');
		background-size: cover;
		background-position: center;
		opacity: 0.3;
		z-index: 0;
	}

	/* Font, weight, tracking and the black→maroon gradient come from the global
     .t_display role.

     Size is overridden because this is the longest title on the site and one
     unbreakable word. The role's 150px cap is too wide, and the old 4rem lower
     bound overflowed badly on mobile: at 390px the title measured 872px. This
     clamp keeps it inside the viewport from 390px up to 1920px. */
	.hero-title {
		position: relative;
		z-index: 1;
		font-size: clamp(1.5rem, 6.6vw, 128px);
		text-align: center;
		padding: 0 5%;
	}

	@media (prefers-reduced-motion: no-preference) {
		.hero-bg {
			animation: hero-backdrop-in 1.2s ease-out;
		}
		.hero-title {
			animation: hero-title-in 1s cubic-bezier(0.16, 1, 0.3, 1);
		}
	}

	/* ══════════════════════════════════════════════════════════════
	   Page tokens. Section shells, headings and dividers come from
	   accreditation-pages.css; these only style section content.
	   ══════════════════════════════════════════════════════════════ */
	.intl_page {
		--ease: cubic-bezier(0.16, 1, 0.3, 1);
		--motion-ease: var(--ease);
		--rule: color-mix(in srgb, var(--c-gold-dark) 28%, var(--c-shell));
		--muted: color-mix(in srgb, var(--c-ink) 70%, var(--c-surface));
		--gap: clamp(20px, 3vw, 56px);
		--inset: clamp(22px, 3.4vw, 64px);
		--radius: 25px;
	}

	/* Scroll reveal. Elements are only hidden after hydration (see motion.ts). */
	@media (prefers-reduced-motion: no-preference) {
		.intl_page :global(.reveal-pending) {
			opacity: 0;
			translate: 0 32px;
			transition:
				opacity 0.9s ease,
				translate 1.1s var(--ease);
			transition-delay: calc(var(--d, 0) * 90ms);
		}

		.intl_page :global(.reveal-pending.is-revealed) {
			opacity: 1;
			translate: 0 0;
		}
	}

	/* Block headings: Overpass, maroon, uppercase (cf. Teaching & Learning .story_heading). */
	.block_title {
		margin-block-end: clamp(18px, 1.6vw, 30px);
		color: var(--c-maroon);
		font: 700 clamp(19px, 1.875vw, 36px) / 1.25 var(--font-heading);
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}

	/* ══════════════════════════════════════════════════════════════
	   1. Recognition
	   ══════════════════════════════════════════════════════════════ */
	.cover {
		position: relative;
		overflow: hidden;
		aspect-ratio: 1400 / 596;
		min-height: 420px;
		border-radius: var(--radius);
		isolation: isolate;
	}

	.cover > img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: 53% 40%;
		transition: scale 1.8s var(--ease);
	}

	.cover::after {
		position: absolute;
		z-index: 0;
		inset: 0;
		background:
			linear-gradient(to top, rgb(43 8 10 / 0.92) 0%, rgb(92 15 22 / 0.55) 38%, transparent 70%),
			linear-gradient(to right, rgb(43 8 10 / 0.55), transparent 55%);
		content: '';
	}

	.cover_copy {
		position: absolute;
		z-index: 1;
		inset-inline-start: var(--inset);
		inset-block-end: var(--inset);
		max-width: min(760px, 70%);
		color: #fff;
	}

	.cover_title {
		font: 700 clamp(30px, 4.2vw, 80px) / 1 var(--font-display);
		letter-spacing: -0.015em;
		text-wrap: balance;
	}

	.cover_copy p {
		margin-block-start: 16px;
		color: rgb(255 255 255 / 0.88);
		font-size: var(--fs-md);
	}

	.seal {
		position: absolute;
		z-index: 1;
		inset-block-start: var(--inset);
		inset-inline-end: var(--inset);
		display: grid;
		place-items: center;
		width: clamp(90px, 9vw, 160px);
		aspect-ratio: 1;
		color: var(--c-maroon-deep);
		background: var(--grad-gold);
		border-radius: 50%;
		box-shadow:
			0 0 0 6px rgb(255 255 255 / 0.2),
			0 18px 40px rgb(0 0 0 / 0.35);
	}

	.seal svg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	.seal text {
		fill: var(--c-maroon-deep);
		font: 700 9.4px var(--font-body);
	}

	.seal > span {
		display: grid;
		place-items: center;
		width: 46%;
		aspect-ratio: 1;
		background: rgb(255 255 255 / 0.4);
		border-radius: 50%;
	}

	/* Pathway: three stops joined by a gold rule that draws left to right. */
	.pathway {
		position: relative;
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: var(--gap);
		margin-block: clamp(36px, 4vw, 72px);
		padding-block-start: 30px;
	}

	.pathway::before {
		position: absolute;
		inset-block-start: 6px;
		inset-inline: 0 0;
		height: 2px;
		background: linear-gradient(90deg, var(--c-gold-dark), var(--c-gold-light) 70%, transparent);
		transform-origin: left;
		content: '';
	}

	.pathway li {
		position: relative;
		display: grid;
		gap: 6px;
	}

	.pathway li::before {
		position: absolute;
		inset-block-start: -31px;
		inset-inline-start: 0;
		width: 14px;
		height: 14px;
		background: var(--c-surface);
		border: 3px solid var(--c-gold-dark);
		border-radius: 50%;
		content: '';
	}

	.pathway li:last-child::before {
		background: var(--c-maroon);
		border-color: var(--c-maroon);
		box-shadow: 0 0 0 6px rgb(148 21 24 / 0.14);
	}

	.pathway strong {
		color: var(--c-maroon);
		font: 700 clamp(26px, 2.7vw, 52px) / 1 var(--font-display);
		letter-spacing: -0.01em;
	}

	.pathway span {
		max-width: 28ch;
		color: var(--muted);
	}

	/* Scoreboard: open columns divided by gold rules, no boxes. */
	.scoreboard {
		display: grid;
		grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr) minmax(0, 1fr);
		border-block: 1.5px solid var(--c-maroon-deep);
	}

	.score {
		padding: clamp(28px, 3vw, 56px) clamp(18px, 2.4vw, 48px);
	}

	.score:first-child {
		padding-inline-start: 0;
	}

	.score + .score {
		border-inline-start: 1px solid var(--rule);
	}

	.score_value {
		display: flex;
		align-items: baseline;
		gap: 10px;
		font: 800 clamp(72px, 8.4vw, 168px) / 0.85 var(--font-display);
		letter-spacing: -0.05em;
		font-variant-numeric: tabular-nums;
		background: var(--grad-title);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.score_value small {
		color: var(--c-maroon);
		font: 700 clamp(16px, 1.4vw, 26px) / 1 var(--font-heading);
		letter-spacing: 0.02em;
		-webkit-text-fill-color: var(--c-maroon);
	}

	.score_title {
		margin-block: clamp(18px, 1.8vw, 30px) 6px;
		color: var(--c-maroon);
		font: 700 clamp(17px, 1.46vw, 28px) / 1.2 var(--font-heading);
		letter-spacing: 0.05em;
		text-transform: uppercase;
	}

	.score_note {
		display: flex;
		align-items: center;
		gap: 6px;
		color: var(--muted);
	}

	.score_note :global(svg) {
		color: #1d7f4e;
	}

	.score_footnote {
		max-width: 70ch;
		margin-block-start: clamp(18px, 1.8vw, 30px);
		color: var(--muted);
		font-size: var(--fs-md);
	}

	.score_footnote strong {
		color: var(--c-maroon-deep);
	}

	/* Zoomed ruler from 280th (left) to 240th (right): moving right is climbing. */
	.ruler {
		max-width: 460px;
		margin-block-start: 22px;
		padding-block: 30px 24px;
	}

	.ruler_track {
		position: relative;
		height: 2px;
		background: var(--rule);
	}

	.ruler_tick {
		position: absolute;
		inset-block-start: -4px;
		left: calc(var(--p) * 100%);
		width: 1px;
		height: 10px;
		background: color-mix(in srgb, var(--c-ink) 30%, transparent);
	}

	.ruler_tick.major {
		inset-block-start: -7px;
		height: 16px;
	}

	.ruler_tick em {
		position: absolute;
		inset-block-start: 20px;
		left: 50%;
		color: var(--muted);
		font-size: 0.75em;
		font-style: normal;
		translate: -50% 0;
	}

	.ruler_ghost,
	.ruler_marker {
		position: absolute;
		inset-block-start: 50%;
		width: 14px;
		height: 14px;
		border-radius: 50%;
		translate: -50% -50%;
	}

	.ruler_ghost {
		left: calc(var(--p) * 100%);
		border: 2px dashed color-mix(in srgb, var(--c-ink) 40%, transparent);
		background: var(--c-surface);
	}

	.ruler_marker {
		left: calc(var(--to) * 100%);
		background: var(--c-maroon);
		box-shadow: 0 0 0 5px rgb(148 21 24 / 0.16);
	}

	.ruler_ghost b,
	.ruler_marker b {
		position: absolute;
		inset-block-end: calc(100% + 8px);
		left: 50%;
		font-size: 0.72em;
		letter-spacing: 0.04em;
		translate: -50% 0;
	}

	.ruler_ghost b {
		color: var(--muted);
	}

	.ruler_marker b {
		color: var(--c-maroon);
	}

	.ruler_trail {
		position: absolute;
		inset-block: -1px;
		left: calc(var(--from) * 100%);
		width: calc((var(--to) - var(--from)) * 100%);
		background: linear-gradient(90deg, transparent, var(--c-maroon));
		border-radius: 2px;
		transform-origin: left;
	}

	.qs_stars {
		display: flex;
		gap: 6px;
		margin-block-start: 22px;
		color: var(--rule);
	}

	.qs_stars .lit {
		color: var(--c-gold-dark);
	}

	.qs_stars .lit :global(svg) {
		fill: var(--c-gold-light);
	}

	@media (prefers-reduced-motion: no-preference) {
		.seal svg {
			animation: spin 26s linear infinite;
		}

		.cover:global(.reveal-pending) > img {
			scale: 1.14;
		}

		.cover:global(.is-revealed) > img {
			scale: 1;
		}

		.cover:global(.reveal-pending) .cover_copy > * {
			opacity: 0;
			translate: 0 24px;
			transition:
				opacity 0.8s ease 0.35s,
				translate 1s var(--ease) 0.35s;
		}

		.cover:global(.reveal-pending) .cover_copy p {
			transition-delay: 0.5s;
		}

		.cover:global(.is-revealed) .cover_copy > * {
			opacity: 1;
			translate: 0 0;
		}

		.cover:global(.reveal-pending) .seal {
			scale: 0.4;
			rotate: -90deg;
			opacity: 0;
			transition:
				scale 0.9s cubic-bezier(0.34, 1.56, 0.64, 1) 0.6s,
				rotate 0.9s var(--ease) 0.6s,
				opacity 0.4s ease 0.6s;
		}

		.cover:global(.is-revealed) .seal {
			scale: 1;
			rotate: 0deg;
			opacity: 1;
		}

		.pathway:global(.reveal-pending)::before {
			scale: 0 1;
			transition: scale 1.6s cubic-bezier(0.65, 0, 0.35, 1) 0.2s;
		}

		.pathway:global(.is-revealed)::before {
			scale: 1 1;
		}

		.pathway:global(.reveal-pending) li {
			opacity: 0;
			translate: 0 16px;
			transition:
				opacity 0.6s ease,
				translate 0.8s var(--ease);
			transition-delay: calc(0.4s + var(--d) * 0.45s);
		}

		.pathway:global(.is-revealed) li {
			opacity: 1;
			translate: 0 0;
		}

		.score:global(.reveal-pending) .ruler_marker {
			left: calc(var(--from) * 100%);
			transition: left 1.8s cubic-bezier(0.65, 0, 0.35, 1) 0.4s;
		}

		.score:global(.is-revealed) .ruler_marker {
			left: calc(var(--to) * 100%);
		}

		.score:global(.reveal-pending) .ruler_trail {
			scale: 0 1;
			transition: scale 1.8s cubic-bezier(0.65, 0, 0.35, 1) 0.4s;
		}

		.score:global(.is-revealed) .ruler_trail {
			scale: 1 1;
		}

		.qs_score:global(.reveal-pending) .lit {
			scale: 0;
			rotate: -72deg;
			transition:
				scale 0.6s cubic-bezier(0.34, 1.56, 0.64, 1),
				rotate 0.6s var(--ease);
			transition-delay: calc(0.5s + var(--s) * 0.16s);
		}

		.qs_score:global(.is-revealed) .lit {
			scale: 1;
			rotate: 0deg;
		}
	}

	/* ══════════════════════════════════════════════════════════════
	   2. WURI scroll story
	   ══════════════════════════════════════════════════════════════ */
	.rank_story {
		display: grid;
		grid-template-columns: minmax(0, 5fr) minmax(0, 6fr);
		gap: clamp(32px, 5.2vw, 100px);
	}

	.rank_stage {
		position: sticky;
		top: 14vh;
		align-self: start;
		display: grid;
		gap: clamp(24px, 3vw, 52px);
	}

	.rank_now {
		position: relative;
		isolation: isolate;
	}

	.rank_value {
		display: flex;
		align-items: flex-start;
		min-height: 0.85em;
		font: 800 var(--fs-stat) / 0.85 var(--font-display);
		font-size: clamp(110px, 15vw, 290px);
		letter-spacing: -0.06em;
		font-variant-numeric: tabular-nums;
		background: var(--grad-title);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.rank_value sup {
		margin-block-start: 0.06em;
		margin-inline-start: 0.04em;
		font-size: 0.26em;
		letter-spacing: 0;
		line-height: 1;
		-webkit-text-fill-color: var(--c-gold-dark);
	}

	.rank_pending {
		color: var(--c-gold-dark);
		-webkit-text-fill-color: currentColor;
	}

	.rank_pending :global(svg) {
		width: 0.8em;
		height: 0.8em;
	}

	.rank_caption {
		margin-block-start: 14px;
		color: var(--muted);
		font-size: var(--fs-md);
	}

	.rank_ladder {
		position: relative;
		display: grid;
		border-block-start: 1px solid var(--rule);
	}

	.rank_ladder li {
		border-block-end: 1px solid var(--rule);
	}

	.ladder_marker {
		position: absolute;
		inset-block-start: 0;
		inset-inline-start: 0;
		width: 3px;
		height: calc(100% / var(--count));
		background: var(--grad-gold);
		translate: 0 calc(var(--active) * 100%);
		transition: translate 0.5s var(--ease);
	}

	.rank_ladder button {
		display: grid;
		grid-template-columns: 3.4em minmax(0, 1fr) auto;
		align-items: center;
		gap: 12px;
		width: 100%;
		padding: clamp(12px, 1.2vw, 20px) 4px clamp(12px, 1.2vw, 20px) 18px;
		color: var(--muted);
		text-align: start;
		background: none;
		border: 0;
		cursor: pointer;
		font: inherit;
		transition: color 0.3s ease;
	}

	.rank_ladder button.current,
	.rank_ladder button:hover {
		color: var(--c-maroon-deep);
	}

	.ladder_year {
		color: var(--c-gold-dark);
		font-weight: 700;
	}

	.ladder_name {
		font: 700 clamp(15px, 1.15vw, 22px) / 1.2 var(--font-heading);
	}

	.ladder_rank {
		font-weight: 700;
		font-variant-numeric: tabular-nums;
	}

	.rank_chapter {
		display: flex;
		flex-direction: column;
		justify-content: center;
		min-height: 72vh;
		padding-inline-start: clamp(20px, 1.9vw, 36px);
		border-inline-start: 2px solid var(--c-shell);
		opacity: 0.28;
		transition:
			opacity 0.5s ease,
			border-color 0.5s ease;
	}

	.rank_chapter.active {
		opacity: 1;
		border-inline-start-color: var(--c-gold);
	}

	/* The stage shows the rank on wide screens; chapters carry it for screen
	   readers and for narrow layouts where the stage does not pin. */
	.chapter_rank {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip-path: inset(50%);
		white-space: nowrap;
	}

	.chapter_title {
		color: var(--c-maroon);
		font: 700 clamp(34px, 3.4vw, 66px) / 1.02 var(--font-display);
		letter-spacing: -0.01em;
		text-wrap: balance;
	}

	.chapter_category {
		margin-block: 14px 18px;
		color: var(--c-gold-dark);
		font-weight: 700;
	}

	.chapter_desc {
		max-width: 46ch;
		font-size: var(--fs-lg);
		line-height: 1.5;
	}

	.chapter_flag {
		display: inline-flex;
		align-self: flex-start;
		align-items: center;
		gap: 8px;
		margin-block-start: 22px;
		padding: 8px 16px;
		color: var(--c-maroon-deep);
		background: var(--grad-gold);
		border-radius: 999px;
		font-weight: 700;
	}

	@media (prefers-reduced-motion: no-preference) {
		.rank_pending :global(svg) {
			animation: hourglass 2.4s var(--ease) infinite;
		}
	}

	/* ══════════════════════════════════════════════════════════════
	   3. Partners
	   ══════════════════════════════════════════════════════════════ */
	/* Map and index sit directly on the page; the map fades at its edges. */
	.network {
		display: grid;
		grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
		gap: clamp(28px, 4vw, 80px);
		align-items: center;
	}

	.network_map_wrap {
		width: 100%;
		max-width: 620px;
		justify-self: center;
	}

	/* Rows share one grid through subgrid, so every short name gets the width
	   of the widest one and the full names line up. */
	.partner_index {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr) auto;
		column-gap: clamp(16px, 2vw, 36px);
		border-block-start: 1.5px solid var(--c-maroon-deep);
	}

	.partner_index > li {
		display: grid;
		grid-column: 1 / -1;
		grid-template-columns: subgrid;
		border-block-end: 1px solid var(--rule);
	}

	.partner_index > li > button {
		display: grid;
		grid-column: 1 / -1;
		grid-template-columns: subgrid;
		align-items: center;
		padding-block: clamp(14px, 1.5vw, 26px);
		color: inherit;
		text-align: start;
		background: none;
		border: 0;
		cursor: pointer;
		font: inherit;
	}

	.partner_index > li > button:focus-visible {
		outline-offset: 2px;
	}

	/* Outline names. Montserrat builds glyphs from overlapping contours, so a
	   plain text-stroke draws seams inside M, P and A. Painting the stroke
	   first and a page-coloured fill over it leaves only the outer edge; the
	   stroke is doubled because the fill covers its inner half. */
	.partner_short {
		color: var(--c-surface);
		font: 800 clamp(34px, 4vw, 78px) / 0.9 var(--font-display);
		letter-spacing: -0.01em;
		-webkit-text-stroke: 3px var(--c-gold);
		paint-order: stroke fill;
		transition:
			color 0.4s ease,
			-webkit-text-stroke-color 0.4s ease,
			translate 0.4s var(--ease);
	}

	.open .partner_short {
		color: var(--c-gold-light);
		-webkit-text-stroke-color: var(--c-gold-light);
	}

	@media (hover: hover) {
		.partner_index > li > button:hover .partner_short {
			translate: 6px 0;
		}

		.partner_index > li:not(.open) > button:hover .partner_short {
			-webkit-text-stroke-color: var(--c-gold-dark);
		}
	}

	.partner_meta {
		display: grid;
		gap: 4px;
	}

	.partner_name {
		color: var(--c-maroon-deep);
		font: 700 clamp(15px, 1.15vw, 22px) / 1.25 var(--font-heading);
		letter-spacing: 0.02em;
	}

	.partner_place {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		color: var(--muted);
		font-size: 0.9em;
	}

	.partner_place :global(svg) {
		color: var(--c-gold-dark);
	}

	.partner_logo {
		display: grid;
		place-items: center;
		width: clamp(40px, 3.4vw, 60px);
		aspect-ratio: 1;
		padding: 6px;
		background: #fff;
		border: 1px solid var(--rule);
		border-radius: 50%;
		filter: grayscale(1);
		opacity: 0.6;
		transition:
			opacity 0.4s ease,
			filter 0.4s ease;
	}

	.open .partner_logo {
		filter: none;
		opacity: 1;
	}

	.partner_logo img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.partner_detail {
		display: grid;
		grid-column: 2 / -1;
		grid-template-rows: 0fr;
		transition: grid-template-rows 0.5s var(--ease);
	}

	.open .partner_detail {
		grid-template-rows: 1fr;
	}

	.partner_detail > div {
		min-height: 0;
		overflow: hidden;
	}

	.partner_detail p {
		max-width: 52ch;
		padding-block-end: clamp(16px, 1.6vw, 26px);
		color: var(--muted);
		font-size: var(--fs-md);
		line-height: 1.5;
	}

	.partner_photos {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 10px;
		max-width: 520px;
		padding-block-end: clamp(16px, 1.6vw, 26px);
	}

	.partner_photos :global(.photo_button) {
		height: auto;
		aspect-ratio: 4 / 3;
		border-radius: 14px;
	}

	/* ══════════════════════════════════════════════════════════════
	   4. Joint research
	   ══════════════════════════════════════════════════════════════ */
	.feature_story {
		display: grid;
		grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
		gap: clamp(32px, 4.4vw, 84px);
		align-items: center;
		margin-block-end: clamp(56px, 6vw, 120px);
	}

	.story_collage {
		position: relative;
		padding-block-end: 16%;
	}

	.story_collage :global(.collage_main) {
		width: 90%;
		aspect-ratio: 448 / 201;
		border-radius: var(--radius);
	}

	.story_collage :global(.collage_inset) {
		position: absolute;
		inset-inline-end: 0;
		inset-block-end: 4%;
		width: 44%;
		aspect-ratio: 257 / 142;
		border: 6px solid var(--c-surface);
		border-radius: 18px;
		box-shadow: 0 24px 50px -12px rgb(26 22 20 / 0.45);
		rotate: 3deg;
		transition: rotate 0.6s var(--ease);
	}

	@media (hover: hover) {
		.story_collage :global(.collage_inset:hover) {
			rotate: 0deg;
		}
	}

	.story_collage figcaption {
		max-width: 50%;
		margin-block-start: 14px;
		color: var(--muted);
		font-size: 0.9em;
	}

	.story_title {
		font: 700 clamp(44px, 4.6vw, 90px) / 1 var(--font-display);
		letter-spacing: -0.02em;
		background: var(--grad-title);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.story_lead {
		margin-block: 18px 14px;
		color: var(--c-maroon-deep);
		font: 700 clamp(19px, 1.6vw, 30px) / 1.3 var(--font-heading);
		letter-spacing: 0.01em;
	}

	.story_text {
		color: var(--muted);
		font-size: var(--fs-md);
		line-height: 1.55;
	}

	.story_partner {
		display: flex;
		align-items: center;
		gap: 12px;
		margin-block: 22px;
		padding-block: 14px;
		color: var(--c-maroon-deep);
		border-block: 1px solid var(--rule);
		font-weight: 700;
	}

	.story_partner_logo {
		display: grid;
		place-items: center;
		width: 46px;
		height: 46px;
		flex: 0 0 auto;
		padding: 6px;
		border: 1px solid var(--rule);
		border-radius: 50%;
	}

	.story_partner_logo img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.people {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 16px 20px;
	}

	.people li {
		display: grid;
		align-content: start;
		gap: 2px;
		padding-inline-start: 14px;
		border-inline-start: 2px solid var(--c-gold);
	}

	.people_name {
		color: var(--c-ink);
		font-weight: 700;
		line-height: 1.25;
	}

	.people_role {
		color: var(--muted);
		font-size: 0.86em;
	}

	/* River timeline: five stops on a wave; the last leg is still ahead. */
	.river {
		--slot: clamp(150px, 12vw, 200px);
		--band: 120px;
		position: relative;
	}

	.river_line {
		position: absolute;
		inset-block-start: var(--slot);
		inset-inline: 0;
		width: 100%;
		height: var(--band);
		overflow: visible;
	}

	.river_line path {
		fill: none;
		stroke-linecap: round;
		vector-effect: non-scaling-stroke;
	}

	.river_done {
		stroke: var(--c-maroon);
		stroke-width: 4;
	}

	.river_flow {
		stroke: var(--c-gold-light);
		stroke-width: 4;
		stroke-dasharray: 0.06 0.94;
		opacity: 0;
	}

	.river_next {
		stroke: var(--c-maroon);
		stroke-width: 3;
		stroke-dasharray: 2 9;
		opacity: 0.55;
	}

	.river_stops {
		position: relative;
		display: grid;
		grid-template-columns: repeat(var(--stops), minmax(0, 1fr));
	}

	.river_stops li {
		display: grid;
		grid-template-rows: var(--slot) var(--band) var(--slot);
		justify-items: center;
	}

	.stop_dot {
		grid-row: 2;
		align-self: center;
		width: 22px;
		height: 22px;
		background: var(--c-surface);
		border: 4px solid var(--c-maroon);
		border-radius: 50%;
	}

	.current .stop_dot {
		background: var(--c-maroon);
		box-shadow: 0 0 0 8px rgb(148 21 24 / 0.15);
	}

	.next .stop_dot {
		border-style: dashed;
		border-color: var(--c-gold-dark);
	}

	.stop_text {
		grid-row: 1;
		align-self: end;
		max-width: 22ch;
		padding-block-end: 12px;
		padding-inline: 8px;
		text-align: center;
	}

	.below .stop_text {
		grid-row: 3;
		align-self: start;
		padding-block: 12px 0;
	}

	.stop_text :is(time, .stop_date) {
		color: var(--c-gold-dark);
		font-weight: 700;
	}

	.stop_text h4 {
		margin-block: 4px 6px;
		color: var(--c-maroon);
		font: 700 clamp(17px, 1.4vw, 26px) / 1.15 var(--font-heading);
		letter-spacing: 0.01em;
	}

	.stop_text p {
		color: var(--muted);
		font-size: 0.88em;
		line-height: 1.45;
	}

	@media (prefers-reduced-motion: no-preference) {
		.story_collage:global(.reveal-pending) :global(.collage_inset) {
			translate: 20% 20%;
			rotate: 14deg;
			transition:
				translate 1.1s var(--ease) 0.4s,
				rotate 1.1s var(--ease) 0.4s;
		}

		.story_collage:global(.is-revealed) :global(.collage_inset) {
			translate: 0 0;
			rotate: 3deg;
		}

		.river:global(.reveal-pending) .river_done {
			stroke-dasharray: 1;
			stroke-dashoffset: 1;
			transition: stroke-dashoffset 2.2s cubic-bezier(0.65, 0, 0.35, 1) 0.2s;
		}

		.river:global(.is-revealed) .river_done {
			stroke-dashoffset: 0;
		}

		.river:global(.is-revealed) .river_flow {
			opacity: 1;
			animation: flow 3.2s linear 2.4s infinite;
		}

		.river:global(.reveal-pending) .river_next {
			opacity: 0;
			transition: opacity 0.8s ease 2.2s;
		}

		.river:global(.is-revealed) .river_next {
			opacity: 0.55;
		}

		.river:global(.reveal-pending) li > * {
			opacity: 0;
			translate: 0 14px;
			transition:
				opacity 0.6s ease,
				translate 0.7s var(--ease);
			transition-delay: calc(0.4s + var(--i) * 0.42s);
		}

		.river:global(.reveal-pending) .stop_dot {
			scale: 0;
			translate: 0 0;
			transition:
				opacity 0.3s ease,
				scale 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
			transition-delay: calc(0.3s + var(--i) * 0.42s);
		}

		.river:global(.is-revealed) li > * {
			opacity: 1;
			translate: 0 0;
			scale: 1;
		}

		.current .stop_dot {
			animation: pulse-ring 2.4s ease-out infinite;
		}
	}

	/* ══════════════════════════════════════════════════════════════
	   5. Faculty
	   ══════════════════════════════════════════════════════════════ */
	.banner {
		position: relative;
	}

	.banner :global(.banner_photo) {
		aspect-ratio: 21 / 8;
		border-radius: var(--radius);
	}

	.banner :global(.banner_photo img) {
		object-position: center 35%;
	}

	.banner figcaption {
		position: absolute;
		inset-inline-start: var(--inset);
		inset-block-end: var(--inset);
		padding: 8px 16px;
		color: #fff;
		background: rgb(26 22 20 / 0.6);
		border-radius: 999px;
		backdrop-filter: blur(6px);
		pointer-events: none;
	}

	.role_strip {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		margin-block: clamp(28px, 3vw, 56px) clamp(56px, 6vw, 120px);
	}

	.role_strip li {
		display: grid;
		align-content: start;
		gap: 8px;
		padding-inline: clamp(18px, 2.4vw, 48px);
	}

	.role_strip li:first-child {
		padding-inline-start: 0;
	}

	.role_strip li + li {
		border-inline-start: 1px solid var(--rule);
	}

	.role_strip :global(svg) {
		margin-block-end: 6px;
		color: var(--c-gold-dark);
	}

	.role_strip h3 {
		color: var(--c-maroon);
		font: 700 clamp(19px, 1.7vw, 32px) / 1.15 var(--font-heading);
		letter-spacing: 0.02em;
	}

	.role_strip p {
		color: var(--muted);
	}

	.faculty_split {
		display: grid;
		grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
		gap: clamp(32px, 5vw, 100px);
		align-items: start;
	}

	.credits li {
		display: flex;
		align-items: center;
		gap: clamp(14px, 1.6vw, 26px);
		padding-block: clamp(12px, 1.3vw, 22px);
		border-block-start: 1px solid var(--rule);
	}

	.credits li:last-child {
		border-block-end: 1px solid var(--rule);
	}

	.credit_name {
		color: var(--c-maroon-deep);
		font: 700 clamp(18px, 1.7vw, 32px) / 1.15 var(--font-heading);
		letter-spacing: 0.01em;
		transition: translate 0.35s var(--ease);
	}

	@media (hover: hover) {
		.credits li:hover .credit_name {
			translate: 6px 0;
		}
	}

	.conference_total {
		display: flex;
		align-items: flex-end;
		gap: 16px;
		margin-block-end: clamp(20px, 2vw, 36px);
		font: 800 clamp(96px, 9vw, 180px) / 0.8 var(--font-display);
		letter-spacing: -0.06em;
		background: var(--grad-title);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.conference_total small {
		max-width: 15ch;
		padding-block-end: 0.12em;
		color: var(--muted);
		font: 600 clamp(15px, 1.1vw, 20px) / 1.35 var(--font-body);
		letter-spacing: 0;
		-webkit-text-fill-color: var(--muted);
	}

	.skyline {
		--chip: clamp(30px, 2.5vw, 44px);
		display: grid;
		grid-template-columns: repeat(5, minmax(0, 1fr));
		gap: clamp(8px, 1vw, 16px);
		align-items: end;
		min-height: calc(var(--rows) * (var(--chip) + 6px) + 40px);
		border-block-end: 2px solid var(--c-maroon-deep);
	}

	.skyline > li {
		display: grid;
		gap: 8px;
		align-content: end;
		height: 100%;
	}

	.skyline_stack {
		display: flex;
		flex-direction: column-reverse;
		gap: 6px;
	}

	.skyline_stack li {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 5px;
		height: var(--chip);
		padding-inline: 6px;
		overflow: hidden;
		color: #fff;
		background: linear-gradient(135deg, var(--c-maroon), var(--c-maroon-deep));
		border-radius: 8px;
		font-size: clamp(0.66rem, 0.8vw, 0.92rem);
		font-weight: 700;
		letter-spacing: 0.04em;
		white-space: nowrap;
		transition:
			translate 0.3s var(--ease),
			filter 0.3s ease;
	}

	.skyline_stack .award_chip {
		color: var(--c-maroon-deep);
		background: var(--grad-gold);
	}

	.skyline_year {
		padding-block: 10px 12px;
		color: var(--c-maroon);
		font: 800 clamp(0.9rem, 1.1vw, 1.3rem) / 1 var(--font-heading);
		text-align: center;
	}

	@media (hover: hover) {
		.skyline_stack li:hover {
			translate: 0 -3px;
			filter: brightness(1.15);
		}
	}

	.award_note {
		display: flex;
		align-items: flex-start;
		gap: 16px;
		margin-block-start: clamp(22px, 2.2vw, 40px);
		padding-inline-start: 18px;
		border-inline-start: 3px solid var(--c-gold);
		font-size: var(--fs-md);
		line-height: 1.5;
	}

	.award_note :global(svg) {
		flex: 0 0 auto;
		color: var(--c-gold-dark);
	}

	.award_note strong {
		color: var(--c-maroon);
	}

	@media (prefers-reduced-motion: no-preference) {
		.role_strip:global(.reveal-pending) li {
			opacity: 0;
			translate: 0 20px;
			transition:
				opacity 0.6s ease,
				translate 0.8s var(--ease);
			transition-delay: calc(0.15s + var(--d) * 0.15s);
		}

		.role_strip:global(.is-revealed) li {
			opacity: 1;
			translate: 0 0;
		}

		.credits:global(.reveal-pending) li {
			opacity: 0;
			translate: -24px 0;
			transition:
				opacity 0.6s ease,
				translate 0.8s var(--ease);
			transition-delay: calc(0.15s + var(--d) * 0.09s);
		}

		.credits:global(.is-revealed) li {
			opacity: 1;
			translate: 0 0;
		}

		.conferences:global(.reveal-pending) .skyline_stack li {
			opacity: 0;
			translate: 0 24px;
			transition:
				opacity 0.5s ease,
				translate 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
			transition-delay: calc(0.4s + var(--d) * 0.08s);
		}

		.conferences:global(.is-revealed) .skyline_stack li {
			opacity: 1;
			translate: 0 0;
		}
	}

	/* ══════════════════════════════════════════════════════════════
	   6. Students
	   ══════════════════════════════════════════════════════════════ */
	.pass {
		--stub: clamp(150px, 17vw, 300px);
		--notch: clamp(12px, 1.2vw, 20px);
		display: grid;
		grid-template-columns: minmax(0, 1fr) var(--stub);
		overflow: hidden;
		color: #fff;
		background: var(--panel-maroon);
		border-radius: var(--radius);
		box-shadow: 0 40px 80px -40px rgb(92 15 22 / 0.6);
		/* Notches where the stub tears off. */
		mask:
			radial-gradient(circle var(--notch) at calc(100% - var(--stub)) 0, #0000 98%, #000) top / 100%
				51% no-repeat,
			radial-gradient(circle var(--notch) at calc(100% - var(--stub)) 100%, #0000 98%, #000)
				bottom / 100% 51% no-repeat;
	}

	.pass_main {
		padding: var(--inset);
	}

	.pass_route {
		display: grid;
		grid-template-columns: auto minmax(60px, 1fr) auto;
		align-items: center;
		gap: clamp(14px, 2vw, 40px);
	}

	.pass_route > div {
		display: grid;
	}

	.pass_route > div:last-child {
		text-align: end;
	}

	.pass_code {
		font: 900 clamp(3rem, 6.4vw, 7.6rem) / 0.9 var(--font-heading);
		letter-spacing: -0.04em;
	}

	.pass_city {
		color: rgb(255 255 255 / 0.72);
		font-size: 0.95em;
	}

	.pass_flight {
		position: relative;
		display: grid;
		place-items: center;
		color: var(--c-gold-light);
	}

	.pass_line {
		position: absolute;
		inset-inline: 0;
		top: 50%;
		border-block-start: 2px dashed rgb(250 197 73 / 0.5);
	}

	.pass_flight :global(svg) {
		position: relative;
		box-sizing: content-box;
		padding: 6px;
		background: #5c1d1e;
		border-radius: 50%;
		rotate: 45deg;
	}

	.pass_title {
		margin-block: clamp(22px, 2.4vw, 40px) 6px;
		color: var(--c-gold-light);
		font: 700 clamp(28px, 2.9vw, 56px) / 1 var(--font-display);
		letter-spacing: -0.01em;
	}

	.pass_event {
		color: rgb(255 255 255 / 0.9);
		font-size: var(--fs-md);
	}

	.pass_fields {
		display: flex;
		flex-wrap: wrap;
		gap: 14px clamp(28px, 4vw, 72px);
		margin-block-start: clamp(18px, 1.8vw, 30px);
		padding-block-start: clamp(16px, 1.6vw, 26px);
		border-block-start: 1px solid rgb(255 255 255 / 0.16);
	}

	.pass_fields dt {
		display: flex;
		align-items: center;
		gap: 6px;
		color: rgb(255 255 255 / 0.65);
		font-size: 0.88em;
	}

	.pass_fields dt :global(svg) {
		color: var(--c-gold-light);
	}

	.pass_fields dd {
		margin-block-start: 4px;
		font-weight: 700;
	}

	.pass_stub {
		display: grid;
		align-content: center;
		justify-items: center;
		gap: 8px;
		padding: var(--inset) 18px;
		color: var(--c-maroon-deep);
		text-align: center;
		background: var(--grad-gold);
		border-inline-start: 2px dashed rgb(92 15 22 / 0.35);
	}

	.pass_stub_value {
		font: 900 clamp(4rem, 7vw, 8rem) / 0.85 var(--font-heading);
		letter-spacing: -0.05em;
	}

	.pass_stub_label {
		max-width: 14ch;
		font-weight: 700;
		line-height: 1.3;
	}

	.barcode {
		width: 80%;
		height: 36px;
		margin-block-start: 10px;
		background: repeating-linear-gradient(
			90deg,
			var(--c-maroon-deep) 0 2px,
			transparent 2px 4px,
			var(--c-maroon-deep) 4px 7px,
			transparent 7px 8px,
			var(--c-maroon-deep) 8px 9px,
			transparent 9px 12px
		);
		opacity: 0.8;
	}

	.dispatch_photos {
		display: grid;
		grid-template-columns: minmax(0, 1.8fr) minmax(0, 1fr);
		grid-template-rows: repeat(2, minmax(0, 1fr));
		gap: clamp(8px, 0.8vw, 14px);
		aspect-ratio: 2.7;
		margin-block-start: clamp(14px, 1.4vw, 24px);
	}

	.dispatch_photos :global(.photo_button) {
		border-radius: 15px;
	}

	.dispatch_photos :global(.dispatch_main) {
		grid-row: 1 / -1;
	}

	.proceedings_title {
		margin-block-start: clamp(48px, 5vw, 100px);
	}

	/* Proceedings index: numbered rows; rows with a photo preview it on hover. */
	.proceedings {
		border-block-start: 1.5px solid var(--c-maroon-deep);
	}

	.proceedings > li {
		position: relative;
		display: grid;
		grid-template-columns: clamp(64px, 7vw, 130px) minmax(0, 1fr) auto;
		align-items: center;
		gap: clamp(16px, 2.4vw, 48px);
		padding-block: clamp(20px, 2.2vw, 40px);
		border-block-end: 1px solid var(--rule);
		isolation: isolate;
	}

	.proceedings > li::before {
		position: absolute;
		z-index: -1;
		inset: 0 calc(var(--page-gutter) * -0.4);
		background: linear-gradient(90deg, rgb(250 197 73 / 0.16), transparent 70%);
		border-radius: 14px;
		opacity: 0;
		transition: opacity 0.4s ease;
		content: '';
	}

	/* Outline numerals: stroke painted under a page-coloured fill so the
	   overlapping glyph contours don't show (same fix as .partner_short). */
	.proc_number {
		color: var(--c-surface);
		font: 800 clamp(44px, 5vw, 96px) / 0.9 var(--font-display);
		letter-spacing: 0.02em;
		font-variant-numeric: tabular-nums;
		-webkit-text-stroke: 3px var(--c-gold);
		paint-order: stroke fill;
		transition:
			color 0.4s ease,
			-webkit-text-stroke-color 0.4s ease;
	}

	.proc_body h4 {
		max-width: 40ch;
		color: var(--c-maroon);
		font: 700 clamp(19px, 1.7vw, 32px) / 1.2 var(--font-heading);
		letter-spacing: 0.01em;
		text-wrap: pretty;
	}

	.proc_body p {
		display: flex;
		flex-wrap: wrap;
		gap: 4px 18px;
		margin-block-start: 10px;
	}

	.proc_adviser {
		color: var(--muted);
		font-style: italic;
	}

	.proc_model {
		padding: 6px 14px;
		color: var(--c-maroon);
		border: 1px solid var(--rule);
		border-radius: 999px;
		font-size: 0.85em;
		font-weight: 700;
		white-space: nowrap;
	}

	.proc_peek {
		position: absolute;
		z-index: 2;
		inset-block-start: 50%;
		inset-inline-end: 14%;
		width: clamp(180px, 16vw, 300px);
		height: auto;
		border: 5px solid var(--c-surface);
		border-radius: 14px;
		box-shadow: 0 24px 50px -12px rgb(26 22 20 / 0.45);
		opacity: 0;
		translate: 0 -40%;
		rotate: 4deg;
		pointer-events: none;
		transition:
			opacity 0.35s ease,
			translate 0.5s var(--ease),
			rotate 0.5s var(--ease);
	}

	@media (hover: hover) {
		.proceedings > li:hover::before {
			opacity: 1;
		}

		.proceedings > li:hover .proc_number {
			color: var(--c-gold-light);
			-webkit-text-stroke-color: var(--c-gold-light);
		}

		.proceedings > li:hover .proc_peek {
			opacity: 1;
			translate: 0 -50%;
			rotate: -3deg;
		}
	}

	@media (prefers-reduced-motion: no-preference) {
		.pass:global(.reveal-pending) .pass_flight :global(svg) {
			translate: -200% 0;
			opacity: 0;
			transition:
				translate 1.4s var(--ease) 0.4s,
				opacity 0.6s ease 0.4s;
		}

		.pass:global(.is-revealed) .pass_flight :global(svg) {
			translate: 0 0;
			opacity: 1;
		}

		.pass:global(.reveal-pending) .pass_stub {
			translate: 30% 0;
			rotate: 4deg;
			transition:
				translate 1s var(--ease) 0.3s,
				rotate 1s var(--ease) 0.3s;
		}

		.pass:global(.is-revealed) .pass_stub {
			translate: 0 0;
			rotate: 0deg;
		}
	}

	.report-button {
		display: inline-flex;
		min-height: 44px;
		align-items: center;
		gap: 10px;
		margin-block-start: clamp(28px, 3vw, 48px);
		padding: 12px 20px;
		font-weight: 700;
	}

	/* ══ Shared photo frame ══ */
	.photo_button {
		position: relative;
		display: block;
		width: 100%;
		height: 100%;
		padding: 0;
		overflow: hidden;
		background: var(--c-shell);
		border: 0;
	}

	.photo_button img {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: scale 0.7s var(--ease);
	}

	.photo_button::after {
		position: absolute;
		inset: 0;
		background: linear-gradient(to top, rgb(0 0 0 / 0.3), transparent 50%);
		opacity: 0;
		transition: opacity 0.4s ease;
		content: '';
	}

	@media (hover: hover) {
		.photo_button:hover img {
			scale: 1.05;
		}

		.photo_button:hover::after {
			opacity: 1;
		}
	}

	/* ══ Keyframes ══ */
	@keyframes spin {
		to {
			rotate: 360deg;
		}
	}

	@keyframes hourglass {
		0%,
		40% {
			rotate: 0deg;
		}
		60%,
		100% {
			rotate: 180deg;
		}
	}

	@keyframes flow {
		from {
			stroke-dashoffset: 1;
		}
		to {
			stroke-dashoffset: 0;
		}
	}

	@keyframes pulse-ring {
		0% {
			box-shadow: 0 0 0 0 rgb(148 21 24 / 0.35);
		}
		100% {
			box-shadow: 0 0 0 16px rgb(148 21 24 / 0);
		}
	}

	/* ══ Responsive ══ */
	@media (max-width: 960px) {
		.network,
		.faculty_split,
		.feature_story {
			grid-template-columns: minmax(0, 1fr);
		}

		.network_map_wrap {
			max-width: 520px;
		}

		/* The rank stage stops pinning; each chapter shows its own rank. */
		.rank_story {
			grid-template-columns: minmax(0, 1fr);
		}

		.rank_stage {
			display: none;
		}

		.rank_chapter {
			min-height: 0;
			padding-block: 24px;
			opacity: 1;
			border-inline-start-color: var(--c-gold);
		}

		.chapter_rank {
			position: static;
			width: auto;
			height: auto;
			overflow: visible;
			clip-path: none;
			margin-block-end: 8px;
			font: 800 clamp(36px, 9vw, 64px) / 1 var(--font-display);
			letter-spacing: -0.04em;
			white-space: normal;
			background: var(--grad-title);
			-webkit-background-clip: text;
			background-clip: text;
			-webkit-text-fill-color: transparent;
		}

		/* River turns vertical. */
		.river_line {
			display: none;
		}

		.river_stops {
			grid-template-columns: minmax(0, 1fr);
			padding-inline-start: 10px;
			border-inline-start: 3px solid var(--c-maroon);
		}

		.river_stops li {
			grid-template-columns: auto minmax(0, 1fr);
			grid-template-rows: auto;
			justify-items: start;
			column-gap: 16px;
			margin-inline-start: -23px;
			padding-block: 12px;
		}

		.river_stops li.next {
			border-inline-start: 0;
		}

		.stop_dot,
		.stop_text,
		.below .stop_text {
			grid-row: 1;
			align-self: start;
		}

		.stop_dot {
			margin-block-start: 2px;
		}

		.stop_text,
		.below .stop_text {
			max-width: none;
			padding: 0;
			text-align: start;
		}
	}

	@media (max-width: 700px) {
		.cover {
			aspect-ratio: 4 / 5;
			min-height: 0;
		}

		.cover_copy {
			max-width: none;
			inset-inline-end: var(--inset);
		}

		.seal {
			width: 80px;
		}

		.pathway,
		.scoreboard,
		.role_strip {
			grid-template-columns: minmax(0, 1fr);
		}

		.pathway {
			padding-block-start: 0;
			padding-inline-start: 30px;
		}

		.pathway::before {
			inset-block: 6px 0;
			inset-inline: 6px auto;
			width: 2px;
			height: auto;
			background: linear-gradient(var(--c-gold-dark), var(--c-gold-light) 70%, transparent);
			transform-origin: top;
		}

		.pathway li::before {
			inset-block-start: 4px;
			inset-inline-start: -30px;
		}

		.score,
		.score:first-child {
			padding-inline: 0;
		}

		.score + .score {
			border-inline-start: 0;
			border-block-start: 1px solid var(--rule);
		}

		.role_strip li,
		.role_strip li:first-child {
			padding: 18px 0;
		}

		.role_strip li + li {
			border-inline-start: 0;
			border-block-start: 1px solid var(--rule);
		}

		.partner_index {
			grid-template-columns: minmax(0, 1fr) auto;
		}

		.partner_short {
			grid-column: 1 / -1;
			margin-block-end: 8px;
		}

		.partner_detail {
			grid-column: 1 / -1;
		}

		.people {
			grid-template-columns: minmax(0, 1fr);
		}

		.banner :global(.banner_photo) {
			aspect-ratio: 16 / 9;
		}

		.banner figcaption {
			position: static;
			margin-block-start: 10px;
			padding: 0;
			color: var(--muted);
			background: none;
		}

		.proceedings > li {
			grid-template-columns: auto minmax(0, 1fr);
		}

		.proc_model {
			grid-column: 2;
			justify-self: start;
		}

		.proc_peek {
			display: none;
		}

		.pass {
			grid-template-columns: minmax(0, 1fr);
			mask: none;
		}

		.pass_stub {
			grid-template-columns: auto 1fr;
			justify-items: start;
			align-items: center;
			column-gap: 16px;
			padding: 18px var(--inset);
			text-align: start;
			border-inline-start: 0;
			border-block-start: 2px dashed rgb(92 15 22 / 0.35);
		}

		.barcode {
			display: none;
		}

		.dispatch_photos {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			grid-template-rows: auto;
			aspect-ratio: auto;
		}

		.dispatch_photos :global(.photo_button) {
			aspect-ratio: 16 / 9;
		}

		.dispatch_photos :global(.dispatch_main) {
			grid-area: 1 / 1 / 2 / -1;
		}

		.skyline_stack li {
			padding-inline: 3px;
			font-size: 0.6rem;
			letter-spacing: 0;
		}

		.skyline_stack .award_chip :global(svg) {
			display: none;
		}
	}
</style>
