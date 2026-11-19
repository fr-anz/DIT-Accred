<script>
	import {
		ArrowUpRight,
		Building2,
		Lightbulb,
		Network,
		ShieldCheck,
		Star,
		Users
	} from '@lucide/svelte';
	import { resolve } from '$app/paths';
	import { countUp, reveal } from '#lib/actions/motion.ts';
	import { departmentStats, impactSdgs, qsCategories } from '#lib/data/homeData.ts';
	import { partners, wuriTimeline } from '#lib/data/internationalization.ts';

	const stat = Object.fromEntries(departmentStats.map((item) => [item.id, item]));

	const wuriEntries = wuriTimeline.flatMap(({ year, entries }) =>
		entries.filter((entry) => entry.rank).map((entry) => ({ ...entry, year }))
	);

	const wuri = { rank: 186, suffix: 'th', field: 1072 };
	const wuriPercentile = Math.ceil((wuri.rank / wuri.field) * 100);

	const partnerSchools = partners.filter((partner) => partner.id !== 'picab');
	const partnerCountries = [...new Set(partnerSchools.map((partner) => partner.country))];

	/* One dot per 40 students. */
	const studentDots = Array.from({ length: stat.students.count / 40 }, (_, i) => i);

	/** Moves the hover light to the pointer inside whichever tile it is over. */
	function spotlight(/** @type {HTMLElement} */ node) {
		const move = (/** @type {PointerEvent} */ event) => {
			const tile = /** @type {HTMLElement | null} */ (
				/** @type {Element} */ (event.target).closest('.tile')
			);
			if (!tile) return;
			const box = tile.getBoundingClientRect();
			tile.style.setProperty('--mx', `${event.clientX - box.left}px`);
			tile.style.setProperty('--my', `${event.clientY - box.top}px`);
		};
		node.addEventListener('pointermove', move);
		return { destroy: () => node.removeEventListener('pointermove', move) };
	}
</script>

