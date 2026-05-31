<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Button } from '$lib';

	const { Story } = defineMeta({
		title: 'Components/Button',
		component: Button
	});
</script>

{#snippet template(args)}
	<Button {...args}>
		Button
	</Button>
{/snippet}

<Story name="Primary" args={{}} {template} />
<Story name="Outline" args={{ variant: 'primary', outline: true }} {template} />
<Story name="Secondary" args={{ variant: 'secondary' }} {template} />
<Story name="Dark" args={{ variant: 'dark' }} {template} />
<Story name="Gold" args={{ variant: 'gold' }} {template} />
<Story name="AsLink" args={{ href: 'https://example.com' }} {template} />

<Story name="Sizes">
	<div class="sizes-row">
		<Button size="sm">Small</Button>
		<Button size="md">Medium</Button>
		<Button size="lg">Large</Button>
	</div>
</Story>

<style>
	@reference "tailwindcss";

	.sizes-row {
		@apply flex items-end gap-4;
	}
</style>
