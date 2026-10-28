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

	/** @type {HTMLDivElement | undefined} */
	let modalEl = $state();

	/** Element that had focus before the dialog opened, so it can be restored. @type {HTMLElement | null} */
	let lastFocused = null;

	/** @param {FacultyMember} member */
	function openFaculty(member) {
		lastFocused = /** @type {HTMLElement | null} */ (document.activeElement);
		selectedFaculty = member;
		// Move focus into the dialog once it has rendered.
		requestAnimationFrame(() => modalEl?.focus());
	}

	function closeFaculty() {
		selectedFaculty = null;
		lastFocused?.focus();
		lastFocused = null;
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
		<p class="t_eyebrow directory_eyebrow">Teaching &amp; Learning</p>
		<h1 class="t_display directory_title">Faculty</h1>
		<p class="t_body directory_intro">
			Managing the directory of core academic staff, monitoring accreditation compliance through
			research excellence, real-world IT applications, enriching the curriculum with current
			corporate insights and diverse professional expertise.
		</p>
	</div>
</header>

<!-- ─────────────────────────────────────────────
  FULL-TIME FACULTY
───────────────────────────────────────────── -->
<section class="directory_section" id="full-time">
	<div class="directory_section_head">
		<span class="t_stat directory_count">{fullTimeFaculty.length}</span>
		<h2 class="t_stat_label directory_subhead">Active Full-time Faculty</h2>
	</div>

	<div class="faculty_card_grid">
		{#each fullTimeFaculty as member, i (i)}
			<button class="faculty_portrait_card" type="button" onclick={() => openFaculty(member)}>
				<img class="fp_photo" src={member.photo} alt={member.name} loading="lazy" />
				<div class="fp_overlay">
					<span class="t_card_name fp_name">{member.name}</span>
					<span class="t_meta fp_spec">{member.specialization}</span>
					<span class="t_action fp_cta">View Technical Profile</span>
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
		<span class="t_stat directory_count">{partTimeFaculty.length}</span>
		<h2 class="t_stat_label directory_subhead">Active Part-time Faculty</h2>
	</div>

	<div class="faculty_card_grid">
		{#each partTimeFaculty as member, i (i)}
			<button class="faculty_portrait_card" type="button" onclick={() => openFaculty(member)}>
				<img class="fp_photo" src={member.photo} alt={member.name} loading="lazy" />
				<div class="fp_overlay">
					<span class="t_card_name fp_name">{member.name}</span>
					<span class="t_meta fp_spec">{member.specialization}</span>
					<span class="t_action fp_cta">View Technical Profile</span>
				</div>
			</button>
		{/each}
	</div>
</section>

<!-- ─────────────────────────────────────────────
  FACULTY PROFILE OVERLAY MODAL
───────────────────────────────────────────── -->
{#if selectedFaculty}
	<!-- Backdrop is presentational: its only job is close-on-click. The dialog role
	     belongs on the card, which is what actually receives focus. Escape is handled
	     by the svelte:window listener above. -->
	<div class="fmodal_overlay" onclick={closeFaculty} aria-hidden="true"></div>

	<div
		class="fmodal_card"
		role="dialog"
		aria-modal="true"
		aria-labelledby="fmodal_name"
		tabindex="-1"
		bind:this={modalEl}
	>
		<button class="fmodal_close" onclick={closeFaculty} aria-label="Close profile">
			<X size={22} />
		</button>

		<!-- Header: photo + name + specialization + status -->
		<div class="fmodal_header">
			<img class="fmodal_photo" src={selectedFaculty.photo} alt={selectedFaculty.name} />
			<div class="fmodal_headtext">
				<span class="fmodal_status">{selectedFaculty.type}</span>
				<h3 class="t_card_name fmodal_name" id="fmodal_name">{selectedFaculty.name}</h3>
				<p class="t_meta fmodal_spec">{selectedFaculty.specialization}</p>
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
				<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"
					><path
						d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"
					/></svg
				>
			</span>
			<span class="fmodal_social" aria-label="Instagram">
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path
						d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
					/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg
				>
			</span>
			<span class="fmodal_social" aria-label="LinkedIn">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"
					><path
						d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
					/><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg
				>
			</span>
			<span class="fmodal_social" aria-label="GitHub">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"
					><path
						d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
					/></svg
				>
			</span>
		</div>
	</div>
{/if}

<Footer />

<style>
	/* Aliases onto the canonical brand tokens in src/routes/layout.css. */
	:root {
		--color-maroon: var(--c-maroon);
		--color-gold: var(--c-gold);
	}

	/* ── HERO ──
	   Figma node 839:1494: light ground, left-aligned, eyebrow above a Montserrat
	   display title with the body paragraph beneath. */
	.directory_header {
		background: var(--c-surface);
		color: var(--c-ink);
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

	.directory_eyebrow {
		margin-bottom: 0.5rem;
	}

	/* Type comes from the global .t_display role. Figma caps this hero at 150px. */
	.directory_title {
		margin-bottom: 1.5rem;
	}

	.directory_intro {
		max-width: 821px; /* Figma: 821px body column */
		color: var(--c-ink);
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

	/* Figma node 841:1569 stacks a 300px gold-gradient numeral over a 48px italic
	   label, centred. Type comes from the global .t_stat / .t_stat_label roles;
	   the 300px numeral is capped tighter here so it does not dominate the fold. */
	.directory_section_head {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		margin-bottom: 2.75rem;
	}

	.directory_count {
		font-size: clamp(4rem, 11vw, 200px);
	}

	.directory_subhead {
		color: var(--c-ink);
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

	/* Figma node 1068:1434: 512x747, 2px maroon border, 25px radius, black→maroon
	   gradient ground at 146.9deg behind the portrait. */
	.faculty_portrait_card {
		position: relative;
		aspect-ratio: 512 / 747;
		border: 2px solid var(--c-maroon);
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
		outline: 3px solid var(--c-gold-light);
		outline-offset: 3px;
	}

	@media (prefers-reduced-motion: reduce) {
		.faculty_portrait_card {
			transition: none;
		}

		.faculty_portrait_card:hover {
			transform: none;
		}
	}

	.fp_photo {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center top;
	}

	/* Figma node 1068:1435 "Blur": transparent → rgba(0,0,0,0.32) at 92%, with the
	   22px bottom / 15px top-left radii that match the card corner. */
	.fp_overlay {
		position: absolute;
		inset: auto 0 0 0;
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		padding: 2.5rem 1.25rem 1.25rem;
		text-align: left;
		border-radius: 15px 0 22px 22px;
		background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0.3%, rgba(0, 0, 0, 0.32) 92.3%);
	}

	/* Type from the global .t_card_name / .t_meta roles; only colour is local. */
	.fp_name {
		color: var(--c-surface);
	}

	.fp_spec {
		color: var(--c-gold-light);
	}

	/* Figma node 1052:1159: 440x82, 10px radius, maroon gradient at 149.9deg, with
	   the label centred in Overpass Medium. Scaled to the card here. */
	.fp_cta {
		display: block;
		margin-top: 0.9rem;
		padding: 0.6rem 1rem;
		border-radius: 10px;
		background: linear-gradient(149.9deg, #8e1518 0%, #4b0506 100%);
		color: var(--c-surface);
		text-align: center;
		font-size: clamp(0.8rem, 1vw, 1.15rem);
	}

	/* ── FACULTY PROFILE MODAL ── */
	/* Backdrop only. The card is a sibling rather than a child so the dialog role
	   sits on the focusable element instead of on the click-to-close layer. */
	.fmodal_overlay {
		position: fixed;
		inset: 0;
		background: rgba(22, 5, 7, 0.7);
		backdrop-filter: blur(10px);
		z-index: 1000;
		animation: overlayFadeIn 0.3s ease;
	}

	.fmodal_card {
		position: fixed;
		top: 2.5rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 1001;
		max-height: calc(100dvh - 5rem);
		overflow-y: auto;
		background: var(--c-surface);
		border: 2px solid var(--c-maroon);
		border-radius: 25px;
		width: calc(100% - 3rem);
		max-width: 640px;
		padding: 2.75rem 2.5rem 2.25rem;
		box-shadow: 0 24px 70px rgba(0, 0, 0, 0.35);
		animation: modalZoomIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.fmodal_card:focus-visible {
		outline: 3px solid var(--c-gold-light);
		outline-offset: 4px;
	}

	@media (prefers-reduced-motion: reduce) {
		.fmodal_overlay,
		.fmodal_card {
			animation: none;
		}
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
		color: var(--c-maroon);
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
		border: 3px solid var(--c-gold-light);
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
		color: var(--c-gold-dark);
		font-family: var(--font-heading);
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.03em;
		padding: 0.4rem 0.85rem;
		border-radius: 5px;
	}

	/* Family/size/tracking come from the global .t_card_name role. Only the maroon
	   gradient fill is specific to the dialog heading. */
	.fmodal_name {
		font-size: clamp(1.7rem, 4vw, 2.2rem);
		color: var(--c-maroon);
		background-image: linear-gradient(90deg, #941518 0%, #2e0707 100%);
		-webkit-background-clip: text;
		background-clip: text;
		-webkit-text-fill-color: transparent;
		color: transparent;
	}

	/* Inherits the global .t_meta role; colour only. */
	.fmodal_spec {
		font-size: clamp(1rem, 2.2vw, 1.3rem);
		color: var(--c-gold-dark);
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
		color: var(--c-maroon);
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
		color: var(--c-gold-dark);
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
		color: var(--c-maroon);
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
		color: var(--c-maroon);
	}

	@keyframes overlayFadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	/* Keeps the translateX(-50%) that centres the card, so the scale does not
	   override it and knock the dialog off-centre while animating in. */
	@keyframes modalZoomIn {
		from {
			opacity: 0;
			transform: translateX(-50%) scale(0.95);
		}
		to {
			opacity: 1;
			transform: translateX(-50%) scale(1);
		}
	}
</style>
