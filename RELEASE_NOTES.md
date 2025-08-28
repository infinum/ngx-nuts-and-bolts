# Release 6.0.0

This release upgrades the repo to Angular 17.3 and Nx 18.3 using Angular CLI and Nx migrations.

Highlights:

- Angular framework upgraded stepwise 16 -> 17
- Nx upgraded 16 -> 17 -> 18
- SSR stack migrated from `@nguniversal/*` to `@angular/ssr`
- Deprecated Nx option `updateBuildableProjectDepsInPackageJson` removed

Peer Dependencies (minimum supported):

- `@infinum/ngx-nuts-and-bolts`: `@angular/* >= 16`, `rxjs >= 7`
- `@infinum/ngx-nuts-and-bolts-ssr`: `@angular/* >= 16`, `@infinum/ngx-nuts-and-bolts >= 5`

Breaking Changes:

- Angular < 17 no longer supported
- Universal packages replaced by `@angular/ssr`

Migration Guide:

1. Ensure your app uses Angular 17+ (this repo) or Angular 16+ (library consumers) and TypeScript 5.3+.
2. Replace any `@nguniversal/*` usage with `@angular/ssr` equivalents.
3. Use Angular CLI 17 for builds (`@angular/cli@17.3.x`).
4. Update Node to an Angular 17-supported LTS (Node 18/20).

Changelog: See `CHANGELOG.md` for the detailed list of edits.
