import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]/route';
import AdminChartHome from '@/components/Dashboard/Admin/AdminHomePageCharts/AdminChartHome';

const DashboardHomePage = async() => {
    const session = await getServerSession(authOptions);
    console.log('this is session in dashboard global home page',session);
    return (
        <div>
            {/* <h2>Welcome to dashboard and it will be shown based on user role</h2> */}
            <AdminChartHome/>
        </div>
    );
};

export default DashboardHomePage;