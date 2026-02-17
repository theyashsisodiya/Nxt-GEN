import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/layout/Hero";
import { ProblemSolution } from "@/components/layout/ProblemSolution";
import { AutonomousCapabilities } from "@/components/features/AutonomousCapabilities";
import { FailureTaxonomy } from "@/components/features/FailureTaxonomy";
import { CompetitiveMoat } from "@/components/layout/CompetitiveMoat";
import { Pricing, Footer } from "@/components/layout/Footer";

export function LandingPage() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-primary/20">
            <Navbar />
            <main>
                <Hero />
                <ProblemSolution />
                <AutonomousCapabilities />
                <FailureTaxonomy />
                <CompetitiveMoat />
                <Pricing />
            </main>
            <Footer />
        </div>
    );
}
