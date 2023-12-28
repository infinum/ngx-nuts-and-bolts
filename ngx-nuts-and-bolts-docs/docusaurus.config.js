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
	favicon: 'img/favicon.png',
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
					customCss: [
						require.resolve('./src/theme/styles.css'),
						require.resolve('@infinum/docusaurus-theme/dist/style.css'),
					],
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
				indexName: 'ngx-nuts-and-bolts',
			},
			colorMode: {
				defaultMode: 'light',
				disableSwitch: true,
				respectPrefersColorScheme: false,
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
				links: [
					{
						title: 'Community',
						items: [
							{
								label: 'Facebook',
								href: 'https://facebook.com/infinumcom',
								icon: 'facebook',
								target: '_blank',
							},
							{
								label: 'Instagram',
								href: 'https://instagram.com/infinumcom/',
								icon: 'instagram',
								target: '_blank',
							},
							{
								label: 'Twitter',
								href: 'https://twitter.com/infinum',
								icon: 'twitter',
								target: '_blank',
							},
							{
								label: 'Clutch',
								href: 'https://clutch.co/profile/infinum',
								icon: 'clutch',
								target: '_blank',
							},
							{
								label: 'Dribbble',
								href: 'https://dribbble.com/infinum',
								icon: 'dribbble',
								target: '_blank',
							},
							{
								label: 'LinkedIn',
								href: 'https://linkedin.com/company/infinum/',
								icon: 'linkedin',
							},
						],
					},
				],
				copyright: 'Made with ❤️ by Infinum team.',
			},
			prism: {
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme,
			},
		}),
};

module.exports = config;
