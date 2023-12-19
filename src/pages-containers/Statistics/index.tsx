import React from 'react'
import { Box } from '@mui/material';
import { CustomTabPanel } from '../../components/DashboardTabs/utils/CustomTabPanel';
import { a11yProps } from '../../components/DashboardTabs/utils/al11yProps';
import StatisticsChart from '../../components/StatisticsChart';
import { StatisticTab, StatisticsCard, StatisticsContainer, StatisticsTabs, StatisticsTabsContainer } from './styles';

type StatisticsPageProps = {
    data: { label: string, value: number }[];
};

function Statistics({ data }: StatisticsPageProps) {
    const [currentTab, setCurrentTab] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };


    return (
        <>
            <StatisticsContainer>
                <StatisticsCard>
                    <StatisticsTabsContainer>
                        <Box>
                            <Box>
                                <StatisticsTabs
                                    variant='scrollable'
                                    scrollButtons
                                    allowScrollButtonsMobile
                                    sx={{ padding: "0 5px" }}
                                    value={currentTab}
                                    onChange={handleChange}
                                    aria-label="Tabs for dashboard functionalities"
                                    textColor="inherit"
                                >
                                    <StatisticTab sx={{ fontSize: "14px" }} label="Day" {...a11yProps(0)} />
                                    <StatisticTab sx={{ fontSize: "14px" }} label="Week" {...a11yProps(1)} />
                                    <StatisticTab sx={{ fontSize: "14px" }} label="Month" {...a11yProps(2)} />
                                    <StatisticTab sx={{ fontSize: "14px" }} label="Year" {...a11yProps(3)} />
                                    <StatisticTab sx={{ fontSize: "14px" }} label="Range" {...a11yProps(4)} />
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
                </StatisticsCard>

            </StatisticsContainer>
        </>
    )
}

export default Statistics;