"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { getClubById, getCourtsByClubId } from "@/lib/data";
import { Club, Court, SERVICES, SPORTS } from "@/lib/models";
import { mapClubLocation, mapClubTitle, mapService, mapSport } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faLocationDot,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import InfiniteHorizontalScroll from "@/components/pures/InfiniteHorizontalScroll";
import {
  generateAvailableHoursPerClub,
  largeTurnIsPossible,
  verifyDisponibility,
} from "@/lib/manageReservationHours";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";

import dynamic from "next/dynamic";
import SwitchServiceIcon from "@/components/pures/SwitchServiceIcon";
const Map = dynamic(() => import("@/components/pures/Map"), { ssr: false });

const ClubPage = ({ params }: { params: { id: string } }) => {
  const [club, setClub] = useState<Club>();
  const [selectedHour, setSelectedHour] = useState<string>("00:00");
  const [availableCourts, setAvailableCourts] = useState<Court[]>();
  const [sport, setSport] = useState<SPORTS>();
  const [date, setDate] = useState<Date>();
  const [formattedDate, setFormattedDate] = useState<string>("");

  const searchParams = useSearchParams();

  useEffect(() => {
    getClubById(params.id).then((res) => setClub(res));
    setSport(searchParams.get("sport") as SPORTS);
  }, [params.id]);

  useEffect(() => {
    if (club) getCourtsByClubId(club.id).then((res) => setAvailableCourts(res));
  }, [club]);

  useEffect(() => {
    if (club && selectedHour)
      setAvailableCourts(
        verifyDisponibility(club, selectedHour, formattedDate)
      );
  }, [selectedHour]);

  useEffect(() => {
    if (date) {
      const fecha = new Date(date as Date);
      const dia = fecha.getDate().toString().padStart(2, "0");
      const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
      const anio = fecha.getFullYear();
      setFormattedDate(`${dia}-${mes}-${anio}`);
    }
  }, [date]);

  return (
    <main className="mt-20 sm:mt-24">
      <section className="hidden sm:block">
        {club ? (
          <Breadcrumb className="w-11/12 mx-auto">
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
              <BreadcrumbItem>
                <BreadcrumbPage className="text-lg">
                  {mapClubTitle(club.name)}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        ) : (
          <div className="w-11/12 mx-auto">
            <Skeleton className="w-full sm:w-1/2 md:w-1/3 h-6" />
          </div>
        )}
      </section>

      {club && (
        <section className="sm:mt-4">
          {/* mobile version */}
          <div className="w-full block md:hidden relative">
            <Image
              src={club.image}
              alt={`${club.name} banner picture`}
              height={200}
              width={500}
              priority
              className="w-full h-auto aspect-auto"
            />
            <div className="w-full h-10 absolute -bottom-1 left-0 bg-background rounded-t-3xl">
              <div className="w-11/12 mx-auto mt-4 flex justify-between items-center">
                <h3 className="text-xl">{mapClubTitle(club.name)}</h3>
                <div className="w-12 h-12 border-2 border-orange-300 active:bg-orange-300 text-orange-300 active:text-black transition-all rounded-full p-4 flex justify-center items-center">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="text-2xl"
                  />
                </div>
              </div>
              <Separator className="w-11/12 mx-auto my-4" />

              <div className="w-11/12 mx-auto mb-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-full pl-3 text-left font-normal"
                    >
                      {date ? (
                        format(date, "PPP")
                      ) : (
                        <span>Seleccione una fecha</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0"
                    align="center"
                  >
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => {
                        const today = new Date();
                        return (
                          date < today || date.getDate() > today.getDate() + 7
                        );
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <InfiniteHorizontalScroll
                hours={generateAvailableHoursPerClub(club, formattedDate)}
                setSelectedHour={setSelectedHour}
                selectedHour={selectedHour}
                blocked={formattedDate.length < 1}
              />

              <div className="w-11/12 mx-auto">
                {!selectedHour ? (
                  <span>Seleccione un horario</span>
                ) : availableCourts ? (
                  <ul className="mt-4">
                    {availableCourts.map((court: Court) => (
                      <>
                        <li
                          key={court.id}
                          className="mt-2 py-2"
                        >
                          <span>{court.name}</span>
                          <div className="flex justify-between font-lg mt-2">
                            <span>60 minutos</span>
                            <span>
                              <Link
                                href={`/create-reservation/${club.id}?courtId=${court.id}&day=${formattedDate}&hour=${selectedHour}&duration=short`}
                              >
                                <FontAwesomeIcon icon={faArrowRight} />
                              </Link>
                            </span>
                          </div>
                          {/* TODO: mostrar para sacar turnos largos dependiendo de los turnos siguientes */}
                          {selectedHour &&
                            largeTurnIsPossible(court, selectedHour) && (
                              <Accordion
                                type="single"
                                collapsible
                              >
                                <AccordionItem value="duration">
                                  <AccordionTrigger className="text-sm">
                                    Otras duraciones
                                  </AccordionTrigger>
                                  <AccordionContent className="flex justify-between">
                                    <span>90 minutos</span>
                                    <span>
                                      <Link
                                        href={`/create-reservation/${club.id}?courtId=${court.id}&day=${formattedDate}&hour=${selectedHour}&duration=large`}
                                      >
                                        <FontAwesomeIcon icon={faArrowRight} />
                                      </Link>
                                    </span>
                                  </AccordionContent>
                                </AccordionItem>
                              </Accordion>
                            )}
                        </li>
                        {availableCourts.indexOf(court) !==
                          availableCourts.length - 1 && <Separator />}
                      </>
                    ))}
                  </ul>
                ) : (
                  <span>No hay canchas</span>
                )}
              </div>
            </div>
          </div>

          {/* desktop version */}
          <div className="hidden md:flex md:flex-col w-11/12 mx-auto">
            <div className="flex flex-col lg:flex-row w-full">
              <div className="w-full lg:w-1/2 flex flex-col">
                <Image
                  src={club.image}
                  alt={`${club.name} banner picture`}
                  height={200}
                  width={500}
                  priority
                  className="w-full h-auto aspect-auto rounded-t-lg"
                />
                <div className="w-full flex justify-between rounded-b-lg border-b-2 shadow-lg p-4 pt-6">
                  <div>
                    <h4 className="text-2xl">{mapSport(sport!)}</h4>
                    <h5 className="text-xl">
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        className="mr-2"
                      />
                      {mapClubLocation(club.location)}
                    </h5>
                  </div>
                  <div>
                    <span className="text-2xl">
                      5 <FontAwesomeIcon icon={faStar} />
                    </span>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/2">
                <div className="w-full lg:w-11/12 mx-auto mb-4">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className="w-full pl-3 text-left font-normal"
                      >
                        {date ? (
                          format(date, "PPP")
                        ) : (
                          <span>Seleccione una fecha</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0"
                      align="center"
                    >
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={(date) => {
                          const today = new Date();
                          return (
                            date < today || date.getDate() > today.getDate() + 7
                          );
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <InfiniteHorizontalScroll
                  hours={generateAvailableHoursPerClub(club, formattedDate)}
                  setSelectedHour={setSelectedHour}
                  selectedHour={selectedHour}
                  blocked={formattedDate.length < 1}
                />

                <div className="w-full lg:w-11/12 mx-auto">
                  {!selectedHour ? (
                    <span>Seleccione un horario</span>
                  ) : availableCourts ? (
                    <ul className="mt-4">
                      {availableCourts.map((court: Court) => (
                        <>
                          <li
                            key={court.id}
                            className="mt-2 py-2"
                          >
                            <span>{court.name}</span>
                            <div className="flex justify-between font-lg mt-2">
                              <span>60 minutos</span>
                              <span>
                                <Link
                                  href={`/create-reservation/${club.id}?courtId=${court.id}&day=${formattedDate}&hour=${selectedHour}&duration=short`}
                                >
                                  <FontAwesomeIcon icon={faArrowRight} />
                                </Link>
                              </span>
                            </div>
                            {/* TODO: mostrar para sacar turnos largos dependiendo de los turnos siguientes */}
                            {selectedHour &&
                              largeTurnIsPossible(court, selectedHour) && (
                                <Accordion
                                  type="single"
                                  collapsible
                                >
                                  <AccordionItem value="duration">
                                    <AccordionTrigger className="text-sm">
                                      Otras duraciones
                                    </AccordionTrigger>
                                    <AccordionContent className="flex justify-between">
                                      <span>90 minutos</span>
                                      <span>
                                        <Link
                                          href={`/create-reservation/${club.id}?courtId=${court.id}&day=${formattedDate}&hour=${selectedHour}&duration=large`}
                                        >
                                          <FontAwesomeIcon
                                            icon={faArrowRight}
                                          />
                                        </Link>
                                      </span>
                                    </AccordionContent>
                                  </AccordionItem>
                                </Accordion>
                              )}
                          </li>
                          {availableCourts.indexOf(court) !==
                            availableCourts.length - 1 && <Separator />}
                        </>
                      ))}
                    </ul>
                  ) : (
                    <span>No hay canchas</span>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full flex gap-2">
              <div className="w-1/3">
                <div className="w-full flex flex-col gap-4">
                  <div className="w-full flex flex-col border-2 shadow-lg rounded-xl p-4">
                    <span className="font-semibold text-lg">Ubicación</span>
                    <Separator />
                    <span className="mt-1">
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        className="mr-2"
                      />
                      {mapClubLocation(club.location)}
                    </span>
                  </div>
                  <div></div>
                  <div className="w-full flex flex-col border-2 shadow-lg rounded-xl p-4">
                    <span className="font-semibold text-lg">Servicios</span>
                    <Separator />
                    <span className="mt-1 flex gap-6 flex-wrap">
                      {club.services.map((service: SERVICES, index: number) => (
                        <span key={index}><SwitchServiceIcon service={service} />{mapService(service)}</span>
                      ))}
                    </span>
                  </div>
                </div>
              </div>
              <Map position={[-34.2785692, -60.2487025]} popupText={mapClubTitle(club.name)} />
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
        </section>
      )}
    </main>
  );
};

export default ClubPage;
