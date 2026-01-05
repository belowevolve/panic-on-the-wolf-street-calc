import { reatomComponent } from "@reatom/react";
import { createFileRoute } from "@tanstack/react-router";
import { ChartCandlestickIcon, WalletCardsIcon } from "lucide-react";

import { cn } from "@/shared/lib/css";
import { MARKET_COLORS } from "@/shared/lib/game-data";
import { Button } from "@/shared/ui/button";

import { MarketTrack } from "@/components/MarketTrack";
import { PlayerInput } from "@/components/PlayerInput";
import { ScoreBoard } from "@/components/ScoreBoard";
import { resetPortfolio, screen } from "@/model";

export const Route = createFileRoute("/")({
	component: Index,
});

function Index() {
	return (
		<div className="min-h-dvh font-serif">
			<Header />
			<main className="mx-auto max-w-2xl p-2">
				<Scene />
			</main>
		</div>
	);
}

const Scene = reatomComponent(() => {
	switch (screen()) {
		case "market":
			return <Market />;
		case "portfolio":
			return <Portfolio />;
		case "score":
			return <Score />;
		default:
			return null;
	}
});

const Market = () => {
	return (
		<section className="space-y-2">
			{MARKET_COLORS.map((color) => (
				<MarketTrack color={color} key={color} />
			))}
			<BottomAction>
				<Button className="w-full" onClick={() => screen.set("portfolio")}>
					Портфель
				</Button>
			</BottomAction>
		</section>
	);
};

const Portfolio = () => {
	return (
		<section className="space-y-2">
			{MARKET_COLORS.map((color) => (
				<PlayerInput color={color} key={color} />
			))}
			<BottomAction>
				<Button className="w-full" onClick={() => screen.set("score")}>
					Результат
				</Button>
			</BottomAction>
		</section>
	);
};

const Score = () => {
	return (
		<section className="space-y-2">
			<ScoreBoard />
			<BottomAction className="flex gap-2">
				<Button
					className="grow"
					onClick={() => {
						resetPortfolio();
						screen.set("portfolio");
					}}
				>
					Назад
				</Button>
				<Button onClick={() => screen.set("market")} size="icon">
					<ChartCandlestickIcon />
				</Button>
			</BottomAction>
		</section>
	);
};

const Header = reatomComponent(() => {
	const currentScreen = screen();
	const startGame = () => {
		if (currentScreen === "market") {
			screen.set("portfolio");
		} else {
			screen.set("market");
		}
	};
	return (
		<header className="sticky top-0 z-50 bg-[#2c2c2c] p-4 text-[#f2e8d5] shadow-md">
			<div className="mx-auto flex max-w-2xl items-center justify-between">
				<h1 className="font-bold text-xl uppercase tracking-widest">
					{currentScreen === "portfolio" ? "Портфель" : "Вулф-Стрит"}
				</h1>
				<Button onClick={startGame} size="icon">
					{currentScreen === "market" ? (
						<WalletCardsIcon className="size-4" />
					) : (
						<ChartCandlestickIcon className="size-4" />
					)}
				</Button>
			</div>
		</header>
	);
});

const BottomAction = ({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) => {
	return (
		<div
			className={cn(
				"fixed inset-x-0 bottom-0 mx-auto max-w-2xl p-2",
				className
			)}
		>
			{children}
		</div>
	);
};
