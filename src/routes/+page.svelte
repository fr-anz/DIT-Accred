<script>
	import Card from '$lib/components/Card.svelte';
	import { Handshake, GraduationCap, CirclePile, Info, Users, Building2, Network } from 'lucide-svelte';
	import { sections } from '$lib/data/homeData';

	let videoUrl = 'https://www.w3schools.com/html/mov_bbb.mp4';
	let visualizerEl = $state();
	let isVisible = $state(false);

	$effect(() => {
		if (!visualizerEl || typeof IntersectionObserver === 'undefined') return;
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					isVisible = true;
					observer.disconnect();
				}
			},
			{ threshold: 0.3 }
		);
		observer.observe(visualizerEl);
		return () => observer.disconnect();
	});
</script>

<header class="video-container">
	<video src={videoUrl} autoplay loop muted playsinline class="video-home"></video>
</header>

<section class="bento-section">
	<div class="bento-grid">
		<Card class="bsit-card" variant="maroon" size="md">
			<h1 class="bsit-title">BSIT</h1>
			<h2 class="bsit-subtitle">Bachelor of Science in Information Technology</h2>
			<p class="bsit-desc">
				The Bachelor of Science in Information Technology (BSIT) program is a four-year degree
				program which focuses on the study of computer utilization and computer software to plan,
				install, customize, operate, manage, administer and maintain information technology
				infrastructure
			</p>
		</Card>

		<Card class="innovation-card" variant="dark" size="md">
			<h2 class="innovation-heading">Innovation. Excellence. Future Ready</h2>
			<div class="highlights">
				<div class="highlight-item">
					<div class="highlight-text">
						<Handshake></Handshake>
						<span class="stat">100+</span>
						<span class="desc">Industry partnerships worldwide</span>
					</div>
				</div>
				<div class="highlight-item">
					<div class="highlight-text">
						<GraduationCap></GraduationCap>
						<span class="stat">95.31%</span>
						<span class="desc">Graduate employability rate within 12 months</span>
					</div>
				</div>
				<div class="highlight-item">
					<div class="highlight-text">
						<CirclePile></CirclePile>
						<span class="stat">10 Orgs</span>
						<span class="desc">Student Built Organizations<br />(academic and tech)</span>
					</div>
				</div>
			</div>
		</Card>

		<Card class="years-card" variant="dark" size="md">
			<div class="years-header">
				<span class="number">47</span>
				<span class="text">years</span>
			</div>
			<p class="years-desc">
				of Department's existence.<br />Coding the <strong>PUP Spirit since 1979</strong>
			</p>
		</Card>

		<Card class="objectives-card" variant="gold" size="md">
			<div class="obj-header">
				<h2 class="obj-title">Program Educational Objectives</h2>
				<p class="obj-intro">
					Within 3–5 years of graduation, Bachelor of Science in Information Technology graduates
					are expected to:
				</p>
			</div>
			<div class="obj-grid">
				<Card class="obj-subcard" variant="maroon" size="sm">
					<span class="obj-num">01</span>
					<h3 class="obj-heading">Professional IT Practice</h3>
				</Card>
				<Card class="obj-subcard" variant="maroon" size="sm">
					<span class="obj-num">02</span>
					<h3 class="obj-heading">Innovation & Ethical Contributions</h3>
				</Card>
				<Card class="obj-subcard" variant="maroon" size="sm">
					<span class="obj-num">03</span>
					<h3 class="obj-heading">Career Advancement & Lifelong Growth</h3>
				</Card>
			</div>
		</Card>
	</div>
</section>

<section class="welcome-container">
	<div class="line"></div>

	<h1 class="welcome-text">
		WELCOME AACCUP<br />
		ACCREDITORS
	</h1>

	<div class="line"></div>
</section>

<section class="leadership-container">
	<div class="leader-pane dark-bg">
		<p class="quote align-right">
			<span class="text-white">True to the PUP tradition of producing </span>
			<span class="highlight">Iskolar para sa Bayan</span>
			<span class="text-white"
				>, the program nurtures not only technical competence but also discipline, leadership,
				creativity, and a deep sense of public service. <br /><br />Our students are challenged to
				become</span
			>
			<span class="highlight"> innovators and problem-solvers</span>
			<span class="text-white">
				who will contribute meaningful solutions to communities, industries, and the country.</span
			>
		</p>

		<img class="profile-img dustin-img" src="/img/sir-dustin.png" alt="John Dustin Santos" />

		<div class="profile-info align-left">
			<h3>John Dustin Santos, MIT</h3>
			<p>Chairperson of Department of Information Technology</p>
		</div>
	</div>

	<div class="leader-pane maroon-bg">
		<p class="quote align-left">
			<span class="text-white">True to the PUP tradition of producing </span>
			<span class="highlight">Iskolar para sa Bayan</span>
			<span class="text-white"
				>, the program nurtures not only technical competence but also discipline, leadership,
				creativity, and a deep sense of public service. <br /><br />Our students are challenged to
				become</span
			>
			<span class="highlight"> innovators and problem-solvers</span>
			<span class="text-white">
				who will contribute meaningful solutions to communities, industries, and the country.</span
			>
		</p>

		<img class="bg-vector" src="/img/image.svg" alt="" aria-hidden="true" />

		<img class="profile-img melvin-img" src="/img/sir-melvin-fade-1.png" alt="Melvin C. Roxas" />

		<div class="profile-info align-right">
			<h3>Melvin C. Roxas, MSGITS</h3>
			<p>Dean of College of Computer Information and Sciences</p>
		</div>
	</div>
