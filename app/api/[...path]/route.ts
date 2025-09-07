import { NextRequest, NextResponse } from "next/server";

const PY_BASE = process.env.NEXT_PUBLIC_PYTHON_SERVER_URL ?? "http://localhost:8000";

const passHeaders = (req: NextRequest) => {
	const headers = new Headers();
	headers.set("Accept", "application/json");
	const ct = req.headers.get("content-type");
	if (ct) headers.set("Content-Type", ct);
	return headers;
};

async function forward(req: NextRequest, method: string, path: string[]) {
	const url = `${PY_BASE}/${path.join("/")}${req.nextUrl.search ?? ""}`;
	const init: RequestInit = { method, headers: passHeaders(req) };
	if (method !== "GET" && method !== "HEAD") init.body = await req.text();

	try {
		const res = await fetch(url, init);
		const text = await res.text();

		const nres = new NextResponse(text, { status: res.status });
		const resCT = res.headers.get("Content-Type");
		if (resCT) nres.headers.set("Content-Type", resCT);
		return nres;
	} catch (error: any) {
		console.error(`[API Proxy] Error forwarding to ${url}:`, error?.message || error);
		return NextResponse.json(
			{ error: "Backend server unavailable", detail: error?.message || "Connection failed" },
			{ status: 502 }
		);
	}
}

export async function GET(req: NextRequest, ctx: { params: { path: string[] } }) {
	return forward(req, "GET", ctx.params.path);
}

export async function POST(req: NextRequest, ctx: { params: { path: string[] } }) {
	return forward(req, "POST", ctx.params.path);
}

export async function PUT(req: NextRequest, ctx: { params: { path: string[] } }) {
	return forward(req, "PUT", ctx.params.path);
}

export async function DELETE(req: NextRequest, ctx: { params: { path: string[] } }) {
	return forward(req, "DELETE", ctx.params.path);
}