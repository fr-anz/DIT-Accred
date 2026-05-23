<script>
	import ditLogo from '$lib/assets/DIT Logo.jpg';
	import {
		Home,
		FileSearchCorner,
		FolderOpen,
		Users,
		ShieldCheck,
		Calendar,
		FileText
	} from 'lucide-svelte';
</script>

<!-- Navbar container -->
<nav class="side-navbar">
	<div class="navbar-header">
		<img class="logo" src={ditLogo} alt="DIT Logo" />
		<div class="header-text">
			<p class="title">Department of Information Technology</p>
			<p class="sub-title">College of Computer and Information Sciences</p>
		</div>
	</div>
	<!-- Navbar Items -->
	<ul class="navbar-items">
		<li>
			<a href="/">
				<span class="icon"><Home /></span>
				<span class="label">Home</span>
			</a>
		</li>
		<li>
			<a href="/">
				<span class="icon"><FileSearchCorner /></span>
				<span class="label">Research</span>
			</a>
		</li>
		<li>
			<a href="/">
				<span class="icon"><FolderOpen /></span>
				<span class="label">Teaching & Learning</span>
			</a>
		</li>
		<li>
			<a href="/">
				<span class="icon"><Users /></span>
				<span class="label">Community</span>
			</a>
		</li>
		<li>
			<a href="/">
				<span class="icon"><ShieldCheck /></span>
				<span class="label">Certification</span>
			</a>
		</li>
		<li>
			<a href="/">
				<span class="icon"><Calendar /></span>
				<span class="label">Planning</span>
			</a>
		</li>
		<li>
			<a href="/">
				<span class="icon"><FileText /></span>
				<span class="label">Compliance Report</span>
			</a>
		</li>
	</ul>
</nav>

<style>
	/* Navbar Container */
	.side-navbar {
		position: fixed;
		top: 0;
		left: 0;
		width: 400px;
		height: 100vh;
		background-color: #ffffff;
		border-right: 1px solid #e5e7eb;
		display: flex;
		flex-direction: column;
		z-index: 100;
		box-shadow: 2px 0 8px (0, 0, 0, 0.04);
	}
	/*Header*/
	.navbar-header {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 1.5rem;
		border-bottom: 1px solid #e5e7eb;
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
		padding: 0.75rem 0;
		margin: 0;
	}

	.navbar-items li a {
		display: flex;
		align-items: center;
		gap: 0.875rem;
		padding: 0.75rem 1.5rem;
		color: #374151;
		text-decoration: none;
		font-size: 0.95rem;
		transition: backround-color 0.15s;
	}

	.navbar-items li a:hover {
		background-color: #f3f4f6;
	}
</style>
