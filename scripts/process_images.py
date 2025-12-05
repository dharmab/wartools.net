#!/usr/bin/env python3
"""
Image processing utility for converting images to WEBP format.

This module provides functions to convert images referenced in markdown articles
to WEBP format for better web performance.
"""

import re
from pathlib import Path

from PIL import Image


def convert_to_webp(input_path: Path, output_path: Path, quality: int = 85) -> None:
    """
    Convert an image to WEBP format.

    Args:
        input_path: Path to the input image
        output_path: Path to save the WEBP image
        quality: WEBP quality (1-100, default 85)
    """
    try:
        with Image.open(input_path) as img:
            # Convert RGBA to RGB if necessary (WEBP supports both, but RGB is more efficient)
            if img.mode == "RGBA":
                # Create a white background
                background = Image.new("RGB", img.size, (255, 255, 255))
                background.paste(img, mask=img.split()[3])  # Use alpha channel as mask
                img = background
            elif img.mode not in ("RGB", "RGBA"):
                img = img.convert("RGB")

            # Ensure output directory exists
            output_path.parent.mkdir(parents=True, exist_ok=True)

            # Save as WEBP
            img.save(output_path, "WEBP", quality=quality, method=6)
            print(f"Converted: {input_path.name} -> {output_path.name}")
    except Exception as e:
        print(f"Error converting {input_path}: {e}")
        raise


def find_markdown_images(markdown_content: str) -> list[str]:
    """
    Find all image references in markdown content.

    Args:
        markdown_content: The markdown text to search

    Returns:
        List of image paths found in the markdown
    """
    # Match markdown image syntax: ![alt text](path/to/image.ext)
    pattern = r"!\[([^\]]*)\]\(([^)]+)\)"
    matches = re.findall(pattern, markdown_content)
    return [path for _, path in matches]


def process_article_images(
    markdown_content: str,
    src_article_dir: Path,
    output_images_dir: Path,
    quality: int = 85,
) -> str:
    """
    Process all images in a markdown article, converting them to WEBP.

    Args:
        markdown_content: The markdown content to process
        src_article_dir: Directory containing the source article and images
        output_images_dir: Directory to save converted WEBP images
        quality: WEBP quality (1-100, default 85)

    Returns:
        Updated markdown content with image paths changed to .webp
    """
    # Find all image references
    image_paths = find_markdown_images(markdown_content)

    if not image_paths:
        return markdown_content

    updated_content = markdown_content

    for image_path in image_paths:
        # Skip external URLs
        if image_path.startswith(("http://", "https://", "//")):
            continue

        # Get the source image path
        src_image_path = src_article_dir / image_path

        if not src_image_path.exists():
            print(f"Warning: Image not found: {src_image_path}")
            continue

        # Determine output path with .webp extension
        webp_filename = src_image_path.stem + ".webp"

        # Preserve directory structure within images/
        # e.g., images/subdir/img.png -> images/subdir/img.webp
        relative_path = Path(image_path)
        if relative_path.parent != Path("."):
            output_path = output_images_dir / relative_path.parent / webp_filename
            webp_relative_path = str(relative_path.parent / webp_filename)
        else:
            output_path = output_images_dir / webp_filename
            webp_relative_path = webp_filename

        # Convert image to WEBP
        convert_to_webp(src_image_path, output_path, quality)

        # Update the markdown content to reference the .webp file
        # We need to handle the path properly - if it had a directory prefix, keep it
        old_reference = f"]({image_path})"
        new_reference = f"]({webp_relative_path})"
        updated_content = updated_content.replace(old_reference, new_reference)

    return updated_content


def get_webp_path(original_path: str) -> str:
    """
    Convert an image path to its corresponding WEBP path.

    Args:
        original_path: Original image path (e.g., "images/photo.jpg")

    Returns:
        WEBP path (e.g., "images/photo.webp")
    """
    path = Path(original_path)
    return str(path.parent / f"{path.stem}.webp")
