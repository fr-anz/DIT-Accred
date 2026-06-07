<script>
	import { page } from '$app/stores';
	import { resolve } from '$app/paths';
	import { fade } from 'svelte/transition';
	import { onMount, tick } from 'svelte';
	import ditLogo from '$lib/assets/DIT Logo.jpg';
	import { Menu, X, ArrowRight } from 'lucide-svelte';
	import { navItems as baseNavItems } from '$lib/data/navigation';

	import researchImg from '$lib/assets/nav-images/research.jpeg';
	import teachingImg from '$lib/assets/nav-images/teaching-learning.jpg';
	import communityImg from '$lib/assets/nav-images/community.JPG';
	import intlImg from '$lib/assets/nav-images/internationalization.JPG';
	import planningImg from '$lib/assets/nav-images/planning.jpeg';
	import complianceImg from '$lib/assets/nav-images/compliance.jpeg';

	/**
	 * @typedef {import('$lib/data/navigation').NavItem & { image: string | null }} HomeNavItem
	 */

	/** @type {number | null} */
	let activeIndex = $state(null);
	let showNavbar = $state(false);
	/** @type {string | null} */
	let openMobileHref = $state(null);

	/** @type {HTMLElement[]} */
	let navItemEls = [];
	/** @type {HTMLButtonElement | null} */
	let menuButtonEl = $state(null);
	/** @type {HTMLElement | null} */
	let navEl = $state(null);

	let dividerHighlight = $derived.by(() => {
		if (activeIndex === null || !navItemEls[activeIndex]) return null;
		const el = navItemEls[activeIndex];
		const parent = el.closest('.nav-body');
		if (!parent) return null;
		const elRect = el.getBoundingClientRect();
		const parentRect = parent.getBoundingClientRect();
		return elRect.top - parentRect.top + elRect.height / 2;
	});

	/** @param {HTMLElement} node @param {{ duration?: number }} options */
	function slideDownAndUp(node, { duration = 600 } = {}) {
		return {
			duration,
			/** @param {number} t */
			css: (t) => {
				const y = (1 - t) * -100;
				return `
					transform: translateY(${y}%);
					opacity: ${t};
				`;
			}
		};
	}

	function openNavbar() {
		showNavbar = true;
		activeIndex = null;
		openMobileHref = null;
		void tick().then(() => navEl?.focus());
	}

	/** @param {{ returnFocus?: boolean }} options */
	function closeNavbar({ returnFocus = true } = {}) {
		activeIndex = null;
		openMobileHref = null;
		showNavbar = false;
		if (returnFocus) {
			void tick().then(() => menuButtonEl?.focus());
		}
	}

	/** @type {Record<string, string | null>} */
	const navImages = {
		'/': null,
		'/research': researchImg,
		'/teaching-learning': teachingImg,
		'/community': communityImg,
		'/internationalization': intlImg,
		'/planning': planningImg,
		'/compliance': complianceImg
	};

	/** @type {HomeNavItem[]} */
	const navItems = baseNavItems.map((item) => ({
		...item,
		image: navImages[item.href] ?? null
	}));

	/** @param {string} href */
	function resolveHref(href) {
		return resolve(/** @type {any} */ (href));
	}

	let activePath = $derived($page.url.pathname);
	let activeTarget = $derived(`${$page.url.pathname}${$page.url.hash}`);
	let activeImage = $derived(activeIndex !== null ? navItems[activeIndex]?.image ?? null : null);

	/** @param {HomeNavItem} item */
	function hasPanel(item) {
		return Boolean(item.subItems?.length || item.description);
	}

	/** @param {HomeNavItem} item */
	function isActive(item) {
		return activePath === item.href;
	}

	/** @param {HomeNavItem} item @param {number} index */
	function isMenuItemActive(item, index) {
		return activeIndex === null ? isActive(item) : activeIndex === index;
	}

	/** @param {number} index */
	function togglePanel(index) {
		activeIndex = activeIndex === index ? null : index;
	}

	/** @param {HomeNavItem} item */
	function toggleMobile(item) {
		openMobileHref = openMobileHref === item.href ? null : item.href;
	}

	/** @param {KeyboardEvent} event */
	function handleWindowKeydown(event) {
		if (!showNavbar) return;

		if (event.key === 'Escape') {
			closeNavbar();
			return;
		}

		if (event.key !== 'Tab' || !navEl) return;

		const focusable = Array.from(
			navEl.querySelectorAll(
				'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
			)
		).filter((el) => el instanceof HTMLElement && el.offsetParent !== null);

		if (!focusable.length) return;

		const first = /** @type {HTMLElement} */ (focusable[0]);
		const last = /** @type {HTMLElement} */ (focusable[focusable.length - 1]);

		if (event.shiftKey && document.activeElement === first) {
			event.preventDefault();
			last.focus();
		} else if (!event.shiftKey && document.activeElement === last) {
			event.preventDefault();
			first.focus();
		}
	}

	onMount(() => {
		navItems
			.map((item) => item.image)
			.filter((src) => src !== null)
			.forEach((src) => {
				const img = new Image();
				img.src = src;
			});
	});
