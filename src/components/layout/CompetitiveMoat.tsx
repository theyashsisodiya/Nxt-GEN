import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";

export function CompetitiveMoat() {
    return (
        <section className="py-24 bg-secondary/10">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Nxt-Gen Wins</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Cloud providers give you tools. We give you a digital employee.
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="p-4 border-b border-border text-muted-foreground font-medium w-1/3">Feature</th>
                                <th className="p-4 border-b border-border bg-primary/10 text-primary font-bold text-center w-1/3 rounded-t-lg">Nxt-Gen</th>
                                <th className="p-4 border-b border-border text-muted-foreground font-medium text-center w-1/3">AWS/Azure Native Tools</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-4 border-b border-border font-medium">Actionable Autonomy</td>
                                <td className="p-4 border-b border-border bg-primary/5 text-center font-semibold text-foreground">
                                    <div className="flex items-center justify-center text-emerald-400">
                                        <Check className="w-5 h-5 mr-2" /> Executes Fixes (Real-time)
                                    </div>
                                </td>
                                <td className="p-4 border-b border-border text-center text-muted-foreground">
                                    <div className="flex items-center justify-center">
                                        <X className="w-5 h-5 mr-2 text-destructive" /> Only Alerts/Suggestions
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="p-4 border-b border-border font-medium">Multi-Cloud Support</td>
                                <td className="p-4 border-b border-border bg-primary/5 text-center font-semibold text-foreground">
                                    <div className="flex items-center justify-center text-emerald-400">
                                        <Check className="w-5 h-5 mr-2" /> AWS, Azure, GCP, DigitalOcean
                                    </div>
                                </td>
                                <td className="p-4 border-b border-border text-center text-muted-foreground">
                                    <div className="flex items-center justify-center">
                                        <X className="w-5 h-5 mr-2 text-destructive" /> Vendor Locked
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className="p-4 border-b border-border font-medium">Liability Insurance</td>
                                <td className="p-4 border-b border-border bg-primary/5 text-center font-semibold text-foreground">
                                    <div className="flex items-center justify-center text-emerald-400">
                                        <Check className="w-5 h-5 mr-2" /> Up to $30,000 Coverage
                                    </div>
                                </td>
                                <td className="p-4 border-b border-border text-center text-muted-foreground">
                                    <div className="flex items-center justify-center">
                                        <X className="w-5 h-5 mr-2 text-destructive" /> $0 (You are on your own)
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
