import os

def replace_in_file(filepath):
    try:
        with open(filepath, 'r') as f:
            content = f.read()
        
        original = content
        
        # Replacements
        content = content.replace('#4ade80', '#f59e0b')
        content = content.replace('#9ef08b', '#f59e0b')
        content = content.replace('#8ae476', '#d97706')
        content = content.replace('#8ee07b', '#d97706')
        content = content.replace('emerald-', 'amber-')
        
        if content != original:
            with open(filepath, 'w') as f:
                f.write(content)
            print(f"Updated: {filepath}")
    except Exception as e:
        print(f"Error on {filepath}: {e}")

def walk_dir(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts') or file.endswith('.css'):
                replace_in_file(os.path.join(root, file))

walk_dir('app')
print("Done.")
