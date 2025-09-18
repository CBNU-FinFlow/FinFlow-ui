// components/analysis/cards/ErrorCard.tsx
"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ErrorCardProps {
	title: string;
	error: string;
	onRetry: () => void;
}

export const ErrorCard = ({ title, error, onRetry }: ErrorCardProps) => (
	<Card className="backdrop-blur-sm bg-red-50/90 dark:bg-red-950/90 border border-red-200/50 dark:border-red-800/50 rounded-3xl">
		<CardContent className="p-6">
			<div className="flex items-start justify-between">
				<div className="flex items-start space-x-3">
					<AlertTriangle className="h-5 w-5 text-red-600 mt-1" />
					<div>
						<h3 className="font-semibold text-red-900 dark:text-red-100">{title}</h3>
						<p className="text-sm text-red-800 dark:text-red-200 mt-1">{error}</p>
					</div>
				</div>
				<Button variant="outline" size="sm" onClick={onRetry} className="rounded-2xl">
					<RefreshCw className="h-4 w-4 mr-1" />
					재시도
				</Button>
			</div>
		</CardContent>
	</Card>
);