import os
from PIL import Image

hand_note_dir = r"D:\HAND NOTE"
crop_dir = r"c:\bd-books-pdf\scratch_crops"
os.makedirs(crop_dir, exist_ok=True)

files = [f for f in os.listdir(hand_note_dir) if f.endswith(".jpg")]
files.sort()

print(f"Cropping headers and footers for {len(files)} files...")

for f in files:
    path = os.path.join(hand_note_dir, f)
    try:
        img = Image.open(path)
        w, h = img.size
        
        # Crop top 12% for header title
        top_crop = img.crop((0, 0, w, int(h * 0.15)))
        # Crop bottom 15% for page number footer
        bottom_crop = img.crop((0, int(h * 0.82), w, h))
        
        # Combine top and bottom vertically into a preview card
        preview = Image.new('RGB', (w, top_crop.height + bottom_crop.height))
        preview.paste(top_crop, (0, 0))
        preview.paste(bottom_crop, (0, top_crop.height))
        
        out_path = os.path.join(crop_dir, f"crop_{f}")
        preview.save(out_path, quality=80)
        print(f"Saved crop: crop_{f}")
    except Exception as e:
        print(f"Error {f}: {e}")
