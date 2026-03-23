# Rayansh Singh Portfolio (Vite + React)

This project has been converted from a static HTML/CSS/JS site to a Vite + React app.

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

## Deploy to GitHub Pages (GitHub Actions)

- The workflow is defined at `.github/workflows/deploy.yml`.
- Push to `main` to trigger deployment.
- In GitHub repo settings, set **Pages → Build and deployment → Source** to **GitHub Actions**.

For this repo (`ray-singh.github.io`), the site URL should be:

- `https://ray-singh.github.io/`

## Notes

- The profile image should be available at `public/profile.jpg` (or update the image path in `src/App.jsx`).
- Core styling is in `src/styles.css`.
- App structure and behavior is implemented in `src/App.jsx`.
