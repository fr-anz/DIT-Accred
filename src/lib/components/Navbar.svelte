<script lang="ts">
	import ditLogo from '$lib/assets/DIT Logo.svg';

	interface NavItem {
		label: string;
		href: string;
	}

	interface Props {
		currentPath?: string;
	}

	let { currentPath = '/' }: Props = $props();

	const navItems: NavItem[] = [
		{ label: 'Home', href: '/' },
		{ label: 'Level 3 Phase 2 Area', href: '/area' },
		{ label: 'Compliance Report', href: '/report' },
		{ label: 'Certificate of Authenticity', href: '/certificate' },
		{ label: 'CHED & AACPUP Accreditation', href: '/accreditation' }
	];

	let hoveredItem = $state<NavItem | null>(null);
	let previewTop = $state(0);
	let iframeLoaded = $state(false);

	function handleMouseEnter(item: NavItem, event: MouseEvent) {
		iframeLoaded = false;
		hoveredItem = item;
		const el = event.currentTarget as HTMLElement;
		const rect = el.getBoundingClientRect();
		previewTop = rect.top + rect.height / 2;
	}

	function handleMouseLeave() {
		hoveredItem = null;
	}
</script>

<!-- Outer glass shell -->
<nav
	class="navbar-shell fixed left-3 top-1/2 z-50 -translate-y-1/2"
	onmouseleave={handleMouseLeave}
>
	<!-- Inner gold pill -->
	<div class="navbar-pill flex flex-col items-center gap-3 rounded-full px-2 py-6">
		<!-- DIT Logo -->
		<div class="mb-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/20 shadow-sm">
			<img src={ditLogo} alt="DIT Logo" class="h-7 w-7 rounded-full" />
		</div>

		<!-- Nav Items -->
		{#each navItems as item, i}
			<a
				href={item.href}
				class="nav-icon flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200
					{currentPath === item.href ? 'active-icon' : 'inactive-icon'}"
				onmouseenter={(e) => handleMouseEnter(item, e)}
				aria-label={item.label}
			>
				{#if i === 0}
					<!-- Home -->
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
						<path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
					</svg>
				{:else if i === 1}
					<!-- Level 3 -->
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
						<path stroke-linecap="round" stroke-linejoin="round" d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
					</svg>
				{:else if i === 2}
					<!-- Compliance report -->
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
						<path stroke-linecap="round" stroke-linejoin="round" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
					</svg>
				{:else if i === 3}
					<!-- Certificate of authenticity -->
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
						<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
					</svg>
				{:else}
					<!-- Accreditation -->
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
						<path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
					</svg>
				{/if}
			</a>
		{/each}
	</div>
</nav>

<!-- Hover Preview -->
{#if hoveredItem}
	<div
		class="pointer-events-none fixed z-40"
		style="left: 90px; top: {previewTop}px; transform: translateY(-50%);"
	>
		<div class="preview-card overflow-hidden rounded-xl bg-white shadow-xl">
			<!-- Label -->
			<div class="px-3 py-2">
				<span class="text-sm font-semibold text-gray-800">{hoveredItem.label}</span>
			</div>
			<!-- Page thumbnail -->
			<div class="preview-iframe-wrap">
				<iframe
					src={hoveredItem.href}
					title="{hoveredItem.label} preview"
					scrolling="no"
					tabindex="-1"
					class="preview-iframe"
					onload={() => (iframeLoaded = true)}
				></iframe>
				{#if !iframeLoaded}
					<div class="absolute inset-0 flex items-center justify-center bg-gray-50">
						<div class="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"></div>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	/* Outer glass shell - the rounded border frame */
	.navbar-shell {
		padding: 5px;
		border-radius: 9999px;
		background: rgba(255, 255, 255, 0.1);
    	backdrop-filter: blur(10px);
    	-webkit-backdrop-filter: blur(10px);
    	border: 1px solid rgba(255, 255, 255, 0.5);
	}

	/* Inner gold pill */
	.navbar-pill {
		background: rgba(204, 164, 58, 0.8);   /* CCA43A at low opacity */
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(5px);
		border: 0.5px solid rgba(204, 164, 58, 0.3);  /* gold edge */
		box-shadow: 0 4px 20px rgba(204, 164, 58, 0.3);  /* gold glow */
		border-radius: 9999px;
	}

	/* Inactive nav icons */
	:global(.inactive-icon) {
		background: linear-gradient(
		to right,
		rgba(217, 217, 217, 0.3) 1%,
		rgba(198, 195, 188, 0.3) 27%,
		rgba(193, 190, 180, 0.3) 48%,
		rgba(173, 166, 149, 0.3) 77%,
		rgba(148, 137, 109, 0.3) 100%);
		box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.15);
		color: rgba(255, 255, 255, 1);
	}

	/* Active nav icon */
	:global(.active-icon) {
		background: #FFFFFFA6;
		color: #7a3b1f;
	}

	/* Hover */
	:global(.nav-icon:hover:not(.active-icon)) {
		background: #FFFFFFA6;
		color: #7a3b1f;
	}

	/* Preview card */
	.preview-card {
		width: 180px;
		border: 2px solid rgba(255, 255, 255, 0.9);
		box-shadow: 0 8px 30px rgba(0, 0, 0, 0.25);
	}

	.preview-iframe-wrap {
		width: 180px;
		height: 120px;
		overflow: hidden;
		position: relative;
	}

	.preview-iframe {
		width: 1080px;
		height: 720px;
		transform: scale(0.167);
		transform-origin: top left;
		border: none;
		pointer-events: none;
	}
</style>
