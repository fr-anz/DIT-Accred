<script>
	import Card from '$lib/components/Card.svelte';
	import { Handshake, GraduationCap, CirclePile } from 'lucide-svelte';

	let videoUrl = 'https://www.w3schools.com/html/mov_bbb.mp4';
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
		font-family: 'Overpass', sans-serif;
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

	/* media query */
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
</style>
