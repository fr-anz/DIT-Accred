<script>
	import ditLogo from '$lib/assets/DIT Logo.jpg';
</script>

<footer class="footer_container">
	<div class="footer_content">
		<!-- Left: Brand logos and contact -->
		<div class="brand_column">
			<div class="logo_row">
				<img class="brand_logo" src={ditLogo} alt="DIT Logo" />
				<img class="brand_logo pup_logo" src="/img/PUP.png" alt="Polytechnic University of the Philippines logo" />
			</div>

			<div class="contact_info">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="pin_icon"
					><path
						d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0z"
					/><circle cx="12" cy="10" r="3" /></svg
				>
				<p class="address_text">
					Room 508, South Wing, Main Building Polytechnic University of the Philippines<br />
					Anonas st., Sta. Mesa, Manila
				</p>
			</div>

			<div class="social_links">
				<a
					href="https://facebook.com"
					target="_blank"
					rel="noopener noreferrer"
					class="social_btn"
					aria-label="Facebook"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg
					>
				</a>
				<a href="mailto:dit@pup.edu.ph" class="social_btn" aria-label="Email">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						><rect width="20" height="16" x="2" y="4" rx="2" /><path
							d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
						/></svg
					>
				</a>
			</div>
		</div>

		<!-- Center spacer: keeps the middle clear so the skyline stays open -->
		<div class="spacer_column" aria-hidden="true"></div>

		<!-- Middle: Portfolio navigation directory -->
		<div class="links_column">
			<h3 class="column_title">Portfolio</h3>
			<ul class="links_list">
				<li>
					<a href="/compliance" class="footer_link">Compliance Report</a>
				</li>
				<li>
					<a href="/compliance#narrative" class="footer_link">Narrative Report</a>
				</li>
				<li>
					<a href="/teaching-learning#curriculum-architecture" class="footer_link">Curriculum</a>
				</li>
				<li>
					<a href="/teaching-learning/faculty" class="footer_link">Faculty Directory</a>
				</li>
			</ul>
		</div>

		<!-- Right: Pillars navigation directory -->
		<div class="links_column">
			<h3 class="column_title">Pillars</h3>
			<ul class="links_list">
				<li>
					<a href="/teaching-learning" class="footer_link">Teaching & Learning</a>
				</li>
				<li>
					<a href="/research" class="footer_link">Research</a>
				</li>
				<li>
					<a href="/community" class="footer_link">Extension</a>
				</li>
				<li>
					<a href="/internationalization" class="footer_link">Internationalization</a>
				</li>
			</ul>
		</div>
	</div>

	<!-- Dithered dot-art skyline: PUP Pylon (left) + Carillon Tower & Main Building (right) -->
	<svg
		class="footer_art"
		viewBox="0 0 1440 300"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
		focusable="false"
	>
		<defs>
			<!-- binary dither tiles: 1 = gold glyph, 0 = gap -->
			<pattern id="ditherFine" width="20" height="18" patternUnits="userSpaceOnUse">
				<text
					font-family="'Courier New', ui-monospace, monospace"
					font-size="8"
					font-weight="700"
					fill="#cfa83a"
				>
					<tspan x="0" y="7">1010</tspan>
					<tspan x="0" y="15">0100</tspan>
				</text>
			</pattern>
			<pattern id="ditherDense" width="20" height="18" patternUnits="userSpaceOnUse">
				<text
					font-family="'Courier New', ui-monospace, monospace"
					font-size="8"
					font-weight="700"
					fill="#cfa83a"
				>
					<tspan x="0" y="7">1111</tspan>
					<tspan x="0" y="15">1011</tspan>
				</text>
			</pattern>
		</defs>

		<!-- striped dither sun -->
		<circle cx="1245" cy="72" r="46" fill="url(#ditherFine)" />
		<g fill="#5c0f16">
			<rect x="1195" y="76" width="100" height="5" />
			<rect x="1195" y="88" width="100" height="6" />
			<rect x="1195" y="101" width="100" height="7" />
		</g>

		<!-- birds -->
		<g stroke="#cfa83a" stroke-width="2" fill="none" stroke-linecap="round" opacity="0.9">
			<path d="M560 62 q7 -7 14 0 q7 -7 14 0" />
			<path d="M622 40 q5 -5 10 0 q5 -5 10 0" />
		</g>

		<!-- back hills -->
		<path
			d="M0 300 L0 268 C 140 246, 260 254, 400 264 C 540 274, 640 250, 800 258 C 960 266, 1080 246, 1240 256 C 1340 262, 1400 258, 1440 260 L1440 300 Z"
			fill="url(#ditherFine)"
			opacity="0.4"
		/>

		<!-- front hills (ground) -->
		<path
			d="M0 300 L0 282 C 160 268, 320 276, 480 284 C 640 292, 760 272, 920 280 C 1080 288, 1240 272, 1440 280 L1440 300 Z"
			fill="url(#ditherFine)"
			opacity="0.85"
		/>

		<!-- PUP Pylon -->
		<g>
			<rect x="66" y="252" width="288" height="48" fill="url(#ditherDense)" />
			<g fill="url(#ditherFine)">
				<path d="M100 300 L100 82 L107 72 L151 72 L158 82 L158 300 Z" />
				<path d="M172 300 L172 82 L179 72 L223 72 L230 82 L230 300 Z" />
				<path d="M244 300 L244 82 L251 72 L295 72 L302 82 L302 300 Z" />
			</g>
			<!-- letters knocked out of the dither: maroon voids on each pillar -->
			<g
				fill="#5c0f16"
				font-family="Georgia, 'Times New Roman', serif"
				font-weight="700"
				font-size="92"
				text-anchor="middle"
			>
				<text x="129" y="214">P</text>
				<text x="201" y="214">U</text>
				<text x="273" y="214">P</text>
			</g>
		</g>

		<!-- Carillon Tower in front of the Main Building -->
		<g>
			<!-- main building -->
			<rect x="1020" y="152" width="316" height="148" fill="url(#ditherFine)" />
			<!-- floor bands -->
			<g fill="#5c0f16">
				<rect x="1020" y="170" width="316" height="7" />
				<rect x="1020" y="192" width="316" height="7" />
				<rect x="1020" y="214" width="316" height="7" />
				<rect x="1020" y="236" width="316" height="7" />
				<rect x="1020" y="258" width="316" height="7" />
			</g>
			<!-- roof slab -->
			<rect x="1008" y="140" width="340" height="12" fill="url(#ditherDense)" />
			<!-- obelisk -->
			<path d="M1046 300 L1051 66 L1060 50 L1076 50 L1085 66 L1090 300 Z" fill="url(#ditherDense)" />
			<path d="M1060 50 L1068 30 L1076 50 Z" fill="url(#ditherDense)" />
			<!-- platform steps -->
			<g stroke="#cfa83a" stroke-width="3" stroke-linecap="round">
				<line x1="1034" y1="276" x2="1102" y2="276" />
				<line x1="1022" y1="286" x2="1114" y2="286" />
				<line x1="1010" y1="296" x2="1126" y2="296" />
			</g>
			<!-- landscaping bushes -->
			<g fill="url(#ditherDense)">
				<ellipse cx="1000" cy="266" rx="26" ry="14" />
				<ellipse cx="1368" cy="264" rx="32" ry="16" />
				<ellipse cx="980" cy="280" rx="18" ry="10" />
			</g>
		</g>
	</svg>
