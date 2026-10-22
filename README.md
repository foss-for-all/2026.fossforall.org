# 2026.fossforall.org

FOSS for All Conference 2026 website. Astro, Tailwind, shadcn/ui. Korean at the root,
English under `/en/`.

## Build

```sh
npm install
npm run dev      # localhost:4321
npm run build    # ./dist
npm run preview
```

## Content

Session pages (`/sessions/`, `/sessions/<code>/`, `/speakers/<code>/` and their `/en/`
copies) and the home keynote section are built from the 2026 Pretalx event. Set
`PRETALX_TOKEN` in your local `.env` or build environment to authenticate API requests
(API v2). Only talks whose Pretalx page is public (featured or in a released schedule)
are published; speaker photos are copied into the build. CI rebuilds every 6 hours and
fails instead of deploying when Pretalx is unreachable. Without API access, local builds
show a localized message and link to Pretalx.

- `src/content/pages/{ko,en}/*.mdx` prose pages, rendered by `src/pages/[slug].astro`
- `src/data/sponsorship/` the sponsorship prospectus page, one typed object per locale
- `src/i18n/` navigation, footer, and UI strings

The sponsorship page is the web edition of
[sponsorship-prospectus](https://github.com/foss-for-all/sponsorship-prospectus), which
stays the source for the PDF. Text, tier table, photos, and 2025 logos are copied from
there by hand; `public/sponsorship-prospectus-{ko,en}.pdf` must be refreshed from the
same release.
