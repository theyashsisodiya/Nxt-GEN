import { useState } from "react";
import { Send, Bot, User, Zap, Copy, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

interface Message {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

const ChatConsole = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'system',
      content: 'AI Console ready. Ask me to create workflows, troubleshoot issues, or optimize deployments.',
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: '2',
      type: 'user',
      content: 'Deploy my React app to production',
      timestamp: new Date(Date.now() - 300000)
    },
    {
      id: '3',
      type: 'assistant',
      content: 'I\'ll create a deployment workflow:\n\n1. Build Docker image\n2. Push to registry\n3. Deploy to Kubernetes\n4. Configure load balancing\n\nWorkflow WF-001 is now running.',
      timestamp: new Date(Date.now() - 290000)
    }
  ]);
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    setTimeout(() => {
      const responses = [
        'Analyzing your request. I\'ll configure the optimal workflow settings.',
        'Creating workflow with your specifications. Auto-configuring integrations.',
        'I found an issue and applied a fix. Deployment should proceed normally.',
        'Workflow optimized. Reduced deployment time by 35%.'
      ];
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const quickActions = [
    { label: 'New Deploy', icon: Zap },
    { label: 'Rollback', icon: RotateCcw },
    { label: 'Analyze', icon: Sparkles },
  ];

  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">AI Console</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Natural language interface for DevOps operations
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6 h-[calc(100vh-200px)]">
        {/* Chat */}
        <div className="col-span-2 flex flex-col card-base overflow-hidden">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className="flex gap-3">
                  <div className={`
                    w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0
                    ${msg.type === 'user' ? 'bg-primary/20' : 'bg-accent/20'}
                  `}>
                    {msg.type === 'user' ? (
                      <User className="w-3.5 h-3.5 text-primary" />
                    ) : (
                      <Bot className="w-3.5 h-3.5 text-accent" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium">
                        {msg.type === 'user' ? 'You' : msg.type === 'assistant' ? 'Nxt-Gen AI' : 'System'}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className={`
                      text-sm leading-relaxed p-3 rounded-lg border whitespace-pre-wrap
                      ${msg.type === 'user'
                        ? 'bg-muted/30 border-border/50'
                        : msg.type === 'assistant'
                          ? 'bg-card border-border/50'
                          : 'bg-muted/20 border-border/30'
                      }
                    `}>
                      {msg.content}
                    </div>
                    {msg.type === 'assistant' && (
                      <button
                        onClick={() => navigator.clipboard.writeText(msg.content)}
                        className="flex items-center gap-1 mt-1.5 text-[10px] text-muted-foreground hover:text-foreground"
                      >
                        <Copy className="w-3 h-3" />
                        Copy
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <form onSubmit={handleSubmit} className="p-4 border-t border-border/50">
            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask AI to create workflows, debug issues, or optimize..."
                className="min-h-[60px] max-h-[120px] resize-none text-sm"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <Button type="submit" size="sm" className="h-auto px-4">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </form>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <Card className="card-base">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-1.5">
              {quickActions.map((action, i) => (
                <button
                  key={i}
                  onClick={() => setInput(`${action.label.toLowerCase()} workflow`)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 rounded-lg transition-colors"
                >
                  <action.icon className="w-4 h-4" />
                  {action.label}
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Templates */}
          <Card className="card-base">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Templates</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-1.5">
              {[
                'CI/CD Pipeline',
                'Docker Build',
                'K8s Deploy',
                'Database Backup'
              ].map((template, i) => (
                <button
                  key={i}
                  onClick={() => setInput(`Create ${template.toLowerCase()} workflow`)}
                  className="w-full text-left px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 rounded-lg transition-colors"
                >
                  {template}
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Status */}
          <Card className="card-base">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">AI Status</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-muted-foreground">Connected</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Model: Nxt-Gen v2.1
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChatConsole;