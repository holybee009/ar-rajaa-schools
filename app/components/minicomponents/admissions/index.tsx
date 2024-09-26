"use client"
// Admissiononents/Admission.tsx
import Kindergateen from "../../images/kindergateen.jpg"
import Nursery from "../../images/nursery.jpg"
import Basic from "../../images/basic.jpg"
import AdmissionBlock from '../../atoms/admissionBlock';


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
            {admitData.map((admit, index) => <AdmissionBlock key={index} admitPhoto={admit.photo.src} schoolClass={admit.schoolClass}/>)}
        </div>
    </div>
    </>
  );
};

export default Admission;
