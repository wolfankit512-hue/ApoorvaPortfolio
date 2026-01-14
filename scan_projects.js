const fs = require('fs');
const path = require('path');

// Configuration
const IMG_DIR = path.join(__dirname, 'assets', 'img');
const OUTPUT_FILE = path.join(__dirname, 'projects.json');

// Folder mappings: folderName -> { category, softwareName, isSelected }
const FOLDER_MAP = {
    'latest': { category: 'mixed', softwareName: 'Latest Project', isSelected: true },
    'photoshop': { category: 'photoshop', softwareName: 'Photoshop', isSelected: false },
    'coreldraw': { category: 'coreldraw', softwareName: 'CorelDraw', isSelected: false },
    'aftereffects': { category: 'aftereffects', softwareName: 'After Effects', isSelected: false },
    'premierpro': { category: 'premierepro', softwareName: 'Premiere Pro', isSelected: false }, // Folder is 'premierpro'
    'illustrator': { category: 'illustrator', softwareName: 'Illustrator', isSelected: false }
};

// Helper to get files from a directory
function getFiles(dir) {
    if (!fs.existsSync(dir)) return [];
    return fs.readdirSync(dir).filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    });
}

// Main function
function generateProjectsJson() {
    console.log('Scanning for projects...');
    let allProjects = [];
    let idCounter = 1;

    // Iterate over defined folders
    for (const [folderName, config] of Object.entries(FOLDER_MAP)) {
        const dirPath = path.join(IMG_DIR, folderName);

        if (!fs.existsSync(dirPath)) {
            console.warn(`Warning: Folder not found: ${dirPath}`);
            continue;
        }

        const files = getFiles(dirPath);
        console.log(`Found ${files.length} files in ${folderName}`);

        files.forEach(file => {
            // Construct relative path for browser
            // Note: We need to use forward slashes for web URLs even on Windows
            const relativePath = `assets/img/${folderName}/${file}`;

            allProjects.push({
                id: idCounter++,
                title: `${config.softwareName} Project ${idCounter}`, // Placeholder title
                category: config.category,
                thumbnail: relativePath,
                filename: relativePath, // Link to the image itself for "full screen"
                isSelected: config.isSelected,
                software: [config.softwareName]
            });
        });
    }

    // Write to projects.json
    const jsonContent = JSON.stringify(allProjects, null, 2);
    fs.writeFileSync(OUTPUT_FILE, jsonContent);

    console.log(`Successfully generated projects.json with ${allProjects.length} projects.`);
}

// Run
generateProjectsJson();
