import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export type BreadcrumbDataEnvelope<TBreadcrumbData, TRouteData = TBreadcrumbData> = {
	breadcrumbData: TBreadcrumbData;
	routeData?: TRouteData;
};

export type BreadcrumbResolver<TBreadcrumbData, TRouteData = TBreadcrumbData> = (
	route: ActivatedRouteSnapshot,
	state: RouterStateSnapshot
) =>
	| BreadcrumbDataEnvelope<TRouteData, TBreadcrumbData>
	| Observable<BreadcrumbDataEnvelope<TRouteData, TBreadcrumbData>>
	| Promise<BreadcrumbDataEnvelope<TRouteData, TBreadcrumbData>>;
