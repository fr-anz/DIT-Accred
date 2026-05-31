<script lang="ts">
	import { Star } from 'lucide-svelte';

	// camelCase variable names for rankings data
	const qsStarsMetric = {
		title: 'QS Stars',
		overallRating: '3-Star Overall Rating',
		description: 'QS Stars University Rating System alignment with global computing education standards.',
		badges: [
			{ count: 5, label: 'Employability' },
			{ count: 5, label: 'Online Learning' },
			{ count: 5, label: 'Academic Dev.' },
			{ count: 4, label: 'Facilities' }
		],
		validationModule: 'Validated Module: Teaching & IT Systems'
	};

	const wuriRankingsMetric = {
		title: 'WURI Rankings 2024',
		worldRank: '271st',
		description: 'Innovative Universities globally among 1,072 institutions.',
		items: [
			{ rank: 21, label: 'GENERATIVE AI APPLICATION' },
			{ rank: 39, label: 'STUDENT SUPPORT ENGAGEMENT' },
			{ rank: 50, label: 'SYMBOL/PROMOTION' }
		]
	};

	const impactRankingsMetric = {
		title: 'The Impact Rankings',
		rankScore: '1501+',
		description: 'Validated against UN Sustainable Development Goals (SDGs) through community digital inclusion.'
	};

	const aunQaMetric = {
		title: 'AUN-QA Network',
		description: 'Active regional alignment of learning outcomes with ASEAN higher education standards.'
	};
</script>

