import os
import re

def replace_in_file(filepath):
    try:
        with open(filepath, 'r') as f:
            content = f.read()
        
        original = content
        
        # Replace text-blue-* classes
        content = re.sub(r'text-blue-\d+', 'text-[#6d28d9]', content)
        
        # Replace specific hex codes used for blue text
        content = content.replace('text-[#3b82f6]', 'text-[#6d28d9]')
        content = content.replace('text-[#2563eb]', 'text-[#6d28d9]')
        
        if content != original:
            with open(filepath, 'w') as f:
                f.write(content)
            print(f"Updated text color in: {filepath}")
    except Exception as e:
        print(f"Error on {filepath}: {e}")

def walk_dir(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts') or file.endswith('.css'):
                replace_in_file(os.path.join(root, file))

walk_dir('app')
print("Done text color replacements.")
