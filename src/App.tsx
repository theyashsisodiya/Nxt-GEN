import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { LandingPage } from "@/components/pages/LandingPage";
import { Login } from "@/components/pages/Login";
import Layout from "@/components/dashboard-features/Layout";
import Dashboard from "@/components/pages/Dashboard";
import { LiveOps } from "@/components/pages/LiveOps";
import ChatConsole from "@/components/pages/ChatConsole";
import Feedback from "@/components/pages/Feedback";
import PricingPlans from "@/components/pages/PricingPlans";
import UseCases from "@/components/pages/UseCases";
import NotFound from "@/components/pages/NotFound";
import { ToolIntegrations } from "@/components/pages/ToolIntegrations";
import { Credentials } from "@/components/pages/Credentials";
import { Support } from "@/components/pages/Support";
import { Documentation } from "@/components/pages/Documentation";
import { MCPIntegrations } from "@/components/pages/MCPIntegrations";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Navigate to="/app/dashboard" replace />} />

                {/* Protected Application Routes */}
                <Route path="/app" element={<Layout />}>
                    <Route index element={<Navigate to="/app/dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="live-ops" element={<LiveOps />} />
                    <Route path="chat" element={<ChatConsole />} />
                    <Route path="feedback" element={<Feedback />} />
                    <Route path="pricing" element={<PricingPlans />} />
                    <Route path="use-cases" element={<UseCases />} />
                    <Route path="integrations" element={<ToolIntegrations />} />
                    <Route path="credentials" element={<Credentials />} />
                    <Route path="support" element={<Support />} />
                    <Route path="docs" element={<Documentation />} />
                    <Route path="mcp" element={<MCPIntegrations />} />

                    {/* Add more routes for integrations, credentials, etc if needed */}
                    <Route path="*" element={<Navigate to="/app/dashboard" replace />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

export default App;
