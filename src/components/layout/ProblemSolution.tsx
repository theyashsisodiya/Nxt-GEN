import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle, CheckCircle, AlertOctagon, Zap } from "lucide-react";

export function ProblemSolution() {
    return (
        <section id="features" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">The "2 AM Emergency" Problem</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Small teams face a critical dilemma: You need 24/7 reliability, but you can't afford a 24/7 DevOps team.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 relative z-10">
                    {/* The Pain */}
                    <Card className="bg-destructive/10 border-destructive/20 relative overflow-hidden group hover:border-destructive/40 transition-all">
                        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                            <AlertOctagon className="w-32 h-32 text-destructive" />
                        </div>
                        <CardHeader>
                            <CardTitle className="flex items-center text-destructive">
                                <XCircle className="w-6 h-6 mr-2" />
                                Current Reality
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <XCircle className="w-5 h-5 mr-3 text-destructive shrink-0 mt-0.5" />
                                    <span className="text-muted-foreground">Single engineer wakes up at 3 AM for emergencies.</span>
                                </li>
                                <li className="flex items-start">
                                    <XCircle className="w-5 h-5 mr-3 text-destructive shrink-0 mt-0.5" />
                                    <span className="text-muted-foreground">Manual investigation takes 2-3 hours while revenue stops.</span>
                                </li>
                                <li className="flex items-start">
                                    <XCircle className="w-5 h-5 mr-3 text-destructive shrink-0 mt-0.5" />
                                    <span className="text-muted-foreground">Human error during stress causing more downtime.</span>
                                </li>
                                <li className="flex items-start">
                                    <XCircle className="w-5 h-5 mr-3 text-destructive shrink-0 mt-0.5" />
                                    <span className="text-muted-foreground">Vacations and sleep are liability risks.</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* The Solution */}
                    <Card className="bg-primary/5 border-primary/20 relative overflow-hidden group hover:border-primary/40 transition-all">
                        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Zap className="w-32 h-32 text-primary" />
                        </div>
                        <CardHeader>
                            <CardTitle className="flex items-center text-primary">
                                <CheckCircle className="w-6 h-6 mr-2" />
                                With Nxt-Gen
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <CheckCircle className="w-5 h-5 mr-3 text-emerald-500 shrink-0 mt-0.5" />
                                    <span className="text-foreground">Autonomous agent fixes issues in seconds, not hours.</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="w-5 h-5 mr-3 text-emerald-500 shrink-0 mt-0.5" />
                                    <span className="text-foreground">Real commands executed on real infrastructure.</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="w-5 h-5 mr-3 text-emerald-500 shrink-0 mt-0.5" />
                                    <span className="text-foreground">Zero human bottleneck. 24/7/365 coverage.</span>
                                </li>
                                <li className="flex items-start">
                                    <CheckCircle className="w-5 h-5 mr-3 text-emerald-500 shrink-0 mt-0.5" />
                                    <span className="text-foreground">Sleep soundly while AI handles the pager.</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
