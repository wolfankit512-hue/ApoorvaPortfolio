const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');
const sharp = require('sharp');
const ejs = require('ejs');

// Configuration
const CONFIG = {
    imgSource: './assets/img',
    outputDir: '.', // Root directory for GitHub Pages
    viewsDir: './views',
    projectTemplate: 'project.ejs',
    projectsJson: 'projects.json'
};

async function build() {
    console.log('🚀 Starting build process...');

    try {
        // 1. Scan for images
        console.log('📂 Scanning for images...');
        // We look for images in subfolders of assets/img
        // Pattern: assets/img/{category}/{filename}.{jpg,png,jpeg}
        const imageFiles = glob.sync(`${CONFIG.imgSource}/**/*.{jpg,png,jpeg,webp}`);

        if (imageFiles.length === 0) {
            console.warn('⚠️ No images found in assets/img. Please add some images.');
            return;
        }

        const projects = [];

        // 2. Process images and build project data
        console.log(`🖼️  Processing ${imageFiles.length} images...`);

        for (const file of imageFiles) {
            const pathParts = file.split('/');
            // Handle Windows paths if necessary, though glob usually returns forward slashes
            const normalizedPath = file.replace(/\\/g, '/');
            const parts = normalizedPath.split('/');

            const filename = parts.pop();
            const category = parts[parts.length - 1]; // e.g., 'photoshop', 'illustrator'
            const nameWithoutExt = filename.split('.').slice(0, -1).join('.');

            // Create optimized webp version for thumbnail
            // We'll save it in the same folder for simplicity or a 'dist' folder?
            // For GitHub Pages, we keep it simple. Let's just use the original for now 
            // or create a .webp version next to it.

            // Let's create a thumbnail version
            const thumbPath = normalizedPath.replace(/(\.[\w\d_-]+)$/i, '_thumb.webp');

            // Only generate if it doesn't exist or force rebuild? 
            // For now, let's just generate it.
            await sharp(file)
                .resize(600) // Resize for grid
                .webp({ quality: 80 })
                .toFile(thumbPath);

            const projectData = {
                id: nameWithoutExt,
                title: nameWithoutExt.replace(/[_-]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), // Humanize
                category: category,
                date: new Date().toLocaleDateString(), // Mock date
                description: `A beautiful ${category} project named ${nameWithoutExt}.`,
                image: normalizedPath,
                thumbnail: thumbPath,
                filename: `project-${nameWithoutExt}.html`
            };

            projects.push(projectData);
        }

        // 3. Generate projects.json
        console.log('📝 Generating projects.json...');
        await fs.writeJson(CONFIG.projectsJson, projects, { spaces: 2 });

        // 4. Generate HTML pages
        console.log('📄 Generating HTML pages...');
        const templatePath = path.join(CONFIG.viewsDir, CONFIG.projectTemplate);
        const template = await fs.readFile(templatePath, 'utf-8');

        for (const project of projects) {
            const html = ejs.render(template, { project });
            const outputPath = path.join(CONFIG.outputDir, project.filename);
            await fs.writeFile(outputPath, html);
            console.log(`   ✅ Generated ${project.filename}`);
        }

        console.log('✨ Build completed successfully!');

    } catch (error) {
        console.error('❌ Build failed:', error);
        process.exit(1);
    }
}

build();
