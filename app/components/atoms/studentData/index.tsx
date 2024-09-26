'use client'
import Button from "../button"
import StudentBlock from "../studentBlock"

interface Student{
    _id: string,
    selectedYear: string,
    studentClass: string,
    studentName: string,
    uploadedFileUrl: string
}

interface Props {
    data: Student[]
    error: string | null,
    loading: boolean,
    handleBack: () => void
}

const StudentData = ({data,loading,error, handleBack}: Props) =>{
    
  
    return <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : 
      data.length > 0 ? 
      (
        <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {
        data.slice().reverse().map((datas) => 
         <StudentBlock 
            key={datas._id}
            src={datas.uploadedFileUrl}
            title={datas.studentName}
        />
        )
        }
        </div>
      ) : (
        <p>No post yet</p>
      )}
      <Button href="#" text="back" onClick={() => handleBack()} className="absolute right-3 bottom-3 w-full inset-x-0"/>
    </div>
}

export default StudentData;