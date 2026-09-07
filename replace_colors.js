const fs = require('fs');
const path = require('path');

const dir = './app';

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;
    
    // Replace hex colors
    content = content.replace(/#4ade80/gi, '#f59e0b');
    content = content.replace(/#9ef08b/gi, '#f59e0b');
    content = content.replace(/#8ae476/gi, '#d97706');
    content = content.replace(/#8ee07b/gi, '#d97706');
    
    // Replace tailwind emerald classes with amber
    content = content.replace(/emerald-/g, 'amber-');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
    }
}

function walkDir(currentPath) {
    const files = fs.readdirSync(currentPath);
    for (const file of files) {
        const fullPath = path.join(currentPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walkDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
            replaceInFile(fullPath);
        }
    }
}

walkDir(dir);
console.log("Done.");
