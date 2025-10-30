import React from 'react';
import BrandChart from './BrandStatsCHart/BrandChart';
import PaymentChart from './PaymentMethodStatsChart/PaymentChart';
import UsersRole from './UsersRoleStatsChart/UsersRole';

const AdminChartHome = () => {
    return (
        <div className='pt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 px-5 2xl:px-3 items-center gap-5 '>
            <BrandChart/>
            <PaymentChart/>
            <UsersRole/>
        </div>
    );
};

export default AdminChartHome;