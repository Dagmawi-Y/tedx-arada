import React from 'react';
import { motion } from 'motion/react';
import { getPastEvents, getEventCardImage } from '../../data/events';

export default function EventsIndexPage() {
    const pastEvents = getPastEvents();

    return (
        <main className="min-h-screen bg-ted-black pb-20">
            <header className="fixed top-0 inset-x-0 z-50 py-5 bg-ted-black/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <a href="/" className="flex flex-col items-start group">
                        <img src="/images/logo-salon/logo-white.png" alt="TEDxArada" className="h-8 w-auto object-contain group-hover:scale-105 transition-transform" />
                    </a>
                    <a href="/" className="text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors">
                        Current Event
                    </a>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 md:px-12 pt-28">
                <motion.nav
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-gray-500 mb-10"
                >
                    <a href="/" className="hover:text-white transition-colors">Home</a>
                    <span>/</span>
                    <span className="text-white/70">Events</span>
                </motion.nav>

                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-3xl mb-16 md:mb-24"
                >
                    <p className="text-[10px] font-heading font-black uppercase tracking-[0.35em] text-ted-red mb-4">
                        Archive
                    </p>
                    <h1 className="text-4xl md:text-6xl font-heading font-bold text-white tracking-tight leading-tight">
                        Previous <span className="italic text-transparent bg-clip-text bg-linear-to-r from-ted-red to-red-400">Events.</span>
                    </h1>
                    <p className="mt-6 text-gray-400 font-sans text-lg leading-relaxed">
                        A living record of every TEDxArada experience — the themes we explored, the voices we amplified, and the community we built together.
                    </p>
                </motion.div>

                {pastEvents.length === 0 ? (
                    <p className="text-gray-500 font-sans">No archived events yet. Check back after our first gathering.</p>
                ) : (
                    <div className="grid md:grid-cols-2 gap-8">
                        {pastEvents.map((event, index) => (
                            <motion.a
                                key={event.id}
                                href={`/events/${event.id}`}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                className="group relative overflow-hidden rounded-3xl border border-white/10 aspect-4/5 md:aspect-3/4"
                            >
                                <img
                                    src={getEventCardImage(event)}
                                    alt=""
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-ted-black via-ted-black/60 to-ted-black/20 group-hover:via-ted-black/50 transition-colors duration-500" />

                                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                    <p className="text-ted-red text-[10px] font-heading font-black uppercase tracking-[0.25em] mb-2">
                                        {event.date.display}
                                    </p>
                                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-white group-hover:text-ted-red transition-colors">
                                        {event.name}
                                    </h2>
                                    <p className="mt-2 text-white/50 font-heading italic">
                                        {event.theme.titleAccent.replace(/\.$/, '')}
                                    </p>
                                    <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/70 group-hover:text-white transition-colors">
                                        Open archive
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                    </div>
                                </div>
                            </motion.a>
                        ))}
                    </div>
                )}

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="mt-20 pt-12 border-t border-white/10 text-center"
                >
                    <p className="text-gray-500 font-sans mb-6">Looking for what's next?</p>
                    <a
                        href="/"
                        className="inline-flex items-center gap-2 px-8 py-3 border border-white/15 rounded-full text-sm font-bold uppercase tracking-widest text-white hover:border-ted-red/50 hover:bg-white/5 transition-all"
                    >
                        Back to current event
                    </a>
                </motion.div>
            </div>
        </main>
    );
}
