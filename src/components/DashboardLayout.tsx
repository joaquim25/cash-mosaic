import { User } from '@/store/types';
import React from 'react'
import DashboardHeader from './DashboardHeader';
import DashboardTabs from './DashboardTabs';
import styled from 'styled-components';

type DashboardLayoutProps = {
    children: any;
    user: User;
};

const DashboardContainer = styled.div`
    min-height: 100vh;
`

function DashboardLayout({ children, user }: DashboardLayoutProps) {
    return (
        <DashboardContainer>
            <DashboardHeader user={user} />
            <DashboardTabs />
            {children}
        </DashboardContainer>
    )
}

export default DashboardLayout