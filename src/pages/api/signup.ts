import type { APIRoute } from 'astro';
import { createHash } from 'node:crypto';
import { sql } from '../../lib/db';
import { isPlace } from '../../lib/places';

export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_PER_IP_PER_HOUR = 5;

export const POST: APIRoute = async ({ request, redirect, clientAddress }) => {
  try {
    const form = await request.formData();

    // Honeypot: bots fill the hidden field; pretend success and discard.
    if (String(form.get('website') ?? '') !== '') {
      return redirect('/join/?joined=1', 303);
    }

    const email = String(form.get('email') ?? '').trim().toLowerCase();
    const firstName = String(form.get('first_name') ?? '').trim().slice(0, 80);
    const place = String(form.get('place') ?? '').trim();
    const publicOk = form.get('public_ok') === 'on';

    if (!EMAIL_RE.test(email) || email.length > 254 || !isPlace(place)) {
      return redirect('/join/?error=invalid', 303);
    }

    const ipHash = createHash('sha256')
      .update(clientAddress ?? 'unknown')
      .digest('hex');

    const [{ recent }] = await sql`
      SELECT count(*)::int AS recent FROM signups
      WHERE ip_hash = ${ipHash} AND created_at > now() - interval '1 hour'
    `;
    if (recent >= MAX_PER_IP_PER_HOUR) {
      return redirect('/join/?error=rate', 303);
    }

    await sql`
      INSERT INTO signups (email, first_name, place, public_ok, ip_hash)
      VALUES (${email}, ${firstName || null}, ${place}, ${publicOk}, ${ipHash})
      ON CONFLICT (email) DO UPDATE
        SET first_name = EXCLUDED.first_name,
            place = EXCLUDED.place,
            public_ok = EXCLUDED.public_ok
    `;

    return redirect('/join/?joined=1', 303);
  } catch {
    return redirect('/join/?error=server', 303);
  }
};
