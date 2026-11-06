# docs

Documentation site for `@infinum/ngx-nuts-and-bolts`, built with [Docusaurus](https://docusaurus.io/) and published to GitHub Pages at https://infinum.github.io/ngx-nuts-and-bolts/.

Run all commands from the repository root.

## Local development

```bash
pnpm nx serve docs
```

Starts a dev server at http://localhost:3000/ngx-nuts-and-bolts/ with live reload.

## Build

```bash
pnpm nx build docs
```

Generates the static site into `apps/docs/build`.

## Deployment

Deployment runs automatically on pushes to `main` via `.github/workflows/docs.yml`. To deploy manually:

```bash
GIT_USER=<your GitHub username> pnpm nx deploy docs
```

`deploy` builds the site first and then pushes it to the `gh-pages` branch.
