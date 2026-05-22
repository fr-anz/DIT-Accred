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
		},
		argTypes: {
			currentPath: {
				control: { type: 'select' },
				options: ['/', '/area', '/report', '/certificate', '/accreditation']
			}
		}
	});
</script>

<Story name="Default" args={{ currentPath: '/' }} />
<Story name="Active: Level 3 Phase 2 Area" args={{ currentPath: '/area' }} />
<Story name="Active: Compliance Report" args={{ currentPath: '/report' }} />
