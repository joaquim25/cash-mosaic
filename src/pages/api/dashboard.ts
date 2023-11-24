import axios from "axios"

const BASE_URL = "https://x8ki-letl-twmt.n7.xano.io/api:8Mli9063";

type DashboardAPIProps = {
    cashmosaic_user_id: number | null | undefined;
    date: unknown;
    amount: string | undefined;
    category: string | undefined;
}

export const addIncome = async ({ cashmosaic_user_id, date, amount, category }: DashboardAPIProps) => {

    const response = await axios.post(`${BASE_URL}/cashmosaic_transactions_income`,
        {
            cashmosaic_user_id, date, amount, category
        }
    )

    return response;
}