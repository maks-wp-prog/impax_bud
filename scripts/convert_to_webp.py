import os
from PIL import Image

src = r'C:\Users\maxsi\Downloads\impact images'
dst = r'H:\git_projects\impax_bud\html\assets\img\projects'

os.makedirs(dst, exist_ok=True)

jpgs = [f for f in os.listdir(src) if f.lower().endswith('.jpg')]
print(f'Found {len(jpgs)} JPG files')

ok, err = 0, 0
for f in sorted(jpgs):
    inpath = os.path.join(src, f)
    outname = os.path.splitext(f)[0] + '.webp'
    outpath = os.path.join(dst, outname)
    
    try:
        img = Image.open(inpath)
        if img.mode in ('RGBA', 'P', 'CMYK'):
            img = img.convert('RGB')
        img.save(outpath, 'WEBP', quality=90)
        w, h = img.size
        size_kb = os.path.getsize(outpath) // 1024
        print(f'  OK  {f} -> {outname}  ({w}x{h}, {size_kb}KB)')
        ok += 1
    except Exception as e:
        print(f'  ERR {f}: {e}')
        err += 1

print(f'\nDone! {ok} converted, {err} errors')
