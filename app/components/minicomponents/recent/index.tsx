"use client";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import LeftArrow from "../../icons/leftArrow.svg";
import RightArrow from "../../icons/rightArrow.svg";

interface activitiesSchema {
  activity: string;
  activityPhotos: string[];
}

interface Props {
  activitiesData: activitiesSchema[];
}

const Recent: React.FC<Props> = ({ activitiesData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextPhoto = () => {
    if (activitiesData.length > 0 && activitiesData[0]?.activityPhotos?.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % activitiesData[0].activityPhotos.length);
    }
  };

  const prevPhoto = () => {
    if (activitiesData.length > 0 && activitiesData[0]?.activityPhotos?.length > 0) {
      setCurrentIndex((prevIndex) =>
        (prevIndex - 1 + activitiesData[0].activityPhotos.length) % activitiesData[0].activityPhotos.length
      );
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (activitiesData.length > 0 && activitiesData[0]?.activityPhotos?.length > 0) {
        nextPhoto();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [activitiesData]);

  return (
    <div className="flex justify-center items-center">
      <div className="w-5/6">
        {activitiesData.length === 0 || activitiesData[0]?.activityPhotos?.length < 1 ? (
          <h1>No activity yet</h1>
        ) : (
          <div className="flex flex-col items-center max-w-lg mx-auto relative">
            <div className="w-full overflow-hidden rounded-lg shadow-lg">
              <Image
                src={activitiesData[0].activityPhotos[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>

            <div className="flex space-x-4 absolute justify-between w-full top-1/3">
              <Image
                src={LeftArrow}
                alt="leftArrow"
                width={56}
                height={56}
                onClick={prevPhoto}
                className="cursor-pointer w-9 h-9 md:w-16 md:h-16 px-2 py-2 md:px-4 md:py-4 text-white bg-green-700 rounded-full hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-gray-400 -translate-x-1/2"
              />
              <Image
                src={RightArrow}
                alt="rightArrow"
                width={56}
                height={56}
                onClick={nextPhoto}
                className="cursor-pointer w-9 h-9 md:w-16 md:h-16 px-2 py-2 md:px-4 md:py-4 text-white bg-green-700 rounded-full hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-blue-400 translate-x-1/2"
              />
            </div>

            <div className="flex space-x-2 mt-2">
              {activitiesData[0].activityPhotos.map((_, index) => (
                <span
                  key={index}
                  className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full transition-all ${currentIndex === index ? 'bg-green-700' : 'bg-gray-400'}`}
                />
              ))}
            </div>

            <p className="mt-1 text-center text-xs sm:text-sm capitalize text-gray-700">
              {activitiesData[0]?.activity}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Recent;
