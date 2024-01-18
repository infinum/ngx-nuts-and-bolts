/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
	// By default, Docusaurus generates a sidebar from the docs folder structure
	// tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],
	mainSidebar: [
		{
			type: 'doc',
			id: 'introduction',
		},
		{
			type: 'doc',
			id: 'environment-variables',
		},
		{
			type: 'doc',
			id: 'loading-state',
		},
		{
			type: 'doc',
			id: 'table-state',
		},
		{
			type: 'doc',
			id: 'in-view',
		},
		{
			type: 'doc',
			id: 'enum-property',
		},
		{
			type: 'doc',
			id: 'animations',
		},
		{
			type: 'doc',
			id: 'breadcrumbs',
		},
		{
			type: 'doc',
			id: 'form-utils',
		},
		{
			type: 'category',
			label: 'Testing utilities',
			items: ['testing-utils/extract-public', 'testing-utils/async-data', 'testing-utils/async-error'],
		},
	],

	// But you can create a sidebar manually
	/*
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Tutorial',
      items: ['hello'],
    },
  ],
   */
};

module.exports = sidebars;
