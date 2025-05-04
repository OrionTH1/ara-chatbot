import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Furia Chat Bot",
  description: "Your Chat Bot to answer questions about Furia",
};

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="white">
      <body className={`${poppins.className} text-white`}>{children}</body>
    </html>
  );
}
