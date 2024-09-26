"use client";
import React, { useRef,useEffect,useState } from "react";
import { API_BASE_URL } from "@/config";
import Header from "./components/minicomponents/header.tsx";
import PageWrapper from "./components/minicomponents/pageWrapper/index.tsx";
import News from "./components/minicomponents/news/index.tsx";
import Recent from "./components/minicomponents/recent/index.tsx";
import Event from "./components/minicomponents/events/index.tsx";
import Acknowledgement from "./components/minicomponents/acknowledgement/index.tsx";
import Vision from "./components/minicomponents/vision/index.tsx";
import Admission from "./components/minicomponents/admissions/index.tsx";
import Footer from "./components/minicomponents/footer/index.tsx";
import axios from "axios";
import Image from "next/image.js";
import Logo from "./components/images/ar-rajaa logo1.png"



interface aboutSchema{
  _id:string,
  about:string,
}
export default function Home() {
  const [about, setAbout] = useState<aboutSchema[]>([])
  const newsRef = useRef<HTMLDivElement>(null);
  const eventRef = useRef<HTMLDivElement>(null);
  const admissionsRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(()=>{
    axios.get(`${API_BASE_URL}/about`)
    .then(response => {
      setAbout(response.data.slice().reverse());
      setLoading(false); // Set loading to false when data is fetched
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      setLoading(false); // Set loading to false even if there is an error
    });
  },[])


  // Offset the scroll to account for the fixed navbar height
  const handleScroll = (val: string) => {
    const offset = 100; // Adjust this to match your fixed header height
    let element: HTMLDivElement | null = null;

    switch (val) {
      case "news":
        element = newsRef.current;
        break;
      case "events":
        element = eventRef.current;
        break;
      case "admissions":
        element = admissionsRef.current;
        break;
      default:
        break;
    }

    if (element) {
      const topPosition = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({
        top: topPosition,
        behavior: "smooth",
      });
    }
  };



  return (
    <>
      <div className="relative">
      {loading ? (
        // Show the loading image if any of the components is still loading
        <div className="fixed inset-0 flex justify-center items-center bg-white z-50">
          <Image
            src={Logo} // Path to your loading image
            alt="Loading"
            width={150}
            height={150}
            className="animate-grow-shrink"  // Varying opacity
          />
        </div>
      ) :   <div>
      <Header handleScroll={handleScroll} home={true} about={about[0]?.about}/>
      <PageWrapper>
        <Recent />
      </PageWrapper>
      <div className="bg-[#0D3C1D] my-6 px-4 md:px-8 lg:px-16 p-4 py-6 flex flex-col md:flex-row justify-between gap-10">
        <div ref={newsRef} className='w-full md:w-1/2'>
          <News />
        </div>
        <div ref={eventRef} className="w-full">
          <Event />
        </div>
      </div>
      <PageWrapper className="pt-1 md:pt-4">
        <Acknowledgement />
        <Vision />
        <div ref={admissionsRef}>
          <Admission />
        </div>
      </PageWrapper>
      <Footer handleScroll={handleScroll} />
    </div>
    }
    </div>
    </>
  );
}
