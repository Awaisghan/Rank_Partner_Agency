import os
import re

def replace_in_file(filepath):
    try:
        with open(filepath, 'r') as f:
            content = f.read()
        
        original = content
        
        # Hex codes
        content = content.replace('#2563eb', '#6d28d9')
        content = content.replace('#3b82f6', '#6d28d9')
        content = content.replace('#1d4ed8', '#5b21b6')
        
        # RGBs for shadows/glows
        content = content.replace('37,99,235', '109,40,217')
        content = content.replace('37, 99, 235', '109, 40, 217')
        content = content.replace('59,130,246', '109,40,217')
        content = content.replace('59, 130, 246', '109, 40, 217')
        
        # Tailwind classes
        content = content.replace('blue-', 'violet-')
        
        # Adjust hovers so we don't lose hover effects if everything becomes violet-700
        content = content.replace('hover:bg-violet-700', 'hover:bg-violet-800')
        content = content.replace('hover:text-violet-700', 'hover:text-violet-800')
        content = content.replace('hover:border-violet-700', 'hover:border-violet-800')
        
        # Force the primary violet to be 700 (#6d28d9)
        content = content.replace('violet-600', 'violet-700')
        content = content.replace('violet-500', 'violet-700')
        
        if content != original:
            with open(filepath, 'w') as f:
                f.write(content)
            print(f"Updated in: {filepath}")
    except Exception as e:
        print(f"Error on {filepath}: {e}")

def walk_dir(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts') or file.endswith('.css'):
                replace_in_file(os.path.join(root, file))

walk_dir('app')
print("Done all blue replacements.")
