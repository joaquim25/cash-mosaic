import { FormValues } from "@/components/AuthForm/types";
import axios from "axios"

const BASE_URL = "https://x8ki-letl-twmt.n7.xano.io/api:8Mli9063"

export const authLogin = async (formValues: FormValues) => {
    const { email, password } = formValues;
    const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
    return response;
}

export const authSignup = async (formValues: FormValues) => {
    const { firstname, lastname, email, password } = formValues;
    const response = await axios.post(`${BASE_URL}/auth/signup`, { firstname, lastname, email, password })
    return response;
}