<script>
	import Card from '$lib/components/Card.svelte';
	import { Handshake, GraduationCap, CirclePile } from 'lucide-svelte';

	let videoUrl = 'https://www.w3schools.com/html/mov_bbb.mp4';

	const sections = [
		{
			id: 'research',
			image: '$lib/assets/nav-images/research.jpeg',
			title: 'Research',
			subtitle: 'Innovating the future.',
			titleStyle: 'left: 42px; top: 451px; width: 235px; height: 51.82px;',
			subtitleStyle: 'left: 74px; top: 670px; width: 172px; height: 68px;',
			imageStyle: 'left: 0px;'
		},
		{
			id: 'teaching-learning',
			image: '$lib/assets/nav-images/teaching-learning.jpg',
			title: 'Teaching & Learning',
			subtitle: 'Knowledge into practice.',
			titleStyle: 'left: 350px; top: 421px; width: 260px; height: 103.63px;',
			subtitleStyle: 'left: 383px; top: 669px; width: 194px; height: 75px;',
			imageStyle: 'left: 320px;'
		},
		{
			id: 'community',
			image: '$lib/assets/nav-images/community.JPG',
			title: 'Community',
			subtitle: 'Technology for everyone.',
			titleStyle: 'left: 663px; top: 446px; width: 273px; height: 51.82px;',
			subtitleStyle: 'left: 703px; top: 666px; width: 194px; height: 75px;',
			imageStyle: 'left: 640px;'
		},
		{
			id: 'internationalization',
			image: '$lib/assets/nav-images/internationalization.JPG',
			title: 'Internationalization',
			subtitle: 'Interlinked global minds.',
			titleStyle: 'left: 983px; top: 429px; width: 273px; height: 95.99px;',
			subtitleStyle: 'left: 1023px; top: 666px; width: 194px; height: 75px;',
			imageStyle: 'left: 960px;'
		},
		{
			id: 'planning',
			image: '$lib/assets/nav-images/planning.jpeg',
			title: 'Planning & Quality Assurance',
			subtitle: 'Excellence by design.',
			titleStyle: 'left: 1316px; top: 393px; width: 273px; height: 183px;',
			subtitleStyle: 'left: 1356px; top: 666px; width: 194px; height: 75px;',
			imageStyle: 'left: 1280px;'
		},
		{
			id: 'compliance',
			image: '$lib/assets/nav-images/compliance.jpeg',
			title: 'Compliance',
			subtitle: 'Standards you trust.',
			titleStyle: 'left: 1623px; top: 451px; width: 273px; height: 51.82px;',
			subtitleStyle: 'left: 1663px; top: 666px; width: 194px; height: 75px;',
			imageStyle: 'left: 1600px;'
		}
	];
</script>

<header class="video-container">
	<video src={videoUrl} autoplay loop muted playsinline class="video-home"></video>
</header>

<section class="bento-section">
	<div class="bento-grid">
		<Card class="bsit-card" variant="maroon" size="md">
			<h1>BSIT</h1>
			<h2>Bachelor of Science in Information Technology</h2>
			<p>
				The Bachelor of Science in Information Technology (BSIT) program is a four-year degree
				program which focuses on the study of computer utilization and computer software to plan,
				install, customize, operate, manage, administer and maintain information technology
				infrastructure
			</p>
		</Card>

		<Card class="innovation-card" variant="dark" size="md">
			<h2>Innovation. Excellence. Future Ready</h2>
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
			<p>of Department’s existence.<br />Coding the <strong>PUP Spirit since 1979</strong></p>
		</Card>

		<Card class="objectives-card" variant="gold" size="md">
			<div class="obj-header">
				<h2>Program Educational Objectives</h2>
				<p>
					Within 3–5 years of graduation, Bachelor of Science in Information Technology graduates
					are expected to:
				</p>
			</div>
			<div class="obj-grid">
				<Card class="obj-subcard" variant="maroon" size="sm">
					<span class="obj-num">01</span>
					<h3>Professional IT Practice</h3>
				</Card>
				<Card class="obj-subcard" variant="maroon" size="sm">
					<span class="obj-num">02</span>
					<h3>Innovation & Ethical Contributions</h3>
				</Card>
				<Card class="obj-subcard" variant="maroon" size="sm">
					<span class="obj-num">03</span>
					<h3>Career Advancement & Lifelong Growth</h3>
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
		<img class="panel-image" style={section.imageStyle} src={section.image} alt={section.title} />
		<div class="panel-title" style={section.titleStyle}>
			<span>{section.title}</span>
		</div>
		<div class="panel-subtitle" style={section.subtitleStyle}>
			<span>{section.subtitle}</span>
		</div>
	{/each}
</section>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: 'Inter', 'Overpass', sans-serif;
	}

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
	:global(.bsit-card) h1 {
		font-size: 72px;
		font-weight: 700;
		letter-spacing: 4px;
		margin: 0;
		margin-top: -50px;
	}
	:global(.bsit-card) h2 {
		margin: -5px 0 20px 0;
		font-size: 20px;
		font-style: italic;
		color: #cfa83a;
		font-weight: 600;
	}
	:global(.bsit-card) p {
		font-size: 16px;
		text-align: justify;
		line-height: 1.6;
		margin: 0;
	}

	/* --- Box 2: Innovation --- */
	:global(.innovation-card) h2 {
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
	:global(.years-card) p {
		font-size: 18px;
		margin: 0;
		line-height: 1.5;
	}

	/* --- Box 4: Objectives --- */
	.obj-header h2 {
		font-size: 32px;
		font-weight: 700;
		color: #000;
		margin: 0 0 10px 0;
	}
	.obj-header p {
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
	:global(.obj-subcard) .obj-num {
		font-size: 16px;
		opacity: 0.8;
	}
	:global(.obj-subcard) h3 {
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

	/* quick links */
	.quick-links {
		width: 1920px;
		height: 1151px;
		position: relative;
	}

	.panel-image {
		width: 320px;
		height: 1151px;
		top: 0px;
		position: absolute;
		object-fit: cover;
		/* fallback bg matches original gradient overlay on #941518 */
		background:
			linear-gradient(180deg, rgba(102, 102, 102, 0) 0%, rgba(0, 0, 0, 0.5) 100%), #941518;
	}

	.panel-title {
		position: absolute;
		text-align: center;
	}

	.panel-title span {
		color: white;
		font-size: 48px;
		font-family: Overpass, sans-serif;
		font-weight: 800;
		word-wrap: break-word;
	}

	.panel-subtitle {
		position: absolute;
		text-align: center;
	}

	.panel-subtitle span {
		color: white;
		font-size: 28px;
		font-family: Inter, sans-serif;
		font-weight: 400;
		word-wrap: break-word;
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
	}

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
