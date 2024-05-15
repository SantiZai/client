"use client";

import FilterClubs from "@/components/sections/FilterCLubs";
import FilteredClubs from "@/components/sections/FilteredClubs";
import { getClubsByLocation, getClubsByLocationAndSport } from "@/lib/data";
import { Club, SPORTS } from "@/lib/models";
import { useEffect, useState } from "react";

export default function FindedClubs({
  params,
}: {
  params: { search: string };
}) {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [location, setLocation] = useState<string>(params.search);
  const [sport, setSport] = useState<SPORTS>(SPORTS.tennis);
  const [date, setDate] = useState<Date>();
  const [hour, setHour] = useState<string>();

  useEffect(() => {
    getClubsByLocation(params.search).then((res) => setClubs(res));
  }, [params.search]);

  useEffect(() => {
    getClubsByLocationAndSport(location, sport).then((res) => setClubs(res));
  }, [location, sport, date, hour]);

  return (
    <main className="mt-24">
      <FilterClubs
        setLocation={setLocation}
        setSport={setSport}
        date={date}
        setDate={setDate}
      />
      <FilteredClubs searchedClubs={clubs} />
    </main>
  );
}
