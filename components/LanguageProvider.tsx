"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'ko' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  ko: {
    // Navigation
    home: '홈',
    faq: 'FAQ',
    
    // Common
    finflow: 'FinFlow',
    aiInvestment: 'AI 투자',
    
    // Theme
    toggleTheme: '테마 변경',
    
    // Language
    toggleLanguage: '언어 변경',
    korean: '한국어',
    english: 'English',
    
    // Buttons and Actions
    search: '검색',
    notifications: '알림',
    profile: '프로필',
    
    // Analysis
    analysis: '분석',
    portfolio: '포트폴리오',
    performance: '성과',
    risk: '위험도',
    
    // Status
    loading: '로딩 중...',
    error: '오류',
    success: '성공',
    
    // Common phrases
    welcome: '환영합니다',
    getStarted: '시작하기',
    learnMore: '자세히 보기',
    
    // Investment styles
    conservative: '보수적',
    moderate: '보통',
    aggressive: '적극적',
    conservativeDesc: '보수적 - 안정성 중심',
    moderateDesc: '보통 - 균형잡힌 위험-수익',
    aggressiveDesc: '적극적 - 고수익 추구',
    investmentStyle: '투자 성향',
    
    // Investment periods
    shortTerm: '단기 ({months}개월)',
    shortMidTerm: '중단기 ({months}개월)',
    midTerm: '중기 ({months}개월)',
    midLongTerm: '중장기 ({months}개월)',
    longTerm: '장기 ({months}개월)',
    
    // Home page
    homeTitle: 'AI 기반 스마트 투자 플랫폼',
    homeSubtitle: '인공지능이 분석하는 개인 맞춤형 포트폴리오로 더 스마트한 투자를 시작하세요',
    realTimeAnalysis: '실시간 분석',
    investmentAmount: '투자 금액',
    riskProfile: '투자 성향',
    investmentPeriod: '투자 기간',
    aiAnalyzing: 'AI 분석 중...',
    startAiAnalysis: 'AI 포트폴리오 분석 시작',
    learnMoreDetailed: '더 자세히 알아보기',
    aiTechnology: 'AI 기술',
    howItWorks: '어떻게 작동하나요?',
    howItWorksDesc: '최신 강화학습 알고리즘이 시장 데이터를 실시간으로 분석하여 개인 맞춤형 포트폴리오 전략을 제안합니다.',
    dataCollectionAnalysis: '데이터 수집 & 분석',
    dataCollectionDesc: '250개 이상의 종목 데이터와 기술적 지표를 실시간으로 수집하고 분석합니다.',
    aiLearningOptimization: 'AI 학습 & 최적화',
    aiLearningDesc: 'PPO 강화학습 알고리즘이 시장 환경에 적응하며 최적 전략을 학습합니다.',
    customPortfolio: '맞춤형 포트폴리오',
    customPortfolioDesc: '개인의 투자 성향과 목표에 맞는 최적화된 포트폴리오를 제안합니다.',
    footerText: '© 2025 FinFlow. 강화학습 기반 포트폴리오 최적화 플랫폼입니다.',
    
    // Additional UI texts
    aiAnalysisInProgress: 'AI 분석 진행 중',
    estimatedTime: '예상 소요 시간: 약 5-7초',
    analysisComplete: '분석 완료!',
    portfolioReady: '맞춤형 포트폴리오가 준비되었습니다.',
    aiPortfolioAnalysis: 'AI 포트폴리오 분석',
    enterInfoToStart: '투자 정보를 입력하고 분석을 시작해주세요.',
    analysisStocks: '분석 종목',
    satisfaction: '만족도',
    
    // Analysis loading steps
    marketDataCollection: '시장 데이터 수집',
    marketDataDesc: '실시간 주식 데이터와 시장 지표를 수집하고 있습니다.',
    technicalIndicators: '기술적 지표 계산',
    technicalIndicatorsDesc: 'RSI, MACD, 볼린저 밴드 등 기술적 지표를 계산하고 있습니다.',
    riskModelAnalysis: '리스크 모델 분석',
    riskModelDesc: '포트폴리오 리스크와 변동성을 분석하고 있습니다.',
    aiModelInference: 'AI 모델 추론',
    aiModelDesc: '강화학습 모델을 통해 최적 포트폴리오를 계산하고 있습니다.',
    portfolioOptimizationStep: '포트폴리오 최적화',
    portfolioOptimizationStepDesc: '투자 전략과 자산 배분을 최적화하고 있습니다.',
    aiAnalysisTitle: 'AI 포트폴리오 분석',
    analyzingAmount: '투자 금액 {amount}원을 분석하고 있습니다.',
    smartAnalysis: '스마트 분석',
    smartAnalysisDesc: 'AI가 시장 데이터를 실시간으로 분석하여 최적의 투자 기회를 찾아드립니다',
    riskManagement: '리스크 관리',
    riskManagementDesc: '개인의 투자 성향에 맞는 리스크 수준으로 안전한 투자를 지원합니다',
    portfolioOptimization: '포트폴리오 최적화',
    portfolioOptimizationDesc: '다양한 자산 배분을 통해 수익을 극대화하고 리스크를 최소화합니다',
    
    // Analysis page
    analysisTitle: '포트폴리오 분석',
    analysisSubtitle: 'AI가 분석한 당신의 투자 포트폴리오 성과를 확인해보세요',
    marketStatus: '시장 현황',
    totalValue: '총 자산 가치',
    todayChange: '오늘 변동',
    totalReturn: '총 수익률',
    riskLevel: '위험 수준',
    correlationAnalysis: '상관관계 분석',
    performanceChart: '성과 차트',
    riskReturn: '위험-수익 분석',
    
    // XAI Section
    xaiTitle: 'AI 설명',
    xaiSubtitle: 'AI가 이 분석 결과를 도출한 이유를 설명합니다',
    keyFactors: '주요 요인',
    recommendation: '추천 사항',
    
    // Market Status
    marketOpen: '시장 개장',
    marketClosed: '시장 폐장',
    preMarket: '장전 거래',
    afterHours: '시간외 거래',
    
    // FAQ page
    faqTitle: '자주 묻는 질문',
    faqSubtitle: 'FinFlow에 대해 궁금한 점들을 확인해보세요',
    
    // Error states
    failedToLoad: '데이터를 불러오는데 실패했습니다',
    retry: '다시 시도',
    noData: '데이터가 없습니다',
    enterValidAmount: '유효한 투자 금액을 입력해주세요.',
    completePortfolioFirst: '먼저 포트폴리오 분석을 완료해주세요.',
    xaiAnalysisFailed: 'XAI 분석에 실패했습니다. 다시 시도해주세요.',
    
    // Time periods
    oneDay: '1일',
    oneWeek: '1주',
    oneMonth: '1개월',
    threeMonths: '3개월',
    sixMonths: '6개월',
    oneYear: '1년',
    
    // Units
    percentage: '퍼센트',
    currency: '원',
    months: '개월',
    
    // Position details
    currentPrice: '현재가',
    change: '변동',
    volume: '거래량',
    marketCap: '시가총액',
    
    // Performance metrics
    sharpeRatio: '샤프 비율',
    volatility: '변동성',
    maxDrawdown: '최대 낙폭',
    beta: '베타',
    alpha: '알파',
    
    // Analysis results page
    'analysis.results.title': 'AI 포트폴리오 분석 결과',
    'analysis.results.backToHome': '홈으로 돌아가기',
    'analysis.results.analysisComplete': '분석 완료',
    'analysis.results.reanalyze': '재분석',
    'analysis.results.preparingResults': '결과를 준비하고 있습니다..',
    
    // Risk types
    'analysis.riskTypes.conservative': '안전형',
    'analysis.riskTypes.moderate': '중간형', 
    'analysis.riskTypes.aggressive': '공격형',
    
    // Horizon types
    'analysis.horizonTypes.short': '단기 (6개월 이하)',
    'analysis.horizonTypes.medium': '중기 (2년 이하)',
    'analysis.horizonTypes.long': '장기 (2년 이상)',
    
    // XAI explanations
    'analysis.xai.portfolioExplanation': '이 포트폴리오는',
    'analysis.xai.portfolioConstructed': '투자 성향에 맞춰 구성되었다.',
    'analysis.xai.keyFactors': '주요 선택 요인',
    'analysis.xai.techFocusedStrategy': '기술주 중심의 성장 전략 (65.2%)',
    'analysis.xai.appropriateRiskDispersion': '적정 수준의 위험 분산',
    'analysis.xai.highLiquiditySecured': '높은 유동성 확보',
    'analysis.xai.appleAndMicrosoftHighWeight': '특히 Apple(18.2%)과 Microsoft(16.8%)의 비중이 높은 것은 안정적인 수익성과 지속적인 성장 가능성을 고려한 결과다.',
    'analysis.xai.macdAndRsiStrongBuySignal': 'MACD와 RSI 지표가 강한 매수 신호를 보였으며, 높은 거래량과 함께 상승 모멘텀이 확인되었다.',
    
    // Portfolio metrics
    'analysis.metrics.informationRatio': '정보 비율',
    'analysis.metrics.treynorRatio': '트레이너 비율', 
    'analysis.metrics.correlationCoefficient': '상관계수',
    'analysis.metrics.var': 'VaR (1일)',
    'analysis.metrics.vsBenchmark': 'vs 벤치마크',
    'analysis.metrics.riskAdjusted': '리스크 조정',
    'analysis.metrics.dispersion': '분산도',
    'analysis.metrics.confidenceInterval': '95% 신뢰구간',
    'analysis.metrics.excellent': '우수',
    'analysis.metrics.appropriate': '적정',
    
    // Portfolio overview
    'analysis.overview.investmentStrategy': '투자 전략 요약',
    'analysis.overview.aiOptimalStrategy': 'AI가 분석한 최적 투자 전략',
    'analysis.overview.investmentInfo': '투자 정보',
    'analysis.overview.investmentAmount': '투자 금액',
    'analysis.overview.investmentTendency': '투자 성향',
    'analysis.overview.investmentPeriod': '투자 기간',
    'analysis.overview.expectedPerformance': '예상 성과',
    'analysis.overview.annualReturn': '연간 수익률',
    'analysis.overview.expectedProfit': '예상 수익금',
    'analysis.overview.winRate': '승률',
    'analysis.overview.riskManagement': '리스크 관리',
    'analysis.overview.maxDrawdown': '최대 낙폭',
    'analysis.overview.volatility': '변동성',
    'analysis.overview.sharpeRatio': '샤프 비율',
    
    // Tabs
    'analysis.tabs.portfolioOverview': '포트폴리오 개요',
    'analysis.tabs.detailedAnalysis': '상세 분석',
    'analysis.tabs.aiExplanation': 'AI 설명',
    
    // Sector and regional diversification
    'analysis.diversification.sectorDiversification': '섹터 분산',
    'analysis.diversification.sectorDescription': '업종별 투자 비중 및 리스크 분산',
    'analysis.diversification.regionalDiversification': '지역 분산',
    'analysis.diversification.regionalDescription': '지역별 투자 비중 및 통화 노출',
    'analysis.diversification.stocks': '종목',
    'analysis.diversification.tech': '기술주',
    'analysis.diversification.consumer': '소비재',
    'analysis.diversification.healthcare': '헬스케어',
    'analysis.diversification.others': '기타',
    'analysis.diversification.highGrowth': '고성장',
    'analysis.diversification.stability': '안정성',
    'analysis.diversification.defensive': '방어적',
    'analysis.diversification.diversification': '분산',
    'analysis.diversification.usa': '미국',
    'analysis.diversification.korea': '한국',
    'analysis.diversification.europe': '유럽',
    'analysis.diversification.currencyHedgeStrategy': '통화 헤지 전략',
    'analysis.diversification.usdHedgeRatio': 'USD 헤지 비율',
    'analysis.diversification.currencyRisk': '통화 리스크',
    'analysis.diversification.hedgeCost': '헤지 비용',
    'analysis.diversification.medium': '중간',
    'analysis.diversification.annual': '연',
    
    // Loading page additional translations
    'analysisProgress': '분석 진행률',
    'redirectingToResults': '결과 페이지로 이동합니다...',
    'autoRedirectMessage': '분석이 완료되면 자동으로 결과 페이지로 이동합니다.',
    'preparingAnalysis': '분석을 준비하고 있습니다...',
  },
  en: {
    // Navigation
    home: 'Home',
    faq: 'FAQ',
    
    // Common
    finflow: 'FinFlow',
    aiInvestment: 'AI Investment',
    
    // Theme
    toggleTheme: 'Toggle Theme',
    
    // Language
    toggleLanguage: 'Change Language',
    korean: '한국어',
    english: 'English',
    
    // Buttons and Actions
    search: 'Search',
    notifications: 'Notifications',
    profile: 'Profile',
    
    // Analysis
    analysis: 'Analysis',
    portfolio: 'Portfolio',
    performance: 'Performance',
    risk: 'Risk',
    
    // Status
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    
    // Common phrases
    welcome: 'Welcome',
    getStarted: 'Get Started',
    learnMore: 'Learn More',
    
    // Investment styles
    conservative: 'Conservative',
    moderate: 'Moderate',
    aggressive: 'Aggressive',
    conservativeDesc: 'Conservative - Stability Focused',
    moderateDesc: 'Moderate - Balanced Risk-Return',
    aggressiveDesc: 'Aggressive - High Return Pursuit',
    investmentStyle: 'Investment Style',
    
    // Investment periods
    shortTerm: 'Short-term ({months} months)',
    shortMidTerm: 'Short-Mid term ({months} months)',
    midTerm: 'Mid-term ({months} months)',
    midLongTerm: 'Mid-Long term ({months} months)',
    longTerm: 'Long-term ({months} months)',
    
    // Home page
    homeTitle: 'AI-Powered Smart Investment Platform',
    homeSubtitle: 'Start smarter investing with personalized portfolios analyzed by artificial intelligence',
    realTimeAnalysis: 'Real-time Analysis',
    investmentAmount: 'Investment Amount',
    riskProfile: 'Risk Profile',
    investmentPeriod: 'Investment Period',
    aiAnalyzing: 'AI Analyzing...',
    startAiAnalysis: 'Start AI Portfolio Analysis',
    learnMoreDetailed: 'Learn More in Detail',
    aiTechnology: 'AI Technology',
    howItWorks: 'How Does It Work?',
    howItWorksDesc: 'Advanced reinforcement learning algorithms analyze market data in real-time to suggest personalized portfolio strategies.',
    dataCollectionAnalysis: 'Data Collection & Analysis',
    dataCollectionDesc: 'Collect and analyze over 250 stock data and technical indicators in real-time.',
    aiLearningOptimization: 'AI Learning & Optimization',
    aiLearningDesc: 'PPO reinforcement learning algorithms adapt to market environments and learn optimal strategies.',
    customPortfolio: 'Custom Portfolio',
    customPortfolioDesc: 'Suggest optimized portfolios tailored to individual investment preferences and goals.',
    footerText: '© 2025 FinFlow. Reinforcement learning-based portfolio optimization platform.',
    
    // Additional UI texts
    aiAnalysisInProgress: 'AI Analysis in Progress',
    estimatedTime: 'Estimated time: about 5-7 seconds',
    analysisComplete: 'Analysis Complete!',
    portfolioReady: 'Your custom portfolio is ready.',
    aiPortfolioAnalysis: 'AI Portfolio Analysis',
    enterInfoToStart: 'Enter investment information and start analysis.',
    analysisStocks: 'Analysis Stocks',
    satisfaction: 'Satisfaction',
    
    // Analysis loading steps
    marketDataCollection: 'Market Data Collection',
    marketDataDesc: 'Collecting real-time stock data and market indicators.',
    technicalIndicators: 'Technical Indicators Calculation',
    technicalIndicatorsDesc: 'Calculating technical indicators such as RSI, MACD, Bollinger Bands.',
    riskModelAnalysis: 'Risk Model Analysis',
    riskModelDesc: 'Analyzing portfolio risk and volatility.',
    aiModelInference: 'AI Model Inference',
    aiModelDesc: 'Calculating optimal portfolio through reinforcement learning model.',
    portfolioOptimizationStep: 'Portfolio Optimization',
    portfolioOptimizationStepDesc: 'Optimizing investment strategy and asset allocation.',
    aiAnalysisTitle: 'AI Portfolio Analysis',
    analyzingAmount: 'Analyzing investment amount of ${amount}.',
    smartAnalysis: 'Smart Analysis',
    smartAnalysisDesc: 'AI analyzes market data in real-time to find optimal investment opportunities',
    riskManagement: 'Risk Management',
    riskManagementDesc: 'Support safe investing with risk levels tailored to individual investment preferences',
    portfolioOptimization: 'Portfolio Optimization',
    portfolioOptimizationDesc: 'Maximize returns and minimize risks through diversified asset allocation',
    
    // Analysis page
    analysisTitle: 'Portfolio Analysis',
    analysisSubtitle: 'Check the performance of your investment portfolio analyzed by AI',
    marketStatus: 'Market Status',
    totalValue: 'Total Asset Value',
    todayChange: "Today's Change",
    totalReturn: 'Total Return',
    riskLevel: 'Risk Level',
    correlationAnalysis: 'Correlation Analysis',
    performanceChart: 'Performance Chart',
    riskReturn: 'Risk-Return Analysis',
    
    // XAI Section
    xaiTitle: 'AI Explanation',
    xaiSubtitle: 'AI explains why this analysis result was derived',
    keyFactors: 'Key Factors',
    recommendation: 'Recommendation',
    
    // Market Status
    marketOpen: 'Market Open',
    marketClosed: 'Market Closed',
    preMarket: 'Pre-Market',
    afterHours: 'After Hours',
    
    // FAQ page
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Check out common questions about FinFlow',
    
    // Error states
    failedToLoad: 'Failed to load data',
    retry: 'Retry',
    noData: 'No data available',
    enterValidAmount: 'Please enter a valid investment amount.',
    completePortfolioFirst: 'Please complete portfolio analysis first.',
    xaiAnalysisFailed: 'XAI analysis failed. Please try again.',
    
    // Time periods
    oneDay: '1D',
    oneWeek: '1W',
    oneMonth: '1M',
    threeMonths: '3M',
    sixMonths: '6M',
    oneYear: '1Y',
    
    // Units
    percentage: 'Percent',
    currency: 'USD',
    months: ' months',
    
    // Position details
    currentPrice: 'Current Price',
    change: 'Change',
    volume: 'Volume',
    marketCap: 'Market Cap',
    
    // Performance metrics
    sharpeRatio: 'Sharpe Ratio',
    volatility: 'Volatility',
    maxDrawdown: 'Max Drawdown',
    beta: 'Beta',
    alpha: 'Alpha',
    
    // Analysis results page
    'analysis.results.title': 'AI Portfolio Analysis Results',
    'analysis.results.backToHome': 'Back to Home',
    'analysis.results.analysisComplete': 'Analysis Complete',
    'analysis.results.reanalyze': 'Re-analyze',
    'analysis.results.preparingResults': 'Preparing results...',
    
    // Risk types
    'analysis.riskTypes.conservative': 'Conservative',
    'analysis.riskTypes.moderate': 'Moderate', 
    'analysis.riskTypes.aggressive': 'Aggressive',
    
    // Horizon types
    'analysis.horizonTypes.short': 'Short-term (6 months or less)',
    'analysis.horizonTypes.medium': 'Medium-term (2 years or less)',
    'analysis.horizonTypes.long': 'Long-term (2+ years)',
    
    // XAI explanations
    'analysis.xai.portfolioExplanation': 'This portfolio is',
    'analysis.xai.portfolioConstructed': 'constructed to match your investment style.',
    'analysis.xai.keyFactors': 'Key Selection Factors',
    'analysis.xai.techFocusedStrategy': 'Tech-focused growth strategy (65.2%)',
    'analysis.xai.appropriateRiskDispersion': 'Appropriate level of risk diversification',
    'analysis.xai.highLiquiditySecured': 'High liquidity secured',
    'analysis.xai.appleAndMicrosoftHighWeight': 'The high weightings of Apple (18.2%) and Microsoft (16.8%) are based on their stable profitability and continuous growth potential.',
    'analysis.xai.macdAndRsiStrongBuySignal': 'MACD and RSI indicators showed strong buy signals, with upward momentum confirmed alongside high trading volume.',
    
    // Portfolio metrics
    'analysis.metrics.informationRatio': 'Information Ratio',
    'analysis.metrics.treynorRatio': 'Treynor Ratio',
    'analysis.metrics.correlationCoefficient': 'Correlation Coefficient',
    'analysis.metrics.var': 'VaR (1 Day)',
    'analysis.metrics.vsBenchmark': 'vs Benchmark',
    'analysis.metrics.riskAdjusted': 'Risk-Adjusted',
    'analysis.metrics.dispersion': 'Dispersion',
    'analysis.metrics.confidenceInterval': '95% Confidence Interval',
    'analysis.metrics.excellent': 'Excellent',
    'analysis.metrics.appropriate': 'Appropriate',
    
    // Portfolio overview
    'analysis.overview.investmentStrategy': 'Investment Strategy Summary',
    'analysis.overview.aiOptimalStrategy': 'AI-analyzed optimal investment strategy',
    'analysis.overview.investmentInfo': 'Investment Information',
    'analysis.overview.investmentAmount': 'Investment Amount',
    'analysis.overview.investmentTendency': 'Investment Style',
    'analysis.overview.investmentPeriod': 'Investment Period',
    'analysis.overview.expectedPerformance': 'Expected Performance',
    'analysis.overview.annualReturn': 'Annual Return',
    'analysis.overview.expectedProfit': 'Expected Profit',
    'analysis.overview.winRate': 'Win Rate',
    'analysis.overview.riskManagement': 'Risk Management',
    'analysis.overview.maxDrawdown': 'Max Drawdown',
    'analysis.overview.volatility': 'Volatility',
    'analysis.overview.sharpeRatio': 'Sharpe Ratio',
    
    // Tabs
    'analysis.tabs.portfolioOverview': 'Portfolio Overview',
    'analysis.tabs.detailedAnalysis': 'Detailed Analysis',
    'analysis.tabs.aiExplanation': 'AI Explanation',
    
    // Sector and regional diversification
    'analysis.diversification.sectorDiversification': 'Sector Diversification',
    'analysis.diversification.sectorDescription': 'Investment allocation by sector and risk diversification',
    'analysis.diversification.regionalDiversification': 'Regional Diversification',
    'analysis.diversification.regionalDescription': 'Regional investment allocation and currency exposure',
    'analysis.diversification.stocks': 'Stocks',
    'analysis.diversification.tech': 'Technology',
    'analysis.diversification.consumer': 'Consumer Goods',
    'analysis.diversification.healthcare': 'Healthcare',
    'analysis.diversification.others': 'Others',
    'analysis.diversification.highGrowth': 'High Growth',
    'analysis.diversification.stability': 'Stability',
    'analysis.diversification.defensive': 'Defensive',
    'analysis.diversification.diversification': 'Diversification',
    'analysis.diversification.usa': 'United States',
    'analysis.diversification.korea': 'Korea',
    'analysis.diversification.europe': 'Europe',
    'analysis.diversification.currencyHedgeStrategy': 'Currency Hedge Strategy',
    'analysis.diversification.usdHedgeRatio': 'USD Hedge Ratio',
    'analysis.diversification.currencyRisk': 'Currency Risk',
    'analysis.diversification.hedgeCost': 'Hedge Cost',
    'analysis.diversification.medium': 'Medium',
    'analysis.diversification.annual': 'Annual',
    
    // Loading page additional translations
    'analysisProgress': 'Analysis Progress',
    'redirectingToResults': 'Redirecting to results...',
    'autoRedirectMessage': 'You will be automatically redirected to the results page when analysis is complete.',
    'preparingAnalysis': 'Preparing analysis...',
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('ko'); // 한국어가 기본값

  useEffect(() => {
    // 로컬 스토리지에서 언어 설정 불러오기
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'ko' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage: Language = language === 'ko' ? 'en' : 'ko';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
