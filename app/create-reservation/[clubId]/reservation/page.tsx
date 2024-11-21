'use client';

import { useSearchParams } from 'next/navigation';

import { Check, Calendar, Clock, MapPin } from 'lucide-react';
import { mapClubTitle, mapSport } from '@/lib/utils';
import { SPORTS } from '@/lib/models';
import { format, parse } from 'date-fns';
import { es } from 'date-fns/locale';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const ReservationCreatedPage = ({ params }: { params: { clubId: string } }) => {
  const searchParams = useSearchParams();

  const date = parse(
    searchParams.get('day') as string,
    'dd-MM-yyyy',
    new Date()
  );

  return (
    <main className="min-h-screen grid place-content-center">
      <section className="w-full max-w-md flex flex-col gap-4 shadow-md sm:p-14 sm:rounded-lg">
        <div className="mx-auto bg-green-100 text-green-600 rounded-full p-3 w-16 h-16 flex items-center justify-center">
          <Check size={64} />
        </div>
        <h3 className="text-2xl font-bold text-center">¡Reserva exitosa!</h3>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 font-bold">
            <Calendar
              size={20}
              color="gray"
            />
            <span>
              Día:{' '}
              <span className="font-normal">
                {format(date, "d 'de' MMMM 'del' yyyy", { locale: es })}
              </span>
            </span>
          </div>
          <div className="flex gap-2 font-bold">
            <Clock
              size={20}
              color="gray"
            />
            <span>
              Hora:{' '}
              <span className="font-normal">
                {searchParams.get('hour') as string}hs
              </span>
            </span>
          </div>
          <div className="flex gap-2 font-bold">
            <MapPin
              size={20}
              color="gray"
            />
            <span>
              Club:{' '}
              <span className="font-normal">
                {mapClubTitle(searchParams.get('club') as string)}
              </span>
            </span>
          </div>
          <div className="w-full flex justify-between font-bold">
            <span>{mapSport(searchParams.get('sport') as SPORTS)}</span>
            <span>{searchParams.get('court') as string}</span>
          </div>
        </div>
        <Button variant={'link'} className='w-fit mx-auto'>
        <Link href="/">Volver al inicio</Link>
        </Button>
      </section>
    </main>
  );
};

export default ReservationCreatedPage;
