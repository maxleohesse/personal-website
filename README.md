# maxleohesse.com

A quiet personal site: one sentence, a bit about how I think, and notes as I figure things out.

Live at [maxleohesse.com](https://maxleohesse.com) — deployed automatically from `main` via GitHub Pages.

## Structure

```
index.html      home — the one sentence
about/          who I am, what I'm working on, where this is going
notes/          writing, newest first
notes/_template.html   copy this to start a new note
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

1. Copy `notes/_template.html` to `notes/your-slug/index.html`. The slug becomes the URL.
2. Replace `[TITLE]`, `[DATE]`, `[DESCRIPTION]` and `[SLUG]`, then write your paragraphs where the file says `WRITE HERE` — one `<p>` per paragraph.
3. Add a matching entry to the top of the list in `notes/index.html` (newest first).

Commit, push, done. Full instructions are in the comment at the top of the template.
