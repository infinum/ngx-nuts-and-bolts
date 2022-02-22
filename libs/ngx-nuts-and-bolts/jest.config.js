module.exports = {
	displayName: 'ngx-nuts-and-bolts',
	preset: '../../jest.preset.js',
	setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
	globals: {
		'ts-jest': {
			tsconfig: '<rootDir>/tsconfig.spec.json',
			stringifyContentPathRegex: '\\.(html|svg)$',
		},
	},
	coverageDirectory: '../../coverage/libs/ngx-nuts-and-bolts',
	transform: {
		'^.+\\.(ts|js|html)$': 'jest-preset-angular',
	},
	snapshotSerializers: [
		'jest-preset-angular/build/serializers/no-ng-attributes',
		'jest-preset-angular/build/serializers/ng-snapshot',
		'jest-preset-angular/build/serializers/html-comment',
	],
	coverageReporters: ['text', 'lcov', 'html'],
	collectCoverage: true,
	collectCoverageFrom: ['./src/lib/**'],
	// prettier-ignore
	coveragePathIgnorePatterns: [
		'stories.ts',
		'module.ts',
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
