
import BikeDetailsCard from '@/components/Bike-Details/BikeDetailsCard';
import React from 'react';

const BikeDetails =async ({params}) => {
    
    const bikeId= params.id
    return (
        <div>
            <h2>THis is bike details page</h2>
            <div>
                <BikeDetailsCard bikeId={bikeId}/>
            </div>
        </div>
    );
};

export default BikeDetails;