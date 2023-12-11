import axios from "axios";

const BASE_URL = "https://x8ki-letl-twmt.n7.xano.io/api:8Mli9063";

export const fetchisUserLogged = async (token: string | null | undefined) => {
    try {
        const response = await axios.get(`${BASE_URL}/auth/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("fetchisUserLogged error: ", error);

        throw error;
    }
};