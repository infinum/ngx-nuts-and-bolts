# Dependency Audit Report

Generated: 2026-07-20T07:16:23.103Z
Package manager: pnpm
Project: /Users/marinteskera/Documents/Projects/Infinum/ngx-nuts-and-bolts
Minimum release age: 28800 minutes (20 days) — pnpm-workspace.yaml (minimumReleaseAge)

## Recommended overrides

```yaml
overrides:
  adm-zip@<0.6.0: '>=0.6.0'
  websocket-driver@<0.7.5: '>=0.7.5'
```

## Direct dependencies to update

_No vulnerable direct dependencies._

## Dependencies with vulnerable transitives

| Package     | Current | Min safe               | Latest patch age | Release-age alternative | Vulnerable transitives    | Notes |
| ----------- | ------- | ---------------------- | ---------------- | ----------------------- | ------------------------- | ----- |
| @nx/angular | unknown | none reported by audit | —                | —                       | websocket-driver, adm-zip | —     |

## Transitive dependencies

| Package          | Severity | Installed | Vulnerable range | Dependency chain               | Direct parent(s) |
| ---------------- | -------- | --------- | ---------------- | ------------------------------ | ---------------- |
| adm-zip          | high     | unknown   | <0.6.0           | @nx/angular → adm-zip          | @nx/angular      |
| websocket-driver | moderate | unknown   | <0.7.5           | @nx/angular → websocket-driver | @nx/angular      |
| websocket-driver | critical | unknown   | <0.7.5           | @nx/angular → websocket-driver | @nx/angular      |
