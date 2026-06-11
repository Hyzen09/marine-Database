import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // 1. Block access to Mary Geoise
    // Because Next.js maps folders directly, the path will be /api/mary-geoise
    if (request.nextUrl.pathname === '/api/mary-geoise') {
        return NextResponse.json(
            { message: "unauthorised" },
            { status: 401 }
        );
    }

    // 2. Performance Profiler (Den Den Mushi Ping)
    const startTime = performance.now();

    // Let the request continue to its intended route handler
    const response = NextResponse.next();

    // Convert milliseconds delta to match your Python execution time format
    const timeTaken = (performance.now() - startTime) / 1000;

    // Set custom tracking response headers
    response.headers.set('X-Den-Den-Mushi-Ping', timeTaken.toString());

    return response;
}

export const config = {
    matcher: '/api/:path*',
};