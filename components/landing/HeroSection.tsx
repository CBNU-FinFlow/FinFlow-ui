// components/landing/HeroSection.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const HeroSection = () => {
	return (
		<section className="w-full py-20 md:py-32 lg:py-40 overflow-hidden">
			<div className="container px-4 md:px-6 relative">
				<div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

				<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center max-w-4xl mx-auto mb-8 sm:mb-12">
					<Badge className="mb-3 sm:mb-4 rounded-2xl px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-medium" variant="secondary">
						AI 기반 리스크 관리
					</Badge>
					<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6 text-balance px-4 sm:px-0">포트폴리오 관리, 이제 AI로 스마트하게</h1>
					<p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto text-balance px-4 sm:px-0">
						실시간 변동성 감지, 리밸런싱 제안, 스트레스 시각화.
						<br className="hidden sm:block" />
						<span className="sm:hidden"> </span>강화학습 기반의 지능형 리스크 관리로 투자를 보호하세요.
					</p>
					<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
						<Link href="/onboarding" className="w-full sm:w-auto">
							<Button size="lg" className="rounded-2xl h-11 sm:h-12 px-6 sm:px-8 text-sm sm:text-base bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
								시작하기
							</Button>
						</Link>
						<Button size="lg" variant="outline" className="rounded-2xl h-11 sm:h-12 px-6 sm:px-8 text-sm sm:text-base bg-transparent w-full sm:w-auto">
							데모 보기
							<ExternalLink className="ml-2 size-4" />
						</Button>
					</div>
				</motion.div>

				<motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="relative mx-auto max-w-6xl px-4 sm:px-6">
					{/* 모바일: 스크롤 가능한 컨테이너 */}
					<div className="lg:hidden overflow-x-auto pb-4">
						<div className="flex gap-4 w-max px-2">
							{/* 첫 번째 휴대폰 - 주식 차트 화면 */}
							<div className="w-48 h-96 bg-black rounded-[2.5rem] border-4 border-gray-800 shadow-2xl flex-shrink-0">
							<div className="w-full h-full rounded-[1.5rem] bg-gradient-to-b from-gray-900 to-black p-3 overflow-hidden">
								{/* Status bar */}
								<div className="flex items-center justify-between mb-3 text-white text-xs">
									<div className="text-sm font-medium">9:41</div>
									<div className="flex items-center gap-1">
										<div className="w-4 h-2 border border-white/50 rounded-sm">
											<div className="w-3 h-1 bg-green-500 rounded-sm"></div>
										</div>
									</div>
								</div>

								{/* Header */}
								<div className="text-center mb-4">
									<div className="text-white font-bold text-lg">AAPL</div>
									<div className="text-green-400 text-sm font-semibold">$173.50 +2.15%</div>
								</div>

								{/* Chart */}
								<div className="h-24 bg-gray-800/50 rounded-lg mb-3 relative overflow-hidden">
									<svg className="w-full h-full" viewBox="0 0 100 50">
										<path d="M5,45 L15,40 L25,35 L35,25 L45,30 L55,20 L65,15 L75,25 L85,20 L95,15" stroke="#10b981" strokeWidth="2" fill="none" />
									</svg>
								</div>

								{/* Action buttons */}
								<div className="grid grid-cols-2 gap-2 mb-3">
									<div className="bg-green-600 text-white text-center py-2 rounded text-sm font-medium">매수</div>
									<div className="bg-red-600 text-white text-center py-2 rounded text-sm font-medium">매도</div>
								</div>

								{/* Stats */}
								<div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
									<div>
										<div>고가</div>
										<div className="text-white">$175.20</div>
									</div>
									<div>
										<div>저가</div>
										<div className="text-white">$171.80</div>
									</div>
								</div>
							</div>
						</div>

							{/* 두 번째 휴대폰 (중앙) - 포트폴리오 화면 */}
							<div className="w-52 h-[28rem] bg-black rounded-[2.5rem] border-4 border-gray-800 shadow-2xl flex-shrink-0">
							<div className="w-full h-full rounded-[1.5rem] bg-gradient-to-b from-gray-900 to-black p-4 overflow-hidden">
								{/* Status bar */}
								<div className="flex items-center justify-between mb-4 text-white text-xs">
									<div className="text-sm font-medium">9:41</div>
									<div className="text-xs font-bold text-blue-400">FinFlow</div>
								</div>

								{/* Portfolio value */}
								<div className="text-center mb-6">
									<div className="text-2xl font-bold text-white">$142,850</div>
									<div className="text-green-400 text-sm">+$3,240 (+2.32%) 오늘</div>
								</div>

								{/* Chart */}
								<div className="h-32 bg-gray-800/30 rounded-xl mb-4 relative overflow-hidden p-2">
									<svg className="w-full h-full" viewBox="0 0 100 60">
										<defs>
											<linearGradient id="portfolioGradient" x1="0%" y1="0%" x2="0%" y2="100%">
												<stop offset="0%" style={{ stopColor: "#10b981", stopOpacity: 0.3 }} />
												<stop offset="100%" style={{ stopColor: "#10b981", stopOpacity: 0 }} />
											</linearGradient>
										</defs>
										<path d="M0,50 L10,45 L20,42 L30,35 L40,32 L50,28 L60,24 L70,20 L80,15 L90,10 L100,5 L100,60 L0,60 Z" fill="url(#portfolioGradient)" />
										<path d="M0,50 L10,45 L20,42 L30,35 L40,32 L50,28 L60,24 L70,20 L80,15 L90,10 L100,5" stroke="#10b981" strokeWidth="2" fill="none" />
									</svg>
								</div>

								{/* Holdings */}
								<div className="bg-gray-800/30 rounded-xl p-3 mb-4">
									<div className="text-xs text-gray-400 mb-2">보유 종목</div>
									<div className="space-y-2 text-xs">
										<div className="flex justify-between">
											<span className="text-gray-300">AAPL</span>
											<span className="text-green-400">+2.3%</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-300">MSFT</span>
											<span className="text-green-400">+1.8%</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-300">GOOGL</span>
											<span className="text-red-400">-0.5%</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-300">AMZN</span>
											<span className="text-green-400">+3.1%</span>
										</div>
									</div>
								</div>

								{/* Action button */}
								<button className="w-full bg-blue-500 text-white py-2 rounded-xl text-sm font-medium">포트폴리오 재조정</button>
							</div>
						</div>

							{/* 세 번째 휴대폰 - AI 분석 화면 */}
							<div className="w-48 h-96 bg-black rounded-[2.5rem] border-4 border-gray-800 shadow-2xl flex-shrink-0">
								<div className="w-full h-full rounded-[1.5rem] bg-gradient-to-b from-gray-900 to-black p-3 overflow-hidden">
									{/* Status bar */}
									<div className="flex items-center justify-between mb-3 text-white text-xs">
										<div className="text-sm font-medium">9:41</div>
										<div className="flex items-center gap-1">
											<div className="w-4 h-2 border border-white/50 rounded-sm">
												<div className="w-3 h-1 bg-green-500 rounded-sm"></div>
											</div>
										</div>
									</div>

									{/* Header */}
									<div className="text-center mb-3">
										<div className="text-white font-bold text-base">AI 추천</div>
										<div className="text-gray-400 text-xs">오늘의 투자 전략</div>
									</div>

									{/* Recommendations */}
									<div className="space-y-2 mb-3">
										<div className="bg-green-500/10 border border-green-500/30 rounded p-2">
											<div className="text-green-400 text-xs font-medium">매수 추천</div>
											<div className="text-white text-sm font-bold">NVDA</div>
											<div className="text-gray-400 text-xs">AI 섹터 성장</div>
										</div>

										<div className="bg-yellow-500/10 border border-yellow-500/30 rounded p-2">
											<div className="text-yellow-400 text-xs font-medium">비중 조정</div>
											<div className="text-white text-sm font-bold">TSLA</div>
											<div className="text-gray-400 text-xs">변동성 증가</div>
										</div>

										<div className="bg-red-500/10 border border-red-500/30 rounded p-2">
											<div className="text-red-400 text-xs font-medium">매도 신호</div>
											<div className="text-white text-sm font-bold">META</div>
											<div className="text-gray-400 text-xs">목표가 도달</div>
										</div>
									</div>

									{/* AI Score */}
									<div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded p-2">
										<div className="text-xs text-gray-400 mb-1">AI 신뢰도</div>
										<div className="text-2xl font-bold text-white">92%</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* 데스크톱 버전: 기존 레이아웃 유지 */}
					<div className="hidden lg:flex gap-8 justify-center items-center">
						{/* 첫 번째 휴대폰 (왼쪽) - 주식 차트 화면 */}
						<div className="w-64 h-[32rem] bg-black rounded-[3rem] border-4 border-gray-800 shadow-2xl transform -rotate-6">
							<div className="w-full h-full rounded-[2.5rem] bg-gradient-to-b from-gray-900 to-black p-4 overflow-hidden">
								{/* Status bar */}
								<div className="flex items-center justify-between mb-4 text-white text-xs">
									<div className="text-sm font-medium">9:41</div>
									<div className="flex items-center gap-1">
										<div className="w-5 h-3 border border-white/50 rounded-sm">
											<div className="w-4 h-2 bg-green-500 rounded-sm"></div>
										</div>
									</div>
								</div>

								{/* Header */}
								<div className="text-center mb-6">
									<div className="text-white font-bold text-2xl">AAPL</div>
									<div className="text-green-400 text-lg font-semibold">$173.50 +2.15%</div>
								</div>

								{/* Chart */}
								<div className="h-32 bg-gray-800/50 rounded-xl mb-4 relative overflow-hidden">
									<svg className="w-full h-full" viewBox="0 0 100 50">
										<path d="M5,45 L15,40 L25,35 L35,25 L45,30 L55,20 L65,15 L75,25 L85,20 L95,15" stroke="#10b981" strokeWidth="2" fill="none" />
									</svg>
								</div>

								{/* Action buttons */}
								<div className="grid grid-cols-2 gap-3 mb-4">
									<div className="bg-green-600 text-white text-center py-3 rounded-xl text-sm font-medium">매수</div>
									<div className="bg-red-600 text-white text-center py-3 rounded-xl text-sm font-medium">매도</div>
								</div>

								{/* Stats */}
								<div className="grid grid-cols-2 gap-3 text-sm text-gray-400">
									<div>
										<div>고가</div>
										<div className="text-white text-base">$175.20</div>
									</div>
									<div>
										<div>저가</div>
										<div className="text-white text-base">$171.80</div>
									</div>
									<div>
										<div>거래량</div>
										<div className="text-white text-base">52.3M</div>
									</div>
									<div>
										<div>시가총액</div>
										<div className="text-white text-base">$2.8T</div>
									</div>
								</div>
							</div>
						</div>

						{/* 두 번째 휴대폰 (중앙) - 포트폴리오 화면 */}
						<div className="w-72 h-[36rem] bg-black rounded-[3rem] border-4 border-gray-800 shadow-2xl z-10">
							<div className="w-full h-full rounded-[2.5rem] bg-gradient-to-b from-gray-900 to-black p-6 overflow-hidden">
								{/* Status bar */}
								<div className="flex items-center justify-between mb-6 text-white text-xs">
									<div className="text-sm font-medium">9:41</div>
									<div className="text-sm font-bold text-blue-400">FinFlow</div>
								</div>

								{/* Portfolio value */}
								<div className="text-center mb-8">
									<div className="text-3xl font-bold text-white">$142,850</div>
									<div className="text-green-400 text-base">+$3,240 (+2.32%) 오늘</div>
								</div>

								{/* Chart */}
								<div className="h-40 bg-gray-800/30 rounded-xl mb-6 relative overflow-hidden p-3">
									<svg className="w-full h-full" viewBox="0 0 100 60">
										<defs>
											<linearGradient id="portfolioGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
												<stop offset="0%" style={{ stopColor: "#10b981", stopOpacity: 0.3 }} />
												<stop offset="100%" style={{ stopColor: "#10b981", stopOpacity: 0 }} />
											</linearGradient>
										</defs>
										<path d="M0,50 L10,45 L20,42 L30,35 L40,32 L50,28 L60,24 L70,20 L80,15 L90,10 L100,5 L100,60 L0,60 Z" fill="url(#portfolioGradient2)" />
										<path d="M0,50 L10,45 L20,42 L30,35 L40,32 L50,28 L60,24 L70,20 L80,15 L90,10 L100,5" stroke="#10b981" strokeWidth="2" fill="none" />
									</svg>
								</div>

								{/* Holdings */}
								<div className="bg-gray-800/30 rounded-xl p-4 mb-4">
									<div className="text-sm text-gray-400 mb-3">보유 종목</div>
									<div className="space-y-3 text-sm">
										<div className="flex justify-between">
											<span className="text-gray-300">Apple Inc.</span>
											<span className="text-green-400">+2.3%</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-300">Microsoft</span>
											<span className="text-green-400">+1.8%</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-300">Google</span>
											<span className="text-red-400">-0.5%</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-300">Amazon</span>
											<span className="text-green-400">+3.1%</span>
										</div>
										<div className="flex justify-between">
											<span className="text-gray-300">Tesla</span>
											<span className="text-green-400">+4.2%</span>
										</div>
									</div>
								</div>

								{/* Action button */}
								<button className="w-full bg-blue-500 text-white py-3 rounded-xl text-base font-medium">포트폴리오 재조정</button>
							</div>
						</div>

						{/* 세 번째 휴대폰 (오른쪽) - 리스크 분석 화면 */}
						<div className="w-64 h-[32rem] bg-black rounded-[3rem] border-4 border-gray-800 shadow-2xl transform rotate-6">
							<div className="w-full h-full rounded-[2.5rem] bg-gradient-to-b from-gray-900 to-black p-4 overflow-hidden">
								{/* Status bar */}
								<div className="flex items-center justify-between mb-4 text-white text-xs">
									<div className="text-sm font-medium">9:41</div>
									<div className="flex items-center gap-1">
										<div className="w-5 h-3 border border-white/50 rounded-sm">
											<div className="w-4 h-2 bg-green-500 rounded-sm"></div>
										</div>
									</div>
								</div>

								{/* Header */}
								<div className="text-center mb-4">
									<div className="text-white font-bold text-xl">리스크 분석</div>
									<div className="text-gray-400 text-sm">포트폴리오 건강도</div>
								</div>

								{/* Risk Score */}
								<div className="bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-xl p-4 mb-4">
									<div className="text-center">
										<div className="text-4xl font-bold text-green-400 mb-2">85</div>
										<div className="text-xs text-gray-400">안정적</div>
									</div>
								</div>

								{/* Risk Metrics */}
								<div className="space-y-3 text-sm">
									<div className="flex justify-between">
										<span className="text-gray-400">VaR (1일)</span>
										<span className="text-white">-$2,850</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-400">샤프 비율</span>
										<span className="text-white">1.24</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-400">최대 손실</span>
										<span className="text-red-400">-12.5%</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-400">베타</span>
										<span className="text-white">0.89</span>
									</div>
								</div>

								{/* Alert */}
								<div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl text-xs">
									<div className="text-yellow-400 font-medium">⚠️ 알림</div>
									<div className="text-gray-300">테슬라 비중 재조정 필요</div>
								</div>
							</div>
						</div>
					</div>

					<div className="absolute -bottom-10 -right-10 -z-10 h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-3xl opacity-70"></div>
					<div className="absolute -top-10 -left-10 -z-10 h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] rounded-full bg-gradient-to-br from-purple-400/20 to-blue-400/20 blur-3xl opacity-70"></div>
				</motion.div>
			</div>
		</section>
	);
};