"use client";

import { useState, useEffect } from "react";

export default function Navigation() {
  const [isVisible, setIsVisible] = useState(true);
  const [prevScroll, setPrevScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shouldShowNavbar = scrollY === 0 || scrollY >= 720 || prevScroll > scrollY;
      setIsVisible(shouldShowNavbar);
      setPrevScroll(scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScroll]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      esta es la navegacion
    </nav>
  );
}
