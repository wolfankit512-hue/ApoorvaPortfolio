"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Twitter, Heart } from "lucide-react";

export default function Contact() {
    return (
        <footer id="contact" style={{ padding: '6rem 0 4rem', background: 'linear-gradient(to top, rgba(255, 107, 107, 0.05), transparent)' }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary)', fontWeight: 700, marginBottom: '1rem' }}>
                        Get In Touch
                    </div>
                    <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>
                        Let&apos;s Create <span className="gradient-text">Something Amazing</span> ✨
                    </h2>
                    <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto 3rem', lineHeight: 1.6 }}>
                        Have a project in mind? Want to collaborate? Or just want to say hi?
                        I&apos;d love to hear from you!
                    </p>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '4rem', flexWrap: 'wrap' }}>
                        {[
                            { icon: <Mail size={24} />, href: "mailto:ankit@example.com", label: "Email", color: "var(--primary)" },
                            { icon: <Github size={24} />, href: "#", label: "GitHub", color: "var(--text)" },
                            { icon: <Linkedin size={24} />, href: "#", label: "LinkedIn", color: "var(--secondary)" },
                            { icon: <Twitter size={24} />, href: "#", label: "Twitter", color: "var(--accent)" }
                        ].map((social, index) => (
                            <motion.a
                                key={index}
                                href={social.href}
                                whileHover={{ y: -8, scale: 1.1 }}
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '16px',
                                    background: 'white',
                                    boxShadow: 'var(--shadow-sm)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: social.color,
                                    transition: 'all 0.3s ease'
                                }}
                                aria-label={social.label}
                            >
                                {social.icon}
                            </motion.a>
                        ))}
                    </div>

                    <div style={{ padding: '2rem 0', borderTop: '1px solid rgba(0, 0, 0, 0.1)', color: 'var(--text-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        Made with <Heart size={16} style={{ color: 'var(--primary)' }} fill="var(--primary)" /> by Ankit © {new Date().getFullYear()}
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
