const nx = require('@nx/eslint-plugin');

module.exports = [
	...nx.configs['flat/base'],
	...nx.configs['flat/typescript'],
	...nx.configs['flat/javascript'],
	{
		ignores: ['**/mockServiceWorker.js'],
	},
	{
		files: ['**/*.ts', '**/*.js'],
		rules: {},
	},
];
