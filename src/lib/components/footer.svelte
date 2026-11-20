<script lang="ts">
	import { resolve } from '$app/paths';
	import { ArrowUp } from '@lucide/svelte';
	import ditSeal from '#lib/assets/dit-seal-gold.svg';
	import { navItems } from '#lib/data/navigation.ts';
	import DitherSkyline from './footer/DitherSkyline.svelte';

	const email = 'dit@pup.edu.ph';
	const year = new Date().getFullYear();

	function resolveHref(href: string) {
		const args = [href] as Parameters<typeof resolve>;
		return resolve(...args);
	}

	function quickLabel(href: string, label: string) {
		return href === '/planning' ? 'Planning & QA' : label;
	}

	function backToTop() {
		const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		window.scrollTo({ top: 0, behavior: still ? 'auto' : 'smooth' });
	}
</script>

<footer class="site_footer">
	<div class="footer_body">
		<div class="footer_lead">
			<img class="footer_seal" src={ditSeal} alt="" width="64" height="64" />
			<p class="footer_kicker">Polytechnic University of the Philippines</p>
			<p class="footer_title">Department of<br />Information Technology</p>
		</div>

		<div class="footer_info">
			<section class="info_block" aria-labelledby="footer-visit">
				<h2 id="footer-visit" class="info_label">Visit</h2>
				<address class="info_text">
					Room 508, South Wing<br />
					PUP Main Building<br />
					Anonas St., Sta. Mesa, Manila
				</address>
			</section>

			<section class="info_block" aria-labelledby="footer-write">
				<h2 id="footer-write" class="info_label">Write to us</h2>
				<a class="info_email" href="mailto:{email}">{email}</a>
			</section>

			<nav class="info_block" aria-labelledby="footer-links">
				<h2 id="footer-links" class="info_label">Quick links</h2>
				<ul class="quick_links">
					{#each navItems as item (item.href)}
						<li>
							<a class="quick_link" href={resolveHref(item.href)}>
								{quickLabel(item.href, item.label)}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		</div>

		<div class="footer_bar">
			<p>© {year} Department of Information Technology, PUP Sta. Mesa</p>
			<button class="to_top" type="button" onclick={backToTop}>
				Back to top
				<ArrowUp size={16} strokeWidth={1.75} aria-hidden="true" />
			</button>
		</div>
	</div>

	<DitherSkyline />
</footer>

<style>
	.site_footer {
		--footer-paper: #f6ecd6;
		--footer-muted: rgb(246 236 214 / 0.72);
		--footer-rule: rgb(246 236 214 / 0.14);
		background: var(--c-maroon-deep);
		color: var(--footer-paper);
		font-family: var(--font-body);
		overflow: hidden;
	}

	.footer_body {
		max-width: var(--container-max, 1280px);
		margin: 0 auto;
		padding: clamp(3.5rem, 7vw, 6rem) var(--page-pad, clamp(1rem, 4vw, 4rem)) 0;
		display: grid;
		grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
		gap: clamp(2.5rem, 5vw, 5rem);
	}

	.footer_seal {
		display: block;
		width: 64px;
		height: 64px;
		margin-bottom: 1.5rem;
	}

	.footer_kicker,
	.info_label {
		margin: 0;
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: var(--track-eyebrow);
		text-transform: uppercase;
		color: var(--c-gold);
	}

	.footer_title {
		margin: 0.75rem 0 0;
		font-family: var(--font-heading);
		font-size: clamp(1.9rem, 3.4vw, 3.25rem);
		font-weight: 700;
		line-height: 1.04;
		letter-spacing: -0.01em;
		text-wrap: balance;
	}

	.footer_info {
		display: grid;
		grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr) minmax(0, 1fr);
		gap: clamp(1.75rem, 3vw, 3rem);
		align-content: end;
	}

	.info_block {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.9rem;
		padding-top: 1.25rem;
		border-top: 1px solid var(--footer-rule);
	}

	.info_text {
		margin: 0;
		font-style: normal;
		font-size: 0.9rem;
		line-height: 1.65;
		color: var(--footer-muted);
	}

	.info_email {
		font-family: var(--font-heading);
		font-size: 1.15rem;
		font-weight: 600;
		color: var(--footer-paper);
		text-decoration: none;
		overflow-wrap: anywhere;
		transition: color 160ms ease;
	}

	.info_email:hover {
		color: var(--c-gold);
	}

	.to_top {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0;
		border: 0;
		background: none;
		font: inherit;
		font-size: 0.85rem;
		font-weight: 600;
		color: var(--footer-paper);
		text-decoration: none;
		cursor: pointer;
	}

	.quick_links {
		display: grid;
		gap: 0.55rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.quick_link {
		font-size: 0.9rem;
		color: var(--footer-muted);
		text-decoration: none;
		transition: color 160ms ease;
	}

	.quick_link:hover {
		color: var(--footer-paper);
	}

	.footer_bar {
		grid-column: 1 / -1;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 1.25rem 0 clamp(1.5rem, 3vw, 2.5rem);
		border-top: 1px solid var(--footer-rule);
	}

	.footer_bar p {
		margin: 0;
		font-size: 0.8rem;
		color: var(--footer-muted);
	}

	.to_top {
		padding: 0.55rem 0.95rem;
		border: 1px solid var(--footer-rule);
		border-radius: 999px;
		transition:
			border-color 160ms ease,
			background-color 160ms ease,
			color 160ms ease;
	}

	.to_top :global(svg) {
		transition: transform 240ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.to_top:hover {
		border-color: var(--c-gold);
		background: var(--c-gold);
		color: var(--c-maroon-deep);
	}

	.to_top:hover :global(svg) {
		transform: translateY(-2px);
	}

	.to_top:active {
		transform: scale(0.97);
	}

	.site_footer :is(a, button):focus-visible {
		outline: 2px solid var(--c-gold);
		outline-offset: 4px;
		border-radius: 4px;
	}

	.site_footer .to_top:focus-visible {
		border-radius: 999px;
	}

	@media (max-width: 1024px) {
		.footer_body {
			grid-template-columns: minmax(0, 1fr);
		}
	}

	@media (max-width: 820px) {
		.footer_info {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 480px) {
		.footer_info {
			grid-template-columns: minmax(0, 1fr);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.site_footer *,
		.site_footer :global(svg) {
			transition: none !important;
		}

		.to_top:active {
			transform: none;
		}
	}
</style>
