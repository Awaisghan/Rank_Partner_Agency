import os
import glob
import re

files = [
    "app/admin/broadcast-television/page.tsx",
    "app/admin/digital-television/page.tsx",
    "app/admin/listicles/page.tsx",
    "app/admin/best-sellers/page.tsx",
    "app/admin/print/page.tsx",
    "app/admin/social-post/page.tsx"
]

for file in files:
    with open(file, 'r') as f:
        content = f.read()

    # Find: const { data: apiItems, error, isLoading, mutate } = useSWR<TYPE>("/api/...", fetcher);
    # Replace: const { data: apiResponse, error, isLoading, mutate } = useSWR<{items: TYPE, pagination: any}>("/api/...", fetcher);
    
    # Also replace: const items = apiItems || []; with const items = apiResponse?.items || [];
    # And magazines = apiItems || []; with magazines = apiResponse?.items || [];
    
    content = re.sub(
        r'const { data: apiItems, error, isLoading, mutate } = useSWR<(.+?)>\((".+?"), fetcher\);',
        r'const { data: apiResponse, error, isLoading, mutate } = useSWR<{items: \1, pagination: any}>(\2, fetcher);',
        content
    )
    
    content = content.replace('apiItems || []', 'apiResponse?.items || []')
    
    with open(file, 'w') as f:
        f.write(content)

print("Admin pages patched.")
