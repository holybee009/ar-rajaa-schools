import axios from 'axios';
import { API_BASE_URL } from '@/config';
import { notFound } from 'next/navigation';
import Header from '@/app/components/minicomponents/header.tsx';
import PageWrapper from '@/app/components/minicomponents/pageWrapper';
import Image from 'next/image';
import Footer from '@/app/components/minicomponents/footer';

interface NewsProps {
  params: {
    id: string;
  };
}

// Fetch news data for the specific `id`
async function fetchNewsById(id: string) {
  try {
    const response = await axios.get(`${API_BASE_URL}/news`+  id);
    return response.data;
  } catch (error) {
    return null;
  }
}

export default async function NewsPage({ params }: NewsProps) {
  const { id } = params;
  console.log(id); // Ensure this logs correctly for debugging

  // Fetch news item
  const newsItem = await fetchNewsById(id);

  // If the news item is not found, return a 404
  if (!newsItem) {
    notFound();
  }

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

 
  return (
    <div>
    <Header home={false} status='news'/>
    <PageWrapper className='pt-10'>
        <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-2 uppercase">{newsItem.title}</h1>
        <p className="text-sm text-gray-500 mb-4">Published on {getFormattedDate(newsItem.date)}</p>
        <Image src={newsItem.newsPhoto} alt='photo' width={100} height={100} className='w-full mb:w-1/4 mb-2'/>
        <div>
            {newsItem.content.split('\n').map((paragraph:string, index:number) => (
                paragraph.trim() && (  // Ensure we don't create empty paragraphs
                <p key={index} className="mb-4">
                    {paragraph}
                </p>
                )
            ))}
        </div>
        </div>
    </PageWrapper>
    <Footer/>
    </div>
  );
}

// Generates paths for dynamic routes based on available news items
export async function generateStaticParams() {
  const response = await axios.get(`${API_BASE_URL}/news`); // Replace with your news API
  const newsItems = response.data;

  // Generate the list of params for all news items
  return newsItems.map((item: { _id: string }) => ({
    id: item._id,
  }));
}
