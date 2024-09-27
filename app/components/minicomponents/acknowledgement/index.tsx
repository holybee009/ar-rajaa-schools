"use client"
// Acknowledgementonents/Acknowledgement.tsx
import Image from 'next/image';


interface AcknowledgementSchema {
    _id: string;
    acknowledgement: string,
    photo: string,
  }
interface Props {
    acknowledgementData: AcknowledgementSchema[]
}
const Acknowledgement: React.FC<Props> = ({acknowledgementData}) => {

  return (
    <>
    <div>
          <div className='pt-4'>
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
    </div>
    </>
  );
};

export default Acknowledgement;
