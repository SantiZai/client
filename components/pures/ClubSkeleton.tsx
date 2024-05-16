import { Skeleton } from "../ui/skeleton";

const ClubSkeleton = () => {
  return (
    <li className="w-full sm:w-1/2 lg:w-1/4 p-2 flex flex-col space-y-2">
      <Skeleton className="w-full h-[160px]" />
      <Skeleton className="w-1/2 h-6" />
      <Skeleton className="w-2/3 h-6" />
      <div className="w-full flex gap-2">
        <Skeleton className="w-20 h-12" />
        <Skeleton className="w-20 h-12" />
        <Skeleton className="w-20 h-12" />
      </div>
    </li>
  );
};

export default ClubSkeleton;
