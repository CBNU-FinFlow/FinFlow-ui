// components/analysis/cards/LoadingCard.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";

interface LoadingCardProps {
	title: string;
	description: string;
}

export const LoadingCard = ({ title, description }: LoadingCardProps) => (
	<Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 border border-gray-200/50 dark:border-gray-700/50 rounded-3xl">
		<CardContent className="p-6">
			<div className="flex items-center space-x-3">
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
				<div>
					<h3 className="font-semibold">{title}</h3>
					<p className="text-sm text-muted-foreground">{description}</p>
				</div>
			</div>
		</CardContent>
	</Card>
);