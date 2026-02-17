import { useState, useEffect } from "react";
import {
  Activity,
  Clock,
  CheckCircle,
  AlertTriangle,
  Zap,
  ChevronRight,
  X,
  Terminal,
  Shield,
  Server,
  GitBranch,
  Play,
  ExternalLink,
  Bot,
  Cpu,
  Database,
  Cloud,
  Loader2,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Square,
  Wrench,
  ToggleLeft,
  ToggleRight,
  Link,
  Settings2,
  Layers,
  Container,
  Globe
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { WorkflowChatbox } from "@/components/dashboard-features/WorkflowChatbox";
import { WorkflowDetailView } from "@/components/dashboard-features/WorkflowDetailView";

// System logs data
const systemLogs = [
  { time: "00:17:45", level: "info", service: "kubernetes", message: "Pod react-app-7d9f8c6b5d-x2k4m scaled up successfully" },
  { time: "00:17:32", level: "success", service: "docker", message: "Image registry.io/react-app:v2.1.0 pushed to registry" },
  { time: "00:17:18", level: "info", service: "jenkins", message: "Build #42 completed - all 18 tests passed" },
  { time: "00:16:54", level: "warning", service: "aws", message: "High memory usage detected on ec2-prod-03 (87%)" },
  { time: "00:16:41", level: "info", service: "github", message: "Webhook received: push to main by yash@nxtgen.ai" },
  { time: "00:16:23", level: "success", service: "kubernetes", message: "Rolling update completed for deployment/api-gateway" },
  { time: "00:15:56", level: "error", service: "security", message: "Vulnerability scan found 2 high severity issues in node:18-alpine" },
  { time: "00:15:32", level: "info", service: "docker", message: "Container health check passed for redis-cache" },
  { time: "00:15:15", level: "info", service: "aws", message: "Auto-scaling group scaled from 3 to 5 instances" },
  { time: "00:14:48", level: "success", service: "github", message: "PR #156 merged into main branch" },
];

// Workflow templates
const workflowTemplates = [
  { id: "deploy", name: "Production Deploy", description: "Build, test, and deploy to production with zero downtime", icon: Cloud, color: "text-blue-400" },
  { id: "cicd", name: "CI/CD Pipeline", description: "Continuous integration with automated testing", icon: GitBranch, color: "text-purple-400" },
  { id: "security", name: "Security Scan", description: "Comprehensive security audit for containers and code", icon: Shield, color: "text-amber-400" },
  { id: "database", name: "Database Migration", description: "Safe database schema migrations with rollback", icon: Database, color: "text-emerald-400" },
];

interface SecurityFinding {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  fix: string;
  status: 'pending' | 'fixing' | 'resolved' | 'failed';
  fixLogs?: string[];
  fixCommands?: string[];
}

interface Integration {
  name: string;
  status: string;
  lastSyncSeconds: number;
  icon: any;
  details: string;
}

const Dashboard = () => {
  const [selectedWorkflow, setSelectedWorkflow] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [showLogsModal, setShowLogsModal] = useState(false);
  const [showNewWorkflowModal, setShowNewWorkflowModal] = useState(false);
  const [showHealthModal, setShowHealthModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [showDeployModal, setShowDeployModal] = useState(false);
  const [workflowPrompt, setWorkflowPrompt] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [repoUrl, setRepoUrl] = useState("");
  const [selectedTools, setSelectedTools] = useState<string[]>([]);
  const [selectedCloud, setSelectedCloud] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [expandedFix, setExpandedFix] = useState<string | null>(null);

  // Security findings state
  const [securityFindings, setSecurityFindings] = useState<SecurityFinding[]>([
    { id: '1', severity: 'high', title: 'Outdated node:18-alpine base image', fix: 'Update to node:20-alpine', status: 'pending' },
    { id: '2', severity: 'high', title: 'Exposed port 22 on prod security group', fix: 'Restrict to VPN CIDR only', status: 'pending' },
    { id: '3', severity: 'medium', title: 'Missing rate limiting on /api/auth', fix: 'Add express-rate-limit middleware', status: 'pending' },
    { id: '4', severity: 'low', title: 'HTTP headers missing security policies', fix: 'Add helmet middleware', status: 'pending' },
  ]);

  // Integrations with live timestamps
  const [integrations, setIntegrations] = useState<Integration[]>([
    { name: "GitHub", status: "active", lastSyncSeconds: 120, icon: GitBranch, details: "12 repos connected" },
    { name: "Docker", status: "active", lastSyncSeconds: 300, icon: Cpu, details: "8 images built today" },
    { name: "AWS", status: "active", lastSyncSeconds: 60, icon: Cloud, details: "5 EC2, 3 RDS instances" },
    { name: "Kubernetes", status: "syncing", lastSyncSeconds: 0, icon: Server, details: "3 clusters, 24 pods" }
  ]);

  // Update integration timestamps every second
  useEffect(() => {
    const interval = setInterval(() => {
      setIntegrations(prev => prev.map(i => ({
        ...i,
        lastSyncSeconds: i.status === 'syncing' ? 0 : i.lastSyncSeconds + 1
      })));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    if (seconds === 0) return 'now';
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes}m ago`;
  };

  interface WorkflowItem {
    id: number;
    name: string;
    status: 'running' | 'completed' | 'failed' | 'pending' | 'troubleshooting' | 'stopped';
    progress: number;
    duration: string;
    branch: string;
    autoHeal: boolean;
    troubleshootLogs?: string[];
  }

  const [workflows, setWorkflows] = useState<WorkflowItem[]>([
    { id: 1, name: "Production Deploy - Node.js API", status: "running", progress: 65, duration: "4m 32s", branch: "main", autoHeal: true },
    { id: 2, name: "Database Migration - PostgreSQL", status: "completed", progress: 100, duration: "2m 15s", branch: "main", autoHeal: false },
    { id: 3, name: "Security Scan - Docker Images", status: "failed", progress: 45, duration: "1m 47s", branch: "feature/auth", autoHeal: false },
    { id: 4, name: "Staging Deploy - Frontend", status: "pending", progress: 0, duration: "—", branch: "develop", autoHeal: true }
  ]);

  const stats = [
    { label: "Active", value: "12", icon: Activity, delta: "+3" },
    { label: "Deployed", value: "24", icon: Zap, delta: "+8" },
    { label: "Success", value: "98.5%", icon: CheckCircle, delta: "+2.1%" },
    { label: "Avg Time", value: "3m 42s", icon: Clock, delta: "-45s" }
  ];

  const healthMetrics = [
    { name: "API Gateway", status: "healthy", uptime: "99.99%", latency: "45ms" },
    { name: "Database Cluster", status: "healthy", uptime: "99.95%", latency: "12ms" },
    { name: "Redis Cache", status: "healthy", uptime: "100%", latency: "2ms" },
    { name: "Worker Nodes", status: "warning", uptime: "99.2%", latency: "156ms" },
  ];

  const getStatusStyle = (status: string) => {
    const styles: Record<string, { dot: string; text: string }> = {
      running: { dot: "bg-blue-500 animate-pulse", text: "text-blue-400" },
      completed: { dot: "bg-emerald-500", text: "text-emerald-400" },
      pending: { dot: "bg-amber-500", text: "text-amber-400" },
      failed: { dot: "bg-red-500", text: "text-red-400" },
      active: { dot: "bg-emerald-500", text: "text-emerald-400" },
      syncing: { dot: "bg-blue-500 animate-pulse", text: "text-blue-400" },
      healthy: { dot: "bg-emerald-500", text: "text-emerald-400" },
      warning: { dot: "bg-amber-500", text: "text-amber-400" },
      troubleshooting: { dot: "bg-purple-500 animate-pulse", text: "text-purple-400" },
      stopped: { dot: "bg-gray-500", text: "text-gray-400" }
    };
    return styles[status] || { dot: "bg-muted-foreground", text: "text-muted-foreground" };
  };

  const getLogLevelStyle = (level: string) => {
    const styles: Record<string, string> = {
      info: "text-blue-400",
      success: "text-emerald-400",
      warning: "text-amber-400",
      error: "text-red-400"
    };
    return styles[level] || "text-muted-foreground";
  };

  const getSeverityStyle = (severity: string) => {
    const styles: Record<string, string> = {
      critical: 'text-red-500 border-red-500/30 bg-red-500/10',
      high: 'text-red-400 border-red-500/30 bg-red-500/10',
      medium: 'text-amber-400 border-amber-500/30 bg-amber-500/10',
      low: 'text-blue-400 border-blue-500/30 bg-blue-500/10'
    };
    return styles[severity] || '';
  };

  const filteredWorkflows = activeFilter === "all"
    ? workflows
    : workflows.filter(w => w.status === activeFilter);

  const handleCreateWorkflow = () => {
    if (!workflowPrompt.trim() && !selectedTemplate && !repoUrl) return;

    const details = [
      repoUrl ? `Repo: ${repoUrl}` : '',
      selectedTemplate ? `Template: ${selectedTemplate}` : '',
      selectedTools.length ? `Tools: ${selectedTools.join(', ')}` : '',
      selectedCloud ? `Cloud: ${selectedCloud}` : '',
      workflowPrompt ? `Prompt: ${workflowPrompt}` : ''
    ].filter(Boolean).join('\n');

    alert(`Creating workflow with config:\n${details}`);

    // Reset form
    setShowNewWorkflowModal(false);
    setWorkflowPrompt("");
    setRepoUrl("");
    setSelectedTools([]);
    setSelectedCloud(null);
    setSelectedTemplate(null);

    // Simulate new workflow addition
    setTimeout(() => {
      const newId = Math.max(...workflows.map(w => w.id)) + 1;
      setWorkflows(prev => [
        {
          id: newId,
          name: repoUrl ? `Deploy ${repoUrl.split('/').pop()?.replace('.git', '')}` : "New Workflow",
          status: "pending",
          progress: 0,
          duration: "—",
          branch: "main",
          autoHeal: true
        },
        ...prev
      ]);
    }, 500);
  };

  const toggleToolSelection = (tool: string) => {
    setSelectedTools(prev =>
      prev.includes(tool)
        ? prev.filter(t => t !== tool)
        : [...prev, tool]
    );
  };

  const handleQuickDeploy = () => {
    setShowDeployModal(false);
    alert("Deployment workflow started! Check Active Workflows.");
  };

  // Stop a running workflow
  const handleStopWorkflow = (workflowId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setWorkflows(prev => prev.map(w =>
      w.id === workflowId ? { ...w, status: 'stopped' as const } : w
    ));
  };

  // Toggle auto-heal for a workflow
  const handleToggleAutoHeal = (workflowId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setWorkflows(prev => prev.map(w =>
      w.id === workflowId ? { ...w, autoHeal: !w.autoHeal } : w
    ));
  };

  // Troubleshoot a failed workflow
  const handleTroubleshoot = (workflowId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const workflow = workflows.find(w => w.id === workflowId);
    if (!workflow) return;

    // Start troubleshooting
    setWorkflows(prev => prev.map(w =>
      w.id === workflowId ? { ...w, status: 'troubleshooting' as const, troubleshootLogs: [] } : w
    ));

    const troubleshootSteps = getTroubleshootSteps(workflow.name);
    let stepIndex = 0;

    const interval = setInterval(() => {
      if (stepIndex < troubleshootSteps.length) {
        setWorkflows(prev => prev.map(w => {
          if (w.id === workflowId) {
            return {
              ...w,
              troubleshootLogs: [...(w.troubleshootLogs || []), troubleshootSteps[stepIndex]],
              progress: Math.min(100, Math.round(((stepIndex + 1) / troubleshootSteps.length) * 100))
            };
          }
          return w;
        }));
        stepIndex++;
      } else {
        clearInterval(interval);
        // Mark as completed after troubleshooting
        setTimeout(() => {
          setWorkflows(prev => prev.map(w =>
            w.id === workflowId ? { ...w, status: 'completed' as const, progress: 100 } : w
          ));
        }, 500);
      }
    }, 700);
  };

  const getTroubleshootSteps = (workflowName: string) => {
    if (workflowName.includes('Security')) {
      return [
        '[SCAN] Analyzing failed scan results...',
        '[INFO] Identified issue: Docker image vulnerability check timeout',
        '[FIX] Increasing scan timeout from 30s to 120s...',
        '[RETRY] Retrying vulnerability scan...',
        '$ trivy image --timeout 120s registry.io/app:latest',
        '[PROGRESS] Scan in progress (1/3 layers)...',
        '[PROGRESS] Scan in progress (2/3 layers)...',
        '[PROGRESS] Scan in progress (3/3 layers)...',
        '[SUCCESS] Vulnerability scan completed successfully',
        '[INFO] Generating security report...',
        '[DONE] Workflow recovered! All checks passed.'
      ];
    } else if (workflowName.includes('Deploy')) {
      return [
        '[SCAN] Analyzing deployment failure...',
        '[INFO] Root cause: Container health check failed',
        '$ kubectl describe pod react-app-7d9f8c6b5d-x2k4m',
        '[WARN] Found: OOMKilled - Memory limit exceeded',
        '[FIX] Increasing memory limit from 256Mi to 512Mi...',
        '$ kubectl set resources deployment/react-app --limits=memory=512Mi',
        '[RETRY] Triggering rolling restart...',
        '$ kubectl rollout restart deployment/react-app',
        '[WAIT] Waiting for pods to be ready...',
        '[SUCCESS] Pod react-app-8e0f9d7c6e-y3l5n is running',
        '[DONE] Deployment recovered successfully!'
      ];
    }
    return [
      '[SCAN] Analyzing workflow failure...',
      '[INFO] Running diagnostics...',
      '$ nxtgen diagnose --workflow-id ' + Math.random().toString(36).substr(2, 9),
      '[FIX] Identified issue: Transient network error',
      '[RETRY] Retrying failed step...',
      '[SUCCESS] Step completed successfully',
      '[DONE] Workflow recovered!'
    ];
  };

  // Auto-fix functionality
  const handleAutoFix = (findingId: string) => {
    const finding = securityFindings.find(f => f.id === findingId);
    if (!finding) return;

    setExpandedFix(findingId);

    // Start fixing
    setSecurityFindings(prev => prev.map(f =>
      f.id === findingId
        ? { ...f, status: 'fixing' as const, fixLogs: [], fixCommands: [] }
        : f
    ));

    // Simulate fix process with realistic logs
    const fixSteps = getFixSteps(finding);
    let stepIndex = 0;

    const interval = setInterval(() => {
      if (stepIndex < fixSteps.length) {
        const step = fixSteps[stepIndex];
        setSecurityFindings(prev => prev.map(f => {
          if (f.id === findingId) {
            return {
              ...f,
              fixLogs: [...(f.fixLogs || []), step.log],
              fixCommands: step.command ? [...(f.fixCommands || []), step.command] : f.fixCommands
            };
          }
          return f;
        }));
        stepIndex++;
      } else {
        clearInterval(interval);
        // Mark as resolved
        setTimeout(() => {
          setSecurityFindings(prev => prev.map(f =>
            f.id === findingId ? { ...f, status: 'resolved' as const } : f
          ));
        }, 500);
      }
    }, 800);
  };

  const getFixSteps = (finding: SecurityFinding) => {
    if (finding.title.includes('node:18-alpine')) {
      return [
        { log: '[SCAN] Analyzing Dockerfile...', command: 'cat Dockerfile | grep FROM' },
        { log: '[INFO] Found base image: node:18-alpine' },
        { log: '[FIX] Updating base image to node:20-alpine...', command: 'sed -i "s/node:18-alpine/node:20-alpine/g" Dockerfile' },
        { log: '[BUILD] Rebuilding Docker image...', command: 'docker build -t app:latest .' },
        { log: '[SUCCESS] Build successful! Image updated to node:20-alpine' },
        { log: '[DEPLOY] Pushing updated image to registry...', command: 'docker push registry.io/app:latest' },
        { log: '[DONE] Vulnerability resolved successfully!' }
      ];
    } else if (finding.title.includes('port 22')) {
      return [
        { log: '[SCAN] Fetching security group configuration...' },
        { log: '[INFO] Current rule: 0.0.0.0/0 on port 22', command: 'aws ec2 describe-security-groups --group-id sg-prod' },
        { log: '[FIX] Removing public SSH access...', command: 'aws ec2 revoke-security-group-ingress --protocol tcp --port 22 --cidr 0.0.0.0/0' },
        { log: '[FIX] Adding VPN CIDR restriction...', command: 'aws ec2 authorize-security-group-ingress --protocol tcp --port 22 --cidr 10.0.0.0/8' },
        { log: '[SUCCESS] Security group updated successfully!' },
        { log: '[DONE] Port 22 now restricted to VPN only' }
      ];
    } else if (finding.title.includes('rate limiting')) {
      return [
        { log: '[INSTALL] Installing express-rate-limit...', command: 'npm install express-rate-limit' },
        { log: '[CONFIG] Updating auth middleware...' },
        { log: '[CONFIG] Configuring rate limiter: 100 requests/15min' },
        { log: '[APPLY] Applying to /api/auth routes...', command: 'git diff src/middleware/auth.js' },
        { log: '[SUCCESS] Rate limiting configured!' },
        { log: '[DEPLOY] Deploying changes...', command: 'npm run deploy' },
        { log: '[DONE] API endpoints now protected!' }
      ];
    } else {
      return [
        { log: '[INSTALL] Installing helmet middleware...', command: 'npm install helmet' },
        { log: '[CONFIG] Adding helmet to Express app...' },
        { log: '[CONFIG] Configuring security headers...', command: 'vi src/app.js' },
        { log: '[INFO] Headers: X-Frame-Options, CSP, HSTS' },
        { log: '[SUCCESS] Security headers configured!' },
        { log: '[DEPLOY] Restarting application...', command: 'pm2 restart api' },
        { log: '[DONE] Headers now include security policies!' }
      ];
    }
  };

  // Run new security scan
  const handleRunScan = () => {
    setIsScanning(true);
    setSecurityFindings([]);

    // Simulate scanning animation
    setTimeout(() => {
      // Generate new random findings
      const newFindings: SecurityFinding[] = [
        { id: '10', severity: 'critical', title: 'SQL injection vulnerability in user input', fix: 'Use parameterized queries', status: 'pending' },
        { id: '11', severity: 'high', title: 'Exposed AWS credentials in environment', fix: 'Move to AWS Secrets Manager', status: 'pending' },
        { id: '12', severity: 'high', title: 'Outdated npm packages with CVEs', fix: 'Run npm audit fix --force', status: 'pending' },
        { id: '13', severity: 'medium', title: 'Missing CORS configuration', fix: 'Add cors middleware with whitelist', status: 'pending' },
        { id: '14', severity: 'low', title: 'Console.log statements in production', fix: 'Remove debug logs', status: 'pending' },
      ];

      setSecurityFindings(newFindings);
      setIsScanning(false);
      setExpandedFix(null);
    }, 3000);
  };

  const getIssueCount = () => {
    const pending = securityFindings.filter(f => f.status === 'pending').length;
    const resolved = securityFindings.filter(f => f.status === 'resolved').length;
    const critical = securityFindings.filter(f => f.severity === 'critical').length;
    return { pending, resolved, critical, total: securityFindings.length };
  };

  if (selectedWorkflow !== null) {
    const workflow = workflows.find(w => w.id === selectedWorkflow);
    if (workflow) {
      return (
        <WorkflowDetailView
          workflowId={workflow.id}
          workflowName={workflow.name}
          onBack={() => setSelectedWorkflow(null)}
        />
      );
    }
    // If workflow not found, continue to render dashboard
  }

  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Monitor your autonomous operations
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs"
            onClick={() => setShowLogsModal(true)}
          >
            <Activity className="w-3.5 h-3.5 mr-1.5" />
            View Logs
          </Button>
          <Button
            size="sm"
            className="h-8 text-xs btn-primary"
            onClick={() => setShowNewWorkflowModal(true)}
          >
            <Zap className="w-3.5 h-3.5 mr-1.5" />
            New Workflow
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="card-base p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-semibold tracking-tight">{stat.value}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <stat.icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-[10px] text-emerald-400 font-medium">{stat.delta}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Workflows */}
        <div className="col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium">Active Workflows</h2>
            <div className="flex items-center gap-1 bg-muted/30 rounded-lg p-0.5">
              {["all", "running", "completed", "failed"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${activeFilter === filter
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            {filteredWorkflows.map((workflow) => {
              const style = getStatusStyle(workflow.status);
              return (
                <div key={workflow.id} className="card-interactive overflow-hidden">
                  <div
                    onClick={() => setSelectedWorkflow(workflow.id)}
                    className="p-4 flex items-center gap-4 cursor-pointer group"
                  >
                    <div className={`w-2 h-2 rounded-full ${style.dot}`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm truncate">{workflow.name}</span>
                        <span className="text-[10px] text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded">
                          {workflow.branch}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className={`text-xs ${style.text}`}>{workflow.status}</span>
                        <span className="text-xs text-muted-foreground">{workflow.duration}</span>
                      </div>
                    </div>

                    {/* Running: Progress + Stop */}
                    {workflow.status === "running" && (
                      <>
                        <div className="w-20">
                          <div className="h-1 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500 rounded-full transition-all"
                              style={{ width: `${workflow.progress}%` }}
                            />
                          </div>
                          <p className="text-[10px] text-muted-foreground mt-1 text-right">{workflow.progress}%</p>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs gap-1 text-red-400 border-red-500/30 hover:bg-red-500/10"
                          onClick={(e) => handleStopWorkflow(workflow.id, e)}
                        >
                          <Square className="w-3 h-3" />
                          Stop
                        </Button>
                      </>
                    )}

                    {/* Troubleshooting: Progress */}
                    {workflow.status === "troubleshooting" && (
                      <div className="w-24">
                        <div className="h-1 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-purple-500 rounded-full transition-all"
                            style={{ width: `${workflow.progress}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-purple-400 mt-1 text-right">Fixing... {workflow.progress}%</p>
                      </div>
                    )}

                    {/* Failed: Troubleshoot */}
                    {workflow.status === "failed" && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs gap-1 text-amber-400 border-amber-500/30 hover:bg-amber-500/10"
                        onClick={(e) => handleTroubleshoot(workflow.id, e)}
                      >
                        <Wrench className="w-3 h-3" />
                        Troubleshoot
                      </Button>
                    )}

                    {/* Auto-heal toggle */}
                    <button
                      onClick={(e) => handleToggleAutoHeal(workflow.id, e)}
                      className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] transition-colors ${workflow.autoHeal
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : 'bg-muted/30 text-muted-foreground hover:text-foreground'
                        }`}
                      title={workflow.autoHeal ? 'Auto-heal enabled' : 'Auto-heal disabled'}
                    >
                      {workflow.autoHeal ? (
                        <ToggleRight className="w-3.5 h-3.5" />
                      ) : (
                        <ToggleLeft className="w-3.5 h-3.5" />
                      )}
                      Auto-heal
                    </button>

                    <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Troubleshoot Logs Panel */}
                  {workflow.status === 'troubleshooting' && workflow.troubleshootLogs && workflow.troubleshootLogs.length > 0 && (
                    <div className="border-t border-border/50 bg-background/50 p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Loader2 className="w-3 h-3 text-purple-400 animate-spin" />
                        <span className="text-xs font-medium text-purple-400">Auto-healing in progress</span>
                      </div>
                      <div className="font-mono text-xs space-y-1 bg-muted/30 rounded-lg p-2 max-h-32 overflow-y-auto">
                        {workflow.troubleshootLogs.map((log, i) => (
                          <div key={i} className={`animate-in ${log.startsWith('$') ? 'text-primary/70' : 'text-foreground'}`}>
                            {log}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4">
          {/* Integrations with live timestamps */}
          <Card className="card-base">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Integrations</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-1">
              {integrations.map((integration, i) => {
                const style = getStatusStyle(integration.status);
                return (
                  <div
                    key={i}
                    className="flex items-center justify-between py-2.5 px-2 rounded-lg hover:bg-muted/20 cursor-pointer transition-all group"
                    onClick={() => alert(`${integration.name}\n\nStatus: ${integration.status}\nLast sync: ${formatTime(integration.lastSyncSeconds)}\n${integration.details}`)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${style.dot}`} />
                      <integration.icon className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                      <span className="text-sm">{integration.name}</span>
                    </div>
                    <span className={`text-[10px] tabular-nums ${integration.status === 'syncing' ? 'text-blue-400' : 'text-muted-foreground'}`}>
                      {formatTime(integration.lastSyncSeconds)}
                    </span>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="card-base">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 space-y-1.5">
              <button
                onClick={() => setShowDeployModal(true)}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 rounded-lg transition-colors"
              >
                <Zap className="w-4 h-4" />
                Deploy to Production
                <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
              </button>
              <button
                onClick={() => setShowSecurityModal(true)}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 rounded-lg transition-colors"
              >
                <Shield className="w-4 h-4" />
                Run Security Scan
                <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
              </button>
              <button
                onClick={() => setShowHealthModal(true)}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 rounded-lg transition-colors"
              >
                <Activity className="w-4 h-4" />
                View System Health
                <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
              </button>
            </CardContent>
          </Card>

          {/* AI Chat */}
          <WorkflowChatbox />
        </div>
      </div>

      {/* View Logs Modal */}
      {showLogsModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl animate-in">
            <div className="flex items-center justify-between p-5 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Terminal className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">System Logs</h2>
                  <p className="text-xs text-muted-foreground">Real-time log streaming</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse" />
                  Live
                </Badge>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setShowLogsModal(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <div className="font-mono text-xs space-y-1.5 bg-background/50 rounded-xl p-4 border border-border/50">
                {systemLogs.map((log, i) => (
                  <div key={i} className="flex gap-3 py-0.5">
                    <span className="text-muted-foreground/70 w-20">[{log.time}]</span>
                    <span className={`w-20 font-medium ${getLogLevelStyle(log.level)}`}>[{log.level.toUpperCase()}]</span>
                    <span className="text-primary/60 w-24">[{log.service}]</span>
                    <span className="text-foreground flex-1">{log.message}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 border-t border-border/50 flex justify-between items-center bg-muted/20">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs text-muted-foreground">Streaming live logs...</span>
              </div>
              <Button variant="outline" size="sm" onClick={() => setShowLogsModal(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}

      {/* New Workflow Modal */}
      {showNewWorkflowModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-2xl shadow-2xl animate-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-border/50 sticky top-0 bg-card z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Create New Workflow</h2>
                  <p className="text-xs text-muted-foreground">Let AI configure your automation</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setShowNewWorkflowModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="p-5 space-y-6">
              {/* Repository Input */}
              <div className="space-y-3">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Link className="w-4 h-4 text-primary" />
                  Code Repository
                </label>
                <div className="relative">
                  <Input
                    placeholder="https://github.com/username/repo.git or AWS/Azure repository URL"
                    className="pl-9"
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                  />
                  <GitBranch className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                </div>
              </div>

              {/* Quick Templates */}
              <div>
                <p className="text-sm font-medium mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-primary" />
                  Quick Templates
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {workflowTemplates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id === selectedTemplate ? null : template.id)}
                      className={`p-4 rounded-xl border text-left transition-all ${selectedTemplate === template.id
                        ? "border-primary bg-primary/10 shadow-lg shadow-primary/10"
                        : "border-border hover:border-primary/50 hover:bg-muted/20"
                        }`}
                    >
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className={`w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center`}>
                          <template.icon className={`w-4 h-4 ${template.color}`} />
                        </div>
                        <span className="text-sm font-medium">{template.name}</span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{template.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Tech Stack Selection */}
              <div>
                <p className="text-sm font-medium mb-3 flex items-center gap-2">
                  <Settings2 className="w-4 h-4 text-primary" />
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Node.js', 'Python', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis', 'Next.js'].map((tool) => (
                    <button
                      key={tool}
                      onClick={() => toggleToolSelection(tool)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${selectedTools.includes(tool)
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-muted/30 border-border hover:border-primary/50'
                        }`}
                    >
                      {tool}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cloud Infrastructure */}
              <div>
                <p className="text-sm font-medium mb-3 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-primary" />
                  Cloud Infrastructure
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'aws', name: 'AWS', icon: Cloud, color: 'text-amber-500' },
                    { id: 'azure', name: 'Azure', icon: Container, color: 'text-blue-500' },
                    { id: 'gcp', name: 'GCP', icon: Server, color: 'text-red-500' },
                  ].map((cloud) => (
                    <button
                      key={cloud.id}
                      onClick={() => setSelectedCloud(selectedCloud === cloud.id ? null : cloud.id)}
                      className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all ${selectedCloud === cloud.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:bg-muted/20"
                        }`}
                    >
                      <cloud.icon className={`w-6 h-6 ${cloud.color}`} />
                      <span className="text-xs font-medium">{cloud.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 py-2">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">or describe in natural language</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <div className="space-y-3">
                <Textarea
                  placeholder="Describe your workflow... e.g., 'Deploy my React app to production with automated tests and Slack notifications'"
                  value={workflowPrompt}
                  onChange={(e) => setWorkflowPrompt(e.target.value)}
                  className="min-h-[80px] text-sm"
                />

                <p className="text-xs text-muted-foreground bg-primary/5 border border-primary/10 p-3 rounded-lg flex gap-2">
                  <span className="text-primary font-bold">TIP:</span>
                  <span>Nxt-Gen AI will automatically configure integrations, set up CI/CD pipeline, and handle deployments based on your requirements.</span>
                </p>
              </div>
            </div>

            <div className="p-5 border-t border-border/50 flex justify-end gap-2 bg-muted/20 sticky bottom-0 z-10">
              <Button variant="outline" onClick={() => setShowNewWorkflowModal(false)}>Cancel</Button>
              <Button
                onClick={handleCreateWorkflow}
                disabled={!workflowPrompt.trim() && !selectedTemplate && !repoUrl}
                className="gap-2"
              >
                <Play className="w-4 h-4" />
                Create Workflow
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* System Health Modal */}
      {showHealthModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-2xl shadow-2xl animate-in">
            <div className="flex items-center justify-between p-5 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">System Health</h2>
                  <p className="text-xs text-muted-foreground">All services status overview</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30">All Systems Operational</Badge>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setShowHealthModal(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="p-5 space-y-3">
              {healthMetrics.map((metric, i) => {
                const style = getStatusStyle(metric.status);
                return (
                  <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-muted/20 border border-border/50">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${style.dot}`} />
                      <span className="font-medium">{metric.name}</span>
                    </div>
                    <div className="flex items-center gap-8 text-sm">
                      <div className="text-right">
                        <span className="text-muted-foreground text-xs">Uptime</span>
                        <p className="text-emerald-400 font-medium">{metric.uptime}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-muted-foreground text-xs">Latency</span>
                        <p className="font-medium">{metric.latency}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="p-4 border-t border-border/50 flex justify-end bg-muted/20">
              <Button variant="outline" onClick={() => setShowHealthModal(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}

      {/* Security Scan Modal - Enhanced */}
      {showSecurityModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl animate-in">
            <div className="flex items-center justify-between p-5 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getIssueCount().critical > 0 ? 'bg-red-500/10' : 'bg-amber-500/10'
                  }`}>
                  <Shield className={`w-5 h-5 ${getIssueCount().critical > 0 ? 'text-red-500' : 'text-amber-500'}`} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Security Scan Results</h2>
                  <p className="text-xs text-muted-foreground">Automated vulnerability detection</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {isScanning ? (
                  <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                    <Loader2 className="w-3 h-3 mr-1.5 animate-spin" />
                    Scanning...
                  </Badge>
                ) : (
                  <>
                    {getIssueCount().resolved > 0 && (
                      <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30">
                        {getIssueCount().resolved} Fixed
                      </Badge>
                    )}
                    <Badge className={
                      getIssueCount().critical > 0
                        ? 'bg-red-500/15 text-red-400 border-red-500/30'
                        : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                    }>
                      {getIssueCount().pending} Issues
                    </Badge>
                  </>
                )}
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setShowSecurityModal(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {isScanning ? (
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                    <Shield className="w-6 h-6 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">Scanning containers, dependencies, and configurations...</p>
                  <div className="mt-4 text-xs text-muted-foreground/70 animate-pulse">
                    Analyzing Docker images... Checking npm packages... Reviewing security groups...
                  </div>
                </div>
              ) : (
                securityFindings.map((finding) => (
                  <div
                    key={finding.id}
                    className={`rounded-xl border overflow-hidden transition-all ${finding.status === 'resolved'
                      ? 'bg-emerald-500/5 border-emerald-500/30'
                      : finding.status === 'fixing'
                        ? 'bg-blue-500/5 border-blue-500/30'
                        : 'bg-muted/20 border-border/50'
                      }`}
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {finding.status === 'resolved' ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                            ) : finding.status === 'fixing' ? (
                              <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                            ) : finding.status === 'failed' ? (
                              <XCircle className="w-4 h-4 text-red-500" />
                            ) : null}
                            <Badge
                              variant="outline"
                              className={`text-[10px] ${getSeverityStyle(finding.severity)}`}
                            >
                              {finding.severity.toUpperCase()}
                            </Badge>
                            <span className="text-sm font-medium">{finding.title}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            <span className="text-emerald-400">Fix:</span> {finding.fix}
                          </p>
                        </div>
                        {finding.status === 'pending' && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs h-8 gap-1.5"
                            onClick={() => handleAutoFix(finding.id)}
                          >
                            <Zap className="w-3 h-3" />
                            Auto-Fix
                          </Button>
                        )}
                        {finding.status === 'fixing' && (
                          <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                            Fixing...
                          </Badge>
                        )}
                        {finding.status === 'resolved' && (
                          <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/30">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Resolved
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Fix Logs Panel */}
                    {(finding.status === 'fixing' || (finding.status === 'resolved' && expandedFix === finding.id)) && finding.fixLogs && finding.fixLogs.length > 0 && (
                      <div className="border-t border-border/50 bg-background/50 p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Terminal className="w-3.5 h-3.5 text-muted-foreground" />
                          <span className="text-xs font-medium text-muted-foreground">Fix Process</span>
                        </div>
                        <div className="font-mono text-xs space-y-1.5 bg-muted/30 rounded-lg p-3 max-h-48 overflow-y-auto">
                          {finding.fixLogs.map((log, i) => (
                            <div key={i} className="flex gap-2 animate-in" style={{ animationDelay: `${i * 100}ms` }}>
                              <span className="text-foreground">{log}</span>
                            </div>
                          ))}
                          {finding.status === 'fixing' && (
                            <div className="flex items-center gap-2 text-blue-400">
                              <Loader2 className="w-3 h-3 animate-spin" />
                              <span>Processing...</span>
                            </div>
                          )}
                        </div>
                        {finding.fixCommands && finding.fixCommands.length > 0 && (
                          <div className="mt-3">
                            <p className="text-[10px] text-muted-foreground mb-1.5">Commands executed:</p>
                            <div className="font-mono text-xs space-y-1 text-muted-foreground">
                              {finding.fixCommands.map((cmd, i) => (
                                <div key={i}>$ {cmd}</div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t border-border/50 flex justify-between bg-muted/20">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRunScan}
                disabled={isScanning}
                className="gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
                Run New Scan
              </Button>
              <Button variant="outline" onClick={() => setShowSecurityModal(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}

      {/* Deploy Modal */}
      {showDeployModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl w-full max-w-md shadow-2xl animate-in">
            <div className="flex items-center justify-between p-5 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">Deploy to Production</h2>
                  <p className="text-xs text-muted-foreground">One-click deployment</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setShowDeployModal(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="p-5 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Repository</label>
                <Input defaultValue="nxt-gen/react-app" className="bg-muted/30" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Branch</label>
                <Input defaultValue="main" className="bg-muted/30" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Environment</label>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" size="sm">Staging</Button>
                  <Button className="flex-1" size="sm">Production</Button>
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-sm">
                <CheckCircle className="w-4 h-4 text-emerald-500" />
                <span className="text-emerald-400">All checks passed. Ready to deploy.</span>
              </div>
            </div>
            <div className="p-5 border-t border-border/50 flex justify-end gap-2 bg-muted/20">
              <Button variant="outline" onClick={() => setShowDeployModal(false)}>Cancel</Button>
              <Button onClick={handleQuickDeploy} className="gap-2">
                <Play className="w-4 h-4" />
                Deploy Now
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
