"use client"
// AdmissionBlockonents/AdmissionBlock.tsx
import { useState } from 'react';
import Image from 'next/image';

interface AdmissionBlockProps {
    admitPhoto: string,
    schoolClass: string,
}


const AdmissionBlock: React.FC<AdmissionBlockProps> = ({admitPhoto,schoolClass}) => {

  return (
    <>
    <div className="relative w-full md:w-1/5 h-40">
             <Image
                 src={admitPhoto}
                 alt="Description"
                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                 layout="fill"
                 objectFit="cover"  // Use Tailwind's utility class for object-fit
                 className="absolute inset-0 rounded-lg"
             />
        <p className="absolute uppercase inset-x-0 text-center bottom-0 text-white"   style={{
        background: 'linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0.65) 76%, rgba(0, 0, 0, 0) 100%)'
      }}>{schoolClass}</p>
    </div>
    </>
  );
};

export default AdmissionBlock;
