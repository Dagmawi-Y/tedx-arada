import React from 'react';
import { motion } from 'motion/react';

export default function Sponsors() {
    const sponsors = [
        { name: "Fendika", logo: "/images/partners/fendeka-logo.png" },
        { name: "Hyatt Regency", logo: "/images/partners/hyatt-logo (1).png" }
    ];

    return (
        <section className="py-24 md:py-40 bg-ted-black/95 border-b border-t border-white/5">
            <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex flex-col items-center mb-8 md:mb-12 text-center">
                    <h2 className="text-sm font-bold tracking-widest text-ted-red uppercase mb-4 flex items-center justify-center gap-4">
                        <span className="w-8 h-px bg-ted-red"></span>
                        <motion.span
                            animate={{ opacity: [0.6, 1, 0.6] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="will-change-opacity"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m11 17 2 2 6-6" /><path d="m18 10 1-1a2 2 0 0 0-2.83-2.83l-2.5 2.5a2 2 0 0 0 0 2.83l.17.17" /><path d="m12.41 10.59 1.18 1.18" /><path d="m9 13-1-1a2 2 0 0 0-2.83 2.83l2.5 2.5a2 2 0 0 0 2.83 0l.17-.17" /><path d="m10.59 12.41 1.18 1.18" /><path d="M4.5 16.5 6 15" /><path d="m15 6 1.5-1.5" /><path d="M13 13h.01" /></svg>
                        </motion.span>
                        Community Partners
                        <span className="w-8 h-px bg-ted-red"></span>
                    </h2>
                    <h3 className="text-2xl md:text-3xl font-heading font-bold text-white">
                        Made possible by
                    </h3>
                </div>

                <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                    {sponsors.map((sponsor, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.6 }}
                            className="relative flex-1 min-w-[280px] aspect-2/1 flex items-center justify-center p-12 rounded-2xl transition-all duration-500 group overflow-hidden bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/10 will-change-transform"
                        >
                            {/* Hover Glow Effect */}
                            <div className="absolute inset-0 bg-radial-vignette opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <img
                                src={sponsor.logo}
                                alt={sponsor.name}
                                loading="lazy"
                                decoding="async"
                                className="relative z-10 max-w-full max-h-full object-contain transition-all duration-700 ease-out brightness-0 invert opacity-40 group-hover:brightness-100 group-hover:invert-0 group-hover:opacity-100 group-hover:scale-110 will-change-transform"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
