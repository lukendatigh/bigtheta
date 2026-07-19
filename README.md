# Big Theta Fellowship website

Static rebuild of the content currently live at [bigtheta.org](https://bigtheta.org)
(a Notion page reached via Namecheap domain forwarding), meant to replace it with a
plain, dependency-free site deployable on GitHub Pages.

## Structure

- `index.html` — all page content
- `assets/style.css` — styling
- `CNAME` — custom domain (`bigtheta.org`) for GitHub Pages

No build step — it's just static HTML/CSS.

## Deploy to GitHub Pages

1. Push this repo to GitHub.
2. In **Settings → Pages**, set Source to the `main` branch, root folder.
3. To actually serve `bigtheta.org` from GitHub Pages instead of the Notion page,
   update the domain's DNS/forwarding at your registrar (Namecheap) to point at
   GitHub Pages instead of the current URL forward, and add `bigtheta.org` as the
   custom domain in the Pages settings (the `CNAME` file here already has it).
