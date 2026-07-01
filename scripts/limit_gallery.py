import re

with open('docs/index.html', encoding='utf-8') as f:
    html = f.read()

six = """            <div class="gallery__item" data-category="domy">
                <img src="assets/img/projects/domy/IMG-20260630-WA0138.webp" alt="Budowa domu - Warszawa" loading="lazy">
                <span class="gallery__badge">Domy</span>
                <span class="gallery__caption">Budowa domu - Warszawa</span>
            </div>
            <div class="gallery__item" data-category="remonty">
                <img src="assets/img/projects/remonty/IMG-20260630-WA0110.webp" alt="Remont - Warszawa" loading="lazy">
                <span class="gallery__badge">Remonty</span>
                <span class="gallery__caption">Remont - Warszawa</span>
            </div>
            <div class="gallery__item" data-category="lazienki">
                <img src="assets/img/projects/lazienki/IMG-20260630-WA0115.webp" alt="Lazienka - Warszawa" loading="lazy">
                <span class="gallery__badge">Lazienki</span>
                <span class="gallery__caption">Lazienka - Warszawa</span>
            </div>
            <div class="gallery__item" data-category="kuchnie">
                <img src="assets/img/projects/kuchnie/IMG-20260630-WA0108.webp" alt="Kuchnia - Warszawa" loading="lazy">
                <span class="gallery__badge">Kuchnie</span>
                <span class="gallery__caption">Kuchnia - Warszawa</span>
            </div>
            <div class="gallery__item" data-category="elewacje">
                <img src="assets/img/projects/elewacje/IMG-20260630-WA0144.webp" alt="Elewacja - Warszawa" loading="lazy">
                <span class="gallery__badge">Elewacje</span>
                <span class="gallery__caption">Elewacja - Warszawa</span>
            </div>
            <div class="gallery__item" data-category="domy">
                <img src="assets/img/projects/domy/IMG-20260630-WA0140.webp" alt="Budowa domu - Warszawa" loading="lazy">
                <span class="gallery__badge">Domy</span>
                <span class="gallery__caption">Budowa domu - Warszawa</span>
            </div>"""

html = re.sub(
    r'(<div class="gallery__grid">).*?(        </div>\n    </div>\n</section>)',
    r'\1\n' + six + r'\n        \2',
    html,
    flags=re.DOTALL
)

with open('docs/index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print(f'Lines: {len(html.splitlines())}')
