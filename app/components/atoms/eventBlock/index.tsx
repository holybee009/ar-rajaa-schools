"use client"
// EventBlockonents/EventBlock.tsx
import Image from 'next/image';
import Calendar from "../../icons/calendar.svg";
import Location from "../../icons/location.svg";
import Date from "../../icons/time.svg";

interface EventBlockProps {
  title: string;
  location: string;
  date: string;
}

const EventBlock: React.FC<EventBlockProps> = ({ title, location, date }) => {
  return (
    <div className="flex gap-3 w-full bg-[#D9D9D9] rounded-full px-5 py-2 mb-3">
      <Image src={Calendar} alt="photo" width={48} height={48} className="h-9 w-9 md:h-16 md:w-16 self-center" />
      <div className="flex flex-col flex-1 w-10">
        <h1 className="font-semibold text-sm md:text-auto uppercase text-[#CD4F4F] truncate overflow-hidden whitespace-nowrap">
          {title}
        </h1>
        <div className="flex gap-2 items-center">
          <Image src={Location} alt="location" width={20} height={20} />
          <h3 className="truncate">{location}</h3> {/* Added truncate to location as well */}
        </div>
        <div className="flex gap-2 items-center">
          <Image src={Date} alt="date" width={20} height={20} />
          <h3>{date}</h3>
        </div>
      </div>
    </div>
  );
};

export default EventBlock;
