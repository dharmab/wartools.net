#!/usr/bin/env python3
"""
Clean orphaned HTML files.

This script removes HTML files in the articles directory that don't have
corresponding markdown source files.
"""

import argparse
from pathlib import Path


def clean_orphans(articles_dir: Path, src_articles_dir: Path) -> None:
    """Remove orphaned HTML files that have no corresponding markdown source."""
    if not articles_dir.exists():
        print(f"Articles directory {articles_dir} does not exist, nothing to clean")
        return

    removed_count = 0

    for html_file in sorted(articles_dir.glob("*.html")):
        # Get the base name without extension
        base_name = html_file.stem

        # Check if corresponding markdown file exists
        md_file = src_articles_dir / f"{base_name}.md"

        if not md_file.exists():
            print(f"Removing orphaned article: {html_file}")
            html_file.unlink()
            removed_count += 1

    if removed_count == 0:
        print("No orphaned articles found")
    else:
        print(f"Removed {removed_count} orphaned article(s)")


def main() -> None:
    parser = argparse.ArgumentParser(description="Clean orphaned HTML files")
    parser.add_argument(
        "articles_dir",
        type=Path,
        help="Articles directory containing HTML files",
    )
    parser.add_argument(
        "src_articles_dir",
        type=Path,
        help="Source articles directory containing markdown files",
    )

    args = parser.parse_args()
    clean_orphans(args.articles_dir, args.src_articles_dir)


if __name__ == "__main__":
    main()
