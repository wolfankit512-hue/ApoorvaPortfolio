"use client";

import { motion } from "framer-motion";
import styles from "./About.module.css";

const skills = [
    "React", "Next.js", "TypeScript",
    "Node.js", "Python", "Kotlin",
    "Android", "Electron", "AWS"
];

export default function About() {
    return (
        <section id="about" className={styles.section}>
            <div className="container">
                <div className={styles.grid}>
                    <motion.div
                        className={styles.imageCard}
                        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        👨‍💻
                    </motion.div>

                    <motion.div
                        className={styles.textCard}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className={styles.sectionTitle}>About Me</div>
                        <h2 className={styles.mainTitle}>
                            Turning ideas into <span className="gradient-text">digital reality</span>
                        </h2>
                        <p className={styles.description}>
                            I&apos;m a passionate developer who loves creating beautiful, functional,
                            and user-friendly applications. From web to mobile to desktop, I bring
                            ideas to life with clean code and creative solutions.
                        </p>

                        <div className={styles.skillsGrid}>
                            {skills.map((skill, index) => (
                                <motion.div
                                    key={skill}
                                    className={styles.skill}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    {skill}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
