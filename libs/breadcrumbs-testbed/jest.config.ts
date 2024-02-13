/* eslint-disable */
export default {
	displayName: 'breadcrumbs-testbed',
	preset: '../../jest.preset.js',
	setupFiles: ['./jest.polyfills.js'],
	setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
	coverageDirectory: '../../coverage/libs/breadcrumbs-testbed',
	transform: {
		'^.+\\.(ts|mjs|js|html)$': [
			'jest-preset-angular',
			{
				tsconfig: '<rootDir>/tsconfig.spec.json',
				stringifyContentPathRegex: '\\.(html|svg)$',
			},
		],
	},
	transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
	snapshotSerializers: [
		'jest-preset-angular/build/serializers/no-ng-attributes',
		'jest-preset-angular/build/serializers/ng-snapshot',
		'jest-preset-angular/build/serializers/html-comment',
	],
};
