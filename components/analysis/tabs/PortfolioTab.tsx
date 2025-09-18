// components/analysis/tabs/PortfolioTab.tsx
"use client";

import { TrendingUp, Target, AlertTriangle, BarChart3, PieChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { PortfolioAllocation, PerformanceMetrics, QuickMetrics } from "@/lib/types";
import { formatCurrency } from "@/lib/formatters";
import { CHART_COLORS } from "@/lib/constants";

interface PortfolioTabProps {
	allocation: PortfolioAllocation[];
	metrics: PerformanceMetrics[];
	quickMetrics: QuickMetrics;
}

export const PortfolioTab = ({ allocation, metrics, quickMetrics }: PortfolioTabProps) => (
	<div className="space-y-4 sm:space-y-6">
		{/* 퀵 메트릭 카드들 - 모바일 최적화 */}
		<div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
			<Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 border border-gray-200/50 dark:border-gray-700/50 rounded-xl sm:rounded-2xl lg:rounded-3xl">
				<CardContent className="p-2.5 sm:p-3 lg:p-4">
					<div className="flex flex-col space-y-1">
						<div className="flex items-center space-x-1.5">
							<div className="w-6 h-6 sm:w-7 sm:h-7 bg-green-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
								<TrendingUp className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white" />
							</div>
							<p className="text-[10px] sm:text-xs text-muted-foreground leading-tight">연간수익률</p>
						</div>
						<p className="text-sm sm:text-base lg:text-lg font-bold text-green-600 pl-7 sm:pl-8">{quickMetrics.annualReturn}</p>
					</div>
				</CardContent>
			</Card>

			<Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 border border-gray-200/50 dark:border-gray-700/50 rounded-xl sm:rounded-2xl lg:rounded-3xl">
				<CardContent className="p-2.5 sm:p-3 lg:p-4">
					<div className="flex flex-col space-y-1">
						<div className="flex items-center space-x-1.5">
							<div className="w-6 h-6 sm:w-7 sm:h-7 bg-blue-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
								<Target className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white" />
							</div>
							<p className="text-[10px] sm:text-xs text-muted-foreground leading-tight">샤프비율</p>
						</div>
						<p className="text-sm sm:text-base lg:text-lg font-bold text-blue-600 pl-7 sm:pl-8">{quickMetrics.sharpeRatio}</p>
					</div>
				</CardContent>
			</Card>

			<Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 border border-gray-200/50 dark:border-gray-700/50 rounded-xl sm:rounded-2xl lg:rounded-3xl">
				<CardContent className="p-2.5 sm:p-3 lg:p-4">
					<div className="flex flex-col space-y-1">
						<div className="flex items-center space-x-1.5">
							<div className="w-6 h-6 sm:w-7 sm:h-7 bg-red-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
								<AlertTriangle className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white" />
							</div>
							<p className="text-[10px] sm:text-xs text-muted-foreground leading-tight">최대낙폭</p>
						</div>
						<p className="text-sm sm:text-base lg:text-lg font-bold text-red-600 pl-7 sm:pl-8">{quickMetrics.maxDrawdown}</p>
					</div>
				</CardContent>
			</Card>

			<Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 border border-gray-200/50 dark:border-gray-700/50 rounded-xl sm:rounded-2xl lg:rounded-3xl">
				<CardContent className="p-2.5 sm:p-3 lg:p-4">
					<div className="flex flex-col space-y-1">
						<div className="flex items-center space-x-1.5">
							<div className="w-6 h-6 sm:w-7 sm:h-7 bg-purple-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
								<BarChart3 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-white" />
							</div>
							<p className="text-[10px] sm:text-xs text-muted-foreground leading-tight">변동성</p>
						</div>
						<p className="text-sm sm:text-base lg:text-lg font-bold text-orange-600 pl-7 sm:pl-8">{quickMetrics.volatility}</p>
					</div>
				</CardContent>
			</Card>
		</div>

		{/* 포트폴리오 구성 */}
		<Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl sm:rounded-3xl">
			<CardHeader className="p-4 sm:p-6">
				<CardTitle className="flex items-center space-x-2 text-base sm:text-xl">
					<PieChart className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
					<span>포트폴리오 구성</span>
				</CardTitle>
				<CardDescription className="text-xs sm:text-sm">AI가 제안한 최적의 자산 배분</CardDescription>
			</CardHeader>
			<CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
					{/* 자산 리스트 */}
					<div className="space-y-2 sm:space-y-3">
						{allocation.map((asset, index) => (
							<div key={asset.stock} className="flex items-center justify-between p-2.5 sm:p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl sm:rounded-2xl">
								<div className="flex items-center space-x-2 sm:space-x-3">
									<div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl sm:rounded-2xl flex items-center justify-center text-white font-bold text-xs sm:text-sm`} style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}>
										{asset.stock === "현금" ? "$" : asset.stock.charAt(0)}
									</div>
									<div>
										<div className="font-semibold text-sm sm:text-base">{asset.stock}</div>
										<div className="text-[10px] sm:text-xs text-muted-foreground">{formatCurrency(asset.amount)}</div>
									</div>
								</div>
								<div className="text-right">
									<div className="font-bold text-sm sm:text-base">{asset.percentage.toFixed(1)}%</div>
									<Progress value={asset.percentage} className="w-12 sm:w-16 h-1.5 sm:h-2 mt-1" />
								</div>
							</div>
						))}
					</div>

					{/* 파이 차트 */}
					<div className="flex items-center justify-center pt-4">
						<div className="w-full h-[250px] sm:h-[320px]">
							<ResponsiveContainer width="100%" height="100%">
								<RechartsPieChart margin={{ top: 20, right: 0, bottom: 20, left: 0 }}>
									<Pie
										data={allocation.map((item) => ({
											name: item.stock,
											value: item.percentage,
											amount: item.amount,
										}))}
										cx="50%"
										cy="50%"
										innerRadius={50}
										outerRadius={90}
									paddingAngle={1}
									dataKey="value"
									label={({ name, value }) => value > 5 ? `${value.toFixed(1)}%` : ''}
									labelLine={false}
								>
									{allocation.map((_, index) => (
										<Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
									))}
								</Pie>
								<Tooltip
									formatter={(value, name, entry) => [`${(value as number).toFixed(1)}%`, name, `${formatCurrency(entry.payload?.amount || 0)}`]}
									contentStyle={{
										backgroundColor: "rgba(255, 255, 255, 0.95)",
										border: "none",
										borderRadius: "12px",
										boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
									}}
								/>
								<Legend
									verticalAlign="bottom"
									height={50}
									wrapperStyle={{ paddingTop: "10px", fontSize: "12px" }}
									formatter={(value, entry) => {
										const percentage = (entry.payload?.value || 0).toFixed(1);
										return `${value} ${percentage}%`;
									}}
									iconType="circle"
									iconSize={10}
									layout="horizontal"
									align="center"
								/>
								</RechartsPieChart>
							</ResponsiveContainer>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>

		{/* 성과 지표 테이블 - 모바일에서는 카드 형태로 변환 */}
		<Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl sm:rounded-3xl">
			<CardHeader className="p-4 sm:p-6">
				<CardTitle className="flex items-center space-x-2 text-base sm:text-xl">
					<BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
					<span>상세 성과 지표</span>
				</CardTitle>
				<CardDescription className="text-xs sm:text-sm">포트폴리오와 벤치마크 비교</CardDescription>
			</CardHeader>
			<CardContent className="p-4 sm:p-6 pt-0 sm:pt-0">
				{/* 데스크톱 테이블 뷰 */}
				<div className="hidden sm:block overflow-x-auto">
					<table className="w-full text-sm">
						<thead>
							<tr className="border-b border-gray-200 dark:border-gray-700">
								<th className="text-left py-3 font-medium">지표</th>
								<th className="text-center py-3 font-medium">포트폴리오</th>
								<th className="text-center py-3 font-medium">S&P 500</th>
								<th className="text-center py-3 font-medium">NASDAQ</th>
							</tr>
						</thead>
						<tbody>
							{metrics.map((metric, index) => (
								<tr key={index} className="border-b border-gray-100 dark:border-gray-800 last:border-b-0">
									<td className="py-3 font-medium">{metric.label}</td>
									<td className="text-center py-3 font-semibold text-blue-600">{metric.portfolio}</td>
									<td className="text-center py-3 text-muted-foreground">{metric.spy}</td>
									<td className="text-center py-3 text-muted-foreground">{metric.qqq}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				{/* 모바일 카드 뷰 */}
				<div className="sm:hidden space-y-3">
					{metrics.map((metric, index) => (
						<div key={index} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3">
							<div className="font-medium text-sm mb-2">{metric.label}</div>
							<div className="grid grid-cols-3 gap-2 text-xs">
								<div>
									<div className="text-muted-foreground mb-1">포트폴리오</div>
									<div className="font-semibold text-blue-600">{metric.portfolio}</div>
								</div>
								<div>
									<div className="text-muted-foreground mb-1">S&P 500</div>
									<div>{metric.spy}</div>
								</div>
								<div>
									<div className="text-muted-foreground mb-1">NASDAQ</div>
									<div>{metric.qqq}</div>
								</div>
							</div>
					</div>
				))}
				</div>
			</CardContent>
		</Card>
	</div>
);