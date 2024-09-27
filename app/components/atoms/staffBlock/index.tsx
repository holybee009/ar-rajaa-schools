"use client"
import Image from "next/image";

interface Props {
    src: string;
    title: string;
}

const StaffBlock = ({src, title} : Props)  =>{


    return (
        <>
        <div className="relative flex flex-col items-center justify-center p-0">  
          <div className="relative w-full h-24"> 
            <Image
                src={src}
                alt="Description"
                layout="fill"
                objectFit="cover"  // Use Tailwind's utility class for object-fit
                className="absolute inset-0 rounded-xl"
            />
          </div>
            <p className="text-center text-sm leading-3 justify-self-end mt-2 capitalize">{title}</p>
        </div>
        </>
    )
}

export default StaffBlock;
