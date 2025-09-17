"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Menu, X, Moon, Sun, Shield, BarChart3, Target, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useTheme } from "next-themes";

export default function LandingPage() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const { theme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		const handleScroll = () => {
			if (window.scrollY > 10) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	const container = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const item = {
		hidden: { opacity: 0, y: 20 },
		show: { opacity: 1, y: 0 },
	};

	const features = [
		{
			title: "면역체계에서 영감을 받은 모델",
			description: "FinFlow는 생물학적 면역체계에서 착안한 구조로 설계되었습니다.\n\nB-Cell과 T-Cell이 협력하듯, 다양한 정책과 메모리가 함께 작동하여 시장 변화에 유연하게 대응합니다.",
			icon: <BarChart3 className="size-6" />,
		},
		{
			title: "자동화된 포트폴리오 관리",
			description: "FinFlow는 데이터 기반 강화학습으로 포트폴리오를 자동으로 관리합니다.\n\n시장의 흐름을 실시간으로 반영하여, 위험을 줄이고 기회를 포착하는 결정을 스스로 내립니다.",
			icon: <Target className="size-6" />,
		},
		{
			title: "투명한 의사 결정",
			description: "FinFlow는 단순한 예측을 넘어, 왜 그런 의사결정을 내렸는지 설명할 수 있습니다.\n\n투명한 분석과 시각화를 통해 투자자에게 신뢰할 수 있는 근거를 제공합니다.",
			icon: <Shield className="size-6" />,
		},
	];

	// 주요 회사 로고들
	const companyLogos = [
		{ name: "P&G", color: "bg-blue-600" },
		{ name: "Apple", color: "bg-gray-800" },
		{ name: "Amazon", color: "bg-orange-500" },
		{ name: "AmEx", color: "bg-blue-700" },
		{ name: "Google", color: "bg-red-500" },
		{ name: "Meta", color: "bg-blue-600" },
		{ name: "Tesla", color: "bg-red-600" },
		{ name: "Netflix", color: "bg-red-600" },
		{ name: "Samsung", color: "bg-blue-800" },
		{ name: "Nike", color: "bg-black" },
		{ name: "Coca Cola", color: "bg-red-600" },
		{ name: "McDonald's", color: "bg-yellow-500" },
	];

	return (
		<div className="flex min-h-[100dvh] flex-col">
			<header className={`sticky top-0 z-50 w-full backdrop-blur-lg transition-all duration-300 ${isScrolled ? "bg-background/80 shadow-sm border-b border-border/40" : "bg-transparent"}`}>
				<div className="container flex h-16 items-center justify-between">
					<div className="flex items-center gap-2 font-bold text-xl">
						<span>FinFlow</span>
					</div>

					<div className="hidden md:flex items-center gap-8">
						<Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
							Home
						</Link>
						<Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
							Pricing
						</Link>
						<Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
							Why To Use
						</Link>
					</div>

					<div className="flex items-center gap-4">
						<Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
							{mounted && theme === "dark" ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
							<span className="sr-only">Toggle theme</span>
						</Button>
						<div className="hidden md:flex gap-4 items-center">
							<Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
								로그인
							</Link>
							<Link href="/onboarding">
								<Button className="rounded-2xl bg-blue-600 hover:bg-blue-700">시작하기</Button>
							</Link>
						</div>
						<Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
							{mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
							<span className="sr-only">Toggle menu</span>
						</Button>
					</div>
				</div>

				{/* Mobile menu */}
				{mobileMenuOpen && (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						className="md:hidden absolute top-16 inset-x-0 bg-background/95 backdrop-blur-lg border-b"
					>
						<div className="container py-4 flex flex-col gap-4">
							<Link href="#" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
								Home
							</Link>
							<Link href="#" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
								Pricing
							</Link>
							<Link href="#" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
								Why To Use
							</Link>
							<hr className="border-border/40" />
							<Link href="#" className="py-2 text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
								로그인
							</Link>
							<Link href="/onboarding">
								<Button className="rounded-2xl bg-blue-600 hover:bg-blue-700" onClick={() => setMobileMenuOpen(false)}>
									시작하기
								</Button>
							</Link>
						</div>
					</motion.div>
				)}
			</header>

			<main className="flex-1">
				{/* Hero Section */}
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
												<path d="M5,50 L15,45 L25,40 L35,30 L45,35 L55,25 L65,20 L75,30 L85,25 L95,20 L95,60 L5,60 Z" fill="url(#portfolioGradient)" />
												<path d="M5,50 L15,45 L25,40 L35,30 L45,35 L55,25 L65,20 L75,30 L85,25 L95,20" stroke="#10b981" strokeWidth="2" fill="none" />
											</svg>
										</div>

										{/* Holdings */}
										<div className="space-y-3">
											<div className="flex justify-between items-center text-sm">
												<div className="flex items-center gap-2">
													<div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">A</div>
													<div>
														<div className="text-white font-medium">AAPL</div>
														<div className="text-gray-400 text-xs">10 shares</div>
													</div>
												</div>
												<div className="text-right">
													<div className="text-white">$1,735</div>
													<div className="text-green-400 text-xs">+2.1%</div>
												</div>
											</div>

											<div className="flex justify-between items-center text-sm">
												<div className="flex items-center gap-2">
													<div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-xs">T</div>
													<div>
														<div className="text-white font-medium">TSLA</div>
														<div className="text-gray-400 text-xs">5 shares</div>
													</div>
												</div>
												<div className="text-right">
													<div className="text-white">$1,240</div>
													<div className="text-red-400 text-xs">-1.5%</div>
												</div>
											</div>

											<div className="flex justify-between items-center text-sm">
												<div className="flex items-center gap-2">
													<div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs">M</div>
													<div>
														<div className="text-white font-medium">MSFT</div>
														<div className="text-gray-400 text-xs">8 shares</div>
													</div>
												</div>
												<div className="text-right">
													<div className="text-white">$2,680</div>
													<div className="text-green-400 text-xs">+0.8%</div>
												</div>
											</div>
										</div>
									</div>
								</div>

									{/* 세 번째 휴대폰 - 리스크 분석 화면 */}
									<div className="w-48 h-96 bg-black rounded-[2.5rem] border-4 border-gray-800 shadow-2xl flex-shrink-0">
									<div className="w-full h-full rounded-[1.5rem] bg-gradient-to-b from-gray-900 to-black p-3 overflow-hidden">
										{/* Status bar */}
										<div className="flex items-center justify-between mb-3 text-white text-xs">
											<div className="text-sm font-medium">9:41</div>
											<div className="w-4 h-2 border border-white/50 rounded-sm">
												<div className="w-2 h-1 bg-yellow-500 rounded-sm"></div>
											</div>
										</div>

										{/* Header */}
										<div className="text-center mb-4">
											<div className="text-white font-bold">리스크 분석</div>
											<div className="text-yellow-400 text-sm">중간 위험</div>
										</div>

										{/* Risk gauge */}
										<div className="flex justify-center mb-4">
											<div className="relative w-16 h-16">
												<svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 32 32">
													<circle cx="16" cy="16" r="12" stroke="#374151" strokeWidth="4" fill="none" />
													<circle cx="16" cy="16" r="12" stroke="#eab308" strokeWidth="4" fill="none" strokeDasharray="50.26" strokeDashoffset="12.56" strokeLinecap="round" />
												</svg>
												<div className="absolute inset-0 flex items-center justify-center">
													<span className="text-yellow-400 text-xs font-bold">75%</span>
												</div>
											</div>
										</div>

										{/* Risk metrics */}
										<div className="space-y-2 text-xs">
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
										<div className="mt-4 p-2 bg-yellow-500/10 border border-yellow-500/30 rounded text-xs">
											<div className="text-yellow-400 font-medium">⚠️ 알림</div>
											<div className="text-gray-300">테슬라 비중 재조정 필요</div>
										</div>
									</div>
									</div>
								</div>
							</div>

							{/* 데스크톱: 3개 휴대폰 나란히 배치 */}
							<div className="hidden lg:flex justify-center items-center gap-4 md:gap-8 perspective-1000">
								{/* 첫 번째 휴대폰 - 주식 차트 화면 */}
								<div className="w-48 h-96 bg-black rounded-[2.5rem] border-4 border-gray-800 shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-300">
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
								<div className="w-52 h-[28rem] bg-black rounded-[2.5rem] border-4 border-gray-800 shadow-2xl z-10 hover:scale-105 transition-transform duration-300">
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
												<path d="M5,50 L15,45 L25,40 L35,30 L45,35 L55,25 L65,20 L75,30 L85,25 L95,20 L95,60 L5,60 Z" fill="url(#portfolioGradient)" />
												<path d="M5,50 L15,45 L25,40 L35,30 L45,35 L55,25 L65,20 L75,30 L85,25 L95,20" stroke="#10b981" strokeWidth="2" fill="none" />
											</svg>
										</div>

										{/* Holdings */}
										<div className="space-y-3">
											<div className="flex justify-between items-center text-sm">
												<div className="flex items-center gap-2">
													<div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">A</div>
													<div>
														<div className="text-white font-medium">AAPL</div>
														<div className="text-gray-400 text-xs">10 shares</div>
													</div>
												</div>
												<div className="text-right">
													<div className="text-white">$1,735</div>
													<div className="text-green-400 text-xs">+2.1%</div>
												</div>
											</div>

											<div className="flex justify-between items-center text-sm">
												<div className="flex items-center gap-2">
													<div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-xs">T</div>
													<div>
														<div className="text-white font-medium">TSLA</div>
														<div className="text-gray-400 text-xs">5 shares</div>
													</div>
												</div>
												<div className="text-right">
													<div className="text-white">$1,240</div>
													<div className="text-red-400 text-xs">-1.5%</div>
												</div>
											</div>

											<div className="flex justify-between items-center text-sm">
												<div className="flex items-center gap-2">
													<div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs">M</div>
													<div>
														<div className="text-white font-medium">MSFT</div>
														<div className="text-gray-400 text-xs">8 shares</div>
													</div>
												</div>
												<div className="text-right">
													<div className="text-white">$2,680</div>
													<div className="text-green-400 text-xs">+0.8%</div>
												</div>
											</div>
										</div>
									</div>
								</div>

								{/* 세 번째 휴대폰 - 리스크 분석 화면 */}
								<div className="w-48 h-96 bg-black rounded-[2.5rem] border-4 border-gray-800 shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-300">
									<div className="w-full h-full rounded-[1.5rem] bg-gradient-to-b from-gray-900 to-black p-3 overflow-hidden">
										{/* Status bar */}
										<div className="flex items-center justify-between mb-3 text-white text-xs">
											<div className="text-sm font-medium">9:41</div>
											<div className="w-4 h-2 border border-white/50 rounded-sm">
												<div className="w-2 h-1 bg-yellow-500 rounded-sm"></div>
											</div>
										</div>

										{/* Header */}
										<div className="text-center mb-4">
											<div className="text-white font-bold">리스크 분석</div>
											<div className="text-yellow-400 text-sm">중간 위험</div>
										</div>

										{/* Risk gauge */}
										<div className="flex justify-center mb-4">
											<div className="relative w-16 h-16">
												<svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 32 32">
													<circle cx="16" cy="16" r="12" stroke="#374151" strokeWidth="4" fill="none" />
													<circle cx="16" cy="16" r="12" stroke="#eab308" strokeWidth="4" fill="none" strokeDasharray="50.26" strokeDashoffset="12.56" strokeLinecap="round" />
												</svg>
												<div className="absolute inset-0 flex items-center justify-center">
													<span className="text-yellow-400 text-xs font-bold">75%</span>
												</div>
											</div>
										</div>

										{/* Risk metrics */}
										<div className="space-y-2 text-xs">
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
										<div className="mt-4 p-2 bg-yellow-500/10 border border-yellow-500/30 rounded text-xs">
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

				{/* Feature Cards Section */}
				<section className="w-full py-20 md:py-32">
					<div className="container px-4 md:px-6">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5 }}
							className="flex flex-col items-center justify-center space-y-4 text-center mb-16"
						>
							<h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">
								AI 포트폴리오 관리,
								<br />
								투자자의 든든한 동반자
							</h2>
							<p className="max-w-[800px] text-muted-foreground md:text-lg text-balance">첨단 알고리즘과 실시간 분석을 통해 당신의 투자 포트폴리오를 보호하고 최적화합니다.</p>
						</motion.div>

						<motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
							{features.map((feature, i) => (
								<motion.div key={i} variants={item} whileHover={{ y: -5, transition: { duration: 0.2 } }} className="group">
									<Card className="h-full overflow-hidden border-border/40 bg-white dark:bg-gray-800/50 backdrop-blur transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 rounded-3xl">
										<CardContent className="p-6 sm:p-8 flex flex-col h-full text-center">
											<div className="size-14 sm:size-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white mb-4 sm:mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
												{feature.icon}
											</div>
											<h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-gray-100 leading-tight">{feature.title}</h3>
											<p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed flex-1 whitespace-pre-line">{feature.description}</p>
											<div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
												<div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
											</div>
										</CardContent>
									</Card>
								</motion.div>
							))}
						</motion.div>
					</div>
				</section>

				{/* Company Logos Section */}
				<section className="w-full py-20 md:py-32 bg-gray-50 dark:bg-gray-900/30 relative overflow-hidden">
					<div className="container px-4 md:px-6 relative">
						<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
							<div className="relative mx-auto max-w-4xl mb-12">
								<div className="flex flex-wrap justify-center items-center gap-6 md:gap-8 relative z-10">
									{companyLogos.map((logo, i) => (
										<motion.div
											key={logo.name}
											initial={{ opacity: 0, scale: 0.8 }}
											whileInView={{ opacity: 1, scale: 1 }}
											viewport={{ once: true }}
											transition={{ duration: 0.5, delay: i * 0.1 }}
											whileHover={{ scale: 1.05 }}
											className="group"
										>
											<div className={`size-16 md:size-20 rounded-2xl ${logo.color} flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-xl`}>
												<span className="text-white font-bold text-xs md:text-sm text-center leading-tight">
													{logo.name.length > 6
														? logo.name
																.split(" ")
																.map((word) => word.slice(0, 2))
																.join("")
														: logo.name}
												</span>
											</div>
										</motion.div>
									))}
								</div>

								{/* 장식적인 원형 궤도 */}
								<div className="absolute inset-0 z-0">
									<motion.div
										animate={{ rotate: 360 }}
										transition={{ duration: 120, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
										className="absolute inset-0 rounded-full border-2 border-blue-300/50 dark:border-blue-800/30"
										style={{ width: "120%", height: "120%", left: "-10%", top: "-10%" }}
									/>
									<motion.div
										animate={{ rotate: -360 }}
										transition={{ duration: 200, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
										className="absolute inset-0 rounded-full border-2 border-purple-300/50 dark:border-purple-800/20"
										style={{ width: "140%", height: "140%", left: "-20%", top: "-20%" }}
									/>
								</div>
							</div>

							<h2 className="text-2xl md:text-3xl font-bold mb-4 text-balance relative z-10">FinFlow와 함께하는 믿을 수 있는 투자</h2>
							<p className="text-muted-foreground md:text-lg max-w-2xl mx-auto text-balance mb-8 relative z-10">전 세계 주요 기업들의 주식을 포함한 다양한 자산군에서 최적의 포트폴리오를 구성하세요.</p>
							<Link href="/onboarding">
								<Button className="rounded-2xl bg-blue-600 hover:bg-blue-700 px-8 py-3 relative z-10">시작하기</Button>
							</Link>
						</motion.div>
					</div>
				</section>

				{/* Key Metrics Section */}
				<section className="w-full py-20 md:py-32">
					<div className="container px-4 md:px-6">
						<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-16">
							<h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-balance">검증된 성과</h2>
							<p className="text-muted-foreground md:text-lg max-w-2xl mx-auto text-balance">전 세계 투자자들이 신뢰하는 FinFlow의 실제 성과를 확인하세요.</p>
						</motion.div>

						<div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
							{[
								{ metric: "+50M", label: "Tasks & Scripts", caption: "다양한 투자 작업 처리" },
								{ metric: "+10M", label: "Monthly Users", caption: "월간 활성 사용자" },
								{ metric: "70%", label: "Regular Payouts", caption: "정기적 수익 실현" },
								{ metric: "+5,000", label: "Independent Artists", caption: "독립 전문가 네트워크" },
								{ metric: "50%", label: "Instant Leads", caption: "즉시 투자 기회 포착" },
								{ metric: "99%", label: "Conversion Rate", caption: "높은 투자 성공률" },
							].map((stat, i) => (
								<motion.div
									key={i}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.5, delay: i * 0.1 }}
									className="text-center bg-white/50 dark:bg-gray-800/30 p-4 sm:p-6 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50"
								>
									<div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-1 sm:mb-2">{stat.metric}</div>
									<div className="text-sm sm:text-base lg:text-lg font-semibold mb-0.5 sm:mb-1 text-gray-900 dark:text-gray-100">{stat.label}</div>
									<div className="text-xs sm:text-sm text-muted-foreground">{stat.caption}</div>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* Pricing Section */}
				<section className="w-full py-20 md:py-32 bg-gray-50 dark:bg-gray-900/30">
					<div className="container px-4 md:px-6">
						<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12">
							<h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-balance">One Plan, Total Access</h2>
							<p className="text-muted-foreground md:text-lg max-w-2xl mx-auto text-balance">모든 기능을 포함한 단일 요금제로 간편하게 시작하세요.</p>
						</motion.div>

						<div className="max-w-lg mx-auto">
							<Card className="overflow-hidden border-border/40 bg-white dark:bg-gray-800/50 backdrop-blur rounded-2xl shadow-lg">
								<CardContent className="p-8">
									<div className="text-center mb-8">
										<div className="text-5xl font-bold mb-2 text-gray-900 dark:text-gray-100">
											$19<span className="text-lg text-muted-foreground">/월</span>
										</div>
										<p className="text-muted-foreground">포트폴리오 리스크 관리에 필요한 모든 기능</p>
									</div>

									<ul className="space-y-4 mb-8">
										{[
											"실시간 리스크 감지 알림",
											"리밸런싱 제안",
											"백테스트 리포트 (수익률, MDD, 샤프 비율)",
											"시나리오 / 스트레스 테스팅",
											"CSV 파일 내보내기",
											"이메일 / 푸시 알림",
											"기본 고객 지원",
										].map((feature, i) => (
											<li key={i} className="flex items-center gap-3">
												<Check className="size-5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
												<span className="text-gray-700 dark:text-gray-300">{feature}</span>
											</li>
										))}
									</ul>

									<Button className="w-full rounded-2xl h-12 text-base bg-blue-600 hover:bg-blue-700">14일 무료 체험 시작하기</Button>
								</CardContent>
							</Card>
						</div>
					</div>
				</section>

				{/* FAQ Section */}
				<section className="w-full py-20 md:py-32">
					<div className="container px-4 md:px-6">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.5 }}
							className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
						>
							<h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">자주 묻는 질문</h2>
							<p className="max-w-[800px] text-muted-foreground md:text-lg text-balance">FinFlow 포트폴리오 리스크 관리 플랫폼에 대한 궁금한 점을 확인하세요.</p>
						</motion.div>

						<div className="mx-auto max-w-3xl">
							<Accordion type="single" collapsible className="w-full">
								{[
									{
										question: "내 데이터는 안전하게 보관되나요?",
										answer: "민감한 정보는 암호화되어 저장되며 접근이 최소화됩니다. 업계 표준 보안 관행을 따르고 금융 데이터 보호 규정을 준수합니다.",
									},
									{
										question: "무료 체험이 가능한가요?",
										answer: "네, 가입 후 14일간 모든 기능을 체험할 수 있습니다. 체험을 시작하는 데 신용카드는 필요하지 않습니다.",
									},
									{
										question: "어떤 시장을 지원하나요?",
										answer: "우선 미국과 한국의 주요 주식을 지원하며, 시간이 지남에 따라 더 많은 국제 시장과 자산군으로 확장할 예정입니다.",
									},
									{
										question: "알고리즘은 어떻게 작동하나요?",
										answer: "데이터 기반 학습 신호와 규칙 기반 검증을 결합합니다. 기술적인 아키텍처 세부사항은 기술 사용자를 위해 별도로 문서화되어 있습니다.",
									},
								].map((faq, i) => (
									<motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.05 }}>
										<AccordionItem value={`item-${i}`} className="border-b border-border/40 py-2">
											<AccordionTrigger className="text-left font-medium hover:no-underline">{faq.question}</AccordionTrigger>
											<AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
										</AccordionItem>
									</motion.div>
								))}
							</Accordion>
						</div>
					</div>
				</section>
			</main>

			{/* Footer */}
			<footer className="w-full border-t bg-background/95 backdrop-blur-sm">
				<div className="container flex flex-col gap-8 px-4 py-10 md:px-6 lg:py-16">
					<div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
						<div className="space-y-4">
							<div className="flex items-center gap-2 font-bold">
								<span>FinFlow</span>
							</div>
							<p className="text-sm text-muted-foreground">현대적인 포트폴리오 리스크 관리를 위한 미니멀 웹 앱입니다.</p>
						</div>
						<div className="space-y-4">
							<h4 className="text-sm font-bold">Company</h4>
							<ul className="space-y-2 text-sm">
								<li>
									<Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
										회사소개
									</Link>
								</li>
								<li>
									<Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
										채용정보
									</Link>
								</li>
								<li>
									<Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
										문의하기
									</Link>
								</li>
							</ul>
						</div>
						<div className="space-y-4">
							<h4 className="text-sm font-bold">Downloads</h4>
							<ul className="space-y-2 text-sm">
								<li>
									<Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
										기능소개
									</Link>
								</li>
								<li>
									<Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
										요금안내
									</Link>
								</li>
								<li>
									<Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
										API
									</Link>
								</li>
							</ul>
						</div>
						<div className="space-y-4">
							<h4 className="text-sm font-bold">Resources</h4>
							<ul className="space-y-2 text-sm">
								<li>
									<Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
										문서
									</Link>
								</li>
								<li>
									<Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
										지원
									</Link>
								</li>
								<li>
									<Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
										블로그
									</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className="flex flex-col gap-4 sm:flex-row justify-between items-center border-t border-border/40 pt-8">
						<p className="text-xs text-muted-foreground">© 2025 FinFlow. All rights reserved.</p>
						<p className="text-xs text-muted-foreground">본 서비스는 투자 조언을 제공하지 않습니다. 정보는 참고용이며, 투자 결정에 대한 책임은 사용자에게 있습니다.</p>
					</div>
				</div>
			</footer>
		</div>
	);
}
