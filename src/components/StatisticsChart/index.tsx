/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react'
import { ChartGenInfo, ChartLegend, ChartLengendItem, RangeSelectorContainer, RangeSubmitButton, StatisticsChartContainer } from './styles';
import { fetchMonthData, fetchRangeData, fetchWeekData, fetchYearData } from '@/services/statistics';
import { getAuthTokenFromCookies } from '../../../utils/cookies';
import axios from 'axios';
import dayjs from 'dayjs';
import SearchIcon from '@mui/icons-material/Search';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Alert, Snackbar } from '@mui/material';
import { PieChart } from '@mui/x-charts/PieChart';
import { getRandomColor, getTotalPeriodExpenses } from '../../../utils/statistics';


type StatisticsChartProps = {
    type: "day" | "week" | "month" | "year" | "range";
    data: { label: string, value: number, color: string }[];
}

function StatisticsChart({ type, data }: StatisticsChartProps) {
    const [errorStatus, setErrorStatus] = useState({ error: false, errorMessage: "" });
    const [clientData, setClientData] = useState(data);
    const authToken = getAuthTokenFromCookies();
    const [dateRange, setDateRange] = useState({
        start: dayjs(),
        end: dayjs()
    });


    const onRangeChange = (value: any, param: string) => {
        setDateRange({
            ...dateRange,
            [param]: value
        })
    }

    const onRangeSubmit = async () => {
        if (dateRange.end.isBefore(dateRange.start, 'day')) {
            setErrorStatus({
                error: true,
                errorMessage: "The End date cannot be before Start date."
            })

            setTimeout(() => {
                setErrorStatus(
                    {
                        error: false,
                        errorMessage: "",
                    }
                )
            }, 4000);

            return;
        }

        try {
            const response = authToken && (await fetchRangeData(authToken, dateRange.start, dateRange.end));
            setClientData(response)
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 429) {
                setErrorStatus({
                    error: true,
                    errorMessage: "You can only make 10 requests every 20 Seconds, wait a few moments and try again."
                })
            } else {
                setErrorStatus({
                    error: true,
                    errorMessage: "An unknown Error ocurred. Refresh and try again."
                })
            }

            setTimeout(() => {
                setErrorStatus(
                    {
                        error: false,
                        errorMessage: "",
                    }
                )
            }, 4000);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            let response;
            try {
                switch (type) {
                    case 'week':
                        response = authToken && (await fetchWeekData(authToken));
                        break;
                    case 'month':
                        response = authToken && (await fetchMonthData(authToken));
                        break;
                    case 'year':
                        response = authToken && (await fetchYearData(authToken));
                        break;
                    case 'range':
                        response = authToken && (await fetchRangeData(authToken, dateRange.start, dateRange.end));
                        break;
                    default:
                        break;
                }

                if (response && typeof window !== 'undefined') {
                    setClientData(response);
                }

            } catch (error) {
                if (axios.isAxiosError(error) && error.response?.status === 429) {
                    setErrorStatus({
                        error: true,
                        errorMessage: "You can only make 10 requests every 20 Seconds, wait a few moments and try again."
                    })
                } else {
                    setErrorStatus({
                        error: true,
                        errorMessage: "An unknown Error ocurred. Refresh and try again."
                    })
                }

                setTimeout(() => {
                    setErrorStatus(
                        {
                            error: false,
                            errorMessage: "",
                        }
                    )
                }, 4000);
            }


        };
        fetchData();
    }, []);

    // Data processment for pieChart dispay
    let displayData = type !== "day" ? clientData : data;

    displayData.forEach((item) => {
        // Modify negative values to absolute
        item.value = Math.abs(item.value);
        // Set a color for each item
        item.color = getRandomColor();
    });



    // Check total expenses for this selected period
    const totalExpenses = getTotalPeriodExpenses(displayData);

    // Safety Override if there's no data
    displayData = displayData.length > 0 ? displayData : [{ label: `${type !== "range" ? `No data for ${type} period` : `No data for this range`}`, value: 1, color: "#398585" }];

    // PieChart details
    const sizing = {
        margin: { right: 5 },
        width: 250,
        height: 250,
        legend: { hidden: true },
    };

    return (
        <>
            {type === "range" &&
                <RangeSelectorContainer>
                    <DateTimePicker
                        label="From"
                        value={dateRange.start}
                        onChange={(value) => onRangeChange(value, "start")}
                        views={['year', 'month', 'day']}
                    />
                    <DateTimePicker
                        label="To"
                        value={dateRange.end}
                        onChange={(value) => onRangeChange(value, "end")}
                        views={['year', 'month', 'day']}
                    />
                    <RangeSubmitButton onClick={onRangeSubmit}><SearchIcon /></RangeSubmitButton>
                </RangeSelectorContainer>
            }
            <StatisticsChartContainer>
                <ChartGenInfo>Your total expenses this {type} were: <span>{totalExpenses}€</span></ChartGenInfo>
                <PieChart
                    series={[
                        {
                            data: displayData,
                            innerRadius: 50,
                            outerRadius: 100,
                            paddingAngle: 2,
                            cornerRadius: 2,
                            cx: 125,
                            cy: 125,
                            highlightScope: { faded: 'global', highlighted: 'item' },
                            faded: { innerRadius: 40, additionalRadius: -20, color: 'gray' },
                        },
                    ]}
                    {...sizing}
                />
                <ChartLegend>
                    {displayData.map((item, index) => (
                        <ChartLengendItem $color={item.color} key={index}>
                            <div></div>
                            {item.color !== "#398585" && <span>{((item.value / parseFloat(totalExpenses)) * 100).toFixed(2)}%</span>}
                            {item.label}
                        </ChartLengendItem>
                    ))}
                </ChartLegend>

            </StatisticsChartContainer>

            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={errorStatus.error}
                autoHideDuration={3000}
            >
                <Alert severity="error">{errorStatus.errorMessage}</Alert>
            </Snackbar>
        </>
    )
}

export default StatisticsChart

