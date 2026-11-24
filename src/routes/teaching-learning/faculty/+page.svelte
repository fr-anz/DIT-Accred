<script>
	import { onMount, tick } from 'svelte';
	import { ArrowLeft, X } from '@lucide/svelte';
	import { resolve } from '$app/paths';
	import Footer from '#lib/components/footer.svelte';
	import '#lib/styles/accreditation-pages.css';
	import '#lib/styles/assigned-page-motion.css';

	import { fullTimeFaculty, partTimeFaculty } from '#lib/data/faculty.ts';

	/** @typedef {import('#lib/data/faculty.ts').FacultyMember} FacultyMember */
	/** @typedef {import('#lib/data/faculty.ts').FacultyStatus} FacultyStatus */

	const facultyGroups = [
		{
			id: 'full-time',
			status: /** @type {FacultyStatus} */ ('full-time'),
			title: 'Full-time Faculty Profiles',
			label: 'Full-time Faculty',
			members: fullTimeFaculty
		},
		{
			id: 'part-time',
			status: /** @type {FacultyStatus} */ ('part-time'),
			title: 'Part-time Faculty Profiles',
			label: 'Part-time Faculty',
			members: partTimeFaculty
		}
	];
	/** @type {FacultyMember | null} */
	let selectedFaculty = $state(null);
	let selectedLabel = $state('');
	/** @type {HTMLDivElement | undefined} */
	let modalEl = $state();
	/** @type {HTMLElement | null} */
	let lastFocused = null;
	/** @param {FacultyMember} member */
	const cardStyle = (member) =>
		member.cutout
			? '--photo-width:' +
				member.cutout.width +
				'%;--photo-height:' +
				member.cutout.height +
				'%;--photo-left:' +
				member.cutout.left +
				'%;--photo-top:' +
				member.cutout.top +
				'%;'
			: '--photo-position:' + (member.photoPosition ?? 'center 20%') + ';';
	/**
	 * @param {FacultyMember} member
	 * @param {string} label
	 */
	async function openFaculty(member, label) {
		lastFocused = /** @type {HTMLElement | null} */ (document.activeElement);
		selectedFaculty = member;
		selectedLabel = label;
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
			<a class="back_link" href={resolve('/teaching-learning#staff-faculty-profile')}>
				<ArrowLeft size={18} />Teaching &amp; Learning
			</a>
			<p class="t_eyebrow directory_eyebrow">TEACHING &amp; LEARNING</p>
			<h1 class="t_display directory_title">FACULTY</h1>
			<p class="directory_intro">
				Managing the directory of core academic staff, monitoring accreditation compliance through
				research excellence, real-world IT applications, enriching the curriculum with current
				corporate insights and diverse professional expertise.
			</p>
		</div>
	</header>
	{#each facultyGroups as group (group.id)}
		<section
			class="directory_section"
			class:part_time_section={group.status === 'part-time'}
			id={group.id}
			aria-labelledby={group.id + '-title'}
		>
			<div class="directory_section_head">
				<span class="t_stat directory_count">{String(group.members.length).padStart(2, '0')}</span>
				<h2 class="t_stat_label directory_subhead" id={group.id + '-title'}>
					{group.title}
				</h2>
			</div>
			{#if group.status === 'full-time'}
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
			{/if}
			<div class="faculty_card_grid">
				{#each group.members as member (member.name)}
					<button
						class="faculty_portrait_card"
						type="button"
						onclick={() => openFaculty(member, group.label)}
						style={cardStyle(member)}
						aria-label={'View profile: ' + member.name}
					>
						<span class="fp_portrait">
							<span class="fp_frame" class:cutout_frame={member.cutout}>
								<img class="fp_photo" src={member.photo} alt={member.name} loading="lazy" />
							</span>
						</span>
						<span class="fp_details">
							<span class="t_card_name fp_name">{member.name}</span>
							<span class="fp_spec">{member.specialization}</span>
						</span>
					</button>
				{/each}
			</div>
		</section>
	{/each}
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
			<button class="fmodal_close" onclick={closeFaculty} aria-label="Close profile">
				<X size={24} />
			</button>
			<div class="fmodal_header">
				<img
					class="fmodal_photo"
					src={selectedFaculty.photo}
					alt={selectedFaculty.name}
					style={'object-position:' + (selectedFaculty.photoPosition ?? 'center 20%')}
				/>
				<div>
					<span class="fmodal_status">{selectedLabel}</span>
					<h3 class="t_card_name fmodal_name" id="fmodal_name">{selectedFaculty.name}</h3>
					<p class="fmodal_spec">{selectedFaculty.specialization}</p>
				</div>
			</div>
			<div class="fmodal_section">
				<h4>Educational Background</h4>
				<ul>
					{#each selectedFaculty.education as degree (degree)}
						<li>{degree}</li>
					{/each}
				</ul>
			</div>
			<div class="fmodal_section">
				<h4>Courses Handled</h4>
				<ul>
					{#each selectedFaculty.courses as course (course)}
						<li>{course}</li>
					{/each}
				</ul>
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
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: clamp(12px, 1.5vw, 24px);
		margin: 0 auto;
		width: min(1120px, calc(100% - clamp(32px, 8vw, 96px)));
		padding-bottom: clamp(60px, 6.25vw, 120px);
	}
	.faculty_portrait_card {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--c-maroon);
		border-radius: 16px;
		background: var(--c-surface);
		overflow: hidden;
		cursor: pointer;
		padding: 0;
		text-align: left;
		transition: box-shadow 0.2s;
	}
	.faculty_portrait_card:hover {
		box-shadow: 0 12px 30px #5c0f1630;
	}
	.fp_portrait {
		position: relative;
		width: 100%;
		aspect-ratio: 4 / 3;
		overflow: hidden;
		background: var(--grad-title);
	}
	.fp_frame {
		position: absolute;
		inset: 0;
	}
	/* The saved Figma cutout positions are relative to the original portrait proportions. */
	.fp_frame.cutout_frame {
		bottom: auto;
		aspect-ratio: 512 / 747;
	}
	.fp_photo {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: var(--photo-position, center 20%);
	}
	.cutout_frame .fp_photo {
		position: absolute;
		width: var(--photo-width);
		height: var(--photo-height);
		max-width: none;
		left: var(--photo-left);
		top: var(--photo-top);
		object-fit: fill;
	}
	.fp_details {
		display: grid;
		gap: 4px;
		width: 100%;
		padding: clamp(12px, 1.25vw, 18px);
		border-top: 1px solid var(--c-gold);
		overflow-wrap: anywhere;
	}
	.fp_name {
		font-size: clamp(16px, 1.45vw, 21px);
		color: var(--c-maroon-deep);
	}
	.fp_spec {
		font: 400 clamp(13px, 1vw, 15px) / 1.4 var(--font-body);
		color: var(--c-ink);
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
	.fmodal_section ul {
		margin: 0;
		padding-left: 1.2em;
	}
	.fmodal_section li + li {
		margin-top: 4px;
	}
	.fmodal_section + .fmodal_section {
		margin-top: 24px;
	}
	.part_time_section {
		padding-top: clamp(20px, 2.604vw, 50px);
	}
	@media (max-width: 900px) {
		.faculty_card_grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
	@media (max-width: 640px) {
		.faculty_card_grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}
	@media (max-width: 800px) {
		.directory_intro {
			width: 80%;
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
		.fmodal_header {
			flex-direction: column;
			align-items: start;
			gap: 20px;
		}
	}
</style>
