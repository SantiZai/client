'use client';

import { Input } from '../ui/input';
import { Button } from '../ui/button';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const ubicaciones = ['Salto, Buenos Aires, Argentina'];

const SearchClubSection = () => {
  const [location, setLocation] = useState<string>('');
  const [showResults, setShowResults] = useState<boolean>(false);
  const [filteredLocations, setFilteredLocations] = useState<string[]>([]);

  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const filtered = ubicaciones.filter((ubicacion) => {
      return ubicacion.toLowerCase().includes(location.toLowerCase());
    });
    setFilteredLocations(filtered);
  }, [location]);

  return (
    <section
      id="search"
      className="h-screen w-full flex items-center"
    >
      <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/vanta/dist/vanta.waves.min.js"></script>
      <div className="w-11/12 mx-auto">
        <form
          action=""
          className="flex flex-col items-center gap-1"
        >
          <span className="mb-2 bg-gray-200 py-1 px-2 rounded-md text-sm">
            Encuentra tu club
          </span>
          <h3 className="text-4xl">Buscar clubes disponibles</h3>
          <h5 className="max-w-lg text-center text-pretty mb-4">
            Filtra por ubicación, deporte, día y horario para encontrar el club
            perfecto para tus necesidades.
          </h5>
          <fieldset className="flex flex-col gap-4">
            <fieldset className="flex gap-4">
              <div
                ref={searchRef}
                className="w-1/2"
              >
                <Input
                  type="text"
                  placeholder="Ingresa una ubicación"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    setShowResults(true);
                  }}
                  onFocus={() => setShowResults(true)}
                />
                <div className="relative">
                  {showResults && location && (
                    <div className="absolute z-10 w-full bg-gray-500 rounded-md px-3 py-1 text-sm">
                      {filteredLocations.map((ubicacion, i) => (
                        <div
                          key={i}
                          onClick={() => {
                            setLocation(ubicacion);
                            setShowResults(false);
                          }}
                        >
                          <span className="font-semibold">{ubicacion}</span>
                        </div>
                      ))}
                      {filteredLocations.length === 0 && (
                        <div className="text-center text-pretty">
                          No hay ubicaciones
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <Input
                type="text"
                placeholder="Ingresa un deporte"
                className="w-1/2"
              />
            </fieldset>
            <fieldset className="flex gap-4">
              <Input
                type="text"
                placeholder="Día"
              />
              <Input
                type="text"
                placeholder="Hora"
              />
            </fieldset>
          </fieldset>
          <Button className="w-1/4 mt-4">
            <Link href="/clubs/salto,buenos+aires,argentina">Buscar</Link>
          </Button>
        </form>
      </div>
    </section>
  );
};

export default SearchClubSection;
