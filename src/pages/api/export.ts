import type { APIRoute } from 'astro';
import { timingSafeEqual } from 'node:crypto';
import { sql } from '../../lib/db';

export const prerender = false;

function tokenMatches(provided: string, expected: string): boolean {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export const GET: APIRoute = async ({ request, url }) => {
  const expected =
    process.env.ADMIN_EXPORT_TOKEN ?? import.meta.env.ADMIN_EXPORT_TOKEN ?? '';
  const provided =
    request.headers.get('authorization')?.replace(/^Bearer\s+/i, '') ??
    url.searchParams.get('token') ??
    '';

  if (!expected || !tokenMatches(provided, expected)) {
    return new Response('Unauthorized', { status: 401 });
  }

  const rows = (await sql`
    SELECT email, first_name, place, public_ok, created_at
    FROM signups ORDER BY created_at
  `) as Record<string, unknown>[];

  const esc = (v: unknown) => `"${String(v ?? '').replaceAll('"', '""')}"`;
  const csv = [
    'email,first_name,place,public_ok,created_at',
    ...rows.map((r) =>
      [r.email, r.first_name, r.place, r.public_ok, r.created_at]
        .map(esc)
        .join(',')
    ),
  ].join('\n');

  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="signups.csv"',
      'Cache-Control': 'no-store',
    },
  });
};
