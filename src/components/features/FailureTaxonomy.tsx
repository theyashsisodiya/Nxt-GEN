import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Lock, Eye, AlertTriangle, Fingerprint } from "lucide-react";

export function FailureTaxonomy() {
    return (
        <section id="taxonomy" className="py-24 bg-background relative">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">The Trust Architecture</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        We don't just "guess". Nxt-Gen follows a strict Failure Taxonomy and Zero-Trust Security Model.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 mb-24">
                    {/* Level 1 */}
                    <Card className="bg-emerald-950/20 border-emerald-500/20 hover:border-emerald-500/50 transition-all">
                        <CardHeader>
                            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-500/10 mb-4">
                                <span className="text-emerald-500 font-bold">L1</span>
                            </div>
                            <CardTitle className="text-xl text-emerald-400">Operational Failures</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">Safe to auto-fix immediately.</p>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center text-emerald-300"><CheckCircle className="w-4 h-4 mr-2" /> Pod Restart Loops</li>
                                <li className="flex items-center text-emerald-300"><CheckCircle className="w-4 h-4 mr-2" /> Memory/CPU Spikes</li>
                                <li className="flex items-center text-emerald-300"><CheckCircle className="w-4 h-4 mr-2" /> Disk Full Cleanup</li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Level 2 */}
                    <Card className="bg-yellow-950/20 border-yellow-500/20 hover:border-yellow-500/50 transition-all">
                        <CardHeader>
                            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-yellow-500/10 mb-4">
                                <span className="text-yellow-500 font-bold">L2</span>
                            </div>
                            <CardTitle className="text-xl text-yellow-400">Config Failures</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">Conditional auto-fix (with safeguards).</p>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center text-yellow-300"><AlertTriangle className="w-4 h-4 mr-2" /> Missing Env Variables</li>
                                <li className="flex items-center text-yellow-300"><AlertTriangle className="w-4 h-4 mr-2" /> Broken CI/CD Steps</li>
                                <li className="flex items-center text-yellow-300"><AlertTriangle className="w-4 h-4 mr-2" /> Service Bindings</li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Level 3 */}
                    <Card className="bg-red-950/20 border-red-500/20 hover:border-red-500/50 transition-all">
                        <CardHeader>
                            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-500/10 mb-4">
                                <span className="text-red-500 font-bold">L3</span>
                            </div>
                            <CardTitle className="text-xl text-red-400">Critical Failures</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">Human approval ALWAYS required.</p>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center text-red-300"><Lock className="w-4 h-4 mr-2" /> DB Schema Changes</li>
                                <li className="flex items-center text-red-300"><Lock className="w-4 h-4 mr-2" /> Data Deletion</li>
                                <li className="flex items-center text-red-300"><Lock className="w-4 h-4 mr-2" /> Auth/Permission Changes</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                {/* Security Section */}
                <div className="bg-secondary/10 rounded-3xl p-8 md:p-12 border border-border/50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-12 opacity-5">
                        <ShieldCheck className="w-64 h-64" />
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                        <div>
                            <h3 className="text-3xl font-bold mb-6">Bank-Grade Security (AES-256)</h3>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="bg-primary/20 p-3 rounded-lg h-fit">
                                        <Lock className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg">Just-In-Time Access</h4>
                                        <p className="text-muted-foreground">Credentials are decrypted only inside a temporary, isolated environment and destroyed immediately after use.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="bg-primary/20 p-3 rounded-lg h-fit">
                                        <Fingerprint className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-lg">Zero-Knowledge Storage</h4>
                                        <p className="text-muted-foreground">We never see your keys. They are stored in cold storage using AES-256 encryption.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-black/50 rounded-xl p-8 border border-white/10 backdrop-blur-md">
                            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                                <div className="flex items-center">
                                    <ShieldCheck className="w-5 h-5 text-green-400 mr-2" />
                                    <span className="font-mono text-sm">Security Audit Log</span>
                                </div>
                                <span className="text-xs text-muted-foreground">Live</span>
                            </div>
                            <div className="space-y-3 font-mono text-xs text-muted-foreground">
                                <div className="flex justify-between">
                                    <span>[10:00:01] Vault Access Request</span>
                                    <span className="text-blue-400">PENDING</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>[10:00:02] Identity Verified (JIT)</span>
                                    <span className="text-green-400">SUCCESS</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>[10:00:02] Injecting Ephemeral Key</span>
                                    <span className="text-green-400">DONE</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>[10:00:05] Key Destruction</span>
                                    <span className="text-green-400">VERIFIED</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

import { CheckCircle } from "lucide-react";
