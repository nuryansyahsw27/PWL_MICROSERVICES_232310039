"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  BookOpen,
  Users,
  UserCircle,
  X,
} from "lucide-react";

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (
    open: boolean
  ) => void;
}

export default function Sidebar({
  mobileOpen,
  setMobileOpen,
}: SidebarProps) {
  const pathname = usePathname();

  const menus = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Books",
      href: "/books",
      icon: BookOpen,
    },
    {
      name: "Users",
      href: "/users",
      icon: Users,
    },
    {
      name: "Profile",
      href: "/profile",
      icon: UserCircle,
    },
  ];

  return (
    <>
      {/* Overlay Mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() =>
            setMobileOpen(false)
          }
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-64
          bg-slate-900 text-white
          transition-transform duration-300

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:translate-x-0
        `}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
          <h1 className="font-bold text-lg">
            📚 Library Admin
          </h1>

          <button
            className="lg:hidden"
            onClick={() =>
              setMobileOpen(false)
            }
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 space-y-2">
          {menus.map((menu) => {
            const Icon = menu.icon;

            return (
              <Link
                key={menu.href}
                href={menu.href}
                onClick={() =>
                  setMobileOpen(false)
                }
                className={`
                  flex items-center gap-3
                  p-3 rounded-lg
                  transition

                  ${
                    pathname === menu.href
                      ? "bg-blue-600"
                      : "hover:bg-slate-800"
                  }
                `}
              >
                <Icon size={18} />
                {menu.name}
              </Link>
            );
          })}
        </div>
      </aside>
    </>
  );
}