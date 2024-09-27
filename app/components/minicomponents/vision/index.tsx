"use client"
// Visiononents/Vision.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import Image from 'next/image';
import VisImage from "../../images/vision.png"

interface VisionSchema {
    _id: string;
    vision: string,
    photo: string,
  }
interface Props {
    visionData: VisionSchema[]
}

const Vision: React.FC<Props> = ({visionData}) => {

  return (
    <>
    <div className='my-16'>
          <div>
            {visionData.length > 0 ? <div className="flex flex-col md:flex-row-reverse justify-around gap-2 my-4">
            <div className="relative w-5/6 md:w-1/3 h-48 md:h-64 px-4 self-center justify-self-start">
             <Image
                 src={VisImage}
                 alt="Description"
                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                 width={300}
                 height={300}
                 objectFit="cover"  // Use Tailwind's utility class for object-fit
                 className="absolute inset-0 rounded-sm"
             />
           </div>
           <div className="flex flex-col w-full md:w-1/3 mt-10 md:mt-0">
                 <h1 className='text-lg text-center md:text-xl uppercase font-bold mb-2'>Vision</h1>
                    <p className='text-justify'> <span className='p-2'></span>{visionData[0].vision}</p>
                </div>
            </div> : (
              <h1>No VisionData yet</h1>
            )}
          </div>
    </div>
    </>
  );
};

export default Vision;
