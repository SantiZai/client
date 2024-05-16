import { Button } from "../ui/button";

const InfiniteHorizontalScroll = ({
  hours,
  setSelectedHour,
}: {
  hours: string[];
  setSelectedHour: (hour: string) => void;
}) => {
  //TODO: block hours if not exists available courts
  return (
    <div
      className="w-11/12 mx-auto overflow-scroll whitespace-nowrap"
      style={{ scrollbarWidth: "none" }}
    >
      <div className="inline-flex">
        {hours.map((hour: string, index: number) =>
          hours[index] == hours[0] ? (
            <Button
              key={index}
              variant={"outline"}
              onClick={() => setSelectedHour(hour)}
              className="p-6 rounded-3xl border-slate-500 font-bold mr-2"
            >
              {hour}
            </Button>
          ) : hours[index] == hours[hours.length - 1] ? (
            <Button
              key={index}
              variant={"outline"}
              onClick={() => setSelectedHour(hour)}
              className="p-6 rounded-3xl border-slate-500 font-bold ml-2"
            >
              {hour}
            </Button>
          ) : (
            <Button
              key={index}
              variant={"outline"}
              onClick={() => setSelectedHour(hour)}
              className="p-6 rounded-3xl border-slate-500 font-bold mx-2"
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
