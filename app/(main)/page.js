import Slider from '@/components/HomePage/BannerSlider/Slider';
import Faq from '@/components/HomePage/Faq/Faq';
import FeaturedBike from '@/components/HomePage/FeaturedBike/FeaturedBike';
import LatestNewsCard from '@/components/HomePage/LatestNews/LatestNewsCard';
import React from 'react';

const page = () => {
    return (
        <div className='container mx-auto'>
            <Slider/>
            <FeaturedBike/>
            <LatestNewsCard/>
            <Faq/>
        </div>
    );
};

export default page;