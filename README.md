# Fistotex

Free Indian personal-finance calculators, source-checked market explainers and a results toolkit — [www.fistotex.com](https://www.fistotex.com).

Next.js 16 (App Router) on Vercel. Content lives in code: calculators in `src/lib/calculators`, articles in `src/lib/blog/articles.ts`, results in `src/lib/toolkit`.

```bash
npm ci
npm run dev      # http://localhost:3000
npm test         # calculator reference checks
npm run build
```

Environment variables: see `.env.example`. Security headers, CSP and redirects: `next.config.ts`.
CI (`.github/workflows/ci.yml`) runs lint, type-check, tests and a build on every push and pull request.
