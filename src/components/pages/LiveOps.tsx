import { useState, useEffect } from "react";
import {
    Activity,
    Terminal,
    Zap,
    Users,
    TrendingUp,
    Cpu,
    Wifi,
    Power
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

interface Toggle {
    id: string;
    label: string;
    desc: string;
    enabled: boolean;
}

interface Agent {
    name: string;
    status: string;
    health: string;
    type: string;
    active: boolean;
}

export function LiveOps() {
    const [logs, setLogs] = useState<string[]>([]);

    const [toggles, setToggles] = useState<Toggle[]>([
        { id: "pod-restart", label: "Auto Pod Restart", desc: "Restart failing pods automatically", enabled: true },
        { id: "auto-scale", label: "Auto-Scaling", desc: "Scale based on traffic", enabled: true },
        { id: "caching", label: "Edge Caching", desc: "Cache at edge locations", enabled: true },
        { id: "prod-deploy", label: "Auto Deploy", desc: "Zero-downtime deployments", enabled: false },
        { id: "force-updates", label: "Force Updates", desc: "Bypass health checks", enabled: false },
        { id: "third-party", label: "Webhooks", desc: "External integrations", enabled: true },
    ]);

    const [agents, setAgents] = useState<Agent[]>([
        { name: "SRE-Bot-Alpha", status: "Optimizing", health: "98%", type: "Infra", active: true },
        { name: "Sec-Guard-01", status: "Scanning", health: "100%", type: "Security", active: true },
        { name: "Deploy-Master", status: "Idle", health: "100%", type: "DevOps", active: false },
        { name: "Log-Analyzer", status: "Processing", health: "94%", type: "Observability", active: true },
    ]);

    const handleToggle = (id: string) => {
        setToggles(prev => prev.map(t => t.id === id ? { ...t, enabled: !t.enabled } : t));
    };

    const handleAgentToggle = (index: number) => {
        setAgents(prev => prev.map((a, i) => i === index ? { ...a, active: !a.active } : a));
    };

    useEffect(() => {
        const messages = [
            "Health check passed",
            "Latency: 12ms",
            "Auto-scaled: +2 pods",
            "Scan complete",
            "Backup verified",
            "Cost saved: $4.20/hr",
        ];

        const interval = setInterval(() => {
            const msg = messages[Math.floor(Math.random() * messages.length)];
            const time = new Date().toLocaleTimeString('en-US', { hour12: false });
            setLogs(prev => [`[${time}] ${msg}`, ...prev.slice(0, 8)]);
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    const stats = [
        { label: "Nodes", value: "142", icon: Cpu },
        { label: "Auto-Healed", value: "8.9K", icon: Activity },
        { label: "Uptime", value: "99.99%", icon: Wifi },
        { label: "Savings", value: "$4.2K", icon: TrendingUp },
    ];

    const activeToggles = toggles.filter(t => t.enabled).length;
    const activeAgents = agents.filter(a => a.active).length;

    return (
        <div className="space-y-6 animate-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">Live Operations</h1>
                    <p className="text-sm text-muted-foreground mt-0.5">
                        Monitor autonomous agents in real-time
                    </p>
                </div>
                <div className="flex items-center gap-2 text-xs">
                    <span className="px-2 py-1 rounded bg-muted text-muted-foreground">
                        {activeAgents}/{agents.length} agents
                    </span>
                    <span className="px-2 py-1 rounded bg-muted text-muted-foreground">
                        {activeToggles}/{toggles.length} enabled
                    </span>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                    <div key={i} className="card-base p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-muted-foreground">{stat.label}</p>
                                <p className="text-2xl font-semibold tracking-tight mt-1">{stat.value}</p>
                            </div>
                            <stat.icon className="w-4 h-4 text-muted-foreground" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-6">
                {/* Agents */}
                <Card className="card-base">
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                Agents
                            </CardTitle>
                            <span className="text-xs text-muted-foreground">{activeAgents} active</span>
                        </div>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-2">
                        {agents.map((agent, i) => (
                            <div
                                key={i}
                                className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${agent.active ? "border-border/50 bg-card" : "border-border/30 bg-muted/20 opacity-60"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-2 h-2 rounded-full ${agent.active ? "bg-emerald-500" : "bg-muted-foreground/30"}`} />
                                    <div>
                                        <p className="text-sm font-medium">{agent.name}</p>
                                        <p className="text-xs text-muted-foreground">{agent.status}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs text-muted-foreground">{agent.health}</span>
                                    <Switch
                                        checked={agent.active}
                                        onCheckedChange={() => handleAgentToggle(i)}
                                    />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Terminal */}
                <div className="card-base overflow-hidden flex flex-col">
                    <div className="px-4 py-3 border-b border-border/50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Terminal className="w-4 h-4 text-emerald-500" />
                            <span className="text-sm font-medium">System Logs</span>
                        </div>
                        <div className="flex gap-1">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
                        </div>
                    </div>
                    <div className="flex-1 p-3 font-mono text-xs space-y-1 bg-background/50 min-h-[200px]">
                        <AnimatePresence initial={false}>
                            {logs.map((log, i) => (
                                <motion.div
                                    key={`${log}-${i}`}
                                    initial={{ opacity: 0, x: -8 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-muted-foreground"
                                >
                                    <span className="text-emerald-500">→</span> {log}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Feature Toggles */}
            <Card className="card-base">
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Zap className="w-4 h-4" />
                            Feature Toggles
                        </CardTitle>
                        <div className="flex gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 text-xs"
                                onClick={() => setToggles(prev => prev.map(t => ({ ...t, enabled: true })))}
                            >
                                <Power className="w-3 h-3 mr-1" />
                                Enable all
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 text-xs text-muted-foreground"
                                onClick={() => setToggles(prev => prev.map(t => ({ ...t, enabled: false })))}
                            >
                                Disable all
                            </Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-0">
                    <div className="grid grid-cols-3 gap-3">
                        {toggles.map((toggle) => (
                            <div
                                key={toggle.id}
                                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${toggle.enabled ? "border-primary/30 bg-primary/5" : "border-border/50"
                                    }`}
                                onClick={() => handleToggle(toggle.id)}
                            >
                                <div className="pr-3">
                                    <p className="text-sm font-medium">{toggle.label}</p>
                                    <p className="text-xs text-muted-foreground">{toggle.desc}</p>
                                </div>
                                <Switch
                                    checked={toggle.enabled}
                                    onCheckedChange={() => handleToggle(toggle.id)}
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default LiveOps;
