// components/analysis/tabs/XAITab.tsx
"use client";

import { Brain, BarChart3, Info, RefreshCw, Zap, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { XAIData, AnalysisMode } from "@/lib/types";

interface XAITabProps {
	xaiData: XAIData;
	analysisMode: AnalysisMode;
	onModeChange: (mode: AnalysisMode) => void;
	onRegenerate: () => void;
	isRegenerating: boolean;
}

export const XAITab = ({
	xaiData,
	analysisMode,
	onModeChange,
	onRegenerate,
	isRegenerating,
}: XAITabProps) => {
	const featureChartData = (xaiData.feature_importance || []).slice(0, 10).map((item) => ({
		name: `${item.asset_name}-${item.feature_name}`,
		importance: item.importance_score,
		asset: item.asset_name,
		feature: item.feature_name,
	}));

	const hasFeatureData = featureChartData.length > 0;

	return (
		<div className="space-y-6">
			{/* XAI 모드 선택 - 모바일 최적화 */}
			<Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl sm:rounded-3xl">
				<CardContent className="p-4 sm:p-6">
					<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
						<div className="flex items-center space-x-2 sm:space-x-3">
							<Brain className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 flex-shrink-0" />
							<div className="min-w-0">
								<h3 className="font-semibold text-sm sm:text-base">AI 설명 모드</h3>
								<p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">분석 방식을 선택하여 설명을 재생성할 수 있습니다</p>
							</div>
						</div>
						<div className="flex items-center space-x-2 sm:space-x-3">
							<Select value={analysisMode} onValueChange={onModeChange}>
								<SelectTrigger className="min-w-[8rem] max-w-[10rem] sm:w-40 rounded-xl sm:rounded-2xl">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="fast">
										<div className="flex items-center space-x-2">
											<Zap className="h-4 w-4" />
											<span>빠른 분석</span>
										</div>
									</SelectItem>
									<SelectItem value="accurate">
										<div className="flex items-center space-x-2">
											<Timer className="h-4 w-4" />
											<span>정밀 분석</span>
										</div>
									</SelectItem>
								</SelectContent>
							</Select>
							<Button onClick={onRegenerate} disabled={isRegenerating} className="rounded-xl sm:rounded-2xl px-3 sm:px-4" size="sm">
								{isRegenerating ? <RefreshCw className="h-3.5 w-3.5 sm:h-4 sm:w-4 sm:mr-2 animate-spin" /> : <RefreshCw className="h-3.5 w-3.5 sm:h-4 sm:w-4 sm:mr-2" />}
								<span className="hidden sm:inline">재생성</span>
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Feature Importance 차트 */}
			<Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 border border-gray-200/50 dark:border-gray-700/50 rounded-3xl">
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<BarChart3 className="h-5 w-5 text-purple-600" />
						<span>특성 중요도 분석</span>
					</CardTitle>
					<CardDescription>AI 모델의 투자 결정에 영향을 준 주요 특성들</CardDescription>
				</CardHeader>
				<CardContent>
					{hasFeatureData ? (
						<div className="h-[300px] sm:h-[400px] lg:h-[500px]">
							<ResponsiveContainer width="100%" height="100%">
								<BarChart
									data={featureChartData.slice(0, 8)}
									margin={{ top: 10, right: 10, left: 10, bottom: 80 }}
									layout="horizontal"
								>
									<CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
									<XAxis type="number" stroke="#888" fontSize={10} tickFormatter={(value) => value.toFixed(2)} />
									<YAxis
										type="category"
										dataKey="name"
										stroke="#888"
										fontSize={9}
										width={80}
										tick={{ fontSize: 8 }}
										tickFormatter={(value) => {
											const parts = value.split('-');
											return parts[0].slice(0, 6);
										}}
									/>
									<Tooltip
										contentStyle={{
											backgroundColor: "rgba(255, 255, 255, 0.95)",
											border: "none",
											borderRadius: "12px",
											boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
											fontSize: "11px",
										}}
										formatter={(value: any) => [`${(value as number).toFixed(4)}`, "중요도"]}
										labelFormatter={(label: any, payload: any) => {
											if (payload && payload[0] && payload[0].payload) {
												const data = payload[0].payload;
												return `${data.asset} - ${data.feature}`;
											}
											return label;
										}}
									/>
									<Bar dataKey="importance" fill="#8B5CF6" radius={[0, 6, 6, 0]} />
								</BarChart>
							</ResponsiveContainer>
						</div>
					) : (
						<div className="h-[400px] flex items-center justify-center">
							<div className="text-center space-y-3">
								<div className="w-16 h-16 mx-auto bg-purple-100 dark:bg-purple-950 rounded-full flex items-center justify-center">
									<BarChart3 className="h-8 w-8 text-purple-600" />
								</div>
								<div>
									<h3 className="font-medium text-muted-foreground">특성 데이터가 없습니다</h3>
									<p className="text-sm text-muted-foreground mt-1">AI 분석이 완료되면 특성 중요도 차트가 표시됩니다</p>
								</div>
							</div>
						</div>
					)}
				</CardContent>
			</Card>

			{/* AI 설명 텍스트 */}
			<Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 border border-gray-200/50 dark:border-gray-700/50 rounded-3xl">
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<Info className="h-5 w-5 text-purple-600" />
						<span>AI 분석 설명</span>
						<Badge variant="secondary" className="ml-2 rounded-2xl">
							{analysisMode === "fast" ? "빠른 모드" : "정밀 모드"}
						</Badge>
					</CardTitle>
					<CardDescription>포트폴리오 구성 근거와 투자 전략 해설</CardDescription>
				</CardHeader>
				<CardContent className="p-4 sm:p-6">
					<div className="p-3 sm:p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 rounded-xl sm:rounded-2xl border border-purple-200 dark:border-purple-800/30">
						<div className="whitespace-normal break-words text-xs sm:text-sm leading-relaxed font-sans text-purple-900 dark:text-purple-100">{xaiData.explanation_text}</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};