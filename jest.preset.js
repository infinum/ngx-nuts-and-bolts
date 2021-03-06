const nxPreset = require('@nrwl/jest/preset');

module.exports = {
	...nxPreset,
	transform: { '^.+.(ts|mjs|js|html)$': 'jest-preset-angular' },
	transformIgnorePatterns: ['node_modules/(?!.*.mjs$)'],
	coverageReporters: ['text', 'lcov', 'html'],
	collectCoverage: true,
	collectCoverageFrom: ['./src/lib/**'],
	// prettier-ignore
	coveragePathIgnorePatterns: [
		'stories.ts',
		// 'module.ts',
		'\.testing.*ts', // eslint-disable-line no-useless-escape
		'animation.ts'
	],
	coverageThreshold: {
		global: {
			branches: 25,
			functions: 40,
			lines: 45,
			statements: 50,
		},
	},
};
