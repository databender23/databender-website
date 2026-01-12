export const metadata = {
  title: "Admin | Databender",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-[9999] bg-gray-50 overflow-auto">
      {children}
    </div>
  );
}
