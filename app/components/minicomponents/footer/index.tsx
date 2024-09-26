"use client";
// FooterComponents/Footer.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import footerImage from "../../images/footer.jpg";
import Link from 'next/link';
import Modal from '../../atoms/modal';


interface FooterProps {
    handleScroll?: (_: string) => void;
}

interface aboutSchema{
    _id:string,
    about:string,
  }

const Footer: React.FC<FooterProps> = ({ handleScroll }) => {
    const [show, setShow] = useState<boolean>(false);
    const [about, setAbout] = useState<aboutSchema[]>([])

    const footerfunction = (actions:string) =>{
        if (handleScroll) {
            handleScroll(actions);
          }
    }

    useEffect(()=>{
        axios.get(`${API_BASE_URL}/about`)
        .then(response => {
          setAbout(response.data.slice().reverse());
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
      },[])

  return (
    <>
      <div
        className="flex flex-col md:flex-row mt-20 h-full text-white justify-around p-7 pt-12"
        style={{
          backgroundImage: `linear-gradient(0deg, #000000 0%, rgba(0, 0, 0, 0.65) 76%, rgba(0, 0, 0, 0) 100%), url(${footerImage.src})`, // Use footerImage.src if imported
          backgroundSize: 'cover', // Ensure the image covers the entire div
          backgroundPosition: 'center', // Center the image
        }}
      >
        <div className="flex justify-between md:justify-around w-full md:w-2/3 mb-8 md:mb-0">
            <div className="flex flex-col gap-3">
            <p className="capitalize cursor-pointer text-md md:text-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:underline" onClick={() =>setShow(true)}>about us</p>
            <p className="capitalize cursor-pointer text-md md:text-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:underline" onClick={() => footerfunction("news")}>news</p>
            <p className="capitalize cursor-pointer text-md md:text-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:underline" onClick={() => footerfunction("events")}>events</p>
            <Link href="/staff" className="capitalize cursor-pointer text-md md:text-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:underline">staff</Link>
            <Link href="/students" className="capitalize cursor-pointer text-md md:text-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:underline">students</Link>
            <Link href="school-calendar" className="capitalize cursor-pointer text-md md:text-lg transition-transform duration-300 ease-in-out hover:scale-105 hover:underline">school calendar</Link>
            </div>
            <div className="flex flex-col gap-3">
            <div>
                <h1 className='capitalize'>contact us</h1>
                <p className="ml-2">+234 802 258 19260</p>
            </div>
            <div>
                <h1 className='capitalize'>email</h1>
                <p className="ml-2">arrajaaschools@gmail.com</p>
            </div>
            </div>
        </div>
        <div className='w-full md:w-1/3 hidden md:block'>
          <h1 className='capitalize text-center uppercase'>about us</h1>
          <p>{about[0]?.about}</p>
        </div>
         {<Modal show={show} onClose={() => setShow(false)}>
                <div className='text-black text-center'>
                    <h1 className='text-center text-2xl uppercase pb-3'>About Us</h1>
                    <p className='text-justify'>{about.length > 0 ? about[0]?.about : "No information available."}</p> 
                </div>
            </Modal>
        }
      </div>
    </>
  );
};

export default Footer;
