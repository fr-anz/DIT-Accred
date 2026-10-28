<script>
	let {
		variant = 'primary',
		size = 'md',
		href = null,
		external = false,
		outline = false,
		children,
		...restProps
	} = $props();
</script>

{#if href}
	<a
		{href}
		class="btn btn-{size} btn-{variant}"
		class:btn-outline={outline}
		{...restProps}
		target={external ? '_blank' : undefined}
		rel={external ? 'noopener noreferrer' : undefined}
	>
		{@render children?.()}
	</a>
{:else}
	<button class="btn btn-{size} btn-{variant}" class:btn-outline={outline} {...restProps}>
		{@render children?.()}
	</button>
{/if}

<style>
	@reference "tailwindcss";

	.btn {
		@apply inline-flex cursor-pointer items-center justify-center gap-2 border-none font-semibold no-underline transition-all duration-200;
	}

	.btn-sm {
		@apply rounded-lg px-4 py-2 text-sm;
	}

	.btn-md {
		@apply rounded-xl px-6 py-3 text-base;
	}

	.btn-lg {
		@apply rounded-xl px-8 py-4 text-lg;
	}

	.btn-primary {
		@apply bg-[#801B1E] text-white;
	}
	.btn-primary:hover {
		@apply bg-[#661618];
	}
	.btn-primary.btn-outline {
		@apply border-2 border-[#801B1E] bg-transparent text-[#801B1E];
	}
	.btn-primary.btn-outline:hover {
		@apply bg-[#801B1E] text-white;
	}

	.btn-secondary {
		@apply bg-[#D4A843] text-[#1A1A1A];
	}
	.btn-secondary:hover {
		@apply bg-[#C49A35];
	}
	.btn-secondary.btn-outline {
		@apply border-2 border-[#D4A843] bg-transparent text-[#D4A843];
	}
	.btn-secondary.btn-outline:hover {
		@apply bg-[#D4A843] text-[#1A1A1A];
	}

	.btn-dark {
		@apply bg-[#2D2D2D] text-white;
	}
	.btn-dark:hover {
		@apply bg-[#1A1A1A];
	}
	.btn-dark.btn-outline {
		@apply border-2 border-[#2D2D2D] bg-transparent text-[#2D2D2D];
	}
	.btn-dark.btn-outline:hover {
		@apply bg-[#2D2D2D] text-white;
	}

	.btn-gold {
		@apply bg-[#D4A843] text-[#1A1A1A];
	}
	.btn-gold:hover {
		@apply bg-[#C49A35];
	}
	.btn-gold.btn-outline {
		@apply border-2 border-[#D4A843] bg-transparent text-[#D4A843];
	}
	.btn-gold.btn-outline:hover {
		@apply bg-[#D4A843] text-[#1A1A1A];
	}
</style>
