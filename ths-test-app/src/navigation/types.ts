import type { RouteProp, NavigationProp, ParamListBase } from '@react-navigation/native';

/**
 * Convenience aliases for per-screen route and navigation props.
 * All types derive from the global RootParamList declared in navigation/index.tsx,
 * so they update automatically when screen params change there.
 *
 * RootParamList lacks a string index signature so we intersect with ParamListBase
 * to satisfy RouteProp / NavigationProp generic constraints.
 */
type RootParams = ReactNavigation.RootParamList & ParamListBase;

export type RootNavigation = NavigationProp<RootParams>;

export type HomeScreenRouteProps = RouteProp<RootParams, 'HomeTabs'>;
export type ListingsScreenRouteProps = RouteProp<RootParams, 'HomeTabs'>;
export type ListingScreenRouteProps = RouteProp<RootParams, 'Listing'>;
export type NotFoundScreenRouteProps = RouteProp<RootParams, 'NotFound'>;
