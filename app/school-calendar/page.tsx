"use client"
// Calendaronents/Calendar.tsx
import Header from '../components/minicomponents/header.tsx';
import CalendarData from '../components/minicomponents/calendarData/index.tsx';
import PageWrapper from '../components/minicomponents/pageWrapper/index.tsx';
import Footer from '../components/minicomponents/footer/index.tsx';


const Calendar: React.FC = () => {
  return (
    <>
    <div>
        <Header  home={false} status='school calendar'/>
        <PageWrapper>
            <CalendarData />
        </PageWrapper>
        <Footer/>
    </div>
    </>
  );
};

export default Calendar;
