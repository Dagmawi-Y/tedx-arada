import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const links = [
        { name: 'Theme', href: '#theme' },
        { name: 'Speakers', href: '#speakers' },
        { name: 'Schedule', href: '#schedule' },
        { name: 'Partners', href: '#sponsors' },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 will-change-transform ${scrolled ? 'py-4 bg-ted-black/80 backdrop-blur-xl border-b border-white/10' : 'py-6 bg-transparent'}`}
            >
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <a href="#" className="relative z-10 flex flex-col items-start cursor-pointer group">
                        <div className="flex flex-col">
                            <span className="text-2xl md:text-3xl font-sans tracking-tighter leading-none flex items-center pb-0.5">
                                <span className="text-ted-red font-black">TED<sup className="text-[0.6em] top-[-0.3em]">x</sup></span>
                                <span className="text-white font-semibold ml-1">Arada</span>
                            </span>
                            <span className="text-[9px] text-white/60 font-sans tracking-wide group-hover:text-white transition-colors self-end mt-0.5 mr-0.5">
                                x = independently organized TED event
                            </span>
                        </div>
                    </a>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        {links.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-sm font-sans font-medium text-gray-300 hover:text-white transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-ted-red transition-all duration-300 group-hover:w-full"></span>
                            </a>
                        ))}
                        <a
                            href="https://forms.gle/your-form-link"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-2.5 bg-ted-red text-white text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-ted-red transition-colors duration-300 rounded-[2px]"
                        >
                            Register
                        </a>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden relative z-10 p-2 text-white hover:text-ted-red transition-colors duration-300"
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h16M4 6h16M4 18h16" /></svg>
                        )}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                        className="fixed inset-0 z-40 bg-ted-black pt-24 px-6 md:hidden flex flex-col items-center justify-center space-y-8"
                    >
                        {links.map((link, i) => (
                            <motion.a
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 + 0.1 }}
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-3xl font-heading font-bold text-white uppercase tracking-wider hover:text-ted-red transition-colors"
                            >
                                {link.name}
                            </motion.a>
                        ))}
                        <motion.a
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            href="https://forms.gle/your-form-link"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setMobileMenuOpen(false)}
                            className="mt-8 px-8 py-4 bg-ted-red text-white text-xl font-bold uppercase tracking-wider w-full text-center hover:bg-white hover:text-ted-red transition-colors rounded-[2px]"
                        >
                            Register
                        </motion.a>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
