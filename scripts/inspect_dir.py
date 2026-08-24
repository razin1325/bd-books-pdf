import os
import shutil

dest_dir = r"D:\HAND NOTE"

# Let's inspect the files currently saved in D:\HAND NOTE
files = sorted(os.listdir(dest_dir))
print("Current files in D:\\HAND NOTE:")
for f in files:
    print(f)
