import { cn } from "@/shared/lib/css";
import {
	COLOR_CONFIG,
	MARKET_SCALES,
	type MarketColor,
} from "@/shared/lib/game-data";
import { Badge } from "@/shared/ui/badge";

interface MarketTrackProps {
	color: MarketColor;
	currentIndex: number;
	onChange: (index: number) => void;
}

export function MarketTrack({
	color,
	currentIndex,
	onChange,
}: MarketTrackProps) {
	const scale = MARKET_SCALES[color];
	const config = COLOR_CONFIG[color];

	return (
		<div
			className={cn("rounded-lg border-2 p-3 sm:p-4", config.bg, config.border)}
		>
			<div className="mb-4 flex items-center justify-between">
				<h3
					className={cn(
						"font-bold text-lg uppercase tracking-wider sm:text-xl",
						config.text
					)}
				>
					{config.label}
				</h3>
				<Badge
					className={cn(
						"bg-white/80 px-3 py-1 text-lg shadow-sm backdrop-blur",
						config.text,
						config.border
					)}
					variant="outline"
				>
					{scale[currentIndex]}
				</Badge>
			</div>

			{/* Track Visualization */}
			<div className="relative flex items-center justify-between gap-1 sm:gap-2">
				{scale.map((value, idx) => (
					<button
						aria-label={`Set ${config.label} market value to ${value}`}
						aria-pressed={idx === currentIndex}
						className={cn(
							"flex aspect-square flex-1 cursor-pointer items-center justify-center rounded border transition-all duration-200 sm:aspect-auto sm:h-12",
							"font-bold text-xs sm:text-base",
							idx === currentIndex
								? cn(
										"z-10 scale-110 border-2 bg-white shadow-lg ring-2 ring-offset-2 ring-offset-transparent",
										config.text,
										config.border,
										config.border.replace("border-", "ring-")
									)
								: "border-black/5 bg-white/30 text-gray-700 hover:bg-white/50"
						)}
						key={idx}
						onClick={() => onChange(idx)}
						type="button"
					>
						{value}
					</button>
				))}
			</div>

			<div className="mt-2 text-center font-serif text-black text-xs italic opacity-60">
				Нажмите на значение для изменения
			</div>
		</div>
	);
}
