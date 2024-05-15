import { Club } from "@/lib/models";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";

export default function FilteredClubs({
  searchedClubs,
}: {
  searchedClubs: Club[];
}) {
  return (
    <section className="w-11/12 mx-auto mt-8">
      <ul className="flex flex-wrap gap-6">
        {searchedClubs.length > 0 && searchedClubs.map((club: Club) => (
          <li className="w-full sm:w-1/2 lg:w-1/3 xl:1/4 p-2 rounded-lg hover:shadow-lg transition-all duration-500">
            <div>
              <Image
                src={club.image}
                alt={`${club.name} profile picture`}
                height={100}
                width={500}
                className="rounded-lg w-full"
              />
            </div>
            <div className="mt-2 flex justify-between p-2">
              <div className="flex flex-col gap-2">
                <h5 className="text-lg hover:cursor-pointer hover:text-[1.15rem] transition-all">
                  {club.name
                    .split("-")
                    .map((each) => each[0].toUpperCase() + each.slice(1))
                    .join(" ")}
                </h5>
                <div className="flex gap-2 items-center">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    width={30}
                    className="w-full"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs">{club.address}</span>
                    <span className="text-xs">{club.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between items-end">
                <span>
                  5 <FontAwesomeIcon icon={faStar} />
                </span>
                <span>$1000</span>
              </div>
            </div>
            {/* TODO: agregar la funcionalidad para traer los horarios disponibles en cada club */}
            <div className="flex gap-2 mt-4">
              <span className="px-4 py-2 border border-slate-200 rounded-md hover:cursor-pointer hover:bg-slate-200 transition-all">
                19:00
              </span>
              <span className="px-4 py-2 border border-slate-200 rounded-md hover:cursor-pointer hover:bg-slate-200 transition-all">
                19:30
              </span>
              <span className="px-4 py-2 border border-slate-200 rounded-md hover:cursor-pointer hover:bg-slate-200 transition-all">
                20:00
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
