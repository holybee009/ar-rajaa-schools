"use client"
// Eventonents/Event.tsx
import { useState,useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
import EventBlock from '../../atoms/eventBlock';
import './CustomScrollbar.css'; // Import custom scrollbar styles


interface EventSchema {
    _id: string,
    eventName: string,
    eventVenue: string,
    date: string,
}

const Event: React.FC = () => {
    const [eventData, setEventData] = useState<EventSchema[]>([]);
    const [loading, setLoading] = useState(true); // Added loading state

    useEffect(() => {
        axios.get(`${API_BASE_URL}/event`)
          .then(response => {
            setEventData(response.data.slice().reverse());
            setLoading(false); // Set loading to false after data is fetched
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            setLoading(false); // Set loading to false if an error occurs
          });
      }, []);


        // for getting the desired date format
    const getFormattedDate = (value:string) =>{
        const isoDateString: string = value;
        const date: Date = new Date(isoDateString);
        
        // Function to get the ordinal suffix for the day
        const getOrdinalSuffix = (day: number): string => {
          if (day > 3 && day < 21) return 'th'; // 11th, 12th, 13th, etc.
          switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
          }
        };
        
        const day: number = date.getDate();
        const month: string = date.toLocaleString('default', { month: 'long' });
        const year: number = date.getFullYear();
        
        const formattedDate: string = `${day}${getOrdinalSuffix(day)}, ${month} ${year}`;
        return formattedDate;   
    }

  return (
    <>
        <div className='w-full h-56 mt-2 md:mt-0'>
        <h1 className="text-xl text-white mb-2 capitalize">event:</h1>
        {loading ? ( // Show loading message while fetching data
          <h1>Loading...</h1>
        ) : (
            <div className="w-full h-48 sm:h-64 p-4 overflow-y-auto custom-scrollbar">
            {eventData.length > 0 ? (
              eventData.map((event) => (
                <EventBlock
                  key={event._id}
                  title={event.eventName}
                  location={event.eventVenue}
                  date={getFormattedDate(event.date)}     
                />
              ))
            ) : (
              <h1>No event yet</h1>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Event;
