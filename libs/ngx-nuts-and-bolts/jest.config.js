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
	coverageReporters: ['text'],

	coverageThreshold: {
		global: {
			branches: 75,
			functions: 80,
			lines: 80,
			statements: 95,
		},
	},
};
