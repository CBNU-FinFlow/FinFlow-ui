// lib/config.ts
export const config = {
	apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000/api",
	timeoutMs: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT ?? "30000", 10),
} as const;

export async function fetchWithTimeout(url: string, init: RequestInit = {}, timeoutMs = config.timeoutMs) {
	const controller = new AbortController();
	const id = setTimeout(() => controller.abort(), timeoutMs);
	try {
		return await fetch(url, { ...init, signal: controller.signal });
	} finally {
		clearTimeout(id);
	}
}

export async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
	const url = endpoint.startsWith("/") ? `${config.apiBaseUrl}${endpoint}` : `${config.apiBaseUrl}/${endpoint}`;
	const res = await fetchWithTimeout(url, {
		headers: { "Accept": "application/json", "Content-Type": "application/json" },
		...options,
	});
	if (!res.ok) {
		const text = await res.text().catch(() => "");
		throw new Error(`API ${res.status} ${res.statusText} - ${text}`);
	}
	return res.json() as Promise<T>;
}

export async function apiCallWithRetry<T>(endpoint: string, options: RequestInit = {}, maxRetries = 3): Promise<T> {
	let lastErr: unknown;
	for (let i = 0; i < maxRetries; i++) {
		try {
			return await apiCall<T>(endpoint, options);
		} catch (err) {
			lastErr = err;
			if (i < maxRetries - 1) {
				const backoff = Math.min(1000 * 2 ** i, 5000);
				await new Promise(r => setTimeout(r, backoff));
			}
		}
	}
	throw lastErr;
}

