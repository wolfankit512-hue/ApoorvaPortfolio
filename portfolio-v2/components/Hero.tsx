"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./Hero.module.css";
import { ArrowRight, Download, Sparkles } from "lucide-react";

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={`${styles.blob} ${styles.blob1}`} />
            <div className={`${styles.blob} ${styles.blob2}`} />
            <div className={`${styles.blob} ${styles.blob3}`} />

            <div className="container">
                <motion.div
                    className={styles.content}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.div
                        className={styles.badge}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                    >
                        <div className={styles.dot} />
                        Available for work
                    </motion.div>

                    <h1 className={styles.title}>
                        Hi, I'm <span className="gradient-text">Ankit</span>
                        <br />
                        I build <span className={styles.highlight}>amazing things</span> 🚀
                    </h1>

                    <p className={styles.subtitle}>
                        I&apos;m a passionate developer crafting beautiful web apps, powerful desktop software,
                        and sleek Android applications. Let&apos;s create something extraordinary together!
                    </p>

                    <div className={styles.buttons}>
                        <Link href="#projects" className="btn btn-primary">
                            <Sparkles size={20} />
                            See My Work
                            <ArrowRight size={20} />
                        </Link>
                        <Link href="/resume.pdf" className="btn btn-outline">
                            <Download size={20} />
                            Download CV
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
