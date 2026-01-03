# Hitesh — Business Portfolio (Single Page Website)

This repository contains a single-page business portfolio for Hitesh, a freelance website developer. It's ready for GitHub Pages and includes an automated image optimization workflow that compresses images and generates WebP versions.

## What’s included
- `index.html` — The single page with Intro, Services, Work Samples, Why Choose Me, and Contact.
- `assets/styles.css` — Styles (responsive).
- `assets/scripts.js` — Small JS for mobile nav and smooth scroll.
- `assets/images/` — Add your project screenshots here (see naming below).
- `scripts/optimize-images.js` — Node script using imagemin to optimize images and create WebP variants.
- `package.json` — dev deps and the `optimize` script.
- `.github/workflows/optimize-images.yml` — Workflow runs on push to `main` (and can be triggered manually).
- `.gitignore`

## GitHub Pages (deploy)
1. Create a new repository on GitHub (for example `hitesh-portfolio`).
2. Commit and push these files to the `main` branch.
3. On GitHub: Settings → Pages → Deploy from branch → choose `main` and folder `/ (root)` → Save.
4. After a few minutes your site will be live at `https://<your-github-username>.github.io/<repo-name>/` or at `https://<your-github-username>.github.io/` if the repo is named `<your-github-username>.github.io`.

## Image workflow (automatic optimization)
- Add your screenshots into `assets/images/` using these example filenames:
  - `drodesign.jpg` (or .png)
  - `astrakat.jpg`
  - `pixel2prospect.jpg`
  - `hero.jpg` (optional hero image)
- When you push images, the workflow `Optimize images` will run:
  - It installs the dev dependencies.
  - Runs `node scripts/optimize-images.js` which:
    - Optimizes JPG/PNG images and rewrites them in-place.
    - Generates `.webp` versions beside each original image.
  - The workflow then commits optimized files back to the repo.

You can also run the optimizer locally:
1. Install Node.js (>=18).
2. From the repo root:
   - npm ci
   - npm run optimize

## Customizing contact details & screenshots
- Replace `REPLACE_PHONE`, `REPLACE_INSTAGRAM`, `REPLACE_LINKEDIN` and `hitesh@example.com` in `index.html` with your real contact info.
- Replace images in `assets/images/` with real screenshots. The workflow will optimize them automatically on push.

## Tips for best performance
- Use appropriately sized screenshots (don’t upload full-screen raw images).
- The optimizer targets quality levels balanced for web. If you want different compression levels, edit `scripts/optimize-images.js`.
- Optionally enable GitHub Pages caching and use a CDN for images (e.g., Cloudflare) for extra speed.

## Notes & security
- The Actions workflow commits back optimized images. If you prefer not to auto-commit, remove the commit step and check optimized images artifacts or run optimization locally.
- If you need support for more image formats or resizing, I can update the script.

---

If you want, I can:
- Push updates with your real contact details and screenshots (upload them here), or
- Create the repo under a GitHub organization instead (provide the org name).

Please enable GitHub Pages in repository settings after the push to publish the site.
