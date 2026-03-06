import React from 'react';
import { motion } from 'motion/react';

export default function Sponsors() {
    const sponsors = [
        { name: "Sponsor 1", logo: "https://via.placeholder.com/200x80/1a1a1a/cccccc?text=SPONSOR+1" },
        { name: "Sponsor 2", logo: "https://via.placeholder.com/200x80/1a1a1a/cccccc?text=SPONSOR+2" },
        { name: "Sponsor 3", logo: "https://via.placeholder.com/200x80/1a1a1a/cccccc?text=SPONSOR+3" },
        { name: "Sponsor 4", logo: "https://via.placeholder.com/200x80/1a1a1a/cccccc?text=SPONSOR+4" },
        { name: "Sponsor 5", logo: "https://via.placeholder.com/200x80/1a1a1a/cccccc?text=SPONSOR+5" }
    ];

    const duplicatedSponsors = [...sponsors, ...sponsors, ...sponsors];

    return (
        <section className="py-24 bg-ted-black/95 px-6 border-b border-white/5">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-xl md:text-2xl font-sans font-medium text-gray-500 text-center mb-12 uppercase tracking-widest">
                    Supported by our visionary partners
                </h2>

                <div className="relative overflow-hidden w-full h-24 fade-edges">
                    <motion.div
                        className="flex space-x-12 absolute whitespace-nowrap"
                        animate={{ x: [0, -1000] }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 20,
                                ease: "linear",
                            },
                        }}
                    >
                        {duplicatedSponsors.map((sponsor, idx) => (
                            <div key={idx} className="w-48 h-20 opacity-40 hover:opacity-100 transition-opacity flex-shrink-0">
                                <img src={sponsor.logo} alt={sponsor.name} className="w-full h-full object-contain filter grayscale" />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            <style>{`
         .fade-edges {
            -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
            mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
         }
      `}</style>
        </section>
    );
}
