import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const scheduleData = [
    {
        "time": "08:30 AM",
        "title": "Registration & Coffee",
        "description": "Get your badge, grab a locally roasted coffee, and meet fellow attendees.",
        "type": "break"
    },
    {
        "time": "09:30 AM",
        "title": "Welcome to TEDxArada",
        "description": "Opening remarks from our organizing team.",
        "type": "session"
    },
    {
        "time": "10:00 AM",
        "title": "Session 1: The Foundations",
        "description": "Exploring our shared history and the structural realities of tomorrow.",
        "type": "session"
    },
    {
        "time": "11:30 AM",
        "title": "Networking Break & Art Exhibition",
        "description": "Experience local art and interact with our partners.",
        "type": "break"
    },
    {
        "time": "12:15 PM",
        "title": "Session 2: Future Forward",
        "description": "Technology, art, and the new digital frontier in Ethiopia.",
        "type": "session"
    },
    {
        "time": "01:30 PM",
        "title": "Lunch",
        "description": "A curated culinary experience featuring Ethiopian fusion cuisine.",
        "type": "break"
    }
];

export default function Schedule() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-24 bg-ted-black px-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-16">
                    <h2 className="text-4xl md:text-6xl font-heading font-black text-white uppercase text-center md:text-left">
                        Event <span className="text-gray-500">Program</span>
                    </h2>
                </div>

                <div className="space-y-4">
                    {scheduleData.map((item, index) => {
                        const isOpen = openIndex === index;
                        const isBreak = item.type === 'break';
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`border-b border-white/10 ${isBreak ? 'bg-white/5' : 'hover:bg-ted-red/5'} transition-colors rounded-t-sm`}
                            >
                                <button
                                    onClick={() => !isBreak && setOpenIndex(isOpen ? null : index)}
                                    className={`w-full flex flex-col md:flex-row md:items-center text-left p-6 md:px-8 gap-4 md:gap-12 ${!isBreak ? 'cursor-pointer' : 'cursor-default'}`}
                                >
                                    <span className={`text-xl font-heading font-medium tracking-tight whitespace-nowrap ${isBreak ? 'text-gray-500' : 'text-ted-red'}`}>
                                        {item.time}
                                    </span>
                                    <div className="flex-grow flex justify-between items-center">
                                        <span className={`text-2xl font-heading ${isBreak ? 'text-gray-400 font-light' : 'text-white font-bold'}`}>
                                            {item.title}
                                        </span>
                                        {!isBreak && (
                                            <span className="text-2xl font-light text-gray-500 transform transition-transform duration-300" style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                                                +
                                            </span>
                                        )}
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {isOpen && !isBreak && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-6 md:px-8 pt-0 pb-8 text-gray-400 md:ml-32">
                                                {item.description}
                                            </div>
                                        </motion.div>
                                    )}
                                    {isBreak && (
                                        <div className="px-6 md:px-8 pb-6 text-gray-500 md:ml-32 font-light">
                                            {item.description}
                                        </div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
