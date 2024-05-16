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
import { Club, Court } from "@/lib/models";
import { mapClubLocation, mapClubTitle } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";

const ClubPage = ({ params }: { params: { id: string } }) => {
  const [club, setClub] = useState<Club>();
  const [courts, setCourts] = useState<Court[]>();

  useEffect(() => {
    getClubById(params.id).then((res) => setClub(res));
  }, [params.id]);

  useEffect(() => {
    if (club) getCourtsByClubId(club.id).then((res) => setCourts(res));
  }, [club]);

  return (
    <main className="w-11/12 mx-auto mt-24">
      {club ? (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/clubs/${club.location}`}>
                  Clubes en {mapClubLocation(club.location)}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{mapClubTitle(club.name)}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      ) : (
        <Skeleton className="w-full sm:w-1/4 h-6" />
      )}
      {club && (
        <section>
          <h3>{mapClubTitle(club.name)}</h3>
          {courts && courts.length > 0 ? (
            <ul>
              {courts.map((court: Court) => (
                <li>{court.name}</li>
              ))}
            </ul>
          ) : (
            <span>No hay canchas</span>
          )}
        </section>
      )}
    </main>
  );
};

export default ClubPage;
