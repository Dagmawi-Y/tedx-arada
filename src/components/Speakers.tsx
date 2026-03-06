import React from 'react';
import { motion } from 'motion/react';
import speakersData from '../data/speakers.json';

interface Speaker {
    id: string;
    name: string;
    role: string;
    topic: string;
    image: string;
    bio: string;
}

export default function Speakers() {
    return (
        <section className="min-h-svh py-24 md:py-40 bg-ted-dark relative overflow-hidden group/speakers flex flex-col justify-center">
            {/* High-End Grainy Texture (Static) */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.08]">
                <div
                    className="absolute inset-0 bg-repeat"
                    style={{
                        backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')`,
                        mixBlendMode: 'overlay'
                    }}
                />
            </div>

            {/* Background Accent Lines */}
            <div className="absolute inset-0 z-0 pointer-events-none flex justify-center opacity-[0.03]">
                <div className="w-px h-full bg-linear-to-b from-transparent via-white to-transparent absolute left-1/4" />
                <div className="w-px h-full bg-linear-to-b from-transparent via-white to-transparent absolute left-2/4" />
                <div className="w-px h-full bg-linear-to-b from-transparent via-white to-transparent absolute left-3/4" />
            </div>

            <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <header className="mb-12 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight flex items-center gap-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ted-red drop-shadow-[0_0_10px_rgba(235,0,40,0.5)]"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v1a7 7 0 0 1-14 0v-1" /><line x1="12" y1="19" x2="12" y2="22" /></svg>
                            Our <span className="text-ted-red italic underline decoration-1 underline-offset-8">Speakers.</span>
                        </h2>
                    </motion.div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-24 gap-y-20 md:gap-y-32">
                    {speakersData.map((speaker, index) => (
                        <motion.div
                            key={speaker.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col group cursor-default"
                        >
                            {/* Speaker Image Container */}
                            <div className="w-full relative overflow-hidden bg-ted-black aspect-4/5 mb-8 md:mb-10 rounded-4xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] border border-white/5">
                                {/* Hover Reveal Content */}
                                <div className="absolute inset-0 bg-linear-to-t from-ted-black via-ted-black/80 to-transparent z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 md:p-10">
                                    <div className="transform translate-y-8 group-hover:translate-y-0 transition-all duration-700 ease-out delay-75">
                                        <p className="text-ted-red text-[10px] font-heading font-black uppercase tracking-[0.35em] mb-2 drop-shadow-sm">The Talk</p>
                                        <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-5 leading-tight tracking-tight">
                                            {speaker.topic}
                                        </h3>
                                        <div className="w-12 h-px bg-white/20 mb-5" />
                                        <p className="text-xs md:text-sm font-sans text-white/60 leading-relaxed line-clamp-4">
                                            {speaker.bio}
                                        </p>
                                    </div>
                                </div>

                                {/* Image with filters */}
                                <img
                                    src={speaker.image}
                                    alt={speaker.name}
                                    className="w-full h-full object-cover filter grayscale brightness-90 contrast-110 group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-100 transition-all duration-1000 ease-out"
                                />
                            </div>

                            {/* Info Section */}
                            <div className="flex flex-col px-2">
                                <p className="text-ted-red text-[11px] md:text-sm font-heading font-black uppercase tracking-[0.25em] mb-3">
                                    {speaker.role}
                                </p>
                                <h4 className="text-2xl md:text-4xl font-heading font-bold text-white group-hover:text-ted-red transition-colors duration-500 tracking-tight leading-tight">
                                    {speaker.name}
                                </h4>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
