<script>
	const leaders = [
		{
			id: 'melvin',
			name: 'Melvin C. Roxas, MSGITS',
			role: 'Dean of College of Computer Information and Sciences',
			img: '/img/sir-melvin.png',
			position: 'center center',
			align: 'right',
			roleMaxWidth: '290px'
		},

		{
			id: 'dustin',
			name: 'John Dustin Santos, MIT',
			role: 'Chairperson of Department of Information Technology',
			img: '/img/sir-dustin.jpg',
			position: 'center center',
			align: 'left',
			roleMaxWidth: '260px'
		}
	];

	const detailContent = {
		heading: 'Excellence in Every Byte',
		paragraphs: [
			'Welcome to the Bachelor of Science in Information Technology program of our Sintang Paaralan, Polytechnic University of the Philippines, where education is empowered by excellence, innovation, and service to the nation.',
			'The BSIT program is committed to developing competent, adaptive, and socially responsible technology professionals equipped with the knowledge and practical skills needed in today’s rapidly evolving digital world. Through quality instruction, relevant training, hands-on experiences, and industry-aligned learning, students are prepared in the fields of software development, networking, database systems, cybersecurity, systems analysis, and emerging technologies.',
			'True to the PUP tradition of producing Iskolar para sa Bayan, the program nurtures not only technical competence but also discipline, leadership, creativity, and a deep sense of public service. Our students are challenged to become innovators and problem-solvers who will contribute meaningful solutions to communities, industries, and the country.',
			'As you begin your journey with us, we welcome you to a community that values perseverance, excellence, and lifelong learning.'
		],
		highlights: {
			program: 'Bachelor of Science in Information Technology',
			bayan: 'Iskolar para sa Bayan',
			innovators: 'innovators and problem-solvers'
		},
		closing: 'Mula Sa’Yo, Para sa BAYAN'
	};

	/** @type {string | null} */
	let activeLeader = $state(null);

	/** @type {string | null} */
	let closingLeader = $state(null);

	let isClosing = $state(false);
	let shouldFocusClose = $state(false);
	let closeTimer = $state(0);

	/** @type {HTMLButtonElement | null} */
	let closeBtnEl = $state(null);

	const activeLeaderData = $derived(
		activeLeader ? (leaders.find((l) => l.id === activeLeader) ?? null) : null
	);

	const closingLeaderData = $derived(
		closingLeader ? (leaders.find((l) => l.id === closingLeader) ?? null) : null
	);

	const displayedLeaderData = $derived(activeLeaderData ?? closingLeaderData);

	/* Deterministic binary rows -- avoids SSR hydration mismatch */
	const binaryLayerA = [
		'0110100110101101001011010010110100101101001011010010110100101101001011010010110100101101',
		'1001011001010010110100101101001011010010110100101101001011010010110100101101001011010010',
		'0011001100110011001100110011001100110011001100110011001100110011001100110011001100110011',
		'1100110011001100110011001100110011001100110011001100110011001100110011001100110011001100',
		'0101010101010101010101010101010101010101010101010101010101010101010101010101010101010101',
		'1010101010101010101010101010101010101010101010101010101010101010101010101010101010101010',
		'0110011001100110011001100110011001100110011001100110011001100110011001100110011001100110',
		'1001100110011001100110011001100110011001100110011001100110011001100110011001100110011001'
	];

	const binaryLayerB = binaryLayerA.slice().reverse();
	const panelCloseDuration = 220;

	

	/**
	 * @param {string} id
	 * @param {'hover' | 'keyboard'} source
	 */
	function openLeader(id, source = 'hover') {
		if (isClosing) return;
		window.clearTimeout(closeTimer);
		closingLeader = null;
		shouldFocusClose = source === 'keyboard';
		activeLeader = id;
	}

	function closeDetail() {
		if (!activeLeader || isClosing) return;
		window.clearTimeout(closeTimer);
		closingLeader = activeLeader;
		activeLeader = null;
		shouldFocusClose = false;
		isClosing = true;

		const duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches
			? 0
			: panelCloseDuration;

		closeTimer = window.setTimeout(() => {
			closingLeader = null;
			isClosing = false;
		}, duration);
	}

	/* Focus close button only for click/keyboard activation, not hover activation. */
	$effect(() => {
		if (activeLeaderData && closeBtnEl && shouldFocusClose) {
			closeBtnEl.focus();
		}
	});
