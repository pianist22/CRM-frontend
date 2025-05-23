import Navbar from "@/components/Navbar";

export default function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />
      <main className="pt-16">{children}</main>
    </>
  );
}