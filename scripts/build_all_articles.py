#!/usr/bin/env python3
"""
Build all articles from markdown to HTML.

This script finds all markdown files in the source articles directory
and converts them to HTML in the output articles directory.
"""

import argparse
from pathlib import Path

from commonmark import commonmark
from process_images import process_article_images

HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title} - WARTOOLS.NET</title>
<style>
body {{
    font-family: Georgia, serif;
    line-height: 1.6;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f4f4f4;
    color: #333;
}}
article {{
    background: white;
    padding: 40px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}}
h1 {{ border-bottom: 3px solid #333; padding-bottom: 10px; }}
h2 {{ border-bottom: 2px solid #666; padding-bottom: 5px; margin-top: 30px; }}
h3 {{ margin-top: 20px; }}
a {{ color: #0066cc; text-decoration: none; }}
a:hover {{ text-decoration: underline; }}
code {{ background: #f4f4f4; padding: 2px 5px; border-radius: 3px; }}
pre {{ background: #f4f4f4; padding: 15px; border-radius: 5px; overflow-x: auto; }}
blockquote {{ border-left: 4px solid #666; margin-left: 0; padding-left: 20px; color: #666; }}
ul, ol {{ padding-left: 25px; }}
li {{ margin-bottom: 5px; }}
hr {{ border: none; border-top: 1px solid #ccc; margin: 30px 0; }}
img {{
    max-width: 100%;
    height: auto;
    display: block;
    margin: 20px auto;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}}
nav {{
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}}
nav a {{
    color: #0066cc;
    text-decoration: none;
    font-weight: bold;
}}
nav a:hover {{
    text-decoration: underline;
}}
</style>
</head>
<body>
<nav>
    <a href="/">← Back to WARTOOLS.NET</a>
</nav>
<article>
{content}
</article>
</body>
</html>"""


def extract_title(markdown_content: str) -> str:
    """Extract the first H1 heading from markdown content."""
    for line in markdown_content.split("\n"):
        if line.startswith("# "):
            return line[2:].strip()
    return "Article"


def build_article(input_file: Path, output_file: Path) -> None:
    """Convert a markdown file to HTML."""
    # Read markdown content
    markdown_content = input_file.read_text(encoding="utf-8")

    # Extract title
    title = extract_title(markdown_content)

    # Process images - convert to WEBP
    src_article_dir = input_file.parent
    output_images_dir = output_file.parent / "images"
    markdown_content = process_article_images(markdown_content, src_article_dir, output_images_dir)

    # Convert markdown to HTML
    html_content = commonmark(markdown_content)

    # Create full HTML page
    full_html = HTML_TEMPLATE.format(title=title, content=html_content)

    # Ensure output directory exists
    output_file.parent.mkdir(parents=True, exist_ok=True)

    # Write output
    output_file.write_text(full_html, encoding="utf-8")
    print(f"Built article: {input_file} -> {output_file}")


def build_all_articles(src_dir: Path, output_dir: Path) -> None:
    """Build all markdown articles in the source directory."""
    if not src_dir.exists():
        msg = f"Error: Source directory {src_dir} does not exist"
        raise FileNotFoundError(msg)

    # Find all markdown files
    md_files = sorted(src_dir.glob("*.md"))

    if not md_files:
        print(f"No markdown files found in {src_dir}")
        return

    print(f"Found {len(md_files)} article(s) to build")

    for md_file in md_files:
        # Determine output filename
        output_file = output_dir / f"{md_file.stem}.html"
        build_article(md_file, output_file)

    print(f"Successfully built {len(md_files)} article(s)")


def main() -> None:
    parser = argparse.ArgumentParser(description="Build all articles from markdown to HTML")
    parser.add_argument(
        "src_dir",
        type=Path,
        help="Source articles directory containing markdown files",
    )
    parser.add_argument(
        "output_dir",
        type=Path,
        help="Output directory for generated HTML files",
    )

    args = parser.parse_args()
    build_all_articles(args.src_dir, args.output_dir)


if __name__ == "__main__":
    main()
