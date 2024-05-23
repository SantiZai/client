import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";

import { cn } from "@/lib/utils";
import Navigation from "@/components/pures/Navigation";
import { UserStoreProvider } from "@/stores/user/user-store-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sale partidito",
  description: "¡Reservá tu cancha y organizá tu próximo partido!",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="es">
      <UserStoreProvider>
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
      </UserStoreProvider>
    </html>
  );
};

export default RootLayout;
