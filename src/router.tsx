// Reatom logger setup
import { connectLogger, log } from "@reatom/core";

if (import.meta.env.MODE === "development") {
	connectLogger();
}

declare global {
	var LOG: typeof log;
}
globalThis.LOG = log;

// Tanstack Router setup
import { createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
	const router = createRouter({
		routeTree,
		context: {},
		scrollRestoration: true,
		defaultPreloadStaleTime: 0,
	});

	return router;
};
