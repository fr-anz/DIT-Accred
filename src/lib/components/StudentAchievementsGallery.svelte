<script>
	import { Award, ChevronLeft, ChevronRight, X } from 'lucide-svelte';
	import Button from '$lib/components/Button.svelte';
	import { studentAchievementPhotos } from '$lib/data/studentAchievements';

	/** @type {number | null} */
	let selectedPhotoIndex = $state(null);
	/** @type {HTMLDialogElement | undefined} */
	let photoDialog = $state();
	let selectedPhoto = $derived(
		selectedPhotoIndex === null ? null : studentAchievementPhotos[selectedPhotoIndex]
	);

	/** @param {HTMLDialogElement} dialog */
	function openPhoto(dialog) {
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		dialog.showModal();
		return {
			destroy() {
				document.body.style.overflow = previousOverflow;
			}
		};
	}

	/** @param {number} direction */
	function changePhoto(direction) {
		if (selectedPhotoIndex === null) return;
		selectedPhotoIndex =
			(selectedPhotoIndex + direction + studentAchievementPhotos.length) %
			studentAchievementPhotos.length;
	}
</script>

<section class="achievements" id="student-achievements-awards" aria-labelledby="achievements-title">
	<header class="section_label">
		<Award size={26} strokeWidth={1.5} class="section_icon" aria-hidden="true" />
		<h3 id="achievements-title" class="t_eyebrow">Student achievements &amp; awards</h3>
	</header>
	<hr class="section_divider" />

	<div class="photo_gallery_grid">
		{#each studentAchievementPhotos as photo, index (photo.src)}
			<button
				class="photo_gallery_card"
				type="button"
				aria-label={`Enlarge photo ${index + 1}: ${photo.alt}`}
				onclick={() => (selectedPhotoIndex = index)}
			>
				<img
					class="photo_gallery_image"
					src={photo.src}
					alt={photo.alt}
					style:object-position={photo.position}
					loading="lazy"
					decoding="async"
					width="640"
					height="640"
				/>
			</button>
		{/each}
	</div>
</section>

{#if selectedPhoto}
	<dialog
		bind:this={photoDialog}
		class="photo_dialog"
		aria-labelledby="achievement-photo-caption"
		use:openPhoto
		onclose={() => (selectedPhotoIndex = null)}
		onclick={(event) => {
			if (event.target === event.currentTarget) event.currentTarget.close();
		}}
		onkeydown={(event) => {
			if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
				event.preventDefault();
				changePhoto(event.key === 'ArrowLeft' ? -1 : 1);
			}
		}}
	>
		<div class="modal_content photo_viewer">
			<div class="close_photo">
				<Button
					size="sm"
					aria-label="Close achievement photo"
					style="min-height: 44px"
					onclick={() => photoDialog?.close()}
				>
					<X size={22} strokeWidth={1.75} aria-hidden="true" />
				</Button>
			</div>
			<figure>
				<img src={selectedPhoto.src} alt={selectedPhoto.alt} />
				<figcaption id="achievement-photo-caption" class="t_body_sm" aria-live="polite">
					{selectedPhoto.alt}
				</figcaption>
			</figure>
			<div class="viewer_controls">
				<Button
					size="sm"
					aria-label="Previous photo"
					style="min-height: 44px"
					onclick={() => changePhoto(-1)}
				>
					<ChevronLeft size={22} aria-hidden="true" />
				</Button>
				<span class="t_meta"
					>{(selectedPhotoIndex ?? 0) + 1} / {studentAchievementPhotos.length}</span
				>
				<Button
					size="sm"
					aria-label="Next photo"
					style="min-height: 44px"
					onclick={() => changePhoto(1)}
				>
					<ChevronRight size={22} aria-hidden="true" />
				</Button>
			</div>
		</div>
	</dialog>
{/if}

<style>
	.achievements {
		margin-top: clamp(45px, 4.688vw, 90px);
		scroll-margin-top: 32px;
	}

	.photo_dialog {
		width: 100%;
		height: 100%;
		max-width: none;
		max-height: none;
		margin: 0;
		padding: 1.5rem;
		border: 0;
		background: transparent;
		color: var(--c-ink);
		box-sizing: border-box;
		overscroll-behavior: contain;
	}

	.photo_dialog[open] {
		display: grid;
		place-items: center;
	}

	.photo_dialog::backdrop {
		background: rgba(22, 5, 7, 0.7);
		backdrop-filter: blur(10px);
	}

	.photo_viewer {
		padding: clamp(20px, 2.083vw, 40px);
	}

	.photo_viewer figure {
		margin: 0;
	}

	.photo_viewer img {
		display: block;
		width: 100%;
		max-height: 60dvh;
		object-fit: contain;
	}

	.photo_viewer figcaption {
		padding-top: clamp(18px, 1.563vw, 30px);
	}

	.close_photo {
		position: absolute;
		z-index: 1;
		top: 1.25rem;
		right: 1.25rem;
	}

	.viewer_controls {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 24px;
		margin-top: 20px;
		font-variant-numeric: tabular-nums;
	}
</style>
