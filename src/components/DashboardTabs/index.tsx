import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { CustomTabPanel } from '@/components/DashboardTabs/utils/CustomTabPanel';
import { a11yProps } from '@/components/DashboardTabs/utils/al11yProps';
import { DashboardTabsContainer } from './styles';
import { useRouter } from 'next/router';

const DashboardTabs = () => {
    const router = useRouter();
    const [currentTab, setCurrentTab] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        event.preventDefault();
        setCurrentTab(newValue);
        router.push(`/dashboard${newValue === 0 ? '' : newValue === 1 ? '?type=statistics' : '?type=transactions'}`, undefined, {
            shallow: true,
        });
    };

    return (
        <DashboardTabsContainer>
            <Box sx={{ width: '100%', marginTop: '40px' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        sx={{ padding: '0 10px' }}
                        value={currentTab}
                        onChange={handleChange}
                        aria-label="Tabs for dashboard functionalities"
                        centered
                    >
                        <Tab sx={{ fontSize: '13px' }} label="Add Record" {...a11yProps(0)} />
                        <Tab sx={{ fontSize: '13px' }} label="Statistics" {...a11yProps(1)} />
                        <Tab sx={{ fontSize: '13px' }} label="Transactions" {...a11yProps(2)} />
                    </Tabs>
                </Box>
                <CustomTabPanel currentTab={currentTab} index={0}></CustomTabPanel>
                <CustomTabPanel currentTab={currentTab} index={1}></CustomTabPanel>
                <CustomTabPanel currentTab={currentTab} index={2}></CustomTabPanel>
            </Box>
        </DashboardTabsContainer>
    );
};

export default DashboardTabs;

