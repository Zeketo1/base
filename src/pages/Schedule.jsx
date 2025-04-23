import { Calendar } from "@/components/ui/calendarMod";
import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { useOutletContext } from "react-router-dom";

const Schedule = () => {
  const { active } = useOutletContext();
  const [date, setDate] = useState(new Date());

  const highlightedDates = [
    new Date(2025, 3, 15),
    new Date(2025, 3, 20),
    new Date(2025, 3, 25),
  ];

  console.log(date);

  return (
    <div className="flex-1 flex flex-col gap-7 py-4 pr-7 w-full">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-[20px]">Schedule List</p>
        <div className="py-2 px-4 bg-primary1 text-[13px] text-white rounded-md">
          + Add New
        </div>
      </div>
      <div
        className={`grid ${
          active ? "grid-cols-[30%_67%]" : "grid-cols-[25%_72%]"
        } transition-all duration-500 gap-[3%]`}
      >
        <div className="py-7 px-5 h-screen w-full rounded-lg bg-white shadow-lg">
          <button className="flex items-center mb-3 gap-1 justify-center w-full bg-primary1 py-2 text-white rounded-lg text-[15px]">
            <GoPlus className="text-[20px]" /> Create Schedule
          </button>
          <Calendar
            // mode="single"
            selected={date}
            onSelect={setDate}
            highlightedDates={highlightedDates}
            className="rounded-md border"
          />
        </div>
        <div className="h-screen w-full rounded-lg bg-white shadow-lg"></div>
      </div>
    </div>
  );
};

export default Schedule;
