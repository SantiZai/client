import { Button } from "../ui/button";

export default function HeroSection() {
  return (
    <section className="h-screen w-11/12 mx-auto flex items-center">
      <div className="w-full sm:w-2/3 flex flex-col gap-4 sm:gap-2">
        <h1 className="text-5xl text-balance">
          ¡Armá tu próximo partido al instante!
        </h1>
        <h3 className="text-xl text-balance">
          Navegá entre todos los clubes disponibles y reservá tu cancha en
          tiempo real.
        </h3>
        <Button size={"lg"} className="w-full sm:w-1/4">
          <a href="#search">Buscar cancha</a>
        </Button>
      </div>
    </section>
  );
}
