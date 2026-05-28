import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
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
			id: 'route-config-loading',
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
			id: 'di-token-type',
		},
		{
			type: 'category',
			label: 'Form utilities',
			items: ['form-utils/form-value-type', 'form-utils/file-cva'],
		},
		{
			type: 'category',
			label: 'Testing utilities',
			items: [
				'testing-utils/extract-public',
				'testing-utils/async-data',
				'testing-utils/async-error',
				'testing-utils/mock-storage',
			],
		},
	],
};

export default sidebars;
