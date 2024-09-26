"use client"
// components/News.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '@/config';
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

const News: React.FC = () => {
  const [newsData, setNewsData] = useState<NewsSchema[]>([]);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/news`)
      .then((response) => {
        setNewsData(response.data.slice().reverse());
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false); // Set loading to false if an error occurs
      });
  }, []);


  return (
    <>
      <div className='w-full'>
        <h1 className="text-xl text-white mb-2">News:</h1>
        {loading ? ( // Show loading message while fetching data
          <h1>Loading...</h1>
        ) : (
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
        )}
      </div>
    </>
  );
};

export default News;
