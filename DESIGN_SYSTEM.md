# Design System Guide

How to use the shared colour and typography tokens in this project.

Everything lives in one place: **`src/routes/layout.css`**. It is imported once by
`src/routes/+layout.svelte`, so every token and every `.t_*` class is available on every page
and inside every component with no import.

**The one rule:** if a value describes the brand, use the token. Do not paste a hex or a font
stack into a page. That is how we ended up with maroon in seven different shades.

---

## Quick reference

```svelte
<!-- Page hero -->
<p class="t_eyebrow">Teaching &amp; Learning</p>
<h1 class="t_display">Faculty</h1>
<p class="t_body">Managing the directory of core academic staff…</p>

<!-- Section heading -->
<div class="section_label">
	<Globe size={26} strokeWidth={1.5} />
	<span class="t_eyebrow">Strategic International Benchmarking</span>
</div>

<!-- Stat block -->
<span class="t_stat">12</span>
<h2 class="t_stat_label">Active Full-time Faculty</h2>

<!-- Card -->
<h3 class="t_card_name">Aguila, Fermin</h3>
<p class="t_meta">Networking &amp; Infrastructure</p>
<span class="t_action">View Technical Profile</span>
```

---

## Text roles

Pick the role that matches what the text _is_, not how big you want it. Each class sets family,
size, weight, letter-spacing and line-height together.

| Class           | Use it for                                    | Figma spec it encodes                             |
| --------------- | --------------------------------------------- | ------------------------------------------------- |
| `.t_display`    | Page hero titles                              | Montserrat Bold 150px, black→maroon gradient fill |
| `.t_eyebrow`    | Uppercase section headings                    | Inter SemiBold 32px, 0.27em, gold gradient fill   |
| `.t_stat`       | Giant statistic numerals                      | Overpass Bold 300px, gold gradient fill           |
| `.t_stat_label` | The italic label under a stat                 | Inter Italic 48px                                 |
| `.t_card_name`  | A person or card headline                     | Overpass Bold 40px, 0.03em                        |
| `.t_card_title` | Section and card titles, in maroon            | Overpass SemiBold 32px, 0.04em                    |
| `.t_body`       | Section body copy                             | Inter Regular 28px / 40px line-height             |
| `.t_body_sm`    | Body copy inside a card                       | Inter Regular 22px, 0.04em                        |
| `.t_meta`       | Italic supporting line, e.g. a specialisation | Inter Medium Italic 24px, 0.03em                  |
| `.t_action`     | Button and CTA labels                         | Overpass Medium 32px, 0.03em                      |

### Overriding a role

Add the role first, then your own class for the exceptions. Only override what genuinely differs.

```svelte
<h1 class="t_display hero_title">Planning &amp; Quality Assurance</h1>
```

```css
/* Inherits Montserrat + the gradient. This hero caps at 130px, not the usual 150px. */
.hero_title {
	font-size: clamp(2.5rem, 6.8vw, 130px);
	line-height: 1.12;
}
```

Colour is almost always the right thing to override, because the same role appears on light and
dark grounds:

```css
.fp_name {
	color: var(--c-surface);
}
```

### Reaching a global class from a scoped block

Svelte scopes `<style>`, so a global class used on a child needs `:global()`:

```css
.section_label :global(.t_eyebrow) {
	display: inline-block;
}
```

---

## Colour tokens

| Token             | Value                        | Use                                            |
| ----------------- | ---------------------------- | ---------------------------------------------- |
| `--c-maroon`      | `#941518`                    | Primary brand maroon: titles, borders, accents |
| `--c-maroon-mid`  | `#801b1e`                    | Button fills                                   |
| `--c-maroon-deep` | `#5c0f16`                    | Dark end of maroon gradients                   |
| `--c-gold`        | `#cfa83a`                    | Solid gold                                     |
| `--c-gold-light`  | `#fac549`                    | Start of the gold gradient                     |
| `--c-gold-dark`   | `#ca8106`                    | End of the gold gradient                       |
| `--c-ink`         | `#1a1a1a`                    | Body text on light grounds                     |
| `--c-shell`       | `#e5e3de`                    | Neutral panels                                 |
| `--c-surface`     | `#ffffff`                    | Cards and page ground                          |
| `--grad-gold`     | `linear-gradient(102deg, …)` | Gold cards, eyebrow text fill                  |
| `--grad-title`    | `linear-gradient(127deg, …)` | Hero display titles                            |

