<script>
	import { onMount } from 'svelte';
	import { ArrowLeft, X } from 'lucide-svelte';
	import Footer from '$lib/components/footer.svelte';

	/**
	 * @typedef {{ code: string; name: string; units: number }} FacultySubject
	 * @typedef {{ name: string; specialization: string; type: string; photo: string; subjects: FacultySubject[]; thesis: string | null; certifications: string[]; roles: string[] }} FacultyMember
	 */

	// NOTE: faculty entries are placeholders mirroring the Figma sample (Aguila, Fermin).
	// Replace names, photos, subjects, certifications, and roles with the real directory.
	const facultyPhoto = '/teaching-learning/faculty-placeholder.jpg';

	/** @type {FacultySubject[]} */
	const sampleSubjects = [
		{ code: 'COMP 001', name: 'Introduction to Computing', units: 3 },
		{ code: 'COMP 002', name: 'Computer Programming 1', units: 3 },
		{ code: 'COMP 003', name: 'Computer Programming 2', units: 3 }
	];
	const sampleCerts = ['CISCO CCIE', 'AWS Certified Solutions Architect', 'CompTIA Security+'];
	const sampleRoles = [
		'ARK Student Organization Adviser',
		'PUP Multi-Purpose Cooperatives Organization Member'
	];

	/** @param {string} name @param {string} specialization @param {string} type @returns {FacultyMember} */
	function makeFaculty(name, specialization, type) {
		return {
			name,
			specialization,
			type,
			photo: facultyPhoto,
			subjects: sampleSubjects,
			thesis: null,
			certifications: sampleCerts,
			roles: sampleRoles
		};
	}

	/** @type {FacultyMember[]} */
	const fullTimeFaculty = [
		makeFaculty('Aguila, Fermin', 'NETWORKING & INFRASTRUCTURE', 'Full-time Faculty'),
		makeFaculty('Bautista, Maria', 'DATA SCIENCE & ANALYTICS', 'Full-time Faculty'),
		makeFaculty('Cruz, Daniel', 'SOFTWARE ENGINEERING', 'Full-time Faculty'),
		makeFaculty('Dela Rosa, Anna', 'ARTIFICIAL INTELLIGENCE', 'Full-time Faculty'),
		makeFaculty('Espino, Mark', 'CYBERSECURITY', 'Full-time Faculty'),
		makeFaculty('Flores, Liza', 'INFORMATION SYSTEMS', 'Full-time Faculty')
	];

	/** @type {FacultyMember[]} */
	const partTimeFaculty = [
		makeFaculty('Garcia, Paolo', 'CLOUD ARCHITECTURE', 'Part-time Faculty'),
		makeFaculty('Hernandez, Bea', 'DEVOPS ENGINEERING', 'Part-time Faculty'),
		makeFaculty('Ibarra, Noel', 'WEB DEVELOPMENT', 'Part-time Faculty'),
		makeFaculty('Jimenez, Carla', 'UX & PRODUCT DESIGN', 'Part-time Faculty'),
		makeFaculty('Lim, Victor', 'DATABASE ADMINISTRATION', 'Part-time Faculty'),
		makeFaculty('Morales, Grace', 'QUALITY ASSURANCE', 'Part-time Faculty')
	];

	/** @type {FacultyMember | null} */
	let selectedFaculty = $state(null);

	/** @param {FacultyMember} member */
	function openFaculty(member) {
		selectedFaculty = member;
	}

	function closeFaculty() {
		selectedFaculty = null;
	}

	// Jump to the section requested via hash (#full-time / #part-time) on load.
	onMount(() => {
		const hash = window.location.hash?.slice(1);
		if (hash) {
			requestAnimationFrame(() => {
				document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
			});
		}
	});
</script>

<svelte:head>
	<title>Faculty Directory | Teaching & Learning | DIT-PUP</title>
	<meta
		name="description"
		content="Directory of DIT-PUP full-time faculty and part-time educators. Select a profile to view subject specialization, certifications, and institutional roles."
	/>
</svelte:head>

<svelte:window onkeydown={(e) => e.key === 'Escape' && closeFaculty()} />

<!-- ─────────────────────────────────────────────
  HEADER
───────────────────────────────────────────── -->
<header class="directory_header">
	<div class="directory_header_inner">
		<a class="back_link" href="/teaching-learning#staff-faculty-profile">
			<ArrowLeft size={18} strokeWidth={2.5} />
			<span>Teaching &amp; Learning</span>
		</a>
		<h1 class="directory_title">FACULTY DIRECTORY</h1>
		<p class="directory_intro">
			The academic staff behind the BSIT program. Select any profile to view subject specialization,
			thesis work, professional certifications, and institutional roles.
		</p>
	</div>
</header>

