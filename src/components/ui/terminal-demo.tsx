import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, ShieldCheck, Terminal as TerminalIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

const commands = [
    { text: "> nxt-gen monitor --status", delay: 500 },
    { text: "System Status: CRITICAL", delay: 1000, type: "error" },
    { text: "Detected: Pod Restart Loop (Service: Payment-API)", delay: 1500, type: "error" },
    { text: "> nxt-gen fix --auto", delay: 2500 },
    { text: "Analyzing operational logs...", delay: 3000, type: "info" },
    { text: "Root Cause: Memory Limit Exceeded (OOMKilled)", delay: 4000, type: "info" },
    { text: "Action: Scaling Vertical Resource Limits (512MB -> 1024MB)", delay: 5000, type: "warning" },
    { text: "Verifying Fix...", delay: 6500, type: "info" },
    { text: "Service Health: STABLE", delay: 8000, type: "success" },
    { text: "Incident Resolved in 4.2s. Report generated.", delay: 9000, type: "success" },
    { text: "Listening for new events...", delay: 10500, type: "neutral" },
];

export function TerminalDemo() {
    const [lines, setLines] = useState<any[]>([]);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Start animation loop
        let timeoutIds: ReturnType<typeof setTimeout>[] = [];

        const runSequence = () => {
            setLines([]);
            let currentTime = 0;

            commands.forEach((cmd, index) => {
                const timeout = setTimeout(() => {
                    setLines(prev => [...prev, cmd]);
                }, currentTime + cmd.delay);
                timeoutIds.push(timeout);
            });

            // Loop
            const restartTimeout = setTimeout(() => {
                runSequence();
            }, 15000);
            timeoutIds.push(restartTimeout);
        };

        setVisible(true);
        runSequence();

        return () => timeoutIds.forEach(clearTimeout);
    }, []);

    return (
        <Card className="w-full max-w-lg mx-auto bg-black border-border/50 shadow-2xl shadow-primary/10 overflow-hidden font-mono text-sm relative glass">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border/30 bg-secondary/30">
                <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex items-center text-xs text-muted-foreground space-x-1">
                    <TerminalIcon className="w-3 h-3" />
                    <span>nxt-gen-cli — v1.1.0</span>
                </div>
            </div>

            <div className="p-4 h-[320px] overflow-y-auto flex flex-col space-y-2">
                <AnimatePresence mode='popLayout'>
                    {lines.map((line, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={cn(
                                "flex items-center space-x-2",
                                line.type === 'error' ? "text-red-400" :
                                    line.type === 'success' ? "text-green-400" :
                                        line.type === 'warning' ? "text-yellow-400" :
                                            line.type === 'info' ? "text-blue-400" :
                                                "text-gray-300"
                            )}
                        >
                            {line.type === 'success' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                            {line.type === 'error' && <AlertTriangle className="w-3 h-3 mr-1" />}
                            {line.type === 'warning' && <ShieldCheck className="w-3 h-3 mr-1" />}
                            <span>{line.text}</span>
                        </motion.div>
                    ))}
                </AnimatePresence>

                <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-2 h-4 bg-primary inline-block"
                />
            </div>
        </Card>
    );
}
