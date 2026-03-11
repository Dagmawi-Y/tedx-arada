import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import speakersData from '../data/speakers.json';

export default function Speakers() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [activeBio, setActiveBio] = useState<string | null>(null);
    const ticking = useRef(false);

    const checkScroll = () => {
        if (!ticking.current) {
            window.requestAnimationFrame(() => {
                if (scrollRef.current) {
                    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
                    setCanScrollLeft(scrollLeft > 20);
                    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
                }
                ticking.current = false;
            });
            ticking.current = true;
        }
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (el) {
            el.addEventListener('scroll', checkScroll, { passive: true });
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
            const scrollAmount = window.innerWidth > 768 ? 400 : 300;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="min-h-svh py-24 md:py-40 bg-ted-black relative overflow-hidden group/speakers flex flex-col justify-center">
            {/* Base Background Texture - Optimized by replacing maskImage with radial overlay */}
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
                        `
                    }}
                />
                {/* Radial overlay to replace maskImage (much more performant) */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,1)_90%)]" />

                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3]
                    } as any}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(230,43,30,0.15)_0%,transparent_70%)] rounded-full will-change-[transform,opacity]"
                />

                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-screen"
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
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight flex items-center justify-center gap-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ted-red drop-shadow-[0_0_10px_rgba(235,0,40,0.5)]"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v1a7 7 0 0 1-14 0v-1" /><line x1="12" y1="19" x2="12" y2="22" /></svg>
                                Our <span className="text-ted-red italic underline decoration-1 underline-offset-8">Speakers.</span>
                            </h2>
                        </motion.div>
                    </header>

                    <div className="hidden md:flex gap-4 mt-8">
                        <button
                            onClick={() => scroll('left')}
                            disabled={!canScrollLeft}
                            className={`p-4 rounded-full border transition-all duration-300 ${canScrollLeft ? 'border-white/20 text-white hover:bg-white hover:text-black cursor-pointer' : 'border-white/5 text-white/10 cursor-not-allowed'}`}
                            aria-label="Scroll Left"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                        </button>
                        <button
                            onClick={() => scroll('right')}
                            disabled={!canScrollRight}
                            className={`p-4 rounded-full border transition-all duration-300 ${canScrollRight ? 'border-white/20 text-white hover:bg-white hover:text-black cursor-pointer' : 'border-white/5 text-white/10 cursor-not-allowed'}`}
                            aria-label="Scroll Right"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                        </button>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-ted-black to-transparent z-20 pointer-events-none hidden md:block" />
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-ted-black to-transparent z-20 pointer-events-none hidden md:block" />

                    <div
                        ref={scrollRef}
                        className="flex gap-8 md:gap-12 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-12 pt-4 px-8 md:px-12 md:justify-center will-change-scroll"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {speakersData.map((speaker, index) => (
                            <motion.div
                                key={speaker.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "50px" }}
                                transition={{ duration: 0.6, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                                className="flex-none w-[280px] md:w-[340px] snap-center md:snap-start group cursor-default"
                            >
                                <div className="w-full relative overflow-hidden bg-ted-black aspect-3/4.5 rounded-3xl shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)] border border-white/10 group-hover:border-ted-red/30 transition-all duration-500 will-change-transform">

                                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105 will-change-transform">
                                        <img
                                            src={speaker.image}
                                            alt={speaker.name}
                                            loading="lazy"
                                            decoding="async"
                                            width="400"
                                            height="600"
                                            className="w-full h-full object-cover filter grayscale-[0.3] brightness-[0.8] contrast-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
                                        />
                                    </div>

                                    <div className="absolute inset-x-0 bottom-0 h-[60%] bg-linear-to-t from-ted-black via-ted-black/80 to-transparent z-10 pointer-events-none" />

                                    <div
                                        className={`absolute inset-x-0 bottom-[160px] top-[25%] bg-ted-black/95 z-20 transition-all duration-500 ease-[0.16,1,0.3,1] flex flex-col p-8 pt-10 rounded-t-3xl border-t border-white/10 ${activeBio === speaker.id ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-12 pointer-events-none'}`}
                                        style={{ transform: 'translateZ(0)', willChange: 'transform, opacity' }}
                                    >
                                        <div className="overflow-y-auto pr-3 custom-scrollbar flex-1">
                                            <p className="text-[14px] font-sans text-white/90 leading-relaxed font-light italic">
                                                "{speaker.bio}"
                                            </p>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 p-6 z-30 bg-ted-black/95 md:bg-transparent" style={{ transform: 'translateZ(0)' }}>
                                        <div className="absolute top-6 right-6 z-40">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setActiveBio(activeBio === speaker.id ? null : speaker.id);
                                                }}
                                                className={`pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-300 transform active:scale-95 group/btn ${activeBio === speaker.id ? 'bg-ted-red border-ted-red text-white' : 'bg-white/5 border-white/20 text-white/60 hover:bg-white/10 hover:text-white hover:border-white/40'}`}
                                                style={{ transform: 'translateZ(0)' }}
                                            >
                                                <span className="text-[9px] font-heading font-black uppercase tracking-widest pl-1">Bio</span>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="12" height="12"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="3.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className={`transition-transform duration-300 ${activeBio === speaker.id ? 'rotate-180' : 'group-hover/btn:translate-y-px'}`}
                                                >
                                                    <path d="m18 15-6-6-6 6" />
                                                </svg>
                                            </button>
                                        </div>

                                        <div className="w-full">
                                            <p className="text-ted-red text-[10px] font-heading font-black uppercase tracking-[0.2em] mb-2 pr-20">
                                                {speaker.role}
                                            </p>
                                            <h4 className="text-2xl font-heading font-bold text-white tracking-tight leading-tight mb-3 pr-20">
                                                {speaker.name}
                                            </h4>

                                            <div className="pt-3 border-t border-white/10 group/topic w-full">
                                                <div className="flex items-center gap-2 mb-1.5 opacity-70 group-hover/topic:opacity-100 transition-opacity duration-300">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-ted-red"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v1a7 7 0 0 1-14 0v-1" /><line x1="12" y1="19" x2="12" y2="22" /></svg>
                                                    <p className="text-[9px] text-white/40 font-heading font-black uppercase tracking-widest">
                                                        Topic
                                                    </p>
                                                </div>
                                                <p className="text-sm font-sans font-medium text-white leading-tight w-full">
                                                    {speaker.topic}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section >
    );
}
