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
            {/* Background with Parallax */}
            <motion.div
                style={{ y }}
                className="absolute inset-x-0 -top-[10%] -bottom-[10%] z-0"
            >
                <div className="absolute inset-0 bg-ted-black/60 z-10" /> {/* Dark Overlay */}
                <div className="absolute inset-0 bg-linear-to-b from-ted-black/40 via-transparent to-ted-black z-20" /> {/* Edge fading */}
                <img
                    src="/images/addis-aerial-shot.jpg"
                    alt="Addis Ababa Aerial Shot"
                    className="w-full h-full object-cover"
                />
            </motion.div>

            {/* Content Container */}
            <motion.div
                style={{ opacity }}
                className="z-30 w-full px-6 flex flex-col items-center justify-center text-center mt-12"
            >
                {/* Removed top tagline to place it precisely under the logo */}

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="relative flex flex-col items-end"
                >
                    <h1 className="flex items-center font-sans tracking-tighter drop-shadow-2xl leading-[0.9]">
                        <span className="text-ted-red font-black text-6xl sm:text-8xl md:text-[9rem] lg:text-[12rem]">TED<sup className="text-[0.6em] top-[-0.3em]">x</sup></span>
                        <span className="text-white font-normal text-6xl sm:text-8xl md:text-[9rem] lg:text-[12rem] ml-2 md:ml-4">Arada</span>
                    </h1>
                    <p className="text-white font-sans text-sm md:text-xl lg:text-2xl mt-2 tracking-wide font-light">
                        x = independently organized TED event
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="mt-6 md:mt-10 overflow-hidden flex flex-col items-center"
                >
                    <motion.p
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
                        className="text-xl md:text-3xl text-gray-200 font-light tracking-widest uppercase text-shadow-sm mb-12"
                    >
                        Ideas Worth Spreading
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="flex flex-col sm:flex-row gap-6 items-center"
                    >
                        <a
                            href="https://forms.gle/your-form-link"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white uppercase tracking-widest bg-ted-red overflow-hidden rounded-sm"
                        >
                            <span className="absolute inset-0 w-full h-full -mt-1 rounded-sm opacity-30 bg-linear-to-b from-transparent via-transparent to-black" />
                            <span className="relative z-10 transition-transform duration-300 group-hover:-translate-y-1">Register Now</span>
                            <div className="absolute inset-0 h-full w-full border-2 border-white/0 group-hover:border-white/20 transition-all duration-300" />
                        </a>

                        <a href="#theme" className="text-white text-sm tracking-widest uppercase font-medium hover:text-ted-red transition-colors duration-300 py-4 px-6 flex items-center gap-2">
                            Explore Theme
                            <span className="animate-bounce">↓</span>
                        </a>
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}
