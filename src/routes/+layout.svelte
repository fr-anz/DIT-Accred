<script lang="ts">
	import './layout.css';
	import { page } from '$app/stores';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/Navbar.svelte';
	import PageNavbar from '$lib/components/PageNavbar.svelte';

	let { children } = $props();

	let isHome = $derived($page.url.pathname === '/');
	// Immersive routes (e.g. the secret /gallery playground) render full-screen with no chrome.
	let isImmersive = $derived($page.url.pathname.startsWith('/gallery'));
</script>

{#if !isImmersive}
	{#if isHome}
		<Navbar></Navbar>
	{:else}
		<PageNavbar></PageNavbar>
	{/if}
{/if}

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}
