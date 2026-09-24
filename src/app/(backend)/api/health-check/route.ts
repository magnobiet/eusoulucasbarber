import { NextResponse } from 'next/server';

interface HealthCheckResponse {
  healthy: boolean;
}

export async function GET(): Promise<NextResponse<HealthCheckResponse>> {
  return NextResponse.json({ healthy: true });
}
