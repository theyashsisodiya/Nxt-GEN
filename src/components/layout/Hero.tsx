import { Button } from "@/components/ui/button";
import { TerminalDemo } from "@/components/ui/terminal-demo";
import { ArrowRight, Bot, Shield, CheckCircle, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export function Hero() {
    const navigate = useNavigate();

    return (
        <section className="relative pt-32 pb-20 overflow-hidden min-h-screen flex items-center">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 via-background to-background z-0" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent z-0" />

            {/* Grid pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] z-0" />

            {/* Noise overlay */}
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none z-0"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}
            />

            {/* Floating orbs */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-accent/25 rounded-full blur-[100px]"
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="container relative z-10 mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
                {/* Text Content */}
                <motion.div
                    className="text-left space-y-8"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 backdrop-blur-sm"
                    >
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                        <span className="text-sm font-medium text-muted-foreground">Now in Open Beta v1.1</span>
                        <Bot className="w-4 h-4 text-primary" />
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
                    >
                        "Fortune 500" Reliability for{" "}
                        <span className="text-gradient-primary relative">
                            2-Person Startups
                            <Sparkles className="absolute -top-4 -right-8 w-6 h-6 text-accent animate-pulse" />
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-lg text-muted-foreground max-w-lg leading-relaxed"
                    >
                        Replace the need for 24/7 DevOps teams. Nxt-Gen detects failures, heals infrastructure, and controls costs—automatically, 365 days a year.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col sm:flex-row gap-4"
                    >
                        <Button
                            size="lg"
                            className="rounded-full px-8 text-base btn-premium text-primary-foreground shadow-2xl shadow-primary/30 hover:shadow-primary/50 transition-all hover:scale-105 group"
                            onClick={() => navigate('/login')}
                        >
                            <Zap className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                            Deploy Autonomous Agent
                            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="rounded-full px-8 text-base border-border/50 hover:bg-muted/50 hover:border-primary/30 transition-all"
                        >
                            View Failure Taxonomy
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pt-2"
                    >
                        <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                            <span>No Code Required</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-primary" />
                            <span>Zero-Trust Security</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-accent" />
                            <span>Self-Healing</span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Interactive Visual */}
                <motion.div
                    className="relative"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                >
                    {/* Glow Effect */}
                    <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-primary via-accent to-cyan-500 opacity-30 blur-3xl" />
                    <div className="relative">
                        <TerminalDemo />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
