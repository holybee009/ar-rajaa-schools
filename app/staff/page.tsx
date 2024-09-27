"use client"
// Staffonents/Staff.tsx
import Header from '../components/minicomponents/header.tsx';
import StaffUI from '../components/minicomponents/staffUI/index.tsx';
import PageWrapper from '../components/minicomponents/pageWrapper/index.tsx';
import Footer from '../components/minicomponents/footer/index.tsx';


const Staff: React.FC = () => {

  return (
    <>
    <div>
        <Header  home={false} status='staff'/>
        <PageWrapper>
            <StaffUI />
        </PageWrapper>
        <Footer />
    </div>
    </>
  );
};

export default Staff;
