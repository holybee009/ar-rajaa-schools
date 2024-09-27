"use client";
import React, { useRef, useEffect, useState } from "react";
import { API_BASE_URL } from "@/config.ts";
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
import Image from "next/image";
import Logo from "./components/images/ar-rajaa logo1.png";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface aboutSchema {
  _id: string;
  about: string;
}

interface NewsSchema {
  _id: string;
  title: string;
  content: string;
  newsPhoto: string;
  date: string;
}

interface EventSchema {
  _id: string;
  eventName: string;
  eventVenue: string;
  date: string;
}

interface AckSchema {
  _id: string;
  acknowledgement: string;
  photo: string;
}
interface VisionSchema {
  _id: string;
  vision: string;
  photo: string;
}

interface activitiesSchema {
  activity: string;
  activityPhotos: string[];
}

export default function Home() {
  const newsRef = useRef<HTMLDivElement>(null);
  const eventRef = useRef<HTMLDivElement>(null);
  const admissionsRef = useRef<HTMLDivElement>(null);
  
  const [dataA, setDataA] = useState<activitiesSchema[]>([]);
  const [dataB, setDataB] = useState<NewsSchema[]>([]);
  const [dataC, setDataC] = useState<EventSchema[]>([]);
  const [dataD, setDataD] = useState<AckSchema[]>([]);
  const [dataE, setDataE] = useState<VisionSchema[]>([]);
  const [dataF, setDataF] = useState<aboutSchema[]>([]);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [responseA, responseB, responseC, responseD, responseE, responseF] = await Promise.all([
          axios.get(`${API_BASE_URL}/activities`),
          axios.get(`${API_BASE_URL}/news`),
          axios.get(`${API_BASE_URL}/event`),
          axios.get(`${API_BASE_URL}/acknowledgement`),
          axios.get(`${API_BASE_URL}/vision`),
          axios.get(`${API_BASE_URL}/about`),
        ]);

        setDataA(responseA.data.slice().reverse());
        setDataB(responseB.data.slice().reverse());
        setDataC(responseC.data.slice().reverse());
        setDataD(responseD.data.slice().reverse());
        setDataE(responseE.data.slice().reverse());
        setDataF(responseF.data.slice().reverse());
        
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleScroll = (val: string) => {
    const offset = 100;
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

  if (loading)
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white z-50">
        <Image
          src={Logo}
          alt="Loading"
          width={150}
          height={150}
          className="animate-grow-shrink"
        />
      </div>
    );

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const AnimatedComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const controls = useAnimation();
    const { ref, inView } = useInView({
      threshold: 0.1,
      triggerOnce: true,
    });

    useEffect(() => {
      if (inView) {
        controls.start("visible");
      }
    }, [controls, inView]);

    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={fadeInUp}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div className="relative">
      <Header handleScroll={handleScroll} home={true} about={dataF[0]?.about} />
      
      <AnimatedComponent>
        <PageWrapper>
          <Recent activitiesData={dataA} />
        </PageWrapper>
      </AnimatedComponent>

      <AnimatedComponent>
        <div className="bg-[#0D3C1D] my-6 px-4 md:px-8 lg:px-16 p-4 py-6 flex flex-col md:flex-row justify-between gap-10">
          <div ref={newsRef} className="w-full md:w-1/2">
            <News newsData={dataB} />
          </div>
          <div ref={eventRef} className="w-full">
            <Event eventData={dataC} />
          </div>
        </div>
      </AnimatedComponent>

      <AnimatedComponent>
        <PageWrapper className="pt-0 md:pt-4">
          <Acknowledgement acknowledgementData={dataD} />
          <Vision visionData={dataE} />
          <div ref={admissionsRef}>
            <Admission />
          </div>
        </PageWrapper>
      </AnimatedComponent>
      
      <Footer handleScroll={handleScroll} />
    </div>
  );
}
