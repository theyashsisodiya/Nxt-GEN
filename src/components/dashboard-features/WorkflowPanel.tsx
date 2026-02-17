import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronRight, Play, Pause, RotateCcw, Settings, AlertTriangle, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { TroubleshootDialog } from "@/components/dashboard-features/TroubleshootDialog";
interface WorkflowPanelProps {
  tool: {
    name: string;
    status: 'pending' | 'running' | 'success' | 'error' | 'warning';
    progress: number;
    commands: string[];
    logs: string[];
    metadata: Record<string, string>;
    error?: string;
  };
  onEdit: () => void;
  onRerun: () => void;
  onAiRetry?: () => void;
  onPromptEdit?: (prompt: string) => void;
}
export function WorkflowPanel({
  tool,
  onEdit,
  onRerun,
  onAiRetry,
  onPromptEdit
}: WorkflowPanelProps) {
  const {
    t
  } = useTranslation();
  const [isExpanded, setIsExpanded] = useState(tool.status === 'running' || tool.status === 'error');
  const [showTroubleshoot, setShowTroubleshoot] = useState(false);
  const shouldShowTroubleshoot = tool.status === 'error' || tool.status === 'pending';
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'running':
        return 'status-running';
      case 'success':
        return 'status-success';
      case 'warning':
        return 'status-warning';
      case 'error':
        return 'status-error';
      default:
        return 'status-pending';
    }
  };
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <Play className="w-3 h-3" />;
      case 'success':
        return <div className="w-3 h-3 rounded-full bg-success-green" />;
      case 'error':
        return <div className="w-3 h-3 rounded-full bg-error-red" />;
      default:
        return <Pause className="w-3 h-3" />;
    }
  };
  return <>
    <Card className={`modern-panel tool-panel-enter ${tool.status === 'running' ? 'glow-primary' : ''} ${tool.status === 'error' ? 'border-error-red/50' : ''}`}>
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger asChild>
          <div className="modern-panel-header cursor-pointer transition-all duration-200 hover:bg-muted/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-wrap">
                {isExpanded ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                <div className="flex items-center gap-2">
                  {getStatusIcon(tool.status)}
                  <CardTitle className="text-lg text-foreground">{tool.name}</CardTitle>
                </div>
                <Badge className={`${getStatusClass(tool.status)}`}>
                  {t(`workflow.${tool.status}`).toUpperCase()}
                </Badge>
                {shouldShowTroubleshoot && <Badge variant="outline" className="text-error-red border-error-red/30 bg-error-red/5">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Issues
                </Badge>}
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                {shouldShowTroubleshoot && <Button variant="outline" size="sm" onClick={e => {
                  e.stopPropagation();
                  setShowTroubleshoot(true);
                }} className="text-error-red border-error-red/30 hover:bg-error-red/10 rounded-lg">
                  <Wrench className="w-4 h-4 mr-1" />
                  {t('workflow.troubleshoot')}
                </Button>}
                <Button variant="ghost" size="sm" onClick={e => {
                  e.stopPropagation();
                  onEdit();
                }} className="hover:bg-muted/50 rounded-lg">
                  <Settings className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={e => {
                  e.stopPropagation();
                  onRerun();
                }} className="hover:bg-muted/50 rounded-lg">
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {tool.status === 'running' && <Progress value={tool.progress} className="w-full mt-4 h-2" />}
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="modern-panel-content">
            <Tabs defaultValue="commands" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-muted/30 rounded-lg">
                <TabsTrigger value="commands" className="rounded-md">{t('workflow.commands')}</TabsTrigger>
                <TabsTrigger value="logs" className="rounded-md">{t('workflow.logs')}</TabsTrigger>
                <TabsTrigger value="metadata" className="rounded-md">{t('workflow.metadata')}</TabsTrigger>
              </TabsList>

              <TabsContent value="commands" className="mt-6">
                <div className="code-panel max-h-64 overflow-y-auto">
                  {tool.commands.map((command, index) => <div key={index} className="mb-2 last:mb-0">
                    <span className="text-muted-foreground">$ </span>
                    <span className="text-foreground">{command}</span>
                  </div>)}
                </div>
              </TabsContent>

              <TabsContent value="logs" className="mt-6">
                <div className="code-panel max-h-64 overflow-y-auto">
                  {tool.logs.map((log, index) => <div key={index} className="mb-1 text-sm last:mb-0">
                    <span className="text-muted-foreground">[{new Date().toLocaleTimeString()}] </span>
                    <span className="text-foreground">{log}</span>
                  </div>)}
                  {tool.status === 'running' && <div className="flex items-center gap-2 mt-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="text-muted-foreground text-sm">{t('workflow.liveOutput')}</span>
                  </div>}
                </div>
              </TabsContent>

              <TabsContent value="metadata" className="mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(tool.metadata).map(([key, value]) => <div key={key} className="p-3 bg-muted/20 rounded-lg border border-border/50">
                    <div className="text-sm font-medium text-foreground">{key}</div>
                    <div className="text-sm text-muted-foreground font-mono mt-1">{value}</div>
                  </div>)}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>

    <TroubleshootDialog open={showTroubleshoot} onOpenChange={setShowTroubleshoot} toolName={tool.name} error={tool.error} onAiRetry={() => onAiRetry?.()} onManualEdit={() => onEdit()} onPromptEdit={prompt => onPromptEdit?.(prompt)} />
  </>;
}