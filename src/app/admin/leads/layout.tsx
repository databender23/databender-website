import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/admin/auth";
import AdminNav from "../analytics/components/AdminNav";

export default async function LeadsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />
      <main className="p-6 max-w-7xl mx-auto">
        {children}
      </main>
    </div>
  );
}
