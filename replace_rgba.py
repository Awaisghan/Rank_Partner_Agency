import os

def replace_in_file(filepath):
    try:
        with open(filepath, 'r') as f:
            content = f.read()
        
        original = content
        
        # Replace rgba green colors with rgba gold
        content = content.replace('74,222,128', '245,158,11')
        content = content.replace('74, 222, 128', '245, 158, 11')
        content = content.replace('158,240,139', '245,158,11')
        content = content.replace('158, 240, 139', '245, 158, 11')
        
        if content != original:
            with open(filepath, 'w') as f:
                f.write(content)
            print(f"Updated rgba in: {filepath}")
    except Exception as e:
        print(f"Error on {filepath}: {e}")

def walk_dir(directory):
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.ts') or file.endswith('.css'):
                replace_in_file(os.path.join(root, file))

walk_dir('app')
print("Done rgba replacements.")
