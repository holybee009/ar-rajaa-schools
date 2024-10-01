"use client"
// components/NewsBlock.tsx
import React from 'react';
import Image from 'next/image';

interface NewsBlockProps {
   src: string,
   title: string,
   content: string
}


const NewsBlock: React.FC<NewsBlockProps> = ({ src, title, content }) => {

  return (
    <>
    <div className='flex flex-col h-full bg-[#D9D9D9] w-40 h-56 pb-2'>
        <Image src={src} alt='photo' width={80} height={80} className='w-40 h-36'/>
        <p className="text-left text-md font-bold capitalize truncate pt-2 px-2">{title}</p>
        <div className="w-full max-w-lg h-20 text-sm overflow-hidden text-ellipsis px-2 ">
          <p className="line-clamp-3 leading-1">
          {content}
          </p>
        </div>

        {/* <p className="text-left text-sm truncate px-2 line-clamp-3">{content}</p> */}
    </div> 
   
    </>
  );
};

export default NewsBlock;
