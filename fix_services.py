import re

def fix_bestseller():
    fpath = "backend/services/bestSellerService.ts"
    with open(fpath, "r") as f:
        content = f.read()
    
    # In createBestSeller
    content = content.replace("...data,", "...data,\n      domain: data.domain || \"\",")
    
    # In updateBestSeller
    content = content.replace("...data,", "...data,\n      ...(data.domain === null ? { domain: \"\" } : {}),")
    
    with open(fpath, "w") as f:
        f.write(content)

def fix_printmag():
    fpath = "backend/services/printMagazineService.ts"
    with open(fpath, "r") as f:
        content = f.read()
    
    content = content.replace("...data,", "...data,\n      domain: data.domain || \"\",")
    content = content.replace("...data,", "...data,\n      ...(data.domain === null ? { domain: \"\" } : {}),")
    
    with open(fpath, "w") as f:
        f.write(content)

fix_bestseller()
fix_printmag()
print("Services fixed")
