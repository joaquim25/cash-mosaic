import { styled } from 'styled-components';
import { PieChart } from '@mui/x-charts/PieChart';

export const RangeSelectorContainer = styled.div`
    padding: 10px 0 40px 0;
    display: flex;
    justify-content: center;
    gap: 20px;
`

export const RangeSubmitButton = styled.button`
    box-sizing: border-box;
    background-color: #D6E1DF;
    cursor: pointer;
    padding: 3px 30px;
    border-radius: 10px;
    border: none;
    outline: none;
    transition: all .2s ease-in-out;

    &:hover{
        transform: scale(.95);
        border-radius: 16px;
        box-shadow: 0 0 7px 1px #b5b1b1;
    }
`

export const StatisticsChartContainer = styled.div`
    background-color: #D6E1DF;
    border-radius: 16px;
    display: flex;
`

export const StatisticsPieChart = styled(PieChart)`

    // // & .MuiPieArcLabel-root{
    // //     background-color: #333;
    // // }
    // & svg {

    //     & .MuiChartsLegend-column{
    //         background-color: #333;
    //     }
    //     & .MuiChartsLegend-mark{
    //         border: 2px solid black;
    //     }
    // }

`