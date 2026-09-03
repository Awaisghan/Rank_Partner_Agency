import re

file_path = "app/pricing/page.tsx"
with open(file_path, 'r') as f:
    content = f.read()

# Replace useSWR typings and get .items
replaces = [
    (
        r'const { data: publications, error: pubError, isLoading: pubLoading } = useSWR<Publication\[\]>\("/api/publications", fetcher\);',
        r'const { data: pubData, error: pubError, isLoading: pubLoading } = useSWR<{items: Publication[], pagination: any}>("/api/publications", fetcher);'
    ),
    (
        r'const { data: broadcastTV, error: btvError, isLoading: btvLoading } = useSWR<TVBroadcastItem\[\]>\("/api/broadcast-television", fetcher\);',
        r'const { data: btvData, error: btvError, isLoading: btvLoading } = useSWR<{items: TVBroadcastItem[], pagination: any}>("/api/broadcast-television", fetcher);'
    ),
    (
        r'const { data: digitalTV, error: dtvError, isLoading: dtvLoading } = useSWR<DigitalTVItem\[\]>\("/api/digital-television", fetcher\);',
        r'const { data: dtvData, error: dtvError, isLoading: dtvLoading } = useSWR<{items: DigitalTVItem[], pagination: any}>("/api/digital-television", fetcher);'
    ),
    (
        r'const { data: listicles, error: listError, isLoading: listLoading } = useSWR<ListiclePublication\[\]>\("/api/listicles", fetcher\);',
        r'const { data: listData, error: listError, isLoading: listLoading } = useSWR<{items: ListiclePublication[], pagination: any}>("/api/listicles", fetcher);'
    ),
    (
        r'const { data: bestSellers, error: bsError, isLoading: bsLoading } = useSWR<BestSellerPublication\[\]>\("/api/best-sellers", fetcher\);',
        r'const { data: bsData, error: bsError, isLoading: bsLoading } = useSWR<{items: BestSellerPublication[], pagination: any}>("/api/best-sellers", fetcher);'
    ),
    (
        r'const { data: printMags, error: printError, isLoading: printLoading } = useSWR<PrintMagazine\[\]>\("/api/print-magazines", fetcher\);',
        r'const { data: printData, error: printError, isLoading: printLoading } = useSWR<{items: PrintMagazine[], pagination: any}>("/api/print-magazines", fetcher);'
    ),
    (
        r'const { data: socialPosts, error: socialError, isLoading: socialLoading } = useSWR<SocialPostPublication\[\]>\("/api/social-posts", fetcher\);',
        r'const { data: socialData, error: socialError, isLoading: socialLoading } = useSWR<{items: SocialPostPublication[], pagination: any}>("/api/social-posts", fetcher);'
    )
]

for old, new in replaces:
    content = re.sub(old, new, content)

# Now replace variable uses
content = content.replace("const items = publications || [];", "const items = pubData?.items || [];")
content = content.replace("const items = publications || [];", "const items = pubData?.items || [];")

content = content.replace("publications || []", "pubData?.items || []")
content = content.replace("broadcastTV || []", "btvData?.items || []")
content = content.replace("digitalTV || []", "dtvData?.items || []")
content = content.replace("listicles || []", "listData?.items || []")
content = content.replace("bestSellers || []", "bsData?.items || []")
content = content.replace("printMags || []", "printData?.items || []")
content = content.replace("socialPosts || []", "socialData?.items || []")

with open(file_path, 'w') as f:
    f.write(content)

print("Pricing page patched.")
