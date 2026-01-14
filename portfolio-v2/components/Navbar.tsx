"use client";

import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
    return (
        <nav className={styles.nav}>
            <div className={styles.navContent}>
                <Link href="/" className={styles.logo}>
                    <div className={styles.logoIcon}>A</div>
                    Ankit
                </Link>

                <div className={styles.navLinks}>
                    <Link href="#about" className={styles.navLink}>About</Link>
                    <Link href="#experience" className={styles.navLink}>Experience</Link>
                    <Link href="#projects" className={styles.navLink}>Projects</Link>
                    <Link href="#contact" className="btn btn-primary">
                        Get in Touch
                    </Link>
                </div>
            </div>
        </nav>
    );
}