{#snippet number(/** @type {{ count: number; suffix: string }} */ item)}
	<span class="tile_number">
		<span use:countUp={{ to: item.count }}>{item.count}</span>{item.suffix}
	</span>
{/snippet}

{#snippet arrow()}
	<ArrowUpRight class="tile_arrow" size={18} aria-hidden="true" />
{/snippet}

<section class="highlights" aria-labelledby="highlights-title">
	<header class="highlights_head" use:reveal>
		<h3 id="highlights-title" class="head_title">
			Recognized at home. <span>Ranked across the world.</span>
		</h3>
	</header>

	<div class="bento" use:spotlight>
		<a
			class="tile tone_gold area_qs"
			href={resolve('/planning#rankings')}
			use:reveal
			style:--d="0"
			aria-label="QS Stars: 3-star overall rating. See verified rankings."
		>
			{@render arrow()}
			<img src="/planning/figma/qs-stars.png" alt="" class="qs_logo" />
			<span class="qs_system">Rating System<sup>™</sup></span>
			<span class="qs_stars" aria-hidden="true">
				{#each [0, 1, 2] as i (i)}
					<span class="qs_star" style:--i={i}>
						<Star size={30} fill="currentColor" strokeWidth={0} />
					</span>
				{/each}
			</span>
			<span class="tile_kicker">3-star overall rating</span>
			<ul class="qs_categories">
				{#each qsCategories as cat (cat.label)}
					<li>
						<span class="qs_mini" aria-label="{cat.stars} of 5 stars">
							{#each [1, 2, 3, 4, 5] as n (n)}
								<Star
									size={10}
									fill="currentColor"
									strokeWidth={0}
									class={n > cat.stars ? 'off' : ''}
								/>
							{/each}
						</span>
						{cat.label}
					</li>
				{/each}
			</ul>
		</a>

		<a
			class="tile tone_maroon area_aaccup"
			href={resolve('/planning#strategic-benchmarking')}
			use:reveal
			style:--d="1"
		>
			{@render arrow()}
			<img src="/img/AACCUP.jpg" alt="" class="seal" />
			<span class="tile_small">AACCUP</span>
			<strong class="tile_title">Level IV</strong>
			<span class="levels" aria-hidden="true">
				{#each [1, 2, 3, 4] as level (level)}
					<span style:--l={level}></span>
				{/each}
			</span>
			<span class="tile_small">BSIT program accreditation</span>
		</a>

		<a
			class="tile tone_navy area_picab"
			href={resolve('/teaching-learning#program-compliance')}
			use:reveal
			style:--d="2"
		>
			{@render arrow()}
			<img src="/teaching-learning/area2/picab-logo.png" alt="" class="seal" />
			<span class="tile_small">First PUP program with</span>
			<strong class="tile_title">International Accreditation</strong>
			<span class="tile_small">PICAB, July 2026</span>
		</a>

		<div class="tile tone_gold area_faculty" use:reveal style:--d="3">
			<Users size={34} strokeWidth={1.5} class="tile_icon" aria-hidden="true" />
			{@render number(stat.faculty)}
			<span class="tile_label">{stat.faculty.label}</span>
		</div>

		<div class="tile tone_gold area_industry" use:reveal style:--d="4">
			<Building2 size={34} strokeWidth={1.5} class="tile_icon" aria-hidden="true" />
			{@render number(stat.industry)}
			<span class="tile_label">{stat.industry.label}</span>
		</div>

		<div class="tile tile_solid area_students" use:reveal style:--d="2">
			<span class="students_copy">
				<span class="tile_kicker">BS Information Technology</span>
				{@render number(stat.students)}
				<span class="tile_label">{stat.students.label}</span>
			</span>
			<span class="students_grid" aria-hidden="true">
				{#each studentDots as i (i)}
					<span style:--i={i}></span>
				{/each}
			</span>
			<span class="students_note" aria-hidden="true">Each dot is 40 students</span>
		</div>

		<a
			class="tile tone_maroon area_impact"
			href={resolve('/planning#rankings')}
			use:reveal
			style:--d="3"
		>
			{@render arrow()}
			<ShieldCheck size={34} strokeWidth={1.5} class="tile_icon" aria-hidden="true" />
			<span class="tile_kicker">THE Impact Rankings</span>
			<span class="tile_number">1501+</span>
			<span class="tile_label">validated against the UN Sustainable Development Goals</span>
			<ul class="sdgs">
				{#each impactSdgs as sdg, i (sdg.id)}
					<li style:--sdg={sdg.color} style:--i={i}>
						<strong>SDG {String(sdg.id).padStart(2, '0')}</strong>
						<span>{sdg.label}</span>
					</li>
				{/each}
			</ul>
		</a>

		<a
			class="tile tone_navy area_wuri"
			href={resolve('/planning#rankings')}
			use:reveal
			style:--d="4"
		>
			{@render arrow()}
			<span class="wuri_logo">
				<img
					src="/planning/figma/wuri.png"
					alt="WURI, The World University Rankings for Innovation"
				/>
			</span>
			<span class="wuri_rank">
				<span class="tile_number">{wuri.rank}<sup>{wuri.suffix}</sup></span>
				<span class="tile_label">
					world rank among {wuri.field.toLocaleString('en-US')} innovative universities
				</span>
				<span class="wuri_track" style:--p="{(wuri.rank / wuri.field) * 100}%" aria-hidden="true">
					<span class="wuri_fill"></span>
					<span class="wuri_pin">Top {wuriPercentile}%</span>
				</span>
			</span>
		</a>

		<a
			class="tile tone_navy area_entries"
			href={resolve('/internationalization#wuri-innovation')}
			use:reveal
			style:--d="5"
		>
			{@render arrow()}
			<span class="entries_head">
				<Lightbulb size={22} strokeWidth={1.75} class="tile_icon" aria-hidden="true" />
				<span class="tile_kicker">DIT innovations ranked in WURI</span>
			</span>
			<ol class="entries">
				{#each wuriEntries as entry (entry.id)}
					<li>
						<span class="entry_rank">{entry.rank}</span>
						<span class="entry_name">{entry.project}</span>
						<span class="entry_meta">{entry.category}, {entry.year}</span>
					</li>
				{/each}
			</ol>
		</a>

		<a
			class="tile tone_gold area_partners"
			href={resolve('/internationalization#partners')}
			use:reveal
			style:--d="6"
		>
			{@render arrow()}
			<span class="partner_logos" aria-hidden="true">
				{#each partnerSchools as partner (partner.id)}
					<img src={partner.logo} alt="" />
				{/each}
			</span>
			<span class="tile_number">{partnerSchools.length}</span>
			<span class="tile_label">
				partner universities in {partnerCountries.join(' and ')}
			</span>
		</a>

		<div class="tile tone_maroon area_orgs" use:reveal style:--d="7">
			<Network size={34} strokeWidth={1.5} class="tile_icon" aria-hidden="true" />
			{@render number(stat.organizations)}
			<span class="tile_label">{stat.organizations.label}</span>
		</div>
	</div>
</section>

<style>
	.highlights {
		--maroon: var(--c-maroon);
		--gold: var(--c-gold-dark);
		--navy: #1d4f91;
		--spring: cubic-bezier(0.34, 1.56, 0.64, 1);
		--out: cubic-bezier(0.22, 1, 0.36, 1);
		margin-bottom: clamp(3rem, 7vw, 6.25rem);
	}

	/* Header */
	.highlights_head {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.75rem 2rem;
		margin-bottom: clamp(1.25rem, 2.5vw, 2rem);
	}

	.head_title {
		margin: 0;
		font: 700 clamp(1.5rem, 3vw, 2.6rem) / 1.1 var(--font-heading);
		letter-spacing: 0.01em;
		color: var(--c-ink);
		text-wrap: balance;
	}

	.head_title span {
		background: var(--grad-gold);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}

	/* Grid */
	.bento {
		display: grid;
		grid-template-columns: repeat(6, minmax(0, 1fr));
		grid-auto-rows: minmax(140px, auto);
		grid-template-areas:
			'qs   qs   aaccup   picab    faculty  industry'
			'qs   qs   students students impact   impact'
			'qs   qs   students students impact   impact'
			'wuri wuri entries  entries  partners orgs';
		gap: clamp(0.6rem, 1.2vw, 1rem);
	}

	.area_qs {
		grid-area: qs;
	}
	.area_aaccup {
		grid-area: aaccup;
	}
	.area_picab {
		grid-area: picab;
	}
	.area_faculty {
		grid-area: faculty;
	}
	.area_industry {
		grid-area: industry;
	}
	.area_students {
		grid-area: students;
	}
	.area_impact {
		grid-area: impact;
	}
	.area_wuri {
		grid-area: wuri;
	}
	.area_entries {
		grid-area: entries;
	}
	.area_partners {
		grid-area: partners;
	}
	.area_orgs {
		grid-area: orgs;
	}

	.tone_maroon {
		--tone: var(--maroon);
	}
	.tone_gold {
		--tone: var(--gold);
	}
	.tone_navy {
		--tone: var(--navy);
	}

	/* Tile shell */
	.tile {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.35rem;
		padding: clamp(0.9rem, 1.6vw, 1.5rem);
		background: var(--c-surface);
		border: 1.5px solid color-mix(in srgb, var(--tone) 50%, transparent);
		color: var(--c-ink);
		text-align: center;
		text-decoration: none;
		font-family: var(--font-body);
		overflow: hidden;
		isolation: isolate;
		transition:
			border-color 0.25s ease,
			box-shadow 0.35s ease,
			translate 0.35s var(--out);
	}

	/* Corner ticks, like registration marks on a print proof. */
	.tile::before {
		content: '';
		position: absolute;
		inset: 6px;
		z-index: -1;
		pointer-events: none;
		--c: color-mix(in srgb, var(--tone) 70%, transparent);
		background:
			linear-gradient(var(--c), var(--c)) top left / 10px 1.5px,
			linear-gradient(var(--c), var(--c)) top left / 1.5px 10px,
			linear-gradient(var(--c), var(--c)) bottom right / 10px 1.5px,
			linear-gradient(var(--c), var(--c)) bottom right / 1.5px 10px;
		background-repeat: no-repeat;
		opacity: 0;
		scale: 1.04;
		transition:
			opacity 0.3s ease,
			scale 0.4s var(--out);
	}

	/* Pointer-following light. --mx/--my are set by the spotlight action. */
	.tile::after {
		content: '';
		position: absolute;
		inset: 0;
		z-index: -2;
		pointer-events: none;
		background: radial-gradient(
			260px circle at var(--mx, 50%) var(--my, 50%),
			color-mix(in srgb, var(--tone) 13%, transparent),
			transparent 70%
		);
		opacity: 0;
		transition: opacity 0.35s ease;
	}

	@media (hover: hover) {
		.tile:hover::after,
		.tile:hover::before {
			opacity: 1;
			scale: 1;
		}
	}

	a.tile:hover,
	a.tile:focus-visible {
		border-color: var(--tone);
		translate: 0 -4px;
		box-shadow: 0 18px 30px -22px color-mix(in srgb, var(--tone) 90%, transparent);
	}

	a.tile:focus-visible {
		outline: 2px solid var(--tone);
		outline-offset: 3px;
	}

	.tile :global(.tile_arrow) {
		position: absolute;
		top: 0.7rem;
		right: 0.7rem;
		color: var(--tone);
		opacity: 0;
		translate: -5px 5px;
		transition:
			opacity 0.25s ease,
			translate 0.35s var(--out);
	}

	a.tile:hover :global(.tile_arrow),
	a.tile:focus-visible :global(.tile_arrow) {
		opacity: 1;
		translate: 0 0;
	}

	.tile :global(.tile_icon) {
		color: var(--tone);
		flex-shrink: 0;
		transition: translate 0.4s var(--spring);
	}

	.tile:hover :global(.tile_icon) {
		translate: 0 -3px;
	}

	/* Type */
	.tile_number {
		font: 700 clamp(1.9rem, 2.9vw, 3rem) / 1 var(--font-heading);
		color: var(--tone);
		font-variant-numeric: tabular-nums;
		padding-top: 0.15em;
	}

	.tile_number sup {
		font-size: 0.42em;
		vertical-align: super;
	}

	.tile_title {
		font: 700 clamp(1rem, 1.45vw, 1.35rem) / 1.1 var(--font-heading);
		color: var(--tone);
		text-transform: uppercase;
		padding-top: 0.1em;
		text-wrap: balance;
	}

	.tile_kicker {
		font: 700 clamp(0.74rem, 0.9vw, 0.88rem) / 1.2 var(--font-heading);
		color: var(--tone);
		text-transform: uppercase;
		letter-spacing: 0.06em;
		text-wrap: balance;
	}

	.tile_label,
	.tile_small {
		font-size: clamp(0.72rem, 0.88vw, 0.85rem);
		line-height: 1.3;
		color: color-mix(in srgb, var(--c-ink) 75%, var(--c-surface));
		text-wrap: balance;
	}

	.tile_small {
		font-size: clamp(0.66rem, 0.78vw, 0.75rem);
	}

	.seal {
		width: clamp(36px, 3.2vw, 46px);
		height: clamp(36px, 3.2vw, 46px);
		object-fit: contain;
		margin-bottom: 0.15rem;
		transition: rotate 0.6s var(--spring);
	}

	.tile:hover .seal {
		rotate: -8deg;
	}

	/* QS Stars */
	.area_qs {
		gap: 0.7rem;
		background:
			radial-gradient(
				120% 60% at 50% 0%,
				color-mix(in srgb, var(--c-gold-light) 16%, transparent),
				transparent 70%
			),
			var(--c-surface);
	}

	.qs_logo {
		width: min(78%, 250px);
		height: auto;
		mix-blend-mode: multiply;
	}

	.qs_system {
		font: 400 clamp(0.95rem, 1.4vw, 1.3rem) / 1 var(--font-display);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: color-mix(in srgb, var(--c-ink) 75%, var(--c-surface));
		margin-top: -0.35rem;
	}

	.qs_system sup {
		font-size: 0.5em;
	}

	.qs_stars {
		display: flex;
		justify-content: space-around;
		width: min(78%, 250px);
		padding: 0.5rem 0;
		border: 1.5px solid color-mix(in srgb, var(--tone) 55%, transparent);
		color: var(--c-gold-light);
	}

	.qs_star {
		display: grid;
		filter: drop-shadow(0 2px 3px color-mix(in srgb, var(--gold) 45%, transparent));
		transition: scale 0.4s var(--spring);
		transition-delay: calc(var(--i) * 70ms);
	}

	.area_qs:hover .qs_star {
		scale: 1.2;
	}

	.qs_categories {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.4rem;
		width: min(100%, 300px);
		margin: 0.2rem 0 0;
		padding: 0;
		list-style: none;
	}

	.qs_categories li {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
		padding: 0.5rem 0.3rem;
		background: color-mix(in srgb, var(--tone) 8%, var(--c-surface));
		font-size: 0.72rem;
		line-height: 1.2;
		color: color-mix(in srgb, var(--c-ink) 80%, var(--c-surface));
	}

	.qs_mini {
		display: flex;
		gap: 1px;
		color: var(--tone);
	}

	.qs_mini :global(.off) {
		color: color-mix(in srgb, var(--tone) 22%, transparent);
	}

	/* AACCUP level steps */
	.levels {
		display: flex;
		align-items: flex-end;
		gap: 3px;
		height: 18px;
		margin: 0.1rem 0;
	}

	.levels span {
		width: 7px;
		height: calc(var(--l) * 25%);
		background: var(--tone);
		opacity: calc(0.35 + var(--l) * 0.16);
		transform-origin: bottom;
		transition: scale 0.45s var(--spring);
		transition-delay: calc(var(--l) * 60ms);
	}

	.area_aaccup:hover .levels span {
		scale: 1 1.25;
	}

	/* Students feature: solid maroon tile with a dot chart */
	.tile_solid {
		--tone: var(--c-gold-light);
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		align-content: center;
		justify-items: start;
		gap: 0.75rem clamp(1rem, 2vw, 1.75rem);
		text-align: left;
		color: var(--c-surface);
		border: 0;
		background:
			radial-gradient(
				90% 120% at 100% 0%,
				color-mix(in srgb, var(--c-gold-light) 22%, transparent),
				transparent 60%
			),
			linear-gradient(140deg, var(--c-maroon) 0%, var(--c-maroon-deep) 100%);
	}

	.tile_solid::before {
		--c: color-mix(in srgb, var(--c-gold-light) 80%, transparent);
	}

	.tile_solid .tile_label,
	.students_note {
		color: color-mix(in srgb, var(--c-surface) 82%, transparent);
	}

	.students_copy {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.4rem;
		min-width: 0;
	}

	.area_students .tile_number {
		font-size: clamp(3rem, 4.8vw, 5.25rem);
		text-shadow: 0 6px 24px rgb(0 0 0 / 0.25);
	}

	.area_students .tile_label {
		font-size: clamp(0.85rem, 1.05vw, 1.05rem);
	}

	.students_grid {
		display: grid;
		grid-template-columns: repeat(25, 1fr);
		gap: clamp(4px, 0.5vw, 8px);
		width: 100%;
	}

	.students_grid span {
		width: 100%;
		max-width: 12px;
		aspect-ratio: 1;
		border-radius: 50%;
		background: var(--c-gold-light);
		box-shadow: 0 0 0 0 transparent;
		transition:
			scale 0.3s var(--spring),
			box-shadow 0.3s ease;
	}

	.area_students:hover .students_grid span {
		scale: 1.25;
		box-shadow: 0 0 10px 1px color-mix(in srgb, var(--c-gold-light) 55%, transparent);
		transition-delay: calc(var(--i) * 6ms);
	}

	.students_note {
		grid-column: 1 / -1;
		justify-self: end;
		font-size: 0.68rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	/* THE Impact */
	.area_impact .tile_number {
		font-size: clamp(2.6rem, 4.6vw, 4.25rem);
	}

	.sdgs {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 0.4rem;
		width: 100%;
		margin: 0.6rem 0 0;
		padding: 0;
		list-style: none;
	}

	.sdgs li {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		padding: 0.5rem 0.45rem 0.45rem;
		border-top: 4px solid var(--sdg);
		background: color-mix(in srgb, var(--sdg) 9%, var(--c-surface));
		text-align: left;
		transition: translate 0.35s var(--spring);
	}

	.sdgs strong {
		font: 700 0.78rem / 1 var(--font-heading);
		color: var(--sdg);
		filter: brightness(0.85);
	}

	.sdgs span {
		font-size: 0.66rem;
		line-height: 1.2;
		color: color-mix(in srgb, var(--c-ink) 75%, var(--c-surface));
	}

	.area_impact:hover .sdgs li {
		translate: 0 -4px;
		transition-delay: calc(var(--i) * 50ms);
	}

	/* WURI rank */
	.area_wuri {
		flex-direction: row;
		gap: clamp(0.75rem, 1.6vw, 1.5rem);
	}

	.wuri_logo {
		position: relative;
		flex: 0 0 50%;
		aspect-ratio: 278 / 102;
		overflow: hidden;
	}

	/* The source image is a portrait canvas, so it is cropped to the logo. */
	.wuri_logo img {
		position: absolute;
		max-width: none;
		width: 112.94%;
		height: 383.52%;
		left: -12.94%;
		top: -145.74%;
		mix-blend-mode: multiply;
	}

	.wuri_rank {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		text-align: left;
		gap: 0.3rem;
		flex: 1;
		min-width: 0;
	}

	.wuri_track {
		position: relative;
		width: 100%;
		height: 4px;
		margin-top: 1.4rem;
		background: color-mix(in srgb, var(--tone) 14%, transparent);
	}

	.wuri_fill {
		position: absolute;
		inset: 0 auto 0 0;
		width: var(--p);
		background: var(--tone);
		transform-origin: left;
	}

	.wuri_pin {
		position: absolute;
		left: var(--p);
		bottom: calc(100% + 5px);
		translate: -50% 0;
		padding: 0.1rem 0.35rem;
		background: var(--tone);
		color: var(--c-surface);
		font: 700 0.62rem / 1.3 var(--font-heading);
		letter-spacing: 0.04em;
		white-space: nowrap;
	}

	/* WURI innovation entries */
	.area_entries {
		align-items: stretch;
		justify-content: space-between;
		gap: 0.75rem;
	}

	.entries_head {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		text-align: left;
	}

	.entries {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 0.6rem;
		margin: 0;
		padding: 0;
		list-style: none;
		text-align: left;
	}

	.entries li {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		padding-top: 0.5rem;
		border-top: 2px solid color-mix(in srgb, var(--tone) 25%, transparent);
		transition: border-color 0.3s ease;
	}

	.area_entries:hover .entries li {
		border-color: var(--tone);
	}

	.entry_rank {
		font: 700 clamp(1.3rem, 1.9vw, 1.8rem) / 1 var(--font-heading);
		color: var(--tone);
	}

	.entry_name {
		font-size: 0.78rem;
		font-weight: 600;
		line-height: 1.2;
	}

	.entry_meta {
		font-size: 0.66rem;
		line-height: 1.25;
		color: color-mix(in srgb, var(--c-ink) 60%, var(--c-surface));
	}

	/* Partners */
	.partner_logos {
		display: flex;
		justify-content: center;
	}

	.partner_logos img {
		width: 34px;
		height: 34px;
		object-fit: contain;
		padding: 3px;
		margin-inline: -4px;
		border-radius: 50%;
		background: var(--c-surface);
		box-shadow: 0 0 0 1.5px color-mix(in srgb, var(--tone) 45%, transparent);
		transition: margin 0.35s var(--spring);
	}

	.area_partners:hover .partner_logos img {
		margin-inline: 3px;
	}

	/* Motion */
	@media (prefers-reduced-motion: no-preference) {
		.highlights :global(.reveal-pending) {
			opacity: 0;
			translate: 0 26px;
			transition:
				opacity 0.7s ease,
				translate 0.9s var(--out);
			transition-delay: calc(var(--d, 0) * 80ms);
		}

		.highlights :global(.reveal-pending.is-revealed) {
			opacity: 1;
			translate: 0 0;
		}

		.area_qs:global(.reveal-pending) .qs_star {
			scale: 0;
			rotate: -90deg;
			transition:
				scale 0.6s var(--spring),
				rotate 0.6s var(--out);
			transition-delay: calc(500ms + var(--i) * 140ms);
		}

		.area_qs:global(.reveal-pending.is-revealed) .qs_star {
			scale: 1;
			rotate: 0deg;
		}

		.area_students:global(.reveal-pending) .students_grid span {
			scale: 0;
			transition: scale 0.35s var(--spring);
			transition-delay: calc(300ms + var(--i) * 18ms);
		}

		.area_students:global(.reveal-pending.is-revealed) .students_grid span {
			scale: 1;
		}

		.area_wuri:global(.reveal-pending) .wuri_fill {
			scale: 0 1;
			transition: scale 1.2s var(--out) 0.4s;
		}

		.area_wuri:global(.reveal-pending) .wuri_pin {
			opacity: 0;
			transition: opacity 0.4s ease 1.3s;
		}

		.area_wuri:global(.reveal-pending.is-revealed) .wuri_fill {
			scale: 1 1;
		}

		.area_wuri:global(.reveal-pending.is-revealed) .wuri_pin {
			opacity: 1;
		}

		.area_aaccup:global(.reveal-pending) .levels span {
			scale: 1 0;
			transition-delay: calc(400ms + var(--l) * 120ms);
		}

		.area_aaccup:global(.reveal-pending.is-revealed) .levels span {
			scale: 1 1;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.tile,
		.tile::before,
		.tile::after,
		.tile :global(*) {
			transition: none !important;
		}

		a.tile:hover,
		a.tile:focus-visible {
			translate: none;
		}
	}

	/* Layouts */
	@media (max-width: 1100px) {
		.bento {
			grid-template-columns: repeat(4, minmax(0, 1fr));
			grid-template-areas:
				'qs       qs       aaccup   picab'
				'qs       qs       faculty  industry'
				'students students impact   impact'
				'students students impact   impact'
				'wuri     wuri     partners orgs'
				'entries  entries  entries  entries';
		}
	}

	@media (max-width: 640px) {
		.bento {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			grid-auto-rows: minmax(120px, auto);
			grid-template-areas:
				'qs       qs'
				'aaccup   picab'
				'students students'
				'faculty  industry'
				'impact   impact'
				'wuri     wuri'
				'entries  entries'
				'partners orgs';
		}

		.sdgs {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.area_wuri {
			flex-direction: column;
		}

		.wuri_logo {
			flex-basis: auto;
			width: 75%;
		}

		.entries {
			grid-template-columns: 1fr;
		}
	}
</style>
