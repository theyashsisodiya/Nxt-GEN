
import { Check, Star, Zap, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const pricingPlans = [
  {
    id: "free",
    name: "Free Trial",
    price: "₹0",
    duration: "7 Days",
    description: "A no-risk, full-featured trial designed to let users experience the core power of the platform.",
    icon: Zap,
    featured: false,
    features: [
      "3 Projects",
      "15 Prompts",
      "45 Quick Fixes", 
      "1 User",
      "All core DevOps agents",
      "Community support"
    ],
    buttonText: "Start Free Trial",
    buttonVariant: "outline" as const
  },
  {
    id: "developer",
    name: "Developer",
    price: "₹5,000",
    duration: "per month",
    yearlyPrice: "₹50,000/year (16% off)",
    description: "Perfect for freelancers, individual developers, and hobbyists automating personal projects.",
    icon: Users,
    featured: false,
    features: [
      "50 Prompts/month",
      "150 Quick Fixes/month",
      "1 User",
      "5 Projects",
      "All core DevOps agents",
      "Self-Healing Architecture",
      "Real-Time Monitoring",
      "Email Support (48hr response)"
    ],
    buttonText: "Get Developer",
    buttonVariant: "default" as const
  },
  {
    id: "startup", 
    name: "Startup",
    price: "₹20,000",
    duration: "per month",
    yearlyPrice: "₹2,00,000/year (16% off)",
    description: "Most popular plan for collaborative teams managing a growing portfolio of applications.",
    icon: Star,
    featured: true,
    features: [
      "250 Prompts/month",
      "750 Quick Fixes/month", 
      "Up to 10 Users",
      "Unlimited Projects",
      "All core DevOps agents",
      "Self-Healing Architecture",
      "Real-Time Monitoring",
      "Priority Support (24hr response)",
      "Workflow history & audit logs"
    ],
    buttonText: "Get Startup",
    buttonVariant: "default" as const
  },
  {
    id: "enterprise",
    name: "Enterprise", 
    price: "Custom",
    duration: "pricing",
    description: "Fully tailored solution with enterprise-grade features, dedicated support, and custom integrations.",
    icon: Shield,
    featured: false,
    features: [
      "Custom/Unlimited Prompts",
      "Custom/Unlimited Quick Fixes",
      "Custom/Unlimited Users", 
      "Unlimited Projects",
      "Custom agent development",
      "Private cloud deployment",
      "SSO & RBAC",
      "Dedicated Account Manager",
      "24/7 Phone Support",
      "API access"
    ],
    buttonText: "Contact Sales",
    buttonVariant: "outline" as const
  }
];

const addOnPacks = [
  {
    name: "Prompt Pack",
    description: "25 Prompts + 75 Quick Fixes",
    price: "₹3,000"
  },
  {
    name: "CI/CD Run Pack", 
    description: "500 extra CI/CD pipeline runs",
    price: "₹2,500"
  }
];

const PricingPlans = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Choose Your Plan</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Transparent pricing based on Prompts and Quick Fixes. Scale as you grow with our flexible plans designed for the Indian market.
        </p>
      </div>

      {/* Billing Metrics Info */}
      <Card className="modern-panel">
        <div className="modern-panel-header">
          <CardTitle className="text-2xl text-foreground">Our Billing Metrics</CardTitle>
          <CardDescription className="text-muted-foreground mt-2">
            Clear, simple pricing based on two core metrics
          </CardDescription>
        </div>
        <div className="modern-panel-content">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold text-foreground">Prompt</h3>
              </div>
              <p className="text-muted-foreground">
                A single, top-level user command that initiates a workflow. Follow-up modifications within the same workflow don't consume additional credits.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-success-green" />
                <h3 className="text-lg font-semibold text-foreground">Quick Fix</h3>
              </div>
              <p className="text-muted-foreground">
                One automated remediation action by our self-healing architecture. Generous 3:1 ratio to prompts reflects our platform's reliability.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pricingPlans.map((plan) => (
          <Card 
            key={plan.id} 
            className={`pricing-card relative ${plan.featured ? 'pricing-card-featured' : ''}`}
          >
            {plan.featured && (
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                Most Popular
              </Badge>
            )}
            
            <CardHeader className="text-center pb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                <plan.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <CardTitle className="text-xl text-foreground">{plan.name}</CardTitle>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-foreground">{plan.price}</div>
                <div className="text-sm text-muted-foreground">{plan.duration}</div>
                {plan.yearlyPrice && (
                  <div className="text-xs text-primary">{plan.yearlyPrice}</div>
                )}
              </div>
              <CardDescription className="text-muted-foreground">
                {plan.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-success-green flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full rounded-xl modern-button ${plan.featured ? 'bg-primary hover:bg-primary/90' : ''}`}
                variant={plan.buttonVariant}
              >
                {plan.buttonText}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add-on Packs */}
      <Card className="modern-panel">
        <div className="modern-panel-header">
          <CardTitle className="text-2xl text-foreground">Usage-Based Add-Ons</CardTitle>
          <CardDescription className="text-muted-foreground mt-2">
            Flexible add-on packs when you occasionally exceed your monthly allowances
          </CardDescription>
        </div>
        <div className="modern-panel-content">
          <div className="grid md:grid-cols-2 gap-6">
            {addOnPacks.map((pack, index) => (
              <div key={index} className="template-card p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{pack.name}</h3>
                    <p className="text-muted-foreground">{pack.description}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-primary">{pack.price}</div>
                    <Button variant="outline" className="rounded-xl">
                      Purchase
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* FAQ or Additional Info */}
      <Card className="modern-panel">
        <div className="modern-panel-header">
          <CardTitle className="text-2xl text-foreground">Billing & Payment Policies</CardTitle>
        </div>
        <div className="modern-panel-content">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">Payment & Billing</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Monthly or annual billing cycles available</li>
                <li>• Accept all major cards, UPI payments</li>
                <li>• 16% discount on annual subscriptions</li>
                <li>• Secure payments via Razorpay/Stripe</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-foreground">Upgrades & Changes</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Upgrade anytime with prorated billing</li>
                <li>• Downgrades take effect next billing cycle</li>
                <li>• No setup fees or hidden charges</li>
                <li>• Cancel anytime with 30-day notice</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PricingPlans;
