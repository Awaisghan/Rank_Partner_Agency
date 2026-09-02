import type { Metadata } from "next";
import AdminSidebar from "./components/AdminSidebar";

export const metadata: Metadata = {
  title: "Admin Panel — Rank Partner",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen w-full bg-[#f1f5f9]">
      <AdminSidebar />
      <main className="flex-1 w-full min-w-0 overflow-y-auto">{children}</main>
    </div>
  );
}
