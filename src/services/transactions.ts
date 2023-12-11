import axios from "axios"

const BASE_URL = "https://x8ki-letl-twmt.n7.xano.io/api:8Mli9063";

export const fetchTransactions = async (token: string | null, value?: number) => {
    const response = await axios.get(`${BASE_URL}/user_transactions`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                page: value
            }
        });

    return response.data;
};