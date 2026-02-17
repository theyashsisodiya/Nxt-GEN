import { Button } from "@/components/ui/button";
import { Cpu, Menu, ArrowRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const navLinks = [
        { label: "Features", href: "#features" },
        { label: "Taxonomy", href: "#taxonomy" },
        { label: "Pricing", href: "#pricing" }
    ];

    return (
        <nav className="fixed top-0 w-full z-50 glassmorphism border-b border-border/30">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <motion.div
                    className="flex items-center space-x-2.5 cursor-pointer group"
                    onClick={() => navigate('/')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30 group-hover:shadow-primary/50 transition-shadow">
                        <Cpu className="text-white w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold text-gradient-primary">
                        Nxt-Gen
                    </span>
                </motion.div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
                        >
                            {link.label}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all group-hover:w-full" />
                        </a>
                    ))}
                    <Button
                        size="sm"
                        onClick={() => navigate('/login')}
                        className="rounded-full btn-premium text-primary-foreground gap-2 px-5"
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        Get Started
                        <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2 rounded-xl hover:bg-muted/50 transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <Menu className="w-5 h-5 text-foreground" />
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden overflow-hidden glassmorphism border-t border-border/30"
                    >
                        <div className="p-4 flex flex-col gap-3">
                            {navLinks.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="text-sm font-medium text-muted-foreground hover:text-foreground p-2 rounded-xl hover:bg-muted/30 transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {link.label}
                                </a>
                            ))}
                            <Button
                                size="sm"
                                className="w-full rounded-xl btn-premium text-primary-foreground mt-2"
                                onClick={() => { setIsMenuOpen(false); navigate('/login'); }}
                            >
                                Get Started
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
