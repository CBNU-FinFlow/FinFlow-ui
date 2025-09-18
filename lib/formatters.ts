// lib/formatters.ts
/**
 * 통화 포맷팅 함수
 */
export const formatCurrency = (amount: number): string => {
	return new Intl.NumberFormat("ko-KR", {
		style: "currency",
		currency: "KRW",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(amount);
};

/**
 * 퍼센트 포맷팅 함수
 */
export const formatPercent = (value: number): string => {
	return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
};

/**
 * 날짜 포맷팅 함수
 */
export const formatDate = (dateString: string): string => {
	return new Date(dateString).toLocaleDateString("ko-KR");
};

/**
 * 위험도 라벨 반환 함수
 */
export const getRiskLabel = (risk: string): string => {
	const riskNum = Number(risk);
	if (riskNum <= 3) return "안전형";
	if (riskNum <= 6) return "중간형";
	return "공격형";
};

/**
 * 투자 기간 라벨 반환 함수
 */
export const getHorizonLabel = (horizon: string): string => {
	const horizonNum = Number(horizon);
	if (horizonNum <= 12) return "단기 (1년 이하)";
	if (horizonNum <= 60) return "중기 (5년 이하)";
	return "장기 (5년 이상)";
};