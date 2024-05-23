"use client";

import { getClubById, getCourtById } from "@/lib/data";
import { Club, Court } from "@/lib/models";
import { UserState } from "@/stores/user/user-store";
import { useUserStore } from "@/stores/user/user-store-provider";
import { useUser } from "@auth0/nextjs-auth0/client";
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
  }, [day, hour, duration, courtId, clubId]);

  useEffect(() => {
    setUserStore({ id, fullname, email, phonenumber, reservations });
  }, [user]);

  useEffect(() => {
    getClubById(clubId).then((res) => setClub(res));
    getCourtById(courtId).then((res) => setCourt(res));
  }, [clubId, courtId]);

  return (
    <main>
      <section>
        {club && court && (
          <div>
            <span>{club.name}</span>
            <span>{court.name}</span>
          </div>
        )}
      </section>
    </main>
  );
};

export default CreateReservationPage;
