import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";

import { cn } from "@/lib/utils";
import Navigation from "@/components/pures/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sale partidito",
  description: "¡Reservá tu cancha y organizá tu próximo partido!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <UserProvider>
        <body
          className={cn(
            "w-full bg-background font-sans antialiased",
            inter.className
          )}
        >
          <Navigation />
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
