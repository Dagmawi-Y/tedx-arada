import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import speakersData from '../data/speakers.json';

export default function Speakers() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const [activeBio, setActiveBio] = useState<string | null>(null);

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
                    } as any}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(230,43,30,0.15)_0%,transparent_70%)] rounded-full translate-z-0"
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
                        className="flex gap-8 md:gap-12 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-12 pt-4 px-8 md:px-12 md:justify-center"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {speakersData.map((speaker, index) => (
                            <motion.div
                                key={speaker.id}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="flex-none w-[300px] md:w-[340px] snap-center md:snap-start group cursor-default"
                            >
                                {/* Speaker Card Container */}
                                <div className="w-full relative overflow-hidden bg-ted-black aspect-3/4.5 rounded-3xl shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)] border border-white/10 group-hover:border-ted-red/30 transition-colors duration-500">

                                    {/* Image with filters */}
                                    <img
                                        src={speaker.image}
                                        alt={speaker.name}
                                        className="absolute inset-0 w-full h-full object-cover filter grayscale-[0.5] brightness-[0.6] contrast-110 group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-90 transition-all duration-1000 ease-out"
                                    />

                                    {/* Bio Overlay (shown on hover for desktop, or on click for mobile) */}
                                    <div className={`absolute inset-x-0 top-0 bottom-[130px] bg-ted-black/95 backdrop-blur-md z-40 transition-all duration-500 flex flex-col p-8 rounded-t-3xl border-b border-white/5 ${activeBio === speaker.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none md:group-hover:opacity-100 md:group-hover:translate-y-0 md:group-hover:pointer-events-auto'}`}>
                                        <div className="flex justify-between items-center mb-4">
                                            <p className="text-ted-red text-[11px] font-heading font-black uppercase tracking-[0.4em]">Speaker Bio</p>
                                            <button
                                                onClick={() => setActiveBio(null)}
                                                className="p-1 text-white/40 hover:text-white transition-colors md:hidden"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                            </button>
                                        </div>
                                        <div className="overflow-y-auto pr-3 custom-scrollbar flex-1">
                                            <p className="text-[14px] font-sans text-white/90 leading-relaxed font-light italic">
                                                "{speaker.bio}"
                                            </p>
                                        </div>
                                    </div>

                                    {/* Permanent Bottom Info Overlay */}
                                    <div className="absolute inset-x-0 bottom-0 h-[160px] bg-linear-to-t from-ted-black via-ted-black/95 to-transparent z-10 pointer-events-none" />

                                    <div className="absolute bottom-0 left-0 right-0 p-6 z-30 transition-transform duration-500 group-hover:translate-y-[-2px]">
                                        <div className="flex justify-between items-end gap-2">
                                            <div className="flex-1">
                                                <p className="text-ted-red text-[10px] font-heading font-black uppercase tracking-[0.2em] mb-2">
                                                    {speaker.role}
                                                </p>
                                                <h4 className="text-2xl font-heading font-bold text-white tracking-tight mb-1">
                                                    {speaker.name}
                                                </h4>
                                                <p className="text-sm font-sans font-medium text-white/70 leading-tight">
                                                    {speaker.topic}
                                                </p>
                                            </div>
                                            {/* Bio Toggle Button for Mobile */}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setActiveBio(activeBio === speaker.id ? null : speaker.id);
                                                }}
                                                className="md:hidden pointer-events-auto p-3.5 rounded-xl bg-white/10 text-white/90 backdrop-blur-md border border-white/10 hover:bg-ted-red hover:text-white transition-all duration-300"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
