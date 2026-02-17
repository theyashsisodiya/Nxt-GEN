
import { useState } from "react";
import { Send, Zap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface WorkflowChatboxProps {
  onWorkflowCreate?: (prompt: string) => void;
}

export function WorkflowChatbox({ onWorkflowCreate }: WorkflowChatboxProps = {}) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    if (onWorkflowCreate) {
      onWorkflowCreate(input);
    } else {
      alert(`Creating workflow: ${input}`);
    }
    setInput('');
  };

  const quickPrompts = [
    "Create a CI/CD pipeline for my React app",
    "Deploy Python Flask app to AWS",
    "Set up Kubernetes monitoring",
    "Build Docker container for Node.js"
  ];

  return (
    <Card className="gradient-card border-border/30 shadow-xl shadow-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-primary to-accent rounded-xl">
            <Zap className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <span className="text-foreground">AI Workflow Creator</span>
            <Badge className="ml-2 bg-primary/20 text-primary border-primary/30">
              <Sparkles className="w-3 h-3 mr-1" />
              Powered by AI
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your workflow (e.g., 'Deploy my Node.js app to production')"
            className="flex-1 bg-background/80 border-border rounded-xl text-foreground placeholder:text-muted-foreground"
          />
          <Button
            type="submit"
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground rounded-xl px-6"
          >
            <Send className="w-4 h-4 mr-2" />
            Create
          </Button>
        </form>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Quick start templates:</p>
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((prompt, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setInput(prompt)}
                className="text-xs rounded-full border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all duration-200"
              >
                {prompt}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
