## 6.0.0

- Upgrade workspace to Angular 17.3 and Nx 18.3
- Replace `@nguniversal/*` with `@angular/ssr`
- Update Storybook and Nx configs per migrations
- Remove deprecated `updateBuildableProjectDepsInPackageJson` option
- Bump minimum peer deps:
  - `@angular/*`: >=16
  - `rxjs`: >=7
  - `@infinum/ngx-nuts-and-bolts-ssr` peers updated to `@infinum/ngx-nuts-and-bolts@>=5`

Breaking changes:

- Angular <17 is no longer supported.
- SSR example/builders now use `@angular-devkit/build-angular` and `@angular/ssr`.

Migration notes:

- Use Angular CLI 17 (`@angular/cli@17.3`) and Node LTS supported by Angular 17.
- If you previously relied on `@nguniversal/*`, migrate to `@angular/ssr`.
