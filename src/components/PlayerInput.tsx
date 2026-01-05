import { reatomComponent } from "@reatom/react";
import { Minus, Plus, WalletCards, XIcon, Zap } from "lucide-react";

import { cn } from "@/shared/lib/css";
import {
	COLOR_CONFIG,
	type MarketColor,
	type PortfolioValueType,
} from "@/shared/lib/game-data";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";

import { portfolio } from "@/model";

const CounterLabel = ({
	className,
	icon,
	label,
	children,
}: {
	icon: React.ReactNode;
	className?: string;
	label: string;
	children: React.ReactNode;
}) => {
	return (
		<div className="flex flex-col gap-1">
			<CardDescription className={cn("flex items-center gap-1", className)}>
				{icon}
				{label && <span>{label}</span>}
			</CardDescription>
			{children}
		</div>
	);
};

const Counter = reatomComponent(
	({
		color,
		colorClass,
		type,
	}: {
		color: MarketColor;
		colorClass: string;
		type: PortfolioValueType;
		showQuickAdd?: boolean;
	}) => {
		const value = portfolio[color][type]();
		const onChange = (value: number) => {
			portfolio[color][type].set(value);
		};

		return (
			<div className="flex items-center gap-1">
				<Button onClick={() => onChange(0)} size="icon-sm" variant="ghost">
					<XIcon />
				</Button>
				<Button
					disabled={value <= 0}
					onClick={() => onChange(Math.max(0, value - 1))}
					size="icon-sm"
				>
					<Minus />
				</Button>

				<Input
					className={cn("h-8 text-center", colorClass)}
					min={0}
					onChange={(e) => onChange(Number(e.target.value))}
					type="number"
					value={value}
				/>

				<Button onClick={() => onChange(value + 1)} size="icon-sm">
					<Plus />
				</Button>
				<Button
					onClick={() => onChange(value + 3)}
					size="sm"
					variant="secondary"
				>
					+3
				</Button>
				<Button
					onClick={() => onChange(value + 5)}
					size="sm"
					variant="secondary"
				>
					+5
				</Button>
			</div>
		);
	}
);

interface PlayerInputProps {
	color: MarketColor;
}

export const PlayerInput = ({ color }: PlayerInputProps) => {
	const config = COLOR_CONFIG[color];

	return (
		<Card className={cn("border-l-4", config.border)}>
			<CardContent className="flex flex-col gap-2">
				<CounterLabel
					className={config.text}
					icon={<WalletCards className="size-4" />}
					label="Обычные"
				>
					<Counter
						color={color}
						colorClass={cn(config.border, config.text)}
						showQuickAdd
						type="regular"
					/>
				</CounterLabel>
				<CounterLabel
					className={config.text}
					icon={<Zap className="size-4" />}
					label="Рисковые (x2)"
				>
					<Counter
						color={color}
						colorClass={cn(config.border, config.text)}
						showQuickAdd={false}
						type="risky"
					/>
				</CounterLabel>
			</CardContent>
		</Card>
	);
};
