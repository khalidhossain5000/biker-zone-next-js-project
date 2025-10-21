import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '../api/auth/[...nextauth]/route';

const DashboardHomePage = async() => {
    const session = await getServerSession(authOptions);
    console.log('this is session in dashboard page',session);
    return (
        <div>
            <h2>Welcome to dashboard and it will be shown based on user role</h2>
        </div>
    );
};

export default DashboardHomePage;