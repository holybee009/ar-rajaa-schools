"use client"
// Studentsonents/Students.tsx
import Header from '../components/minicomponents/header.tsx';
import StudentsUI from '../components/minicomponents/studentUI/index.tsx';
import PageWrapper from '../components/minicomponents/pageWrapper/index.tsx';


const Students: React.FC = () => {
  return (
    <>
    <div>
        <Header  home={false} status='students'/>
        <PageWrapper>
            <StudentsUI />
        </PageWrapper>
    </div>
    </>
  );
};

export default Students;
