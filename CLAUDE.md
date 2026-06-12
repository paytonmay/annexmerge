# One City for the Big Sandy (annexmerge)

Astro 5 static site making an honest, evidence-based public case for phased
municipal consolidation in the Pikeville–Prestonsburg corridor of Eastern
Kentucky. Deployed to Vercel (annexmerge.vercel.app); pushes to main
auto-deploy.

## Writing standards (apply to ALL site copy, titles, meta, JSON-LD, llms.txt)

- **No em-dashes (—), ever.** Restructure the sentence instead: use a period,
  comma, colon, semicolon, or parentheses. This is a site-wide standard set by
  the owner.
- En-dashes (–) are allowed ONLY in numeric/statute ranges (KRS 65.210–65.300,
  2010–2050) and paired proper names (Pikeville–Prestonsburg merger,
  Lexington–Fayette).
- Honesty rules: every factual claim must be backed by a citation on
  /sources. Never promise cost savings from consolidation; the case is built
  on bargaining power, scale, and growth. Acknowledge unfavorable evidence
  (referendum failure rates, mixed academic findings) plainly.
- Tone: plainspoken, local, confident but never salesy. "A coalition-building
  tool, not an ambush."

## Tech notes

- Zero client-side JavaScript. Animations are CSS only and must respect
  prefers-reduced-motion.
- Mobile-first CSS in src/styles/global.css (vanilla, custom properties).
- SEO/LLM surface: per-page titles + meta descriptions, canonical URLs,
  JSON-LD via the Base layout `schema` prop, @astrojs/sitemap,
  public/llms.txt (keep it updated when pages change), public/robots.txt.
- Site URL lives in astro.config.mjs `site` and public/robots.txt Sitemap
  line. Production domain: https://onebigsandy.org (bigsandy.city is also
  registered and held in reserve).
