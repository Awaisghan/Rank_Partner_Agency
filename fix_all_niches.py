import os
import glob

# Find all page.tsx in app/admin/
pages = glob.glob("app/admin/*/page.tsx")

for fpath in pages:
    with open(fpath, "r") as f:
        content = f.read()
    
    original = content
    # Replace the form mapping
    content = content.replace("pub.niches.age18 ?? false", "(pub as any).nicheAge18 ?? false")
    content = content.replace("pub.niches.heart ?? false", "(pub as any).nicheHeart ?? false")
    content = content.replace("pub.niches.cannabis ?? false", "(pub as any).nicheCannabis ?? false")
    content = content.replace("pub.niches.copyright ?? false", "(pub as any).nicheCopyright ?? false")
    content = content.replace("pub.niches.casino ?? false", "(pub as any).nicheCasino ?? false")
    content = content.replace("pub.niches.multiplier ?? \"\"", "(pub as any).nicheMultiplier ?? \"\"")
    
    # Replace the rendering loops
    content = content.replace("pub.niches.age18", "(pub as any).nicheAge18")
    content = content.replace("pub.niches.heart", "(pub as any).nicheHeart")
    content = content.replace("pub.niches.cannabis", "(pub as any).nicheCannabis")
    content = content.replace("pub.niches.copyright", "(pub as any).nicheCopyright")
    content = content.replace("pub.niches.casino", "(pub as any).nicheCasino")
    
    # Also handle optional chaining just in case
    content = content.replace("pub.niches?.age18", "(pub as any).nicheAge18")
    content = content.replace("pub.niches?.heart", "(pub as any).nicheHeart")
    content = content.replace("pub.niches?.cannabis", "(pub as any).nicheCannabis")
    content = content.replace("pub.niches?.copyright", "(pub as any).nicheCopyright")
    content = content.replace("pub.niches?.casino", "(pub as any).nicheCasino")
    
    if content != original:
        with open(fpath, "w") as f:
            f.write(content)
        print(f"Fixed {fpath}")

print("Done checking all admin pages.")
