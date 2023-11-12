import axios from "axios";

const BASE_URL = "https://x8ki-letl-twmt.n7.xano.io/api:8Mli9063";

export const fetchProfileData = async (token: string | null) => {
    const response = await axios.get(`${BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
    });

    return response;
}