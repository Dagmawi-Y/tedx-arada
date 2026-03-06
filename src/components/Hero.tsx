import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Parallax subtle effect on scroll
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <section
            ref={containerRef}
            className="min-h-screen flex items-center justify-center relative overflow-hidden px-6"
        >
            {/* Dynamic Background */}
            <motion.div
                style={{ y, opacity }}
                className="absolute inset-0 z-0 flex items-center justify-center opacity-30"
            >
                <div className="w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full bg-ted-red/20 blur-[100px] md:blur-[150px]" />
            </motion.div>

            <div className="z-10 text-center flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-heading font-black tracking-tighter text-white uppercase leading-none">
                        TEDx<span className="text-ted-red">Arada</span>
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="mt-6 md:mt-10 overflow-hidden"
                >
                    <motion.p
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
                        className="text-xl md:text-3xl text-gray-400 font-light tracking-widest uppercase"
                    >
                        Ideas Worth Spreading
                    </motion.p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="absolute bottom-12"
                >
                    <div className="flex flex-col items-center gap-2">
                        <span className="text-xs tracking-widest text-gray-500 uppercase">Discover</span>
                        <div className="w-[1px] h-12 bg-gradient-to-b from-gray-500 to-transparent" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
