import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";

import { cn } from "@/lib/utils";

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
            "min-h-screen w-11/12 bg-background font-sans antialiased mx-auto",
            inter.className
          )}
        >
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
