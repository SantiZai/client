"use client";

import { Club } from "@/lib/models";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";

export default function FilteredClubs({
  searchedClubs,
  filters,
}: {
  searchedClubs: Club[];
  filters?: any;
}) {
  const [clubs, setClubs] = useState<Club[]>([]);

  useEffect(() => {
    setClubs(searchedClubs);
  }, [filters]);
  return (
    <section>
      <h3>Filtered clubs</h3>
      <ul className="flex gap-2">
        {searchedClubs.map((club: Club) => (
          <li className="w-full sm:w-1/2 md:w-1/4">
            <div>
              <Image
                src={club.image}
                alt={`${club.name} profile picture`}
                height={100}
                width={500}
                className="rounded-lg"
              />
            </div>
            <div className="mt-2 flex justify-between">
              <div className="flex flex-col gap-2">
                <h5 className="text-lg">
                  {club.name
                    .split("-")
                    .map((each) => each[0].toUpperCase() + each.slice(1))
                    .join(" ")}
                </h5>
                <div className="flex gap-2 items-center">
                  <FontAwesomeIcon icon={faLocationDot} width={30} />
                  <div className="flex flex-col">
                    <span className="text-xs">{club.address}</span>
                    <span className="text-xs">{club.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between items-end">
                <span>5 <FontAwesomeIcon icon={faStar} /></span>
                <span>$1000</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
