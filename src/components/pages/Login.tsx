import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Lock, ShieldCheck, Cpu, Sparkles, ArrowRight } from "lucide-react";

export function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleLogin = () => {
        setLoading(true);
        setTimeout(() => {
            navigate("/app/dashboard");
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 via-background to-background pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent pointer-events-none" />

            {/* Noise overlay */}
            <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}
            />

            {/* Floating orbs */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/20 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md space-y-8 relative z-10"
            >
                {/* Header */}
                <div className="text-center space-y-3">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
                        className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent text-white mb-2 shadow-2xl shadow-primary/30"
                    >
                        <Cpu className="w-8 h-8" />
                    </motion.div>
                    <h1 className="text-3xl font-bold tracking-tight text-gradient-primary">
                        Nxt-Gen Access
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        Authenticate to manage autonomous AI agents
                    </p>
                </div>

                {/* Login Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="glassmorphism p-8 rounded-2xl shadow-2xl shadow-primary/5 space-y-6"
                >
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <label className="font-medium text-foreground/80">Identity</label>
                                <span className="text-emerald-400 text-xs flex items-center gap-1">
                                    <ShieldCheck className="w-3 h-3" />
                                    Verified
                                </span>
                            </div>
                            <div className="h-11 bg-muted/30 rounded-xl flex items-center px-4 border border-border/30 text-muted-foreground text-sm font-mono">
                                admin@nxt-gen.ai
                            </div>
                        </div>

                        <div className="p-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-xs text-cyan-400 flex items-start gap-2">
                            <Sparkles className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            <span>
                                <strong>Demo Mode:</strong> Click connect to access the full platform dashboard. No password required.
                            </span>
                        </div>
                    </div>

                    <Button
                        onClick={handleLogin}
                        className="w-full h-12 text-sm font-semibold relative overflow-hidden btn-premium text-primary-foreground rounded-xl"
                        disabled={loading}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        {loading ? (
                            <span className="flex items-center gap-2">
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                                />
                                Authenticating...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                <Lock className="w-4 h-4" />
                                Connect to Neural Core
                                <ArrowRight className="w-4 h-4" />
                            </span>
                        )}
                    </Button>

                    <div className="text-center text-[10px] text-muted-foreground/60 flex items-center justify-center gap-2 uppercase tracking-wider">
                        <ShieldCheck className="w-3 h-3" />
                        Protected by Zero-Trust Architecture
                    </div>
                </motion.div>

                {/* Footer */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center text-xs text-muted-foreground/50"
                >
                    Enterprise-Grade Autonomous AI Operations Platform
                </motion.p>
            </motion.div>
        </div>
    );
}
