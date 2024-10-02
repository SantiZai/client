import { Club, SPORTS } from "@/lib/models";
import ClubSkeleton from "../pures/ClubSkeleton";
import ClubCard from "../pures/ClubCard";

const FilteredClubs = ({
  searchedClubs,
  isLoading,
  sport,
}: {
  searchedClubs: Club[];
  isLoading: boolean;
  sport: SPORTS;
}) => {
  return (
    <section className="w-11/12 mx-auto mt-8">
      <ul className="flex flex-wrap gap-4">
        {isLoading ? (
          <>
            <ClubSkeleton />
            <ClubSkeleton />
            <ClubSkeleton />
            <ClubSkeleton />
            <ClubSkeleton />
          </>
        ) : (
          searchedClubs.length > 0 &&
          searchedClubs.map((club: Club) => (
            <ClubCard
              key={club.id}
              club={club}
              sport={sport}
            />
          ))
        )}
      </ul>
    </section>
  );
};

export default FilteredClubs;
