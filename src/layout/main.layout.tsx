import { useState, type ReactNode } from "react";
import { DashboardMenuButton } from "./components/menu";
import NavbarField from "./components/nav";
import {
  BookText,
  Flag,
  LayoutGrid,
  Lock,
  Settings,
  UserPen,
  Menu,
  X  
} from "lucide-react";
import { DashboardDropdownMenu } from "./components/drop-down-menu";

function MainLayout({ children }: { children: ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Common Menu Content to avoid repetition
  const MenuContent = () => (
    <>
      <DashboardMenuButton Icon={LayoutGrid} text="Dashboard" pageLink="Dashboard" />
      <DashboardMenuButton Icon={UserPen} text="User Management" pageLink="user-management" />
      <DashboardMenuButton Icon={BookText} text="CMS" pageLink="cms" />
      <DashboardMenuButton Icon={Flag} text="Reporting" pageLink="user-reports" />
      <DashboardDropdownMenu
        Icon={Settings}
        text="Setting"
        subItems={[
          { text: "User Profile", Icon: UserPen, pageLink: "update-profile" },
          { text: "Reset Password", Icon: Lock, pageLink: "reset-password" },
        ]}
      />
    </>
  );

  return (
    <section className="min-h-screen bg-primary-bg-0">
      {/* Navigation Bar - Pass toggle state if needed */}
      <div className="sticky top-0 z-50">
        <NavbarField onMenuClick={() => setIsMobileMenuOpen(true)} />
      </div>

      <section className="relative grid grid-cols-6">
        
        {/* --- MOBILE DRAWER --- */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
        
        {/* Sidebar Panel */}
        <aside className={`
          fixed top-0 left-0 h-full w-[280px] bg-primary-bg-0 z-[70] p-6 border-r border-gray-800
          transition-transform duration-300 ease-in-out md:hidden
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}>
          <div className="flex justify-between items-center mb-8">
            <span className="text-[#D4A017] font-bold tracking-widest text-sm uppercase">Navigation</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-400" aria-label="Open navigation menu">
              <X className="size-6" />
            </button>
          </div>
          <MenuContent />
        </aside>

        {/* --- DESKTOP SIDEBAR --- */}
        <aside className="col-span-1 pl-6 border-r border-gray-800 mt-6 hidden md:block">
          <MenuContent />
        </aside>

        {/* --- MAIN CONTENT AREA --- */}
        <main className="col-span-6 md:col-span-5 bg-secondary-bg-0 p-4 md:p-8 min-h-screen">
          <div className="max-w-[1400px] mx-auto">
            {children}
          </div>
        </main>
      </section>
    </section>
  );
}

export default MainLayout;