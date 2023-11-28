import { User } from '@/store/types';
import React from 'react'
import DashboardHeader from './DashboardHeader';
import DashboardTabs from './DashboardTabs';

type DashboardLayoutProps = {
    children: any;
    user: User;
};

function DashboardLayout({ children, user }: DashboardLayoutProps) {
    return (
        <>
            <DashboardHeader user={user} />
            <DashboardTabs />
            {children}
        </>
    )
}

export default DashboardLayout