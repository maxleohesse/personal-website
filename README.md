# maxleohesse.com

A quiet personal site: one sentence, a bit about how I think, and notes as I figure things out.

Live at [maxleohesse.com](https://maxleohesse.com) — deployed automatically from `main` via GitHub Pages.

## Structure

```
index.html      home — the one sentence
about/          who I am, what occupies me, where I'm heading   (planned)
notes/          writing, newest first                           (planned)
css/style.css   all styling, incl. the interaction layer at the bottom
js/main.js      all behaviour
fonts/          self-hosted Fraunces + Inter (SIL Open Font License)
images/         portrait and logos
```

## How it works

Plain HTML, CSS and vanilla JavaScript. No framework, no build step, no dependencies — edit a file, commit, and it's live in about a minute.

`js/main.js` carries every interaction: the page-enter loader, the black curtain between pages, the custom cursor, the overlay menu, scroll reveals and the scroll-linked marquees.

`css/style.css` is in two halves. The top is the layout scaffolding; everything from `personalization layer` down is hand-written and is where design changes belong. Design tokens live in `:root` — accent colour `#1D3D67`, display face Fraunces, body face Inter.

Assets are versioned via `?v=N` on the stylesheet and script links. **Bump that number whenever you change CSS or JS**, otherwise GitHub Pages will keep serving the cached copy.

## Run locally

```
python3 -m http.server 8734 --directory .
```

Then open `http://localhost:8734`.

## Adding a note

Planned: copy `notes/_template.html`, fill in title, date and text, then add one line to the list in `notes/index.html`.
