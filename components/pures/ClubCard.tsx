import { Club, SPORTS } from "@/lib/models";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faStar } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { mapClubLocation, mapClubTitle } from "@/lib/utils";

const ClubCard = ({ club, sport }: { club: Club, sport: SPORTS }) => {
  return (
    <li className="w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33%-1rem)] xl:w-[calc(25%-1rem)] p-2 rounded-lg hover:shadow-lg transition-all duration-500">
      <div>
        <Image
          src={club.image}
          alt={`${club.name} profile picture`}
          height={100}
          width={500}
          priority
          className="rounded-lg w-full aspect-auto"
        />
      </div>
      <div className="mt-2 flex justify-between p-2">
        <div className="flex flex-col gap-2">
          <h5 className="text-lg hover:cursor-pointer">
            <a href={`${club.location}/${club.id}?sport=${sport}`}>
              {mapClubTitle(club.name)}
            </a>
          </h5>
          <div className="flex gap-2 items-center">
            <FontAwesomeIcon
              icon={faLocationDot}
              width={30}
            />
            <div className="flex flex-col">
              <span className="text-xs">{club.address}</span>
              <span className="text-xs">{mapClubLocation(club.location)}</span>
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
    </li>
  );
};

export default ClubCard;
