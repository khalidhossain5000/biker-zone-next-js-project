import LatestNewsTable from '@/components/Dashboard/Admin/LatestNews/LatestNewsTable';
import React from 'react';

const AllLatestNews = () => {
    return (
        <div className='p-6'>
            <h2 className='text-center text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6'>ALl altest news</h2>

            <LatestNewsTable/>
        </div>
    );
};

export default AllLatestNews;