"use client";
// components/Recent.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import Image from 'next/image';
import LeftArrow from "../../icons/leftArrow.svg";
import RightArrow from "../../icons/rightArrow.svg";


interface activitiesSchema {
  activity: string;
  activityPhotos: string[];
}

const fallbackImage = "../../images/fallback.jpg"

const Recent: React.FC = () => {
  const [activitiesData, setActivitiesData] = useState<activitiesSchema[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState(fallbackImage); // Initial fallback image

  useEffect(() => {
    axios.get(`${API_BASE_URL}/activities`)
      .then(response => {
        const activities = response.data.slice().reverse();
        setActivitiesData(activities);
        if (activities.length > 0 && activities[0].activityPhotos.length > 0) {
          setImageSrc(activities[0].activityPhotos[currentIndex]); // Set the initial image source
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [currentIndex]);

  const nextPhoto = () => {
    if (activitiesData.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % activitiesData[0].activityPhotos.length);
      setImageSrc(activitiesData[0].activityPhotos[(currentIndex + 1) % activitiesData[0].activityPhotos.length]);
    }
  };

  const prevPhoto = () => {
    if (activitiesData.length > 0) {
      setCurrentIndex((prevIndex) =>
        (prevIndex - 1 + activitiesData[0].activityPhotos.length) % activitiesData[0].activityPhotos.length
      );
      setImageSrc(activitiesData[0].activityPhotos[(currentIndex - 1 + activitiesData[0].activityPhotos.length) % activitiesData[0].activityPhotos.length]);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (activitiesData.length > 0 && activitiesData[0].activityPhotos.length > 0) {
        nextPhoto();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [activitiesData, nextPhoto()]);

  const handleImageError = () => {
    setImageSrc(fallbackImage); // Set the fallback image when an error occurs
  };

  return (
    <div className="flex justify-center items-center">
    <div className='w-5/6'>
      {loading ? (
        <h1>Loading...</h1>
      ) : activitiesData.length === 0 || activitiesData[0]?.activityPhotos.length < 1 ? (
        <h1>No activity yet</h1>
      ) : (
        <div className="flex flex-col items-center max-w-lg mx-auto relative">
          <div className="w-full overflow-hidden rounded-lg shadow-lg">
            <Image
              src={imageSrc}
              alt={`Slide ${currentIndex + 1}`}
              width={600}
              height={400}
              className="w-full h-auto"
              onError={handleImageError} // Handle error to display fallback image
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
              className="cursor-pointer w-9 h-9 md:w-16  md:h-16  px-2 py-2 md:px-4 md:py-4 text-white bg-green-700 rounded-full hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-blue-400 translate-x-1/2"
            />
          </div>

          {/* Pagination Dots */}
          <div className="flex space-x-2 mt-2">
            {activitiesData[0].activityPhotos.map((_, index) => (
              <span
                key={index}
                className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full transition-all ${
                  currentIndex === index ? 'bg-green-700' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>

          <p className="mt-1 text-center text-xs sm:text-sm capitalize text-gray-700">{activitiesData[0]?.activity}</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default Recent;
