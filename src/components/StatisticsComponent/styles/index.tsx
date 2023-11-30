import { styled } from 'styled-components';
import { Tabs, Tab } from "@mui/material";

export const StatisticsContainer = styled.div`
    padding: 16px;
`

export const StatisticsCard = styled.div`
    margin: 20px auto 0 auto;
    background-color: #677379;
    border-radius: 24px;
    max-width: 1000px;
`

export const StatisticsTabsContainer = styled.div`
    width: 100%;
    color: white;
`

export const StatisticsTabs = styled(Tabs)({
    borderBottom: '0px solid #fff',
    '& .MuiTabs-indicator': {
        backgroundColor: '#fff',
    },
});

export const StatisticTab = styled(Tab)({
    width: "20px",

    '&:hover': {
        color: '#fff',
        opacity: 1,
    },
    '&.Mui-selected': {
        color: '#fff',
        fontWeight: 600,
    },
    '&.Mui-focusVisible': {
        backgroundColor: '#d1eaff',
    },

})
