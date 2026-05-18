import { Link, useRouter } from "@tanstack/react-router";
import {
  LayoutDashboard,
  FileText,
  Users,
  CreditCard,
  FolderOpen,
  LogOut,
  Menu,
  X,
  GraduationCap,
} from "lucide-react";
import { useState } from "react";
import { adminLogout } from "@/lib/admin-store";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/applications", label: "Applications", icon: Users },
  { to: "/admin/payments", label: "Payments", icon: CreditCard },
  { to: "/admin/content", label: "Content", icon: FileText },
  { to: "/admin/documents", label: "Documents", icon: FolderOpen },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    adminLogout();
    router.navigate({ to: "/admin" });
  };

  return (
    <div className="flex h-screen bg-secondary overflow-hidden">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-navy text-white flex flex-col transition-transform duration-200 lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center gap-3 px-5 py-5 border-b border-white/10">
          <div className="w-10 h-10 rounded-lg bg-gold grid place-items-center">
            <GraduationCap className="text-navy" size={22} />
          </div>
          <div>
            <p className="font-display font-bold text-sm leading-tight">Kokstad College</p>
            <p className="text-[10px] text-white/60 uppercase tracking-widest">Admin Portal</p>
          </div>
          <button className="ml-auto lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              activeProps={{
                className:
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium bg-white/15 text-white",
              }}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-white/10">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/10 transition-colors mb-1"
          >
            <GraduationCap size={18} />
            View Website
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-red-400 hover:bg-white/10 transition-colors w-full"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b px-4 py-3 flex items-center gap-4 shrink-0">
          <button className="lg:hidden p-1" onClick={() => setSidebarOpen(true)}>
            <Menu size={22} className="text-navy" />
          </button>
          <h1 className="font-display text-lg text-navy font-bold">Admin Portal</h1>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
