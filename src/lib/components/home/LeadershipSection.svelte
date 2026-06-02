<script>
	const quote = {
		lead: 'True to the PUP tradition of producing ',
		highlightOne: 'Iskolar para sa Bayan',
		middle:
			', the program nurtures not only technical competence but also discipline, leadership, creativity, and a deep sense of public service.',
		highlightTwo: ' innovators and problem-solvers',
		end: ' who will contribute meaningful solutions to communities, industries, and the country.'
	};
</script>

<section class="leadership-container">
	<div class="leader-pane dark-bg">
		<p class="quote align-right">
			<span class="text-white">{quote.lead}</span>
			<span class="highlight">{quote.highlightOne}</span>
			<span class="text-white">{quote.middle}<br /><br />Our students are challenged to become</span
			>
			<span class="highlight">{quote.highlightTwo}</span>
			<span class="text-white">{quote.end}</span>
		</p>

		<img class="profile-img dustin-img" src="/img/sir-dustin.png" alt="John Dustin Santos" />

		<div class="profile-info align-left">
			<h3>John Dustin Santos, MIT</h3>
			<p>Chairperson of Department of Information Technology</p>
		</div>
	</div>

	<div class="leader-pane maroon-bg">
		<p class="quote align-left">
			<span class="text-white">{quote.lead}</span>
			<span class="highlight">{quote.highlightOne}</span>
			<span class="text-white">{quote.middle}<br /><br />Our students are challenged to become</span
			>
			<span class="highlight">{quote.highlightTwo}</span>
			<span class="text-white">{quote.end}</span>
		</p>

		<img class="bg-vector" src="/img/image.svg" alt="" aria-hidden="true" />
		<img class="profile-img melvin-img" src="/img/sir-melvin-fade-1.png" alt="Melvin C. Roxas" />

		<div class="profile-info align-right">
			<h3>Melvin C. Roxas, MSGITS</h3>
			<p>Dean of College of Computer Information and Sciences</p>
		</div>
	</div>
</section>

<style>
	.leadership-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		width: 100%;
		min-height: clamp(720px, 70vw, 950px);
		margin-bottom: var(--section-space);
	}

	.leader-pane {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: clamp(2rem, 5vw, 5rem) clamp(1.5rem, 4vw, 4rem);
		overflow: hidden;
	}

	.dark-bg {
		background: linear-gradient(155deg, #451516 0%, #1a1614 64%, #392e1f 100%);
	}

	.maroon-bg {
		background: linear-gradient(116deg, #921518 0%, #6d1719 100%);
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

	.align-left {
		align-self: flex-start;
		text-align: left;
	}

	.align-right {
		align-self: flex-end;
		text-align: right;
	}

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

	@media (max-width: 1024px) {
		.leadership-container {
			grid-template-columns: 1fr;
		}

		.leader-pane {
			min-height: 760px;
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

	@media (max-width: 768px) {
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
	}

	@media (max-width: 480px) {
		.leader-pane {
			padding: 1.5rem 1rem;
			min-height: 500px;
		}

		.profile-img {
			max-height: 65%;
		}
	}
</style>
