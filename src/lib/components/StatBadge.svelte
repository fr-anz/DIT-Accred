<script>
	let {
		children = undefined,
		class: classProp = '',
		...restProps
	} = $props();
</script>

<div class="stat-badge {classProp}" {...restProps}>
	{@render children?.()}
</div>

<style>
	@reference "tailwindcss";

	.stat-badge {
		@apply flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3;
	}
</style>
