import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';
import type { Props } from '@theme/Footer/LinkItem';

export default function FooterLinkItem({ item }: Props): ReactNode {
	const { to, href, label, prependBaseUrlToHref, className, ...props } = item;
	const toUrl = useBaseUrl(to);
	const normalizedHref = useBaseUrl(href, { forcePrependBaseUrl: true });
	let linkHref = toUrl;
	if (href) {
		linkHref = prependBaseUrlToHref ? normalizedHref : href;
	}

	return (
		<a className={clsx('footer__link-item', className)} href={linkHref} {...props}>
			{label}
		</a>
	);
}
