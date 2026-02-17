import { useState, useEffect } from "react";
import {
    Server, Cloud, Database, Shield, Zap, CheckCircle, XCircle,
    RefreshCw, Plus, Settings, Trash2, ExternalLink, Terminal,
    Globe, Lock, Unlock, Copy, Check, ChevronRight, ChevronDown,
    Activity, Loader2, Play, Pause, AlertTriangle, Code
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface MCPServer {
    id: string;
    name: string;
    description: string;
    status: 'connected' | 'disconnected' | 'connecting' | 'error';
    icon: any;
    category: string;
    tools: MCPTool[];
    resources: MCPResource[];
    config: Record<string, string>;
    lastSync?: string;
}

interface MCPTool {
    name: string;
    description: string;
    parameters: { name: string; type: string; required: boolean }[];
}

interface MCPResource {
    uri: string;
    name: string;
    mimeType: string;
}

export function MCPIntegrations() {
    const [servers, setServers] = useState<MCPServer[]>([
        {
            id: 'netlify',
            name: 'Netlify',
            description: 'Deploy and host web applications with serverless functions',
            status: 'connected',
            icon: Globe,
            category: 'Deployment',
            tools: [
                { name: 'deploy-site', description: 'Deploy a site to Netlify', parameters: [{ name: 'siteId', type: 'string', required: true }, { name: 'deployDirectory', type: 'string', required: true }] },
                { name: 'get-deploy', description: 'Get deployment status', parameters: [{ name: 'deployId', type: 'string', required: true }] },
                { name: 'create-new-project', description: 'Create a new Netlify project', parameters: [{ name: 'name', type: 'string', required: true }] },
                { name: 'manage-env-vars', description: 'Manage environment variables', parameters: [{ name: 'siteId', type: 'string', required: true }, { name: 'vars', type: 'object', required: true }] },
            ],
            resources: [
                { uri: 'netlify://sites', name: 'All Sites', mimeType: 'application/json' },
                { uri: 'netlify://deploys', name: 'Recent Deploys', mimeType: 'application/json' },
            ],
            config: { apiToken: '••••••••••••••••', teamId: 'team_abc123' },
            lastSync: '2m ago'
        },
        {
            id: 'supabase',
            name: 'Supabase',
            description: 'Open source Firebase alternative with PostgreSQL database',
            status: 'connected',
            icon: Database,
            category: 'Database',
            tools: [
                { name: 'execute_sql', description: 'Execute SQL queries', parameters: [{ name: 'query', type: 'string', required: true }, { name: 'project_id', type: 'string', required: true }] },
                { name: 'apply_migration', description: 'Apply database migration', parameters: [{ name: 'name', type: 'string', required: true }, { name: 'query', type: 'string', required: true }] },
                { name: 'deploy_edge_function', description: 'Deploy edge function', parameters: [{ name: 'name', type: 'string', required: true }, { name: 'files', type: 'array', required: true }] },
                { name: 'list_tables', description: 'List all database tables', parameters: [{ name: 'project_id', type: 'string', required: true }] },
                { name: 'get_logs', description: 'Get service logs', parameters: [{ name: 'service', type: 'string', required: true }] },
            ],
            resources: [
                { uri: 'supabase://projects', name: 'Projects', mimeType: 'application/json' },
                { uri: 'supabase://functions', name: 'Edge Functions', mimeType: 'application/json' },
            ],
            config: { accessToken: '••••••••••••••••', projectRef: 'xyzproject' },
            lastSync: '30s ago'
        },
        {
            id: 'perplexity',
            name: 'Perplexity AI',
            description: 'AI-powered search and research assistant',
            status: 'connected',
            icon: Zap,
            category: 'AI',
            tools: [
                { name: 'perplexity_ask', description: 'Ask questions using Sonar API', parameters: [{ name: 'messages', type: 'array', required: true }] },
            ],
            resources: [],
            config: { apiKey: '••••••••••••••••' },
            lastSync: '1m ago'
        },
        {
            id: 'github',
            name: 'GitHub',
            description: 'Version control and code collaboration platform',
            status: 'disconnected',
            icon: Code,
            category: 'Development',
            tools: [
                { name: 'create_repo', description: 'Create a new repository', parameters: [{ name: 'name', type: 'string', required: true }] },
                { name: 'create_pull_request', description: 'Create a pull request', parameters: [{ name: 'title', type: 'string', required: true }, { name: 'base', type: 'string', required: true }] },
                { name: 'list_issues', description: 'List repository issues', parameters: [{ name: 'repo', type: 'string', required: true }] },
            ],
            resources: [
                { uri: 'github://repos', name: 'Repositories', mimeType: 'application/json' },
            ],
            config: {},
            lastSync: undefined
        },
        {
            id: 'aws',
            name: 'AWS',
            description: 'Amazon Web Services cloud infrastructure',
            status: 'error',
            icon: Cloud,
            category: 'Cloud',
            tools: [
                { name: 'deploy_lambda', description: 'Deploy Lambda function', parameters: [{ name: 'functionName', type: 'string', required: true }] },
                { name: 'manage_s3', description: 'Manage S3 buckets', parameters: [{ name: 'bucket', type: 'string', required: true }] },
                { name: 'describe_ec2', description: 'Describe EC2 instances', parameters: [] },
            ],
            resources: [
                { uri: 'aws://ec2', name: 'EC2 Instances', mimeType: 'application/json' },
                { uri: 'aws://s3', name: 'S3 Buckets', mimeType: 'application/json' },
            ],
            config: { accessKeyId: 'AKIA••••••••', region: 'us-east-1' },
            lastSync: 'Failed'
        },
    ]);

    const [selectedServer, setSelectedServer] = useState<string | null>(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [copiedText, setCopiedText] = useState<string | null>(null);
    const [expandedTools, setExpandedTools] = useState<Set<string>>(new Set());
    const [testingTool, setTestingTool] = useState<string | null>(null);
    const [toolOutput, setToolOutput] = useState<Record<string, string>>({});

    const copyToClipboard = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedText(id);
        setTimeout(() => setCopiedText(null), 2000);
    };

    const getStatusStyle = (status: string) => {
        const styles: Record<string, { bg: string; text: string; dot: string }> = {
            connected: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', dot: 'bg-emerald-500' },
            disconnected: { bg: 'bg-gray-500/10', text: 'text-gray-400', dot: 'bg-gray-500' },
            connecting: { bg: 'bg-blue-500/10', text: 'text-blue-400', dot: 'bg-blue-500 animate-pulse' },
            error: { bg: 'bg-red-500/10', text: 'text-red-400', dot: 'bg-red-500' },
        };
        return styles[status] || styles.disconnected;
    };

    const handleConnect = (serverId: string) => {
        setServers(prev => prev.map(s =>
            s.id === serverId ? { ...s, status: 'connecting' as const } : s
        ));

        setTimeout(() => {
            setServers(prev => prev.map(s =>
                s.id === serverId ? { ...s, status: 'connected' as const, lastSync: 'now' } : s
            ));
        }, 2000);
    };

    const handleDisconnect = (serverId: string) => {
        setServers(prev => prev.map(s =>
            s.id === serverId ? { ...s, status: 'disconnected' as const, lastSync: undefined } : s
        ));
    };

    const handleTestTool = (serverId: string, toolName: string) => {
        const toolId = `${serverId}-${toolName}`;
        setTestingTool(toolId);
        setToolOutput(prev => ({ ...prev, [toolId]: '' }));

        const outputs = [
            `> Invoking ${toolName}...`,
            `> Connecting to ${serverId} MCP server...`,
            `> Authenticating with credentials...`,
            `> Executing tool with parameters...`,
            `> Response received:`,
            `{`,
            `  "success": true,`,
            `  "data": { "message": "Tool executed successfully" },`,
            `  "timestamp": "${new Date().toISOString()}"`,
            `}`
        ];

        let i = 0;
        const interval = setInterval(() => {
            if (i < outputs.length) {
                setToolOutput(prev => ({
                    ...prev,
                    [toolId]: (prev[toolId] || '') + outputs[i] + '\n'
                }));
                i++;
            } else {
                clearInterval(interval);
                setTestingTool(null);
            }
        }, 300);
    };

    const selectedServerData = servers.find(s => s.id === selectedServer);

    const availableServers = [
        { id: 'docker', name: 'Docker', description: 'Container management', icon: Server, category: 'Infrastructure' },
        { id: 'kubernetes', name: 'Kubernetes', description: 'Container orchestration', icon: Server, category: 'Infrastructure' },
        { id: 'stripe', name: 'Stripe', description: 'Payment processing', icon: Shield, category: 'Payments' },
        { id: 'slack', name: 'Slack', description: 'Team communication', icon: Globe, category: 'Communication' },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h1 className="text-3xl font-bold text-gradient-primary tracking-tight">
                            MCP Servers
                        </h1>
                        <Badge variant="outline" className="text-[10px] border-primary/30 bg-primary/10 text-primary font-semibold uppercase tracking-wider">
                            External Services
                        </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm">
                        Connect external services via Model Context Protocol for enhanced AI capabilities
                    </p>
                </div>
                <Button onClick={() => setShowAddModal(true)} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Server
                </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
                {[
                    { label: 'Connected', value: servers.filter(s => s.status === 'connected').length, icon: CheckCircle, color: 'text-emerald-400' },
                    { label: 'Available Tools', value: servers.reduce((acc, s) => acc + s.tools.length, 0), icon: Terminal, color: 'text-blue-400' },
                    { label: 'Resources', value: servers.reduce((acc, s) => acc + s.resources.length, 0), icon: Database, color: 'text-purple-400' },
                    { label: 'Errors', value: servers.filter(s => s.status === 'error').length, icon: AlertTriangle, color: 'text-red-400' },
                ].map((stat, i) => (
                    <Card key={i} className="card-base">
                        <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                                    <p className="text-2xl font-bold">{stat.value}</p>
                                </div>
                                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-3 gap-6">
                {/* Server List */}
                <div className="space-y-3">
                    <h2 className="text-sm font-medium text-muted-foreground">Connected Servers</h2>
                    {servers.map((server) => {
                        const statusStyle = getStatusStyle(server.status);
                        return (
                            <Card
                                key={server.id}
                                className={`card-base cursor-pointer transition-all ${selectedServer === server.id ? 'ring-2 ring-primary/50' : ''
                                    }`}
                                onClick={() => setSelectedServer(server.id)}
                            >
                                <CardContent className="p-4">
                                    <div className="flex items-start gap-3">
                                        <div className={`w-10 h-10 rounded-lg ${statusStyle.bg} flex items-center justify-center`}>
                                            <server.icon className={`w-5 h-5 ${statusStyle.text}`} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium text-sm">{server.name}</span>
                                                <Badge variant="outline" className={`text-[9px] ${statusStyle.bg} ${statusStyle.text} border-transparent`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full mr-1 ${statusStyle.dot}`} />
                                                    {server.status}
                                                </Badge>
                                            </div>
                                            <p className="text-xs text-muted-foreground mt-0.5 truncate">{server.description}</p>
                                            <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground">
                                                <span>{server.tools.length} tools</span>
                                                <span>{server.resources.length} resources</span>
                                                {server.lastSync && <span>Synced: {server.lastSync}</span>}
                                            </div>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Server Details */}
                <div className="col-span-2">
                    {selectedServerData ? (
                        <Card className="card-base h-full">
                            <CardHeader className="pb-4 border-b border-border/50">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-12 h-12 rounded-xl ${getStatusStyle(selectedServerData.status).bg} flex items-center justify-center`}>
                                            <selectedServerData.icon className={`w-6 h-6 ${getStatusStyle(selectedServerData.status).text}`} />
                                        </div>
                                        <div>
                                            <CardTitle className="text-lg">{selectedServerData.name}</CardTitle>
                                            <CardDescription className="text-xs">{selectedServerData.description}</CardDescription>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {selectedServerData.status === 'connected' ? (
                                            <Button variant="outline" size="sm" className="h-8 text-xs gap-1" onClick={() => handleDisconnect(selectedServerData.id)}>
                                                <Pause className="w-3 h-3" />
                                                Disconnect
                                            </Button>
                                        ) : selectedServerData.status === 'connecting' ? (
                                            <Button variant="outline" size="sm" className="h-8 text-xs gap-1" disabled>
                                                <Loader2 className="w-3 h-3 animate-spin" />
                                                Connecting...
                                            </Button>
                                        ) : (
                                            <Button size="sm" className="h-8 text-xs gap-1" onClick={() => handleConnect(selectedServerData.id)}>
                                                <Play className="w-3 h-3" />
                                                Connect
                                            </Button>
                                        )}
                                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                            <Settings className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="p-0">
                                <Tabs defaultValue="tools" className="w-full">
                                    <TabsList className="w-full justify-start rounded-none border-b border-border/50 bg-transparent h-10 px-4">
                                        <TabsTrigger value="tools" className="text-xs">Tools ({selectedServerData.tools.length})</TabsTrigger>
                                        <TabsTrigger value="resources" className="text-xs">Resources ({selectedServerData.resources.length})</TabsTrigger>
                                        <TabsTrigger value="config" className="text-xs">Configuration</TabsTrigger>
                                        <TabsTrigger value="logs" className="text-xs">Logs</TabsTrigger>
                                    </TabsList>

                                    <TabsContent value="tools" className="p-4 space-y-3 max-h-[400px] overflow-y-auto">
                                        {selectedServerData.tools.map((tool) => {
                                            const toolId = `${selectedServerData.id}-${tool.name}`;
                                            const isExpanded = expandedTools.has(toolId);
                                            return (
                                                <div key={tool.name} className="border border-border/50 rounded-lg overflow-hidden">
                                                    <button
                                                        className="w-full flex items-center justify-between p-3 hover:bg-muted/20 transition-colors"
                                                        onClick={() => setExpandedTools(prev => {
                                                            const next = new Set(prev);
                                                            if (next.has(toolId)) next.delete(toolId);
                                                            else next.add(toolId);
                                                            return next;
                                                        })}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <Terminal className="w-4 h-4 text-primary" />
                                                            <div className="text-left">
                                                                <div className="font-mono text-sm font-medium">{tool.name}</div>
                                                                <div className="text-xs text-muted-foreground">{tool.description}</div>
                                                            </div>
                                                        </div>
                                                        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                                                    </button>

                                                    {isExpanded && (
                                                        <div className="border-t border-border/50 p-3 bg-muted/10 space-y-3">
                                                            <div>
                                                                <div className="text-xs font-medium mb-2">Parameters</div>
                                                                <div className="space-y-1">
                                                                    {tool.parameters.map((param) => (
                                                                        <div key={param.name} className="flex items-center gap-2 text-xs">
                                                                            <code className="px-1.5 py-0.5 bg-background rounded">{param.name}</code>
                                                                            <span className="text-muted-foreground">: {param.type}</span>
                                                                            {param.required && <Badge variant="outline" className="text-[8px] h-4">required</Badge>}
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            </div>

                                                            <div className="flex gap-2">
                                                                <Button
                                                                    size="sm"
                                                                    className="h-7 text-xs gap-1"
                                                                    onClick={() => handleTestTool(selectedServerData.id, tool.name)}
                                                                    disabled={testingTool === toolId}
                                                                >
                                                                    {testingTool === toolId ? (
                                                                        <>
                                                                            <Loader2 className="w-3 h-3 animate-spin" />
                                                                            Testing...
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <Play className="w-3 h-3" />
                                                                            Test Tool
                                                                        </>
                                                                    )}
                                                                </Button>
                                                                <Button variant="outline" size="sm" className="h-7 text-xs gap-1" onClick={() => copyToClipboard(tool.name, toolId)}>
                                                                    {copiedText === toolId ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                                                    Copy
                                                                </Button>
                                                            </div>

                                                            {toolOutput[toolId] && (
                                                                <div className="bg-background/80 rounded-lg p-3 font-mono text-xs">
                                                                    <pre className="whitespace-pre-wrap text-emerald-400">{toolOutput[toolId]}</pre>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </TabsContent>

                                    <TabsContent value="resources" className="p-4 space-y-2">
                                        {selectedServerData.resources.length > 0 ? (
                                            selectedServerData.resources.map((resource) => (
                                                <div key={resource.uri} className="flex items-center justify-between p-3 border border-border/50 rounded-lg">
                                                    <div className="flex items-center gap-3">
                                                        <Database className="w-4 h-4 text-purple-400" />
                                                        <div>
                                                            <div className="font-medium text-sm">{resource.name}</div>
                                                            <code className="text-xs text-muted-foreground">{resource.uri}</code>
                                                        </div>
                                                    </div>
                                                    <Badge variant="outline" className="text-[10px]">{resource.mimeType}</Badge>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-8 text-muted-foreground text-sm">
                                                No resources available for this server
                                            </div>
                                        )}
                                    </TabsContent>

                                    <TabsContent value="config" className="p-4 space-y-4">
                                        {Object.entries(selectedServerData.config).map(([key, value]) => (
                                            <div key={key} className="space-y-1.5">
                                                <Label className="text-xs capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</Label>
                                                <div className="flex gap-2">
                                                    <Input
                                                        value={value}
                                                        readOnly
                                                        className="bg-muted/30 border-border/40 rounded-lg h-9 text-sm font-mono"
                                                    />
                                                    <Button variant="outline" size="sm" className="h-9 px-3">
                                                        <Settings className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                        {Object.keys(selectedServerData.config).length === 0 && (
                                            <div className="text-center py-8">
                                                <Lock className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                                                <p className="text-muted-foreground text-sm">No configuration set</p>
                                                <Button size="sm" className="mt-3">Configure Server</Button>
                                            </div>
                                        )}
                                    </TabsContent>

                                    <TabsContent value="logs" className="p-4">
                                        <div className="bg-background/80 rounded-lg p-4 font-mono text-xs space-y-1 h-[300px] overflow-y-auto">
                                            {[
                                                { time: '00:48:15', level: 'info', msg: `Connected to ${selectedServerData.name} MCP server` },
                                                { time: '00:48:16', level: 'info', msg: 'Authenticated successfully' },
                                                { time: '00:48:17', level: 'info', msg: `Discovered ${selectedServerData.tools.length} tools, ${selectedServerData.resources.length} resources` },
                                                { time: '00:48:20', level: 'info', msg: 'Health check passed' },
                                                { time: '00:48:45', level: 'info', msg: 'Syncing resources...' },
                                                { time: '00:48:46', level: 'success', msg: 'Sync completed successfully' },
                                            ].map((log, i) => (
                                                <div key={i} className={`${log.level === 'success' ? 'text-emerald-400' : log.level === 'error' ? 'text-red-400' : 'text-muted-foreground'}`}>
                                                    <span className="text-primary/50">[{log.time}]</span> {log.msg}
                                                </div>
                                            ))}
                                            <div className="flex items-center gap-2 text-blue-400 mt-2">
                                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                                                Listening for events...
                                            </div>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card className="card-base h-full flex items-center justify-center">
                            <div className="text-center py-12">
                                <Server className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                                <h3 className="font-medium mb-1">Select a Server</h3>
                                <p className="text-sm text-muted-foreground">Choose an MCP server to view its tools and resources</p>
                            </div>
                        </Card>
                    )}
                </div>
            </div>

            {/* Add Server Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <Card className="w-full max-w-lg">
                        <CardHeader className="pb-4 border-b border-border/50">
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-lg">Add MCP Server</CardTitle>
                                    <CardDescription className="text-xs">Connect a new external service</CardDescription>
                                </div>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setShowAddModal(false)}>
                                    <XCircle className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-4">
                            <div className="space-y-3">
                                {availableServers.map((server) => (
                                    <button
                                        key={server.id}
                                        className="w-full flex items-center gap-3 p-3 border border-border/50 rounded-lg hover:bg-muted/20 transition-colors text-left"
                                        onClick={() => {
                                            setServers(prev => [...prev, {
                                                id: server.id,
                                                name: server.name,
                                                description: server.description,
                                                status: 'disconnected',
                                                icon: server.icon,
                                                category: server.category,
                                                tools: [],
                                                resources: [],
                                                config: {},
                                            }]);
                                            setShowAddModal(false);
                                        }}
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-muted/30 flex items-center justify-center">
                                            <server.icon className="w-5 h-5 text-muted-foreground" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="font-medium text-sm">{server.name}</div>
                                            <div className="text-xs text-muted-foreground">{server.description}</div>
                                        </div>
                                        <Badge variant="outline" className="text-[10px]">{server.category}</Badge>
                                    </button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}

export default MCPIntegrations;
