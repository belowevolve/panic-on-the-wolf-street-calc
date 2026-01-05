import { type Atom, atom, computed } from "@reatom/core";

import {
	calculateIncome,
	MARKET_COLORS,
	type PortfolioValue,
	type PortfolioValueType,
	STARTING_INDEX,
} from "@/shared/lib/game-data";

export type GameScreen = "market" | "portfolio" | "score";
export const screen = atom<GameScreen>("market", "[SCREEN]");

export const marketIndex = {
	red: atom(STARTING_INDEX, "[MARKET INDEX] RED"),
	yellow: atom(STARTING_INDEX, "[MARKET INDEX] YELLOW"),
	green: atom(STARTING_INDEX, "[MARKET INDEX] GREEN"),
	blue: atom(STARTING_INDEX, "[MARKET INDEX] BLUE"),
};

export const withPortfolioActions = (target: Atom<PortfolioValue>) => ({
	update: (type: PortfolioValueType, value: number) =>
		target.set((prev) => ({ ...prev, [type]: value })),
});

export const portfolio = {
	red: {
		regular: atom(0, "[PORTFOLIO] RED"),
		risky: atom(0, "[PORTFOLIO][RISKY] RED"),
	},
	yellow: {
		regular: atom(0, "[PORTFOLIO] YELLOW"),
		risky: atom(0, "[PORTFOLIO][RISKY] YELLOW"),
	},
	green: {
		regular: atom(0, "[PORTFOLIO] GREEN"),
		risky: atom(0, "[PORTFOLIO][RISKY] GREEN"),
	},
	blue: {
		regular: atom(0, "[PORTFOLIO] BLUE"),
		risky: atom(0, "[PORTFOLIO][RISKY] BLUE"),
	},
};

export const resetPortfolio = () => {
	for (const value of Object.values(portfolio)) {
		value.regular.set(0);
		value.risky.set(0);
	}
};

export const breakdown = MARKET_COLORS.map((color) => {
	const income = computed(
		() =>
			calculateIncome(color, marketIndex[color](), {
				regular: portfolio[color].regular(),
				risky: portfolio[color].risky(),
			}),
		`[BREAKDOWN] INCOME FOR ${color.toUpperCase()}`
	);
	return { color, income };
});

export const total = computed(() => {
	return breakdown.reduce((sum, item) => sum + item.income(), 0);
}, "[BREAKDOWN] TOTAL");
