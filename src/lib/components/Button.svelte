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
		@apply inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 cursor-pointer border-none no-underline;
	}

	.btn-sm {
		@apply px-4 py-2 text-sm rounded-lg;
	}

	.btn-md {
		@apply px-6 py-3 text-base rounded-xl;
	}

	.btn-lg {
		@apply px-8 py-4 text-lg rounded-xl;
	}

	.btn-primary {
		@apply bg-[#801B1E] text-white;
	}
	.btn-primary:hover {
		@apply bg-[#661618];
	}
	.btn-primary.btn-outline {
		@apply border-2 border-[#801B1E] text-[#801B1E] bg-transparent;
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
		@apply border-2 border-[#D4A843] text-[#D4A843] bg-transparent;
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
		@apply border-2 border-[#2D2D2D] text-[#2D2D2D] bg-transparent;
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
		@apply border-2 border-[#D4A843] text-[#D4A843] bg-transparent;
	}
	.btn-gold.btn-outline:hover {
		@apply bg-[#D4A843] text-[#1A1A1A];
	}
</style>
