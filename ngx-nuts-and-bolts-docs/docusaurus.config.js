// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: 'ngx-nuts-and-bolts',
	tagline: 'Collection of reusable components and helpers for building angular applications',
	url: 'https://infinum.github.io/ngx-nuts-and-bolts/',
	baseUrl: '/ngx-nuts-and-bolts/',
	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',
	favicon: 'img/favicon.ico',
	organizationName: 'infinum', // Usually your GitHub org/user name.
	projectName: 'ngx-nuts-and-bolts', // Usually your repo name.
	deploymentBranch: 'gh-pages',
	trailingSlash: 'false',
	presets: [
		[
			'classic',
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					sidebarPath: require.resolve('./sidebars.js'),
				},
				theme: {
					customCss: require.resolve('./src/css/custom.css'),
				},
			}),
		],
	],

	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
      algolia: {
        appId: 'K4XBJI8YCN',
        apiKey: '9c80fcb5c3bf1eba3b438a2c35956bfd',
        indexName: 'ngx-nuts-and-bolts'
      },
			navbar: {
				title: 'ngx-nuts-and-bolts',
				logo: {
					alt: 'ngx-nuts-and-bolts',
					src: 'img/logo.svg',
				},
				items: [
					{
						to: '/docs',
						activeBasePath: 'docs',
						label: 'Docs',
						position: 'left',
					},
					{
						href: 'https://github.com/infinum/ngx-nuts-and-bolts',
						label: 'GitHub',
						position: 'right',
					},
				],
			},
			footer: {
				style: 'dark',
				copyright: `Copyright © ${new Date().getFullYear()} Infinum`,
			},
			prism: {
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme,
			},
		}),
};

module.exports = config;
