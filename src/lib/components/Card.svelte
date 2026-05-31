<script>
	let {
		variant = 'default',
		size = 'md',
		title = undefined,
		subtitle = undefined,
		description = undefined,
		children = undefined,
		class: classProp = '',
		...restProps
	} = $props();
</script>

<div class="card card-{size} card-{variant} {classProp}" {...restProps}>
	{#if title}
		<h3 class="card-title">{title}</h3>
	{/if}

	{#if subtitle}
		<p class="card-subtitle">{subtitle}</p>
	{/if}

	{#if description}
		<p class="card-description">{description}</p>
	{/if}

	{@render children?.()}
</div>

<style>
	@reference "tailwindcss";

	.card {
		@apply transition-all duration-300;
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
	}
	.card:hover {
		box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
	}

	.card-sm {
		@apply p-4 rounded-xl;
	}

	.card-md {
		@apply p-6 rounded-2xl;
	}

	.card-lg {
		@apply p-8 rounded-3xl;
	}

	.card-default {
		@apply bg-white;
	}

	.card-maroon {
		@apply bg-[#801B1E] text-white;
	}

	.card-dark {
		@apply bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2D] text-white;
	}

	.card-gold {
		@apply bg-[#D4A843] text-[#1A1A1A];
	}

	.card-outline {
		@apply border-2 border-[#801B1E] bg-transparent;
	}
	.card-outline:hover {
		@apply bg-[#801B1E]/5;
	}

	.card-title {
		@apply text-2xl font-bold mb-2;
	}

	.card-subtitle {
		@apply text-sm font-medium italic opacity-80 mb-4;
	}

	.card-description {
		@apply text-sm leading-relaxed opacity-90;
	}
</style>
