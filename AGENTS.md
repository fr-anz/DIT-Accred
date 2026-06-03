# AGENTS.md

This file governs the entire repository. Follow it for all work under this directory unless a deeper `AGENTS.md` gives more specific instructions.

## Core Operating Rules

### 1. Think Before Coding

Don't assume. Don't hide confusion. Surface tradeoffs.

Before implementing:

- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them; don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### 2. Simplicity First

Minimum code that solves the problem. Nothing speculative.

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.
- Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

### 3. Surgical Changes

Touch only what you must. Clean up only your own mess.

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it; don't delete it.

When your changes create orphans:

- Remove imports, variables, and functions that your changes made unused.
- Don't remove pre-existing dead code unless asked.
- Every changed line should trace directly to the user's request.

### 4. Goal-Driven Execution

Define success criteria. Loop until verified.

Transform tasks into verifiable goals:

- "Add validation" -> write tests for invalid inputs, then make them pass.
- "Fix the bug" -> write a test that reproduces it, then make it pass.
- "Refactor X" -> ensure tests pass before and after.

For multi-step tasks, state a brief plan:

1. [Step] -> verify: [check]
2. [Step] -> verify: [check]
3. [Step] -> verify: [check]

Strong success criteria let you loop independently. Weak criteria such as "make it work" require clarification.

## Codebase Map

This is a SvelteKit application for the DIT accreditation site.

- `src/routes/+layout.svelte`: global app shell. Imports `src/routes/layout.css`, sets the favicon, and renders the shared navbar above route content.
- `src/routes/+page.svelte`: home page composition. It imports the home sections from `$lib/components/home` and renders them in order.
- `src/routes/<section>/+page.svelte`: section pages for `research`, `teaching-learning`, `community`, `internationalization`, `planning`, and `compliance`.
- `src/routes/layout.css`: global Tailwind entry and global typography/body styles. Tailwind 4 plugins are declared here through `@plugin`.
- `src/lib/components`: reusable components such as `Button`, `Card`, `Navbar`, `StatBadge`, and `footer`.
- `src/lib/components/home`: home page section components and the quality-control visual.
- `src/lib/index.ts`: public `$lib` component exports.
- `src/lib/assets`: imported source assets, including DIT logo files and navbar images.
- `static`: public assets referenced by URL paths, including `/planning/...` and `/img/PYLON.jpg`.
- `src/stories`: Storybook stories for shared components.
- `.storybook`: Storybook config and preview parameters.
- `GIT_GUIDELINES.md`: branch, commit, PR, and merge conventions for repository workflow.

## Current Architecture Notes

- Svelte 5 runes are enabled globally in `svelte.config.js`. Prefer runes-style component code: `$props`, `$state`, `$derived`, and related Svelte 5 patterns.
- TypeScript is strict in `tsconfig.json`, but the app currently allows checked JavaScript with `allowJs` and `checkJs`.
- `$lib` resolves to `src/lib`. Use `$lib/...` imports for shared components and assets when that matches existing code.
- Home sections currently expect shared home data via `$lib/data/homeData`. If data files move, update imports consistently and verify with `npm run check`.
- The navbar owns the primary route list and submenu structure. If route paths or section anchors change, update the navbar and the target page anchors together.
- Static assets under `static` are referenced with root-relative paths such as `/planning/photo-strip-1.jpg`. Imported assets under `src/lib/assets` are bundled and should be imported from Svelte or TypeScript files.
- Storybook is configured for SvelteKit and component stories. Add or update stories when changing reusable shared components in a way reviewers need to inspect.

## Commands

Use the package scripts in `package.json`.

- `npm run dev`: start the Vite dev server.
- `npm run check`: run SvelteKit sync and Svelte type checking.
- `npm run lint`: run Prettier check and ESLint.
- `npm run build`: build the production app.
- `npm run preview`: preview a production build.
- `npm run storybook`: start Storybook on port 6006.
- `npm run build-storybook`: build Storybook.
- `npm run format`: format the repo with Prettier. Use only when formatting is requested or clearly appropriate; avoid broad formatting churn for surgical edits.

There is no dedicated `npm test` script at the time this file was created. Vitest browser testing is wired through the Storybook addon in `vite.config.ts`; use the available Storybook/build checks unless a test script is added later.

## Styling and UI Rules

- Match the existing Svelte component style before adding new patterns.
- Keep page-level composition in routes and section-level implementation inside components.
- Prefer reusable components only when there is real reuse. Do not abstract a one-off section just to make it look organized.
- Tailwind is available globally through `layout.css`; component-local CSS is also used heavily. Follow the local file's established approach.
- Use `lucide-svelte` for icons when an icon is needed and an appropriate Lucide icon exists.
- Keep responsive behavior explicit. Verify desktop and mobile layouts for visible UI changes.
- Avoid changing global typography, body styles, CSS variables, or navbar behavior unless the task specifically requires it.
- Preserve accessibility basics: meaningful `alt` text, labels for icon buttons, keyboard-close behavior for overlays, and real links for navigation.

## Verification Expectations

Choose checks based on the risk of the change.

- Documentation-only change: inspect the edited file for accuracy and formatting.
- Svelte/TypeScript change: run `npm run check`.
- Styling or component change: run `npm run check` and inspect the UI in a browser at relevant viewport sizes.
- Shared component or route change: run `npm run lint` when practical.
- Build-sensitive change, asset path change, config change, or deployment-related change: run `npm run build`.
- Storybook component change: run or build Storybook when practical.

If a check cannot be run, say exactly why and what remains unverified.

## Git and PR Workflow

Follow `GIT_GUIDELINES.md`.

- Do not commit unless stated.
- Do not commit directly to `main`.
- Use descriptive branch names such as `feature/...`, `fix/...`, `refactor/...`, `docs/...`, or `chore/...`.
- Use Conventional Commit style for commits and PR titles.
- Keep PRs focused. Do not mix unrelated refactors, visual redesigns, and content changes.
- Before review, verify that the app compiles, relevant checks pass, unrelated files are not included, and documentation is updated when applicable.

## Working With Existing Changes

- Check the worktree before editing.
- Treat uncommitted changes as user work unless you know you made them.
- Do not revert, overwrite, move, or reformat user changes unless explicitly asked.
- If user changes affect the file you need to edit, read the file carefully and make the smallest compatible change.
- If unrelated dirty files exist, ignore them and mention only when relevant to the task.

## Dependency and Asset Policy

- Do not add dependencies unless the requested behavior clearly needs them and the existing stack cannot reasonably handle it.
- Prefer existing SvelteKit, Svelte, Tailwind, Storybook, and Lucide capabilities before adding libraries.
- Do not download or replace visual assets unless the task asks for it.
- Keep large media files in the existing asset locations according to how they are referenced: bundled imports in `src/lib/assets`, public URL assets in `static`.

## Content and Route Changes

- Keep accreditation content accurate and consistent across navigation labels, route names, anchors, and page headings.
- When adding a new section page, add the route, navbar entry, any supporting assets, and any Storybook/component updates that are directly needed.
- When changing section anchors, update both the anchor target and any navbar submenu link that points to it.
- Avoid hardcoding duplicate content in multiple places when there is already a local data module pattern for that content.

## Review Stance

For reviews, lead with bugs, regressions, risks, and missing verification. Reference exact files and lines where possible. Keep summaries secondary and concise.
