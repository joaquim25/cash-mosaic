import axios from "axios"
import { get7DaysPriorDate, getCurrentDate, getPriorMonthDate, getPriorYearDate } from "../../../utils/dates";

const BASE_URL = "https://x8ki-letl-twmt.n7.xano.io/api:8Mli9063";

export const fetchDayData = async (token: string) => {
    const today = getCurrentDate();
    try {
        const response = await axios.get(`${BASE_URL}/overview_day`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    start: today, end: today
                }
            });

        return response.data;
    } catch (error) {
        console.error("fetchProfileData error: ", error);

        throw error;
    }
};

export const fetchWeekData = async (token: string) => {
    const end = getCurrentDate();
    const start = get7DaysPriorDate();

    try {
        const response = await axios.get(`${BASE_URL}/overview_day`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    start, end
                }
            });

        return response.data;
    } catch (error) {
        console.error("fetchProfileData error: ", error);

        throw error;
    }
}

export const fetchMonthData = async (token: string) => {
    const end = getCurrentDate();
    const start = getPriorMonthDate();

    try {
        const response = await axios.get(`${BASE_URL}/overview_day`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    start, end
                }
            });

        return response.data;
    } catch (error) {
        console.error("fetchProfileData error: ", error);

        throw error;
    }
}

export const fetchYearData = async (token: string) => {
    const end = getCurrentDate();
    const start = getPriorYearDate();

    try {
        const response = await axios.get(`${BASE_URL}/overview_day`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    start, end
                }
            });

        return response.data;
    } catch (error) {
        console.error("fetchProfileData error: ", error);

        throw error;
    }
}