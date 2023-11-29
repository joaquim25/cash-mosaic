
import React, { useEffect, useMemo, useState } from 'react'
import { StatisticsChartContainer, StatisticsPieChart } from './styles';
import { fetchMonthData, fetchWeekData, fetchYearData } from '@/pages/api/statistics';
import { getAuthTokenFromCookies } from '../../../utils/cookies';
import axios from 'axios';
import { Alert, Snackbar } from '@mui/material';


type StatisticsChartProps = {
    type: "day" | "week" | "month" | "year" | "range";
    data: { label: string, value: number }[];
}

function StatisticsChart({ type, data }: StatisticsChartProps) {
    const [errorStatus, setErrorStatus] = useState({ error: false, errorMessage: "" });
    const [clientData, setClientData] = useState(data);
    const authToken = getAuthTokenFromCookies();

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
                        response = authToken && (await fetchYearData(authToken));
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
    }, [type, authToken]);

    let displayData = type !== "day" ? clientData : data;

    displayData.forEach((item: { value: number; }) => {
        item.value = Math.abs(item.value);
    });

    displayData = displayData.length > 0 ? displayData : [{ label: `${type !== "range" ? `No data for ${type} period` : `No data for this range`}`, value: 1 }];

    return (
        <StatisticsChartContainer>
            <StatisticsPieChart
                series={[
                    {
                        data: displayData,
                        innerRadius: 60,
                        outerRadius: 90,
                        paddingAngle: 2,
                        cornerRadius: 2,
                        highlightScope: { faded: 'global', highlighted: 'item' },
                        faded: { innerRadius: 40, additionalRadius: -20, color: 'gray' },
                    },
                ]}
                width={500}
                height={300}

            />
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                open={errorStatus.error}
                autoHideDuration={3000}
            >
                <Alert severity="error">{errorStatus.errorMessage}</Alert>
            </Snackbar>
        </StatisticsChartContainer>
    )
}

export default StatisticsChart

