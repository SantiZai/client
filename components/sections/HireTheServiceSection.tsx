import { Button } from "../ui/button";

const HireTheServiceSection = () => {
  return (
    <section className="sm:h-[50vh] w-11/12 mx-auto flex flex-col justify-center items-center sm:flex-row gap-4 py-8 sm:py-0">
      <div className="w-full sm:w-1/2">
        <h3 className="text-3xl text-center sm:text-left mb-4">
          ¿Querés probar el sistema en tu club?
        </h3>
        <p className="text-lg text-pretty mb-1">
          Impulsá tu club ofreciendo un servicio de otro nivel, contá con
          comodidad, practicidad y eficiencia para gestionar las reservas de tus
          canchas en tiempo real.
        </p>
        <p className="text-lg text-pretty">
          Descubrí todas las funcionalidades que tenemos para vos y tus
          clientes.
        </p>
      </div>
      <div className="w-full sm:w-1/3 flex flex-col items-center gap-2">
        <Button className="w-full sm:w-1/2">Características</Button>
        <Button className="w-full sm:w-1/2">Servicios y planes</Button>
      </div>
    </section>
  );
};

export default HireTheServiceSection;
