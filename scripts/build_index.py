#!/usr/bin/env python3
"""
Build the index.html page by injecting articles section into existing index.

This script reads the existing index.html, finds the Tools section, and injects
an Articles section after it if markdown articles exist.
"""

import argparse
import re
from pathlib import Path


def extract_title(markdown_content: str) -> str:
    """Extract the first H1 heading from markdown content."""
    for line in markdown_content.split("\n"):
        if line.startswith("# "):
            return line[2:].strip()
    return "Untitled"


def extract_description(markdown_content: str) -> str:
    """Extract a description from the first paragraph after the title."""
    lines = markdown_content.split("\n")
    in_content = False

    for line in lines:
        line = line.strip()

        # Skip the title
        if line.startswith("# "):
            in_content = True
            continue

        # Skip empty lines
        if not line:
            continue

        # Return the first non-empty line after the title
        if in_content and not line.startswith("#"):
            # Remove markdown formatting
            desc = line.replace("**", "").replace("*", "").replace("`", "")
            # Truncate if too long
            if len(desc) > 150:
                desc = desc[:147] + "..."
            return desc

    return "No description available"


def build_articles_section(articles_dir: Path) -> str:
    """Build the articles section HTML."""
    if not articles_dir.exists():
        return ""

    md_files = sorted(articles_dir.glob("*.md"))

    if not md_files:
        return ""

    articles_html = []
    for md_file in md_files:
        content = md_file.read_text(encoding="utf-8")
        title = extract_title(content)
        description = extract_description(content)
        html_filename = f"{md_file.stem}.html"

        articles_html.append(f"""                <li>
                    <a href="articles/{html_filename}">{title}</a>
                    <div class="description">
                        {description}
                    </div>
                </li>""")

    return f"""        <section>
            <h2>Articles</h2>
            <ul>
{chr(10).join(articles_html)}
            </ul>
        </section>

"""


def update_index(index_file: Path, articles_dir: Path) -> None:
    """Update the index.html file with articles section."""
    # Read existing index
    if not index_file.exists():
        print(f"Error: {index_file} does not exist")
        return

    index_content = index_file.read_text(encoding="utf-8")

    # Build articles section
    articles_section = build_articles_section(articles_dir)

    if not articles_section:
        # No articles, remove any existing articles section
        # Match and remove the articles section if it exists
        pattern = r"\s*<section>\s*<h2>Articles</h2>.*?</section>\s*"
        index_content = re.sub(pattern, "\n", index_content, flags=re.DOTALL)
        index_file.write_text(index_content, encoding="utf-8")
        print(f"No articles found, removed articles section from {index_file}")
        return

    # Check if articles section already exists
    if "<h2>Articles</h2>" in index_content:
        # Replace existing articles section
        pattern = r"<section>\s*<h2>Articles</h2>.*?</section>\s*"
        index_content = re.sub(
            pattern, articles_section.strip() + "\n\n", index_content, flags=re.DOTALL
        )
        print(f"Updated existing articles section in {index_file}")
    else:
        # Insert articles section after the Tools section
        # Find the closing </section> tag after <h2>Tools</h2>
        tools_section_match = re.search(
            r"<h2>Tools</h2>.*?</section>\s*", index_content, flags=re.DOTALL
        )
        if tools_section_match:
            position = tools_section_match.end()
            index_content = (
                index_content[:position] + "\n" + articles_section + index_content[position:]
            )
            print(f"Inserted articles section into {index_file}")
        else:
            print(f"Warning: Could not find Tools section in {index_file}")
            return

    # Write updated content
    index_file.write_text(index_content, encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser(description="Update index.html by injecting articles section")
    parser.add_argument(
        "articles_dir",
        type=Path,
        help="Source articles directory containing markdown files",
    )
    parser.add_argument(
        "index_file",
        type=Path,
        help="Index HTML file to update",
    )

    args = parser.parse_args()
    update_index(args.index_file, args.articles_dir)


if __name__ == "__main__":
    main()
