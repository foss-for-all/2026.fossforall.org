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

Session pages (`/sessions` and `/en/sessions`) fetch confirmed sessions from the
2026 Pretalx event at build time. Set `PRETALX_TOKEN` in your local `.env` or build
environment to authenticate API requests. Rebuild to publish updated session data.
Requests explicitly select API v2 with the `Pretalx-Version: v2` header, using the
existing `/api/events/2026/` endpoints. Video links exclude explicitly private resources.
Without API access, the pages display a localized message and link to Pretalx.

- `src/content/pages/{ko,en}/*.mdx` prose pages, rendered by `src/pages/[slug].astro`
- `src/data/sponsorship/` the sponsorship prospectus page, one typed object per locale
- `src/i18n/` navigation, footer, and UI strings

The sponsorship page is the web edition of
[sponsorship-prospectus](https://github.com/foss-for-all/sponsorship-prospectus), which
stays the source for the PDF. Text, tier table, photos, and 2025 logos are copied from
there by hand; `public/sponsorship-prospectus-{ko,en}.pdf` must be refreshed from the
same release.