<div class="rankings_grid">
	<!-- 1. QS Stars Card -->
	<div class="ranking_card qs_card">
		<div class="card_header">
			<div class="header_left">
				<span class="square_icon grey_bg"></span>
				<h3 class="card_title font_sans maroon_text">{qsStarsMetric.title}</h3>
			</div>
			<div class="star_rating">
				{#each Array(5) as _, i}
					<Star size={15} fill={i < 4 ? '#cfa83a' : 'transparent'} stroke={i < 4 ? '#cfa83a' : '#cfa83a'} />
				{/each}
			</div>
		</div>

		<div class="card_body">
			<h4 class="metric_headline font_sans">{qsStarsMetric.overallRating}</h4>
			<p class="metric_description">{qsStarsMetric.description}</p>
			
			<div class="metrics_grid">
				{#each qsStarsMetric.badges as badge}
					<div class="metric_badge">
						<span class="badge_count_text">{badge.count} stars</span>
						<span class="badge_label_text">{badge.label}</span>
					</div>
				{/each}
			</div>

			<div class="card_divider"></div>
			<div class="card_footer">
				<span class="square_icon footer_square maroon_bg"></span>
				<span class="footer_text">{qsStarsMetric.validationModule}</span>
			</div>
		</div>
	</div>

	<!-- 2. WURI Rankings Card -->
	<div class="ranking_card wuri_card">
		<div class="card_header">
			<div class="header_left">
				<span class="square_icon gold_bg"></span>
				<h3 class="card_title font_sans maroon_text">{wuriRankingsMetric.title}</h3>
			</div>
			<span class="wuri_header_badge">World Rank: <strong class="gold_text">{wuriRankingsMetric.worldRank}</strong></span>
		</div>

		<div class="card_body">
			<p class="metric_description">{wuriRankingsMetric.description}</p>
			<div class="card_divider"></div>

			<div class="wuri_list">
				{#each wuriRankingsMetric.items as item}
					<div class="wuri_item">
						<div class="wuri_num_box">{item.rank}</div>
						<div class="wuri_label_wrapper">
							<span class="wuri_label">{item.label}</span>
							<span class="underline_bar"></span>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>

	<!-- 3. Column 3: Stacked Impact & AUN-QA Cards -->
	<div class="stack_column">
		<!-- 3. The Impact Rankings Card -->
		<div class="ranking_card impact_card">
			<div class="card_header">
				<span class="impact_small_title">The Impact Rankings</span>
			</div>

			<div class="card_body">
				<div class="impact_score font_sans">{impactRankingsMetric.rankScore}</div>
				<p class="impact_description">{impactRankingsMetric.description}</p>
				
				<div class="color_bars_container">
					<span class="color_bar bar_gold"></span>
					<span class="color_bar bar_mustard"></span>
					<span class="color_bar bar_red"></span>
					<span class="color_bar bar_maroon"></span>
				</div>
			</div>
		</div>

		<!-- 4. AUN-QA Network Card -->
		<div class="ranking_card aun_card">
			<div class="card_header">
				<div class="header_left">
					<span class="square_icon maroon_bg"></span>
					<h3 class="card_title font_sans maroon_text">{aunQaMetric.title}</h3>
				</div>
			</div>

			<div class="card_body">
				<p class="aun_description">{aunQaMetric.description}</p>
			</div>
		</div>
	</div>
</div>

<style>
	.font_sans {
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
	}

	.maroon_text {
		color: #5c0f16;
	}

	.gold_text {
		color: #cfa83a;
	}

	.rankings_grid {
		display: grid;
		grid-template-columns: 1.15fr 1.15fr 1fr;
		gap: 1.5rem;
		width: 100%;
		margin-top: 1.5rem;
	}

	@media (max-width: 992px) {
		.rankings_grid {
			grid-template-columns: 1fr;
		}
	}

	.stack_column {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.ranking_card {
		background-color: #ffffff;
		border: 1px solid rgba(207, 168, 58, 0.35);
		border-radius: 12px;
		padding: 1.75rem;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		transition: transform 0.2s ease, box-shadow 0.2s ease;
	}

	.ranking_card:hover {
		transform: translateY(-3px);
		box-shadow: 0 8px 25px rgba(207, 168, 58, 0.1);
	}

	.card_header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.header_left {
		display: flex;
		align-items: center;
		gap: 0.65rem;
	}

	.square_icon {
		width: 12px;
		height: 12px;
		display: inline-block;
		flex-shrink: 0;
	}

	.grey_bg {
		background-color: #666666;
	}

	.maroon_bg {
		background-color: #5c0f16;
	}

	.gold_bg {
		background-color: #cfa83a;
	}

	.card_title {
		font-size: 1.15rem;
		font-weight: 700;
		margin: 0;
		letter-spacing: 0.01em;
	}

	.star_rating {
		display: flex;
		gap: 0.15rem;
	}

	.card_body {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}

	.metric_headline {
		font-size: 1.15rem;
		font-weight: 700;
		color: #cfa83a;
		margin: 0.25rem 0 0.5rem 0;
	}

	.metric_description {
		font-size: 0.8rem;
		line-height: 1.6;
		color: #555555;
		margin: 0 0 1.25rem 0;
	}

	.metrics_grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 0.75rem;
		margin-bottom: 1.25rem;
	}

	.metric_badge {
		background-color: #5c0f16;
		padding: 0.75rem 0.5rem;
		border-radius: 6px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	.badge_count_text {
		font-size: 0.95rem;
		font-weight: 700;
		color: #ffffff;
	}

	.badge_label_text {
		font-size: 0.68rem;
		font-weight: 600;
		font-style: italic;
		color: #cfa83a;
		margin-top: 0.15rem;
	}

	.card_divider {
		height: 1px;
		background-color: rgba(0, 0, 0, 0.08);
		margin: 0.75rem 0;
		width: 100%;
	}

	.card_footer {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.footer_square {
		width: 12px;
		height: 12px;
	}

	.footer_text {
		font-size: 0.78rem;
		font-weight: 700;
		color: #5c0f16;
	}

	/* WURI Card Styles */
	.wuri_header_badge {
		font-size: 0.75rem;
		color: #222222;
		font-weight: 600;
	}

	.wuri_list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.wuri_item {
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.wuri_num_box {
		background-color: #5c0f16;
		color: #ffffff;
		font-size: 0.9rem;
		font-weight: 700;
		width: 32px;
		height: 32px;
		border-radius: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	.wuri_label_wrapper {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}

	.wuri_label {
		font-size: 0.78rem;
		font-weight: 700;
		color: #111111;
		letter-spacing: 0.02em;
	}

	.underline_bar {
		height: 2px;
		background-color: #cfa83a;
		width: 110px;
		margin-top: 0.25rem;
	}

	/* Impact Card Styles */
	.impact_card {
		background-color: #2d0508; /* Dark maroon theme background */
		border-color: rgba(207, 168, 58, 0.15);
		color: #ffffff;
	}

	.impact_small_title {
		font-size: 0.75rem;
		font-weight: 500;
		color: rgba(255, 255, 255, 0.7);
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.impact_score {
		font-size: 2.2rem;
		font-weight: 700;
		color: #cfa83a;
		margin: 0.25rem 0 0.5rem 0;
		line-height: 1;
	}

	.impact_description {
		font-size: 0.8rem;
		line-height: 1.6;
		color: rgba(255, 255, 255, 0.8);
		margin: 0 0 1.25rem 0;
	}

	.color_bars_container {
		display: flex;
		gap: 0.25rem;
	}

	.color_bar {
		width: 18px;
		height: 8px;
		border-radius: 1px;
	}

	.bar_gold { background-color: #cfa83a; }
	.bar_mustard { background-color: #d69e2e; }
	.bar_red { background-color: #9e1b24; }
	.bar_maroon { background-color: #5c0f16; }

	/* AUN-QA Card Styles */
	.aun_card {
		background-color: #cfa83a; /* Solid Mustard background */
		border-color: rgba(207, 168, 58, 0.4);
		color: #3d0a0e;
		padding: 1.25rem;
		border-radius: 12px;
	}

	.aun_card .maroon_text {
		color: #3d0a0e;
	}

	.aun_description {
		font-size: 0.8rem;
		font-weight: 600;
		line-height: 1.6;
		color: #3d0a0e;
		margin: 0;
	}
</style>
