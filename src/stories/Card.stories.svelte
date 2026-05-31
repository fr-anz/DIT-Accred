<script module>
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Card } from '$lib';

	const { Story } = defineMeta({
		title: 'Components/Card',
		component: Card
	});
</script>

<Story name="Default">
	<Card title="Default Card" description="This is a default card with white background." />
</Story>

<Story name="Maroon">
	<Card variant="maroon" title="BSIT" subtitle="Bachelor of Science in Information Technology" description="A four-year degree program focusing on computer utilization and software." />
</Story>

<Story name="Dark">
	<Card variant="dark">
		<h3 class="story-heading">Innovation. Excellence. Future Ready</h3>
		<div class="story-stack">
			<p>Stats content</p>
		</div>
	</Card>
</Story>

<Story name="Gold">
	<Card variant="gold" title="Program Educational Objectives" description="Within 3-5 years of graduation, graduates are expected to achieve professional growth." />
</Story>

<Story name="Outline">
	<Card variant="outline" title="Outline Card" description="A card with a maroon border." />
</Story>

<Story name="Custom Content">
	<Card variant="dark" class="text-center">
		<p class="years-stat">47 <span class="years-label">years</span></p>
		<p class="years-desc">of Department's existence.<br />Coding the <strong>PUP Spirit</strong> since <strong>1979</strong></p>
	</Card>
</Story>

<style>
	@reference "tailwindcss";

	.story-heading {
		@apply text-xl font-bold mb-4;
	}

	.story-stack {
		@apply space-y-3;
	}

	.years-stat {
		@apply text-4xl font-bold text-[#D4A843] mb-2;
	}

	.years-label {
		@apply text-2xl italic;
	}

	.years-desc {
		@apply text-sm opacity-90;
	}
</style>
