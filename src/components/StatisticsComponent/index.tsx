import React from 'react'
import { StatisticTab, StatisticsContainer, StatisticsTabs, StatisticsTabsContainer } from './styles'
import { Box } from '@mui/material';
import { CustomTabPanel } from '../../components/DashboardTabs/utils/CustomTabPanel';
import { a11yProps } from '../../components/DashboardTabs/utils/al11yProps';
import StatisticsChart from '../../components/StatisticsChart';
import HydrationSafety from '@/components/HydrationSafety/HydrationSafety';

type StatisticsPageProps = {
    data: { label: string, value: number }[];
};

function StatisticsComponent({ data }: StatisticsPageProps) {
    const [currentTab, setCurrentTab] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };


    return (
        <HydrationSafety>
            <StatisticsContainer>
                <StatisticsTabsContainer>
                    <Box sx={{ width: '100%', marginTop: '10px' }}>
                        <Box>
                            <StatisticsTabs
                                variant='scrollable'
                                scrollButtons
                                allowScrollButtonsMobile
                                sx={{ padding: "0 5px" }}
                                value={currentTab}
                                onChange={handleChange}
                                aria-label="Tabs for dashboard functionalities"
                            >
                                <StatisticTab sx={{ fontSize: "14px", color: "#eee" }} label="Day" {...a11yProps(0)} />
                                <StatisticTab sx={{ fontSize: "14px", color: "#eee" }} label="Week" {...a11yProps(1)} />
                                <StatisticTab sx={{ fontSize: "14px", color: "#eee" }} label="Month" {...a11yProps(2)} />
                                <StatisticTab sx={{ fontSize: "14px", color: "#eee" }} label="Year" {...a11yProps(3)} />
                                <StatisticTab sx={{ fontSize: "14px", color: "#eee" }} label="Range" {...a11yProps(4)} />
                            </StatisticsTabs>
                        </Box>
                        <CustomTabPanel currentTab={currentTab} index={0}>
                            {currentTab === 0 && <StatisticsChart data={data} type="day" />}
                        </CustomTabPanel>
                        <CustomTabPanel currentTab={currentTab} index={1}>
                            {currentTab === 1 && <StatisticsChart data={data} type="week" />}
                        </CustomTabPanel>
                        <CustomTabPanel currentTab={currentTab} index={2}>
                            {currentTab === 2 && <StatisticsChart data={data} type="month" />}
                        </CustomTabPanel>
                        <CustomTabPanel currentTab={currentTab} index={3}>
                            {currentTab === 3 && <StatisticsChart data={data} type="year" />}
                        </CustomTabPanel>
                        <CustomTabPanel currentTab={currentTab} index={4}>
                            {currentTab === 4 && <StatisticsChart data={data} type="range" />}
                        </CustomTabPanel>
                    </Box>
                </StatisticsTabsContainer>

            </StatisticsContainer>
        </HydrationSafety>
    )
}

export default StatisticsComponent;