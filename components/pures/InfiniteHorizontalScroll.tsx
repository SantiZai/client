import { generateAllHours } from "@/lib/manageReservationHours";
import { Button } from "../ui/button";

const InfiniteHorizontalScroll = ({
  hours,
  setSelectedHour,
  blocked,
}: {
  hours: string[];
  setSelectedHour: (hour: string) => void;
  blocked: boolean;
}) => {
  return (
    <div
      className="w-11/12 mx-auto overflow-scroll whitespace-nowrap"
      style={{ scrollbarWidth: "none" }}
    >
      <div className="inline-flex gap-2">
        {blocked
          ? generateAllHours().map((hour: string, index: number) => (
              <Button
                key={index}
                variant={"outline"}
                disabled
                className="p-6 rounded-3xl border-slate-500 font-bold mr-2"
              >
                {hour}
              </Button>
            ))
          : generateAllHours().map((hour: string, index: number) =>
              hours.includes(hour) ? (
                <Button
                  key={index}
                  variant={"outline"}
                  onClick={() => setSelectedHour(hour)}
                  className="p-6 rounded-3xl border-slate-500 font-bold mr-2"
                >
                  {hour}
                </Button>
              ) : (
                <Button
                  key={index}
                  variant={"outline"}
                  disabled
                  className="p-6 rounded-3xl border-slate-500 font-bold mr-2"
                >
                  {hour}
                </Button>
              )
            )}
      </div>
    </div>
  );
};

export default InfiniteHorizontalScroll;
