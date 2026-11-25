# One City for the Big Sandy

An evidence-based public case for phased municipal consolidation in the
Pikeville–Prestonsburg corridor of Eastern Kentucky.

**Live:** https://onebigsandy.org

## What the site argues, and how

The case rests on bargaining power, scale, and growth. It does not promise
cost savings from consolidation, and it states the unfavorable evidence
plainly (referendum failure rates, mixed academic findings). Every factual
claim is backed by a citation on `/sources`.

## Pages

- `/the-case`: why consolidate, and the honest objections
- `/the-numbers`: population, tax base, and finance figures
- `/one-economy`: the strategic financial case for concentration
- `/the-plan`: a phased path under Kentucky law
- `/precedents`: what happened in other merged governments
- `/faq`: direct answers
- `/supporters` and `/join`: sign up and see per-community counts
- `/sources`: the full source list

## Develop

```sh
npm install
cp .env.example .env   # fill in real values
node --env-file=.env scripts/setup-db.mjs   # one-time schema setup
npm run dev
```

Built with Astro and deployed on Vercel. Content pages are prerendered with
almost no client-side JavaScript. Signups are stored in Neon Postgres and
reached only through the `/api/*` endpoints. Secrets (`DATABASE_URL`,
`ADMIN_EXPORT_TOKEN`) live in `.env` locally and in Vercel environment
variables; they are never committed.
