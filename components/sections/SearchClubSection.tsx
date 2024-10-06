import { Input } from "../ui/input";
import { Button } from "../ui/button";

import Link from "next/link";

const SearchClubSection = () => {
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
              {/* <Input
                type="text"
                placeholder="Ingresa una ubicación"
              /> */}
              <Input
                type="text"
                placeholder="Ingresa un deporte"
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
