"use client"
// components/News.tsx
import NewsBlock from '../../atoms/newsBlock/index';
import './CustomScrollbar.css';
import Link from 'next/link';


interface NewsSchema {
  _id: string;
  title: string;
  content: string;
  newsPhoto: string;
  date: string;
}
interface Props {
    newsData: NewsSchema[]
}

const News: React.FC<Props> = ({newsData}) => {

  return (
    <>
      <div className='w-full'>
        <h1 className="text-xl text-white mb-2">News:</h1>
          <div className="flex gap-3 overflow-x-auto custom-scrollbar">
            {newsData.length > 0 ? (
              newsData.map((news) => (
                <Link  href={`/news/${news._id}`}  key={news._id}>
                <NewsBlock
                  src={news.newsPhoto}
                  title={news.title}
                  content={news.content}
                />
                </Link>
              ))
            ) : (
              <h1>No news yet</h1>
            )}
          </div>
      </div>
    </>
  );
};

export default News;
