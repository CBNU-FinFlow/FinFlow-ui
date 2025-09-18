// components/analysis/tabs/PerformanceTab.tsx
"use client";

import { Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { PerformanceHistory } from "@/lib/types";
import { formatDate } from "@/lib/formatters";

interface PerformanceTabProps {
	history: PerformanceHistory[];
}

export const PerformanceTab = ({ history }: PerformanceTabProps) => {
	const chartData = history.map((item) => ({
		date: formatDate(item.date),
		포트폴리오: item.portfolio * 100,
		"S&P 500": item.spy * 100,
		NASDAQ: item.qqq * 100,
	}));

	// Y축 범위 계산
	const allValues = chartData.flatMap((item) => [item.포트폴리오, item["S&P 500"], item.NASDAQ]);
	const minValue = Math.min(...allValues);
	const maxValue = Math.max(...allValues);
	const padding = (maxValue - minValue) * 0.1; // 10% 패딩
	const yAxisMin = minValue - padding;
	const yAxisMax = maxValue + padding;

	return (
		<div className="space-y-6">
			<Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 border border-gray-200/50 dark:border-gray-700/50 rounded-3xl">
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<Activity className="h-5 w-5 text-blue-600" />
						<span>성과 비교 차트</span>
					</CardTitle>
					<CardDescription>포트폴리오 vs 벤치마크 성과 비교 (최근 1년)</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="h-[280px] sm:h-[400px] lg:h-[500px]">
						<ResponsiveContainer width="100%" height="100%">
							<LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 40 }}>
								<CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
								<XAxis
									dataKey="date"
									stroke="#888"
									fontSize={10}
									angle={-45}
									textAnchor="end"
									height={40}
									interval={Math.floor(chartData.length / 4)}
									tickFormatter={(value) => {
										const parts = value.split(".");
										return `${parts[1]}.${parts[2]}`;
									}}
								/>
								<YAxis stroke="#888" fontSize={10} width={45} domain={[yAxisMin, yAxisMax]} tickFormatter={(value) => `${value.toFixed(0)}%`} />
								<Tooltip
									contentStyle={{
										backgroundColor: "rgba(255, 255, 255, 0.95)",
										border: "none",
										borderRadius: "12px",
										boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
										fontSize: "12px",
									}}
									formatter={(value, name) => [`${(value as number).toFixed(2)}%`, name]}
								/>
								<Legend
									wrapperStyle={{ paddingTop: "10px", fontSize: "12px" }}
									iconSize={12}
								/>
								<Line type="monotone" dataKey="포트폴리오" stroke="#3B82F6" strokeWidth={2} dot={false} />
								<Line type="monotone" dataKey="S&P 500" stroke="#10B981" strokeWidth={1.5} dot={false} strokeDasharray="5 5" />
								<Line type="monotone" dataKey="NASDAQ" stroke="#8B5CF6" strokeWidth={1.5} dot={false} strokeDasharray="5 5" />
							</LineChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};