import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getCurrentEvent } from '../data/events';
import type { ScheduleItem } from '../data/events';

const sessionIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v1a7 7 0 0 1-14 0v-1" /><line x1="12" y1="19" x2="12" y2="22" /></svg>
);

const breakIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" /></svg>
);

function getScheduleIcon(item: ScheduleItem) {
    if (item.type === 'break') return breakIcon;
    if (item.title.toLowerCase().includes('opening') || item.title.toLowerCase().includes('welcome')) return sessionIcon;
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></svg>
    );
}

export default function Schedule() {
    const event = getCurrentEvent();
    const scheduleData = event.schedule;
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-24 md:py-40 bg-ted-black border-t border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 opacity-[0.35]"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px'
                    }}
                />
                <div
                    className="absolute inset-0 opacity-[0.15]"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
                        `,
                        backgroundSize: '15px 15px'
                    }}
                />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,1)_95%)]" />

                <motion.div
                    animate={{
                        opacity: [0.05, 0.1, 0.05],
                        scale: [1, 1.1, 1]
                    } as any}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/3 -right-40 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(230,43,30,0.15)_0%,transparent_70%)] rounded-full will-change-[transform,opacity]"
                />

                <motion.div
                    animate={{
                        opacity: [0.03, 0.07, 0.03],
                        scale: [1, 1.1, 1]
                    } as any}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -bottom-20 -left-60 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(230,43,30,0.1)_0%,transparent_70%)] rounded-full will-change-[transform,opacity]"
                />

                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.02] mix-blend-screen"
                    style={{
                        backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')`,
                    }}
                />
            </div>
            <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <header className="mb-12 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight text-center">
                            The <span className="text-ted-red italic underline decoration-1 underline-offset-8">Schedule.</span>
                        </h2>
                        <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-6 text-gray-400 font-sans text-sm tracking-widest uppercase font-medium justify-center">
                            <p className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ted-red"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                                {event.date.display}
                            </p>
                            <p className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ted-red"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                {event.venue.display}
                            </p>
                            <p className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ted-red"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                {event.date.timeDisplay}
                            </p>
                        </div>
                    </motion.div>
                </header>

                <div className="max-w-5xl mx-auto">
                    <div className="border-t border-white/10">
                        {scheduleData.map((item, index) => {
                            const isOpen = openIndex === index;
                            const isBreak = item.type === 'break';

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05, duration: 0.5 }}
                                    className={`border-b border-white/10 group ${isOpen ? 'bg-white/2' : ''} transition-colors duration-500`}
                                >
                                    <button
                                        onClick={() => !isBreak && setOpenIndex(isOpen ? null : index)}
                                        className={`w-full py-6 md:py-10 text-center flex flex-col md:flex-row md:items-center justify-center gap-2 md:gap-12 px-4 rounded-xl transition-all ${!isBreak ? 'cursor-pointer' : 'cursor-default'}`}
                                    >
                                        <div className="md:w-24 shrink-0">
                                            <span className={`text-sm md:text-base font-sans font-bold tracking-widest ${isBreak ? 'text-gray-600' : 'text-ted-red'}`}>
                                                {item.time}
                                            </span>
                                        </div>

                                        <div className="grow flex justify-between items-center group-hover:pl-2 transition-all duration-300">
                                            <span className={`text-xl md:text-3xl font-heading tracking-tight flex items-center gap-4 ${isBreak ? 'text-gray-500 font-light' : 'text-white font-bold group-hover:text-ted-red transition-colors'}`}>
                                                <span className={`opacity-50 group-hover:opacity-100 transition-opacity ${!isBreak ? 'text-ted-red' : ''}`}>
                                                    {getScheduleIcon(item)}
                                                </span>
                                                {item.title}
                                            </span>

                                            {!isBreak && (
                                                <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-ted-red border-ted-red' : 'group-hover:border-ted-red'}`}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-300 ${isOpen ? 'text-white rotate-180' : 'text-gray-500 group-hover:text-ted-red'}`}><path d="m6 9 6 6 6-6" /></svg>
                                                </div>
                                            )}
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {(isOpen || isBreak) && (
                                            <motion.div
                                                initial={isOpen ? { height: 0, opacity: 0 } : { height: 'auto', opacity: 1 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                                className="overflow-hidden"
                                            >
                                                <div className={`pb-8 pt-0 px-4 md:px-24 text-center font-sans text-base md:text-lg leading-relaxed ${isBreak ? 'text-gray-600 italic' : 'text-gray-400'}`}>
                                                    {item.description}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
