# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project
npx sv create my-app
```

To recreate this project with the same configuration:

```sh
# recreate this project
bun x sv@0.15.3 create --template minimal --types ts --add prettier eslint tailwindcss="plugins:typography,forms" sveltekit-adapter="adapter:auto" mdsvex --install bun DIT-Accred
```

## Project docs

- [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md) — colour and typography tokens, and the text role classes.
  Read this before styling anything.
- [`GIT_GUIDELINES.md`](GIT_GUIDELINES.md) — branch naming, commit format, and the PR process.

## Notable alumni media

The Teaching & Learning profiles live in `src/lib/data/alumni.ts`.
Each profile's `imageUrl` loads its portrait directly from the public Cloudflare CDN at
`https://cdn.theavenir.dev/images/Alumni/`; `imageAlt` describes the portrait in cards and dialogs.
Use the optional `imagePosition` to align the crop when the subject is off-center.
The carousel displays three alumni at a time on desktop and one on mobile, advancing every five
seconds. It pauses while hovered, focused, off screen, in a hidden tab, or showing a profile dialog.
Readers can navigate with arrows and dots; reduced motion disables automatic rotation.
The bucket is `dit-documents`. Preserve object filename capitalization and extensions, and encode
spaces as `%20` in image URLs. Displaying these public images requires no S3 credentials.
Each profile embeds its Google Drive video in a padded, rounded 16:9 frame.
The player is vertically cropped to remove Drive's minimum-height letterboxing; this can clip controls on small screens.
Keep Drive sharing public; playback depends on Google's player and access policy.

## Homepage leadership panels

The leadership panels on the homepage contain leader-specific messages: Dustin's chairperson message and Melvin's dean message are separate entries, each maintained in `src/lib/components/home/LeadershipSection.svelte`.
Each card includes a persistent “Read message” cue, with hover and keyboard-focus feedback; the entire card opens its leader's message.
The decorative binary background uses full-width lines alternating leftward and rightward movement; reduced-motion preferences keep it static.

## Developing

Use the Node.js version in [`.nvmrc`](.nvmrc) and install dependencies from the npm lockfile.

```sh
nvm install
npm ci
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

With Bun 1.4 or newer, use `bun install --frozen-lockfile` followed by `bun run dev`.

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
