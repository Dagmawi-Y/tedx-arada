import React from 'react';
import { motion } from 'motion/react';

export default function Sponsors() {
    const sponsors = [
        { name: "Ethiopian Airlines", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Ethiopian_Airlines_Logo.svg/512px-Ethiopian_Airlines_Logo.svg.png" },
        { name: "Fendika", logo: "https://ui-avatars.com/api/?name=Fendika&background=111111&color=ffffff&size=200&font-size=0.33&length=7" },
        { name: "Hyatt Regency", logo: "https://ui-avatars.com/api/?name=Hyatt+Regency&background=111111&color=ffffff&size=200&font-size=0.33&length=13" },
        { name: "Telebirr", logo: "https://ui-avatars.com/api/?name=Telebirr&background=111111&color=ffffff&size=200&font-size=0.33&length=8" },
        { name: "Kazana Group", logo: "https://ui-avatars.com/api/?name=Kazana+Group&background=111111&color=ffffff&size=200&font-size=0.33&length=12" }
    ];

    return (
        <section className="py-24 md:py-40 bg-ted-black/95 border-b border-t border-white/5">
            <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex flex-col items-center mb-16 md:mb-24 text-center">
                    <h2 className="text-sm font-bold tracking-widest text-ted-red uppercase mb-6 flex items-center justify-center gap-4">
                        <span className="w-8 h-px bg-ted-red"></span>
                        <motion.span
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m11 17 2 2 6-6" /><path d="m18 10 1-1a2 2 0 0 0-2.83-2.83l-2.5 2.5a2 2 0 0 0 0 2.83l.17.17" /><path d="m12.41 10.59 1.18 1.18" /><path d="m9 13-1-1a2 2 0 0 0-2.83 2.83l2.5 2.5a2 2 0 0 0 2.83 0l.17-.17" /><path d="m10.59 12.41 1.18 1.18" /><path d="M4.5 16.5 6 15" /><path d="m15 6 1.5-1.5" /><path d="M13 13h.01" /></svg>
                        </motion.span>
                        Community Partners
                        <span className="w-8 h-px bg-ted-red"></span>
                    </h2>
                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white">
                        Made possible by
                    </h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-white/10 p-px rounded-[2px] overflow-hidden shadow-2xl">
                    {sponsors.map((sponsor, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            className="bg-ted-black aspect-3/2 flex items-center justify-center p-8 hover:bg-white/3 transition-colors group"
                        >
                            <img src={sponsor.logo} alt={sponsor.name} className="max-w-[80%] max-h-[70%] object-contain filter grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
