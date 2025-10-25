import Slider from '@/components/HomePage/BannerSlider/Slider';
import FeaturedBike from '@/components/HomePage/FeaturedBike/FeaturedBike';
import LatestNewsCard from '@/components/HomePage/LatestNews/LatestNewsCard';
import React from 'react';

const page = () => {
    return (
        <div className='container mx-auto'>
            <Slider/>
            <FeaturedBike/>
            <LatestNewsCard/>
        </div>
    );
};

export default page;