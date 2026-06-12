import type { APIRoute } from 'astro';
import { sql } from '../../lib/db';

export const prerender = false;

export const GET: APIRoute = async () => {
  const rows = (await sql`
    SELECT place, count(*)::int AS n
    FROM signups
    GROUP BY place
    ORDER BY n DESC, place
  `) as { place: string; n: number }[];

  const total = rows.reduce((sum, r) => sum + r.n, 0);

  return new Response(JSON.stringify({ total, places: rows }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  });
};
