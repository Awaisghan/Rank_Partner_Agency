import os
import re

def fix_admin():
    fpath = "app/admin/publications/page.tsx"
    with open(fpath, "r") as f:
        content = f.read()
    
    # 1. Fix the initial form mapping
    content = content.replace("nicheAge18: pub.niches.age18 ?? false,", "nicheAge18: (pub as any).nicheAge18 ?? false,")
    content = content.replace("nicheHeart: pub.niches.heart ?? false,", "nicheHeart: (pub as any).nicheHeart ?? false,")
    content = content.replace("nicheCannabis: pub.niches.cannabis ?? false,", "nicheCannabis: (pub as any).nicheCannabis ?? false,")
    content = content.replace("nicheCopyright: pub.niches.copyright ?? false,", "nicheCopyright: (pub as any).nicheCopyright ?? false,")
    content = content.replace("nicheCasino: pub.niches.casino ?? false,", "nicheCasino: (pub as any).nicheCasino ?? false,")
    content = content.replace("nicheMultiplier: pub.niches.multiplier ?? \"\",", "nicheMultiplier: (pub as any).nicheMultiplier ?? \"\",")
    
    # 2. Fix the rendering loop
    content = content.replace("pub.niches.age18", "(pub as any).nicheAge18")
    content = content.replace("pub.niches.heart", "(pub as any).nicheHeart")
    content = content.replace("pub.niches.cannabis", "(pub as any).nicheCannabis")
    content = content.replace("pub.niches.copyright", "(pub as any).nicheCopyright")
    content = content.replace("pub.niches.casino", "(pub as any).nicheCasino")
    
    with open(fpath, "w") as f:
        f.write(content)

def fix_pricing():
    fpath = "app/pricing/page.tsx"
    with open(fpath, "r") as f:
        content = f.read()
    
    content = content.replace("pub.niches?.age18", "(pub as any).nicheAge18")
    content = content.replace("pub.niches?.heart", "(pub as any).nicheHeart")
    content = content.replace("pub.niches?.cannabis", "(pub as any).nicheCannabis")
    content = content.replace("pub.niches?.copyright", "(pub as any).nicheCopyright")
    content = content.replace("pub.niches?.casino", "(pub as any).nicheCasino")
    
    with open(fpath, "w") as f:
        f.write(content)

fix_admin()
fix_pricing()
print("Fixed niches references")
