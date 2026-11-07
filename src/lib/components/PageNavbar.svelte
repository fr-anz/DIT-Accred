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
	let closeTimeout: ReturnType<typeof setTimeout> | null = null;

	let activePath = $derived($page.url.pathname);
	let activeTarget = $derived(`${$page.url.pathname}${$page.url.hash}`);

	function resolveHref(href: string) {
		return resolve(href as Parameters<typeof resolve>[0]);
	}

	function displayLabel(item: NavItem) {
		return item.href === '/planning' ? 'Planning & Quality Assurance' : item.label;
	}

	function desktopLabel(item: NavItem) {
		return item.href === '/planning' ? 'Planning & QA' : item.label;
	}

	function hasSections(item: NavItem) {
		return Boolean(item.subItems?.length || item.description);
	}

	function isActive(item: NavItem) {
		return activePath === item.href;
	}

	function openDesktop(item: NavItem) {
		if (closeTimeout) {
			clearTimeout(closeTimeout);
			closeTimeout = null;
		}
		openDesktopHref = item.href;
	}

	function scheduleDesktopClose() {
		if (closeTimeout) clearTimeout(closeTimeout);
		closeTimeout = setTimeout(() => {
			openDesktopHref = null;
			closeTimeout = null;
		}, 150);
	}

	function toggleMobile(item: NavItem) {
		openMobileHref = openMobileHref === item.href ? null : item.href;
	}

	function closeMenus() {
		if (closeTimeout) {
			clearTimeout(closeTimeout);
			closeTimeout = null;
		}
		openDesktopHref = null;
		drawerOpen = false;
		openMobileHref = null;
	}

	function handleWindowPointerDown(event: PointerEvent) {
		if (!(event.target instanceof Element) || event.target.closest('.page-navbar')) {
			return;
		}

		closeMenus();
	}
</script>

<svelte:window
	onkeydown={(event) => event.key === 'Escape' && closeMenus()}
	onpointerdown={handleWindowPointerDown}
