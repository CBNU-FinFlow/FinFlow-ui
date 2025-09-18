"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, Brain, Activity, BarChart3, Target, Shield, PieChart, CheckCircle, Moon, Sun, Settings, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useTheme } from "next-themes";
import MarketStatusHeader from "@/components/analysis/MarketStatusHeader";

// 타입 임포트
import {
	TabsData,
	LoadingState,
	PortfolioAllocation,
	PerformanceMetrics,
	QuickMetrics,
	XAIData,
	PerformanceHistory,
	CorrelationData,
	RiskReturnData,
	AnalysisMode,
	PredictRequest,
	PredictResponse,
	CorrelationRequest,
	ExplainRequest,
	HistoricalPerformanceRequest,
	RiskReturnRequest,
} from "@/lib/types";
import { apiCallWithRetry } from "@/lib/config";
import { formatCurrency, formatPercent, formatDate, getRiskLabel, getHorizonLabel } from "@/lib/formatters";
import { CHART_COLORS } from "@/lib/constants";

// 컴포넌트 임포트
import { LoadingCard, ErrorCard } from "@/components/analysis/cards";
import {
	PortfolioTab,
	PerformanceTab,
	XAITab,
	CorrelationTab,
	RiskAnalysisTab
} from "@/components/analysis/tabs";

