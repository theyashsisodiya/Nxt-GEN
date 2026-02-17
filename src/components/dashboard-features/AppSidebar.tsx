import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Radar,
  Puzzle,
  MessageSquareText,
  KeyRound,
  LifeBuoy,
  MessagesSquare,
  Cpu,
  FileText,
  LogOut,
  Settings,
  Book,
  Server
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from "@/components/ui/sidebar";

const mainNav = [
  { title: "Dashboard", url: "/app/dashboard", icon: LayoutDashboard },
  { title: "Live Ops", url: "/app/live-ops", icon: Radar },
  { title: "Integrations", url: "/app/integrations", icon: Puzzle },
  { title: "MCP Servers", url: "/app/mcp", icon: Server },
  { title: "Console", url: "/app/chat", icon: MessageSquareText },
];

const secondaryNav = [
  { title: "Use Cases", url: "/app/use-cases", icon: FileText },
  { title: "Credentials", url: "/app/credentials", icon: KeyRound },
];

const supportNav = [
  { title: "Documentation", url: "/app/docs", icon: Book },
  { title: "Support", url: "/app/support", icon: LifeBuoy },
  { title: "Feedback", url: "/app/feedback", icon: MessagesSquare },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const NavItem = ({ item }: { item: { title: string; url: string; icon: any } }) => {
    const active = currentPath === item.url;

    return (
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <NavLink
            to={item.url}
            end
            className={`
              group flex items-center gap-3 px-3 py-2 rounded-lg text-sm
              transition-colors duration-150
              ${active
                ? "bg-sidebar-accent text-sidebar-foreground font-medium"
                : "text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
              }
              ${collapsed ? "justify-center" : ""}
            `}
            title={collapsed ? item.title : undefined}
          >
            {active && (
              <div className="absolute left-0 w-0.5 h-4 bg-primary rounded-r" />
            )}
            <item.icon className={`h-4 w-4 flex-shrink-0 ${active ? "text-primary" : ""}`} />
            {!collapsed && <span>{item.title}</span>}
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-60"} transition-all duration-200 border-r border-sidebar-border/50`}
      collapsible="icon"
    >
      <SidebarContent className="sidebar-base flex flex-col">
        {/* Logo */}
        <div className={`${collapsed ? "p-3" : "px-4 py-5"} border-b border-sidebar-border/50`}>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <Cpu className="w-4 h-4 text-primary-foreground" />
            </div>
            {!collapsed && (
              <span className="text-base font-semibold text-sidebar-foreground">Nxt-Gen</span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className={`flex-1 ${collapsed ? "px-2" : "px-3"} py-4 overflow-y-auto space-y-6`}>
          {/* Main */}
          <SidebarGroup>
            {!collapsed && (
              <p className="px-3 mb-2 text-[10px] font-medium text-sidebar-foreground/40 uppercase tracking-wider">
                Main
              </p>
            )}
            <SidebarGroupContent>
              <SidebarMenu className="space-y-0.5">
                {mainNav.map((item) => (
                  <NavItem key={item.title} item={item} />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Resources */}
          <SidebarGroup>
            {!collapsed && (
              <p className="px-3 mb-2 text-[10px] font-medium text-sidebar-foreground/40 uppercase tracking-wider">
                Resources
              </p>
            )}
            <SidebarGroupContent>
              <SidebarMenu className="space-y-0.5">
                {secondaryNav.map((item) => (
                  <NavItem key={item.title} item={item} />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* Support */}
          <SidebarGroup>
            {!collapsed && (
              <p className="px-3 mb-2 text-[10px] font-medium text-sidebar-foreground/40 uppercase tracking-wider">
                Support
              </p>
            )}
            <SidebarGroupContent>
              <SidebarMenu className="space-y-0.5">
                {supportNav.map((item) => (
                  <NavItem key={item.title} item={item} />
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        {/* Footer */}
        <div className={`${collapsed ? "p-2" : "p-3"} border-t border-sidebar-border/50`}>
          {!collapsed && (
            <div className="flex items-center gap-2.5 px-3 py-2 mb-2">
              <div className="w-7 h-7 bg-sidebar-accent rounded-full flex items-center justify-center text-xs font-medium">
                DU
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Demo User</p>
                <p className="text-[10px] text-sidebar-foreground/50">Enterprise</p>
              </div>
              <Settings className="w-4 h-4 text-sidebar-foreground/40 hover:text-sidebar-foreground cursor-pointer" />
            </div>
          )}

          <button
            className={`
              w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm
              text-sidebar-foreground/50 hover:text-red-400 hover:bg-red-500/10
              transition-colors duration-150
              ${collapsed ? "justify-center" : ""}
            `}
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span>Sign out</span>}
          </button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
