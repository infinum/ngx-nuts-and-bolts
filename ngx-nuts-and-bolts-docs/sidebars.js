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
			type: 'category',
			label: 'Getting started',
			items: ['introduction'],
		},
		{
			type: 'category',
			label: 'Directives',
			items: ['directives/loading-state'],
		},
		{
			type: 'category',
			label: 'Animations',
			items: ['animations/animations'],
		},
		{
			type: 'category',
			label: 'Pipes',
			items: ['pipes/enum-property']
		},
		{
			type: 'category',
			label: 'Utilities',
			items: ['utilities/testing/extract-public'],
		},
		{
			type: 'doc',
			id: 'table-state/table-state',
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
