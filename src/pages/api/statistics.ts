import axios from "axios"
import { get7DaysPriorDate, getCurrentDate, getPriorMonthDate, getPriorYearDate } from "../../../utils/dates";

const BASE_URL = "https://x8ki-letl-twmt.n7.xano.io/api:8Mli9063";


export const fetchDayData = async (token: string) => {
    const today = getCurrentDate();
    const response = await axios.get(`${BASE_URL}/transactions_by_range`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                start: today, end: today, isInitial: 1
            }
        });

    return response.data;
};

export const fetchWeekData = async (token: string) => {
    const end = getCurrentDate();
    const start = get7DaysPriorDate();

    const response = await axios.get(`${BASE_URL}/transactions_by_range`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                start, end
            }
        });

    return response.data.statisticsData;
}

export const fetchMonthData = async (token: string) => {
    const end = getCurrentDate();
    const start = getPriorMonthDate();

    const response = await axios.get(`${BASE_URL}/transactions_by_range`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                start, end
            }
        });

    return response.data.statisticsData;
}

export const fetchYearData = async (token: string) => {
    const end = getCurrentDate();
    const start = getPriorYearDate();
    const response = await axios.get(`${BASE_URL}/transactions_by_range`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                start, end
            }
        });

    return response.data.statisticsData;
}

export const fetchRangeData = async (token: string, start: any, end: any) => {
    const response = await axios.get(`${BASE_URL}/transactions_by_range`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                start, end
            }
        });

    return response.data.statisticsData;
}