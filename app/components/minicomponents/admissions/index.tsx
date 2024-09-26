"use client"
// Admissiononents/Admission.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import Kindergateen from "../../images/kindergateen.jpg"
import Nursery from "../../images/nursery.jpg"
import Basic from "../../images/basic.jpg"
import AdmissionBlock from '../../atoms/admissionBlock';

interface AdmissionProps {
    handleScroll: (_: string) => void
}


const Admission: React.FC = () => {

    const admitData = [{
        photo: Kindergateen, schoolClass: "kindergateen"
    }, {
        photo: Nursery, schoolClass: "nursery"
    }, {
        photo: Basic, schoolClass: "basic"
    }]

  return (
    <>
    <div className='mb-8'>
        <h1 className='capitalize mb-3 font-semibold text-xl'>admissions:</h1>
        <div className="flex flex-col md:flex-row justify-between gap-4 px-7">
            {admitData.map((admit) => <AdmissionBlock admitPhoto={admit.photo.src} schoolClass={admit.schoolClass}/>)}
        </div>
    </div>
    </>
  );
};

export default Admission;
