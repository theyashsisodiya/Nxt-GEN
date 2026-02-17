import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell, Search, Command, CheckCircle, XCircle, AlertTriangle, Clock,
  LayoutDashboard, Radar, Puzzle, MessageSquareText, FileText, LifeBuoy,
  GitBranch, Cloud, Server, Shield, Zap, Database, Settings, User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface SearchItem {
  id: string;
  type: 'page' | 'workflow' | 'integration' | 'feature' | 'action';
  title: string;
  description: string;
  icon: any;
  path?: string;
  action?: () => void;
}

const notifications: Notification[] = [
  { id: '1', type: 'success', title: 'Deploy completed', message: 'Production deployment successful', time: '2m', read: false },
  { id: '2', type: 'error', title: 'Build failed', message: 'Pipeline #127 failed at test stage', time: '12m', read: false },
  { id: '3', type: 'warning', title: 'High CPU usage', message: 'Node prod-3 at 85% capacity', time: '18m', read: true },
];

const searchItems: SearchItem[] = [
  // Pages
  { id: 'p1', type: 'page', title: 'Dashboard', description: 'Monitor autonomous operations', icon: LayoutDashboard, path: '/app/dashboard' },
  { id: 'p2', type: 'page', title: 'Live Ops', description: 'Real-time operations control', icon: Radar, path: '/app/live-ops' },
  { id: 'p3', type: 'page', title: 'Integrations', description: 'Connected services', icon: Puzzle, path: '/app/integrations' },
  { id: 'p4', type: 'page', title: 'Console', description: 'AI chat interface', icon: MessageSquareText, path: '/app/chat' },
  { id: 'p5', type: 'page', title: 'Use Cases', description: 'Workflow templates', icon: FileText, path: '/app/use-cases' },
  { id: 'p6', type: 'page', title: 'Support', description: 'Get help', icon: LifeBuoy, path: '/app/support' },

  // Workflows
  { id: 'w1', type: 'workflow', title: 'Production Deploy - Node.js API', description: 'Running • 65% complete', icon: Cloud, path: '/app/dashboard' },
  { id: 'w2', type: 'workflow', title: 'Database Migration - PostgreSQL', description: 'Completed • 2m 15s', icon: Database, path: '/app/dashboard' },
  { id: 'w3', type: 'workflow', title: 'Security Scan - Docker Images', description: 'Failed • 1m 47s', icon: Shield, path: '/app/dashboard' },
  { id: 'w4', type: 'workflow', title: 'Staging Deploy - Frontend', description: 'Pending', icon: Cloud, path: '/app/dashboard' },

  // Integrations
  { id: 'i1', type: 'integration', title: 'GitHub', description: '12 repos connected', icon: GitBranch, path: '/app/integrations' },
  { id: 'i2', type: 'integration', title: 'Docker', description: '8 images built today', icon: Server, path: '/app/integrations' },
  { id: 'i3', type: 'integration', title: 'AWS', description: '5 EC2, 3 RDS instances', icon: Cloud, path: '/app/integrations' },
  { id: 'i4', type: 'integration', title: 'Kubernetes', description: '3 clusters, 24 pods', icon: Server, path: '/app/integrations' },
  { id: 'i5', type: 'integration', title: 'Jenkins', description: 'CI/CD automation', icon: Settings, path: '/app/integrations' },

  // Features
  { id: 'f1', type: 'feature', title: 'Self-Healing Architecture', description: 'Autonomous error recovery', icon: Shield, path: '/app/live-ops' },
  { id: 'f2', type: 'feature', title: 'AI Workflow Creator', description: 'Natural language workflows', icon: Zap, path: '/app/chat' },
  { id: 'f3', type: 'feature', title: 'Real-Time Monitoring', description: 'Live system metrics', icon: Radar, path: '/app/live-ops' },
  { id: 'f4', type: 'feature', title: 'Security Scanning', description: 'Vulnerability detection', icon: Shield, path: '/app/dashboard' },

  // Actions
  { id: 'a1', type: 'action', title: 'Deploy to Production', description: 'Start production deployment', icon: Zap, path: '/app/dashboard' },
  { id: 'a2', type: 'action', title: 'Run Security Scan', description: 'Scan for vulnerabilities', icon: Shield, path: '/app/dashboard' },
  { id: 'a3', type: 'action', title: 'View System Health', description: 'Check all services', icon: CheckCircle, path: '/app/dashboard' },
  { id: 'a4', type: 'action', title: 'Create New Workflow', description: 'Start a new automation', icon: Zap, path: '/app/dashboard' },
];

