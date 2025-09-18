// components/analysis/tabs/RiskAnalysisTab.tsx
"use client";

import { Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts";
import { RiskReturnData } from "@/lib/types";
import { formatPercent } from "@/lib/formatters";
import { CHART_COLORS } from "@/lib/constants";

interface RiskAnalysisTabProps {
	riskReturnData: RiskReturnData[];
}

export const RiskAnalysisTab = ({ riskReturnData }: RiskAnalysisTabProps) => {
	const chartData = riskReturnData.map((item) => ({
		...item,
		size: item.allocation * 10, // 원의 크기를 비중에 비례
	}));

	return (
		<div className="space-y-6">
			<Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 border border-gray-200/50 dark:border-gray-700/50 rounded-3xl">
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<Shield className="h-5 w-5 text-red-600" />
						<span>위험-수익률 분석</span>
					</CardTitle>
					<CardDescription>각 종목의 위험 대비 수익률 포지션 (원의 크기는 포트폴리오 비중)</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="h-96">
						<ResponsiveContainer width="100%" height="100%">
							<ScatterChart>
								<CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
								<XAxis type="number" dataKey="risk" name="위험도" stroke="#888" fontSize={12} tickFormatter={(value) => `${value}%`} />
								<YAxis type="number" dataKey="return_rate" name="수익률" stroke="#888" fontSize={12} tickFormatter={(value) => `${value}%`} />
								<Tooltip
									contentStyle={{
										backgroundColor: "rgba(255, 255, 255, 0.95)",
										border: "none",
										borderRadius: "12px",
										boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
									}}
									formatter={(value, name) => {
										if (name === "risk") return [`${value}%`, "위험도"];
										if (name === "return_rate") return [`${value}%`, "수익률"];
										return [value, name];
									}}
								/>
								<Scatter name="종목" data={chartData}>
									{chartData.map((entry, index) => (
										<Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
									))}
								</Scatter>
							</ScatterChart>
						</ResponsiveContainer>
					</div>
				</CardContent>
			</Card>

			{/* 위험도별 종목 리스트 */}
			<Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 border border-gray-200/50 dark:border-gray-700/50 rounded-3xl">
				<CardHeader>
					<CardTitle>종목별 위험-수익 지표</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="space-y-3">
						{riskReturnData
							.sort((a, b) => b.return_rate - a.return_rate)
							.map((item, index) => (
								<div key={item.symbol} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
									<div className="flex items-center space-x-3">
										<div className="w-8 h-8 rounded-2xl flex items-center justify-center text-white font-bold text-sm" style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}>
											{item.symbol.charAt(0)}
										</div>
										<div>
											<div className="font-semibold">{item.symbol}</div>
											<div className="text-sm text-muted-foreground">비중: {item.allocation.toFixed(1)}%</div>
										</div>
									</div>
									<div className="text-right space-y-1">
										<div className="text-sm">
											<span className="text-green-600 font-semibold">수익률: {formatPercent(item.return_rate)}</span>
										</div>
										<div className="text-sm">
											<span className="text-red-600 font-semibold">위험도: {item.risk.toFixed(1)}%</span>
										</div>
									</div>
								</div>
							))}
					</div>
				</CardContent>
			</Card>
		</div>
	);
};