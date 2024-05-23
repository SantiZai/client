"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { getClubById, getCourtById } from "@/lib/data";
import { Club, Court } from "@/lib/models";
import { mapClubLocation, mapClubTitle } from "@/lib/utils";
import { UserState } from "@/stores/user/user-store";
import { useUserStore } from "@/stores/user/user-store-provider";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const CreateReservationPage = ({ params }: { params: { clubId: string } }) => {
  const [day, setDay] = useState<string>("");
  const [hour, setHour] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [clubId, setClubId] = useState<string>("");
  const [courtId, setCourtId] = useState<string>("");
  const [userStore, setUserStore] = useState<UserState>();

  const [club, setClub] = useState<Club>();
  const [court, setCourt] = useState<Court>();

  const { user } = useUser();

  const { id, fullname, email, phonenumber, reservations } = useUserStore(
    (state) => state
  );

  const searchParams = useSearchParams();

  useEffect(() => {
    setHour(searchParams.get("hour") as string);
    setDay(searchParams.get("day") as string);
    setDuration(searchParams.get("duration") as string);
    setCourtId(searchParams.get("courtId") as string);
    setClubId(params.clubId);
  }, [day, hour, duration, courtId, params.clubId]);

  useEffect(() => {
    setUserStore({ id, fullname, email, phonenumber, reservations });
  }, [user]);

  useEffect(() => {
    clubId && getClubById(clubId).then((res) => setClub(res));
    courtId && getCourtById(courtId).then((res) => setCourt(res));
  }, [clubId, courtId]);

  return (
    <main className="mt-20 sm:mt-20">
      <section className="w-11/12 h-auto mx-auto">
        {club && court && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="hidden sm:block">
                {clubId ? (
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                          <Link
                            href={`/clubs/${club.location}`}
                            className="text-lg"
                          >
                            Clubes en {mapClubLocation(club.location)}
                          </Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbLink asChild>
                        <Link
                          href={`/clubs/${club.location}/${clubId}`}
                          className="text-lg"
                        >
                          {mapClubTitle(club.name)}
                        </Link>
                      </BreadcrumbLink>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage className="text-lg">
                          Nueva reserva
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                ) : (
                  <Skeleton className="w-full sm:w-1/2 md:w-1/3 h-6" />
                )}
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="text-3xl font-bold">Ya casi estamos!</h4>
                <p className="sm:text-lg text-balance">
                  Para confirmar tu reserva en {mapClubTitle(club.name)} chequeá
                  tus datos y confirmalos a continuación.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <Card className="w-full py-6">
                <CardContent>
                  <div className="flex items-center space-x-2 mb-4">
                    <CircleCheckIcon className="text-green-500" />
                    <h2 className="text-xl font-semibold">
                      {court.sport} - {mapClubTitle(club.name)}
                    </h2>
                  </div>
                  <div className="flex items-center mb-4">
                    <img
                      alt="Club Sport Salto logo"
                      className="h-12 w-12"
                      height="60"
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "60/60",
                        objectFit: "cover",
                      }}
                      width="60"
                    />
                    <div className="ml-4">
                      <div className="flex items-center">
                        <StarIcon className="text-yellow-400" />
                        <StarIcon className="text-yellow-400" />
                        <StarIcon className="text-yellow-400" />
                        <StarIcon className="text-yellow-400" />
                        <StarIcon className="text-yellow-400" />
                      </div>
                      <address className="not-italic text-sm">
                        {club.address} <br /> {mapClubLocation(club.location)}
                      </address>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <CalendarIcon className="mb-1" />
                      <p className="text-sm">Fecha</p>
                      <p className="font-bold text-sm">vie. 24/05/2024</p>
                    </div>
                    <div>
                      <ClockIcon className="mb-1" />
                      <p className="text-sm">Turno</p>
                      <p className="font-bold text-sm">11:30 - 12:30</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <MapPinIcon className="mb-1" />
                    <p className="text-sm">
                      {court.name} - {court.sport}
                    </p>
                    <p className="text-sm">
                      {court.surface},{" "}
                      {court.lightning ? "Con iluminación" : "Sin iluminación"},
                      Descubierta
                    </p>
                  </div>
                  <div>
                    <CurrencyIcon className="mb-1" />
                    <p className="text-sm">Precio</p>
                    <p className="font-bold text-sm">$ 2500</p>
                  </div>
                </CardContent>
              </Card>
              <div>
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Información personal</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center mb-4">
                      <PersonStandingIcon className="mr-2" />
                      <Input
                        className="w-full"
                        disabled
                        placeholder={fullname}
                      />
                    </div>
                    <div className="flex items-center mb-4">
                      <PhoneIcon className="mr-2" />
                      <Input
                        className="w-full"
                        disabled
                        placeholder={phonenumber ? phonenumber : "-"}
                      />
                    </div>
                    <div className="flex items-center">
                      <MailIcon className="mr-2" />
                      <Input
                        className="w-full"
                        disabled
                        placeholder={email}
                      />
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Sobre el pago</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-sm md:text-base">
                      Este complejo no exige la carga de una tarjeta como
                      garantía para confirmar su reserva. Simplemente complete
                      sus datos y presione el botón "Confirmar Reserva". Tené en
                      cuenta que para cancelar el turno debes hacerlo con 24hs
                      de anticipación, sino se aplicará una penalización.
                    </p>
                    <Button className="w-full">Confirmar reserva</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

function CalendarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect
        width="18"
        height="18"
        x="3"
        y="4"
        rx="2"
      />
      <path d="M3 10h18" />
    </svg>
  );
}

function CircleCheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
      />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function ClockIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
      />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CurrencyIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle
        cx="12"
        cy="12"
        r="8"
      />
      <line
        x1="3"
        x2="6"
        y1="3"
        y2="6"
      />
      <line
        x1="21"
        x2="18"
        y1="3"
        y2="6"
      />
      <line
        x1="3"
        x2="6"
        y1="21"
        y2="18"
      />
      <line
        x1="21"
        x2="18"
        y1="21"
        y2="18"
      />
    </svg>
  );
}

function MailIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect
        width="20"
        height="16"
        x="2"
        y="4"
        rx="2"
      />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function MapPinIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle
        cx="12"
        cy="10"
        r="3"
      />
    </svg>
  );
}

function PersonStandingIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle
        cx="12"
        cy="5"
        r="1"
      />
      <path d="m9 20 3-6 3 6" />
      <path d="m6 8 6 2 6-2" />
      <path d="M12 10v4" />
    </svg>
  );
}

function PhoneIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function StarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export default CreateReservationPage;
