import React from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { CustomTabPanel } from '@/components/DashboardTabs/utils/CustomTabPanel';
import { a11yProps } from '@/components/DashboardTabs/utils/al11yProps';
import { DashboardTabsContainer } from './styles';
import AddRecordsComponent from '../AddRecords';
import StatisticsComponent from '../Statistics';
import OverviewComponent from '../Overview';
import TransactionsComponent from '../Transactions';
import { User } from '@/store/types';

type DashboardTabsProps = {
    user: User;
}

function DashboardTabs({ user }: DashboardTabsProps) {
    const [currentTab, setCurrentTab] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    return (
        <DashboardTabsContainer>
            <Box sx={{ width: '100%', marginTop: '40px' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        sx={{ padding: "0 10px" }}
                        value={currentTab}
                        onChange={handleChange}
                        aria-label="Tabs for dashboard functionalities"
                        centered
                    >
                        <Tab sx={{ fontSize: "13px" }} label="Add Record" {...a11yProps(0)} wrapped />
                        <Tab sx={{ fontSize: "13px" }} label="Statistics" {...a11yProps(1)} />
                        <Tab sx={{ fontSize: "13px" }} label="Overview" {...a11yProps(2)} />
                        <Tab sx={{ fontSize: "13px" }} label="Transactions" {...a11yProps(3)} />
                    </Tabs>
                </Box>
                <CustomTabPanel currentTab={currentTab} index={0}>
                    <AddRecordsComponent user={user} />
                </CustomTabPanel>
                <CustomTabPanel currentTab={currentTab} index={1}>
                    <StatisticsComponent />
                </CustomTabPanel>
                <CustomTabPanel currentTab={currentTab} index={2}>
                    <OverviewComponent />
                </CustomTabPanel>
                <CustomTabPanel currentTab={currentTab} index={3}>
                    <TransactionsComponent />
                </CustomTabPanel>
            </Box>
        </DashboardTabsContainer>
    )
}

export default DashboardTabs;