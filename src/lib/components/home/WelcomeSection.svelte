<section class="welcome-container">
	<div class="line"></div>

	<h1 class="welcome-text">
		WELCOME AACCUP<br />
		ACCREDITORS
	</h1>

	<div class="line"></div>
</section>

<style>
	.welcome-container {
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		gap: clamp(1rem, 3vw, 2rem);
		width: 100%;
		margin: 0 auto var(--section-space) auto;
		padding: var(--section-space) var(--page-pad);
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

	@media (max-width: 768px) {
		.welcome-container {
			gap: 1rem;
			padding: 2rem 1rem;
		}
	}
</style>
