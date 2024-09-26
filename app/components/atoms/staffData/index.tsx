'use client'
import Button from "../button"
import StaffBlock from "../staffBlock"

interface Staff{
    _id: string,
    selectedYear: string,
    staffClass: string,
    staffName: string,
    uploadedFileUrl: string
}

interface Props {
    data: Staff[]
    error: string | null,
    loading: boolean,
    handleBack: () => void
}

const StaffData = ({data,loading,error, handleBack}: Props) =>{

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
         <StaffBlock 
            key={datas._id}
            src={datas.uploadedFileUrl}
            title={datas.staffName}
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

export default StaffData;

