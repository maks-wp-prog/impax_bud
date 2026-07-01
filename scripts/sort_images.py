import os, shutil
from PIL import Image
import statistics

src = r'H:\git_projects\impax_bud\html\assets\img\projects'
categories = ['domy', 'remonty', 'lazienki', 'kuchnie', 'elewacje', 'komercyjne']

# Create category folders
for cat in categories:
    os.makedirs(os.path.join(src, cat), exist_ok=True)

files = [f for f in os.listdir(src) if f.endswith('.webp')]
print(f'Analyzing {len(files)} images...\n')

results = []

for f in sorted(files):
    path = os.path.join(src, f)
    try:
        img = Image.open(path)
        w, h = img.size
        ratio = w / h
        size_kb = os.path.getsize(path) // 1024
        
        # Calculate average brightness (sample pixels)
        img_small = img.resize((100, 100))
        pixels = list(img_small.getdata())
        if isinstance(pixels[0], tuple):
            brightness = statistics.mean([sum(p) / (3 * 255) for p in pixels])
        else:
            brightness = statistics.mean(pixels) / 255
        
        results.append((f, w, h, ratio, brightness, size_kb))
        
    except Exception as e:
        print(f'ERR {f}: {e}')

# Heuristic categorization
for f, w, h, ratio, brightness, size_kb in results:
    portrait = ratio < 0.85
    landscape = ratio > 1.15
    
    if landscape and brightness > 0.5:
        cat = 'elewacje'  # bright outdoor = facade
    elif landscape and brightness <= 0.5:
        cat = 'domy'  # darkish outdoor = house construction
    elif portrait and brightness > 0.6 and h > 1800:
        cat = 'lazienki'  # bright tall indoor = bathroom
    elif portrait and brightness > 0.5:
        cat = 'kuchnie'  # medium bright indoor = kitchen
    elif portrait:
        cat = 'remonty'  # indoor renovation
    else:
        cat = 'komercyjne'
    
    src_path = os.path.join(src, f)
    dst_path = os.path.join(src, cat, f)
    shutil.move(src_path, dst_path)
    print(f'{cat:12s}  {f:40s}  {w}x{h}  bright={brightness:.2f}  ratio={ratio:.2f}')

# Count
print()
for cat in categories:
    count = len(os.listdir(os.path.join(src, cat)))
    print(f'{cat}: {count} photos')
