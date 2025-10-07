## Arunod Manohara — Personal Site

This repository contains the source for [arunod.us](https://arunod.us), a single-page portfolio highlighting Arunod’s work in web development and cybersecurity.  
The site runs on **Next.js 14** and ships as a fully static export, so it can be deployed on any static host (Cloudflare Pages, GitHub Pages, Netlify, etc.).

---

### What’s Inside

- **Neon hero experience** with animated name reveal, typing-style intro, and reactive CTA buttons.
- **Glassmorphism content cards** (About, Spotify, Social) that keep the dark grid background while remaining legible.
- **Custom animation system** driven by a lightweight vanilla script (`public/script.js`) for reveal-on-scroll, particle backgrounds, and hover tilt effects.
- **Accessibility & SEO ready**: semantic landmarks, skip link, JSON-LD schema, and full social meta tags.

---

### Project Structure

```
.
├── pages/               # Next.js pages (_app, _document, index)
├── public/              # Static assets (logo, portrait, manifest, script.js)
├── styles/globals.css   # All styling ported from the original static site
├── legacy-index.html    # Previous static HTML version (reference only)
├── next.config.js
└── package.json
```

---

### Getting Started

```bash
# install dependencies
npm install

# run locally at http://localhost:3000
npm run dev
```

The development server supports hot reloading, so edits in `pages/` or `styles/` appear immediately.

---

### Build & Export

This project is configured for static export. To generate the production bundle:

```bash
npm run build
# outputs to ./out
```

You can preview the exported bundle with any static server:

```bash
npx serve out
```

---

### Deploying to Cloudflare Pages

1. Ensure `next.config.js` contains `output: "export"` (already included).
2. Push the repository to GitHub/GitLab/Bitbucket.
3. In Cloudflare Pages:
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
4. Trigger a deployment – Pages will install dependencies, run the static export, and publish the site.

*(If you prefer another static host, serve the `out/` directory in the same way.)*

---

### Available Scripts

| Command         | Description                              |
|-----------------|------------------------------------------|
| `npm run dev`   | Start Next.js in development mode        |
| `npm run build` | Create the production static export      |
| `npm run start` | Serve the built app (after `npm run build`) |

---

### Contributing & Feedback

Issues, feature requests, and pull requests are welcome. Open a ticket or contact Arunod via the social links on the site if you spot a bug or have an improvement idea.

---

### License

MIT © Arunod Manohara
