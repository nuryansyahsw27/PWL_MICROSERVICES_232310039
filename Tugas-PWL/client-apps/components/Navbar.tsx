"use client";

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import { useRouter } from "next/navigation";

import { useAuth } from "@/contexts/AuthContext";

interface NavbarProps {
  setMobileOpen: (
    open: boolean
  ) => void;
}

export default function Navbar({
  setMobileOpen,
}: NavbarProps) {
  const router = useRouter();

  const {
    user,
    logout,
  } = useAuth();

  const doLogout = () => {
    logout();
    router.push("/sign-in");
  };

  return (
    <header className="bg-white border-b h-16 px-4 md:px-6 flex items-center justify-between">

      <div className="flex items-center gap-3">

        <button
          className="lg:hidden"
          onClick={() =>
            setMobileOpen(true)
          }
        >
          <Menu size={24} />
        </button>

        <h2 className="font-semibold">
          Dashboard
        </h2>

      </div>

      <div className="flex items-center gap-3">

        <Avatar>
          <AvatarFallback>
            {user?.username
              ?.charAt(0)
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="hidden md:block">
          <p className="font-medium">
            {user?.username}
          </p>

          <p className="text-xs text-gray-500">
            {user?.email}
          </p>
        </div>

        <Button
          size="sm"
          variant="destructive"
          onClick={doLogout}
        >
          Logout
        </Button>

      </div>
    </header>
  );
}