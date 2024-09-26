"use client"
// Staffonents/Staff.tsx
import Header from '../components/minicomponents/header.tsx';
import StaffUI from '../components/minicomponents/staffUI/index.tsx';
import PageWrapper from '../components/minicomponents/pageWrapper/index.tsx';


const Staff: React.FC = () => {
const handleScroll =(val:string) => {
    return null
}
  return (
    <>
    <div>
        <Header  home={false} handleScroll={handleScroll}/>
        <PageWrapper>
            <StaffUI />
        </PageWrapper>
    </div>
    </>
  );
};

export default Staff;
