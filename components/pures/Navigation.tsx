'use client';

import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { createUser, getUserByEmail } from '@/lib/data';
import { useUserStore } from '@/stores/user/user-store-provider';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { Separator } from '../ui/separator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Navigation = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [prevScroll, setPrevScroll] = useState(0);

  const { user, error, isLoading } = useUser();

  const setUserStore = useUserStore((state) => state.setUser);
  const userId = useUserStore((state) => state.id);

  /**
   * Verify if the user exists
   * If exists set the user store with the user finded
   * If the user don't exists, create the user and set the user store
   */
  useEffect(() => {
    if (user)
      getUserByEmail(user.email as string).then((res) => {
        if (res.statusCode == 404) {
          createUser({
            email: user.email as string,
            fullname: user.name as string,
          }).then((newUser) => {
            setUserStore({
              id: newUser.id,
              fullname: newUser.fullname,
              email: newUser.email,
              phonenumber: newUser.phonenumber,
              reservations: newUser.reservations,
            });
          });
        } else {
          setUserStore({
            id: res.id,
            fullname: res.fullname,
            email: res.email,
            phonenumber: res.phonenumber,
            reservations: res.reservations,
          });
        }
      });
  }, [user]);

  /**
   * Manage the scroll for hide or show the navigation
   */
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shouldShowNavbar = scrollY === 0 || prevScroll > scrollY;
      setIsVisible(shouldShowNavbar);
      setPrevScroll(scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScroll]);

  return (
    <header
      className={`h-20 w-full fixed z-[999] top-0 left-0 right-0 transition-all duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <nav className="h-full w-11/12 mx-auto flex justify-between items-center">
        <div className="w-1/2">Logo</div>
        <div className="w-1/2 sm:hidden flex justify-end">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="link"
                className="text-lg"
              >
                <FontAwesomeIcon icon={faBars} />
              </Button>
            </SheetTrigger>
            <SheetContent className="z-[999] flex flex-col justify-between">
              <SheetHeader className="py-8">
                <SheetTitle>
                  {isLoading ? (
                    <span>Cargando...</span>
                  ) : error ? (
                    <span>{error.message}</span>
                  ) : (
                    user && (
                      <div className="flex flex-col justify-center items-center gap-1">
                        <Image
                          src={user.picture as string}
                          alt="User picture"
                          width={60}
                          height={60}
                          className="rounded-full"
                        />
                        <span className="text-xl">{user.name}</span>
                      </div>
                    )
                  )}
                </SheetTitle>
                <SheetDescription className="w-11/12 mx-auto">
                  {user ? (
                    <>
                      <Separator className="w-full mx-auto my-4" />
                      <div className="flex flex-col items-start mt-4">
                        <Link
                          href={''}
                          className="text-lg text-black"
                        >
                          Inicio
                        </Link>
                        <Link
                          href={''}
                          className="text-lg text-black"
                        >
                          Mi perfil
                        </Link>
                        <Link
                          href={`/reservations/${userId}`}
                          className="text-lg text-black"
                        >
                          Mis reservas
                        </Link>
                      </div>
                      <Separator className="w-full mx-auto my-4" />
                      <Button className="w-full">
                        <Link
                          href={'/api/auth/logout'}
                          className="text-lg"
                        >
                          Cerrar sesión
                        </Link>
                      </Button>
                      <Separator className="w-full mx-auto my-4" />
                      <Link
                        href="/privacy-policy"
                        className="text-slate-500 text-center text-sm"
                      >
                        Términos y condiciones
                      </Link>
                    </>
                  ) : (
                    <Button className="w-full">
                      <Link
                        href={'/api/auth/login'}
                        className="text-lg"
                      >
                        Iniciar sesión
                      </Link>
                    </Button>
                  )}
                </SheetDescription>
              </SheetHeader>
              <SheetFooter className="w-11/12 mx-auto flex items-center">
                <span>logo</span>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
        <div className="w-1/2 hidden sm:flex justify-end items-center gap-2">
          <Button
            className="sm:w-1/2 lg:w-1/3 xl:w-1/4"
            variant={'secondary'}
          >
            Lo quiero en mi club
          </Button>
          {isLoading ? (
            <span>Cargando...</span>
          ) : error ? (
            <span>{error.message}</span>
          ) : user ? (
            /* profile dropdown */
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex items-center gap-1 cursor-pointer">
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
                  <Link
                    href={`/reservations/${userId}`}
                    className="text-sm font-semibold"
                  >
                    Mis reservas
                  </Link>
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
                <Link
                  href={`/reservations/${userId}`}
                  className="text-xs hover:underline"
                >
                  Términos y condiciones
                </Link>
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