// 메인 컴포넌트
function AnalysisResultsContent() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// 상태 관리
	const [tabsData, setTabsData] = useState<TabsData | null>(null);
	const [loadingStates, setLoadingStates] = useState({
		portfolio: { isLoading: true, progress: 0, error: null },
		xai: { isLoading: true, progress: 0, error: null },
		performance: { isLoading: true, progress: 0, error: null },
		correlation: { isLoading: true, progress: 0, error: null },
		riskReturn: { isLoading: true, progress: 0, error: null },
	});
	const [analysisMode, setAnalysisMode] = useState<AnalysisMode>("fast");
	const [isRegeneratingXAI, setIsRegeneratingXAI] = useState(false);

	// URL 파라미터
	const investmentAmount = searchParams.get("amount") || "1000000";
	const riskToleranceNum = searchParams.get("risk") || "5";
	const investmentHorizon = searchParams.get("horizon") || "12";

	// Risk tolerance를 백엔드 형식으로 매핑
	const mapRiskTolerance = (risk: string): string => {
		const riskNum = Number(risk);
		if (riskNum <= 3) return "conservative";
		if (riskNum <= 6) return "moderate";
		return "aggressive";
	};

	const riskTolerance = mapRiskTolerance(riskToleranceNum);

	useEffect(() => {
		let alive = true;
		setMounted(true);

		(async () => {
			await Promise.allSettled([
				loadPortfolioData(alive),
				loadXAIData(alive),
				loadPerformanceData(alive), // 초기엔 allocation 없으면 return
				loadCorrelationData(alive),
				loadRiskReturnData(alive),
			]);
		})();

		return () => {
			alive = false;
		};
	}, []);

	// portfolio 완료 후 의존 데이터 재로딩
	useEffect(() => {
		if (!tabsData?.portfolio?.allocation?.length) return;

		let alive = true;
		(async () => {
			await Promise.allSettled([loadPerformanceData(alive), loadCorrelationData(alive), loadRiskReturnData(alive)]);
		})();

		return () => {
			alive = false;
		};
	}, [tabsData?.portfolio?.allocation?.length]);

	// const loadAllData = async () => {
	// 	// 모든 API 호출을 병렬로 실행
	// 	await Promise.allSettled([
	// 		loadPortfolioData(),
	// 		loadXAIData(),
	// 		loadPerformanceData(),
	// 		loadCorrelationData(),
	// 		loadRiskReturnData(),
	// 	]);
	// };

	const loadPortfolioData = async (alive = true) => {
		try {
			updateLoadingState("portfolio", { isLoading: true, progress: 20 });

			const req: PredictRequest = {
				investment_amount: Number(investmentAmount),
				risk_tolerance: riskTolerance as "conservative" | "moderate" | "aggressive",
				investment_horizon: Number(investmentHorizon),
			};

			const response = await apiCallWithRetry<PredictResponse>("/predict", {
				method: "POST",
				body: JSON.stringify(req),
			});

			if (!alive) return;
			updateLoadingState("portfolio", { isLoading: true, progress: 80 });

			// 응답 데이터를 프론트엔드 형식으로 변환
			const portfolioData = transformPortfolioData(response as any, investmentAmount);

			if (!alive) return;
			setTabsData((prev) => ({
				...prev!,
				portfolio: portfolioData,
			}));

			updateLoadingState("portfolio", { isLoading: false, progress: 100 });
		} catch (error) {
			if (!alive) return;
			updateLoadingState("portfolio", {
				isLoading: false,
				progress: 0,
				error: (error as Error).message,
			});
		}
	};

	const loadXAIData = async (alive = true) => {
		try {
			updateLoadingState("xai", { isLoading: true, progress: 30 });

			const req: ExplainRequest = {
				investment_amount: Number(investmentAmount),
				risk_tolerance: riskTolerance as "conservative" | "moderate" | "aggressive",
				investment_horizon: Number(investmentHorizon),
				method: analysisMode,
			};

			const response = await apiCallWithRetry("/explain", {
				method: "POST",
				body: JSON.stringify(req),
			});

			if (!alive) return;
			updateLoadingState("xai", { isLoading: true, progress: 90 });

			setTabsData((prev) => ({
				...prev!,
				xai: response as XAIData,
			}));

			updateLoadingState("xai", { isLoading: false, progress: 100 });
		} catch (error) {
			if (!alive) return;
			updateLoadingState("xai", {
				isLoading: false,
				progress: 0,
				error: (error as Error).message,
			});
		}
	};

	const loadPerformanceData = async (alive = true) => {
		if (!tabsData?.portfolio?.allocation?.length) return;

		try {
			updateLoadingState("performance", { isLoading: true, progress: 40 });

			const req: HistoricalPerformanceRequest = {
				portfolio_allocation: tabsData.portfolio.allocation.map((item) => ({
					symbol: item.stock,
					weight: item.percentage / 100,
				})),
				period: "1y",
			};

			const response = await apiCallWithRetry("/historical-performance", {
				method: "POST",
				body: JSON.stringify(req),
			});

			if (!alive) return;
			setTabsData((prev) => ({
				...prev!,
				performance: { history: (response as any).performance_history },
			}));

			updateLoadingState("performance", { isLoading: false, progress: 100 });
		} catch (error) {
			if (!alive) return;
			updateLoadingState("performance", {
				isLoading: false,
				progress: 0,
				error: (error as Error).message,
			});
		}
	};

	const loadCorrelationData = async (alive = true) => {
		if (!tabsData?.portfolio?.allocation?.length) return;

		try {
			updateLoadingState("correlation", { isLoading: true, progress: 50 });

			const tickers = tabsData.portfolio.allocation.filter((item) => item.stock !== "현금" && item.stock).map((item) => item.stock);

			if (tickers.length === 0) return;

			const req: CorrelationRequest = {
				tickers,
				period: "1y",
			};

			const response = await apiCallWithRetry("/correlation-analysis", {
				method: "POST",
				body: JSON.stringify(req),
			});

			if (!alive) return;
			setTabsData((prev) => ({
				...prev!,
				correlation: (response as any).correlation_data,
			}));

			updateLoadingState("correlation", { isLoading: false, progress: 100 });
		} catch (error) {
			if (!alive) return;
			updateLoadingState("correlation", {
				isLoading: false,
				progress: 0,
				error: (error as Error).message,
			});
		}
	};

	const loadRiskReturnData = async (alive = true) => {
		if (!tabsData?.portfolio?.allocation?.length) return;

		try {
			updateLoadingState("riskReturn", { isLoading: true, progress: 60 });

			const req: RiskReturnRequest = {
				portfolio_allocation: tabsData.portfolio.allocation.map((item) => ({
					symbol: item.stock,
					weight: item.percentage / 100,
				})),
				period: "1y",
			};

			const response = await apiCallWithRetry("/risk-return-analysis", {
				method: "POST",
				body: JSON.stringify(req),
			});

			if (!alive) return;
			setTabsData((prev) => ({
				...prev!,
				riskReturn: (response as any).risk_return_data,
			}));

			updateLoadingState("riskReturn", { isLoading: false, progress: 100 });
		} catch (error) {
			if (!alive) return;
			updateLoadingState("riskReturn", {
				isLoading: false,
				progress: 0,
				error: (error as Error).message,
			});
		}
	};

	const updateLoadingState = (key: keyof typeof loadingStates, update: Partial<LoadingState>) => {
		setLoadingStates((prev) => ({
			...prev,
			[key]: { ...prev[key], ...update },
		}));
	};

	const transformPortfolioData = (backendData: any, investmentAmount: string) => {
		try {
			const amount = Number(investmentAmount);

			// 데이터 검증
			if (!backendData || typeof backendData !== "object") {
				throw new Error("Invalid backend data format");
			}

			if (!backendData.allocation || !Array.isArray(backendData.allocation)) {
				console.warn("Missing or invalid allocation data, using empty array");
				backendData.allocation = [];
			}

			if (!backendData.metrics || typeof backendData.metrics !== "object") {
				console.warn("Missing or invalid metrics data, using defaults");
				backendData.metrics = {
					total_return: 0,
					annual_return: 0,
					sharpe_ratio: 0,
					sortino_ratio: 0,
					max_drawdown: 0,
					volatility: 0,
				};
			}

			return {
				allocation: backendData.allocation.map((item: any) => ({
					stock: item?.symbol || "Unknown",
					percentage: (item?.weight || 0) * 100,
					amount: amount * (item?.weight || 0),
				})),
				metrics: [
					{
						label: "총 수익률",
						portfolio: `${(backendData.metrics.total_return || 0).toFixed(2)}%`,
						spy: "0.00%",
						qqq: "0.00%",
					},
					{
						label: "연간 수익률",
						portfolio: `${(backendData.metrics.annual_return || 0).toFixed(2)}%`,
						spy: "0.00%",
						qqq: "0.00%",
					},
					{
						label: "샤프 비율",
						portfolio: (backendData.metrics.sharpe_ratio || 0).toFixed(4),
						spy: "0.0000",
						qqq: "0.0000",
					},
					{
						label: "소르티노 비율",
						portfolio: (backendData.metrics.sortino_ratio || 0).toFixed(4),
						spy: "0.0000",
						qqq: "0.0000",
					},
					{
						label: "최대 낙폭",
						portfolio: `${(backendData.metrics.max_drawdown || 0).toFixed(2)}%`,
						spy: "0.00%",
						qqq: "0.00%",
					},
					{
						label: "변동성",
						portfolio: `${(backendData.metrics.volatility || 0).toFixed(2)}%`,
						spy: "0.00%",
						qqq: "0.00%",
					},
				],
				quickMetrics: {
					annualReturn: `+${(backendData.metrics.annual_return || 0).toFixed(1)}%`,
					sharpeRatio: (backendData.metrics.sharpe_ratio || 0).toFixed(2),
					maxDrawdown: `-${(backendData.metrics.max_drawdown || 0).toFixed(1)}%`,
					volatility: `${(backendData.metrics.volatility || 0).toFixed(1)}%`,
				},
			};
		} catch (error) {
			console.error("Portfolio data transformation error:", error);

			// 완전히 실패한 경우 기본값 반환
			return {
				allocation: [],
				metrics: [
					{ label: "총 수익률", portfolio: "0.00%", spy: "0.00%", qqq: "0.00%" },
					{ label: "연간 수익률", portfolio: "0.00%", spy: "0.00%", qqq: "0.00%" },
					{ label: "샤프 비율", portfolio: "0.0000", spy: "0.0000", qqq: "0.0000" },
					{ label: "소르티노 비율", portfolio: "0.0000", spy: "0.0000", qqq: "0.0000" },
					{ label: "최대 낙폭", portfolio: "0.00%", spy: "0.00%", qqq: "0.00%" },
					{ label: "변동성", portfolio: "0.00%", spy: "0.00%", qqq: "0.00%" },
				],
				quickMetrics: {
					annualReturn: "+0.0%",
					sharpeRatio: "0.00",
					maxDrawdown: "-0.0%",
					volatility: "0.0%",
				},
			};
		}
	};

	const handleXAIModeChange = async (mode: AnalysisMode) => {
		setAnalysisMode(mode);
		setIsRegeneratingXAI(true);

		try {
			const req: ExplainRequest = {
				investment_amount: Number(investmentAmount),
				risk_tolerance: riskTolerance as "conservative" | "moderate" | "aggressive",
				investment_horizon: Number(investmentHorizon),
				method: mode,
			};

			const response = await apiCallWithRetry("/explain", {
				method: "POST",
				body: JSON.stringify(req),
			});

			setTabsData((prev) => ({
				...prev!,
				xai: response as XAIData,
			}));
		} catch (error) {
			console.error("XAI 재생성 실패", error);
		} finally {
			setIsRegeneratingXAI(false);
		}
	};

	const handleRetry = (dataType: keyof typeof loadingStates) => {
		switch (dataType) {
			case "portfolio":
				loadPortfolioData(true);
				break;
			case "xai":
				loadXAIData(true);
				break;
			case "performance":
				loadPerformanceData(true);
				break;
			case "correlation":
				loadCorrelationData(true);
				break;
			case "riskReturn":
				loadRiskReturnData(true);
				break;
		}
	};

	// 초기 상태 설정
	if (!tabsData) {
		setTabsData({
			portfolio: {
				allocation: [],
				metrics: [],
				quickMetrics: { annualReturn: "0%", sharpeRatio: "0", maxDrawdown: "0%", volatility: "0%" },
			},
			performance: { history: [] },
			xai: { feature_importance: [], attention_weights: [], explanation_text: "" },
			correlation: [],
			riskReturn: [],
		});
		return null;
	}

	return (
		<div className="min-h-screen overflow-x-hidden">
			{/* 격자 패턴 배경 - 스크롤 시에도 유지 */}
			<div className="fixed inset-0 bg-[linear-gradient(to_right,#d0d0d0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] -z-20"></div>
			{/* 그라데이션 오버레이 */}
			<div className="fixed inset-0 bg-gradient-to-br from-gray-50/80 to-blue-50/80 dark:from-gray-900/80 dark:to-blue-900/20 -z-10"></div>

			{/* 상단 헤더 */}
			<div className="relative backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-10">
				<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
						<div className="flex items-center space-x-4">
							<Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
								<Button variant="ghost" size="sm" className="px-2 sm:px-4">
									<ArrowLeft className="w-4 h-4 sm:mr-2" />
									<span className="hidden sm:inline">홈으로 돌아가기</span>
								</Button>
							</Link>
							<div className="flex items-center space-x-1.5 sm:space-x-2">
								<div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center">
									<Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
								</div>
								<h1 className="text-base sm:text-xl font-bold">
									<span className="sm:hidden">AI 분석 결과</span>
									<span className="hidden sm:inline">AI 포트폴리오 분석 결과</span>
								</h1>
								<Badge className="hidden sm:inline-flex bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400 border-0 rounded-xl sm:rounded-2xl text-xs sm:text-sm px-2 py-0.5 sm:px-3 sm:py-1">분석 완료</Badge>
							</div>
						</div>
						<div className="flex items-center space-x-2">
							<Button variant="ghost" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="text-muted-foreground hover:text-foreground rounded-2xl">
								{mounted && theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
							</Button>
							<Button
								onClick={() => router.push(`/analysis/loading?amount=${investmentAmount}&risk=${riskTolerance}&horizon=${investmentHorizon}`)}
								className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl"
							>
								<Brain className="w-4 h-4 mr-2" />
								재분석
							</Button>
						</div>
					</div>
				</div>
			</div>

			{/* 메인 콘텐츠 */}
			<div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="space-y-8">
					{/* 실시간 시장 상황 헤더 */}
					<MarketStatusHeader />
					{/* 투자 요약 헤더 */}
					<div className="text-center space-y-4">
						<div className="flex items-center justify-center space-x-2 mb-4">
							<div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
								<CheckCircle className="w-6 h-6 text-white" />
							</div>
						</div>
						<h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">포트폴리오 분석이 완료되었습니다</h2>
						<p className="text-muted-foreground text-sm sm:text-base lg:text-lg">투자 금액 {formatCurrency(Number(investmentAmount))}에 대한 AI 최적화 포트폴리오를 제안합니다</p>
						<div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
							<div>
								투자 성향: <span className="font-medium">{getRiskLabel(riskTolerance)}</span>
							</div>
							<div>•</div>
							<div>
								투자 기간: <span className="font-medium">{getHorizonLabel(investmentHorizon)}</span>
							</div>
						</div>
					</div>

					{/* 탭 콘텐츠 - 모바일 최적화 */}
					<Tabs defaultValue="portfolio" className="w-full">
						{/* 모바일: 가로 스크롤, 데스크톱: 5열 그리드 */}
						<div className="overflow-x-auto scrollbar-hide">
							<TabsList className="flex sm:grid sm:w-full sm:grid-cols-5 w-max sm:w-full rounded-3xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
								<TabsTrigger value="portfolio" className="rounded-2xl whitespace-nowrap">
									<PieChart className="w-4 h-4 mr-1 sm:mr-2" />
									<span className="text-xs sm:text-sm">포트폴리오</span>
								</TabsTrigger>
								<TabsTrigger value="performance" className="rounded-2xl whitespace-nowrap">
									<Activity className="w-4 h-4 mr-1 sm:mr-2" />
									<span className="text-xs sm:text-sm">성과분석</span>
								</TabsTrigger>
								<TabsTrigger value="xai" className="rounded-2xl whitespace-nowrap">
									<Brain className="w-4 h-4 mr-1 sm:mr-2" />
									<span className="text-xs sm:text-sm">AI설명</span>
								</TabsTrigger>
								<TabsTrigger value="correlation" className="rounded-2xl whitespace-nowrap">
									<BarChart3 className="w-4 h-4 mr-1 sm:mr-2" />
									<span className="text-xs sm:text-sm">상관관계</span>
								</TabsTrigger>
								<TabsTrigger value="risk" className="rounded-2xl whitespace-nowrap">
									<Shield className="w-4 h-4 mr-1 sm:mr-2" />
									<span className="text-xs sm:text-sm">위험분석</span>
								</TabsTrigger>
							</TabsList>
						</div>

						<TabsContent value="portfolio" className="space-y-6 mt-8">
							{loadingStates.portfolio.isLoading ? (
								<LoadingCard title="포트폴리오 생성 중..." description="AI가 최적의 자산 배분을 계산하고 있습니다" />
							) : loadingStates.portfolio.error ? (
								<ErrorCard title="포트폴리오 생성 실패" error={loadingStates.portfolio.error} onRetry={() => handleRetry("portfolio")} />
							) : (
								<PortfolioTab allocation={tabsData.portfolio.allocation} metrics={tabsData.portfolio.metrics} quickMetrics={tabsData.portfolio.quickMetrics} />
							)}
						</TabsContent>

						<TabsContent value="performance" className="space-y-6 mt-8">
							{loadingStates.performance.isLoading ? (
								<LoadingCard title="성과 데이터 분석 중..." description="백테스트 기반 성과 히스토리를 생성하고 있습니다" />
							) : loadingStates.performance.error ? (
								<ErrorCard title="성과 분석 실패" error={loadingStates.performance.error} onRetry={() => handleRetry("performance")} />
							) : (
								<PerformanceTab history={tabsData.performance.history} />
							)}
						</TabsContent>

						<TabsContent value="xai" className="space-y-6 mt-8">
							{loadingStates.xai.isLoading ? (
								<LoadingCard title="AI 설명 생성 중..." description={`${analysisMode === "fast" ? "빠른" : "정밀"} 모드로 투자 결정 근거를 분석하고 있습니다`} />
							) : loadingStates.xai.error ? (
								<ErrorCard title="AI 설명 생성 실패" error={loadingStates.xai.error} onRetry={() => handleRetry("xai")} />
							) : (
								<XAITab
									xaiData={tabsData.xai}
									analysisMode={analysisMode}
									onModeChange={handleXAIModeChange}
									onRegenerate={() => handleXAIModeChange(analysisMode)}
									isRegenerating={isRegeneratingXAI}
								/>
							)}
						</TabsContent>

						<TabsContent value="correlation" className="space-y-6 mt-8">
							{loadingStates.correlation.isLoading ? (
								<LoadingCard title="상관관계 분석 중..." description="종목 간 상관관계를 실시간으로 계산하고 있습니다" />
							) : loadingStates.correlation.error ? (
								<ErrorCard title="상관관계 분석 실패" error={loadingStates.correlation.error} onRetry={() => handleRetry("correlation")} />
							) : (
								<CorrelationTab correlationData={tabsData.correlation} />
							)}
						</TabsContent>

						<TabsContent value="risk" className="space-y-6 mt-8">
							{loadingStates.riskReturn.isLoading ? (
								<LoadingCard title="위험 분석 중..." description="종목별 위험-수익률 특성을 분석하고 있습니다" />
							) : loadingStates.riskReturn.error ? (
								<ErrorCard title="위험 분석 실패" error={loadingStates.riskReturn.error} onRetry={() => handleRetry("riskReturn")} />
							) : (
								<RiskAnalysisTab riskReturnData={tabsData.riskReturn} />
							)}
						</TabsContent>
					</Tabs>

					{/* 액션 버튼 */}
					<div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
						<Button onClick={() => router.push("/onboarding")} variant="outline" className="rounded-2xl h-12 px-8 border-gray-300 dark:border-gray-600">
							<Settings className="h-4 w-4 mr-2" />
							다른 조건으로 분석
						</Button>
						<Button onClick={() => window.print()} className="rounded-2xl h-12 px-8 bg-blue-600 hover:bg-blue-700">
							<Download className="h-4 w-4 mr-2" />
							결과 저장하기
						</Button>
					</div>
				</div>

				{/* 장식적 요소 */}
				<div className="absolute -top-10 -right-10 -z-10 h-[200px] w-[200px] rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-3xl opacity-70"></div>
				<div className="absolute -bottom-10 -left-10 -z-10 h-[200px] w-[200px] rounded-full bg-gradient-to-br from-purple-400/20 to-blue-400/20 blur-3xl opacity-70"></div>
			</div>
		</div>
	);
}

export default function AnalysisResultsPage() {
	return (
		<Suspense
			fallback={
				<div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900 flex items-center justify-center">
					<div className="text-center space-y-4">
						<div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
						<p className="text-muted-foreground">AI 분석 결과를 준비하고 있습니다</p>
					</div>
				</div>
			}
		>
			<AnalysisResultsContent />
		</Suspense>
	);
}
