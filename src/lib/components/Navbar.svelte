<script>
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
	import ditLogo from '$lib/assets/DIT Logo.jpg';
	import { Menu, X } from 'lucide-svelte';

	let activeIndex = $state(null);
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
		{ href: '/', label: 'Home' },
		{
			href: '/research',
			label: 'Research',
			subItems: [
				{ label: 'Criterion 2: Culture of Research and Creativity', href: '#criterion' },
				{ label: 'Policy Framework & Governance Ecosystem', href: '#policy' },
				{ label: 'Key Productivity Metrics & Faculty Engagement', href: '#productivity' },
				{ label: 'Completed Research Repository', href: '#research-repository' },
				{ label: 'Published & Indexed Research Directory', href: '#published-research' },
				{
					label: 'Competitive Research Distinctions & International Awards',
					href: '#research-awards'
				},
				{ label: 'Strategic Future Research Development Blueprint', href: '#rd-blueprint' }
			]
		},
		{
			href: '/teaching-learning',
			label: 'Teaching & Learning',
			subItems: [
				{ label: 'Program Compliance & Governance Framework', href: '#program-compliance' },
				{
					label: 'Curriculum Architecture & Instruction Delivery',
					href: '#curriculum-architecture'
				},
				{ label: 'Academic Staff & Faculty Profiles', href: '#staff-faculty-profile' },
				{ label: 'Student Outcomes', href: '#student-outcomes' },
				{ label: 'Learner & Graduates Quality Assessment', href: '#learner-graduate-qa' },
				{ label: 'External Program Quality Assurance Badges', href: '#external-program-qa' }
			]
		},
		{
			href: '/community',
			label: 'Community',
			subItems: [
				{
					label: 'Community Extension Policy & Strategic Agenda',
					href: '#community-extension-agenda'
				},
				{
					label: 'Master Registry of Completed & Ongoing Extension Projects',
					href: '#registry-of-projects'
				},
				{ label: 'Deep-Dive Profiles of Featured Extensions', href: '#profiles-extensions' },
				{ label: 'The PUP iVote++ System', href: '#vote-system' }
			]
		},
		{
			href: '/internationalization',
			label: 'Internationalization',
			subItems: [
				{ label: 'Internationalization of Research Engagement', href: '#research-engagement' },
				{
					label: 'Internationalization of the Student Learning Experience',
					href: '#internationalization-experience'
				}
			]
		},
		{
			href: '/planning',
			label: 'Planning and Quality Assurance',
			description:
				"The Planning and Quality Assurance Page serves as a dedicated portal highlighting the institution's commitment to international excellence, curricular rigor, and strategic growth."
		},
		{
			href: '/compliance',
			label: 'Compliance',
			subItems: [
				{ label: 'Quality Assurance & Institutional Accreditations', href: '#qa-accreditations' },
				{ label: 'Core Operational Pillars', href: '#core-pillars' },
				{ label: 'Quality Management Systems (ISO 9001:2015)', href: '#qms' }
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

		<div class="nav-body">
			<!-- Left panel -->
			<ul class="nav-items">
				{#each navItems as item, i (item.href)}
					<li style="--i: {i};">
						<button
							class="nav-btn"
							class:active={activeIndex === i}
							onclick={() => (activeIndex = activeIndex === i ? null : i)}
						>
							{item.label}
						</button>
					</li>
				{/each}
			</ul>
			<div class="panel-divider"></div>
			<!-- Right panel -->
			{#if activeIndex !== null}
				<div class="nav-right">
					{#if navItems[activeIndex].subItems?.length}
						<ul class="sub-items">
							{#each navItems[activeIndex].subItems as sub (sub.href)}
								<li>
									<a
										href={sub.href}
										class:active={$page.url.hash === sub.href}
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
		display: flex;
		flex-direction: row;
		flex: 1;
		gap: 4rem;
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

	.nav-btn:hover {
		color: #cfa83a;
		transform: translateX(12px);
		padding-left: 4px;
	}

	.nav-btn.active {
		color: #cfa83a;
		font-weight: 400;
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
		flex: 1;
		display: flex;
		align-items: flex-start;
		padding-top: 0.5rem;
		overflow-y: auto;
	}

	.sub-items {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		width: 100%;
	}

	.sub-items a {
		display: block;
		padding: 0.6rem 1.25rem;
		border: 1px solid rgba(255, 255, 255, 0.25);
		border-radius: 8px;
		text-decoration: none;
		color: rgba(255, 255, 255, 0.85);
		font-size: 0.95rem;
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
		background: rgba(207, 168, 58, 0.15);
		border-color: #cfa83a;
		color: #cfa83a;
		font-weight: 600;
	}

	.nav-description {
		padding: 1rem 0;
	}

	.nav-description p {
		color: rgba(255, 255, 255, 0.6);
		font-size: 1rem;
		line-height: 1.7;
		max-width: 420px;
		font-style: italic;
	}

	.panel-divider {
		width: 1px;
		background: rgba(255, 255, 255, 0.15);
		align-self: stretch;
	}
</style>
