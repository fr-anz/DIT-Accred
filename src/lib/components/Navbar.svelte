<script>
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import ditLogo from '$lib/assets/DIT Logo.jpg';
	import { Menu, X } from 'lucide-svelte';

	import researchImg from '$lib/assets/nav-images/research.jpeg';
	import teachingImg from '$lib/assets/nav-images/teaching-learning.jpg';
	import communityImg from '$lib/assets/nav-images/community.JPG';
	import intlImg from '$lib/assets/nav-images/internationalization.JPG';
	import planningImg from '$lib/assets/nav-images/planning.jpeg';
	import complianceImg from '$lib/assets/nav-images/compliance.jpeg';

	let activeIndex = $state(null);
	let showNavbar = $state(false);

	let navItemEls = [];

	let activeImage = $derived(navItems[activeIndex]?.image ?? null);

	let dividerHighlight = $derived.by(() => {
		if (activeIndex === null || !navItemEls[activeIndex]) return null;
		const el = navItemEls[activeIndex];
		const parent = el.closest('.nav-body');
		if (!parent) return null;
		const elRect = el.getBoundingClientRect();
		const parentRect = parent.getBoundingClientRect();
		return elRect.top - parentRect.top + elRect.height / 2;
	});

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
		{ href: '/', label: 'Home', image: null },
		{
			href: '/research',
			label: 'Research',
			image: researchImg,
			subItems: [
				{ label: 'Policy Framework & Governance Ecosystem', href: '/research#policy' },
				{ label: 'Key Productivity Metrics & Faculty Engagement', href: '/research#productivity' },
				{ label: 'Completed Research Repository', href: '/research#research-repository' },
				{ label: 'Published & Indexed Research Directory', href: '/research#published-research' },
				{
					label: 'Competitive Research Distinctions & International Awards',
					href: '/research#research-awards'
				},
				{ label: 'Strategic Future Research Development Blueprint', href: '/research#rd-blueprint' }
			]
		},
		{
			href: '/teaching-learning',
			label: 'Teaching & Learning',
			image: teachingImg,
			subItems: [
				{
					label: 'Program Compliance & Governance Framework',
					href: '/teaching-learning#program-compliance'
				},
				{
					label: 'Curriculum Architecture & Instruction Delivery',
					href: '/teaching-learning#curriculum-architecture'
				},
				{
					label: 'Academic Staff & Faculty Profiles',
					href: '/teaching-learning#staff-faculty-profile'
				},
				{ label: 'Student Outcomes', href: '/teaching-learning#student-outcomes' },
				{
					label: 'Learner & Graduates Quality Assessment',
					href: '/teaching-learning#learner-graduate-qa'
				},
				{
					label: 'External Program Quality Assurance Badges',
					href: '/teaching-learning#external-program-qa'
				}
			]
		},
		{
			href: '/community',
			label: 'Community',
			image: communityImg,
			subItems: [
				{
					label: 'Community Extension Policy & Strategic Agenda',
					href: '/community#community-extension-agenda'
				},
				{
					label: 'Master Registry of Completed & Ongoing Extension Projects',
					href: '/community#registry-of-projects'
				},
				{
					label: 'Deep-Dive Profiles of Featured Extensions',
					href: '/community#profiles-extensions'
				},
				{ label: 'The PUP iVote++ System', href: '/community#vote-system' }
			]
		},
		{
			href: '/internationalization',
			label: 'Internationalization',
			image: intlImg,
			subItems: [
				{
					label: 'Internationalization of Research Engagement',
					href: '/internationalization#research-engagement'
				},
				{
					label: 'Internationalization of the Student Learning Experience',
					href: '/internationalization#internationalization-experience'
				}
			]
		},
		{
			href: '/planning',
			label: 'Planning and Quality Assurance',
			image: planningImg,
			description:
				"The Planning and Quality Assurance Page serves as a dedicated portal highlighting the institution's commitment to international excellence, curricular rigor, and strategic growth."
		},
		{
			href: '/compliance',
			label: 'Compliance',
			image: complianceImg,
			subItems: [
				{
					label: 'Quality Assurance & Institutional Accreditations',
					href: '/compliance#qa-accreditations'
				},
				{ label: 'Core Operational Pillars', href: '/compliance#core-pillars' },
				{ label: 'Quality Management Systems (ISO 9001:2015)', href: '/compliance#qms' }
			]
		}
	];
</script>

<svelte:window onkeydown={(e) => e.key === 'Escape' && (showNavbar = false)} />

