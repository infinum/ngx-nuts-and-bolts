import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

function doc(id: string) {
	return { type: 'doc' as const, id };
}

const sidebars: SidebarsConfig = {
	mainSidebar: [
		...[
			'introduction',
			'environment-variables',
			'loading-state',
			'route-config-loading',
			'table-state',
			'in-view',
			'enum-property',
			'animations',
			'breadcrumbs',
			'di-token-type',
		].map(doc),
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
