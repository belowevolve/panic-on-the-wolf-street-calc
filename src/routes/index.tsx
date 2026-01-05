import { createFileRoute } from "@tanstack/react-router";
import { RotateCcw } from "lucide-react";
import { useState } from "react";

import {
	MARKET_COLORS,
	type MarketColor,
	STARTING_INDEX,
} from "@/shared/lib/game-data";
import { Button } from "@/shared/ui/button";

import { MarketTrack } from "@/components/MarketTrack";
import { PlayerInput } from "@/components/PlayerInput";
import { ScoreBoard } from "@/components/ScoreBoard";

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	// State
	const [marketIndices, setMarketIndices] = useState<
		Record<MarketColor, number>
	>({
		red: STARTING_INDEX,
		yellow: STARTING_INDEX,
		green: STARTING_INDEX,
		blue: STARTING_INDEX,
	});

	const [portfolio, setPortfolio] = useState<
		Record<MarketColor, { regular: number; risky: number }>
	>({
		red: { regular: 0, risky: 0 },
		yellow: { regular: 0, risky: 0 },
		green: { regular: 0, risky: 0 },
		blue: { regular: 0, risky: 0 },
	});

	const handleReset = () => {
		if (
			confirm(
				"Начать новый раунд? Это сбросит количество карт, но оставит рынок (или сбросить всё?)"
			)
		) {
			// Typically market persists or changes incrementally.
			// But players might want to clear cards.
			// Let's clear cards only for now, as market state usually flows.
			// Or full reset. Let's do full reset for simplicity or ask.
			// The prompt says "End of round...".
			// Usually in this game, market fluctuates.
			// Let's just reset portfolio.
			setPortfolio({
				red: { regular: 0, risky: 0 },
				yellow: { regular: 0, risky: 0 },
				green: { regular: 0, risky: 0 },
				blue: { regular: 0, risky: 0 },
			});
		}
	};

	const handleFullReset = () => {
		if (confirm("Сбросить игру полностью?")) {
			setMarketIndices({
				red: STARTING_INDEX,
				yellow: STARTING_INDEX,
				green: STARTING_INDEX,
				blue: STARTING_INDEX,
			});
			setPortfolio({
				red: { regular: 0, risky: 0 },
				yellow: { regular: 0, risky: 0 },
				green: { regular: 0, risky: 0 },
				blue: { regular: 0, risky: 0 },
			});
		}
	};

	return (
		<div className="min-h-screen bg-[#f2e8d5] pb-20 font-serif text-[#2c2c2c]">
			{/* Header */}
			<header className="sticky top-0 z-50 bg-[#2c2c2c] p-4 text-[#f2e8d5] shadow-md">
				<div className="mx-auto flex max-w-2xl items-center justify-between">
					<h1 className="font-bold text-xl uppercase tracking-widest">
						Вулф-Стрит
					</h1>
					<Button
						className="text-[#f2e8d5] hover:bg-white/10"
						onClick={handleReset}
						size="icon"
						title="Сбросить карты"
						variant="ghost"
					>
						<RotateCcw className="h-5 w-5" />
					</Button>
				</div>
			</header>

			<main className="mx-auto max-w-2xl space-y-8 p-4">
				{/* Score Board - Sticky or Top */}
				<section>
					<ScoreBoard marketIndices={marketIndices} portfolio={portfolio} />
				</section>

				{/* Market Tracks */}
				<section className="space-y-4">
					<div className="flex items-center justify-between">
						<h2 className="border-black border-b-2 pb-1 font-bold text-2xl uppercase">
							Рынок
						</h2>
						<Button
							className="h-7 text-xs"
							onClick={handleFullReset}
							size="sm"
							variant="outline"
						>
							Сброс рынка
						</Button>
					</div>

					<div className="grid gap-4">
						{MARKET_COLORS.map((color) => (
							<MarketTrack
								color={color}
								currentIndex={marketIndices[color]}
								key={color}
								onChange={(idx) =>
									setMarketIndices((prev) => ({ ...prev, [color]: idx }))
								}
							/>
						))}
					</div>
				</section>

				{/* Portfolio Input */}
				<section className="space-y-4">
					<h2 className="border-black border-b-2 pb-1 font-bold text-2xl uppercase">
						Портфель
					</h2>
					<div className="grid gap-4 sm:grid-cols-2">
						{MARKET_COLORS.map((color) => (
							<PlayerInput
								color={color}
								key={color}
								onChange={(updates) =>
									setPortfolio((prev) => ({
										...prev,
										[color]: { ...prev[color], ...updates },
									}))
								}
								regular={portfolio[color].regular}
								risky={portfolio[color].risky}
							/>
						))}
					</div>
				</section>
			</main>

			<footer className="p-8 text-center text-sm opacity-50">
				Panic on Wall Street Calculator
			</footer>
		</div>
	);
}
