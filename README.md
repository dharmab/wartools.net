# WarTools.net

A minimal static website for wargaming articles and tools.

## Project Structure

```
wartools.net/
├── src/                    # Source files
│   ├── articles/           # Markdown articles
│   │   ├── terrain-building-basics.md
│   │   ├── painting-tips.md
│   │   └── list-building-guide.md
│   └── apps/               # Web app stubs
│       ├── dice-calculator.html
│       ├── range-ruler.html
│       └── army-points.html
├── index.html              # Home page (built to root for GitHub Pages)
├── articles/               # Built articles (generated)
├── apps/                   # Built apps (generated)
└── Makefile                # Build system
```

## Building

Build the entire site:

```sh
make
```

Build only articles:

```sh
make articles
```

Build only apps:

```sh
make apps
```

Clean build directory:

```sh
make clean
```

## Requirements

- `make`
- **Optional**: `pandoc` or `markdown` for converting Markdown to HTML
  - Without these, markdown will display as preformatted text with a note

## How It Works

1. Markdown files in `src/articles/` are converted to HTML in `articles/`
2. HTML files in `src/apps/` are copied to `apps/`
3. `index.html` is placed at the project root
4. The build system automatically detects new files
5. Built files are ready to serve directly from the repository root

## GitHub Pages Deployment

1. Build the site: `make`
2. Commit the built files (index.html, articles/, apps/)
3. Push to GitHub
4. Enable GitHub Pages in repository settings (serve from root)

For local testing:

```sh
# Build the site
make

# Serve with Python
python3 -m http.server 8000

# Or with npx
npx serve
```

## Philosophy

- **Simple**: Pure HTML home page, no JavaScript required
- **Fast**: Markdown compiles to static HTML
- **Minimal**: No frameworks, no build complexity
- **Portable**: Works anywhere you can run `make`
