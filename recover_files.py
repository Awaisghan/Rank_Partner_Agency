import json
import ast

files_to_recover = [
    "/Users/apple/Desktop/agency_for_website/rank_partner/app/pricing/page.tsx",
    "/Users/apple/Desktop/agency_for_website/rank_partner/app/admin/listicles/page.tsx",
    "/Users/apple/Desktop/agency_for_website/rank_partner/app/admin/social-post/page.tsx",
    "/Users/apple/Desktop/agency_for_website/rank_partner/app/admin/best-sellers/page.tsx",
    "/Users/apple/Desktop/agency_for_website/rank_partner/app/admin/publications/page.tsx"
]

log_path = "/Users/apple/.gemini/antigravity-ide/brain/0a17cde2-e0e0-47bf-ba48-1502cfeb6b97/.system_generated/logs/transcript.jsonl"

actions = []
with open(log_path, 'r') as f:
    for line in f:
        try:
            # strict=False allows control characters in strings
            data = json.loads(line, strict=False)
            if 'tool_calls' in data:
                for call in data['tool_calls']:
                    if call['name'] in ('multi_replace_file_content', 'replace_file_content'):
                        args = call['args']
                        target = args.get('TargetFile', '')
                        if target.startswith('"') and target.endswith('"'):
                            target = target[1:-1]
                        if target in files_to_recover:
                            actions.append(args)
        except Exception as e:
            pass

for action in actions:
    target = action.get('TargetFile', '')
    if target.startswith('"') and target.endswith('"'):
        target = target[1:-1]
        
    print(f"Applying action to {target}")
    
    with open(target, 'r') as f:
        content = f.read()
        
    chunks = action.get('ReplacementChunks', [])
    if isinstance(chunks, str):
        try:
            chunks = ast.literal_eval(chunks)
        except Exception as e:
            try:
                chunks = json.loads(chunks, strict=False)
            except Exception as e2:
                print(f"Error parsing chunks: {e2}")
                continue

    if not isinstance(chunks, list):
        print("Chunks is not a list")
        continue

    for chunk in chunks:
        if not isinstance(chunk, dict):
            continue
            
        target_content = chunk.get('TargetContent', '')
        replacement_content = chunk.get('ReplacementContent', '')
        
        # Un-escape string literal if needed
        if isinstance(target_content, str) and target_content.startswith('"') and target_content.endswith('"'):
            try:
                target_content = json.loads(target_content, strict=False)
            except:
                pass
        if isinstance(replacement_content, str) and replacement_content.startswith('"') and replacement_content.endswith('"'):
            try:
                replacement_content = json.loads(replacement_content, strict=False)
            except:
                pass
            
        if target_content in content:
            content = content.replace(target_content, replacement_content)
        else:
            print(f"Target content not found in {target}: {target_content[:30]}...")
            
    with open(target, 'w') as f:
        f.write(content)

print("Recovery complete.")
