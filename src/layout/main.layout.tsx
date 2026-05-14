import type { ReactNode } from "react";
import { DashboardMenuButton } from "./components/menu";
import NavbarField from "./components/nav";
import {
  BookText,
  Flag,
  LayoutGrid,
  MessagesSquare,
  Settings,
  UserPen,
} from "lucide-react";

function MainLayout({ children }: { children: ReactNode }) {
  return (
    <section className="min-h-screen">
      {/* Navigation Bar */}
      <div className="">
        <NavbarField />
      </div>

      {/* menu section start  */}
      <section className="min-h-screen grid grid-cols-6 bg-primary-bg-0 ">
        <section className="col-span-1 border-r border-gray-800 mt-6 hidden md:block">
          <DashboardMenuButton Icon={LayoutGrid} text="Dashboard" />
          <DashboardMenuButton Icon={UserPen} text="User Management" />
          <DashboardMenuButton Icon={BookText} text="CMS" />
          <DashboardMenuButton Icon={Flag} text="Reporting" />
          <DashboardMenuButton
            Icon={MessagesSquare}
            text="Messenger Overside"
          />
          <DashboardMenuButton Icon={Settings} text="Setting" />
        </section>

        <section className="col-span-6 md:col-span-5 bg-secondary-bg-0 p-2 md:pl-8">{children}</section>
      </section>
    </section>
  );
}

export default MainLayout;
