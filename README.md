# Webworx Studio — Coming Soon

The temporary landing page for **Webworx Studio** while the full site is being built.

> `// status: coming_soon`

## What's on it

- Light theme with dark "terminal" accents (code editor hero, contact form)
- Hero with animated "compiling" code editor & build progress bar
- Services — websites, custom web apps, mobile apps, graphic design, social media
- Client strip — Epping Firearms Fishing & Outdoors, Hawke, SPIKA, ThermTec
- Terminal-styled contact form (delivered via [FormSubmit](https://formsubmit.co))

## Stack

Plain HTML / CSS / JS — no build step, no dependencies. Deployed on Vercel.

## Run locally

```bash
python3 -m http.server 4173
```

Then open http://localhost:4173

## Contact form

Submissions go through FormSubmit to the address set in `script.js`
(`CONTACT_EMAIL`). The **first submission triggers a one-time activation
email** — click the link in it to start receiving messages. To change the
inbox, edit `CONTACT_EMAIL` in [script.js](script.js).

## Client logos

Logos live in `assets/clients/`, sourced from each brand's own site
(Hawke's official black SVG, SPIKA's Odoo logo, ThermTec's white artwork
recoloured via CSS `invert`, and the EFFO badge). Swap any of them by
replacing the file and keeping the `<img>` tag in [index.html](index.html).
