"use client";
import React, { useState, useEffect } from "react";
import AcademicSessions from "../academicSessions";
import AcademicClasses from "../academicClasses";
import axios from "axios";
import { API_BASE_URL } from "@/config";
import StudentData from "../../atoms/studentData";

interface Data {
  _id:string,
  selectedYear:string, 
  studentName:string, 
  studentClass: string, 
  uploadedFileUrl: string
}
const StudentUI = () => {
 const [display, setDisplay] = useState<boolean>(false)
 const [displayClasses, setDisplayClasses] = useState<boolean>(false)
 const [studentData, setStudentData] = useState<string[]>([])
 const [selectedYear, setSelectedYear] = useState<string>("")
 const [studentClass, setStudentClass] = useState<string>("")
 const [results, setResults] = useState<Data[]>([]); // To store search results
 const [loading, setLoading] = useState<boolean>(false);
 const [error, setError] = useState<string | null>(null);
 const [update, setUpdate] = useState<boolean>(false)

 const showClasses = (value: string) => {
  setDisplay(true)
  setSelectedYear(value)
 }
 
//  handling student data for each classes
 const studentProfile = async (value: string) =>{
  setStudentClass(value)
  setUpdate(!update)
  setDisplayClasses(true)
 };

 const fetchData = async () =>{
  setLoading(true);
  setError(null);
  try {
    const response = await axios.get(`${API_BASE_URL}/student`, {
      params: { selectedYear, studentClass },
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
  setDisplayClasses(false)
  setDisplay(true)
  // setUpdate(!update)
 }
// back to session menu
 const sessionBack = () => {
  setDisplay(false)
 }
  
    useEffect(() => {
      fetchData();
    }, [update]);
 

//  getting data of added classes
 useEffect (() => {
  const fetchData = async () => {
    const response = await axios.get(`${API_BASE_URL}/student`);
    const datas = response.data
    const studentClasses =  datas.map((data: Data) => data.studentClass)
    setStudentData(studentClasses)
  }
  fetchData()
 },[fetchData, setStudentData])


 
return (
<div>
     <div>
       {displayClasses ? <StudentData data={results} loading={loading} error={error} handleBack={handleBack}/> : 
       <div>
       {display ? <AcademicClasses handleBack={sessionBack} classesData={studentData} studentsProfile={studentProfile}/> : <AcademicSessions showClasses={showClasses} textTitle="Academic Year List"/> }
       </div> 
      }
    </div>
</div>
  );
};

export default StudentUI;
