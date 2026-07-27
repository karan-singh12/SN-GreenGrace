import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import Navbar from "../components/Navbar";
import SparklesBackground from "../components/SparklesBackground";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Green Grace - Farm Fresh Delivery",
  description: "Order fresh organic vegetables and fruits online directly from our farms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        {/* Load Google Material Symbols */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col relative">
        <SparklesBackground />
        <CartProvider>
          <Navbar />
          {/* Main content spacer to clear fixed navbar */}
          <div className="relative z-10 flex-1 flex flex-col pt-16 md:pt-20">
            {children}
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
