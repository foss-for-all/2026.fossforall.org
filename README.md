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

- `src/content/pages/{ko,en}/*.mdx` prose pages, rendered by `src/pages/[slug].astro`
- `src/data/sponsorship/` the sponsorship prospectus page, one typed object per locale
- `src/i18n/` navigation, footer, and UI strings

The sponsorship page is the web edition of
[sponsorship-prospectus](https://github.com/foss-for-all/sponsorship-prospectus), which
stays the source for the PDF. Text, tier table, photos, and 2025 logos are copied from
there by hand; `public/sponsorship-prospectus-{ko,en}.pdf` must be refreshed from the
same release.
