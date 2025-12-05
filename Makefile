.PHONY: all clean build-articles build-apps clean-orphans

# Directories
SRC_DIR := src
ARTICLES_SRC := $(SRC_DIR)/articles
APPS_SRC := $(SRC_DIR)/apps

# Find all markdown files
MARKDOWN_FILES := $(wildcard $(ARTICLES_SRC)/*.md)
HTML_ARTICLES := $(patsubst $(ARTICLES_SRC)/%.md,articles/%.html,$(MARKDOWN_FILES))

# Find all app HTML files
APP_FILES := $(wildcard $(APPS_SRC)/*.html)
APP_OUTPUTS := $(patsubst $(APPS_SRC)/%,apps/%,$(APP_FILES))

# Default target
all: index.html clean-orphans build-articles build-apps

# Create necessary directories
articles:
	mkdir -p articles

apps:
	mkdir -p apps

# Copy main index.html
index.html: $(SRC_DIR)/index.html
	cp $< $@

# Convert markdown to HTML
articles/%.html: $(ARTICLES_SRC)/%.md | articles
	@echo "Building article: $<"
	@(echo '<!DOCTYPE html>'; \
	 echo '<html lang="en">'; \
	 echo '<head>'; \
	 echo '<meta charset="UTF-8">'; \
	 echo '<meta name="viewport" content="width=device-width, initial-scale=1.0">'; \
	 echo '<title>'"$$(grep -m1 '^# ' $< | sed 's/^# //')"' - WarTools.net</title>'; \
	 echo '<style>'; \
	 echo 'body { font-family: Georgia, serif; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; background-color: #f4f4f4; color: #333; }'; \
	 echo 'article { background: white; padding: 40px; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }'; \
	 echo 'h1 { border-bottom: 3px solid #333; padding-bottom: 10px; }'; \
	 echo 'h2 { border-bottom: 2px solid #666; padding-bottom: 5px; margin-top: 30px; }'; \
	 echo 'h3 { margin-top: 20px; }'; \
	 echo 'a { color: #0066cc; text-decoration: none; }'; \
	 echo 'a:hover { text-decoration: underline; }'; \
	 echo 'code { background: #f4f4f4; padding: 2px 5px; border-radius: 3px; }'; \
	 echo 'pre { background: #f4f4f4; padding: 15px; border-radius: 5px; overflow-x: auto; }'; \
	 echo 'blockquote { border-left: 4px solid #666; margin-left: 0; padding-left: 20px; color: #666; }'; \
	 echo 'ul, ol { padding-left: 25px; }'; \
	 echo 'li { margin-bottom: 5px; }'; \
	 echo 'hr { border: none; border-top: 1px solid #ccc; margin: 30px 0; }'; \
	 echo '</style>'; \
	 echo '</head>'; \
	 echo '<body>'; \
	 echo '<article>'; \
	 if command -v pandoc >/dev/null 2>&1; then \
	   pandoc $< -f markdown -t html; \
	 elif command -v markdown >/dev/null 2>&1; then \
	   markdown $<; \
	 else \
	   echo '<pre>'; \
	   cat $<; \
	   echo '</pre>'; \
	   echo '<p><em>Note: Install pandoc or markdown for proper HTML conversion</em></p>'; \
	 fi; \
	 echo '</article>'; \
	 echo '</body>'; \
	 echo '</html>') > $@

# Copy app HTML files
apps/%.html: $(APPS_SRC)/%.html | apps
	cp $< $@

# Clean orphaned HTML files (articles with no corresponding markdown)
clean-orphans:
	@if [ -d articles ]; then \
		for html in articles/*.html; do \
			[ -f "$$html" ] || continue; \
			base=$$(basename "$$html" .html); \
			if [ ! -f "$(ARTICLES_SRC)/$$base.md" ]; then \
				echo "Removing orphaned article: $$html"; \
				rm -f "$$html"; \
			fi; \
		done; \
	fi

# Build targets
build-articles: $(HTML_ARTICLES)

build-apps: $(APP_OUTPUTS)

# Clean build files
clean:
	rm -f index.html
	rm -rf articles/
	rm -rf apps/

# Help target
help:
	@echo "WarTools.net Build System"
	@echo ""
	@echo "Targets:"
	@echo "  all            - Build entire site (default)"
	@echo "  build-articles - Build only articles"
	@echo "  build-apps     - Build only web apps"
	@echo "  clean-orphans  - Remove orphaned HTML files"
	@echo "  clean          - Remove built files"
	@echo "  help           - Show this help message"
	@echo ""
	@echo "Requirements:"
	@echo "  Optional: pandoc or markdown for converting .md to .html"
	@echo "  Fallback: displays markdown as preformatted text"
