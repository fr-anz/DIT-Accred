<script>
	import { page } from '$app/stores';
	import ditLogo from '$lib/assets/DIT Logo.jpg';
	import {
		Home,
		FileSearchCorner,
		FolderOpen,
		Users,
		ShieldCheck,
		Calendar,
		FileText,
		PanelLeft
	} from 'lucide-svelte';

	let showNavbar = $state(false);
</script>

<!-- Navbar container -->
<nav class="side-navbar" class:showNavbar>
	<div class="navbar-header">
		<img class="logo" src={ditLogo} alt="DIT Logo" />
		<div class="header-text">
			<p class="title">Department of Information Technology</p>
			<p class="sub-title">College of Computer and Information Sciences</p>
		</div>
		<button on:click={() => (showNavbar = !showNavbar)}>
			{#if showNavbar}
				<PanelLeft />
			{:else}
				<PanelLeft />
			{/if}
		</button>
	</div>
	<!-- Navbar Items -->
	{#if showNavbar}
		<ul class="navbar-items">
			<li>
				<a href="/" class:active={$page.url.pathname === '/'}>
					<span class="icon"><Home /></span>
					<span class="label">Home</span>
				</a>
			</li>
			<li>
				<a href="/research" class:active={$page.url.pathname === '/research'}>
					<span class="icon"><FileSearchCorner /></span>
					<span class="label">Research</span>
				</a>
			</li>
			<li>
				<a href="/teaching-learning" class:active={$page.url.pathname === '/teaching-learning'}>
					<span class="icon"><FolderOpen /></span>
					<span class="label">Teaching & Learning</span>
				</a>
			</li>
			<li>
				<a href="/community" class:active={$page.url.pathname === '/community'}>
					<span class="icon"><Users /></span>
					<span class="label">Community</span>
				</a>
			</li>
			<li>
				<a href="/certification" class:active={$page.url.pathname === '/certification'}>
					<span class="icon"><ShieldCheck /></span>
					<span class="label">Certification</span>
				</a>
			</li>
			<li>
				<a href="/planning" class:active={$page.url.pathname === '/planning'}>
					<span class="icon"><Calendar /></span>
					<span class="label">Planning</span>
				</a>
			</li>
			<li>
				<a href="/compliance-report" class:active={$page.url.pathname === '/compliance-report'}>
					<span class="icon"><FileText /></span>
					<span class="label">Compliance Report</span>
				</a>
			</li>
		</ul>
	{/if}
</nav>

<style>
	/* Navbar Container */
	.side-navbar {
		position: fixed;
		top: 0.5rem;
		left: 0.5rem;
		width: auto;
		height: auto;
		border-radius: 1rem;
		flex-direction: row;
		transition:
			top 0.35s ease,
			left 0.35s ease,
			border-radius 0.35s ease;

		background-color: #ffffff;
		display: flex;
		z-index: 100;
		box-shadow: 0.5px 0 8px rgba(0, 0, 0, 0.04);
	}

	.side-navbar.showNavbar {
		top: 0;
		left: 0;
		width: 400px;
		height: 100vh;
		flex-direction: column;
		border-radius: 0;
		border-left: 1px solid #e5e7eb;
	}

	.side-navbar.showNavbar .navbar-header {
		border-bottom: 1px solid #e5e7eb;
	}

	/*Header*/
	.navbar-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1.5rem;
		border-bottom: none;
	}

	.navbar-header button {
		background: none;
		border: none;
		cursor: pointer;
		margin-left: 0.5rem;
	}

	.header-text {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
	}

	.title {
		font-size: 0.85rem;
		font-weight: 600;
		margin: 0;

		background: linear-gradient(to right, #cfa83a 0% 20%, #875f23 30% 70%, #2e0707 100% 100%);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}

	.sub-title {
		font-size: 0.7rem;
		font-weight: 500;
		font-style: italic;
		color: #111111;
		margin: 0;
	}

	.logo {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		object-fit: cover;
	}

	/* Items */

	.navbar-items {
		list-style: none;
		padding: 1rem 0;
		margin: 1rem;
	}

	.navbar-items li a {
		display: flex;
		align-items: center;
		gap: 0.875rem;
		padding: 1rem 1.5rem;
		color: #374151;
		text-decoration: none;
		font-size: 0.95rem;
		font-weight: 400;
		transition: background-color 0.15s;
	}

	.navbar-items li a:hover {
		background-color: #f3f4f6;
	}

	.navbar-items li a.active {
		background: linear-gradient(to right, #cca539 10% 20%, #825a22 55% 40%, #3d150c 100% 100%);
		color: #ffffff;
		border-radius: 15px;
		font-weight: bold;
	}
</style>
