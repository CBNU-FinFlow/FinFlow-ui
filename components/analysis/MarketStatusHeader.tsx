"use client";

import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Activity, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MarketData {
	symbol: string;
	name: string;
	price: number;
	change: number;
	change_percent: number;
	volume: number;
}

interface MarketStatusResponse {
	market_data: MarketData[];
	last_updated: string;
	status: string;
}

export default function MarketStatusHeader() {
	const [marketData, setMarketData] = useState<MarketData[]>([]);
	const [lastUpdated, setLastUpdated] = useState<string>("");
	const [loading, setLoading] = useState(false);

	// 실시간 시장 데이터 가져오기
	const fetchMarketData = async () => {
		try {
			setLoading(true);
			const response = await fetch("/api/market-status");

			if (response.ok) {
				const data: MarketStatusResponse = await response.json();
				setMarketData(data.market_data);
				setLastUpdated(data.last_updated);
			} else {
				console.error("시장 데이터 조회 실패");
			}
		} catch (error) {
			console.error("시장 데이터 가져오기 오류:", error);
		} finally {
			setLoading(false);
		}
	};

	// 컴포넌트 마운트 시 및 5분마다 데이터 갱신
	useEffect(() => {
		fetchMarketData();

		// 5분마다 갱신
		const interval = setInterval(fetchMarketData, 5 * 60 * 1000);

		return () => clearInterval(interval);
	}, []);

	const formatPrice = (price: number) => {
		if (price === 0) return "N/A";
		return price.toLocaleString(undefined, {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});
	};

	const formatChange = (change: number, changePercent: number) => {
		if (change === 0 && changePercent === 0) return "N/A";

		const sign = changePercent >= 0 ? "+" : "";
		return `${sign}${changePercent.toFixed(2)}%`;
	};

	const getChangeColor = (changePercent: number) => {
		if (changePercent === 0) return "text-muted-foreground";
		return changePercent >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400";
	};

	const getChangeIcon = (changePercent: number) => {
		if (changePercent === 0) return Activity;
		return changePercent >= 0 ? TrendingUp : TrendingDown;
	};

	return (
		<Card className="border border-border bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20 shadow-lg">
			<CardContent className="p-4 sm:p-6">
				{/* 헤더 - 모바일 최적화 */}
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
					<div className="flex items-center space-x-2 sm:space-x-3">
						<div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
							<DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
						</div>
						<div>
							<h3 className="text-base sm:text-lg font-bold text-foreground">실시간 시장 동향</h3>
							<div className="flex items-center space-x-2">
								<div className={`w-2 h-2 rounded-full ${loading ? "bg-yellow-500" : "bg-green-500"} ${loading ? "" : "animate-pulse"}`}></div>
								<span className="text-xs sm:text-sm text-muted-foreground">
									{loading ? "업데이트 중..." : "실시간 연동"}
								</span>
								<Badge variant="secondary" className="text-xs px-2 py-0.5 sm:py-1 rounded-full bg-green-100 dark:bg-green-950/20 text-green-700 dark:text-green-400 border-0">
									LIVE
								</Badge>
							</div>
						</div>
					</div>
					<div className="text-xs sm:text-sm text-muted-foreground">
						{lastUpdated
							? new Date(lastUpdated).toLocaleString("ko-KR", {
									month: "long",
									day: "numeric",
									hour: "2-digit",
									minute: "2-digit",
							  })
							: new Date().toLocaleString("ko-KR", {
									month: "long",
									day: "numeric",
									hour: "2-digit",
									minute: "2-digit",
							  })}
					</div>
				</div>

				{/* 시장 데이터 - 모바일 최적화 */}
				<div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
					{marketData.length > 0
						? marketData.map((market, index) => {
								const ChangeIcon = getChangeIcon(market.change_percent);
								return (
									<div key={index} className="bg-white/50 dark:bg-gray-800/50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
										<div className="flex items-start justify-between mb-2">
											<div>
												<h4 className="font-semibold text-foreground text-xs sm:text-sm">{market.name}</h4>
												<p className="text-[10px] sm:text-xs text-muted-foreground">{market.symbol}</p>
											</div>
											<div className={`p-0.5 sm:p-1 rounded-lg ${market.change_percent >= 0 ? "bg-green-100 dark:bg-green-950/20" : "bg-red-100 dark:bg-red-950/20"}`}>
												<ChangeIcon className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${getChangeColor(market.change_percent)}`} />
											</div>
										</div>
										<div className="space-y-0.5 sm:space-y-1">
											<div className="text-sm sm:text-lg font-bold text-foreground">
												{formatPrice(market.price)}
											</div>
											<div className={`text-xs sm:text-sm font-medium ${getChangeColor(market.change_percent)}`}>
												{formatChange(market.change, market.change_percent)}
											</div>
										</div>
									</div>
								);
						  })
						: // 로딩 중이거나 데이터가 없을 때 스켈레톤 UI
						  [...Array(4)].map((_, index) => (
								<div key={index} className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm">
									<div className="flex items-start justify-between mb-2">
										<div className="space-y-1">
											{loading ? (
												<>
													<div className="animate-pulse bg-muted/50 h-4 w-16 rounded"></div>
													<div className="animate-pulse bg-muted/50 h-3 w-12 rounded"></div>
												</>
											) : (
												<>
													<div className="text-sm font-semibold text-muted-foreground">N/A</div>
													<div className="text-xs text-muted-foreground">---</div>
												</>
											)}
										</div>
										<div className="p-1 rounded-lg bg-muted/20">
											<Activity className="h-3 w-3 text-muted-foreground" />
										</div>
									</div>
									<div className="space-y-1">
										{loading ? (
											<>
												<div className="animate-pulse bg-muted/50 h-5 w-20 rounded"></div>
												<div className="animate-pulse bg-muted/50 h-4 w-16 rounded"></div>
											</>
										) : (
											<>
												<div className="text-lg font-bold text-muted-foreground">---</div>
												<div className="text-sm text-muted-foreground">데이터 없음</div>
											</>
										)}
									</div>
								</div>
						  ))}
				</div>
			</CardContent>
		</Card>
	);
}