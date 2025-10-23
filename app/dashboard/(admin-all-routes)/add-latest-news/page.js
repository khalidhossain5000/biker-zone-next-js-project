import LatestNewsForm from '@/components/Dashboard/Admin/LatestNews/LatestNewsForm';
import React from 'react';
const LatestNews = () => {
    return (
        <div className='p-6'>
            <h2 className='text-center text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6'>Latest News</h2>
            <LatestNewsForm/>
        </div>
    );
};

export default LatestNews;