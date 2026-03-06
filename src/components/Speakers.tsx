import React from 'react';
import { motion } from 'motion/react';

interface Speaker {
    id: string;
    name: string;
    role: string;
    topic: string;
    image: string;
    bio: string;
}

const speakersData: Speaker[] = [
    {
        "id": "1",
        "name": "Prof. Abebe Zegeye",
        "role": "Urban Historian",
        "topic": "The Hidden Layers of Arada",
        "image": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&h=500&auto=format&fit=crop",
        "bio": "Exploring the architectural and cultural evolution of Addis Ababa's most historic district."
    },
    {
        "id": "2",
        "name": "Salem Kassahun",
        "role": "AI Researcher & Artist",
        "topic": "Generative Art in Ethiopian Context",
        "image": "https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?q=80&w=400&h=500&auto=format&fit=crop",
        "bio": "Bridging the gap between traditional Ethiopian motifs and modern machine learning aesthetics."
    },
    {
        "id": "3",
        "name": "Dr. Tewodros Melesse",
        "role": "Climate Scientist",
        "topic": "Sustainable Future for the Horn",
        "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=500&auto=format&fit=crop",
        "bio": "Actionable climate solutions tailored for the unique challenges of the Horn of Africa."
    },
    {
        "id": "4",
        "name": "Mahlet Yohannes",
        "role": "Tech Entrepreneur",
        "topic": "Building Products for the Next Billion",
        "image": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=500&auto=format&fit=crop",
        "bio": "Insights from building scalable tech solutions that impact millions of lives in emerging markets."
    }
];

export default function Speakers() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <section className="py-24 px-6 bg-ted-dark">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16">
                    <h2 className="text-4xl md:text-6xl font-heading font-black text-white uppercase">
                        The <span className="text-ted-red">Voices</span>
                    </h2>
                    <p className="mt-4 text-gray-400 font-sans max-w-lg">Meet the visionaries, artists, and leaders shaping our future at TEDxArada.</p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {speakersData.map((speaker) => (
                        <motion.div key={speaker.id} variants={item} className="group relative overflow-hidden rounded-xl bg-ted-black border border-white/5 cursor-pointer">
                            <div className="aspect-[4/5] overflow-hidden relative">
                                <div className="absolute inset-0 bg-ted-red/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-multiply" />
                                <img
                                    src={speaker.image}
                                    alt={speaker.name}
                                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 z-20">
                                    <h3 className="text-xl font-heading font-bold text-white mb-1 group-hover:text-ted-red transition-colors">{speaker.name}</h3>
                                    <p className="text-sm text-gray-300 font-sans">{speaker.role}</p>
                                </div>
                            </div>
                            <div className="absolute inset-0 bg-ted-black/95 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-30 flex flex-col justify-center">
                                <h4 className="text-ted-red font-bold text-sm uppercase tracking-wider mb-2">Topic</h4>
                                <p className="text-xl font-heading font-medium text-white mb-4 line-clamp-2">{speaker.topic}</p>
                                <p className="text-gray-400 text-sm font-sans line-clamp-4">{speaker.bio}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
