import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Rocket, Activity, HeartPulse, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

const capabilities = [
    {
        id: "healing",
        icon: HeartPulse,
        title: "Self-Healing (The Hero)",
        description: "Detects failure. Reads logs. Identifies root cause. Executes the fix. Verifies recovery.",
        visual: (
            <div className="bg-black/90 rounded-lg p-4 font-mono text-xs h-full text-green-400 border border-green-500/20">
                <div className="mb-2 text-gray-400"># Autonomous Incident Response</div>
                <div className="space-y-1">
                    <div>[03:42:10] ALERT: Service 'auth-api' unresponsive</div>
                    <div className="text-blue-400">[03:42:11] ANALYSIS: CPU Throttling detected</div>
                    <div className="text-yellow-400">[03:42:12] ACTION: Scaling replicas 2 &gt; 4</div>
                    <div>[03:42:15] VERIFY: Health check check_auth... OK</div>
                    <div className="text-white bg-green-900/30 w-fit px-2 py-0.5 rounded border border-green-500/30 mt-2">
                        [RESOLVED] INCIDENT RESTORED (5s)
                    </div>
                </div>
            </div>
        )
    },
    {
        id: "deployment",
        icon: Rocket,
        title: "Autonomous Deployment",
        description: "Single-prompt setup. Handles CI/CD pipelines, environment config, and updates automatically.",
        visual: (
            <div className="bg-black/90 rounded-lg p-4 font-mono text-xs h-full text-blue-400 border border-blue-500/20">
                <div className="mb-2 text-gray-400"># Zero-Touch Deployment</div>
                <div className="space-y-1">
                    <div className="text-purple-400">&gt; Deploy usage-analytics-v2</div>
                    <div>Building container image... [Done]</div>
                    <div>Pushing to registry... [Done]</div>
                    <div>Updating Kubernetes manifest... [Done]</div>
                    <div className="text-white">Waiting for rollout...</div>
                    <div className="flex items-center space-x-1 mt-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-green-400">Live at https://api.nxt-gen.ai</span>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: "monitoring",
        icon: Activity,
        title: "Continuous Monitoring",
        description: "AI constantly watches application health, services, and infrastructure signals 24/7.",
        visual: (
            <div className="bg-black/90 rounded-lg p-4 h-full border border-primary/20 relative overflow-hidden flex items-end space-x-1">
                {[40, 60, 45, 70, 85, 60, 75, 50, 65, 80, 55, 90, 70, 60, 80].map((h, i) => (
                    <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ duration: 0.5, delay: i * 0.05 }}
                        className="w-full bg-primary/40 hover:bg-primary/80 transition-colors rounded-t-sm"
                    />
                ))}
                <div className="absolute top-4 left-4 text-xs font-mono text-primary">All Systems Operational</div>
            </div>
        )
    }
];

export function AutonomousCapabilities() {
    const [activeTab, setActiveTab] = useState("healing");

    return (
        <section className="py-24 bg-secondary/20">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Autonomous Capabilities</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        More than just alerts. Nxt-Gen takes action.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Tab Selection */}
                    <div className="space-y-4">
                        {capabilities.map((cap) => (
                            <div
                                key={cap.id}
                                onClick={() => setActiveTab(cap.id)}
                                className={cn(
                                    "p-6 rounded-xl border cursor-pointer transition-all duration-300",
                                    activeTab === cap.id
                                        ? "bg-primary/10 border-primary/50 shadow-lg shadow-primary/5"
                                        : "bg-card hover:bg-accent/50 border-border"
                                )}
                            >
                                <div className="flex items-start space-x-4">
                                    <div className={cn(
                                        "p-3 rounded-lg",
                                        activeTab === cap.id ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                                    )}>
                                        <cap.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className={cn("text-xl font-semibold mb-2", activeTab === cap.id ? "text-primary" : "text-foreground")}>
                                            {cap.title}
                                        </h3>
                                        <p className="text-muted-foreground leading-relaxed">{cap.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Visual Display */}
                    <div className="h-[400px] relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                                className="h-full"
                            >
                                <Card className="h-full border-border/50 bg-card/50 glass overflow-hidden">
                                    <CardContent className="p-6 h-full flex flex-col justify-center">
                                        {capabilities.find(c => c.id === activeTab)?.visual}
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}
