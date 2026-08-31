# Webworx Studio — Coming Soon

The temporary landing page for **Webworx Studio** while the full site is being built.

> `// status: coming_soon`

## What's on it

- Hero with animated "compiling" code editor & build progress bar
- Services — websites, custom web apps, mobile apps, graphic design, social media
- Client strip — Epping Firearms, Hawke, SPIK, Thermtec
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

## Swapping in real client logos

The client strip currently uses styled wordmarks. To use real logos, drop
SVG/PNG files into `assets/clients/` and replace the `<li>` entries in
[index.html](index.html) with `<img>` tags.
