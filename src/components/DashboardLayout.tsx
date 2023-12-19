/* eslint-disable react/display-name */
import { User } from '@/store/types';
import React, { ReactNode } from 'react'
import DashboardHeader from './DashboardHeader';
import DashboardTabs from './DashboardTabs';
import styled from "@emotion/styled"

type DashboardLayoutProps = {
    children: ReactNode;
    user: User;
};

const DashboardContainer = styled.div`
    min-height: 100vh;
`

const DashboardLayout = React.memo(({ children, user }: DashboardLayoutProps) => {

    return (
        <DashboardContainer>
            <DashboardHeader user={user} />
            <DashboardTabs />
            {children}
        </DashboardContainer>
    );
});

export default DashboardLayout;