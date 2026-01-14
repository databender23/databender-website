"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminNav() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  return (
    <nav className="bg-bg-primary border-b border-border">
      <div className="container py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/admin/analytics" className="font-bold text-xl text-text-primary">
            Databender Admin
          </Link>
          <div className="flex gap-6">
            <Link
              href="/admin/analytics"
              className="text-text-secondary hover:text-teal-500 transition-colors text-sm font-medium"
            >
              Analytics
            </Link>
            <Link
              href="/admin/leads"
              className="text-text-secondary hover:text-teal-500 transition-colors text-sm font-medium"
            >
              Leads
            </Link>
            <Link
              href="/"
              target="_blank"
              className="text-text-secondary hover:text-teal-500 transition-colors text-sm font-medium"
            >
              View Site
            </Link>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="text-text-muted hover:text-error transition-colors text-sm font-medium"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
