/**
 * Auto-generate projects.json from image folders
 * 
 * Simply add your images to the folders and run:
 *   node generate-projects.js
 * 
 * The script will automatically:
 * - Scan all image folders (photoshop, coreldraw, aftereffects, premierpro, latest)
 * - Create project entries for each image
 * - Generate a clean title from the filename
 * - Update projects.json
 */

const fs = require('fs');
const path = require('path');

// Configuration
const IMG_BASE = 'assets/img';
const OUTPUT_FILE = 'projects.json';

// Folder to category mapping
const FOLDERS = {
    'latest': { category: 'photoshop', software: 'Photoshop', featured: true },
    'photoshop': { category: 'photoshop', software: 'Photoshop', featured: false },
    'coreldraw': { category: 'coreldraw', software: 'CorelDraw', featured: false },
    'aftereffects': { category: 'aftereffects', software: 'After Effects', featured: false },
    'premierpro': { category: 'premierepro', software: 'Premiere Pro', featured: false }
};

// Supported image extensions
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];

// Generate a clean title from filename
function generateTitle(filename) {
    // Remove extension
    let name = path.basename(filename, path.extname(filename));

    // Remove common suffixes
    name = name.replace(/[-_](recovered|done|final|v\d+|copy|\d+)$/gi, '');

    // Replace underscores and hyphens with spaces
    name = name.replace(/[-_]/g, ' ');

    // Capitalize each word
    name = name.replace(/\b\w/g, l => l.toUpperCase());

    // Clean up extra spaces
    name = name.replace(/\s+/g, ' ').trim();

    return name || 'Untitled Project';
}

// Scan a folder for images
function scanFolder(folderName, config) {
    const folderPath = path.join(IMG_BASE, folderName);
    const projects = [];

    if (!fs.existsSync(folderPath)) {
        console.log(`⚠️  Folder not found: ${folderPath}`);
        return projects;
    }

    const files = fs.readdirSync(folderPath);

    files.forEach(file => {
        const ext = path.extname(file).toLowerCase();
        if (IMAGE_EXTENSIONS.includes(ext)) {
            const filePath = `${IMG_BASE}/${folderName}/${file}`;
            projects.push({
                title: generateTitle(file),
                category: config.category,
                thumbnail: filePath,
                filename: filePath,
                isSelected: config.featured,
                software: [config.software]
            });
        }
    });

    console.log(`📁 ${folderName}: Found ${projects.length} images`);
    return projects;
}

// Main function
function generateProjectsJson() {
    console.log('\n🚀 Generating projects.json...\n');

    let allProjects = [];
    let seenFilenames = new Set(); // Track filenames to avoid duplicates
    let duplicatesSkipped = 0;
    let id = 1;

    // Scan each folder (latest first so those are marked as featured)
    for (const [folder, config] of Object.entries(FOLDERS)) {
        const projects = scanFolder(folder, config);
        projects.forEach(project => {
            // Get just the filename (without path) to check for duplicates
            const filename = path.basename(project.filename);

            if (seenFilenames.has(filename)) {
                // Skip duplicate
                duplicatesSkipped++;
                console.log(`   ⏭️  Skipped duplicate: ${filename}`);
            } else {
                seenFilenames.add(filename);
                project.id = id++;
                allProjects.push(project);
            }
        });
    }

    // Write to file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allProjects, null, 2));

    console.log(`\n✅ Generated ${OUTPUT_FILE} with ${allProjects.length} projects!`);
    if (duplicatesSkipped > 0) {
        console.log(`⏭️  Skipped ${duplicatesSkipped} duplicate(s)`);
    }
    console.log('\n📊 Summary:');

    // Print summary
    const summary = {};
    allProjects.forEach(p => {
        const sw = p.software[0];
        summary[sw] = (summary[sw] || 0) + 1;
    });
    Object.entries(summary).forEach(([sw, count]) => {
        console.log(`   ${sw}: ${count} projects`);
    });

    console.log('\n🎉 Done! Refresh your browser to see the changes.\n');
}

// Run
generateProjectsJson();
