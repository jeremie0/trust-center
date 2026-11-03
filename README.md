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

For GitHub Pages, a deploy workflow is included at `.github/workflows/deploy.yml`. Select **GitHub Actions** as the source in **Settings → Pages**. The workflow automatically configures the site URL and base path for project sites (such as `https://jeremie0.github.io/trust-center/`), user sites, and custom domains.

### Hosting in a subdirectory

For other deployments, set the build-time environment variables `SITE_URL` (the site origin) and `BASE_PATH` (the hosting subdirectory):

```bash
SITE_URL=https://jeremie0.github.io BASE_PATH=/trust-center npm run build
SITE_URL=https://jeremie0.github.io BASE_PATH=/trust-center npm run preview
```

`BASE_PATH` defaults to `/`, preserving root-domain hosting. `SITE_URL` defaults to `https://trust.fimil.dev`; set it to your own origin for canonical and social-sharing URLs. Use the same `BASE_PATH` for development or preview as for the build. Local asset paths in `trust.config.ts` (such as `/logo.svg`) are automatically prefixed; external URLs are left unchanged.

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
