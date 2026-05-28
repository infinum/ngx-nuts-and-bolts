import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
	title: 'ngx-nuts-and-bolts',
	tagline: 'When things get screwy in your Angular application, use our tried and tested nuts & bolts!',
	favicon: 'img/favicon.png',
	future: {
		v4: true,
	},
	url: 'https://infinum.github.io',
	baseUrl: '/ngx-nuts-and-bolts/',
	organizationName: 'infinum',
	projectName: 'ngx-nuts-and-bolts',
	deploymentBranch: 'gh-pages',
	trailingSlash: false,
	onBrokenLinks: 'throw',
	markdown: {
		hooks: {
			onBrokenMarkdownLinks: 'warn',
		},
	},
	i18n: {
		defaultLocale: 'en',
		locales: ['en'],
	},
	presets: [
		[
			'classic',
			{
				docs: {
					sidebarPath: './sidebars.ts',
				},
				blog: false,
				theme: {
					customCss: './src/css/custom.css',
				},
			} satisfies Preset.Options,
		],
	],
	themeConfig: {
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
				src: 'img/nuts-and-bolts.svg',
			},
			items: [
				{
					type: 'docSidebar',
					sidebarId: 'mainSidebar',
					position: 'left',
					label: 'Docs',
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
						},
						{
							label: 'Instagram',
							href: 'https://instagram.com/infinumcom/',
						},
						{
							label: 'Twitter',
							href: 'https://twitter.com/infinum',
						},
						{
							label: 'Clutch',
							href: 'https://clutch.co/profile/infinum',
						},
						{
							label: 'Dribbble',
							href: 'https://dribbble.com/infinum',
						},
						{
							label: 'LinkedIn',
							href: 'https://linkedin.com/company/infinum/',
						},
					],
				},
			],
			copyright: 'Made with love by Infinum team.',
		},
		prism: {
			theme: prismThemes.github,
			darkTheme: prismThemes.dracula,
		},
	} satisfies Preset.ThemeConfig,
};

export default config;
