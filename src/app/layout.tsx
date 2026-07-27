import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SparklesBackground from "../components/SparklesBackground";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Fresh - Farm Fresh Delivery",
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
        {/* Load Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,200..900;1,7..72,200..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap"
          rel="stylesheet"
        />
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
            <main className="flex-grow w-full">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
