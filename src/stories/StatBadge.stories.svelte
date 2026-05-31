<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { StatBadge } from '$lib';

	const { Story } = defineMeta({
		title: 'Components/StatBadge',
		component: StatBadge
	});
</script>

<Story name="Default">
	<StatBadge value="100+" label="Industry partnerships worldwide" />
</Story>

<Story name="Without Icon">
	<StatBadge value="95.31%" label="Graduate employability rate" />
</Story>

<Story name="Multiple">
	<div class="badges-stack">
		<StatBadge value="100+" label="Industry partnerships worldwide" />
		<StatBadge value="95.31%" label="Graduate employability rate" />
		<StatBadge value="10 Orgs" label="Student Organizations" />
	</div>
</Story>

<style>
	@reference "tailwindcss";

	.badges-stack {
		@apply space-y-3 max-w-xs;
	}
</style>
