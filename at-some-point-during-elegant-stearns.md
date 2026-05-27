# Re-add Docusaurus, Storybook, and Example Apps to ngx-nuts-and-bolts

## Context

During recent dependency upgrades the workspace was regenerated in commit `e3172b7` ("regenerate project") in order to clear vulnerabilities without paying for major upgrades to Docusaurus, Storybook, and the example apps. That commit deleted:

- The Docusaurus docs site at `ngx-nuts-and-bolts-docs/` (Docusaurus 2.0.0-beta.14, GH Pages, Algolia)
- The Storybook setup at `libs/ngx-nuts-and-bolts/.storybook/` plus 6 story files (Storybook 7.0.24 for Angular)
- Three example apps: `apps/breadcrumbs-example`, `apps/environment-variables-fetch-example`, `apps/environment-variables-ssr-example`
- Two supporting testbed libs: `libs/breadcrumbs-testbed`, `libs/environment-variables-example-app-base`

The last commit where all of these existed is `c6e1459` ("Fix and add missing imports in the docs #116"). Current workspace is Nx 21.5.2 (plugins at @nx/* 22.2.0), Angular 20.3.21, pnpm 10.9.0, Node 22.20.0, libraries-only (no `apps/`).

Goal: bring Docusaurus, Storybook, and the three example apps back as Nx projects, recovering content from `c6e1459` and upgrading each to current versions (Angular **21**, Storybook **10.x**, Docusaurus **3.x**). The Angular 21 bump lands first so the recovered example apps go straight from 16 → 21 instead of doing a wasted 20 → 21 step later.

User-approved decisions:
- **Sequencing**: separate PRs/phases (Angular 21 bump first, then four feature phases).
- **Storybook version**: 10.x (Storybook 9 caps at Angular 20; Storybook 10 added Angular 21 support).
- **Docs location**: `apps/docs`.
- **Algolia**: restore now. Algolia DocSearch entry is still active and the canonical URL/baseUrl (`https://infinum.github.io/ngx-nuts-and-bolts/`) is unchanged from the old config — `appId: K4XBJI8YCN`, `indexName: ngx-nuts-and-bolts`, public search `apiKey: 9c80fcb5c3bf1eba3b438a2c35956bfd` are all reusable as-is.
- **Angular**: bump workspace from 20.3.21 → 21.x before re-adding examples/Storybook.
- **Nx**: take whatever `nx migrate latest` resolves to and absorb the breakage as part of Phase 0 (no version pin).
- **GitHub Pages**: still configured and serving the existing `gh-pages` branch — no Pages re-enablement needed.
- **Infinum design system**: `@infinum/docusaurus-theme` and `infinum-docs-theme-classic` footer widgets are dropped entirely; no replacement.
- **Docs deploy auth** (provisional, revisit before Phase 3 lands): use the built-in `secrets.GITHUB_TOKEN` with `permissions: contents: write` on the deploy job — no new repo secret required. `DOCS_USER_NAME` / `DOCS_USER_EMAIL` continue to set the commit identity via Docusaurus's `GIT_USER_NAME` / `GIT_USER_EMAIL`.

## Tooling preference

**Use the Nx CLI, Nx generators, and Nx migrations wherever they exist.** Prefer `nx migrate`, `nx g <generator>`, and `nx add <plugin>` over hand-editing `project.json`, `nx.json`, or `tsconfig.*` files or running raw package-manager / framework commands. Reach for `ng update` / `pnpm dlx` / manual edits only when no Nx-native path exists, and document the reason inline in the PR. Concretely:

- Phase 0: drive the Angular 21 upgrade via `nx migrate latest` (then `nx migrate --run-migrations`), not `ng update`, so `@nx/angular` + Angular core stay in lockstep and Nx's migration runner handles workspace config rewrites.
- Phase 1: install Storybook via `nx add @nx/storybook` and configure via `nx g @nx/storybook:configuration` — never copy `.storybook/` from history or hand-author `main.ts`.
- Phase 2: create every app and library with `nx g @nx/angular:application` / `nx g @nx/angular:library`; only the source files (components, services, templates) come from git history. Use `nx g @nx/angular:component` for any new components rather than hand-writing them.
- Phase 3: scaffold Docusaurus with `pnpm create docusaurus@latest`, but wire it into the workspace with `nx g @nx/js:library` or by extending an Nx-generated `project.json` skeleton, and prefer `@nx/js:run-commands` for `serve` / `build` / `deploy` targets.
- Phase 4: extend cache config via Nx-recommended `targetDefaults` shape; verify with `nx show project <name>` and `nx graph` rather than reading JSON by eye.

---

## Phase 0 — Bump workspace to Angular 21

Risk: medium. Goal: existing `libs/ngx-nuts-and-bolts` and `libs/ngx-nuts-and-bolts-ssr` build, lint, and test green on Angular 21 before any new projects are added.

1. Confirm the latest Angular 21 patch (check `pnpm view @angular/core dist-tags`). Angular 21 needs Node 20.19+ or 22.12+ — current `devEngines.node` is `^22.20.0`, which is compatible.
2. Drive the upgrade with Nx, not raw `ng update`:
   - `pnpm nx migrate latest` — writes `migrations.json` and bumps `package.json` for nx + `@nx/angular` + transitively Angular core.
   - `pnpm install`
   - `pnpm nx migrate --run-migrations` — executes Nx + Angular schematic migrations together (workspace config rewrites, `*ngIf`/`*ngFor` → `@if`/`@for`, standalone-by-default, signal-input migrations, builder target rewrites).
   - Delete `migrations.json` once green.
3. If `nx migrate` leaves any `@angular/*` packages off-version (it usually does for ones Nx doesn't depend on directly — `@angular/animations`, `forms`, `platform-server`, `ssr`, etc.), align them to the same minor via `pnpm update @angular/*@21` and re-run `pnpm nx migrate --run-migrations` if it produces new migrations.
4. Bump remaining Angular-ecosystem peers to Angular-21-compatible versions:
   - `ng-packagr` → 21.x (handled by `nx migrate` if pulled via @nx/angular; otherwise `pnpm update ng-packagr@21`).
   - `angular-eslint` / `@angular-eslint/*` → 21.x (the @nx/angular migration usually handles this; verify).
   - `jest-preset-angular` → **^16.1.x** (confirmed: 16.0 added Angular 21 support, 16.1.5 is current as of May 2026; current workspace is on 15.0.0 which only supports Angular ≤20).
   - Confirm `zone.js` constraint still satisfied; Angular 21 keeps `~0.15.x`.
5. Verify both libs publish via `pnpm nx build` cleanly and `pnpm nx run-many -t lint test build` is green. Lock the new versions in `pnpm-lock.yaml`.
6. Land this as its own PR — keeps the upgrade isolated from the much larger Phases 1–4 below.

**Files modified**: `package.json`, `pnpm-lock.yaml`, both libs' `tsconfig.*.json`, `eslint.config.mjs`, possibly `nx.json` (if @nx/angular ships an Angular-21 migration).

---

## Phase 1 — Storybook 10 setup in `libs/ngx-nuts-and-bolts`

Risk: low–medium. Goal: `nx storybook ngx-nuts-and-bolts` serves a working catalog of all 6 stories.

1. Install `@nx/storybook` matched to current Nx via `pnpm nx add @nx/storybook`.
2. **Add pnpm overrides before invoking the Storybook init** — Storybook 10's Angular init asks for `@angular-devkit/build-angular@^21.2.9` which doesn't exist on npm yet (latest is 21.2.7). Add to `package.json`:
   ```json
   "pnpm": {
     "overrides": {
       "@angular-devkit/build-angular": "21.2.7",
       "@angular-devkit/core": "21.2.7"
     }
   }
   ```
   Run `pnpm install` before the next step.
3. Run `pnpm nx g @nx/storybook:configuration ngx-nuts-and-bolts --uiFramework=@storybook/angular --interactionTests=false`. Confirm Storybook 10.x is selected; if the `@nx/storybook` generator still pins to 9.x (it likely lags one Storybook major behind), manually bump `@storybook/*` to 10.x and re-run `pnpm install`. The `--interactionTests=false` flag is still supported in current `@nx/storybook` (default is `true`).
4. Recover story bodies (do NOT lift old `.storybook/main.js` or `preview.js` — let the generator own those):
   ```
   git show c6e1459:libs/ngx-nuts-and-bolts/animations/src/lib/height-fade-animation-component.stories.ts
   git show c6e1459:libs/ngx-nuts-and-bolts/enum-property/src/enum-property.stories.ts
   git show c6e1459:libs/ngx-nuts-and-bolts/env/src/environment-variables.stories.ts
   git show c6e1459:libs/ngx-nuts-and-bolts/form-utils/src/file-cva/file-cva.stories.ts
   git show c6e1459:libs/ngx-nuts-and-bolts/in-view/src/in-view.stories.ts
   git show c6e1459:libs/ngx-nuts-and-bolts/loading-state/src/loading-state.stories.ts
   ```
   All 6 are confirmed single-`Default`-export stories — no extra variants to preserve.
5. Per-story migrations (verified against `loading-state.stories.ts`):
   - Replace `import { Meta, Story } from '@storybook/angular'` → `import type { Meta, StoryObj } from '@storybook/angular'`.
   - Replace the `Template.bind({})` pattern with CSF3: `export default { title, component } satisfies Meta<...>; type Story = StoryObj<...>; export const Default: Story = { args: {} };`.
   - Convert each host component to `standalone: true` and add `imports: [CommonModule]` (or convert `*ngIf`/`*ngFor` templates to Angular 21 control flow `@if`/`@for`). The recovered host components are decorator-bare (not standalone) and use structural directives heavily — this is the bulk of the per-story work. If the Angular 21 standalone-by-default migration in Phase 0 doesn't flip them automatically (it usually only migrates `@Component`-decorated classes inside the projects it touches), do it by hand here.
   - Drop `argTypes.action` usages; use `fn()` from `@storybook/test` if interaction handlers are needed.
6. Add `autodocs: 'tag'` in the generated `main.ts` and tag stories with `tags: ['autodocs']` where Markdown-style docs are wanted.
7. Add `build-storybook` to `nx.json` `targetDefaults` with `inputs: ["production", "^production"]` and `cache: true`; mirror the `production` named-input exclusion list to skip `**/*.stories.ts`. The current `nx.json` does not have a storybook exclusion in `production` — extend it: `"!{projectRoot}/**/*.stories.@(js|jsx|ts|tsx|mdx)"`, `"!{projectRoot}/.storybook/**/*"`, `"!{projectRoot}/tsconfig.storybook.json"`.
8. Verify: `pnpm nx storybook ngx-nuts-and-bolts` opens at `http://localhost:4400/`, all 6 stories load, `pnpm nx build-storybook ngx-nuts-and-bolts` succeeds, `pnpm nx run-many -t lint test build` stays green.

**Files modified**: `package.json`, `nx.json`, `libs/ngx-nuts-and-bolts/project.json`. Files created: `libs/ngx-nuts-and-bolts/.storybook/main.ts`, `preview.ts`, `tsconfig.json`; the 6 story files at their original paths.

---

## Phase 2 — Example apps + testbed libs

Risk: medium–high. Three example apps (already standalone in `c6e1459`, but on an old Angular minor and the old `@angular-devkit/build-angular:browser` builder) recovered and upgraded to Angular 21 standalone + the new `@angular/build:application` builder (Phase 0 already moved the workspace to 21).

Order matters — restore the **three** supporting libs first so the apps' imports resolve.

1. **Generate fresh skeletons** rather than restoring `project.json` / `tsconfig.app.json` from `c6e1459`:
   - `pnpm nx g @nx/angular:application apps/breadcrumbs-example --standalone --routing --style=scss --bundler=esbuild --ssr=false`
   - `pnpm nx g @nx/angular:application apps/environment-variables-fetch-example --standalone --routing --style=scss --bundler=esbuild --ssr=false`
   - `pnpm nx g @nx/angular:application apps/environment-variables-ssr-example --standalone --routing --style=scss --bundler=esbuild --ssr=true`
   - `pnpm nx g @nx/angular:library libs/breadcrumbs-testbed --standalone --buildable=false --publishable=false`
   - `pnpm nx g @nx/angular:library libs/environment-variables-example-app-base --standalone --buildable=false --publishable=false`
   - `pnpm nx g @nx/js:library libs/msw-public --bundler=none --no-publishable` (this lib only holds the static `mockServiceWorker.js` that `breadcrumbs-example` serves; adjust the generator flags so it ends up as a plain asset-hosting lib with no build step).
2. **Port sources** from `c6e1459` over the generated scaffolds — components, routes, services, mock data:
   ```
   git checkout c6e1459 -- libs/breadcrumbs-testbed/src
   git checkout c6e1459 -- libs/environment-variables-example-app-base/src
   git checkout c6e1459 -- libs/msw-public/mockServiceWorker.js
   git checkout c6e1459 -- apps/breadcrumbs-example/src
   git checkout c6e1459 -- apps/environment-variables-fetch-example/src
   git checkout c6e1459 -- apps/environment-variables-ssr-example/src
   git checkout c6e1459 -- apps/environment-variables-ssr-example/server.ts
   ```
   After checkout, delete recovered `project.json` / `tsconfig.*.json` / `main.ts` files — keep only the source code; the regenerated skeletons own the build wiring. **Do not** recover `*.spec.ts` files from `c6e1459`; keep only the generator's default smoke test per app/lib. The old `libs/breadcrumbs-testbed/src/lib/tests/breadcrumbs.spec.ts` (and its MSW handler setup) is intentionally dropped — re-add tests later if needed.
3. **Per-app migrations to Angular 21**:
   - The recovered app components (e.g. `apps/breadcrumbs-example/src/app/app.component.ts`) are already `standalone: true` with `imports: [...]` and have an `app.config.ts` — they will compile against Angular 21 with mostly cosmetic changes.
   - The Angular 21 `nx migrate` run from Phase 0 only touches projects that existed at that time, so it will NOT auto-migrate any code recovered into these new apps. Convert any remaining `*ngIf` / `*ngFor` / `*ngSwitch` to `@if` / `@for` / `@switch` by hand (lint will surface remaining cases), and add `standalone: true` to any component that's still decorator-bare.
   - **MSW is breadcrumbs-only**: `libs/breadcrumbs-testbed` and `apps/breadcrumbs-example` use MSW; the two envvars apps do not. Recover `libs/breadcrumbs-testbed/jest.polyfills.js` and the `customer.handlers.ts` from `c6e1459`, port them to MSW v2 / jest 30 API shape, and wire `mockServiceWorker.js` from `libs/msw-public` into `apps/breadcrumbs-example`'s build assets. Skip MSW wiring entirely for both envvars apps.
   - SSR app: port `server.ts` to Angular 21's `@angular/ssr` `AngularNodeAppEngine` API. Reference the (now-on-21) `libs/ngx-nuts-and-bolts-ssr` for the current SSR shape — the recovered `server.ts` uses the legacy `@nguniversal/express-engine` which no longer exists.
4. Update `tsconfig.base.json` path mappings for the three recovered libs (`breadcrumbs-testbed`, `environment-variables-example-app-base`, `msw-public`). The generators add these automatically when the libs are created first — verify after generation.
5. Each app should consume `@infinum/ngx-nuts-and-bolts/*` via the existing workspace path mapping — no new aliases needed.
6. Verify: `pnpm nx serve breadcrumbs-example`, `pnpm nx serve environment-variables-fetch-example`, `pnpm nx serve environment-variables-ssr-example` (each on a distinct port) all boot and the demoed feature works in a browser. `pnpm nx run-many -t lint test build` stays green across the expanded workspace.

**Critical files**: `tsconfig.base.json`, `nx.json`, each new `apps/*/project.json` and `libs/*/project.json`.

---

## Phase 3 — Docusaurus 3 at `apps/docs`

Risk: high. Largest version delta (2.0-beta → 3.x), MDX 2 → 3, custom theme dropped, Algolia restored.

1. Scaffold fresh: `pnpm create docusaurus@latest apps/docs classic --typescript` from repo root.
2. Wire to Nx with an `apps/docs/project.json` exposing:
   - `serve` → `docusaurus start` via `@nx/js:run-commands`
   - `build` → `docusaurus build`
   - `deploy` → `docusaurus deploy` (GH Pages)
   Set `cache: true` and `outputs: ["{projectRoot}/build"]` on `build`.
3. **Recover content only** (markdown, images, sidebar structure, landing page):
   ```
   git show c6e1459:ngx-nuts-and-bolts-docs/sidebars.js > apps/docs/sidebars.ts
   git checkout c6e1459 -- ngx-nuts-and-bolts-docs/docs
   git checkout c6e1459 -- ngx-nuts-and-bolts-docs/static
   git show c6e1459:ngx-nuts-and-bolts-docs/src/pages/index.js
   git show c6e1459:ngx-nuts-and-bolts-docs/src/pages/index.module.css
   git show c6e1459:ngx-nuts-and-bolts-docs/src/theme/Footer/index.js
   git show c6e1459:ngx-nuts-and-bolts-docs/src/theme/styles.css
   ```
   Move recovered `docs/` and `static/` under `apps/docs/`. Convert `sidebars.js` → `sidebars.ts`. Delete the legacy `ngx-nuts-and-bolts-docs/` tree once moved.
4. **`docusaurus.config.ts` rewrite** (TypeScript, Docusaurus 3 shape). Preserve from old config:
   - `title`, `tagline`, `url: 'https://infinum.github.io/ngx-nuts-and-bolts/'`, `baseUrl: '/ngx-nuts-and-bolts/'`, `organizationName: 'infinum'`, `projectName: 'ngx-nuts-and-bolts'`, `deploymentBranch: 'gh-pages'`, `favicon: 'img/favicon.png'`.
   - Algolia block: `{ appId: 'K4XBJI8YCN', apiKey: '9c80fcb5c3bf1eba3b438a2c35956bfd', indexName: 'ngx-nuts-and-bolts' }` under `themeConfig.algolia`. (Confirmed: the Algolia DocSearch entry is still active and the URL/baseUrl is unchanged, so no DocSearch re-onboarding is needed.)
   - `colorMode: { defaultMode: 'light', disableSwitch: true }`.
   - Navbar items (Docs link, GitHub link).
   **Drop `@infinum/docusaurus-theme` entirely** — no replacement. The custom CSS imports are removed from the `theme.customCss` array; only `src/css/custom.css` (Docusaurus's generated file) is referenced. Re-port any genuinely site-specific styling from the recovered `src/theme/styles.css` into that one file, but do not pull in the Infinum design-system stylesheet.
5. **MDX 2 → 3 sweep** on `breadcrumbs.mdx`: escape stray `{` / `}`, fix bare JSX expressions, remove HTML comments. Run `pnpm nx build docs` to surface remaining MDX errors.
6. **Custom footer**: lift `src/theme/Footer/index.js` content into a Docusaurus 3 swizzle (`pnpm --filter docs run swizzle @docusaurus/theme-classic Footer -- --eject --typescript`) and port the markup. **Drop all `infinum-docs-theme-classic` widgets** — replace with plain `<a>` links (GitHub link, plus whatever community links the old footer had as plain anchors).
7. **Replace `.github/workflows/docs.yml`** (currently broken — still references the deleted `ngx-nuts-and-bolts-docs/` folder). Rewrite it in place so that on push to `main` it runs `pnpm install`, `pnpm nx build docs`, and `pnpm nx deploy docs`. Reference `.github/workflows/ci.yml` for the Node 22.20.0 + pnpm 10.9.0 setup pattern.

   **Deploy auth** (provisional — using the built-in `GITHUB_TOKEN`; revisit if it doesn't suit):
   - Set `permissions: contents: write` on the deploy job (the default `GITHUB_TOKEN` is read-only for `contents` unless explicitly elevated).
   - Pass the token as the HTTPS password for `docusaurus deploy`:
     ```yaml
     env:
       GIT_USER: github-actions[bot]
       GIT_PASS: ${{ secrets.GITHUB_TOKEN }}
       GIT_USER_NAME: ${{ secrets.DOCS_USER_NAME }}
       GIT_USER_EMAIL: ${{ secrets.DOCS_USER_EMAIL }}
       DEPLOYMENT_BRANCH: gh-pages
     ```
     `GIT_USER` value is cosmetic when authenticating with a PAT-shaped token (GitHub's HTTPS git accepts the token as the password regardless of the username), so `github-actions[bot]` is fine. `DOCS_USER_NAME` / `DOCS_USER_EMAIL` set the commit identity only.
   - If pushing to `gh-pages` from the default `GITHUB_TOKEN` is blocked by branch protection or by org-level Pages settings, fall back to either (a) a bot-account PAT stored as `secrets.GIT_DEPLOY_TOKEN`, or (b) an SSH deploy key with `USE_SSH=true`.
8. Verify: `pnpm nx serve docs` shows the site at `http://localhost:3000/ngx-nuts-and-bolts/`, sidebar matches the old one, every page renders, search box appears, `pnpm nx build docs` succeeds, GitHub Action passes on a draft PR.

**Critical files**: `apps/docs/docusaurus.config.ts`, `apps/docs/sidebars.ts`, `apps/docs/project.json`, `.github/workflows/docs.yml` (rewritten in place).

---

## Phase 4 — CI / cache wiring

Risk: low. Tie everything into the existing CI without slowing it down.

1. Extend `nx.json` `targetDefaults` with cacheable defaults for `build-storybook`, `serve` (`cache: false`), and `deploy` (`cache: false`).
2. Update `package.json` `scripts.build` and `scripts.test` — they already use `nx run-many --all=true`, so new projects join automatically. Confirm Nx picks up new `project.json`s.
3. Extend `.github/workflows/ci.yml` (if missing) with steps to also `nx build docs` and `nx build-storybook ngx-nuts-and-bolts` on PRs.
4. Verify: full `pnpm nx run-many -t lint test build build-storybook` and `pnpm nx build docs` pass; CI green on a draft PR; cache hits on a second run.

---

## Critical files to modify

- `nx.json` — target defaults + production-input exclusions for stories
- `package.json` — add @nx/storybook, Storybook 10, Docusaurus 3 deps; add pnpm `overrides` for `@angular-devkit/build-angular` + `@angular-devkit/core` pinned to 21.2.7
- `tsconfig.base.json` — path mappings for the three recovered libs
- `libs/ngx-nuts-and-bolts/project.json` — storybook + build-storybook targets
- `.github/workflows/ci.yml` — extend with storybook + docs build
- `.github/workflows/docs.yml` — rewritten in place (currently broken, references deleted `ngx-nuts-and-bolts-docs/`)
- Files created per phase listed inline above

## Existing utilities to reuse

- `libs/ngx-nuts-and-bolts-ssr` is the authoritative reference for the Angular 21 SSR shape (after Phase 0) — port the example SSR app to match its setup, not the recovered Angular 16 `server.ts`.
- Existing Jest + ESLint presets in `libs/ngx-nuts-and-bolts/*` are the template for the testbed libs.
- `nx.json` already configures `@nx/jest:jest` and `@nx/eslint:lint` with cache defaults — new projects inherit automatically.

## End-to-end verification

After all four phases:

1. `pnpm install` clean from lockfile.
2. `pnpm nx run-many -t lint test build` — all projects green.
3. `pnpm nx build-storybook ngx-nuts-and-bolts` — Storybook static build artefact produced; `pnpm nx storybook ngx-nuts-and-bolts` opens browser with 6 working stories.
4. `pnpm nx serve breadcrumbs-example` / `pnpm nx serve environment-variables-fetch-example` / `pnpm nx serve environment-variables-ssr-example` — each app loads in browser, demoed feature works (click through breadcrumbs, switch env vars, confirm SSR pre-render).
5. `pnpm nx serve docs` — Docusaurus site loads at `/ngx-nuts-and-bolts/`, all sidebar pages render, search modal opens and returns results from the Algolia index.
6. `pnpm nx build docs` produces a static site; `nx deploy docs` (dry-run on a fork) publishes to `gh-pages` branch.
7. CI green on draft PR for each phase.
