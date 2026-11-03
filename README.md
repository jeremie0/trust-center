# trust-center

A free, open-source Trust Center page you can fork and deploy in under 30 minutes. One config file drives the entire site — no backend, no database, no CMS.

Built for early-stage startups that need to answer security questions from prospects but can't justify paying for SafeBase or Vanta's Trust Center. Edit `trust.config.ts`, deploy a static site, and give prospects a single URL to evaluate your security posture.

## Quick Start

```bash
git clone https://github.com/Fimil-dev/trust-center.git
cd trust-center
npm install
```

Edit `trust.config.ts` with your company's info, then:

```bash
npm run dev       # local dev server at localhost:4321
npm run build     # production build → dist/
```

## What's in the Config

`trust.config.ts` is the only file you need to edit. It covers:

- **company** — name, security/privacy emails, logo, website
- **theme** — light/dark mode, brand color, heading + body fonts (any Google Font)
- **frameworks** — compliance frameworks with status (`certified`, `in-progress`, `planned`)
- **controls** — security controls grouped by domain (Data Protection, Access Control, etc.), each with a status (`implemented`, `partial`, `planned`)
- **subprocessors** — third-party vendors, their purpose, location, and DPA links
- **documents** — links to your privacy policy, terms, DPA, SLA, etc.
- **contact** — CTA with heading, description, and link
- **seo** — page title, meta description, OG image

The config is validated at build time with Zod. If something is wrong, the build fails with a clear error pointing to the bad field.

## Deploy

The build output is a static `dist/` folder. Deploy it anywhere:

```bash
# Cloudflare Pages
npx wrangler pages deploy dist/

# Vercel
npx vercel --prod

# Netlify
npx netlify deploy --prod --dir=dist
```

For GitHub Pages, use the included `.github/workflows/deploy.yml` workflow:

1. In **Settings → Pages → Build and deployment**, set **Source** to **GitHub Actions**, not **Deploy from a branch**.
2. Ensure GitHub Actions and the **Deploy to GitHub Pages** workflow are enabled in your repository (including forks).
3. Push to `master`, or select **Actions → Deploy to GitHub Pages → Run workflow** to deploy immediately.

The workflow builds the Astro site and PDFs with `npm run build`, then publishes only `dist/`. Branch-based publishing instead runs Jekyll against the source files and fails with errors such as `Invalid YAML front matter` in `.astro` components. If you encounter that failure, change the Pages source as above and run the deploy workflow; rerunning the old **pages build and deployment** job will still use Jekyll. Adding a repository-root `.nojekyll` file alone does not build the Astro site.

## Development

```bash
npm run dev          # dev server with hot reload
npm run build        # production build
npm run lint         # eslint + prettier check
npm run lint:fix     # auto-fix lint/format issues
npm run test         # run tests
npm run test:watch   # tests in watch mode
npm run check        # astro type checking
```

## Stack

- [Astro](https://astro.build) — static site generator, ships zero JS by default
- [Tailwind CSS v4](https://tailwindcss.com) — styling
- [Zod](https://zod.dev) — config validation

The only client-side JS is a ~10-line theme toggle script. Everything else renders at build time.

## Customization

**Theme**: Set your brand color, fonts, and light/dark preference in the `theme` section of the config.

**Frameworks**: The `name` field is freeform — use SOC 2, ISO 27001, HIPAA, PCI DSS, GDPR, FedRAMP, or anything else.

**Components**: All in `src/components/` as Astro components. Each section is standalone and receives data from the config as props.

## License

MIT — see [LICENSE](./LICENSE).

Built by [Fimil](https://fimil.dev).
