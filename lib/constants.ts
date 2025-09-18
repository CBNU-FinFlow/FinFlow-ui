// lib/constants.ts
/**
 * 차트 색상 팔레트
 */
export const CHART_COLORS = [
	"#3B82F6", // Blue
	"#10B981", // Green
	"#8B5CF6", // Purple
	"#F59E0B", // Yellow
	"#EF4444", // Red
	"#06B6D4", // Cyan
	"#84CC16", // Lime
	"#F97316", // Orange
	"#EC4899", // Pink
	"#6366F1", // Indigo
];

/**
 * API 엔드포인트
 */
export const API_ENDPOINTS = {
	PREDICT: "/predict",
	EXPLAIN: "/explain",
	HISTORICAL_PERFORMANCE: "/historical_performance",
	CORRELATION: "/correlation",
	RISK_RETURN: "/risk_return",
	MARKET_STATUS: "/api/market-status",
};

/**
 * 분석 모드
 */
export const ANALYSIS_MODES = {
	FAST: "fast",
	ACCURATE: "accurate",
} as const;

/**
 * 분석 단계 시간 설정 (ms)
 */
export const ANALYSIS_STEP_MIN_DELAY = 1500;