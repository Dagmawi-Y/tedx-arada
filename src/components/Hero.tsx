import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Parallax subtle effect on scroll
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // The background image will move down slower than the container scrolls up
    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    // Content fades out as you scroll down
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section
            ref={containerRef}
            className="h-svh min-h-[600px] flex items-center justify-center relative overflow-hidden"
        >
            {/* Background with Parallax and Vignette */}
            <motion.div
                style={{ y }}
                className="absolute inset-x-0 -top-[10%] -bottom-[10%] z-0"
            >
                <div className="absolute inset-0 bg-ted-black/25 z-10" />
                <div className="absolute inset-0 bg-radial-vignette z-20" /> {/* Edge Scrim */}
                <img
                    src="/images/addis-aerial-shot.jpg"
                    alt="Addis Ababa Aerial Shot"
                    className="w-full h-full object-cover scale-110"
                />
            </motion.div>

            {/* Content Container */}
            <motion.div
                style={{ opacity }}
                className="z-30 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center justify-center text-center pb-24 md:pb-32 pt-40"
            >
                {/* Main Heading Content (Premium English Look) */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative max-w-5xl"
                >
                    <h2 className="font-sans text-lg md:text-xl lg:text-2xl text-white/80 tracking-[0.5em] font-light uppercase mb-6 md:mb-10 drop-shadow-md">
                        Ideas worth spreading.
                    </h2>
                    <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-white font-bold leading-[1.0] drop-shadow-2xl tracking-tight uppercase">
                        The Heart of <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-linear-to-r from-ted-red to-red-500 italic block mt-2 normal-case">Addis Ababa.</span>
                    </h1>
                </motion.div>

                {/* Event Details Strip (Centered Below Heading) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 mt-12 md:mt-20 border-y border-white/10 py-6 w-full max-w-2xl"
                >
                    <div className="text-center group flex flex-col items-center">
                        <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ted-red"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                        </p>
                        <p className="text-lg md:text-xl text-white font-sans font-medium transition-colors group-hover:text-ted-red">March 14, 2026</p>
                    </div>
                    <div className="hidden md:block h-8 w-px bg-white/10" />
                    <div className="text-center group flex flex-col items-center">
                        <p className="text-[10px] uppercase tracking-widest text-white/40 mb-2 font-bold flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ted-red"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                        </p>
                        <p className="text-lg md:text-xl text-white font-sans font-medium transition-colors group-hover:text-ted-red">Fendika@Hyatt</p>
                    </div>
                </motion.div>

                {/* Buttons (Centered) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col sm:flex-row gap-8 items-center mt-12 md:mt-16"
                >
                    <a
                        href="https://forms.gle/your-form-link"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center justify-center px-12 py-5 font-bold text-white uppercase tracking-[0.2em] bg-ted-red overflow-hidden rounded-sm transition-all duration-300 hover:scale-[1.05] hover:shadow-[0_0_40px_rgba(235,0,40,0.5)] active:scale-[0.98]"
                    >
                        <span className="relative z-10">Register Now</span>
                    </a>

                    <a href="#theme" className="group text-white/70 text-sm tracking-[0.2em] uppercase font-bold hover:text-white transition-colors duration-300 py-4 flex items-center gap-3">
                        Explore Theme
                        <motion.span
                            animate={{ y: [0, 5, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                        </motion.span>
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
}
