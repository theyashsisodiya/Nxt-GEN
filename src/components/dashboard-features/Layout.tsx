
import { Outlet } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard-features/AppSidebar";
import { Header } from "@/components/dashboard-features/Header";

const Layout = () => {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full bg-background noise-overlay">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
          <Header />
          <main className="flex-1 p-6 overflow-auto">
            <div className="max-w-[1600px] mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
