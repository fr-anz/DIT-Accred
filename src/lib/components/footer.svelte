<script lang="ts">
</script>

<footer class="footer_container">
	<div class="footer_content">
		<!-- Left: Brand info and contact -->
		<div class="brand_column">
			<h2 class="brand_title">
				Department of Information Technology –<br />
				Polytechnic University of the Philippines
			</h2>
			
			<div class="contact_info">
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="pin_icon"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>
				<p class="address_text">
					Room 508, South Wing, Main Building Polytechnic University of the Philippines<br />
					Anonas st., Sta. Mesa, Manila
				</p>
			</div>

			<div class="social_links">
				<a href="https://facebook.com" target="_blank" rel="noopener noreferrer" class="social_btn" aria-label="Facebook">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
				</a>
				<a href="mailto:dit@pup.edu.ph" class="social_btn" aria-label="Email">
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
				</a>
			</div>

			<p class="purpose_statement">
				This site exists to make our accreditation evidence legible, navigable, and credible. It is maintained by the DIT accreditation working group.
			</p>
		</div>

		<!-- Middle: Portfolio navigation directory -->
		<div class="links_column">
			<h3 class="column_title">Portfolio</h3>
			<ul class="links_list">
				<li>
					<a href="/compliance" class="dashed_link">Compliance Report</a>
				</li>
				<li>
					<a href="/compliance#narrative" class="dashed_link">Narrative Report</a>
				</li>
				<li>
					<a href="/teaching-learning#curriculum-architecture" class="dashed_link">Curriculum</a>
				</li>
				<li>
					<a href="/teaching-learning#staff-faculty-profile" class="dashed_link">Faculty Directory</a>
				</li>
			</ul>
		</div>

		<!-- Right: Pillars navigation directory -->
		<div class="links_column">
			<h3 class="column_title">Pillars</h3>
			<ul class="links_list">
				<li>
					<a href="/teaching-learning" class="dashed_link">Teaching & Learning</a>
				</li>
				<li>
					<a href="/research" class="dashed_link">Research</a>
				</li>
				<li>
					<a href="/community" class="dashed_link">Extension</a>
				</li>
				<li>
					<a href="/internationalization" class="dashed_link">Internationalization</a>
				</li>
			</ul>
		</div>
	</div>

	<!-- Bottom Row: Gold Gradient Bar -->
	<div class="bottom_bar">
		<div class="bottom_bar_content">
			<span class="copyright_text">© 2026 PUP - DEPARTMENT OF INFORMATION TECHNOLOGY. ALL RIGHTS RESERVED.</span>
			<span class="phase_text">BUILT FOR AACCUP LEVEL IV — PHASE 2</span>
		</div>
	</div>
</footer>

<style>
	.footer_container {
		background-color: #5c0f16; /* Deep rich maroon */
		color: #ffffff;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
		width: 100%;
		border-top: 4px solid #cfa83a; /* Gold divider border */
	}

	.footer_content {
		max-width: 1200px;
		margin: 0 auto;
		padding: 4rem 2rem;
		display: grid;
		grid-template-columns: 2fr 1fr 1fr;
		gap: 3rem;
	}

	@media (max-width: 768px) {
		.footer_content {
			grid-template-columns: 1fr;
			gap: 2rem;
			padding: 3rem 1.5rem;
		}
	}

	.brand_column {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.brand_title {
		font-size: 1.15rem;
		font-weight: 700;
		line-height: 1.5;
		color: #fffefc;
		margin: 0;
	}

	.contact_info {
		display: flex;
		gap: 0.75rem;
		align-items: flex-start;
	}

	.pin_icon {
		color: #cfa83a; /* Accent gold */
		flex-shrink: 0;
		margin-top: 0.2rem;
	}

	.address_text {
		font-size: 0.85rem;
		line-height: 1.6;
		color: rgba(255, 255, 255, 0.85);
		margin: 0;
	}

	.social_links {
		display: flex;
		gap: 1rem;
		align-items: center;
	}

	.social_btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 38px;
		height: 38px;
		background: rgba(255, 255, 255, 0.08);
		border: 1px solid rgba(255, 255, 255, 0.15);
		border-radius: 50%;
		color: #ffffff;
		transition: all 0.2s ease;
		cursor: pointer;
	}

	.social_btn:hover {
		background: #cfa83a;
		border-color: #cfa83a;
		color: #5c0f16;
		transform: translateY(-2px);
	}

	.purpose_statement {
		font-size: 0.75rem;
		font-style: italic;
		line-height: 1.6;
		color: rgba(255, 255, 255, 0.6);
		margin: 0;
		max-width: 480px;
	}

	.links_column {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.column_title {
		font-size: 1.1rem;
		font-weight: 600;
		color: #fffefc;
		margin: 0;
		letter-spacing: 0.05em;
		font-family: 'Georgia', serif;
	}

	.links_list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	/* Dashed border highlighting around links from figma */
	.dashed_link {
		display: inline-block;
		color: rgba(255, 255, 255, 0.85);
		text-decoration: none;
		font-size: 0.9rem;
		padding: 0.5rem 0.75rem;
		border: 1px dashed rgba(255, 255, 255, 0.25);
		border-radius: 4px;
		transition: all 0.2s ease;
		width: 100%;
		max-width: 220px;
	}

	.dashed_link:hover {
		border-style: solid;
		border-color: #cfa83a;
		color: #cfa83a;
		background-color: rgba(255, 255, 255, 0.04);
		padding-left: 1rem;
	}

	/* Bottom Gold Strip */
	.bottom_bar {
		background: linear-gradient(90deg, #cfa83a 0%, #b8912d 50%, #9e7d20 100%);
		color: #3d0a0e; /* Dark maroon-brown for readability */
		padding: 1rem 2rem;
		font-size: 0.75rem;
		font-weight: 600;
		letter-spacing: 0.05em;
	}

	.bottom_bar_content {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		gap: 1rem;
	}

	.phase_text {
		font-style: italic;
	}

	@media (max-width: 768px) {
		.bottom_bar_content {
			flex-direction: column;
			text-align: center;
			gap: 0.5rem;
		}
	}
</style>