### Gradient stops stay literal

Inside a multi-stop gradient, keep the hex values. The angle and stop percentages come straight
from Figma and stay readable that way:

```css
/* Figma node 1068:1434 */
background: linear-gradient(146.9deg, #000000 1.9%, #941518 101.7%);
```

Everywhere else, use the token:

```css
color: var(--c-maroon);
border: 2px solid var(--c-maroon);
background: var(--grad-gold);
```

---

## Scale tokens

Use these when you need a size or tracking outside a role.

**Sizes.** The comment is the raw Figma value; the clamp makes it fluid, since the designs are
1920 wide and the site is not.

| Token          | Figma |
| -------------- | ----- |
| `--fs-stat`    | 300   |
| `--fs-display` | 150   |
| `--fs-3xl`     | 48    |
| `--fs-2xl`     | 40    |
| `--fs-xl`      | 32    |
| `--fs-lg`      | 28    |
| `--fs-md`      | 24    |
| `--fs-sm`      | 22    |

**Letter-spacing.** Figma stores this per-size in px, which hides the pattern. There are only
three real values.

| Token             | Value    | Figma px values it covers |
| ----------------- | -------- | ------------------------- |
| `--track-eyebrow` | `0.27em` | 8.64/32, 7.29/27          |
| `--track-title`   | `0.04em` | 1.28/32, 0.88/22          |
| `--track-tight`   | `0.03em` | 1.2/40, 0.72/24, 0.96/32  |

**Line-height:** `--lh-tight` (1), `--lh-snug` (1.2), `--lh-body` (1.43).

**Font stacks:** `--font-display` (Montserrat), `--font-heading` (Overpass), `--font-body` (Inter).
All three load in `src/app.html`. If you need a weight or an italic axis that is not there, add it
to that link rather than importing a second stylesheet.

---

## Gradient text

Three properties are required, and `color` must come first as the fallback:

```css
.thing {
	color: var(--c-gold-dark); /* fallback, keep it */
	background-image: var(--grad-gold);
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}
```

Without the `color`, the text renders invisible wherever `background-clip: text` is unsupported.
The `.t_display`, `.t_eyebrow` and `.t_stat` roles already handle this, including an
`@supports` block that restores the solid colour.

For a one-off that no role covers, `.grad_text` applies the gold gradient fill on its own. Set
`color` on the element yourself:

```svelte
<span class="grad_text" style="color: var(--c-gold-dark)">2024</span>
```

There is **no unprefixed `text-fill-color`** property. Only declare the `-webkit-` one.

---

## Adding to the system

Before adding a token or a role, check it is genuinely shared. Two questions:

1. **Does it appear on more than one page in Figma?** If it is a one-off, keep it local to the page.
2. **Is it already covered?** A different size of an existing role is an override, not a new role.

If it belongs, add it to `layout.css` with a comment naming the Figma node it came from, then add
a row to the tables above.

**Migrate as you go.** When you edit a file, convert the hex literals in it to tokens. Do not run a
repo-wide sweep in an unrelated PR — it makes the diff unreviewable and conflicts with everything
in flight.

---

## Where the values came from

The Figma file has **no text styles and no bound variables** — `get_variable_defs` returns `{}`.
Nothing here can be synced automatically; the values were read from the design context of the page
frames and cross-checked across Teaching & Learning, Planning, Community and Faculty. Specs that
appeared in two or more frames became the roles above.

If you change a token, check it against more than one frame first. A value that looks wrong on one
page is often correct and just applied inconsistently on the other.

For the Figma node map and the design-to-code workflow, see
[`.kiro/steering/figma-design-to-code.md`](.kiro/steering/figma-design-to-code.md).
