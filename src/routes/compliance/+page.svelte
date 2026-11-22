<script lang="ts">
	import Footer from '#lib/components/footer.svelte';
	import PatchBay from '#lib/components/compliance/PatchBay.svelte';
	import NarrativeRack from '#lib/components/compliance/NarrativeRack.svelte';
	import heroPhoto from '#lib/assets/nav-images/compliance.jpeg';
	import { complianceReports, narrativeReports } from '#lib/data/reportLinks.ts';

	const areas = complianceReports.map((report, i) => ({ ...report, id: i + 1 }));
</script>

<svelte:head>
	<title>Compliance | DIT-PUP</title>
</svelte:head>

<main class="compliance-page">
	<section class="hero-section">
		<div class="hero-bg" style="background-image: url({heroPhoto})" aria-hidden="true"></div>
		<h1 class="t_display hero-title">COMPLIANCE</h1>
	</section>

	<section id="areas" class="switch-room" aria-labelledby="areas-title">
		<header class="room-head">
			<h2 id="areas-title" class="room-title">People connect technology</h2>
		</header>
		<PatchBay {areas} />
	</section>

	<section id="narrative" class="narrative" aria-labelledby="narrative-title">
		<div class="narrative-inner">
			<h2 id="narrative-title" class="t_eyebrow">Narrative Reports</h2>
			<NarrativeRack reports={narrativeReports} />
		</div>
	</section>

	<Footer />
</main>

<style>
	.compliance-page {
		background: var(--c-surface);
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.hero-section {
		position: relative;
		width: 100%;
		height: 100dvh;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #f8f8f8;
		overflow: hidden;
	}

	.hero-bg {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-size: cover;
		background-position: center;
		opacity: 0.3;
		z-index: 0;
	}

	.hero-title {
		position: relative;
		z-index: 1;
		text-align: center;
		padding: 0 5%;
	}

	/* ── Switch room and narrative ─────────────────────── */
	/* One continuous ground behind both sections, in the palette of the earlier
	   design. The colour starts drifting at the switch: white behind the title,
	   warming through cream and the maroon glow down the area cards, and settling
	   into the deep machine-room darks behind the rack, which lead into the
	   maroon footer. */
	.switch-room,
	.narrative {
		position: relative;
		scroll-margin-top: 24px;
	}
	.switch-room {
		background:
			radial-gradient(1100px 700px at 50% 62%, rgb(148 21 24 / 0.3), transparent 70%),
			radial-gradient(900px 600px at 50% 30%, rgb(250 197 73 / 0.14), transparent 70%),
			linear-gradient(
				180deg,
				var(--c-surface) 0%,
				#f6f3ec 14%,
				#efdcc0 30%,
				#b77a6c 48%,
				#5c1f22 64%,
				#150e0f 82%,
				#0e0a0b 100%
			);
	}
	.narrative {
		background:
			radial-gradient(1100px 520px at 50% 100%, rgb(148 21 24 / 0.38), transparent 70%),
			linear-gradient(180deg, #0e0a0b 0%, #150e0f 100%);
	}
	.switch-room {
		padding: clamp(80px, 9vw, 140px) clamp(16px, 4vw, 48px) clamp(64px, 7vw, 100px);
	}
	.narrative {
		padding: 0 clamp(16px, 4vw, 48px) clamp(80px, 9vw, 140px);
	}

	.room-head {
		display: grid;
		justify-items: center;
		margin-bottom: clamp(40px, 5vw, 64px);
		text-align: center;
	}
	/* Black→maroon title gradient, as on the display role. */
	.room-title {
		margin: 0;
		font-family: var(--font-heading);
		font-weight: 800;
		font-size: clamp(2rem, 5.4vw, 4.75rem);
		line-height: var(--lh-tight);
		letter-spacing: -0.01em;
		color: var(--c-maroon);
		background-image: var(--grad-title);
		background-clip: text;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.narrative-inner {
		width: min(100%, 1100px);
		margin-inline: auto;
		display: grid;
		gap: clamp(24px, 3vw, 40px);
	}

	@media (prefers-reduced-motion: no-preference) {
		.hero-bg {
			animation: hero-backdrop-in 1.2s ease-out;
		}
		.hero-title {
			animation: hero-title-in 1s cubic-bezier(0.16, 1, 0.3, 1);
		}
	}
</style>
