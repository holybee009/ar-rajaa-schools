"use client"
// Acknowledgementonents/Acknowledgement.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import Image from 'next/image';


interface AcknowledgementProps {
    handleScroll: (_: string) => void
}

interface AcknowledgementSchema {
    _id: string;
    acknowledgement: string,
    photo: string,
  }

const Acknowledgement: React.FC = () => {
    const [acknowledgementData, setAcknowledgementData] = useState<AcknowledgementSchema[]>([]);
    const [loading, setLoading] = useState(true); // Added loading state

    useEffect(() => {
        axios
          .get(`${API_BASE_URL}/acknowledgement`)
          .then((response) => {
            setAcknowledgementData(response.data.slice().reverse());
            setLoading(false); // Set loading to false after data is fetched
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
            setLoading(false); // Set loading to false if an error occurs
          });
      }, []);

  return (
    <>
    <div>
    {loading ? ( // Show loading message while fetching data
          <h1>Loading...</h1>
        ) : (
          <div>
            {acknowledgementData.length > 0 ? <div className="flex flex-col md:flex-row justify-around gap-2 mb-4">
            <div className="relative w-5/6 md:w-1/3 h-48 md:h-64 px-4 self-center"> 
             <Image
                 src={acknowledgementData[0].photo}
                 alt="Description"
                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                 layout="fill"
                 objectFit="cover"  // Use Tailwind's utility class for object-fit
                 className="absolute inset-0 rounded-sm"
             />
           </div>
                <div className="flex flex-col w-full md:w-1/3 mt-5 md:mt-0">
                    <h1 className='text-lg text-center md:text-xl uppercase font-bold mb-2'>word of acknowledgement</h1>
                    <p className='text-justify'><span className='p-2'></span>{acknowledgementData[0].acknowledgement}</p>
                </div>
            </div> : (
              <h1>No acknowledgementData yet</h1>
            )}
          </div>
        )}
    </div>
    </>
  );
};

export default Acknowledgement;
