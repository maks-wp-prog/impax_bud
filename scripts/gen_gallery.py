import os

base = 'docs/assets/img/projects'
categories = {
    'domy': 'Domy',
    'remonty': 'Remonty',
    'lazienki': 'Lazienki',
    'kuchnie': 'Kuchnie',
    'elewacje': 'Elewacje',
    'komercyjne': 'Komercyjne',
}

captions = {
    'domy': 'Budowa domu - Warszawa',
    'remonty': 'Remont - Warszawa',
    'lazienki': 'Lazienka - Warszawa',
    'kuchnie': 'Kuchnia - Warszawa',
    'elewacje': 'Elewacja - Warszawa',
    'komercyjne': 'Lokal - Warszawa',
}

lines = []
for cat, label in categories.items():
    path = os.path.join(base, cat)
    if not os.path.isdir(path):
        continue
    files = sorted(os.listdir(path))
    for f in files:
        src = f'assets/img/projects/{cat}/{f}'
        caption = captions.get(cat, label)
        lines.append(f'            <div class="gallery__item" data-category="{cat}">')
        lines.append(f'                <img src="{src}" alt="{caption}" loading="lazy">')
        lines.append(f'                <span class="gallery__badge">{label}</span>')
        lines.append(f'                <span class="gallery__caption">{caption}</span>')
        lines.append(f'            </div>')

with open('scripts/gallery_items.html', 'w', encoding='utf-8') as f:
    f.write('\n'.join(lines))
print(f'Written {len(lines)//5} gallery items')
