import { generateAllHours } from "@/lib/manageReservationHours";
import { Button } from "../ui/button";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const InfiniteHorizontalScroll = ({
  hours,
  setSelectedHour,
  selectedHour,
  blocked,
}: {
  hours: string[];
  setSelectedHour: (hour: string) => void;
  selectedHour: string;
  blocked: boolean;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", checkScrollPosition);
      checkScrollPosition();
    }
    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("scroll", checkScrollPosition);
      }
    };
  }, []);

  return (
    <div className="w-11/12 md:w-full lg:w-11/12 mx-auto relative">
      {showLeftArrow && (
        <Button
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 hidden sm:block"
          onClick={() => scroll("left")}
          variant="carousel"
        >
          <ChevronLeft />
        </Button>
      )}
      <div
        ref={scrollRef}
        className="overflow-x-auto whitespace-nowrap scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div className="inline-flex gap-2 py-2">
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
                    className={`p-6 rounded-3xl font-bold mr-2 ${
                      hour === selectedHour
                        ? "bg-primary text-primary-foreground"
                        : "border-slate-500"
                    }`}
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
      {showRightArrow && (
        <Button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 hidden sm:block"
          onClick={() => scroll("right")}
          variant="carousel"
        >
          <ChevronRight />
        </Button>
      )}
    </div>
  );
};

export default InfiniteHorizontalScroll;
