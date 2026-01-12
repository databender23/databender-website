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
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/admin/analytics" className="font-bold text-xl text-gray-900">
            Databender Admin
          </Link>
          <div className="flex gap-4">
            <Link
              href="/admin/analytics"
              className="text-gray-600 hover:text-teal-500 transition-colors"
            >
              Analytics
            </Link>
            <Link
              href="/"
              target="_blank"
              className="text-gray-600 hover:text-teal-500 transition-colors"
            >
              View Site
            </Link>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="text-gray-600 hover:text-red-500 transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
