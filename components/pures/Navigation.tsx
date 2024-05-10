"use client";

import { useState, useEffect } from "react";
import { Button } from "../ui/button";

export default function Navigation() {
  const [isVisible, setIsVisible] = useState(true);
  const [prevScroll, setPrevScroll] = useState(0);

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
      className={`h-20 w-full fixed z-[999] top-0 left-0 right-0 transition-all duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="h-full w-11/12 mx-auto flex justify-between items-center">
        <div className="w-1/2">Logo</div>
        <div className="w-1/2 flex justify-end gap-2">
          {/* TODO: ocultar los botones en modo mobile */}
          <Button
            className="sm:w-1/4"
            variant={"secondary"}
          >
            Lo quiero en mi club
          </Button>
          <Button className="sm:w-1/4">
            <a href="api/auth/login">Iniciar sesión</a>
          </Button>
        </div>
      </nav>
    </header>
  );
}
