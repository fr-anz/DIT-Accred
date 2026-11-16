<script>
	import { onMount, tick } from 'svelte';
	import { ArrowLeft, X } from 'lucide-svelte';
	import { resolve } from '$app/paths';
	import Footer from '$lib/components/footer.svelte';
	import '$lib/styles/accreditation-pages.css';
	import '$lib/styles/assigned-page-motion.css';

	// Names, specializations and cutout crops from Figma 880:1597.
	// The Domingo card repeats Comendador's photo in Figma; use the supplied faculty original instead.
	const fullTimeFaculty = [
		{
			name: 'Aguila, Fermin',
			specialization: 'NETWORKING & INFRASTRUCTURE',
			photo: 'aguila',
			width: 202.6,
			height: 188.67,
			left: -55.44,
			top: -0.05
		},
		{
			name: 'Amata, Marie Leonila',
			specialization: 'IT SERVICE MANAGEMENT',
			photo: 'amata',
			width: 202.6,
			height: 188.67,
			left: -65.97,
			top: -6.89
		},
		{
			name: 'Canlas, Rosita',
			specialization: 'SOFTWARE DEVELOPMENT',
			photo: 'canlas',
			width: 202.6,
			height: 188.67,
			left: -55.3,
			top: -17.34
		},
		{
			name: 'Comendador, Benilda',
			specialization: 'IT SERVICE MANAGEMENT, SOFTWARE DEVELOPMENT',
			photo: 'comendador',
			width: 202.6,
			height: 188.67,
			left: -56.68,
			top: -24.42
		},
		{
			name: 'Domingo, Vivien',
			specialization: 'IT SERVICE MANAGEMENT, DATA ANALYTICS',
			photo: 'domingo',
			width: 100,
			height: 100,
			left: 0,
			top: 0,
			original: true
		},
		{
			name: 'Espineli, Juancho',
			specialization: 'DATA ANALYTICS, WEB & CLOUD COMPUTING, SOFTWARE DEVELOPMENT',
			photo: 'espineli',
			width: 202.6,
			height: 188.67,
			left: -56.01,
			top: 3.14
		},
		{
			name: 'Mayor, Jayson James',
			specialization: 'IT SERVICE MANAGEMENT, SOFTWARE MANAGEMENT',
			photo: 'mayor',
			width: 202.6,
			height: 188.67,
			left: -61.62,
			top: -0.01
		},
		{
			name: 'Miclat, Segundina',
			specialization: 'DATA ANALYTICS',
			photo: 'miclat',
			width: 179.39,
			height: 167.06,
			left: -36.64,
			top: -8.04
		}
	];
	/** @typedef {typeof fullTimeFaculty[number]} FacultyMember */
	/** @type {FacultyMember | null} */
	let selectedFaculty = $state(null);
	/** @type {HTMLDivElement | undefined} */
	let modalEl = $state();
	/** @type {HTMLElement | null} */
	let lastFocused = null;
	/** @param {FacultyMember} member */
	const photoUrl = (member) =>
		member.original
			? 'https://cdn.theavenir.dev/images/teaching-learning/faculty/originals/domingo.png'
			: '/teaching-learning/faculty/figma/' + member.photo + '.png';
	/** @param {FacultyMember} member */
	async function openFaculty(member) {
		lastFocused = /** @type {HTMLElement | null} */ (document.activeElement);
		selectedFaculty = member;
		await tick();
		modalEl?.focus();
	}
	function closeFaculty() {
		selectedFaculty = null;
		lastFocused?.focus();
	}
	/** @param {KeyboardEvent} event */
	function dialogKeys(event) {
		if (event.key === 'Escape') closeFaculty();
		if (event.key === 'Tab' && selectedFaculty) {
			event.preventDefault();
			modalEl?.querySelector('button')?.focus();
		}
	}
	$effect(() => {
		if (!selectedFaculty) return;
		const previous = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = previous;
		};
	});
	onMount(() => {
		const id = window.location.hash.slice(1);
		if (id) document.getElementById(id)?.scrollIntoView();
	});
</script>

<svelte:head>
	<title>Faculty Directory | Teaching &amp; Learning | DIT-PUP</title>
	<meta
		name="description"
		content="Meet the faculty of the Department of Information Technology at PUP."
	/>
