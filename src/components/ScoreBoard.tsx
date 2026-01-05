import NumberFlow, { continuous } from "@number-flow/react";
import type { Computed } from "@reatom/core";
import { reatomComponent } from "@reatom/react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/shared/lib/css";
import { COLOR_CONFIG } from "@/shared/lib/game-data";
import { Card, CardContent } from "@/shared/ui/card";
import { Separator } from "@/shared/ui/separator";

import { breakdown, total } from "@/model";

export const ScoreBoard = () => {
	return (
		<Card className="overflow-hidden border-4 border-gray-400 border-double bg-[#fdfbf7] pt-0 shadow-xl">
			<div className="border-gray-400 border-b bg-gray-900 px-6 py-4 text-center text-[#fdfbf7]">
				<h2 className="font-bold font-serif text-3xl uppercase tracking-widest">
					Итоги Раунда
				</h2>
				<div className="mt-1 font-mono text-xs opacity-70">
					THE WOLF STREET JOURNAL
				</div>
			</div>

			<CardContent className="space-y-4">
				<Breakdown />
				<Separator className="" />
				<Total />
			</CardContent>
		</Card>
	);
};

const Breakdown = () => {
	return (
		<div className="flex flex-col gap-4">
			{breakdown.map(({ color, income }) => {
				const config = COLOR_CONFIG[color];
				return (
					<div
						className="flex items-center justify-between border-gray-200 border-b pb-2 text-lg last:border-0"
						key={color}
					>
						<div className="flex items-center gap-3">
							<div
								className={cn(
									"size-4 rounded-sm border",
									config.bg,
									config.border
								)}
							/>
							<span className={cn("font-bold font-serif", config.text)}>
								{config.label}
							</span>
						</div>
						<BreakDownItem income={income} />
					</div>
				);
			})}
		</div>
	);
};

const BreakDownItem = reatomComponent(
	({ income }: { income: Computed<number> }) => {
		const value = income();
		const isNegative = value < 0;
		return (
			<div
				className={cn(
					"fade-in slide-in-from-right flex animate-in items-center gap-2 font-bold font-mono",
					isNegative ? "text-red-600" : "text-green-700"
				)}
				key={value}
			>
				{isNegative ? "" : "+"}
				{value}
			</div>
		);
	}
);

const Total = () => {
	return (
		<div className="text-center">
			<div className="mb-2 font-serif text-gray-500 text-sm uppercase tracking-widest">
				Общая Прибыль
			</div>
			<TotalValue />
		</div>
	);
};

const TotalValue = reatomComponent(() => {
	const totalValue = total();
	const [value, setValue] = useState(0);
	useEffect(() => {
		setValue(totalValue);
	}, [totalValue]);
	const isNegative = totalValue < 0;
	return (
		<div
			className={cn(
				"flex items-center justify-center gap-2 font-black font-mono text-4xl tracking-tighter",
				isNegative ? "text-red-600" : "text-gray-900"
			)}
		>
			{isNegative ? (
				<TrendingDown className="size-10" />
			) : (
				<TrendingUp className="size-10" />
			)}

			<NumberFlow
				format={{
					style: "currency",
					currency: "USD",
					maximumFractionDigits: 0,
				}}
				plugins={[continuous]}
				value={value}
			/>
		</div>
	);
});
