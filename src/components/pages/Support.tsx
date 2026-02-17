
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Book, Ticket, MessageCircle, ChevronRight, CheckCircle, LifeBuoy, Send, Headphones, FileText, Zap, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function Support() {
    const navigate = useNavigate();
    const [showTicketModal, setShowTicketModal] = useState(false);
    const [showChatModal, setShowChatModal] = useState(false);
    const [ticketSubmitting, setTicketSubmitting] = useState(false);
    const [ticketSubmitted, setTicketSubmitted] = useState(false);
    const [chatMessages, setChatMessages] = useState<Array<{ type: 'user' | 'agent', message: string }>>([
        { type: 'agent', message: 'Hi! I\'m here to help you with any questions about Nxt-Gen. How can I assist you today?' }
    ]);
    const [chatInput, setChatInput] = useState('');

    const faqs = [
        {
            question: "How do I connect a new DevOps tool?",
            answer: "Navigate to the Tool Integrations page, browse the available tools, and click 'Connect'. You'll be prompted to provide the necessary API keys or authentication details."
        },
        {
            question: "What happens if a workflow step fails?",
            answer: "If a step fails, the workflow pauses and alerts you. Our self-healing architecture may attempt to fix common issues automatically. You can also troubleshoot manually using the chat assistant."
        },
        {
            question: "How secure are my credentials?",
            answer: "We use AES-256 encryption for all stored credentials. Our zero-trust architecture ensures that keys are only decrypted in memory during workflow execution and never stored in plain text."
        },
        {
            question: "Can I customize the workflow order?",
            answer: "Yes, you can use the Workflow Builder to define custom sequences, or modify existing templates to suit your specific pipeline requirements."
        },
        {
            question: "How do I monitor workflow performance?",
            answer: "The Dashboard provides real-time metrics on deployment success rates, duration, and frequency. You can also view detailed logs for each specific workflow run."
        }
    ];

    const supportOptions = [
        {
            title: 'Live Chat',
            desc: 'Chat with our team in real-time',
            metric: 'Avg: 2 min response',
            icon: MessageSquare,
            gradient: 'from-violet-500 to-purple-600',
            action: 'Start Chat',
            onClick: () => setShowChatModal(true)
        },
        {
            title: 'Documentation',
            desc: 'Browse guides and tutorials',
            metric: '50+ articles',
            icon: Book,
            gradient: 'from-cyan-500 to-blue-600',
            action: 'Browse Docs',
            onClick: () => navigate('/app/docs')
        },
        {
            title: 'Create Ticket',
            desc: 'Submit a detailed request',
            metric: '< 4hr response',
            icon: Ticket,
            gradient: 'from-emerald-500 to-green-600',
            action: 'New Ticket',
            onClick: () => setShowTicketModal(true)
        },
    ];

    const resources = [
        { title: "Getting Started Guide", category: "Basics", section: "getting-started" },
        { title: "Tool Integration Setup", category: "Integration", section: "tool-integration" },
        { title: "Workflow Automation", category: "Automation", section: "workflow-automation" },
        { title: "Security Best Practices", category: "Security", section: "security" },
        { title: "API Reference", category: "API", section: "api-reference" },
        { title: "Troubleshooting Guide", category: "Support", section: "troubleshooting" }
    ];

    const systemStatus = [
        { name: 'API Gateway', uptime: '99.9%' },
        { name: 'Workflow Engine', uptime: '99.8%' },
        { name: 'Tool Integrations', uptime: '99.7%' },
        { name: 'Monitoring', uptime: '100%' }
    ];

    const handleTicketSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTicketSubmitting(true);
        setTimeout(() => {
            setTicketSubmitting(false);
            setTicketSubmitted(true);
            setTimeout(() => {
                setShowTicketModal(false);
                setTicketSubmitted(false);
            }, 2000);
        }, 1500);
    };

    const handleChatSend = () => {
        if (!chatInput.trim()) return;
        setChatMessages(prev => [...prev, { type: 'user', message: chatInput }]);
        const userMsg = chatInput;
        setChatInput('');

        setTimeout(() => {
            let response = "I understand you're asking about \"" + userMsg + "\". Let me look into that for you. ";
            if (userMsg.toLowerCase().includes('workflow')) {
                response += "For workflow-related questions, I recommend checking our Workflow Automation documentation. Would you like me to guide you there?";
            } else if (userMsg.toLowerCase().includes('api')) {
                response += "For API questions, our API Reference has comprehensive documentation including OAuth 2.0 setup and all endpoints.";
            } else if (userMsg.toLowerCase().includes('error') || userMsg.toLowerCase().includes('fail')) {
                response += "If you're experiencing errors, please check our Troubleshooting Guide. Would you like me to create a support ticket for further assistance?";
            } else {
                response += "I'm here to help! Feel free to ask about workflows, integrations, APIs, or any other feature.";
            }
            setChatMessages(prev => [...prev, { type: 'agent', message: response }]);
        }, 1000);
    };

    return (
        <div className="space-y-6 animate-fade-in max-w-full">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <div className="flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-3xl font-bold text-gradient-primary tracking-tight">
                                Support Center
                            </h1>
                        </div>
                        <p className="text-muted-foreground text-sm">
                            Get help with your Nxt-Gen platform and DevOps workflows
                        </p>
                    </div>
                    <Badge variant="outline" className="text-[10px] border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-semibold uppercase tracking-wider">
                        <Headphones className="w-3 h-3 mr-1" />
                        24/7 Support
                    </Badge>
                </div>
            </div>

            {/* Support Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {supportOptions.map((option, i) => (
                    <Card key={i} className="gradient-card border-border/20 group hover:border-primary/30 transition-all duration-300 overflow-hidden">
                        <CardContent className="p-5 relative">
                            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${option.gradient} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`} />
                            <div className="relative">
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${option.gradient} flex items-center justify-center mb-3 shadow-lg`}>
                                    <option.icon className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="font-semibold text-foreground mb-1">{option.title}</h3>
                                <p className="text-xs text-muted-foreground mb-3">{option.desc}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] text-muted-foreground/70">{option.metric}</span>
                                    <Button
                                        size="sm"
                                        variant={i === 0 ? "default" : "outline"}
                                        className="rounded-xl h-8 text-xs"
                                        onClick={option.onClick}
                                    >
                                        {option.action}
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* FAQ Section */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="gradient-card border-border/20">
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-primary/10">
                                    <Zap className="w-4 h-4 text-primary" />
                                </div>
                                <CardTitle className="text-lg">Frequently Asked Questions</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <Accordion type="single" collapsible className="w-full">
                                {faqs.map((faq, index) => (
                                    <AccordionItem key={index} value={`item-${index}`} className="border-border/20">
                                        <AccordionTrigger className="text-left text-sm font-medium hover:text-primary transition-colors py-3">
                                            {faq.question}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground text-sm pb-4">
                                            {faq.answer}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </CardContent>
                    </Card>

                    {/* Documentation */}
                    <Card className="gradient-card border-border/20">
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-cyan-500/10">
                                    <FileText className="w-4 h-4 text-cyan-400" />
                                </div>
                                <CardTitle className="text-lg">Documentation & Resources</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {resources.map((doc, index) => (
                                    <Button
                                        key={index}
                                        variant="ghost"
                                        className="h-auto py-3 px-3 justify-between group rounded-xl border border-border/10 hover:border-border/30 hover:bg-muted/30"
                                        onClick={() => navigate('/app/docs')}
                                    >
                                        <div className="flex flex-col items-start gap-0.5">
                                            <span className="font-medium text-sm">{doc.title}</span>
                                            <span className="text-[10px] text-muted-foreground">{doc.category}</span>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </Button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Contact and Status */}
                <div className="space-y-4">
                    <Card className="gradient-card border-border/20">
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-2">
                                <MessageCircle className="w-4 h-4 text-primary" />
                                <CardTitle className="text-sm">Contact Support</CardTitle>
                            </div>
                            <CardDescription className="text-xs">Can't find what you're looking for?</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3 pt-0">
                            <div className="space-y-1.5">
                                <Label htmlFor="name" className="text-xs">Name</Label>
                                <Input id="name" placeholder="Your name" className="bg-muted/30 border-border/40 rounded-xl h-9 text-sm" />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="email" className="text-xs">Email</Label>
                                <Input id="email" type="email" placeholder="your@email.com" className="bg-muted/30 border-border/40 rounded-xl h-9 text-sm" />
                            </div>
                            <div className="space-y-1.5">
                                <Label htmlFor="message" className="text-xs">Message</Label>
                                <Textarea id="message" placeholder="Describe your issue..." rows={3} className="bg-muted/30 border-border/40 rounded-xl text-sm resize-none" />
                            </div>
                            <Button className="w-full rounded-xl btn-premium text-primary-foreground h-9">
                                <Send className="w-4 h-4 mr-2" />
                                Send Message
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="gradient-card border-border/20">
                        <CardHeader className="pb-3">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-emerald-400" />
                                <CardTitle className="text-sm">System Status</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-2 pt-0">
                            {systemStatus.map((service, i) => (
                                <div key={i} className="flex items-center justify-between py-1.5">
                                    <span className="text-xs text-muted-foreground">{service.name}</span>
                                    <Badge variant="outline" className="text-[9px] border-emerald-500/25 bg-emerald-500/10 text-emerald-400 font-medium">
                                        {service.uptime}
                                    </Badge>
                                </div>
                            ))}
                            <div className="pt-2 mt-2 border-t border-border/20">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                    All systems operational
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Ticket Modal */}
            {showTicketModal && (
                <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-card border border-border/50 rounded-2xl w-full max-w-lg shadow-2xl">
                        <div className="flex items-center justify-between p-4 border-b border-border/50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                                    <Ticket className="w-5 h-5 text-emerald-400" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold">Create Support Ticket</h2>
                                    <p className="text-xs text-muted-foreground">We'll respond within 4 hours</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setShowTicketModal(false)}>
                                <X className="w-4 h-4" />
                            </Button>
                        </div>

                        {ticketSubmitted ? (
                            <div className="p-8 text-center">
                                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">Ticket Submitted!</h3>
                                <p className="text-sm text-muted-foreground">Ticket #NXT-{Math.floor(Math.random() * 10000)} has been created. We'll email you shortly.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleTicketSubmit} className="p-4 space-y-4">
                                <div className="space-y-1.5">
                                    <Label className="text-xs">Subject</Label>
                                    <Input placeholder="Brief description of your issue" className="bg-muted/30 border-border/40 rounded-xl h-9 text-sm" required />
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-xs">Category</Label>
                                    <Select required>
                                        <SelectTrigger className="bg-muted/30 border-border/40 rounded-xl h-9 text-sm">
                                            <SelectValue placeholder="Select category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="workflow">Workflow Issues</SelectItem>
                                            <SelectItem value="integration">Tool Integrations</SelectItem>
                                            <SelectItem value="api">API & Authentication</SelectItem>
                                            <SelectItem value="billing">Billing & Account</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-xs">Priority</Label>
                                    <Select required>
                                        <SelectTrigger className="bg-muted/30 border-border/40 rounded-xl h-9 text-sm">
                                            <SelectValue placeholder="Select priority" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="low">Low - General inquiry</SelectItem>
                                            <SelectItem value="medium">Medium - Issue affecting work</SelectItem>
                                            <SelectItem value="high">High - Critical production issue</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-1.5">
                                    <Label className="text-xs">Description</Label>
                                    <Textarea placeholder="Please provide detailed information about your issue..." rows={4} className="bg-muted/30 border-border/40 rounded-xl text-sm resize-none" required />
                                </div>
                                <Button type="submit" className="w-full rounded-xl h-10" disabled={ticketSubmitting}>
                                    {ticketSubmitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-4 h-4 mr-2" />
                                            Submit Ticket
                                        </>
                                    )}
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            )}

            {/* Chat Modal */}
            {showChatModal && (
                <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-card border border-border/50 rounded-2xl w-full max-w-lg shadow-2xl flex flex-col h-[500px]">
                        <div className="flex items-center justify-between p-4 border-b border-border/50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center">
                                    <MessageSquare className="w-5 h-5 text-violet-400" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold">Live Chat Support</h2>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                        <p className="text-xs text-muted-foreground">Agent online</p>
                                    </div>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setShowChatModal(false)}>
                                <X className="w-4 h-4" />
                            </Button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-3">
                            {chatMessages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.type === 'user'
                                            ? 'bg-primary text-primary-foreground rounded-br-sm'
                                            : 'bg-muted/50 rounded-bl-sm'
                                        }`}>
                                        {msg.message}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 border-t border-border/50">
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Type your message..."
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                                    className="bg-muted/30 border-border/40 rounded-xl h-10 text-sm"
                                />
                                <Button onClick={handleChatSend} className="rounded-xl h-10 px-4">
                                    <Send className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Support;
