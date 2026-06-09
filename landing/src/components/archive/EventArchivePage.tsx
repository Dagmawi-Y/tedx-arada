import React, { useState } from 'react';
import { motion } from 'motion/react';
import type { TedxEvent } from '../../data/events';
import { getEventCardImage } from '../../data/events';
import ArchiveNavbar from './ArchiveNavbar';

interface Props {
    event: TedxEvent;
}

export default function EventArchivePage({ event }: Props) {
    const [activeBio, setActiveBio] = useState<string | null>(null);
    const heroImage = getEventCardImage(event);

    return (
        <>
            <ArchiveNavbar event={event} />

            <main>
                {/* Hero */}
                <section className="relative min-h-[70vh] flex items-end overflow-hidden bg-ted-black pt-28 pb-16 md:pb-24">
                    <div className="absolute inset-0">
                        <img
                            src={heroImage}
                            alt=""
                            className="w-full h-full object-cover opacity-30 grayscale"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-ted-black via-ted-black/85 to-ted-black/60" />
                        <div className="absolute inset-0 bg-radial-vignette" />
                    </div>

                    <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
                        <motion.nav
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 text-xs font-sans uppercase tracking-widest text-gray-500 mb-8"
                        >
                            <a href="/" className="hover:text-white transition-colors">Home</a>
                            <span>/</span>
                            <a href="/events" className="hover:text-white transition-colors">Events</a>
                            <span>/</span>
                            <span className="text-white/70">{event.name}</span>
                        </motion.nav>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 text-[10px] font-heading font-black uppercase tracking-[0.3em] text-white/60 mb-6">
                                <span className="w-1.5 h-1.5 rounded-full bg-ted-red" />
                                Event Archive
                            </span>

                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white tracking-tight leading-[1.05]">
                                {event.hero.headline}{' '}
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-ted-red to-red-400 italic">
                                    {event.hero.headlineAccent}
                                </span>
                            </h1>

                            <div className="mt-8 flex flex-wrap gap-6 md:gap-10 text-sm font-sans">
                                <p className="flex items-center gap-2 text-gray-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ted-red"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                                    {event.date.display}
                                </p>
                                <p className="flex items-center gap-2 text-gray-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ted-red"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                    {event.date.timeDisplay}
                                </p>
                                <p className="flex items-center gap-2 text-gray-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ted-red"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                                    {event.venue.display}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Theme */}
                <section id="theme" className="py-24 md:py-32 bg-ted-black border-t border-white/5">
                    <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <p className="text-ted-red text-xs font-heading font-black uppercase tracking-[0.3em] mb-4">{event.theme.label}</p>
                            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white leading-tight">
                                {event.theme.title}{' '}
                                <span className="italic text-transparent bg-clip-text bg-linear-to-r from-ted-red to-red-400">
                                    {event.theme.titleAccent}
                                </span>
                            </h2>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="border-l border-white/10 pl-8 lg:pl-12"
                        >
                            <p className="text-lg md:text-xl text-gray-300 font-sans leading-relaxed font-light">{event.theme.description}</p>
                            <p className="mt-6 text-gray-500 font-sans leading-relaxed">{event.theme.extendedDescription}</p>
                        </motion.div>
                    </div>
                </section>

                {/* Speakers */}
                <section id="speakers" className="py-24 md:py-32 bg-ted-black border-t border-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-[0.3] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0, rgba(255,255,255,0.05) 1px, transparent 0, transparent 50%)' }} />
                    <div className="relative max-w-7xl mx-auto px-6 md:px-12">
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white text-center mb-14">
                            The <span className="text-ted-red italic">Speakers.</span>
                        </h2>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {event.speakers.map((speaker, index) => (
                                <motion.article
                                    key={speaker.id}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.08, duration: 0.6 }}
                                    className="group relative rounded-3xl overflow-hidden border border-white/10 bg-white/[0.02] hover:border-ted-red/30 transition-all duration-500"
                                >
                                    <div className="aspect-4/5 relative overflow-hidden">
                                        <img
                                            src={speaker.image}
                                            alt={speaker.name}
                                            className="w-full h-full object-cover grayscale-[0.4] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-linear-to-t from-ted-black via-ted-black/40 to-transparent" />
                                    </div>

                                    <div className="p-6 relative">
                                        <button
                                            onClick={() => setActiveBio(activeBio === speaker.id ? null : speaker.id)}
                                            className="absolute -top-5 right-6 px-3 py-1.5 rounded-full border border-white/20 bg-ted-black text-[9px] font-heading font-black uppercase tracking-widest text-white/70 hover:border-ted-red hover:text-white transition-colors"
                                        >
                                            {activeBio === speaker.id ? 'Close' : 'Bio'}
                                        </button>

                                        <p className="text-[10px] font-heading font-black uppercase tracking-[0.2em] text-ted-red mb-2 line-clamp-2">{speaker.role}</p>
                                        <h3 className="text-xl font-heading font-bold text-white">{speaker.name}</h3>
                                        <p className="mt-3 pt-3 border-t border-white/10 text-sm text-gray-400">
                                            <span className="text-[9px] uppercase tracking-widest text-white/30 block mb-1">Topic</span>
                                            {speaker.topic}
                                        </p>

                                        {activeBio === speaker.id && (
                                            <motion.p
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                className="mt-4 pt-4 border-t border-white/10 text-sm text-gray-300 italic leading-relaxed"
                                            >
                                                "{speaker.bio}"
                                            </motion.p>
                                        )}
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Schedule */}
                <section id="schedule" className="py-24 md:py-32 bg-ted-black border-t border-white/5">
                    <div className="max-w-4xl mx-auto px-6 md:px-12">
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white text-center mb-14">
                            The <span className="text-ted-red italic">Schedule.</span>
                        </h2>

                        <div className="relative">
                            <div className="absolute left-[7px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-white/10" />

                            {event.schedule.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.05 }}
                                    className={`relative flex flex-col md:flex-row gap-4 md:gap-0 mb-10 last:mb-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                >
                                    <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                                        <span className={`text-sm font-bold tracking-widest ${item.type === 'break' ? 'text-gray-600' : 'text-ted-red'}`}>
                                            {item.time}
                                        </span>
                                    </div>

                                    <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full border-2 border-ted-red bg-ted-black z-10 mt-1" />

                                    <div className={`md:w-1/2 pl-8 md:pl-0 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12 md:text-right'}`}>
                                        <h3 className={`text-lg font-heading ${item.type === 'break' ? 'text-gray-500 font-light' : 'text-white font-bold'}`}>
                                            {item.title}
                                        </h3>
                                        <p className="mt-2 text-sm text-gray-500 leading-relaxed">{item.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Partners */}
                <section id="partners" className="py-24 md:py-32 bg-ted-black border-t border-white/5">
                    <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
                        <p className="text-xs font-heading font-black uppercase tracking-[0.3em] text-ted-red mb-4">Community Partners</p>
                        <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-12">Made possible by</h2>

                        <div className="flex flex-wrap justify-center gap-6 max-w-3xl mx-auto">
                            {event.sponsors.map((sponsor) => (
                                <div
                                    key={sponsor.name}
                                    className="flex-1 min-w-[240px] aspect-2/1 flex items-center justify-center p-10 rounded-2xl bg-white/[0.03] border border-white/5"
                                >
                                    <img
                                        src={sponsor.logo}
                                        alt={sponsor.name}
                                        className="max-w-full max-h-full object-contain brightness-0 invert opacity-50"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-20 md:py-28 border-t border-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(230,43,30,0.12)_0%,transparent_70%)]" />
                    <div className="relative max-w-3xl mx-auto px-6 text-center">
                        <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
                            The story continues.
                        </h2>
                        <p className="mt-4 text-gray-400 font-sans text-lg">
                            Join us at the next TEDxArada gathering — new ideas, new voices, same spirit.
                        </p>
                        <a
                            href="/"
                            className="inline-flex items-center gap-3 mt-10 px-10 py-4 bg-ted-red text-white font-bold uppercase tracking-[0.2em] text-sm hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(235,0,40,0.4)] transition-all duration-300 rounded-sm"
                        >
                            View current event
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                        </a>
                    </div>
                </section>
            </main>
        </>
    );
}
