<script>
	let {
		variant = 'default',
		size = 'md',
		children = undefined,
		class: classProp = '',
		...restProps
	} = $props();
</script>

<div class="card card-{size} card-{variant} {classProp}" {...restProps}>
	{@render children?.()}
</div>

<style>
	@reference "tailwindcss";

	.card {
		@apply transition-all duration-300;
		box-shadow:
			0 10px 15px -3px rgba(0, 0, 0, 0.1),
			0 4px 6px -4px rgba(0, 0, 0, 0.1);
	}
	.card:hover {
		box-shadow:
			0 20px 25px -5px rgba(0, 0, 0, 0.1),
			0 8px 10px -6px rgba(0, 0, 0, 0.1);
	}

	.card-sm {
		@apply rounded-xl;
	}

	.card-md {
		@apply rounded-3xl; /* Figma uses 35px border-radius, which maps well to 3xl */
	}

	/* --- NEW FIGMA GRADIENTS --- */
	.card-maroon {
		background: linear-gradient(116deg, rgba(146, 21, 24, 1) 0%, rgba(109, 23, 25, 1) 100%);
		@apply text-white;
	}

	.card-dark {
		background: linear-gradient(
			133deg,
			rgba(69, 21, 22, 1) 0%,
			rgba(26, 22, 20, 1) 64%,
			rgba(57, 46, 31, 1) 100%
		);
		@apply text-white;
	}

	.card-gold {
		background: linear-gradient(99deg, rgba(250, 197, 73, 1) 0%, rgba(202, 129, 6, 1) 100%);
		color: #000000;
	}
</style>
