import { useState } from "react";
import { Send, Bot, User, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
interface ChatMessage {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}
interface ChatPanelProps {
  onPromptSubmit: (prompt: string) => void;
}
export function ChatPanel({
  onPromptSubmit
}: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([{
    id: '1',
    type: 'system',
    content: 'Welcome to AIaaS Platform! Describe your deployment workflow and I\'ll orchestrate the tools automatically.',
    timestamp: new Date()
  }]);
  const [input, setInput] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    onPromptSubmit(input);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `I'll start the deployment workflow. Initializing Docker build, then Jenkins pipeline, followed by Kubernetes deployment...`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };
  const getMessageIcon = (type: string) => {
    switch (type) {
      case 'user':
        return <User className="w-4 h-4" />;
      case 'assistant':
        return <Bot className="w-4 h-4" />;
      default:
        return <Zap className="w-4 h-4" />;
    }
  };
  const getMessageClass = (type: string) => {
    switch (type) {
      case 'user':
        return 'bg-primary/10 border-primary/20';
      case 'assistant':
        return 'bg-accent/10 border-accent/20';
      default:
        return 'bg-muted/30 border-border';
    }
  };
  return <Card className="modern-panel h-full flex flex-col">
      <div className="modern-panel-header">
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Bot className="w-5 h-5 text-primary" />
          AI Workflow Assistant
          <Badge variant="outline" className="status-running ml-auto">
            Online
          </Badge>
        </CardTitle>
      </div>

      <div className="modern-panel-content flex-1 flex flex-col">
        <ScrollArea className="flex-1 mb-4 bg-background/30 rounded-lg border border-border/50 p-4">
          <div className="space-y-4">
            {messages.map(message => <div key={message.id} className={`p-3 rounded-lg border ${getMessageClass(message.type)}`}>
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 text-muted-foreground">
                    {getMessageIcon(message.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-foreground">{message.content}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>)}
          </div>
        </ScrollArea>

        <form onSubmit={handleSubmit} className="flex gap-3">
          <Input value={input} onChange={e => setInput(e.target.value)} placeholder="Describe your deployment workflow..." className="flex-1 bg-background border-border rounded-lg" />
          <Button type="submit" size="icon" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </Card>;
}