{#if !showNavbar}
	<button class="compact-pill" onclick={() => (showNavbar = true)} aria-label="Open menu">
		<img class="logo" src={ditLogo} alt="DIT Logo" />
		<span class="pill-label">Department of Information Technology</span>
		<Menu size={18} strokeWidth={1.5} />
	</button>
{/if}

{#if showNavbar}
	<button
		class="overlay-backdrop"
		onclick={() => (showNavbar = false)}
		transition:fade={{ duration: 200 }}
		aria-label="Close menu"
	></button>

	<nav
		class="fullscreen-nav"
		class:has-image={activeImage !== null}
		aria-label="Main navigation"
		transition:slideDownAndUp={{ duration: 300 }}
		style:background-image={activeImage ? `url('${activeImage}')` : undefined}
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

		<div class="nav-body">
			<!-- Left panel -->
			<ul class="nav-items">
				{#each navItems as item, i (item.href)}
					<li style="--i: {i};" bind:this={navItemEls[i]}>
						<a
							href={item.href}
							class="nav-btn"
							class:active={activeIndex === i}
							onclick={(e) => {
								if (item.subItems?.length) {
									e.preventDefault();
									activeIndex = activeIndex === i ? null : i;
								} else {
									showNavbar = false;
									activeIndex = null;
								}
							}}
						>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
			<div class="panel-divider" class:hidden={activeIndex === null}>
				{#if dividerHighlight !== null}
					<div class="divider-index" style="top: {dividerHighlight}px;"></div>
				{/if}
			</div>
			<!-- Right panel -->
			{#if activeIndex !== null}
				<div class="nav-right">
					{#if navItems[activeIndex].subItems?.length}
						<ul class="sub-items">
							{#each navItems[activeIndex].subItems as sub (sub.href)}
								<li>
									<a
										href={sub.href}
										class:active={$page.url.pathname + $page.url.hash === sub.href}
										onclick={() => {
											showNavbar = false;
											activeIndex = null;
										}}
									>
										{sub.label}
									</a>
								</li>
							{/each}
						</ul>
					{:else if navItems[activeIndex].description}
						<div class="nav-description">
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
		background: rgba(0, 0, 0, 0.7);
		padding: 2.5rem 3rem;
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}

	.fullscreen-nav::before {
		content: '';
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.7);
		z-index: 0;
		pointer-events: none;
	}

	.fullscreen-nav > * {
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
		height: 100vh;
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

	.nav-btn:hover {
		color: transparent;
		background-image: linear-gradient(to right, #cfa83a 25%, #d9d9d9 100%);
		transform: translateX(12px);
		padding-left: 4px;

		-webkit-background-clip: text;
		background-clip: text;
	}

	.nav-btn.active {
		color: transparent;
		background-image: linear-gradient(to right, #cfa83a 25%, #d9d9d9 100%);
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

	/* Right panel */
	.nav-right {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
		max-height: 63vh;
	}

	.sub-items {
		list-style: none;
		padding: 0;
		margin: 0;

		display: flex;
		flex-direction: column;
		gap: 2rem;
		justify-content: center;

		width: min(650px, 100%);
		height: 100%;
		max-height: 63vh;
		overflow-y: auto;
	}

	.sub-items a {
		display: block;
		padding: 0.6rem 1.25rem;
		border: 1px solid rgba(255, 255, 255, 0.2);
		background-color: rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		text-decoration: none;
		color: rgba(217, 217, 217, 1);
		font-size: clamp(1rem, 1.2vw, 1.2em);
		font-weight: 700;
		transition:
			background 0.2s ease,
			border-color 0.2s ease,
			color 0.2s ease;
	}

	.sub-items a:hover {
		background: rgba(255, 255, 255, 0.08);
		border-color: rgba(255, 255, 255, 0.4);
		color: #fff;
	}

	.sub-items a.active {
		background: rgba(255, 255, 255, 0.8);
		color: #875f23;
		font-weight: 600;
	}

	.nav-description {
		padding: 1rem 0;
	}

	.nav-description p {
		color: rgba(255, 255, 255, 0.6);
		font-size: clamp(1rem, 2vw, 2rem);
		line-height: 1.7;
		max-width: 512px;
		font-style: italic;
	}

	.panel-divider {
		position: relative;
		width: 5px;
		background: rgba(255, 255, 255, 0.15);
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
		width: 5px;
		height: 80px;
		background: linear-gradient(to top, #ffe59f 30%, #fffefc 100%);
		border-radius: 9999px;
		transition: top 0.3s cubic-bezier(0.16, 1, 0.3, 1);
	}
</style>
