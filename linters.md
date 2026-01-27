# Linting Angular projects

To maintain high code quality and consistency across Angular applications, follow a strict linting strategy. This configuration combines industry standards for JavaScript, TypeScript, and Angular-specific best practices.

## Core configuration

When initializing or updating a project, extend the following recommended configurations to ensure a robust baseline:

eslint.configs.recommended: Core JavaScript rules.

tseslint.configs.recommended & stylistic: TypeScript-specific best practices and formatting.

angular.configs.tsRecommended: Official Angular linting for TypeScript.

eslintConfigPrettier: Disables linting rules that might conflict with Prettier.

angular.configs.templateAll: Strict rules for Angular HTML templates.

| config                        | description                                               |
| ----------------------------- | --------------------------------------------------------- |
| angular.configs.tsRecommended | Official Angular linting for TypeScript.                  |
| angular.configs.templateAll   | Strict rules for Angular HTML templates.                  |
| eslint.configs.recommended    | Core JavaScript rules.                                    |
| eslintConfigPrettier          | Disables linting rules that might conflict with Prettier. |
| tseslint.configs.recommended  | TypeScript-specific best practices and formatting.        |
| tseslint.configs.stylistic    | TypeScript-specific best practices and formatting.        |

## Project-Specific Rules

While the recommended sets cover the basics, we enforce additional rules to prevent common pitfalls in Angular (such as breaking Server-Side Rendering) and to keep the git history clean.

Add these to your overrides section:

```json
{
	"rules": {
		"no-console": ["error", { "allow": ["warn", "error"] }],
		"no-restricted-globals": [
			"error",
			{
				"name": "window",
				"message": "Use InjectionToken instead of direct window manipulation."
			},
			{
				"name": "document",
				"message": "Use InjectionToken instead of direct document manipulation."
			},
			{
				"name": "fdescribe",
				"message": "Do not commit fdescribe. Use describe instead."
			}
			{
				"name": "fit",
				"message": "Do not commit fit. Use it instead."
			}
		]
	}
}
```

## Automation & License Headers

To ensure compliance across the team, we automate the maintenance of license headers and code style before any code is committed.

- Rule: Use the `header/header` ESLint rule to define the required license format.

- Workflow: Combine this with Husky and lint-staged to automatically check or inject headers during the pre-commit phase.

Note: This automation ensures that no file is pushed to the repository without the proper legal boilerplate, reducing manual overhead during code reviews.
