# Apogee Avionics — CubeSat Hardware & PCB Design site

Static marketing site (HTML/CSS/JS, no build step) for selling CubeSat avionics and
custom PCB design services. Hosted on GitHub Pages.

## ⚙️ Setup you must do (5 minutes)

### 1. Set your email
Edit **`script.js`**, line 2:
```js
const CONTACT_EMAIL = "you@yourdomain.com";
```
The "Email" link and the form's mailto fallback both use this.

### 2. Make the contact form deliver to your inbox (Formspree — free)
The site works with a `mailto:` fallback out of the box, but a proper form is better.
1. Sign up at https://formspree.io (free tier: 50 submissions/month).
2. Create a new form → it gives you an endpoint like `https://formspree.io/f/abcwxyz`.
3. In **`index.html`**, find `action="https://formspree.io/f/YOUR_FORM_ID"` and replace
   `YOUR_FORM_ID` with your real form id.
4. Done — submissions arrive in your email; the page shows a success message inline.

### 3. (Recommended) Rename the brand
Search-and-replace **`Apogee Avionics`** / **`Aered Avionics`** in `index.html` and `404.html`
with whatever name you choose.

## 🚀 Run locally
```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## 🌐 Custom domain (recommended — looks professional & hides the github.io URL)
1. Buy a domain (Namecheap/Cloudflare, ~$10/yr).
2. In the repo: **Settings → Pages → Custom domain**, enter your domain.
3. At your registrar, add a `CNAME` record pointing to `melihakbulut221.github.io`,
   or 4 `A` records to GitHub's Pages IPs (185.199.108–111.153).
4. Enable "Enforce HTTPS".

## Files
- `index.html` — the whole site (one page, anchored sections)
- `styles.css` — styling / responsive layout
- `script.js` — nav, form handling, scroll reveals (edit your email here)
- `404.html` — not-found page
- `assets/favicon.svg` — favicon
