'use client';

import { SPORTS } from '@/lib/models';
import { Dispatch, SetStateAction } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { Calendar as CalendarIcon, Search } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '../ui/calendar';

const FilterClubs = ({
  setLocation,
  setSport,
  date,
  setDate,
}: {
  setLocation: Dispatch<SetStateAction<string>>;
  setSport: Dispatch<SetStateAction<SPORTS>>;
  date: Date | undefined;
  setDate: Dispatch<SetStateAction<Date | undefined>>;
}) => {
  const sportMap: { [key: string]: SPORTS } = {
    tennis: SPORTS.tennis,
    soccer: SPORTS.soccer,
    basketball: SPORTS.basketball,
    volley: SPORTS.volley,
    rugby: SPORTS.rugby,
  };

  const mapToSport = (sport: string): SPORTS => sportMap[sport];

  return (
    <section className="w-11/12 mx-auto">
      <div className="w-full flex flex-col sm:flex-row gap-8 items-center">
        <Search className="hidden sm:block h-8 w-8 text-slate-600" />
        <Input
          placeholder="Ubicación"
          onChange={(e) => setLocation(e.target.value)}
          className="w-full sm:w-1/5"
        />
        <Select onValueChange={(sport) => setSport(mapToSport(sport))}>
          <SelectTrigger className="w-full sm:w-1/5">
            <SelectValue placeholder="Deporte" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tennis">Tenis</SelectItem>
            <SelectItem value="soccer">Fútbol</SelectItem>
          </SelectContent>
        </Select>
        <div className="w-full sm:w-2/5 flex gap-6">
          <Popover>
            <PopoverTrigger
              asChild
              className="w-1/2"
            >
              <Button
                variant={'outline'}
                className={cn(
                  'w-[280px] justify-start text-left font-normal',
                  !date && 'text-muted-foreground w-1/2'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP') : <span>Fecha</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </section>
  );
};

export default FilterClubs;