</section>

<section class="about-section">
	<div class="about-header">
		<Info size={35} color="#941518" />
		<h2 class="about-title">About the Department</h2>
	</div>
	<div class="header-line"></div>

	<div class="intro-container">
		<img class="intro-image" src="https://placehold.co/634x854" alt="Department" />
		<div class="intro-text">
			<p>
				The <strong>Bachelor of Science in Information Technology</strong> program provides an engaging
				environment for learners passionate about building modern digital solutions. The program allows
				creative and critical thinkers to transform complex technological concepts into practical, in-demand
				skillsets. Learners are trained in software development, network architecture, and data management,
				with a sharp focus on engineering innovative solutions to real-world problems.
			</p>

			<div class="mv-container">
				<div class="mv-card">
					<h3>MISSION</h3>
					<p>
						The <strong>Department of Information Technology</strong> is committed to providing
						exceptional ICT education, conducting groundbreaking research, and driving innovation within
						the University, establishing ourselves as a recognized leader in the field.
					</p>
				</div>
				<div class="mv-card">
					<h3>VISION</h3>
					<p>
						A leading academic department, recognized for its exceptional
						<strong>ICT education, research, and innovation</strong>.
					</p>
				</div>
			</div>
		</div>
	</div>

	<div class="stats-banner">
		<div class="stat-card">
			<Users size={48} color="#941518" />
			<span class="stat-number">2000+</span>
			<span class="stat-label">students enrolled in all year levels</span>
		</div>
		<div class="stat-card">
			<GraduationCap size={48} color="#941518" />
			<span class="stat-number">30</span>
			<span class="stat-label">faculty members in the department</span>
		</div>
		<div class="stat-card">
			<Building2 size={48} color="#941518" />
			<span class="stat-number">100+</span>
			<span class="stat-label">industry partnerships worldwide</span>
		</div>
		<div class="stat-card">
			<Network size={48} color="#941518" />
			<span class="stat-number">10</span>
			<span class="stat-label">student organizations (academic and tech)</span>
		</div>
	</div>

	<div class="goals-section">
		<div class="qc-visualizer" bind:this={visualizerEl} class:animate={isVisible}>
			<div class="ellipse-outer"></div>
			<div class="ellipse-mid"></div>
			<div class="ellipse-inner"></div>

			<div class="qc-core-badge">Quality Control</div>

			<div class="line-segment line-top"></div>
			<div class="line-segment line-right"></div>
			<div class="line-segment line-left"></div>
			<div class="line-segment line-bottom"></div>
			<div class="gold-dot dot-top"></div>
			<div class="gold-dot dot-right"></div>
			<div class="gold-dot dot-left"></div>
			<div class="gold-dot dot-bottom"></div>

			<div class="node-btn extension-btn">Extension</div>
			<div class="node-btn research-btn">Research</div>
			<div class="node-btn instruction-btn">Instruction</div>
			<div class="node-btn compliance-btn">Compliance</div>
		</div>

		<div class="goals-content">
			<h2 class="goals-title">DIT GOALS</h2>

			<div class="goals-grid">
				<div class="goal-card">
					<div class="goal-header">
						<span class="goal-num">01</span>
					</div>
					<p class="goal-text">Strengthen Academic Excellence</p>
				</div>

				<div class="goal-card">
					<div class="goal-header">
						<span class="goal-num">02</span>
					</div>
					<p class="goal-text">Advance Research and Innovation</p>
				</div>

				<div class="goal-card">
					<div class="goal-header">
						<span class="goal-num">03</span>
					</div>
					<p class="goal-text">Enhance Faculty Excellence and Engagement</p>
				</div>

				<div class="goal-card">
					<div class="goal-header">
						<span class="goal-num">04</span>
					</div>
					<p class="goal-text">Expand Outreach Programs</p>
				</div>

				<div class="goal-card">
					<div class="goal-header">
						<span class="goal-num">05</span>
					</div>
					<p class="goal-text">Foster Active Student Involvement and Engagement</p>
				</div>

				<div class="goal-card">
					<div class="goal-header">
						<span class="goal-num">06</span>
					</div>
					<p class="goal-text">Nurture Strong Relationships</p>
				</div>
		</div>
	</div>
</div>
</section>