</script>

<section class="leadership-section" aria-label="Leadership">
	<!-- Binary background flowing downward -->
	<div class="binary-bg" aria-hidden="true">
		<div class="binary-layer">
			{#each binaryLayerA as row}
				<span class="binary-row">{row}</span>
			{/each}
			{#each binaryLayerA as row}
				<span class="binary-row">{row}</span>
			{/each}
		</div>
		<div class="binary-layer">
			{#each binaryLayerB as row}
				<span class="binary-row">{row}</span>
			{/each}
			{#each binaryLayerB as row}
				<span class="binary-row">{row}</span>
			{/each}
		</div>
	</div>

	<!-- Dotted grid texture -->
	<div class="dotted-grid" aria-hidden="true"></div>

	<!-- Decorative quote marks -->
	<span class="quote-mark quote-mark-top" aria-hidden="true">&rdquo;&rdquo;</span>
	<span class="quote-mark quote-mark-bottom" aria-hidden="true">&rdquo;&rdquo;</span>

	{#if displayedLeaderData}
		<!-- Expanded detail panel -->
		<div
			class="expanded-panel"
			class:is-closing={isClosing}
			role="dialog"
			tabindex="-1"
			aria-label="{displayedLeaderData.name} detail"
		
		>
			<button
				class="expanded-close"
				onclick={closeDetail}
				aria-label="Close leadership detail"
				bind:this={closeBtnEl}
			>
				&times;
			</button>

			<div
				class="expanded-media"
				style="background-image: url({displayedLeaderData.img}); --expanded-position: {displayedLeaderData.position}"
			>
				<div class="expanded-leader-info">
					<h3>{displayedLeaderData.name}</h3>
					<p>{displayedLeaderData.role}</p>
				</div>
			</div>

			<div class="expanded-copy">
				<h2>{detailContent.heading}</h2>
				<p>
					{detailContent.paragraphs[0].split(detailContent.highlights.program)[0]}
					<span class="highlight-red">{detailContent.highlights.program}</span>
					{detailContent.paragraphs[0].split(detailContent.highlights.program)[1]}
				</p>
				<p>{detailContent.paragraphs[1]}</p>
				<p>
					{detailContent.paragraphs[2].split(detailContent.highlights.bayan)[0]}
					<span class="highlight-red">{detailContent.highlights.bayan}</span>
					{detailContent.paragraphs[2]
						.split(detailContent.highlights.bayan)[1]
						.split(detailContent.highlights.innovators)[0]}
					<span class="highlight-red">{detailContent.highlights.innovators}</span>
					{detailContent.paragraphs[2].split(detailContent.highlights.innovators)[1]}
				</p>
				<p>{detailContent.paragraphs[3]}</p>
				<p class="closing-line">
					<span class="highlight-gold">{detailContent.closing}</span>
				</p>
			</div>
		</div>
	{:else if !isClosing}
		<!-- Profile cards (default state) -->
		<div class="cards-container">
			{#each leaders as leader}
				<button
					class="leader-card"
					class:align-right={leader.align === 'right'}
					style="--card-position: {leader.position}; --role-max-width: {leader.roleMaxWidth}"
					onclick={() => openLeader(leader.id, 'keyboard')}
					aria-label="{leader.name}, {leader.role}"
				>
					<div class="card-bg" style="background-image: url({leader.img})"></div>
					<div class="card-gradient"></div>
					<div class="card-info">
						<h3>{leader.name}</h3>
						<p>{leader.role}</p>
					</div>
				</button>
			{/each}
		</div>
	{/if}
</section>

<style>
	.leadership-section {
		position: relative;
		width: 100%;
		min-height: clamp(720px, 70vw, 950px);
		display: flex;
		align-items: center;
		justify-content: center;
		background: linear-gradient(160deg, #2d1010 0%, #190f0f 45%, #160b0b 100%);
		overflow: hidden;
		margin-bottom: var(--section-space);
	}

	/* Warm radial glows */
	.leadership-section::before {
		content: '';
		position: absolute;
		top: -20%;
		left: -10%;
		width: 60%;
		height: 60%;
		background: radial-gradient(ellipse at center, rgba(140, 35, 35, 0.18), transparent 70%);
		pointer-events: none;
		z-index: 0;
	}

	.leadership-section::after {
		content: '';
		position: absolute;
		bottom: -15%;
		right: -10%;
		width: 55%;
		height: 55%;
		background: radial-gradient(ellipse at center, rgba(180, 135, 45, 0.13), transparent 70%);
		pointer-events: none;
		z-index: 0;
	}

	/* Binary background -- downward flowing layers */
	.binary-bg {
		position: absolute;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
		z-index: 1;
	}

	.binary-layer {
		position: absolute;
		left: 0;
		right: 0;
		display: flex;
		flex-direction: column;
		animation: drift-down linear infinite;
	}

	.binary-layer:nth-child(1) {
		animation-duration: 34s;
	}

	.binary-layer:nth-child(2) {
		animation-duration: 28s;
		opacity: 0.5;
	}

	.binary-row {
		white-space: nowrap;
		font-family: 'Courier New', Courier, monospace;
		font-size: clamp(2.6rem, 5vw, 5.2rem);
		font-weight: 700;
		letter-spacing: 0.03em;
		color: rgba(185, 60, 50, 0.18);
		line-height: 1.1;
	}

	.binary-layer:nth-child(2) .binary-row {
		color: rgba(200, 155, 55, 0.14);
	}

	@keyframes drift-down {
		from {
			transform: translateY(-50%);
		}
		to {
			transform: translateY(0);
		}
	}

	/* Dotted grid */
	.dotted-grid {
		position: absolute;
		inset: 0;
		background-image: radial-gradient(circle, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
		background-size: 10px 10px;
		pointer-events: none;
		z-index: 2;
	}

	/* Quote marks */
	.quote-mark {
		position: absolute;
		font-family: 'Georgia', 'Times New Roman', serif;
		font-size: clamp(4rem, 8vw, 7rem);
		line-height: 0.7;
		pointer-events: none;
		z-index: 2;
		user-select: none;
	}

	.quote-mark-top {
		top: 8%;
		right: 12%;
		color: rgba(230, 160, 120, 0.55);
	}

	.quote-mark-bottom {
		bottom: 8%;
		left: 10%;
		color: rgba(200, 155, 100, 0.55);
	}

	/* Cards container */
	.cards-container {
		position: relative;
		z-index: 10;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: clamp(1rem, 2vw, 1.75rem);
		padding: clamp(1.5rem, 4vw, 4rem);
	}

	/* Leader card */
	.leader-card {
		position: relative;
		width: clamp(300px, 36vw, 390px);
		height: clamp(420px, 48vw, 510px);
		aspect-ratio: auto;
		border-radius: 15px;
		overflow: hidden;
		border: none;
		background: none;
		padding: 0;
		cursor: pointer;
		transition:
			transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
			opacity 0.3s ease;
		-webkit-tap-highlight-color: transparent;
	}

	.leader-card:focus-visible {
		outline: 2px solid #fac549;
		outline-offset: 3px;
	}

	.leader-card:hover {
		transform: translateY(-6px);
	}

	.card-bg {
		position: absolute;
		inset: 0;
		background-size: cover;
		background-position: var(--card-position, center top);
		transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
	}

	.leader-card:hover .card-bg {
		transform: scale(1.06);
	}

	.card-gradient {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			to top,
			rgba(41, 27, 5, 0.82) 0%,
			rgba(25, 15, 5, 0.4) 40%,
			transparent 70%
		);
		z-index: 1;
	}

	.card-info {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: clamp(1.25rem, 2.5vw, 2rem);
		z-index: 2;
	}

	.card-info h3 {
		font-family: 'Overpass', sans-serif;
		font-weight: 700;
		color: #ffffff;
		font-size: clamp(1.35rem, 2vw, 1.75rem);
		margin: 0 0 0.5rem 0;
		line-height: 1.2;
	}

	.card-info p {
		font-family: 'Inter', sans-serif;
		font-style: italic;
		color: #fac549;
		font-size: clamp(0.8rem, 1.15vw, 1.05rem);
		margin: 0;
		line-height: 1.15;
		max-width: var(--role-max-width, none);
	}

	/* Right-aligned variant */
	.leader-card.align-right .card-info {
		text-align: right;
	}

	.leader-card.align-right .card-info p {
		margin-left: auto;
	}

	/* Expanded detail panel */
	.expanded-panel {
		position: relative;
		z-index: 10;
		display: grid;
		grid-template-columns: minmax(320px, 38.4%) minmax(0, 1fr);
		width: min(1008px, calc(100% - 2rem));
		min-height: 530px;
		border: 3px solid #941518;
		border-radius: 12px;
		overflow: hidden;
		box-shadow:
			0 4px 4px rgba(0, 0, 0, 0.25),
			0 20px 40px rgba(0, 0, 0, 0.24);
		animation: panel-in 0.24s cubic-bezier(0.22, 1, 0.36, 1) both;
		transform-origin: center;
	}

	.expanded-panel.is-closing {
		pointer-events: none;
		animation: panel-out 0.22s ease-in both;
	}

	@keyframes panel-in {
		from {
			opacity: 0;
			transform: scale(0.985) translateY(8px);
		}
		to {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}

	@keyframes panel-out {
		from {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
		to {
			opacity: 0;
			transform: scale(0.985) translateY(8px);
		}
	}

	/* Close button -- visible on mobile/touch and keyboard accessible */
	.expanded-close {
		position: absolute;
		top: 1rem;
		right: 1rem;
		z-index: 20;
		width: 36px;
		height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(0, 0, 0, 0.5);
		color: #ffffff;
		border: 1px solid rgba(255, 255, 255, 0.2);
		border-radius: 8px;
		font-size: 1.5rem;
		line-height: 1;
		cursor: pointer;
		transition: background 0.2s;
		-webkit-tap-highlight-color: transparent;
		opacity: 1;
		pointer-events: auto;
	}

	.expanded-close:focus-visible {
		opacity: 1;
		pointer-events: auto;
		outline: 2px solid #fac549;
		outline-offset: 2px;
		background: rgba(0, 0, 0, 0.7);
	}

	.expanded-media {
		position: relative;
		background-size: cover;
		background-position: var(--expanded-position, center center);
		min-height: 100%;
		border-right: 0;
	}

	.expanded-leader-info {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: clamp(1.35rem, 3vw, 1.95rem);
		background: linear-gradient(
			to top,
			rgba(0, 0, 0, 0.34) 0%,
			rgba(0, 0, 0, 0.2) 52%,
			transparent 100%
		);
	}

	.expanded-leader-info h3 {
		font-family: 'Overpass', sans-serif;
		font-weight: 700;
		color: #ffffff;
		font-size: clamp(1.65rem, 2.6vw, 2rem);
		margin: 0 0 0.55rem 0;
		line-height: 1.2;
	}

	.expanded-leader-info p {
		font-family: 'Inter', sans-serif;
		font-style: italic;
		color: #fac549;
		font-size: clamp(0.95rem, 1.45vw, 1.15rem);
		margin: 0;
		line-height: 1.15;
		max-width: 19rem;
	}

	.expanded-copy {
		background: linear-gradient(136deg, #ffddde 0%, #ffffff 50%, #eed4a7 100%);
		padding: clamp(2.25rem, 5vw, 4.5rem) clamp(2rem, 5vw, 4rem);
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.expanded-copy h2 {
		font-family: 'Overpass', sans-serif;
		font-weight: 700;
		color: #941518;
		font-size: clamp(2rem, 3.4vw, 2.35rem);
		margin: 0 0 clamp(1.5rem, 3vw, 2rem) 0;
		line-height: 1.15;
	}

	.expanded-copy p {
		font-family: 'Inter', sans-serif;
		color: #000000;
		font-size: clamp(0.76rem, 1vw, 0.9rem);
		font-weight: 400;
		margin: 0 0 clamp(0.8rem, 1.3vw, 1.05rem) 0;
		line-height: 1.18;
		max-width: 43rem;
	}

	.expanded-copy .closing-line {
		margin-top: 0;
		font-weight: 700;
		font-size: clamp(0.95rem, 1.35vw, 1.08rem);
		letter-spacing: 0;
	}

	.highlight-red {
		color: #941518;
		font-weight: 700;
		font-family: 'Overpass', sans-serif;
	}

	.highlight-gold {
		color: #941518;
		font-weight: 700;
		font-family: 'Overpass', sans-serif;
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		.binary-layer {
			animation: none;
		}

		.leader-card,
		.leader-card:hover,
		.card-bg,
		.leader-card:hover .card-bg {
			transition: none;
			transform: none;
		}

		.expanded-close {
			transition: none;
		}

		.expanded-panel {
			animation: none;
		}
	}

	/* Tablet */
	@media (max-width: 900px) {
		.expanded-panel {
			grid-template-columns: 1fr;
			min-height: auto;
		}

		.expanded-media {
			height: 380px;
			border-right: 0;
			border-bottom: 0;
		}
	}

	/* Mobile */
	@media (max-width: 768px) {
		.leadership-section {
			min-height: auto;
			padding: 3.5rem 0;
			flex-direction: column;
		}

		.cards-container {
			flex-direction: column;
			gap: 2rem;
			padding: 2rem 1.5rem;
		}

		.leader-card {
			width: min(340px, 85vw);
			height: clamp(380px, 55vw, 440px);
		}

		.leader-card:hover {
			transform: none;
		}

		.leader-card:hover .card-bg {
			transform: none;
		}

		.binary-row {
			font-size: clamp(1.6rem, 6vw, 3rem);
		}

		.quote-mark {
			font-size: clamp(3rem, 12vw, 5rem);
		}

		.expanded-panel {
			width: min(94vw, 460px);
		}

		.expanded-media {
			height: 380px;
		}

		/* Show close button on touch/mobile */
		.expanded-close {
			opacity: 1;
			pointer-events: auto;
		}

		.expanded-close:hover {
			background: rgba(160, 22, 22, 0.75);
		}
	}

	@media (max-width: 480px) {
		.cards-container {
			padding: 1.5rem 1rem;
			gap: 1.5rem;
		}

		.leader-card {
			width: min(300px, 88vw);
			height: clamp(340px, 60vw, 400px);
		}

		.card-info {
			padding: 1rem 1.25rem;
		}

		.expanded-copy h2 {
			font-size: clamp(1.5rem, 6vw, 2rem);
		}

		.expanded-copy p {
			font-size: 0.9rem;
			line-height: 1.28;
		}

		.expanded-copy .closing-line {
			font-size: 1.15rem;
		}

		.expanded-copy {
			padding: 1.5rem;
		}

		.expanded-close {
			top: 0.75rem;
			right: 0.75rem;
		}
	}
</style>
