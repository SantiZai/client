'use client';

import { deleteReservation, getClubById, getCourtById } from '@/lib/data';
import { Club, Court, Reservation } from '@/lib/models';
import { mapClubTitle, parseDate } from '@/lib/utils';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Clock, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

const ReservationCard = ({
  reservation,
  setReservations,
}: {
  reservation: Reservation;
  setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>;
}) => {
  const [club, setClub] = useState<Club>();
  const [court, setCourt] = useState<Court>();

  useEffect(() => {
    getCourtById(reservation.courtId).then((res) => setCourt(res));
  }, [reservation]);

  useEffect(() => {
    court && getClubById(court.clubId).then((res) => setClub(res));
  }, [court]);

  return (
    <>
      {court && club && (
        <div className="w-full p-6 flex justify-between shadow-md rounded-lg">
          <div className="flex gap-8 items-center">
            <div>
              <h3 className="text-xl font-semibold">{court.name}</h3>
              <h4 className="text-gray-500">
                {format(parseDate(reservation.date), "d 'de' MMMM 'de' yyyy", {
                  locale: es,
                })}{' '}
                a las {reservation.hour}hs
              </h4>
            </div>
            <div>
              <span className="flex gap-1 items-center">
                <MapPin size={20} />
                {mapClubTitle(club.name)}
              </span>
              <span className="flex gap-1 items-center">
                <Clock size={20} />
                {reservation.isLarge ? '90 minutos' : '60 minutos'}
              </span>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <Button variant={'outline'}>Detalles</Button>
            <Button
              variant={'destructive'}
              onClick={() => {
                deleteReservation(reservation.id).then(() => {
                  setReservations((prevState: Reservation[]) =>
                    prevState.filter(
                      (r: Reservation) => r.id !== reservation.id
                    )
                  );
                });
              }}
            >
              Cancelar
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ReservationCard;