<section class="quick-links">
	{#each sections as section}
		<a href="/{section.id}" class="panel">
			<img
				src={section.image}
				alt={section.title}
				class="panel-image"
				loading="lazy"
				decoding="async"
			/>
			<div class="panel-overlay"></div>
			<div class="panel-content">
				<h2 class="panel-title">{section.title}</h2>
				<p class="panel-subtitle">{section.subtitle}</p>
			</div>
		</a>
	{/each}
</section>

<section class="section-5">
	<img
		class="bg-rect" alt=""
		src="https://placehold.co/100x116"
		style="--w:100px; --h:116px; --x:0px; --y:57px;"
	/>
	<img
		class="bg-rect" alt=""
		src="https://placehold.co/200x200"
		style="--w:200px; --h:200px; --x:0px; --y:835px;"
	/>
	<img
		class="bg-rect" alt=""
		src="https://placehold.co/350x317"
		style="--w:350px; --h:317px; --x:0px; --y:235px;"
	/>
	<img
		class="bg-rect" alt=""
		src="https://placehold.co/165x162"
		style="--w:165px; --h:162px; --x:401px; --y:467px; --op:0.80; --shadow:10px; --blur:5px;"
	/>
	<img
		class="bg-rect" alt=""
		src="https://placehold.co/131x134"
		style="--w:131px; --h:134px; --x:270px; --y:668px; --op:0.90; --shadow:10px; --blur:5px;"
	/>
	<img
		class="bg-rect" alt=""
		src="https://placehold.co/175x172"
		style="--w:175px; --h:172px; --x:1451px; --y:380px; --op:0.90; --shadow:15px; --blur:7.5px;"
	/>
	<img
		class="bg-rect" alt=""
		src="https://placehold.co/170x170"
		style="--w:170px; --h:170px; --x:1751px; --y:534px; --op:0.99; --shadow:5px; --blur:2.5px;"
	/>
	<img
		class="bg-rect" alt=""
		src="https://placehold.co/175x172"
		style="--w:175px; --h:172px; --x:1621px; --y:208px; --shadow:5px; --blur:2.5px;"
	/>
	<img
		class="bg-rect" alt=""
		src="https://placehold.co/175x172"
		style="--w:175px; --h:172px; --x:1801px; --y:35px;"
	/>
	<img
		class="bg-rect" alt=""
		src="https://placehold.co/126x126"
		style="--w:126px; --h:126px; --x:432px; --y:1081px; --op:0.85; --shadow:15px; --blur:7.5px;"
	/>
	<img
		class="bg-rect" alt=""
		src="https://placehold.co/175x172"
		style="--w:175px; --h:172px; --x:1276px; --y:771px; --op:0.90; --shadow:20px; --blur:10px;"
	/>
	<img
		class="bg-rect" alt=""
		src="https://placehold.co/103x100"
		style="--w:103px; --h:100px; --x:1482px; --y:1107px; --op:0.90; --shadow:10px; --blur:5px;"
	/>
	<img
		class="bg-rect" alt=""
		src="https://placehold.co/175x172"
		style="--w:175px; --h:172px; --x:1657px; --y:1278px; --op:0.95; --shadow:4px; --blur:2px;"
	/>
	<img
		class="bg-rect" alt=""
		src="https://placehold.co/175x172"
		style="--w:175px; --h:172px; --x:1832px; --y:1450px;"
	/>
	<img
		class="bg-rect" alt=""
		src="https://placehold.co/263x243"
		style="--w:263px; --h:243px; --x:175px; --y:1207px; --op:0.90; --shadow:5px; --blur:2.5px;"
	/>
	<img
		class="bg-rect" alt=""
		src="https://placehold.co/117x129"
		style="--w:117px; --h:129px; --x:646px; --y:830px; --op:0.75; --shadow:20px; --blur:10px;"
	/>
	<img
		class="bg-rect" alt=""
		src="https://placehold.co/87x92"
		style="--w:87px;  --h:92px;  --x:1305px; --y:115px; --shadow:4px; --blur:2px;"
	/>
	<img
		class="bg-rect" alt=""
		src="https://placehold.co/217x217"
		style="--w:217px; --h:217px; --x:708px; --y:163px; --op:0.70; --shadow:15px; --blur:7.5px;"
	/>
	<img
		class="bg-rect" alt=""
		src="https://placehold.co/175x172"
		style="--w:175px; --h:172px; --x:0px; --y:1450px;"
	/>
	<img
		class="bg-rect" alt=""
		src="https://placehold.co/175x172"
		style="--w:175px; --h:172px; --x:558px; --y:1293px; --op:0.75; --shadow:15px; --blur:7.5px;"
	/>
	<img
		class="bg-rect" alt=""
		src="https://placehold.co/242x255"
		style="--w:242px; --h:255px; --x:1679px; --y:815px;"
	/>
	<img
		class="bg-rect" alt=""
		src="https://placehold.co/121x116"
		style="--w:121px; --h:116px; --x:1562px; --y:705px; --op:0.90; --shadow:5px; --blur:2.5px;"
	/>
	<img
		class="bg-rect" alt=""
		src="https://placehold.co/241x230"
		style="--w:241px; --h:230px; --x:1035px; --y:935px; --op:0.75; --shadow:20px; --blur:10px;"
	/>

	<h3 class="subtitle-top">we build systems that</h3>

	<h1 class="main-title">that solve real problems —</h1>

	<h3 class="subtitle-bottom">from classrooms to communities,<br />to the country.</h3>

	<p class="description">
		The Department of Information Technology was founded in 1979 as part of PUP’s commitment to
		accessible technical education. Forty-six years later, that mission still holds.
	</p>

	<a href="https://www.pup.edu.ph" class="btn-pup" target="_blank" rel="noopener noreferrer">
		Check-out PUP Website
	</a>
</section>

<style>
	.video-container {
		position: relative;
		width: 100%;
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	.video-home {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		object-fit: cover;
		z-index: 1;
	}

	/* Bento Layout */
	.bento-section {
		padding: 4rem 2rem;
		margin-bottom: 6rem;
		display: flex;
		justify-content: center;
	}

	.bento-grid {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		gap: 1.5rem;
		max-width: 1400px;
		width: 100%;
	}

	/* Cards styling */
	:global(.bsit-card),
	:global(.innovation-card),
	:global(.years-card),
	:global(.objectives-card) {
		padding: 32px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		box-sizing: border-box;
	}

	/*Grid placements */
	:global(.bsit-card) {
		grid-column: span 7;
	}
	:global(.innovation-card) {
		grid-column: span 5;
	}
	:global(.years-card) {
		grid-column: span 4;
	}
	:global(.objectives-card) {
		grid-column: span 8;
	}

	/* --- Box 1: BSIT --- */
	.bsit-title {
		font-size: 72px;
		font-weight: 700;
		letter-spacing: 4px;
		margin: 0;
		margin-top: -50px;
	}
	.bsit-subtitle {
		margin: -5px 0 20px 0;
		font-size: 20px;
		font-style: italic;
		color: #cfa83a;
		font-weight: 600;
	}
	.bsit-desc {
		font-size: 16px;
		text-align: justify;
		line-height: 1.6;
		margin: 0;
	}

	/* --- Box 2: Innovation --- */
	.innovation-heading {
		font-size: 32px;
		font-weight: 700;
		margin: 0 0 1.5rem 0;
		line-height: 1.2;
	}
	.highlights {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.highlight-item {
		background-color: #5d5d5d;
		border-radius: 12px;
		padding: 1rem 1.25rem;
		display: flex;
		align-items: center;
		gap: 1.25rem;
	}

	.highlight-text {
		display: flex;
		align-items: center;
		gap: 1.25rem;
	}
	.highlight-text .stat {
		font-size: 24px;
		font-weight: 700;
		min-width: 90px;
	}
	.highlight-text .desc {
		font-size: 15px;
		line-height: 1.3;
	}

	/* --- Box 3: 47 Years --- */
	.years-header {
		display: flex;
		align-items: baseline;
		gap: 0.75rem;
		color: #fac549;
		margin-bottom: 0.75rem;
	}
	.years-header .number {
		font-size: 80px;
		font-weight: 700;
		line-height: 1;
	}
	.years-header .text {
		font-size: 48px;
		font-style: italic;
	}
	.years-desc {
		font-size: 18px;
		margin: 0;
		line-height: 1.5;
	}

	/* --- Box 4: Objectives --- */
	.obj-title {
		font-size: 32px;
		font-weight: 700;
		color: #000;
		margin: 0 0 10px 0;
	}
	.obj-intro {
		font-size: 18px;
		color: #000;
		margin: 0 0 1.5rem 0;
	}
	.obj-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.25rem;
	}
	:global(.obj-subcard) {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 1.25rem;
		min-height: 140px;
	}
	.obj-num {
		font-size: 16px;
		opacity: 0.8;
	}
	.obj-heading {
		font-size: 18px;
		font-weight: 700;
		text-align: right;
		margin: 0;
		line-height: 1.3;
	}

	/* Welcome AACUP */
	.welcome-container {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		gap: 2rem;
		width: 100%;

		margin: 0 auto 6rem auto;
		padding: 4rem 2rem;
		box-sizing: border-box;
	}

	.line {
		height: 2px;
		background-color: #cfa83a;
		width: 100%;
	}

	.welcome-text {
		font-weight: 800;
		text-align: center;
		line-height: 1.2;
		margin: 0;
		font-size: clamp(2rem, 5vw, 72px);

		background: linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(145, 21, 24, 1) 100%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		color: transparent;
	}

	.leadership-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		width: 100%;
		min-height: 950px;
		margin-bottom: 6rem;
	}

	.leader-pane {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 5rem 4rem;
		overflow: hidden;
	}

	.dark-bg {
		background: linear-gradient(
			155deg,
			rgba(69, 21, 22, 1) 0%,
			rgba(26, 22, 20, 1) 64%,
			rgba(57, 46, 31, 1) 100%
		);
	}

	.maroon-bg {
		background: linear-gradient(116deg, rgba(146, 21, 24, 1) 0%, rgba(109, 23, 25, 1) 100%);
	}

	.quote {
		max-width: 450px;

		font-size: clamp(1rem, 1.5vw, 1.5rem);
		line-height: 1.6;
		margin: 0;
		z-index: 10;
		position: relative;
	}

	.text-white {
		color: #ffffff;
	}

	.highlight {
		font-weight: 700;
		color: #fac549;
	}

	.profile-info {
		position: relative;
		z-index: 10;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.profile-info h3 {
		font-family: 'Overpass', sans-serif;
		font-weight: 700;
		color: #ffffff;
		font-size: clamp(1.8rem, 3vw, 3rem);
		margin: 0;
	}

	.profile-info p {
		font-family: 'Inter', sans-serif;
		font-style: italic;
		color: #fac549;
		font-size: clamp(1.2rem, 1.5vw, 1.8rem);
		margin: 0;
	}

	/* --- Alignment  --- */
	.align-left {
		align-self: flex-start;
		text-align: left;
	}

	.align-right {
		align-self: flex-end;
		text-align: right;
	}

	/* --- Images --- */
	.profile-img {
		position: absolute;
		bottom: 0;
		max-height: 85%;
		object-fit: cover;
		z-index: 1;
		pointer-events: none;
	}

	.dustin-img {
		left: 0;
	}

	.melvin-img {
		right: 10%;
	}

	.bg-vector {
		position: absolute;
		top: 50%;
		left: 10%;
		width: 90%;
		opacity: 0.5;
		z-index: 0;
	}




	/* --- LEFT SIDE: Radial Diagram --- */


	.quick-links {
		display: flex;
		width: 100%;
		height: 480px;
		overflow: hidden;
		margin-bottom: 6rem;
	}

	.panel {
		flex: 1;
		position: relative;
		overflow: hidden;
		cursor: pointer;
		text-decoration: none;
		transition: flex 0.4s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.panel:hover {
		flex: 2.5;
	}

	.panel-image {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
		background-color: #941518;
	}

	.panel:hover .panel-image {
		transform: scale(1.05);
	}

	.panel-overlay {
		position: absolute;
		inset: 0;
		background: rgba(148, 21, 24, 0.55);
		transition: background 0.3s ease;
	}

	.panel:hover .panel-overlay {
		background: rgba(148, 21, 24, 0.35);
	}

	.panel-content {
		position: absolute;
		inset: 0;
		z-index: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 1.5rem 1rem;
		gap: 0.5rem;
	}

	.panel-title {
		color: white;
		font-size: clamp(1rem, 1.5vw, 1.5rem);
		font-family: Overpass, sans-serif;
		font-weight: 800;
		text-align: center;
		margin: 0;
		line-height: 1.2;
		transition: font-size 0.3s ease;
	}

	.panel:hover .panel-title {
		font-size: clamp(1.1rem, 1.8vw, 1.75rem);
	}

	.panel-subtitle {
		color: rgba(255, 255, 255, 0.9);
		font-size: clamp(0.7rem, 0.9vw, 0.95rem);
		font-family: Inter, sans-serif;
		font-weight: 400;
		text-align: center;
		margin: 0;
		line-height: 1.4;
	}

	.panel:hover .panel-subtitle {
		opacity: 1;
		transform: translateY(0);
	}

	.about-section {
		width: 100%;
		max-width: 1920px;
		margin: 0 auto 6rem auto;
		padding: 40px 120px;
		box-sizing: border-box;
		background: #ffffff;
		font-family: 'Inter', sans-serif;
		position: relative;
	}

	/* Header Section styling */
	.about-header {
		display: flex;
		align-items: center;
		gap: 20px;
		margin-top: 30px;
	}
	.about-title {
		color: #fac549;
		font-size: 32px;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 8.64px;
		margin: 0;
	}
	.header-line {
		width: 100%;
		height: 2px;
		background-color: #5e5e5e;
		margin: 30px 0 60px 0;
	}

	/* Intro Section CSS Grid Layout */
	.intro-container {
		display: grid;
		grid-template-columns: 634px 1fr;
		gap: 60px;
		align-items: start;
		margin-bottom: 80px;
	}
	.intro-image {
		width: 634px;
		height: 854px;
		object-fit: cover;
		border-radius: 15px;
		background: linear-gradient(134deg, #6d1012 0%, #965e00 100__);
	}
	.intro-text {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}
	.intro-text p {
		color: #000000;
		font-size: 28px;
		line-height: 40px;
		font-weight: 400;
		text-align: right;
		margin: 80px 0 0 0;
		max-width: 820px;
	}

	/* Mission & Vision Styling Layout */
	.mv-container {
		display: flex;
		justify-content: flex-end;
		gap: 40px;
		margin-top: 60px;
	}
	.mv-card {
		background: #ffffff;
		border: 1px #941518 solid;
		border-radius: 15px;
		box-shadow:
			4px 4px 4px rgba(207, 168, 58, 0.5),
			inset -4px 4px 4px rgba(148, 21, 24, 0.5),
			-4px 4px 4px rgba(109, 23, 25, 0.5);
		padding: 40px;
		box-sizing: border-box;
	}
	.mv-container .mv-card:nth-child(1) {
		width: 566px;
	}
	.mv-container .mv-card:nth-child(2) {
		width: 357px;
	}

	.mv-card h3 {
		font-family: 'Overpass', sans-serif;
		font-size: 64px;
		font-weight: 700;
		margin: 0 0 24px 0;
	}
	.mv-card:nth-child(1) h3 {
		color: #fac549;
	}
	.mv-card:nth-child(2) h3 {
		color: #f8c246;
	}

	.mv-card p {
		color: #000000;
		font-size: 22px;
		line-height: 1.5;
		font-weight: 400;
		margin: 0;
	}

	/* Analytics Stats Banner Flex row layout */
	.stats-banner {
		background: linear-gradient(137deg, #fac549 0%, #ca8106 100%);
		border-radius: 35px;
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 60px 40px;
		margin-bottom: 100px;
	}
	.stat-card {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		width: 280px;
	}
	.stat-number {
		font-family: 'Overpass', sans-serif;
		color: #941518;
		font-size: 72px;
		font-weight: 700;
		margin: 15px 0;
	}
	.stat-label {
		color: #000000;
		font-size: 24px;
		line-height: 1.3;
	}

	/* Dynamic Goal Section Layout Flex Split Wrap */
	.goals-section {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 50px;
		background: #ffffff;
		padding-top: 40px;
	}

	/* Concentric Circle Orbit Graphics Engine System */
	.qc-visualizer {
		position: relative;
		width: 874px;
		height: 750px;
		background: linear-gradient(148deg, #451516 0%, #1a1614 64%, #392e1f 100%);
		border-radius: 30px;
		flex-shrink: 0;
	}
	.ellipse-outer,
	.ellipse-mid,
	.ellipse-inner {
		border: 1px white dashed;
		border-radius: 50%;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		z-index: 1;
		opacity: 0;
	}
	.qc-visualizer.animate .ellipse-outer,
	.qc-visualizer.animate .ellipse-mid,
	.qc-visualizer.animate .ellipse-inner {
		animation: ringExpand 0.5s linear forwards;
	}
	.qc-visualizer.animate .ellipse-inner {
		animation-delay: 0s;
	}
	.qc-visualizer.animate .ellipse-mid {
		animation-delay: 0.2s;
	}
	.qc-visualizer.animate .ellipse-outer {
		animation-delay: 0.4s;
	}

	@keyframes ringExpand {
		from {
			opacity: 0;
			transform: translate(-50%, -50%) scale(0);
		}
		to {
			opacity: 1;
			transform: translate(-50%, -50%) scale(1);
		}
	}
	.ellipse-outer {
		width: 481px;
		height: 468px;
	}
	.ellipse-mid {
		width: 325px;
		height: 316px;
	}
	.ellipse-inner {
		width: 163px;
		height: 159px;
	}

	.qc-core-badge {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 239px;
		height: 51px;
		background: linear-gradient(90deg, #cfa83a 0%, #ce870c 100%);
		border-radius: 30px;
		color: #b30e12;
		font-family: 'Overpass', sans-serif;
		font-size: 26px;
		font-weight: 700;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 3;
		opacity: 0;
	}
	.qc-visualizer.animate .qc-core-badge {
		animation: badgePop 0.35s ease-out forwards;
		animation-delay: 0.8s;
	}

	@keyframes badgePop {
		from {
			opacity: 0;
			transform: translate(-50%, -50%) scale(0);
		}
		to {
			opacity: 1;
			transform: translate(-50%, -50%) scale(1);
		}
	}

	/* Button node styling orbiting the core map visual */
	.node-btn {
		position: absolute;
		padding: 9px 20px;
		border-radius: 30px;
		border: 2px white solid;
		color: white;
		font-size: 20px;
		background: transparent;
		transform: translate(-50%, -50%);
		z-index: 5;
		opacity: 0;
	}
	.instruction-btn {
		left: 437px;
		top: 110px;
	}
	.research-btn {
		left: 754px;
		top: 375px;
	}
	.extension-btn {
		left: 120px;
		top: 375px;
	}
	.compliance-btn {
		left: 437px;
		top: 640px;
	}
	.qc-visualizer.animate .node-btn {
		animation: nodePop 0.25s ease-out forwards;
	}
	.qc-visualizer.animate .instruction-btn {
		animation-delay: 1.55s;
	}
	.qc-visualizer.animate .research-btn {
		animation-delay: 1.85s;
	}
	.qc-visualizer.animate .extension-btn {
		animation-delay: 2.15s;
	}
	.qc-visualizer.animate .compliance-btn {
		animation-delay: 2.45s;
	}

	@keyframes nodePop {
		from {
			opacity: 0;
			transform: translate(-50%, -50%) scale(0);
		}
		to {
			opacity: 1;
			transform: translate(-50%, -50%) scale(1);
		}
	}

	/* Connector line segments — grow from center outward */
	.line-top {
		position: absolute;
		left: 437px;
		top: 141px;
		width: 2px;
		height: 234px;
		background: #fac549;
		transform-origin: bottom center;
		transform: translate(-50%, 0) scaleY(0);
		z-index: 2;
	}
	.line-right {
		position: absolute;
		left: 437px;
		top: 375px;
		width: 240.5px;
		height: 2px;
		background: #fac549;
		transform-origin: left center;
		transform: translate(0, -50%) scaleX(0);
		z-index: 2;
	}
	.line-left {
		position: absolute;
		left: 196.5px;
		top: 375px;
		width: 240.5px;
		height: 2px;
		background: #fac549;
		transform-origin: right center;
		transform: translate(0, -50%) scaleX(0);
		z-index: 2;
	}
	.line-bottom {
		position: absolute;
		left: 437px;
		top: 375px;
		width: 2px;
		height: 234px;
		background: #fac549;
		transform-origin: top center;
		transform: translate(-50%, 0) scaleY(0);
		z-index: 2;
	}
	.qc-visualizer.animate .line-top {
		animation: lineGrowV 0.3s linear forwards;
		animation-delay: 1.2s;
	}
	.qc-visualizer.animate .line-right {
		animation: lineGrowH 0.3s linear forwards;
		animation-delay: 1.5s;
	}
	.qc-visualizer.animate .line-left {
		animation: lineGrowH 0.3s linear forwards;
		animation-delay: 1.8s;
	}
	.qc-visualizer.animate .line-bottom {
		animation: lineGrowV 0.3s linear forwards;
		animation-delay: 2.1s;
	}

	@keyframes lineGrowV {
		to {
			transform: translate(-50%, 0) scaleY(1);
		}
	}
	@keyframes lineGrowH {
		to {
			transform: translate(0, -50%) scaleX(1);
		}
	}

	/* Gold dots at outer ellipse intersections */
	.gold-dot {
		position: absolute;
		width: 8px;
		height: 8px;
		background: #fac549;
		border-radius: 50%;
		transform: translate(-50%, -50%);
		z-index: 3;
		opacity: 0;
	}
	.dot-top {
		left: 437px;
		top: 141px;
	}
	.dot-right {
		left: 677.5px;
		top: 375px;
	}
	.dot-left {
		left: 196.5px;
		top: 375px;
	}
	.dot-bottom {
		left: 437px;
		top: 609px;
	}
	.qc-visualizer.animate .gold-dot {
		animation: dotPop 0.2s linear forwards;
	}
	.qc-visualizer.animate .dot-top {
		animation-delay: 1.5s;
	}
	.qc-visualizer.animate .dot-right {
		animation-delay: 1.8s;
	}
	.qc-visualizer.animate .dot-left {
		animation-delay: 2.1s;
	}
	.qc-visualizer.animate .dot-bottom {
		animation-delay: 2.4s;
	}

	@keyframes dotPop {
		from {
			opacity: 0;
			transform: translate(-50%, -50%) scale(0);
		}
		to {
			opacity: 1;
			transform: translate(-50%, -50%) scale(1);
		}
	}

	/* Grid blocks targets styling right panel */
	/* Container for the right column text block */
	.goals-content {
		width: 100%;
		max-width: 720px;
	}

	/* Big Gold Header Title */
	.goals-title {
		font-family: 'Overpass', sans-serif;
		color: #fac549;
		font-size: 120px;
		font-weight: 700;
		margin: 0 0 40px 0;
		text-align: left; /* Shifted left to match the design file layout */
	}

	/* Card layout grid engine */
	.goals-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 30px; /* Space between rows and columns */
		width: 100%;
	}

	/* Individual Card Styling */
	.goal-card {
		width: 338.79px;
		height: 171px;
		background: linear-gradient(137deg, #921518 0%, #6d1719 100%);
		border-radius: 15px;
		padding: 20px;
		box-sizing: border-box;

		/* Flexbox automatically keeps text inside card boundaries */
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	/* Keeps the gold numbers at the top-left of each card */
	.goal-header {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.goal-num {
		font-family: 'Overpass', sans-serif;
		color: #fac549;
		font-size: 30px;
		font-weight: 500;
		line-height: 1;
	}

	/* White goal descriptions at the bottom-right of each card */
	.goal-text {
		color: #ffffff;
		font-family: 'Inter', sans-serif;
		font-size: 20px;
		font-weight: 500;
		line-height: 1.3;
		text-align: right;
		margin: 0;
		word-wrap: break-word;
	}

	/* Shared Inline Vector Icons Standard Controls */

	.section-5 {
		width: 1920px;
		height: 1596px;
		position: relative;
		overflow: hidden;
		margin: 0 auto;
	}

	/* Consolidated Base Styling for Background Rectangles */
	.bg-rect {
		position: absolute;
		width: var(--w);
		height: var(--h);
		left: var(--x);
		top: var(--y);
		opacity: var(--op, 1);
		filter: blur(var(--blur, 0px));
		box-shadow: var(--shadow, 0px) var(--shadow, 0px) var(--shadow, 0px) rgba(0, 0, 0, 0.15);
		background: linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), #941518;
	}

	/* Typography & Content Positioning */
	.subtitle-top {
		position: absolute;
		width: 690px;
		left: 615px;
		top: 35px;
		margin: 0;
		text-align: center;
		color: #000000;
		font:
			italic 400 64px/1.2 'Inter',
			sans-serif;
	}

	.main-title {
		position: absolute;
		width: 1158px;
		left: 381px;
		top: 203px;
		margin: 0;
		text-align: center;
		color: #f5be42;
		font:
			700 160px/160px 'Overpass',
			sans-serif;
		word-wrap: break-word;
	}

	.subtitle-bottom {
		position: absolute;
		width: 1007px;
		left: 501px;
		top: 552px;
		margin: 0;
		text-align: center;
		color: #000000;
		font:
			italic 400 64px/1.2 'Inter',
			sans-serif;
	}

	.description {
		position: absolute;
		width: 1307px;
		left: 301px;
		top: 830px;
		margin: 0;
		text-align: center;
		color: #000000;
		font:
			400 52px/1.4 'Inter',
			sans-serif;
		text-shadow: 0px 4px 4px rgba(255, 251, 251, 0.25);
	}

	/* Call to Action Button */
	.btn-pup {
		position: absolute;
		left: 675px;
		top: 1239px;
		width: 569px;
		height: 127px;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		border-radius: 20px;
		outline: 6px #901518 solid;
		outline-offset: -6px;
		text-decoration: none;
		color: #921518;
		font:
			400 40px 'Inter',
			sans-serif;
		transition:
			background-color 0.2s ease,
			color 0.2s ease;
	}

	.btn-pup:hover {
		background-color: #901518;
		color: #ffffff;
	}

	/* ---- Responsive Breakpoints ---- */

	/* ≤1400px — shrink large elements, stack MV cards */
	@media (max-width: 1400px) {
		.about-section {
			padding: 40px 60px;
		}
		.intro-container {
			grid-template-columns: 1fr;
			gap: 30px;
		}
		.intro-image {
			width: 100%;
			max-width: 400px;
			height: auto;
			aspect-ratio: 634/854;
			margin: 0 auto;
		}
		.intro-text {
			align-items: center;
		}
		.intro-text p {
			font-size: 22px;
			line-height: 32px;
			text-align: center;
			max-width: 100%;
			margin: 0;
		}
		.mv-container {
			justify-content: center;
			flex-direction: column;
			align-items: center;
			gap: 24px;
		}
		.mv-container .mv-card:nth-child(1),
		.mv-container .mv-card:nth-child(2) {
			width: 100%;
			max-width: 600px;
		}
		.mv-card h3 {
			font-size: 48px;
		}
		.mv-card p {
			font-size: 18px;
		}
		.stat-number {
			font-size: 56px;
		}
		.stat-card {
			width: 220px;
		}
		.goals-section {
			flex-direction: column;
			align-items: center;
		}
		.goals-title {
			font-size: 80px;
			text-align: center;
		}
		.goal-card {
			width: 100%;
			height: 150px;
		}
		.qc-visualizer {
			width: 640px;
			height: 580px;
			flex-shrink: 0;
		}
	}

	/* ≤1200px — tablets / small desktops */
	@media (max-width: 1200px) {
		:global(.bsit-card),
		:global(.innovation-card),
		:global(.years-card),
		:global(.objectives-card) {
			grid-column: span 12;
		}
		.obj-grid {
			grid-template-columns: 1fr;
		}
		.about-section {
			padding: 30px 40px;
		}
		.stats-banner {
			flex-wrap: wrap;
			gap: 30px;
			padding: 40px 30px;
		}
		.stat-card {
			width: 200px;
		}
		.stat-number {
			font-size: 48px;
		}
		.qc-visualizer {
			width: 520px;
			height: 450px;
		}
		.goals-title {
			font-size: 64px;
		}
		.goal-card {
			height: 140px;
		}
	}

	/* ≤1024px — tablets */
	@media (max-width: 1024px) {
		.leadership-container {
			grid-template-columns: 1fr;
		}
		.leader-pane {
			min-height: 800px;
			padding: 3rem 2rem;
		}
		.quote {
			max-width: 100%;
		}
		.dustin-img,
		.melvin-img {
			left: 50%;
			transform: translateX(-50%);
			max-height: 60%;
		}
		.about-section {
			padding: 24px 24px;
		}
		.intro-text p {
			font-size: 20px;
			line-height: 28px;
		}
		.mv-card h3 {
			font-size: 36px;
		}
		.mv-card p {
			font-size: 16px;
		}
		.mv-card {
			padding: 24px;
		}
		.stats-banner {
			gap: 20px;
			padding: 30px 20px;
		}
		.stat-card {
			width: 160px;
		}
		.stat-number {
			font-size: 40px;
		}
		.stat-label {
			font-size: 18px;
		}
		.qc-visualizer {
			width: 480px;
			height: 420px;
		}
		.goals-title {
			font-size: 52px;
		}
		.goal-card {
			height: 130px;
		}
		.goal-text {
			font-size: 16px;
		}
		.bsit-title {
			font-size: 48px;
		}
		.innovation-heading {
			font-size: 24px;
		}
		.years-header .number {
			font-size: 60px;
		}
		.years-header .text {
			font-size: 36px;
		}
	}

	/* ≤768px — large phones */
	@media (max-width: 768px) {
		.welcome-container {
			gap: 1rem;
			padding: 2rem 1rem;
		}
		.about-section {
			padding: 16px 16px;
		}
		.about-title {
			font-size: 20px;
			letter-spacing: 4px;
		}
		.intro-image {
			max-width: 240px;
		}
		.intro-text p {
			font-size: 16px;
			line-height: 24px;
		}
		.mv-card {
			padding: 16px;
		}
		.mv-card h3 {
			font-size: 28px;
		}
		.about-header {
			gap: 10px;
		}
		.stats-banner {
			flex-direction: column;
			align-items: center;
			gap: 24px;
			padding: 24px 16px;
		}
		.stat-card {
			width: 100%;
			max-width: 240px;
		}
		.stat-number {
			font-size: 36px;
		}
		.stat-label {
			font-size: 16px;
		}
		.leadership-container {
			min-height: auto;
		}
		.leader-pane {
			padding: 2rem 1.5rem;
			min-height: 600px;
		}
		.profile-img {
			max-height: 70%;
		}
		.profile-info h3 {
			font-size: clamp(1.2rem, 5vw, 1.8rem);
		}
		.profile-info p {
			font-size: clamp(0.9rem, 3vw, 1.2rem);
		}
		.qc-visualizer {
			width: 100%;
			max-width: 400px;
			height: 350px;
		}
		.goals-title {
			font-size: 36px;
			margin-bottom: 20px;
		}
		.goals-grid {
			gap: 16px;
		}
		.goal-card {
			width: 100%;
			height: 120px;
			padding: 14px;
		}
		.goal-num {
			font-size: 22px;
		}
		.goal-text {
			font-size: 14px;
		}
		.quick-links {
			height: 300px;
		}
		.bento-section {
			padding: 2rem 1rem;
		}
		.bsit-title {
			font-size: 36px;
			margin-top: 0;
		}
		.bsit-subtitle {
			font-size: 16px;
		}
		.innovation-heading {
			font-size: 20px;
		}
		.years-header .number {
			font-size: 48px;
		}
		.years-header .text {
			font-size: 28px;
		}
		.years-desc {
			font-size: 14px;
		}
		:global(.bsit-card),
		:global(.innovation-card),
		:global(.years-card),
		:global(.objectives-card) {
			padding: 20px;
		}
	}

	/* ≤480px — small phones */
	@media (max-width: 480px) {
		.about-section {
			padding: 12px 12px;
		}
		.intro-image {
			max-width: 180px;
		}
		.intro-text p {
			font-size: 14px;
			line-height: 20px;
		}
		.mv-card {
			padding: 12px;
		}
		.mv-card h3 {
			font-size: 22px;
		}
		.about-title {
			font-size: 16px;
			letter-spacing: 2px;
		}
		.stat-number {
			font-size: 28px;
		}
		.stat-label {
			font-size: 14px;
		}
		.goals-title {
			font-size: 28px;
		}
		.goal-card {
			height: 100px;
			padding: 10px;
		}
		.goal-num {
			font-size: 18px;
		}
		.goal-text {
			font-size: 12px;
		}
		.qc-visualizer {
			width: 100%;
			max-width: 320px;
			height: 280px;
		}
		.bsit-title {
			font-size: 28px;
		}
		.quick-links {
			height: auto;
			flex-wrap: wrap;
		}
		.quick-links .panel {
			min-width: 50%;
			min-height: 140px;
		}
		.leader-pane {
			padding: 1.5rem 1rem;
			min-height: 500px;
		}
		.profile-img {
			max-height: 65%;
		}
	}
</style>

