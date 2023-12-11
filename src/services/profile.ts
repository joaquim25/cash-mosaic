import axios from "axios";
import { SimplifiedUserData } from "../../utils";

const BASE_URL = "https://x8ki-letl-twmt.n7.xano.io/api:8Mli9063";

export const fetchProfileData = async (token: string | null | undefined) => {
    const response = await axios.get(`${BASE_URL}/auth/me_profile`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const changeProfileData = async (id: number | null | undefined, userData: SimplifiedUserData) => {
    const response = await axios.patch(`${BASE_URL}/cashmosaic_user/${id}`, {
        firstname: userData.firstname,
        lastname: userData.lastname,
        location: userData.location,
        bio: userData.bio,
        password: userData.password

    })

    return response.data;
}