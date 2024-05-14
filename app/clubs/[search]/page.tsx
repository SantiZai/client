"use client";

import FilterClubs from "@/components/sections/FilterCLubs";
import FilteredClubs from "@/components/sections/FilteredClubs";
import { getClubsByLocation } from "@/lib/data";
import { Club } from "@/lib/models";
import { useEffect, useState } from "react";

export default function FindedClubs({
  params,
}: {
  params: { search: string };
}) {
  const [clubs, setClubs] = useState<Club[]>([]);

  useEffect(() => {
    getClubsByLocation(params.search).then((res) => setClubs(res));
  }, [params.search]);

  return (<main className="h-screen mt-24">
    <FilterClubs />
    <FilteredClubs searchedClubs={clubs} />
  </main>)
}
