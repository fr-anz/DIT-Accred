# Figma → Code Rules (DIT Accreditation Website)

Applies to every design implementation task in this repo. Read before calling any Figma MCP tool.

## The Figma source

Single file, single canvas named **Bento Box**. Every page lives there as a 1920-wide frame.

| Frame                                   | Node ID    | Route                        |
| --------------------------------------- | ---------- | ---------------------------- |
| Home (Revision)                         | `585:538`  | `/`                          |
| Community (Revision)                    | `595:545`  | `/community`                 |
| Teaching & Learning (Revision)          | `622:547`  | `/teaching-learning`         |
| Teaching & Learning - Full-time Faculty | `839:1452` | `/teaching-learning/faculty` |
| Planning & Quality Assurance (Revision) | `663:1199` | `/planning`                  |
| Research                                | `1152:854` | `/research`                  |
| Footer (symbol)                         | `834:884`  | `footer.svelte`              |

Supporting sections, not pages: `175:169` Inspo Board, `175:170` Assets, `510:1721` Low Fidelity,
`830:693` First High-Fidelity, `222:633` Navigation Bar 2, `128:416` Navigation Bar Mobile,
`175:210` NavBar Animation Sample, `1192:2110`–`1199:2156` KPM animation frames.

Two naming traps: inner wrapper frames are often stale copies (the Planning page's wrapper is
named "Teaching & Learning", its hero is named "RESEARCH"). Trust the node ID and the frame's
own position, never the layer name. Frames marked `hidden="true"` are abandoned drafts — skip them.

## Workflow

1. `get_metadata` on the page frame first to get the section outline. Never dump `get_design_context`
   on a whole 1920×7000 page frame; it blows up context and the output is unusable.
2. `get_design_context` per section child, then `get_screenshot` on the same node to check layout.
3. Convert the React + Tailwind output. It is reference geometry only, never paste it.
4. Reuse what exists before writing new markup (see below).
5. `npm run check` and `npm run lint` before opening a PR.

The file has **no Figma variables bound** — `get_variable_defs` returns `{}`. Read raw hex values
out of the design context and map them to the tokens below. Do not introduce a new hex.

## Design tokens

Canonical values live in `src/routes/layout.css` as CSS custom properties. Use the variable, not
the literal.

| Token             | Value                                                | Use                                        |
| ----------------- | ---------------------------------------------------- | ------------------------------------------ |
| `--c-maroon`      | `#941518`                                            | Primary brand maroon, card titles, accents |
| `--c-maroon-deep` | `#5c0f16`                                            | Dark maroon, gradient ends                 |
| `--c-maroon-mid`  | `#801b1e`                                            | Button fills                               |
| `--c-gold`        | `#cfa83a`                                            | Solid gold                                 |
| `--c-gold-light`  | `#fac549`                                            | Gold gradient start                        |
| `--c-gold-dark`   | `#ca8106`                                            | Gold gradient end                          |
| `--c-ink`         | `#1a1a1a`                                            | Body text on light                         |
| `--c-shell`       | `#e5e3de`                                            | Neutral panel / checkerboard               |
| `--grad-gold`     | `linear-gradient(102deg, #fac549 5.6%, #ca8106 93%)` | Gold cards, heading text fill              |
| `--grad-title`    | `linear-gradient(127deg, #000 9%, #901518 89%)`      | Hero display titles                        |

The design drifted before these existed: maroon appeared as seven different hexes across the repo
(`#941518`, `#801b1e`, `#5c0f16`, `#6a1316`, `#8e1518`, `#8c0f13`, `#921518`) and gold as six.
When you touch a file, migrate the hexes in it to tokens. Do not do a repo-wide sweep in an
unrelated PR.

## Type scale

Fonts load in `src/app.html`. Montserrat (display), Overpass (headings), Inter (body).

| Role               | Spec                                                                                    |
| ------------------ | --------------------------------------------------------------------------------------- |
| Hero display title | Montserrat Bold, `clamp(3rem, 6.8vw, 130px)`, `--grad-title` clipped to text, centered  |
| Section heading    | Inter SemiBold 32px, uppercase, `letter-spacing: 8.64px`, `--grad-gold` clipped to text |
| Card title         | Overpass SemiBold 32px, `letter-spacing: 1.28px`, `--c-maroon`                          |
| Card body          | Inter Regular 22px, `letter-spacing: 0.88px`                                            |
| Section body copy  | Inter Regular 28px, `line-height: 40px`                                                 |

Gradient text needs all three of `background-image`, `background-clip: text`,
`-webkit-text-fill-color: transparent`. Always pair it with a `color` fallback so the text stays
readable if `background-clip` fails.

## Layout mapping

Designs are 1920 wide. Do not hardcode pixel offsets from Figma.

- Content column starts at x=112 and runs 1143 wide → the page uses `padding: 0 10%` with a
  `--section-max-width` cap, matching `.content_section`.
- Section heading icon sits at x=112, 42–45px → `.section_label` flex row, `gap: 0.85rem`.
- Card radius 25px → `border-radius: 25px` (Tailwind `rounded-3xl` on `Card.svelte` is 24px, close
  enough to reuse the component).
- Absolute Figma coordinates become flex/grid. The page must work at 1280, 1024, 768 and 390 wide.

## Reuse before writing

- `$lib/components/Button.svelte` — variants `primary` `secondary` `dark` `gold`, sizes `sm` `md` `lg`, `outline` flag
- `$lib/components/Card.svelte` — variants `maroon` `dark` `gold`, sizes `sm` `md`
- `$lib/components/StatBadge.svelte` — translucent stat pill
- `$lib/components/footer.svelte` — import on every page, do not rebuild from the Figma symbol
- `$lib/components/PageNavbar.svelte` — rendered globally by `+layout.svelte` for all non-home
  routes. Several page frames in Figma still draw an old floating white nav card inside the hero.
  **Ignore it.** The current nav design lives in section `222:633` and is already built. Rebuilding
  it inside a hero produces two navbars.
- Icons come from `lucide-svelte`. Figma references Iconify sets (`material-symbols:`, `mingcute:`,
  `boxicons:`, `icon-park-outline:`); pick the nearest Lucide equivalent instead of exporting SVG.

## Conventions

- Svelte 5 runes: `$props()`, `$state()`, `$derived()`. No `export let`, no legacy stores in new code.
- Scoped `<style>` blocks with plain CSS. Class names are `snake_case` on page routes
  (`.hero_title`, `.section_label`, `.aaccup_card`) and `kebab-case` inside `$lib/components`.
  Match the file you are editing.
- Tailwind 4 is available and used inside components via `@reference "tailwindcss"` + `@apply`.
  Page routes are mostly hand-written CSS. Follow the file, do not convert it.
- Assets go in `static/<page-name>/`. Never ship a `localhost:3845` URL from the MCP server, and
  never link an Unsplash URL — download and commit the file.
- Respect `prefers-reduced-motion` on any scroll or entrance animation.
- Images need real `alt` text, decorative ones get `alt=""` plus `aria-hidden="true"`.

## Git

Branch per design change, off latest `main`: `design/<page>-<what>` or `feature/<page>`.
Conventional commits. Reference the node ID in the commit body, e.g. `matches Figma node 663:1201`.
Squash and merge. `main` is protected. Full policy in `GIT_GUIDELINES.md`.
