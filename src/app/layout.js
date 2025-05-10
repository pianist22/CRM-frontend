import "./globals.css";
import { Inter } from "next/font/google";
import AuthProvider from "@/providers/SessionProvider";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CRM Platform",
  description: "A mini CRM platform for customer segmentation and campaigns",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}