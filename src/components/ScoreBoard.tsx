import { TrendingDown, TrendingUp } from "lucide-react";

import { cn } from "@/shared/lib/css";
import {
	COLOR_CONFIG,
	calculateIncome,
	MARKET_COLORS,
	type MarketColor,
} from "@/shared/lib/game-data";
import { Card, CardContent } from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";

interface ScoreBoardProps {
	marketIndices: Record<MarketColor, number>;
	portfolio: Record<MarketColor, { regular: number; risky: number }>;
}

export function ScoreBoard({ marketIndices, portfolio }: ScoreBoardProps) {
	const breakdown = MARKET_COLORS.map((color) => {
		const income = calculateIncome(
			color,
			marketIndices[color],
			portfolio[color].regular,
			portfolio[color].risky
		);
		return { color, income };
	});

	const total = breakdown.reduce((sum, item) => sum + item.income, 0);

	return (
		<Card className="overflow-hidden border-4 border-gray-400 border-double bg-[#fdfbf7] shadow-xl">
			<div className="border-gray-400 border-b-4 border-double bg-gray-900 px-6 py-4 text-center text-[#fdfbf7]">
				<h2 className="font-bold font-serif text-3xl uppercase tracking-widest">
					Итоги Раунда
				</h2>
				<div className="mt-1 font-mono text-xs opacity-70">
					THE WOLF STREET JOURNAL
				</div>
			</div>

			<CardContent className="p-6">
				<div className="flex flex-col gap-4">
					{breakdown.map(({ color, income }) => {
						const config = COLOR_CONFIG[color];
						const isNegative = income < 0;

						return (
							<div
								className="flex items-center justify-between border-gray-200 border-b pb-2 text-lg last:border-0"
								key={color}
							>
								<div className="flex items-center gap-3">
									<div
										className={cn(
											"size-4 rounded-sm border",
											config.bg.replace("100", "500")
										)}
									/>
									<span className={cn("font-bold font-serif", config.text)}>
										{config.label}
									</span>
								</div>
								<div
									className={cn(
										"flex items-center gap-2 font-bold font-mono",
										isNegative ? "text-red-600" : "text-green-700"
									)}
								>
									{income > 0 ? "+" : ""}
									{income}
								</div>
							</div>
						);
					})}
				</div>

				<Separator className="my-6 bg-gray-400" />

				<div className="text-center">
					<div className="mb-2 font-serif text-gray-500 text-sm uppercase tracking-widest">
						Общая Прибыль
					</div>
					<div
						className={cn(
							"flex items-center justify-center gap-4 font-black font-mono text-5xl tracking-tighter",
							total < 0 ? "text-red-600" : "text-gray-900"
						)}
					>
						{total < 0 ? (
							<TrendingDown className="size-10" />
						) : (
							<TrendingUp className="size-10" />
						)}
						{total > 0 ? "+" : ""}
						{total}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
