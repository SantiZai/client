"use client";

import { Club } from "@/lib/models";
import { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

export default function FilteredClubs({
  searchedClubs,
  filters,
}: {
  searchedClubs: Club[];
  filters: any;
}) {
  const [clubs, setClubs] = useState<Club[]>([]);

  useEffect(() => {
    setClubs(searchedClubs);
  }, [filters]);
  return <section>
    {
        clubs.map((club: Club) => (
            <Card>
                <CardHeader>

                </CardHeader>
                <CardContent>
                    <CardTitle>{club.name}</CardTitle>
                    <CardDescription>{club.location}</CardDescription>
                </CardContent>
                <CardFooter>

                </CardFooter>
            </Card>
        ))
    }
  </section>;
}