<!-- ─────────────────────────────────────────────
  FULL-TIME FACULTY
───────────────────────────────────────────── -->
<section class="directory_section" id="full-time">
	<div class="directory_section_head">
		<span class="directory_count">{fullTimeFaculty.length}</span>
		<h2 class="directory_subhead">Active Full-time Faculty</h2>
	</div>

	<div class="faculty_card_grid">
		{#each fullTimeFaculty as member, i (i)}
			<button class="faculty_portrait_card" type="button" onclick={() => openFaculty(member)}>
				<img class="fp_photo" src={member.photo} alt={member.name} loading="lazy" />
				<div class="fp_overlay">
					<span class="fp_name">{member.name}</span>
					<span class="fp_spec">{member.specialization}</span>
				</div>
			</button>
		{/each}
	</div>
</section>

<!-- ─────────────────────────────────────────────
  PART-TIME FACULTY
───────────────────────────────────────────── -->
<section class="directory_section" id="part-time">
	<div class="directory_section_head">
		<span class="directory_count gold">{partTimeFaculty.length}</span>
		<h2 class="directory_subhead">Active Part-time Faculty</h2>
	</div>

	<div class="faculty_card_grid">
		{#each partTimeFaculty as member, i (i)}
			<button class="faculty_portrait_card" type="button" onclick={() => openFaculty(member)}>
				<img class="fp_photo" src={member.photo} alt={member.name} loading="lazy" />
				<div class="fp_overlay">
					<span class="fp_name">{member.name}</span>
					<span class="fp_spec">{member.specialization}</span>
				</div>
			</button>
		{/each}
	</div>
</section>

<!-- ─────────────────────────────────────────────
  FACULTY PROFILE OVERLAY MODAL
───────────────────────────────────────────── -->
{#if selectedFaculty}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div class="fmodal_overlay" onclick={closeFaculty} role="dialog" aria-modal="true">
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="fmodal_card" onclick={(e) => e.stopPropagation()}>
			<button class="fmodal_close" onclick={closeFaculty} aria-label="Close profile">
				<X size={22} />
			</button>

			<!-- Header: photo + name + specialization + status -->
			<div class="fmodal_header">
				<img class="fmodal_photo" src={selectedFaculty.photo} alt={selectedFaculty.name} />
				<div class="fmodal_headtext">
					<span class="fmodal_status">{selectedFaculty.type}</span>
					<h3 class="fmodal_name">{selectedFaculty.name}</h3>
					<p class="fmodal_spec">{selectedFaculty.specialization}</p>
				</div>
			</div>

			<!-- Subject Specialization -->
			<div class="fmodal_section">
				<h4 class="fmodal_label">Subject Specialization</h4>
				<ul class="fmodal_subjects">
					{#each selectedFaculty.subjects as subject (subject.code)}
						<li class="fmodal_subject_row">
							<span class="fmodal_subject"><strong>{subject.code}:</strong> {subject.name}</span>
							<span class="fmodal_units">{subject.units} units</span>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Thesis / Dissertation -->
			<div class="fmodal_section">
				<h4 class="fmodal_label">Thesis/Dissertation</h4>
				<div class="fmodal_thesis">
					{#if selectedFaculty.thesis}
						<p>{selectedFaculty.thesis}</p>
					{:else}
						<p>None to show - <em>yet</em></p>
					{/if}
				</div>
			</div>

			<!-- Professional Certifications -->
			<div class="fmodal_section">
				<h4 class="fmodal_label">Professional Certifications</h4>
				<div class="fmodal_certs">
					{#each selectedFaculty.certifications as cert (cert)}
						<span class="fmodal_cert">{cert}</span>
					{/each}
				</div>
			</div>

			<!-- Institutional Roles -->
			<div class="fmodal_section">
				<h4 class="fmodal_label">Institutional Roles</h4>
				<ul class="fmodal_roles">
					{#each selectedFaculty.roles as role (role)}
						<li>{role}</li>
					{/each}
				</ul>
			</div>

			<!-- Socials -->
			<div class="fmodal_socials" aria-label="Social links">
				<span class="fmodal_social" aria-label="Facebook">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/></svg>
				</span>
				<span class="fmodal_social" aria-label="Instagram">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
				</span>
				<span class="fmodal_social" aria-label="LinkedIn">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
				</span>
				<span class="fmodal_social" aria-label="GitHub">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
				</span>
			</div>
		</div>
	</div>
{/if}

<Footer />

<style>
	:root {
		--color-maroon: #5c0f16;
		--color-gold: #cfa83a;
		--font-body: 'Inter', sans-serif;
		--font-heading: 'Overpass', sans-serif;
	}

	/* ── HEADER ── */
	.directory_header {
		background: linear-gradient(135deg, #2a0a0d 0%, #5c0f16 60%, #160507 100%);
		color: #fff;
		padding: 3.5rem 10% 3rem;
	}

	@media (max-width: 1024px) {
		.directory_header {
			padding: 3rem 6% 2.5rem;
		}
	}

	@media (max-width: 640px) {
		.directory_header {
			padding: 2.5rem 1.5rem 2rem;
		}
	}

	.directory_header_inner {
		max-width: 1100px;
		margin: 0 auto;
	}

	.back_link {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--font-body);
		font-size: 0.85rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: var(--color-gold);
		text-decoration: none;
		margin-bottom: 1.5rem;
		transition: gap 0.2s ease;
	}

	.back_link:hover {
		gap: 0.85rem;
	}

	.directory_title {
		font-family: var(--font-heading);
		font-size: clamp(2.2rem, 6vw, 4rem);
		font-weight: 900;
		letter-spacing: 0.02em;
		margin: 0 0 0.85rem 0;
		line-height: 1.05;
	}

	.directory_intro {
		font-family: var(--font-body);
		font-size: 1.05rem;
		line-height: 1.7;
		color: rgba(255, 255, 255, 0.78);
		max-width: 760px;
		margin: 0;
	}

	/* ── SECTIONS ── */
	.directory_section {
		width: 100%;
		box-sizing: border-box;
		padding: 3.5rem 10% 1rem;
		scroll-margin-top: 1.5rem;
	}

	.directory_section:last-of-type {
		padding-bottom: 4.5rem;
	}

	@media (max-width: 1024px) {
		.directory_section {
			padding: 3rem 6% 1rem;
		}
	}

	@media (max-width: 640px) {
		.directory_section {
			padding: 2.5rem 1.5rem 1rem;
		}
	}

	.directory_section_head {
		display: flex;
		align-items: center;
		gap: 1rem;
		margin-bottom: 2.25rem;
	}

	.directory_count {
		font-family: var(--font-heading);
		font-size: clamp(2.5rem, 6vw, 3.75rem);
		font-weight: 900;
		line-height: 1;
		color: var(--color-maroon);
	}

	.directory_count.gold {
		color: #ca8106;
	}

	.directory_subhead {
		font-family: var(--font-heading);
		font-size: clamp(1.3rem, 3vw, 2rem);
		font-weight: 800;
		letter-spacing: 0.02em;
		color: #1a1a1a;
		margin: 0;
	}

	/* ── PORTRAIT CARDS ── */
	.faculty_card_grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 1.75rem;
	}

	@media (max-width: 900px) {
		.faculty_card_grid {
			grid-template-columns: repeat(2, 1fr);
			gap: 1.25rem;
		}
	}

	@media (max-width: 520px) {
		.faculty_card_grid {
			grid-template-columns: 1fr;
		}
	}

	.faculty_portrait_card {
		position: relative;
		aspect-ratio: 512 / 747;
		border: 2px solid #941518;
		border-radius: 25px;
		overflow: hidden;
		padding: 0;
		cursor: pointer;
		background: linear-gradient(146.9deg, #000000 1.9%, #941518 101.7%);
		transition:
			transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
			box-shadow 0.3s ease;
	}

	.faculty_portrait_card:hover {
		transform: translateY(-6px);
		box-shadow: 0 16px 36px rgba(148, 21, 24, 0.28);
	}

	.faculty_portrait_card:focus-visible {
		outline: 3px solid #fac549;
		outline-offset: 3px;
	}

	.fp_photo {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center top;
	}

	.fp_overlay {
		position: absolute;
		inset: auto 0 0 0;
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		padding: 2.5rem 1.25rem 1.25rem;
		text-align: left;
		background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.55) 92%);
	}

	.fp_name {
		font-family: var(--font-heading);
		font-size: 1.5rem;
		font-weight: 800;
		color: #ffffff;
		letter-spacing: 0.02em;
		line-height: 1.15;
	}

	.fp_spec {
		font-family: var(--font-body);
		font-size: 0.9rem;
		font-style: italic;
		font-weight: 600;
		color: #fac549;
		letter-spacing: 0.02em;
		line-height: 1.3;
	}

	/* ── FACULTY PROFILE MODAL ── */
	.fmodal_overlay {
		position: fixed;
		inset: 0;
		background: rgba(22, 5, 7, 0.7);
		backdrop-filter: blur(10px);
		display: flex;
		align-items: flex-start;
		justify-content: center;
		z-index: 1000;
		padding: 2.5rem 1.5rem;
		overflow-y: auto;
		animation: overlayFadeIn 0.3s ease;
	}

	.fmodal_card {
		position: relative;
		background: #ffffff;
		border: 2px solid #941518;
		border-radius: 25px;
		width: 100%;
		max-width: 640px;
		padding: 2.75rem 2.5rem 2.25rem;
		box-shadow: 0 24px 70px rgba(0, 0, 0, 0.35);
		animation: modalZoomIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
	}

	@media (max-width: 560px) {
		.fmodal_card {
			padding: 2.25rem 1.5rem 1.75rem;
		}
	}

	.fmodal_close {
		position: absolute;
		top: 1.1rem;
		right: 1.1rem;
		width: 38px;
		height: 38px;
		border-radius: 50%;
		background: rgba(148, 21, 24, 0.08);
		border: none;
		color: #941518;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.fmodal_close:hover {
		background: rgba(148, 21, 24, 0.18);
		transform: scale(1.08);
	}

	.fmodal_header {
		display: flex;
		align-items: flex-start;
		gap: 1.5rem;
		margin-bottom: 2.25rem;
	}

	.fmodal_photo {
		width: 120px;
		height: 120px;
		flex-shrink: 0;
		object-fit: cover;
		object-position: center top;
		border: 3px solid #fac549;
		border-radius: 15px;
	}

	@media (max-width: 460px) {
		.fmodal_photo {
			width: 92px;
			height: 92px;
		}
	}

	.fmodal_headtext {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		padding-top: 0.25rem;
	}

	.fmodal_status {
		align-self: flex-start;
		order: -1;
		margin-bottom: 0.25rem;
		background: rgba(255, 229, 159, 0.75);
		color: #ca8106;
		font-family: var(--font-heading);
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.03em;
		padding: 0.4rem 0.85rem;
		border-radius: 5px;
	}

	.fmodal_name {
		font-family: var(--font-heading);
		font-size: clamp(1.7rem, 4vw, 2.2rem);
		font-weight: 700;
		line-height: 1.05;
		margin: 0;
		background: linear-gradient(90deg, #941518 0%, #2e0707 100%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		color: transparent;
	}

	.fmodal_spec {
		font-family: var(--font-body);
		font-size: clamp(1rem, 2.2vw, 1.3rem);
		font-style: italic;
		color: #ca8106;
		letter-spacing: 0.02em;
		margin: 0;
		line-height: 1.2;
	}

	.fmodal_section {
		margin-bottom: 2rem;
	}

	.fmodal_label {
		font-family: var(--font-body);
		font-size: clamp(1.05rem, 2.4vw, 1.3rem);
		font-weight: 400;
		text-transform: uppercase;
		letter-spacing: 0.14em;
		color: #941518;
		margin: 0 0 1rem 0;
	}

	.fmodal_subjects {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.fmodal_subject_row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		padding: 0.6rem 0;
		border-bottom: 2px solid rgba(0, 0, 0, 0.85);
		font-family: var(--font-body);
		font-size: 1.05rem;
		color: #000000;
	}

	.fmodal_subject strong {
		font-weight: 700;
	}

	.fmodal_units {
		flex-shrink: 0;
		font-family: var(--font-heading);
		font-weight: 700;
		color: #ffaf34;
	}

	.fmodal_thesis {
		position: relative;
		background: #eeeeee;
		border-radius: 5px;
		padding: 1.1rem 1.25rem 1.1rem 1.75rem;
		overflow: hidden;
	}

	.fmodal_thesis::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		bottom: 0;
		width: 14px;
		background: #ffaf34;
		border-radius: 5px 0 0 5px;
	}

	.fmodal_thesis p {
		margin: 0;
		font-family: var(--font-body);
		font-size: 1.05rem;
		color: #ffaf34;
		letter-spacing: 0.02em;
	}

	.fmodal_thesis em {
		font-style: italic;
	}

	.fmodal_certs {
		display: flex;
		flex-wrap: wrap;
		gap: 0.85rem;
	}

	.fmodal_cert {
		background: #ffe9b6;
		color: #ca8106;
		font-family: var(--font-body);
		font-size: 0.95rem;
		padding: 0.55rem 1rem;
		border-radius: 5px;
	}

	.fmodal_roles {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.fmodal_roles li {
		font-family: var(--font-body);
		font-size: 1.05rem;
		color: #000000;
		line-height: 1.5;
	}

	.fmodal_roles li::before {
		content: '‣ ';
		color: #941518;
		font-weight: 700;
	}

	.fmodal_socials {
		display: flex;
		justify-content: center;
		gap: 1.25rem;
		margin-top: 2.25rem;
	}

	.fmodal_social {
		color: #111111;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		transition:
			transform 0.2s ease,
			color 0.2s ease;
		cursor: pointer;
	}

	.fmodal_social:hover {
		transform: translateY(-2px);
		color: #941518;
	}

	@keyframes overlayFadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes modalZoomIn {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
</style>
