import React from 'react';
import { motion } from 'motion/react';

export default function About() {
    return (
        <section className="min-h-svh flex flex-col justify-center py-24 md:py-40 bg-ted-black relative z-10 border-t border-white/5 overflow-hidden">
            {/* Background Life */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-ted-red/10 rounded-full blur-[150px] opacity-70 transform translate-x-1/3 -translate-y-1/3" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-900/20 rounded-full blur-[120px] opacity-50 transform -translate-x-1/3 translate-y-1/3" />
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
            </div>

            <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-7"
                    >
                        <h4 className="font-sans text-lg md:text-xl text-white/70 tracking-widest font-light uppercase mb-4 md:mb-6">
                            The Spirit.
                        </h4>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-[1.1] tracking-tight">
                            Bringing global ideas to <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-ted-red to-red-500 italic block mt-2 text-5xl md:text-6xl lg:text-7xl">Addis Ababa.</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-5 relative"
                    >
                        <div className="absolute -left-6 lg:-left-12 top-0 bottom-0 w-px bg-white/10 hidden lg:block" />
                        <div className="lg:pl-0">
                            <h3 className="text-sm font-bold tracking-widest text-ted-red uppercase mb-8 flex items-center gap-4">
                                <span className="w-8 h-px bg-ted-red"></span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ted-red"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /><path d="m5 3 1 1" /><path d="m19 17 1 1" /><path d="M3 5h2" /><path d="M19 19h2" /></svg>
                                About TEDxArada
                            </h3>
                            <p className="text-xl md:text-2xl text-gray-300 font-sans leading-relaxed font-light">
                                TEDxArada is a local, independently organized event that brings people together to share a TED-like experience.
                            </p>
                            <p className="mt-8 text-base md:text-lg text-gray-500 font-sans leading-relaxed">
                                Our goal is to highlight the incredible innovation, art, and community work happening right here in the historic heart of Ethiopia, and to spark deep discussion and connection within our city.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
