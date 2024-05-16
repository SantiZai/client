"use client";

import { getClubById } from "@/lib/data";
import { Club } from "@/lib/models";
import { useEffect, useState } from "react";

const ClubPage = ({ params }: { params: { id: string } }) => {
  const [club, setClub] = useState<Club>();

  useEffect(() => {
    getClubById(params.id).then((res) => setClub(res));
  }, [params.id]);

  return (
    <main className="w-11/12 mx-auto mt-24">
      {club && <h3>{club.name}</h3>}
    </main>
  );
};

export default ClubPage;