export function Header() {
  const navigate = useNavigate();
  const [notifs, setNotifs] = useState(notifications);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const unreadCount = notifs.filter(n => !n.read).length;

  const filteredItems = searchQuery
    ? searchItems.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : searchItems.slice(0, 8);

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowSearch(true);
        setTimeout(() => inputRef.current?.focus(), 100);
      }
      if (e.key === 'Escape') {
        setShowSearch(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle arrow keys in search
  useEffect(() => {
    if (!showSearch) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, filteredItems.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      }
      if (e.key === 'Enter' && filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex]);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showSearch, selectedIndex, filteredItems]);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  // Close on click outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearch(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleSelect = (item: SearchItem) => {
    if (item.path) {
      navigate(item.path);
    }
    if (item.action) {
      item.action();
    }
    setShowSearch(false);
    setSearchQuery('');
  };

  const markAsRead = (id: string) => {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const getIcon = (type: string) => {
    const icons: Record<string, JSX.Element> = {
      success: <CheckCircle className="w-4 h-4 text-emerald-500" />,
      error: <XCircle className="w-4 h-4 text-red-500" />,
      warning: <AlertTriangle className="w-4 h-4 text-amber-500" />,
      info: <Clock className="w-4 h-4 text-blue-500" />
    };
    return icons[type] || icons.info;
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, { label: string; color: string }> = {
      page: { label: 'Page', color: 'text-blue-400' },
      workflow: { label: 'Workflow', color: 'text-purple-400' },
      integration: { label: 'Integration', color: 'text-emerald-400' },
      feature: { label: 'Feature', color: 'text-amber-400' },
      action: { label: 'Action', color: 'text-primary' },
    };
    return labels[type] || { label: type, color: 'text-muted-foreground' };
  };

  return (
    <>
      <header className="h-14 border-b border-border/50 bg-background flex items-center justify-between px-4 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="h-8 w-8 hover:bg-muted rounded-md" />

          {/* Search */}
          <div className="hidden md:flex items-center relative">
            <Search className="absolute left-2.5 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="w-56 pl-8 pr-10 h-8 text-sm bg-muted/30 border-border/50 rounded-md input-base cursor-pointer"
              onClick={() => setShowSearch(true)}
              readOnly
            />
            <div className="absolute right-2 flex items-center gap-0.5 px-1 py-0.5 rounded bg-muted text-[10px] text-muted-foreground">
              <Command className="h-2.5 w-2.5" />K
            </div>
          </div>

          {/* Status */}
          <div className="hidden lg:flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-500 text-xs">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Operational
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 relative">
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-[10px] font-medium text-primary-foreground rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="px-3 py-2 border-b border-border/50">
                <p className="text-sm font-medium">Notifications</p>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifs.map((n) => (
                  <DropdownMenuItem
                    key={n.id}
                    className={`flex items-start gap-3 px-3 py-2.5 cursor-pointer ${!n.read ? 'bg-muted/30' : ''}`}
                    onClick={() => markAsRead(n.id)}
                  >
                    {getIcon(n.type)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{n.title}</p>
                      <p className="text-xs text-muted-foreground truncate">{n.message}</p>
                    </div>
                    <span className="text-[10px] text-muted-foreground">{n.time}</span>
                  </DropdownMenuItem>
                ))}
              </div>
              <div className="px-3 py-2 border-t border-border/50">
                <button className="text-xs text-primary hover:underline">View all</button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 px-2 gap-2">
                <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-medium">
                  DU
                </div>
                <span className="text-sm hidden sm:inline">Demo</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Search Modal */}
      {showSearch && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-[15vh]">
          <div ref={searchRef} className="bg-card border border-border rounded-xl w-full max-w-xl shadow-2xl animate-in">
            {/* Search Input */}
            <div className="flex items-center px-4 border-b border-border">
              <Search className="w-4 h-4 text-muted-foreground mr-3" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search pages, workflows, integrations, features..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent border-0 py-4 text-sm outline-none placeholder:text-muted-foreground"
                autoFocus
              />
              <kbd className="hidden sm:inline-flex h-5 items-center rounded border border-border px-1.5 text-[10px] text-muted-foreground">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-80 overflow-y-auto p-2">
              {filteredItems.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No results found for "{searchQuery}"
                </div>
              ) : (
                filteredItems.map((item, index) => {
                  const typeInfo = getTypeLabel(item.type);
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${index === selectedIndex ? 'bg-muted' : 'hover:bg-muted/50'
                        }`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center">
                        <item.icon className="w-4 h-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                      </div>
                      <span className={`text-[10px] ${typeInfo.color}`}>{typeInfo.label}</span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-border flex items-center gap-4 text-[10px] text-muted-foreground">
              <span><kbd className="px-1 py-0.5 rounded bg-muted">↑↓</kbd> navigate</span>
              <span><kbd className="px-1 py-0.5 rounded bg-muted">↵</kbd> select</span>
              <span><kbd className="px-1 py-0.5 rounded bg-muted">esc</kbd> close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
