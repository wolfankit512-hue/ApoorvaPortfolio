# ✨ Apoorva Gupta - Visual Designer Portfolio

<div align="center">

![Portfolio Preview](https://img.shields.io/badge/Portfolio-Live-FF6B6B?style=for-the-badge&logo=vercel)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**A stunning, industry-level portfolio website showcasing visual design work**

[View Live Demo](#) • [Report Bug](../../issues) • [Request Feature](../../issues)

</div>

---

## 🎨 About The Project

This is a professional portfolio website for **Apoorva Gupta**, a Visual Designer specializing in AI-generated graphics, motion design, and viral content creation. The portfolio features a modern, aesthetic design with smooth animations, a bento grid layout, and an immersive theater mode for viewing projects.

### 👩‍🎨 Designer Profile
- **Name:** Apoorva Gupta
- **Role:** Visual Designer & Creative Technologist
- **Education:** BBA from Lovely Professional University
- **Specialization:** AI Graphics, Motion Design, Viral Content
- **Tools:** Photoshop, CorelDraw, After Effects, Premiere Pro

---

## 🚀 Features

### 🎯 Core Features
| Feature | Description |
|---------|-------------|
| **Bento Grid Layout** | Mixed-size cards (hero, large, medium, small, tall) creating visual interest like top design agencies |
| **Theater Mode** | Cinematic full-screen lightbox with navigation arrows and keyboard controls |
| **3D Tilt Effects** | Cards respond to mouse movement with subtle perspective transforms |
| **Smooth Animations** | Staggered reveal animations as cards come into view |
| **Category Filtering** | Filter projects by software (Photoshop, CorelDraw, After Effects, Premiere Pro) |
| **Scroll Progress Bar** | Visual indicator showing page scroll progress |
| **Responsive Design** | Fully responsive across all devices |

### 🎬 Theater Mode Controls
- **Arrow Keys (← →):** Navigate between projects
- **Escape Key:** Close theater mode
- **Click Outside:** Close theater mode
- **Touch Swipe:** Navigate on mobile devices

### 💫 Visual Effects
- Animated gradient blobs in background
- Glassmorphism UI elements
- Hover effects with 3D transforms
- Loading shimmer animations
- Pulse animations for availability badges

---

## 🛠️ Tech Stack

### Frontend
```
├── HTML5          - Semantic markup & structure
├── CSS3           - Modern styling with CSS Grid & Flexbox
│   ├── CSS Variables (Custom Properties)
│   ├── CSS Animations & Transitions
│   ├── Glassmorphism Effects
│   └── Responsive Media Queries
└── JavaScript     - Interactivity & animations
    ├── ES6+ Modules
    ├── Intersection Observer API
    ├── Fetch API for JSON data
    └── Custom Event Handlers
```

### Design System
- **Primary Color:** `#FF6B6B` (Coral Red)
- **Secondary Color:** `#4ECDC4` (Teal)
- **Accent Color:** `#FFE66D` (Yellow)
- **Font Family:** Inter (body), Quicksand (headings)

### Project Structure
```
ApoorvaPortfolio/
├── 📄 index.html              # Home page
├── 📄 projects.html           # Work/Portfolio page (Bento Grid)
├── 📄 about.html              # About page
├── 📄 contact.html            # Contact page
├── 📄 projects.json           # Project data (auto-generated)
├── 📄 package.json            # NPM configuration
├── 📄 build.js                # Project scanner script
│
├── 📁 assets/
│   ├── 📁 css/
│   │   ├── styles.css         # Global styles
│   │   ├── showcase.css       # Bento grid & theater mode styles
│   │   └── lightbox.css       # Lightbox styles
│   │
│   ├── 📁 js/
│   │   ├── showcase.js        # Bento grid & theater mode logic
│   │   ├── background.js      # 3D animated background
│   │   ├── lightbox.js        # Lightbox functionality
│   │   └── animations.js      # Scroll animations
│   │
│   └── 📁 img/
│       ├── 📁 latest/         # Featured projects
│       ├── 📁 photoshop/      # Photoshop projects
│       ├── 📁 coreldraw/      # CorelDraw projects
│       ├── 📁 aftereffects/   # After Effects projects
│       └── 📁 premierepro/    # Premiere Pro projects
│
└── 📁 thumbnails/             # Auto-generated thumbnails
```

---

## ⚙️ How It Works

### 1️⃣ Project Scanner (`build.js`)
The build script automatically scans the `assets/img/` folders and generates `projects.json`:

```javascript
// Scans folders: latest, photoshop, coreldraw, aftereffects, premierepro
// Generates thumbnails for faster loading
// Creates structured JSON with metadata
```

**Run the scanner:**
```bash
npm run scan
```

### 2️⃣ Bento Grid System (`showcase.js`)
The `ShowcaseGallery` class handles:
- Loading projects from `projects.json`
- Rendering cards with dynamic sizes
- 3D tilt effects on hover
- Filter functionality
- Theater mode for full-screen viewing

**Size Pattern:**
```
Hero → Medium → Tall → Large → Medium → Small → Medium → Small → ...
```

### 3️⃣ Theater Mode
Click any project card to open an immersive full-screen viewer:
- High-resolution media display
- Project title and category info
- Navigation between projects
- Keyboard and touch support

### 4️⃣ Category Filtering
Projects are categorized by software used:
- 🔵 **Photoshop** - Photo manipulation, compositing
- 🟢 **CorelDraw** - Vector graphics, illustrations
- 🟣 **After Effects** - Motion graphics, animations
- 🩷 **Premiere Pro** - Video editing, content creation

---

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/wolfankit512-hue/ApoorvaPortfolio.git
   cd ApoorvaPortfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Add your projects**
   - Place images/videos in the appropriate folders under `assets/img/`
   - Supported formats: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.mp4`, `.webm`, `.mov`

4. **Generate project data**
   ```bash
   npm run scan
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   ```
   http://localhost:3000
   ```

---

## 📁 Adding Projects

### Folder Structure for Projects
```
assets/img/
├── latest/          # Featured/Latest projects (shown in hero section)
├── photoshop/       # Adobe Photoshop work
├── coreldraw/       # CorelDraw vector work
├── aftereffects/    # After Effects animations
└── premierepro/     # Premiere Pro videos
```

### Supported File Types
| Type | Extensions |
|------|------------|
| Images | `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp` |
| Videos | `.mp4`, `.webm`, `.mov`, `.avi`, `.mkv` |

### After Adding Files
Run the scanner to update the portfolio:
```bash
npm run scan
```

---

## 🎨 Customization

### Colors (styles.css)
```css
:root {
    --primary: #FF6B6B;      /* Main accent color */
    --secondary: #4ECDC4;    /* Secondary accent */
    --accent: #FFE66D;       /* Highlight color */
    --orange: #FF8C42;       /* Warm accent */
    --background: #F8F9FA;   /* Page background */
    --surface: #FFFFFF;      /* Card backgrounds */
}
```

### Fonts
The portfolio uses Google Fonts:
- **Inter** - Clean, modern sans-serif for body text
- **Quicksand** - Friendly, rounded font for headings

---

## 📱 Responsive Breakpoints

| Breakpoint | Description |
|------------|-------------|
| `1400px+` | Full 12-column bento grid |
| `1200px` | 10-column grid |
| `1000px` | 8-column grid |
| `768px` | 6-column grid (tablet) |
| `600px` | 4-column grid (mobile) |
| `480px` | 2-column grid (small mobile) |

---

## 🔧 Scripts

| Command | Description |
|---------|-------------|
| `npm run scan` | Scan images and generate projects.json |
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build for production |

---

## 📄 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/index.html` | Landing page with hero section |
| Work | `/projects.html` | Portfolio with bento grid & theater mode |
| About | `/about.html` | Designer bio, skills, education |
| Contact | `/contact.html` | Contact form and social links |

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Contact

**Apoorva Gupta**
- 📧 Email: [apoorvagupta1305@gmail.com](mailto:apoorvagupta1305@gmail.com)
- 💼 LinkedIn: [Connect on LinkedIn](#)
- 🎨 Behance: [View Portfolio](#)

---

<div align="center">

**Made with ❤️ by Apoorva Gupta**

⭐ Star this repo if you like it!

</div>
