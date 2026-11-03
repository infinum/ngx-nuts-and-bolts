module.exports = {
	displayName: 'breadcrumbs-testbed',
	preset: '../../jest.preset.js',
	setupFiles: ['<rootDir>/../../libs/breadcrumbs-testbed/jest.polyfills.js'],
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
	transformIgnorePatterns: [
		'node_modules/(?!.*(\\.mjs$|msw|@mswjs|until-async|strict-event-emitter|headers-polyfill|outvariant|path-to-regexp))',
	],
	snapshotSerializers: [
		'jest-preset-angular/build/serializers/no-ng-attributes',
		'jest-preset-angular/build/serializers/ng-snapshot',
		'jest-preset-angular/build/serializers/html-comment',
	],
};
