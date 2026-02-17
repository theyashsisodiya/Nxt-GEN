import { Button } from "@/components/ui/button";
import { Check, Zap, Users, Star, Shield } from "lucide-react";

const pricingPlans = [
    {
        id: "free",
        name: "Free Trial",
        price: "₹0",
        duration: "7 Days",
        description: "Full-featured trial to experience platform power.",
        icon: Zap,
        features: [
            "3 Projects",
            "15 Prompts",
            "45 Quick Fixes",
            "1 User",
            "All core DevOps agents",
            "Community support"
        ],
        buttonText: "Start Free",
        popular: false
    },
    {
        id: "developer",
        name: "Developer",
        price: "₹5,000",
        duration: "/month",
        yearlyPrice: "₹50,000/year (16% off)",
        description: "Perfect for freelancers and individual developers.",
        icon: Users,
        features: [
            "50 Prompts/month",
            "150 Quick Fixes/month",
            "1 User",
            "5 Projects",
            "Self-Healing Architecture",
            "Real-Time Monitoring",
            "Email Support (48hr)"
        ],
        buttonText: "Get Started",
        popular: false
    },
    {
        id: "startup",
        name: "Startup",
        price: "₹20,000",
        duration: "/month",
        yearlyPrice: "₹2,00,000/year (16% off)",
        description: "Most popular for growing teams.",
        icon: Star,
        features: [
            "250 Prompts/month",
            "750 Quick Fixes/month",
            "Up to 10 Users",
            "Unlimited Projects",
            "Self-Healing Architecture",
            "Priority Support (24hr)",
            "Workflow history & audit logs"
        ],
        buttonText: "Get Startup",
        popular: true
    },
    {
        id: "enterprise",
        name: "Enterprise",
        price: "Custom",
        duration: "",
        description: "Fully tailored enterprise solution.",
        icon: Shield,
        features: [
            "Unlimited Prompts & Fixes",
            "Unlimited Users",
            "Custom agent development",
            "Private cloud deployment",
            "SSO & RBAC",
            "Dedicated Account Manager",
            "24/7 Phone Support"
        ],
        buttonText: "Contact Sales",
        popular: false
    }
];

export function Pricing() {
    return (
        <section id="pricing" className="py-24 bg-background">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Start for free, upgrade as you grow. Pricing based on Prompts and Quick Fixes.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {pricingPlans.map((plan) => (
                        <div
                            key={plan.id}
                            className={`relative p-6 rounded-2xl border flex flex-col ${plan.popular
                                    ? 'border-primary bg-primary/5 shadow-2xl shadow-primary/10'
                                    : 'border-border bg-card'
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    Most Popular
                                </div>
                            )}

                            <div className="mb-6">
                                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                                    <plan.icon className="w-5 h-5 text-primary" />
                                </div>
                                <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
                                <div className="flex items-baseline gap-1 mb-1">
                                    <span className="text-3xl font-bold">{plan.price}</span>
                                    <span className="text-sm text-muted-foreground">{plan.duration}</span>
                                </div>
                                {plan.yearlyPrice && (
                                    <p className="text-xs text-primary">{plan.yearlyPrice}</p>
                                )}
                                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                            </div>

                            <ul className="space-y-3 mb-6 flex-1">
                                {plan.features.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-2 text-sm">
                                        <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                variant={plan.popular ? "default" : "outline"}
                                className="w-full"
                            >
                                {plan.buttonText}
                            </Button>
                        </div>
                    ))}
                </div>

                {/* Billing Info */}
                <div className="mt-16 max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8 p-6 rounded-2xl border border-border bg-card/50">
                        <div>
                            <h4 className="font-semibold mb-3">Billing Metrics</h4>
                            <div className="space-y-2 text-sm text-muted-foreground">
                                <p><strong className="text-foreground">Prompt:</strong> A single command that initiates a workflow</p>
                                <p><strong className="text-foreground">Quick Fix:</strong> Automated remediation by self-healing AI</p>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-3">Payment & Billing</h4>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                                <li>• Monthly or annual billing</li>
                                <li>• 16% discount on annual plans</li>
                                <li>• UPI, Cards, Net Banking accepted</li>
                                <li>• Cancel anytime</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export function Footer() {
    return (
        <footer className="py-12 border-t border-border bg-background">
            <div className="container mx-auto px-4 grid md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center space-x-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/50">
                            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold">Nxt-Gen</span>
                    </div>
                    <p className="text-muted-foreground text-sm max-w-xs">
                        The Autonomous AI Operations Platform. Replacements for the "On-Call" shift.
                    </p>
                </div>
                <div>
                    <h4 className="font-semibold mb-4">Product</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
                        <li><a href="#pricing" className="hover:text-primary transition-colors">Pricing</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Changelog</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-semibold mb-4">Company</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                    </ul>
                </div>
            </div>
            <div className="container mx-auto px-4 mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} Nxt-Gen AI Inc. All rights reserved.
            </div>
        </footer>
    );
}
