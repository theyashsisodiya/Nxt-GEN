import { useState } from "react";
import {
    Book, ChevronRight, ChevronDown, Code, Shield, Zap, Settings,
    Terminal, Key, Lock, AlertTriangle, CheckCircle, Copy, Check,
    Rocket, Database, Cloud, GitBranch, Server, Cpu, RefreshCw,
    FileText, Search, ExternalLink, Play, Pause, X, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface DocSection {
    id: string;
    title: string;
    icon: any;
    category: string;
    content: React.ReactNode;
}

export function Documentation() {
    const [activeSection, setActiveSection] = useState("getting-started");
    const [searchQuery, setSearchQuery] = useState("");
    const [copiedCode, setCopiedCode] = useState<string | null>(null);

    const copyToClipboard = (code: string, id: string) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(id);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    const CodeBlock = ({ code, language = "bash", id }: { code: string; language?: string; id: string }) => (
        <div className="relative group">
            <pre className="bg-background/80 border border-border/50 rounded-lg p-4 text-sm font-mono overflow-x-auto">
                <code className={`language-${language}`}>{code}</code>
            </pre>
            <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => copyToClipboard(code, id)}
            >
                {copiedCode === id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            </Button>
        </div>
    );

    const sections: DocSection[] = [
        {
            id: "getting-started",
            title: "Getting Started Guide",
            icon: Rocket,
            category: "Basics",
            content: (
                <div className="space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Welcome to Nxt-Gen</h2>
                        <p className="text-muted-foreground">
                            Nxt-Gen is an autonomous AI operations platform that transforms how you manage DevOps workflows.
                            This guide will help you get started in minutes.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">1</span>
                            Create Your Account
                        </h3>
                        <p className="text-sm text-muted-foreground ml-8">
                            Sign up at <code className="px-1.5 py-0.5 bg-muted rounded">app.nxtgen.ai</code> using your email or SSO provider.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">2</span>
                            Install the CLI
                        </h3>
                        <CodeBlock
                            id="cli-install"
                            code={`# Install Nxt-Gen CLI
npm install -g @nxtgen/cli

# Verify installation
nxtgen --version

# Authenticate with your account
nxtgen auth login`}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">3</span>
                            Initialize Your First Project
                        </h3>
                        <CodeBlock
                            id="init-project"
                            code={`# Initialize a new project
nxtgen init my-project

# Navigate to project directory
cd my-project

# Start the development environment
nxtgen dev`}
                        />
                    </div>

                    <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg">
                        <div className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5" />
                            <div>
                                <h4 className="font-semibold text-emerald-400">You're Ready!</h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Your Nxt-Gen environment is now set up. Head to the Dashboard to create your first workflow.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: "tool-integration",
            title: "Tool Integration Setup",
            icon: Settings,
            category: "Integration",
            content: (
                <div className="space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Connect Your DevOps Tools</h2>
                        <p className="text-muted-foreground">
                            Nxt-Gen integrates seamlessly with 50+ DevOps tools. Connect your existing infrastructure in minutes.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { name: "GitHub", icon: GitBranch, color: "text-purple-400" },
                            { name: "Docker", icon: Cpu, color: "text-blue-400" },
                            { name: "Kubernetes", icon: Server, color: "text-cyan-400" },
                            { name: "AWS", icon: Cloud, color: "text-amber-400" },
                            { name: "Jenkins", icon: RefreshCw, color: "text-red-400" },
                            { name: "PostgreSQL", icon: Database, color: "text-emerald-400" },
                        ].map((tool) => (
                            <div key={tool.name} className="p-3 bg-muted/20 rounded-lg flex items-center gap-3">
                                <tool.icon className={`w-5 h-5 ${tool.color}`} />
                                <span className="font-medium text-sm">{tool.name}</span>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Connect via CLI</h3>
                        <CodeBlock
                            id="connect-github"
                            code={`# Connect GitHub
nxtgen connect github --token YOUR_GITHUB_TOKEN

# Connect Docker Registry
nxtgen connect docker --registry registry.io --username USER

# Connect Kubernetes Cluster
nxtgen connect k8s --kubeconfig ~/.kube/config

# Connect AWS
nxtgen connect aws --access-key ACCESS_KEY --secret-key SECRET_KEY`}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Connect via API</h3>
                        <CodeBlock
                            id="connect-api"
                            language="javascript"
                            code={`// Using the Nxt-Gen SDK
import { NxtGen } from '@nxtgen/sdk';

const nxtgen = new NxtGen({
  apiKey: process.env.NXTGEN_API_KEY
});

// Connect GitHub integration
await nxtgen.integrations.connect({
  type: 'github',
  credentials: {
    token: process.env.GITHUB_TOKEN
  },
  repositories: ['user/repo1', 'user/repo2']
});`}
                        />
                    </div>
                </div>
            )
        },
        {
            id: "workflow-automation",
            title: "Workflow Automation",
            icon: Zap,
            category: "Automation",
            content: (
                <div className="space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Create Automated Workflows</h2>
                        <p className="text-muted-foreground">
                            Define powerful CI/CD pipelines using natural language or YAML configuration.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Using Natural Language</h3>
                        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                            <p className="text-sm italic text-muted-foreground mb-2">Example prompt:</p>
                            <p className="font-medium">"Deploy my React app to production when I push to main branch, run tests first"</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Using YAML Configuration</h3>
                        <CodeBlock
                            id="workflow-yaml"
                            language="yaml"
                            code={`# nxtgen.workflow.yaml
name: production-deploy
trigger:
  branch: main
  event: push

steps:
  - name: checkout
    action: git/checkout
    
  - name: install
    action: npm/install
    
  - name: test
    action: npm/test
    on_failure: notify
    
  - name: build
    action: docker/build
    image: registry.io/app:{{version}}
    
  - name: deploy
    action: k8s/deploy
    namespace: production
    replicas: 3
    
  - name: notify
    action: slack/send
    channel: #deployments
    message: "Deployed {{version}} to production"`}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Workflow States</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { state: "pending", color: "bg-amber-500/15 text-amber-400 border-amber-500/30", desc: "Waiting to start" },
                                { state: "running", color: "bg-blue-500/15 text-blue-400 border-blue-500/30", desc: "Currently executing" },
                                { state: "completed", color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30", desc: "Finished successfully" },
                                { state: "failed", color: "bg-red-500/15 text-red-400 border-red-500/30", desc: "Encountered an error" },
                            ].map((s) => (
                                <div key={s.state} className={`p-3 rounded-lg border ${s.color}`}>
                                    <div className="font-mono text-sm font-semibold uppercase">{s.state}</div>
                                    <div className="text-xs opacity-80 mt-1">{s.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: "security",
            title: "Security Best Practices",
            icon: Shield,
            category: "Security",
            content: (
                <div className="space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Security & Compliance</h2>
                        <p className="text-muted-foreground">
                            Nxt-Gen is built with enterprise-grade security. Follow these best practices to keep your infrastructure secure.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Lock className="w-5 h-5 text-primary" />
                            Credential Management
                        </h3>
                        <ul className="space-y-2 ml-7">
                            <li className="flex items-start gap-2 text-sm">
                                <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5" />
                                <span>All credentials are encrypted using AES-256 encryption at rest</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm">
                                <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5" />
                                <span>Keys are only decrypted in memory during workflow execution</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm">
                                <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5" />
                                <span>Automatic key rotation every 90 days</span>
                            </li>
                            <li className="flex items-start gap-2 text-sm">
                                <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5" />
                                <span>Zero-knowledge architecture - we never see your secrets</span>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Key className="w-5 h-5 text-primary" />
                            API Key Security
                        </h3>
                        <CodeBlock
                            id="security-env"
                            code={`# Never commit API keys to version control
# Use environment variables instead

export NXTGEN_API_KEY="nxtgen_live_..."
export GITHUB_TOKEN="ghp_..."
export AWS_ACCESS_KEY_ID="AKIA..."

# Or use a secrets manager
nxtgen secrets set GITHUB_TOKEN --from-env
nxtgen secrets set AWS_CREDENTIALS --from-file ~/.aws/credentials`}
                        />
                    </div>

                    <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5" />
                            <div>
                                <h4 className="font-semibold text-amber-400">Security Advisory</h4>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Enable two-factor authentication (2FA) on your account for enhanced security.
                                    Go to Settings → Security → Enable 2FA.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: "api-reference",
            title: "API Reference",
            icon: Code,
            category: "API",
            content: (
                <div className="space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">REST API Reference</h2>
                        <p className="text-muted-foreground">
                            Complete API documentation for programmatic access to Nxt-Gen platform.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Lock className="w-5 h-5 text-primary" />
                            Authentication (OAuth 2.0)
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Nxt-Gen API uses OAuth 2.0 for authentication. You'll need a Client ID and Client Secret.
                        </p>

                        <div className="p-4 bg-muted/30 rounded-lg space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Authorization URL</span>
                                <code className="text-xs bg-background px-2 py-1 rounded">https://api.nxtgen.ai/oauth/authorize</code>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Token URL</span>
                                <code className="text-xs bg-background px-2 py-1 rounded">https://api.nxtgen.ai/oauth/token</code>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Scopes</span>
                                <code className="text-xs bg-background px-2 py-1 rounded">read write workflows:execute</code>
                            </div>
                        </div>

                        <CodeBlock
                            id="oauth-flow"
                            language="javascript"
                            code={`// OAuth 2.0 Authorization Code Flow
const clientId = 'your_client_id';
const clientSecret = 'your_client_secret';
const redirectUri = 'https://yourapp.com/callback';

// Step 1: Redirect user to authorization URL
const authUrl = \`https://api.nxtgen.ai/oauth/authorize?
  client_id=\${clientId}&
  redirect_uri=\${redirectUri}&
  response_type=code&
  scope=read+write+workflows:execute\`;

// Step 2: Exchange code for access token
const tokenResponse = await fetch('https://api.nxtgen.ai/oauth/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    grant_type: 'authorization_code',
    client_id: clientId,
    client_secret: clientSecret,
    code: authorizationCode,
    redirect_uri: redirectUri
  })
});

const { access_token, refresh_token } = await tokenResponse.json();`}
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">API Endpoints</h3>

                        {/* Workflows API */}
                        <div className="border border-border/50 rounded-lg overflow-hidden">
                            <div className="p-3 bg-muted/20 flex items-center gap-3">
                                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">GET</Badge>
                                <code className="text-sm font-mono">/api/v1/workflows</code>
                                <span className="text-xs text-muted-foreground ml-auto">List all workflows</span>
                            </div>
                            <div className="p-4 border-t border-border/50">
                                <CodeBlock
                                    id="get-workflows"
                                    language="bash"
                                    code={`curl -X GET "https://api.nxtgen.ai/api/v1/workflows" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json"

# Response
{
  "data": [
    {
      "id": "wf_abc123",
      "name": "Production Deploy",
      "status": "completed",
      "created_at": "2026-02-10T00:00:00Z",
      "duration_ms": 245000
    }
  ],
  "meta": { "total": 24, "page": 1, "per_page": 10 }
}`}
                                />
                            </div>
                        </div>

                        {/* Create Workflow */}
                        <div className="border border-border/50 rounded-lg overflow-hidden">
                            <div className="p-3 bg-muted/20 flex items-center gap-3">
                                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">POST</Badge>
                                <code className="text-sm font-mono">/api/v1/workflows</code>
                                <span className="text-xs text-muted-foreground ml-auto">Create new workflow</span>
                            </div>
                            <div className="p-4 border-t border-border/50">
                                <CodeBlock
                                    id="create-workflow"
                                    language="bash"
                                    code={`curl -X POST "https://api.nxtgen.ai/api/v1/workflows" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Deploy React App",
    "trigger": { "branch": "main", "event": "push" },
    "steps": [
      { "name": "build", "action": "docker/build" },
      { "name": "deploy", "action": "k8s/deploy" }
    ]
  }'

# Response
{
  "id": "wf_xyz789",
  "name": "Deploy React App",
  "status": "pending",
  "created_at": "2026-02-10T00:40:00Z"
}`}
                                />
                            </div>
                        </div>

                        {/* Get Alerts */}
                        <div className="border border-border/50 rounded-lg overflow-hidden">
                            <div className="p-3 bg-muted/20 flex items-center gap-3">
                                <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">GET</Badge>
                                <code className="text-sm font-mono">/api/v1/alerts</code>
                                <span className="text-xs text-muted-foreground ml-auto">List alerts</span>
                            </div>
                            <div className="p-4 border-t border-border/50">
                                <CodeBlock
                                    id="get-alerts"
                                    language="bash"
                                    code={`curl -X GET "https://api.nxtgen.ai/api/v1/alerts?status=pending" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# Response
{
  "data": [
    {
      "id": "alert_001",
      "type": "workflow_failed",
      "severity": "high",
      "message": "Security Scan failed: 2 vulnerabilities found",
      "status": "pending",
      "workflow_id": "wf_abc123",
      "created_at": "2026-02-10T00:35:00Z"
    }
  ]
}`}
                                />
                            </div>
                        </div>

                        {/* Invoke Tool */}
                        <div className="border border-border/50 rounded-lg overflow-hidden">
                            <div className="p-3 bg-muted/20 flex items-center gap-3">
                                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">POST</Badge>
                                <code className="text-sm font-mono">/api/v1/tools/invoke</code>
                                <span className="text-xs text-muted-foreground ml-auto">Invoke a tool/service</span>
                            </div>
                            <div className="p-4 border-t border-border/50">
                                <CodeBlock
                                    id="invoke-tool"
                                    language="bash"
                                    code={`curl -X POST "https://api.nxtgen.ai/api/v1/tools/invoke" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "tool": "docker",
    "action": "build",
    "params": {
      "dockerfile": "./Dockerfile",
      "image": "registry.io/myapp:latest",
      "push": true
    }
  }'

# Response
{
  "execution_id": "exec_abc123",
  "tool": "docker",
  "action": "build",
  "status": "running",
  "logs_url": "https://api.nxtgen.ai/api/v1/executions/exec_abc123/logs"
}`}
                                />
                            </div>
                        </div>

                        {/* Create Project */}
                        <div className="border border-border/50 rounded-lg overflow-hidden">
                            <div className="p-3 bg-muted/20 flex items-center gap-3">
                                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">POST</Badge>
                                <code className="text-sm font-mono">/api/v1/projects</code>
                                <span className="text-xs text-muted-foreground ml-auto">Create new project</span>
                            </div>
                            <div className="p-4 border-t border-border/50">
                                <CodeBlock
                                    id="create-project"
                                    language="bash"
                                    code={`curl -X POST "https://api.nxtgen.ai/api/v1/projects" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "My New Project",
    "description": "Production deployment pipeline",
    "repository": "github.com/user/myapp",
    "environment": "production",
    "integrations": ["github", "docker", "kubernetes"]
  }'

# Response
{
  "id": "proj_abc123",
  "name": "My New Project",
  "status": "active",
  "api_key": "nxtgen_proj_...",
  "created_at": "2026-02-10T00:40:00Z"
}`}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Rate Limits</h3>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="p-3 bg-muted/20 rounded-lg text-center">
                                <div className="text-2xl font-bold text-primary">1000</div>
                                <div className="text-xs text-muted-foreground">requests/min</div>
                            </div>
                            <div className="p-3 bg-muted/20 rounded-lg text-center">
                                <div className="text-2xl font-bold text-primary">100</div>
                                <div className="text-xs text-muted-foreground">concurrent workflows</div>
                            </div>
                            <div className="p-3 bg-muted/20 rounded-lg text-center">
                                <div className="text-2xl font-bold text-primary">10GB</div>
                                <div className="text-xs text-muted-foreground">logs retention</div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: "troubleshooting",
            title: "Troubleshooting Guide",
            icon: AlertTriangle,
            category: "Support",
            content: (
                <div className="space-y-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Troubleshooting Common Issues</h2>
                        <p className="text-muted-foreground">
                            Quick fixes for the most common problems you might encounter.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {[
                            {
                                issue: "Workflow stuck in 'pending' state",
                                cause: "Usually caused by missing credentials or rate limiting",
                                solution: `# Check workflow status
nxtgen workflow status wf_abc123

# Verify credentials
nxtgen credentials verify github

# Force retry
nxtgen workflow retry wf_abc123 --force`
                            },
                            {
                                issue: "Docker build fails with 'ImagePullBackOff'",
                                cause: "Registry authentication failed or image doesn't exist",
                                solution: `# Create registry secret
kubectl create secret docker-registry regcred \\
  --docker-server=registry.io \\
  --docker-username=USER \\
  --docker-password=PASS

# Patch deployment
kubectl patch deployment myapp -p '{"spec":{"template":{"spec":{"imagePullSecrets":[{"name":"regcred"}]}}}}'`
                            },
                            {
                                issue: "API returns 401 Unauthorized",
                                cause: "Access token expired or invalid",
                                solution: `# Refresh your access token
curl -X POST "https://api.nxtgen.ai/oauth/token" \\
  -d "grant_type=refresh_token" \\
  -d "refresh_token=YOUR_REFRESH_TOKEN" \\
  -d "client_id=YOUR_CLIENT_ID"

# Or re-authenticate via CLI
nxtgen auth login --refresh`
                            },
                            {
                                issue: "Self-healing not triggering",
                                cause: "Auto-heal is disabled or conditions not met",
                                solution: `# Enable auto-heal for workflow
nxtgen workflow update wf_abc123 --auto-heal=true

# Check auto-heal conditions
nxtgen workflow inspect wf_abc123 --show-heal-config

# Manually trigger heal
nxtgen workflow heal wf_abc123`
                            }
                        ].map((item, i) => (
                            <div key={i} className="border border-border/50 rounded-lg overflow-hidden">
                                <div className="p-4 bg-red-500/5 border-b border-border/50">
                                    <div className="flex items-center gap-2 text-red-400 font-semibold">
                                        <X className="w-4 h-4" />
                                        {item.issue}
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">{item.cause}</p>
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-3">
                                        <CheckCircle className="w-4 h-4" />
                                        Solution
                                    </div>
                                    <CodeBlock id={`fix-${i}`} code={item.solution} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
        }
    ];

    const filteredSections = sections.filter(s =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const activeContent = sections.find(s => s.id === activeSection);

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h1 className="text-3xl font-bold text-gradient-primary tracking-tight">
                            Documentation
                        </h1>
                    </div>
                    <p className="text-muted-foreground text-sm">
                        Complete guides, API reference, and best practices for Nxt-Gen platform
                    </p>
                </div>
                <Badge variant="outline" className="text-[10px] border-primary/30 bg-primary/10 text-primary font-semibold uppercase tracking-wider">
                    <Book className="w-3 h-3 mr-1" />
                    v2.0
                </Badge>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                    placeholder="Search documentation..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-muted/30 border-border/40 rounded-xl"
                />
            </div>

            <div className="grid grid-cols-4 gap-6">
                {/* Sidebar Navigation */}
                <Card className="gradient-card border-border/20 h-fit sticky top-6">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-sm font-medium">Topics</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                        <nav className="space-y-1">
                            {filteredSections.map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    className={`w-full flex items-center gap-3 p-2.5 rounded-lg text-left transition-all ${activeSection === section.id
                                            ? 'bg-primary/10 text-primary border border-primary/20'
                                            : 'hover:bg-muted/30 text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    <section.icon className="w-4 h-4" />
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-medium truncate">{section.title}</div>
                                        <div className="text-[10px] opacity-70">{section.category}</div>
                                    </div>
                                    {activeSection === section.id && (
                                        <ChevronRight className="w-4 h-4" />
                                    )}
                                </button>
                            ))}
                        </nav>
                    </CardContent>
                </Card>

                {/* Main Content */}
                <div className="col-span-3">
                    <Card className="gradient-card border-border/20">
                        <CardContent className="p-6">
                            <ScrollArea className="h-[calc(100vh-280px)]">
                                {activeContent?.content}
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Documentation;
