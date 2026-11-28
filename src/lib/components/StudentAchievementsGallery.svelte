<script>
	import { ChevronLeft, ChevronRight, X } from '@lucide/svelte';
	import Button from '#lib/components/Button.svelte';
	import { studentAchievementPhotos } from '#lib/data/studentAchievements.ts';
	import { competitionHonors } from '#lib/data/teachingLearning.ts';

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

<section
	class="achievements"
	id="student-achievements-awards"
	aria-label="Student achievements and awards"
>
	<div class="award_spread">
		{#each studentAchievementPhotos as photo, index (photo.src)}
			<figure class="award_item" class:award_feature={index < 3} class:award_champion={index === 0}>
				<button
					class="award_media"
					type="button"
					aria-label={`Enlarge photo: ${photo.alt}`}
					onclick={() => (selectedPhotoIndex = index)}
				>
					<img
						src={photo.photo}
						alt=""
						loading="lazy"
						decoding="async"
						width={photo.width}
						height={photo.height}
					/>
				</button>
				<figcaption class="award_labels">
					<span class="award_result">{photo.result}</span>

					<h3 class="award_team">{photo.team}</h3>
					<span class="award_event">{photo.event}</span>
				</figcaption>
			</figure>
		{/each}
	</div>
	<ul class="honors_index" aria-label="Further competition honours">
		{#each competitionHonors as honor (honor.event)}
			<li class:honor_champion={honor.place === 'Champion'}>
				<span class="honor_placement">{honor.place}</span>
				<div class="honor_copy">
					<h3 class="honor_title">{honor.title}</h3>
					<span class="honor_detail">{honor.detail}</span>
				</div>
			</li>
		{/each}
	</ul>
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
				<span class="t_meta">
					{(selectedPhotoIndex ?? 0) + 1} / {studentAchievementPhotos.length}
				</span>
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
		scroll-margin-top: 32px;
	}

	/* Editorial features: type and photography share the page, without card shells. */
	.award_spread {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		column-gap: clamp(24px, 3vw, 58px);
		row-gap: clamp(48px, 6vw, 115px);
		align-items: start;
	}
	.award_item {
		margin: 0;
		min-width: 0;
	}
	.award_media {
		position: relative;
		display: block;
		width: 100%;
		padding: 0;
		border: 0;
		border-radius: 4px;
		background: var(--c-shell);
		cursor: zoom-in;
		overflow: hidden;
	}
	.award_media img {
		display: block;
		width: 100%;
		height: auto;
		outline: 1px solid oklch(0 0 0 / 0.1);
		outline-offset: -1px;
	}
	.award_media:focus-visible {
		outline: 3px solid var(--c-gold-dark);
		outline-offset: 6px;
	}
	.award_labels {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 12px;
		margin-top: 22px;
		padding-top: 18px;
		border-top: 1px solid var(--c-gold);
		letter-spacing: 0;
	}
	.award_result {
		color: var(--c-maroon);
		font: 600 clamp(10px, 0.8vw, 14px)/1.5 var(--font-body);
		letter-spacing: 0.16em;
		text-transform: uppercase;
	}
	.award_team {
		margin: 0;
		color: var(--c-maroon-deep);
		font: 700 clamp(28px, 2.8vw, 50px)/1.05 var(--font-display);
		letter-spacing: -0.045em;
		text-wrap: balance;
	}
	.award_event {
		max-width: 36ch;
		color: var(--c-ink);
		font: 400 clamp(13px, 1vw, 18px)/1.55 var(--font-body);
		text-wrap: pretty;
	}
	.award_feature {
		grid-column: 1 / -1;
		display: grid;
		grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr);
		align-items: center;
		gap: clamp(32px, 5vw, 96px);
	}
	.award_feature .award_labels {
		margin: 0;
		padding-top: 26px;
		gap: 22px;
	}
	.award_feature .award_team {
		font-size: clamp(36px, 4.3vw, 82px);
	}
	.award_feature:not(.award_champion) .award_media {
		border-radius: 4px 4px 64px 4px;
	}
	.award_feature:not(.award_champion) {
		padding-bottom: clamp(36px, 4vw, 72px);
		border-bottom: 1px solid color-mix(in srgb, var(--c-gold) 55%, transparent);
	}
	.award_champion {
		grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.25fr);
		position: relative;
		isolation: isolate;
		padding: clamp(28px, 3.3vw, 64px) 0;
	}
	.award_champion::before {
		content: '';
		position: absolute;
		z-index: -1;
		right: 0;
		top: 0;
		bottom: 0;
		width: 42%;
		background: var(--panel-dark);
		border-radius: 4px 28px 4px 4px;
	}
	.award_champion .award_media {
		grid-column: 2;
		grid-row: 1;
		width: calc(100% - clamp(20px, 2.5vw, 48px));
		border-radius: 4px;
	}
	.award_champion .award_labels {
		grid-column: 1;
		grid-row: 1;
		border: 0;
		padding: 0;
		gap: 24px;
	}
	.award_champion .award_result {
		order: -2;
		display: flex;
		align-items: center;
		gap: 14px;
	}
	.award_champion .award_result::before {
		content: '';
		width: 34px;
		height: 2px;
		background: var(--c-gold);
	}
	.award_champion .award_team {
		font-size: clamp(44px, 5.2vw, 100px);
		line-height: 1.02;
	}
	.award_champion .award_event {
		max-width: 25ch;
		padding-top: 8px;
	}
	.award_item:nth-child(5) {
		padding-top: clamp(30px, 4vw, 76px);
	}
	.award_item:nth-child(6) {
		padding-top: clamp(60px, 8vw, 152px);
	}
	.honors_index {
		list-style: none;
		margin: clamp(50px, 6vw, 115px) 0 0;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: clamp(22px, 2.5vw, 48px);
	}
	.honors_index li {
		display: grid;
		grid-template-columns: clamp(95px, 11vw, 200px) minmax(0, 1fr);
		align-items: center;
		gap: clamp(20px, 2.5vw, 48px);
		padding: clamp(28px, 3vw, 58px);
		border-top: 2px solid var(--c-gold);
		border-bottom: 1px solid var(--c-gold);
		background: var(--panel-paper);
		color: var(--c-maroon-deep);
	}
	.honors_index .honor_champion {
		background: var(--panel-dark);
		color: var(--c-surface);
	}
	.honor_placement {
		font: 700 clamp(26px, 2.8vw, 48px)/1.1 var(--font-heading);
		letter-spacing: -0.04em;
		color: var(--c-maroon);
	}
	.honor_champion .honor_placement {
		font-size: clamp(16px, 1.5vw, 28px);
		letter-spacing: -0.02em;
		color: var(--c-gold-light);
	}
	.honor_copy {
		display: grid;
		gap: 12px;
	}
	.honor_title {
		margin: 0;
		font: 700 clamp(26px, 2.5vw, 48px)/1.1 var(--font-display);
		letter-spacing: -0.035em;
		text-wrap: balance;
	}
	.honor_detail {
		font: 400 clamp(12px, 0.95vw, 17px)/1.5 var(--font-body);
	}
	@media (prefers-reduced-motion: no-preference) {
		.award_media img {
			transition: transform 400ms cubic-bezier(0.2, 0, 0, 1);
		}
		@media (hover: hover) {
			.award_media:hover img {
				transform: scale(1.025);
			}
		}
	}
	@media (max-width: 900px) {
		.award_champion .award_team {
			font-size: clamp(38px, 5.5vw, 60px);
		}
		.award_champion .award_labels {
			gap: 16px;
		}
		.award_feature {
			gap: 28px;
		}
		.award_feature .award_team {
			font-size: 36px;
		}
		.award_team {
			font-size: 26px;
		}
	}
	@media (max-width: 650px) {
		.award_spread {
			grid-template-columns: 1fr;
			row-gap: 40px;
		}
		.award_feature {
			grid-template-columns: 1fr;
			gap: 24px;
		}
		.award_champion {
			padding: 0 0 24px;
		}
		.award_champion .award_labels {
			grid-column: 1;
			grid-row: 1;
			padding-bottom: 8px;
		}
		.award_champion .award_media {
			grid-column: 1;
			grid-row: 2;
			width: calc(100% - 20px);
		}
		.award_champion::before {
			top: auto;
			height: 36%;
			width: 65%;
			border-radius: 4px 4px 20px 4px;
		}
		.award_champion .award_team {
			font-size: clamp(44px, 10vw, 64px);
			max-width: 10ch;
		}
		.award_champion .award_event {
			max-width: none;
		}
		.award_feature:not(.award_champion) {
			gap: 0;
			padding-bottom: 40px;
		}
		.award_feature:not(.award_champion) .award_labels {
			margin-top: 24px;
			padding: 0;
			border: 0;
			gap: 14px;
		}
		.award_feature:not(.award_champion) .award_media {
			border-radius: 4px 4px 40px 4px;
		}
		.award_item:nth-child(5),
		.award_item:nth-child(6) {
			padding-top: 0;
		}
		.award_team {
			font-size: 32px;
		}
		.honors_index {
			grid-template-columns: 1fr;
		}
		.honors_index li {
			padding: 28px 20px;
			gap: 16px;
		}
	}
	@media (max-width: 360px) {
		.honors_index {
			grid-template-columns: 1fr;
		}
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
