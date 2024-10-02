"use client"
import {useState} from "react"
import AcademicSessions from "../academicSessions";
import axios from "axios";
import { API_BASE_URL } from "@/config";
import CalendarBlock from "../../atoms/CalendarBlock";
import Button from "../../atoms/button";
import Terms from "../../term"

interface Data{
    _id: string,
    selectedNumber: number,
    startDate:string, 
    endDate:string, 
    scheduleName:string
  };

interface CalendarSchema {
    _id: string,
  selectedYear: string,
  term: string,
  calendarData: Data[],
};

const CalendarData = () => {
    const [calendarDisplay, setCalendarDisplay] = useState<boolean>(false)
    const [results, setResults] = useState<CalendarSchema[]>([]); // To store search results
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [terms, setTerms] = useState<boolean>(false)
    const [yearValue, setYearValue] = useState<string>("")


    // show calenders
    const showCalendar = (val:string) =>{
        setYearValue(val)
        setTerms(true)
    }

    const handleSelectTerm = async (term: string) => {
        setCalendarDisplay(true)
        try {
            const response = await axios.get(`${API_BASE_URL}/calendar`, {
              params: { selectedYear : yearValue, term},
            });
            setResults(response.data);
          }  catch (error) {
              if (axios.isAxiosError(error)) {
                      // Type guard: error is an instance of AxiosError
               setError(error.message);
               } else {
                      // Handle other types of errors
               setError("An unknown error occurred");
              }
            } finally {
            setLoading(false);
           }
    };
  
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

        const goBack = () =>{
            setCalendarDisplay(!calendarDisplay)
        }



    return (
        <>
        <div className="min-h-96"> 
        {calendarDisplay ? <div className="min-h-96">
              {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) :  results.length > 0 ? 
      (
        <div>
            <h1 className="text-center">{results[0].term}</h1>
        {
        results[0].calendarData.map((data:Data) =>
                 <CalendarBlock 
                    key={data._id}
                    weekNumber={data.selectedNumber}
                    scheduleName={data.scheduleName}
                    startDate={getFormattedDate(data.startDate)}
                    endDate={getFormattedDate(data.endDate)}
                  />
            )
        }
        </div>
      ) : (
        <p>No calendar yet</p>
      )}
      <div className="w-full absolute bottom-4 inset-x-0">
            <Button href="#" text="back" className="w-full"  onClick={goBack}/>
        </div>
        </div> : <div> {terms ? <Terms onSelectTerm={handleSelectTerm}/> : <AcademicSessions showClasses={showCalendar} textTitle="school calendars"/>}
       </div>}
        </div>
        </>
    )
}

export default CalendarData;
