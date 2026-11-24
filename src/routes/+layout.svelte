<script lang="ts">
	import './layout.css';
	import '#lib/styles/report-buttons.css';
	import '#lib/styles/polish.css';
	import { onMount } from 'svelte';
	import { initPolish } from '#lib/actions/polish.ts';
	import { page } from '$app/state';
	import Navbar from '#lib/components/Navbar.svelte';
	import PageNavbar from '#lib/components/PageNavbar.svelte';
	import BackToTop from '#lib/components/BackToTop.svelte';

	let { children } = $props();

	let isHome = $derived(page.url.pathname === '/');

	onMount(initPolish);
</script>

{#if isHome}
	<Navbar></Navbar>
{:else}
	<PageNavbar></PageNavbar>
{/if}

<svelte:head>
	<link rel="icon" href="/favicon.ico" sizes="48x48" />
	<link rel="icon" href="/favicon.png" type="image/png" sizes="64x64" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
</svelte:head>
{@render children()}

<BackToTop />
