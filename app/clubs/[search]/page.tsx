"use client";

import FilterClubs from "@/components/sections/FilterClubs";
import FilteredClubs from "@/components/sections/FilteredClubs";
import { getClubsByLocation, getClubsByLocationAndSport } from "@/lib/data";
import { Club, SPORTS } from "@/lib/models";
import { useEffect, useState } from "react";

const FindedClubs = ({ params }: { params: { search: string } }) => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [location, setLocation] = useState<string>(params.search);
  const [sport, setSport] = useState<SPORTS>(SPORTS.tennis);
  const [date, setDate] = useState<Date>();
  const [hour, setHour] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getClubsByLocation(params.search)
      .then((res) => setClubs(res))
      .finally(() => setIsLoading(false));
  }, [params.search]);

  useEffect(() => {
    setIsLoading(true);
    getClubsByLocationAndSport(location, sport)
      .then((res) => setClubs(res))
      .finally(() => setIsLoading(false));
  }, [location, sport, date, hour]);

  return (
    <main className="mt-24">
      <FilterClubs
        setLocation={setLocation}
        setSport={setSport}
        date={date}
        setDate={setDate}
      />
      <FilteredClubs
        searchedClubs={clubs}
        isLoading={isLoading}
      />
    </main>
  );
};

export default FindedClubs;
