<script lang="ts">
	import './layout.css';
	import { page } from '$app/stores';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/Navbar.svelte';
	import PageNavbar from '$lib/components/PageNavbar.svelte';

	let { children } = $props();

	let isHome = $derived($page.url.pathname === '/');
</script>

{#if isHome}
	<Navbar></Navbar>
{:else}
	<PageNavbar></PageNavbar>
{/if}

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}
