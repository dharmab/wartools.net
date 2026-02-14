.PHONY: all clean build-articles clean-orphans lint format help

# Directories
SRC_DIR := src
ARTICLES_SRC := $(SRC_DIR)/articles

# Default target
all: clean-orphans build-articles update-index

# Create necessary directories
articles:
	mkdir -p articles
	mkdir -p articles/images



# Update index.html with articles section
update-index: build-articles
	uv run scripts/build_index.py $(ARTICLES_SRC) index.html


# Build all articles
build-articles: | articles
	uv run scripts/build_all_articles.py $(ARTICLES_SRC) articles



# Clean orphaned HTML files (articles with no corresponding markdown)
clean-orphans:
	uv run scripts/clean_orphans.py articles $(ARTICLES_SRC)

# Clean build files
clean:
	rm -rf articles/

# Lint Python code with Ruff and JavaScript with oxlint
lint:
	uv run ruff check .
	bunx oxlint apps/
	bunx oxfmt --check apps/*.js

# Format Python code with Ruff
format:
	uv run ruff format .
	bunx oxfmt apps/*.js

# Help target
help:
	@echo "WARTOOLS.NET Build System"
	@echo ""
	@echo "Targets:"
	@echo "  all            - Build entire site (default)"
	@echo "  build-articles - Build only articles"
	@echo "  update-index   - Update index.html with articles section"
	@echo "  clean-orphans  - Remove orphaned HTML files"
	@echo "  clean          - Remove built files"
	@echo "  lint           - Lint Python code with Ruff"
	@echo "  format         - Format Python code with Ruff"
	@echo "  help           - Show this help message"
	@echo ""
	@echo "Requirements:"
	@echo "  Python 3.14+ with uv package manager"
	@echo "  Run 'uv sync --dev' to install dependencies"
