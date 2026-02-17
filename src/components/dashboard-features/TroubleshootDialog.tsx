import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Bot, Edit, MessageSquare, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

interface TroubleshootDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  toolName: string;
  error?: string;
  onAiRetry: () => void;
  onManualEdit: () => void;
  onPromptEdit: (prompt: string) => void;
}

export function TroubleshootDialog({
  open,
  onOpenChange,
  toolName,
  error,
  onAiRetry,
  onManualEdit,
  onPromptEdit,
}: TroubleshootDialogProps) {
  const { t } = useTranslation();
  const [promptText, setPromptText] = useState("");

  const handlePromptSubmit = () => {
    if (promptText.trim()) {
      onPromptEdit(promptText);
      setPromptText("");
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wrench className="w-5 h-5 text-error-red" />
            {t('troubleshooting.title')} - {toolName}
          </DialogTitle>
          <DialogDescription>
            {t('troubleshooting.description')}
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Card className="border-error-red/20 bg-error-red/5">
            <CardHeader>
              <CardTitle className="text-sm text-error-red">Error Details</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-xs text-muted-foreground font-mono whitespace-pre-wrap">
                {error}
              </pre>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4">
          {/* AI Retry Option */}
          <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bot className="w-5 h-5 text-primary" />
                  <div>
                    <CardTitle className="text-base">{t('workflow.aiRetry')}</CardTitle>
                    <CardDescription>{t('troubleshooting.aiRetryDesc')}</CardDescription>
                  </div>
                </div>
                <Button 
                  onClick={() => {
                    onAiRetry();
                    onOpenChange(false);
                  }}
                  size="sm"
                >
                  Retry
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Manual Edit Option */}
          <Card className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Edit className="w-5 h-5 text-accent" />
                  <div>
                    <CardTitle className="text-base">{t('workflow.manualEdit')}</CardTitle>
                    <CardDescription>{t('troubleshooting.manualEditDesc')}</CardDescription>
                  </div>
                </div>
                <Button 
                  variant="outline"
                  onClick={() => {
                    onManualEdit();
                    onOpenChange(false);
                  }}
                  size="sm"
                >
                  Edit
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Prompt Edit Option */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <MessageSquare className="w-5 h-5 text-neon-green" />
                <div>
                  <CardTitle className="text-base">{t('workflow.promptEdit')}</CardTitle>
                  <CardDescription>{t('troubleshooting.promptEditDesc')}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea
                placeholder={`Fix the ${toolName} configuration issue by...`}
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                className="min-h-20"
              />
              <div className="flex justify-between items-center">
                <Badge variant="outline" className="text-xs">
                  Natural Language Input
                </Badge>
                <Button 
                  onClick={handlePromptSubmit}
                  disabled={!promptText.trim()}
                  size="sm"
                >
                  Apply Fix
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}