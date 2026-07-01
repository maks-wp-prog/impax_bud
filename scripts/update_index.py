import re

# Read files
with open('docs/index.html', encoding='utf-8') as f:
    html = f.read()

with open('scripts/gallery_items.html', encoding='utf-8') as f:
    gallery_items = f.read().strip()

# Find <!-- GRID --> and the closing </div> of gallery__grid
# Pattern: after <!-- GRID --> comment, there's a <div class="gallery__grid"> followed by old items, closing with </div>\n        </div>\n    </div>\n</section>
pattern = r'(<!-- GRID[^>]*>)\s*<div class="gallery__grid">.*?</div>\s*(</div>\s*</section>)'
replacement = r'\1\n        <div class="gallery__grid">\n' + gallery_items + '\n        </div>\n    \2'

new_html = re.sub(pattern, replacement, html, flags=re.DOTALL)

# Fix header/footer logo hrefs
new_html = new_html.replace('<a href="#" class="header__logo">', '<a href="index.html" class="header__logo">')
new_html = new_html.replace('<a href="#" class="footer__logo">', '<a href="index.html" class="footer__logo">')
new_html = new_html.replace('\u0141azienki', 'Lazienki')

with open('docs/index.html', 'w', encoding='utf-8') as f:
    f.write(new_html)

print('OK')
