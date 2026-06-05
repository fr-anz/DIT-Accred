<script lang="ts">
	import { page } from '$app/stores';
	import { resolve } from '$app/paths';
	import { ChevronDown, Menu, X } from 'lucide-svelte';
	import ditLogo from '$lib/assets/DIT Logo.jpg';
	import { navItems, type NavItem } from '$lib/data/navigation';

	const homeItem = navItems[0];
	const sectionItems = navItems.slice(1);

	let openDesktopHref = $state<string | null>(null);
	let drawerOpen = $state(false);
	let openMobileHref = $state<string | null>(null);

	let activePath = $derived($page.url.pathname);
	let activeTarget = $derived(`${$page.url.pathname}${$page.url.hash}`);

	function resolveHref(href: string) {
		return resolve(href as Parameters<typeof resolve>[0]);
	}

	function displayLabel(item: NavItem) {
		return item.href === '/planning' ? 'Planning & Quality Assurance' : item.label;
	}

	function hasSections(item: NavItem) {
		return Boolean(item.subItems?.length || item.description);
	}

	function isActive(item: NavItem) {
		return activePath === item.href;
	}

	function toggleDesktop(item: NavItem) {
		openDesktopHref = openDesktopHref === item.href ? null : item.href;
	}

	function toggleMobile(item: NavItem) {
		openMobileHref = openMobileHref === item.href ? null : item.href;
	}

	function closeMenus() {
		openDesktopHref = null;
		drawerOpen = false;
		openMobileHref = null;
	}
</script>

<svelte:window onkeydown={(event) => event.key === 'Escape' && closeMenus()} />

