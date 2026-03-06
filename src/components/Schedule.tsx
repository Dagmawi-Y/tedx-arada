import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const scheduleData = [
    {
        "time": "08:30 AM",
        "title": "Registration & Coffee",
        "description": "Get your badge, grab a locally roasted coffee, and meet fellow attendees.",
        "type": "break",
        "icon": <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v2m4-2v2m2 4a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1M6 2v2" /></svg>
    },
    {
        "time": "09:30 AM",
        "title": "Welcome to TEDxArada",
        "description": "Opening remarks from our organizing team.",
        "type": "session",
        "icon": <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v1a7 7 0 0 1-14 0v-1" /><line x1="12" y1="19" x2="12" y2="22" /></svg>
    },
    {
        "time": "10:00 AM",
        "title": "Session 1: The Foundations",
        "description": "Exploring our shared history and the structural realities of tomorrow.",
        "type": "session",
        "icon": <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></svg>
    },
    {
        "time": "11:30 AM",
        "title": "Networking Break & Art Exhibition",
        "description": "Experience local art and interact with our partners.",
        "type": "break",
        "icon": <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" /></svg>
    },
    {
        "time": "12:15 PM",
        "title": "Session 2: Future Forward",
        "description": "Technology, art, and the new digital frontier in Ethiopia.",
        "type": "session",
        "icon": <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></svg>
    },
    {
        "time": "01:30 PM",
        "title": "Lunch",
        "description": "A curated culinary experience featuring Ethiopian fusion cuisine.",
        "type": "break",
        "icon": <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 2 2 2-4 4M21 3l-1.41 1.41a2 2 0 0 0 0 2.83L21 9" /><path d="M15 16s-2 1-4 1-4-1-4-1" /><path d="M13 2s-3 1-3 1" /><path d="M12 15V8" /><path d="M3 21h18" /></svg>
    }
];

export default function Schedule() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-24 md:py-40 bg-ted-black border-t border-white/5 relative overflow-hidden">
            {/* Background Life */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[40%] left-[30%] w-[120%] h-[20%] bg-linear-to-r from-transparent via-white/2 to-transparent rotate-[-35deg] transform -translate-x-1/2 -translate-y-1/2 blur-2xl" />
            </div>
            <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <header className="mb-12 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-white tracking-tight">
                            The <span className="text-ted-red italic underline decoration-1 underline-offset-8">Schedule.</span>
                        </h2>
                        <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-6 text-gray-400 font-sans text-sm tracking-widest uppercase font-medium">
                            <p className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ted-red"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                                March 14, 2026
                            </p>
                            <p className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ted-red"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                Fendika at Hyatt, Addis Ababa
                            </p>
                        </div>
                    </motion.div>
                </header>

                <div className="max-w-5xl">
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
                                        className={`w-full py-6 md:py-10 text-left flex flex-col md:flex-row md:items-center gap-2 md:gap-12 px-4 rounded-xl transition-all ${!isBreak ? 'cursor-pointer' : 'cursor-default'}`}
                                    >
                                        <div className="md:w-24 shrink-0">
                                            <span className={`text-sm md:text-base font-sans font-bold tracking-widest ${isBreak ? 'text-gray-600' : 'text-ted-red'}`}>
                                                {item.time}
                                            </span>
                                        </div>

                                        <div className="grow flex justify-between items-center group-hover:pl-2 transition-all duration-300">
                                            <span className={`text-xl md:text-3xl font-heading tracking-tight flex items-center gap-4 ${isBreak ? 'text-gray-500 font-light' : 'text-white font-bold group-hover:text-ted-red transition-colors'}`}>
                                                <span className={`opacity-50 group-hover:opacity-100 transition-opacity ${!isBreak ? 'text-ted-red' : ''}`}>
                                                    {item.icon}
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
                                                <div className={`pb-8 pt-0 px-4 md:pl-40 pr-8 font-sans text-base md:text-lg leading-relaxed ${isBreak ? 'text-gray-600 italic' : 'text-gray-400'}`}>
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
