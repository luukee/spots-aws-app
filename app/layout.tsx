import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SPOTS - Supporting Pediatric Oncology Treatment Success",
  description: "A Next.js web app that helps children and teens with cancer and their parents track how the child/teen is feeling throughout their cancer treatments and to communicate that information to their health care team.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
