const InfiniteHorizontalScroll = ({ hours }: { hours: string[] }) => {
  return (
    <div
      className="w-11/12 mx-auto overflow-scroll whitespace-nowrap"
      style={{ scrollbarWidth: "none" }}
    >
      <div className="inline-flex">
        {hours.map((hour: string, index: number) =>
          hours[index] == hours[0] ? (
            <span
              key={index}
              className="px-4 py-3 rounded-2xl border border-slate-200 mr-2"
            >
              {hour}
            </span>
          ) : hours[index] == hours[hours.length - 1] ? (
            <span
              key={index}
              className="px-4 py-3 rounded-2xl border border-slate-200 ml-2"
            >
              {hour}
            </span>
          ) : (
            <span
              key={index}
              className="px-4 py-3 rounded-2xl border border-slate-200 mx-2"
            >
              {hour}
            </span>
          )
        )}
      </div>
    </div>
  );
};

export default InfiniteHorizontalScroll;
