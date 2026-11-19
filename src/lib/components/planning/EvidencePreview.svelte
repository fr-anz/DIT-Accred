<script lang="ts">
	import { ArrowUpRight, X } from '@lucide/svelte';
	import type { EvidenceDoc } from '#lib/data/qualityAssurance.ts';

	let { item = $bindable(null) }: { item: EvidenceDoc | null } = $props();
	let dialog: HTMLDialogElement;

	$effect(() => {
		if (item && !dialog.open) dialog.showModal();
		else if (!item && dialog.open) dialog.close();
	});
</script>

<!-- The dialog fills the viewport, so a click that lands on it (not the figure) is a backdrop click. -->
<dialog
	bind:this={dialog}
	class="preview"
	aria-label={item?.caption}
	onclose={() => (item = null)}
	onclick={(event) => event.target === dialog && dialog.close()}
>
	{#if item}
		<figure class="sheet">
			<img src={item.src} alt={item.alt} />
			<figcaption class="bar">
				<span class="bar_caption">{item.caption}</span>
				<a class="bar_link" href={item.src} target="_blank" rel="external noopener noreferrer">
					Open full size <ArrowUpRight size={15} strokeWidth={2.2} />
				</a>
			</figcaption>
		</figure>
		<button class="close" type="button" aria-label="Close preview" onclick={() => dialog.close()}>
			<X size={22} strokeWidth={2.2} />
		</button>
	{/if}
</dialog>

<style>
	:global(html:has(dialog.preview[open])) {
		overflow: hidden;
	}
	.preview {
		width: 100vw;
		max-width: none;
		height: 100dvh;
		max-height: none;
		margin: 0;
		padding: clamp(16px, 3vw, 48px);
		border: 0;
		background: transparent;
		overscroll-behavior: contain;
	}
	.preview[open] {
		display: grid;
		place-items: center;
	}
	.preview::backdrop {
		background: linear-gradient(160deg, #5c0f16e6, #1a1614f2);
		backdrop-filter: blur(6px);
	}
	.sheet {
		display: grid;
		max-width: min(760px, 100%);
		margin: 0;
		overflow: hidden;
		border-radius: 16px;
		background: var(--c-surface);
		box-shadow:
			0 0 0 1px #fac54959,
			0 40px 80px -20px #000000b3;
	}
	.sheet img {
		display: block;
		width: auto;
		max-width: 100%;
		height: auto;
		max-height: calc(100dvh - 2 * clamp(16px, 3vw, 48px) - 56px);
		margin: 0 auto;
	}
	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 16px;
		min-height: 56px;
		padding: 10px 18px;
		border-top: 3px solid var(--c-gold);
		color: var(--c-surface);
		background: linear-gradient(160deg, var(--c-maroon), var(--c-maroon-deep));
	}
	.bar_caption {
		font: 700 clamp(14px, 1vw, 17px) / 1.2 var(--font-heading);
		letter-spacing: 0.04em;
	}
	.bar_link {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		color: var(--c-gold-light);
		font: 700 13px / 1 var(--font-heading);
		letter-spacing: 0.08em;
		text-decoration: none;
		text-transform: uppercase;
		white-space: nowrap;
	}
	.bar_link:hover,
	.bar_link:focus-visible {
		color: var(--c-surface);
	}
	.close {
		position: fixed;
		top: clamp(14px, 2vw, 28px);
		right: clamp(14px, 2vw, 28px);
		display: grid;
		place-items: center;
		width: 48px;
		height: 48px;
		padding: 0;
		border: 0;
		border-radius: 50%;
		color: var(--c-maroon-deep);
		background: var(--grad-gold);
		box-shadow: 0 10px 24px #0006;
		cursor: pointer;
		transition: rotate 0.35s var(--motion-ease, ease);
	}
	.close:hover {
		rotate: 90deg;
	}
	.close:focus-visible {
		outline: 3px solid var(--c-surface);
		outline-offset: 3px;
	}

	@media (prefers-reduced-motion: no-preference) {
		.preview[open]::backdrop {
			animation: backdrop-in 0.3s ease;
		}
		.preview[open] .sheet {
			animation: sheet-in 0.45s cubic-bezier(0.16, 1, 0.3, 1);
		}
	}
	@keyframes backdrop-in {
		from {
			opacity: 0;
		}
	}
	@keyframes sheet-in {
		from {
			opacity: 0;
			scale: 0.94;
			translate: 0 16px;
		}
	}
</style>
