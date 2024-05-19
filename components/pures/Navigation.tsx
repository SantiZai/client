"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const Navigation = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [prevScroll, setPrevScroll] = useState(0);

  const { user, error, isLoading } = useUser();

  useEffect(() => {}, [user]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shouldShowNavbar = scrollY === 0 || prevScroll > scrollY;
      setIsVisible(shouldShowNavbar);
      setPrevScroll(scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScroll]);

  return (
    <header
      className={`h-20 w-full fixed z-[999] bg-slate-300/50 top-0 left-0 right-0 transition-all duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="h-full w-11/12 mx-auto flex justify-between items-center">
        <div className="w-1/2">Logo</div>
        <div className="w-1/2 flex justify-end items-center gap-2">
          {/* TODO: ocultar los botones en modo mobile */}
          <Button
            className="sm:w-1/2 lg:w-1/3 xl:w-1/4"
            variant={"secondary"}
          >
            Lo quiero en mi club
          </Button>
          {isLoading ? (
            <span>Cargando...</span>
          ) : error ? (
            <span>{error.message}</span>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div
                  className="flex gap-1 items-center cursor-pointer"
                  onClick={() => console.log() /*TODO: abrir menu desplegable*/}
                >
                  <Image
                    src={user.picture as string}
                    alt="User picture"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <span>{user.name}</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="z-[1000] p-4">
                <div className="w-full flex flex-col items-center mb-2">
                  <Image
                    src={user.picture as string}
                    alt="User picture"
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                  <DropdownMenuLabel className="text-lg">
                    {user.name}
                  </DropdownMenuLabel>
                </div>
                <DropdownMenuSeparator />
                <div className="flex flex-col gap-2 my-4">
                  <span className="font-bold text-sm">
                    Datos proporcionados
                  </span>
                  <span className="text-sm font-light">{user.email}</span>
                  <span className="text-sm font-light">+54 9 0000000000</span>
                </div>
                <DropdownMenuSeparator />
                <div className="flex flex-col gap-2 my-4">
                  <span className="text-sm">Mis reservas</span>
                  <span className="text-sm">Mis partidos</span>
                  <span className="text-sm">Mi perfil</span>
                  <Link
                    href="/api/auth/logout"
                    className="text-sm"
                  >
                    Cerrar sesión
                  </Link>
                </div>
                <DropdownMenuSeparator />
                <span className="text-xs text-center hover:underline">
                  Términos y condiciones
                </span>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button className="sm:w-1/2 lg:w-1/3 xl:w-1/4">
              <Link href="/api/auth/login">Iniciar sesión</Link>
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
