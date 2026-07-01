from PIL import Image
from collections import Counter

img = Image.open('docs/assets/img/projects/logo.png').convert('RGBA')
w, h = img.size
print(f'Logo size: {w}x{h}')

# Sample edges for background color
edges = []
for x in range(0, w, max(1, w // 30)):
    edges.append(img.getpixel((x, 0)))
    edges.append(img.getpixel((x, h - 1)))
for y in range(0, h, max(1, h // 30)):
    edges.append(img.getpixel((0, y)))
    edges.append(img.getpixel((w - 1, y)))

solid_edges = [p for p in edges if len(p) == 4 and p[3] > 100]
bg = Counter(solid_edges).most_common(5)
print('Background/edge colors:')
for color, count in bg:
    r, g, b, a = color
    hex_c = f'#{r:02x}{g:02x}{b:02x}'
    pct = count / len(solid_edges) * 100 if solid_edges else 0
    print(f'  {hex_c} rgba({r},{g},{b},{a}) — {pct:.1f}%')

# Sample dominant colors from the whole image
allpx = []
for y in range(0, h, max(1, h // 15)):
    for x in range(0, w, max(1, w // 15)):
        p = img.getpixel((x, y))
        if p[3] > 200:
            allpx.append(p)

dom = Counter(allpx).most_common(8)
print('\nDominant colors (sampled):')
for color, count in dom:
    r, g, b, a = color
    hex_c = f'#{r:02x}{g:02x}{b:02x}'
    pct = count / len(allpx) * 100 if allpx else 0
    print(f'  {hex_c} rgba({r},{g},{b},{a}) — {pct:.1f}%')
