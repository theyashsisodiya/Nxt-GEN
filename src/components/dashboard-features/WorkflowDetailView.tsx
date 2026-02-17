import { useState } from "react";
import { ArrowLeft, Send, Bot, User, CheckCircle, Play, Clock, AlertCircle, ChevronDown, ChevronRight, Settings, RotateCcw, Loader2, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface WorkflowDetailViewProps {
  workflowId: number;
  workflowName: string;
  onBack: () => void;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface PipelineStep {
  name: string;
  status: 'success' | 'running' | 'pending' | 'error' | 'troubleshooting';
  commands: string[];
  logs: string[];
  metadata: Record<string, string>;
  troubleshootLogs?: string[];
}

export function WorkflowDetailView({ workflowId, workflowName, onBack }: WorkflowDetailViewProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: `Monitoring "${workflowName}". Ask me to modify steps, troubleshoot issues, or optimize the pipeline.`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set(['Jenkins', 'Kubernetes']));

  const [pipelineSteps, setPipelineSteps] = useState<PipelineStep[]>([
    {
      name: "GitHub",
      status: "success",
      commands: [
        "git clone https://github.com/user/react-app.git",
        "git checkout main",
        "git pull origin main",
        "git status"
      ],
      logs: [
        "[00:28:39] Cloning repository...",
        "[00:28:41] Successfully cloned",
        "[00:28:42] Switched to branch 'main'",
        "[00:28:42] Working tree clean"
      ],
      metadata: {
        "Repository": "user/react-app",
        "Branch": "main",
        "Commit": "a1b2c3d",
        "Author": "Yash"
      }
    },
    {
      name: "Docker",
      status: "success",
      commands: [
        "docker build -t react-app:latest .",
        "docker tag react-app:latest registry.io/react-app:v1.0",
        "docker push registry.io/react-app:v1.0"
      ],
      logs: [
        "[00:28:45] Building Docker image...",
        "[00:28:52] Successfully built image",
        "[00:28:53] Tagged react-app:latest",
        "[00:28:58] Pushed to registry successfully"
      ],
      metadata: {
        "Image ID": "sha256:abc123...",
        "Size": "245 MB",
        "Registry": "registry.io",
        "Tag": "v1.0"
      }
    },
    {
      name: "Jenkins",
      status: "running",
      commands: [
        "jenkins-cli build ReactApp-Pipeline",
        "jenkins-cli console ReactApp-Pipeline #42"
      ],
      logs: [
        "[00:29:01] Started build #42",
        "[00:29:15] Running unit tests...",
        "[00:29:45] Tests passed (18/18)",
        "[00:30:02] Starting integration tests..."
      ],
      metadata: {
        "Build Number": "#42",
        "Started By": "SCM Change",
        "Duration": "4m 32s",
        "Workspace": "/var/jenkins/workspace/ReactApp"
      }
    },
    {
      name: "Kubernetes",
      status: "error",
      commands: [
        "kubectl apply -f deployment.yaml",
        "kubectl apply -f service.yaml",
        "kubectl get pods -n production",
        "kubectl rollout status deployment/react-app"
      ],
      logs: [
        "[00:30:15] Applying deployment manifest...",
        "[00:30:16] Error: ImagePullBackOff",
        "[00:30:17] Pod react-app-7d9f8c6b5d-x2k4m failed to start",
        "[00:30:18] Reason: Unable to pull image registry.io/react-app:v1.0"
      ],
      metadata: {
        "Namespace": "production",
        "Replicas": "3",
        "Service Type": "LoadBalancer",
        "Port": "80"
      }
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case 'running':
        return <Play className="w-4 h-4 text-blue-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-amber-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'troubleshooting':
        return <Loader2 className="w-4 h-4 text-purple-500 animate-spin" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      success: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
      running: "bg-blue-500/15 text-blue-400 border-blue-500/30",
      pending: "bg-amber-500/15 text-amber-400 border-amber-500/30",
      error: "bg-red-500/15 text-red-400 border-red-500/30",
      troubleshooting: "bg-purple-500/15 text-purple-400 border-purple-500/30"
    };
    return styles[status] || "";
  };

  const toggleStep = (name: string) => {
    setExpandedSteps(prev => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  };

  const handleTroubleshoot = (stepName: string) => {
    // Start troubleshooting
    setPipelineSteps(prev => prev.map(step =>
      step.name === stepName
        ? { ...step, status: 'troubleshooting' as const, troubleshootLogs: [] }
        : step
    ));

    // Ensure the step is expanded
    setExpandedSteps(prev => new Set([...prev, stepName]));

    const troubleshootSteps = getTroubleshootSteps(stepName);
    let stepIndex = 0;

    const interval = setInterval(() => {
      if (stepIndex < troubleshootSteps.length) {
        setPipelineSteps(prev => prev.map(step => {
          if (step.name === stepName) {
            return {
              ...step,
              troubleshootLogs: [...(step.troubleshootLogs || []), troubleshootSteps[stepIndex]]
            };
          }
          return step;
        }));
        stepIndex++;
      } else {
        clearInterval(interval);
        // Mark as success after troubleshooting
        setTimeout(() => {
          setPipelineSteps(prev => prev.map(step =>
            step.name === stepName
              ? {
                ...step,
                status: 'success' as const,
                logs: [
                  ...step.logs,
                  "[00:31:45] [SUCCESS] Issue resolved automatically",
                  "[00:31:46] [SUCCESS] Deployment successful"
                ]
              }
              : step
          ));
        }, 500);
      }
    }, 600);
  };

  const getTroubleshootSteps = (stepName: string): string[] => {
    if (stepName === 'Kubernetes') {
      return [
        '[SCAN] Analyzing deployment failure...',
        '[INFO] Error identified: ImagePullBackOff',
        '$ kubectl describe pod react-app-7d9f8c6b5d-x2k4m -n production',
        '[WARN] Found: Image pull secret missing',
        '[FIX] Creating registry secret...',
        '$ kubectl create secret docker-registry regcred --docker-server=registry.io --docker-username=deploy --docker-password=***',
        '[CONFIG] Patching deployment with imagePullSecrets...',
        '$ kubectl patch deployment react-app -p \'{"spec":{"template":{"spec":{"imagePullSecrets":[{"name":"regcred"}]}}}}\'',
        '[RETRY] Triggering rollout restart...',
        '$ kubectl rollout restart deployment/react-app -n production',
        '[WAIT] Waiting for pods to be ready...',
        '$ kubectl rollout status deployment/react-app -n production',
        '[SUCCESS] Pod react-app-8e0f9d7c6e-y3l5n is Running',
        '[SUCCESS] Pod react-app-8e0f9d7c6e-z4m6o is Running',
        '[SUCCESS] Pod react-app-8e0f9d7c6e-w5n7p is Running',
        '[DONE] Deployment recovered successfully!'
      ];
    } else if (stepName === 'Jenkins') {
      return [
        '[SCAN] Analyzing build failure...',
        '[INFO] Checking build logs...',
        '$ jenkins-cli console ReactApp-Pipeline #42',
        '[WARN] Found: Test timeout in integration tests',
        '[FIX] Increasing test timeout from 30s to 120s...',
        '[RETRY] Retrying build...',
        '$ jenkins-cli build ReactApp-Pipeline -p TEST_TIMEOUT=120',
        '[WAIT] Running tests...',
        '[SUCCESS] All tests passed (18/18)',
        '[DONE] Build recovered!'
      ];
    }
    return [
      '[SCAN] Analyzing failure...',
      '[INFO] Running diagnostics...',
      '[FIX] Applying fix...',
      '[SUCCESS] Issue resolved!',
      '[DONE] Step recovered!'
    ];
  };

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
    setInput('');

    setTimeout(() => {
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: `I'll help you with that. Analyzing the ${workflowName} pipeline configuration...`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="h-8 px-2">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">{workflowName}</h1>
            <p className="text-sm text-muted-foreground">Detailed workflow view with live monitoring</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-6">
        {/* Pipeline Steps */}
        <div className="col-span-2 space-y-3">
          <h2 className="text-sm font-medium text-muted-foreground mb-4">Pipeline Steps</h2>

          {pipelineSteps.map((step) => (
            <Collapsible
              key={step.name}
              open={expandedSteps.has(step.name)}
              onOpenChange={() => toggleStep(step.name)}
            >
              <Card className="card-base overflow-hidden">
                <CollapsibleTrigger asChild>
                  <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/20 transition-colors">
                    <div className="flex items-center gap-3">
                      {expandedSteps.has(step.name) ? (
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      )}
                      {getStatusIcon(step.status)}
                      <span className="font-medium">{step.name}</span>
                      <Badge variant="outline" className={`text-[10px] uppercase ${getStatusBadge(step.status)}`}>
                        {step.status}
                      </Badge>
                      {step.status === 'error' && (
                        <Badge variant="outline" className="text-[10px] text-red-400 border-red-500/30">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          Failed
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {(step.status === 'error' || step.status === 'pending') && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs text-amber-400 border-amber-500/30 hover:bg-amber-500/10 gap-1"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTroubleshoot(step.name);
                          }}
                        >
                          <Wrench className="w-3 h-3" />
                          Troubleshoot
                        </Button>
                      )}
                      {step.status === 'troubleshooting' && (
                        <Badge variant="outline" className="text-[10px] bg-purple-500/10 text-purple-400 border-purple-500/30">
                          <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                          Fixing...
                        </Badge>
                      )}
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CollapsibleTrigger>

                <CollapsibleContent>
                  <div className="px-4 pb-4 border-t border-border/50">
                    {/* Troubleshoot Logs Panel */}
                    {step.status === 'troubleshooting' && step.troubleshootLogs && step.troubleshootLogs.length > 0 && (
                      <div className="mt-4 mb-4 p-3 rounded-lg bg-purple-500/5 border border-purple-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Loader2 className="w-3 h-3 text-purple-400 animate-spin" />
                          <span className="text-xs font-medium text-purple-400">Auto-healing in progress</span>
                        </div>
                        <div className="font-mono text-xs space-y-1 bg-background/50 rounded-lg p-2 max-h-48 overflow-y-auto">
                          {step.troubleshootLogs.map((log, i) => (
                            <div
                              key={i}
                              className={`animate-in ${log.startsWith('$') ? 'text-primary/70' : log.includes('[SUCCESS]') || log.includes('[DONE]') ? 'text-emerald-400' : 'text-foreground'}`}
                              style={{ animationDelay: `${i * 50}ms` }}
                            >
                              {log}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <Tabs defaultValue="commands" className="w-full mt-4">
                      <TabsList className="bg-muted/30 h-8">
                        <TabsTrigger value="commands" className="text-xs h-6">Commands</TabsTrigger>
                        <TabsTrigger value="logs" className="text-xs h-6">Logs</TabsTrigger>
                        <TabsTrigger value="metadata" className="text-xs h-6">Metadata</TabsTrigger>
                      </TabsList>

                      <TabsContent value="commands" className="mt-3">
                        <div className="bg-background/50 rounded-lg p-3 font-mono text-xs space-y-1">
                          {step.commands.map((cmd, i) => (
                            <div key={i} className="text-muted-foreground">
                              <span className="text-emerald-500">$</span> {cmd}
                            </div>
                          ))}
                        </div>
                      </TabsContent>

                      <TabsContent value="logs" className="mt-3">
                        <div className="bg-background/50 rounded-lg p-3 font-mono text-xs space-y-1 max-h-40 overflow-y-auto">
                          {step.logs.map((log, i) => (
                            <div key={i} className={`${log.includes('Error') || log.includes('failed') ? 'text-red-400' : log.includes('[SUCCESS]') ? 'text-emerald-400' : 'text-muted-foreground'}`}>
                              {log}
                            </div>
                          ))}
                          {step.status === 'running' && (
                            <div className="flex items-center gap-2 mt-2 text-blue-400">
                              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                              Live output...
                            </div>
                          )}
                        </div>
                      </TabsContent>

                      <TabsContent value="metadata" className="mt-3">
                        <div className="grid grid-cols-2 gap-2">
                          {Object.entries(step.metadata).map(([key, value]) => (
                            <div key={key} className="p-2 bg-muted/20 rounded-lg">
                              <div className="text-[10px] text-muted-foreground uppercase">{key}</div>
                              <div className="text-sm font-mono">{value}</div>
                            </div>
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </div>

        {/* Workflow Assistant */}
        <div>
          <Card className="card-base h-[500px] flex flex-col">
            <CardHeader className="pb-3 border-b border-border/50">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Bot className="w-4 h-4 text-primary" />
                Workflow Assistant
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div key={msg.id} className="flex gap-2">
                      <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 ${msg.type === 'user' ? 'bg-primary/20' : 'bg-accent/20'
                        }`}>
                        {msg.type === 'user' ? (
                          <User className="w-3 h-3 text-primary" />
                        ) : (
                          <Bot className="w-3 h-3 text-accent" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm leading-relaxed">{msg.content}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <form onSubmit={handleSubmit} className="p-3 border-t border-border/50">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about workflow..."
                    className="h-8 text-sm"
                  />
                  <Button type="submit" size="sm" className="h-8 px-3">
                    <Send className="w-3 h-3" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}