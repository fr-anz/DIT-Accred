<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Navbar from '$lib/components/Navbar.svelte';
	import '../routes/layout.css';

	const { Story } = defineMeta({
		title: 'Components/Navbar',
		component: Navbar,
		tags: ['autodocs'],
		parameters: {
			layout: 'fullscreen',
			docs: {
				story: { inline: false, iframeHeight: 500 }
			}
		}
	});
</script>

<Story name="Default" />
