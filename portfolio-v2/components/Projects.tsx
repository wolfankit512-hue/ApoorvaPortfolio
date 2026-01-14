"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./Projects.module.css";
import { ExternalLink, Github } from "lucide-react";

type Category = "All" | "Web" | "Android" | "Desktop";

const projects = [
    {
        id: 1,
        title: "E-Commerce Platform",
        category: "Web",
        emoji: "🛍️",
        description: "Modern shopping platform with real-time inventory and seamless checkout experience.",
        tech: ["Next.js", "Stripe", "PostgreSQL"],
        demo: "#",
        code: "#"
    },
    {
        id: 2,
        title: "Fitness Tracker",
        category: "Android",
        emoji: "💪",
        description: "Track your workouts, nutrition, and progress with beautiful visualizations.",
        tech: ["Kotlin", "Jetpack Compose", "Room"],
        demo: "#",
        code: "#"
    },
    {
        id: 3,
        title: "Code Editor Pro",
        category: "Desktop",
        emoji: "⚡",
        description: "Lightning-fast code editor with AI-powered completions and themes.",
        tech: ["Electron", "Monaco", "TypeScript"],
        demo: "#",
        code: "#"
    },
    {
        id: 4,
        title: "Chat Application",
        category: "Web",
        emoji: "💬",
        description: "Real-time messaging with voice calls, file sharing, and end-to-end encryption.",
        tech: ["React", "WebRTC", "Socket.io"],
        demo: "#",
        code: "#"
    },
];

export default function Projects() {
    const [filter, setFilter] = useState<Category>("All");

    const filteredProjects = projects.filter(
        (p) => filter === "All" || p.category === filter
    );

    return (
        <section id="projects" className={styles.section}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ textAlign: 'center', marginBottom: '2rem' }}
                >
                    <div className={styles.sectionTitle} style={{ color: 'var(--primary)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
                        Portfolio
                    </div>
                    <h2 style={{ fontSize: '3rem', marginTop: '1rem' }}>
                        My <span className="gradient-text">Amazing Projects</span> 🎨
                    </h2>
                </motion.div>

                <div className={styles.filterButtons}>
                    {(["All", "Web", "Android", "Desktop"] as Category[]).map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`${styles.filterBtn} ${filter === cat ? styles.activeFilter : ""}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <motion.div layout className={styles.grid}>
                    <AnimatePresence>
                        {filteredProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className={styles.projectCard}
                            >
                                <div className={styles.imageWrapper}>
                                    <span className={styles.category}>{project.category}</span>
                                    {project.emoji}
                                </div>
                                <div className={styles.content}>
                                    <h3 className={styles.title}>{project.title}</h3>
                                    <p className={styles.description}>{project.description}</p>
                                    <div className={styles.tags}>
                                        {project.tech.map((tech) => (
                                            <span key={tech} className={styles.tag}>{tech}</span>
                                        ))}
                                    </div>
                                    <div className={styles.buttons}>
                                        <a href={project.demo} className={`${styles.btn} ${styles.demoBtn}`}>
                                            <ExternalLink size={16} /> Demo
                                        </a>
                                        <a href={project.code} className={`${styles.btn} ${styles.codeBtn}`}>
                                            <Github size={16} /> Code
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
}
