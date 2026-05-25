<script>
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import ditLogo from '$lib/assets/DIT Logo.jpg';
	import {
		Home,
		FileSearch,
		FolderOpen,
		Users,
		ShieldCheck,
		Calendar,
		FileText,
		Menu,
		X
	} from 'lucide-svelte';

	let showNavbar = $state(false);

	function slideDownAndUp(node, { duration = 600 }) {
		return {
			duration,
			css: (t) => {
				const y = (1 - t) * -100;
				return `
					transform: translateY(${y}%);
					opacity: ${t};
				`;
			}
		};
	}

	const navItems = [
		{ href: '/', label: 'Home', icon: Home },
		{ href: '/research', label: 'Research', icon: FileSearch },
		{ href: '/teaching-learning', label: 'Teaching & Learning', icon: FolderOpen },
		{ href: '/community', label: 'Community', icon: Users },
		{ href: '/certification', label: 'Certification', icon: ShieldCheck },
		{ href: '/planning', label: 'Planning', icon: Calendar },
		{ href: '/compliance-report', label: 'Compliance Report', icon: FileText }
	];
</script>

<svelte:window onkeydown={(e) => e.key === 'Escape' && (showNavbar = false)} />

<button class="compact-pill" onclick={() => (showNavbar = true)} aria-label="Open menu">
	<img class="logo" src={ditLogo} alt="DIT Logo" />
	<span class="pill-label">Department of Information Technology</span>
	<Menu size={18} strokeWidth={1.5} />
</button>

{#if showNavbar}
	<div
		class="overlay-backdrop"
		onclick={() => (showNavbar = false)}
		transition:fade={{ duration: 200 }}
	></div>

	<nav
		class="fullscreen-nav"
		aria-label="Main navigation"
		transition:slideDownAndUp={{ duration: 300 }}
	>
		<div class="nav-header">
			<div class="brand">
				<img class="logo" src={ditLogo} alt="DIT Logo" />
				<div class="header-text">
					<p class="title">Department of Information Technology</p>
					<p class="sub-title">College of Computer and Information Sciences</p>
				</div>
			</div>

			<button class="close-btn" onclick={() => (showNavbar = false)} aria-label="Close menu">
				<span>Close</span>
				<X size={22} strokeWidth={1.5} />
			</button>
		</div>

		<ul class="nav-items">
			{#each navItems as item, i}
				<li style="--i: {i};">
					<a
						href={item.href}
						class:active={$page.url.pathname === item.href}
						onclick={() => (showNavbar = false)}
					>
						{item.label}
					</a>
				</li>
			{/each}
		</ul>
	</nav>
{/if}

<style>
	.compact-pill {
		position: fixed;
		top: 0.75rem;
		left: 0.75rem;
		z-index: 100;
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.5rem 1rem;
		background: #ffffff;
		border: none;
		border-radius: 9999px;
		box-shadow: 0 1px 8px rgba(0, 0, 0, 0.08);
		cursor: pointer;
		transition:
			box-shadow 0.2s ease,
			transform 0.2s ease;
	}

	.compact-pill:hover {
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.14);
		transform: translateY(-1px);
	}

	.compact-pill .logo {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		object-fit: cover;
	}

	.pill-label {
		font-size: 0.85rem;
		font-weight: 500;
		color: #111;
	}

	.overlay-backdrop {
		position: fixed;
		inset: 0;
		z-index: 999;
		background: transparent;
	}

	.fullscreen-nav {
		position: fixed;
		inset: 0;
		z-index: 1000;
		display: flex;
		flex-direction: column;
		background: rgba(0, 0, 0, 0.9);
		padding: 2.5rem 3rem;
	}

	.nav-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 8vh;
	}

	.brand {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.brand .logo {
		width: 48px;
		height: 48px;
		border-radius: 50%;
		object-fit: cover;
	}

	.header-text {
		display: flex;
		flex-direction: column;
	}

	.title {
		font-size: 0.9rem;
		font-weight: 600;
		margin: 0;
		background: #cfa83a;
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}

	.sub-title {
		font-size: 0.75rem;
		font-weight: 500;
		font-style: italic;
		color: #888;
		margin: 0;
	}

	.close-btn {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		background: none;
		border: 1px solid rgba(255, 255, 255, 0.2);
		color: #fff;
		padding: 0.5rem 1.25rem;
		border-radius: 9999px;
		cursor: pointer;
		font-size: 0.9rem;
		font-weight: 400;
		transition:
			background 0.2s ease,
			border-color 0.2s ease;
	}

	.close-btn:hover {
		background: rgba(255, 255, 255, 0.08);
		border-color: rgba(255, 255, 255, 0.35);
	}

	.nav-items {
		list-style: none;
		padding-left: 50px;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.nav-items li {
		opacity: 0;
		animation: slideTextIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
		animation-delay: calc(0.2s + (var(--i) * 0.07s));
	}

	.nav-items li a {
		display: block;
		color: #fff;
		text-decoration: none;
		font-size: clamp(2.5rem, 5vw, 4.5rem);
		font-weight: 300;
		line-height: 1.15;
		padding: 0.25rem 0;
		transition:
			color 0.25s ease,
			transform 0.25s ease,
			padding-left 0.25s ease;
		font-family: 'Georgia', 'Times New Roman', serif;
		letter-spacing: -0.02em;
	}

	@keyframes slideTextIn {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.nav-items li a:hover {
		color: #cfa83a;
		transform: translateX(12px);
		padding-left: 4px;
	}

	.nav-items li a.active {
		color: #cfa83a;
		font-weight: 400;
	}
</style>
