'use client';

import ReservationCard from '@/components/pures/ReservationCard';
import { Button } from '@/components/ui/button';
import { getUserById } from '@/lib/data';
import { User, Reservation } from '@/lib/models';
import { parseDate } from '@/lib/utils';
import { ArrowDown } from 'lucide-react';
import { useEffect, useState } from 'react';

const ReservationsPage = ({ params }: { params: { userId: string } }) => {
  const [user, setUser] = useState<User>({} as User);
  const [reservations, setReservations] = useState<Reservation[]>();

  const [ascendentOrder, setAscendentOrder] = useState<boolean>(true);

  const orderReservations = () => {
    if (!reservations) return;
    const sortedReservations = [...reservations].toSorted((a, b) => {
      const dateComparison =
        new Date(parseDate(a.date)).getTime() - new Date(parseDate(b.date)).getTime();

        if (dateComparison === 0) {
            const [aHour, aMinute] = a.hour.split(':').map(Number);
            const [bHour, bMinute] = b.hour.split(':').map(Number);
      
            const hourComparison = aHour - bHour;
            if (hourComparison === 0) {
              // Si las horas son iguales, comparamos los minutos
              return ascendentOrder ? aMinute - bMinute : bMinute - aMinute;
            }
            // Comparación directa de horas
            return ascendentOrder ? hourComparison : -hourComparison;
          }
      return ascendentOrder ? dateComparison : -dateComparison;
    });
    setReservations(sortedReservations);
  };

  useEffect(() => {
    orderReservations();
  }, [ascendentOrder]);

  useEffect(() => {
    getUserById(params.userId).then((user: User) => setUser(user));
  }, [params.userId]);

  useEffect(() => {
    setReservations(user.reservations);
  }, [user]);

  return (
    <main className="w-11/12 mx-auto min-h-screen py-20">
      <div className="w-full flex justify-between">
        <h1 className="text-3xl mb-4">Mis reservas</h1>
        <Button
          variant={'carousel'}
          onClick={() => setAscendentOrder(!ascendentOrder)}
        >
          Fecha{' '}
          <ArrowDown
            size={20}
            className={`${!ascendentOrder && 'rotate-180'} transition-all`}
          />
        </Button>
      </div>
      <section className="flex flex-col gap-2">
        {user &&
          reservations &&
          reservations.map((reservation: Reservation) => {
            return (
              <ReservationCard
                key={reservation.id}
                reservation={reservation}
              />
            );
          })}
      </section>
    </main>
  );
};

export default ReservationsPage;
