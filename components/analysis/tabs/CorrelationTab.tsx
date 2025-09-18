// components/analysis/tabs/CorrelationTab.tsx
"use client";

import React from "react";
import { Activity, BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CorrelationData } from "@/lib/types";

interface CorrelationTabProps {
	correlationData: CorrelationData[];
}

export const CorrelationTab = ({ correlationData }: CorrelationTabProps) => {
	// 상관관계 매트릭스 데이터 구성
	const stocks = Array.from(new Set([...correlationData.map((d) => d.stock1), ...correlationData.map((d) => d.stock2)]));

	// 히트맵용 매트릭스 데이터 생성
	const matrixData = stocks.map((stock1) => {
		const row: any = { name: stock1 };
		stocks.forEach((stock2) => {
			if (stock1 === stock2) {
				row[stock2] = 1.0; // 자기 자신과의 상관계수는 1
			} else {
				const correlation = correlationData.find((d) => (d.stock1 === stock1 && d.stock2 === stock2) || (d.stock1 === stock2 && d.stock2 === stock1));
				row[stock2] = correlation ? correlation.correlation : 0;
			}
		});
		return row;
	});

	return (
		<div className="space-y-6">
			{/* 상관관계 히트맵 */}
			<Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 border border-gray-200/50 dark:border-gray-700/50 rounded-3xl">
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<Activity className="h-5 w-5 text-blue-600" />
						<span>상관관계 히트맵</span>
					</CardTitle>
					<CardDescription>종목 간 상관관계를 시각적으로 표현한 히트맵</CardDescription>
				</CardHeader>
				<CardContent>
					{stocks.length > 0 ? (
						<div className="flex justify-center">
							<div className="overflow-x-auto">
								{/* 커스텀 히트맵 */}
								<div className="mx-auto inline-block">
									<div className="grid gap-1" style={{ gridTemplateColumns: `60px repeat(${stocks.length}, 60px)` }}>
										{/* 헤더 행 */}
										<div></div>
										{stocks.map((stock) => (
											<div key={stock} className="text-center text-xs font-medium p-2 transform -rotate-45 h-16 flex items-end justify-center">
												{stock}
											</div>
										))}

										{/* 데이터 행들 */}
										{stocks.map((stock1, i) => (
											<React.Fragment key={`row-${i}`}>
												<div className="text-xs font-medium p-2 flex items-center">{stock1}</div>
												{stocks.map((stock2, j) => {
													const correlation = matrixData[i][stock2] || 0;
													const absCorr = Math.abs(correlation);
													const intensity = absCorr;
													const bgColor =
														correlation >= 0.7
															? `rgba(239, 68, 68, ${intensity})`
															: correlation >= 0.4
															? `rgba(245, 158, 11, ${intensity})`
															: correlation >= 0.1
															? `rgba(16, 185, 129, ${intensity})`
															: `rgba(107, 114, 128, ${intensity})`;

													return (
														<div
															key={`${i}-${j}`}
															className="w-14 h-14 flex items-center justify-center text-xs font-mono border border-gray-200 dark:border-gray-700 rounded cursor-pointer hover:scale-105 transition-transform"
															style={{ backgroundColor: bgColor }}
															title={`${stock1} vs ${stock2}: ${correlation.toFixed(3)}`}
														>
															{correlation.toFixed(2)}
														</div>
													);
												})}
											</React.Fragment>
										))}
									</div>

									{/* 범례 */}
									<div className="mt-6 flex flex-col items-center space-y-2 text-sm">
										<div className="flex items-center space-x-2">
											<div className="w-4 h-4 bg-red-500 rounded"></div>
											<span>강한 상관관계 (≥0.7)</span>
										</div>
										<div className="flex items-center space-x-2">
											<div className="w-4 h-4 bg-yellow-500 rounded"></div>
											<span>보통 상관관계 (0.4-0.7)</span>
										</div>
										<div className="flex items-center space-x-2">
											<div className="w-4 h-4 bg-green-500 rounded"></div>
											<span>약한 상관관계 (0.1-0.4)</span>
										</div>
										<div className="flex items-center space-x-2">
											<div className="w-4 h-4 bg-gray-500 rounded"></div>
											<span>상관관계 없음 (&lt;0.1)</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					) : (
						<div className="h-64 flex items-center justify-center">
							<div className="text-center space-y-3">
								<div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-950 rounded-full flex items-center justify-center">
									<Activity className="h-8 w-8 text-blue-600" />
								</div>
								<div>
									<h3 className="font-medium text-muted-foreground">상관관계 데이터가 없습니다</h3>
									<p className="text-sm text-muted-foreground mt-1">포트폴리오 분석이 완료되면 상관관계 히트맵이 표시됩니다</p>
								</div>
							</div>
						</div>
					)}
				</CardContent>
			</Card>

			{/* 상세 테이블 */}
			<Card className="backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 border border-gray-200/50 dark:border-gray-700/50 rounded-3xl">
				<CardHeader>
					<CardTitle className="flex items-center space-x-2">
						<BarChart3 className="h-5 w-5 text-blue-600" />
						<span>종목 간 상관관계 상세</span>
					</CardTitle>
					<CardDescription>포트폴리오 내 자산들의 상관관계 분석 (최근 1년 기준)</CardDescription>
				</CardHeader>
				<CardContent>
					{/* 데스크톱 테이블 뷰 */}
					<div className="hidden sm:block overflow-x-auto">
						<table className="w-full text-sm">
							<thead>
								<tr>
									<th className="text-left p-3 font-medium">종목 1</th>
									<th className="text-left p-3 font-medium">종목 2</th>
									<th className="text-center p-3 font-medium">상관계수</th>
									<th className="text-center p-3 font-medium">관계 강도</th>
								</tr>
							</thead>
							<tbody>
								{correlationData.map((item, index) => {
									const absCorr = Math.abs(item.correlation);
									const strength = absCorr > 0.7 ? "강함" : absCorr > 0.4 ? "보통" : "약함";
									const strengthColor = absCorr > 0.7 ? "text-red-600" : absCorr > 0.4 ? "text-yellow-600" : "text-green-600";

									return (
										<tr key={index} className="border-b border-gray-100 dark:border-gray-800 last:border-b-0">
											<td className="p-3 font-semibold">{item.stock1}</td>
											<td className="p-3 font-semibold">{item.stock2}</td>
											<td className="text-center p-3 font-mono">{item.correlation.toFixed(3)}</td>
											<td className={`text-center p-3 font-medium ${strengthColor}`}>{strength}</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
					{/* 모바일 카드 뷰 */}
					<div className="sm:hidden space-y-3">
						{correlationData.map((item, index) => {
							const absCorr = Math.abs(item.correlation);
							const strength = absCorr > 0.7 ? "강함" : absCorr > 0.4 ? "보통" : "약함";
							const strengthColor = absCorr > 0.7 ? "text-red-600" : absCorr > 0.4 ? "text-yellow-600" : "text-green-600";

							return (
								<div key={index} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3">
									<div className="flex justify-between items-start mb-2">
										<div className="flex items-center space-x-2">
											<span className="font-semibold text-sm">{item.stock1}</span>
											<span className="text-muted-foreground">↔</span>
											<span className="font-semibold text-sm">{item.stock2}</span>
										</div>
									</div>
									<div className="flex justify-between items-center text-xs">
										<div>
											<span className="text-muted-foreground">상관계수: </span>
											<span className="font-mono font-medium">{item.correlation.toFixed(3)}</span>
										</div>
										<span className={`font-medium ${strengthColor}`}>{strength}</span>
									</div>
								</div>
							);
						})}
					</div>
				</CardContent>
			</Card>
		</div>
	);
};