import React from 'react';
import { motion } from 'motion/react';
import { getPastEvents, getEventCardImage } from '../data/events';
import type { TedxEvent } from '../data/events';

function EventCard({ event, index }: { event: TedxEvent; index: number }) {
    const cardImage = getEventCardImage(event);
    const speakerFaces = event.speakers.slice(0, 3);

    return (
        <motion.a
            href={`/events/${event.id}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="group relative block overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] hover:border-ted-red/40 transition-all duration-500 hover:shadow-[0_0_60px_rgba(230,43,30,0.12)]"
        >
            <div className="grid md:grid-cols-2 min-h-[320px]">
                <div className="relative overflow-hidden min-h-[220px] md:min-h-full">
                    <img
                        src={cardImage}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-ted-black/20 via-ted-black/50 to-ted-black md:bg-linear-to-r md:from-transparent md:via-ted-black/30 md:to-ted-black" />
                    <div className="absolute inset-0 bg-radial-vignette opacity-60" />

                    <div className="absolute top-5 left-5 flex -space-x-3">
                        {speakerFaces.map((speaker) => (
                            <div
                                key={speaker.id}
                                className="w-10 h-10 rounded-full border-2 border-ted-black overflow-hidden ring-1 ring-white/20"
                            >
                                <img src={speaker.image} alt={speaker.name} className="w-full h-full object-cover" loading="lazy" />
                            </div>
                        ))}
                    </div>

                    <span className="absolute top-5 right-5 px-3 py-1 rounded-full bg-ted-black/70 backdrop-blur-sm border border-white/10 text-[10px] font-heading font-black uppercase tracking-widest text-white/70">
                        Archive
                    </span>
                </div>

                <div className="relative p-8 md:p-10 flex flex-col justify-between">
                    <div>
                        <p className="text-ted-red text-[10px] font-heading font-black uppercase tracking-[0.25em] mb-3">
                            {event.date.display}
                        </p>
                        <h3 className="text-2xl md:text-3xl font-heading font-bold text-white tracking-tight leading-tight group-hover:text-ted-red transition-colors duration-300">
                            {event.name}
                        </h3>
                        <p className="mt-3 text-lg font-heading italic text-white/60">
                            {event.theme.titleAccent.replace(/\.$/, '')}
                        </p>
                        <p className="mt-4 text-sm text-gray-500 font-sans leading-relaxed line-clamp-2">
                            {event.theme.description}
                        </p>
                    </div>

                    <div className="mt-8 flex items-center justify-between gap-4 pt-6 border-t border-white/10">
                        <div className="flex flex-col gap-1 text-xs text-gray-500 font-sans uppercase tracking-widest">
                            <span>{event.speakers.length} speakers</span>
                            <span>{event.venue.display}</span>
                        </div>
                        <span className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white group-hover:text-ted-red transition-colors">
                            Explore
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                        </span>
                    </div>
                </div>
            </div>
        </motion.a>
    );
}

export default function PreviousEvents() {
    const pastEvents = getPastEvents();
    if (pastEvents.length === 0) return null;

    return (
        <section id="past-events" className="py-24 md:py-40 bg-ted-black border-t border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-[0.25]"
                    style={{
                        backgroundImage: `repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 80px)`,
                    }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse,rgba(230,43,30,0.08)_0%,transparent_70%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.9)_85%)]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <p className="text-[10px] font-heading font-black uppercase tracking-[0.35em] text-ted-red mb-4">
                            Our Journey
                        </p>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white tracking-tight">
                            Previous <span className="text-transparent bg-clip-text bg-linear-to-r from-ted-red to-red-500 italic">Events.</span>
                        </h2>
                        <p className="mt-5 max-w-xl text-gray-400 font-sans text-base md:text-lg leading-relaxed">
                            Every TEDxArada gathering leaves a trace — ideas shared, connections made, and stories that continue beyond the stage.
                        </p>
                    </motion.div>

                    <motion.a
                        href="/events"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="self-start lg:self-auto inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/15 text-sm font-bold uppercase tracking-widest text-white/80 hover:text-white hover:border-ted-red/50 hover:bg-white/5 transition-all duration-300"
                    >
                        View all archives
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                    </motion.a>
                </div>

                <div className="flex flex-col gap-8">
                    {pastEvents.map((event, index) => (
                        <EventCard key={event.id} event={event} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
