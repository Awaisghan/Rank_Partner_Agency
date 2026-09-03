import re

file_path = "app/pricing/page.tsx"
with open(file_path, 'r') as f:
    content = f.read()

# I want to add these lines right after the SWR hooks:
new_vars = """
  const publications = pubData?.items || [];
  const broadcastTV = btvData?.items || [];
  const digitalTV = dtvData?.items || [];
  const listicles = listData?.items || [];
  const bestSellers = bsData?.items || [];
  const printMags = printData?.items || [];
  const socialPosts = socialData?.items || [];
"""

# Let's just find the last SWR hook and append it.
target = 'const { data: socialData, error: socialError, isLoading: socialLoading } = useSWR<{items: SocialPostPublication[], pagination: any}>("/api/social-posts", fetcher);'
content = content.replace(target, target + "\n" + new_vars)

with open(file_path, 'w') as f:
    f.write(content)

