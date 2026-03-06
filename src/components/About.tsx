import React from 'react';
import { motion } from 'motion/react';

export default function About() {
    return (
        <section className="py-24 md:py-48 px-6 bg-ted-black relative z-10 border-t border-white/5">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8"
                >
                    <div className="md:col-span-4">
                        <h2 className="text-sm font-bold tracking-widest text-ted-red uppercase mb-4">
                            The Theme
                        </h2>
                        <div className="w-12 h-1 bg-ted-red mb-8" />
                    </div>
                    <div className="md:col-span-8">
                        <h3 className="text-3xl md:text-5xl lg:text-6xl font-heading font-medium text-white leading-tight">
                            Rediscovering the layered narratives of <span className="text-ted-red font-black">Arada</span>. Our past echoing into our shared future.
                        </h3>
                        <p className="mt-8 text-lg md:text-xl text-gray-400 font-sans leading-relaxed max-w-2xl">
                            TEDxArada is a localized platform designed to bring world-class thinkers and local pioneers together. From historic city building blocks to the latest in generative art and climate action, we're exploring ideas that reshape the horn.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