</footer>

<style>
	.footer_container {
		background-color: #5c0f16; /* Deep rich maroon */
		color: #ffffff;
		font-family: 'Inter', sans-serif;
		width: 100%;
		border-top: none;
		overflow: hidden;
	}

	.footer_content {
		max-width: 1200px;
		margin: 0 auto;
		padding: 4rem 2rem 0;
		display: grid;
		grid-template-columns: 2fr 1.5fr 1fr 1fr;
		gap: 3rem;
	}

	@media (max-width: 768px) {
		.footer_content {
			grid-template-columns: 1fr;
			gap: 2rem;
			padding: 3rem 1.5rem 0;
		}

		.spacer_column {
			display: none;
		}
	}

	.brand_column {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.logo_row {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.brand_logo {
		width: 64px;
		height: 64px;
		border-radius: 50%;
		background: #ffffff;
		object-fit: cover;
	}

	.pup_logo {
		background: transparent;
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
		color: rgba(255, 255, 255, 0.8);
		margin: 0;
	}

	.social_links {
		display: flex;
		gap: 0.75rem;
		align-items: center;
	}

	.social_btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 34px;
		height: 34px;
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

	.links_column {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.column_title {
		font-family: 'Overpass', sans-serif;
		font-size: 1.15rem;
		font-weight: 700;
		color: #fffefc;
		margin: 0;
		letter-spacing: 0.02em;
	}

	.links_list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.85rem;
	}

	.footer_link {
		color: rgba(255, 255, 255, 0.8);
		text-decoration: none;
		font-size: 0.88rem;
		transition: color 0.2s ease;
		display: inline-block;
	}

	.footer_link:hover {
		color: #cfa83a;
		text-decoration: underline;
	}

	.footer_art {
		display: block;
		width: 100%;
		height: auto;
		margin-top: 1rem;
	}
</style>
