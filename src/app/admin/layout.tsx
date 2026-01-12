import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/admin/auth";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Skip auth check for login page
  return <>{children}</>;
}
