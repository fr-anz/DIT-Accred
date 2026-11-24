<script lang="ts">
	import { ArrowUp } from '@lucide/svelte';

	/* Show the button once the reader is more than one screen down the page. */
	let scrollY = $state(0);
	let innerHeight = $state(0);
	let visible = $derived(innerHeight > 0 && scrollY > innerHeight);

	function backToTop() {
		const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		window.scrollTo({ top: 0, behavior: still ? 'auto' : 'smooth' });
		// Move keyboard focus to the top too, so Tab continues from the page start.
		const main = document.querySelector<HTMLElement>('main');
		if (!main || main.hasAttribute('tabindex')) return main?.focus({ preventScroll: true });
		main.setAttribute('tabindex', '-1');
		main.style.outline = 'none';
		main.addEventListener(
			'blur',
			() => {
				main.removeAttribute('tabindex');
				main.style.removeProperty('outline');
			},
			{ once: true }
		);
		main.focus({ preventScroll: true });
	}
</script>

<svelte:window bind:scrollY bind:innerHeight />

<!-- `visibility: hidden` while near the top also takes it out of the tab order. -->
<button
	class="back_to_top"
	class:visible
	type="button"
	aria-label="Back to top"
	title="Back to top"
	onclick={backToTop}
>
	<ArrowUp size={22} strokeWidth={2.25} aria-hidden="true" />
</button>

<style>
	.back_to_top {
		position: fixed;
		right: max(16px, env(safe-area-inset-right));
		bottom: max(16px, env(safe-area-inset-bottom));
		/* Above page content, below menus and modal overlays (z-index 100+). */
		z-index: 90;
		display: grid;
		place-items: center;
		width: 48px;
		height: 48px;
		padding: 0;
		border: 1px solid rgb(207 168 58 / 0.55);
		border-radius: 50%;
		background: var(--c-maroon-deep);
		color: #f6ecd6;
		box-shadow:
			0 6px 18px rgb(40 6 10 / 0.28),
			0 1px 3px rgb(40 6 10 / 0.2);
		cursor: pointer;
		opacity: 0;
		visibility: hidden;
		transform: translateY(12px) scale(0.92);
		transition:
			opacity 200ms ease,
			transform 260ms cubic-bezier(0.16, 1, 0.3, 1),
			visibility 0s linear 260ms,
			background-color 160ms ease,
			color 160ms ease,
			border-color 160ms ease;
	}

	.back_to_top.visible {
		opacity: 1;
		visibility: visible;
		transform: none;
		transition-delay: 0s;
	}

	.back_to_top :global(svg) {
		transition: transform 240ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	@media (hover: hover) {
		.back_to_top:hover {
			border-color: var(--c-gold);
			background: var(--c-gold);
			color: var(--c-maroon-deep);
		}

		.back_to_top:hover :global(svg) {
			transform: translateY(-2px);
		}
	}

	.back_to_top:active {
		transform: scale(0.94);
	}

	.back_to_top:focus-visible {
		outline: 2px solid var(--c-gold);
		outline-offset: 3px;
	}

	@media (min-width: 768px) {
		.back_to_top {
			right: 24px;
			bottom: 24px;
			width: 52px;
			height: 52px;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.back_to_top,
		.back_to_top :global(svg) {
			transition: none;
		}

		.back_to_top,
		.back_to_top:active {
			transform: none;
		}
	}
</style>
