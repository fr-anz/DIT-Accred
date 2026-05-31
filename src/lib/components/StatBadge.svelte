<script>
	let { value, label, children = undefined, ...restProps } = $props();
</script>

<div class="stat-badge" {...restProps}>
	{@render children?.()}
	<div class="stat-badge-content">
		<span class="stat-badge-value">{value}</span>
		<span class="stat-badge-label">{label}</span>
	</div>
</div>

<style>
	@reference "tailwindcss";

	.stat-badge {
		@apply flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3;
	}

	.stat-badge-content {
		@apply flex flex-col;
	}

	.stat-badge-value {
		@apply text-lg font-bold;
	}

	.stat-badge-label {
		@apply text-xs opacity-80;
	}
</style>
