"use client";
import React, { useState, useEffect } from "react";
import AcademicSessions from "../academicSessions";
import AcademicClasses from "../academicClasses";
import axios from "axios";
import { API_BASE_URL } from "@/config";
import StaffData from "../../atoms/staffData";

interface Data {
  selectedYear:string, 
  staffName:string, 
  staffClass: string, 
  uploadedFileUrl: string
}
const StaffUI = () => {
 const [displayStaff, setDisplayStaff] = useState<boolean>(false)
 const [displayStaffClassesStaff, setDisplayStaffClassesStaff] = useState<boolean>(false)
 const [staffData, setStaffData] = useState<string[]>([])
 const [selectedYear, setSelectedYear] = useState<string>("")
 const [staffClass, setStaffClass] = useState<string>("")
 const [results, setResults] = useState<any[]>([]); // To store search results
 const [loading, setLoading] = useState<boolean>(false);
 const [error, setError] = useState<string | null>(null);
 const [update, setUpdate] = useState<boolean>(false)

 const showClasses = (value: string) => {
  setDisplayStaff(true)
  setSelectedYear(value)
 }
 
//  handling staff data for each classes
 const staffProfile = async (value: string) =>{
  setStaffClass(value)
  setUpdate(!update)
  setDisplayStaffClassesStaff(true)
 };

 const fetchData = async () =>{
  setLoading(true);
  setError(null);
  try {
    const response = await axios.get(`${API_BASE_URL}/staff`, {
      params: { selectedYear, staffClass },
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
 }
// back to classes menu
 const handleBack = () =>{
  setDisplayStaffClassesStaff(false)
  setDisplayStaff(true)
  // setUpdate(!update)
 }
// back to session menu
 const sessionBack = () => {
  setDisplayStaff(false)
 }
  
    useEffect(() => {
      fetchData();
    }, [update]);
 

//  getting data of added classes
useEffect(() => {
  const fetchData = async () => {
    const response = await axios.get(`${API_BASE_URL}/staff`);
    const datas = response.data;
    const staffClasses = datas.map((data: Data) => data.staffClass);
    setStaffData(staffClasses);
  };

  fetchData();
}, [setStaffData, fetchData]); // Add setStaffData as a dependency


 
return (
<div>   
     <div>
        {displayStaffClassesStaff ? <StaffData data={results} loading={loading} error={error} handleBack={handleBack}/> : 
        <div>
        {displayStaff ? <AcademicClasses handleBack={sessionBack} classesData={staffData} studentsProfile={staffProfile}/> : <AcademicSessions showClasses={showClasses} textTitle="Academic Year List"/> }
        </div> 
        }
     </div>        
</div>
  );
};

export default StaffUI;
