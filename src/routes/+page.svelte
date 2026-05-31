<script>
	import Card from '$lib/components/Card.svelte';
	import { Handshake, GraduationCap, CirclePile } from 'lucide-svelte';
	import { sections } from '$lib/data/homeData';

	let videoUrl = 'https://www.w3schools.com/html/mov_bbb.mp4';
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

<section class="goals-wrapper">
	<div class="radial-hub dark-bg">
		<div class="circle circle-lg"></div>
		<div class="circle circle-md"></div>
		<div class="circle circle-sm"></div>

		<div class="node node-top">Instruction</div>
		<div class="node node-bottom">Compliance</div>
		<div class="node node-left">Extension</div>
		<div class="node node-right">Research</div>

		<div class="hub-center gold-bg">
			<span>Quality Control</span>
		</div>
	</div>

	<div class="goals-container">
		<h2 class="goals-title">DIT GOALS</h2>

		<div class="goals-grid">
			<div class="goal-card maroon-bg">
				<span class="goal-num">01</span>
				<p class="goal-text">Strengthen Academic<br />Excellence</p>
			</div>
			<div class="goal-card maroon-bg">
				<span class="goal-num">02</span>
				<p class="goal-text">Advance Research<br />and Innovation</p>
			</div>
			<div class="goal-card maroon-bg">
				<span class="goal-num">03</span>
				<p class="goal-text">Enhance Faculty Excellence<br />and Engagement</p>
			</div>
			<div class="goal-card maroon-bg">
				<span class="goal-num">04</span>
				<p class="goal-text">Expand Outreach<br />Programs</p>
			</div>
			<div class="goal-card maroon-bg">
				<span class="goal-num">05</span>
				<p class="goal-text">Foster Active Student<br />Involvement and Engagement</p>
			</div>
			<div class="goal-card maroon-bg">
				<span class="goal-num">06</span>
				<p class="goal-text">Nurture Strong<br />Relationships</p>
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

		margin: 0 auto;
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

	/* DIT GOALS */

	.goals-wrapper {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3rem;
		width: 100%;
		max-width: 1600px;
		margin: 0 auto;
		padding: 4rem 2rem;
		box-sizing: border-box;
	}

	/* --- LEFT SIDE: Radial Diagram --- */
	.radial-hub {
		position: relative;
		border-radius: 30px;
		min-height: 700px;
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;
	}

	.dark-bg {
		background: linear-gradient(148deg, #451516 0%, #1a1614 64%, #392e1f 100%);
	}

	.circle {
		position: absolute;
		border-radius: 50%;
		border: 1px solid rgba(255, 255, 255, 0.5);
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.circle-lg {
		width: 60%;
		height: 60%;
		aspect-ratio: 1;
	}
	.circle-md {
		width: 40%;
		height: 40%;
		aspect-ratio: 1;
	}
	.circle-sm {
		width: 20%;
		height: 20%;
		aspect-ratio: 1;
	}

	.node {
		position: absolute;
		border-radius: 30px;
		outline: 2px solid white;
		outline-offset: -2px;
		padding: 10px 24px;
		color: white;
		font-family: 'Inter', sans-serif;
		font-size: 20px;
		background-color: rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(4px);
	}
	.node-top {
		top: 10%;
		left: 50%;
		transform: translateX(-50%);
	}
	.node-bottom {
		bottom: 10%;
		left: 50%;
		transform: translateX(-50%);
	}
	.node-left {
		left: 5%;
		top: 50%;
		transform: translateY(-50%);
	}
	.node-right {
		right: 5%;
		top: 50%;
		transform: translateY(-50%);
	}

	.hub-center {
		position: absolute;
		z-index: 10;
		padding: 12px 32px;
		border-radius: 30px;
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
	}
	.gold-bg {
		background: linear-gradient(90deg, #cfa83a 0%, #ce870c 100%);
	}
	.hub-center span {
		color: #b30e12;
		font-family: 'Overpass', sans-serif;
		font-size: 28px;
		font-weight: 700;
	}

	/* --- RIGHT SIDE: Goals Grid --- */
	.goals-container {
		display: flex;
		flex-direction: column;
	}

	.goals-title {
		color: #fac549;
		font-family: 'Overpass', sans-serif;
		font-size: clamp(60px, 6vw, 100px); /* Responsive title size */
		font-weight: 700;
		text-align: center;
		margin: 0 0 2rem 0;
		line-height: 1;
	}

	.goals-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
		flex-grow: 1;
	}

	/* Individual Goal Cards */
	.goal-card {
		border-radius: 15px;
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		min-height: 160px;
	}
	.maroon-bg {
		background: linear-gradient(137deg, #921518 0%, #6d1719 100%);
	}

	.goal-num {
		color: #fac549;
		font-family: 'Overpass', sans-serif;
		font-size: 30px;
		font-weight: 500;
	}

	.goal-text {
		color: white;
		font-family: 'Inter', sans-serif;
		font-size: 18px; /* Slightly scaled down from 20px for better fit */
		font-weight: 500;
		text-align: right;
		margin: 0;
		line-height: 1.3;
	}

	.quick-links {
		display: flex;
		width: 100%;
		height: 480px;
		overflow: hidden;
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
		justify-content: flex-end;
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

	/* media query */
	@media (max-width: 1200px) {
		.goals-wrapper {
			grid-template-columns: 1fr; /* Stacks the diagram above the goals on laptops/tablets */
			gap: 4rem;
		}

		.radial-hub {
			min-height: 600px;
		}

		:global(.bsit-card),
		:global(.innovation-card),
		:global(.years-card),
		:global(.objectives-card) {
			grid-column: span 12;
		}

		.obj-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 768px) {
		.welcome-container {
			gap: 1rem;
		}
	}

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
	}
</style>
