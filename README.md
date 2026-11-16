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
bun x sv@0.15.3 create --template minimal --types ts --add prettier eslint tailwindcss="plugins:typography,forms" sveltekit-adapter="adapter:auto" mdsvex storybook --install bun DIT-Accred
```

## Project docs

- [`DESIGN_SYSTEM.md`](DESIGN_SYSTEM.md) — colour and typography tokens, and the text role classes.
  Read this before styling anything.
- [`GIT_GUIDELINES.md`](GIT_GUIDELINES.md) — branch naming, commit format, and the PR process.

## Notable alumni media

The Teaching & Learning profiles live in `src/lib/data/alumni.ts`.
Each profile embeds its Google Drive video in a padded, rounded 16:9 frame.
The player is vertically cropped to remove Drive's minimum-height letterboxing; this can clip controls on small screens.
Keep Drive sharing public; playback depends on Google's player and access policy.

## Homepage leadership panels

The leadership panels on the homepage contain leader-specific messages: Dustin's chairperson message and Melvin's dean message are separate entries, each maintained in `src/lib/components/home/LeadershipSection.svelte`.
Each card includes a persistent “Read message” cue, with hover and keyboard-focus feedback; the entire card opens its leader's message.
The decorative binary background uses full-width lines alternating leftward and rightward movement; reduced-motion preferences keep it static.

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