<nav class="page-navbar" aria-label="Main navigation">
	<div class="nav-shell">
		<a class="brand-link" href={resolveHref('/')} onclick={closeMenus}>
			<img class="brand-logo" src={ditLogo} alt="DIT Logo" />
			<span class="brand-copy">
				<span class="brand-kicker">Polytechnic University of the Philippines</span>
				<span class="brand-title"><span>Department</span> of Information Technology</span>
				<span class="brand-subtitle">College of Computer and Information Sciences</span>
			</span>
		</a>

		<div class="desktop-tabs">
			<a
				class="tab-link"
				class:active={activePath === homeItem.href}
				href={resolveHref(homeItem.href)}
				onclick={closeMenus}
			>
				{homeItem.label}
			</a>

			{#each sectionItems as item (item.href)}
				<div class="tab-group">
					<button
						class="tab-button"
						class:active={isActive(item)}
						class:open={openDesktopHref === item.href}
						type="button"
						aria-expanded={openDesktopHref === item.href}
						aria-controls={`menu-${item.href.slice(1)}`}
						onclick={() => toggleDesktop(item)}
					>
						<span>{displayLabel(item)}</span>
						<span class="chevron">
							<ChevronDown size={14} strokeWidth={1.75} />
						</span>
					</button>

					{#if openDesktopHref === item.href}
						<div class="dropdown" id={`menu-${item.href.slice(1)}`}>
							<a class="overview-link" href={resolveHref(item.href)} onclick={closeMenus}>
								<span>{displayLabel(item)}</span>
								<small>Overview</small>
							</a>

							{#if item.subItems?.length}
								<ul>
									{#each item.subItems as subItem (subItem.href)}
										<li>
											<a
												class:active={activeTarget === subItem.href}
												href={resolveHref(subItem.href)}
												onclick={closeMenus}
											>
												{subItem.label}
											</a>
										</li>
									{/each}
								</ul>
							{:else if item.description}
								<p>{item.description}</p>
							{/if}
						</div>
					{/if}
				</div>
			{/each}
		</div>

		<button
			class="drawer-toggle"
			type="button"
			aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
			aria-expanded={drawerOpen}
			onclick={() => {
				drawerOpen = !drawerOpen;
				openDesktopHref = null;
			}}
		>
			{#if drawerOpen}
				<X size={22} strokeWidth={1.75} />
			{:else}
				<Menu size={22} strokeWidth={1.75} />
			{/if}
		</button>
	</div>

	{#if drawerOpen}
		<div class="mobile-drawer">
			<a
				class="mobile-link"
				class:active={activePath === homeItem.href}
				href={resolveHref(homeItem.href)}
				onclick={closeMenus}
			>
				{homeItem.label}
			</a>

			{#each sectionItems as item (item.href)}
				<div class="mobile-group">
					<button
						class="mobile-accordion"
						class:active={isActive(item)}
						class:open={openMobileHref === item.href}
						type="button"
						aria-expanded={openMobileHref === item.href}
						onclick={() => toggleMobile(item)}
					>
						<span>{displayLabel(item)}</span>
						{#if hasSections(item)}
							<span class="chevron">
								<ChevronDown size={17} strokeWidth={1.75} />
							</span>
						{/if}
					</button>

					{#if openMobileHref === item.href}
						<div class="mobile-panel">
							<a href={resolveHref(item.href)} onclick={closeMenus}>Overview</a>

							{#if item.subItems?.length}
								{#each item.subItems as subItem (subItem.href)}
									<a
										class:active={activeTarget === subItem.href}
										href={resolveHref(subItem.href)}
										onclick={closeMenus}
									>
										{subItem.label}
									</a>
								{/each}
							{:else if item.description}
								<p>{item.description}</p>
							{/if}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	{/if}
</nav>

<style>
	.page-navbar {
		position: relative;
		z-index: 20;
		width: 100%;
		min-height: 96px;
		background: rgba(255, 255, 255, 0.61);
		background:
			linear-gradient(0deg, rgba(255, 255, 255, 0.61) 0%, rgba(255, 255, 255, 0.61) 100%),
			linear-gradient(135deg, #ffddde 2%, #fff0f0 21%, #ffffff 50%, #faf2e5 75%, #edd3a6 96%);
		border-radius: 0 0 25px 25px;
		overflow: visible;
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(18px) saturate(140%);
		-webkit-backdrop-filter: blur(18px) saturate(140%);
	}

	.nav-shell {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-height: 96px;
		padding: 0 45px;
		gap: 20px;
	}

	.brand-link {
		display: inline-flex;
		align-items: center;
		flex: 0 0 auto;
		gap: 16px;
		color: #000000;
		text-decoration: none;
	}

	.brand-logo {
		width: 50px;
		height: 50px;
		flex: 0 0 auto;
		border-radius: 50%;
		background: #ffffff;
		object-fit: cover;
	}

	.brand-copy {
		display: grid;
		color: #000000;
		line-height: 1;
	}

	.brand-kicker {
		font-family: 'Overpass', sans-serif;
		font-size: 12px;
		font-weight: 400;
		line-height: 14px;
	}

	.brand-title {
		color: #cfa83a;
		font-family: 'Montserrat', 'Overpass', sans-serif;
		font-size: 15px;
		font-weight: 700;
		line-height: 18px;
		white-space: nowrap;
	}

	.brand-title span {
		color: #cfa83a;
	}

	.brand-subtitle {
		font-family: 'Overpass', sans-serif;
		font-size: 12px;
		font-style: italic;
		font-weight: 400;
		line-height: 18px;
	}

	.desktop-tabs {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 20px;
	}

	.tab-group {
		position: relative;
	}

	.tab-link,
	.tab-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 4px;
		border: 0;
		background: transparent;
		color: #000000;
		cursor: pointer;
		font-family: 'Overpass', sans-serif;
		font-size: 16px;
		font-weight: 400;
		line-height: 22.4px;
		padding: 0;
		text-decoration: none;
		transition: color 0.2s ease;
		white-space: nowrap;
	}

	.chevron {
		flex: 0 0 auto;
		transition: transform 0.2s ease;
	}

	.tab-button.open .chevron,
	.mobile-accordion.open .chevron {
		transform: rotate(180deg);
	}

	.tab-link:hover,
	.tab-button:hover {
		color: #cfa83a;
	}

	.tab-link.active,
	.tab-button.active {
		color: #000000;
	}

	.dropdown {
		position: absolute;
		top: calc(100% + 24px);
		right: 0;
		z-index: 30;
		width: min(360px, calc(100vw - 32px));
		padding: 12px;
		border: 1px solid rgba(255, 255, 255, 0.7);
		border-radius: 14px;
		background: rgba(255, 255, 255, 0.72);
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.35),
			0 18px 48px rgba(46, 7, 7, 0.12);
		backdrop-filter: blur(18px) saturate(140%);
		-webkit-backdrop-filter: blur(18px) saturate(140%);
	}

	.overview-link {
		display: grid;
		gap: 2px;
		padding: 11px 12px;
		border-radius: 10px;
		background: rgba(255, 255, 255, 0.45);
		color: #000000;
		font-weight: 800;
		text-decoration: none;
	}

	.overview-link small {
		color: rgba(0, 0, 0, 0.62);
		font-size: 12px;
		font-weight: 600;
	}

	.dropdown ul {
		display: grid;
		gap: 2px;
		list-style: none;
		margin: 8px 0 0;
		padding: 0;
	}

	.dropdown li a,
	.mobile-panel a {
		display: block;
		border-radius: 10px;
		color: #000000;
		font-size: 14px;
		font-weight: 600;
		line-height: 1.32;
		padding: 9px 11px;
		text-decoration: none;
		transition:
			background 0.2s ease,
			color 0.2s ease;
	}

	.dropdown li a:hover,
	.dropdown li a.active,
	.mobile-panel a:hover,
	.mobile-panel a.active {
		background: rgba(255, 255, 255, 0.55);
		color: #cfa83a;
	}

	.dropdown p,
	.mobile-panel p {
		margin: 8px 0 0;
		color: rgba(0, 0, 0, 0.72);
		font-size: 14px;
		line-height: 1.55;
		padding: 0 11px 4px;
	}

	.drawer-toggle {
		display: none;
		align-items: center;
		justify-content: center;
		width: 44px;
		height: 44px;
		flex: 0 0 auto;
		border: 1px solid rgba(255, 255, 255, 0.7);
		border-radius: 12px;
		background: rgba(255, 255, 255, 0.45);
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35);
		color: #000000;
		cursor: pointer;
	}

	.mobile-drawer {
		display: none;
	}

	@media (min-width: 1600px) {
		.desktop-tabs {
			position: absolute;
			top: 35px;
			left: 637px;
			justify-content: center;
		}
	}

	@media (max-width: 1320px) {
		.nav-shell {
			padding: 0 28px;
		}

		.desktop-tabs {
			display: none;
		}

		.drawer-toggle {
			display: inline-flex;
		}

		.mobile-drawer {
			display: grid;
			gap: 6px;
			padding: 0 28px 22px;
		}

		.mobile-link,
		.mobile-accordion {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			border: 1px solid rgba(255, 255, 255, 0.7);
			border-radius: 12px;
			background: rgba(255, 255, 255, 0.22);
			color: #000000;
			cursor: pointer;
			font: inherit;
			font-size: 15px;
			font-weight: 700;
			padding: 13px 14px;
			text-align: left;
			text-decoration: none;
		}

		.mobile-link.active,
		.mobile-accordion.active {
			color: #cfa83a;
			background: rgba(255, 255, 255, 0.52);
		}

		.mobile-panel {
			display: grid;
			gap: 2px;
			padding: 6px 6px 10px 14px;
		}
	}

	@media (max-width: 560px) {
		.page-navbar {
			min-height: 78px;
			border-radius: 0 0 18px 18px;
		}

		.nav-shell {
			min-height: 78px;
			padding: 0 16px;
			gap: 12px;
		}

		.brand-link {
			min-width: 0;
			gap: 10px;
		}

		.brand-logo {
			width: 44px;
			height: 44px;
		}

		.brand-copy {
			min-width: 0;
		}

		.brand-kicker {
			font-size: 9px;
		}

		.brand-title {
			font-size: 11px;
			white-space: normal;
		}

		.brand-subtitle {
			font-size: 9px;
		}

		.drawer-toggle {
			width: 40px;
			height: 40px;
		}

		.mobile-drawer {
			padding: 0 16px 16px;
		}
	}
</style>
