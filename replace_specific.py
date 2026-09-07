import os

def replace_in_file(filepath, replacements):
    try:
        with open(filepath, 'r') as f:
            content = f.read()
        
        original = content
        for old, new in replacements.items():
            content = content.replace(old, new)
        
        if content != original:
            with open(filepath, 'w') as f:
                f.write(content)
            print(f"Updated {filepath}")
    except Exception as e:
        print(f"Error on {filepath}: {e}")

page_replacements = {
    '#d1a6f4': '#f59e0b',
    '#dfc6f4': '#d97706'
}

navbar_replacements = {
    '#d8b4fe': '#f59e0b',
    '#e9d5ff': '#d97706',
    '#9bf389': '#f59e0b',
    'bg-[#030919] text-white font-bold text-sm transition-all duration-200 hover:bg-[#07132e]': 'bg-[#f59e0b] text-[#062c19] font-bold text-sm transition-all duration-200 hover:bg-[#d97706]'
}

replace_in_file('app/page.tsx', page_replacements)
replace_in_file('app/components/Navbar.tsx', navbar_replacements)
print("Done specific color replacements.")
