import { ROUTE } from "./types.ts";

interface NAVIGATION {
	NEXT_ROUTE: ROUTE | undefined;
	BACK_ROUTE: ROUTE | "";
}

const NAVIGATION_MAP: Record<ROUTE, NAVIGATION> = {
	[ROUTE.STEP_1]: {
		NEXT_ROUTE: ROUTE.STEP_2,
		BACK_ROUTE: "",
	},
	[ROUTE.STEP_2]: {
		NEXT_ROUTE: ROUTE.STEP_3,
		BACK_ROUTE: ROUTE.STEP_1,
	},
	[ROUTE.STEP_3]: {
		NEXT_ROUTE: undefined,
		BACK_ROUTE: ROUTE.STEP_2,
	},
};

export function getNavigationRoute(step: ROUTE): NAVIGATION {
	return NAVIGATION_MAP[step] as NAVIGATION;
}
