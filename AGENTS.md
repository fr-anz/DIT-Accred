# Dependency maintenance

- At the start of project work, check for Node.js security releases, run `npm outdated`, and audit both lockfiles with `npm audit` and `bun audit`. Prioritize security fixes. Use the newest stable releases that work together and with the deployment target.
- Keep the Node.js pin in `.nvmrc` and the supported range in `package.json` aligned. Update Node.js type definitions to match the runtime major version.
- Review release notes and peer dependencies before upgrading a major version. Upgrade related packages together, such as SvelteKit and its adapter. Apply any required migrations and record the reason for each version held back. Keep engine and peer-dependency validation enabled.
- Regenerate `package-lock.json` and `bun.lock` with their respective package managers whenever dependencies change. Verify `npm ci` and `bun install --frozen-lockfile` in separate clean install directories or one at a time. Use Bun 1.4 or newer for nested dependency overrides and remove the typography parser override once upstream depends on a patched release.
- On the pinned Node.js version, run `npm audit`, `npm run check`, `npm run lint`, and `npm run build`. Smoke-test affected routes and interactions against `npm run preview` after a framework or runtime upgrade.
- Fix regressions before completing an upgrade. Compare any failing checks against the baseline and report pre-existing failures, unresolved advisories, and checks you could not run.
