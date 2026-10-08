# Webworx Studio

The website for **Webworx Studio** — a Melbourne digital studio building
websites, custom web apps and mobile apps, with graphic design, social media
management and a specialist ThermTec / SPIKA repair bench.

> `// status: open_for_business`

Live at [webworxstudio.au](https://www.webworxstudio.au)

## Sections

- Hero with the animated `webworx.config.js` editor and a status bar
- Services — websites, web apps, mobile apps, graphic design, social media, device repairs
- The workshop — the ThermTec / SPIKA repair bench and its process pipeline
- Recent work — selected projects (Epping FFO, Hawke, MasjidBoard Live, Stellarmed, Posibolt, Buy Aprons)
- Our apps — SpaceNames for macOS
- Client strip, studio blurb and a terminal-styled contact form
- `/aussie` — a personal invite page (noindex), unrelated to the studio content

## Stack

Plain HTML / CSS / JS — no build step, no dependencies. Deployed on Vercel
(git-linked: pushes to `main` go to production).

Brand system: Ink `#10201F` · Petrol `#084C61` · Jade `#00A878` · Tint `#E3EDEE`,
with Archivo (headings), Inter (body) and JetBrains Mono (code).

## Run locally

```bash
python3 -m http.server 4173
```

Then open http://localhost:4173

## Contact form

Submissions go through [FormSubmit](https://formsubmit.co) to the address set
in `CONTACT_EMAIL` in [script.js](script.js). Changing the address requires a
one-time activation email from FormSubmit.

## Client logos

Logos live in `assets/clients/`, sourced from each brand's own site
(ThermTec's white artwork is recoloured via CSS `invert`). Swap any of them by
replacing the file and keeping the `<img>` tag in [index.html](index.html).
