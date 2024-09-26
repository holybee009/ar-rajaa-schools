"use client"
// Calendaronents/Calendar.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import Header from '../components/minicomponents/header.tsx';
import CalendarData from '../components/minicomponents/calendarData/index.tsx';
import PageWrapper from '../components/minicomponents/pageWrapper/index.tsx';
import Footer from '../components/minicomponents/footer/index.tsx';


const Calendar: React.FC = () => {
  return (
    <>
    <div>
        <Header  home={false}/>
        <PageWrapper>
            <CalendarData />
        </PageWrapper>
        <Footer/>
    </div>
    </>
  );
};

export default Calendar;
