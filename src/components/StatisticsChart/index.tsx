/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useRef, useState } from 'react'
import { RangeSelectorContainer, RangeSubmitButton, StatisticsChartContainer } from './styles';
import { fetchMonthData, fetchRangeData, fetchWeekData, fetchYearData } from '@/pages/api/statistics';
import { getAuthTokenFromCookies } from '../../../utils/cookies';
import axios from 'axios';
import { Alert, Snackbar } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import SearchIcon from '@mui/icons-material/Search';
import { PieChart } from '@mui/x-charts/PieChart';


type StatisticsChartProps = {
    type: "day" | "week" | "month" | "year" | "range";
    data: { label: string, value: number }[];
}

function StatisticsChart({ type, data }: StatisticsChartProps) {
    const windowSize = useRef(window.innerWidth);
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
            console.log(response)
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
                        // TO-DO: Refactor (this one should have a range selector and submit btn)
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

    displayData.forEach((item: { value: number; }) => {
        item.value = Math.abs(item.value);
    });

    displayData = displayData.length > 0 ? displayData : [{ label: `${type !== "range" ? `No data for ${type} period` : `No data for this range`}`, value: 1 }];

    // Mobile & Desktop dispositions for pieChart
    const pieDisposition = windowSize.current > 600
        ? { x: 115, y: 95, width: 600, height: 200 }
        : { x: 50, y: 100, width: 130, height: 800 };

    return (
        <>
            {type === "range" &&
                <RangeSelectorContainer>
                    <DateTimePicker
                        label="Start"
                        value={dateRange.start}
                        onChange={(value) => onRangeChange(value, "start")}
                        views={['year', 'month', 'day']}
                    />
                    <DateTimePicker
                        label="End"
                        value={dateRange.end}
                        onChange={(value) => onRangeChange(value, "end")}
                        views={['year', 'month', 'day']}
                    />
                    <RangeSubmitButton onClick={onRangeSubmit}><SearchIcon /></RangeSubmitButton>
                </RangeSelectorContainer>
            }
            <StatisticsChartContainer>
                <PieChart
                    series={[
                        {
                            data: displayData,
                            innerRadius: 50,
                            outerRadius: 100,
                            paddingAngle: 2,
                            cornerRadius: 2,
                            cx: pieDisposition.x,
                            cy: pieDisposition.y,
                            highlightScope: { faded: 'global', highlighted: 'item' },
                            faded: { innerRadius: 40, additionalRadius: -20, color: 'gray' },
                        },
                    ]}
                    width={pieDisposition.width}
                    height={pieDisposition.height}
                />

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

