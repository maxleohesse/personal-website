# Bazil — portfolio rebuild

A static rebuild of [en.bazil.fr](https://en.bazil.fr/) (Bazil Hamard, freelance webdesigner & photographer, Paris) that reproduces the original's look, feel and interactions with plain HTML/CSS/vanilla JS — no Webflow runtime, no jQuery.

## Pages

- `index.html` — home (preloader, animated intro, outline/fill heading hover swap)
- `design/` — hero, client-logo marquee, floating site screenshots, projects slider, skills sections, photo banner, testimonial slider, FAQ accordion, contact
- `photos/` — fixed intro column, photo grid (43 shoots), scrolling ticker, category filter bar
- `look-book/` — filterable grid of recent projects (web / photo / poster)
- `about/` — layered heading, drifting testimonial rows, playlist section, offer cards

## How it works

- `css/style.css` — layout rules tree-shaken from the original published stylesheet (exact design tokens: `#1b1b1b`, `#fda228`, SF Pro Display / Media Sans), plus a hand-written interaction layer at the bottom.
- `js/main.js` — all behavior: page-enter loader, black-curtain page transitions, custom cursor, overlay menu, 5-step project form wizard, sliders, scroll-linked marquees/parallax, FAQ accordion, gallery filters, lightbox.
- Images, fonts and video are hot-linked from the site's public Webflow CDN (same URLs the original uses), so an internet connection is needed.
- Photo/project detail links point to the live site.

## Run

```
python3 -m http.server 8734 --directory .
```

or use the `site` configuration in `.claude/launch.json`.
