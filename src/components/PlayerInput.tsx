import { Minus, Plus, WalletCards, Zap } from "lucide-react";

import { cn } from "@/shared/lib/css";
import { COLOR_CONFIG, type MarketColor } from "@/shared/lib/game-data";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

interface CounterProps {
	label: string;
	value: number;
	onChange: (val: number) => void;
	colorClass: string;
	showQuickAdd?: boolean;
	icon: React.ReactNode;
}

function Counter({
	label,
	value,
	onChange,
	colorClass,
	showQuickAdd,
	icon,
}: CounterProps) {
	return (
		<div className="mb-4 flex flex-col gap-2 last:mb-0">
			<div className="flex items-center gap-2 font-semibold text-sm uppercase tracking-wide opacity-80">
				{icon}
				<span>{label}</span>
			</div>

			<div className="flex items-center gap-2">
				<Button
					className="h-10 w-10 shrink-0"
					disabled={value <= 0}
					onClick={() => onChange(Math.max(0, value - 1))}
					size="icon"
					variant="outline"
				>
					<Minus className="h-4 w-4" />
				</Button>

				<div
					className={cn(
						"flex h-10 flex-1 items-center justify-center rounded border-2 bg-white font-bold text-xl",
						colorClass
					)}
				>
					{value}
				</div>

				<Button
					className="h-10 w-10 shrink-0"
					onClick={() => onChange(value + 1)}
					size="icon"
					variant="outline"
				>
					<Plus className="h-4 w-4" />
				</Button>
			</div>

			{showQuickAdd && (
				<div className="flex justify-end gap-2">
					<Button
						className="h-7 text-xs"
						onClick={() => onChange(value + 1)}
						size="sm"
						variant="secondary"
					>
						+1
					</Button>
					<Button
						className="h-7 text-xs"
						onClick={() => onChange(value + 3)}
						size="sm"
						variant="secondary"
					>
						+3
					</Button>
					<Button
						className="h-7 text-xs"
						onClick={() => onChange(value + 5)}
						size="sm"
						variant="secondary"
					>
						+5
					</Button>
				</div>
			)}
		</div>
	);
}

interface PlayerInputProps {
	color: MarketColor;
	regular: number;
	risky: number;
	onChange: (updates: { regular?: number; risky?: number }) => void;
}

export function PlayerInput({
	color,
	regular,
	risky,
	onChange,
}: PlayerInputProps) {
	const config = COLOR_CONFIG[color];

	return (
		<Card className={cn("border-l-4", config.border)}>
			<CardHeader className="bg-gray-50/50 px-4 py-3">
				<CardTitle
					className={cn("flex items-center gap-2 text-lg", config.text)}
				>
					<div
						className={cn(
							"h-3 w-3 rounded-full",
							config.bg.replace("bg-", "bg-").replace("100", "500")
						)}
					/>
					{config.label}
				</CardTitle>
			</CardHeader>
			<CardContent className="px-4 pt-4 pb-4">
				<Counter
					colorClass={cn(config.border, config.text)}
					icon={<WalletCards className="h-4 w-4" />}
					label="Обычные"
					onChange={(v) => onChange({ regular: v })}
					showQuickAdd={true}
					value={regular}
				/>

				<Counter
					colorClass={cn(config.border, config.text)}
					icon={<Zap className="h-4 w-4" />}
					label="Рисковые (x2)"
					onChange={(v) => onChange({ risky: v })}
					showQuickAdd={false} // Maybe not needed for risky as much, but user didn't explicitly demand it
					value={risky}
				/>
			</CardContent>
		</Card>
	);
}
