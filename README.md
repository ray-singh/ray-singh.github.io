# Rayansh Singh Portfolio (Vite + React)

A single-page portfolio built with Vite + React and deployed to GitHub Pages on every push to `main`.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Notes
- Content (experience, projects, skills, leadership, songs) lives in `src/content.js`.
- Layout is in `src/App.jsx`, styling in `src/styles.css`. The design follows a type-specimen layout: bordered frame, mono bars, 6-column grid with ruled labels.
- Each project has a `plate` config in `content.js` that controls its illustrated panel (background, headline number, clay texture, caption).
