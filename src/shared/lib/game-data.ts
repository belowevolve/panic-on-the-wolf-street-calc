export type MarketColor = "red" | "yellow" | "green" | "blue";

export const MARKET_COLORS: MarketColor[] = ["red", "yellow", "green", "blue"];

export const MARKET_SCALES: Record<MarketColor, number[]> = {
	red: [-20, -10, 0, 30, 40, 50, 70, 80],
	yellow: [-10, 0, 10, 30, 40, 50, 60, 70],
	green: [0, 10, 20, 30, 40, 40, 50, 60],
	blue: [10, 20, 20, 30, 30, 40, 40, 50],
};

export const STARTING_INDEX = 3;

export const COLOR_CONFIG: Record<
	MarketColor,
	{ label: string; bg: string; text: string; border: string }
> = {
	red: {
		label: "Красный",
		bg: "bg-red-100",
		text: "text-red-900",
		border: "border-red-500",
	},
	yellow: {
		label: "Желтый",
		bg: "bg-yellow-100",
		text: "text-yellow-900",
		border: "border-yellow-500",
	},
	green: {
		label: "Зеленый",
		bg: "bg-green-100",
		text: "text-green-900",
		border: "border-green-500",
	},
	blue: {
		label: "Синий",
		bg: "bg-blue-100",
		text: "text-blue-900",
		border: "border-blue-500",
	},
};

export interface PortfolioValue {
	regular: number;
	risky: number;
}

export type PortfolioValueType = keyof PortfolioValue;
export type Portfolio = Record<MarketColor, PortfolioValue>;

/**
 * Calculates income for a specific color.
 * Income = (Price * N_regular) + (Price * 2 * N_risky)
 * If Price < 0, the result is negative (loss).
 */
export function calculateIncome(
	color: MarketColor,
	marketIndex: number,
	portfolioValue: PortfolioValue
): number {
	const scale = MARKET_SCALES[color];

	// Ensure index is within bounds, clamp if necessary or assume caller handles it.
	// The requirement says "Marker cannot go left of min or right of max".
	// We'll assume valid index is passed, but safe access is good.
	const safeIndex = Math.max(0, Math.min(marketIndex, scale.length - 1));
	const price = scale[safeIndex];

	return price * portfolioValue.regular + price * 2 * portfolioValue.risky;
}