</script>

<svelte:head>
	<link rel="preload" as="image" href={researchImg} />
</svelte:head>

<svelte:window onkeydown={handleWindowKeydown} />

{#if !showNavbar}
	<button
		class="compact-pill"
		bind:this={menuButtonEl}
		onclick={openNavbar}
		aria-label="Open menu"
		aria-expanded={showNavbar}
		aria-controls="home-navigation"
	>
		<img class="logo" src={ditLogo} alt="DIT Logo" />
		<span class="pill-label">Department of Information Technology</span>
		<Menu size={18} strokeWidth={1.5} />
	</button>
{/if}

{#if showNavbar}
	<button
		class="overlay-backdrop"
		onclick={() => closeNavbar()}
		transition:fade={{ duration: 200 }}
		aria-label="Close menu"
	></button>

	<nav
		id="home-navigation"
		class="fullscreen-nav"
		class:has-image={activeImage !== null}
		aria-label="Main navigation"
		bind:this={navEl}
		tabindex="-1"
		transition:slideDownAndUp={{ duration: 300 }}
	>
		<div class="bg-images">
			{#each navItems as item}
				{#if item.image}
					<div
						class="bg-image"
						class:visible={activeImage === item.image}
						style="background-image: url('{item.image}')"
					></div>
				{/if}
			{/each}
		</div>
		{#if activeImage}
			<div class="bg-overlay-base"></div>
			<div class="bg-overlay-left"></div>
			<div class="bg-overlay-bottom"></div>
		{/if}

		<div class="nav-header">
			<div class="brand">
				<img class="logo" src={ditLogo} alt="DIT Logo" />
				<div class="header-text">
					<p class="title">Department of Information Technology</p>
					<p class="sub-title">College of Computer and Information Sciences</p>
				</div>
			</div>
			<button class="close-btn" onclick={() => closeNavbar()} aria-label="Close menu">
				<span>Close</span>
				<X size={22} strokeWidth={1.5} />
			</button>
		</div>

		<div class="nav-body">
			<!-- Left panel -->
			<ul class="nav-items">
				{#each navItems as item, i (item.href)}
					<li class:has-panel={hasPanel(item)} style="--i: {i};" bind:this={navItemEls[i]}>
						<div class="nav-row" class:active={activeIndex === i}>
							<a
								href={resolveHref(item.href)}
								class="nav-btn"
								class:active={isMenuItemActive(item, i)}
								aria-current={isActive(item) ? 'page' : undefined}
								aria-expanded={hasPanel(item) ? activeIndex === i : undefined}
								aria-controls={hasPanel(item)
									? `nav-panel-${item.href.slice(1) || 'home'}`
									: undefined}
								onclick={(event) => {
									if (hasPanel(item)) {
										event.preventDefault();
										togglePanel(i);
									} else {
										closeNavbar({ returnFocus: false });
									}
								}}
							>
								{item.label}
							</a>
						</div>

						{#if hasPanel(item)}
							<button
								class="mobile-accordion"
								class:active={isActive(item)}
								class:open={openMobileHref === item.href}
								type="button"
								aria-expanded={openMobileHref === item.href}
								aria-controls={`mobile-menu-${item.href.slice(1) || 'home'}`}
								onclick={() => toggleMobile(item)}
							>
								<span>{item.label}</span>
							</button>

							{#if openMobileHref === item.href}
								<div class="mobile-sub-items" id={`mobile-menu-${item.href.slice(1) || 'home'}`}>
									<a
										href={resolveHref(item.href)}
										class="mobile-sub-item mobile-parent-link"
										aria-current={isActive(item) ? 'page' : undefined}
										onclick={() => closeNavbar({ returnFocus: false })}
									>
										<span>Overview</span>
										<ArrowRight size={16} strokeWidth={1.5} />
									</a>
									{#if item.subItems?.length}
										{#each item.subItems as sub (sub.href)}
											<a
												href={resolveHref(sub.href)}
												class="mobile-sub-item"
												class:active={activeTarget === sub.href}
												aria-current={activeTarget === sub.href ? 'location' : undefined}
												onclick={() => closeNavbar({ returnFocus: false })}
											>
												{sub.label}
											</a>
										{/each}
									{:else if item.description}
										<p>{item.description}</p>
									{/if}
								</div>
							{/if}
						{/if}
					</li>
				{/each}
			</ul>
			<div class="panel-divider" class:hidden={activeIndex === null}>
				{#if dividerHighlight !== null}
					<div class="divider-index" style="top: {dividerHighlight}px;"></div>
				{/if}
			</div>
			<!-- Right panel (desktop only, revealed on click) -->
			{#if activeIndex !== null}
				<div class="nav-right" id={`nav-panel-${navItems[activeIndex].href.slice(1) || 'home'}`}>
					{#if navItems[activeIndex].subItems?.length}
						<div class="right-panel-content">
							<a
								href={resolveHref(navItems[activeIndex].href)}
								class="parent-page-link"
								aria-current={isActive(navItems[activeIndex]) ? 'page' : undefined}
								onclick={() => closeNavbar({ returnFocus: false })}
							>
								<span>{navItems[activeIndex].label}</span>
								<ArrowRight size={20} strokeWidth={1.5} />
							</a>
							<ul class="sub-items">
								{#each navItems[activeIndex].subItems as sub (sub.href)}
									<li>
										<a
											href={resolveHref(sub.href)}
											class="sub-item"
											class:active={activeTarget === sub.href}
											aria-current={activeTarget === sub.href ? 'location' : undefined}
											onclick={() => closeNavbar({ returnFocus: false })}
										>
											{sub.label}
										</a>
									</li>
								{/each}
							</ul>
						</div>
					{:else if navItems[activeIndex].description}
						<div class="nav-description">
							<a
								href={resolveHref(navItems[activeIndex].href)}
								class="description-btn"
								aria-current={isActive(navItems[activeIndex]) ? 'page' : undefined}
								onclick={() => closeNavbar({ returnFocus: false })}
							>
								<span>{navItems[activeIndex].label}</span>
								<ArrowRight size={18} strokeWidth={1.5} />
							</a>
							<p>{navItems[activeIndex].description}</p>
						</div>
					{/if}
				</div>
			{/if}
		</div>
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
		border-radius: 15px;
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

	.compact-pill:focus-visible,
	.close-btn:focus-visible,
	.nav-btn:focus-visible,
	.parent-page-link:focus-visible,
	.sub-item:focus-visible,
	.description-btn:focus-visible,
	.mobile-accordion:focus-visible,
	.mobile-sub-item:focus-visible {
		outline: 2px solid rgba(207, 168, 58, 0.9);
		outline-offset: 4px;
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
		border: none;
		cursor: pointer;
		padding: 0;
	}

	.fullscreen-nav {
		position: fixed;
		inset: 0;
		z-index: 1000;
		display: flex;
		flex-direction: column;
		padding: 2.5rem 3rem;
		background: rgba(0, 0, 0, 0.7);
		overflow-y: auto;
	}

	.bg-images {
		position: absolute;
		inset: 0;
		z-index: 0;
		pointer-events: none;
		overflow: hidden;
	}

	.bg-image {
		position: absolute;
		inset: 0;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		opacity: 0;
		transition: opacity 0.6s ease;
	}

	.bg-image.visible {
		opacity: 1;
		animation: kenBurns 8s ease-out forwards;
	}

	@keyframes kenBurns {
		from {
			transform: scale(1.08);
		}
		to {
			transform: scale(1);
		}
	}

	.bg-overlay-base {
		content: '';
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.55);
		z-index: 0;
		pointer-events: none;
	}

	.bg-overlay-left {
		position: absolute;
		inset: 0;
		background: linear-gradient(to right, rgba(0, 0, 0, 0.75) 0%, transparent 55%);
		z-index: 0;
		pointer-events: none;
	}

	.bg-overlay-bottom {
		position: absolute;
		inset: 0;
		background: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, transparent 40%);
		z-index: 0;
		pointer-events: none;
	}

	.fullscreen-nav
		> *:not(.bg-images):not(.bg-overlay-base):not(.bg-overlay-left):not(.bg-overlay-bottom) {
		position: relative;
		z-index: 1;
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

	/* Two-panel body */
	.nav-body {
		display: grid;
		grid-template-columns: 1fr 1px 1fr;
		flex: 1;
		column-gap: 4rem;
		overflow: hidden;
	}
	/* Left panel */
	.nav-items {
		list-style: none;
		padding-left: 50px;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		min-width: max-content;
	}

	.nav-items li {
		opacity: 0;
		animation: slideTextIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
		animation-delay: calc(0.2s + (var(--i) * 0.07s));
	}

	.nav-row {
		display: flex;
		align-items: center;
		width: fit-content;
	}

	.nav-btn {
		background: none;
		border: none;
		cursor: pointer;
		text-align: left;
		display: block;
		color: #fff;
		text-decoration: none;
		font-size: clamp(2rem, 4vw, 3.5rem);
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

	.nav-btn:hover,
	.nav-row.active .nav-btn {
		color: transparent;
		background-image: linear-gradient(to right, #cfa83a 10%, #d9d9d9 80%);
		transform: translateX(12px);
		padding-left: 4px;

		-webkit-background-clip: text;
		background-clip: text;
	}

	.nav-btn.active {
		color: transparent;
		background-image: linear-gradient(to right, #cfa83a 10%, #d9d9d9 80%);
		font-weight: 400;

		-webkit-background-clip: text;
		background-clip: text;
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

	/* Mobile inline sub-items (hidden on desktop) */
	.mobile-accordion,
	.mobile-sub-items {
		display: none;
	}

	/* Right panel */
	.nav-right {
		display: flex;
		align-items: flex-start;
		justify-content: flex-start;
		height: 100%;
		max-height: 63vh;
		padding-top: clamp(0.25rem, 2vh, 1.5rem);
	}

	.right-panel-content {
		display: flex;
		flex-direction: column;
		gap: 1.6rem;
		width: min(620px, 100%);
		max-height: 63vh;
		overflow-y: auto;
		padding-right: 1rem;
	}

	.parent-page-link {
		display: inline-flex;
		align-items: center;
		gap: 0.65rem;
		width: fit-content;
		padding: 0 0 0.35rem;
		border-bottom: 1px solid rgba(207, 168, 58, 0.72);
		text-decoration: none;
		color: #fff;
		font-size: clamp(1.35rem, 1.8vw, 1.8rem);
		font-weight: 700;
		line-height: 1.15;
		transition:
			color 0.2s ease,
			border-color 0.2s ease,
			transform 0.2s ease;
	}

	.parent-page-link:hover {
		border-color: rgba(255, 255, 255, 0.78);
		color: #cfa83a;
		transform: translateX(4px);
	}

	.sub-items {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.sub-item {
		display: inline-block;
		width: fit-content;
		padding: 0;
		border: 0;
		background: transparent;
		text-decoration: none;
		color: rgba(255, 255, 255, 0.8);
		font-size: clamp(1rem, 1.2vw, 1.18rem);
		font-weight: 700;
		line-height: 1.42;
		transition:
			color 0.2s ease,
			transform 0.2s ease;
	}

	.sub-item:hover {
		color: #fff;
		transform: translateX(4px);
	}

	.sub-item.active {
		color: #cfa83a;
		font-weight: 800;
	}

	.nav-description {
		padding: 0;
		max-width: 560px;
	}

	.nav-description p {
		color: rgba(255, 255, 255, 0.68);
		font-size: clamp(1.15rem, 1.8vw, 1.75rem);
		line-height: 1.55;
		max-width: 480px;
		font-style: italic;
		margin: 1.75rem 0 0;
	}

	.description-btn {
		display: inline-flex;
		align-items: center;
		gap: 0.65rem;
		width: fit-content;
		padding: 0 0 0.35rem;
		border-bottom: 1px solid rgba(207, 168, 58, 0.72);
		color: #fff;
		font-size: clamp(1.35rem, 1.8vw, 1.8rem);
		font-weight: 700;
		line-height: 1.15;
		text-decoration: none;
		transition:
			color 0.2s ease,
			border-color 0.2s ease,
			transform 0.2s ease;
	}

	.description-btn:hover {
		border-color: rgba(255, 255, 255, 0.78);
		color: #cfa83a;
		transform: translateX(4px);
	}

	.panel-divider {
		position: relative;
		width: 1px;
		background: rgba(255, 255, 255, 0.18);
		align-self: stretch;
		max-height: 63vh;
	}

	.panel-divider.hidden {
		visibility: hidden;
	}

	.divider-index {
		position: absolute;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 1px;
		height: 88px;
		background: rgba(207, 168, 58, 0.95);
		border-radius: 9999px;
		transition: top 0.3s cubic-bezier(0.16, 1, 0.3, 1);
	}

	/* ── Responsive ── */

	@media (max-width: 1024px) {
		.fullscreen-nav {
			padding: 2rem 2rem;
		}

		.nav-body {
			column-gap: 2rem;
		}

		.nav-items {
			padding-left: 24px;
		}
	}

	@media (max-width: 768px) {
		.fullscreen-nav {
			padding: 1.5rem 1.25rem;
		}

		.nav-header {
			margin-bottom: 4vh;
		}

		.brand .logo {
			width: 36px;
			height: 36px;
		}

		.title {
			font-size: 0.8rem;
		}

		.sub-title {
			font-size: 0.65rem;
		}

		.nav-body {
			display: flex;
			flex-direction: column;
			column-gap: 0;
			overflow: visible;
		}

		.nav-items {
			padding-left: 0;
			gap: 0.5rem;
			min-width: 0;
		}

		.nav-btn {
			font-size: clamp(1.4rem, 6vw, 1.8rem);
			padding: 0.35rem 0;
		}

		.nav-items li.has-panel > .nav-row {
			display: none;
		}

		.nav-row {
			width: 100%;
		}

		.nav-row .nav-btn {
			width: 100%;
		}

		.mobile-accordion {
			display: flex;
			align-items: center;
			width: 100%;
			border: 1px solid rgba(255, 255, 255, 0.16);
			border-radius: 8px;
			background: rgba(255, 255, 255, 0.06);
			color: #fff;
			cursor: pointer;
			font-family: 'Georgia', 'Times New Roman', serif;
			font-size: clamp(1.4rem, 6vw, 1.8rem);
			font-weight: 300;
			line-height: 1.15;
			padding: 0.5rem 0.75rem;
			text-align: left;
			transition:
				background 0.2s ease,
				border-color 0.2s ease,
				color 0.2s ease;
		}

		.mobile-accordion:hover,
		.mobile-accordion.open,
		.mobile-accordion.active {
			border-color: rgba(255, 255, 255, 0.28);
			background: rgba(255, 255, 255, 0.1);
			color: #cfa83a;
		}

		.mobile-sub-items {
			display: flex;
			flex-direction: column;
			gap: 0.25rem;
			padding: 0.25rem 0 0.5rem 1.25rem;
			border-left: 2px solid rgba(255, 255, 255, 0.15);
			margin-left: 0.25rem;
		}

		.mobile-sub-items p {
			color: rgba(217, 217, 217, 0.82);
			font-size: 0.9rem;
			line-height: 1.55;
			margin: 0.25rem 0 0;
			padding: 0.25rem 0.75rem;
		}

		.mobile-sub-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			gap: 0.5rem;
			color: rgba(217, 217, 217, 0.85);
			text-decoration: none;
			font-size: clamp(0.85rem, 3.5vw, 1rem);
			font-weight: 500;
			padding: 0.3rem 0.75rem;
			border-radius: 6px;
			transition:
				color 0.2s ease,
				background 0.2s ease;
			word-break: break-word;
		}

		.mobile-parent-link {
			font-weight: 700;
			color: #fff;
			background: rgba(255, 255, 255, 0.08);
			border: 1px solid rgba(255, 255, 255, 0.2);
		}

		.mobile-sub-item:hover {
			color: #fff;
			background: rgba(255, 255, 255, 0.08);
		}

		.mobile-sub-item.active {
			color: #cfa83a;
			font-weight: 600;
		}

		/* Hide desktop-only right panel elements on mobile */
		.panel-divider,
		.nav-right {
			display: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.compact-pill,
		.bg-image,
		.nav-items li,
		.nav-btn,
		.parent-page-link,
		.sub-item,
		.description-btn,
		.divider-index,
		.mobile-accordion,
		.mobile-sub-item {
			animation: none;
			transition: none;
		}

		.nav-items li {
			opacity: 1;
		}

		.bg-image.visible,
		.nav-btn:hover,
		.nav-row.active .nav-btn,
		.parent-page-link:hover,
		.sub-item:hover,
		.description-btn:hover,
		.mobile-accordion.open {
			transform: none;
		}
	}
</style>
