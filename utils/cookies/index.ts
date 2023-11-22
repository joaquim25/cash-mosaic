import { setCookie, getCookie, deleteCookie } from 'cookies-next';

export const getAuthTokenFromCookies = (): string | null => {
    return getCookie('authToken') || null;
};

export const setAuthTokenInCookies = (authToken: string): void => {
    setCookie('authToken', authToken);
};

export const removeAuthTokenFromCookies = (): void => {
    deleteCookie('authToken');
};