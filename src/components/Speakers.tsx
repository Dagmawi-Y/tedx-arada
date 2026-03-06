import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import speakersData from '../data/speakers.json';

export default function Speakers() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 20);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
        }
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (el) {
            el.addEventListener('scroll', checkScroll);
            // Initial check
            checkScroll();
            window.addEventListener('resize', checkScroll);
        }
        return () => {
            el?.removeEventListener('scroll', checkScroll);
            window.removeEventListener('resize', checkScroll);
        };
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 400; // Adjusted for smaller cards
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="min-h-svh py-24 md:py-40 bg-ted-black relative overflow-hidden group/speakers flex flex-col justify-center">
            {/* Base Background Texture */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 opacity-[0.4]"
                    style={{
                        backgroundImage: `
                            repeating-linear-gradient(
                                45deg,
                                rgba(255, 255, 255, 0.1),
                                rgba(255, 255, 255, 0.1) 1.5px,
                                transparent 1.5px,
                                transparent 60px
                            )
                        `,
                        maskImage: 'radial-gradient(circle at center, black, transparent 90%)'
                    }}
                />

                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        x: [0, 50, 0],
                        y: [0, 30, 0]
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-ted-red/10 rounded-full blur-[120px]"
                />

                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
                    style={{
                        backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')`,
                    }}
                />
            </div>

            <div className="w-full relative z-10 flex flex-col">
                <div className="max-w-7xl mx-auto w-full px-6 md:px-12 mb-12 flex flex-col items-center justify-center">
                    <header>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight flex items-center justify-center gap-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ted-red drop-shadow-[0_0_10px_rgba(235,0,40,0.5)]"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v1a7 7 0 0 1-14 0v-1" /><line x1="12" y1="19" x2="12" y2="22" /></svg>
                                Our <span className="text-ted-red italic underline decoration-1 underline-offset-8">Speakers.</span>
                            </h2>
                        </motion.div>
                    </header>

                    {/* Navigation Buttons (Optional: keep or hide when centered) */}
                    <div className="hidden md:flex gap-4 mt-8">
                        <button
                            onClick={() => scroll('left')}
                            disabled={!canScrollLeft}
                            className={`p-4 rounded-full border transition-all duration-300 ${canScrollLeft ? 'border-white/20 text-white hover:bg-white hover:text-black cursor-pointer' : 'border-white/5 text-white/10 cursor-not-allowed'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            disabled={!canScrollRight}
                            className={`p-4 rounded-full border transition-all duration-300 ${canScrollRight ? 'border-white/20 text-white hover:bg-white hover:text-black cursor-pointer' : 'border-white/5 text-white/10 cursor-not-allowed'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                        </button>
                    </div>
                </div>

                {/* Slider Container */}
                <div className="relative">
                    {/* Fade Masks */}
                    <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-ted-black to-transparent z-20 pointer-events-none opacity-0 md:opacity-100" />
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-ted-black to-transparent z-20 pointer-events-none opacity-0 md:opacity-100" />

                    <div
                        ref={scrollRef}
                        className="flex gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-6 md:px-[max(1.5rem,calc((100vw-80rem)/2+3rem))] pb-12 pt-4 justify-start md:justify-center"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {speakersData.map((speaker, index) => (
                            <motion.div
                                key={speaker.id}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="flex-none w-[280px] md:w-[320px] snap-start group cursor-default"
                            >
                                {/* Speaker Image Container (Scaled down) */}
                                <div className="w-full relative overflow-hidden bg-ted-black aspect-3/4 mb-6 rounded-3xl shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)] border border-white/5">
                                    {/* Hover Reveal Content */}
                                    <div className="absolute inset-0 bg-linear-to-t from-ted-black via-ted-black/90 to-transparent z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
                                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-700 ease-out">
                                            <p className="text-ted-red text-[9px] font-heading font-black uppercase tracking-[0.35em] mb-2">The Talk</p>
                                            <h3 className="text-lg font-heading font-bold text-white mb-4 leading-tight">
                                                {speaker.topic}
                                            </h3>
                                            <div className="w-8 h-px bg-white/20 mb-4" />
                                            <p className="text-[11px] font-sans text-white/60 leading-relaxed line-clamp-4">
                                                {speaker.bio}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Image with filters */}
                                    <img
                                        src={speaker.image}
                                        alt={speaker.name}
                                        className="w-full h-full object-cover filter grayscale brightness-75 contrast-110 group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-100 transition-all duration-1000 ease-out"
                                    />
                                </div>

                                {/* Info Section */}
                                <div className="flex flex-col px-1">
                                    <p className="text-ted-red text-[10px] font-heading font-black uppercase tracking-[0.2em] mb-2">
                                        {speaker.role}
                                    </p>
                                    <h4 className="text-xl md:text-2xl font-heading font-bold text-white group-hover:text-ted-red transition-colors duration-500 tracking-tight">
                                        {speaker.name}
                                    </h4>
                                </div>
                            </motion.div>
                        ))}

                        {/* Extra spacing at the end for scrolling */}
                        <div className="flex-none w-px md:w-20 h-1" />
                    </div>
                </div>
            </div>
        </section>
    );
}
