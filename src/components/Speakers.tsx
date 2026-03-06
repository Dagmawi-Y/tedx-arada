import React from 'react';
import { motion } from 'motion/react';

interface Speaker {
    id: string;
    name: string;
    role: string;
    topic: string;
    image: string;
    bio: string;
}

const speakersData: Speaker[] = [
    {
        "id": "1",
        "name": "Prof. Abebe Zegeye",
        "role": "Urban Historian",
        "topic": "The Hidden Layers of Arada",
        "image": "/images/speaker_male.png",
        "bio": "Exploring the architectural and cultural evolution of Addis Ababa's most historic district."
    },
    {
        "id": "2",
        "name": "Salem Kassahun",
        "role": "AI Researcher & Artist",
        "topic": "Generative Art in Ethiopian Context",
        "image": "/images/speaker_female.png",
        "bio": "Bridging the gap between traditional Ethiopian motifs and modern machine learning aesthetics."
    }
];

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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-24 gap-y-16 md:gap-y-24">
                    {speakersData.map((speaker, index) => (
                        <motion.div
                            key={speaker.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col group cursor-default"
                        >
                            <div className="w-full relative overflow-hidden bg-ted-black aspect-3/2 mb-6 md:mb-8 rounded-3xl shadow-2xl border border-white/5">
                                <div className="absolute inset-0 bg-ted-red/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-multiply" />
                                <img
                                    src={speaker.image}
                                    alt={speaker.name}
                                    className="w-full h-full object-cover filter grayscale opacity-90 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                                />
                            </div>

                            <div className="flex flex-col">
                                <h4 className="text-xl md:text-2xl font-heading font-bold text-white group-hover:text-ted-red transition-colors duration-300 tracking-tight">
                                    {speaker.name}
                                </h4>
                                <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-[0.2em] mt-1 font-medium italic">
                                    {speaker.role}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