</svelte:head>
<svelte:window onkeydown={dialogKeys} />
<main class="assigned_page faculty_page">
	<header class="directory_header">
		<div class="directory_header_inner">
			<a class="back_link" href={resolve('/teaching-learning')}
				><ArrowLeft size={18} />Teaching &amp; Learning</a
			>
			<p class="t_eyebrow directory_eyebrow">TEACHING &amp; LEARNING</p>
			<h1 class="t_display directory_title">FACULTY</h1>
			<p class="directory_intro">
				Managing the directory of core academic staff, monitoring accreditation compliance through
				research excellence, real-world IT applications, enriching the curriculum with current
				corporate insights and diverse professional expertise.
			</p>
		</div>
	</header>
	<section class="directory_section" id="full-time" aria-labelledby="full-time-title">
		<div class="directory_section_head">
			<span class="t_stat directory_count">{String(fullTimeFaculty.length).padStart(2, '0')}</span>
			<h2 class="t_stat_label directory_subhead" id="full-time-title">
				Full-time Faculty Profiles
			</h2>
		</div>
		<div class="directory_gallery" aria-label="Faculty activities">
			{#each [1, 2, 3, 4] as index (index)}
				<div class="gallery_frame">
					<img
						src={'/planning/figma/photo-strip-' + index + '.jpg'}
						alt={[
							'Faculty collaboration in the IT laboratory',
							'Industry presentation at Converge ICT',
							'Faculty community engagement',
							'Department planning meeting'
						][index - 1]}
						loading="lazy"
					/>
				</div>
			{/each}
		</div>
		<div class="faculty_card_grid">
			{#each fullTimeFaculty as member (member.name)}
				<button
					class="faculty_portrait_card"
					type="button"
					onclick={() => openFaculty(member)}
					style={'--photo-width:' +
						member.width +
						'%;--photo-height:' +
						member.height +
						'%;--photo-left:' +
						member.left +
						'%;--photo-top:' +
						member.top +
						'%;'}
					aria-label={'View profile: ' + member.name}
				>
					<img
						class="fp_photo"
						class:original_photo={member.original}
						src={photoUrl(member)}
						alt={member.name}
						loading="lazy"
					/>
					<span class="fp_overlay"
						><span class="t_card_name fp_name">{member.name}</span><span class="fp_spec"
							>{member.specialization}</span
						></span
					>
				</button>
			{/each}
		</div>
	</section>
	<section class="directory_pending" id="part-time" aria-labelledby="part-time-title">
		<h2 id="part-time-title">Part-time Educators</h2>
		<p>
			The part-time faculty directory is being updated. Profiles and teaching specializations will
			be published once confirmed.
		</p>
	</section>
	{#if selectedFaculty}
		<button
			class="fmodal_overlay"
			aria-label="Close faculty profile"
			onclick={closeFaculty}
			tabindex="-1"
		></button>
		<div
			class="fmodal_card"
			role="dialog"
			aria-modal="true"
			aria-labelledby="fmodal_name"
			tabindex="-1"
			bind:this={modalEl}
		>
			<button class="fmodal_close" onclick={closeFaculty} aria-label="Close profile"
				><X size={24} /></button
			>
			<div class="fmodal_header">
				<img class="fmodal_photo" src={photoUrl(selectedFaculty)} alt={selectedFaculty.name} />
				<div>
					<span class="fmodal_status">Full-time Faculty</span>
					<h3 class="t_card_name fmodal_name" id="fmodal_name">{selectedFaculty.name}</h3>
					<p class="fmodal_spec">{selectedFaculty.specialization}</p>
				</div>
			</div>
			<div class="fmodal_section">
				<h4>Faculty Profile</h4>
				<p>
					Subject assignments, certifications, research and institutional roles are being updated.
				</p>
			</div>
		</div>
	{/if}
</main>
<Footer />

<style>
	.directory_header {
		position: relative;
		height: clamp(530px, calc(55.052vw - 96px), 961px);
		display: flex;
		align-items: center;
		background: url('/design/page-ground.png') center / cover;
	}
	.directory_header_inner {
		width: 100%;
		max-width: 1920px;
		margin: 0 auto;
		padding: 0 clamp(25px, 9.688vw, 186px);
	}
	.back_link {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		color: var(--c-maroon);
		text-decoration: none;
		font-size: 13px;
		margin-bottom: clamp(30px, 3.646vw, 70px);
	}
	.directory_eyebrow {
		font-size: clamp(16px, 1.667vw, 32px);
		margin: 0 0 20px;
	}
	.directory_title {
		text-align: left;
		font-size: clamp(65px, 7.813vw, 150px);
		line-height: 1.1;
		margin: 0 0 clamp(30px, 3.646vw, 70px);
	}
	.directory_intro {
		font-size: clamp(17px, 1.667vw, 32px);
		line-height: 1.25;
		max-width: 821px;
		width: 55%;
		margin: 0;
	}
	.directory_section {
		padding-top: clamp(65px, 6.875vw, 132px);
		scroll-margin-top: 110px;
	}
	.directory_section_head {
		text-align: center;
		margin: 0 auto clamp(55px, 6.25vw, 120px);
		padding: 0 20px;
	}
	.directory_count {
		display: block;
		font-size: clamp(130px, 15.625vw, 300px);
		line-height: 1;
	}
	.directory_subhead {
		font-size: clamp(22px, 2.5vw, 48px);
		font-style: italic;
		margin: 12px 0 0;
	}
	.directory_gallery {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		width: 100%;
		height: clamp(150px, 21.927vw, 421px);
		margin: 0 auto clamp(60px, 6.77vw, 130px);
		max-width: 1920px;
		overflow: hidden;
		background: var(--c-maroon-deep);
	}
	.gallery_frame {
		overflow: hidden;
	}
	.gallery_frame img {
		height: 100%;
		width: 100%;
		object-fit: cover;
		opacity: 0.65;
	}
	.faculty_card_grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: clamp(30px, 2.552vw, 49px) clamp(25px, 2.552vw, 49px);
		max-width: 1634px;
		margin: 0 auto;
		width: calc(100% - 13.854vw);
		padding-bottom: clamp(60px, 6.25vw, 120px);
	}
	.faculty_portrait_card {
		position: relative;
		aspect-ratio: 512 / 747;
		border: 2px solid var(--c-maroon);
		border-radius: 25px;
		background: linear-gradient(146.92deg, #000 1.93%, #941518 101.7%);
		overflow: hidden;
		cursor: pointer;
		padding: 0;
		text-align: left;
		color: white;
		transition: box-shadow 0.2s;
	}
	.faculty_portrait_card:hover {
		box-shadow: 0 12px 30px #5c0f1630;
	}
	.fp_photo {
		position: absolute;
		width: var(--photo-width);
		height: var(--photo-height);
		max-width: none;
		left: var(--photo-left);
		top: var(--photo-top);
	}
	.fp_photo.original_photo {
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		object-fit: cover;
		object-position: center 20%;
	}
	.fp_overlay {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		padding: clamp(22px, 2.03vw, 39px);
		background: linear-gradient(0deg, #5c0f16bb, transparent);
	}
	.fp_name {
		display: block;
		font-size: clamp(22px, 2.083vw, 40px);
		line-height: 1.25;
		color: white;
		margin-bottom: 14px;
	}
	.fp_spec {
		display: block;
		font: italic 500 clamp(14px, 1.25vw, 24px)/1.3 var(--font-body);
		color: var(--c-gold-light);
	}
	.directory_pending {
		padding: clamp(50px, 5.208vw, 100px) var(--page-gutter);
		background: var(--panel-paper);
		text-align: center;
	}
	.directory_pending h2 {
		font: 700 clamp(28px, 2.5vw, 48px)/1.3 var(--font-heading);
		color: var(--c-maroon);
		margin: 0 0 24px;
	}
	.directory_pending p {
		font-size: clamp(16px, 1.146vw, 22px);
		max-width: 700px;
		margin: 0 auto;
		line-height: 1.5;
	}
	.fmodal_overlay {
		position: fixed;
		inset: 0;
		z-index: 100;
		background: #0009;
		backdrop-filter: blur(5px);
		border: 0;
	}
	.fmodal_card {
		position: fixed;
		inset: 50% auto auto 50%;
		transform: translate(-50%, -50%);
		width: min(800px, calc(100% - 32px));
		max-height: 85vh;
		overflow: auto;
		z-index: 101;
		border-radius: 25px;
		border: 2px solid var(--c-gold);
		background: white;
		padding: clamp(25px, 3vw, 50px);
	}
	.fmodal_close {
		position: absolute;
		right: 16px;
		top: 16px;
		border: 0;
		background: none;
		padding: 8px;
		color: var(--c-maroon);
		cursor: pointer;
	}
	.fmodal_header {
		display: flex;
		align-items: center;
		gap: 30px;
		padding-top: 20px;
	}
	.fmodal_photo {
		height: 160px;
		width: 135px;
		object-fit: cover;
		object-position: center 20%;
		border-radius: 12px;
		background: var(--c-maroon-deep);
	}
	.fmodal_status {
		color: var(--c-gold-dark);
		font-size: 14px;
	}
	.fmodal_name {
		margin: 10px 0;
		font-size: clamp(24px, 2vw, 36px);
		color: var(--c-maroon);
	}
	.fmodal_spec {
		font-style: italic;
		color: var(--c-gold-dark);
		font-size: 15px;
	}
	.fmodal_section {
		margin-top: 32px;
		padding-top: 25px;
		border-top: 1px solid var(--c-gold);
		font-size: 16px;
		line-height: 1.6;
	}
	.fmodal_section h4 {
		color: var(--c-maroon);
		font-size: 20px;
		margin: 0 0 12px;
	}
	.fmodal_section p {
		margin: 0;
	}
	@media (max-width: 800px) {
		.faculty_card_grid {
			grid-template-columns: 1fr 1fr;
			width: calc(100% - 40px);
			gap: 24px;
		}
		.directory_intro {
			width: 80%;
		}
		.fp_overlay {
			padding: 22px;
		}
		.fp_name {
			font-size: 25px;
		}
	}
	@media (max-width: 520px) {
		.directory_header {
			height: 580px;
		}
		.directory_intro {
			width: 100%;
			font-size: 18px;
		}
		.directory_title {
			margin-bottom: 30px;
		}
		.directory_gallery {
			height: 240px;
			grid-template-columns: 1fr 1fr;
		}
		.faculty_card_grid {
			grid-template-columns: 1fr;
			width: calc(100% - 56px);
		}
		.fp_name {
			font-size: 30px;
		}
		.fp_spec {
			font-size: 17px;
		}
		.fp_overlay {
			padding: 30px;
		}
		.fmodal_header {
			flex-direction: column;
			align-items: start;
			gap: 20px;
		}
	}
</style>
