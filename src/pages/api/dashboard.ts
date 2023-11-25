import axios from "axios"

const BASE_URL = "https://x8ki-letl-twmt.n7.xano.io/api:8Mli9063";

type DashboardAPIProps = {
    user_id: number | null | undefined;
    date: unknown;
    amount: string | undefined;
    category: string | undefined;
}

export const fetchDashboardData = async (token: string | null | undefined) => {
    try {
        const response = await axios.get(`${BASE_URL}/auth/me_dashboard`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("fetchProfileData error: ", error);

        throw error;
    }
};

export const addIncome = async ({ user_id, date, amount, category }: DashboardAPIProps) => {
    let parsedAmount = parseFloat(amount!.replace(',', '.'));

    const response = await axios.post(`${BASE_URL}/cashmosaic_transactions`,
        {
            user_id, date, amount: parsedAmount, category
        }
    )

    return response;
}

export const addExpense = async ({ user_id, date, amount, category }: DashboardAPIProps) => {
    let parsedAmount = parseFloat(amount!.replace(',', '.'))
    if (typeof parsedAmount === "number") {
        parsedAmount = parsedAmount * -1;
    }

    const response = await axios.post(`${BASE_URL}/cashmosaic_transactions`,
        {
            user_id, date, amount: parsedAmount, category
        }
    )

    return response;
}