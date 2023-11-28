import React, { useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Link from 'next/link';  // Import Link from Next.js
import { CustomTabPanel } from '@/components/DashboardTabs/utils/CustomTabPanel';
import { a11yProps } from '@/components/DashboardTabs/utils/al11yProps';
import { DashboardTabsContainer } from './styles';
import { useRouter } from 'next/router';

function DashboardTabs() {
    const router = useRouter();
    const [currentTab, setCurrentTab] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    useEffect(() => {
        switch (router.pathname) {
            case '/dashboard':
                setCurrentTab(0);
                break;
            case '/statistics':
                setCurrentTab(1);
                break;
            case '/transactions':
                setCurrentTab(2);
                break;
            default:
                break;
        }
    }, [router.pathname]);

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
                        <Link href="/dashboard">
                            <Tab sx={{ fontSize: '13px' }} label="Add Record" {...a11yProps(0)} />
                        </Link>
                        <Link href="/statistics">
                            <Tab sx={{ fontSize: '13px' }} label="Statistics" {...a11yProps(1)} />
                        </Link>
                        <Link href="/transactions">
                            <Tab sx={{ fontSize: '13px' }} label="Transactions" {...a11yProps(2)} />
                        </Link>
                    </Tabs>
                </Box>
                <CustomTabPanel currentTab={currentTab} index={0}>
                </CustomTabPanel>
                <CustomTabPanel currentTab={currentTab} index={1}>
                </CustomTabPanel>
                <CustomTabPanel currentTab={currentTab} index={2}>
                </CustomTabPanel>
            </Box>
        </DashboardTabsContainer>
    );
}

export default DashboardTabs;