/>

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
				aria-current={activePath === homeItem.href ? 'page' : undefined}
				onclick={closeMenus}
			>
				{homeItem.label}
			</a>

			{#each sectionItems as item (item.href)}
				<div
					class="tab-group"
					role="none"
					onmouseenter={() => hasSections(item) && openDesktop(item)}
					onmouseleave={() => hasSections(item) && scheduleDesktopClose()}
				>
					<a
						class="tab-link section-tab"
						href={resolveHref(item.href)}
						aria-current={isActive(item) ? 'page' : undefined}
						aria-haspopup={hasSections(item) ? 'true' : undefined}
						aria-expanded={hasSections(item) ? openDesktopHref === item.href : undefined}
						aria-controls={hasSections(item) ? `menu-${item.href.slice(1)}` : undefined}
						onclick={closeMenus}
					>
						{desktopLabel(item)}
						{#if hasSections(item)}
							<span class="chevron">
								<ChevronDown size={14} strokeWidth={1.75} />
							</span>
						{/if}
					</a>

					{#if hasSections(item) && openDesktopHref === item.href}
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
			aria-controls="mobile-navigation"
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
		<div class="mobile-drawer" id="mobile-navigation">
			<a
				class="mobile-link"
				class:active={activePath === homeItem.href}
				href={resolveHref(homeItem.href)}
				aria-current={activePath === homeItem.href ? 'page' : undefined}
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
						aria-controls={`mobile-menu-${item.href.slice(1)}`}
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
						<div class="mobile-panel" id={`mobile-menu-${item.href.slice(1)}`}>
							<a
								href={resolveHref(item.href)}
								aria-current={isActive(item) ? 'page' : undefined}
								onclick={closeMenus}
							>
								Overview
							</a>

							{#if item.subItems?.length}
								{#each item.subItems as subItem (subItem.href)}
									<a
										class:active={activeTarget === subItem.href}
										href={resolveHref(subItem.href)}
										aria-current={activeTarget === subItem.href ? 'location' : undefined}
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
		position: absolute;
		top: 20px;
		left: 0;
		right: 0;
		z-index: 50;
		display: flex;
		justify-content: center;
		padding-inline: clamp(16px, 3vw, 40px);
		pointer-events: none;
	}

	.nav-shell {
		pointer-events: auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 24px;
		width: min(1400px, 100%);
		padding: 10px 12px 10px 20px;
		border-radius: 9999px;
		background: var(--c-surface);
		box-shadow:
			0 1px 8px rgba(0, 0, 0, 0.08),
			0 8px 24px rgba(0, 0, 0, 0.06);
	}

	.brand-link {
		display: inline-flex;
		align-items: center;
		flex: 0 0 auto;
		gap: 12px;
		color: var(--c-ink);
		text-decoration: none;
	}

	.brand-logo {
		width: 40px;
		height: 40px;
		flex: 0 0 auto;
		border-radius: 50%;
		background: var(--c-shell);
		object-fit: cover;
	}

	.brand-copy {
		display: grid;
		line-height: 1;
	}

	.brand-kicker {
		font-family: var(--font-body);
		font-size: 9px;
		font-weight: 500;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: rgba(26, 26, 26, 0.6);
	}

	.brand-title {
		font-family: var(--font-heading);
		font-size: 14px;
		font-weight: 700;
		color: var(--c-ink);
		white-space: nowrap;
	}

	.brand-title span {
		color: var(--c-maroon);
	}

	.brand-subtitle {
		font-family: var(--font-body);
		font-size: 9px;
		font-style: italic;
		color: rgba(26, 26, 26, 0.6);
	}

	.desktop-tabs {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		column-gap: 4px;
	}

	.tab-group {
		position: relative;
	}

	.tab-link {
		position: relative;
		display: inline-flex;
		align-items: center;
		gap: 5px;
		border: 0;
		background: transparent;
		color: var(--c-ink);
		cursor: pointer;
		font-family: var(--font-heading);
		font-size: 15px;
		font-weight: 400;
		line-height: 1.4;
		padding: 8px 10px;
		border-radius: 9999px;
		text-decoration: none;
		transition:
			color 0.2s ease,
			background 0.2s ease;
		white-space: nowrap;
	}

	.tab-link:hover {
		color: var(--c-gold-dark);
		background: rgba(207, 168, 58, 0.08);
	}

	.tab-link::after {
		position: absolute;
		right: 10px;
		bottom: 3px;
		left: 10px;
		height: 1.5px;
		border-radius: 9999px;
		background: var(--c-gold);
		content: '';
		opacity: 0;
		transform: scaleX(0.72);
		transition:
			opacity 0.2s ease,
			transform 0.2s ease;
	}

	.tab-link.active {
		color: var(--c-maroon);
		font-weight: 600;
	}

	.tab-link.active::after,
	.tab-group:focus-within .tab-link::after {
		opacity: 1;
		transform: scaleX(1);
	}

	.chevron {
		flex: 0 0 auto;
		display: inline-flex;
		transition: transform 0.2s ease;
	}

	.tab-group:is(:hover, :focus-within) .chevron {
		transform: rotate(180deg);
	}

	.dropdown {
		position: absolute;
		top: calc(100% + 14px);
		right: 0;
		z-index: 30;
		width: min(360px, calc(100vw - 32px));
		padding: 12px;
		border: 1px solid rgba(0, 0, 0, 0.06);
		border-radius: 16px;
		background: var(--c-surface);
		box-shadow:
			0 1px 8px rgba(0, 0, 0, 0.08),
			0 18px 48px rgba(0, 0, 0, 0.12);
	}

	.overview-link {
		display: grid;
		gap: 2px;
		padding: 11px 12px;
		border-radius: 10px;
		background: var(--c-shell);
		color: var(--c-ink);
		font-weight: 700;
		text-decoration: none;
	}

	.overview-link small {
		color: rgba(26, 26, 26, 0.62);
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

	.dropdown li a {
		display: block;
		border-radius: 10px;
		color: var(--c-ink);
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
	.dropdown li a.active {
		background: var(--c-shell);
		color: var(--c-gold-dark);
	}

	.drawer-toggle {
		display: none;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		flex: 0 0 auto;
		border: 0;
		border-radius: 9999px;
		background: var(--c-shell);
		color: var(--c-ink);
		cursor: pointer;
		transition:
			background 0.2s ease,
			transform 0.2s ease;
	}

	.drawer-toggle:hover {
		background: rgba(0, 0, 0, 0.06);
	}

	.drawer-toggle:active {
		transform: translateY(1px);
	}

	.mobile-drawer {
		display: none;
		pointer-events: auto;
	}

	@media (max-width: 1280px) and (min-width: 1181px) {
		.desktop-tabs {
			column-gap: 0;
		}

		.tab-link {
			font-size: 13.5px;
			padding: 8px 7px;
		}

		.tab-link::after {
			right: 7px;
			left: 7px;
		}

		.brand-kicker,
		.brand-subtitle {
			display: none;
		}

		.brand-title {
			font-size: 13px;
		}
	}

	@media (max-width: 1180px) {
		.desktop-tabs {
			display: none;
		}

		.drawer-toggle {
			display: inline-flex;
		}

		.mobile-drawer {
			display: grid;
			gap: 6px;
			position: absolute;
			top: calc(100% + 10px);
			left: clamp(16px, 3vw, 40px);
			right: clamp(16px, 3vw, 40px);
			z-index: 40;
			max-height: calc(100dvh - 120px);
			overflow-y: auto;
			padding: 16px;
			border: 1px solid rgba(0, 0, 0, 0.06);
			border-radius: 20px;
			background: var(--c-surface);
			box-shadow:
				0 1px 8px rgba(0, 0, 0, 0.08),
				0 18px 48px rgba(0, 0, 0, 0.12);
			overscroll-behavior: contain;
		}

		.mobile-link,
		.mobile-accordion {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			border: 0;
			border-radius: 12px;
			background: transparent;
			color: var(--c-ink);
			cursor: pointer;
			font: inherit;
			font-size: 15px;
			font-weight: 700;
			padding: 13px 14px;
			text-align: left;
			text-decoration: none;
			transition:
				background 0.2s ease,
				color 0.2s ease,
				transform 0.2s ease;
		}

		.mobile-link:hover,
		.mobile-accordion:hover {
			background: var(--c-shell);
		}

		.mobile-link.active,
		.mobile-accordion.active {
			color: var(--c-maroon);
			background: rgba(148, 21, 24, 0.06);
			box-shadow: inset 3px 0 0 var(--c-gold);
		}

		.mobile-accordion .chevron {
			color: rgba(26, 26, 26, 0.55);
		}

		.mobile-panel {
			display: grid;
			gap: 2px;
			padding: 6px 6px 10px 14px;
		}

		.mobile-panel a {
			display: block;
			border-radius: 10px;
			color: var(--c-ink);
			font-size: 14px;
			font-weight: 600;
			line-height: 1.32;
			padding: 9px 11px;
			text-decoration: none;
			transition:
				background 0.2s ease,
				color 0.2s ease;
		}

		.mobile-panel a:hover,
		.mobile-panel a.active {
			background: var(--c-shell);
			color: var(--c-gold-dark);
		}

		.mobile-panel p {
			margin: 8px 0 0;
			padding: 0 11px 4px;
			color: rgba(26, 26, 26, 0.72);
			font-size: 14px;
			line-height: 1.55;
		}
	}

	@media (max-width: 560px) {
		.page-navbar {
			top: 12px;
			padding-inline: 12px;
		}

		.nav-shell {
			gap: 12px;
			padding: 8px 10px 8px 14px;
		}

		.brand-logo {
			width: 36px;
			height: 36px;
		}

		.brand-kicker {
			font-size: 8px;
		}

		.brand-title {
			font-size: 12px;
		}

		.brand-subtitle {
			font-size: 8px;
		}

		.drawer-toggle {
			width: 38px;
			height: 38px;
		}

		.mobile-drawer {
			top: calc(100% + 8px);
			max-height: calc(100dvh - 90px);
			padding: 12px;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.tab-link,
		.tab-link::after,
		.chevron,
		.dropdown,
		.drawer-toggle,
		.mobile-drawer {
			transition: none;
		}
	}
</style>
