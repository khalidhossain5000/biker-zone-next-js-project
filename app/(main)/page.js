import Slider from '@/components/HomePage/BannerSlider/Slider';
import FeaturedBike from '@/components/HomePage/FeaturedBike/FeaturedBike';
import React from 'react';

const page = () => {
    return (
        <div className='container mx-auto'>
            <Slider/>
            <FeaturedBike/>
        </div>
    );
};

export default page;